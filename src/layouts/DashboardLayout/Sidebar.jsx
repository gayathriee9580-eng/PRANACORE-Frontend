import React, { useState } from "react";
import {
  AppstoreOutlined,
  CalendarOutlined,
  TeamOutlined,
  MedicineBoxOutlined,
  FolderOpenOutlined,
  CreditCardOutlined,
  BellOutlined,
  UserOutlined,
  SettingOutlined,
  LogoutOutlined,
  CloseOutlined,
  ExperimentOutlined,
  BarChartOutlined
} from "@ant-design/icons";
import { motion } from "framer-motion";
import { Drawer, Modal } from "antd";
import { useNavigate, useLocation } from "react-router-dom";
import ConfirmationModal from "../../components/ConfirmationModal";
import { useToast } from "../../context/ToastContext";
import "./Sidebar.css";

const menuItems = [
  { isSection: true, label: "Main Navigation" },
  { icon: <AppstoreOutlined />, label: "Dashboard", path: "/dashboard" },
  { icon: <CalendarOutlined />, label: "Appointments", path: "/dashboard/appointments" },
  { icon: <TeamOutlined />, label: "Doctors", path: "/dashboard/doctors" },
  { icon: <MedicineBoxOutlined />, label: "Departments", path: "/dashboard/departments" },
  { icon: <FolderOpenOutlined />, label: "Medical Records", path: "/dashboard/medical-records" },
  { icon: <CreditCardOutlined />, label: "Payments", path: "/dashboard/payments" },
  { icon: <BellOutlined />, label: "Notifications", path: "/dashboard/notifications" },
  { icon: <UserOutlined />, label: "Profile", path: "/dashboard/profile" },
  { icon: <SettingOutlined />, label: "Settings", path: "/dashboard/settings" },
  { isSection: true, label: "Admin" },
  { icon: <AppstoreOutlined />, label: "Dashboard", path: "/admin/dashboard" },
  { icon: <UserOutlined />, label: "Patients", path: "/admin/patients" },
  { icon: <TeamOutlined />, label: "Doctors", path: "/admin/doctors" },
  { icon: <MedicineBoxOutlined />, label: "Departments", path: "/admin/departments" },
  { icon: <CalendarOutlined />, label: "Appointments", path: "/admin/appointments" },
  { icon: <FolderOpenOutlined />, label: "Medical Records", path: "/admin/medical-records" },
  { icon: <CreditCardOutlined />, label: "Payments", path: "/admin/payments" },
  { icon: <ExperimentOutlined />, label: "Pharmacy", path: "/admin/pharmacy" },
  { icon: <BarChartOutlined />, label: "Reports", path: "/admin/reports" },
  { icon: <SettingOutlined />, label: "Settings", path: "/admin/settings" },
  { isSection: true, label: "Doctor" },
  { icon: <AppstoreOutlined />, label: "Dashboard", path: "/doctor/dashboard" },
  { icon: <UserOutlined />, label: "Patients", path: "/doctor/patients" },
  { icon: <CalendarOutlined />, label: "Appointments", path: "/doctor/appointments" },
  { icon: <FolderOpenOutlined />, label: "Medical Records", path: "/doctor/medical-records" },
  { icon: <MedicineBoxOutlined />, label: "Prescriptions", path: "/doctor/prescriptions" },
  { icon: <ExperimentOutlined />, label: "Lab Reports", path: "/doctor/lab-reports" },
  { icon: <CalendarOutlined />, label: "Schedule", path: "/doctor/schedule" },
  { icon: <BellOutlined />, label: "Notifications", path: "/doctor/notifications" },
  { icon: <UserOutlined />, label: "Profile", path: "/doctor/profile" },
  { icon: <SettingOutlined />, label: "Settings", path: "/doctor/settings" },
];

const SidebarContent = ({ collapsed, onClose, isMobile }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const toast = useToast();
  const [showLogoutModal, setShowLogoutModal] = useState(false);

  const handleLogout = () => {
    setShowLogoutModal(true);
  };

  const handleNavigation = (path) => {
    navigate(path);
    if (isMobile && onClose) {
      onClose();
    }
  };

  const isPathActive = (path) => {
    if (path === "/dashboard") {
      return location.pathname === "/dashboard";
    }
    return location.pathname.startsWith(path);
  };

  return (
    <div className={`sidebar-content ${collapsed ? 'collapsed' : ''}`}>
      {/* Branding */}
      <div className="sidebar-brand">
        <div className="brand-logo" onClick={() => handleNavigation("/dashboard")} style={{ cursor: "pointer" }}>
          <span className="brand-accent">PRANA</span>
          {!collapsed && "CORE"}
        </div>
        {!collapsed && <div className="brand-tagline">Healthcare Platform</div>}

        {isMobile && (
          <button className="mobile-close-btn" onClick={onClose}>
            <CloseOutlined />
          </button>
        )}
      </div>

      {/* Menu Items */}
      <div className="sidebar-menu">
        {menuItems.map((item, index) => {
          if (item.isSection) {
            return (
              <div
                key={`section-${index}`}
                className="sidebar-section-title"
                style={{
                  color: "var(--text-tertiary, #94a3b8)",
                  fontSize: "0.75rem",
                  textTransform: "uppercase",
                  letterSpacing: "0.1em",
                  padding: collapsed ? "12px 0" : "16px 24px 8px 24px",
                  fontWeight: 600,
                  textAlign: collapsed ? "center" : "left"
                }}
              >
                {!collapsed ? item.label : "•••"}
              </div>
            );
          }
          const active = isPathActive(item.path);
          return (
            <div
              key={index}
              className={`menu-item ${active ? 'active' : ''}`}
              title={collapsed ? item.label : ""}
              onClick={() => handleNavigation(item.path)}
              style={{ cursor: "pointer" }}
            >
              <div className="menu-icon">{item.icon}</div>
              {!collapsed && <span className="menu-label">{item.label}</span>}
            </div>
          );
        })}
      </div>

      {/* Logout */}
      <div className="sidebar-footer">
        <div
          className="menu-item logout"
          title={collapsed ? "Logout" : ""}
          onClick={handleLogout}
          style={{ cursor: "pointer" }}
        >
          <div className="menu-icon"><LogoutOutlined /></div>
          {!collapsed && <span className="menu-label">Logout</span>}
        </div>
      </div>

      <ConfirmationModal
        visible={showLogoutModal}
        type="warning"
        title="Logout?"
        description="Are you sure you want to logout from PRANACORE?"
        confirmText="Logout"
        cancelText="Cancel"
        onConfirm={() => {
          setShowLogoutModal(false);
          toast.success("Logged out successfully.");
        }}
        onCancel={() => setShowLogoutModal(false)}
      />
    </div>
  );
};

const Sidebar = ({ collapsed, isMobile, mobileVisible, onClose }) => {
  if (isMobile) {
    return (
      <Drawer
        placement="left"
        closable={false}
        onClose={onClose}
        open={mobileVisible}
        bodyStyle={{ padding: 0 }}
        width={280}
        className="sidebar-drawer"
      >
        <SidebarContent collapsed={false} isMobile={true} onClose={onClose} />
      </Drawer>
    );
  }

  return (
    <motion.aside
      className={`dashboard-sidebar ${collapsed ? 'collapsed' : ''}`}
      initial={{ x: -280 }}
      animate={{ x: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
    >
      <SidebarContent collapsed={collapsed} isMobile={false} />
    </motion.aside>
  );
};

export default Sidebar;
export { SidebarContent };
