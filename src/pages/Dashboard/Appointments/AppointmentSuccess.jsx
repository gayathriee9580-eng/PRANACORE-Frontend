import React from "react";
import {
  CheckCircleFilled,
  DownloadOutlined,
  AppstoreOutlined,
  CalendarOutlined,
  UserOutlined,
  ClockCircleOutlined,
  EnvironmentOutlined,
} from "@ant-design/icons";
import { motion } from "framer-motion";
import DashboardLayout from "../../../layouts/DashboardLayout/DashboardLayout";
import "./AppointmentSuccess.css";

const AppointmentSuccess = () => {
  const appointmentId = "APT-" + Math.floor(10000 + Math.random() * 90000);

  const details = [
    { icon: <UserOutlined />,        label: "Doctor",     value: "Dr. Sarah Mitchell"      },
    { icon: <CalendarOutlined />,    label: "Date",       value: "July 5, 2026"            },
    { icon: <ClockCircleOutlined />, label: "Time",       value: "10:00 AM"                },
    { icon: <EnvironmentOutlined />, label: "Hospital",   value: "PRANACORE City Hospital" },
  ];

  return (
    <DashboardLayout>
      <div className="appt-success-page">
        <motion.div
          className="success-container-card"
          initial={{ opacity: 0, scale: 0.95, y: 30 }}
          animate={{ opacity: 1, scale: 1,    y: 0  }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >

          {/* Success Icon */}
          <motion.div
            className="success-icon-ring"
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1,   opacity: 1 }}
            transition={{ type: "spring", stiffness: 150, damping: 15, delay: 0.1 }}
          >
            <CheckCircleFilled className="success-icon" />
          </motion.div>

          {/* Heading */}
          <motion.div
            className="success-text-block"
            initial={{ opacity: 0, y: -16 }}
            animate={{ opacity: 1, y: 0   }}
            transition={{ duration: 0.5, delay: 0.25 }}
          >
            <div className="success-badge">Booking Confirmed 🎉</div>
            <h1 className="success-heading">
              Appointment <span className="success-highlight">Confirmed!</span>
            </h1>
            <p className="success-subtitle">
              Your appointment has been successfully booked. A confirmation has been sent to your registered email.
            </p>
            <div className="appt-id-chip">
              <span className="appt-id-label">Appointment ID</span>
              <span className="appt-id-value">{appointmentId}</span>
            </div>
          </motion.div>

          {/* Summary Details */}
          <motion.div
            className="success-details-card"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0  }}
            transition={{ duration: 0.5, delay: 0.35 }}
          >
            {details.map((item, i) => (
              <div key={i} className="success-detail-row">
                <div className="success-detail-icon">{item.icon}</div>
                <div className="success-detail-text">
                  <span className="success-detail-label">{item.label}</span>
                  <span className="success-detail-value">{item.value}</span>
                </div>
              </div>
            ))}
          </motion.div>

          {/* Action Buttons */}
          <motion.div
            className="success-actions"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.45 }}
          >
            <button className="btn-download">
              <DownloadOutlined /> Download Receipt
            </button>
            <button className="btn-dashboard">
              <AppstoreOutlined /> Back to Dashboard
            </button>
          </motion.div>

          {/* Footer Note */}
          <motion.p
            className="success-note"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.55 }}
          >
            Need to make changes? Visit <span className="note-link">My Appointments</span> anytime.
          </motion.p>

        </motion.div>
      </div>
    </DashboardLayout>
  );
};

export default AppointmentSuccess;
