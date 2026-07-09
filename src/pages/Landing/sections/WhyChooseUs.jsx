import React, { useRef } from "react";
import { Row, Col } from "antd";
import {
  SmileOutlined,
  HeartFilled,
  CalendarOutlined
} from "@ant-design/icons";
import { motion, useInView } from "framer-motion";
import { useNavigate } from "react-router-dom";
import SectionHeader from "../../../components/SectionHeader";
import PrimaryButton from "../../../components/PrimaryButton";
import FloatingCard from "../../../components/FloatingCard";
import InfoCard from "../../../components/InfoCard";
import choiceImg from "../../../assets/images/about/about-doctor.png";
import whyChooseUsData from "../../../data/whyChooseUsData";
import "./WhyChooseUs.css";

const WhyChooseUs = () => {
  const navigate = useNavigate();
  const sectionRef = useRef(null);
  const isSectionInView = useInView(sectionRef, { once: true, amount: 0.15 });

  // Framer Motion Animation Variants
  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.12,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -30 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        type: "spring",
        stiffness: 80,
        damping: 15,
      },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 70,
        damping: 14,
      },
    },
  };

  return (
    <section id="why-choose-us" className="choose-section" ref={sectionRef}>
      <div className="choose-container">
        <Row gutter={[32, 32]} align="middle" className="choose-row">
          {/* Left Column: Interactive Image & Vitals Card */}
          <Col xs={24} lg={11} className="choose-media-col">
            <motion.div
              className="choose-media-wrapper"
              initial={{ opacity: 0, x: -50 }}
              animate={isSectionInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.8, type: "spring", stiffness: 60 }}
            >
              {/* Refactored choiceImg element */}
              <img
                src={choiceImg}
                alt="Healthcare Specialists Team at PRANACORE Clinic"
                className="choose-hero-img"
              />

              {/* Floating Vitals Card */}
              <FloatingCard
                icon={<SmileOutlined aria-hidden="true" />}
                title="99% Care Success"
                subtitle="Patient satisfaction score"
                positionClass="card-choose-success"
              />
            </motion.div>
          </Col>

          {/* Right Column: Key Selling Points */}
          <Col xs={24} lg={13} className="choose-text-col">
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate={isSectionInView ? "visible" : "hidden"}
              className="choose-text-wrapper"
            >
              {/* Refactored SectionHeader */}
              <motion.div variants={itemVariants}>
                <SectionHeader
                  badge="Why Choose Us"
                  title="We are committed to delivering the best healthcare experience"
                  highlight="Experience"
                  description="At PRANACORE, our mission is to empower patients with seamless healthcare services. From highly specialized clinical departments to verified medical experts, we ensure your health journey is fully covered."
                />
              </motion.div>

              {/* Feature grid */}
              <Row gutter={[16, 16]} className="choose-cards-grid" style={{ marginTop: 24 }}>
                {whyChooseUsData.map((data, index) => (
                  <Col xs={24} sm={12} key={index}>
                    <motion.div variants={cardVariants}>
                      <InfoCard
                        icon={data.icon}
                        title={data.title}
                        description={data.description}
                        className="choose-info-card"
                      />
                    </motion.div>
                  </Col>
                ))}
              </Row>
            </motion.div>
          </Col>
        </Row>

        {/* Centered CTA Block */}
        <motion.div
          className="choose-bottom-cta"
          initial={{ opacity: 0, y: 30 }}
          animate={isSectionInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.3, type: "spring", stiffness: 60 }}
        >
          <h3 className="cta-heading">Experience Better Healthcare Today</h3>
          <p className="cta-description">Encourage users to book appointments with confidence.</p>
          <PrimaryButton
            text="Book Appointment"
            variant="primary"
            icon={<CalendarOutlined aria-hidden="true" />}
            className="btn-choose-cta"
            onClick={() => {
              const token = localStorage.getItem("pranacore_token");
              if (token) {
                navigate("/dashboard/appointments/book");
              } else {
                navigate("/login");
              }
            }}
          />
        </motion.div>
      </div>
    </section>
  );
};

export default WhyChooseUs;
