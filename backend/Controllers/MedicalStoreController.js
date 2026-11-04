const MedicalStore = require("../models/MedicalStore");
const generateUniqueId = require("../utils/generateUniqueId");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");
const createMailer = require("../utils/createMailer");
const {
  getVerifiedPhoneFromToken,
  normalizePhoneNumber,
} = require("../utils/phoneVerification");

const EMAIL_VERIFICATION_CODE_TTL_MS = 10 * 60 * 1000;
const MAX_EMAIL_VERIFICATION_ATTEMPTS = 5;

const sendEmailVerificationCode = async (medicalStore) => {
  const code = crypto.randomInt(0, 1_000_000).toString().padStart(6, "0");
  medicalStore.emailVerificationCodeHash = await bcrypt.hash(code, 10);
  medicalStore.emailVerificationCodeExpires = new Date(
    Date.now() + EMAIL_VERIFICATION_CODE_TTL_MS,
  );
  medicalStore.emailVerificationCodeAttempts = 0;
  await medicalStore.save();

  const transporter = createMailer("Medical store verification email");
  await transporter.sendMail({
    from: process.env.SMTP_FROM.trim(),
    to: medicalStore.email,
    subject: "Verify your Aidly medical store email",
    text: `Your Aidly medical store verification code is ${code}. The code expires in 10 minutes.`,
    html: `<p>Your Aidly medical store verification code is:</p><p style="font-size:24px;font-weight:bold;letter-spacing:4px">${code}</p><p>The code expires in 10 minutes.</p>`,
  });
};

exports.registerMedicalStore = async (req, res) => {
  const {
    storeName,
    ownerName,
    email,
    phone,
    phoneVerificationToken,
    gstnumber,
    password,
    address,
    city,
    licenseNumber,
  } = req.body || {};

  const requiredFields = [storeName, ownerName, email, phone, gstnumber];
  if (
    requiredFields.some(
      (field) => typeof field !== "string" || field.trim().length === 0,
    ) ||
    typeof password !== "string" ||
    password.length === 0
  ) {
    return res.status(400).json({
      success: false,
      message:
        "Store name, owner name, email, phone, GST number, and password are required",
    });
  }

  if (
    [gstnumber, address, city, licenseNumber].some(
      (field) => field !== undefined && typeof field !== "string",
    )
  ) {
    return res.status(400).json({
      success: false,
      message: "GST number, address, city, and license number must be text values",
    });
  }

  const normalizedEmail = email.trim().toLowerCase();
  const normalizedPhone = normalizePhoneNumber(phone);
  const normalizedGstNumber = gstnumber.trim().toUpperCase();
  if (!/^\d{10}$/.test(normalizedPhone)) {
    return res.status(400).json({
      success: false,
      message: "A valid 10-digit Indian phone number is required",
    });
  }

  if (
    typeof phoneVerificationToken !== "string" ||
    phoneVerificationToken.length === 0
  ) {
    return res.status(400).json({
      success: false,
      message: "Verify the phone number before registering the medical store",
    });
  }

  let verifiedPhone;
  try {
    verifiedPhone = getVerifiedPhoneFromToken(phoneVerificationToken);
  } catch (error) {
    if (error.message === "JWT_SECRET is not configured.") {
      console.error("Medical store phone verification is unavailable:", error.message);
      return res.status(503).json({
        success: false,
        message: "Phone verification is temporarily unavailable",
      });
    }

    return res.status(400).json({
      success: false,
      message: "Phone verification is invalid or expired. Verify the phone again.",
    });
  }

  if (verifiedPhone !== normalizedPhone) {
    return res.status(400).json({
      success: false,
      message: "The verified phone number does not match the registration phone",
    });
  }

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(normalizedEmail)) {
    return res.status(400).json({
      success: false,
      message: "A valid email address is required",
    });
  }

  try {
    const existingStore = await MedicalStore.findOne({
      $or: [{ email: normalizedEmail }, { gstnumber: normalizedGstNumber }],
    });
    if (existingStore) {
      return res.status(409).json({
        success: false,
        message:
          existingStore.email === normalizedEmail
            ? existingStore.emailVerified
              ? "A medical store with this email is already registered"
              : "This email is already registered but not verified. Request a new code at /api/medical-store/resend-verification."
            : "A medical store with this GST number is already registered",
      });
    }

    const medicalStoreId = await generateUniqueId(
      MedicalStore,
      "medicalStoreId",
      "MST",
    );
    const hashedPassword = await bcrypt.hash(password, 10);

    const medicalStore = await MedicalStore.create({
      medicalStoreId,
      storeName: storeName.trim(),
      ownerName: ownerName.trim(),
      email: normalizedEmail,
      phone: normalizedPhone,
      phoneVerified: true,
      gstnumber: normalizedGstNumber,
      password: hashedPassword,
      emailVerified: false,
      address: address?.trim(),
      city: city?.trim(),
      licenseNumber: licenseNumber?.trim(),
      licenseDocument: req.files?.licenseDocument?.[0]?.path,
      storeLogo: req.files?.storeLogo?.[0]?.path,
    });

    let verificationEmailSent = true;
    try {
      await sendEmailVerificationCode(medicalStore);
    } catch (mailError) {
      verificationEmailSent = false;
      console.error("Medical store verification email could not be sent:", {
        code: mailError.code || "SMTP_SEND_FAILED",
        message: mailError.message,
      });
    }

    const storeResponse = medicalStore.toObject();
    delete storeResponse.password;
    delete storeResponse.emailVerificationCodeHash;
    delete storeResponse.emailVerificationCodeExpires;
    delete storeResponse.emailVerificationCodeAttempts;

    return res.status(201).json({
      success: true,
      message: verificationEmailSent
        ? "Medical store registered successfully"
        : "Medical store registered successfully, but the verification email could not be sent. Request a new code at /api/medical-store/resend-verification.",
      medicalStoreId,
      verificationEmailSent,
      medicalStore: storeResponse,
    });
  } catch (error) {
    console.error("Medical store registration failed:", error);

    if (error.code === 11000) {
      return res.status(409).json({
        success: false,
        message: "A medical store with this email or GST number is already registered",
      });
    }

    if (error.name === "ValidationError") {
      return res.status(400).json({
        success: false,
        message: error.message,
      });
    }

    return res.status(500).json({
      success: false,
      message: "Medical store registration failed",
    });
  }
};

