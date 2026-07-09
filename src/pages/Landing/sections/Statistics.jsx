import React, { useRef, useEffect, useState } from "react";
import { Row, Col } from "antd";
import { motion, useInView } from "framer-motion";
import statisticsData from "../../../data/statisticsData";
import "./Statistics.css";

// Reusable Counter component using requestAnimationFrame for smooth 60 FPS viewport counting
const Counter = ({ target, suffix }) => {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });

  useEffect(() => {
    if (!isInView) return;

    let start = 0;
    const end = target;
    const duration = 1800; // 1.8 seconds duration
    let startTimestamp = null;

    const step = (timestamp) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const progress = Math.min((timestamp - startTimestamp) / duration, 1);
      
      // Decelerating cubic ease out for standard premium feel
      const easeProgress = 1 - Math.pow(1 - progress, 3);
      
      const currentCount = Math.floor(start + (end - start) * easeProgress);
      setCount(currentCount);

      if (progress < 1) {
        requestAnimationFrame(step);
      } else {
        setCount(end);
      }
    };

    requestAnimationFrame(step);
  }, [isInView, target]);

  return (
    <span ref={ref} className="stat-counter-number">
      {count.toLocaleString()}{suffix}
    </span>
  );
};

const Statistics = () => {
  const sectionRef = useRef(null);
  const isSectionInView = useInView(sectionRef, { once: true, amount: 0.15 });

  // Motion variants
  const sectionVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 55,
        damping: 18,
        staggerChildren: 0.15,
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
        stiffness: 80,
        damping: 14
      }
    }
  };

  return (
    <section ref={sectionRef} id="statistics" className="statistics-section">
      {/* Background Accent Sphere */}
      <div className="stats-bg-circle" />

      <motion.div
        className="statistics-container"
        variants={sectionVariants}
        initial="hidden"
        animate={isSectionInView ? "visible" : "hidden"}
      >
        {/* Section Header */}
        <header className="stats-header">
          <span className="stats-badge">
            <span className="stats-badge-dot" />
            Trusted Healthcare Platform
          </span>
          <h2 className="stats-main-title">Our Healthcare Impact</h2>
          <p className="stats-description">
            Thousands of patients trust PRANACORE every day for accessible, reliable, and high-quality medical services. Here is what we have accomplished together.
          </p>
        </header>

        {/* Statistics Cards Row */}
        <Row gutter={[24, 24]} className="stats-cards-row">
          {statisticsData.map((stat) => (
            <Col key={stat.id} xs={24} md={12} lg={6}>
              <motion.div
                variants={cardVariants}
                whileHover={{ y: -8 }}
                className="stat-card"
              >
                <div className={`stat-card-icon-wrapper ${stat.colorClass}`}>
                  {stat.icon}
                </div>
                <div className="stat-card-number-wrapper">
                  <Counter target={stat.target} suffix={stat.suffix} />
                </div>
                <h3 className="stat-card-title">{stat.title}</h3>
                <p className="stat-card-description">{stat.description}</p>
              </motion.div>
            </Col>
          ))}
        </Row>
      </motion.div>
    </section>
  );
};

export default Statistics;
