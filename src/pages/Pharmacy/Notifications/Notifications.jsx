import React, { useState, useEffect } from 'react';
import { Button, Tag, Typography, Space, Switch, Select, Badge, AnimatePresence } from 'antd';
import { BellOutlined, CheckCircleOutlined, WarningOutlined, InfoCircleOutlined, ExperimentOutlined, ShoppingCartOutlined, ClearOutlined, SortAscendingOutlined } from '@ant-design/icons';
import { motion } from 'framer-motion';
import DashboardLayout from '../../../layouts/DashboardLayout/DashboardLayout';
import { StatCardChart } from '../../../components/Charts';
import LoadingOverlay from '../../../components/LoadingOverlay';
import EmptyState from '../../../components/EmptyState';
import { DashboardSkeleton } from '../../../components/Skeletons';
import { useToast } from '../../../context/ToastContext';
import '../../../pages/Dashboard/DashboardHome/DashboardHome.css';

const { Text, Title } = Typography;

const iconMap = {
    order: <ShoppingCartOutlined style={{ color: '#3b82f6' }} />,
    inventory: <ExperimentOutlined style={{ color: '#10b981' }} />,
    payment: <CheckCircleOutlined style={{ color: '#8b5cf6' }} />,
    alert: <WarningOutlined style={{ color: '#ef4444' }} />,
    info: <InfoCircleOutlined style={{ color: '#64748b' }} />,
};

const mockNotifications = [
    { id: 'N001', type: 'alert', title: 'Critical Stock Alert', message: 'Amoxicillin 500mg is almost out of stock (4 units remaining).', time: '5 min ago', read: false, priority: 'Urgent' },
    { id: 'N002', type: 'order', title: 'New Order Received', message: 'Order ORD-10014 from Supplier B Healthcare has been placed.', time: '20 min ago', read: false, priority: 'Normal' },
    { id: 'N003', type: 'payment', title: 'Payment Received', message: 'Payment of ₹3,480 received for PAY-7012 via UPI.', time: '45 min ago', read: false, priority: 'Normal' },
    { id: 'N004', type: 'inventory', title: 'Stock Updated', message: 'Metformin 500mg stock replenished to 350 units.', time: '1 hr ago', read: true, priority: 'Normal' },
    { id: 'N005', type: 'alert', title: 'Expiry Warning', message: 'Cetirizine batch BTN-2024-112 expires in 30 days.', time: '2 hr ago', read: false, priority: 'High' },
    { id: 'N006', type: 'order', title: 'Order Delivered', message: 'Order ORD-10008 from Supplier A has been delivered and verified.', time: '3 hr ago', read: true, priority: 'Normal' },
    { id: 'N007', type: 'payment', title: 'Refund Processed', message: 'Refund of ₹840 issued for PAY-7003.', time: '4 hr ago', read: true, priority: 'Normal' },
    { id: 'N008', type: 'info', title: 'System Maintenance', message: 'PRANACORE scheduled maintenance on July 20 from 2–4 AM.', time: '6 hr ago', read: true, priority: 'Normal' },
    { id: 'N009', type: 'alert', title: 'Prescription Backlog', message: '12 prescriptions are pending dispense for over 2 hours.', time: '8 hr ago', read: false, priority: 'High' },
    { id: 'N010', type: 'inventory', title: 'Low Stock — Ibuprofen', message: 'Ibuprofen 400mg has dropped below minimum reorder threshold.', time: '10 hr ago', read: true, priority: 'High' },
];

const priorityTagColor = { Urgent: 'red', High: 'orange', Normal: 'default' };

