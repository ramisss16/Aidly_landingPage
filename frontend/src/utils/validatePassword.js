export const getPasswordValidation = (password) => {
  const value = password || "";
  const requirements = [
    { label: "Minimum 8 characters", valid: value.length >= 8 },
    { label: "One uppercase letter", valid: /[A-Z]/.test(value) },
    { label: "One lowercase letter", valid: /[a-z]/.test(value) },
    { label: "One number", valid: /[0-9]/.test(value) },
    {
      label: "One special character",
      valid: /[!@#$%^&*()\-+=?_-]/.test(value),
    },
    { label: "No spaces", valid: !/\s/.test(value) },
  ];

  const failedRequirement = requirements.find((item) => !item.valid);

  return {
    isValid: !failedRequirement,
    requirements,
    message: failedRequirement
      ? `Password must have ${failedRequirement.label.toLowerCase()}.`
      : "Password looks good.",
  };
};

export default getPasswordValidation;
