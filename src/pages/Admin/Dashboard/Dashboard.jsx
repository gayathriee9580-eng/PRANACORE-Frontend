import React from 'react';
import { Table, Tag, Timeline, Button, Row, Col } from 'antd';
import { motion } from 'framer-motion';
import {
  UserAddOutlined, FileTextOutlined, TeamOutlined, UserOutlined,
  CalendarOutlined, DollarOutlined, AppstoreOutlined, FolderOpenOutlined,
  CreditCardOutlined, ExperimentOutlined, BarChartOutlined, SettingOutlined,
  CheckCircleOutlined, ClockCircleOutlined, SyncOutlined, DatabaseOutlined, PoweroffOutlined
} from '@ant-design/icons';
import DashboardLayout from '../../../layouts/DashboardLayout/DashboardLayout';
import { LineChart, BarChart, PieChart, AreaChart, StatCardChart } from '../../../components/Charts';

// Reuse Patient Dashboard CSS for standard global styles
import '../../../pages/Dashboard/DashboardHome/DashboardHome.css';

// --- MOCK DATA ---
const appointmentsTrend = [
  { month: 'Jan', appointments: 400 }, { month: 'Feb', appointments: 300 },
  { month: 'Mar', appointments: 550 }, { month: 'Apr', appointments: 450 },
  { month: 'May', appointments: 700 }, { month: 'Jun', appointments: 650 },
];
const monthlyRevenue = [
  { month: 'Jan', revenue: 45000 }, { month: 'Feb', revenue: 52000 },
  { month: 'Mar', revenue: 48000 }, { month: 'Apr', revenue: 61000 },
  { month: 'May', revenue: 59000 }, { month: 'Jun', revenue: 75000 },
];
const departmentDist = [
  { name: 'Cardiology', value: 35 }, { name: 'Neurology', value: 25 },
  { name: 'Pediatrics', value: 20 }, { name: 'Orthopedics', value: 15 },
  { name: 'General', value: 5 },
];
const patientGrowth = [
  { month: 'Jan', patients: 1200 }, { month: 'Feb', patients: 1350 },
  { month: 'Mar', patients: 1600 }, { month: 'Apr', patients: 1900 },
  { month: 'May', patients: 2200 }, { month: 'Jun', patients: 2500 },
];

const quickActionsData = [
  { id: 1, icon: <UserOutlined />, title: 'Manage Patients', desc: 'Registers & Records', bg: 'rgba(15,138,143,0.1)', color: '#0f8a8f' },
  { id: 2, icon: <TeamOutlined />, title: 'Manage Doctors', desc: 'Staffing & Shifts', bg: 'rgba(16,185,129,0.1)', color: '#10b981' },
  { id: 3, icon: <AppstoreOutlined />, title: 'Manage Departments', desc: 'Wards & Resources', bg: 'rgba(99,102,241,0.1)', color: '#6366f1' },
  { id: 4, icon: <CalendarOutlined />, title: 'Appointments', desc: 'Schedules & Slots', bg: 'rgba(245,158,11,0.1)', color: '#f59e0b' },
  { id: 5, icon: <FolderOpenOutlined />, title: 'Medical Records', desc: 'Patient Files', bg: 'rgba(239,68,68,0.1)', color: '#ef4444' },
  { id: 6, icon: <CreditCardOutlined />, title: 'Payments', desc: 'Billing & Invoices', bg: 'rgba(168,85,247,0.1)', color: '#a855f7' },
  { id: 7, icon: <ExperimentOutlined />, title: 'Pharmacy', desc: 'Inventory Check', bg: 'rgba(34,197,94,0.1)', color: '#22c55e' },
  { id: 8, icon: <BarChartOutlined />, title: 'Reports', desc: 'Analytics & KPIs', bg: 'rgba(59,130,246,0.1)', color: '#3b82f6' },
  { id: 9, icon: <SettingOutlined />, title: 'Settings', desc: 'System Config', bg: 'rgba(107,114,128,0.1)', color: '#6b7280' },
];

const recentTableData = [
  { key: '1', id: 'APT-1001', patient: 'John Doe', doctor: 'Dr. Sarah Smith', department: 'Cardiology', time: '10:00 AM', status: 'Completed' },
  { key: '2', id: 'APT-1002', patient: 'Jane Roe', doctor: 'Dr. Mark Lee', department: 'Neurology', time: '11:15 AM', status: 'Pending' },
  { key: '3', id: 'APT-1003', patient: 'Sam Smith', doctor: 'Dr. Alice Chen', department: 'Pediatrics', time: '12:30 PM', status: 'Cancelled' },
  { key: '4', id: 'APT-1004', patient: 'Emily Davis', doctor: 'Dr. Bob White', department: 'Orthopedics', time: '02:00 PM', status: 'Confirmed' },
];

