/**
 * Pure validation helper utilities for the PRANACORE Healthcare Platform.
 * These are completely stateless and side-effect free, exporting named functions.
 */

/**
 * Checks if a value is present (not empty after trimming).
 * Supports strings, numbers, and booleans.
 *
 * @param {*} value - The value to validate.
 * @returns {boolean} True if the value is not empty.
 * @example
 * isRequired("  John  "); // true
 * isRequired(""); // false
 * isRequired(false); // true
 */
export const isRequired = (value) => {
  if (value === null || value === undefined) return false;
  if (typeof value === "boolean") return true;
  if (typeof value === "number") return true;
  if (typeof value === "string") return value.trim().length > 0;
  return false;
};

/**
 * Validates whether the given string is a valid email address using a standard email regex.
 *
 * @param {string} email - The email string to validate.
 * @returns {boolean} True if the email is valid.
 * @example
 * isValidEmail("support@pranacore.com"); // true
 * isValidEmail("invalid-email"); // false
 */
export const isValidEmail = (email) => {
  if (typeof email !== "string") return false;
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  return emailRegex.test(email);
};

/**
 * Validates if the given number or string is a valid 10-digit mobile number,
 * ignoring space characters and dashes.
 *
 * @param {string|number} phone - The phone number to validate.
 * @returns {boolean} True if phone contains exactly 10 digits after stripping space and dash separators.
 * @example
 * isValidPhone("123-456-7890"); // true
 * isValidPhone(1234567890); // true
 * isValidPhone("123 456"); // false
 */
export const isValidPhone = (phone) => {
  if (phone === null || phone === undefined) return false;
  const cleanPhone = String(phone).replace(/[\s-]/g, "");
  const phoneRegex = /^\d{10}$/;
  return phoneRegex.test(cleanPhone);
};

/**
 * Validates if a password matches the platform's strength criteria:
 * - Minimum 8 characters in length
 * - Contains at least one uppercase letter
 * - Contains at least one lowercase letter
 * - Contains at least one numeric digit
 * - Contains at least one special character
 *
 * @param {string} password - The password string to validate.
 * @returns {boolean} True if the password is strong.
 * @example
 * isStrongPassword("SecureP@ss123"); // true
 * isStrongPassword("simple"); // false
 */
export const isStrongPassword = (password) => {
  if (typeof password !== "string") return false;
  if (password.length < 8) return false;
  const hasUppercase = /[A-Z]/.test(password);
  const hasLowercase = /[a-z]/.test(password);
  const hasNumber = /\d/.test(password);
  const hasSpecial = /[!@#$%^&*(),.?":{}|<>]/.test(password);
  return hasUppercase && hasLowercase && hasNumber && hasSpecial;
};

/**
 * Checks if two password strings match identically.
 *
 * @param {string} password - The password value.
 * @param {string} confirmPassword - The confirmation password value.
 * @returns {boolean} True if both passwords match exactly.
 * @example
 * passwordsMatch("secret", "secret"); // true
 * passwordsMatch("secret", "secret2"); // false
 */
export const passwordsMatch = (password, confirmPassword) => {
  return password === confirmPassword;
};

/**
 * Validates if the supplied OTP is exactly a 6-digit numeric sequence.
 * Supports string or number types.
 *
 * @param {string|number} otp - The OTP to validate.
 * @returns {boolean} True if valid 6-digit OTP.
 * @example
 * isValidOTP("123456"); // true
 * isValidOTP(987654); // true
 * isValidOTP("123a56"); // false
 */
export const isValidOTP = (otp) => {
  if (otp === null || otp === undefined) return false;
  const cleanOTP = String(otp).trim();
  const otpRegex = /^\d{6}$/;
  return otpRegex.test(cleanOTP);
};

/**
 * Validates if the supplied name is valid.
 * Allows letters (including international characters), spaces, hyphens, and apostrophes.
 * Minimum length constraint: 2.
 *
 * @param {string} name - The name to validate.
 * @returns {boolean} True if the name is valid.
 * @example
 * isValidName("O'Connor"); // true
 * isValidName("Jean-Luc"); // true
 * isValidName("J"); // false
 */
export const isValidName = (name) => {
  if (typeof name !== "string") return false;
  const trimmed = name.trim();
  if (trimmed.length < 2) return false;
  const nameRegex = /^[a-zA-Z\s\-\u00C0-\u017F']+$/;
  return nameRegex.test(trimmed);
};

/**
 * Checks if the supplied value is a positive numeric value (> 0).
 *
 * @param {string|number} value - The numeric value to validate.
 * @returns {boolean} True if the value resolves to a positive number.
 * @example
 * isPositiveNumber(42); // true
 * isPositiveNumber("150.5"); // true
 * isPositiveNumber(-5); // false
 */
export const isPositiveNumber = (value) => {
  const num = Number(value);
  return !isNaN(num) && num > 0;
};

/**
 * Checks if the supplied date falls later than today (ignores the current time).
 *
 * @param {string|Date} date - The date to check.
 * @returns {boolean} True if the date is in the future.
 * @example
 * isFutureDate("2030-01-01"); // true
 * isFutureDate("2000-01-01"); // false
 */
export const isFutureDate = (date) => {
  if (!date) return false;
  const dateObj = new Date(date);
  if (isNaN(dateObj.getTime())) return false;
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const targetDate = new Date(dateObj.getFullYear(), dateObj.getMonth(), dateObj.getDate());
  return targetDate.getTime() > today.getTime();
};

/**
 * Checks if the supplied date falls earlier than today (ignores the current time).
 *
 * @param {string|Date} date - The date to check.
 * @returns {boolean} True if the date is in the past.
 * @example
 * isPastDate("2000-01-01"); // true
 * isPastDate("2030-01-01"); // false
 */
export const isPastDate = (date) => {
  if (!date) return false;
  const dateObj = new Date(date);
  if (isNaN(dateObj.getTime())) return false;
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const targetDate = new Date(dateObj.getFullYear(), dateObj.getMonth(), dateObj.getDate());
  return targetDate.getTime() < today.getTime();
};
