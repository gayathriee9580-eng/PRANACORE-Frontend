import React, { useState, useEffect } from 'react';
import { Button, Tag, Space, Typography, Badge, Switch, Select } from 'antd';
import {
  BellOutlined,
  CheckCircleOutlined,
  WarningOutlined,
  InfoCircleOutlined,
  CalendarOutlined,
  MedicineBoxOutlined,
  ExperimentOutlined,
  UserAddOutlined,
  ClearOutlined,
  SortAscendingOutlined,
} from '@ant-design/icons';
import { motion, AnimatePresence } from 'framer-motion';

import DashboardLayout from '../../../layouts/DashboardLayout/DashboardLayout';
import { StatCardChart } from '../../../components/Charts';
import LoadingOverlay from '../../../components/LoadingOverlay';
import { DashboardSkeleton } from '../../../components/Skeletons';
import EmptyState from '../../../components/EmptyState';
import { useToast } from '../../../context/ToastContext';
import '../../../pages/Dashboard/DashboardHome/DashboardHome.css';

const { Text, Title } = Typography;
const { Option } = Select;

const iconMap = {
  appointment: <CalendarOutlined style={{ color: '#3b82f6' }} />,
  prescription: <MedicineBoxOutlined style={{ color: '#8b5cf6' }} />,
  lab: <ExperimentOutlined style={{ color: '#10b981' }} />,
  patient: <UserAddOutlined style={{ color: '#0f8a8f' }} />,
  alert: <WarningOutlined style={{ color: '#ef4444' }} />,
  info: <InfoCircleOutlined style={{ color: '#64748b' }} />,
};

const categoryColors = {
  appointment: '#3b82f6',
  prescription: '#8b5cf6',
  lab: '#10b981',
  patient: '#0f8a8f',
  alert: '#ef4444',
  info: '#64748b',
};

const mockNotifications = [
  { id: 'N001', type: 'appointment', title: 'New Appointment Booked', message: 'Patient Name 1 has booked an appointment for July 17.', time: '2 min ago', read: false, priority: 'High' },
  { id: 'N002', type: 'lab', title: 'Lab Results Ready', message: 'Blood test results for Patient Name 5 are now available.', time: '15 min ago', read: false, priority: 'Normal' },
  { id: 'N003', type: 'alert', title: 'Critical Patient Alert', message: 'Patient Name 3 vitals are showing abnormal readings in Room 204.', time: '32 min ago', read: false, priority: 'Urgent' },
  { id: 'N004', type: 'prescription', title: 'Prescription Refill Requested', message: 'Patient Name 8 has requested a refill for Metformin 500mg.', time: '1 hr ago', read: true, priority: 'Normal' },
  { id: 'N005', type: 'patient', title: 'New Patient Assigned', message: 'Patient Name 12 has been added to your patient roster.', time: '2 hr ago', read: true, priority: 'Normal' },
  { id: 'N006', type: 'appointment', title: 'Appointment Rescheduled', message: 'Patient Name 7 rescheduled their appointment to July 19.', time: '3 hr ago', read: true, priority: 'Normal' },
  { id: 'N007', type: 'lab', title: 'MRI Report Uploaded', message: 'Patient Name 14 MRI scan report is ready for your review.', time: '4 hr ago', read: true, priority: 'High' },
  { id: 'N008', type: 'alert', title: 'Medication Interaction Warning', message: 'Possible interaction flagged in Patient Name 19\'s prescription.', time: '5 hr ago', read: false, priority: 'Urgent' },
  { id: 'N009', type: 'info', title: 'System Maintenance Scheduled', message: 'PRANACORE will undergo maintenance on July 20, 2026 from 2–4 AM.', time: '6 hr ago', read: true, priority: 'Normal' },
  { id: 'N010', type: 'prescription', title: 'Prescription Approved', message: 'Your prescription for Patient Name 22 has been dispensed by pharmacy.', time: '8 hr ago', read: true, priority: 'Normal' },
  { id: 'N011', type: 'appointment', title: 'Appointment Cancelled', message: 'Patient Name 9 cancelled their consultation scheduled for today.', time: '9 hr ago', read: true, priority: 'Normal' },
  { id: 'N012', type: 'patient', title: 'Patient Discharged', message: 'Patient Name 6 has been successfully discharged from Ward B.', time: '10 hr ago', read: true, priority: 'Normal' },
  { id: 'N013', type: 'lab', title: 'Urgent Lab Flag', message: 'Abnormal potassium levels detected in Patient Name 28 results.', time: '11 hr ago', read: false, priority: 'Urgent' },
  { id: 'N014', type: 'info', title: 'Training Reminder', message: 'Mandatory PRANACORE training session on July 21, 2026.', time: '1 day ago', read: true, priority: 'Normal' },
  { id: 'N015', type: 'appointment', title: 'Today\'s Schedule Ready', message: 'Your appointment schedule for today has been finalized (8 slots).', time: '1 day ago', read: true, priority: 'Normal' },
];

