import {
  CheckCircleFilled,
  ClockCircleOutlined,
  CloseCircleFilled,
  DollarCircleFilled,
  RollbackOutlined,
  BellFilled,
  CheckOutlined,
  InfoCircleOutlined,
} from "@ant-design/icons";
import React from "react";

// ─── Month abbreviations used by formatDate ───────────────────────────────────
const MONTHS = [
  "Jan", "Feb", "Mar", "Apr", "May", "Jun",
  "Jul", "Aug", "Sep", "Oct", "Nov", "Dec",
];

/**
 * formatDate
 * Converts a date value to "DD MMM YYYY" format.
 * Accepts a Date object, ISO string, or timestamp.
 * Returns "-" for null, undefined, or invalid dates.
 */
export const formatDate = (date) => {
  if (date === null || date === undefined || date === "") return "-";

  const d = new Date(date);
  if (isNaN(d.getTime())) return "-";

  const day   = String(d.getDate()).padStart(2, "0");
  const month = MONTHS[d.getMonth()];
  const year  = d.getFullYear();

  return `${day} ${month} ${year}`;
};

/**
 * formatTime
 * Converts a date value to "HH:mm" (24-hour) format.
 * Accepts a Date object, ISO string, or timestamp.
 * Returns "-" for null, undefined, or invalid values.
 */
export const formatTime = (date) => {
  if (date === null || date === undefined || date === "") return "-";

  const d = new Date(date);
  if (isNaN(d.getTime())) return "-";

  const hours   = String(d.getHours()).padStart(2, "0");
  const minutes = String(d.getMinutes()).padStart(2, "0");

  return `${hours}:${minutes}`;
};

/**
 * formatCurrency
 * Formats a numeric amount as Indian Rupee currency (₹).
 * Uses Intl.NumberFormat for locale-aware comma placement.
 * Returns "-" for null, undefined, or non-numeric values.
 */
export const formatCurrency = (amount) => {
  if (amount === null || amount === undefined || amount === "") return "-";
  if (isNaN(Number(amount))) return "-";

  return new Intl.NumberFormat("en-IN", {
    style:                 "currency",
    currency:              "INR",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(Number(amount));
};

/**
 * statusColor
 * Maps a status string to its corresponding PRANACORE accent color.
 * Case-insensitive. Returns the default muted color for unknown statuses.
 */
export const statusColor = (status) => {
  const map = {
    completed: "#52c41a",
    confirmed: "#0f8a8f",
    pending:   "#faad14",
    cancelled: "#ef4444",
    failed:    "#ef4444",
    refunded:  "#722ed1",
    paid:      "#52c41a",
    unread:    "#1677ff",
    read:      "#94a3b8",
  };

  const key = String(status ?? "").toLowerCase().trim();
  return map[key] ?? "#94a3b8";
};

/**
 * statusIcon
 * Maps a status string to its Ant Design icon React element.
 * The icon is pre-colored using statusColor for consistent theming.
 * Case-insensitive. Returns InfoCircleOutlined for unknown statuses.
 */
export const statusIcon = (status) => {
  const color = statusColor(status);
  const key   = String(status ?? "").toLowerCase().trim();

  const iconMap = {
    completed: CheckCircleFilled,
    confirmed: CheckCircleFilled,
    pending:   ClockCircleOutlined,
    cancelled: CloseCircleFilled,
    failed:    CloseCircleFilled,
    paid:      DollarCircleFilled,
    refunded:  RollbackOutlined,
    unread:    BellFilled,
    read:      CheckOutlined,
  };

  const IconComponent = iconMap[key] ?? InfoCircleOutlined;
  return React.createElement(IconComponent, { style: { color } });
};
