import React, { useState, useMemo } from "react";
import { Table, Input, Select, Tag, Button, Tooltip, DatePicker } from "antd";
import {
  SearchOutlined,
  FilterOutlined,
  DollarOutlined,
  CalendarOutlined,
  CreditCardOutlined,
  EyeOutlined,
  DownloadOutlined,
  CheckCircleOutlined,
  CloseCircleOutlined,
  ClockCircleOutlined,
  UndoOutlined,
  FileTextOutlined,
  DashboardOutlined,
} from "@ant-design/icons";
import { motion } from "framer-motion";
import DashboardLayout from "../../../layouts/DashboardLayout/DashboardLayout";
import paymentsData from "../../../data/paymentsData";
import invoicesData from "../../../data/invoicesData";
import "./Payments.css";

const { Option } = Select;

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.08 }
  }
};

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 100 } }
};

const statusColors = {
  Paid: { color: "#10b981", bg: "rgba(16,185,129,0.08)", icon: <CheckCircleOutlined /> },
  Pending: { color: "#f59e0b", bg: "rgba(245,158,11,0.08)", icon: <ClockCircleOutlined /> },
  Refunded: { color: "#6366f1", bg: "rgba(99,102,241,0.08)", icon: <UndoOutlined /> },
  Failed: { color: "#ef4444", bg: "rgba(239,68,68,0.08)", icon: <CloseCircleOutlined /> }
};

