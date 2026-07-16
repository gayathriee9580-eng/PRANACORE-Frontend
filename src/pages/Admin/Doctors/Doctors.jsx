import React, { useState, useMemo, useEffect } from 'react';
import { Input, Select, Table, Button, Tag, Space, Pagination, Avatar, Tooltip } from 'antd';
import {
  SearchOutlined,
  SortAscendingOutlined,
  UserAddOutlined,
  ExportOutlined,
  EyeOutlined,
  EditOutlined,
  DeleteOutlined,
  CalendarOutlined,
  TeamOutlined,
  UserOutlined,
  CheckCircleOutlined,
  ClockCircleOutlined,
  ClearOutlined,
  StarFilled,
} from '@ant-design/icons';
import { motion } from 'framer-motion';

import DashboardLayout from '../../../layouts/DashboardLayout/DashboardLayout';
import { StatCardChart } from '../../../components/Charts';
import LoadingOverlay from '../../../components/LoadingOverlay';
import EmptyState from '../../../components/EmptyState';
import ErrorState from '../../../components/ErrorState';
import ConfirmationModal from '../../../components/ConfirmationModal';
import { DashboardSkeleton } from '../../../components/Skeletons';
import { useToast } from '../../../context/ToastContext';

import useSearch from '../../../hooks/useSearch';
import useFilter from '../../../hooks/useFilter';
import useSort from '../../../hooks/useSort';
import usePagination from '../../../hooks/usePagination';
import '../../../pages/Dashboard/DashboardHome/DashboardHome.css';

const { Option } = Select;

