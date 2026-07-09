import React from "react";
import { Input } from "antd";
import { MailOutlined, SafetyOutlined } from "@ant-design/icons";
import { motion } from "framer-motion";
import AuthLayout from "../components/AuthLayout";
import "./ForgotPassword.css";

const ForgotPassword = () => {
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

  const helpBoxVariants = {
    hidden: { opacity: 0, y: 15 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.4, delay: 0.2 } }
  };

  return (
    <AuthLayout>
      <div className="forgot-container">
        <motion.div 
          className="forgot-card"
          variants={cardVariants}
          initial="hidden"
          animate="visible"
        >
          {/* HEADER */}
          <motion.div className="forgot-header" variants={itemVariants}>
            <div className="forgot-badge">Password Recovery 🔒</div>
            <h2 className="forgot-title">
              Forgot Your <span className="forgot-highlight">Password</span>?
            </h2>
            <p className="forgot-subtitle">
              Enter your registered email address and we'll send you a secure verification code to reset your password.
            </p>
          </motion.div>

          {/* FORM */}
          <motion.div className="forgot-form-wrapper" variants={itemVariants}>
            <form className="forgot-form" onSubmit={(e) => e.preventDefault()}>
              
              <div className="form-group">
                <label className="form-label" htmlFor="email">Email Address</label>
                <Input
                  id="email"
                  size="large"
                  prefix={<MailOutlined className="input-icon" />}
                  placeholder="Enter your registered email"
                  className="forgot-input"
                />
              </div>

              {/* SEND CODE BUTTON */}
              <button type="submit" className="btn-forgot-submit">
                Send Verification Code
              </button>

            </form>
          </motion.div>

          {/* HELP BOX */}
          <motion.div className="forgot-help-box" variants={helpBoxVariants}>
            <SafetyOutlined className="help-icon" />
            <p className="help-text">
              For your security, verification codes expire in 10 minutes.
            </p>
          </motion.div>

          {/* BOTTOM */}
          <motion.div className="forgot-bottom" variants={itemVariants}>
            <p className="bottom-text">
              Remember your password? <a href="#signin" className="signin-link">Back to Sign In</a>
            </p>
          </motion.div>

        </motion.div>
      </div>
    </AuthLayout>
  );
};

export default ForgotPassword;
