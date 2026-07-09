import React, { useState, useMemo } from "react";
import { Input, Select, Tag, Button, Tabs, Tooltip } from "antd";
import {
  SearchOutlined,
  FilterOutlined,
  CalendarOutlined,
  EyeOutlined,
  DownloadOutlined,
  DollarOutlined,
} from "@ant-design/icons";
import { motion, AnimatePresence } from "framer-motion";
import DashboardLayout from "../../../layouts/DashboardLayout/DashboardLayout";
import invoicesData from "../../../data/invoicesData";
import "./Invoices.css";

const { Option } = Select;

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.08 }
  }
};

const cardVariants = {
  hidden: { opacity: 0, scale: 0.95, y: 15 },
  visible: { opacity: 1, scale: 1, y: 0, transition: { type: "spring", stiffness: 100 } }
};

const statusColors = {
  Paid: { color: "#10b981", bg: "rgba(16,185,129,0.08)", label: "PAID" },
  Unpaid: { color: "#0f8a8f", bg: "rgba(15,138,143,0.08)", label: "UNPAID" },
  Overdue: { color: "#ef4444", bg: "rgba(239,68,68,0.08)", label: "OVERDUE" }
};

const Invoices = () => {
  const [activeTab, setActiveTab] = useState("all");
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");

  // Filtering matching search & tab/select status
  const filteredInvoices = useMemo(() => {
    return invoicesData.filter((inv) => {
      const matchSearch =
        inv.id.toLowerCase().includes(search.toLowerCase()) ||
        inv.doctor.toLowerCase().includes(search.toLowerCase()) ||
        inv.department.toLowerCase().includes(search.toLowerCase());

      const tabStatus =
        activeTab === "all" ||
        (activeTab === "paid" && inv.status === "Paid") ||
        (activeTab === "unpaid" && inv.status === "Unpaid") ||
        (activeTab === "overdue" && inv.status === "Overdue");

      const selectStatus =
        statusFilter === "All" || inv.status === statusFilter;

      return matchSearch && tabStatus && selectStatus;
    });
  }, [search, activeTab, statusFilter]);

  return (
    <DashboardLayout>
      <motion.div
        className="invoices-module-container"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Page Header */}
        <div className="invoices-top-row">
          <div className="header-titles">
            <h1 className="page-title">Hospital Statement Ledger</h1>
            <p className="page-subtitle">View, print, and process itemized patient care statements.</p>
          </div>
        </div>

        {/* Toolbar Controls */}
        <div className="invoices-filter-panel">
          <Tabs
            activeKey={activeTab}
            onChange={setActiveTab}
            className="invoices-custom-tabs"
            items={[
              { label: "All Invoices", key: "all" },
              { label: "Paid Receipts", key: "paid" },
              { label: "Unpaid Statements", key: "unpaid" },
              { label: "Overdue Bills", key: "overdue" }
            ]}
          />

          <div className="filters-controls-wrap">
            <Input
              placeholder="Search statements..."
              prefix={<SearchOutlined />}
              className="search-input"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              allowClear
            />
            <Select
              value={statusFilter}
              onChange={setStatusFilter}
              className="status-dropdown"
            >
              <Option value="All">All Statuses</Option>
              <Option value="Paid">Paid</Option>
              <Option value="Unpaid">Unpaid</Option>
              <Option value="Overdue">Overdue</Option>
            </Select>
          </div>
        </div>

        {/* Invoices Cards Grid */}
        <AnimatePresence mode="wait">
          {filteredInvoices.length === 0 ? (
            <motion.div
              className="no-invoices-alert"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <span>No statement invoices matching your selection.</span>
            </motion.div>
          ) : (
            <motion.div
              className="invoices-cards-grid"
              variants={containerVariants}
              initial="hidden"
              animate="visible"
            >
              {filteredInvoices.map((inv) => {
                const config = statusColors[inv.status] || {};
                return (
                  <motion.div
                    key={inv.id}
                    className="invoice-item-card"
                    variants={cardVariants}
                    whileHover={{ y: -6, boxShadow: "0 15px 30px rgba(15, 23, 42, 0.08)" }}
                  >
                    {/* Top segment */}
                    <div className="card-top-header">
                      <span className="inv-id-label">{inv.id}</span>
                      <Tag
                        color="default"
                        style={{ color: config.color, background: config.bg, border: "none" }}
                        className="status-pill-tag"
                      >
                        {config.label}
                      </Tag>
                    </div>

                    {/* Middle details */}
                    <div className="card-middle-content">
                      <h4 className="card-doctor-name">{inv.doctor}</h4>
                      <span className="card-spec-label">{inv.department} Specialist</span>
                      <span className="card-hospital-label">{inv.hospital}</span>
                    </div>

                    <Divider className="card-divider" />

                    {/* Financial row details */}
                    <div className="card-financial-row">
                      <div className="fin-item">
                        <span className="fin-lbl">BILL DATE</span>
                        <span className="fin-val">
                          <CalendarOutlined style={{ marginRight: 4, color: "#94a3b8" }} />
                          {inv.issueDate}
                        </span>
                      </div>
                      <div className="fin-item align-right">
                        <span className="fin-lbl">AMOUNT DUE</span>
                        <span className="fin-val-bold">${inv.total.toFixed(2)}</span>
                      </div>
                    </div>

                    <Divider className="card-divider" />

                    {/* Card Actions Footer */}
                    <div className="card-actions-footer">
                      <Button
                        type="text"
                        icon={<EyeOutlined />}
                        className="btn-card-action view"
                      >
                        View Invoice
                      </Button>
                      <Button
                        type="text"
                        icon={<DownloadOutlined />}
                        className="btn-card-action download"
                      >
                        Download PDF
                      </Button>
                    </div>
                  </motion.div>
                );
              })}
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </DashboardLayout>
  );
};

export default Invoices;