const statusConfig = {
  Confirmed: { color: "#0f8a8f", bg: "rgba(15,138,143,0.08)" },
  Completed: { color: "#10b981", bg: "rgba(16,185,129,0.08)" },
  Pending: { color: "#f59e0b", bg: "rgba(245,158,11,0.08)" },
  Cancelled: { color: "#ef4444", bg: "rgba(239,68,68,0.08)" },
};

const tableColumns = [
  { title: 'Appointment ID', dataIndex: 'id', key: 'id' },
  { title: 'Patient', dataIndex: 'patient', key: 'patient' },
  { title: 'Doctor', dataIndex: 'doctor', key: 'doctor' },
  { title: 'Department', dataIndex: 'department', key: 'department', render: text => <span className="table-dept">{text}</span> },
  { title: 'Time', dataIndex: 'time', key: 'time' },
  {
    title: 'Status',
    dataIndex: 'status',
    key: 'status',
    render: (status) => {
      const cfg = statusConfig[status] || {};
      return <span className="status-badge" style={{ color: cfg.color, background: cfg.bg }}>{status}</span>;
    }
  },
];

const Dashboard = () => {
  const today = new Date().toLocaleDateString("en-US", { weekday: "long", year: "numeric", month: "long", day: "numeric" });

  const fadeUp = {
    hidden: { opacity: 0, y: 24 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } }
  };

  return (
    <DashboardLayout>
      <div className="dashboard-home">
        <style>{`
          .charts-grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 20px; margin-top: 24px; }
          .stat-charts-row { display: grid; grid-template-columns: repeat(4, 1fr); gap: 20px; margin-top: 24px; }
          
          .admin-timeline-card { background: #fff; padding: 24px; border-radius: 16px; height: 100%; box-shadow: 0 4px 20px rgba(0,0,0,0.02); }
          .system-status-card { background: #fff; border-radius: 12px; padding: 20px; display: flex; flex-direction: column; justify-content: space-between; border: 1px solid #f0f0f0; transition: transform 0.2s; height: 100%; box-shadow: 0 2px 10px rgba(0,0,0,0.02); }
          .system-status-card:hover { transform: translateY(-4px); }
          
          .status-card-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 12px; color: #64748b; font-size: 0.85rem; font-weight: 600; text-transform: uppercase; letter-spacing: 0.05em; }
          .status-card-val { font-size: 1.5rem; font-weight: 700; color: #1e293b; display: flex; align-items: center; gap: 8px;}
          
          .qa-admin-item { display: flex; flex-direction: column; align-items: center; background: #fff; padding: 20px; border-radius: 12px; text-align: center; gap: 12px; cursor: pointer; border: 1px solid #f1f5f9; transition: all 0.2s; }
          .qa-admin-item:hover { transform: translateY(-5px); box-shadow: 0 10px 25px rgba(0,0,0,0.05); }
          .qa-admin-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(130px, 1fr)); gap: 16px; }
          
          @media screen and (max-width: 1024px) {
            .stat-charts-row { grid-template-columns: repeat(2, 1fr); }
          }
          @media screen and (max-width: 768px) {
            .charts-grid { grid-template-columns: 1fr; }
            .stat-charts-row { grid-template-columns: 1fr; }
            .admin-status-col { margin-bottom: 16px; }
            .qa-admin-grid { grid-template-columns: repeat(2, 1fr); }
            .welcome-actions { width: 100%; flex-direction: column; }
            .welcome-actions button { width: 100%; }
          }
        `}</style>

        {/* 1. Hero Section */}
        <motion.div className="welcome-hero" variants={fadeUp} initial="hidden" animate="visible">
          <div className="welcome-text">
            <h1 className="welcome-heading">Admin Dashboard</h1>
            <p className="welcome-sub">Manage hospital operations, monitor performance, and oversee all departments from one place.</p>
            <span className="welcome-date">{today}</span>
          </div>
          <div className="welcome-actions" style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
            <Button type="primary" icon={<UserAddOutlined />} size="large" style={{ borderRadius: '8px' }}>Add Doctor</Button>
            <Button icon={<FileTextOutlined />} size="large" style={{ borderRadius: '8px' }}>Generate Report</Button>
          </div>
        </motion.div>

        {/* 2. Statistics Row */}
        <div className="stat-charts-row">
          <StatCardChart title="Total Patients" value="14,248" icon={<TeamOutlined />} trend="+12% this month" trendColor="#10b981" />
          <StatCardChart title="Total Doctors" value="345" icon={<UserOutlined />} trend="+5 new joined" trendColor="#10b981" />
          <StatCardChart title="Today's Appointments" value="128" icon={<CalendarOutlined />} trend="15 Pending" trendColor="#f59e0b" />
          <StatCardChart title="Revenue" value="$450,200" icon={<DollarOutlined />} trend="+18% vs last month" trendColor="#10b981" />
        </div>

        {/* 3. Charts Section */}
        <div className="charts-grid">
          <LineChart title="Appointments Trend" data={appointmentsTrend} dataKey="appointments" xKey="month" />
          <BarChart title="Monthly Revenue" data={monthlyRevenue} dataKey="revenue" xKey="month" />
          <PieChart title="Department Distribution" data={departmentDist} dataKey="value" nameKey="name" />
          <AreaChart title="Patient Growth" data={patientGrowth} dataKey="patients" xKey="month" />
        </div>

        {/* 4. Quick Actions */}
        <motion.div variants={fadeUp} initial="hidden" animate="visible" style={{ marginTop: '32px' }}>
          <div className="section-label" style={{ marginBottom: '16px' }}>Quick Actions</div>
          <div className="qa-admin-grid">
            {quickActionsData.map((action) => (
              <div key={action.id} className="qa-admin-item">
                <div className="quick-action-icon" style={{ background: action.bg, color: action.color, width: '48px', height: '48px', display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: '12px', fontSize: '1.5rem' }}>
                  {action.icon}
                </div>
                <div>
                  <div style={{ fontWeight: 600, color: '#1e293b', fontSize: '0.9rem' }}>{action.title}</div>
                  <div style={{ color: '#64748b', fontSize: '0.75rem', marginTop: '4px' }}>{action.desc}</div>
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* 5. & 6. Recent Activity & System Status */}
        <Row gutter={[24, 24]} style={{ marginTop: '32px' }}>
          <Col xs={24} lg={12}>
            <div className="admin-timeline-card">
              <div className="section-label" style={{ marginBottom: '24px' }}>Recent Activity</div>
              <Timeline items={[
                { color: 'green', children: 'Patient registered successfully.', dot: <CheckCircleOutlined /> },
                { color: 'blue', children: 'Appointment booked for Dr. Sarah Smith at 10:00 AM.', dot: <CalendarOutlined /> },
                { color: 'purple', children: 'Payment received for consultation bills.', dot: <CreditCardOutlined /> },
                { color: 'orange', children: 'Medicine stock updated (Pharmacy).', dot: <SyncOutlined /> },
                { color: 'gray', children: 'Monthly performance report generated.', dot: <FileTextOutlined /> },
              ]} />
            </div>
          </Col>
          <Col xs={24} lg={12}>
            <div className="section-label" style={{ marginBottom: '16px' }}>System Status</div>
            <Row gutter={[16, 16]}>
              <Col xs={12} sm={12} className="admin-status-col">
                <div className="system-status-card">
                  <div className="status-card-header">
                    Server Status <PoweroffOutlined />
                  </div>
                  <div className="status-card-val">
                    Online <Tag color="success">OK</Tag>
                  </div>
                </div>
              </Col>
              <Col xs={12} sm={12} className="admin-status-col">
                <div className="system-status-card">
                  <div className="status-card-header">
                    Database <DatabaseOutlined />
                  </div>
                  <div className="status-card-val">
                    Connected <Tag color="processing">Active</Tag>
                  </div>
                </div>
              </Col>
              <Col xs={12} sm={12} className="admin-status-col">
                <div className="system-status-card">
                  <div className="status-card-header">
                    Appointments Today <ClockCircleOutlined />
                  </div>
                  <div className="status-card-val">
                    128 <Tag color="warning">High Vol</Tag>
                  </div>
                </div>
              </Col>
              <Col xs={12} sm={12} className="admin-status-col">
                <div className="system-status-card">
                  <div className="status-card-header">
                    Pending Reports <FileTextOutlined />
                  </div>
                  <div className="status-card-val">
                    5 <Tag color="error">Needs Action</Tag>
                  </div>
                </div>
              </Col>
            </Row>
          </Col>
        </Row>

        {/* 7. Recent Appointments Table */}
        <motion.div className="table-card" variants={fadeUp} initial="hidden" animate="visible" style={{ marginTop: '32px' }}>
          <div className="card-header-row">
            <div className="section-label">Recent Appointments</div>
          </div>
          <Table
            dataSource={recentTableData}
            columns={tableColumns}
            pagination={false}
            scroll={{ x: true }}
            className="appointments-table"
          />
        </motion.div>
      </div>
    </DashboardLayout>
  );
};

export default Dashboard;
