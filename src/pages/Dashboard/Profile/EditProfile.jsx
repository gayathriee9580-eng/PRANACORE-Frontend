import React, { useState } from "react";
import { Card, Input, Select, Button, Row, Col, Space, Divider, Avatar } from "antd";
import {
  SaveOutlined,
  CloseOutlined,
  UserOutlined,
  PhoneOutlined,
  EnvironmentOutlined,
  HeartOutlined,
  SafetyCertificateOutlined,
  MedicineBoxOutlined,
  CameraOutlined,
} from "@ant-design/icons";
import { motion } from "framer-motion";
import DashboardLayout from "../../../layouts/DashboardLayout/DashboardLayout";
import "./EditProfile.css";

const { Option } = Select;
const { TextArea } = Input;

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.05 } }
};

const cardVariants = {
  hidden: { opacity: 0, y: 15 },
  visible: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 100 } }
};

const EditProfile = ({ initialData, onSave, onCancel }) => {
  const [formData, setFormData] = useState({ ...initialData });

  const handleChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const getInitials = (first, last) => {
    const f = first ? first[0] : "";
    const l = last ? last[0] : "";
    return (f + l).toUpperCase() || "P";
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.firstName.trim() || !formData.lastName.trim()) {
      alert("First and Last name parameters are required.");
      return;
    }
    onSave(formData);
  };

  return (
    <DashboardLayout>
      <motion.div
        className="edit-profile-container"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <form onSubmit={handleSubmit}>
          {/* Header Action Banner */}
          <motion.div className="edit-profile-header-banner" variants={cardVariants}>
            <div className="header-text-block">
              <span className="subtitle">Modify Profile Credentials</span>
              <h1 className="title">Edit Patient Record</h1>
            </div>
            <div className="header-actions">
              <Button
                icon={<CloseOutlined />}
                onClick={onCancel}
                className="btn-cancel"
              >
                Cancel
              </Button>
              <Button
                type="primary"
                icon={<SaveOutlined />}
                htmlType="submit"
                className="btn-save"
              >
                Save Changes
              </Button>
            </div>
          </motion.div>

          <Row gutter={[24, 24]} style={{ marginTop: 24 }}>
            {/* Left Column: Personal info form and vitals */}
            <Col xs={24} lg={16}>
              <div className="edit-profile-stack">
                
                {/* Profile Photo Placeholder Card */}
                <motion.div variants={cardVariants}>
                  <Card className="edit-form-card avatar-edit-card" bordered={false}>
                    <div className="avatar-edit-flex">
                      <div className="avatar-placeholder-ring">
                        <Avatar size={72} className="avatar-edit-placeholder">
                          {getInitials(formData.firstName, formData.lastName)}
                        </Avatar>
                        <div className="camera-overlay-badge">
                          <CameraOutlined />
                        </div>
                      </div>
                      <div className="avatar-edit-instructions">
                        <h3>Patient Photograph</h3>
                        <p>JPG or PNG file formats under 5MB. Photographic representation is used for identification parameters.</p>
                      </div>
                    </div>
                  </Card>
                </motion.div>

                {/* Personal Parameters Form Card */}
                <motion.div variants={cardVariants}>
                  <Card className="edit-form-card" title="Personal Parameters" bordered={false}>
                    <Row gutter={[16, 16]}>
                      <Col xs={24} sm={12}>
                        <div className="input-group">
                          <span className="input-lbl">First Name *</span>
                          <Input
                            placeholder="Enter first name"
                            value={formData.firstName}
                            onChange={(e) => handleChange("firstName", e.target.value)}
                            prefix={<UserOutlined />}
                          />
                        </div>
                      </Col>
                      <Col xs={24} sm={12}>
                        <div className="input-group">
                          <span className="input-lbl">Last Name *</span>
                          <Input
                            placeholder="Enter last name"
                            value={formData.lastName}
                            onChange={(e) => handleChange("lastName", e.target.value)}
                            prefix={<UserOutlined />}
                          />
                        </div>
                      </Col>
                      <Col xs={24} sm={12}>
                        <div className="input-group">
                          <span className="input-lbl">Email Address</span>
                          <Input
                            placeholder="Enter email address"
                            value={formData.email}
                            onChange={(e) => handleChange("email", e.target.value)}
                          />
                        </div>
                      </Col>
                      <Col xs={24} sm={12}>
                        <div className="input-group">
                          <span className="input-lbl">Contact Phone</span>
                          <Input
                            placeholder="Enter phone number"
                            value={formData.phone}
                            onChange={(e) => handleChange("phone", e.target.value)}
                            prefix={<PhoneOutlined />}
                          />
                        </div>
                      </Col>
                      <Col xs={24} sm={12}>
                        <div className="input-group">
                          <span className="input-lbl">Date of Birth</span>
                          <Input
                            placeholder="YYYY-MM-DD"
                            value={formData.dob}
                            onChange={(e) => handleChange("dob", e.target.value)}
                          />
                        </div>
                      </Col>
                      <Col xs={24} sm={12}>
                        <div className="input-group">
                          <span className="input-lbl">Gender</span>
                          <Select
                            value={formData.gender}
                            onChange={(val) => handleChange("gender", val)}
                            className="select-field"
                          >
                            <Option value="Male">Male</Option>
                            <Option value="Female">Female</Option>
                            <Option value="Other">Other</Option>
                          </Select>
                        </div>
                      </Col>
                      <Col xs={24} sm={12}>
                        <div className="input-group">
                          <span className="input-lbl">Blood Group</span>
                          <Select
                            value={formData.bloodGroup}
                            onChange={(val) => handleChange("bloodGroup", val)}
                            className="select-field"
                          >
                            <Option value="A+">A+</Option>
                            <Option value="A-">A-</Option>
                            <Option value="B+">B+</Option>
                            <Option value="B-">B-</Option>
                            <Option value="AB+">AB+</Option>
                            <Option value="AB-">AB-</Option>
                            <Option value="O+">O+</Option>
                            <Option value="O-">O-</Option>
                          </Select>
                        </div>
                      </Col>
                      <Col xs={12} sm={6}>
                        <div className="input-group">
                          <span className="input-lbl">Height (cm)</span>
                          <Input
                            placeholder="e.g. 180"
                            value={formData.height}
                            onChange={(e) => handleChange("height", e.target.value)}
                          />
                        </div>
                      </Col>
                      <Col xs={12} sm={6}>
                        <div className="input-group">
                          <span className="input-lbl">Weight (kg)</span>
                          <Input
                            placeholder="e.g. 75"
                            value={formData.weight}
                            onChange={(e) => handleChange("weight", e.target.value)}
                          />
                        </div>
                      </Col>
                    </Row>

                    <Divider style={{ margin: "24px 0" }} />

                    {/* Address details */}
                    <h4 className="card-section-subtitle">Address Details</h4>
                    <Row gutter={[16, 16]}>
                      <Col xs={24}>
                        <div className="input-group">
                          <span className="input-lbl">Street Address</span>
                          <Input
                            placeholder="Street, suite, building details"
                            value={formData.address}
                            onChange={(e) => handleChange("address", e.target.value)}
                            prefix={<EnvironmentOutlined />}
                          />
                        </div>
                      </Col>
                      <Col xs={24} sm={12}>
                        <div className="input-group">
                          <span className="input-lbl">City</span>
                          <Input
                            placeholder="Enter city"
                            value={formData.city}
                            onChange={(e) => handleChange("city", e.target.value)}
                          />
                        </div>
                      </Col>
                      <Col xs={24} sm={12}>
                        <div className="input-group">
                          <span className="input-lbl">State / Province</span>
                          <Input
                            placeholder="Enter state"
                            value={formData.state}
                            onChange={(e) => handleChange("state", e.target.value)}
                          />
                        </div>
                      </Col>
                      <Col xs={24} sm={12}>
                        <div className="input-group">
                          <span className="input-lbl">Country</span>
                          <Input
                            placeholder="Enter country"
                            value={formData.country}
                            onChange={(e) => handleChange("country", e.target.value)}
                          />
                        </div>
                      </Col>
                      <Col xs={24} sm={12}>
                        <div className="input-group">
                          <span className="input-lbl">Postal / ZIP Code</span>
                          <Input
                            placeholder="Enter zip code"
                            value={formData.postalCode}
                            onChange={(e) => handleChange("postalCode", e.target.value)}
                          />
                        </div>
                      </Col>
                    </Row>
                  </Card>
                </motion.div>
              </div>
            </Col>

            {/* Right Column: Emergency Contacts and Insurance details */}
            <Col xs={24} lg={8}>
              <div className="edit-profile-stack">
                
                {/* Emergency Contact */}
                <motion.div variants={cardVariants}>
                  <Card className="edit-form-card" title="Emergency Contact Link" bordered={false}>
                    <div className="card-lbl-intro">
                      <HeartOutlined style={{ marginRight: 8, color: "#ef4444" }} />
                      <span>Primary Emergency Connection</span>
                    </div>
                    <Divider style={{ margin: "16px 0" }} />
                    <div className="form-fields-stack">
                      <div className="input-group">
                        <span className="input-lbl">Emergency Contact Name</span>
                        <Input
                          placeholder="Enter contact name"
                          value={formData.emergencyName}
                          onChange={(e) => handleChange("emergencyName", e.target.value)}
                        />
                      </div>
                      <div className="input-group">
                        <span className="input-lbl">Relationship</span>
                        <Input
                          placeholder="e.g. Spouse, Sibling"
                          value={formData.emergencyRelationship}
                          onChange={(e) => handleChange("emergencyRelationship", e.target.value)}
                        />
                      </div>
                      <div className="input-group">
                        <span className="input-lbl">Emergency Contact Number</span>
                        <Input
                          placeholder="Enter phone number"
                          value={formData.emergencyPhone}
                          onChange={(e) => handleChange("emergencyPhone", e.target.value)}
                        />
                      </div>
                    </div>
                  </Card>
                </motion.div>

                {/* Insurance Policy */}
                <motion.div variants={cardVariants}>
                  <Card className="edit-form-card" title="Insurance Information" bordered={false}>
                    <div className="card-lbl-intro">
                      <SafetyCertificateOutlined style={{ marginRight: 8, color: "#10b981" }} />
                      <span>Corporate Insurance Policy</span>
                    </div>
                    <Divider style={{ margin: "16px 0" }} />
                    <div className="form-fields-stack">
                      <div className="input-group">
                        <span className="input-lbl">Insurance Provider</span>
                        <Input
                          placeholder="Enter insurance provider"
                          value={formData.insuranceProvider}
                          onChange={(e) => handleChange("insuranceProvider", e.target.value)}
                        />
                      </div>
                      <div className="input-group">
                        <span className="input-lbl">Policy Number</span>
                        <Input
                          placeholder="Enter policy number"
                          value={formData.insurancePolicy}
                          onChange={(e) => handleChange("insurancePolicy", e.target.value)}
                        />
                      </div>
                    </div>
                  </Card>
                </motion.div>
              </div>
            </Col>
          </Row>
        </form>
      </motion.div>
    </DashboardLayout>
  );
};

export default EditProfile;
