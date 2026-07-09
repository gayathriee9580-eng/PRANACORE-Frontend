import React, { useState, useEffect } from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import DashboardHeader from "./DashboardHeader";
import Breadcrumb from "../../components/Breadcrumb";
import PageTransition from "../../components/PageTransition";
import "./DashboardLayout.css";

const DashboardLayout = ({ children }) => {
  const [isMobile, setIsMobile] = useState(false);
  const [collapsed, setCollapsed] = useState(false);
  const [mobileVisible, setMobileVisible] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      if (width < 768) {
        setIsMobile(true);
        setCollapsed(false);
      } else if (width >= 768 && width < 992) {
        setIsMobile(false);
        setCollapsed(true);
        setMobileVisible(false);
      } else {
        setIsMobile(false);
        setCollapsed(false);
        setMobileVisible(false);
      }
    };

    // Initial check
    handleResize();

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleMenuClick = () => {
    setMobileVisible(true);
  };

  const handleCloseMobileMenu = () => {
    setMobileVisible(false);
  };

  return (
    <div className="dashboard-layout-wrapper">
      <Sidebar 
        collapsed={collapsed} 
        isMobile={isMobile} 
        mobileVisible={mobileVisible} 
        onClose={handleCloseMobileMenu} 
      />
      
      <div className="dashboard-main">
        <DashboardHeader onMenuClick={handleMenuClick} />
        <Breadcrumb />

        <PageTransition>
          <main className="dashboard-content-area">
            {children || <Outlet />}
          </main>
        </PageTransition>
      </div>
    </div>
  );
};

export default DashboardLayout;
