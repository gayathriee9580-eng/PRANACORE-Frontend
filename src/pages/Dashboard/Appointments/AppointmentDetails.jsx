import React from "react";
import { Avatar, Tag } from "antd";
import {
  UserOutlined,
  CalendarOutlined,
  ClockCircleOutlined,
  EnvironmentOutlined,
  MedicineBoxOutlined,
  CreditCardOutlined,
  ArrowLeftOutlined,
  PrinterOutlined,
  MessageOutlined,
  EditOutlined,
} from "@ant-design/icons";
import { motion } from "framer-motion";
import DashboardLayout from "../../../layouts/DashboardLayout/DashboardLayout";
import appointmentsMockData from "../../../data/appointmentsMockData";
import "./AppointmentDetails.css";

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: (i = 0) => ({
    opacity: 1, y: 0,
    transition: { duration: 0.5, delay: i * 0.1, ease: "easeOut" },
  }),
};

const statusConfig = {
  Confirmed: { color: "#0f8a8f",  bg: "rgba(15,138,143,0.08)" },
  Completed: { color: "#10b981",  bg: "rgba(16,185,129,0.08)" },
  Pending:   { color: "#f59e0b",  bg: "rgba(245,158,11,0.08)"  },
  Cancelled: { color: "#ef4444",  bg: "rgba(239,68,68,0.08)"   },
};

const AppointmentDetails = () => {
  // Use first appointment as the detail view (in production, read from route params)
  const appointment = appointmentsMockData[0];
  const statusCfg = statusConfig[appointment.status] || {};

  const infoItems = [
    { icon: <MedicineBoxOutlined />, label: "Department",  value: appointment.department  },
    { icon: <EnvironmentOutlined />, label: "Hospital",    value: appointment.hospital    },
    { icon: <CalendarOutlined />,    label: "Date",        value: appointment.date        },
    { icon: <ClockCircleOutlined />, label: "Time",        value: appointment.time        },
    { icon: <UserOutlined />,        label: "Patient",     value: appointment.patient     },
    { icon: <CreditCardOutlined />,  label: "Fee",         value: appointment.fee         },
  ];

  return (
    <DashboardLayout>
      <div className="appt-details-page">

        {/* Back + Title */}
        <motion.div className="ad-page-header" variants={fadeUp} initial="hidden" animate="visible">
          <button className="btn-back">
            <ArrowLeftOutlined /> Back to Appointments
          </button>
          <div className="ad-title-row">
            <div>
              <h1 className="page-title">Appointment Details</h1>
              <p className="page-subtitle">Appointment ID: <strong>{appointment.id}</strong></p>
            </div>
            <span className="ad-status-badge" style={{ color: statusCfg.color, background: statusCfg.bg }}>
              {appointment.status}
            </span>
          </div>
        </motion.div>

        <div className="ad-grid">

          {/* ── Left: Doctor + Info ─────────────────────────────── */}
          <div className="ad-left-col">

            {/* Doctor Card */}
            <motion.div className="ad-card ad-doctor-card" custom={1} variants={fadeUp} initial="hidden" animate="visible">
              <div className="ad-doctor-inner">
                <Avatar size={80} icon={<UserOutlined />} className="ad-doctor-avatar" />
                <div>
                  <h2 className="ad-doctor-name">{appointment.doctor}</h2>
                  <span className="ad-doctor-spec">{appointment.specialization}</span>
                </div>
              </div>
              <div className="ad-doctor-actions">
                <button className="ad-action-btn primary">
                  <MessageOutlined /> Message Doctor
                </button>
                <button className="ad-action-btn secondary">
                  <EditOutlined /> Reschedule
                </button>
              </div>
            </motion.div>

            {/* Info Grid */}
            <motion.div className="ad-card" custom={2} variants={fadeUp} initial="hidden" animate="visible">
              <div className="ad-card-title">Appointment Info</div>
              <div className="ad-info-grid">
                {infoItems.map((item) => (
                  <div key={item.label} className="ad-info-item">
                    <div className="ad-info-icon">{item.icon}</div>
                    <div>
                      <div className="ad-info-label">{item.label}</div>
                      <div className="ad-info-value">{item.value}</div>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>

          {/* ── Right: Notes + Timeline ──────────────────────────── */}
          <div className="ad-right-col">

            {/* Reason */}
            <motion.div className="ad-card" custom={1} variants={fadeUp} initial="hidden" animate="visible">
              <div className="ad-card-title">Reason for Visit</div>
              <p className="ad-reason-text">{appointment.reason}</p>
            </motion.div>

            {/* Notes */}
            <motion.div className="ad-card" custom={2} variants={fadeUp} initial="hidden" animate="visible">
              <div className="ad-card-title">Doctor's Notes</div>
              <div className="ad-notes-box">
                <p>{appointment.notes}</p>
              </div>
            </motion.div>

            {/* Status Timeline */}
            <motion.div className="ad-card" custom={3} variants={fadeUp} initial="hidden" animate="visible">
              <div className="ad-card-title">Appointment Timeline</div>
              <div className="ad-timeline">
                {[
                  { label: "Appointment Booked",    done: true,  time: "June 20, 2026" },
                  { label: "Appointment Confirmed", done: true,  time: "June 21, 2026" },
                  { label: "Reminder Sent",         done: true,  time: "July 4, 2026"  },
                  { label: "Consultation",          done: false, time: "July 5, 2026"  },
                ].map((step, i) => (
                  <div key={i} className={`timeline-step ${step.done ? "done" : ""}`}>
                    <div className="timeline-dot"></div>
                    <div className="timeline-content">
                      <div className="timeline-label">{step.label}</div>
                      <div className="timeline-time">{step.time}</div>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Print */}
            <motion.div custom={4} variants={fadeUp} initial="hidden" animate="visible">
              <button className="btn-print">
                <PrinterOutlined /> Print / Download Receipt
              </button>
            </motion.div>
          </div>
        </div>

      </div>
    </DashboardLayout>
  );
};

export default AppointmentDetails;
