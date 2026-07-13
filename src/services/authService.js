/**
 * Authentication service for managing signin, signup, password resets, and OTP.
 * Simulates async API latency.
 */

/**
 * Simulates logging in with user credentials.
 * @param {Object} credentials - User credentials.
 * @returns {Promise<void>}
 */
export const login = (credentials) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve();
    }, 300);
  });
};

/**
 * Simulates signing up a new user.
 * @param {Object} userData - Registration information.
 * @returns {Promise<void>}
 */
export const signup = (userData) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve();
    }, 300);
  });
};

/**
 * Simulates logging out the active user.
 * @returns {Promise<void>}
 */
export const logout = () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve();
    }, 300);
  });
};

/**
 * Simulates triggering forgot password flow.
 * @param {string} email - Email address.
 * @returns {Promise<void>}
 */
export const forgotPassword = (email) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve();
    }, 300);
  });
};

/**
 * Simulates verifying OTP codes.
 * @param {string} email - Email address.
 * @param {string|number} otp - OTP code.
 * @returns {Promise<void>}
 */
export const verifyOTP = (email, otp) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve();
    }, 300);
  });
};

/**
 * Simulates resetting user passwords.
 * @param {string} email - Email address.
 * @param {string} newPassword - New password.
 * @returns {Promise<void>}
 */
export const resetPassword = (email, newPassword) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve();
    }, 300);
  });
};