const Notifications = () => {
    const toast = useToast();
    const [loading, setLoading] = useState(true);
    const [notifications, setNotifications] = useState(mockNotifications);
    const [filterType, setFilterType] = useState('All');
    const [showUnreadOnly, setShowUnreadOnly] = useState(false);

    useEffect(() => { const t = setTimeout(() => setLoading(false), 1000); return () => clearTimeout(t); }, []);

    const markAllRead = () => { setNotifications(prev => prev.map(n => ({ ...n, read: true }))); toast.success('All notifications marked as read.'); };
    const markRead = id => setNotifications(prev => prev.map(n => n.id === id ? { ...n, read: true } : n));
    const dismiss = id => { setNotifications(prev => prev.filter(n => n.id !== id)); toast.success('Notification dismissed.'); };

    const filtered = notifications.filter(n => filterType === 'All' || n.type === filterType).filter(n => !showUnreadOnly || !n.read);
    const unreadCount = notifications.filter(n => !n.read).length;

    return (
        <>
            <LoadingOverlay loading={loading} text="Loading Notifications..." />
            <DashboardLayout>
                {loading ? <DashboardSkeleton /> : (
                    <div className="dashboard-home">
                        <style>{`.admin-header{display:flex;justify-content:space-between;align-items:flex-end;margin-bottom:24px;flex-wrap:wrap;gap:16px;}.notif-card{background:#fff;border-radius:10px;padding:16px 20px;border:1px solid #f1f5f9;display:flex;align-items:flex-start;gap:14px;transition:all 0.2s;cursor:pointer;}.notif-card:hover{box-shadow:0 4px 14px rgba(0,0,0,0.06);}.notif-card.unread{border-left:3px solid #0f8a8f;background:#f8ffff;}.notif-list{display:flex;flex-direction:column;gap:10px;}.filter-row-section{display:flex;align-items:center;justify-content:space-between;flex-wrap:wrap;gap:16px;margin-bottom:20px;background:#f8fafc;padding:14px 16px;border-radius:8px;}.filter-group{display:flex;gap:12px;align-items:center;flex-wrap:wrap;} @media(max-width:768px){.admin-header{flex-direction:column;}}`}</style>
                        <motion.div className="admin-header" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
                            <div><h1 className="welcome-heading">Notifications <Badge count={unreadCount} style={{ backgroundColor: '#ef4444', marginLeft: 8 }} /></h1><p className="welcome-sub">Pharmacy alerts, stock warnings, and order updates.</p></div>
                            <Space>
                                <Button type="default" onClick={markAllRead} icon={<CheckCircleOutlined />} style={{ borderRadius: 8 }}>Mark All Read</Button>
                                <Button type="primary" icon={<BellOutlined />} style={{ borderRadius: 8 }}>Settings</Button>
                            </Space>
                        </motion.div>
                        <div className="stat-charts-row" style={{ marginTop: 0, display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px,1fr))', gap: 20 }}>
                            <StatCardChart title="Total" value={String(notifications.length)} icon={<BellOutlined />} trend="All types" trendColor="#10b981" />
                            <StatCardChart title="Unread" value={String(unreadCount)} icon={<InfoCircleOutlined />} trend="Requires attention" trendColor="#f59e0b" />
                            <StatCardChart title="Critical Alerts" value={String(notifications.filter(n => n.priority === 'Urgent').length)} icon={<WarningOutlined />} trend="Act immediately" trendColor="#ef4444" />
                            <StatCardChart title="Today" value="4" icon={<CheckCircleOutlined />} trend="New today" trendColor="#0f8a8f" />
                        </div>
                        <motion.div style={{ background: '#fff', borderRadius: 12, padding: 24, marginTop: 24, boxShadow: '0 4px 16px rgba(0,0,0,0.02)' }} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
                            <div className="filter-row-section">
                                <div className="filter-group">
                                    <Select value={filterType} onChange={setFilterType} style={{ width: 150 }}>
                                        <Select.Option value="All">All Types</Select.Option>
                                        <Select.Option value="order">Orders</Select.Option>
                                        <Select.Option value="inventory">Inventory</Select.Option>
                                        <Select.Option value="payment">Payments</Select.Option>
                                        <Select.Option value="alert">Alerts</Select.Option>
                                        <Select.Option value="info">Info</Select.Option>
                                    </Select>
                                </div>
                                <div className="filter-group">
                                    <Space><Text type="secondary" style={{ fontSize: 13 }}>Unread only</Text><Switch checked={showUnreadOnly} onChange={setShowUnreadOnly} /></Space>
                                    <Button icon={<ClearOutlined />} onClick={() => { setFilterType('All'); setShowUnreadOnly(false); }}>Reset</Button>
                                </div>
                            </div>
                            {filtered.length === 0 ? <EmptyState title="No Notifications" description="You're all caught up!" /> : (
                                <div className="notif-list">
                                    {filtered.map(n => (
                                        <motion.div key={n.id} className={`notif-card ${!n.read ? 'unread' : ''}`} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} onClick={() => markRead(n.id)} layout>
                                            <div style={{ fontSize: 22, marginTop: 2 }}>{iconMap[n.type]}</div>
                                            <div style={{ flex: 1 }}>
                                                <div style={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: 8 }}>
                                                    <strong style={{ color: !n.read ? '#1e293b' : '#475569' }}>{n.title}</strong>
                                                    <Space size="small"><Tag color={priorityTagColor[n.priority]}>{n.priority}</Tag><Tag color={!n.read ? 'cyan' : 'default'}>{!n.read ? 'Unread' : 'Read'}</Tag></Space>
                                                </div>
                                                <Text type="secondary" style={{ fontSize: 13 }}>{n.message}</Text>
                                                <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 8, flexWrap: 'wrap', gap: 4 }}>
                                                    <Text type="secondary" style={{ fontSize: 12 }}>{n.time}</Text>
                                                    <Button size="small" danger ghost onClick={e => { e.stopPropagation(); dismiss(n.id); }}>Dismiss</Button>
                                                </div>
                                            </div>
                                        </motion.div>
                                    ))}
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
