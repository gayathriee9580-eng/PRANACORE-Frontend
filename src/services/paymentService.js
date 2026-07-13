import paymentsData from "../data/paymentsData";
import invoicesData from "../data/invoicesData";

/**
 * Service for loading payments and invoices.
 */

/**
 * Retrieves all payments.
 * @returns {Promise<Array>} A promise resolving to the payments list.
 */
export const getPayments = () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(paymentsData);
    }, 300);
  });
};

/**
 * Retrieves a payment record by its ID.
 * @param {string|number} id - Payment identifier.
 * @returns {Promise<Object|null>} A promise resolving to the matching payment record or null.
 */
export const getPaymentById = (id) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const payment = paymentsData.find((p) => String(p.id) === String(id));
      resolve(payment || null);
    }, 300);
  });
};

/**
 * Retrieves all invoices.
 * @returns {Promise<Array>} A promise resolving to the invoices list.
 */
export const getInvoices = () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(invoicesData);
    }, 300);
  });
};

/**
 * Retrieves an invoice record by its ID.
 * @param {string|number} id - Invoice identifier.
 * @returns {Promise<Object|null>} A promise resolving to the matching invoice record or null.
 */
export const getInvoiceById = (id) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const invoice = invoicesData.find((i) => String(i.id) === String(id));
      resolve(invoice || null);
    }, 300);
  });
};
