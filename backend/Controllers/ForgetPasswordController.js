const crypto = require("crypto");
const bcrypt = require("bcrypt");
const nodemailer = require("nodemailer");
const Admin = require("../models/Admin");
const Clinic = require("../models/Clinic");
const Doctor = require("../models/Doctor");
const OnlineDoctor = require("../models/OnlineDoctor");
const HospitalAmbulance = require("../models/HospitalAmbulance");
const PrivateAmbulance = require("../models/PrivateAmbulance");
const Receptionist = require("../models/Receptionist");
const Manager = require("../models/Manager");

const VERIFICATION_CODE_TTL_MS = 10 * 60 * 1000;
const RESET_TOKEN_TTL_MS = 10 * 60 * 1000;
const MAX_VERIFICATION_ATTEMPTS = 5;
const GENERIC_REQUEST_MESSAGE =
  "If an account matches that email, a verification code has been sent.";
const INVALID_CODE_MESSAGE =
  "The verification code is invalid, expired, or has reached the attempt limit.";
const ACCOUNT_TYPE_MODELS = {
  admin: {
    Model: Admin,
    emailFields: ["email"],
    displayName: "admin",
    nameField: "name",
    userIdField: "adminId",
    hashPassword: false,
  },
  onlineDoctor: {
    Model: OnlineDoctor,
    emailFields: ["email"],
    displayName: "online doctor",
    nameField: "name",
    userIdField: "doctorId",
    hashPassword: true,
  },
  clinic: {
    Model: Clinic,
    emailFields: ["clinicEmail", "email"],
    displayName: "clinic",
    nameField: "clinicName",
    userIdField: "adminId",
    hashPassword: true,
  },
  doctor: {
    Model: Doctor,
    emailFields: ["email"],
    displayName: "doctor",
    nameField: "name",
    userIdField: "doctorId",
    hashPassword: true,
  },
  privateAmbulance: {
    Model: PrivateAmbulance,
    emailFields: ["email"],
    displayName: "private ambulance",
    nameField: "ownerName",
    userIdField: "privateAmbulanceId",
    hashPassword: true,
  },
  receptionist: {
    Model: Receptionist,
    emailFields: ["email"],
    displayName: "receptionist",
    nameField: "name",
    userIdField: "receptionistId",
    hashPassword: true,
  },
  manager: {
    Model: Manager,
    emailFields: ["email"],
    displayName: "manager",
    nameField: "name",
    userIdField: "managerId",
    hashPassword: true,
  },
  hospitalAmbulance: {
    Model: HospitalAmbulance,
    emailFields: ["email"],
    displayName: "hospital ambulance",
    nameField: "hospitalName",
    userIdField: "hospitalAmbulanceId",
    hashPassword: true,
  },
};

const hashToken = (token) =>
  crypto.createHash("sha256").update(token).digest("hex");

const createEmailQuery = (email, emailFields) => {
  const escapedEmail = email.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  const emailRegex = new RegExp(`^${escapedEmail}$`, "i");
  const emailConditions = emailFields.map((field) => ({
    [field]: emailRegex,
  }));

  return emailConditions.length === 1
    ? emailConditions[0]
    : { $or: emailConditions };
};

const escapeHtml = (value) =>
  String(value).replace(/[&<>"']/g, (character) => ({
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#39;",
  })[character]);

const getSupportedAccountTypes = () =>
  Object.keys(ACCOUNT_TYPE_MODELS).join(", ");

const isValidDevelopmentBypassCode = (code) => {
  const bypassCode = process.env.BYPASS_OTP?.trim();
  if (process.env.NODE_ENV === "production" || !/^\d{6}$/.test(bypassCode || "")) {
    return false;
  }

  return crypto.timingSafeEqual(Buffer.from(code), Buffer.from(bypassCode));
};

const findAccountsByEmail = async (email, accountType) => {
  const models = accountType
    ? [[accountType, ACCOUNT_TYPE_MODELS[accountType]]]
    : Object.entries(ACCOUNT_TYPE_MODELS);
  const accounts = await Promise.all(models.map(async ([type, config]) => {
    const emailQuery = createEmailQuery(email, config.emailFields);
    return {
      accountType: type,
      ...config,
      emailQuery,
      account: await config.Model.findOne(emailQuery),
    };
  }));
  return accounts.filter(({ account }) => account);
};

