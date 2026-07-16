import React, { useState, useMemo } from "react";
import { Input, Select, Slider, Rate, Pagination } from "antd";
import {
  SearchOutlined,
  FilterOutlined,
  StarFilled,
  CheckCircleFilled,
  UserOutlined,
  TeamOutlined,
  SortAscendingOutlined,
  CalendarOutlined,
  ArrowRightOutlined,
  GlobalOutlined,
  EyeOutlined,
} from "@ant-design/icons";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import doctorsData from "../../../data/doctorsData";
import doctorSpecializationsData from "../../../data/doctorSpecializationsData";
import useSearch from "../../../hooks/useSearch";
import useFilter from "../../../hooks/useFilter";
import useSort from "../../../hooks/useSort";
import usePagination from "../../../hooks/usePagination";
import ErrorState from "../../../components/ErrorState";
import "./Doctors.css";

const { Option } = Select;

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: (i = 0) => ({
    opacity: 1, y: 0,
    transition: { duration: 0.5, delay: i * 0.07, ease: "easeOut" },
  }),
};

const SORT_OPTIONS = [
  { value: "rating", label: "Highest Rated" },
  { value: "experience", label: "Most Experienced" },
  { value: "fee_asc", label: "Lowest Fee" },
  { value: "newest", label: "Newest" },
];

