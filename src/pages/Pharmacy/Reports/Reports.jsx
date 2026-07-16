import React, { useState, useEffect } from 'react';
import { Button, Tag, Typography, Space, Row, Col, Progress } from 'antd';
import { BarChartOutlined, ExportOutlined, ExperimentOutlined, ShoppingCartOutlined, CreditCardOutlined, DatabaseOutlined, TeamOutlined } from '@ant-design/icons';
import { motion } from 'framer-motion';
import DashboardLayout from '../../../layouts/DashboardLayout/DashboardLayout';
import { StatCardChart } from '../../../components/Charts';
import LoadingOverlay from '../../../components/LoadingOverlay';
import { DashboardSkeleton } from '../../../components/Skeletons';
import { useToast } from '../../../context/ToastContext';
import '../../../pages/Dashboard/DashboardHome/DashboardHome.css';

const { Title, Text } = Typography;

const topMedicines = [
    { name: 'Paracetamol 500mg', sales: 1200, pct: 95 },
    { name: 'Amoxicillin 250mg', sales: 980, pct: 78 },
    { name: 'Metformin 500mg', sales: 870, pct: 69 },
    { name: 'Cetirizine 10mg', sales: 760, pct: 60 },
    { name: 'Omeprazole 20mg', sales: 640, pct: 51 },
];

const categoryBreakdown = [
    { name: 'Antibiotics', value: 32, color: '#3b82f6' },
    { name: 'Analgesics', value: 28, color: '#10b981' },
    { name: 'Antidiabetics', value: 18, color: '#f59e0b' },
    { name: 'Cardiovascular', value: 12, color: '#ef4444' },
    { name: 'Others', value: 10, color: '#8b5cf6' },
];

const Reports = () => {
    const toast = useToast();
    const [loading, setLoading] = useState(true);
    useEffect(() => { const t = setTimeout(() => setLoading(false), 1000); return () => clearTimeout(t); }, []);

    return (
        <>
            <LoadingOverlay loading={loading} text="Generating Reports..." />
            <DashboardLayout>
                {loading ? <DashboardSkeleton /> : (
                    <div className="dashboard-home">
                        <style>{`.admin-header{display:flex;justify-content:space-between;align-items:flex-end;margin-bottom:24px;flex-wrap:wrap;gap:16px;} .report-card{background:#fff;border-radius:12px;padding:24px;box-shadow:0 4px 16px rgba(0,0,0,0.02);} @media(max-width:768px){.admin-header{flex-direction:column;}}`}</style>
                        <motion.div className="admin-header" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
                            <div><h1 className="welcome-heading">Reports</h1><p className="welcome-sub">Analytics and insights for your pharmacy operations.</p></div>
                            <Space>
                                <Button type="default" icon={<ExportOutlined />} size="large" style={{ borderRadius: 8 }} onClick={() => toast.success('Report exported as PDF.')}>Export PDF</Button>
                                <Button type="primary" icon={<BarChartOutlined />} size="large" style={{ borderRadius: 8 }} onClick={() => toast.success('Custom report generation started.')}>Custom Report</Button>
                            </Space>
                        </motion.div>
                        <div className="stat-charts-row" style={{ marginTop: 0, display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px,1fr))', gap: 20 }}>
                            <StatCardChart title="Monthly Revenue" value="₹4,23,800" icon={<CreditCardOutlined />} trend="+12% vs last month" trendColor="#10b981" />
                            <StatCardChart title="Medicines Sold" value="12,480" icon={<ExperimentOutlined />} trend="+8% vs last month" trendColor="#0f8a8f" />
                            <StatCardChart title="Prescriptions Filled" value="847" icon={<ShoppingCartOutlined />} trend="+5% vs last month" trendColor="#3b82f6" />
                            <StatCardChart title="Supplier Orders" value="34" icon={<TeamOutlined />} trend="Active orders" trendColor="#f59e0b" />
                        </div>
                        <Row gutter={[20, 20]} style={{ marginTop: 20 }}>
                            <Col xs={24} lg={14}>
                                <motion.div className="report-card" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
                                    <Title level={5} style={{ marginBottom: 20 }}>Top Selling Medicines (This Month)</Title>
                                    {topMedicines.map((m, i) => (
                                        <div key={m.name} style={{ marginBottom: 16 }}>
                                            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 4 }}>
                                                <Text style={{ fontSize: 13, fontWeight: 500 }}>#{i + 1} {m.name}</Text>
                                                <Text style={{ fontSize: 13, color: '#0f8a8f', fontWeight: 600 }}>{m.sales.toLocaleString()} units</Text>
                                            </div>
                                            <Progress percent={m.pct} showInfo={false} strokeColor="#0f8a8f" trailColor="#e2e8f0" />
                                        </div>
                                    ))}
                                </motion.div>
                            </Col>
                            <Col xs={24} lg={10}>
                                <motion.div className="report-card" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }}>
                                    <Title level={5} style={{ marginBottom: 20 }}>Sales by Category</Title>
                                    {categoryBreakdown.map(c => (
                                        <div key={c.name} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 14 }}>
                                            <Space><span style={{ width: 10, height: 10, borderRadius: '50%', background: c.color, display: 'inline-block' }} /><Text style={{ fontSize: 13 }}>{c.name}</Text></Space>
                                            <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                                                <Text style={{ fontSize: 13, color: c.color, fontWeight: 600 }}>{c.value}%</Text>
                                                <Progress type="circle" percent={c.value} width={40} strokeColor={c.color} showInfo={false} />
                                            </div>
                                        </div>
                                    ))}
                                </motion.div>
                                <motion.div className="report-card" style={{ marginTop: 20 }} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
                                    <Title level={5} style={{ marginBottom: 16 }}>Quick Download</Title>
                                    <Space direction="vertical" style={{ width: '100%' }}>
                                        {['Monthly Sales Report', 'Inventory Status Report', 'Supplier Order Report', 'Financial Summary'].map(r => (
                                            <div key={r} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px 0', borderBottom: '1px solid #f1f5f9' }}>
                                                <Text style={{ fontSize: 13 }}>{r}</Text>
                                                <Button size="small" type="primary" ghost onClick={() => toast.success(`${r} downloaded.`)}>Download</Button>
                                            </div>
                                        ))}
                                    </Space>
                                </motion.div>
                            </Col>
                        </Row>
                    </div>
                )}
            </DashboardLayout>
        </>
    );
};
export default Reports;
