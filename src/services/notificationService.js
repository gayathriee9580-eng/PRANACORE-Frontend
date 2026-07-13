import notificationsData from "../data/notificationsData";

/**
 * Service for loading and modifying user notifications.
 */

/**
 * Retrieves all notifications.
 * @returns {Promise<Array>} A promise resolving to the notifications list.
 */
export const getNotifications = () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(notificationsData);
    }, 300);
  });
};

/**
 * Retrieves a notification by its ID.
 * @param {string|number} id - Notification identifier.
 * @returns {Promise<Object|null>} A promise resolving to the matching notification or null.
 */
export const getNotificationById = (id) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const notification = notificationsData.find((n) => String(n.id) === String(id));
      resolve(notification || null);
    }, 300);
  });
};

/**
 * Marks a specific notification as read.
 * @param {string|number} id - Notification ID.
 * @returns {Promise<Object>} A promise resolving to the update status.
 */
export const markAsRead = (id) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({ success: true, id });
    }, 300);
  });
};

/**
 * Marks all notifications as read.
 * @returns {Promise<Object>} A promise resolving to the update status.
 */
export const markAllRead = () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({ success: true });
    }, 300);
  });
};
