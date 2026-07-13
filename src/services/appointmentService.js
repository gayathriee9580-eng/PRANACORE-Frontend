import appointmentsData from "../data/appointmentsData";

/**
 * Service for loading and booking appointments.
 */

/**
 * Retrieves all appointments.
 * @returns {Promise<Array>} A promise resolving to the appointments list.
 */
export const getAppointments = () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(appointmentsData);
    }, 300);
  });
};

/**
 * Retrieves a specific appointment by its ID.
 * @param {string|number} id - Appointment identifier.
 * @returns {Promise<Object|null>} A promise resolving to the matching appointment or null.
 */
export const getAppointmentById = (id) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const appointment = appointmentsData.find((a) => String(a.id) === String(id));
      resolve(appointment || null);
    }, 300);
  });
};

/**
 * Books a new appointment with the provided information.
 * @param {Object} appointmentInfo - Booking information.
 * @returns {Promise<Object>} A promise resolving to book result status and context.
 */
export const bookAppointment = (appointmentInfo) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({ success: true, appointment: appointmentInfo });
    }, 300);
  });
};

/**
 * Cancels an existing appointment.
 * @param {string|number} id - Appointment ID.
 * @returns {Promise<Object>} A promise resolving to the cancellation result.
 */
export const cancelAppointment = (id) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({ success: true, id });
    }, 300);
  });
};
