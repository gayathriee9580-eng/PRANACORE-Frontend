import React, { useRef } from "react";
import { Row, Col } from "antd";
import { 
  StarFilled, 
  CalendarOutlined, 
  HeartFilled,
  CheckCircleFilled,
  ArrowRightOutlined,
  PhoneOutlined,
  FlagFilled,
  EyeFilled
} from "@ant-design/icons";
import { motion, useInView } from "framer-motion";
import { useNavigate } from "react-router-dom";
import SectionHeader from "../../../components/SectionHeader";
import PrimaryButton from "../../../components/PrimaryButton";
import FloatingCard from "../../../components/FloatingCard";
import InfoCard from "../../../components/InfoCard";
import aboutImg from "../../../assets/images/about/about-doctor.png";
import "./AboutUs.css";

const AboutUs = () => {
  const navigate = useNavigate();
  const sectionRef = useRef(null);
  const isSectionInView = useInView(sectionRef, { once: true, amount: 0.2 });

  // Animation Variants
  const leftColVariants = {
    hidden: { opacity: 0, x: -50 },
    visible: { 
      opacity: 1, 
      x: 0, 
      transition: { duration: 0.8, type: "spring", stiffness: 50, damping: 15 } 
    }
  };

  const rightColContainerVariants = {
    hidden: {},
    visible: {
      transition: { staggerChildren: 0.12 }
    }
  };

  const rightColItemVariants = {
    hidden: { opacity: 0, x: 50 },
    visible: { 
      opacity: 1, 
      x: 0, 
      transition: { type: "spring", stiffness: 60, damping: 15 } 
    }
  };

  const fadeUpVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0, 
      transition: { type: "spring", stiffness: 60 } 
    }
  };

  // Features Checklist Data
  const checklistData = [
    "Verified Healthcare Professionals",
    "Easy Appointment Booking",
    "Secure Medical Records",
    "24/7 Patient Support"
  ];

  return (
    <section ref={sectionRef} id="about-us" className="about-section">
      <div className="about-bg-gradient" />
      
      <div className="about-container">
        <Row gutter={[48, 48]} className="about-row" align="middle">
          
          {/* LEFT COLUMN: Visuals */}
          <Col xs={24} lg={11} className="about-visual-col">
            <motion.div 
              className="about-visual-wrapper"
              variants={leftColVariants}
              initial="hidden"
              animate={isSectionInView ? "visible" : "hidden"}
            >
              {/* Decorative Elements */}
              <div className="about-image-bg-circle" />
              <div className="about-image-dots" />

              {/* Main Image */}
              <div className="about-image-container">
                <img src={aboutImg} alt="PRANACORE Doctor Consultation" className="about-main-img" />
              </div>

              {/* Floating Cards (Vertically aligned on the left) */}
              <div className="floating-cards-column">
                <motion.div
                  className="floating-card-wrapper"
                  animate={{ y: [0, -10, 0] }}
                  transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                >
                  <FloatingCard
                    icon={<StarFilled style={{ color: "#f59e0b" }} />}
                    title="10+ Years"
                    subtitle="Experience"
                    className="about-floating-card card-experience"
                  />
                </motion.div>
                
                <motion.div
                  className="floating-card-wrapper"
                  animate={{ y: [0, -12, 0] }}
                  transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut", delay: 0.3 }}
                >
                  <FloatingCard
                    icon={<CalendarOutlined style={{ color: "#0f8a8f" }} />}
                    title="50,000+"
                    subtitle="Appointments"
                    className="about-floating-card card-appointments"
                  />
                </motion.div>

                <motion.div
                  className="floating-card-wrapper"
                  animate={{ y: [0, -8, 0] }}
                  transition={{ duration: 3.8, repeat: Infinity, ease: "easeInOut", delay: 0.6 }}
                >
                  <FloatingCard
                    icon={<HeartFilled style={{ color: "#ef4444" }} />}
                    title="Trusted"
                    subtitle="By Thousands"
                    className="about-floating-card card-trusted"
                  />
                </motion.div>
              </div>
            </motion.div>
          </Col>

          {/* RIGHT COLUMN: Content */}
          <Col xs={24} lg={13}>
            <motion.div
              className="about-content-wrapper"
              variants={rightColContainerVariants}
              initial="hidden"
              animate={isSectionInView ? "visible" : "hidden"}
            >
              <motion.div variants={rightColItemVariants}>
                <SectionHeader
                  badge="About PRANACORE"
                  title="Healthcare Designed Around You"
                  highlight="Healthcare"
                />
              </motion.div>

              <motion.div variants={rightColItemVariants} className="about-description">
                <p>
                  At PRANACORE, we believe that accessing quality healthcare should be simple, seamless, and patient-centric. We bridge the gap between patients and medical professionals, ensuring you receive the best care when you need it most.
                </p>
                <p>
                  Our modern platform leverages cutting-edge technology to provide secure medical records, instant appointment booking, and verified specialist directories—empowering you to take control of your health journey.
                </p>
              </motion.div>

              <motion.div variants={rightColItemVariants} className="about-mission-vision">
                <Row gutter={[16, 16]}>
                  <Col xs={24} sm={12}>
                    <InfoCard
                      icon={<FlagFilled />}
                      title="Our Mission"
                      description="To democratize healthcare access by creating a seamless digital connection between patients and providers."
                      className="mission-card"
                    />
                  </Col>
                  <Col xs={24} sm={12}>
                    <InfoCard
                      icon={<EyeFilled />}
                      title="Our Vision"
                      description="To become the most trusted digital healthcare ecosystem, setting new standards for patient care and convenience."
                      className="vision-card"
                    />
                  </Col>
                </Row>
              </motion.div>

              <motion.div variants={fadeUpVariants} className="about-checklist">
                <Row gutter={[16, 16]}>
                  {checklistData.map((item, index) => (
                    <Col xs={24} sm={12} key={index}>
                      <div className="checklist-item">
                        <CheckCircleFilled className="checklist-icon" />
                        <span className="checklist-text">{item}</span>
                      </div>
                    </Col>
                  ))}
                </Row>
              </motion.div>

              <motion.div variants={fadeUpVariants} className="about-actions">
                <PrimaryButton
                  text="Learn More"
                  icon={<ArrowRightOutlined />}
                  variant="primary"
                  className="btn-learn-more"
                  onClick={() => navigate("/dashboard/departments")}
                />
                <PrimaryButton
                  text="Contact Us"
                  icon={<PhoneOutlined />}
                  variant="secondary"
                  className="btn-contact-us"
                  onClick={() => {
                    const el = document.querySelector("#contact");
                    if (el) el.scrollIntoView({ behavior: "smooth" });
                  }}
                />
              </motion.div>

            </motion.div>
          </Col>
        </Row>
      </div>
    </section>
  );
};

export default AboutUs;
