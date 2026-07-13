import doctorsData from "../data/doctorsData";

/**
 * Service for loading, searching, and filtering doctor directories.
 */

/**
 * Retrieves all doctor records.
 * @returns {Promise<Array>} A promise resolving to the doctors list.
 */
export const getDoctors = () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(doctorsData);
    }, 300);
  });
};

/**
 * Retrieves a specific doctor record by their ID.
 * @param {string|number} id - Doctor identifier.
 * @returns {Promise<Object|null>} A promise resolving to the matching doctor or null.
 */
export const getDoctorById = (id) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const doctor = doctorsData.find((d) => String(d.id) === String(id));
      resolve(doctor || null);
    }, 300);
  });
};

/**
 * Searches the doctor dataset based on name, specialization, or hospital criteria.
 * @param {string} query - The search text.
 * @returns {Promise<Array>} A promise resolving to matching doctors.
 */
export const searchDoctors = (query) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      if (!query) {
        resolve(doctorsData);
        return;
      }
      const q = query.toLowerCase();
      const filtered = doctorsData.filter(
        (d) =>
          d.name.toLowerCase().includes(q) ||
          d.specialization.toLowerCase().includes(q) ||
          d.hospital.toLowerCase().includes(q)
      );
      resolve(filtered);
    }, 300);
  });
};

/**
 * Filters the doctors list by specialization, gender, availability, and max consultation fee.
 * @param {Object} filters - The filter parameters.
 * @returns {Promise<Array>} A promise resolving to the filtered doctors.
 */
export const filterDoctors = (filters) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      if (!filters) {
        resolve(doctorsData);
        return;
      }
      let filtered = [...doctorsData];
      if (filters.specialization && filters.specialization !== "All" && filters.specialization !== "All Specializations") {
        filtered = filtered.filter((d) => d.specialization === filters.specialization);
      }
      if (filters.gender && filters.gender !== "All") {
        filtered = filtered.filter((d) => d.gender === filters.gender);
      }
      if (filters.availableToday) {
        filtered = filtered.filter((d) => d.availableToday);
      }
      if (filters.maxFee) {
        filtered = filtered.filter((d) => d.fee <= filters.maxFee);
      }
      resolve(filtered);
    }, 300);
  });
};
