import React, { useState, useEffect } from "react";
import { Row, Col } from "antd";
import {
  SafetyCertificateFilled,
  CheckCircleFilled,
  CustomerServiceFilled,
  FacebookFilled,
  InstagramFilled,
  LinkedinFilled,
  XOutlined,
  GithubFilled,
  UpOutlined,
  EnvironmentFilled,
  PhoneFilled,
  MailFilled,
  ClockCircleFilled,
  AlertFilled
} from "@ant-design/icons";
import { motion, AnimatePresence } from "framer-motion";
import { quickLinks, patientServices } from "../../../data/footerLinksData";
import footerContactData from "../../../data/footerContactData";
import "./Footer.css";

const Footer = () => {
  const [showTopBtn, setShowTopBtn] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 400) {
        setShowTopBtn(true);
      } else {
        setShowTopBtn(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        staggerChildren: 0.15,
        type: "spring",
        stiffness: 50
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 70 } }
  };

  const getContactIcon = (label) => {
    switch (label) {
      case "Address": return <EnvironmentFilled />;
      case "Phone": return <PhoneFilled />;
      case "Email": return <MailFilled />;
      case "Working Hours": return <ClockCircleFilled />;
      case "Emergency Contact": return <AlertFilled />;
      default: return <CheckCircleFilled />;
    }
  };

  return (
    <footer id="contact" className="footer-section">
      <div className="footer-container">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          <Row gutter={[48, 48]} className="footer-main-row">
            
            {/* Column 1: Brand */}
            <Col xs={24} md={12} lg={7}>
              <motion.div variants={itemVariants} className="footer-col brand-col">
                <div className="footer-logo">
                  <span className="logo-accent">PRANA</span>CORE
                </div>
                <p className="brand-description">
                  PRANACORE is a modern healthcare platform connecting patients with trusted doctors through secure and convenient appointment booking.
                </p>
                <ul className="trust-badges">
                  <li><SafetyCertificateFilled className="badge-icon" /> Secure Platform</li>
                  <li><CheckCircleFilled className="badge-icon" /> Verified Doctors</li>
                  <li><CustomerServiceFilled className="badge-icon" /> 24/7 Support</li>
                </ul>
                
                {/* Social Media */}
                <div className="footer-socials">
                  <a href="#fb" className="social-icon" aria-label="Facebook"><FacebookFilled /></a>
                  <a href="#ig" className="social-icon" aria-label="Instagram"><InstagramFilled /></a>
                  <a href="#in" className="social-icon" aria-label="LinkedIn"><LinkedinFilled /></a>
                  <a href="#x" className="social-icon" aria-label="Twitter"><XOutlined /></a>
                  <a href="#git" className="social-icon" aria-label="GitHub"><GithubFilled /></a>
                </div>
              </motion.div>
            </Col>

            {/* Column 2: Quick Links */}
            <Col xs={24} md={12} lg={5}>
              <motion.div variants={itemVariants} className="footer-col links-col">
                <h4 className="footer-heading">Quick Links</h4>
                <ul className="footer-link-list">
                  {quickLinks.map(link => (
                    <li key={link.id}>
                      <a href={link.url} className="footer-link">{link.name}</a>
                    </li>
                  ))}
                </ul>
              </motion.div>
            </Col>

            {/* Column 3: Patient Services */}
            <Col xs={24} md={12} lg={5}>
              <motion.div variants={itemVariants} className="footer-col links-col">
                <h4 className="footer-heading">Patient Services</h4>
                <ul className="footer-link-list">
                  {patientServices.map(service => (
                    <li key={service.id}>
                      <a href={service.url} className="footer-link">{service.name}</a>
                    </li>
                  ))}
                </ul>
              </motion.div>
            </Col>

            {/* Column 4: Contact Information */}
            <Col xs={24} md={12} lg={7}>
              <motion.div variants={itemVariants} className="footer-col contact-col">
                <h4 className="footer-heading">Contact Information</h4>
                <ul className="footer-contact-list">
                  {footerContactData.map(contact => (
                    <li key={contact.id} className="contact-item">
                      <span className="contact-icon">{getContactIcon(contact.label)}</span>
                      <div className="contact-details">
                        <span className="contact-label">{contact.label}</span>
                        <span className="contact-value">{contact.value}</span>
                      </div>
                    </li>
                  ))}
                </ul>
              </motion.div>
            </Col>

          </Row>

          {/* Bottom Bar */}
          <motion.div variants={itemVariants} className="footer-bottom-bar">
            <div className="footer-copyright">
              © 2026 PRANACORE. All Rights Reserved.
            </div>
            <div className="footer-legal-links">
              <a href="#privacy">Privacy Policy</a>
              <a href="#terms">Terms & Conditions</a>
              <a href="#cookie">Cookie Policy</a>
              <a href="#accessibility">Accessibility</a>
            </div>
          </motion.div>

        </motion.div>
      </div>

      {/* Floating Back To Top Button */}
      <AnimatePresence>
        {showTopBtn && (
          <motion.button
            className="back-to-top-btn"
            onClick={scrollToTop}
            initial={{ opacity: 0, scale: 0.5, y: 50 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.5, y: 50 }}
            transition={{ type: "spring", stiffness: 100, damping: 15 }}
            aria-label="Back to top"
          >
            <UpOutlined />
          </motion.button>
        )}
      </AnimatePresence>
    </footer>
  );
};

export default Footer;