const createMailer = () => {
  const requiredSettings = [
    "SMTP_HOST",
    "SMTP_USER",
    "SMTP_PASS",
    "SMTP_FROM",
  ];
  const missingSettings = requiredSettings.filter(
    (setting) => !process.env[setting]?.trim()
  );

  if (missingSettings.length > 0) {
    throw new Error(
      `Password reset email is not configured. Missing: ${missingSettings.join(", ")}`
    );
  }

  const port = Number(process.env.SMTP_PORT || 587);
  if (!Number.isInteger(port) || port < 1 || port > 65535) {
    throw new Error("SMTP_PORT must be a valid TCP port.");
  }

  return nodemailer.createTransport({
    host: process.env.SMTP_HOST.trim(),
    port,
    secure: process.env.SMTP_SECURE === "true" || port === 465,
    auth: {
      user: process.env.SMTP_USER.trim(),
      pass:
        process.env.SMTP_HOST.trim().toLowerCase() === "smtp.gmail.com"
          ? process.env.SMTP_PASS.replace(/\s/g, "")
          : process.env.SMTP_PASS,
    },
  });
};

exports.requestPasswordReset = async (req, res) => {
  const email =
    typeof req.body?.email === "string"
      ? req.body.email.trim().toLowerCase()
      : "";
  const accountType =
    typeof req.body?.accountType === "string" ? req.body.accountType : "";

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return res.status(400).json({
      success: false,
      message: "A valid email address is required.",
    });
  }
  if (accountType && !ACCOUNT_TYPE_MODELS[accountType]) {
    return res.status(400).json({
      success: false,
      message: `accountType must be one of: ${getSupportedAccountTypes()}.`,
    });
  }

  try {
    const matches = await findAccountsByEmail(email, accountType);
    if (matches.length > 1) {
      return res.status(409).json({
        success: false,
        message: `This email belongs to multiple account types. Specify accountType as one of: ${getSupportedAccountTypes()}.`,
      });
    }
    const match = matches[0];
    if (!match) {
      return res.status(200).json({
        success: true,
        message: GENERIC_REQUEST_MESSAGE,
      });
    }
    const {
      account,
      accountType: matchedAccountType,
      displayName,
      nameField,
      userIdField,
    } = match;
    const accountName = String(account[nameField] || displayName);
    const userId = String(account[userIdField] || "Not available");

    const verificationCode = crypto
      .randomInt(0, 1_000_000)
      .toString()
      .padStart(6, "0");
    account.passwordResetCodeHash = await bcrypt.hash(verificationCode, 10);
    account.passwordResetCodeExpires = new Date(
      Date.now() + VERIFICATION_CODE_TTL_MS
    );
    account.passwordResetCodeAttempts = 0;
    account.resetPasswordToken = undefined;
    account.resetPasswordExpires = undefined;
    await account.save();

    try {
      const transporter = createMailer();
      await transporter.sendMail({
        from: process.env.SMTP_FROM.trim(),
        to: email,
        subject: `Aidly ${displayName} password verification code`,
        text: `Your Aidly password reset verification code is ${verificationCode}.\n\nAccount type: ${displayName}\nName: ${accountName}\nUser ID: ${userId}\n\nThe code expires in 10 minutes. If you did not request this code, you can ignore this email.`,
        html: `<p>Your Aidly password reset verification code is:</p><p style="font-size:24px;font-weight:bold;letter-spacing:4px">${verificationCode}</p><p>Account type: ${escapeHtml(displayName)}<br>Name: ${escapeHtml(accountName)}<br>User ID: ${escapeHtml(userId)}</p><p>This code expires in 10 minutes. If you did not request this code, you can ignore this email.</p>`,
      });
    } catch (mailError) {
      account.passwordResetCodeHash = undefined;
      account.passwordResetCodeExpires = undefined;
      account.passwordResetCodeAttempts = 0;
      await account.save();
      console.error("Password reset code could not be sent:", {
        code: mailError.code || "SMTP_SEND_FAILED",
        message: mailError.message,
      });
      return res.status(503).json({
        success: false,
        message: "Unable to send the verification code. Please try again later.",
      });
    }

    return res.status(200).json({
      success: true,
      message: GENERIC_REQUEST_MESSAGE,
      accountType: matchedAccountType,
    });
  } catch (error) {
    console.error("Password reset code request failed:", error.message);
    return res.status(503).json({
      success: false,
      message: "Password recovery is temporarily unavailable. Please try again later.",
    });
  }
};

