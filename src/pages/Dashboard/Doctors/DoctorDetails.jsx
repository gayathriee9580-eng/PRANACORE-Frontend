import React, { useState } from "react";
import { Tabs, Rate, Avatar, Progress } from "antd";
import {
  UserOutlined,
  CheckCircleFilled,
  StarFilled,
  CalendarOutlined,
  EnvironmentOutlined,
  GlobalOutlined,
  TeamOutlined,
  MedicineBoxOutlined,
  PhoneOutlined,
  ArrowLeftOutlined,
  ArrowRightOutlined,
  TrophyOutlined,
  BookOutlined,
  SafetyCertificateOutlined,
  ClockCircleOutlined,
  CheckOutlined,
} from "@ant-design/icons";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import DashboardLayout from "../../../layouts/DashboardLayout/DashboardLayout";
import doctorsData from "../../../data/doctorsData";
import doctorReviewsData from "../../../data/doctorReviewsData";
import doctorScheduleData from "../../../data/doctorScheduleData";
import "./DoctorDetails.css";

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: (i = 0) => ({
    opacity: 1, y: 0,
    transition: { duration: 0.5, delay: i * 0.1, ease: "easeOut" },
  }),
};

// Use first doctor as "current" profile (in production, read from route params)
const doctor = doctorsData[0];

// ── Tab: Overview ──────────────────────────────────────────────────────────
const OverviewTab = () => (
  <div className="tab-section">
    <div className="overview-bio">
      <h3 className="tab-sub-heading">About Dr. {doctor.name.split(" ").slice(1).join(" ")}</h3>
      <p className="bio-text">{doctor.bio}</p>
    </div>
    <div className="overview-stats">
      {[
        { icon: <TeamOutlined />,         label: "Patients Treated",   value: doctor.patients.toLocaleString() },
        { icon: <CalendarOutlined />,      label: "Years Experience",   value: `${doctor.experience}+`          },
        { icon: <StarFilled />,            label: "Average Rating",     value: doctor.rating                    },
        { icon: <MedicineBoxOutlined />,   label: "Consultations",      value: "2,400+"                         },
      ].map((s, i) => (
        <div key={i} className="stat-pill">
          <div className="stat-pill-icon">{s.icon}</div>
          <div className="stat-pill-value">{s.value}</div>
          <div className="stat-pill-label">{s.label}</div>
        </div>
      ))}
    </div>
  </div>
);

