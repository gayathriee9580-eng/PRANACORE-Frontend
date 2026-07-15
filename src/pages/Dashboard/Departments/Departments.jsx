import React, { useState, useMemo } from "react";
import { Input, Select, Button, Tag, Rate, Empty, Row, Col, Card } from "antd";
import {
  SearchOutlined,
  FilterOutlined,
  RightOutlined,
  AppstoreOutlined,
  TeamOutlined,
  HeartOutlined,
  ScheduleOutlined,
  CalendarOutlined,
  CheckCircleOutlined,
  PlusCircleOutlined,
  RiseOutlined,
} from "@ant-design/icons";
import { motion, AnimatePresence } from "framer-motion";
import departmentsData, { getDeptIcon } from "../../../data/departmentsData";
import departmentServicesData from "../../../data/departmentServicesData";
import doctorsData from "../../../data/doctorsData";
import useSearch from "../../../hooks/useSearch";
import DepartmentDetails from "./DepartmentDetails";
import "./Departments.css";

const { Option } = Select;

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.05 } }
};

const cardVariants = {
  hidden: { opacity: 0, y: 15 },
  visible: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 100 } }
};

const Departments = () => {
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedAvailability, setSelectedAvailability] = useState("All");
  const [sortBy, setSortBy] = useState("default");
  const [selectedDeptId, setSelectedDeptId] = useState(null);

  // Augment departmentsData with HOD names from departmentServicesData
  const augmentedDepartments = useMemo(() => {
    return departmentsData.map(dept => ({
      ...dept,
      hodName: departmentServicesData[dept.name]?.hodName || "",
      category: dept.category || ""
    }));
  }, []);

  const searchedDepartments = useSearch(augmentedDepartments, search, ["name", "hodName", "category", "description"]);

  // Stats Card Calculations
  const stats = useMemo(() => {
    const totalDepts = departmentsData.length;
    const totalDocs = departmentsData.reduce((acc, curr) => acc + curr.doctorCount, 0);
    const totalServices = departmentsData.reduce((acc, curr) => acc + curr.servicesCount, 0);
    return {
      totalDepts,
      totalDocs,
      totalServices,
      activePatients: "8,420"
    };
  }, []);

  // Filter & Sort Logic
  const processedDepartments = useMemo(() => {
    let result = searchedDepartments.filter(dept => {
      const matchesCategory =
        selectedCategory === "All" ||
        dept.name === selectedCategory;

      const matchesAvailability =
        selectedAvailability === "All" ||
        (selectedAvailability === "Today" && dept.availability === "Available Today") ||
        (selectedAvailability === "Emergency" && dept.name === "Radiology"); // Radiology is marked as 24/7

      return matchesCategory && matchesAvailability;
    });

    if (sortBy === "rating") {
      result.sort((a, b) => b.rating - a.rating);
    } else if (sortBy === "doctors") {
      result.sort((a, b) => b.doctorCount - a.doctorCount);
    } else if (sortBy === "services") {
      result.sort((a, b) => b.servicesCount - a.servicesCount);
    } else if (sortBy === "alpha") {
      result.sort((a, b) => a.name.localeCompare(b.name));
    }

    return result;
  }, [searchedDepartments, selectedCategory, selectedAvailability, sortBy]);

  if (selectedDeptId !== null) {
    return (
      <DepartmentDetails
        departmentId={selectedDeptId}
        allDepartments={departmentsData}
        allDoctors={doctorsData}
        onBack={() => setSelectedDeptId(null)}
        onSelectDept={setSelectedDeptId}
      />
    );
  }

  return (
    <>
      <motion.div
        className="departments-dash-container"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Premium Hero Banner */}
        <motion.div className="departments-hero-banner" variants={cardVariants}>
          <div className="hero-left">
            <div className="hero-badge-tag">Clinical Specializations</div>
            <h1 className="hero-title">Medical Departments</h1>
            <p className="hero-desc">Discover our state-of-the-art diagnostics, specialized medical blocks, and care departments staffed by world-class specialists.</p>
          </div>
          <div className="hero-right-icon">
            <AppstoreOutlined />
          </div>
        </motion.div>

        {/* KPI stats section */}
        <motion.div className="dept-stats-grid" variants={cardVariants}>
          <Row gutter={[16, 16]}>
            <Col xs={12} sm={12} md={6}>
              <Card className="dept-stat-card" bordered={false}>
                <div className="stat-card-flex">
                  <div className="stat-meta">
                    <span className="stat-lbl">Total Departments</span>
                    <h3 className="stat-value">{stats.totalDepts}</h3>
                  </div>
                  <div className="stat-icon depts"><AppstoreOutlined /></div>
                </div>
              </Card>
            </Col>
            <Col xs={12} sm={12} md={6}>
              <Card className="dept-stat-card" bordered={false}>
                <div className="stat-card-flex">
                  <div className="stat-meta">
                    <span className="stat-lbl">Specialist Doctors</span>
                    <h3 className="stat-value">{stats.totalDocs}</h3>
                  </div>
                  <div className="stat-icon docs"><TeamOutlined /></div>
                </div>
              </Card>
            </Col>
            <Col xs={12} sm={12} md={6}>
              <Card className="dept-stat-card" bordered={false}>
                <div className="stat-card-flex">
                  <div className="stat-meta">
                    <span className="stat-lbl">Available Services</span>
                    <h3 className="stat-value">{stats.totalServices}</h3>
                  </div>
                  <div className="stat-icon services"><PlusCircleOutlined /></div>
                </div>
              </Card>
            </Col>
            <Col xs={12} sm={12} md={6}>
              <Card className="dept-stat-card" bordered={false}>
                <div className="stat-card-flex">
                  <div className="stat-meta">
                    <span className="stat-lbl">Active Patients</span>
                    <h3 className="stat-value">{stats.activePatients}</h3>
                  </div>
                  <div className="stat-icon patients"><RiseOutlined /></div>
                </div>
              </Card>
            </Col>
          </Row>
        </motion.div>

        {/* Toolbar filters controls */}
        <motion.div className="departments-filter-toolbar" variants={cardVariants}>
          <div className="filter-left-lbl">
            <FilterOutlined style={{ color: "#0f8a8f" }} />
            <span>Search Specialties</span>
          </div>
          <div className="filter-controls-row">
            <Input
              placeholder="Search specialty name or keyword..."
              prefix={<SearchOutlined />}
              className="dept-search"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              allowClear
            />
            <Select
              value={selectedCategory}
              onChange={setSelectedCategory}
              className="dept-select category"
              placeholder="Category"
            >
              <Option value="All">All Categories</Option>
              {departmentsData.map(d => (
                <Option key={d.id} value={d.name}>{d.name}</Option>
              ))}
            </Select>
            <Select
              value={selectedAvailability}
              onChange={setSelectedAvailability}
              className="dept-select availability"
              placeholder="Availability"
            >
              <Option value="All">All Availability</Option>
              <Option value="Today">Available Today</Option>
              <Option value="Emergency">24/7 Emergency</Option>
            </Select>
            <Select
              value={sortBy}
              onChange={setSortBy}
              className="dept-select sort"
            >
              <Option value="default">Default Order</Option>
              <Option value="alpha">Alphabetical</Option>
              <Option value="doctors">Specialist Staff Count</Option>
              <Option value="services">Services Count</Option>
              <Option value="rating">Highest Rated</Option>
            </Select>
          </div>
        </motion.div>

        {/* Department Grid Feed */}
        <motion.div className="departments-grid-wrapper" variants={cardVariants}>
          <div className="list-meta-summary">
            <span>Showing {processedDepartments.length} medical department{processedDepartments.length !== 1 ? "s" : ""}</span>
          </div>

          <div className="departments-grid">
            <AnimatePresence>
              {processedDepartments.length > 0 ? (
                processedDepartments.map(dept => (
                  <motion.div
                    key={dept.id}
                    className={`dept-grid-card ${dept.colorClass || "dept-general"}`}
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.2 }}
                    whileHover={{ y: -4, boxShadow: "0 12px 30px rgba(15,23,42,0.06)" }}
                  >
                    <div className="dept-card-header">
                      <div className="dept-icon-ring">
                        {getDeptIcon(dept.iconKey)}
                      </div>
                      <Tag color="success" className="availability-tag">
                        {dept.name === "Radiology" ? "Emergency 24/7" : dept.availability}
                      </Tag>
                    </div>

                    <div className="dept-card-body">
                      <h3 className="dept-title-text">{dept.name}</h3>
                      <p className="dept-desc-text">{dept.description}</p>
                    </div>

                    <div className="dept-card-info-metrics">
                      <div className="metric-pill">
                        <TeamOutlined style={{ marginRight: 6, color: "#0f8a8f" }} />
                        <span className="count">{dept.doctorCount} Specialists</span>
                      </div>
                      <div className="metric-pill">
                        <ScheduleOutlined style={{ marginRight: 6, color: "#0f8a8f" }} />
                        <span className="count">{dept.servicesCount} Services</span>
                      </div>
                      <div className="metric-pill rating">
                        <Rate disabled defaultValue={1} count={1} className="rating-star" />
                        <span className="rating-value">{dept.rating}</span>
                      </div>
                    </div>

                    <div className="dept-card-footer">
                      <Button
                        type="default"
                        className="btn-book-appoint"
                        onClick={() => setSelectedDeptId(dept.id)}
                      >
                        Book
                      </Button>
                      <Button
                        type="primary"
                        className="btn-explore-specialty"
                        onClick={() => setSelectedDeptId(dept.id)}
                      >
                        View Details <RightOutlined />
                      </Button>
                    </div>
                  </motion.div>
                ))
              ) : (
                <div className="dept-empty-wrapper">
                  <Empty
                    image={Empty.PRESENTED_IMAGE_SIMPLE}
                    description="No medical departments matched your active filters."
                  />
                </div>
              )}
            </AnimatePresence>
          </div>
        </motion.div>
      </motion.div>
    </>
  );
};

export default Departments;
