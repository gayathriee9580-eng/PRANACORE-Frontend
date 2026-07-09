import React, { useState } from "react";
import { Input, message } from "antd";
import { LockOutlined, SafetyOutlined, CheckCircleOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import AuthLayout from "../components/AuthLayout";
import "./ResetPassword.css";

const ResetPassword = () => {
  const navigate = useNavigate();
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!newPassword || !confirmPassword) {
      message.error('Please fill in all required fields');
      return;
    }
    if (newPassword.length < 8) {
      message.error('Password must be at least 8 characters');
      return;
    }
    if (!/[A-Z]/.test(newPassword)) {
      message.error('Password must include at least one uppercase letter');
      return;
    }
    if (!/[a-z]/.test(newPassword)) {
      message.error('Password must include at least one lowercase letter');
      return;
    }
    if (!/[0-9]/.test(newPassword)) {
      message.error('Password must include at least one number');
      return;
    }
    if (!/[!@#$%^&*(),.?\":{}|<>]/.test(newPassword)) {
      message.error('Password must include at least one special character');
      return;
    }
    if (newPassword !== confirmPassword) {
      message.error('Passwords do not match');
      return;
    }
    message.success('Password reset successfully!');
    setTimeout(() => {
      navigate('/reset-success');
    }, 700);
  };

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

  const tipsBoxVariants = {
    hidden: { opacity: 0, y: 15 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.4, delay: 0.2 } }
  };

  return (
    <AuthLayout>
      <div className="reset-container">
        <motion.div 
          className="reset-card"
          variants={cardVariants}
          initial="hidden"
          animate="visible"
        >
          {/* HEADER */}
          <motion.div className="reset-header" variants={itemVariants}>
            <div className="reset-badge">Create New Password 🔑</div>
            <h2 className="reset-title">
              Reset Your <span className="reset-highlight">Password</span>
            </h2>
            <p className="reset-subtitle">
              Create a strong password to keep your PRANACORE account secure.
            </p>
          </motion.div>

          {/* FORM */}
          <motion.div className="reset-form-wrapper" variants={itemVariants}>
            <form className="reset-form" onSubmit={handleSubmit}>
              
              <div className="form-group">
                <label className="form-label" htmlFor="newPassword">New Password</label>
                <Input.Password
                  id="newPassword"
                  size="large"
                  prefix={<LockOutlined className="input-icon" />}
                  placeholder="Enter new password"
                  className="reset-input"
                  value={newPassword}
                  onChange={e => setNewPassword(e.target.value)}
                />
              </div>

              <div className="form-group">
                <label className="form-label" htmlFor="confirmPassword">Confirm Password</label>
                <Input.Password
                  id="confirmPassword"
                  size="large"
                  prefix={<SafetyOutlined className="input-icon" />}
                  placeholder="Confirm new password"
                  className="reset-input"
                  value={confirmPassword}
                  onChange={e => setConfirmPassword(e.target.value)}
                />
              </div>

              {/* PASSWORD TIPS BOX */}
              <motion.div className="reset-tips-box" variants={tipsBoxVariants}>
                <p className="tips-title">Password must contain at least:</p>
                <ul className="tips-list">
                  <li><CheckCircleOutlined className="tip-icon" /> 8 characters</li>
                  <li><CheckCircleOutlined className="tip-icon" /> One uppercase letter</li>
                  <li><CheckCircleOutlined className="tip-icon" /> One lowercase letter</li>
                  <li><CheckCircleOutlined className="tip-icon" /> One number</li>
                  <li><CheckCircleOutlined className="tip-icon" /> One special character</li>
                </ul>
              </motion.div>

              {/* RESET BUTTON */}
              <button type="submit" className="btn-reset-submit">
                Reset Password
              </button>

            </form>
          </motion.div>

          {/* BOTTOM */}
          <motion.div className="reset-bottom" variants={itemVariants}>
            <p className="bottom-text">
              Back to <a href="#login" className="login-link">Login</a>
            </p>
          </motion.div>

        </motion.div>
      </div>
    </AuthLayout>
  );
};

export default ResetPassword;
