const jwt = require("jsonwebtoken");

const PHONE_VERIFICATION_TOKEN_TTL = "10m";

const normalizePhoneNumber = (phone) => {
  if (typeof phone !== "string") {
    return "";
  }

  const digits = phone.replace(/\D/g, "");
  return digits.length === 12 && digits.startsWith("91")
    ? digits.slice(2)
    : digits;
};

const createPhoneVerificationToken = (phone) => {
  if (!process.env.JWT_SECRET) {
    throw new Error("JWT_SECRET is not configured.");
  }

  return jwt.sign(
    {
      purpose: "phone-verification",
      phone: normalizePhoneNumber(phone),
    },
    process.env.JWT_SECRET,
    { expiresIn: PHONE_VERIFICATION_TOKEN_TTL },
  );
};

const getVerifiedPhoneFromToken = (token) => {
  if (!process.env.JWT_SECRET) {
    throw new Error("JWT_SECRET is not configured.");
  }

  const payload = jwt.verify(token, process.env.JWT_SECRET);
  if (
    typeof payload === "string" ||
    payload.purpose !== "phone-verification" ||
    typeof payload.phone !== "string"
  ) {
    return "";
  }

  return payload.phone;
};

module.exports = {
  createPhoneVerificationToken,
  getVerifiedPhoneFromToken,
  normalizePhoneNumber,
};
