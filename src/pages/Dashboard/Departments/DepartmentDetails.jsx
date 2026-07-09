import React, { useMemo, useState } from "react";
import { Card, Tag, Divider, Row, Col, Rate, Button, Avatar, List, Collapse, Form, Input, DatePicker, Select, message } from "antd";
import {
  ArrowLeftOutlined,
  CalendarOutlined,
  PhoneOutlined,
  FilePdfOutlined,
  ClockCircleOutlined,
  InfoCircleOutlined,
  CheckCircleOutlined,
  UserOutlined,
  RightOutlined,
  ToolOutlined,
  ContactsOutlined,
  WarningOutlined,
  BookOutlined,
  DoubleRightOutlined,
} from "@ant-design/icons";
import { motion } from "framer-motion";
import DashboardLayout from "../../../layouts/DashboardLayout/DashboardLayout";
import { getDeptIcon } from "../../../data/departmentsData";
import departmentServicesData from "../../../data/departmentServicesData";
import departmentDoctorsData from "../../../data/departmentDoctorsData";
import "./DepartmentDetails.css";

const { Panel } = Collapse;
const { Option } = Select;

const pageVariants = {
  hidden: { opacity: 0, y: 15 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: "easeOut" } }
};

const DepartmentDetails = ({
  departmentId,
  allDepartments = [],
  allDoctors = [],
  onBack,
  onSelectDept,
}) => {
  const [bookingForm] = Form.useForm();
  const [bookingLoading, setBookingLoading] = useState(false);

  // Current department details
  const dept = useMemo(() => {
    return allDepartments.find(d => d.id === departmentId) || allDepartments[0];
  }, [allDepartments, departmentId]);

  // Dynamic services & HOD information
  const meta = useMemo(() => {
    return departmentServicesData[dept.name] || {
      hodName: "Dr. Sarah Mitchell",
      hodCredential: "MD - Director",
      hodBio: "Lead physician.",
      equipment: ["Diagnostics equipment"],
      services: ["Clinical consultation"],
      hours: "Monday - Friday: 8 AM - 6 PM",
      contactHotline: "+1 (555) 392-1001",
      overview: "Standard clinical care program.",
      testimonials: [],
      faqs: []
    };
  }, [dept]);

  // Care Team doctors lists
  const careTeam = useMemo(() => {
    const matchingDocs = allDoctors.filter(doc => doc.department === dept.name);
    const rolesConfig = departmentDoctorsData[dept.name] || [];

    return matchingDocs.map(doc => {
      const config = rolesConfig.find(c => c.doctorId === doc.id || c.name === doc.name);
      return {
        ...doc,
        role: config ? config.role : doc.specialization,
        schedule: config ? config.schedule : "Available by appointment"
      };
    });
  }, [allDoctors, dept]);

  // Related Departments list (3 other departments)
  const relatedDepts = useMemo(() => {
    return allDepartments
      .filter(d => d.id !== dept.id)
      .slice(0, 3);
  }, [allDepartments, dept]);

  const handleDownloadBrochure = () => {
    message.loading("Generating specialty brochure PDF...", 1.5, () => {
      message.success("Department info brochure downloaded successfully!");
    });
  };

  const handleQuickBooking = (values) => {
    setBookingLoading(true);
    setTimeout(() => {
      message.success(`Consultation slot with ${values.doctorName} booked successfully for ${values.date.format("YYYY-MM-DD")}!`);
      bookingForm.resetFields();
      setBookingLoading(false);
    }, 1200);
  };

  const getInitials = (name) => {
    if (!name) return "Dr";
    return name
      .replace("Dr. ", "")
      .split(" ")
      .map(w => w[0])
      .join("")
      .toUpperCase();
  };

  return (
    <DashboardLayout>
      <motion.div
        className="dd-details-page-wrapper"
        variants={pageVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Back Link */}
        <div className="dd-back-navigation">
          <Button 
            type="text" 
            icon={<ArrowLeftOutlined />} 
            onClick={onBack}
            className="btn-back-link"
          >
            Back to Departments
          </Button>
        </div>

        {/* Hero Section */}
        <Card className="dd-large-header-card" bordered={false}>
          <div className="dept-header-details">
            <div className="dept-icon-ring-large">
              {getDeptIcon(dept.iconKey)}
            </div>
            <div className="header-meta-details">
              <div className="header-badge-list">
                <span className="badge-tag status-active">Available Today</span>
                <span className="badge-tag stats-vol">{dept.name === "Radiology" ? "Emergency 24/7" : "Emergency Call Active"}</span>
              </div>
              <h1 className="dept-details-title">{dept.name} Department</h1>
              <div className="hero-hod-line">
                <span className="hod-lbl">Head of Dept:</span>
                <span className="hod-val">{meta.hodName}</span>
              </div>
              <div className="rating-row">
                <Rate disabled defaultValue={dept.rating} allowHalf className="rating-stars" />
                <span className="rating-value">{dept.rating} / 5 Rating</span>
              </div>
            </div>
          </div>
        </Card>

        {/* Two-Column Details Grid */}
        <div className="dd-main-grid-layout" style={{ marginTop: 24 }}>
          
          {/* LEFT COLUMN: Overview, Services, Doctors, Equipment, Operational Hours, Testimonials, FAQ */}
          <div className="dd-primary-col">
            <div className="dd-section-stack">
              
              {/* Overview */}
              <Card className="dd-body-card" title="Clinical Overview" bordered={false}>
                <p className="primary-body-text">{meta.overview}</p>
                <p className="primary-body-text" style={{ marginTop: 12 }}>Equipped with state-of-the-art diagnostic machinery and supportive spaces, our specialists cooperate under unified medical protocols to deliver patient-centered solutions. Daily monitoring ensures quality care control.</p>
              </Card>

              {/* Services Offered */}
              <Card className="dd-body-card" title="Clinical Services Offered" bordered={false}>
                <Row gutter={[16, 16]}>
                  {meta.services.map((service, index) => (
                    <Col xs={24} sm={12} key={index}>
                      <div className="bullet-service-item">
                        <CheckCircleOutlined style={{ color: "#10b981", marginRight: 10 }} />
                        <span>{service}</span>
                      </div>
                    </Col>
                  ))}
                </Row>
              </Card>

              {/* Available Doctors (Responsive Cards Grid) */}
              <Card className="dd-body-card" title="Specialist Care Team" bordered={false}>
                <Row gutter={[16, 16]}>
                  {careTeam.map(doc => (
                    <Col xs={24} sm={12} key={doc.id}>
                      <div className="doctor-item-card">
                        <Avatar size={48} className="doc-avatar">
                          {getInitials(doc.name)}
                        </Avatar>
                        <div className="doc-details-meta">
                          <h4>{doc.name}</h4>
                          <span className="doc-role-badge">{doc.role}</span>
                          <p className="doc-sched"><ClockCircleOutlined /> {doc.schedule}</p>
                          <div className="doc-rat">
                            <Rate disabled defaultValue={1} count={1} className="rating-star-small" />
                            <span>{doc.rating} / 5 Rating</span>
                          </div>
                        </div>
                      </div>
                    </Col>
                  ))}
                </Row>
              </Card>

              {/* Equipment & Facilities */}
              <Card className="dd-body-card" title="Equipment & Facilities" bordered={false}>
                <div className="equipment-grid">
                  {meta.equipment.map((eq, index) => (
                    <div key={index} className="equipment-card-unit">
                      <ToolOutlined className="eq-icon" />
                      <span className="eq-name">{eq}</span>
                    </div>
                  ))}
                </div>
              </Card>

              {/* Operating Hours */}
              <Card className="dd-body-card" title="Operating Hours" bordered={false}>
                <div className="operating-hours-table">
                  <div className="hours-row">
                    <span className="day-lbl">Monday - Friday</span>
                    <span className="hours-lbl">{meta.hours}</span>
                  </div>
                  <div className="hours-row">
                    <span className="day-lbl">Saturday</span>
                    <span className="hours-lbl">09:00 AM - 02:00 PM</span>
                  </div>
                  <div className="hours-row urgent">
                    <span className="day-lbl">Sunday / Emergency</span>
                    <span className="hours-lbl">24 Hours (On-Call Triage)</span>
                  </div>
                </div>
              </Card>

              {/* Patient Testimonials */}
              {meta.testimonials && meta.testimonials.length > 0 && (
                <Card className="dd-body-card" title="Patient Testimonials" bordered={false}>
                  <div className="testimonials-stack">
                    {meta.testimonials.map(t => (
                      <div key={t.id} className="testimonial-card">
                        <div className="t-meta">
                          <span className="t-author">{t.name}</span>
                          <Rate disabled defaultValue={t.rating} size="small" className="t-rate" />
                        </div>
                        <p className="t-comment">"{t.comment}"</p>
                      </div>
                    ))}
                  </div>
                </Card>
              )}

              {/* FAQ Section */}
              {meta.faqs && meta.faqs.length > 0 && (
                <Card className="dd-body-card" title="Frequently Asked Questions" bordered={false}>
                  <Collapse accordion className="custom-faq-collapse">
                    {meta.faqs.map((faq, index) => (
                      <Panel header={faq.q} key={index}>
                        <p>{faq.a}</p>
                      </Panel>
                    ))}
                  </Collapse>
                </Card>
              )}

            </div>
          </div>

          {/* RIGHT COLUMN: Sidebar (Quick Booking, Contact, Emergency, Related) */}
          <div className="dd-sidebar-col">
            
            {/* Quick Booking Card */}
            <Card className="dd-sidebar-card booking-sidebar-card" title="Quick Appointment Booking" bordered={false}>
              <Form
                form={bookingForm}
                layout="vertical"
                onFinish={handleQuickBooking}
                requiredMark={false}
              >
                <Form.Item
                  label="Patient Name"
                  name="patientName"
                  rules={[{ required: true, message: "Please enter patient name" }]}
                >
                  <Input placeholder="Enter patient name" />
                </Form.Item>
                <Form.Item
                  label="Select Specialist"
                  name="doctorName"
                  rules={[{ required: true, message: "Please select a physician" }]}
                >
                  <Select placeholder="Choose doctor">
                    {careTeam.map(d => (
                      <Option key={d.id} value={d.name}>{d.name}</Option>
                    ))}
                  </Select>
                </Form.Item>
                <Form.Item
                  label="Appointment Date"
                  name="date"
                  rules={[{ required: true, message: "Please select a date" }]}
                >
                  <DatePicker className="booking-datepicker" style={{ width: "100%" }} />
                </Form.Item>
                <Form.Item
                  label="Preferred Shift"
                  name="shift"
                  initialValue="Morning"
                >
                  <Select>
                    <Option value="Morning">Morning Shift (09:00 AM - 12:00 PM)</Option>
                    <Option value="Afternoon">Afternoon Shift (01:00 PM - 04:00 PM)</Option>
                    <Option value="Evening">Evening Shift (05:00 PM - 08:00 PM)</Option>
                  </Select>
                </Form.Item>
                <Button 
                  type="primary" 
                  htmlType="submit" 
                  loading={bookingLoading} 
                  icon={<BookOutlined />}
                  className="sidebar-btn-teal"
                >
                  Confirm Booking
                </Button>
              </Form>
            </Card>

            {/* Department Contact Card */}
            <Card className="dd-sidebar-card contact-sidebar-card" title="Department Contacts" bordered={false}>
              <div className="contact-details-stack">
                <div className="contact-row">
                  <PhoneOutlined className="c-icon" />
                  <div className="c-meta">
                    <span className="lbl">Specialty Hotline</span>
                    <span className="val">{meta.contactHotline}</span>
                  </div>
                </div>
                <div className="contact-row email">
                  <ContactsOutlined className="c-icon" />
                  <div className="c-meta">
                    <span className="lbl">Enquiries Email</span>
                    <span className="val">enquire.{dept.name.toLowerCase()}@pranacore.com</span>
                  </div>
                </div>
              </div>
            </Card>

            {/* Emergency Contact */}
            <Card className="dd-sidebar-card emergency-sidebar-card" bordered={false}>
              <div className="emergency-alert-box">
                <WarningOutlined className="em-icon" />
                <div className="em-meta">
                  <h3>Clinical Emergency Hotline</h3>
                  <p>For immediate critical trauma transport, call our direct ER line:</p>
                  <h4 className="em-phone">+1 (555) 911-3829</h4>
                </div>
              </div>
            </Card>

            {/* Related Departments */}
            <Card className="dd-sidebar-card related-sidebar-card" title="Related Specialties" bordered={false}>
              <div className="related-dept-links">
                {relatedDepts.map(rDept => (
                  <div 
                    key={rDept.id} 
                    className="related-dept-row"
                    onClick={() => onSelectDept(rDept.id)}
                  >
                    <span className="r-icon">{getDeptIcon(rDept.iconKey)}</span>
                    <span className="r-name">{rDept.name}</span>
                    <DoubleRightOutlined className="arrow" />
                  </div>
                ))}
              </div>
            </Card>

          </div>

        </div>

      </motion.div>
    </DashboardLayout>
  );
};

export default DepartmentDetails;
