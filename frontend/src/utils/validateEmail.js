export const isValidEmail = (value) =>
  /\S+@\S+\.\S+/.test((value || "").trim());

export default isValidEmail;