// --- Mock Data ---
const mockDoctors = [
  { id: 'DR-2001', name: 'Dr. Sarah Smith', department: 'Cardiology', specialization: 'Interventional Cardiology', experience: 12, email: 'sarah.s@hospital.com', phone: '+1234567890', rating: 4.8, patientsToday: 15, availability: 'Available', status: 'Active' },
  { id: 'DR-2002', name: 'Dr. Mark Lee', department: 'Neurology', specialization: 'Neurosurgery', experience: 8, email: 'mark.l@hospital.com', phone: '+1234567891', rating: 4.6, patientsToday: 10, availability: 'On Leave', status: 'Inactive' },
  { id: 'DR-2003', name: 'Dr. Alice Chen', department: 'Pediatrics', specialization: 'Neonatology', experience: 15, email: 'alice.c@hospital.com', phone: '+1234567892', rating: 4.9, patientsToday: 18, availability: 'Available', status: 'Active' },
  { id: 'DR-2004', name: 'Dr. Bob White', department: 'Orthopedics', specialization: 'Sports Medicine', experience: 10, email: 'bob.w@hospital.com', phone: '+1234567893', rating: 4.5, patientsToday: 12, availability: 'In Surgery', status: 'Active' },
  { id: 'DR-2005', name: 'Dr. Emily Davis', department: 'Cardiology', specialization: 'Clinical Cardiology', experience: 6, email: 'emily.d@hospital.com', phone: '+1234567894', rating: 4.7, patientsToday: 20, availability: 'Available', status: 'Active' },
  { id: 'DR-2006', name: 'Dr. Michael Brown', department: 'Oncology', specialization: 'Radiation Oncology', experience: 20, email: 'michael.b@hospital.com', phone: '+1234567895', rating: 4.9, patientsToday: 8, availability: 'On Leave', status: 'Inactive' },
  { id: 'DR-2007', name: 'Dr. Sophie Miller', department: 'Dermatology', specialization: 'Cosmetic Dermatology', experience: 5, email: 'sophie.m@hospital.com', phone: '+1234567896', rating: 4.4, patientsToday: 22, availability: 'Available', status: 'Active' },
  { id: 'DR-2008', name: 'Dr. David Wilson', department: 'Neurology', specialization: 'Clinical Neurology', experience: 18, email: 'david.w@hospital.com', phone: '+1234567897', rating: 4.8, patientsToday: 9, availability: 'Available', status: 'Active' },
  { id: 'DR-2009', name: 'Dr. Olivia Moore', department: 'Pediatrics', specialization: 'Pediatric Cardiology', experience: 7, email: 'olivia.m@hospital.com', phone: '+1234567898', rating: 4.6, patientsToday: 16, availability: 'In Surgery', status: 'Active' },
  { id: 'DR-2010', name: 'Dr. James Taylor', department: 'Orthopedics', specialization: 'Joint Replacement', experience: 25, email: 'james.t@hospital.com', phone: '+1234567899', rating: 5.0, patientsToday: 11, availability: 'Available', status: 'Active' },
  { id: 'DR-2011', name: 'Dr. Emma Anderson', department: 'Gynecology', specialization: 'Obstetrics', experience: 14, email: 'emma.a@hospital.com', phone: '+9876543210', rating: 4.9, patientsToday: 25, availability: 'Available', status: 'Active' },
  { id: 'DR-2012', name: 'Dr. Liam Thomas', department: 'Psychiatry', specialization: 'Child Psychiatry', experience: 11, email: 'liam.t@hospital.com', phone: '+9876543211', rating: 4.5, patientsToday: 14, availability: 'On Leave', status: 'Active' },
  { id: 'DR-2013', name: 'Dr. Isabella Jackson', department: 'Oncology', specialization: 'Medical Oncology', experience: 9, email: 'isabella.j@hospital.com', phone: '+9876543212', rating: 4.7, patientsToday: 13, availability: 'Available', status: 'Active' },
  { id: 'DR-2014', name: 'Dr. William White', department: 'General Surgery', specialization: 'Trauma Surgery', experience: 22, email: 'william.w@hospital.com', phone: '+9876543213', rating: 4.8, patientsToday: 6, availability: 'In Surgery', status: 'Active' },
  { id: 'DR-2015', name: 'Dr. Sophia Harris', department: 'Dermatology', specialization: 'Surgical Dermatology', experience: 13, email: 'sophia.h@hospital.com', phone: '+9876543214', rating: 4.6, patientsToday: 19, availability: 'Available', status: 'Active' },
  { id: 'DR-2016', name: 'Dr. Benjamin Martin', department: 'Endocrinology', specialization: 'Diabetes Management', experience: 16, email: 'benjamin.m@hospital.com', phone: '+9876543215', rating: 4.7, patientsToday: 17, availability: 'Available', status: 'Active' },
  { id: 'DR-2017', name: 'Dr. Mia Thompson', department: 'General Surgery', specialization: 'Laparoscopic Surgery', experience: 8, email: 'mia.t@hospital.com', phone: '+9876543216', rating: 4.5, patientsToday: 8, availability: 'On Leave', status: 'Inactive' },
  { id: 'DR-2018', name: 'Dr. Lucas Garcia', department: 'Cardiology', specialization: 'Clinical Cardiology', experience: 19, email: 'lucas.g@hospital.com', phone: '+9876543217', rating: 4.9, patientsToday: 21, availability: 'Available', status: 'Active' },
  { id: 'DR-2019', name: 'Dr. Charlotte Martinez', department: 'Gynecology', specialization: 'Reproductive Endocrinology', experience: 10, email: 'charlotte.m@hospital.com', phone: '+9876543218', rating: 4.8, patientsToday: 24, availability: 'Available', status: 'Active' },
  { id: 'DR-2020', name: 'Dr. Elijah Robinson', department: 'Orthopedics', specialization: 'Spine Surgery', experience: 21, email: 'elijah.r@hospital.com', phone: '+9876543219', rating: 4.9, patientsToday: 7, availability: 'In Surgery', status: 'Active' },
];

const availabilityColors = {
  Available: { color: '#10b981', bg: 'rgba(16,185,129,0.1)' },
  'On Leave': { color: '#ef4444', bg: 'rgba(239,68,68,0.1)' },
  'In Surgery': { color: '#f59e0b', bg: 'rgba(245,158,11,0.1)' },
};

const SORT_OPTIONS = [
  { value: "newest", label: "Newest" },
  { value: "oldest", label: "Oldest" },
  { value: "name_asc", label: "Doctor Name A-Z" },
  { value: "name_desc", label: "Doctor Name Z-A" },
  { value: "experience_desc", label: "Experience: High to Low" },
  { value: "rating_desc", label: "Rating: High to Low" },
];

