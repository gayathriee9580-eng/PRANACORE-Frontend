import React, { useRef, useState } from "react";
import { message } from "antd";
import { useNavigate } from "react-router-dom";
import { Input } from "antd";
import {
  CheckCircleFilled,
  FacebookFilled,
  InstagramFilled,
  LinkedinFilled,
  XOutlined,
  GithubFilled,
  MailOutlined
} from "@ant-design/icons";
import { motion, useInView } from "framer-motion";
import SectionHeader from "../../../components/SectionHeader";
import PrimaryButton from "../../../components/PrimaryButton";
import newsletterBenefitsData from "../../../data/newsletterBenefitsData";
import "./Newsletter.css";

const Newsletter = () => {
  const sectionRef = useRef(null);
  const isSectionInView = useInView(sectionRef, { once: true, amount: 0.2 });
  const navigate = useNavigate();
  const [email, setEmail] = useState('');

  const handleSubscribe = () => {
    if (!email) {
      message.error('Please enter an email address');
      return;
    }
    message.success('Subscribed successfully!');
    navigate('/signup');
  };

  // Animation variants
  const headerVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, type: "spring", stiffness: 60 }
    }
  };

  const formVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, delay: 0.2, type: "spring", stiffness: 50 }
    }
  };

  const benefitsContainerVariants = {
    hidden: {},
    visible: {
      transition: { staggerChildren: 0.15, delayChildren: 0.4 }
    }
  };

  const benefitItemVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 80 } }
  };

  const socialVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.6, delay: 0.6, type: "spring", stiffness: 60 }
    }
  };

  return (
    <section ref={sectionRef} id="newsletter" className="newsletter-section">
      <div className="newsletter-container">
        
        {/* Large Centered Subscription Card */}
        <div className="newsletter-card">
          <div className="newsletter-card-bg-shape shape-1" />
          <div className="newsletter-card-bg-shape shape-2" />
          
          <div className="newsletter-card-content">
            
            {/* Header */}
            <motion.div initial="hidden" animate={isSectionInView ? "visible" : "hidden"} variants={headerVariants}>
              <SectionHeader
                badge="Stay Connected"
                title="Subscribe to Our Healthcare Newsletter"
                highlight="Healthcare Newsletter"
                description="Receive health tips, wellness articles, appointment reminders, and important hospital announcements directly in your inbox."
              />
            </motion.div>

            {/* Subscription Form */}
            <motion.div 
              className="newsletter-form-wrapper"
              initial="hidden"
              animate={isSectionInView ? "visible" : "hidden"}
              variants={formVariants}
            >
              <form className="newsletter-form" onSubmit={(e) => e.preventDefault()}>
                <div className="form-input-group">
                  <label htmlFor="newsletter-email" className="sr-only">Email Address</label>
                  <Input
                    id="newsletter-email"
                    type="email"
                    placeholder="Enter your email address"
                    prefix={<MailOutlined className="input-icon" aria-hidden="true" />}
                    className="newsletter-input"
                    size="large"
                    required
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                  />
                  <PrimaryButton
                    text="Subscribe"
                    variant="primary"
                    className="btn-subscribe"
                    onClick={handleSubscribe}
                  />
                </div>
              </form>
            </motion.div>

            {/* Benefits Row */}
            <motion.div 
              className="newsletter-benefits"
              variants={benefitsContainerVariants}
              initial="hidden"
              animate={isSectionInView ? "visible" : "hidden"}
            >
              {newsletterBenefitsData.map(benefit => (
                <motion.div key={benefit.id} className="benefit-item" variants={benefitItemVariants}>
                  <CheckCircleFilled className="benefit-check-icon" aria-hidden="true" />
                  <span className="benefit-text">{benefit.text}</span>
                </motion.div>
              ))}
            </motion.div>

            {/* Social Links */}
            <motion.div 
              className="newsletter-socials"
              initial="hidden"
              animate={isSectionInView ? "visible" : "hidden"}
              variants={socialVariants}
            >
              <a href="#facebook" className="social-icon-btn" aria-label="Facebook">
                <FacebookFilled />
              </a>
              <a href="#instagram" className="social-icon-btn" aria-label="Instagram">
                <InstagramFilled />
              </a>
              <a href="#twitter" className="social-icon-btn" aria-label="Twitter">
                <XOutlined />
              </a>
              <a href="#linkedin" className="social-icon-btn" aria-label="LinkedIn">
                <LinkedinFilled />
              </a>
              <a href="#github" className="social-icon-btn" aria-label="GitHub">
                <GithubFilled />
              </a>
            </motion.div>

          </div>
        </div>
      </div>
    </section>
  );
};

export default Newsletter;