const Payments = () => {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [methodFilter, setMethodFilter] = useState("All");
  const [dateFilter, setDateFilter] = useState(null);

  // Stats calculation
  const stats = useMemo(() => {
    const totalPaymentsAmt = paymentsData
      .filter((p) => p.status === "Paid")
      .reduce((sum, p) => sum + p.grandTotal, 0);

    const pendingPaymentsAmt = paymentsData
      .filter((p) => p.status === "Pending")
      .reduce((sum, p) => sum + p.grandTotal, 0);

    const completedCount = paymentsData.filter((p) => p.status === "Paid").length;
    const totalInvoicesCount = invoicesData.length;

    return {
      totalPayments: totalPaymentsAmt.toFixed(2),
      pendingPayments: pendingPaymentsAmt.toFixed(2),
      completedPayments: completedCount,
      totalInvoices: totalInvoicesCount
    };
  }, []);

  // Filtering logic
  const filteredPayments = useMemo(() => {
    return paymentsData.filter((p) => {
      const matchSearch =
        p.id.toLowerCase().includes(search.toLowerCase()) ||
        p.doctor.toLowerCase().includes(search.toLowerCase()) ||
        p.department.toLowerCase().includes(search.toLowerCase()) ||
        p.appointmentId.toLowerCase().includes(search.toLowerCase());

      const matchStatus = statusFilter === "All" || p.status === statusFilter;
      const matchMethod = methodFilter === "All" || p.methodType === methodFilter;

      let matchDate = true;
      if (dateFilter) {
        const selectedDateStr = dateFilter.format("YYYY-MM-DD");
        // Simple mock check
        const formattedDate = new Date(p.date).toISOString().split("T")[0];
        const formattedSelDate = new Date(selectedDateStr).toISOString().split("T")[0];
        matchDate = formattedDate === formattedSelDate;
      }

      return matchSearch && matchStatus && matchMethod && matchDate;
    });
  }, [search, statusFilter, methodFilter, dateFilter]);

  const columns = [
    {
      title: "Transaction ID",
      dataIndex: "id",
      key: "id",
      render: (text) => <span className="tx-mono">{text}</span>
    },
    {
      title: "Doctor",
      key: "doctor",
      render: (_, record) => (
        <div className="doctor-cell-info">
          <div className="doc-name">{record.doctor}</div>
          <div className="doc-spec">{record.department}</div>
        </div>
      )
    },
    {
      title: "Appointment ID",
      dataIndex: "appointmentId",
      key: "appointmentId",
      render: (text) => <span className="appt-id">{text}</span>
    },
    {
      title: "Amount",
      dataIndex: "grandTotal",
      key: "grandTotal",
      render: (val) => <span className="amount-bold">${val.toFixed(2)}</span>
    },
    {
      title: "Payment Method",
      dataIndex: "method",
      key: "method",
      render: (text) => (
        <span className="method-text">
          <CreditCardOutlined style={{ marginRight: 6, color: "#0f8a8f" }} />
          {text}
        </span>
      )
    },
    {
      title: "Date",
      dataIndex: "date",
      key: "date",
      render: (text) => (
        <span className="date-text">
          <CalendarOutlined style={{ marginRight: 6, color: "#64748b" }} />
          {text}
        </span>
      )
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (status) => {
        const config = statusColors[status] || {};
        return (
          <Tag
            color="default"
            className="pd-status-pill"
            style={{ color: config.color, background: config.bg, border: "none" }}
          >
            {config.icon}
            <span style={{ marginLeft: 4 }}>{status}</span>
          </Tag>
        );
      }
    },
    {
      title: "Actions",
      key: "actions",
      render: (_, record) => (
        <div className="actions-cell">
          <Tooltip title="View Receipt Details">
            <Button
              type="text"
              icon={<EyeOutlined />}
              className="action-icon-btn view"
            />
          </Tooltip>
          {record.status === "Paid" && (
            <Tooltip title="Download PDF Receipt">
              <Button
                type="text"
                icon={<DownloadOutlined />}
                className="action-icon-btn download"
              />
            </Tooltip>
          )}
        </div>
      )
    }
  ];

  return (
    <DashboardLayout>
      <motion.div
        className="payments-dash-container"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Top Hero Banner */}
        <motion.div className="payments-hero-banner" variants={cardVariants}>
          <div className="hero-left">
            <div className="hero-badge-tag">Financial Ledger</div>
            <h1 className="hero-title">Payments & Billing</h1>
            <p className="hero-desc">Securely monitor, audit, and manage patient care invoices and completed payouts.</p>
          </div>
          <div className="hero-right-icon">
            <DashboardOutlined />
          </div>
        </motion.div>

        {/* Stats Grid */}
        <div className="stats-kpi-grid">
          <motion.div className="kpi-card total" variants={cardVariants} whileHover={{ y: -4 }}>
            <div className="kpi-icon-wrap"><DollarOutlined /></div>
            <div className="kpi-info">
              <span className="lbl">Total Payments</span>
              <h2 className="val">${stats.totalPayments}</h2>
              <span className="desc">Total funds successfully settled</span>
            </div>
          </motion.div>

          <motion.div className="kpi-card pending" variants={cardVariants} whileHover={{ y: -4 }}>
            <div className="kpi-icon-wrap"><ClockCircleOutlined /></div>
            <div className="kpi-info">
              <span className="lbl">Pending Payments</span>
              <h2 className="val">${stats.pendingPayments}</h2>
              <span className="desc">Unsettled or pending statements</span>
            </div>
          </motion.div>

          <motion.div className="kpi-card completed" variants={cardVariants} whileHover={{ y: -4 }}>
            <div className="kpi-icon-wrap"><CheckCircleOutlined /></div>
            <div className="kpi-info">
              <span className="lbl">Completed Payments</span>
              <h2 className="val">{stats.completedPayments}</h2>
              <span className="desc">Transactions paid successfully</span>
            </div>
          </motion.div>

          <motion.div className="kpi-card invoices" variants={cardVariants} whileHover={{ y: -4 }}>
            <div className="kpi-icon-wrap"><FileTextOutlined /></div>
            <div className="kpi-info">
              <span className="lbl">Total Invoices</span>
              <h2 className="val">{stats.totalInvoices}</h2>
              <span className="desc">Billed clinical statements</span>
            </div>
          </motion.div>
        </div>

        {/* Filter Toolbar */}
        <motion.div className="payments-filter-toolbar" variants={cardVariants}>
          <div className="filter-left-lbl">
            <FilterOutlined style={{ color: "#0f8a8f" }} />
            <span>Search Filters</span>
          </div>
          <div className="filter-controls-row">
            <Input
              placeholder="Search ID, doctor or appt..."
              prefix={<SearchOutlined />}
              className="payments-search"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              allowClear
            />
            <Select
              value={statusFilter}
              onChange={setStatusFilter}
              className="payments-select"
            >
              <Option value="All">All Statuses</Option>
              <Option value="Paid">Paid</Option>
              <Option value="Pending">Pending</Option>
              <Option value="Refunded">Refunded</Option>
              <Option value="Failed">Failed</Option>
            </Select>
            <Select
              value={methodFilter}
              onChange={setMethodFilter}
              className="payments-select"
            >
              <Option value="All">All Methods</Option>
              <Option value="Visa">Visa</Option>
              <Option value="Mastercard">Mastercard</Option>
            </Select>
            <DatePicker
              placeholder="Filter by Date"
              className="payments-date-picker"
              value={dateFilter}
              onChange={setDateFilter}
              allowClear
            />
          </div>
        </motion.div>

        {/* Main Payout Transactions Table */}
        <motion.div className="payments-table-card-wrap" variants={cardVariants}>
          <div className="table-meta-summary">
            <span>Showing {filteredPayments.length} financial transaction{filteredPayments.length !== 1 ? "s" : ""}</span>
          </div>
          <Table
            columns={columns}
            dataSource={filteredPayments}
            pagination={{ pageSize: 6 }}
            className="custom-financial-table"
            scroll={{ x: 1000 }}
            rowKey="id"
          />
        </motion.div>
      </motion.div>
    </DashboardLayout>
  );
};

export default Payments;