// ── Tab: Experience ────────────────────────────────────────────────────────
const ExperienceTab = () => {
  const timeline = [
    { year: "2023 – Present", role: "Senior Cardiologist", org: "PRANACORE City Hospital" },
    { year: "2018 – 2023",   role: "Attending Cardiologist", org: "St. Mary's Medical Center" },
    { year: "2014 – 2018",   role: "Cardiology Fellow",    org: "Massachusetts General Hospital" },
    { year: "2010 – 2014",   role: "Medical Resident",     org: "Brigham and Women's Hospital" },
  ];
  return (
    <div className="tab-section">
      <h3 className="tab-sub-heading">Professional Experience</h3>
      <div className="experience-timeline">
        {timeline.map((item, i) => (
          <div key={i} className="timeline-entry">
            <div className="timeline-dot-wrap">
              <div className="timeline-dot-outer"><div className="timeline-dot-inner" /></div>
              {i < timeline.length - 1 && <div className="timeline-connector" />}
            </div>
            <div className="timeline-body">
              <div className="timeline-year">{item.year}</div>
              <div className="timeline-role">{item.role}</div>
              <div className="timeline-org">{item.org}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

// ── Tab: Education ─────────────────────────────────────────────────────────
const EducationTab = () => {
  const quals = [
    { degree: "Doctor of Medicine (MD)", institution: "Harvard Medical School", year: "2010", icon: <BookOutlined /> },
    { degree: "MBBS", institution: "University of Mumbai", year: "2006", icon: <BookOutlined /> },
    { degree: "Board Certification in Cardiology", institution: "American Board of Internal Medicine", year: "2015", icon: <SafetyCertificateOutlined /> },
    { degree: "Fellowship in Interventional Cardiology", institution: "Massachusetts General Hospital", year: "2018", icon: <TrophyOutlined /> },
  ];
  return (
    <div className="tab-section">
      <h3 className="tab-sub-heading">Education & Qualifications</h3>
      <div className="education-list">
        {quals.map((q, i) => (
          <div key={i} className="education-item">
            <div className="edu-icon-wrap">{q.icon}</div>
            <div className="edu-body">
              <div className="edu-degree">{q.degree}</div>
              <div className="edu-institution">{q.institution}</div>
              <div className="edu-year">{q.year}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

// ── Tab: Reviews ───────────────────────────────────────────────────────────
const ReviewsTab = () => {
  const ratingBreakdown = [5, 4, 3, 2, 1];
  const counts = [68, 22, 6, 3, 1];
  const total = counts.reduce((a, b) => a + b, 0);

  return (
    <div className="tab-section">
      <h3 className="tab-sub-heading">Patient Reviews</h3>
      <div className="reviews-summary">
        <div className="reviews-overall">
          <div className="reviews-score">{doctor.rating}</div>
          <Rate disabled defaultValue={doctor.rating} allowHalf className="reviews-rate" />
          <div className="reviews-total">{doctor.reviewCount} reviews</div>
        </div>
        <div className="reviews-breakdown">
          {ratingBreakdown.map((r, i) => (
            <div key={r} className="breakdown-row">
              <span className="breakdown-star">{r} <StarFilled style={{ color: "#f59e0b", fontSize: 11 }} /></span>
              <Progress
                percent={Math.round((counts[i] / total) * 100)}
                showInfo={false}
                strokeColor="#0f8a8f"
                trailColor="#f1f5f9"
                className="breakdown-bar"
              />
              <span className="breakdown-count">{counts[i]}</span>
            </div>
          ))}
        </div>
      </div>
      <div className="reviews-list">
        {doctorReviewsData.map((review) => (
          <div key={review.id} className="review-card">
            <div className="review-header">
              <Avatar size={40} icon={<UserOutlined />} className="review-avatar" />
              <div className="review-meta">
                <div className="review-patient">{review.patient}</div>
                <div className="review-date">{review.date}</div>
              </div>
              {review.verified && (
                <span className="review-verified-badge"><CheckOutlined /> Verified</span>
              )}
            </div>
            <Rate disabled defaultValue={review.rating} className="review-stars" />
            <div className="review-title">{review.title}</div>
            <p className="review-comment">{review.comment}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

// ── Tab: Schedule ──────────────────────────────────────────────────────────
const ScheduleTab = () => (
  <div className="tab-section">
    <h3 className="tab-sub-heading">Weekly Availability</h3>
    <div className="schedule-grid">
      {Object.entries(doctorScheduleData).map(([day, periods]) => {
        const hasSlots = Object.values(periods).some(arr => arr.length > 0);
        return (
          <div key={day} className={`schedule-day-card ${!hasSlots ? "off" : ""}`}>
            <div className="schedule-day-name">{day}</div>
            {!hasSlots ? (
              <div className="schedule-off-label">Day Off</div>
            ) : (
              Object.entries(periods).map(([period, slots]) =>
                slots.length > 0 ? (
                  <div key={period} className="schedule-period">
                    <div className="schedule-period-label">
                      <ClockCircleOutlined /> {period.charAt(0).toUpperCase() + period.slice(1)}
                    </div>
                    <div className="schedule-slots">
                      {slots.map(slot => (
                        <span key={slot} className="sched-slot-chip">{slot}</span>
                      ))}
                    </div>
                  </div>
                ) : null
              )
            )}
          </div>
        );
      })}
    </div>
  </div>
);

// ── Tab: Certificates ──────────────────────────────────────────────────────
const CertificatesTab = () => {
  const certs = [
    { title: "Board Certified Cardiologist",         body: "American Board of Internal Medicine",      year: "2015" },
    { title: "Fellow, American College of Cardiology", body: "ACC",                                   year: "2016" },
    { title: "Advanced Cardiac Life Support (ACLS)",  body: "American Heart Association",              year: "2024" },
    { title: "Interventional Cardiology Certification",body: "Society for Cardiovascular Angiography", year: "2019" },
  ];
  return (
    <div className="tab-section">
      <h3 className="tab-sub-heading">Certifications & Licenses</h3>
      <div className="certs-grid">
        {certs.map((c, i) => (
          <div key={i} className="cert-card">
            <SafetyCertificateOutlined className="cert-icon" />
            <div className="cert-title">{c.title}</div>
            <div className="cert-body">{c.body}</div>
            <div className="cert-year">Issued: {c.year}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

// ── Main Component ─────────────────────────────────────────────────────────
const DoctorDetails = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("overview");

  const tabItems = [
    { key: "overview",      label: "Overview",      children: <OverviewTab />      },
    { key: "experience",    label: "Experience",    children: <ExperienceTab />    },
    { key: "education",     label: "Education",     children: <EducationTab />     },
    { key: "reviews",       label: "Reviews",       children: <ReviewsTab />       },
    { key: "schedule",      label: "Schedule",      children: <ScheduleTab />      },
    { key: "certificates",  label: "Certificates",  children: <CertificatesTab />  },
  ];

  return (
    <DashboardLayout>
      <div className="doctor-details-page">

        {/* Back Button */}
        <button className="btn-back">
          <ArrowLeftOutlined /> Back to Doctors
        </button>

        {/* ── Hero Profile ─────────────────────────────────── */}
        <motion.div
          className="doctor-hero-card"
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55 }}
        >
          <div className="doctor-hero-left">
            <div className="hero-avatar-wrap">
              <div className="hero-avatar-circle">
                <UserOutlined className="hero-avatar-icon" />
              </div>
              {doctor.verified && (
                <div className="hero-verified-badge" title="Verified">
                  <CheckCircleFilled />
                </div>
              )}
            </div>
            <div className="hero-info">
              <div className="hero-badges-row">
                {doctor.verified && <span className="hero-badge verified">Verified Doctor</span>}
                {doctor.availableToday && <span className="hero-badge available">Available Today</span>}
              </div>
              <h1 className="hero-name">{doctor.name}</h1>
              <div className="hero-spec">{doctor.specialization}</div>

              <div className="hero-meta-grid">
                <div className="hero-meta-item"><EnvironmentOutlined /> {doctor.hospital}</div>
                <div className="hero-meta-item"><CalendarOutlined /> {doctor.experience} years experience</div>
                <div className="hero-meta-item"><TeamOutlined /> {doctor.patients.toLocaleString()} patients</div>
                <div className="hero-meta-item"><GlobalOutlined /> {doctor.languages.join(", ")}</div>
              </div>

              <div className="hero-rating-row">
                <Rate disabled defaultValue={doctor.rating} allowHalf className="hero-rate" />
                <span className="hero-rating-val">{doctor.rating}</span>
                <span className="hero-review-count">({doctor.reviewCount} reviews)</span>
              </div>
            </div>
          </div>

          <div className="hero-cta-col">
            <div className="hero-fee-badge">
              <span className="fee-label">Consultation Fee</span>
              <span className="fee-value">${doctor.fee}</span>
            </div>
            <button className="btn-hero-book" onClick={() => navigate("/dashboard/appointments/book")}>
              Book Appointment <ArrowRightOutlined />
            </button>
            <button className="btn-hero-contact">
              <PhoneOutlined /> Contact Doctor
            </button>
          </div>
        </motion.div>

        {/* ── Main Content + Sidebar ────────────────────────── */}
        <div className="dd-body-grid">

          {/* Tabs */}
          <motion.div
            className="dd-tabs-card"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.1 }}
          >
            <Tabs
              activeKey={activeTab}
              onChange={setActiveTab}
              items={tabItems}
              className="dd-tabs"
            />
          </motion.div>

          {/* Sticky Sidebar */}
          <motion.aside
            className="dd-sidebar"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.55, delay: 0.15 }}
          >
            <div className="sidebar-appt-card">
              <div className="sidebar-title">Quick Booking</div>
              <div className="sidebar-info-rows">
                <div className="sidebar-info-row"><MedicineBoxOutlined /> {doctor.specialization}</div>
                <div className="sidebar-info-row"><EnvironmentOutlined /> {doctor.hospital}</div>
                <div className="sidebar-info-row"><PhoneOutlined /> +1 (555) 012-3456</div>
                <div className="sidebar-info-row"><CalendarOutlined /> {doctor.availableToday ? "Available Today" : "Next Available: Tomorrow"}</div>
              </div>
              <div className="sidebar-fee-row">
                <span>Consultation Fee</span>
                <span className="sidebar-fee">${doctor.fee}</span>
              </div>
              <button className="btn-sidebar-book" onClick={() => navigate("/dashboard/appointments/book")}>
                Book Appointment <ArrowRightOutlined />
              </button>
            </div>

            {/* Languages */}
            <div className="sidebar-langs-card">
              <div className="sidebar-title">Languages Spoken</div>
              <div className="langs-chips">
                {doctor.languages.map(lang => (
                  <span key={lang} className="lang-chip">{lang}</span>
                ))}
              </div>
            </div>
          </motion.aside>
        </div>

        {/* ── Related Doctors ───────────────────────────────── */}
        <motion.div
          className="related-doctors-section"
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, delay: 0.2 }}
        >
          <div className="related-header">
            <h3 className="related-title">Related Doctors</h3>
            <button className="view-all-link">View All <ArrowRightOutlined /></button>
          </div>
          <div className="related-doctors-row">
            {doctorsData.filter(d => d.id !== doctor.id && d.department === doctor.department).slice(0, 3).concat(
              doctorsData.filter(d => d.id !== doctor.id && d.department !== doctor.department).slice(0, 3)
            ).slice(0, 3).map((d, i) => (
              <motion.div key={d.id} className="related-doc-card" custom={i} variants={fadeUp} initial="hidden" animate="visible" whileHover={{ y: -4 }}>
                <div className="related-doc-avatar">
                  <UserOutlined style={{ fontSize: 24, color: "#0f8a8f" }} />
                </div>
                <div className="related-doc-name">{d.name}</div>
                <div className="related-doc-spec">{d.specialization}</div>
                <div className="related-doc-rating">
                  <StarFilled style={{ color: "#f59e0b", fontSize: 12 }} /> {d.rating}
                </div>
                <button className="btn-related-view">View Profile</button>
              </motion.div>
            ))}
          </div>
        </motion.div>

      </div>
    </DashboardLayout>
  );
};

export default DoctorDetails;
