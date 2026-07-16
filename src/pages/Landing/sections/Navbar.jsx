import React, { useState, useEffect, useRef, useCallback } from "react";
import { Drawer, Button, Row, Col } from "antd";
import { AlignRightOutlined, CloseOutlined } from "@ant-design/icons";
import { ArrowRightOutlined, LogoutOutlined, CaretDownOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import "./Navbar.css";

// Login dropdown — patient + staff separator
const loginItems = [
  { type: "patient", icon: "👤", label: "Patient Login" },
  { type: "hospital", icon: "🏥", label: "Hospital Login", dividerBefore: true },
];

// Get Started dropdown — 3 items
const getStartedItems = [
  { type: "signup", icon: "👤", label: "Register as Patient" },
  { type: "appointments", icon: "📅", label: "Book Appointment" },
  { type: "doctors", icon: "🔍", label: "Find Doctors" },
];

const Navbar = () => {
  const navigate = useNavigate();
  const [isScrolled, setIsScrolled] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [activeItem, setActiveItem] = useState("Home");
  const [loginDropdownOpen, setLoginDropdownOpen] = useState(false);
  const [drawerLoginOpen, setDrawerLoginOpen] = useState(false);
  const [getStartedDropdownOpen, setGetStartedDropdownOpen] = useState(false);
  const [drawerGetStartedOpen, setDrawerGetStartedOpen] = useState(false);
  const dropdownRef = useRef(null);
  const getStartedRef = useRef(null);
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

  const handleLoginRole = useCallback((type) => {
    setLoginDropdownOpen(false);
    setDrawerLoginOpen(false);
    setDrawerOpen(false);
    if (type === "hospital") {
      navigate("/hospital-login");
    } else {
      navigate("/login", { state: { role: type } });
    }
  }, [navigate]);

  const handleGetStarted = useCallback((type) => {
    setGetStartedDropdownOpen(false);
    setDrawerGetStartedOpen(false);
    setDrawerOpen(false);
    if (type === "signup") {
      navigate("/signup");
    } else if (type === "appointments") {
      navigate("/appointments");
    } else if (type === "doctors") {
      navigate("/doctors");
    }
  }, [navigate]);

  // Close dropdowns on outside click
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setLoginDropdownOpen(false);
      }
      if (getStartedRef.current && !getStartedRef.current.contains(e.target)) {
        setGetStartedDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Close dropdowns on ESC
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") {
        setLoginDropdownOpen(false);
        setGetStartedDropdownOpen(false);
      }
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, []);

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
                  {/* Login Dropdown */}
                  <div
                    className="login-dropdown-wrapper"
                    ref={dropdownRef}
                    onMouseEnter={() => setLoginDropdownOpen(true)}
                    onMouseLeave={() => setLoginDropdownOpen(false)}
                  >
                    <button
                      className="btn-login-trigger"
                      aria-haspopup="true"
                      aria-expanded={loginDropdownOpen}
                      onClick={() => setLoginDropdownOpen((v) => !v)}
                    >
                      Login <CaretDownOutlined className={`login-caret ${loginDropdownOpen ? "open" : ""}`} />
                    </button>

                    {loginDropdownOpen && (
                      <div className="login-dropdown-menu" role="menu">
                        {loginItems.map(({ type, icon, label, dividerBefore }) => (
                          <React.Fragment key={type}>
                            {dividerBefore && <div className="gs-divider" />}
                            <button
                              className="login-dropdown-item"
                              role="menuitem"
                              onClick={() => handleLoginRole(type)}
                            >
                              <span className="login-role-icon">{icon}</span>
                              <span className="login-role-label">{label}</span>
                            </button>
                          </React.Fragment>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Get Started Dropdown */}
                  <div
                    className="gs-dropdown-wrapper"
                    ref={getStartedRef}
                    onMouseEnter={() => setGetStartedDropdownOpen(true)}
                    onMouseLeave={() => setGetStartedDropdownOpen(false)}
                  >
                    <button
                      className="btn-get-started-trigger"
                      aria-haspopup="true"
                      aria-expanded={getStartedDropdownOpen}
                      onClick={() => setGetStartedDropdownOpen((v) => !v)}
                    >
                      Get Started <CaretDownOutlined className={`login-caret ${getStartedDropdownOpen ? "open" : ""}`} />
                    </button>

                    {getStartedDropdownOpen && (
                      <div className="gs-dropdown-menu" role="menu">
                        {getStartedItems.map(({ type, icon, label }) => (
                          <button
                            key={type}
                            className="login-dropdown-item"
                            role="menuitem"
                            onClick={() => handleGetStarted(type)}
                          >
                            <span className="login-role-icon">{icon}</span>
                            <span className="login-role-label">{label}</span>
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
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
                {/* Mobile Login Accordion */}
                <button
                  className="drawer-btn-login-trigger"
                  aria-haspopup="true"
                  aria-expanded={drawerLoginOpen}
                  onClick={() => setDrawerLoginOpen((v) => !v)}
                >
                  Login <CaretDownOutlined className={`login-caret ${drawerLoginOpen ? "open" : ""}`} />
                </button>

                {drawerLoginOpen && (
                  <div className="drawer-login-role-list">
                    {loginItems.map(({ type, icon, label, dividerBefore }) => (
                      <React.Fragment key={type}>
                        {dividerBefore && <div className="gs-drawer-divider" />}
                        <button
                          className="drawer-login-role-item"
                          onClick={() => handleLoginRole(type)}
                        >
                          <span className="login-role-icon">{icon}</span>
                          <span className="login-role-label">{label}</span>
                        </button>
                      </React.Fragment>
                    ))}
                  </div>
                )}

                {/* Mobile Get Started Accordion */}
                <button
                  className="drawer-btn-gs-trigger"
                  aria-haspopup="true"
                  aria-expanded={drawerGetStartedOpen}
                  onClick={() => setDrawerGetStartedOpen((v) => !v)}
                >
                  Get Started <CaretDownOutlined className={`login-caret ${drawerGetStartedOpen ? "open" : ""}`} />
                </button>

                {drawerGetStartedOpen && (
                  <div className="drawer-login-role-list">
                    {getStartedItems.map(({ type, icon, label }) => (
                      <button
                        key={type}
                        className="drawer-login-role-item"
                        onClick={() => handleGetStarted(type)}
                      >
                        <span className="login-role-icon">{icon}</span>
                        <span className="login-role-label">{label}</span>
                      </button>
                    ))}
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </Drawer>
    </header>
  );
};

export default Navbar;
