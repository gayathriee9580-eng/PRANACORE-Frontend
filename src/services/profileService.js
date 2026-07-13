import profileData from "../data/profileData";
import insuranceData from "../data/insuranceData";
import emergencyContactsData from "../data/emergencyContactsData";

/**
 * Service for loading and updating user profile data.
 */

/**
 * Retrieves the user profile, insurance, and emergency contacts.
 * @returns {Promise<Object>} A promise resolving to the combined profile data.
 */
export const getProfile = () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        profile: profileData,
        insurance: insuranceData,
        emergencyContacts: emergencyContactsData,
      });
    }, 300);
  });
};

/**
 * Simulates updating the user profile with the provided fields.
 * @param {Object} updates - The profile fields to update.
 * @returns {Promise<Object>} A promise resolving to the update result.
 */
export const updateProfile = (updates) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({ success: true, updates });
    }, 300);
  });
};
