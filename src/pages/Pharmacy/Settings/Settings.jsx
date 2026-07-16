import React, { useState, useEffect } from 'react';
import { Button, Switch, Select, Typography, Space, Divider, Row, Col, Input } from 'antd';
import { SettingOutlined, BellOutlined, LockOutlined, UserOutlined, ExperimentOutlined, GlobalOutlined, SaveOutlined } from '@ant-design/icons';
import { motion } from 'framer-motion';
import DashboardLayout from '../../../layouts/DashboardLayout/DashboardLayout';
import { useToast } from '../../../context/ToastContext';
import LoadingOverlay from '../../../components/LoadingOverlay';
import { DashboardSkeleton } from '../../../components/Skeletons';
import '../../../pages/Dashboard/DashboardHome/DashboardHome.css';

const { Title, Text } = Typography;
const { Option } = Select;

const SettingRow = ({ label, description, children }) => (
    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '14px 0', borderBottom: '1px solid #f1f5f9', flexWrap: 'wrap', gap: 12 }}>
        <div><Text strong style={{ fontSize: 14 }}>{label}</Text>{description && <div><Text type="secondary" style={{ fontSize: 12 }}>{description}</Text></div>}</div>
        <div>{children}</div>
    </div>
);

const SectionCard = ({ icon, title, children }) => (
    <motion.div style={{ background: '#fff', borderRadius: 12, padding: 24, marginBottom: 20, boxShadow: '0 2px 10px rgba(0,0,0,0.03)' }} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 16 }}><span style={{ fontSize: 18, color: '#0f8a8f' }}>{icon}</span><Title level={5} style={{ margin: 0 }}>{title}</Title></div>
        <Divider style={{ margin: '0 0 4px' }} />{children}
    </motion.div>
);

