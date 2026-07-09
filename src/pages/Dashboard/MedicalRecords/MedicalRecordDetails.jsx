import React from "react";
import {
  ArrowLeftOutlined,
  DownloadOutlined,
  PrinterOutlined,
  ShareAltOutlined,
  UserOutlined,
  EnvironmentOutlined,
  CalendarOutlined,
  MedicineBoxOutlined,
  ExperimentOutlined,
  FileTextOutlined,
  CheckCircleOutlined,
  ClockCircleOutlined,
  AlertOutlined,
  ArrowRightOutlined,
} from "@ant-design/icons";
import { motion } from "framer-motion";
import { Avatar } from "antd";
import DashboardLayout from "../../../layouts/DashboardLayout/DashboardLayout";
import medicalRecordsData from "../../../data/medicalRecordsData";
import prescriptionsData from "../../../data/prescriptionsData";
import labReportsData from "../../../data/labReportsData";
import "./MedicalRecordDetails.css";

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: (i = 0) => ({
    opacity: 1, y: 0,
    transition: { duration: 0.5, delay: i * 0.1, ease: "easeOut" },
  }),
};

const STATUS_CONFIG = {
  Completed: { color: "#10b981", bg: "rgba(16,185,129,0.08)" },
  Active:    { color: "#0f8a8f", bg: "rgba(15,138,143,0.08)" },
  Pending:   { color: "#f59e0b", bg: "rgba(245,158,11,0.08)" },
};

const LAB_STATUS_CONFIG = {
  Normal:   { color: "#10b981", bg: "rgba(16,185,129,0.08)" },
  Abnormal: { color: "#ef4444", bg: "rgba(239,68,68,0.08)"  },
};

// Use first record as detail view (production: read from route params)
const record = medicalRecordsData[0];
const prescription = record.prescriptionId ? prescriptionsData[record.prescriptionId] : null;
const labReports   = record.labReportIds.map(id => labReportsData[id]).filter(Boolean);

// ── Timeline Steps ─────────────────────────────────────────────────────────
const timelineSteps = [
  { icon: <CalendarOutlined />,     label: "Appointment",    date: "June 18, 2026",  done: true  },
  { icon: <UserOutlined />,         label: "Consultation",   date: "June 20, 2026",  done: true  },
  { icon: <FileTextOutlined />,     label: "Diagnosis",      date: "June 20, 2026",  done: true  },
  { icon: <MedicineBoxOutlined />,  label: "Prescription",   date: "June 20, 2026",  done: true  },
  { icon: <ExperimentOutlined />,   label: "Lab Tests",      date: "June 21, 2026",  done: true  },
  { icon: <CheckCircleOutlined />,  label: "Recovery",       date: "July 18, 2026",  done: false },
];

