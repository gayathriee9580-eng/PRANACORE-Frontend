import React, { useState, useEffect } from 'react';
import { Button, Typography, Space, Avatar, Progress, Tag, Row, Col } from 'antd';
import { UserOutlined, EditOutlined, CameraOutlined, MailOutlined, PhoneOutlined, ExperimentOutlined, StarOutlined, TrophyOutlined, TeamOutlined } from '@ant-design/icons';
import { motion } from 'framer-motion';
import DashboardLayout from '../../../layouts/DashboardLayout/DashboardLayout';
import { useToast } from '../../../context/ToastContext';
import LoadingOverlay from '../../../components/LoadingOverlay';
import { DashboardSkeleton } from '../../../components/Skeletons';
import '../../../pages/Dashboard/DashboardHome/DashboardHome.css';

const { Title, Text } = Typography;

const pharmacistProfile = {
    name: 'Pharma Sarah Mitchell',
    title: 'Senior Pharmacist — PRANACORE Pharmacy',
    email: 'sarah.mitchell@pranacore.health',
    phone: '+1 (555) 921-4455',
    licenseNo: 'PHL-2018-5521',
    experience: '9 Years',
    specialization: 'Clinical Pharmacy',
    education: [
        { degree: 'B.Pharm', institution: 'University of Michigan', year: '2014' },
        { degree: 'M.Pharm — Clinical', institution: 'Johns Hopkins University', year: '2016' },
    ],
    stats: [
        { label: 'Prescriptions Filled', value: 8214 },
        { label: 'Orders Managed', value: 1420 },
        { label: 'Suppliers Managed', value: 47 },
        { label: 'Medicines Catalogued', value: 2847 },
    ],
    skills: [
        { name: 'Drug Dispensing', level: 98 },
        { name: 'Inventory Control', level: 92 },
        { name: 'Supplier Negotiation', level: 85 },
        { name: 'Clinical Counselling', level: 88 },
        { name: 'Compounding', level: 74 },
    ],
    achievements: [
        { icon: <StarOutlined />, label: 'Best Pharmacist Award', year: '2023', color: '#f59e0b' },
        { icon: <TrophyOutlined />, label: 'Zero Dispensing Error — 2022', year: '2022', color: '#10b981' },
        { icon: <TeamOutlined />, label: 'Supplier Excellence Award', year: '2021', color: '#3b82f6' },
    ],
    availability: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
};