exports.resendMedicalStoreVerification = async (req, res) => {
  const email =
    typeof req.body?.email === "string"
      ? req.body.email.trim().toLowerCase()
      : "";

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return res.status(400).json({
      success: false,
      message: "A valid email address is required",
    });
  }

  try {
    const medicalStore = await MedicalStore.findOne({ email });
    if (!medicalStore || medicalStore.emailVerified) {
      return res.status(404).json({
        success: false,
        message: "An unverified medical store was not found for this email",
      });
    }

    await sendEmailVerificationCode(medicalStore);
    return res.status(200).json({
      success: true,
      message: "Verification code sent to your email",
    });
  } catch (error) {
    console.error("Medical store verification email could not be sent:", {
      code: error.code || "SMTP_SEND_FAILED",
      message: error.message,
    });
    return res.status(503).json({
      success: false,
      message: "Unable to send the verification code. Please try again later.",
    });
  }
};

exports.verifyMedicalStoreEmail = async (req, res) => {
  const email =
    typeof req.body?.email === "string"
      ? req.body.email.trim().toLowerCase()
      : "";
  const code = typeof req.body?.code === "string" ? req.body.code.trim() : "";

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) || !/^\d{6}$/.test(code)) {
    return res.status(400).json({
      success: false,
      message: "A valid email address and 6-digit verification code are required",
    });
  }

  try {
    const medicalStore = await MedicalStore.findOneAndUpdate(
      {
        email,
        emailVerified: false,
        emailVerificationCodeExpires: { $gt: new Date() },
        emailVerificationCodeAttempts: { $lt: MAX_EMAIL_VERIFICATION_ATTEMPTS },
      },
      { $inc: { emailVerificationCodeAttempts: 1 } },
      { new: true },
    ).select(
      "+emailVerificationCodeHash +emailVerificationCodeExpires +emailVerificationCodeAttempts",
    );

    if (
      !medicalStore ||
      !(await bcrypt.compare(code, medicalStore.emailVerificationCodeHash))
    ) {
      return res.status(400).json({
        success: false,
        message: "The verification code is invalid, expired, or has reached the attempt limit",
      });
    }

    medicalStore.emailVerified = true;
    medicalStore.emailVerificationCodeHash = undefined;
    medicalStore.emailVerificationCodeExpires = undefined;
    medicalStore.emailVerificationCodeAttempts = 0;
    await medicalStore.save();

    return res.status(200).json({
      success: true,
      message: "Medical store email verified successfully. You can now log in.",
    });
  } catch (error) {
    console.error("Medical store email verification failed:", error);
    return res.status(500).json({
      success: false,
      message: "Unable to verify the email right now. Please try again later.",
    });
  }
};

exports.loginMedicalStore = async (req, res) => {
  const loginId =
    typeof req.body?.userId === "string"
      ? req.body.userId.trim()
      : typeof req.body?.adminId === "string"
        ? req.body.adminId.trim()
        : "";
  const { password } = req.body ?? {};

  if (!loginId || typeof password !== "string" || !password) {
    return res.status(400).json({
      success: false,
      message: "Medical store ID or email and password are required",
    });
  }

  try {
    const medicalStore = await MedicalStore.findOne({
      $or: [
        { medicalStoreId: loginId.toUpperCase() },
        { email: loginId.toLowerCase() },
      ],
    }).select("+password");

    if (!medicalStore) {
      return res.status(404).json({
        success: false,
        message: "Medical store not found",
      });
    }

    if (!medicalStore.emailVerified) {
      return res.status(403).json({
        success: false,
        message: "Verify your email before logging in",
      });
    }

    const isMatch = await bcrypt.compare(password, medicalStore.password);
    if (!isMatch) {
      return res.status(401).json({
        success: false,
        message: "Invalid credentials",
      });
    }

    const token = jwt.sign(
      {
        id: medicalStore._id,
        role: "medical-store",
      },
      process.env.JWT_SECRET,
      { expiresIn: "7d" },
    );

    const storeResponse = medicalStore.toObject();
    delete storeResponse.password;

    return res.status(200).json({
      success: true,
      message: "Login successful",
      role: "medical-store",
      token,
      medicalStore: storeResponse,
    });
  } catch (error) {
    console.error("Medical store login failed:", error);
    return res.status(500).json({
      success: false,
      message: "Medical store login failed",
    });
  }
};