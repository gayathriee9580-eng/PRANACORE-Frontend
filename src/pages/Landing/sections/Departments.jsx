import React, { useRef, useMemo, useCallback } from "react";
import { Row, Col } from "antd";
import {
  TeamOutlined,
  HomeOutlined,
  CalendarOutlined,
  RightOutlined,
  StarFilled,
  LeftOutlined,
} from "@ant-design/icons";
import { motion, useInView } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import SectionHeader from "../../../components/SectionHeader";
import PrimaryButton from "../../../components/PrimaryButton";
import departmentsData from "../../../data/departmentsData";
import "./Departments.css";

const Departments = () => {
  const navigate = useNavigate();
  const sectionRef = useRef(null);
  const isSectionInView = useInView(sectionRef, { once: true, amount: 0.1 });
  const prevRef = useRef(null);
  const nextRef = useRef(null);

  const highlights = useMemo(() => [
    {
      id: 1,
      icon: <TeamOutlined aria-hidden="true" />,
      title: "Experienced Specialists",
      text: "Consult with board-certified healthcare professionals."
    },
    {
      id: 2,
      icon: <HomeOutlined aria-hidden="true" />,
      title: "Modern Facilities",
      text: "Equipped with advanced diagnostic and clinical technology."
    },
    {
      id: 3,
      icon: <CalendarOutlined aria-hidden="true" />,
      title: "Easy Online Booking",
      text: "Select dates and confirm appointments within minutes."
    }
  ], []);

  const swiperSettings = useMemo(() => ({
    modules: [Navigation, Pagination, Autoplay],
    loop: true,
    autoplay: { delay: 5000, disableOnInteraction: false, pauseOnMouseEnter: true },
    pagination: { clickable: true, dynamicBullets: false },
    navigation: { prevEl: prevRef.current, nextEl: nextRef.current },
    onBeforeInit: (swiper) => {
      swiper.params.navigation.prevEl = prevRef.current;
      swiper.params.navigation.nextEl = nextRef.current;
    },
    breakpoints: {
      0: { slidesPerView: 1, spaceBetween: 16 },
      768: { slidesPerView: 3, spaceBetween: 20 },
      1024: { slidesPerView: 4, spaceBetween: 24 },
      1280: { slidesPerView: 5, spaceBetween: 24 },
    },
    speed: 600,
    grabCursor: true,
    className: "dept-swiper",
  }), []);

  const containerVariants = {
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
      transition: { type: "spring", stiffness: 85, damping: 15 }
    }
  };

  return (
    <section ref={sectionRef} id="departments" className="departments-section">
      <div className="departments-bg-accent" />

      <div className="departments-container">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isSectionInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, type: "spring", stiffness: 60 }}
        >
          <SectionHeader
            badge="Medical Departments"
            title="Explore Our Healthcare Departments"
            highlight="Healthcare"
            description="Choose from a wide range of specialized departments with experienced doctors dedicated to providing exceptional care."
          />
        </motion.div>

        {/* Carousel Wrapper */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isSectionInView ? "visible" : "hidden"}
          className="dept-carousel-wrapper"
        >
          {/* Prev Arrow */}
          <button
            ref={prevRef}
            className="dept-nav-btn dept-nav-prev"
            aria-label="Previous department"
          >
            <LeftOutlined />
          </button>

          <Swiper {...swiperSettings}>
            {departmentsData.map((dept) => (
              <SwiperSlide key={dept.id}>
                <motion.div
                  variants={cardVariants}
                  whileHover={{ y: -8 }}
                  transition={{ type: "spring", stiffness: 150, damping: 15 }}
                  className="dept-card-wrapper"
                >
                  <article className="dept-card">
                    {/* Status Badge */}
                    <div className="dept-status-badge">
                      <span className="status-dot" />
                      {dept.availability}
                    </div>

                    {/* Gradient Icon Wrapper */}
                    <div className={`dept-icon-wrapper ${dept.colorClass}`}>
                      {dept.icon}
                    </div>

                    {/* Content */}
                    <h3 className="dept-title">{dept.name}</h3>
                    <p className="dept-description">{dept.description}</p>

                    {/* Meta Row: Doctors and Ratings */}
                    <div className="dept-meta-row">
                      <span className="dept-doc-count">{dept.doctorCount} Doctors</span>
                      <span className="dept-rating-badge">
                        <StarFilled className="rating-star-icon" aria-hidden="true" />
                        {dept.rating}
                      </span>
                    </div>

                    {/* Learn More Action Button */}
                    <PrimaryButton
                      text="Learn More"
                      variant="secondary"
                      icon={<RightOutlined aria-hidden="true" />}
                      className="btn-dept-card"
                      onClick={() => navigate("/dashboard/departments")}
                    />
                  </article>
                </motion.div>
              </SwiperSlide>
            ))}
          </Swiper>

          {/* Next Arrow */}
          <button
            ref={nextRef}
            className="dept-nav-btn dept-nav-next"
            aria-label="Next department"
          >
            <RightOutlined />
          </button>
        </motion.div>

        {/* Highlight Feature Strip */}
        <motion.div
          className="feature-strip-container"
          initial={{ opacity: 0, y: 30 }}
          animate={isSectionInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.4, type: "spring", stiffness: 60 }}
        >
          <div className="feature-strip">
            <Row gutter={[32, 24]} align="middle" justify="space-around">
              {highlights.map((item) => (
                <Col key={item.id} xs={24} md={8}>
                  <div className="strip-item">
                    <div className="strip-icon-wrapper" aria-hidden="true">
                      {item.icon}
                    </div>
                    <div className="strip-text-wrapper">
                      <h4>{item.title}</h4>
                      <p>{item.text}</p>
                    </div>
                  </div>
                </Col>
              ))}
            </Row>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Departments;
