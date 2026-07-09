import React, { useState } from "react";
import { Card, Switch, Select, Button, Input, Divider, List, Tag, Table, Radio, Modal, message } from "antd";
import {
  SettingOutlined,
  UserOutlined,
  MailOutlined,
  PhoneOutlined,
  LockOutlined,
  SafetyCertificateOutlined,
  GlobalOutlined,
  DesktopOutlined,
  MobileOutlined,
  ExclamationCircleOutlined,
  DownloadOutlined,
  HistoryOutlined,
  DeleteOutlined,
  LogoutOutlined,
  EyeOutlined,
  BellOutlined,
  BgColorsOutlined,
  EyeInvisibleOutlined,
} from "@ant-design/icons";
import { motion } from "framer-motion";
import DashboardLayout from "../../../layouts/DashboardLayout/DashboardLayout";
import connectedDevicesData from "../../../data/connectedDevicesData";
import loginHistoryData from "../../../data/loginHistoryData";
import "./Settings.css";

const { Option } = Select;
const { confirm } = Modal;

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.05 } }
};

const cardVariants = {
  hidden: { opacity: 0, y: 15 },
  visible: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 100 } }
};

const Settings = () => {
  // Account Information State
  const [account, setAccount] = useState({
    fullName: "Alexander Mercer",
    email: "alexander.mercer@pranacore.com",
    phone: "+1 (555) 382-9102",
    twoFactor: false
  });

  const [password, setPassword] = useState({ current: "", new: "", confirm: "" });

  // Privacy & Security toggles
  const [privacy, setPrivacy] = useState({
    visibility: true,
    shareRecords: true,
    loginAlerts: true,
    biometrics: false
  });

  // Notification Preferences matrix
  const [notifications, setNotifications] = useState({
    appointmentsEmail: true,
    appointmentsSms: true,
    appointmentsPush: true,
    paymentsEmail: true,
    paymentsSms: false,
    paymentsPush: true,
    recordsEmail: true,
    recordsSms: true,
    recordsPush: true,
    reportsEmail: true,
    reportsSms: true,
    reportsPush: false,
    prescriptionsEmail: true,
    prescriptionsSms: true,
    prescriptionsPush: true,
  });

  // Appearance settings
  const [appearance, setAppearance] = useState({
    theme: "Light",
    language: "English",
    timezone: "GMT-8 (Pacific Time)",
    dateFormat: "YYYY-MM-DD",
    fontSize: "Medium"
  });

  // Connected Devices state
  const [devices, setDevices] = useState(connectedDevicesData);

  // Handlers
  const handleAccountChange = (field, val) => {
    setAccount(prev => ({ ...prev, [field]: val }));
  };

  const handlePasswordChange = (e) => {
    e.preventDefault();
    if (!password.current || !password.new || !password.confirm) {
      message.error("Please fill in all password fields.");
      return;
    }
    if (password.new !== password.confirm) {
      message.error("New passwords do not match.");
      return;
    }
    message.success("Password updated successfully!");
    setPassword({ current: "", new: "", confirm: "" });
  };

  const handlePrivacyToggle = (field, checked) => {
    setPrivacy(prev => ({ ...prev, [field]: checked }));
  };

  const handleNotifToggle = (key, checked) => {
    setNotifications(prev => ({ ...prev, [key]: checked }));
  };

  const handleAppChange = (field, val) => {
    setAppearance(prev => ({ ...prev, [field]: val }));
  };

  const handleDownloadData = () => {
    message.loading("Compiling your personal medical history dossier...", 2, () => {
      message.success("Medical dossier ZIP download initialized successfully!");
    });
  };

  const handleRemoveDevice = (id) => {
    setDevices(prev => prev.filter(d => d.id !== id));
    message.success("Device session terminated successfully.");
  };

  const showConfirmAction = (title, content, successMsg) => {
    confirm({
      title: title,
      icon: <ExclamationCircleOutlined style={{ color: "#ef4444" }} />,
      content: content,
      okText: "Proceed",
      okType: "danger",
      cancelText: "Cancel",
      onOk() {
        message.success(successMsg);
      }
    });
  };

  // History columns configuration
  const historyColumns = [
    {
      title: "Timestamp",
      key: "timestamp",
      render: (_, record) => {
        // parse user timestamp "Today • 09:30 AM" or similar into date and time
        const parts = record.timestamp.split("•");
        const date = parts[0]?.trim() || "Recent";
        const time = parts[1]?.trim() || "";
        return (
          <div className="history-time-col">
            <span className="date-lbl">{date}</span>
            {time && <span className="time-lbl">{time}</span>}
          </div>
        );
      }
    },
    {
      title: "Terminal",
      key: "terminal",
      render: (_, record) => {
        // parse browser and device
        const parts = record.device.split("(");
        const browser = parts[0]?.trim() || "Web Terminal";
        const platform = parts[1] ? parts[1].replace(")", "") : "";
        return (
          <div className="terminal-col">
            <span className="browser">{browser}</span>
            {platform && <span className="platform">{platform}</span>}
          </div>
        );
      }
    },
    {
      title: "IP Address",
      dataIndex: "ipAddress",
      key: "ipAddress",
      render: (text) => <span className="font-mono">{text}</span>
    },
    {
      title: "Location",
      dataIndex: "location",
      key: "location"
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (status) => (
        <Tag color={status === "Success" ? "green" : "red"} className="status-history-pill">
          {status}
        </Tag>
      )
    }
  ];

  return (
    <DashboardLayout>
      <motion.div
        className="settings-dash-container"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Settings Header banner */}
        <motion.div className="settings-hero-banner" variants={cardVariants}>
          <div className="hero-left">
            <div className="hero-badge-tag">Platform Configurations</div>
            <h1 className="hero-title">Account Settings</h1>
            <p className="hero-desc">Manage portal visibility, notification matrix, localization rules, secure terminals and danger policies.</p>
          </div>
          <div className="hero-right-icon">
            <SettingOutlined />
          </div>
        </motion.div>

        {/* Two-Column Responsive Layout */}
        <Row gutter={[24, 24]}>
          {/* LEFT COLUMN: Account, Privacy, Notifications, Appearance */}
          <Col xs={24} lg={13} className="settings-column-stack">
            
            {/* Account Settings */}
            <motion.div variants={cardVariants}>
              <Card className="settings-card" title="Account Settings" bordered={false}>
                <div className="settings-form-grid">
                  <div className="input-group">
                    <span className="input-lbl">Full Name</span>
                    <Input
                      placeholder="Enter full name"
                      value={account.fullName}
                      onChange={(e) => handleAccountChange("fullName", e.target.value)}
                      prefix={<UserOutlined />}
                    />
                  </div>
                  <div className="input-group">
                    <span className="input-lbl">Email Address</span>
                    <Input
                      placeholder="Enter email address"
                      value={account.email}
                      onChange={(e) => handleAccountChange("email", e.target.value)}
                      prefix={<MailOutlined />}
                    />
                  </div>
                  <div className="input-group">
                    <span className="input-lbl">Phone Number</span>
                    <Input
                      placeholder="Enter phone number"
                      value={account.phone}
                      onChange={(e) => handleAccountChange("phone", e.target.value)}
                      prefix={<PhoneOutlined />}
                    />
                  </div>

                  <Divider style={{ margin: "12px 0" }} />

                  {/* Change Password Form */}
                  <h4 className="settings-section-title"><LockOutlined /> Change Account Password</h4>
                  <div className="password-fields-row">
                    <div className="input-group">
                      <span className="input-lbl">Current Password</span>
                      <Input.Password
                        placeholder="Current password"
                        value={password.current}
                        onChange={(e) => setPassword(prev => ({ ...prev, current: e.target.value }))}
                      />
                    </div>
                    <div className="input-group">
                      <span className="input-lbl">New Password</span>
                      <Input.Password
                        placeholder="New password"
                        value={password.new}
                        onChange={(e) => setPassword(prev => ({ ...prev, new: e.target.value }))}
                      />
                    </div>
                    <div className="input-group">
                      <span className="input-lbl">Confirm New Password</span>
                      <Input.Password
                        placeholder="Confirm new password"
                        value={password.confirm}
                        onChange={(e) => setPassword(prev => ({ ...prev, confirm: e.target.value }))}
                      />
                    </div>
                  </div>
                  <div className="form-submit-row">
                    <Button type="primary" onClick={handlePasswordChange} className="btn-pass-action">
                      Change Password
                    </Button>
                  </div>

                  <Divider style={{ margin: "12px 0" }} />

                  {/* MFA Factor Toggle */}
                  <div className="toggle-block-row">
                    <div className="toggle-info">
                      <h4>Two-Factor Authentication (2FA)</h4>
                      <p>Secure login verification codes sent directly to your phone.</p>
                    </div>
                    <Switch
                      checked={account.twoFactor}
                      onChange={(checked) => handleAccountChange("twoFactor", checked)}
                      className="custom-switch-teal"
                    />
                  </div>
                </div>
              </Card>
            </motion.div>

            {/* Privacy & Security */}
            <motion.div variants={cardVariants}>
              <Card className="settings-card" title="Privacy & Security" bordered={false}>
                <div className="toggle-list-stack">
                  <div className="toggle-block-row">
                    <div className="toggle-info">
                      <h4>Medical Record Visibility</h4>
                      <p>Hide clinical parameter stats summaries on public clinical team views.</p>
                    </div>
                    <Switch
                      checked={privacy.visibility}
                      onChange={(checked) => handlePrivacyToggle("visibility", checked)}
                      className="custom-switch-teal"
                    />
                  </div>
                  <Divider style={{ margin: "14px 0" }} />
                  <div className="toggle-block-row">
                    <div className="toggle-info">
                      <h4>Share Medical Records</h4>
                      <p>Allow referring physicians to automatically audit reports and laboratory scans.</p>
                    </div>
                    <Switch
                      checked={privacy.shareRecords}
                      onChange={(checked) => handlePrivacyToggle("shareRecords", checked)}
                      className="custom-switch-teal"
                    />
                  </div>
                  <Divider style={{ margin: "14px 0" }} />
                  <div className="toggle-block-row">
                    <div className="toggle-info">
                      <h4>Login Security Alerts</h4>
                      <p>Receive notifications for browser connections or profile logins.</p>
                    </div>
                    <Switch
                      checked={privacy.loginAlerts}
                      onChange={(checked) => handlePrivacyToggle("loginAlerts", checked)}
                      className="custom-switch-teal"
                    />
                  </div>
                  <Divider style={{ margin: "14px 0" }} />
                  <div className="toggle-block-row">
                    <div className="toggle-info">
                      <h4>Biometric FaceID Login</h4>
                      <p>Enable local fingerprint / FaceID logins for secure dashboard access.</p>
                    </div>
                    <Switch
                      checked={privacy.biometrics}
                      onChange={(checked) => handlePrivacyToggle("biometrics", checked)}
                      className="custom-switch-teal"
                    />
                  </div>
                  <Divider style={{ margin: "16px 0" }} />
                  <div className="download-data-banner">
                    <div className="download-info">
                      <h4>Export Diagnostic Record Data</h4>
                      <p>Download a zipped archive containing all laboratory results, prescriptions, and financial statement histories.</p>
                    </div>
                    <Button icon={<DownloadOutlined />} onClick={handleDownloadData} className="btn-download-dossier">
                      Download My Data
                    </Button>
                  </div>
                </div>
              </Card>
            </motion.div>

            {/* Notification Preferences */}
            <motion.div variants={cardVariants}>
              <Card className="settings-card" title="Notification Channels & Preferences" bordered={false}>
                <p className="notif-intro-desc">Configure target channels for each category of health notifications.</p>
                <div className="notification-table-grid">
                  <div className="grid-header-row">
                    <span className="col-title category">Alert Category</span>
                    <span className="col-title">Email</span>
                    <span className="col-title">SMS</span>
                    <span className="col-title">Push</span>
                  </div>
                  {[
                    { label: "Appointment Reminders", emailKey: "appointmentsEmail", smsKey: "appointmentsSms", pushKey: "appointmentsPush" },
                    { label: "Payments & Invoices", emailKey: "paymentsEmail", smsKey: "paymentsSms", pushKey: "paymentsPush" },
                    { label: "Medical Records Alerts", emailKey: "recordsEmail", smsKey: "recordsSms", pushKey: "recordsPush" },
                    { label: "Lab Diagnostic Reports", emailKey: "reportsEmail", smsKey: "reportsSms", pushKey: "reportsPush" },
                    { label: "Prescription Renewal notices", emailKey: "prescriptionsEmail", smsKey: "prescriptionsSms", pushKey: "prescriptionsPush" }
                  ].map((row, idx) => (
                    <div key={idx} className="grid-body-row">
                      <span className="row-label">{row.label}</span>
                      <span className="row-switch">
                        <Switch
                          checked={notifications[row.emailKey]}
                          onChange={(checked) => handleNotifToggle(row.emailKey, checked)}
                          size="small"
                          className="custom-switch-teal"
                        />
                      </span>
                      <span className="row-switch">
                        <Switch
                          checked={notifications[row.smsKey]}
                          onChange={(checked) => handleNotifToggle(row.smsKey, checked)}
                          size="small"
                          className="custom-switch-teal"
                        />
                      </span>
                      <span className="row-switch">
                        <Switch
                          checked={notifications[row.pushKey]}
                          onChange={(checked) => handleNotifToggle(row.pushKey, checked)}
                          size="small"
                          className="custom-switch-teal"
                        />
                      </span>
                    </div>
                  ))}
                </div>
              </Card>
            </motion.div>

            {/* Appearance Preferences */}
            <motion.div variants={cardVariants}>
              <Card className="settings-card" title="Appearance Preferences" bordered={false}>
                <div className="appearance-form-grid">
                  <div className="input-group full-width">
                    <span className="input-lbl"><BgColorsOutlined /> Theme Layout Mode</span>
                    <Radio.Group 
                      value={appearance.theme} 
                      onChange={(e) => handleAppChange("theme", e.target.value)}
                      className="custom-radio-theme-group"
                    >
                      <Radio.Button value="Light">Light</Radio.Button>
                      <Radio.Button value="Dark">Dark</Radio.Button>
                      <Radio.Button value="System">System Default</Radio.Button>
                    </Radio.Group>
                  </div>
                  <div className="input-group">
                    <span className="input-lbl"><GlobalOutlined /> Preferred Language</span>
                    <Select
                      value={appearance.language}
                      onChange={(val) => handleAppChange("language", val)}
                      className="select-field"
                    >
                      <Option value="English">English (US)</Option>
                      <Option value="Spanish">Español (ES)</Option>
                      <Option value="French">Français (FR)</Option>
                      <Option value="German">Deutsch (DE)</Option>
                    </Select>
                  </div>
                  <div className="input-group">
                    <span className="input-lbl">Time Zone Region</span>
                    <Select
                      value={appearance.timezone}
                      onChange={(val) => handleAppChange("timezone", val)}
                      className="select-field"
                    >
                      <Option value="GMT-8 (Pacific Time)">GMT-8 (Pacific Time)</Option>
                      <Option value="GMT-5 (Eastern Time)">GMT-5 (Eastern Time)</Option>
                      <Option value="GMT+0 (London)">GMT+0 (London)</Option>
                      <Option value="GMT+5:30 (India)">GMT+5:30 (India)</Option>
                    </Select>
                  </div>
                  <div className="input-group">
                    <span className="input-lbl">Date Format</span>
                    <Select
                      value={appearance.dateFormat}
                      onChange={(val) => handleAppChange("dateFormat", val)}
                      className="select-field"
                    >
                      <Option value="YYYY-MM-DD">YYYY-MM-DD</Option>
                      <Option value="MM/DD/YYYY">MM/DD/YYYY</Option>
                      <Option value="DD/MM/YYYY">DD/MM/YYYY</Option>
                    </Select>
                  </div>
                  <div className="input-group">
                    <span className="input-lbl">Accessibility Font Size</span>
                    <Select
                      value={appearance.fontSize}
                      onChange={(val) => handleAppChange("fontSize", val)}
                      className="select-field"
                    >
                      <Option value="Small">Small (Accessibility)</Option>
                      <Option value="Medium">Medium (Default)</Option>
                      <Option value="Large">Large (Enhanced)</Option>
                    </Select>
                  </div>
                </div>
              </Card>
            </motion.div>

          </Col>

          {/* RIGHT COLUMN: Connected Devices, Login History, Danger Zone */}
          <Col xs={24} lg={11} className="settings-column-stack">
            
            {/* Connected Devices */}
            <motion.div variants={cardVariants}>
              <Card className="settings-card" title="Connected Devices" bordered={false}>
                <div className="devices-list-stack">
                  {devices.map((dev) => (
                    <div key={dev.id} className="device-card-row">
                      <div className="device-icon-box">
                        {dev.iconType === "desktop" ? <DesktopOutlined /> : <MobileOutlined />}
                      </div>
                      <div className="device-meta-info">
                        <div className="device-title-line">
                          <h4>{dev.device}</h4>
                          {dev.current && (
                            <Tag color="success" className="current-badge">This Device</Tag>
                          )}
                        </div>
                        <p className="device-details">
                          IP: {dev.ipAddress} · Location: {dev.location} · Active: {dev.lastActive}
                        </p>
                      </div>
                      {!dev.current && (
                        <Tooltip title="Terminate Access">
                          <Button 
                            danger 
                            icon={<LogoutOutlined />} 
                            onClick={() => handleRemoveDevice(dev.id)}
                            className="btn-revoke-device"
                          />
                        </Tooltip>
                      )}
                    </div>
                  ))}
                </div>
              </Card>
            </motion.div>

            {/* Login History */}
            <motion.div variants={cardVariants}>
              <Card className="settings-card" title="Login History" bordered={false}>
                <Table
                  columns={historyColumns}
                  dataSource={loginHistoryData}
                  pagination={{ pageSize: 4 }}
                  className="custom-login-history-table"
                  rowKey="id"
                  scroll={{ x: 500 }}
                />
              </Card>
            </motion.div>

            {/* Danger Zone */}
            <motion.div variants={cardVariants}>
              <Card className="settings-card danger-zone-card" title="Danger Policy Controls" bordered={false}>
                <div className="danger-zone-stack">
                  <div className="danger-row">
                    <div className="danger-meta">
                      <h4>Logout From All Devices</h4>
                      <p>Immediately terminate all active login sessions on all external terminals.</p>
                    </div>
                    <Button 
                      danger 
                      icon={<LogoutOutlined />}
                      onClick={() => showConfirmAction(
                        "Logout from all devices?",
                        "This action will invalidate all current access tokens across all devices except this one. You will have to re-login on those devices.",
                        "All external sessions revoked successfully."
                      )}
                      className="btn-danger-outline"
                    >
                      Logout All
                    </Button>
                  </div>
                  <Divider style={{ margin: "14px 0", borderColor: "#fee2e2" }} />
                  <div className="danger-row">
                    <div className="danger-meta">
                      <h4>Deactivate Patient Account</h4>
                      <p>Temporarily deactivate portal access. Records will be preserved securely.</p>
                    </div>
                    <Button 
                      danger 
                      onClick={() => showConfirmAction(
                        "Deactivate account?",
                        "Your account access will be temporarily suspended. You can reactivate by contacting PRANACORE support desk.",
                        "Your account has been deactivated successfully."
                      )}
                      className="btn-danger-outline"
                    >
                      Deactivate
                    </Button>
                  </div>
                  <Divider style={{ margin: "14px 0", borderColor: "#fee2e2" }} />
                  <div className="danger-row">
                    <div className="danger-meta">
                      <h4>Permanently Delete Account</h4>
                      <p>Permanently remove account logs and clear database entries from the platform.</p>
                    </div>
                    <Button 
                      type="primary" 
                      danger 
                      icon={<DeleteOutlined />}
                      onClick={() => showConfirmAction(
                        "PERMANENTLY DELETE ACCOUNT?",
                        "WARNING: This action is irreversible. All profile data, history logs, billing configurations, and notifications will be permanently deleted.",
                        "Account deletion request submitted."
                      )}
                      className="btn-danger-solid"
                    >
                      Delete Account
                    </Button>
                  </div>
                </div>
              </Card>
            </motion.div>

          </Col>
        </Row>
      </motion.div>
    </DashboardLayout>
  );
};

export default Settings;
export { connectedDevicesData, loginHistoryData };
