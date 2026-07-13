import React, { useState, useEffect } from "react";
import { Table, Tag, Progress, Avatar } from "antd";
import {
  CalendarOutlined,
  ArrowRightOutlined,
  BellOutlined,
  ClockCircleOutlined,
  EnvironmentOutlined,
  RiseOutlined,
  FallOutlined,
  UserOutlined,
  CheckCircleOutlined,
  CalendarFilled,
  DollarCircleFilled,
  MedicineBoxFilled,
  TeamOutlined,
} from "@ant-design/icons";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import DashboardLayout from "../../../layouts/DashboardLayout/DashboardLayout";
import dashboardStatsData from "../../../data/dashboardStatsData";
import quickActionsData from "../../../data/quickActionsData";
import appointmentsData from "../../../data/appointmentsData";
import notificationsData from "../../../data/notificationsData";
import healthTipsData from "../../../data/healthTipsData";
import LoadingOverlay from "../../../components/LoadingOverlay";
import { DashboardSkeleton } from "../../../components/Skeletons";
import {
  LineChart,
  BarChart,
  PieChart,
  AreaChart,
  StatCardChart,
} from "../../../components/Charts";
import "./DashboardHome.css";

// ─── Animation Variants ─────────────────────────────────────────────────────
const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, delay: i * 0.1, ease: "easeOut" },
  }),
};

// ─── Chart Mock Datasets ─────────────────────────────────────────────────────
const appointmentsTrendData = [
  { month: "Jan", appointments: 32 },
  { month: "Feb", appointments: 41 },
  { month: "Mar", appointments: 38 },
  { month: "Apr", appointments: 50 },
  { month: "May", appointments: 62 },
  { month: "Jun", appointments: 58 },
];

const paymentsData = [
  { month: "Jan", amount: 12000 },
  { month: "Feb", amount: 18000 },
  { month: "Mar", amount: 16000 },
  { month: "Apr", amount: 24000 },
  { month: "May", amount: 26000 },
  { month: "Jun", amount: 30000 },
];

const departmentsData = [
  { name: "Cardiology",  value: 28 },
  { name: "Neurology",   value: 20 },
  { name: "Orthopedics", value: 18 },
  { name: "Pediatrics",  value: 22 },
  { name: "Others",      value: 12 },
];

const visitorsData = [
  { month: "Jan", visitors: 120 },
  { month: "Feb", visitors: 180 },
  { month: "Mar", visitors: 210 },
  { month: "Apr", visitors: 260 },
  { month: "May", visitors: 300 },
  { month: "Jun", visitors: 350 },
];

const slideRight = {
  hidden: { opacity: 0, x: -24 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.5, ease: "easeOut" } },
};

// ─── Status Badge Config ─────────────────────────────────────────────────────
const statusConfig = {
  Confirmed: { color: "#0f8a8f", bg: "rgba(15,138,143,0.08)" },
  Completed: { color: "#10b981", bg: "rgba(16,185,129,0.08)" },
  Pending:   { color: "#f59e0b", bg: "rgba(245,158,11,0.08)" },
  Cancelled: { color: "#ef4444", bg: "rgba(239,68,68,0.08)" },
};

// ─── Table Columns ───────────────────────────────────────────────────────────
const tableColumns = [
  {
    title: "Doctor",
    dataIndex: "doctor",
    key: "doctor",
    render: (text) => (
      <div className="table-doctor-cell">
        <Avatar size={36} icon={<UserOutlined />} className="table-avatar" />
        <span className="table-doctor-name">{text}</span>
      </div>
    ),
  },
  {
    title: "Department",
    dataIndex: "department",
    key: "department",
    render: (text) => <span className="table-dept">{text}</span>,
  },
  {
    title: "Date & Time",
    key: "datetime",
    render: (_, record) => (
      <div className="table-datetime">
        <span>{record.date}</span>
        <span className="table-time">{record.time}</span>
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
        <span
          className="status-badge"
          style={{ color: cfg.color, background: cfg.bg }}
        >
          {status}
        </span>
      );
    },
  },
  {
    title: "Action",
    key: "action",
    render: () => (
      <button className="table-action-btn">
        View <ArrowRightOutlined />
      </button>
    ),
  },
];

