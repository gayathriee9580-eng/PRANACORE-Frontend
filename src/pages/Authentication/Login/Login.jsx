import React from "react";
import { Input, Checkbox } from "antd";
import { MailOutlined, LockOutlined, GoogleOutlined } from "@ant-design/icons";
import { motion } from "framer-motion";
import { useLocation, useNavigate } from "react-router-dom";
import AuthLayout from "../components/AuthLayout";
import "./Login.css";

/* ── Role configuration map ─────────────────────────────────── */
const ROLE_CONFIG = {
  patient: {
    icon: "👤",
    label: "Patient",
    heading: "Patient Login",
    subtitle: "Sign in to manage appointments, medical records and payments.",
    accent: "#0f8a8f",          // teal
    accentBg: "rgba(15,138,143,0.10)",
  },
  doctor: {
    icon: "👨‍⚕️",
    label: "Doctor",
    heading: "Doctor Login",
    subtitle: "Sign in to manage appointments and patient records.",
    accent: "#2563eb",          // blue
    accentBg: "rgba(37,99,235,0.10)",
  },
  reception: {
    icon: "👩‍💼",
    label: "Receptionist",
    heading: "Reception Login",
    subtitle: "Manage patient registrations and appointments.",
    accent: "#ea580c",          // orange
    accentBg: "rgba(234,88,12,0.10)",
  },
  lab: {
    icon: "🧪",
    label: "Lab Technician",
    heading: "Lab Login",
    subtitle: "Access laboratory reports and test requests.",
    accent: "#7c3aed",          // purple
    accentBg: "rgba(124,58,237,0.10)",
  },
  pharmacy: {
    icon: "💊",
    label: "Pharmacist",
    heading: "Pharmacy Login",
    subtitle: "Manage prescriptions and medicine inventory.",
    accent: "#16a34a",          // green
    accentBg: "rgba(22,163,74,0.10)",
  },
  admin: {
    icon: "🛡️",
    label: "Administrator",
    heading: "Admin Login",
    subtitle: "Manage the complete PRANACORE system.",
    accent: "#dc2626",          // red
    accentBg: "rgba(220,38,38,0.10)",
  },
};

const Login = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const role = location.state?.role || "patient";
  const config = ROLE_CONFIG[role] ?? ROLE_CONFIG.patient;

  /* ── Animation Variants (unchanged) ──────────────────────── */
  const cardVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut",
        when: "beforeChildren",
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 15 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.4 } },
  };

  return (
    <AuthLayout>
      <div className="login-container">
        <motion.div
          className="login-card"
          variants={cardVariants}
          initial="hidden"
          animate="visible"
        >
          {/* HEADER */}
          <motion.div className="login-header" variants={itemVariants}>
            {/* Welcome badge */}
            <div className="login-badge">Welcome Back 👋</div>

            {/* Dynamic heading */}
            <h2 className="login-title">{config.heading}</h2>

            {/* Dynamic subtitle */}
            <p className="login-subtitle">{config.subtitle}</p>

            {/* Role badge */}
            <div
              className="role-badge"
              style={{ color: config.accent, background: config.accentBg }}
            >
              <span className="role-badge-icon">{config.icon}</span>
              <span className="role-badge-label">{config.label}</span>
            </div>
          </motion.div>

          {/* FORM (unchanged) */}
          <motion.div className="login-form-wrapper" variants={itemVariants}>
            <form className="login-form" onSubmit={(e) => e.preventDefault()}>

              <div className="form-group">
                <label className="form-label" htmlFor="email">Email Address</label>
                <Input
                  id="email"
                  size="large"
                  prefix={<MailOutlined className="input-icon" />}
                  placeholder="Enter your email"
                  className="login-input"
                />
              </div>

              <div className="form-group">
                <label className="form-label" htmlFor="password">Password</label>
                <Input.Password
                  id="password"
                  size="large"
                  prefix={<LockOutlined className="input-icon" />}
                  placeholder="Enter your password"
                  className="login-input"
                />
              </div>

              {/* OPTIONS ROW */}
              <div className="login-options-row">
                <Checkbox className="remember-checkbox">Remember Me</Checkbox>
                <a href="#forgot" className="forgot-password-link">Forgot Password?</a>
              </div>

              {/* LOGIN BUTTON */}
              <button
                type="submit"
                className="btn-login-submit"
                style={{ background: config.accent }}
              >
                Sign In
              </button>

            </form>
          </motion.div>

          {/* DIVIDER */}
          <motion.div className="login-divider" variants={itemVariants}>
            <span>OR</span>
          </motion.div>

          {/* GOOGLE BUTTON */}
          <motion.div className="login-social" variants={itemVariants}>
            <button className="btn-google-login">
              <GoogleOutlined className="google-icon" />
              Continue with Google
            </button>
          </motion.div>

          {/* BOTTOM */}
          <motion.div className="login-bottom" variants={itemVariants}>
            <p className="bottom-text">
              Don't have an account?{" "}
              <a href="#create" className="create-account-link">Create Account</a>
            </p>

            {/* Switch Role */}
            <button
              className="switch-role-btn"
              onClick={() => navigate("/")}
              type="button"
            >
              ← Switch Role
            </button>
          </motion.div>

        </motion.div>
      </div>
    </AuthLayout>
  );
};

export default Login;
