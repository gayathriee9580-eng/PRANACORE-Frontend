import React, { useState, useMemo } from "react";
import { Input, Select, Button, Badge, Tooltip, Empty } from "antd";
import {
  SearchOutlined,
  FilterOutlined,
  CheckOutlined,
  RightOutlined,
  CheckCircleOutlined,
  ExclamationCircleOutlined,
  ClockCircleOutlined,
  BellOutlined,
} from "@ant-design/icons";
import { motion, AnimatePresence } from "framer-motion";
import DashboardLayout from "../../../layouts/DashboardLayout/DashboardLayout";
import notificationsData from "../../../data/notificationsData";
import {
  notificationCategoriesData,
  priorityConfig,
  categoryColorMap,
  statusFilterOptions,
  dateFilterOptions,
} from "../../../data/notificationCategoriesData";
import NotificationDetails from "./NotificationDetails";
import EmptyState from "../../../components/EmptyState";
import "./Notifications.css";

const { Option } = Select;

// Framer motion variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.05 }
  }
};

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 100 } }
};

const pulseVariants = {
  animate: {
    scale: [1, 1.2, 1],
    opacity: [0.6, 1, 0.6],
    transition: {
      duration: 1.5,
      repeat: Infinity,
      ease: "easeInOut"
    }
  }
};

