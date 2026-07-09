import React from "react";
import { Input, Badge, Avatar } from "antd";
import { 
  SearchOutlined, 
  BellOutlined, 
  MenuOutlined,
  MoonOutlined,
  DownOutlined,
  UserOutlined
} from "@ant-design/icons";
import { motion } from "framer-motion";
import "./DashboardHeader.css";

const DashboardHeader = ({ onMenuClick }) => {
  return (
    <motion.header 
      className="dashboard-header"
      initial={{ y: -72, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
    >
      <div className="header-left">
        <button className="mobile-menu-btn" onClick={onMenuClick}>
          <MenuOutlined />
        </button>
        
        <div className="header-search">
          <Input 
            size="large" 
            placeholder="Search appointments, patients..." 
            prefix={<SearchOutlined className="search-icon" />}
            className="search-input"
            bordered={false}
          />
        </div>
      </div>

      <div className="header-right">
        <div className="header-actions">
          <button className="action-btn" title="Toggle Dark Mode">
            <MoonOutlined />
          </button>
          
          <Badge dot color="#0f8a8f" offset={[-4, 4]}>
            <button className="action-btn" title="Notifications">
              <BellOutlined />
            </button>
          </Badge>
        </div>

        <div className="header-divider"></div>

        <div className="header-user">
          <Avatar 
            size={40} 
            icon={<UserOutlined />} 
            className="user-avatar"
          />
          <div className="user-info">
            <span className="user-name">Dr. Sarah Jenkins</span>
            <DownOutlined className="user-dropdown-icon" />
          </div>
        </div>
      </div>
    </motion.header>
  );
};

export default DashboardHeader;