const MedicalRecordDetails = () => {
  const statusCfg = STATUS_CONFIG[record.status] || {};

  return (
    <DashboardLayout>
      <div className="mrd-page">

        {/* Back */}
        <button className="btn-back">
          <ArrowLeftOutlined /> Back to Medical Records
        </button>

        {/* ── Hero Summary ─────────────────────────────────── */}
        <motion.div
          className="mrd-hero-card"
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55 }}
        >
          <div className="mrd-hero-top">
            <div className="mrd-hero-left">
              <div className="mrd-record-type-icon">
                <FileTextOutlined />
              </div>
              <div>
                <div className="mrd-record-id">{record.id}</div>
                <h1 className="mrd-diagnosis">{record.diagnosis}</h1>
                <div className="mrd-type-tag">{record.type}</div>
              </div>
            </div>
            <span className="mrd-status-badge" style={{ color: statusCfg.color, background: statusCfg.bg }}>
              {record.status}
            </span>
          </div>

          <div className="mrd-info-grid">
            {[
              { icon: <UserOutlined />,        label: "Patient",      value: "John Doe"       },
              { icon: <UserOutlined />,        label: "Doctor",       value: record.doctor     },
              { icon: <EnvironmentOutlined />, label: "Hospital",     value: record.hospital   },
              { icon: <CalendarOutlined />,    label: "Visit Date",   value: record.date       },
              { icon: <CalendarOutlined />,    label: "Follow-up",    value: record.followUp   },
            ].map((item) => (
              <div key={item.label} className="mrd-info-item">
                <div className="mrd-info-icon">{item.icon}</div>
                <div>
                  <div className="mrd-info-label">{item.label}</div>
                  <div className="mrd-info-value">{item.value}</div>
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* ── Main Grid ────────────────────────────────────── */}
        <div className="mrd-main-grid">

          <div className="mrd-content-col">

            {/* Symptoms */}
            {record.symptoms.length > 0 && (
              <motion.div className="mrd-section-card" custom={0} variants={fadeUp} initial="hidden" animate="visible">
                <div className="mrd-section-title">
                  <AlertOutlined className="mrd-section-icon" /> Symptoms
                </div>
                <div className="symptoms-chips">
                  {record.symptoms.map((s, i) => (
                    <span key={i} className="symptom-chip">{s}</span>
                  ))}
                </div>
              </motion.div>
            )}

            {/* Doctor Notes */}
            <motion.div className="mrd-section-card" custom={1} variants={fadeUp} initial="hidden" animate="visible">
              <div className="mrd-section-title">
                <UserOutlined className="mrd-section-icon" /> Doctor's Notes
              </div>
              <div className="mrd-notes-box">
                <p>{record.notes}</p>
              </div>
            </motion.div>

            {/* Treatment Plan */}
            <motion.div className="mrd-section-card" custom={2} variants={fadeUp} initial="hidden" animate="visible">
              <div className="mrd-section-title">
                <MedicineBoxOutlined className="mrd-section-icon" /> Treatment Plan
              </div>
              <div className="mrd-treatment-box">
                <p>{record.treatmentPlan}</p>
              </div>
            </motion.div>

            {/* Prescription */}
            {prescription && (
              <motion.div className="mrd-section-card" custom={3} variants={fadeUp} initial="hidden" animate="visible">
                <div className="mrd-section-header-row">
                  <div className="mrd-section-title">
                    <FileTextOutlined className="mrd-section-icon" /> Prescription
                  </div>
                  <div className="rx-meta">
                    <span>Issued: {prescription.issuedDate}</span>
                    <span>Valid Until: {prescription.validUntil}</span>
                  </div>
                </div>
                <div className="medicines-grid">
                  {prescription.medicines.map((med) => (
                    <div key={med.id} className="medicine-card">
                      <div className="med-header">
                        <div className="med-name">{med.name}</div>
                        <div className="med-dosage">{med.dosage}</div>
                      </div>
                      <div className="med-rows">
                        <div className="med-row"><span className="med-row-label">Frequency</span><span>{med.frequency}</span></div>
                        <div className="med-row"><span className="med-row-label">Duration</span><span>{med.duration}</span></div>
                        <div className="med-row"><span className="med-row-label">Timing</span><span>{med.timing}</span></div>
                        <div className="med-row"><span className="med-row-label">Food</span><span>{med.withFood}</span></div>
                      </div>
                      <div className="med-purpose">{med.purpose}</div>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}

            {/* Lab Reports */}
            {labReports.length > 0 && (
              <motion.div className="mrd-section-card" custom={4} variants={fadeUp} initial="hidden" animate="visible">
                <div className="mrd-section-title">
                  <ExperimentOutlined className="mrd-section-icon" /> Lab Reports
                </div>
                <div className="lab-reports-list">
                  {labReports.map((report) => {
                    const labStatus = LAB_STATUS_CONFIG[report.status] || {};
                    return (
                      <div key={report.id} className="lab-report-card">
                        <div className="lab-card-left">
                          <div className="lab-report-icon"><ExperimentOutlined /></div>
                          <div>
                            <div className="lab-report-name">{report.name}</div>
                            <div className="lab-report-meta">
                              {report.type} · {report.lab} · {report.date}
                            </div>
                            {report.summary && <div className="lab-report-summary">{report.summary}</div>}
                            {report.results.length > 0 && (
                              <div className="lab-results-table">
                                {report.results.map((row, ri) => {
                                  const rowStatus = row.status === "High" ? { color: "#ef4444" } : row.status === "Low" ? { color: "#f59e0b" } : { color: "#10b981" };
                                  return (
                                    <div key={ri} className="lab-result-row">
                                      <span className="lab-param">{row.parameter}</span>
                                      <span className="lab-value" style={{ color: rowStatus.color }}>{row.value}</span>
                                      <span className="lab-range">{row.range}</span>
                                    </div>
                                  );
                                })}
                              </div>
                            )}
                          </div>
                        </div>
                        <div className="lab-card-right">
                          <span className="lab-status-badge" style={{ color: labStatus.color, background: labStatus.bg }}>
                            {report.status}
                          </span>
                          <button className="btn-lab-download"><DownloadOutlined /></button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </motion.div>
            )}

            {/* Timeline */}
            <motion.div className="mrd-section-card" custom={5} variants={fadeUp} initial="hidden" animate="visible">
              <div className="mrd-section-title">
                <ClockCircleOutlined className="mrd-section-icon" /> Healthcare Timeline
              </div>
              <div className="mrd-timeline">
                {timelineSteps.map((step, i) => (
                  <motion.div
                    key={i}
                    className={`mrd-timeline-step ${step.done ? "done" : "pending"}`}
                    custom={i}
                    variants={fadeUp}
                    initial="hidden"
                    animate="visible"
                  >
                    <div className="mrd-tl-icon-col">
                      <div className="mrd-tl-icon-wrap">{step.icon}</div>
                      {i < timelineSteps.length - 1 && <div className="mrd-tl-line" />}
                    </div>
                    <div className="mrd-tl-body">
                      <div className="mrd-tl-label">{step.label}</div>
                      <div className="mrd-tl-date">{step.date}</div>
                    </div>
                    {step.done
                      ? <CheckCircleOutlined className="mrd-tl-check" />
                      : <ClockCircleOutlined className="mrd-tl-pending-icon" />
                    }
                  </motion.div>
                ))}
              </div>
            </motion.div>

          </div>

          {/* ── Sidebar ────────────────────────────────────── */}
          <aside className="mrd-sidebar">

            {/* Follow-up Card */}
            <motion.div className="mrd-sidebar-card" custom={0} variants={fadeUp} initial="hidden" animate="visible">
              <div className="mrd-sidebar-title">Follow-up Appointment</div>
              <div className="followup-date">
                <CalendarOutlined className="followup-icon" />
                <span>{record.followUp}</span>
              </div>
              <button className="btn-book-followup">
                Book Follow-up <ArrowRightOutlined />
              </button>
            </motion.div>

            {/* Attachments */}
            <motion.div className="mrd-sidebar-card" custom={1} variants={fadeUp} initial="hidden" animate="visible">
              <div className="mrd-sidebar-title">Attachments</div>
              <div className="attachments-list">
                {[
                  { name: "Visit_Summary.pdf",   size: "145 KB" },
                  { name: "Prescription_RX.pdf", size: "82 KB"  },
                  { name: "Lab_Report_CBC.pdf",  size: "210 KB" },
                ].map((att, i) => (
                  <div key={i} className="attachment-item">
                    <FileTextOutlined className="attachment-icon" />
                    <div className="attachment-info">
                      <div className="attachment-name">{att.name}</div>
                      <div className="attachment-size">{att.size}</div>
                    </div>
                    <button className="btn-att-download"><DownloadOutlined /></button>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Bottom Actions */}
            <motion.div className="mrd-bottom-actions" custom={2} variants={fadeUp} initial="hidden" animate="visible">
              <button className="btn-action primary-action">
                <DownloadOutlined /> Download PDF
              </button>
              <button className="btn-action secondary-action">
                <PrinterOutlined /> Print Record
              </button>
              <button className="btn-action secondary-action">
                <ShareAltOutlined /> Share Record
              </button>
            </motion.div>

          </aside>
        </div>

      </div>
    </DashboardLayout>
  );
};

export default MedicalRecordDetails;
