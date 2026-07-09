import React from "react";
import { Button } from "antd";
import {
  CheckCircleFilled,
  DownloadOutlined,
  AppstoreOutlined,
  CalendarOutlined,
  CreditCardOutlined,
  SafetyCertificateOutlined,
  ArrowRightOutlined,
  FileTextOutlined,
} from "@ant-design/icons";
import { motion } from "framer-motion";
import DashboardLayout from "../../../layouts/DashboardLayout/DashboardLayout";
import "./PaymentSuccess.css";

const successVariants = {
  hidden: { opacity: 0, scale: 0.95, y: 30 },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut", when: "beforeChildren", staggerChildren: 0.1 }
  }
};

const circleVariants = {
  hidden: { scale: 0.3, opacity: 0 },
  visible: { 
    scale: 1, 
    opacity: 1, 
    transition: { type: "spring", stiffness: 180, damping: 14, delay: 0.15 }
  }
};

const itemReveal = {
  hidden: { opacity: 0, y: 15 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: "easeOut" } }
};

const PaymentSuccess = () => {
  const transactionId = "TXN-90281-9201";
  const amountPaid = "$457.60";
  const paymentMethod = "Visa ending in 4242";
  const appointmentId = "APT-1001";
  const today = new Date().toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit"
  });

  return (
    <DashboardLayout>
      <div className="payment-success-wrapper-page">
        <motion.div
          className="success-center-card"
          variants={successVariants}
          initial="hidden"
          animate="visible"
        >
          {/* Top Deco Stripe */}
          <div className="success-stripe-deco"></div>

          {/* Success Check Icon Ring */}
          <motion.div className="success-icon-ring" variants={circleVariants}>
            <CheckCircleFilled className="check-success-icon" />
          </motion.div>

          {/* Header Title Block */}
          <motion.div className="success-header-info" variants={itemReveal}>
            <span className="success-badge">Secure Check-out</span>
            <h1 className="success-title-main">Payment Successful 🎉</h1>
            <p className="success-desc">
              Your hospital payment has been settled successfully. A receipt document is now available in your history.
            </p>
          </motion.div>

          {/* Transaction Metadata Card */}
          <motion.div className="success-metadata-card" variants={itemReveal}>
            <div className="meta-row">
              <span className="meta-lbl">TRANSACTION REF ID</span>
              <span className="meta-val mono-style">{transactionId}</span>
            </div>
            <div className="meta-row">
              <span className="meta-lbl">AMOUNT PAID</span>
              <span className="meta-val amount-val">{amountPaid}</span>
            </div>
            <div className="meta-row">
              <span className="meta-lbl">PAYMENT METHOD</span>
              <span className="meta-val">{paymentMethod}</span>
            </div>
            <div className="meta-row">
              <span className="meta-lbl">APPOINTMENT ID</span>
              <span className="meta-val link-style">{appointmentId}</span>
            </div>
            <div className="meta-row">
              <span className="meta-lbl">TRANSACTION DATE</span>
              <span className="meta-val">{today}</span>
            </div>
          </motion.div>

          {/* Action buttons footer */}
          <motion.div className="success-actions-block" variants={itemReveal}>
            <Button
              type="primary"
              icon={<DownloadOutlined />}
              className="btn-success-payout download-pdf"
            >
              Download Receipt
            </Button>
            <Button
              icon={<AppstoreOutlined />}
              className="btn-success-payout secondary-outline"
            >
              Back to Dashboard
            </Button>
          </motion.div>

          {/* SSL Trust seal */}
          <motion.div className="trust-seal-footer" variants={itemReveal}>
            <SafetyCertificateOutlined className="safety-icon" />
            <span>PRANACORE HIPAA-compliant Secure Transaction</span>
          </motion.div>
        </motion.div>
      </div>
    </DashboardLayout>
  );
};

export default PaymentSuccess;
