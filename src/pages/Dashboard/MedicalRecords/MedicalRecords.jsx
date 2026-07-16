import React, { useState, useMemo } from "react";
import { Input, Select, Pagination } from "antd";
import {
  SearchOutlined,
  FilterOutlined,
  FileTextOutlined,
  DownloadOutlined,
  EyeOutlined,
  MedicineBoxOutlined,
  ExperimentOutlined,
  SafetyCertificateOutlined,
  AlertOutlined,
  HeartOutlined,
  CameraOutlined,
  CalendarOutlined,
  UserOutlined,
  EnvironmentOutlined,
} from "@ant-design/icons";
import { motion } from "framer-motion";
import medicalRecordsData from "../../../data/medicalRecordsData";
import useSearch from "../../../hooks/useSearch";
import useFilter from "../../../hooks/useFilter";
import useSort from "../../../hooks/useSort";
import usePagination from "../../../hooks/usePagination";
import "./MedicalRecords.css";

const { Option } = Select;

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: (i = 0) => ({
    opacity: 1, y: 0,
    transition: { duration: 0.5, delay: i * 0.07, ease: "easeOut" },
  }),
};

const TYPE_ICONS = {
  Consultation: <MedicineBoxOutlined />,
  "Lab Report": <ExperimentOutlined />,
  Prescription: <FileTextOutlined />,
  Imaging: <CameraOutlined />,
  Vaccination: <SafetyCertificateOutlined />,
  Emergency: <AlertOutlined />,
};

const TYPE_COLORS = {
  Consultation: { color: "#0f8a8f", bg: "rgba(15,138,143,0.08)" },
  "Lab Report": { color: "#6366f1", bg: "rgba(99,102,241,0.08)" },
  Prescription: { color: "#f59e0b", bg: "rgba(245,158,11,0.08)" },
  Imaging: { color: "#8b5cf6", bg: "rgba(139,92,246,0.08)" },
  Vaccination: { color: "#10b981", bg: "rgba(16,185,129,0.08)" },
  Emergency: { color: "#ef4444", bg: "rgba(239,68,68,0.08)" },
};

const STATUS_CONFIG = {
  Completed: { color: "#10b981", bg: "rgba(16,185,129,0.08)" },
  Active: { color: "#0f8a8f", bg: "rgba(15,138,143,0.08)" },
  Pending: { color: "#f59e0b", bg: "rgba(245,158,11,0.08)" },
};

const RECORD_TYPES = ["All Types", "Consultation", "Lab Report", "Prescription", "Imaging", "Vaccination", "Emergency"];
const STATUSES = ["All Statuses", "Completed", "Active", "Pending"];

