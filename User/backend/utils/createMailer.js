const nodemailer = require("nodemailer");

const createMailer = (purpose = "Email") => {
  const requiredSettings = [
    "SMTP_HOST",
    "SMTP_USER",
    "SMTP_PASS",
    "SMTP_FROM",
  ];
  const missingSettings = requiredSettings.filter(
    (setting) => !process.env[setting]?.trim(),
  );

  if (missingSettings.length > 0) {
    throw new Error(
      `${purpose} is not configured. Missing: ${missingSettings.join(", ")}`,
    );
  }

  const host = process.env.SMTP_HOST.trim();
  const port = Number(process.env.SMTP_PORT || 587);
  if (!Number.isInteger(port) || port < 1 || port > 65535) {
    throw new Error("SMTP_PORT must be a valid TCP port.");
  }

  return nodemailer.createTransport({
    host,
    port,
    secure: process.env.SMTP_SECURE === "true" || port === 465,
    auth: {
      user: process.env.SMTP_USER.trim(),
      pass:
        host.toLowerCase() === "smtp.gmail.com"
          ? process.env.SMTP_PASS.replace(/\s/g, "")
          : process.env.SMTP_PASS,
    },
  });
};

module.exports = createMailer;
