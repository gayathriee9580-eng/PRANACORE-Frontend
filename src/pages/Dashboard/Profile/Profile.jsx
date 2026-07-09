import React, { useState, useEffect } from "react";
import { Card, Button, Progress, Tag, Divider, Row, Col, Space, Tooltip, message } from "antd";
import {
  UserOutlined,
  MailOutlined,
  PhoneOutlined,
  CalendarOutlined,
  EnvironmentOutlined,
  MedicineBoxOutlined,
  HeartOutlined,
  SafetyCertificateOutlined,
  EditOutlined,
  LockOutlined,
  DownloadOutlined,
  FileTextOutlined,
  PlusCircleOutlined,
  ScheduleOutlined,
  InfoCircleOutlined,
  RightOutlined,
} from "@ant-design/icons";
import { motion } from "framer-motion";
import DashboardLayout from "../../../layouts/DashboardLayout/DashboardLayout";
import profileData from "../../../data/profileData";
import emergencyContactsData from "../../../data/emergencyContactsData";
import insuranceData from "../../../data/insuranceData";
import EditProfile from "./EditProfile";
import "./Profile.css";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.05 } }
};

const cardVariants = {
  hidden: { opacity: 0, y: 15 },
  visible: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 100 } }
};

const avatarVariants = {
  hidden: { scale: 0.8, opacity: 0 },
  visible: { scale: 1, opacity: 1, transition: { type: "spring", stiffness: 80, delay: 0.1 } }
};

