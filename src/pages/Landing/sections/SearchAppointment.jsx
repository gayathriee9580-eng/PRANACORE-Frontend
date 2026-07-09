import React, { useState } from "react";
import { Row, Col, Select, DatePicker, Button, Card, message } from "antd";
import {
  SearchOutlined,
  SafetyCertificateOutlined,
  ThunderboltOutlined,
  LockOutlined
} from "@ant-design/icons";
import { motion } from "framer-motion";
import "./SearchAppointment.css";

const { Option } = Select;

const SearchAppointment = () => {
  const [department, setDepartment] = useState(undefined);
  const [doctor, setDoctor] = useState(undefined);
  const [date, setDate] = useState(null);
  const [time, setTime] = useState(undefined);

  const departments = [
    "Cardiology",
    "Neurology",
    "Orthopedics",
    "Pediatrics",
    "Dermatology",
    "General Medicine"
  ];

  const doctorsData = {
    Cardiology: ["Dr. Robert Chen", "Dr. Sarah Jenkins"],
    Neurology: ["Dr. Alan Mercer", "Dr. Eleanor Vance"],
    Orthopedics: ["Dr. David Kang", "Dr. Maria Santos"],
    Pediatrics: ["Dr. Lisa Cooper", "Dr. Emily Watson"],
    Dermatology: ["Dr. John Miller", "Dr. Sophia Ross"],
    "General Medicine": ["Dr. James Wilson", "Dr. Patricia Day"]
  };

  // Get doctors based on selected department or list all
  const getDoctorsList = () => {
    if (department && doctorsData[department]) {
      return doctorsData[department];
    }
    return Object.values(doctorsData).flat();
  };

  const handleDepartmentChange = (value) => {
    setDepartment(value);
    setDoctor(undefined); // Reset selected doctor when department changes
  };

  const handleSearch = () => {
    if (!department && !doctor && !date && !time) {
      message.info("Please select at least one search filter.");
      return;
    }

    message.success(
      `Search initiated for ${doctor || "Doctors"} in ${
        department || "any department"
      } on ${date ? date.format("YYYY-MM-DD") : "any date"} (${time || "any time"}).`
    );
  };

  // Framer Motion Variants
  const searchCardVariants = {
    hidden: { opacity: 0, y: 35 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 80,
        damping: 16,
        delay: 0.1
      }
    }
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.12,
        delayChildren: 0.3
      }
    }
  };

  const featureVariants = {
    hidden: { opacity: 0, y: 25 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 90,
        damping: 14
      }
    }
  };

  return (
    <section id="search-appointment" className="search-appointment-section">
      <div className="search-appointment-container">
        {/* Centered Search Card */}
        <motion.div
          variants={searchCardVariants}
          initial="hidden"
          animate="visible"
          className="search-card"
        >
          <Row gutter={[16, 16]} align="bottom" className="search-grid-row">
            {/* Department */}
            <Col xs={24} md={12} lg={5} className="search-col">
              <div className="input-group">
                <label id="lbl-dept" className="input-label">
                  Department
                </label>
                <Select
                  aria-labelledby="lbl-dept"
                  placeholder="Select Department"
                  value={department}
                  onChange={handleDepartmentChange}
                  allowClear
                  className="search-select"
                >
                  {departments.map((dept) => (
                    <Option key={dept} value={dept}>
                      {dept}
                    </Option>
                  ))}
                </Select>
              </div>
            </Col>

            {/* Doctor */}
            <Col xs={24} md={12} lg={5} className="search-col">
              <div className="input-group">
                <label id="lbl-doc" className="input-label">
                  Doctor
                </label>
                <Select
                  aria-labelledby="lbl-doc"
                  placeholder="Select Doctor"
                  value={doctor}
                  onChange={(val) => setDoctor(val)}
                  allowClear
                  className="search-select"
                >
                  {getDoctorsList().map((doc) => (
                    <Option key={doc} value={doc}>
                      {doc}
                    </Option>
                  ))}
                </Select>
              </div>
            </Col>

            {/* Date */}
            <Col xs={24} md={12} lg={5} className="search-col">
              <div className="input-group">
                <label id="lbl-date" className="input-label">
                  Date
                </label>
                <DatePicker
                  aria-labelledby="lbl-date"
                  placeholder="Choose Date"
                  value={date}
                  onChange={(val) => setDate(val)}
                  className="search-datepicker"
                />
              </div>
            </Col>

            {/* Time */}
            <Col xs={24} md={12} lg={4} className="search-col">
              <div className="input-group">
                <label id="lbl-time" className="input-label">
                  Time
                </label>
                <Select
                  aria-labelledby="lbl-time"
                  placeholder="Choose Time"
                  value={time}
                  onChange={(val) => setTime(val)}
                  allowClear
                  className="search-select"
                >
                  <Option value="Morning">Morning</Option>
                  <Option value="Afternoon">Afternoon</Option>
                  <Option value="Evening">Evening</Option>
                </Select>
              </div>
            </Col>

            {/* Search Button */}
            <Col xs={24} md={24} lg={5} className="search-col">
              <Button
                type="primary"
                icon={<SearchOutlined />}
                onClick={handleSearch}
                className="btn-search-submit"
              >
                Search Appointment
              </Button>
            </Col>
          </Row>
        </motion.div>

        {/* Feature Cards Row */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
          className="features-container"
        >
          <Row gutter={[24, 24]} className="feature-cards-row">
            {/* Feature 1: Verified Doctors */}
            <Col xs={24} md={8}>
              <motion.div
                variants={featureVariants}
                whileHover={{ y: -6 }}
                className="feature-card-wrapper"
              >
                <Card className="feature-card" bordered={false}>
                  <div className="feature-card-icon icon-verified" aria-hidden="true">
                    <SafetyCertificateOutlined />
                  </div>
                  <h3 className="feature-card-title">Verified Doctors</h3>
                  <p className="feature-card-description">Experienced specialists</p>
                </Card>
              </motion.div>
            </Col>

            {/* Feature 2: Instant Booking */}
            <Col xs={24} md={8}>
              <motion.div
                variants={featureVariants}
                whileHover={{ y: -6 }}
                className="feature-card-wrapper"
              >
                <Card className="feature-card" bordered={false}>
                  <div className="feature-card-icon icon-instant" aria-hidden="true">
                    <ThunderboltOutlined />
                  </div>
                  <h3 className="feature-card-title">Instant Booking</h3>
                  <p className="feature-card-description">Book appointments in seconds</p>
                </Card>
              </motion.div>
            </Col>

            {/* Feature 3: Secure Records */}
            <Col xs={24} md={8}>
              <motion.div
                variants={featureVariants}
                whileHover={{ y: -6 }}
                className="feature-card-wrapper"
              >
                <Card className="feature-card" bordered={false}>
                  <div className="feature-card-icon icon-secure" aria-hidden="true">
                    <LockOutlined />
                  </div>
                  <h3 className="feature-card-title">Secure Records</h3>
                  <p className="feature-card-description">
                    Your medical history stays protected
                  </p>
                </Card>
              </motion.div>
            </Col>
          </Row>
        </motion.div>
      </div>
    </section>
  );
};

export default SearchAppointment;
