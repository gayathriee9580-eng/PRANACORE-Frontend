import React from "react";
import { motion } from "framer-motion";
import { CheckCircleFilled, StarFilled, PictureOutlined } from "@ant-design/icons";
import "./AuthLeftPanel.css";

const AuthLeftPanel = () => {
  // Animation Variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0, 
      transition: { type: "spring", stiffness: 60 } 
    },
  };

  const floatingVariants = {
    animate: {
      y: [0, -15, 0],
      rotate: [0, 2, 0, -2, 0],
      transition: {
        duration: 8,
        repeat: Infinity,
        ease: "easeInOut",
      },
    },
  };

  const features = [
    "Verified Doctors",
    "Easy Appointment Booking",
    "Secure Medical Records",
    "24/7 Patient Support",
  ];

  return (
    <div className="auth-left-panel">
      {/* Background Elements */}
      <div className="auth-left-bg-gradient"></div>
      <motion.div 
        className="auth-left-bg-shape shape-1"
        variants={floatingVariants}
        animate="animate"
      ></motion.div>
      <motion.div 
        className="auth-left-bg-shape shape-2"
        variants={floatingVariants}
        animate="animate"
        style={{ animationDelay: "-4s" }}
      ></motion.div>

      <motion.div
        className="auth-left-content"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* TOP: Brand & Intro */}
        <motion.div className="auth-left-top" variants={itemVariants}>
          <div className="auth-logo">
            <span className="logo-accent">PRANA</span>CORE
          </div>
          <h1 className="auth-tagline">Your Health. Our Priority.</h1>
          <p className="auth-description">
            Experience a seamless, secure, and intuitive healthcare journey. Connect with trusted medical professionals and manage your appointments effortlessly.
          </p>
        </motion.div>

        {/* CENTER: Illustration Placeholder */}
        <motion.div className="auth-left-center" variants={itemVariants}>
          <div className="illustration-placeholder">
            <div className="placeholder-content">
              <PictureOutlined className="placeholder-icon" />
              <span>Healthcare Illustration Placeholder</span>
              <small>(src/assets/images/auth/...)</small>
            </div>
          </div>
        </motion.div>

        {/* BOTTOM: Trust Features & Ratings */}
        <motion.div className="auth-left-bottom" variants={itemVariants}>
          <div className="trust-features-grid">
            {features.map((feature, index) => (
              <div className="trust-feature-item" key={index}>
                <CheckCircleFilled className="trust-icon" />
                <span className="trust-text">{feature}</span>
              </div>
            ))}
          </div>

          <div className="trust-rating-box">
            <div className="rating-stars">
              <StarFilled /> <StarFilled /> <StarFilled /> <StarFilled /> <StarFilled />
            </div>
            <div className="rating-text">
              <strong>★★★★★ 4.9 Rating</strong> • Trusted by 10,000+ Patients
            </div>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default AuthLeftPanel;
