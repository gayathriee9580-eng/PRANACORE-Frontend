import React from "react";
import { Button, Tag, Divider, QRCode } from "antd";
import {
  ArrowLeftOutlined,
  PrinterOutlined,
  DownloadOutlined,
  ShareAltOutlined,
  UserOutlined,
  CalendarOutlined,
  EnvironmentOutlined,
  FileTextOutlined,
  CheckCircleOutlined,
} from "@ant-design/icons";
import { motion } from "framer-motion";
import DashboardLayout from "../../../layouts/DashboardLayout/DashboardLayout";
import invoicesData from "../../../data/invoicesData";
import "./InvoiceDetails.css";

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: "easeOut" } }
};

const statusColors = {
  Paid: { color: "#10b981", bg: "rgba(16,185,129,0.08)", label: "PAID" },
  Unpaid: { color: "#0f8a8f", bg: "rgba(15,138,143,0.08)", label: "UNPAID" },
  Overdue: { color: "#ef4444", bg: "rgba(239,68,68,0.08)", label: "OVERDUE" }
};

const InvoiceDetails = () => {
  // Use first invoice as the default detailed view
  const invoice = invoicesData[0];
  const statusCfg = statusColors[invoice.status] || {};

  return (
    <DashboardLayout>
      <div className="invoice-detailed-view-page">
        {/* Back Link */}
        <button className="btn-back">
          <ArrowLeftOutlined /> Back to Invoices
        </button>

        <div className="id-detailed-grid">
          {/* Main Printable Billing Sheet */}
          <motion.div
            className="id-billing-sheet-column"
            variants={fadeUp}
            initial="hidden"
            animate="visible"
          >
            <div className="billing-sheet-card">
              {/* Top Colored Bar */}
              <div className="billing-stripe"></div>

              {/* 1. Hospital Information & Invoice Meta */}
              <div className="billing-sheet-header">
                <div className="hospital-details">
                  <div className="brand-logo-text"><span className="brand-teal">PRANA</span>CORE</div>
                  <span className="hosp-name">{invoice.hospital}</span>
                  <span className="hosp-address">100 Medical Plaza, Suite 400</span>
                  <span className="hosp-contact">Tel: +1 (555) 012-3400 | support@pranacore.com</span>
                </div>
                <div className="invoice-basic-meta">
                  <span className="statement-lbl">INVOICE STATEMENT</span>
                  <div className="invoice-id-mono-box">{invoice.id}</div>
                  <Tag
                    color="default"
                    style={{ color: statusCfg.color, background: statusCfg.bg, border: "none" }}
                    className="details-status-pill"
                  >
                    {statusCfg.label}
                  </Tag>
                </div>
              </div>

              <Divider className="sheet-divider" />

              {/* 2 & 3. Patient & Doctor Information */}
              <div className="sheet-stakeholders-row">
                <div className="stakeholder-block patient-info">
                  <span className="section-label">PATIENT INFORMATION</span>
                  <h4 className="stakeholder-name">{invoice.patientName}</h4>
                  <span className="stakeholder-sub">Gender/Age: {invoice.patientGender}, {invoice.patientAge} years</span>
                  <span className="stakeholder-sub">Patient Record ID: PR-90812-J</span>
                </div>

                <div className="stakeholder-block doctor-info">
                  <span className="section-label">CLINICAL PROVIDER</span>
                  <h4 className="stakeholder-name">{invoice.doctor}</h4>
                  <span className="stakeholder-sub">Specialization: {invoice.department} Specialist</span>
                  <span className="stakeholder-sub">Consultation Room: 402-A</span>
                </div>

                <div className="stakeholder-block billing-dates">
                  <span className="section-label">STATEMENT SCHEDULE</span>
                  <div className="date-row-item">
                    <span className="date-lbl">BILL DATE:</span>
                    <span className="date-val">{invoice.issueDate}</span>
                  </div>
                  <div className="date-row-item" style={{ marginTop: 8 }}>
                    <span className="date-lbl">DUE DATE:</span>
                    <span className="date-val date-val-bold">{invoice.dueDate}</span>
                  </div>
                </div>
              </div>

              <Divider className="sheet-divider" />

              {/* 4. Billing Items (Itemized summary table) */}
              <div className="billing-itemized-section">
                <h3 className="section-subtitle">Billed Hospital Treatment Items</h3>
                
                <div className="billing-items-table-header">
                  <span className="th-desc-name">Medical Treatment & Services</span>
                  <span className="th-qty-val">Qty</span>
                  <span className="th-price-val">Unit Cost</span>
                  <span className="th-total-val">Total Amount</span>
                </div>

                <div className="billing-items-rows">
                  {invoice.items.map((item) => (
                    <div key={item.id} className="billing-item-row-cell">
                      <div className="row-desc">
                        <span className="item-name-bold">{item.name}</span>
                      </div>
                      <span className="row-qty-val">{item.quantity}</span>
                      <span className="row-price-val">${item.unitPrice.toFixed(2)}</span>
                      <span className="row-total-val">${item.total.toFixed(2)}</span>
                    </div>
                  ))}
                </div>
              </div>

              <Divider className="sheet-divider" />

              {/* 5, 6, 7 & 8. Financial Summary (Subtotal, Tax, Discount, Grand Total) & 9. QR Code */}
              <div className="billing-summary-footer-row">
                {/* QR Code Placeholder for mobile checkout */}
                <div className="qr-code-placeholder-wrap">
                  <div className="qr-box">
                    <QRCode
                      value={`https://pranacore.health/pay/${invoice.id}`}
                      size={100}
                      bordered={false}
                      color="#0f8a8f"
                    />
                  </div>
                  <div className="qr-desc">
                    <span className="qr-title-text">Scan to Pay Mobile</span>
                    <span className="qr-subtitle-text">Secure mobile patient portal checkout</span>
                  </div>
                </div>

                {/* Subtotals card summary */}
                <div className="invoice-math-totals">
                  <div className="math-row">
                    <span className="math-label">Subtotal</span>
                    <span className="math-val">${invoice.subtotal.toFixed(2)}</span>
                  </div>
                  {invoice.discount > 0 && (
                    <div className="math-row discount">
                      <span className="math-label">Discount Applied</span>
                      <span className="math-val">-${invoice.discount.toFixed(2)}</span>
                    </div>
                  )}
                  <div className="math-row">
                    <span className="math-label">Service Tax (8%)</span>
                    <span className="math-val">${invoice.tax.toFixed(2)}</span>
                  </div>
                  <Divider className="math-inner-divider" />
                  <div className="math-row grand-total">
                    <span className="math-label">Grand Total Billed</span>
                    <span className="math-val-bold">${invoice.total.toFixed(2)}</span>
                  </div>
                </div>
              </div>

              {/* Secure guarantee bottom banner */}
              <div className="billing-guarantee-row">
                <CheckCircleOutlined className="guarantee-check" />
                <span>Verified PRANACORE digital billing document. Autogenerated securely.</span>
              </div>
            </div>
          </motion.div>

          {/* Right Action Sidebar */}
          <div className="id-sidebar-action-col">
            <motion.div
              className="sidebar-actions-card-panel"
              variants={fadeUp}
              initial="hidden"
              animate="visible"
            >
              <h3 className="sidebar-card-title">Statement Options</h3>
              <div className="sidebar-action-stack">
                <Button type="primary" icon={<DownloadOutlined />} className="btn-sidebar-option primary-teal">
                  Download Statement PDF
                </Button>
                <Button icon={<PrinterOutlined />} className="btn-sidebar-option secondary-outline">
                  Print Invoice Document
                </Button>
                <Button icon={<ShareAltOutlined />} className="btn-sidebar-option secondary-outline">
                  Share Statements
                </Button>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default InvoiceDetails;
