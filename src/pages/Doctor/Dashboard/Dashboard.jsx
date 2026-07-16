import React, { useState, useEffect } from 'react';
import { Button, Row, Col, Card, Table, Tag, Space, Avatar, List, Timeline, Typography, Progress } from 'antd';
import {
  CalendarOutlined,
  MedicineBoxOutlined,
  UserOutlined,
  FileTextOutlined,
  ExperimentOutlined,
  ClockCircleOutlined,
  BellOutlined,
  SettingOutlined,
  RightOutlined,
  VideoCameraOutlined,
  HeartOutlined,
  CheckCircleOutlined
} from '@ant-design/icons';
import { motion } from 'framer-motion';
import {
  LineChart, Line, BarChart, Bar, PieChart, Pie, AreaChart, Area,
  XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend, Cell
} from 'recharts';

import DashboardLayout from '../../../layouts/DashboardLayout/DashboardLayout';
import { StatCardChart } from '../../../components/Charts';
import LoadingOverlay from '../../../components/LoadingOverlay';
import { DashboardSkeleton } from '../../../components/Skeletons';
import { useToast } from '../../../context/ToastContext';
import '../../../pages/Dashboard/DashboardHome/DashboardHome.css';

const { Title, Text } = Typography;

// --- Mock Data ---
const appointmentsTrendData = [
  { time: '09:00', patients: 2 },
  { time: '10:00', patients: 4 },
  { time: '11:00', patients: 3 },
  { time: '12:00', patients: 5 },
  { time: '13:00', patients: 1 },
  { time: '14:00', patients: 6 },
  { time: '15:00', patients: 4 },
];

const weeklyConsultationsData = [
  { day: 'Mon', count: 12 },
  { day: 'Tue', count: 18 },
  { day: 'Wed', count: 15 },
  { day: 'Thu', count: 20 },
  { day: 'Fri', count: 14 },
  { day: 'Sat', count: 8 },
  { day: 'Sun', count: 2 },
];

const patientDistributionData = [
  { name: 'Cardiology', value: 45 },
  { name: 'Neurology', value: 25 },
  { name: 'Pediatrics', value: 20 },
  { name: 'Orthopedics', value: 10 },
];
const COLORS = ['#0f8a8f', '#10b981', '#f59e0b', '#3b82f6'];

const monthlyGrowthData = [
  { month: 'Jan', newPatients: 40 },
  { month: 'Feb', newPatients: 45 },
  { month: 'Mar', newPatients: 55 },
  { month: 'Apr', newPatients: 50 },
  { month: 'May', newPatients: 70 },
  { month: 'Jun', newPatients: 85 },
];

const todayAppointments = [
  { id: '1', time: '09:00 AM', name: 'John Doe', department: 'General', type: 'Consultation', status: 'Waiting' },
  { id: '2', time: '10:30 AM', name: 'Jane Smith', department: 'Cardiology', type: 'Follow-up', status: 'In Progress' },
  { id: '3', time: '11:15 AM', name: 'Mike Johnson', department: 'General', type: 'Consultation', status: 'Completed' },
  { id: '4', time: '02:00 PM', name: 'Emily Davis', department: 'Pediatrics', type: 'Check-up', status: 'Scheduled' },
  { id: '5', time: '03:30 PM', name: 'David Wilson', department: 'Orthopedics', type: 'Surgery', status: 'Scheduled' },
];

const recentPatients = [
  { id: 1, name: 'Sarah Wilson', age: 45, lastVisit: '2026-06-15', diagnosis: 'Hypertension', img: 'https://i.pravatar.cc/150?u=1' },
  { id: 2, name: 'Robert Brown', age: 32, lastVisit: '2026-07-02', diagnosis: 'Migraine', img: 'https://i.pravatar.cc/150?u=2' },
  { id: 3, name: 'Linda Miller', age: 28, lastVisit: '2026-07-10', diagnosis: 'Anemia', img: 'https://i.pravatar.cc/150?u=3' },
  { id: 4, name: 'James Taylor', age: 54, lastVisit: '2026-07-12', diagnosis: 'Diabetes Type II', img: 'https://i.pravatar.cc/150?u=4' },
];

const notifications = [
  { id: 1, text: 'Appointment Reminder: John Doe at 09:00 AM', time: '10 min ago', color: 'blue' },
  { id: 2, text: 'Lab Result Ready for Patient #1024', time: '1 hour ago', color: 'green' },
  { id: 3, text: 'New Patient Assigned (Emily Davis)', time: '3 hours ago', color: 'orange' },
  { id: 4, text: 'Emergency Alert: ICU Room 4', time: '5 hours ago', color: 'red' },
];

