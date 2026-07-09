import React, { useRef } from "react";
import { Row, Col } from "antd";
import { motion, useInView } from "framer-motion";
import { useNavigate } from "react-router-dom";
import FeatureCard from "../../../components/FeatureCard";
import servicesData from "../../../data/servicesData";
import "./Services.css";

const Services = () => {
  const navigate = useNavigate();
  const sectionRef = useRef(null);
  const isSectionInView = useInView(sectionRef, { once: true, amount: 0.1 });

  // Animation variants
  const sectionVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 55,
        damping: 18,
        staggerChildren: 0.12,
        delayChildren: 0.1
      }
    }
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 25 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 85,
        damping: 15
      }
    }
  };

  return (
    <section ref={sectionRef} id="services-details" className="services-section">
      {/* Subtle healthcare-themed gradient background accents */}
      <div className="services-bg-accent services-bg-accent-1" />
      <div className="services-bg-accent services-bg-accent-2" />

      <div className="services-container">
        {/* Section Header */}
        <motion.header
          className="services-header"
          initial={{ opacity: 0, y: 30 }}
          animate={isSectionInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, type: "spring", stiffness: 60 }}
        >
          <span className="services-badge">
            <span className="services-badge-dot" />
            Our Services
          </span>
          <h2 className="services-main-title">Everything You Need for Better Healthcare</h2>
          <p className="services-description">
            PRANACORE provides a complete digital healthcare experience, from finding trusted doctors to managing your appointments and medical records securely.
          </p>
        </motion.header>

        {/* Services Cards Grid */}
        <motion.div
          variants={sectionVariants}
          initial="hidden"
          animate={isSectionInView ? "visible" : "hidden"}
        >
          <Row gutter={[24, 24]} className="services-cards-row">
            {servicesData.map((service) => (
              <Col key={service.id} xs={24} md={12} lg={8}>
                <motion.div
                  variants={cardVariants}
                  whileHover={{ y: -8 }}
                  className="service-card-wrapper"
                >
                  <FeatureCard
                    icon={service.icon}
                    title={service.title}
                    description={service.description}
                    linkText="Learn More"
                    className={service.colorClass}
                    onClick={() => navigate("/dashboard/departments")}
                  />
                </motion.div>
              </Col>
            ))}
          </Row>
        </motion.div>
      </div>
    </section>
  );
};

export default Services;
