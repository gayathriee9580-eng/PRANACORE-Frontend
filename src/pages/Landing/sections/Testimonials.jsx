import React, { useRef } from "react";
import { Carousel, Rate } from "antd";
import { CheckCircleFilled } from "@ant-design/icons";
import { motion, useInView } from "framer-motion";
import SectionHeader from "../../../components/SectionHeader";
import testimonialsData from "../../../data/testimonialsData";
import "./Testimonials.css";

const Testimonials = () => {
  const sectionRef = useRef(null);
  const isSectionInView = useInView(sectionRef, { once: true, amount: 0.15 });

  // Framer Motion Animation Variants
  const headerVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, type: "spring", stiffness: 60 },
    },
  };

  const carouselVariants = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.8, delay: 0.2, type: "spring", stiffness: 50 },
    },
  };

  const stripVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, delay: 0.4, type: "spring", stiffness: 60 },
    },
  };

  const carouselSettings = {
    autoplay: true,
    autoplaySpeed: 5000,
    infinite: true,
    pauseOnHover: true,
    dots: true,
    slidesToShow: 3,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 991, // Tablet
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 767, // Mobile
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <section ref={sectionRef} id="testimonials" className="testimonials-section">
      <div className="testimonials-bg-accent" />
      <div className="testimonials-container">
        
        {/* Section Header */}
        <motion.div
          initial="hidden"
          animate={isSectionInView ? "visible" : "hidden"}
          variants={headerVariants}
        >
          <SectionHeader
            badge="Patient Stories"
            title="What Our Patients Say"
            highlight="Patients Say"
            description="Show how PRANACORE has improved the healthcare experience for thousands of patients."
          />
        </motion.div>

        {/* Carousel Block */}
        <motion.div
          className="testimonials-carousel-wrapper"
          initial="hidden"
          animate={isSectionInView ? "visible" : "hidden"}
          variants={carouselVariants}
        >
          <Carousel {...carouselSettings} className="testimonials-carousel">
            {testimonialsData.map((testimonial) => (
              <div key={testimonial.id} className="testimonial-slide">
                <div className="testimonial-card">
                  {/* Header: Photo and Info */}
                  <div className="testimonial-header">
                    <div className="testimonial-avatar-wrapper">
                      <img
                        src={testimonial.patientImage}
                        alt={testimonial.patientName}
                        className="testimonial-avatar"
                      />
                    </div>
                    <div className="testimonial-meta">
                      <h4 className="patient-name">{testimonial.patientName}</h4>
                      <p className="patient-location">{testimonial.location}</p>
                    </div>
                  </div>

                  {/* Body: Treatment and Verified Badge */}
                  <div className="testimonial-treatment-bar">
                    <span className="treatment-tag">{testimonial.treatment}</span>
                    <span className="verified-badge">
                      <CheckCircleFilled className="verified-icon" /> Verified Patient
                    </span>
                  </div>

                  {/* Rating */}
                  <div className="testimonial-rating">
                    <Rate disabled defaultValue={testimonial.rating} allowHalf className="rating-stars" />
                  </div>

                  {/* Review Text */}
                  <p className="testimonial-review">"{testimonial.review}"</p>

                  {/* Footer: Date */}
                  <div className="testimonial-footer">
                    <span className="review-date">{testimonial.date}</span>
                  </div>
                </div>
              </div>
            ))}
          </Carousel>
        </motion.div>

        {/* Bottom Stats Strip */}
        <motion.div
          className="testimonials-trust-strip"
          initial="hidden"
          animate={isSectionInView ? "visible" : "hidden"}
          variants={stripVariants}
        >
          <div className="trust-stat">
            <span className="trust-icon">⭐</span>
            <span className="trust-text">4.9 Average Rating</span>
          </div>
          <div className="trust-stat">
            <span className="trust-icon">💬</span>
            <span className="trust-text">15,000+ Reviews</span>
          </div>
          <div className="trust-stat">
            <span className="trust-icon">❤️</span>
            <span className="trust-text">98% Satisfaction</span>
          </div>
          <div className="trust-stat">
            <span className="trust-icon">🏥</span>
            <span className="trust-text">Trusted Across India</span>
          </div>
        </motion.div>

      </div>
    </section>
  );
};

export default Testimonials;