const statusColors = {
  'Waiting': 'warning',
  'In Progress': 'processing',
  'Completed': 'success',
  'Scheduled': 'default',
};

// --- Subcomponents ---
const QuickActionCard = ({ icon, title, color }) => (
  <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} style={{ height: '100%' }}>
    <Card hoverable style={{ textAlign: 'center', borderRadius: '12px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.03)', height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center' }} bodyStyle={{ padding: '24px 16px' }}>
      <div style={{ fontSize: '28px', color, marginBottom: '12px' }}>{icon}</div>
      <div style={{ fontWeight: 500, color: '#334155', fontSize: '0.9rem' }}>{title}</div>
    </Card>
  </motion.div>
);

const Dashboard = () => {
  const toast = useToast();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // 1-second simulated loading state
    const timer = setTimeout(() => setLoading(false), 1000);
    return () => clearTimeout(timer);
  }, []);

  const handleConsultation = (name) => {
    toast.success(`Opening consultation window for ${name}`);
  };

  const tableColumns = [
    { title: 'Time', dataIndex: 'time', key: 'time', render: text => <strong>{text}</strong> },
    { title: 'Patient', dataIndex: 'name', key: 'name' },
    { title: 'Department', dataIndex: 'department', key: 'department', render: text => <Tag color="blue">{text}</Tag> },
    { title: 'Visit Type', dataIndex: 'type', key: 'type' },
    { title: 'Status', dataIndex: 'status', key: 'status', render: status => <Tag color={statusColors[status]}>{status}</Tag> },
    {
      title: 'Action',
      key: 'action',
      render: (_, record) => (
        <Button type="link" onClick={() => handleConsultation(record.name)}>Open Consultation <RightOutlined /></Button>
      ),
    },
  ];

  return (
    <>
      <LoadingOverlay loading={loading} text="Connecting to PRANACORE secure servers..." />
      <DashboardLayout>
        {loading ? (
          <DashboardSkeleton />
        ) : (
          <div className="dashboard-home">
            <style>{`
              .admin-header { display: flex; justify-content: space-between; align-items: flex-end; margin-bottom: 24px; flex-wrap: wrap; gap: 16px; }
              .welcome-heading { font-size: 2rem; font-weight: 700; color: #1e293b; margin: 0; }
              .welcome-sub { color: #64748b; font-size: 1.1rem; margin-top: 4px; }
              .custom-card { border-radius: 16px; box-shadow: 0 4px 16px rgba(0,0,0,0.03); border: none; margin-bottom: 24px; }
              .custom-card .ant-card-head { border-bottom: 1px solid #f1f5f9; background: #fff; border-radius: 16px 16px 0 0; padding: 0 24px; min-height: 60px; }
              .custom-card .ant-card-head-title { font-weight: 600; color: #334155; display: flex; align-items: center; gap: 10px; }
              @media (max-width: 768px) { .admin-header { flex-direction: column; align-items: flex-start; } }
            `}</style>

            {/* 1. Hero Section */}
            <motion.div className="admin-header" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
              <div>
                <h1 className="welcome-heading">Doctor Dashboard</h1>
                <p className="welcome-sub">Welcome back, Doctor. Here's your schedule and patient overview for today.</p>
              </div>
              <Space>
                <Button type="default" icon={<CalendarOutlined />} size="large" style={{ borderRadius: '8px' }}>View Schedule</Button>
                <Button type="primary" icon={<MedicineBoxOutlined />} size="large" style={{ borderRadius: '8px' }}>New Prescription</Button>
              </Space>
            </motion.div>

            {/* 2. KPI Statistics */}
            <div className="stat-charts-row" style={{ marginTop: '0', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '24px', marginBottom: '24px' }}>
              <motion.div whileHover={{ y: -5 }}><StatCardChart title="Today's Appointments" value="12" icon={<CalendarOutlined />} trend="+3 vs yesterday" trendColor="#10b981" /></motion.div>
              <motion.div whileHover={{ y: -5 }}><StatCardChart title="Waiting Patients" value="4" icon={<ClockCircleOutlined />} trend="On schedule" trendColor="#0f8a8f" /></motion.div>
              <motion.div whileHover={{ y: -5 }}><StatCardChart title="Completed Consultations" value="28" icon={<CheckCircleOutlined />} trend="+15% this week" trendColor="#10b981" /></motion.div>
              <motion.div whileHover={{ y: -5 }}><StatCardChart title="Pending Reports" value="7" icon={<FileTextOutlined />} trend="Needs review" trendColor="#f59e0b" /></motion.div>
            </div>

            {/* 3. Quick Actions */}
            <Row gutter={[16, 16]} style={{ marginBottom: '24px' }}>
              <Col xs={12} sm={8} md={6} lg={3}><QuickActionCard title="Patients" icon={<UserOutlined />} color="#3b82f6" /></Col>
              <Col xs={12} sm={8} md={6} lg={3}><QuickActionCard title="Appointments" icon={<CalendarOutlined />} color="#10b981" /></Col>
              <Col xs={12} sm={8} md={6} lg={3}><QuickActionCard title="Records" icon={<FolderOpenOutlined />} color="#8b5cf6" /></Col>
              <Col xs={12} sm={8} md={6} lg={3}><QuickActionCard title="Prescriptions" icon={<MedicineBoxOutlined />} color="#f59e0b" /></Col>
              <Col xs={12} sm={8} md={6} lg={3}><QuickActionCard title="Lab Reports" icon={<ExperimentOutlined />} color="#ef4444" /></Col>
              <Col xs={12} sm={8} md={6} lg={3}><QuickActionCard title="Schedule" icon={<ClockCircleOutlined />} color="#0f8a8f" /></Col>
              <Col xs={12} sm={8} md={6} lg={3}><QuickActionCard title="Notifications" icon={<BellOutlined />} color="#6366f1" /></Col>
              <Col xs={12} sm={8} md={6} lg={3}><QuickActionCard title="Profile" icon={<SettingOutlined />} color="#64748b" /></Col>
            </Row>

            <Row gutter={[24, 24]}>
              {/* 4. Charts */}
              <Col xs={24} lg={12}>
                <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}>
                  <Card className="custom-card" title={<><CalendarOutlined style={{ color: '#0f8a8f' }} /> Appointments Trend</>}>
                    <ResponsiveContainer width="100%" height={250}>
                      <LineChart data={appointmentsTrendData}>
                        <CartesianGrid strokeDasharray="3 3" vertical={false} />
                        <XAxis dataKey="time" />
                        <YAxis />
                        <Tooltip />
                        <Line type="monotone" dataKey="patients" stroke="#0f8a8f" strokeWidth={3} dot={{ r: 4 }} activeDot={{ r: 6 }} />
                      </LineChart>
                    </ResponsiveContainer>
                  </Card>
                </motion.div>
              </Col>
              <Col xs={24} lg={12}>
                <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}>
                  <Card className="custom-card" title={<><UserOutlined style={{ color: '#0f8a8f' }} /> Weekly Consultations</>}>
                    <ResponsiveContainer width="100%" height={250}>
                      <BarChart data={weeklyConsultationsData}>
                        <CartesianGrid strokeDasharray="3 3" vertical={false} />
                        <XAxis dataKey="day" />
                        <YAxis />
                        <Tooltip cursor={{ fill: 'rgba(15,138,143,0.1)' }} />
                        <Bar dataKey="count" fill="#10b981" radius={[4, 4, 0, 0]} barSize={40} />
                      </BarChart>
                    </ResponsiveContainer>
                  </Card>
                </motion.div>
              </Col>

              {/* 5. Today's Appointments Table */}
              <Col xs={24}>
                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
                  <Card className="custom-card" title="Today's Appointments" extra={<Button type="link">View All Schedule</Button>}>
                    <Table
                      columns={tableColumns}
                      dataSource={todayAppointments}
                      pagination={false}
                      rowKey="id"
                      scroll={{ x: 800 }}
                    />
                  </Card>
                </motion.div>
              </Col>

              {/* 6. Recent Patients Grid & Notifications */}
              <Col xs={24} lg={16}>
                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
                  <Card className="custom-card" title="Recent Patients">
                    <Row gutter={[16, 16]}>
                      {recentPatients.map(patient => (
                        <Col xs={24} sm={12} md={12} xl={12} key={patient.id}>
                          <Card hoverable style={{ borderRadius: '12px', border: '1px solid #f1f5f9' }} bodyStyle={{ padding: '16px' }}>
                            <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
                              <Avatar src={patient.img} size={64} style={{ border: '2px solid #0f8a8f' }} />
                              <div>
                                <h4 style={{ margin: 0, color: '#1e293b', fontWeight: 600 }}>{patient.name}</h4>
                                <Text type="secondary" style={{ fontSize: '0.85rem' }}>Age: {patient.age} • {patient.diagnosis}</Text>
                                <div style={{ fontSize: '0.8rem', color: '#64748b', marginTop: '4px' }}>Last Visit: {new Date(patient.lastVisit).toLocaleDateString()}</div>
                              </div>
                            </div>
                            <Divider style={{ margin: '12px 0' }} />
                            <Space style={{ display: 'flex', justifyContent: 'center' }}>
                              <Button size="small" type="primary" ghost>Profile</Button>
                              <Button size="small">Records</Button>
                              <Button size="small" icon={<VideoCameraOutlined />}></Button>
                            </Space>
                          </Card>
                        </Col>
                      ))}
                    </Row>
                  </Card>
                </motion.div>

                {/* More Charts Row */}
                <Row gutter={[24, 24]}>
                  <Col xs={24} md={12}>
                    <Card className="custom-card" title={<><HeartOutlined style={{ color: '#0f8a8f' }} /> Patient Distribution</>}>
                      <ResponsiveContainer width="100%" height={250}>
                        <PieChart>
                          <Pie data={patientDistributionData} cx="50%" cy="50%" innerRadius={60} outerRadius={80} paddingAngle={5} dataKey="value">
                            {patientDistributionData.map((entry, index) => <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />)}
                          </Pie>
                          <Tooltip />
                          <Legend verticalAlign="bottom" height={36} />
                        </PieChart>
                      </ResponsiveContainer>
                    </Card>
                  </Col>
                  <Col xs={24} md={12}>
                    <Card className="custom-card" title={<><LineChart style={{ color: '#0f8a8f' }} /> Monthly Growth</>}>
                      <ResponsiveContainer width="100%" height={250}>
                        <AreaChart data={monthlyGrowthData}>
                          <CartesianGrid strokeDasharray="3 3" vertical={false} />
                          <XAxis dataKey="month" />
                          <YAxis />
                          <Tooltip />
                          <Area type="monotone" dataKey="newPatients" stroke="#3b82f6" fill="rgba(59,130,246,0.2)" strokeWidth={3} />
                        </AreaChart>
                      </ResponsiveContainer>
                    </Card>
                  </Col>
                </Row>
              </Col>

              <Col xs={24} lg={8}>
                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
                  <Card className="custom-card" title={<><BellOutlined style={{ color: '#0f8a8f' }} /> Notifications</>} bodyStyle={{ padding: '24px' }}>
                    <Timeline>
                      {notifications.map(notif => (
                        <Timeline.Item key={notif.id} color={notif.color}>
                          <p style={{ margin: 0, fontWeight: 500, color: '#334155' }}>{notif.text}</p>
                          <Text type="secondary" style={{ fontSize: '0.8rem' }}>{notif.time}</Text>
                        </Timeline.Item>
                      ))}
                    </Timeline>
                    <Button type="dashed" block style={{ marginTop: '16px' }}>View All Notifications</Button>
                  </Card>

                  <Card className="custom-card" title={<><MedicineBoxOutlined style={{ color: '#0f8a8f' }} /> Health Tips Reminder</>} style={{ background: '#f0fdfa', border: '1px solid #ccfbf1' }}>
                    <p style={{ margin: 0, color: '#0f766e', fontWeight: 500 }}>
                      "Ensure to review the updated flu vaccination protocols for elderly patients arriving this winter season."
                    </p>
                  </Card>

                  <Card className="custom-card" title={<><SettingOutlined style={{ color: '#0f8a8f' }} /> System Status</>} bodyStyle={{ padding: '24px' }}>
                    <div style={{ marginBottom: '16px' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px' }}>
                        <Text>Appointments Capacity</Text><Text strong>80%</Text>
                      </div>
                      <Progress percent={80} strokeColor="#10b981" showInfo={false} />
                    </div>
                    <div style={{ marginBottom: '16px' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px' }}>
                        <Text>Lab Reports Processing</Text><Text strong>45%</Text>
                      </div>
                      <Progress percent={45} strokeColor="#3b82f6" showInfo={false} />
                    </div>
                    <div style={{ marginBottom: '16px' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px' }}>
                        <Text>Prescriptions Sync</Text><Text strong>100%</Text>
                      </div>
                      <Progress percent={100} strokeColor="#10b981" showInfo={false} />
                    </div>
                    <div>
                      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px' }}>
                        <Text>System Availability</Text><Text strong>99.9%</Text>
                      </div>
                      <Progress percent={99.9} strokeColor="#0f8a8f" showInfo={false} />
                    </div>
                  </Card>
                </motion.div>
              </Col>
            </Row>
          </div>
        )}
      </DashboardLayout>
    </>
  );
};

export default Dashboard;
