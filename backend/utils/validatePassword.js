const validatePassword = (password) => {
  if (typeof password !== "string") {
    return {
      valid: false,
      message:
        "Password must be at least 8 characters long and meet the required criteria.",
    };
  }

  const trimmedPassword = password.trim();

  if (trimmedPassword.length < 8) {
    return {
      valid: false,
      message: "Password must be at least 8 characters long.",
    };
  }

  if (!/[A-Z]/.test(trimmedPassword)) {
    return {
      valid: false,
      message: "Password must contain at least one uppercase letter.",
    };
  }

  if (!/[a-z]/.test(trimmedPassword)) {
    return {
      valid: false,
      message: "Password must contain at least one lowercase letter.",
    };
  }

  if (!/[0-9]/.test(trimmedPassword)) {
    return {
      valid: false,
      message: "Password must contain at least one number.",
    };
  }

  if (!/[!@#$%^&*()\-+=?_-]/.test(trimmedPassword)) {
    return {
      valid: false,
      message: "Password must contain at least one special character.",
    };
  }

  if (/\s/.test(trimmedPassword)) {
    return {
      valid: false,
      message: "Password must not contain spaces.",
    };
  }

  return {
    valid: true,
    message: "Password is valid.",
  };
};

module.exports = validatePassword;
