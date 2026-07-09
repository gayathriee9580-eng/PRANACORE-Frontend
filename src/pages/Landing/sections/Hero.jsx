import React from "react";
import { Row, Col } from "antd";
import {
  CheckCircleFilled,
  StarFilled,
  PhoneFilled,
  ArrowRightOutlined,
  CalendarOutlined,
  SmileOutlined,
  AppstoreOutlined,
  TeamOutlined,
  CustomerServiceOutlined
} from "@ant-design/icons";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import SectionHeader from "../../../components/SectionHeader";
import PrimaryButton from "../../../components/PrimaryButton";
import FloatingCard from "../../../components/FloatingCard";
import heroImg from "../../../assets/logos/doctor.png";
import "./Hero.css";

const Hero = () => {
  const navigate = useNavigate();
  // Framer Motion Animation Variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.12,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 25 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 90,
        damping: 14,
      },
    },
  };

  const imageVariants = {
    hidden: { opacity: 0, x: 40 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        type: "spring",
        stiffness: 70,
        damping: 16,
        delay: 0.3,
      },
    },
  };

  return (
    <section id="hero" className="hero-section">
      {/* Background Gradient Accents for visual richness */}
      <div className="hero-bg-accent hero-bg-accent-1" />
      <div className="hero-bg-accent hero-bg-accent-2" />

      <div className="hero-container">
        <Row align="middle" justify="space-between" className="hero-row">
          {/* Left Column: Headline and CTAs */}
          <Col xs={24} lg={12} className="hero-content-col">
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="hero-content-wrapper"
            >
              {/* Refactored SectionHeader */}
              <motion.div variants={itemVariants}>
                <SectionHeader
                  badge="Trusted Healthcare Platform"
                  title="Book Appointments with Trusted Doctors"
                  highlight="Trusted"
                  description="PRANACORE connects you with top-rated medical experts, enabling seamless scheduling, virtual consultations, and physical checkups. Take charge of your health today with our unified healthcare portal."
                />
              </motion.div>

              {/* Action CTA Buttons */}
              <motion.div variants={itemVariants} className="hero-actions">
                <PrimaryButton
                  text="Book Appointment"
                  variant="primary"
                  icon={<CalendarOutlined />}
                  className="btn-hero-primary"
                  onClick={() => {
                    const token = localStorage.getItem("pranacore_token");
                    if (token) {
                      navigate("/dashboard/appointments/book");
                    } else {
                      navigate("/login");
                    }
                  }}
                />
                <PrimaryButton
                  text="Learn More"
                  variant="secondary"
                  icon={<ArrowRightOutlined />}
                  className="btn-hero-secondary"
                  onClick={() => navigate("/dashboard/departments")}
                />
              </motion.div>

              {/* Trust Indicators / Stats */}
              <motion.div variants={itemVariants} className="hero-stats">
                <div className="stat-item">
                  <div className="stat-icon-wrapper doctor-stat">
                    <TeamOutlined aria-hidden="true" />
                  </div>
                  <div className="stat-info">
                    <span className="stat-number">500+</span>
                    <span className="stat-label">Doctors</span>
                  </div>
                </div>

                <div className="stat-item">
                  <div className="stat-icon-wrapper dept-stat">
                    <AppstoreOutlined aria-hidden="true" />
                  </div>
                  <div className="stat-info">
                    <span className="stat-number">25+</span>
                    <span className="stat-label">Departments</span>
                  </div>
                </div>

                <div className="stat-item">
                  <div className="stat-icon-wrapper patient-stat">
                    <SmileOutlined aria-hidden="true" />
                  </div>
                  <div className="stat-info">
                    <span className="stat-number">10K+</span>
                    <span className="stat-label">Happy Patients</span>
                  </div>
                </div>

                <div className="stat-item">
                  <div className="stat-icon-wrapper support-stat">
                    <CustomerServiceOutlined aria-hidden="true" />
                  </div>
                  <div className="stat-info">
                    <span className="stat-number">24/7</span>
                    <span className="stat-label">Support</span>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </Col>

          {/* Right Column: Visual Area with Floating Info Cards */}
          <Col xs={24} lg={11} className="hero-visual-col">
            <motion.div
              variants={imageVariants}
              initial="hidden"
              animate="visible"
              className="hero-visual-wrapper"
            >
              {/* Image Frame Container */}
              <div className="hero-image-container">
                <img
                  src={heroImg}
                  alt="Professional doctors team ready to consult at PRANACORE"
                  className="hero-main-img"
                />
                {/* Decorative blob in frame */}
                <div className="hero-image-blob" />
              </div>

              {/* Floating Card 1: Verified Doctors */}
              <motion.div
                className="card-verified-motion-wrapper"
                animate={{ y: [0, -8, 0] }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              >
                <FloatingCard
                  icon={<CheckCircleFilled />}
                  title="Verified Doctors"
                  subtitle="100% Certified Experts"
                  className="card-verified"
                />
              </motion.div>

              {/* Floating Card 2: 98% Patient Satisfaction */}
              <motion.div
                className="card-satisfaction-motion-wrapper"
                animate={{ y: [0, -12, 0] }}
                transition={{
                  duration: 4.8,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: 0.4
                }}
              >
                <FloatingCard
                  icon={<StarFilled />}
                  title="98% Satisfaction"
                  subtitle="Top Patient Reviews"
                  className="card-satisfaction"
                />
              </motion.div>

              {/* Floating Card 3: 24/7 Emergency */}
              <motion.div
                className="card-emergency-motion-wrapper"
                animate={{ y: [0, -7, 0] }}
                transition={{
                  duration: 3.5,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: 0.8
                }}
              >
                <FloatingCard
                  icon={<PhoneFilled />}
                  title="24/7 Emergency"
                  subtitle="Immediate Care line"
                  className="card-emergency"
                />
              </motion.div>
            </motion.div>
          </Col>
        </Row>
      </div>
    </section>
  );
};

export default Hero;