const Notifications = () => {
  const [notifications, setNotifications] = useState(notificationsData);
  const [search, setSearch] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("All");
  const [statusFilter, setStatusFilter] = useState("All");
  const [dateFilter, setDateFilter] = useState("All");
  const [selectedNotificationId, setSelectedNotificationId] = useState(null);

  // Mark all as read
  const handleMarkAllRead = () => {
    setNotifications(prev =>
      prev.map(n => ({ ...n, status: "Read" }))
    );
  };

  // Mark individual as read
  const handleMarkRead = (id) => {
    setNotifications(prev =>
      prev.map(n => n.id === id ? { ...n, status: "Read" } : n)
    );
  };

  // Delete notification
  const handleDeleteNotification = (id) => {
    setNotifications(prev => prev.filter(n => n.id !== id));
    if (selectedNotificationId === id) {
      setSelectedNotificationId(null);
    }
  };

  // KPI Stats
  const stats = useMemo(() => {
    const total = notifications.length;
    const unread = notifications.filter(n => n.status === "Unread").length;
    const highPriority = notifications.filter(n => n.priority === "High").length;
    const readPercentage = total > 0 ? Math.round(((total - unread) / total) * 100) : 100;

    return { total, unread, highPriority, readPercentage };
  }, [notifications]);

  // Date filter logic helper
  const isWithinDateFilter = (timestamp, filter) => {
    if (filter === "All") return true;
    const ts = timestamp.toLowerCase();

    if (filter === "Today") {
      return ts.includes("today") || ts.includes("hours ago") || ts.includes("hour ago");
    }
    if (filter === "Week") {
      return ts.includes("today") || ts.includes("yesterday") || ts.includes("days ago") || ts.includes("day ago");
    }
    if (filter === "Month") {
      return ts.includes("today") || ts.includes("yesterday") || ts.includes("days ago") || ts.includes("day ago") || ts.includes("week ago") || ts.includes("weeks ago");
    }
    if (filter === "Older") {
      return !ts.includes("today") && !ts.includes("yesterday") && !ts.includes("days ago") && !ts.includes("day ago") && !ts.includes("week ago") && !ts.includes("weeks ago");
    }
    return true;
  };

  // Filtered Notifications
  const filteredNotifications = useMemo(() => {
    return notifications.filter(n => {
      const matchesSearch =
        n.title.toLowerCase().includes(search.toLowerCase()) ||
        n.description.toLowerCase().includes(search.toLowerCase()) ||
        (n.doctor && n.doctor.toLowerCase().includes(search.toLowerCase()));

      const matchesCategory = categoryFilter === "All" || n.category === categoryFilter;
      
      const matchesStatus =
        statusFilter === "All" ||
        (statusFilter === "Unread" && n.status === "Unread") ||
        (statusFilter === "Read" && n.status === "Read");

      const matchesDate = isWithinDateFilter(n.timestamp || "", dateFilter);

      return matchesSearch && matchesCategory && matchesStatus && matchesDate;
    });
  }, [notifications, search, categoryFilter, statusFilter, dateFilter]);

  // If a notification is selected, render the details view
  if (selectedNotificationId !== null) {
    return (
      <NotificationDetails
        notificationId={selectedNotificationId}
        allNotifications={notifications}
        onBack={() => setSelectedNotificationId(null)}
        onMarkRead={handleMarkRead}
        onDelete={handleDeleteNotification}
        onSelectNotification={setSelectedNotificationId}
      />
    );
  }

  return (
    <DashboardLayout>
      <motion.div
        className="notifications-dash-container"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Premium Hero Banner */}
        <motion.div className="notifications-hero-banner" variants={cardVariants}>
          <div className="hero-left">
            <div className="hero-badge-tag">Activity & Feeds</div>
            <h1 className="hero-title">Notification Center</h1>
            <p className="hero-desc">Stay updated on your health journey, billing transactions, medical reports, and care team activities.</p>
          </div>
          <div className="hero-right-icon">
            <BellOutlined />
          </div>
        </motion.div>

        {/* 4 KPI Cards Grid */}
        <div className="stats-kpi-grid">
          <motion.div className="kpi-card total" variants={cardVariants} whileHover={{ y: -4 }}>
            <div className="kpi-icon-wrap"><BellOutlined /></div>
            <div className="kpi-info">
              <span className="lbl">Total Alerts</span>
              <h2 className="val">{stats.total}</h2>
              <span className="desc">Total system dispatches</span>
            </div>
          </motion.div>

          <motion.div className="kpi-card unread" variants={cardVariants} whileHover={{ y: -4 }}>
            <div className="kpi-icon-wrap"><ExclamationCircleOutlined /></div>
            <div className="kpi-info">
              <span className="lbl">Unread Inbox</span>
              <h2 className="val">{stats.unread}</h2>
              <span className="desc">Require your attention</span>
            </div>
          </motion.div>

          <motion.div className="kpi-card urgent" variants={cardVariants} whileHover={{ y: -4 }}>
            <div className="kpi-icon-wrap"><ClockCircleOutlined /></div>
            <div className="kpi-info">
              <span className="lbl">Urgent Notices</span>
              <h2 className="val">{stats.highPriority}</h2>
              <span className="desc">High priority warnings</span>
            </div>
          </motion.div>

          <motion.div className="kpi-card read-ratio" variants={cardVariants} whileHover={{ y: -4 }}>
            <div className="kpi-icon-wrap"><CheckCircleOutlined /></div>
            <div className="kpi-info">
              <span className="lbl">Read Ratio</span>
              <h2 className="val">{stats.readPercentage}%</h2>
              <span className="desc">Read notifications status</span>
            </div>
          </motion.div>
        </div>

        {/* Filter Toolbar */}
        <motion.div className="notifications-filter-toolbar" variants={cardVariants}>
          <div className="filter-left-lbl">
            <FilterOutlined style={{ color: "#0f8a8f" }} />
            <span>Filters</span>
          </div>
          <div className="filter-controls-row">
            <Input
              placeholder="Search notifications..."
              prefix={<SearchOutlined />}
              className="notif-search"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              allowClear
            />
            <Select
              value={categoryFilter}
              onChange={setCategoryFilter}
              className="notif-select"
            >
              <Option value="All">All Categories</Option>
              {notificationCategoriesData.filter(c => c.key !== "All").map(c => (
                <Option key={c.key} value={c.key}>{c.label}</Option>
              ))}
            </Select>
            <Select
              value={statusFilter}
              onChange={setStatusFilter}
              className="notif-select"
            >
              {statusFilterOptions.map(opt => (
                <Option key={opt.value} value={opt.value}>{opt.label}</Option>
              ))}
            </Select>
            <Select
              value={dateFilter}
              onChange={setDateFilter}
              className="notif-select"
            >
              {dateFilterOptions.map(opt => (
                <Option key={opt.value} value={opt.value}>{opt.label}</Option>
              ))}
            </Select>
            
            <Button
              type="primary"
              icon={<CheckOutlined />}
              onClick={handleMarkAllRead}
              disabled={stats.unread === 0}
              className="btn-mark-all-read"
            >
              Mark All Read
            </Button>
            <Button
              onClick={() => setNotifications([])}
              className="btn-simulate-empty"
            >
              Simulate Empty State
            </Button>
          </div>
        </motion.div>

        {/* Notification List Container */}
        {notifications.length === 0 ? (
          <EmptyState
            title="No Notifications"
            description="You're all caught up! There are no new notifications."
            buttonText="Refresh"
            onClick={() => setNotifications(notificationsData)}
          />
        ) : (
          <motion.div className="notifications-list-wrapper" variants={cardVariants}>
            <div className="list-meta-summary">
              <span>Showing {filteredNotifications.length} notification{filteredNotifications.length !== 1 ? "s" : ""}</span>
            </div>

            <div className="notifications-cards-grid">
              <AnimatePresence>
                {filteredNotifications.length > 0 ? (
                  filteredNotifications.map((notif) => {
                    const colors = categoryColorMap[notif.category] || { color: "#64748b", bg: "rgba(100,116,139,0.08)" };
                    const priorityColors = priorityConfig[notif.priority] || { color: "#64748b", bg: "rgba(100,116,139,0.08)" };
                    const IconComponent = notif.icon || BellOutlined;

                    return (
                      <motion.div
                        key={notif.id}
                        className={`notif-card ${notif.status === "Unread" ? "unread" : ""}`}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                        transition={{ duration: 0.2 }}
                        whileHover={{ y: -3, boxShadow: "0 10px 25px rgba(15,23,42,0.06)" }}
                      >
                        {/* Unread pulsing dot */}
                        {notif.status === "Unread" && (
                          <motion.div 
                            className="pulse-indicator"
                            variants={pulseVariants}
                            animate="animate"
                          />
                        )}

                        <div className="notif-card-header">
                          <div className="icon-badge-box" style={{ background: colors.bg, color: colors.color }}>
                            <IconComponent />
                          </div>
                          <div className="header-labels">
                            <span className="notif-category-badge" style={{ background: colors.bg, color: colors.color }}>
                              {notif.category}
                            </span>
                            <span className="notif-priority-badge" style={{ background: priorityColors.bg, color: priorityColors.color }}>
                              {notif.priority}
                            </span>
                          </div>
                          <div className="notif-timestamp-tag">
                            <ClockCircleOutlined style={{ marginRight: 4 }} />
                            {notif.timestamp}
                          </div>
                        </div>

                        <div className="notif-card-body">
                          <h3 className="notif-title-text">{notif.title}</h3>
                          <p className="notif-desc-text">{notif.description}</p>
                        </div>

                        <div className="notif-card-footer">
                          <span className="sent-by-text">Hospital: {notif.hospital || "PRANACORE"}</span>
                          <div className="footer-action-buttons">
                            {notif.status === "Unread" && (
                              <Tooltip title="Mark as Read">
                                <Button
                                  type="text"
                                  icon={<CheckOutlined />}
                                  onClick={() => handleMarkRead(notif.id)}
                                  className="action-btn-mark-read"
                                />
                              </Tooltip>
                            )}
                            <Button
                              type="link"
                              className="btn-view-details"
                              onClick={() => setSelectedNotificationId(notif.id)}
                            >
                              View Details <RightOutlined />
                            </Button>
                          </div>
                        </div>
                      </motion.div>
                    );
                  })
                ) : (
                  <div className="notif-empty-state-wrapper">
                    <Empty
                      image={Empty.PRESENTED_IMAGE_SIMPLE}
                      description={
                        <div className="empty-message-box">
                          <h3>No Notifications Found</h3>
                          <p>Adjust your search queries or select a different category filter to view records.</p>
                        </div>
                      }
                    />
                  </div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        )}
      </motion.div>
    </DashboardLayout>
  );
};

export default Notifications;