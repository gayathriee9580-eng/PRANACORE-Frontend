import React, { useState, useEffect } from 'react';
import { Button, Tag, Space, Typography, Avatar, Divider, Row, Col, Progress, Card } from 'antd';
import {
  UserOutlined,
  EditOutlined,
  MailOutlined,
  PhoneOutlined,
  MedicineBoxOutlined,
  CalendarOutlined,
  StarOutlined,
  TrophyOutlined,
  TeamOutlined,
  FileTextOutlined,
  CameraOutlined,
} from '@ant-design/icons';
import { motion } from 'framer-motion';

import DashboardLayout from '../../../layouts/DashboardLayout/DashboardLayout';
import { useToast } from '../../../context/ToastContext';
import LoadingOverlay from '../../../components/LoadingOverlay';
import { DashboardSkeleton } from '../../../components/Skeletons';
import '../../../pages/Dashboard/DashboardHome/DashboardHome.css';

const { Text, Title } = Typography;

const doctorProfile = {
  name: 'Dr. Sarah Smith',
  title: 'Senior Consultant — Cardiology',
  email: 'sarah.smith@pranacore.health',
  phone: '+1 (555) 842-1190',
  department: 'Cardiology',
  specialization: 'Interventional Cardiology',
  licenseNo: 'MLC-2019-8843',
  experience: '12 Years',
  languages: ['English', 'Spanish', 'French'],
  education: [
    { degree: 'MBBS', institution: 'Harvard Medical School', year: '2008' },
    { degree: 'MD – Cardiology', institution: 'Johns Hopkins University', year: '2012' },
    { degree: 'Fellowship – Interventional Cardiology', institution: 'Mayo Clinic', year: '2014' },
  ],
  achievements: [
    { icon: <StarOutlined />, label: 'Best Cardiologist Award', year: '2022', color: '#f59e0b' },
    { icon: <TrophyOutlined />, label: 'Top Performer – PRANACORE', year: '2023', color: '#10b981' },
    { icon: <TeamOutlined />, label: 'Research Publication – AHA Journal', year: '2021', color: '#3b82f6' },
  ],
  stats: [
    { label: 'Total Patients', value: 1842 },
    { label: 'Consultations', value: 3214 },
    { label: 'Prescriptions', value: 2140 },
    { label: 'Lab Orders', value: 987 },
  ],
  skills: [
    { name: 'Cardiac Catheterization', level: 95 },
    { name: 'Echocardiography', level: 90 },
    { name: 'Patient Communication', level: 98 },
    { name: 'Surgical Assistance', level: 82 },
    { name: 'Clinical Research', level: 75 },
  ],
  availability: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
  bio: 'Dr. Sarah Smith is a Senior Cardiologist with over 12 years of experience in interventional cardiology. She has treated thousands of patients across North America and has authored multiple peer-reviewed publications in cardiovascular medicine.',
};

