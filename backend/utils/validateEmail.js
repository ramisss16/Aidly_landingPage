const validator = require("validator");

const validateEmail = (email) => {
  const cleanedEmail =
    typeof email === "string" ? email.trim().toLowerCase() : "";

  return {
    valid: validator.isEmail(cleanedEmail),
    email: cleanedEmail,
  };
};

module.exports = validateEmail;
