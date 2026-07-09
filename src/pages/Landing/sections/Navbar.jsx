import React, { useState, useEffect } from "react";
import { Drawer, Button, Row, Col } from "antd";
import { AlignRightOutlined, CloseOutlined, } from "@ant-design/icons";
import { ArrowRightOutlined, LogoutOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import "./Navbar.css";

const Navbar = () => {
  const navigate = useNavigate();
  const [isScrolled, setIsScrolled] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [activeItem, setActiveItem] = useState("Home");
  const token = localStorage.getItem("pranacore_token");

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleNavClick = (label, target) => {
    setActiveItem(label);
    setDrawerOpen(false);

    // Smooth scroll to target if it exists
    const element = document.querySelector(target);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("pranacore_token");
    navigate("/login");
  };

  const navItems = [
    { label: "Home", target: "#hero" },
    { label: "About", target: "#about" },
    { label: "Services", target: "#services" },
    { label: "Doctors", target: "#doctors" },
    { label: "Departments", target: "#departments" },
    { label: "Contact", target: "#contact" },
  ];

  return (
    <header className={`navbar-container ${isScrolled ? "navbar-scrolled" : "navbar-transparent"}`}>
      <div className="navbar-wrapper">
        <Row align="middle" justify="space-between" className="navbar-row">
          {/* Left Section - Brand Logo */}
          <Col xs={12} md={5} lg={6} className="logo-col">
            <a href="/" className="logo-link" onClick={() => setActiveItem("Home")}>
              <span className="logo-icon-wrapper">
                {/* Heartbeat Cross SVG Logo */}
                <svg
                  width="32"
                  height="32"
                  viewBox="0 0 32 32"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="logo-svg"
                >
                  <rect width="32" height="32" rx="8" fill="var(--primary-color)" />
                  <path
                    d="M16 8V24M8 16H24"
                    stroke="white"
                    strokeWidth="4"
                    strokeLinecap="round"
                    opacity="0.3"
                  />
                  <path
                    d="M6 16H11L13 10L16 22L19 13L21 18L23 16H26"
                    stroke="white"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </span>
              <span className="logo-text">PRANACORE</span>
            </a>
          </Col>

          {/* Center Section - Desktop Navigation */}
          <Col xs={0} md={12} lg={12} className="nav-col">
            <nav className="nav-menu">
              {navItems.map((item) => (
                <a
                  key={item.label}
                  href={item.target}
                  className={`nav-item ${activeItem === item.label ? "active" : ""}`}
                  onClick={(e) => {
                    e.preventDefault();
                    handleNavClick(item.label, item.target);
                  }}
                >
                  {item.label}
                </a>
              ))}
            </nav>
          </Col>

          {/* Right Section - Desktop Action CTA Buttons */}
          <Col xs={0} md={7} lg={6} className="actions-col">
            <div className="nav-actions">
              {token ? (
                <>
                  <Button type="text" className="btn-login" onClick={() => navigate("/dashboard")}>
                    Dashboard
                  </Button>
                  <Button type="primary" className="btn-get-started" onClick={handleLogout}>
                    Logout <LogoutOutlined />
                  </Button>
                </>
              ) : (
                <>
                  <Button type="text" className="btn-login" onClick={() => { localStorage.setItem("pranacore_token", "demo_token"); navigate("/dashboard"); }}>Login</Button>
                  <Button type="primary" className="btn-get-started" onClick={() => navigate("/signup")}>
                    Get Started <ArrowRightOutlined />
                  </Button>
                </>
              )}
            </div>
          </Col>

          {/* Mobile Menu Icon (Hamburger) */}
          {/* <Col xs={12} md={0} className="mobile-menu-col">
            <Button
              type="text"
              icon={<AlignRightOutlined className="mobile-menu-icon" />}
              onClick={() => setDrawerOpen(true)}
              className="btn-mobile-menu"
            />
          </Col> */}
        </Row>
      </div>

      {/* Mobile & Tablet Sidebar Navigation Drawer */}
      <Drawer
        title={
          <div className="drawer-logo">
            <span className="logo-icon-wrapper-drawer">
              <svg
                width="28"
                height="28"
                viewBox="0 0 32 32"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="logo-svg"
              >
                <rect width="32" height="32" rx="8" fill="var(--primary-color)" />
                <path
                  d="M16 8V24M8 16H24"
                  stroke="white"
                  strokeWidth="4"
                  strokeLinecap="round"
                  opacity="0.3"
                />
                <path
                  d="M6 16H11L13 10L16 22L19 13L21 18L23 16H26"
                  stroke="white"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </span>
            <span className="drawer-logo-text">PRANACORE</span>
          </div>
        }
        placement="right"
        onClose={() => setDrawerOpen(false)}
        open={drawerOpen}
        closeIcon={<CloseOutlined className="drawer-close-icon" />}
        width={280}
        className="navbar-drawer"
      >
        <div className="drawer-content">
          <nav className="drawer-nav-menu">
            {navItems.map((item) => (
              <a
                key={item.label}
                href={item.target}
                className={`drawer-nav-item ${activeItem === item.label ? "active" : ""}`}
                onClick={(e) => {
                  e.preventDefault();
                  handleNavClick(item.label, item.target);
                }}
              >
                {item.label}
              </a>
            ))}
          </nav>
          <div className="drawer-actions">
            {token ? (
              <>
                <Button type="text" className="drawer-btn-login" onClick={() => { setDrawerOpen(false); navigate("/dashboard"); }} block>
                  Dashboard
                </Button>
                <Button type="primary" className="drawer-btn-get-started" onClick={() => { setDrawerOpen(false); handleLogout(); }} block>
                  Logout
                </Button>
              </>
            ) : (
              <>
                <Button type="text" className="drawer-btn-login" onClick={() => { setDrawerOpen(false); navigate("/login"); }} block>
                  Login
                </Button>
                <Button type="primary" className="drawer-btn-get-started" onClick={() => { setDrawerOpen(false); navigate("/signup"); }} block>
                  Get Started
                </Button>
              </>
            )}
          </div>
        </div>
      </Drawer>
    </header>
  );
};

export default Navbar;
