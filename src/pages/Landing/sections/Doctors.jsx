import React, { useRef } from "react";
import { Row, Col } from "antd";
import {
  StarFilled,
  CheckCircleFilled,
  CalendarOutlined,
  CompassOutlined,
  GlobalOutlined,
  WalletOutlined,
  UserOutlined,
  ArrowRightOutlined,
} from "@ant-design/icons";
import { motion, useInView } from "framer-motion";
import { useNavigate } from "react-router-dom";
import SectionHeader from "../../../components/SectionHeader";
import PrimaryButton from "../../../components/PrimaryButton";
import doctorsData from "../../../data/doctorsData";
import "./Doctors.css";

const Doctors = () => {
  const navigate = useNavigate();
  const sectionRef = useRef(null);
  const isSectionInView = useInView(sectionRef, { once: true, amount: 0.1 });

  // Framer Motion Variants
  const containerVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 55,
        damping: 18,
        staggerChildren: 0.1,
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
    <section ref={sectionRef} id="doctors" className="doctors-section">
      <div className="doctors-bg-sphere" />

      <div className="doctors-container">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isSectionInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, type: "spring", stiffness: 60 }}
        >
          <SectionHeader
            badge="Our Doctors"
            title="Meet Our Expert Doctors"
            highlight="Expert Doctors"
            description="Consult with highly rated specialists available through PRANACORE. Get secure, certified medical care immediately."
          />
        </motion.div>

        {/* Grid of Doctor Cards */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isSectionInView ? "visible" : "hidden"}
        >
          <Row gutter={[24, 24]} className="doctors-grid-row">
            {doctorsData.map((doc) => (
              <Col key={doc.id} xs={24} md={12} lg={6}>
                <motion.div
                  variants={cardVariants}
                  whileHover={{ y: -8 }}
                  transition={{ type: "spring", stiffness: 120, damping: 15 }}
                  className="doctor-card-wrapper"
                >
                  <article className="doctor-card">
                    {/* Doctor Photo Section */}
                    <div className="doctor-image-container">
                      <img
                        src={doc.image}
                        alt={`Portrait of ${doc.name}`}
                        className="doctor-card-img"
                      />
                      {/* Availability Badge */}
                      <span className="doctor-availability-badge">
                        <span className="status-indicator-dot" />
                        {doc.availability}
                      </span>
                    </div>

                    {/* Card Content details */}
                    <div className="doctor-card-content">
                      {/* Name and Verified Badge */}
                      <div className="doctor-name-row">
                        <h3 className="doctor-name">{doc.name}</h3>
                        <CheckCircleFilled
                          className="doctor-verified-badge"
                          title="Verified Doctor"
                          aria-label="Verified Doctor"
                        />
                      </div>

                      {/* Specialization */}
                      <span className="doctor-specialization">{doc.specialization}</span>

                      {/* Hospital */}
                      <div className="doctor-info-line">
                        <CompassOutlined className="line-icon" aria-hidden="true" />
                        <span className="line-text">{doc.hospital}</span>
                      </div>

                      {/* Experience and Rating */}
                      <div className="doctor-meta-grid">
                        <div className="doctor-info-line">
                          <UserOutlined className="line-icon" aria-hidden="true" />
                          <span className="line-text">{doc.experience}</span>
                        </div>
                        <div className="doctor-rating">
                          <StarFilled className="rating-star" aria-hidden="true" />
                          <span>{doc.rating}</span>
                        </div>
                      </div>

                      {/* Languages Spoken */}
                      <div className="doctor-info-line">
                        <GlobalOutlined className="line-icon" aria-hidden="true" />
                        <span className="line-text">{doc.languages}</span>
                      </div>

                      {/* Consultation Fee */}
                      <div className="doctor-info-line fee-line">
                        <WalletOutlined className="line-icon" aria-hidden="true" />
                        <span className="line-text highlight-fee">
                          {doc.consultationFee} <span className="fee-muted">/ Consultation</span>
                        </span>
                      </div>

                      {/* Reusable PrimaryButton component */}
                      <PrimaryButton
                        text="Book Appointment"
                        variant="primary"
                        icon={<CalendarOutlined aria-hidden="true" />}
                        className="btn-book-doctor"
                        onClick={() => {
                          const token = localStorage.getItem("pranacore_token");
                          if (token) {
                            navigate("/dashboard/appointments/book");
                          } else {
                            navigate("/login");
                          }
                        }}
                      />
                      {/* Read More CTA */}
                      <span
                        className="read-more-cta"
                        onClick={() => navigate(`/dashboard/doctors/${doc.id}`)}
                      >
                        Read More <ArrowRightOutlined className="cta-arrow" />
                      </span>
                    </div>
                  </article>
                </motion.div>
              </Col>
            ))}
          </Row>
        </motion.div>

        {/* Bottom CTA Area */}
        <motion.div
          className="doctors-bottom-cta"
          initial={{ opacity: 0, y: 30 }}
          animate={isSectionInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.4, type: "spring", stiffness: 60 }}
        >
          <h4 className="cta-heading">Looking for more specialists?</h4>
          <PrimaryButton
            text="View All Doctors"
            variant="secondary"
            className="btn-view-all-docs"
            onClick={() => navigate("/dashboard/departments")}
          />
        </motion.div>
      </div>
    </section>
  );
};

export default Doctors;