const Profile = () => {
  const [profile, setProfile] = useState(() => {
    const saved = localStorage.getItem("pranacore_patient_profile");
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        console.error(e);
      }
    }
    const primaryContact = emergencyContactsData.find(c => c.isPrimary) || emergencyContactsData[0];
    const primaryInsurance = insuranceData.find(i => i.status === "Active") || insuranceData[0];

    return {
      ...profileData,
      emergencyName: primaryContact?.name || "",
      emergencyRelationship: primaryContact?.relationship || "",
      emergencyPhone: primaryContact?.phone || "",
      insuranceProvider: primaryInsurance?.provider || "",
      insurancePolicy: primaryInsurance?.policyNumber || "",
      insuranceCoverage: primaryInsurance?.coverage || "",
      insuranceExpiry: primaryInsurance?.expiryDate || ""
    };
  });

  const [isEditing, setIsEditing] = useState(false);

  const handleProfileSave = (updatedProfile) => {
    setProfile(updatedProfile);
    localStorage.setItem("pranacore_patient_profile", JSON.stringify(updatedProfile));
    setIsEditing(false);
    message.success("Patient profile parameters updated successfully!");
  };

  const handleDownloadSummary = () => {
    message.loading("Generating medical dossier summary PDF...", 1.5, () => {
      message.success("Health Summary PDF downloaded successfully!");
    });
  };

  const getInitials = (first, last) => {
    const f = first ? first[0] : "";
    const l = last ? last[0] : "";
    return (f + l).toUpperCase() || "P";
  };

  if (isEditing) {
    return (
      <EditProfile
        initialData={profile}
        onSave={handleProfileSave}
        onCancel={() => setIsEditing(false)}
      />
    );
  }

  return (
    <DashboardLayout>
      <motion.div
        className="profile-dash-container"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Premium Profile Hero Banner */}
        <motion.div className="profile-hero-banner" variants={cardVariants}>
          <div className="hero-avatar-box">
            <motion.div className="avatar-circle-large" variants={avatarVariants}>
              {getInitials(profile.firstName, profile.lastName)}
            </motion.div>
            <div className="hero-patient-meta">
              <span className="hero-patient-badge">Patient Profile</span>
              <h1 className="hero-patient-name">{profile.firstName} {profile.lastName}</h1>
              <p className="hero-patient-email"><MailOutlined style={{ marginRight: 6 }} />{profile.email}</p>
            </div>
          </div>
          <div className="hero-progress-panel">
            <span className="progress-lbl">Profile Completion</span>
            <Progress 
              percent={profile.completionPercentage} 
              strokeColor={{ "0%": "#a7f3d0", "100%": "#10b981" }}
              trailColor="rgba(255,255,255,0.15)"
              className="custom-hero-progress"
            />
          </div>
        </motion.div>

        {/* Horizontal Parameter Grid Summary */}
        <div className="stats-kpi-grid profile-metrics-row">
          {[
            { label: "Patient ID", value: profile.patientId, desc: "System Reference" },
            { label: "Blood Group", value: profile.bloodGroup, desc: "Critical Indicator", highlight: true },
            { label: "Age", value: `${profile.age} Yrs`, desc: `DOB: ${profile.dob}` },
            { label: "Gender", value: profile.gender, desc: "Personal parameter" },
            { label: "Height", value: profile.height, desc: "Last measured" },
            { label: "Weight", value: profile.weight, desc: "Last measured" },
            { label: "BMI Ratio", value: profile.bmi, desc: "Normal Range" },
            { label: "Allergies", value: profile.allergies.split(",")[0] || "None", desc: "Drug / Food", alert: true }
          ].map((item, idx) => (
            <motion.div 
              key={idx} 
              className={`kpi-card metric-card ${item.highlight ? "highlight" : ""} ${item.alert ? "alert-card" : ""}`}
              variants={cardVariants} 
              whileHover={{ y: -3 }}
            >
              <span className="lbl">{item.label}</span>
              <h3 className="val">{item.value || "—"}</h3>
              <span className="desc">{item.desc}</span>
            </motion.div>
          ))}
        </div>

        {/* Two-Column Responsive Layout */}
        <Row gutter={[24, 24]}>
          {/* LEFT COLUMN: Personal Info, Emergency Contacts, Insurance */}
          <Col xs={24} lg={14} className="profile-col-stack">
            {/* Personal Information */}
            <motion.div variants={cardVariants}>
              <Card className="profile-info-card" title="Personal Details" bordered={false}>
                <div className="profile-grid-fields">
                  <div className="field-block">
                    <span className="label-text">First Name</span>
                    <span className="value-text">{profile.firstName}</span>
                  </div>
                  <div className="field-block">
                    <span className="label-text">Last Name</span>
                    <span className="value-text">{profile.lastName}</span>
                  </div>
                  <div className="field-block">
                    <span className="label-text">Email Address</span>
                    <span className="value-text">{profile.email}</span>
                  </div>
                  <div className="field-block">
                    <span className="label-text">Phone Connection</span>
                    <span className="value-text">{profile.phone}</span>
                  </div>
                  <div className="field-block">
                    <span className="label-text">Date of Birth</span>
                    <span className="value-text">{profile.dob}</span>
                  </div>
                  <div className="field-block">
                    <span className="label-text">Gender Spec</span>
                    <span className="value-text">{profile.gender}</span>
                  </div>
                  <div className="field-block address-block">
                    <span className="label-text">Permanent Address</span>
                    <span className="value-text">
                      <EnvironmentOutlined style={{ marginRight: 6, color: "#0f8a8f" }} />
                      {profile.address}, {profile.city}, {profile.state}, {profile.country} - {profile.postalCode}
                    </span>
                  </div>
                </div>
              </Card>
            </motion.div>

            {/* Emergency Contact */}
            <motion.div variants={cardVariants}>
              <Card className="profile-info-card emergency-card" title="Emergency Contact Link" bordered={false}>
                <div className="emergency-header">
                  <HeartOutlined className="heart-icon-badge" />
                  <div className="emergency-intro">
                    <h4>{profile.emergencyName}</h4>
                    <Tag color="volcano" style={{ fontWeight: 700 }}>{profile.emergencyRelationship}</Tag>
                  </div>
                </div>
                <Divider style={{ margin: "16px 0" }} />
                <div className="emergency-fields">
                  <div className="field-row">
                    <span className="lbl">Emergency Contact Number</span>
                    <span className="val"><PhoneOutlined style={{ marginRight: 6 }} />{profile.emergencyPhone}</span>
                  </div>
                </div>
              </Card>
            </motion.div>

            {/* Insurance Policy */}
            <motion.div variants={cardVariants}>
              <Card className="profile-info-card insurance-card" title="Insurance Information" bordered={false}>
                <div className="insurance-header">
                  <SafetyCertificateOutlined className="insurance-icon-badge" />
                  <div className="insurance-intro">
                    <h4>{profile.insuranceProvider}</h4>
                    <span className="policy-lbl">{profile.insuranceCoverage}</span>
                  </div>
                </div>
                <Divider style={{ margin: "16px 0" }} />
                <div className="insurance-fields">
                  <div className="field-row">
                    <span className="lbl">Policy Reference Number</span>
                    <span className="val font-mono">{profile.insurancePolicy}</span>
                  </div>
                  <div className="field-row">
                    <span className="lbl">Coverage Expiration Date</span>
                    <span className="val"><CalendarOutlined style={{ marginRight: 6 }} />{profile.insuranceExpiry}</span>
                  </div>
                </div>
              </Card>
            </motion.div>
          </Col>

          {/* RIGHT COLUMN: Health Summary & Quick Actions */}
          <Col xs={24} lg={10} className="profile-col-stack">
            {/* Health Summary Card */}
            <motion.div variants={cardVariants}>
              <Card className="profile-info-card clinical-summary-card" title="Clinical Health Dossier" bordered={false}>
                <div className="health-section-block">
                  <span className="section-subtitle">Medical Conditions</span>
                  <div className="condition-tags-row">
                    {profile.medicalConditions.split(",").map((cond, idx) => (
                      <Tag key={idx} color="blue" className="health-tag">{cond.trim()}</Tag>
                    ))}
                  </div>
                </div>

                <Divider style={{ margin: "16px 0" }} />

                <div className="health-section-block">
                  <span className="section-subtitle">Active Allergies</span>
                  <div className="condition-tags-row">
                    {profile.allergies.split(",").map((alg, idx) => (
                      <Tag key={idx} color="red" className="health-tag">{alg.trim()}</Tag>
                    ))}
                  </div>
                </div>

                <Divider style={{ margin: "16px 0" }} />

                <div className="health-section-block">
                  <span className="section-subtitle">Current Prescriptions</span>
                  <p className="meds-paragraph">
                    <MedicineBoxOutlined style={{ marginRight: 6, color: "#0f8a8f" }} />
                    {profile.currentMedications}
                  </p>
                </div>

                <Divider style={{ margin: "16px 0" }} />

                {/* Recent Appointments */}
                <div className="health-section-block">
                  <span className="section-subtitle">Recent Care Consultations</span>
                  <div className="recent-list-col">
                    {profile.recentAppointments?.map((apt) => (
                      <div key={apt.id} className="recent-item-row">
                        <ScheduleOutlined className="recent-row-icon" />
                        <div className="recent-item-meta">
                          <span className="title-txt">{apt.doctor} ({apt.department})</span>
                          <span className="sub-txt">{apt.date}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <Divider style={{ margin: "16px 0" }} />

                {/* Recent Medical Records */}
                <div className="health-section-block">
                  <span className="section-subtitle">Recent Diagnostics Records</span>
                  <div className="recent-list-col">
                    {profile.recentRecords?.map((rec) => (
                      <div key={rec.id} className="recent-item-row">
                        <FileTextOutlined className="recent-row-icon record" />
                        <div className="recent-item-meta">
                          <span className="title-txt">{rec.name}</span>
                          <span className="sub-txt">{rec.type} · {rec.date}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </Card>
            </motion.div>

            {/* Quick Actions Card */}
            <motion.div variants={cardVariants}>
              <Card className="profile-info-card actions-panel-card" title="Administrative Actions" bordered={false}>
                <div className="actions-button-vertical-grid">
                  <Button 
                    type="primary" 
                    icon={<EditOutlined />} 
                    onClick={() => setIsEditing(true)}
                    className="action-btn btn-teal-solid"
                  >
                    Edit Profile Details
                  </Button>
                  <Button 
                    icon={<DownloadOutlined />} 
                    onClick={handleDownloadSummary}
                    className="action-btn"
                  >
                    Download Health Summary PDF
                  </Button>
                  <Button 
                    icon={<FileTextOutlined />} 
                    onClick={() => message.info("Navigating to Medical Records tab...")}
                    className="action-btn"
                  >
                    View Diagnostic Reports
                  </Button>
                  <Button 
                    icon={<PlusCircleOutlined />} 
                    onClick={() => message.info("Opening Booking Module...")}
                    className="action-btn"
                  >
                    Schedule New Appointment
                  </Button>
                </div>
              </Card>
            </motion.div>
          </Col>
        </Row>
      </motion.div>
    </DashboardLayout>
  );
};

export default Profile;
