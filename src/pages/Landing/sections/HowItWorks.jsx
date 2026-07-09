import React, { useRef } from "react";
import { Row, Col } from "antd";
import { ArrowRightOutlined } from "@ant-design/icons";
import { motion, useInView } from "framer-motion";
import SectionHeader from "../../../components/SectionHeader";
import PrimaryButton from "../../../components/PrimaryButton";
import howItWorksData from "../../../data/howItWorksData";
import "./HowItWorks.css";

const HowItWorks = () => {
  const sectionRef = useRef(null);
  const isSectionInView = useInView(sectionRef, { once: true, amount: 0.15 });

  // Framer Motion Animation Variants
  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 80,
        damping: 15,
      },
    },
  };

  const lineVariants = {
    hidden: { scaleX: 0 },
    visible: {
      scaleX: 1,
      transition: {
        duration: 1.2,
        ease: "easeInOut",
        delay: 0.3,
      },
    },
  };

  return (
    <section ref={sectionRef} id="how-it-works" className="how-section">
      <div className="how-bg-accent" />
      <div className="how-container">
        
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isSectionInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, type: "spring", stiffness: 60 }}
        >
          <SectionHeader
            badge="How It Works"
            title="Book Your Appointment in Just Four Simple Steps"
            highlight="Four Simple Steps"
            description="Explain how patients can easily find doctors, schedule appointments, receive confirmation, and visit the doctor."
          />
        </motion.div>

        {/* Timeline Grid */}
        <motion.div
          className="how-timeline-wrapper"
          variants={containerVariants}
          initial="hidden"
          animate={isSectionInView ? "visible" : "hidden"}
        >
          {/* Background Connecting Line (Desktop) */}
          <motion.div className="timeline-connector-line" variants={lineVariants} />

          <Row gutter={[32, 48]} className="how-timeline-row">
            {howItWorksData.map((step, index) => (
              <Col xs={24} md={12} lg={6} key={step.id}>
                <motion.div variants={itemVariants} className="how-step-card-wrapper">
                  <div className="how-step-card">
                    {/* Step Number Badge */}
                    <div className="step-number-badge">
                      {step.stepNumber}
                    </div>

                    {/* Step Icon */}
                    <div className="step-icon-wrapper">
                      {step.icon}
                    </div>

                    {/* Step Content */}
                    <h4 className="step-title">{step.title}</h4>
                    <p className="step-description">{step.description}</p>
                  </div>
                </motion.div>
              </Col>
            ))}
          </Row>
        </motion.div>

        {/* Bottom CTA */}
        <motion.div
          className="how-bottom-cta"
          initial={{ opacity: 0, y: 30 }}
          animate={isSectionInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.8, type: "spring", stiffness: 60 }}
        >
          <div className="cta-content">
            <h3 className="cta-heading">Ready to Book Your Appointment?</h3>
            <p className="cta-description">
              Start your healthcare journey with PRANACORE today.
            </p>
          </div>
          <div className="cta-action">
            <PrimaryButton
              text="Book Now"
              variant="primary"
              icon={<ArrowRightOutlined aria-hidden="true" />}
              onClick={() => {
                const searchEl = document.querySelector("#search-appointment");
                if (searchEl) searchEl.scrollIntoView({ behavior: "smooth" });
              }}
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default HowItWorks;
