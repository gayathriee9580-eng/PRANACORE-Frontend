import React, { useMemo } from "react";
import { Button, Tag, Divider, Card } from "antd";
import {
  ArrowLeftOutlined,
  CalendarOutlined,
  DeleteOutlined,
  CheckOutlined,
  ShareAltOutlined,
  PrinterOutlined,
  QuestionCircleOutlined,
  RightOutlined,
  UserOutlined,
  HomeOutlined,
  ClockCircleOutlined,
  InfoCircleOutlined,
  MailOutlined,
  PhoneOutlined,
  BellOutlined,
} from "@ant-design/icons";
import { motion } from "framer-motion";
import DashboardLayout from "../../../layouts/DashboardLayout/DashboardLayout";
import { categoryColorMap, priorityConfig } from "../../../data/notificationCategoriesData";
import "./NotificationDetails.css";

const pageVariants = {
  hidden: { opacity: 0, y: 15 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: "easeOut" } }
};

const NotificationDetails = ({
  notificationId,
  allNotifications = [],
  onBack,
  onMarkRead,
  onDelete,
  onSelectNotification,
}) => {
  // Find current notification
  const notif = useMemo(() => {
    return allNotifications.find(n => n.id === notificationId) || allNotifications[0];
  }, [allNotifications, notificationId]);

  // Find recent notifications (excluding current, take latest 3)
  const recentNotifications = useMemo(() => {
    return allNotifications
      .filter(n => n.id !== notif.id)
      .slice(0, 3);
  }, [allNotifications, notif]);

  if (!notif) {
    return (
      <DashboardLayout>
        <div className="nd-empty-state">
          <InfoCircleOutlined className="empty-icon" />
          <h2>Notification Not Found</h2>
          <Button type="primary" icon={<ArrowLeftOutlined />} onClick={onBack}>
            Back to Inbox
          </Button>
        </div>
      </DashboardLayout>
    );
  }

  const categoryColors = categoryColorMap[notif.category] || { color: "#64748b", bg: "rgba(100,116,139,0.08)" };
  const priorityColors = priorityConfig[notif.priority] || { color: "#64748b", bg: "rgba(100,116,139,0.08)" };
  const IconComponent = notif.icon || BellOutlined;

  const handlePrint = () => {
    window.print();
  };

  const handleShare = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(`${notif.title}: ${notif.description}`);
      alert("Notification summary copied to clipboard!");
    } else {
      alert("Sharing is not supported on this browser context.");
    }
  };

  return (
    <DashboardLayout>
      <motion.div
        className="nd-details-page-wrapper"
        variants={pageVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Back Link */}
        <div className="nd-back-navigation">
          <Button 
            type="text" 
            icon={<ArrowLeftOutlined />} 
            onClick={onBack}
            className="btn-back-link"
          >
            Back to Notification Centre
          </Button>
        </div>

        <div className="nd-main-grid-layout">
          {/* Main Column */}
          <div className="nd-primary-col">
            <Card className="nd-large-header-card" bordered={false}>
              <div className="card-header-stripe" style={{ background: categoryColors.color }} />
              
              <div className="card-top-header-meta">
                <div className="header-badge-list">
                  <span className="badge-tag category" style={{ background: categoryColors.bg, color: categoryColors.color }}>
                    <IconComponent />
                    <span style={{ marginLeft: 6 }}>{notif.category}</span>
                  </span>
                  <span className="badge-tag priority" style={{ background: priorityColors.bg, color: priorityColors.color }}>
                    {notif.priority} Priority
                  </span>
                  {notif.status === "Unread" && (
                    <span className="badge-tag status-new">New / Unread</span>
                  )}
                </div>
                <div className="timestamp-info-tag">
                  <ClockCircleOutlined style={{ marginRight: 6 }} />
                  {notif.timestamp}
                </div>
              </div>

              <h1 className="notification-details-title">{notif.title}</h1>
              
              <Divider className="nd-divider" />

              <div className="notification-detailed-body">
                <h4 className="body-section-heading">Detailed Summary</h4>
                <p className="primary-body-text">{notif.description}</p>
                {notif.fullContent && (
                  <div className="extended-content-box">
                    <InfoCircleOutlined className="info-icon" style={{ color: categoryColors.color }} />
                    <p className="extended-text">{notif.fullContent}</p>
                  </div>
                )}
              </div>

              {/* Related Entities Section */}
              {(notif.doctor || notif.hospital || notif.appointmentId) && (
                <>
                  <Divider className="nd-divider" />
                  <div className="notification-context-section">
                    <h4 className="body-section-heading">Clinical Context & References</h4>
                    <div className="context-items-grid">
                      {notif.doctor && notif.doctor !== "-" && (
                        <div className="context-cell">
                          <UserOutlined className="cell-icon" />
                          <div className="cell-info">
                            <span className="lbl">Attending Clinician</span>
                            <span className="val">{notif.doctor}</span>
                          </div>
                        </div>
                      )}
                      {notif.hospital && notif.hospital !== "-" && (
                        <div className="context-cell">
                          <HomeOutlined className="cell-icon" />
                          <div className="cell-info">
                            <span className="lbl">Facility / Location</span>
                            <span className="val">{notif.hospital}</span>
                          </div>
                        </div>
                      )}
                      {notif.appointmentId && notif.appointmentId !== "-" && (
                        <div className="context-cell">
                          <CalendarOutlined className="cell-icon" />
                          <div className="cell-info">
                            <span className="lbl">Associated Appointment</span>
                            <span className="val">ID: {notif.appointmentId}</span>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </>
              )}

              <Divider className="nd-divider" />

              {/* Bottom Action Footer */}
              <div className="nd-action-footer-buttons">
                {notif.status === "Unread" && (
                  <Button 
                    type="primary" 
                    icon={<CheckOutlined />}
                    onClick={() => {
                      onMarkRead(notif.id);
                      onBack();
                    }}
                    className="btn-primary-teal"
                  >
                    Mark as Read & Return
                  </Button>
                )}
                <Button 
                  icon={<ShareAltOutlined />} 
                  onClick={handleShare}
                  className="btn-outline-action"
                >
                  Share
                </Button>
                <Button 
                  icon={<PrinterOutlined />} 
                  onClick={handlePrint}
                  className="btn-outline-action"
                >
                  Print Report
                </Button>
                <Button 
                  danger 
                  icon={<DeleteOutlined />} 
                  onClick={() => onDelete(notif.id)}
                  className="btn-danger-action"
                >
                  Delete Notice
                </Button>
              </div>
            </Card>
          </div>

          {/* Sidebar Column */}
          <div className="nd-sidebar-col">
            {/* Quick Actions Panel */}
            <Card className="nd-sidebar-card quick-actions-card" title="Quick Panel" bordered={false}>
              <div className="quick-actions-list">
                {notif.status === "Unread" && (
                  <Button 
                    type="text" 
                    icon={<CheckOutlined />} 
                    onClick={() => onMarkRead(notif.id)}
                    className="sidebar-action-btn success"
                  >
                    Mark as Read
                  </Button>
                )}
                <Button 
                  type="text" 
                  icon={<ShareAltOutlined />} 
                  onClick={handleShare}
                  className="sidebar-action-btn"
                >
                  Copy to Clipboard
                </Button>
                <Button 
                  type="text" 
                  icon={<PrinterOutlined />} 
                  onClick={handlePrint}
                  className="sidebar-action-btn"
                >
                  Print Notice
                </Button>
                <Divider style={{ margin: "12px 0" }} />
                <Button 
                  type="text" 
                  danger 
                  icon={<DeleteOutlined />} 
                  onClick={() => onDelete(notif.id)}
                  className="sidebar-action-btn danger-text"
                >
                  Delete Immediately
                </Button>
              </div>
            </Card>

            {/* Recent Notifications Panel */}
            {recentNotifications.length > 0 && (
              <Card className="nd-sidebar-card recent-notifs-card" title="Recent Activity" bordered={false}>
                <div className="recent-notifications-list">
                  {recentNotifications.map(item => {
                    const itemColors = categoryColorMap[item.category] || { color: "#64748b", bg: "rgba(100,116,139,0.08)" };
                    const ItemIconComponent = item.icon || BellOutlined;
                    return (
                      <div 
                        key={item.id} 
                        className={`recent-notif-row ${item.status === "Unread" ? "unread" : ""}`}
                        onClick={() => onSelectNotification(item.id)}
                      >
                        <div className="recent-icon-wrap" style={{ background: itemColors.bg, color: itemColors.color }}>
                          <ItemIconComponent />
                        </div>
                        <div className="recent-info-wrap">
                          <h4 className="recent-title">{item.title}</h4>
                          <span className="recent-time">{item.timestamp}</span>
                        </div>
                        <RightOutlined className="recent-row-arrow" />
                      </div>
                    );
                  })}
                </div>
              </Card>
            )}

            {/* Need Help Panel */}
            <Card className="nd-sidebar-card need-help-card" bordered={false}>
              <div className="help-box-content">
                <QuestionCircleOutlined className="help-icon" />
                <h3>Need Assistance?</h3>
                <p>If this alert contains incorrect clinical details, or if you have questions regarding the diagnostic remarks, please connect with the medical front desk.</p>
                <div className="support-channels">
                  <div className="channel-item">
                    <PhoneOutlined />
                    <span>+1 (555) PRANA-CARE</span>
                  </div>
                  <div className="channel-item">
                    <MailOutlined />
                    <span>support@pranacore.com</span>
                  </div>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </motion.div>
    </DashboardLayout>
  );
};

export default NotificationDetails;