const Settings = () => {
    const toast = useToast();
    const [loading, setLoading] = useState(true);
    const [emailNotifs, setEmailNotifs] = useState(true);
    const [smsNotifs, setSmsNotifs] = useState(false);
    const [lowStockAlerts, setLowStockAlerts] = useState(true);
    const [expiryAlerts, setExpiryAlerts] = useState(true);
    const [orderAlerts, setOrderAlerts] = useState(true);
    const [twoFactor, setTwoFactor] = useState(false);
    const [sessionTimeout, setSessionTimeout] = useState('30');
    const [language, setLanguage] = useState('en');
    const [theme, setTheme] = useState('light');
    const [timezone, setTimezone] = useState('UTC+5:30');
    const [lowStockThreshold, setLowStockThreshold] = useState('50');
    const [autoReorder, setAutoReorder] = useState(false);

    useEffect(() => { const t = setTimeout(() => setLoading(false), 1000); return () => clearTimeout(t); }, []);
    const save = section => toast.success(`${section} settings saved successfully.`);

    return (
        <>
            <LoadingOverlay loading={loading} text="Loading Settings..." />
            <DashboardLayout>
                {loading ? <DashboardSkeleton /> : (
                    <div className="dashboard-home">
                        <style>{`.admin-header{display:flex;justify-content:space-between;align-items:flex-end;margin-bottom:24px;flex-wrap:wrap;gap:16px;} @media(max-width:768px){.admin-header{flex-direction:column;align-items:flex-start;}}`}</style>
                        <motion.div className="admin-header" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
                            <div><h1 className="welcome-heading">Pharmacy Settings</h1><p className="welcome-sub">Manage your pharmacy preferences and system configuration.</p></div>
                            <Button type="primary" icon={<SaveOutlined />} size="large" style={{ borderRadius: 8 }} onClick={() => save('All')}>Save All</Button>
                        </motion.div>
                        <Row gutter={[20, 0]}>
                            <Col xs={24} lg={12}>
                                <SectionCard icon={<UserOutlined />} title="Profile Settings">
                                    <SettingRow label="Display Name"><Input defaultValue="Pharma Sarah Mitchell" style={{ width: 200 }} /></SettingRow>
                                    <SettingRow label="Email"><Input defaultValue="sarah.mitchell@pranacore.health" style={{ width: 200 }} /></SettingRow>
                                    <SettingRow label="Phone"><Input defaultValue="+1 (555) 921-4455" style={{ width: 200 }} /></SettingRow>
                                    <div style={{ marginTop: 16, textAlign: 'right' }}><Button type="primary" ghost onClick={() => save('Profile')}>Save Profile</Button></div>
                                </SectionCard>
                                <SectionCard icon={<ExperimentOutlined />} title="Inventory Preferences">
                                    <SettingRow label="Low Stock Threshold" description="Alert when stock falls below this value.">
                                        <Select value={lowStockThreshold} onChange={setLowStockThreshold} style={{ width: 130 }}>
                                            <Option value="25">25 units</Option><Option value="50">50 units</Option><Option value="100">100 units</Option>
                                        </Select>
                                    </SettingRow>
                                    <SettingRow label="Auto-Reorder" description="Automatically create reorder requests for low stock."><Switch checked={autoReorder} onChange={setAutoReorder} /></SettingRow>
                                    <div style={{ marginTop: 16, textAlign: 'right' }}><Button type="primary" ghost onClick={() => save('Inventory')}>Save Inventory</Button></div>
                                </SectionCard>
                                <SectionCard icon={<LockOutlined />} title="Security">
                                    <SettingRow label="Two-Factor Authentication"><Switch checked={twoFactor} onChange={setTwoFactor} /></SettingRow>
                                    <SettingRow label="Session Timeout">
                                        <Select value={sessionTimeout} onChange={setSessionTimeout} style={{ width: 130 }}>
                                            <Option value="15">15 min</Option><Option value="30">30 min</Option><Option value="60">1 hr</Option>
                                        </Select>
                                    </SettingRow>
                                    <SettingRow label="Change Password"><Button onClick={() => toast.success('Reset email sent.')}>Reset Password</Button></SettingRow>
                                    <div style={{ marginTop: 16, textAlign: 'right' }}><Button type="primary" ghost onClick={() => save('Security')}>Save Security</Button></div>
                                </SectionCard>
                            </Col>
                            <Col xs={24} lg={12}>
                                <SectionCard icon={<BellOutlined />} title="Notification Preferences">
                                    <SettingRow label="Email Notifications"><Switch checked={emailNotifs} onChange={setEmailNotifs} /></SettingRow>
                                    <SettingRow label="SMS Notifications"><Switch checked={smsNotifs} onChange={setSmsNotifs} /></SettingRow>
                                    <SettingRow label="Low Stock Alerts" description="Alert when medicine falls below threshold."><Switch checked={lowStockAlerts} onChange={setLowStockAlerts} /></SettingRow>
                                    <SettingRow label="Expiry Alerts" description="Alert 30 days before medicine expires."><Switch checked={expiryAlerts} onChange={setExpiryAlerts} /></SettingRow>
                                    <SettingRow label="Order Status Alerts" description="Alerts for order status changes."><Switch checked={orderAlerts} onChange={setOrderAlerts} /></SettingRow>
                                    <div style={{ marginTop: 16, textAlign: 'right' }}><Button type="primary" ghost onClick={() => save('Notifications')}>Save Notifications</Button></div>
                                </SectionCard>
                                <SectionCard icon={<GlobalOutlined />} title="Preferences">
                                    <SettingRow label="Language">
                                        <Select value={language} onChange={setLanguage} style={{ width: 130 }}><Option value="en">English</Option><Option value="es">Spanish</Option><Option value="fr">French</Option></Select>
                                    </SettingRow>
                                    <SettingRow label="Theme">
                                        <Select value={theme} onChange={setTheme} style={{ width: 130 }}><Option value="light">Light</Option><Option value="dark">Dark</Option><Option value="system">System</Option></Select>
                                    </SettingRow>
                                    <SettingRow label="Timezone">
                                        <Select value={timezone} onChange={setTimezone} style={{ width: 160 }}><Option value="UTC-5">UTC-5 (EST)</Option><Option value="UTC+0">UTC+0 (GMT)</Option><Option value="UTC+5:30">UTC+5:30 (IST)</Option></Select>
                                    </SettingRow>
                                    <div style={{ marginTop: 16, textAlign: 'right' }}><Button type="primary" ghost onClick={() => save('Preferences')}>Save Preferences</Button></div>
                                </SectionCard>
                                <SectionCard icon={<SettingOutlined />} title="Account">
                                    <SettingRow label="Deactivate Account" description="Temporarily disable pharmacy portal access."><Button danger ghost onClick={() => toast.error('Contact admin to deactivate.')}>Deactivate</Button></SettingRow>
                                    <SettingRow label="Export Data" description="Download your pharmacy data."><Button onClick={() => toast.success('Data export submitted.')}>Export Data</Button></SettingRow>
                                </SectionCard>
                            </Col>
                        </Row>
                    </div>
                )}
            </DashboardLayout>
        </>
    );
};
export default Settings;
