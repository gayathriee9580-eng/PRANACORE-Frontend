import appointmentsData from "../data/appointmentsData";
import paymentsData from "../data/paymentsData";
import notificationsData from "../data/notificationsData";
import medicalRecordsData from "../data/medicalRecordsData";
import doctorsData from "../data/doctorsData";

/**
 * Service for loading a consolidated dashboard summary.
 */

/**
 * Retrieves a summary of key metrics derived from existing mock datasets.
 * @returns {Promise<Object>} A promise resolving to the dashboard summary object.
 */
export const getDashboardSummary = () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        appointments: {
          total: appointmentsData.length,
        },
        payments: {
          total: paymentsData.length,
        },
        notifications: {
          total: notificationsData.length,
          unread: notificationsData.filter((n) => n.status === "Unread").length,
        },
        medicalRecords: {
          total: medicalRecordsData.length,
        },
        doctors: {
          total: doctorsData.length,
        },
      });
    }, 300);
  });
};
