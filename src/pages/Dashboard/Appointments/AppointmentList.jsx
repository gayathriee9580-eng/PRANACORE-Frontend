import React, { useState } from "react";
import { Table, Input, Select, DatePicker, Tag, Avatar, Tooltip, Pagination } from "antd";
import {
  SearchOutlined,
  UserOutlined,
  EyeOutlined,
  CalendarOutlined,
  CloseCircleOutlined,
  FilterOutlined,
  PlusOutlined,
} from "@ant-design/icons";
import { motion } from "framer-motion";
import appointmentsMockData from "../../../data/appointmentsMockData";
import useSearch from "../../../hooks/useSearch";
import useFilter from "../../../hooks/useFilter";
import usePagination from "../../../hooks/usePagination";
import "./AppointmentList.css";

const { Option } = Select;

const statusConfig = {
  Confirmed: { color: "#0f8a8f", bg: "rgba(15,138,143,0.08)" },
  Completed: { color: "#10b981", bg: "rgba(16,185,129,0.08)" },
  Pending: { color: "#f59e0b", bg: "rgba(245,158,11,0.08)" },
  Cancelled: { color: "#ef4444", bg: "rgba(239,68,68,0.08)" },
};

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: (i = 0) => ({
    opacity: 1, y: 0,
    transition: { duration: 0.5, delay: i * 0.08, ease: "easeOut" },
  }),
};

const AppointmentList = () => {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [deptFilter, setDeptFilter] = useState("All");

  const departments = ["All", ...new Set(appointmentsMockData.map(a => a.department))];
  const statuses = ["All", "Confirmed", "Completed", "Pending", "Cancelled"];

  const searchedAppointments = useSearch(
    appointmentsMockData,
    search,
    ["patient", "doctor", "department", "id", "hospital", "status"]
  );

  const filtered = useFilter(searchedAppointments, {
    status: statusFilter,
    department: deptFilter,
  });

  const {
    paginatedData,
    currentPage,
    pageSize,
    setPage,
    setPageSize,
  } = usePagination(filtered, 10);

  const columns = [
    {
      title: "Doctor",
      dataIndex: "doctor",
      key: "doctor",
      render: (text, record) => (
        <div className="al-doctor-cell">
          <Avatar size={36} icon={<UserOutlined />} className="al-avatar" />
          <div>
            <div className="al-doctor-name">{text}</div>
            <div className="al-spec">{record.specialization}</div>
          </div>
        </div>
      ),
    },
    {
      title: "Department",
      dataIndex: "department",
      key: "department",
      render: (text) => <span className="al-dept-tag">{text}</span>,
    },
    {
      title: "Hospital",
      dataIndex: "hospital",
      key: "hospital",
      responsive: ["lg"],
      render: (text) => <span className="al-hospital">{text}</span>,
    },
    {
      title: "Date & Time",
      key: "datetime",
      render: (_, r) => (
        <div className="al-datetime">
          <span className="al-date">{r.date}</span>
          <span className="al-time">{r.time}</span>
        </div>
      ),
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (status) => {
        const cfg = statusConfig[status] || {};
        return (
          <span className="al-status-badge" style={{ color: cfg.color, background: cfg.bg }}>
            {status}
          </span>
        );
      },
    },
    {
      title: "Actions",
      key: "actions",
      render: (_, record) => (
        <div className="al-actions">
          <Tooltip title="View Details">
            <button className="al-action-btn view">
              <EyeOutlined />
            </button>
          </Tooltip>
          <Tooltip title="Reschedule">
            <button className="al-action-btn reschedule" disabled={record.status === "Cancelled" || record.status === "Completed"}>
              <CalendarOutlined />
            </button>
          </Tooltip>
          <Tooltip title="Cancel">
            <button className="al-action-btn cancel" disabled={record.status === "Cancelled" || record.status === "Completed"}>
              <CloseCircleOutlined />
            </button>
          </Tooltip>
        </div>
      ),
    },
  ];

  return (
    <>
      <div className="appointment-list-page">

        {/* ── Page Header ─── */}
        <motion.div className="page-header" variants={fadeUp} initial="hidden" animate="visible">
          <div className="page-header-text">
            <h1 className="page-title">My Appointments</h1>
            <p className="page-subtitle">Track, manage, and schedule all your healthcare appointments.</p>
          </div>
          <button className="btn-book-new">
            <PlusOutlined /> Book New Appointment
          </button>
        </motion.div>

        {/* ── Filters ─── */}
        <motion.div className="al-filters-card" custom={1} variants={fadeUp} initial="hidden" animate="visible">
          <div className="al-filter-left">
            <FilterOutlined className="filter-icon" />
            <span className="filter-label">Filters</span>
          </div>
          <div className="al-filter-controls">
            <Input
              className="al-search-input"
              placeholder="Search by doctor, department or ID..."
              prefix={<SearchOutlined />}
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              allowClear
            />
            <Select
              className="al-select"
              value={statusFilter}
              onChange={setStatusFilter}
              suffixIcon={null}
            >
              {statuses.map((s) => <Option key={s} value={s}>{s === "All" ? "All Statuses" : s}</Option>)}
            </Select>
            <Select
              className="al-select"
              value={deptFilter}
              onChange={setDeptFilter}
              suffixIcon={null}
            >
              {departments.map((d) => <Option key={d} value={d}>{d === "All" ? "All Departments" : d}</Option>)}
            </Select>
          </div>
        </motion.div>

        {/* ── Table ─── */}
        <motion.div className="al-table-card" custom={2} variants={fadeUp} initial="hidden" animate="visible">
          <div className="al-table-header">
            <span className="al-results-count">{filtered.length} appointment{filtered.length !== 1 ? "s" : ""} found</span>
          </div>
          <Table
            dataSource={paginatedData}
            columns={columns}
            pagination={false}
            className="al-table"
            scroll={{ x: 700 }}
            rowKey="key"
          />
          {filtered.length > 0 && (
            <div style={{ display: "flex", justifyContent: "center", marginTop: "24px" }}>
              <Pagination
                current={currentPage}
                total={filtered.length}
                pageSize={pageSize}
                showSizeChanger
                pageSizeOptions={[10, 20, 30, 50]}
                onChange={(page) => setPage(page)}
                onShowSizeChange={(_, size) => setPageSize(size)}
              />
            </div>
          )}
        </motion.div>

      </div>
    </>
  );
};

export default AppointmentList;
