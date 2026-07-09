import React, { useState } from "react";
import { Steps, Avatar, DatePicker, Input, Select } from "antd";
import {
  MedicineBoxOutlined,
  UserOutlined,
  CalendarOutlined,
  ClockCircleOutlined,
  FormOutlined,
  CheckCircleOutlined,
  StarFilled,
  ArrowRightOutlined,
  ArrowLeftOutlined,
  ClockCircleFilled,
} from "@ant-design/icons";
import { motion, AnimatePresence } from "framer-motion";
import DashboardLayout from "../../../layouts/DashboardLayout/DashboardLayout";
import departmentsData from "../../../data/departmentsData";
import doctorsAvailabilityData from "../../../data/doctorsAvailabilityData";
import timeSlotsData from "../../../data/timeSlotsData";
import "./BookAppointment.css";

const { Option } = Select;
const { TextArea } = Input;

const steps = [
  { title: "Department", icon: <MedicineBoxOutlined /> },
  { title: "Doctor",     icon: <UserOutlined /> },
  { title: "Date",       icon: <CalendarOutlined /> },
  { title: "Time Slot",  icon: <ClockCircleOutlined /> },
  { title: "Details",    icon: <FormOutlined /> },
  { title: "Confirm",    icon: <CheckCircleOutlined /> },
];

const slideVariants = {
  enter:  { opacity: 0, x: 40  },
  center: { opacity: 1, x: 0   },
  exit:   { opacity: 0, x: -40 },
};