exports.verifyPasswordResetCode = async (req, res) => {
  const email =
    typeof req.body?.email === "string"
      ? req.body.email.trim().toLowerCase()
      : "";
  const code =
    typeof req.body?.code === "string" ? req.body.code.trim() : "";
  const accountType =
    typeof req.body?.accountType === "string" ? req.body.accountType : "";

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) || !/^\d{6}$/.test(code)) {
    return res.status(400).json({
      success: false,
      message: "A valid email address and 6-digit verification code are required.",
    });
  }
  if (accountType && !ACCOUNT_TYPE_MODELS[accountType]) {
    return res.status(400).json({
      success: false,
      message: `accountType must be one of: ${getSupportedAccountTypes()}.`,
    });
  }

  try {
    const isBypassCodeValid = isValidDevelopmentBypassCode(code);
    const matches = await findAccountsByEmail(email, accountType);
    if (matches.length > 1) {
      return res.status(409).json({
        success: false,
        message: `This email belongs to multiple account types. Specify accountType as one of: ${getSupportedAccountTypes()}.`,
      });
    }
    const match = matches[0];
    if (!match) {
      return res.status(400).json({
        success: false,
        message: INVALID_CODE_MESSAGE,
      });
    }
    const { Model, accountType: matchedAccountType, emailQuery } = match;
    const account = isBypassCodeValid
      ? match.account
      : await Model.findOneAndUpdate(
          {
            $and: [
              emailQuery,
              {
                passwordResetCodeExpires: { $gt: new Date() },
                passwordResetCodeAttempts: { $lt: MAX_VERIFICATION_ATTEMPTS },
              },
            ],
          },
          { $inc: { passwordResetCodeAttempts: 1 } },
          { new: true }
        ).select("+passwordResetCodeHash +passwordResetCodeExpires");
    const isEmailCodeValid =
      account &&
      typeof account.passwordResetCodeHash === "string" &&
      (await bcrypt.compare(code, account.passwordResetCodeHash));

    if (!account || (!isBypassCodeValid && !isEmailCodeValid)) {
      return res.status(400).json({
        success: false,
        message: INVALID_CODE_MESSAGE,
      });
    }

    const resetToken = crypto.randomBytes(32).toString("hex");
    account.resetPasswordToken = hashToken(resetToken);
    account.resetPasswordExpires = new Date(Date.now() + RESET_TOKEN_TTL_MS);
    account.passwordResetCodeHash = undefined;
    account.passwordResetCodeExpires = undefined;
    account.passwordResetCodeAttempts = 0;
    await account.save();

    return res.status(200).json({
      success: true,
      message: "Verification successful. Use the reset token to set a new password.",
      resetToken,
      accountType: matchedAccountType,
    });
  } catch (error) {
    console.error("Password reset code verification failed:", error.message);
    return res.status(500).json({
      success: false,
      message: "Unable to verify the code right now. Please try again later.",
    });
  }
};

exports.resetPassword = async (req, res) => {
  const resetToken =
    typeof req.body?.resetToken === "string" ? req.body.resetToken : "";
  const password =
    typeof req.body?.password === "string" ? req.body.password : "";

  if (!resetToken || !password) {
    return res.status(400).json({
      success: false,
      message: "A verified reset token and new password are required.",
    });
  }

  const passwordByteLength = Buffer.byteLength(password, "utf8");
  if (password.length < 8 || passwordByteLength > 72) {
    return res.status(400).json({
      success: false,
      message: "Password must be at least 8 characters and no more than 72 bytes.",
    });
  }

  try {
    const hashedResetToken = hashToken(resetToken);
    const resetTokenQuery = {
      resetPasswordToken: hashedResetToken,
      resetPasswordExpires: { $gt: new Date() },
    };
    const accountMatches = await Promise.all(
      Object.values(ACCOUNT_TYPE_MODELS).map(async ({ Model, ...config }) => ({
        ...config,
        account: await Model.findOne(resetTokenQuery).select(
          "+resetPasswordToken +resetPasswordExpires"
        ),
      }))
    );
    const match = accountMatches.find(({ account }) => account);
    const account = match?.account;

    if (!account || !match) {
      return res.status(400).json({
        success: false,
        message: "The verified reset token is invalid or has expired.",
      });
    }

    account.password = match.hashPassword
      ? await bcrypt.hash(password, 10)
      : password;

    account.resetPasswordToken = undefined;
    account.resetPasswordExpires = undefined;
    account.passwordResetCodeHash = undefined;
    account.passwordResetCodeExpires = undefined;
    account.passwordResetCodeAttempts = 0;
    await account.save();

    return res.status(200).json({
      success: true,
      message: "Password reset successfully. You can now sign in.",
    });
  } catch (error) {
    console.error("Password reset failed:", error.message);
    return res.status(500).json({
      success: false,
      message: "Unable to reset the password right now. Please try again later.",
    });
  }
};
