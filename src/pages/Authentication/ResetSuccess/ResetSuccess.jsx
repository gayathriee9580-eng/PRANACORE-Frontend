import React from "react";
import { CheckCircleFilled, SafetyCertificateOutlined } from "@ant-design/icons";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import AuthLayout from "../components/AuthLayout";
import "./ResetSuccess.css";

const ResetSuccess = () => {
  const navigate = useNavigate();
  const cardVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { 
      opacity: 1, 
      y: 0, 
      transition: { 
        duration: 0.6, 
        ease: "easeOut",
        when: "beforeChildren",
        staggerChildren: 0.15
      } 
    }
  };

  const iconVariants = {
    hidden: { opacity: 0, scale: 0.5 },
    visible: { 
      opacity: 1, 
      scale: 1, 
      transition: { 
        type: "spring", 
        stiffness: 150,
        damping: 15
      } 
    }
  };

  const headerVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
  };

  const boxVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
  };

  const fadeVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0.5 } }
  };

  return (
    <AuthLayout>
      <div className="success-container">
        <motion.div 
          className="success-card"
          variants={cardVariants}
          initial="hidden"
          animate="visible"
        >
          {/* SUCCESS ICON */}
          <motion.div className="success-icon-wrapper" variants={iconVariants}>
            <div className="success-icon-circle">
              <CheckCircleFilled className="success-icon" />
            </div>
          </motion.div>

          {/* HEADER */}
          <motion.div className="success-header" variants={headerVariants}>
            <div className="success-badge">Success 🎉</div>
            <h2 className="success-title">
              Password Updated <span className="success-highlight">Successfully</span>
            </h2>
            <p className="success-subtitle">
              Your password has been updated successfully.
              <br />
              You can now log in securely using your new password.
            </p>
          </motion.div>

          {/* SUCCESS MESSAGE BOX */}
          <motion.div className="success-message-box" variants={boxVariants}>
            <SafetyCertificateOutlined className="message-icon" />
            <p className="message-text">
              Your account is now protected with your new password.
            </p>
          </motion.div>

          {/* BUTTON */}
          <motion.div variants={fadeVariants}>
            <button className="btn-success-submit" onClick={() => navigate('/login')}>
              Back to Login
            </button>
          </motion.div>

          {/* BOTTOM */}
          <motion.div className="success-bottom" variants={fadeVariants}>
            <p className="bottom-text">
              Thank you for choosing PRANACORE ❤️
            </p>
          </motion.div>

        </motion.div>
      </div>
    </AuthLayout>
  );
};

export default ResetSuccess;
