import React from "react";
import { Input, Checkbox } from "antd";
import { MailOutlined, LockOutlined, GoogleOutlined } from "@ant-design/icons";
import { motion } from "framer-motion";
import AuthLayout from "../components/AuthLayout";
import "./Login.css";

const Login = () => {
  // Animation Variants
  const cardVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { 
      opacity: 1, 
      y: 0, 
      transition: { 
        duration: 0.6, 
        ease: "easeOut",
        when: "beforeChildren",
        staggerChildren: 0.1
      } 
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 15 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.4 } }
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
            <div className="login-badge">Welcome Back 👋</div>
            <h2 className="login-title">
              Sign in to <span className="login-highlight">PRANACORE</span>
            </h2>
            <p className="login-subtitle">
              Access your appointments, prescriptions, and healthcare dashboard securely.
            </p>
          </motion.div>

          {/* FORM */}
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
              <button type="submit" className="btn-login-submit">
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
              Don't have an account? <a href="#create" className="create-account-link">Create Account</a>
            </p>
          </motion.div>

        </motion.div>
      </div>
    </AuthLayout>
  );
};

export default Login;
