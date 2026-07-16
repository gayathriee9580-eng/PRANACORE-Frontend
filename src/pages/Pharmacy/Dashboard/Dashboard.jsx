import React, { useState, useEffect } from 'react';
import { Typography, Button, Tag, Row, Col, Card, Progress, Space } from 'antd';
import { AppstoreOutlined, ExperimentOutlined, FileTextOutlined, ShoppingCartOutlined, DatabaseOutlined, TeamOutlined, CreditCardOutlined, BarChartOutlined } from '@ant-design/icons';
import { motion } from 'framer-motion';
import DashboardLayout from '../../../layouts/DashboardLayout/DashboardLayout';
import { StatCardChart } from '../../../components/Charts';
import LoadingOverlay from '../../../components/LoadingOverlay';
import { DashboardSkeleton } from '../../../components/Skeletons';
import { useToast } from '../../../context/ToastContext';
import '../../../pages/Dashboard/DashboardHome/DashboardHome.css';

const { Title, Text } = Typography;

const quickStats = [
    { title: 'Total Medicines', value: '2,847', icon: <ExperimentOutlined />, trend: '+14 this week', trendColor: '#10b981' },
    { title: 'Pending Orders', value: '34', icon: <ShoppingCartOutlined />, trend: '8 urgent', trendColor: '#f59e0b' },
    { title: 'Low Stock Items', value: '12', icon: <DatabaseOutlined />, trend: 'Reorder needed', trendColor: '#ef4444' },
    { title: 'Today\'s Revenue', value: '₹18,420', icon: <CreditCardOutlined />, trend: '+6% vs yesterday', trendColor: '#3b82f6' },
];

const recentActivity = [
    { id: 1, action: 'Prescription fulfilled', patient: 'Patient Name 5', time: '5 min ago', status: 'Completed' },
    { id: 2, action: 'Stock updated — Amoxicillin', patient: 'System', time: '12 min ago', status: 'Updated' },
    { id: 3, action: 'New order received', patient: 'Supplier A', time: '25 min ago', status: 'Pending' },
    { id: 4, action: 'Prescription fulfilled', patient: 'Patient Name 12', time: '1 hr ago', status: 'Completed' },
    { id: 5, action: 'Low stock alert — Metformin', patient: 'System', time: '2 hr ago', status: 'Alert' },
];

const statusColors = { Completed: '#10b981', Updated: '#3b82f6', Pending: '#f59e0b', Alert: '#ef4444' };

const PharmacyDashboard = () => {
    const toast = useToast();
    const [loading, setLoading] = useState(true);
    useEffect(() => { const t = setTimeout(() => setLoading(false), 1000); return () => clearTimeout(t); }, []);

    return (
        <>
            <LoadingOverlay loading={loading} text="Loading Pharmacy Dashboard..." />
            <DashboardLayout>
                {loading ? <DashboardSkeleton /> : (
                    <div className="dashboard-home">
                        <style>{`.admin-header{display:flex;justify-content:space-between;align-items:flex-end;margin-bottom:24px;flex-wrap:wrap;gap:16px;} @media(max-width:768px){.admin-header{flex-direction:column;}}`}</style>
                        <motion.div className="admin-header" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
                            <div>
                                <h1 className="welcome-heading">Pharmacy Dashboard</h1>
                                <p className="welcome-sub">Welcome back. Here's your pharmacy at a glance.</p>
                            </div>
                            <Space>
                                <Button type="primary" icon={<ShoppingCartOutlined />} size="large" style={{ borderRadius: 8 }} onClick={() => toast.success('New order initiated.')}>New Order</Button>
                            </Space>
                        </motion.div>

                        <div className="stat-charts-row" style={{ marginTop: 0, display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 20 }}>
                            {quickStats.map(s => <StatCardChart key={s.title} title={s.title} value={s.value} icon={s.icon} trend={s.trend} trendColor={s.trendColor} />)}
                        </div>

                        <motion.div style={{ background: '#fff', borderRadius: 12, padding: 24, marginTop: 24, boxShadow: '0 4px 16px rgba(0,0,0,0.02)' }} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
                            <Title level={5} style={{ marginBottom: 16 }}>Recent Activity</Title>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                                {recentActivity.map(a => (
                                    <div key={a.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '12px 0', borderBottom: '1px solid #f1f5f9', flexWrap: 'wrap', gap: 8 }}>
                                        <div>
                                            <strong style={{ fontSize: 14 }}>{a.action}</strong>
                                            <div><Text type="secondary" style={{ fontSize: 12 }}>{a.patient} · {a.time}</Text></div>
                                        </div>
                                        <span style={{ color: statusColors[a.status], background: statusColors[a.status] + '18', padding: '3px 12px', borderRadius: 10, fontSize: '0.8rem', fontWeight: 600 }}>{a.status}</span>
                                    </div>
                                ))}
                            </div>
                        </motion.div>

                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: 20, marginTop: 20 }}>
                            <motion.div style={{ background: '#fff', borderRadius: 12, padding: 24, boxShadow: '0 4px 16px rgba(0,0,0,0.02)' }} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }}>
                                <Title level={5} style={{ marginBottom: 16 }}>Stock Health</Title>
                                {[{ name: 'Antibiotics', pct: 72 }, { name: 'Analgesics', pct: 45 }, { name: 'Antidiabetics', pct: 88 }, { name: 'Cardiovascular', pct: 31 }].map(s => (
                                    <div key={s.name} style={{ marginBottom: 14 }}>
                                        <div style={{ display: 'flex', justifyContent: 'space-between' }}><Text style={{ fontSize: 13 }}>{s.name}</Text><Text style={{ fontSize: 13, color: s.pct < 40 ? '#ef4444' : '#10b981' }}>{s.pct}%</Text></div>
                                        <Progress percent={s.pct} showInfo={false} strokeColor={s.pct < 40 ? '#ef4444' : '#10b981'} trailColor="#e2e8f0" />
                                    </div>
                                ))}
                            </motion.div>
                            <motion.div style={{ background: '#fff', borderRadius: 12, padding: 24, boxShadow: '0 4px 16px rgba(0,0,0,0.02)' }} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
                                <Title level={5} style={{ marginBottom: 16 }}>Quick Actions</Title>
                                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
                                    {[
                                        { label: 'Add Medicine', icon: <ExperimentOutlined />, color: '#0f8a8f' },
                                        { label: 'New Prescription', icon: <FileTextOutlined />, color: '#3b82f6' },
                                        { label: 'View Inventory', icon: <DatabaseOutlined />, color: '#f59e0b' },
                                        { label: 'Contact Supplier', icon: <TeamOutlined />, color: '#8b5cf6' },
                                    ].map(a => (
                                        <motion.div key={a.label} whileHover={{ scale: 1.03 }} style={{ background: a.color + '10', borderRadius: 10, padding: '14px 10px', cursor: 'pointer', textAlign: 'center', border: `1px solid ${a.color}20` }} onClick={() => toast.success(`${a.label} opened.`)}>
                                            <div style={{ fontSize: 22, color: a.color, marginBottom: 6 }}>{a.icon}</div>
                                            <Text style={{ fontSize: 12, fontWeight: 600, color: a.color }}>{a.label}</Text>
                                        </motion.div>
                                    ))}
                                </div>
                            </motion.div>
                        </div>
                    </div>
                )}
            </DashboardLayout>
        </>
    );
};

export default PharmacyDashboard;
