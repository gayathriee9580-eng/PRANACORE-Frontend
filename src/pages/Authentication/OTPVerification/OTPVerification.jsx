import React, { useState } from "react";
import { Input, message } from "antd";
import { useNavigate } from "react-router-dom";
import { InfoCircleOutlined } from "@ant-design/icons";
import { motion } from "framer-motion";
import AuthLayout from "../components/AuthLayout";
import "./OTPVerification.css";

const OTPVerification = () => {
  const navigate = useNavigate();
  const [otpValues, setOtpValues] = useState(Array(6).fill(''));

  const handleChange = (e, index) => {
    const val = e.target.value.replace(/\D/g, ''); // allow only digits
    const newValues = [...otpValues];
    newValues[index] = val;
    setOtpValues(newValues);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (otpValues.some(v => v.length !== 1)) {
      message.error('Please enter the complete verification code.');
      return;
    }
    // success flow
    message.success('Verification successful!');
    setTimeout(() => {
      navigate('/reset-password');
    }, 700);
  };

  const handleResend = (e) => {
    e.preventDefault();
    message.success('Verification code sent again.');
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut", when: "beforeChildren", staggerChildren: 0.1 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 15 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.4 } }
  };

  const otpContainerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.08
      }
    }
  };

  const otpBoxVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { type: "spring", stiffness: 100 }
    }
  };

  const helpBoxVariants = {
    hidden: { opacity: 0, y: 15 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.4, delay: 0.2 } }
  };

  return (
    <AuthLayout>
      <div className="otp-container">
        <motion.div 
          className="otp-card"
          variants={cardVariants}
          initial="hidden"
          animate="visible"
        >
          {/* HEADER */}
          <motion.div className="otp-header" variants={itemVariants}>
            <div className="otp-badge">Email Verification ✉️</div>
            <h2 className="otp-title">
              <span className="otp-highlight">Verify</span> Your Email
            </h2>
            <p className="otp-subtitle">
              We've sent a secure 6-digit verification code to your registered email address.
            </p>
          </motion.div>

          {/* OTP INPUT FORM */}
          <motion.div className="otp-form-wrapper" variants={itemVariants}>
            <form className="otp-form" onSubmit={handleSubmit}>
              
              <motion.div 
                className="otp-inputs-row"
                variants={otpContainerVariants}
                initial="hidden"
                animate="visible"
              >
                {[1, 2, 3, 4, 5, 6].map((index) => (
                  <motion.div key={index} variants={otpBoxVariants}>
                     <Input
                       maxLength={1}
                       className="otp-single-input"
                       value={otpValues[index - 1]}
                       onChange={(e) => handleChange(e, index - 1)}
                     />
                  </motion.div>
                ))}
              </motion.div>

              {/* VERIFY BUTTON */}
              <button type="submit" className="btn-otp-submit">
                Verify Code
              </button>

            </form>
          </motion.div>

          {/* RESEND SECTION */}
          <motion.div className="otp-resend-section" variants={itemVariants}>
            <p className="resend-text">
              Didn't receive the code? <a href="#resend" className="resend-link" onClick={handleResend}>Resend Code</a>
            </p>
            <p className="resend-timer">
              Resend available in <span className="timer-highlight">00:30</span>
            </p>
          </motion.div>

          {/* HELP BOX */}
          <motion.div className="otp-help-box" variants={helpBoxVariants}>
            <InfoCircleOutlined className="help-icon" />
            <p className="help-text">
              Please enter the 6-digit verification code sent to your email. The code expires in 10 minutes.
            </p>
          </motion.div>

          {/* BOTTOM */}
          <motion.div className="otp-bottom" variants={itemVariants}>
            <p className="bottom-text">
              Back to <a href="#forgot" className="forgot-link">Forgot Password</a>
            </p>
          </motion.div>

        </motion.div>
      </div>
    </AuthLayout>
  );
};

export default OTPVerification;