const Doctors = () => {
  const toast = useToast();

  const [loading, setLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const [isEmpty, setIsEmpty] = useState(false);

  const [search, setSearch] = useState("");
  const [deptFilter, setDeptFilter] = useState("All");
  const [specFilter, setSpecFilter] = useState("All");
  const [availabilityFilter, setAvailabilityFilter] = useState("All");
  const [statusFilter, setStatusFilter] = useState("All");
  const [sort, setSort] = useState("newest");

  const [deleteModalVisible, setDeleteModalVisible] = useState(false);
  const [doctorToDelete, setDoctorToDelete] = useState(null);

  useEffect(() => {
    // 1-second frontend logic simulation
    const timer = setTimeout(() => setLoading(false), 1000);
    return () => clearTimeout(timer);
  }, []);

  const baseData = isEmpty ? [] : mockDoctors;
  const searchedDoctors = useSearch(baseData, search, ["id", "name", "department", "specialization", "email"]);

  const filters = useMemo(() => ({
    department: deptFilter === "All" ? undefined : deptFilter,
    specialization: specFilter === "All" ? undefined : specFilter,
    availability: availabilityFilter === "All" ? undefined : availabilityFilter,
    status: statusFilter === "All" ? undefined : statusFilter,
  }), [deptFilter, specFilter, availabilityFilter, statusFilter]);

  const filteredDoctors = useFilter(searchedDoctors, filters);

  const sortConfig = useMemo(() => {
    switch (sort) {
      case "name_asc": return { key: "name", direction: "asc" };
      case "name_desc": return { key: "name", direction: "desc" };
      case "newest": return { key: "id", direction: "desc" };
      case "oldest": return { key: "id", direction: "asc" };
      case "experience_desc": return { key: "experience", direction: "desc" };
      case "rating_desc": return { key: "rating", direction: "desc" };
      default: return null;
    }
  }, [sort]);

  const sortedDoctors = useSort(filteredDoctors, sortConfig);

  const {
    paginatedData,
    currentPage,
    setPage,
    pageSize,
    setPageSize,
  } = usePagination(sortedDoctors, 10);

  const handleDeleteClick = (record) => {
    setDoctorToDelete(record);
    setDeleteModalVisible(true);
  };

  const confirmDelete = () => {
    setDeleteModalVisible(false);
    toast.success("Doctor deleted successfully"); // Frontend demo only
  };

  const columns = [
    { title: 'Doctor ID', dataIndex: 'id', key: 'id', render: text => <strong style={{ color: '#0f8a8f' }}>{text}</strong> },
    { title: 'Photo', dataIndex: 'photo', key: 'photo', render: () => <Avatar icon={<UserOutlined />} /> },
    { title: 'Name', dataIndex: 'name', key: 'name', render: text => <strong>{text}</strong> },
    { title: 'Department', dataIndex: 'department', key: 'department' },
    { title: 'Specialization', dataIndex: 'specialization', key: 'specialization', render: text => <span style={{ color: '#64748b' }}>{text}</span> },
    { title: 'Experience', dataIndex: 'experience', key: 'experience', render: exp => `${exp} Yrs` },
    { title: 'Patients Today', dataIndex: 'patientsToday', key: 'patientsToday' },
    {
      title: 'Rating',
      dataIndex: 'rating',
      key: 'rating',
      render: rating => (
        <Space size="small" style={{ color: '#f59e0b', fontWeight: 600 }}>
          <StarFilled /> {rating}
        </Space>
      )
    },
    {
      title: 'Availability',
      dataIndex: 'availability',
      key: 'availability',
      render: status => {
        const config = availabilityColors[status] || { color: '#64748b', bg: '#f1f5f9' };
        return <span style={{ color: config.color, background: config.bg, padding: '4px 12px', borderRadius: '12px', fontSize: '0.8rem', fontWeight: 600 }}>{status}</span>;
      }
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      render: status => (
        status === 'Active'
          ? <Tag color="success">Active</Tag>
          : <Tag color="default">Inactive</Tag>
      )
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (_, record) => (
        <Space size="middle">
          <Tooltip title="View"><Button type="text" icon={<EyeOutlined />} style={{ color: '#1890ff' }} /></Tooltip>
          <Tooltip title="Edit"><Button type="text" icon={<EditOutlined />} style={{ color: '#52c41a' }} /></Tooltip>
          <Tooltip title="Delete"><Button type="text" icon={<DeleteOutlined />} style={{ color: '#ff4d4f' }} onClick={() => handleDeleteClick(record)} /></Tooltip>
          <Tooltip title="Schedule"><Button type="text" icon={<CalendarOutlined />} style={{ color: '#722ed1' }} /></Tooltip>
        </Space>
      ),
    },
  ];

  // Distinct departments and specializations for filters
  const allDepts = Array.from(new Set(mockDoctors.map(d => d.department)));
  const allSpecs = Array.from(new Set(mockDoctors.map(d => d.specialization)));

  return (
    <>
      <LoadingOverlay loading={loading} text="Loading Doctors Database..." />
      <DashboardLayout>
        {loading ? (
          <DashboardSkeleton />
        ) : isError ? (
          <ErrorState
            title="Failed to Load Doctors"
            description="We encountered an issue fetching the latest directory. Please try again."
            buttonText="Try Again"
            onRetry={() => setIsError(false)}
          />
        ) : (
          <div className="dashboard-home">
            <style>{`
              .admin-header { display: flex; justify-content: space-between; align-items: flex-end; margin-bottom: 24px; flex-wrap: wrap; gap: 16px; }
              .table-card-wrapper { background: #fff; padding: 24px; border-radius: 12px; box-shadow: 0 4px 16px rgba(0,0,0,0.02); margin-top: 24px; }
              .filter-row-section { display: flex; align-items: center; justify-content: space-between; flex-wrap: wrap; gap: 16px; margin-bottom: 24px; background: #f8fafc; padding: 16px; border-radius: 8px; }
              .filter-group { display: flex; gap: 12px; align-items: center; flex-wrap: wrap; }
              .mock-controls { display: flex; gap: 8px; margin-bottom: 16px; background: #fffbe6; padding: 10px; border: 1px dashed #ffe58f; border-radius: 8px; }
              @media (max-width: 768px) {
                .filter-row-section { flex-direction: column; align-items: stretch; }
                .admin-header { flex-direction: column; align-items: flex-start; }
              }
             `}</style>

            {/* MOCK CONTROLS */}
            <div className="mock-controls">
              <Tag color="warning">Demo Controls</Tag>
              <Button size="small" onClick={() => setIsEmpty(!isEmpty)}>{isEmpty ? 'Restore Mock Data' : 'Simulate Empty State'}</Button>
              <Button size="small" danger onClick={() => setIsError(true)}>Simulate Error</Button>
            </div>

            {/* 1. Hero Section */}
            <motion.div className="admin-header" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
              <div>
                <h1 className="welcome-heading">Doctor Management</h1>
                <p className="welcome-sub">Manage all hospital doctors, departments, schedules, and availability.</p>
                <Space style={{ marginTop: '8px' }}>
                  <Tag color="processing">Total Doctors: 20</Tag>
                  <Tag color="success">Available Today: 13</Tag>
                  <Tag color="error">On Leave Today: 4</Tag>
                </Space>
              </div>
              <Space>
                <Button type="default" icon={<ExportOutlined />} size="large" style={{ borderRadius: '8px' }}>Export Doctors</Button>
                <Button type="primary" icon={<UserAddOutlined />} size="large" style={{ borderRadius: '8px' }}>Add Doctor</Button>
              </Space>
            </motion.div>

            {/* 2. KPI Cards */}
            <div className="stat-charts-row" style={{ marginTop: '0', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '20px' }}>
              <StatCardChart title="Total Doctors" value="20" icon={<TeamOutlined />} trend="Stable" trendColor="#10b981" />
              <StatCardChart title="Available Today" value="13" icon={<CheckCircleOutlined />} trend="Optimal Staffing" trendColor="#10b981" />
              <StatCardChart title="Consultations Today" value="287" icon={<ClockCircleOutlined />} trend="+15 since yesterday" trendColor="#0f8a8f" />
              <StatCardChart title="Average Rating" value="4.7/5" icon={<StarFilled />} trend="Excellent" trendColor="#f59e0b" />
            </div>

            {/* 3. Search & 4. Filters & 5. Sort */}
            <motion.div className="table-card-wrapper" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
              <div className="filter-row-section">
                <div className="filter-group">
                  <Input
                    prefix={<SearchOutlined style={{ color: '#bfbfbf' }} />}
                    placeholder="Search ID, Name, Dept, Spec, Email..."
                    allowClear
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    style={{ width: '280px', borderRadius: '8px' }}
                  />
                  <Select value={deptFilter} onChange={setDeptFilter} style={{ width: '130px' }} showSearch>
                    <Option value="All">All Departments</Option>
                    {allDepts.map(d => <Option key={d} value={d}>{d}</Option>)}
                  </Select>
                  <Select value={specFilter} onChange={setSpecFilter} style={{ width: '150px' }} showSearch>
                    <Option value="All">All Specializations</Option>
                    {allSpecs.map(s => <Option key={s} value={s}>{s}</Option>)}
                  </Select>
                  <Select value={availabilityFilter} onChange={setAvailabilityFilter} style={{ width: '130px' }}>
                    <Option value="All">Any Availability</Option>
                    <Option value="Available">Available</Option>
                    <Option value="On Leave">On Leave</Option>
                    <Option value="In Surgery">In Surgery</Option>
                  </Select>
                  <Select value={statusFilter} onChange={setStatusFilter} style={{ width: '120px' }}>
                    <Option value="All">Any Status</Option>
                    <Option value="Active">Active</Option>
                    <Option value="Inactive">Inactive</Option>
                  </Select>
                </div>

                <div className="filter-group">
                  <Space>
                    <SortAscendingOutlined style={{ color: '#64748b' }} />
                    <Select value={sort} onChange={setSort} style={{ width: '170px' }}>
                      {SORT_OPTIONS.map(opt => <Option key={opt.value} value={opt.value}>{opt.label}</Option>)}
                    </Select>
                  </Space>
                  <Button icon={<ClearOutlined />} onClick={() => {
                    setSearch("");
                    setDeptFilter("All");
                    setSpecFilter("All");
                    setAvailabilityFilter("All");
                    setStatusFilter("All");
                    setSort("newest");
                  }}>Clear</Button>
                </div>
              </div>

              {/* Table / Empty State block */}
              {sortedDoctors.length === 0 ? (
                <EmptyState
                  title="No Doctors Found"
                  description={isEmpty ? "There are no registered doctors in the system yet." : "No doctors match your current search and filter criteria."}
                />
              ) : (
                <>
                  {/* 6. Doctors Table */}
                  <Table
                    columns={columns}
                    dataSource={paginatedData}
                    rowKey="id"
                    pagination={false}
                    scroll={{ x: 1200 }}
                  />

                  {/* 7. Pagination */}
                  <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '24px' }}>
                    <Pagination
                      current={currentPage}
                      total={sortedDoctors.length}
                      pageSize={pageSize}
                      pageSizeOptions={['10', '20', '50']}
                      showSizeChanger
                      onChange={(page) => setPage(page)}
                      onShowSizeChange={(_, size) => setPageSize(size)}
                    />
                  </div>
                </>
              )}
            </motion.div>
          </div>
        )}
      </DashboardLayout>

      {/* 11. Confirmation Modal */}
      <ConfirmationModal
        visible={deleteModalVisible}
        title="Delete Doctor"
        description={`Are you sure you want to delete ${doctorToDelete?.name}? This action cannot be undone and will unassign all related appointments.`}
        type="danger"
        confirmText="Delete"
        cancelText="Cancel"
        onConfirm={confirmDelete}
        onCancel={() => setDeleteModalVisible(false)}
      />
    </>
  );
};

export default Doctors;
