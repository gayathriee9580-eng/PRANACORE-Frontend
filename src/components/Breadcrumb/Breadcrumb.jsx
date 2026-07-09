import React from "react";
import { useLocation, Link } from "react-router-dom";
import { Breadcrumb as AntBreadcrumb } from "antd";
import { motion } from "framer-motion";
import "./Breadcrumb.css";

// ─── Route label mapping ────────────────────────────────────────────────────
const ROUTE_LABELS = {
  dashboard: "Dashboard",
  appointments: "Appointments",
  book: "Book Appointment",
  doctors: "Doctors",
  departments: "Departments",
  "medical-records": "Medical Records",
  payments: "Payments",
  invoices: "Invoices",
  notifications: "Notifications",
  profile: "Profile",
  settings: "Settings",
};

// ─── Detail label mapping (when a segment is a dynamic ID) ──────────────────
const DETAIL_LABELS = {
  doctors: "Doctor Details",
  appointments: "Appointment Details",
  "medical-records": "Medical Record Details",
  departments: "Department Details",
  payments: "Payment Details",
  invoices: "Invoice Details",
  notifications: "Notification Details",
};

const isNumericOrId = (segment) => /^\d+$/.test(segment) || /^[a-f0-9-]{8,}$/i.test(segment);

// ─── Animation variants ──────────────────────────────────────────────────────
const variants = {
  hidden: { opacity: 0, y: 10 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.3 } },
};

// ─── Component ───────────────────────────────────────────────────────────────
const Breadcrumb = () => {
  const { pathname } = useLocation();

  const segments = pathname.split("/").filter(Boolean);

  const items = segments.reduce((acc, segment, index) => {
    const isLast = index === segments.length - 1;
    const isDynamic = isNumericOrId(segment);

    if (isDynamic) {
      // Resolve detail label based on the previous segment
      const parentSegment = segments[index - 1] ?? "";
      const label = DETAIL_LABELS[parentSegment] ?? "Details";
      acc.push({
        key: `detail-${index}`,
        title: <span className={isLast ? "bc-item bc-item--active" : "bc-item"}>{label}</span>,
      });
    } else {
      const label = ROUTE_LABELS[segment] ?? segment.charAt(0).toUpperCase() + segment.slice(1);
      const path = "/" + segments.slice(0, index + 1).join("/");

      acc.push({
        key: path,
        title: isLast ? (
          <span className="bc-item bc-item--active">{label}</span>
        ) : (
          <Link to={path} className="bc-item bc-item--link">
            {label}
          </Link>
        ),
      });
    }

    return acc;
  }, []);

  if (items.length === 0) return null;

  return (
    <motion.div
      className="bc-wrapper"
      initial="hidden"
      animate="visible"
      variants={variants}
    >
      <AntBreadcrumb items={items} className="bc-root" />
    </motion.div>
  );
};

export default Breadcrumb;