const BookAppointment = () => {
  const [current, setCurrent]           = useState(0);
  const [selectedDept, setSelectedDept] = useState(null);
  const [selectedDoc,  setSelectedDoc]  = useState(null);
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedSlot, setSelectedSlot] = useState(null);
  const [patientName,  setPatientName]  = useState("John Doe");
  const [reason,       setReason]       = useState("");

  const filteredDoctors = selectedDept
    ? doctorsAvailabilityData.filter((d) => d.department === selectedDept.name)
    : doctorsAvailabilityData;

  const canNext = () => {
    if (current === 0) return !!selectedDept;
    if (current === 1) return !!selectedDoc;
    if (current === 2) return !!selectedDate;
    if (current === 3) return !!selectedSlot;
    if (current === 4) return !!patientName.trim();
    return true;
  };

  const next = () => canNext() && setCurrent((c) => c + 1);
  const prev = () => setCurrent((c) => c - 1);

  // ── Step Renderers ──────────────────────────────────────────
  const StepDepartment = () => (
    <div className="step-content">
      <h3 className="step-heading">Choose a Department</h3>
      <p className="step-sub">Select the medical department you need care from.</p>
      <div className="dept-grid">
        {departmentsData.map((dept) => (
          <motion.div
            key={dept.id}
            className={`dept-card ${selectedDept?.id === dept.id ? "selected" : ""}`}
            onClick={() => setSelectedDept(dept)}
            whileHover={{ y: -4 }}
          >
            <div className="dept-card-icon">{dept.icon}</div>
            <div className="dept-card-name">{dept.name}</div>
            <div className="dept-card-count">{dept.doctorCount} doctors</div>
          </motion.div>
        ))}
      </div>
    </div>
  );

  const StepDoctor = () => (
    <div className="step-content">
      <h3 className="step-heading">Choose Your Doctor</h3>
      <p className="step-sub">Browse and select your preferred specialist.</p>
      <div className="doctors-grid">
        {filteredDoctors.map((doc) => (
          <motion.div
            key={doc.id}
            className={`doctor-card ${selectedDoc?.id === doc.id ? "selected" : ""}`}
            onClick={() => setSelectedDoc(doc)}
            whileHover={{ y: -4 }}
          >
            <div className="doctor-card-top">
              <Avatar size={64} icon={<UserOutlined />} className="doc-avatar" />
              {doc.availableToday && (
                <span className="available-badge">Available Today</span>
              )}
            </div>
            <div className="doc-name">{doc.name}</div>
            <div className="doc-spec">{doc.specialization}</div>
            <div className="doc-meta-row">
              <span className="doc-exp">{doc.experience}</span>
              <span className="doc-rating">
                <StarFilled style={{ color: "#f59e0b", fontSize: 12 }} /> {doc.rating}
              </span>
            </div>
            <div className="doc-fee">{doc.fee} / consultation</div>
          </motion.div>
        ))}
      </div>
    </div>
  );

  const StepDate = () => (
    <div className="step-content step-center">
      <h3 className="step-heading">Select Appointment Date</h3>
      <p className="step-sub">Choose a convenient date for your consultation.</p>
      <div className="date-picker-wrapper">
        <DatePicker
          size="large"
          className="ba-date-picker"
          placeholder="Pick a date"
          onChange={(date) => setSelectedDate(date)}
          value={selectedDate}
        />
        {selectedDoc && (
          <div className="selected-doc-chip">
            <UserOutlined /> {selectedDoc.name} — {selectedDoc.department}
          </div>
        )}
      </div>
    </div>
  );

  const StepTimeSlot = () => (
    <div className="step-content">
      <h3 className="step-heading">Choose a Time Slot</h3>
      <p className="step-sub">Pick an available time that suits you best.</p>

      {Object.entries(timeSlotsData).map(([period, slots]) => (
        <div key={period} className="slot-group">
          <div className="slot-period-label">
            <ClockCircleFilled className="slot-period-icon" />
            {period.charAt(0).toUpperCase() + period.slice(1)}
          </div>
          <div className="slots-row">
            {slots.map((slot) => (
              <button
                key={slot.id}
                className={`time-slot-chip ${!slot.available ? "unavailable" : ""} ${selectedSlot?.id === slot.id ? "selected" : ""}`}
                disabled={!slot.available}
                onClick={() => slot.available && setSelectedSlot(slot)}
              >
                {slot.time}
              </button>
            ))}
          </div>
        </div>
      ))}
    </div>
  );

  const StepPatientDetails = () => (
    <div className="step-content step-center">
      <h3 className="step-heading">Patient Information</h3>
      <p className="step-sub">Provide details for the appointment.</p>
      <div className="patient-form">
        <div className="form-group">
          <label className="form-label">Patient Name</label>
          <Input
            size="large"
            className="ba-input"
            value={patientName}
            onChange={(e) => setPatientName(e.target.value)}
            placeholder="Full name"
            prefix={<UserOutlined />}
          />
        </div>
        <div className="form-group">
          <label className="form-label">Reason for Visit</label>
          <TextArea
            className="ba-textarea"
            rows={4}
            value={reason}
            onChange={(e) => setReason(e.target.value)}
            placeholder="Briefly describe your symptoms or reason for visit..."
          />
        </div>
        <div className="form-group">
          <label className="form-label">Consultation Type</label>
          <Select size="large" className="ba-select" defaultValue="in-person">
            <Option value="in-person">In-Person Visit</Option>
            <Option value="video">Video Consultation</Option>
          </Select>
        </div>
      </div>
    </div>
  );

  const StepReview = () => (
    <div className="step-content step-center">
      <h3 className="step-heading">Review & Confirm</h3>
      <p className="step-sub">Please verify your appointment details before confirming.</p>
      <div className="summary-card">
        <div className="summary-header">
          <Avatar size={56} icon={<UserOutlined />} className="summary-avatar" />
          <div>
            <div className="summary-doctor">{selectedDoc?.name || "—"}</div>
            <div className="summary-spec">{selectedDoc?.specialization || "—"}</div>
          </div>
        </div>
        <div className="summary-divider" />
        <div className="summary-rows">
          {[
            { label: "Department", value: selectedDept?.name || "—" },
            { label: "Hospital",   value: selectedDoc?.hospital || "—" },
            { label: "Date",       value: selectedDate?.format("MMMM D, YYYY") || "—" },
            { label: "Time",       value: selectedSlot?.time || "—" },
            { label: "Patient",    value: patientName || "—" },
            { label: "Fee",        value: selectedDoc?.fee || "—" },
          ].map((row) => (
            <div className="summary-row" key={row.label}>
              <span className="summary-label">{row.label}</span>
              <span className="summary-value">{row.value}</span>
            </div>
          ))}
        </div>
        <div className="summary-total-row">
          <span>Consultation Fee</span>
          <span className="summary-total">{selectedDoc?.fee || "—"}</span>
        </div>
      </div>
    </div>
  );

  const stepComponents = [
    <StepDepartment />,
    <StepDoctor />,
    <StepDate />,
    <StepTimeSlot />,
    <StepPatientDetails />,
    <StepReview />,
  ];

  return (
    <DashboardLayout>
      <div className="book-appointment-page">

        {/* Page Header */}
        <motion.div
          className="page-header"
          initial={{ opacity: 0, y: -16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div>
            <h1 className="page-title">Book Appointment</h1>
            <p className="page-subtitle">Follow the steps to schedule your healthcare appointment.</p>
          </div>
        </motion.div>

        {/* Stepper Card */}
        <motion.div
          className="ba-stepper-card"
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <Steps
            current={current}
            items={steps}
            className="ba-steps"
            responsive={false}
          />
        </motion.div>

        {/* Step Content */}
        <motion.div
          className="ba-content-card"
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={current}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.3 }}
            >
              {stepComponents[current]}
            </motion.div>
          </AnimatePresence>

          {/* Navigation Buttons */}
          <div className="ba-nav-buttons">
            {current > 0 && (
              <button className="btn-ba-prev" onClick={prev}>
                <ArrowLeftOutlined /> Previous
              </button>
            )}
            {current < steps.length - 1 ? (
              <button
                className="btn-ba-next"
                onClick={next}
                disabled={!canNext()}
              >
                Next Step <ArrowRightOutlined />
              </button>
            ) : (
              <button className="btn-ba-confirm">
                <CheckCircleOutlined /> Confirm Appointment
              </button>
            )}
          </div>
        </motion.div>

      </div>
    </DashboardLayout>
  );
};

export default BookAppointment;