const MedicalRecords = () => {
  const [search, setSearch] = useState("");
  const [typeFilter, setTypeFilter] = useState("All Types");
  const [statusFilter, setStatus] = useState("All Statuses");
  const [sort, setSort] = useState("newest");

  const SORT_OPTIONS = [
    { value: "newest", label: "Newest" },
    { value: "oldest", label: "Oldest" },
    { value: "doctor", label: "Doctor" },
    { value: "patient", label: "Patient" },
    { value: "status", label: "Status" },
  ];

  const augmentedRecords = useMemo(() => {
    return medicalRecordsData.map(r => ({
      ...r,
      patient: r.id === "MR-2026-003" ? "Emily Doe" : "John Doe",
      department: r.specialization === "Cardiologist" ? "Cardiology" :
        r.specialization === "Neurologist" ? "Neurology" :
          r.specialization === "Pediatrician" ? "Pediatrics" :
            r.specialization === "Orthopedic Surgeon" ? "Orthopedics" :
              r.specialization === "General Physician" ? "General Medicine" :
                r.specialization === "Gynecologist" ? "Gynecology" : "General Medicine"
    }));
  }, []);

  const searchedRecords = useSearch(
    augmentedRecords,
    search,
    ["patient", "id", "diagnosis", "doctor", "department", "type", "status"]
  );

  const filtered = useFilter(searchedRecords, {
    type: typeFilter === "All Types" ? undefined : typeFilter,
    status: statusFilter === "All Statuses" ? undefined : statusFilter,
  });

  const sortConfig = useMemo(() => {
    switch (sort) {
      case "newest": return { key: "date", direction: "desc" };
      case "oldest": return { key: "date", direction: "asc" };
      case "doctor": return { key: "doctor", direction: "asc" };
      case "patient": return { key: "patient", direction: "asc" };
      case "status": return { key: "status", direction: "asc" };
      default: return null;
    }
  }, [sort]);

  const sortedRecords = useSort(filtered, sortConfig);

  const {
    paginatedData,
    currentPage,
    pageSize,
    setPage,
    setPageSize,
  } = usePagination(sortedRecords, 8);

  const stats = [
    { label: "Total Records", value: medicalRecordsData.length, icon: <FileTextOutlined />, color: "#0f8a8f" },
    { label: "Completed", value: medicalRecordsData.filter(r => r.status === "Completed").length, icon: <SafetyCertificateOutlined />, color: "#10b981" },
    { label: "Active", value: medicalRecordsData.filter(r => r.status === "Active").length, icon: <HeartOutlined />, color: "#6366f1" },
    { label: "Lab Reports", value: medicalRecordsData.filter(r => r.type === "Lab Report").length, icon: <ExperimentOutlined />, color: "#f59e0b" },
  ];

  return (
    <>
      <div className="medical-records-page">

        {/* ── Hero ──────────────────────────────────────────── */}
        <motion.div
          className="mr-hero"
          initial={{ opacity: 0, y: -16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="mr-hero-text">
            <div className="mr-hero-badge">Medical Records</div>
            <h1 className="mr-hero-title">Your Complete <span className="teal">Health History</span></h1>
            <p className="mr-hero-sub">Securely access your healthcare history with PRANACORE.</p>
          </div>
          <div className="mr-hero-stats">
            {stats.map((s, i) => (
              <div key={i} className="mr-hero-stat">
                <span className="mr-hero-stat-icon" style={{ color: s.color }}>{s.icon}</span>
                <span className="mr-hero-stat-value">{s.value}</span>
                <span className="mr-hero-stat-label">{s.label}</span>
              </div>
            ))}
          </div>
        </motion.div>

        {/* ── Filters ───────────────────────────────────────── */}
        <motion.div
          className="mr-filters-bar"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4, delay: 0.1 }}
        >
          <div className="mr-filter-left">
            <FilterOutlined className="filter-icon" />
            <span className="filter-label">Filters</span>
          </div>
          <div className="mr-filter-controls">
            <Input
              className="mr-search-input"
              placeholder="Search by ID, diagnosis, doctor..."
              prefix={<SearchOutlined />}
              value={search}
              onChange={e => setSearch(e.target.value)}
              allowClear
            />
            <Select className="mr-select" value={typeFilter} onChange={setTypeFilter}>
              {RECORD_TYPES.map(t => <Option key={t} value={t}>{t}</Option>)}
            </Select>
            <Select className="mr-select" value={statusFilter} onChange={setStatus}>
              {STATUSES.map(s => <Option key={s} value={s}>{s}</Option>)}
            </Select>
            <Select className="mr-select" value={sort} onChange={setSort}>
              {SORT_OPTIONS.map(o => <Option key={o.value} value={o.value}>{o.label}</Option>)}
            </Select>
          </div>
          <span className="mr-results-count">{sortedRecords.length} record{sortedRecords.length !== 1 ? "s" : ""}</span>
        </motion.div>

        {/* ── Record Cards ──────────────────────────────────── */}
        {sortedRecords.length === 0 ? (
          <div className="mr-empty">
            <FileTextOutlined className="mr-empty-icon" />
            <p>No records match your search. Try different filters.</p>
          </div>
        ) : (
          <div className="mr-cards-grid">
            {paginatedData.map((record, i) => {
              const typeStyle = TYPE_COLORS[record.type] || {};
              const statusStyle = STATUS_CONFIG[record.status] || {};
              return (
                <motion.div
                  key={record.id}
                  className="mr-card"
                  custom={i}
                  variants={fadeUp}
                  initial="hidden"
                  animate="visible"
                  whileHover={{ y: -5 }}
                >
                  {/* Card Header */}
                  <div className="mr-card-header">
                    <div className="mr-type-badge" style={{ color: typeStyle.color, background: typeStyle.bg }}>
                      <span className="mr-type-icon">{TYPE_ICONS[record.type]}</span>
                      {record.type}
                    </div>
                    <span className="mr-status-badge" style={{ color: statusStyle.color, background: statusStyle.bg }}>
                      {record.status}
                    </span>
                  </div>

                  {/* Diagnosis */}
                  <div className="mr-card-body">
                    <h3 className="mr-diagnosis">{record.diagnosis}</h3>
                    <div className="mr-id-chip">{record.id}</div>

                    <div className="mr-meta-rows">
                      <div className="mr-meta-item">
                        <UserOutlined /> {record.doctor}
                      </div>
                      <div className="mr-meta-item">
                        <EnvironmentOutlined /> {record.hospital}
                      </div>
                      <div className="mr-meta-item">
                        <CalendarOutlined /> {record.date}
                      </div>
                    </div>
                  </div>

                  {/* Card Actions */}
                  <div className="mr-card-footer">
                    <button className="btn-mr-view">
                      <EyeOutlined /> View Details
                    </button>
                    <button className="btn-mr-download">
                      <DownloadOutlined /> PDF
                    </button>
                  </div>
                </motion.div>
              );
            })}
          </div>
        )}

        {/* ── Pagination ────────────────────────────────────── */}
        {sortedRecords.length > 0 && (
          <div className="mr-pagination">
            <Pagination
              current={currentPage}
              total={sortedRecords.length}
              pageSize={pageSize}
              showSizeChanger
              pageSizeOptions={[8, 12, 16, 24]}
              onChange={(page) => setPage(page)}
              onShowSizeChange={(_, size) => setPageSize(size)}
            />
          </div>
        )}

      </div>
    </>
  );
};

export default MedicalRecords;
