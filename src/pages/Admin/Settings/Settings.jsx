import React, { useState, useEffect } from 'react';
import { Card, Form, Input, Select, Switch, InputNumber, Button, Row, Col, Space, Divider, Tag, Typography } from 'antd';
import {
  SaveOutlined,
  ReloadOutlined,
  SettingOutlined,
  SecurityScanOutlined,
  BellOutlined,
  DesktopOutlined,
  BgColorsOutlined,
  CreditCardOutlined,
  UserOutlined,
  SafetyCertificateOutlined,
  HeartOutlined,
  DatabaseOutlined
} from '@ant-design/icons';
import { motion } from 'framer-motion';

import DashboardLayout from '../../../layouts/DashboardLayout/DashboardLayout';
import { StatCardChart } from '../../../components/Charts';
import LoadingOverlay from '../../../components/LoadingOverlay';
import EmptyState from '../../../components/EmptyState';
import ErrorState from '../../../components/ErrorState';
import ConfirmationModal from '../../../components/ConfirmationModal';
import { DashboardSkeleton } from '../../../components/Skeletons';
import { useToast } from '../../../context/ToastContext';

import '../../../pages/Dashboard/DashboardHome/DashboardHome.css';

const { Option } = Select;
const { Title, Text } = Typography;

const Settings = () => {
  const toast = useToast();
  const [form] = Form.useForm();

  const [loading, setLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const [isEmpty, setIsEmpty] = useState(false);

  const [resetModalVisible, setResetModalVisible] = useState(false);

  useEffect(() => {
    // 1-second simulated loading state
    const timer = setTimeout(() => setLoading(false), 1000);
    return () => clearTimeout(timer);
  }, []);

  const handleSave = () => {
    toast.success("Settings saved successfully!");
  };

  const handleResetConfirm = () => {
    form.resetFields();
    setResetModalVisible(false);
    toast.success("Settings reset to defaults");
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
  };

  const initialValues = {
    hospitalName: 'PRANACORE Healthcare',
    email: 'admin@pranacore.com',
    phone: '+1 234 567 8900',
    address: '123 Health Ave, Medical City',
    timezone: 'UTC',
    language: 'English',
    twoFactor: true,
    passwordExpiry: 90,
    sessionTimeout: 30,
    loginAttempts: 5,
    emailNotif: true,
    smsNotif: true,
    pushNotif: false,
    appointmentAlerts: true,
    maintenanceMode: false,
    autoBackup: true,
    backupFreq: 'Daily',
    dataRet: '5 Years',
    theme: 'Light',
    primaryColor: '#0f8a8f',
    fontSize: 'Medium',
    currency: 'USD',
    tax: 15,
    invoicePrefix: 'INV-'
  };

  return (
    <>
      <LoadingOverlay loading={loading} text="Loading System Settings..." />
      <DashboardLayout>
        {loading ? (
          <DashboardSkeleton />
        ) : isError ? (
          <ErrorState
            title="Failed to Load Settings"
            description="We encountered an issue fetching system configurations. Please try again."
            buttonText="Try Again"
            onRetry={() => setIsError(false)}
          />
        ) : isEmpty ? (
          <EmptyState
            title="No Configuration Found"
            description="The settings file is currently empty or cannot be generated."
          />
        ) : (
          <div className="dashboard-home">
            <style>{`
              .admin-header { display: flex; justify-content: space-between; align-items: flex-end; margin-bottom: 24px; flex-wrap: wrap; gap: 16px; }
              .card-settings { border-radius: 12px; box-shadow: 0 4px 16px rgba(0,0,0,0.02); overflow: hidden; height: 100%; transition: transform 0.3s ease, box-shadow 0.3s ease; }
              .card-settings:hover { transform: translateY(-3px) scale(1.01); box-shadow: 0 8px 24px rgba(0,0,0,0.06); }
              .card-settings .ant-card-head { background: #f8fafc; border-bottom: 1px solid #f1f5f9; }
              .card-settings .ant-card-head-title { display: flex; align-items: center; gap: 10px; font-weight: 600; color: #334155; }
              .mock-controls { display: flex; gap: 8px; margin-bottom: 16px; background: #fffbe6; padding: 10px; border: 1px dashed #ffe58f; border-radius: 8px; }
              @media (max-width: 768px) {
                .admin-header { flex-direction: column; align-items: flex-start; }
              }
             `}</style>

            <div className="mock-controls">
              <Tag color="warning">Demo Controls</Tag>
              <Button size="small" onClick={() => setIsEmpty(!isEmpty)}>{isEmpty ? 'Restore System' : 'Simulate Empty State'}</Button>
              <Button size="small" danger onClick={() => setIsError(true)}>Simulate Error</Button>
            </div>

            {/* Hero Section */}
            <motion.div className="admin-header" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
              <div>
                <h1 className="welcome-heading">Admin Settings</h1>
                <p className="welcome-sub">Manage application configuration and system preferences.</p>
              </div>
              <Space>
                <Button type="default" icon={<ReloadOutlined />} size="large" onClick={() => setResetModalVisible(true)} style={{ borderRadius: '8px' }}>Reset Settings</Button>
                <Button type="primary" icon={<SaveOutlined />} size="large" onClick={handleSave} style={{ borderRadius: '8px' }}>Save Changes</Button>
              </Space>
            </motion.div>

            {/* KPI Cards */}
            <div className="stat-charts-row" style={{ marginTop: '0', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '20px', marginBottom: '24px' }}>
              <motion.div whileHover={{ scale: 1.02 }}><StatCardChart title="Active Users" value="1,245" icon={<UserOutlined />} trend="+12 this month" trendColor="#10b981" /></motion.div>
              <motion.div whileHover={{ scale: 1.02 }}><StatCardChart title="Security Score" value="98%" icon={<SafetyCertificateOutlined />} trend="Optimal" trendColor="#10b981" /></motion.div>
              <motion.div whileHover={{ scale: 1.02 }}><StatCardChart title="System Health" value="100%" icon={<HeartOutlined />} trend="Stable" trendColor="#10b981" /></motion.div>
              <motion.div whileHover={{ scale: 1.02 }}><StatCardChart title="Last Backup" value="2h ago" icon={<DatabaseOutlined />} trend="Auto-backup active" trendColor="#0f8a8f" /></motion.div>
            </div>

            <Form layout="vertical" form={form} initialValues={initialValues}>
              <Row gutter={[24, 24]}>

                {/* 1. General Settings */}
                <Col xs={24} lg={12}>
                  <motion.div variants={itemVariants} initial="hidden" animate="visible" transition={{ delay: 0.1 }}>
                    <Card className="card-settings" title={<><SettingOutlined style={{ color: '#0f8a8f' }} /> General Settings</>}>
                      <Row gutter={16}>
                        <Col span={12}>
                          <Form.Item label="Hospital Name" name="hospitalName"><Input /></Form.Item>
                        </Col>
                        <Col span={12}>
                          <Form.Item label="Email Address" name="email"><Input type="email" /></Form.Item>
                        </Col>
                        <Col span={12}>
                          <Form.Item label="Phone Number" name="phone"><Input /></Form.Item>
                        </Col>
                        <Col span={12}>
                          <Form.Item label="Time Zone" name="timezone">
                            <Select>
                              <Option value="UTC">UTC</Option>
                              <Option value="EST">EST</Option>
                              <Option value="PST">PST</Option>
                            </Select>
                          </Form.Item>
                        </Col>
                        <Col span={24}>
                          <Form.Item label="Address" name="address"><Input.TextArea rows={2} /></Form.Item>
                        </Col>
                        <Col span={12}>
                          <Form.Item label="Language" name="language">
                            <Select>
                              <Option value="English">English</Option>
                              <Option value="Spanish">Spanish</Option>
                              <Option value="French">French</Option>
                            </Select>
                          </Form.Item>
                        </Col>
                      </Row>
                    </Card>
                  </motion.div>
                </Col>

                {/* 2. Security */}
                <Col xs={24} lg={12}>
                  <motion.div variants={itemVariants} initial="hidden" animate="visible" transition={{ delay: 0.2 }}>
                    <Card className="card-settings" title={<><SecurityScanOutlined style={{ color: '#0f8a8f' }} /> Security</>}>
                      <Row gutter={16}>
                        <Col span={24}>
                          <Form.Item label="Two Factor Authentication" name="twoFactor" valuePropName="checked">
                            <Switch checkedChildren="Enabled" unCheckedChildren="Disabled" />
                          </Form.Item>
                        </Col>
                        <Col span={12}>
                          <Form.Item label="Password Expiry (Days)" name="passwordExpiry"><InputNumber min={1} style={{ width: '100%' }} /></Form.Item>
                        </Col>
                        <Col span={12}>
                          <Form.Item label="Session Timeout (Mins)" name="sessionTimeout"><InputNumber min={5} style={{ width: '100%' }} /></Form.Item>
                        </Col>
                        <Col span={12}>
                          <Form.Item label="Max Login Attempts" name="loginAttempts"><InputNumber min={3} style={{ width: '100%' }} /></Form.Item>
                        </Col>
                      </Row>
                    </Card>
                  </motion.div>
                </Col>

                {/* 3. Notification Settings */}
                <Col xs={24} lg={12}>
                  <motion.div variants={itemVariants} initial="hidden" animate="visible" transition={{ delay: 0.3 }}>
                    <Card className="card-settings" title={<><BellOutlined style={{ color: '#0f8a8f' }} /> Notification Settings</>}>
                      <Row gutter={16}>
                        <Col span={12}>
                          <Form.Item label="Email Notifications" name="emailNotif" valuePropName="checked">
                            <Switch />
                          </Form.Item>
                        </Col>
                        <Col span={12}>
                          <Form.Item label="SMS Notifications" name="smsNotif" valuePropName="checked">
                            <Switch />
                          </Form.Item>
                        </Col>
                        <Col span={12}>
                          <Form.Item label="Push Notifications" name="pushNotif" valuePropName="checked">
                            <Switch />
                          </Form.Item>
                        </Col>
                        <Col span={12}>
                          <Form.Item label="Appointment Alerts" name="appointmentAlerts" valuePropName="checked">
                            <Switch />
                          </Form.Item>
                        </Col>
                      </Row>
                    </Card>
                  </motion.div>
                </Col>

                {/* 4. System Settings */}
                <Col xs={24} lg={12}>
                  <motion.div variants={itemVariants} initial="hidden" animate="visible" transition={{ delay: 0.4 }}>
                    <Card className="card-settings" title={<><DesktopOutlined style={{ color: '#0f8a8f' }} /> System Settings</>}>
                      <Row gutter={16}>
                        <Col span={24}>
                          <Form.Item label="Maintenance Mode" name="maintenanceMode" valuePropName="checked">
                            <Space><Switch danger /> <Text type="secondary">Warning: Enabling this makes system inaccessible to users.</Text></Space>
                          </Form.Item>
                        </Col>
                        <Col span={12}>
                          <Form.Item label="Auto Backup" name="autoBackup" valuePropName="checked">
                            <Switch />
                          </Form.Item>
                        </Col>
                        <Col span={12}>
                          <Form.Item label="Backup Frequency" name="backupFreq">
                            <Select>
                              <Option value="Hourly">Hourly</Option>
                              <Option value="Daily">Daily</Option>
                              <Option value="Weekly">Weekly</Option>
                            </Select>
                          </Form.Item>
                        </Col>
                        <Col span={12}>
                          <Form.Item label="Data Retention" name="dataRet">
                            <Select>
                              <Option value="1 Year">1 Year</Option>
                              <Option value="5 Years">5 Years</Option>
                              <Option value="Indefinitely">Indefinitely</Option>
                            </Select>
                          </Form.Item>
                        </Col>
                      </Row>
                    </Card>
                  </motion.div>
                </Col>

                {/* 5. Appearance */}
                <Col xs={24} lg={12}>
                  <motion.div variants={itemVariants} initial="hidden" animate="visible" transition={{ delay: 0.5 }}>
                    <Card className="card-settings" title={<><BgColorsOutlined style={{ color: '#0f8a8f' }} /> Appearance</>}>
                      <Row gutter={16}>
                        <Col span={12}>
                          <Form.Item label="Theme" name="theme">
                            <Select>
                              <Option value="Light">Light Mode</Option>
                              <Option value="Dark">Dark Mode</Option>
                              <Option value="System">System Default</Option>
                            </Select>
                          </Form.Item>
                        </Col>
                        <Col span={12}>
                          <Form.Item label="Primary Color" name="primaryColor">
                            <Input type="color" style={{ width: '100%', height: '32px', cursor: 'pointer', padding: '0 4px' }} />
                          </Form.Item>
                        </Col>
                        <Col span={12}>
                          <Form.Item label="System Font Size" name="fontSize">
                            <Select>
                              <Option value="Small">Small</Option>
                              <Option value="Medium">Medium</Option>
                              <Option value="Large">Large</Option>
                            </Select>
                          </Form.Item>
                        </Col>
                      </Row>
                    </Card>
                  </motion.div>
                </Col>

                {/* 6. Billing */}
                <Col xs={24} lg={12}>
                  <motion.div variants={itemVariants} initial="hidden" animate="visible" transition={{ delay: 0.6 }}>
                    <Card className="card-settings" title={<><CreditCardOutlined style={{ color: '#0f8a8f' }} /> Billing</>}>
                      <Row gutter={16}>
                        <Col span={12}>
                          <Form.Item label="Currency" name="currency">
                            <Select>
                              <Option value="USD">USD ($)</Option>
                              <Option value="EUR">EUR (€)</Option>
                              <Option value="GBP">GBP (£)</Option>
                              <Option value="INR">INR (₹)</Option>
                            </Select>
                          </Form.Item>
                        </Col>
                        <Col span={12}>
                          <Form.Item label="Tax Percentage (%)" name="tax"><InputNumber min={0} max={100} style={{ width: '100%' }} /></Form.Item>
                        </Col>
                        <Col span={12}>
                          <Form.Item label="Invoice Prefix" name="invoicePrefix"><Input /></Form.Item>
                        </Col>
                      </Row>
                    </Card>
                  </motion.div>
                </Col>

              </Row>
            </Form>
          </div>
        )}
      </DashboardLayout>

      {/* Reset Confirmation Modal */}
      <ConfirmationModal
        visible={resetModalVisible}
        title="Reset All Settings"
        description="Are you sure you want to reset all operational settings to default parameters? This action cannot be undone."
        type="warning"
        confirmText="Confirm Reset"
        cancelText="Cancel"
        onConfirm={handleResetConfirm}
        onCancel={() => setResetModalVisible(false)}
      />
    </>
  );
};

export default Settings;
