const OnlineDoctor = require("../models/OnlineDoctor");
const generateUniqueId = require("../utils/generateUniqueId");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

// ================== REGISTER ONLINE DOCTOR ==================
exports.registerOnlineDoctor = async (req, res) => {
  try {
    const {
      name,
      email,
      phone,
      password,
      specialization,
      consultationFee,
      availableSlots,
    } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({
        success: false,
        message: "Missing required fields",
      });
    }

    const normalizedFee =
      consultationFee === undefined || consultationFee === ""
        ? undefined
        : Number(consultationFee);

    if (
      normalizedFee !== undefined &&
      (!Number.isFinite(normalizedFee) || normalizedFee < 0)
    ) {
      return res.status(400).json({
        success: false,
        message: "Consultation fee must be a valid non-negative number.",
      });
    }

    const existingDoctor = await OnlineDoctor.findOne({ email });

    if (existingDoctor) {
      return res.status(400).json({
        success: false,
        message: "Online doctor already exists",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const doctorId = await generateUniqueId(
      OnlineDoctor,
      "doctorId",
      "ODC"
    );

    const doctor = new OnlineDoctor({
      doctorId,
      name,
      email,
      phone,
      password: hashedPassword,
      specialization,
      ...(normalizedFee !== undefined && { consultationFee: normalizedFee }),
      availableSlots,

      // CLOUDINARY FILE URLS
      photo: req.files?.photo?.[0]?.path || "",
      aadhaarDocument: req.files?.aadhaarDocument?.[0]?.path || "",
      panDocument: req.files?.panDocument?.[0]?.path || "",
      experienceCertificate:
        req.files?.experienceCertificate?.[0]?.path || "",
      licenseCertificate:
        req.files?.licenseCertificate?.[0]?.path || "",
    });

    await doctor.save();

    res.status(201).json({
      success: true,
      message: "Online doctor registered successfully",
      doctorId,
      doctor,
    });

  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};


// ================== LOGIN ONLINE DOCTOR ==================
exports.loginOnlineDoctor = async (req, res) => {
  try {
    const loginId =
      typeof req.body?.userId === "string" ? req.body.userId.trim() : "";
    const { password } = req.body ?? {};

    if (!loginId || typeof password !== "string" || !password) {
      return res.status(400).json({
        success: false,
        message: "User ID or email and password are required.",
      });
    }

    const doctor = await OnlineDoctor.findOne({
      $or: [
        { doctorId: loginId.toUpperCase() },
        { email: loginId.toLowerCase() },
      ],
    });

    if (!doctor) {
      return res.status(404).json({
        success: false,
        message: "Doctor not found",
      });
    }

    const isMatch = await bcrypt.compare(password, doctor.password);

    if (!isMatch) {
      return res.status(400).json({
        success: false,
        message: "Invalid password",
      });
    }

    const token = jwt.sign(
      {
        id: doctor._id,
        role: "online-doctor",
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "7d",
      }
    );

    res.status(200).json({
      success: true,
      message: "Login successful",
      role: "online-doctor",
      token,
      doctor,
    });

  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};