/**
 * Centralized global constants for the PRANACORE Healthcare Platform.
 * All objects and nested structures are frozen to prevent mutations.
 */

/**
 * Route paths for client-side navigation.
 * @type {Readonly<{
 *   HOME: string,
 *   LOGIN: string,
 *   SIGNUP: string,
 *   FORGOT_PASSWORD: string,
 *   OTP_VERIFICATION: string,
 *   RESET_PASSWORD: string,
 *   RESET_SUCCESS: string,
 *   DASHBOARD: string,
 *   DASHBOARD_APPOINTMENTS: string,
 *   DASHBOARD_DOCTORS: string,
 *   DASHBOARD_DEPARTMENTS: string,
 *   DASHBOARD_MEDICAL_RECORDS: string,
 *   DASHBOARD_PAYMENTS: string,
 *   DASHBOARD_INVOICES: string,
 *   DASHBOARD_NOTIFICATIONS: string,
 *   DASHBOARD_PROFILE: string,
 *   DASHBOARD_SETTINGS: string
 * }>}
 */
export const ROUTES = Object.freeze({
  HOME: "/",
  LOGIN: "/login",
  SIGNUP: "/signup",
  FORGOT_PASSWORD: "/forgot-password",
  OTP_VERIFICATION: "/otp-verification",
  RESET_PASSWORD: "/reset-password",
  RESET_SUCCESS: "/reset-success",
  DASHBOARD: "/dashboard",
  DASHBOARD_APPOINTMENTS: "/dashboard/appointments",
  DASHBOARD_DOCTORS: "/dashboard/doctors",
  DASHBOARD_DEPARTMENTS: "/dashboard/departments",
  DASHBOARD_MEDICAL_RECORDS: "/dashboard/medical-records",
  DASHBOARD_PAYMENTS: "/dashboard/payments",
  DASHBOARD_INVOICES: "/dashboard/invoices",
  DASHBOARD_NOTIFICATIONS: "/dashboard/notifications",
  DASHBOARD_PROFILE: "/dashboard/profile",
  DASHBOARD_SETTINGS: "/dashboard/settings",
});

/**
 * Storage keys for persisting authentication, theme, and localization in local storage.
 * @type {Readonly<{
 *   TOKEN: string,
 *   USER: string,
 *   THEME: string,
 *   LANGUAGE: string
 * }>}
 */
export const STORAGE_KEYS = Object.freeze({
  TOKEN: "pranacore_token",
  USER: "pranacore_user",
  THEME: "pranacore_theme",
  LANGUAGE: "pranacore_language",
});

/**
 * Status values used across records, operations, and payments.
 * @type {Readonly<{
 *   ACTIVE: string,
 *   INACTIVE: string,
 *   PENDING: string,
 *   COMPLETED: string,
 *   CANCELLED: string,
 *   FAILED: string,
 *   SUCCESS: string,
 *   PAID: string,
 *   UNPAID: string,
 *   REFUNDED: string
 * }>}
 */
export const STATUS = Object.freeze({
  ACTIVE: "ACTIVE",
  INACTIVE: "INACTIVE",
  PENDING: "PENDING",
  COMPLETED: "COMPLETED",
  CANCELLED: "CANCELLED",
  FAILED: "FAILED",
  SUCCESS: "SUCCESS",
  PAID: "PAID",
  UNPAID: "UNPAID",
  REFUNDED: "REFUNDED",
});

/**
 * User authorization and authentication roles.
 * @type {Readonly<{
 *   PATIENT: string,
 *   DOCTOR: string,
 *   ADMIN: string,
 *   RECEPTIONIST: string
 * }>}
 */
export const USER_ROLES = Object.freeze({
  PATIENT: "PATIENT",
  DOCTOR: "DOCTOR",
  ADMIN: "ADMIN",
  RECEPTIONIST: "RECEPTIONIST",
});

/**
 * Pagination settings and page size array configurations.
 * @type {Readonly<{
 *   DEFAULT_PAGE: number,
 *   DEFAULT_PAGE_SIZE: number,
 *   PAGE_SIZE_OPTIONS: ReadonlyArray<number>
 * }>}
 */
export const PAGINATION = Object.freeze({
  DEFAULT_PAGE: 1,
  DEFAULT_PAGE_SIZE: 10,
  PAGE_SIZE_OPTIONS: Object.freeze([5, 10, 20, 50]),
});

/**
 * Date and time format templates.
 * @type {Readonly<{
 *   SHORT: string,
 *   LONG: string,
 *   TIME: string,
 *   DATE_TIME: string
 * }>}
 */
export const DATE_FORMATS = Object.freeze({
  SHORT: "MM/DD/YYYY",
  LONG: "MMMM DD, YYYY",
  TIME: "hh:mm A",
  DATE_TIME: "MM/DD/YYYY hh:mm A",
});

/**
 * Theme color codes matching the PRANACORE design system.
 * @type {Readonly<{
 *   PRIMARY: string,
 *   SUCCESS: string,
 *   WARNING: string,
 *   ERROR: string,
 *   INFO: string
 * }>}
 */
export const COLORS = Object.freeze({
  PRIMARY: "#0f8a8f",
  SUCCESS: "#10b981",
  WARNING: "#f59e0b",
  ERROR: "#ef4444",
  INFO: "#0f8a8f",
});

/**
 * Frontend-only placeholder API endpoint URLs.
 * @type {Readonly<{
 *   SUBSCRIBE: string,
 *   LOGIN: string,
 *   SIGNUP: string,
 *   DOCTORS: string,
 *   APPOINTMENTS: string,
 *   PAYMENTS: string,
 *   NOTIFICATIONS: string,
 *   MEDICAL_RECORDS: string
 * }>}
 */
export const API_ENDPOINTS = Object.freeze({
  SUBSCRIBE: "/api/subscribe",
  LOGIN: "/api/auth/login",
  SIGNUP: "/api/auth/signup",
  DOCTORS: "/api/doctors",
  APPOINTMENTS: "/api/appointments",
  PAYMENTS: "/api/payments",
  NOTIFICATIONS: "/api/notifications",
  MEDICAL_RECORDS: "/api/medical-records",
});