const Profile = () => {
    const toast = useToast();
    const [loading, setLoading] = useState(true);
    useEffect(() => { const t = setTimeout(() => setLoading(false), 1000); return () => clearTimeout(t); }, []);

    return (
        <>
            <LoadingOverlay loading={loading} text="Loading Profile..." />
            <DashboardLayout>
                {loading ? <DashboardSkeleton /> : (
                    <div className="dashboard-home">
                        <style>{`.profile-hero{background:linear-gradient(135deg,#0f8a8f 0%,#065f62 100%);border-radius:16px;padding:36px;color:#fff;display:flex;align-items:center;gap:28px;flex-wrap:wrap;margin-bottom:24px;}.profile-stat-grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(140px,1fr));gap:16px;margin:24px 0;}.profile-stat-card{background:#fff;border-radius:10px;padding:18px;text-align:center;box-shadow:0 2px 8px rgba(0,0,0,0.04);}.section-card{background:#fff;border-radius:12px;padding:24px;margin-bottom:20px;box-shadow:0 2px 10px rgba(0,0,0,0.03);} @media(max-width:768px){.profile-hero{flex-direction:column;text-align:center;}}`}</style>
                        <motion.div className="profile-hero" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
                            <div style={{ position: 'relative', display: 'inline-block' }}>
                                <Avatar size={110} icon={<UserOutlined />} style={{ background: 'rgba(255,255,255,0.2)', fontSize: 48, border: '3px solid rgba(255,255,255,0.3)' }} />
                                <Button shape="circle" icon={<CameraOutlined />} size="small" style={{ position: 'absolute', bottom: 0, right: 0, background: '#fff', border: 'none' }} onClick={() => toast.success('Photo upload initiated.')} />
                            </div>
                            <div style={{ flex: 1 }}>
                                <Title level={3} style={{ color: '#fff', margin: 0 }}>{pharmacistProfile.name}</Title>
                                <Text style={{ color: 'rgba(255,255,255,0.82)', fontSize: 15 }}>{pharmacistProfile.title}</Text>
                                <div style={{ marginTop: 12, display: 'flex', flexWrap: 'wrap', gap: 8 }}>
                                    <Tag color="rgba(255,255,255,0.2)" style={{ color: '#fff', borderColor: 'rgba(255,255,255,0.4)' }}><ExperimentOutlined /> {pharmacistProfile.specialization}</Tag>
                                    <Tag color="rgba(255,255,255,0.2)" style={{ color: '#fff', borderColor: 'rgba(255,255,255,0.4)' }}>Exp: {pharmacistProfile.experience}</Tag>
                                    <Tag color="rgba(255,255,255,0.2)" style={{ color: '#fff', borderColor: 'rgba(255,255,255,0.4)' }}>License: {pharmacistProfile.licenseNo}</Tag>
                                </div>
                            </div>
                            <Button type="default" icon={<EditOutlined />} size="large" style={{ borderRadius: 8 }} onClick={() => toast.success('Edit profile mode activated.')}>Edit Profile</Button>
                        </motion.div>
                        <div className="profile-stat-grid">
                            {pharmacistProfile.stats.map(s => (
                                <motion.div key={s.label} className="profile-stat-card" whileHover={{ y: -3 }}>
                                    <div style={{ fontSize: 26, fontWeight: 700, color: '#0f8a8f' }}>{s.value.toLocaleString()}</div>
                                    <Text type="secondary" style={{ fontSize: 12 }}>{s.label}</Text>
                                </motion.div>
                            ))}
                        </div>
                        <Row gutter={[20, 20]}>
                            <Col xs={24} md={14}>
                                <div className="section-card">
                                    <Title level={5} style={{ marginBottom: 16 }}>Contact Information</Title>
                                    <Space direction="vertical" size={10} style={{ width: '100%' }}>
                                        <Space><MailOutlined style={{ color: '#0f8a8f' }} /><Text>{pharmacistProfile.email}</Text></Space>
                                        <Space><PhoneOutlined style={{ color: '#0f8a8f' }} /><Text>{pharmacistProfile.phone}</Text></Space>
                                        <Space><ExperimentOutlined style={{ color: '#0f8a8f' }} /><Text>Specialization: {pharmacistProfile.specialization}</Text></Space>
                                    </Space>
                                </div>
                                <div className="section-card">
                                    <Title level={5} style={{ marginBottom: 16 }}>Education</Title>
                                    {pharmacistProfile.education.map((e, i) => (
                                        <div key={i} style={{ display: 'flex', justifyContent: 'space-between', padding: '10px 0', borderBottom: i < pharmacistProfile.education.length - 1 ? '1px solid #f1f5f9' : 'none' }}>
                                            <div><strong style={{ color: '#1e293b' }}>{e.degree}</strong><div><Text type="secondary" style={{ fontSize: 13 }}>{e.institution}</Text></div></div>
                                            <Tag>{e.year}</Tag>
                                        </div>
                                    ))}
                                </div>
                            </Col>
                            <Col xs={24} md={10}>
                                <div className="section-card">
                                    <Title level={5} style={{ marginBottom: 16 }}>Skills & Proficiency</Title>
                                    <Space direction="vertical" style={{ width: '100%' }} size={14}>
                                        {pharmacistProfile.skills.map(s => (
                                            <div key={s.name}>
                                                <div style={{ display: 'flex', justifyContent: 'space-between' }}><Text style={{ fontSize: 13 }}>{s.name}</Text><Text style={{ fontSize: 13, color: '#0f8a8f' }}>{s.level}%</Text></div>
                                                <Progress percent={s.level} showInfo={false} strokeColor="#0f8a8f" trailColor="#e2e8f0" />
                                            </div>
                                        ))}
                                    </Space>
                                </div>
                                <div className="section-card">
                                    <Title level={5} style={{ marginBottom: 16 }}>Achievements</Title>
                                    <Space direction="vertical" style={{ width: '100%' }} size={12}>
                                        {pharmacistProfile.achievements.map((a, i) => (
                                            <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 12, background: '#f8fafc', borderRadius: 8, padding: '10px 14px' }}>
                                                <span style={{ fontSize: 20, color: a.color }}>{a.icon}</span>
                                                <div><strong style={{ fontSize: 13 }}>{a.label}</strong><div><Text type="secondary" style={{ fontSize: 12 }}>{a.year}</Text></div></div>
                                            </div>
                                        ))}
                                    </Space>
                                </div>
                                <div className="section-card">
                                    <Title level={5} style={{ marginBottom: 12 }}>Availability</Title>
                                    <Space wrap>
                                        {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map(d => {
                                            const available = pharmacistProfile.availability.includes({ Mon: 'Monday', Tue: 'Tuesday', Wed: 'Wednesday', Thu: 'Thursday', Fri: 'Friday', Sat: 'Saturday', Sun: 'Sunday' }[d]);
                                            return <Tag key={d} color={available ? 'green' : 'default'}>{d}</Tag>;
                                        })}
                                    </Space>
                                </div>
                            </Col>
                        </Row>
                    </div>
                )}
            </DashboardLayout>
        </>
    );
};
export default Profile;
