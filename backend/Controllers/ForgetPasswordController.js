const crypto = require("crypto");
const nodemailer = require("nodemailer");
const Admin = require("../models/Admin");

const RESET_TOKEN_TTL_MS = 15 * 60 * 1000;
const GENERIC_REQUEST_MESSAGE =
  "If an active admin account matches that email, a password reset link has been sent.";

const createMailer = () => {
  const requiredSettings = [
    "SMTP_HOST",
    "SMTP_USER",
    "SMTP_PASS",
    "SMTP_FROM",
    "FRONTEND_URL",
  ];
  
  const missingSettings = requiredSettings.filter(
    (setting) => !process.env[setting]
  );

  if (missingSettings.length > 0) {
    throw new Error(
      `Admin password reset email is not configured. Missing: ${missingSettings.join(", ")}`
    );
  }

  const frontendUrl = new URL(process.env.FRONTEND_URL);
  if (!["http:", "https:"].includes(frontendUrl.protocol)) {
    throw new Error("FRONTEND_URL must use HTTP or HTTPS.");
  }

  return {
    transporter: nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: Number(process.env.SMTP_PORT || 587),
      secure: process.env.SMTP_SECURE === "true",
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    }),
    frontendUrl,
  };
};

exports.requestPasswordReset = async (req, res) => {
  const body = req.body ?? {};
  const email =
    typeof body.email === "string" ? body.email.trim().toLowerCase() : "";

  if (!email) {
    return res.status(400).json({
      success: false,
      message: "A valid email address is required.",
    });
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return res.status(400).json({
      success: false,
      message: "A valid email address is required.",
    });
  }

  try {
    const { transporter, frontendUrl } = createMailer();
    const admin = await Admin.findOne({
      email,
      role: "aidlyAdmin",
      isActive: { $ne: false },
    });

    if (admin) {
      const resetToken = crypto.randomBytes(32).toString("hex");
      admin.resetPasswordToken = crypto
        .createHash("sha256")
        .update(resetToken)
        .digest("hex");
      admin.resetPasswordExpires = new Date(Date.now() + RESET_TOKEN_TTL_MS);
      await admin.save();

      const resetUrl = new URL("/admin/reset-password", frontendUrl);
      resetUrl.searchParams.set("token", resetToken);

      try {
        await transporter.sendMail({
          from: process.env.SMTP_FROM,
          to: admin.email,
          subject: "Aidly admin password reset",
          text: `A password reset was requested for your Aidly admin account. This link expires in 15 minutes:\n\n${resetUrl.toString()}\n\nIf you did not request this, you can ignore this email.`,
          html: `<p>A password reset was requested for your Aidly admin account.</p><p><a href="${resetUrl.toString()}">Reset your password</a></p><p>This link expires in 15 minutes. If you did not request this, you can ignore this email.</p>`,
        });
      } catch (mailError) {
        console.error("Admin password reset email could not be sent:", mailError);
        admin.resetPasswordToken = undefined;
        admin.resetPasswordExpires = undefined;
        await admin.save();
      }
    }

    return res.status(200).json({
      success: true,
      message: GENERIC_REQUEST_MESSAGE,
    });
  } catch (error) {
    console.error("Admin password reset request failed:", error);
    return res.status(503).json({
      success: false,
      message: "Password recovery is temporarily unavailable. Please try again later.",
    });
  }
};

exports.resetPassword = async (req, res) => {
  const { token, password } = req.body ?? {};
 
  if (typeof token !== "string" || !token || typeof password !== "string") {
    return res.status(400).json({
      success: false,
      message: "A reset token and new password are required.",
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
    const hashedToken = crypto
      .createHash("sha256")
      .update(token)
      .digest("hex");
    const admin = await Admin.findOne({
      resetPasswordToken: hashedToken,
      resetPasswordExpires: { $gt: new Date() },
      role: "aidlyAdmin",
      isActive: { $ne: false },
    }).select("+resetPasswordToken +resetPasswordExpires");

    if (!admin) {
      return res.status(400).json({
        success: false,
        message: "This password reset link is invalid or has expired.",
      });
    }

    admin.password = password;
    admin.resetPasswordToken = undefined;
    admin.resetPasswordExpires = undefined;
    await admin.save();

    return res.status(200).json({
      success: true,
      message: "Password reset successfully. You can now sign in.",
    });
  } catch (error) {
    console.error("Admin password reset failed:", error);
    return res.status(500).json({
      success: false,
      message: "Unable to reset the password right now. Please try again later.",
    });
  }
};