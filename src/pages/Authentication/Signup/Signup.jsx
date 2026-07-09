import React, { useState } from "react";
import { message } from "antd";
import { useNavigate } from "react-router-dom";
import { Input, Checkbox, DatePicker, Select, Row, Col } from "antd";
import { 
  UserOutlined,
  MailOutlined, 
  LockOutlined, 
  PhoneOutlined,
  SafetyOutlined,
  GoogleOutlined 
} from "@ant-design/icons";
import { motion } from "framer-motion";
import AuthLayout from "../components/AuthLayout";
import "./Signup.css";

const { Option } = Select;

const Signup = () => {
  const navigate = useNavigate();
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [dob, setDob] = useState(null);
  const [gender, setGender] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [termsAccepted, setTermsAccepted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Basic validation for required fields
    if (!firstName || !lastName || !email || !phone || !dob || !gender || !password || !confirmPassword) {
      message.error('Please fill in all required fields');
      return;
    }
    // Email format validation
    const emailRegex = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/;
    if (!emailRegex.test(email)) {
      message.error('Please enter a valid email address');
      return;
    }
    // Password match validation
    if (password !== confirmPassword) {
      message.error('Passwords do not match');
      return;
    }
    // Terms acceptance validation
    if (!termsAccepted) {
      message.error('You must accept the terms and privacy policy');
      return;
    }
    // Success flow
    message.success('Account created successfully!');
    // Delay before navigation to OTP verification
    setTimeout(() => {
      navigate('/otp-verification');
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
        staggerChildren: 0.08
      } 
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 15 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.4 } }
  };

  return (
    <AuthLayout>
      <div className="signup-container">
        <motion.div 
          className="signup-card"
          variants={cardVariants}
          initial="hidden"
          animate="visible"
        >
          {/* HEADER */}
          <motion.div className="signup-header" variants={itemVariants}>
            <div className="signup-badge">Create Account ✨</div>
            <h2 className="signup-title">
              Join <span className="signup-highlight">PRANACORE</span> Today
            </h2>
            <p className="signup-subtitle">
              Create your account to book appointments, manage prescriptions, and securely access your healthcare dashboard.
            </p>
          </motion.div>

          {/* FORM */}
          <motion.div className="signup-form-wrapper" variants={itemVariants}>
              <form className="signup-form" onSubmit={handleSubmit}>
              
              {/* Row 1: Name */}
              <Row gutter={16}>
                <Col xs={24} sm={12}>
                  <div className="form-group">
                    <label className="form-label">First Name</label>
                    <Input
                      size="large"
                      prefix={<UserOutlined className="input-icon" />}
                      placeholder="First name"
                      className="signup-input"
                      value={firstName}
                      onChange={e => setFirstName(e.target.value)}
                    />
                  </div>
                </Col>
                <Col xs={24} sm={12} className="mt-mobile">
                  <div className="form-group">
                  <label className="form-label">Last Name</label>
                  <Input
                    size="large"
                    prefix={<UserOutlined className="input-icon" />}
                    placeholder="Last name"
                    className="signup-input"
                    value={lastName}
                    onChange={e => setLastName(e.target.value)}
                  />
                </div>
                </Col>
              </Row>

              {/* Row 2: Email */}
                <div className="form-group">
                  <label className="form-label">Email Address</label>
                  <Input
                    size="large"
                    prefix={<MailOutlined className="input-icon" />}
                    placeholder="Enter your email"
                    className="signup-input"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                  />
                </div>

              {/* Row 3: Phone */}
              <div className="form-group">
                <label className="form-label">Phone Number</label>
                <Input
                  size="large"
                  prefix={<PhoneOutlined className="input-icon" />}
                  placeholder="Enter phone number"
                  className="signup-input"
                  value={phone}
                  onChange={e => setPhone(e.target.value)}
                />
              </div>

              {/* Row 4: DOB & Gender */}
              <Row gutter={16}>
                <Col xs={24} sm={12}>
                  <div className="form-group">
                    <label className="form-label">Date of Birth</label>
                    <DatePicker 
                      size="large" 
                      className="signup-input w-100" 
                      placeholder="Select date" 
                      value={dob}
                      onChange={date => setDob(date)}
                    />
                  </div>
                </Col>
                <Col xs={24} sm={12} className="mt-mobile">
                  <div className="form-group">
                    <label className="form-label">Gender</label>
                    <Select 
                      size="large" 
                      className="signup-select w-100" 
                      placeholder="Select gender"
                      value={gender}
                      onChange={value => setGender(value)}
                    >
                      <Option value="male">Male</Option>
                      <Option value="female">Female</Option>
                      <Option value="other">Other</Option>
                    </Select>
                  </div>
                </Col>
              </Row>

              {/* Row 5: Password */}
                <div className="form-group">
                  <label className="form-label">Password</label>
                  <Input.Password
                    size="large"
                    prefix={<LockOutlined className="input-icon" />}
                    placeholder="Create a password"
                    className="signup-input"
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                  />
                </div>

              {/* Row 6: Confirm Password */}
                <div className="form-group">
                  <label className="form-label">Confirm Password</label>
                  <Input.Password
                    size="large"
                    prefix={<SafetyOutlined className="input-icon" />}
                    placeholder="Confirm your password"
                    className="signup-input"
                    value={confirmPassword}
                    onChange={e => setConfirmPassword(e.target.value)}
                  />
                </div>

              {/* CHECKBOX */}
                <div className="signup-options-row">
                  <Checkbox className="terms-checkbox" checked={termsAccepted} onChange={e => setTermsAccepted(e.target.checked)}>
                    I agree to the <a href="#privacy" className="terms-link">Privacy Policy</a> and <a href="#terms" className="terms-link">Terms & Conditions</a>.
                  </Checkbox>
                </div>

              {/* CREATE ACCOUNT BUTTON */}
                <button type="submit" className="btn-signup-submit">
                  Create Account
                </button>

            </form>
          </motion.div>

          {/* DIVIDER */}
          <motion.div className="signup-divider" variants={itemVariants}>
            <span>OR</span>
          </motion.div>

          {/* GOOGLE BUTTON */}
          <motion.div className="signup-social" variants={itemVariants}>
            <button className="btn-google-signup">
              <GoogleOutlined className="google-icon" />
              Continue with Google
            </button>
          </motion.div>

          {/* BOTTOM */}
          <motion.div className="signup-bottom" variants={itemVariants}>
            <p className="bottom-text">
              Already have an account? <a href="#signin" className="signin-link">Sign In</a>
            </p>
          </motion.div>

        </motion.div>
      </div>
    </AuthLayout>
  );
};

export default Signup;