const priorityTagColor = { Urgent: 'red', High: 'orange', Normal: 'default' };

const Notifications = () => {
  const toast = useToast();
  const [loading, setLoading] = useState(true);
  const [notifications, setNotifications] = useState(mockNotifications);
  const [filterType, setFilterType] = useState('All');
  const [filterRead, setFilterRead] = useState('All');
  const [sortOrder, setSortOrder] = useState('newest');
  const [showUnreadOnly, setShowUnreadOnly] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setLoading(false), 1000);
    return () => clearTimeout(t);
  }, []);

  const markAllRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, read: true })));
    toast.success('All notifications marked as read.');
  };

  const markRead = (id) => {
    setNotifications(prev => prev.map(n => n.id === id ? { ...n, read: true } : n));
  };

  const dismiss = (id) => {
    setNotifications(prev => prev.filter(n => n.id !== id));
    toast.success('Notification dismissed.');
  };

  const filtered = notifications
    .filter(n => filterType === 'All' || n.type === filterType)
    .filter(n => filterRead === 'All' || (filterRead === 'Unread' ? !n.read : n.read))
    .filter(n => !showUnreadOnly || !n.read)
    .sort((a, b) => sortOrder === 'newest' ? 0 : -1);

  const unreadCount = notifications.filter(n => !n.read).length;

  return (
    <>
      <LoadingOverlay loading={loading} text="Loading Notifications..." />
      <DashboardLayout>
        {loading ? <DashboardSkeleton /> : (
          <div className="dashboard-home">
            <style>{`
              .admin-header{display:flex;justify-content:space-between;align-items:flex-end;margin-bottom:24px;flex-wrap:wrap;gap:16px;}
              .notif-card{background:#fff;border-radius:10px;padding:16px 20px;border:1px solid #f1f5f9;display:flex;align-items:flex-start;gap:14px;transition:all 0.2s;cursor:pointer;}
              .notif-card:hover{box-shadow:0 4px 14px rgba(0,0,0,0.06);border-color:#e2e8f0;}
              .notif-card.unread{border-left:3px solid #0f8a8f;background:#f8ffff;}
              .notif-list{display:flex;flex-direction:column;gap:10px;}
              .filter-row-section{display:flex;align-items:center;justify-content:space-between;flex-wrap:wrap;gap:16px;margin-bottom:20px;background:#f8fafc;padding:14px 16px;border-radius:8px;}
              .filter-group{display:flex;gap:12px;align-items:center;flex-wrap:wrap;}
              @media(max-width:768px){.admin-header{flex-direction:column;}.filter-row-section{flex-direction:column;}}
            `}</style>

            <motion.div className="admin-header" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
              <div>
                <h1 className="welcome-heading">Notifications <Badge count={unreadCount} style={{ backgroundColor: '#ef4444', marginLeft: 8 }} /></h1>
                <p className="welcome-sub">Stay updated with patient alerts, lab results and system messages.</p>
              </div>
              <Space>
                <Button type="default" onClick={markAllRead} icon={<CheckCircleOutlined />} style={{ borderRadius: 8 }}>Mark All Read</Button>
                <Button type="primary" icon={<BellOutlined />} style={{ borderRadius: 8 }}>Notification Settings</Button>
              </Space>
            </motion.div>

            {/* KPI */}
            <div className="stat-charts-row" style={{ marginTop: 0, display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 20 }}>
              <StatCardChart title="Total Notifications" value={String(notifications.length)} icon={<BellOutlined />} trend="System-wide" trendColor="#10b981" />
              <StatCardChart title="Unread" value={String(unreadCount)} icon={<InfoCircleOutlined />} trend="Requires attention" trendColor="#f59e0b" />
              <StatCardChart title="Critical Alerts" value={String(notifications.filter(n => n.priority === 'Urgent').length)} icon={<WarningOutlined />} trend="Act immediately" trendColor="#ef4444" />
              <StatCardChart title="Today's Activity" value="8" icon={<CheckCircleOutlined />} trend="New events today" trendColor="#0f8a8f" />
            </div>

            {/* Filters */}
            <motion.div style={{ background: '#fff', borderRadius: 12, padding: 24, marginTop: 24, boxShadow: '0 4px 16px rgba(0,0,0,0.02)' }} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
              <div className="filter-row-section">
                <div className="filter-group">
                  <Select value={filterType} onChange={setFilterType} style={{ width: 150 }}>
                    <Option value="All">All Types</Option>
                    <Option value="appointment">Appointment</Option>
                    <Option value="prescription">Prescription</Option>
                    <Option value="lab">Lab</Option>
                    <Option value="patient">Patient</Option>
                    <Option value="alert">Alert</Option>
                    <Option value="info">Info</Option>
                  </Select>
                  <Select value={filterRead} onChange={setFilterRead} style={{ width: 130 }}>
                    <Option value="All">All Messages</Option>
                    <Option value="Unread">Unread Only</Option>
                    <Option value="Read">Read Only</Option>
                  </Select>
                </div>
                <div className="filter-group">
                  <Space>
                    <SortAscendingOutlined style={{ color: '#64748b' }} />
                    <Select value={sortOrder} onChange={setSortOrder} style={{ width: 140 }}>
                      <Option value="newest">Newest First</Option>
                      <Option value="oldest">Oldest First</Option>
                    </Select>
                  </Space>
                  <Space>
                    <Text type="secondary" style={{ fontSize: 13 }}>Unread only</Text>
                    <Switch checked={showUnreadOnly} onChange={setShowUnreadOnly} />
                  </Space>
                  <Button icon={<ClearOutlined />} onClick={() => { setFilterType('All'); setFilterRead('All'); setShowUnreadOnly(false); setSortOrder('newest'); }}>Reset</Button>
                </div>
              </div>

              {filtered.length === 0 ? (
                <EmptyState title="No Notifications" description="You're all caught up! Nothing to show here." />
              ) : (
                <div className="notif-list">
                  <AnimatePresence>
                    {filtered.map(n => (
                      <motion.div
                        key={n.id}
                        className={`notif-card ${!n.read ? 'unread' : ''}`}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: 10 }}
                        onClick={() => markRead(n.id)}
                        layout
                      >
                        <div style={{ fontSize: 22, marginTop: 2 }}>{iconMap[n.type]}</div>
                        <div style={{ flex: 1 }}>
                          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: 8 }}>
                            <strong style={{ color: !n.read ? '#1e293b' : '#475569' }}>{n.title}</strong>
                            <Space size="small">
                              <Tag color={priorityTagColor[n.priority]}>{n.priority}</Tag>
                              <Tag color={!n.read ? 'cyan' : 'default'}>{!n.read ? 'Unread' : 'Read'}</Tag>
                              <Tag style={{ cursor: 'default', textTransform: 'capitalize', color: categoryColors[n.type] }}>{n.type}</Tag>
                            </Space>
                          </div>
                          <Text type="secondary" style={{ fontSize: 13 }}>{n.message}</Text>
                          <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 8, flexWrap: 'wrap', gap: 4 }}>
                            <Text type="secondary" style={{ fontSize: 12 }}>{n.time}</Text>
                            <Button size="small" danger ghost onClick={e => { e.stopPropagation(); dismiss(n.id); }}>Dismiss</Button>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </AnimatePresence>
                </div>
              )}
            </motion.div>
          </div>
        )}
      </DashboardLayout>
    </>
  );
};

export default Notifications;
