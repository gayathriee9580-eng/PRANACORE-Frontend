import medicalRecordsData from "../data/medicalRecordsData";

/**
 * Service for loading medical records.
 */

/**
 * Retrieves all medical records.
 * @returns {Promise<Array>} A promise resolving to the medical records list.
 */
export const getMedicalRecords = () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(medicalRecordsData);
    }, 300);
  });
};

/**
 * Retrieves a specific medical record by its ID.
 * @param {string|number} id - Medical record identifier.
 * @returns {Promise<Object|null>} A promise resolving to the matching record or null.
 */
export const getMedicalRecordById = (id) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const record = medicalRecordsData.find((r) => String(r.id) === String(id));
      resolve(record || null);
    }, 300);
  });
};