// ─── Component ───────────────────────────────────────────────────────────────
const DashboardHome = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const today = new Date().toLocaleDateString("en-US", {
    weekday: "long", year: "numeric", month: "long", day: "numeric",
  });

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1000);
    return () => clearTimeout(timer);
  }, []);

  const healthProgress = [
    { label: "Health Score",          value: 84, color: "#0f8a8f" },
    { label: "Medicine Adherence",    value: 91, color: "#6366f1" },
    { label: "Appointments Completed",value: 67, color: "#10b981" },
  ];

  return (
    <DashboardLayout>
      <LoadingOverlay loading={loading} text="Loading Dashboard..." />

      {loading ? (
        <DashboardSkeleton />
      ) : (
      <div className="dashboard-home">

        {/* ── Welcome Hero ─────────────────────────────────── */}
        <motion.div
          className="welcome-hero"
          variants={slideRight}
          initial="hidden"
          animate="visible"
        >
          <div className="welcome-text">
            <h1 className="welcome-heading">Welcome back 👋</h1>
            <p className="welcome-sub">Welcome to PRANACORE Healthcare Platform</p>
            <span className="welcome-date">{today}</span>
          </div>
          <div className="welcome-badge">
            <CalendarOutlined className="welcome-badge-icon" />
            <span>12 appointments this month</span>
          </div>
        </motion.div>

        {/* ── KPI Stats Grid ───────────────────────────────── */}
        <div className="stats-grid">
          {dashboardStatsData.map((stat, i) => (
            <motion.div
              className="stat-card"
              key={stat.id}
              custom={i}
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              whileHover={{ y: -4 }}
            >
              <div className="stat-icon-wrap" style={{ background: stat.bgColor }}>
                <span className="stat-icon" style={{ color: stat.color }}>
                  {stat.icon}
                </span>
              </div>
              <div className="stat-info">
                <div className="stat-value">{stat.value}</div>
                <div className="stat-label">{stat.label}</div>
                <div className="stat-desc">{stat.description}</div>
              </div>
              <div className={`stat-trend ${stat.trendUp === true ? "up" : stat.trendUp === false ? "down" : "neutral"}`}>
                {stat.trendUp === true && <RiseOutlined />}
                {stat.trendUp === false && <FallOutlined />}
                <span>{stat.trend}</span>
              </div>
            </motion.div>
          ))}
        </div>

        {/* ── Middle Row: Appointment + Quick Actions ───────── */}
        <div className="middle-row">

          {/* Upcoming Appointment Card */}
          <motion.div
            className="upcoming-card"
            custom={0}
            variants={fadeUp}
            initial="hidden"
            animate="visible"
          >
            <div className="section-label">Next Appointment</div>
            <div className="appt-doctor-row">
              <Avatar size={56} icon={<UserOutlined />} className="appt-avatar" />
              <div className="appt-doctor-info">
                <h3 className="appt-doctor-name">Dr. Sarah Mitchell</h3>
                <span className="appt-department">Cardiology</span>
              </div>
            </div>
            <div className="appt-details">
              <div className="appt-detail-item">
                <CalendarOutlined className="appt-detail-icon" />
                <span>July 5, 2026</span>
              </div>
              <div className="appt-detail-item">
                <ClockCircleOutlined className="appt-detail-icon" />
                <span>10:00 AM</span>
              </div>
              <div className="appt-detail-item">
                <EnvironmentOutlined className="appt-detail-icon" />
                <span>PRANACORE City Hospital</span>
              </div>
            </div>
            <div className="appt-actions">
              <button className="btn-join">Join Consultation</button>
              <button className="btn-details">View Details</button>
            </div>
          </motion.div>

          {/* Quick Actions Grid */}
          <motion.div
            className="quick-actions-card"
            custom={1}
            variants={fadeUp}
            initial="hidden"
            animate="visible"
          >
            <div className="section-label">Quick Actions</div>
            <div className="quick-actions-grid">
              {quickActionsData.map((action, i) => (
                <motion.div
                  key={action.id}
                  className="quick-action-item"
                  whileHover={{ y: -4, scale: 1.02 }}
                  transition={{ type: "spring", stiffness: 200 }}
                >
                  <div className="quick-action-icon" style={{ background: action.bgColor, color: action.color }}>
                    {action.icon}
                  </div>
                  <span className="quick-action-label">{action.label}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* ── Recent Appointments Table ─────────────────────── */}
        <motion.div
          className="table-card"
          custom={2}
          variants={fadeUp}
          initial="hidden"
          animate="visible"
        >
          <div className="card-header-row">
            <div className="section-label">Recent Appointments</div>
            <button className="view-all-btn">View All <ArrowRightOutlined /></button>
          </div>
          <Table
            dataSource={appointmentsData}
            columns={tableColumns}
            pagination={false}
            className="appointments-table"
            scroll={{ x: 600 }}
          />
        </motion.div>

        {/* ── Bottom Grid: Tips + Notifications + Progress ──── */}
        <div className="bottom-grid">

          {/* Health Tips */}
          <motion.div className="health-tips-card" custom={0} variants={fadeUp} initial="hidden" animate="visible">
            <div className="card-header-row">
              <div className="section-label">Daily Health Tips</div>
            </div>
            <div className="tips-list">
              {healthTipsData.map((tip) => (
                <div key={tip.id} className="tip-item">
                  <span className="tip-emoji">{tip.emoji}</span>
                  <div className="tip-content">
                    <div className="tip-title">{tip.title}</div>
                    <div className="tip-text">{tip.tip}</div>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Notifications */}
          <motion.div className="notifications-card" custom={1} variants={fadeUp} initial="hidden" animate="visible">
            <div className="card-header-row">
              <div className="section-label">Notifications</div>
              <span className="notif-badge">{notificationsData.filter(n => n.unread).length} new</span>
            </div>
            <div className="notif-list">
              {notificationsData.map((notif) => (
                <div key={notif.id} className={`notif-item ${notif.unread ? "unread" : ""}`}>
                  <div className="notif-dot" style={{ opacity: notif.unread ? 1 : 0 }}></div>
                  <div className="notif-content">
                    <div className="notif-title">{notif.title}</div>
                    <div className="notif-message">{notif.message}</div>
                    <div className="notif-time">{notif.time}</div>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Health Progress */}
          <motion.div className="progress-card" custom={2} variants={fadeUp} initial="hidden" animate="visible">
            <div className="section-label">Health Progress</div>
            <div className="progress-circles">
              {healthProgress.map((item, i) => (
                <div key={i} className="progress-circle-item">
                  <Progress
                    type="circle"
                    percent={item.value}
                    strokeColor={item.color}
                    trailColor="#f1f5f9"
                    strokeWidth={8}
                    size={90}
                    format={(p) => <span className="progress-label-val">{p}%</span>}
                  />
                  <span className="progress-circle-label">{item.label}</span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* ── Analytics: StatCard Row ──────────────────────────── */}
        <motion.div
          className="charts-statcard-row"
          custom={3}
          variants={fadeUp}
          initial="hidden"
          animate="visible"
        >
          <StatCardChart
            title="Appointments"
            value="281"
            icon={<CalendarFilled />}
            trend="+12% this month"
            trendColor="#10b981"
          />
          <StatCardChart
            title="Revenue"
            value="₹1.26L"
            icon={<DollarCircleFilled />}
            trend="+8% this month"
            trendColor="#10b981"
          />
          <StatCardChart
            title="Doctors"
            value="48"
            icon={<MedicineBoxFilled />}
            trend="2 new this week"
            trendColor="#6366f1"
          />
          <StatCardChart
            title="Patients"
            value="1,340"
            icon={<TeamOutlined />}
            trend="+5% this month"
            trendColor="#10b981"
          />
        </motion.div>

        {/* ── Analytics: Charts Grid ───────────────────────────── */}
        <motion.div
          className="charts-grid"
          custom={4}
          variants={fadeUp}
          initial="hidden"
          animate="visible"
        >
          <LineChart
            title="Appointments Trend"
            data={appointmentsTrendData}
            dataKey="appointments"
            xKey="month"
            height={260}
          />
          <BarChart
            title="Monthly Revenue"
            data={paymentsData}
            dataKey="amount"
            xKey="month"
            height={260}
          />
          <PieChart
            title="Department Distribution"
            data={departmentsData}
            dataKey="value"
            nameKey="name"
            height={260}
          />
          <AreaChart
            title="Visitor Growth"
            data={visitorsData}
            dataKey="visitors"
            xKey="month"
            height={260}
          />
        </motion.div>

        {/* ── Bottom CTA Banner ─────────────────────────────── */}
        <motion.div
          className="cta-banner"
          custom={3}
          variants={fadeUp}
          initial="hidden"
          animate="visible"
        >
          <div className="cta-content">
            <h2 className="cta-heading">Need medical assistance?</h2>
            <p className="cta-sub">Connect with our trusted specialists and book your appointment instantly.</p>
          </div>
          <button className="cta-btn" onClick={() => navigate("/dashboard/appointments/book")}>
            Book Appointment <ArrowRightOutlined />
          </button>
        </motion.div>

      </div>
      )}
    </DashboardLayout>
  );
};

export default DashboardHome;
