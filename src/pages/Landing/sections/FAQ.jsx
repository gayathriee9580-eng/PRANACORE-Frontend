import React, { useRef } from "react";
import { Row, Col, Collapse } from "antd";
import { PlusOutlined, MinusOutlined, PhoneOutlined, MailOutlined } from "@ant-design/icons";
import { motion, useInView } from "framer-motion";
import SectionHeader from "../../../components/SectionHeader";
import PrimaryButton from "../../../components/PrimaryButton";
import faqData from "../../../data/faqData";
import "./FAQ.css";

const FAQ = () => {
  const sectionRef = useRef(null);
  const isSectionInView = useInView(sectionRef, { once: true, amount: 0.15 });

  // Split FAQs for the two-column layout
  const halfIndex = Math.ceil(faqData.length / 2);
  const leftColumnFaqs = faqData.slice(0, halfIndex);
  const rightColumnFaqs = faqData.slice(halfIndex);

  // Custom Expand Icon
  const expandIcon = (panelProps) => {
    return panelProps.isActive ? (
      <MinusOutlined className="faq-expand-icon active" />
    ) : (
      <PlusOutlined className="faq-expand-icon" />
    );
  };

  const getPanelItems = (faqs) =>
    faqs.map((faq) => ({
      key: faq.id.toString(),
      label: <span className="faq-question-text">{faq.question}</span>,
      children: <p className="faq-answer-text">{faq.answer}</p>,
    }));

  // Framer Motion Animation Variants
  const headerVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, type: "spring", stiffness: 60 } },
  };

  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.15,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 70, damping: 15 } },
  };

  const cardVariants = {
    hidden: { opacity: 0, x: 50 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.8, delay: 0.3, type: "spring", stiffness: 50 } },
  };

  return (
    <section ref={sectionRef} id="faq" className="faq-section">
      <div className="faq-bg-accent" />
      <div className="faq-container">
        {/* Section Header */}
        <motion.div initial="hidden" animate={isSectionInView ? "visible" : "hidden"} variants={headerVariants}>
          <SectionHeader
            badge="Frequently Asked Questions"
            title="Everything You Need to Know"
            highlight="Need to Know"
            description="Answer the most common questions about appointments, doctors, payments, medical records, and platform security."
          />
        </motion.div>

        <div className="faq-content-wrapper">
          <Row gutter={[48, 48]} className="faq-main-row">
            
            {/* FAQ Accordion Columns */}
            <Col xs={24} lg={16}>
              <motion.div
                variants={containerVariants}
                initial="hidden"
                animate={isSectionInView ? "visible" : "hidden"}
              >
                <Row gutter={[24, 24]}>
                  {/* Left FAQ Column */}
                  <Col xs={24} md={12}>
                    <motion.div variants={itemVariants}>
                      <Collapse
                        accordion
                        expandIconPosition="end"
                        expandIcon={expandIcon}
                        items={getPanelItems(leftColumnFaqs)}
                        className="custom-faq-collapse"
                        ghost
                      />
                    </motion.div>
                  </Col>

                  {/* Right FAQ Column */}
                  <Col xs={24} md={12}>
                    <motion.div variants={itemVariants}>
                      <Collapse
                        accordion
                        expandIconPosition="end"
                        expandIcon={expandIcon}
                        items={getPanelItems(rightColumnFaqs)}
                        className="custom-faq-collapse"
                        ghost
                      />
                    </motion.div>
                  </Col>
                </Row>
              </motion.div>
            </Col>

            {/* Right Side Support Card (Desktop layout stacks it naturally on mobile) */}
            <Col xs={24} lg={8}>
              <motion.div
                variants={cardVariants}
                initial="hidden"
                animate={isSectionInView ? "visible" : "hidden"}
                className="faq-support-card-wrapper"
              >
                <div className="faq-support-card">
                  <div className="support-icon-circle">
                    <PhoneOutlined />
                  </div>
                  <h4 className="support-heading">Still Have Questions?</h4>
                  <p className="support-description">
                    Our support team is available to help you. Reach out to us anytime for assistance.
                  </p>
                  
                  <div className="support-actions">
                    <PrimaryButton
                      text="Contact Support"
                      variant="primary"
                      icon={<PhoneOutlined aria-hidden="true" />}
                      onClick={() => window.location.href = "tel:+1234567890"}
                      className="btn-contact-support"
                    />
                    <PrimaryButton
                      text="Email Us"
                      variant="secondary"
                      icon={<MailOutlined aria-hidden="true" />}
                      onClick={() => window.location.href = "mailto:support@pranacore.com"}
                      className="btn-email-support"
                    />
                  </div>
                </div>
              </motion.div>
            </Col>

          </Row>
        </div>
      </div>
    </section>
  );
};

export default FAQ;