const Doctors = () => {
  const navigate = useNavigate();
  const [hasError, setHasError] = useState(false);
  const [search, setSearch] = useState("");
  const [dept, setDept] = useState("All Specializations");
  const [gender, setGender] = useState("All");
  const [availability, setAvailability] = useState("All");
  const [sort, setSort] = useState("rating");
  const [maxFee, setMaxFee] = useState(250);

  const searchedDoctors = useSearch(doctorsData, search, ["name", "specialization", "department"]);

  const filters = useMemo(() => ({
    specialization: dept === "All Specializations" ? undefined : dept,
    gender: gender === "All" ? undefined : gender,
    availableToday: availability === "Today" ? true : undefined,
  }), [dept, gender, availability]);

  const filteredDoctors = useFilter(searchedDoctors, filters);

  const feeFilteredDoctors = useMemo(
    () => filteredDoctors.filter(d => d.fee <= maxFee),
    [filteredDoctors, maxFee]
  );

  const sortConfig = useMemo(() => {
    switch (sort) {
      case "rating": return { key: "rating", direction: "desc" };
      case "experience": return { key: "experience", direction: "desc" };
      case "fee_asc": return { key: "fee", direction: "asc" };
      default: return null;
    }
  }, [sort]);

  const sortedDoctors = useSort(feeFilteredDoctors, sortConfig);

  const {
    paginatedData,
    currentPage,
    totalPages,
    setPage,
    pageSize,
    setPageSize,
  } = usePagination(sortedDoctors, 8);

  return (
    <>
      <div className="doctors-page">

        {/* ── Hero ──────────────────────────────────────────── */}
        <motion.div
          className="doctors-hero"
          initial={{ opacity: 0, y: -16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="doctors-hero-text">
            <div className="doctors-hero-badge">Our Doctors</div>
            <h1 className="doctors-hero-title">Find the Right Specialist at <span className="teal">PRANACORE</span></h1>
            <p className="doctors-hero-sub">Browse our team of verified, experienced healthcare professionals.</p>
          </div>
          <div className="doctors-hero-search">
            <Input
              size="large"
              placeholder="Search by name, specialization, hospital..."
              prefix={<SearchOutlined className="search-prefix-icon" />}
              className="doctors-search-input"
              value={search}
              onChange={e => setSearch(e.target.value)}
              allowClear
            />
          </div>
          <button
            onClick={() => setHasError(true)}
            className="btn-simulate-error"
            style={{
              height: "52px",
              padding: "0 20px",
              borderRadius: "14px",
              border: "1px solid rgba(255, 255, 255, 0.2)",
              background: "rgba(255, 255, 255, 0.15)",
              color: "#ffffff",
              fontWeight: "600",
              cursor: "pointer",
              whiteSpace: "nowrap",
              transition: "all 0.2s"
            }}
          >
            Simulate Error
          </button>
        </motion.div>

        {/* ── Body: Filters + Grid ───────────────────────────── */}
        <div className="doctors-body">

          {/* Filter Panel */}
          <motion.aside
            className="doctors-filter-panel"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <div className="filter-panel-header">
              <FilterOutlined className="filter-panel-icon" />
              <span>Filters</span>
            </div>

            <div className="filter-section">
              <div className="filter-section-label">Specialization</div>
              <Select className="filter-select" value={dept} onChange={setDept}>
                {doctorSpecializationsData.map(s => <Option key={s} value={s}>{s}</Option>)}
              </Select>
            </div>

            <div className="filter-section">
              <div className="filter-section-label">Gender</div>
              <div className="filter-chips">
                {["All", "Male", "Female"].map(g => (
                  <button key={g} className={`filter-chip ${gender === g ? "active" : ""}`} onClick={() => setGender(g)}>{g}</button>
                ))}
              </div>
            </div>

            <div className="filter-section">
              <div className="filter-section-label">Availability</div>
              <div className="filter-chips">
                {["All", "Today"].map(a => (
                  <button key={a} className={`filter-chip ${availability === a ? "active" : ""}`} onClick={() => setAvailability(a)}>{a === "All" ? "Any Time" : "Available Today"}</button>
                ))}
              </div>
            </div>

            <div className="filter-section">
              <div className="filter-section-label">Max Consultation Fee: <strong>${maxFee}</strong></div>
              <Slider
                min={50} max={250} step={10}
                value={maxFee}
                onChange={setMaxFee}
                className="fee-slider"
                tooltip={{ formatter: v => `$${v}` }}
              />
              <div className="fee-range-labels"><span>$50</span><span>$250</span></div>
            </div>

            <button className="btn-clear-filters" onClick={() => { setSearch(""); setDept("All Specializations"); setGender("All"); setAvailability("All"); setMaxFee(250); }}>
              Clear All Filters
            </button>
          </motion.aside>

          {/* Results Column */}
          <div className="doctors-results-col">
            {hasError ? (
              <ErrorState
                title="Unable to Load Doctors"
                description="Something went wrong while loading doctor information."
                buttonText="Try Again"
                onRetry={() => setHasError(false)}
              />
            ) : (
              <>
                {/* Sort + Count Row */}
                <motion.div
                  className="results-topbar"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.4, delay: 0.15 }}
                >
                  <span className="results-count">
                    <TeamOutlined /> {sortedDoctors.length} doctor{sortedDoctors.length !== 1 ? "s" : ""} found
                  </span>
                  <div className="sort-row">
                    <SortAscendingOutlined />
                    <Select className="sort-select" value={sort} onChange={setSort}>
                      {SORT_OPTIONS.map(o => <Option key={o.value} value={o.value}>{o.label}</Option>)}
                    </Select>
                  </div>
                </motion.div>

                {/* Doctor Cards Grid */}
                {sortedDoctors.length === 0 ? (
                  <div className="no-results">
                    <UserOutlined className="no-results-icon" />
                    <p>No doctors match your filters. Try adjusting your search.</p>
                  </div>
                ) : (
                  <div className="doctors-grid">
                    {paginatedData.map((doctor, i) => (
                      <motion.div
                        key={doctor.id}
                        className="doctor-card"
                        custom={i}
                        variants={fadeUp}
                        initial="hidden"
                        animate="visible"
                        whileHover={{ y: -6 }}
                        transition={{ type: "spring", stiffness: 180 }}
                      >
                        {/* Card Top */}
                        <div className="doctor-card-top">
                          <div className="doctor-avatar-wrap">
                            <div className="doctor-avatar-circle">
                              <UserOutlined className="doctor-avatar-icon" />
                            </div>
                            {doctor.verified && (
                              <div className="verified-badge" title="Verified Doctor">
                                <CheckCircleFilled />
                              </div>
                            )}
                          </div>
                          {doctor.availableToday && (
                            <span className="available-today-badge">Available Today</span>
                          )}
                        </div>

                        {/* Card Info */}
                        <div className="doctor-card-info">
                          <h3 className="doctor-card-name">{doctor.name}</h3>
                          <div className="doctor-card-spec">{doctor.specialization}</div>
                          <div className="doctor-card-hospital">{doctor.hospital}</div>

                          <div className="doctor-card-tags">
                            <span className="meta-tag">
                              <CalendarOutlined /> {doctor.experience} yrs exp
                            </span>
                            <span className="meta-tag">
                              <TeamOutlined /> {doctor.patients.toLocaleString()} patients
                            </span>
                            <span className="meta-tag">
                              <GlobalOutlined /> {doctor.languages.join(", ")}
                            </span>
                          </div>

                          <div className="doctor-card-edu">{doctor.education}</div>
                        </div>

                        {/* Card Footer */}
                        <div className="doctor-card-footer">
                          <div className="doctor-rating-fee">
                            <div className="rating-row">
                              <StarFilled className="star-icon" />
                              <strong>{doctor.rating}</strong>
                              <span className="review-count">({doctor.reviewCount})</span>
                            </div>
                            <div className="doctor-fee">${doctor.fee}<span className="fee-unit">/visit</span></div>
                          </div>
                          <div className="doctor-card-actions">
                            <button className="btn-card-view" onClick={() => navigate(`/dashboard/doctors/${doctor.id}`)}>
                              <EyeOutlined /> Profile
                            </button>
                            <button className="btn-card-book" onClick={() => navigate("/dashboard/appointments/book")}>
                              Book <ArrowRightOutlined />
                            </button>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                )}

                {/* Pagination */}
                {sortedDoctors.length > 0 && (
                  <div style={{ display: "flex", justifyContent: "center", marginTop: "32px" }}>
                    <Pagination
                      current={currentPage}
                      total={sortedDoctors.length}
                      pageSize={pageSize}
                      showSizeChanger
                      pageSizeOptions={[8, 12, 16, 24]}
                      onChange={(page) => setPage(page)}
                      onShowSizeChange={(_, size) => setPageSize(size)}
                    />
                  </div>
                )}
              </>
            )}
          </div>
        </div>

      </div>
    </>
  );
};

export default Doctors;