const Profile = () => {
  const toast = useToast();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const t = setTimeout(() => setLoading(false), 1000);
    return () => clearTimeout(t);
  }, []);

  return (
    <>
      <LoadingOverlay loading={loading} text="Loading Your Profile..." />
      <DashboardLayout>
        {loading ? <DashboardSkeleton /> : (
          <div className="dashboard-home">
            <style>{`
              .profile-hero{background:linear-gradient(135deg,#0f8a8f 0%,#065f62 100%);border-radius:16px;padding:36px;color:#fff;display:flex;align-items:center;gap:28px;flex-wrap:wrap;margin-bottom:24px;}
              .profile-stat-grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(140px,1fr));gap:16px;margin:24px 0;}
              .profile-stat-card{background:#fff;border-radius:10px;padding:18px;text-align:center;box-shadow:0 2px 8px rgba(0,0,0,0.04);}
              .section-card{background:#fff;border-radius:12px;padding:24px;margin-bottom:20px;box-shadow:0 2px 10px rgba(0,0,0,0.03);}
              @media(max-width:768px){.profile-hero{flex-direction:column;text-align:center;}}
            `}</style>

            {/* Profile Hero */}
            <motion.div className="profile-hero" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
              <div style={{ position: 'relative', display: 'inline-block' }}>
                <Avatar size={110} icon={<UserOutlined />} style={{ background: 'rgba(255,255,255,0.2)', fontSize: 48, border: '3px solid rgba(255,255,255,0.3)' }} />
                <Button shape="circle" icon={<CameraOutlined />} size="small" style={{ position: 'absolute', bottom: 0, right: 0, background: '#fff', border: 'none' }} onClick={() => toast.success('Profile photo upload initiated.')} />
              </div>
              <div style={{ flex: 1 }}>
                <Title level={3} style={{ color: '#fff', margin: 0 }}>{doctorProfile.name}</Title>
                <Text style={{ color: 'rgba(255,255,255,0.82)', fontSize: 15 }}>{doctorProfile.title}</Text>
                <div style={{ marginTop: 12, display: 'flex', flexWrap: 'wrap', gap: 8 }}>
                  <Tag color="rgba(255,255,255,0.2)" style={{ color: '#fff', borderColor: 'rgba(255,255,255,0.4)' }}><MedicineBoxOutlined /> {doctorProfile.specialization}</Tag>
                  <Tag color="rgba(255,255,255,0.2)" style={{ color: '#fff', borderColor: 'rgba(255,255,255,0.4)' }}><CalendarOutlined /> {doctorProfile.experience}</Tag>
                  <Tag color="rgba(255,255,255,0.2)" style={{ color: '#fff', borderColor: 'rgba(255,255,255,0.4)' }}>License: {doctorProfile.licenseNo}</Tag>
                </div>
              </div>
              <Button type="default" icon={<EditOutlined />} size="large" style={{ borderRadius: 8 }} onClick={() => toast.success('Profile edit mode activated.')}>Edit Profile</Button>
            </motion.div>

            {/* Stats Row */}
            <div className="profile-stat-grid">
              {doctorProfile.stats.map(s => (
                <motion.div key={s.label} className="profile-stat-card" whileHover={{ y: -3 }}>
                  <div style={{ fontSize: 26, fontWeight: 700, color: '#0f8a8f' }}>{s.value.toLocaleString()}</div>
                  <Text type="secondary" style={{ fontSize: 12 }}>{s.label}</Text>
                </motion.div>
              ))}
            </div>

            <Row gutter={[20, 20]}>
              <Col xs={24} md={14}>
                {/* Bio */}
                <div className="section-card">
                  <Title level={5} style={{ marginBottom: 10 }}>About</Title>
                  <Text type="secondary">{doctorProfile.bio}</Text>
                </div>

                {/* Contact */}
                <div className="section-card">
                  <Title level={5} style={{ marginBottom: 16 }}>Contact Information</Title>
                  <Space direction="vertical" size={10} style={{ width: '100%' }}>
                    <Space><MailOutlined style={{ color: '#0f8a8f' }} /><Text>{doctorProfile.email}</Text></Space>
                    <Space><PhoneOutlined style={{ color: '#0f8a8f' }} /><Text>{doctorProfile.phone}</Text></Space>
                    <Space><MedicineBoxOutlined style={{ color: '#0f8a8f' }} /><Text>Department: {doctorProfile.department}</Text></Space>
                  </Space>
                </div>

                {/* Education */}
                <div className="section-card">
                  <Title level={5} style={{ marginBottom: 16 }}>Education</Title>
                  {doctorProfile.education.map((e, i) => (
                    <div key={i} style={{ display: 'flex', justifyContent: 'space-between', padding: '10px 0', borderBottom: i < doctorProfile.education.length - 1 ? '1px solid #f1f5f9' : 'none' }}>
                      <div>
                        <strong style={{ color: '#1e293b' }}>{e.degree}</strong>
                        <div><Text type="secondary" style={{ fontSize: 13 }}>{e.institution}</Text></div>
                      </div>
                      <Tag>{e.year}</Tag>
                    </div>
                  ))}
                </div>
              </Col>

              <Col xs={24} md={10}>
                {/* Skills */}
                <div className="section-card">
                  <Title level={5} style={{ marginBottom: 16 }}>Skills & Proficiency</Title>
                  <Space direction="vertical" style={{ width: '100%' }} size={14}>
                    {doctorProfile.skills.map(s => (
                      <div key={s.name}>
                        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                          <Text style={{ fontSize: 13 }}>{s.name}</Text>
                          <Text style={{ fontSize: 13, color: '#0f8a8f' }}>{s.level}%</Text>
                        </div>
                        <Progress percent={s.level} showInfo={false} strokeColor="#0f8a8f" trailColor="#e2e8f0" />
                      </div>
                    ))}
                  </Space>
                </div>

                {/* Achievements */}
                <div className="section-card">
                  <Title level={5} style={{ marginBottom: 16 }}>Achievements</Title>
                  <Space direction="vertical" style={{ width: '100%' }} size={12}>
                    {doctorProfile.achievements.map((a, i) => (
                      <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 12, background: '#f8fafc', borderRadius: 8, padding: '10px 14px' }}>
                        <span style={{ fontSize: 20, color: a.color }}>{a.icon}</span>
                        <div>
                          <strong style={{ fontSize: 13 }}>{a.label}</strong>
                          <div><Text type="secondary" style={{ fontSize: 12 }}>{a.year}</Text></div>
                        </div>
                      </div>
                    ))}
                  </Space>
                </div>

                {/* Availability */}
                <div className="section-card">
                  <Title level={5} style={{ marginBottom: 12 }}>Availability</Title>
                  <Space wrap>
                    {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map(d => {
                      const available = doctorProfile.availability.includes({ Mon: 'Monday', Tue: 'Tuesday', Wed: 'Wednesday', Thu: 'Thursday', Fri: 'Friday', Sat: 'Saturday', Sun: 'Sunday' }[d]);
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
