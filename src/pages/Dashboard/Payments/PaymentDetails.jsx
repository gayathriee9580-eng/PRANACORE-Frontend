import React from "react";
import { Button, Tag, Card, Divider } from "antd";
import {
  ArrowLeftOutlined,
  PrinterOutlined,
  DownloadOutlined,
  ShareAltOutlined,
  CheckCircleOutlined,
  UserOutlined,
  CalendarOutlined,
  EnvironmentOutlined,
  CreditCardOutlined,
  QuestionCircleOutlined,
  RightOutlined,
} from "@ant-design/icons";
import { motion } from "framer-motion";
import DashboardLayout from "../../../layouts/DashboardLayout/DashboardLayout";
import paymentsData from "../../../data/paymentsData";
import "./PaymentDetails.css";

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: "easeOut" } }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 }
  }
};

const timelineVariants = {
  hidden: { opacity: 0, x: -10 },
  visible: (i) => ({
    opacity: 1,
    x: 0,
    transition: { delay: i * 0.15, duration: 0.3 }
  })
};

const PaymentDetails = () => {
  // Use first transaction as the default receipt detail
  const tx = paymentsData[0];

  const timelineSteps = [
    { label: "Appointment Booked", time: "June 18, 2026 11:30 AM", active: true },
    { label: "Invoice Generated", time: "June 20, 2026 10:00 AM", active: true },
    { label: "Payment Initiated", time: "June 20, 2026 10:15 AM", active: true },
    { label: "Payment Successful", time: "June 20, 2026 10:18 AM", active: true },
    { label: "Receipt Generated", time: "June 20, 2026 10:19 AM", active: true }
  ];

  return (
    <DashboardLayout>
      <div className="payment-details-wrapper-page">
        {/* Back Link */}
        <button className="btn-back">
          <ArrowLeftOutlined /> Back to Payments
        </button>

        <div className="pd-detailed-grid">
          {/* Main Card */}
          <motion.div
            className="pd-details-card-column"
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
          >
            <motion.div className="receipt-card" variants={fadeUp}>
              {/* Colored Stripe */}
              <div className="stripe-deco"></div>

              {/* Card Header */}
              <div className="receipt-header-top">
                <div className="badge-n-icon">
                  <div className="check-ring">
                    <CheckCircleOutlined />
                  </div>
                  <div>
                    <h2 className="title-receipt">Payment Confirmation</h2>
                    <span className="tx-date-sub">Processed on {tx.date} at {tx.time}</span>
                  </div>
                </div>
                <Tag color="success" className="success-badge-pill">SUCCESSFUL</Tag>
              </div>

              <Divider className="pd-divider" />

              {/* Standard details info */}
              <div className="pd-items-summary-grid">
                <div className="sum-item">
                  <span className="sum-lbl">TRANSACTION ID</span>
                  <span className="sum-val mono-font">{tx.id}</span>
                </div>
                <div className="sum-item">
                  <span className="sum-lbl">APPOINTMENT ID</span>
                  <span className="sum-val">{tx.appointmentId}</span>
                </div>
                <div className="sum-item">
                  <span className="sum-lbl">CLINICAL PROVIDER</span>
                  <span className="sum-val">{tx.doctor}</span>
                </div>
                <div className="sum-item">
                  <span className="sum-lbl">DEPARTMENT</span>
                  <span className="sum-val">{tx.department}</span>
                </div>
                <div className="sum-item">
                  <span className="sum-lbl">HOSPITAL LOCATION</span>
                  <span className="sum-val">{tx.hospital}</span>
                </div>
                <div className="sum-item">
                  <span className="sum-lbl">PAYMENT METHOD</span>
                  <span className="sum-val">{tx.method}</span>
                </div>
              </div>

              <Divider className="pd-divider" />

              {/* Itemized charges listing */}
              <div className="pd-fee-statements">
                <h4 className="pd-section-subtitle">Financial Invoice Breakdown</h4>
                <div className="fee-breakdown-details">
                  <div className="fee-row">
                    <span className="label-text">Treatment & Consultation charges</span>
                    <span className="amount">${tx.amount.toFixed(2)}</span>
                  </div>
                  <div className="fee-row">
                    <span className="label-text">Tax & Service VAT (8%)</span>
                    <span className="amount">${tx.tax.toFixed(2)}</span>
                  </div>
                  {tx.discount > 0 && (
                    <div className="fee-row text-discount">
                      <span className="label-text">Discount Applied</span>
                      <span className="amount">-${tx.discount.toFixed(2)}</span>
                    </div>
                  )}
                  <Divider className="inner-divider" />
                  <div className="fee-row total-bold">
                    <span className="label-text">Grand Total Billed</span>
                    <span className="amount">${tx.grandTotal.toFixed(2)}</span>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Timeline details Card */}
            <motion.div className="pd-timeline-card" variants={fadeUp}>
              <h3 className="card-subtitle">Transaction Timeline Flow</h3>
              <div className="pd-timeline-flow">
                {timelineSteps.map((step, idx) => (
                  <motion.div
                    key={idx}
                    className="timeline-flow-item"
                    custom={idx}
                    variants={timelineVariants}
                  >
                    <div className="node-wrapper-col">
                      <div className="node-marker complete">
                        <CheckCircleOutlined className="check-icon-mini" />
                      </div>
                      {idx < timelineSteps.length - 1 && <div className="vertical-connector-line"></div>}
                    </div>
                    <div className="timeline-step-info">
                      <span className="step-label">{step.label}</span>
                      <span className="step-time">{step.time}</span>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </motion.div>

          {/* Right Sidebar */}
          <motion.div
            className="pd-sidebar-actions-column"
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
          >
            {/* Actions Card */}
            <motion.div className="sidebar-action-card" variants={fadeUp}>
              <h3 className="sidebar-title">Receipt Actions</h3>
              <div className="action-buttons-wrap">
                <Button type="primary" icon={<DownloadOutlined />} className="btn-pd-sidebar primary-teal">
                  Download Receipt PDF
                </Button>
                <Button icon={<PrinterOutlined />} className="btn-pd-sidebar secondary-outline">
                  Print Statement
                </Button>
                <Button icon={<ShareAltOutlined />} className="btn-pd-sidebar secondary-outline">
                  Share Document
                </Button>
              </div>
            </motion.div>

            {/* Need Help Card */}
            <motion.div className="sidebar-help-card" variants={fadeUp}>
              <QuestionCircleOutlined className="help-badge-icon" />
              <h3 className="help-title">Need Help with Billing?</h3>
              <p className="help-desc">If you notice any discrepancies in your itemized invoice statement, please query our billing office.</p>
              <div className="help-contact-info">
                <span>Direct Line: +1 (555) 012-3499</span>
                <span>Hours: Mon - Fri (8AM - 5PM)</span>
              </div>
              <Button type="link" className="btn-help-link">
                Open Support Ticket <RightOutlined />
              </Button>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default PaymentDetails;
