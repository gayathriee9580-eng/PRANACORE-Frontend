import React, { useState, useMemo, useEffect } from 'react';
import { Input, Select, Table, Button, Tag, Space, Pagination, Tooltip, Row, Col } from 'antd';
import {
  SearchOutlined,
  SortAscendingOutlined,
  PlusOutlined,
  ExportOutlined,
  EyeOutlined,
  EditOutlined,
  DeleteOutlined,
  TeamOutlined,
  MedicineBoxOutlined,
  ClockCircleOutlined,
  ClearOutlined,
  StarFilled,
  AppstoreOutlined,
  CheckCircleOutlined
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
const mockDepartments = [
  { id: 'DPT-101', name: 'Cardiology', category: 'Specialized Care', head: 'Dr. Sarah Smith', doctorCount: 15, serviceCount: 22, availability: 'Available', rating: 4.8, status: 'Active', createdAt: '2020-01-15' },
  { id: 'DPT-102', name: 'Neurology', category: 'Specialized Care', head: 'Dr. Mark Lee', doctorCount: 12, serviceCount: 18, availability: 'Available', rating: 4.6, status: 'Active', createdAt: '2020-02-20' },
  { id: 'DPT-103', name: 'Pediatrics', category: 'General Care', head: 'Dr. Alice Chen', doctorCount: 20, serviceCount: 25, availability: 'Available', rating: 4.9, status: 'Active', createdAt: '2019-11-10' },
  { id: 'DPT-104', name: 'Orthopedics', category: 'Surgical Care', head: 'Dr. Bob White', doctorCount: 14, serviceCount: 15, availability: 'Limited', rating: 4.5, status: 'Active', createdAt: '2021-03-05' },
  { id: 'DPT-105', name: 'Oncology', category: 'Specialized Care', head: 'Dr. Michael Brown', doctorCount: 10, serviceCount: 20, availability: 'Available', rating: 4.9, status: 'Active', createdAt: '2020-06-12' },
  { id: 'DPT-106', name: 'Dermatology', category: 'Outpatient Care', head: 'Dr. Sophie Miller', doctorCount: 8, serviceCount: 12, availability: 'Available', rating: 4.4, status: 'Active', createdAt: '2022-01-08' },
  { id: 'DPT-107', name: 'Gynecology', category: 'Specialized Care', head: 'Dr. Emma Anderson', doctorCount: 16, serviceCount: 20, availability: 'Available', rating: 4.8, status: 'Active', createdAt: '2019-09-18' },
  { id: 'DPT-108', name: 'Psychiatry', category: 'Mental Health', head: 'Dr. Liam Thomas', doctorCount: 9, serviceCount: 14, availability: 'Limited', rating: 4.5, status: 'Active', createdAt: '2021-08-22' },
  { id: 'DPT-109', name: 'General Surgery', category: 'Surgical Care', head: 'Dr. William White', doctorCount: 22, serviceCount: 30, availability: 'Available', rating: 4.7, status: 'Active', createdAt: '2018-05-15' },
  { id: 'DPT-110', name: 'Emergency', category: 'Emergency Care', head: 'Dr. Olivia Moore', doctorCount: 25, serviceCount: 10, availability: '24/7', rating: 4.6, status: 'Active', createdAt: '2018-01-01' },
  { id: 'DPT-111', name: 'Radiology', category: 'Diagnostics', head: 'Dr. James Taylor', doctorCount: 18, serviceCount: 35, availability: 'Available', rating: 4.9, status: 'Active', createdAt: '2019-12-05' },
  { id: 'DPT-112', name: 'Pathology', category: 'Diagnostics', head: 'Dr. Isabella Jackson', doctorCount: 10, serviceCount: 40, availability: 'Available', rating: 4.7, status: 'Active', createdAt: '2020-07-30' },
  { id: 'DPT-113', name: 'Endocrinology', category: 'Specialized Care', head: 'Dr. Benjamin Martin', doctorCount: 7, serviceCount: 15, availability: 'Available', rating: 4.6, status: 'Active', createdAt: '2021-11-12' },
  { id: 'DPT-114', name: 'Urology', category: 'Surgical Care', head: 'Dr. Lucas Garcia', doctorCount: 8, serviceCount: 14, availability: 'Limited', rating: 4.5, status: 'Inactive', createdAt: '2022-04-18' },
  { id: 'DPT-115', name: 'Dental', category: 'Outpatient Care', head: 'Dr. Charlotte Martinez', doctorCount: 12, serviceCount: 18, availability: 'Available', rating: 4.8, status: 'Active', createdAt: '2020-03-25' },
];

const availabilityConfig = {
  'Available': { color: '#10b981', bg: 'rgba(16,185,129,0.1)' },
  'Limited': { color: '#f59e0b', bg: 'rgba(245,158,11,0.1)' },
  '24/7': { color: '#8b5cf6', bg: 'rgba(139,92,246,0.1)' },
};

const SORT_OPTIONS = [
  { value: "newest", label: "Newest" },
  { value: "oldest", label: "Oldest" },
  { value: "name_asc", label: "Department Name A-Z" },
  { value: "name_desc", label: "Department Name Z-A" },
  { value: "rating_desc", label: "Highest Rated" },
  { value: "doctors_desc", label: "Most Doctors" },
];

const Departments = () => {
  const toast = useToast();

  const [loading, setLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const [isEmpty, setIsEmpty] = useState(false);

  const [search, setSearch] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("All");
  const [availabilityFilter, setAvailabilityFilter] = useState("All");
  const [statusFilter, setStatusFilter] = useState("All");
  const [sort, setSort] = useState("newest");

  const [deleteModalVisible, setDeleteModalVisible] = useState(false);
  const [departmentToDelete, setDepartmentToDelete] = useState(null);

  useEffect(() => {
    // 1-second frontend loader
    const timer = setTimeout(() => setLoading(false), 1000);
    return () => clearTimeout(timer);
  }, []);

  const baseData = isEmpty ? [] : mockDepartments;

  const searchedData = useSearch(baseData, search, ["id", "name", "head", "category"]);

  const filters = useMemo(() => ({
    category: categoryFilter === "All" ? undefined : categoryFilter,
    availability: availabilityFilter === "All" ? undefined : availabilityFilter,
    status: statusFilter === "All" ? undefined : statusFilter,
  }), [categoryFilter, availabilityFilter, statusFilter]);

  const filteredData = useFilter(searchedData, filters);

  const sortConfig = useMemo(() => {
    switch (sort) {
      case "name_asc": return { key: "name", direction: "asc" };
      case "name_desc": return { key: "name", direction: "desc" };
      case "newest": return { key: "createdAt", direction: "desc" };
      case "oldest": return { key: "createdAt", direction: "asc" };
      case "rating_desc": return { key: "rating", direction: "desc" };
      case "doctors_desc": return { key: "doctorCount", direction: "desc" };
      default: return null;
    }
  }, [sort]);

  const sortedData = useSort(filteredData, sortConfig);

  const {
    paginatedData,
    currentPage,
    setPage,
    pageSize,
    setPageSize,
  } = usePagination(sortedData, 10);

  const handleDeleteClick = (record) => {
    setDepartmentToDelete(record);
    setDeleteModalVisible(true);
  };

  const confirmDelete = () => {
    setDeleteModalVisible(false);
    toast.success("Department deleted successfully"); // Frontend demo only
  };

  const columns = [
    { title: 'Department ID', dataIndex: 'id', key: 'id', render: text => <strong style={{ color: '#0f8a8f' }}>{text}</strong> },
    { title: 'Department', dataIndex: 'name', key: 'name', render: text => <strong>{text}</strong> },
    { title: 'Category', dataIndex: 'category', key: 'category', render: cat => <Tag color="blue">{cat}</Tag> },
    { title: 'Head of Department', dataIndex: 'head', key: 'head', render: head => <span style={{ color: '#64748b' }}>{head}</span> },
    { title: 'Doctors', dataIndex: 'doctorCount', key: 'doctors', render: val => <span>{val}</span> },
    { title: 'Services', dataIndex: 'serviceCount', key: 'services', render: val => <span>{val} Services</span> },
    {
      title: 'Availability',
      dataIndex: 'availability',
      key: 'availability',
      render: status => {
        const config = availabilityConfig[status] || { color: '#64748b', bg: '#f1f5f9' };
        return <span style={{ color: config.color, background: config.bg, padding: '4px 12px', borderRadius: '12px', fontSize: '0.8rem', fontWeight: 600 }}>{status}</span>;
      }
    },
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
        </Space>
      ),
    },
  ];

  // Distinct arrays for filters
  const allCategories = Array.from(new Set(mockDepartments.map(d => d.category)));

  return (
    <>
      <LoadingOverlay loading={loading} text="Loading Departments Directory..." />
      <DashboardLayout>
        {loading ? (
          <DashboardSkeleton />
        ) : isError ? (
          <ErrorState
            title="Failed to Load Departments"
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
                <h1 className="welcome-heading">Department Management</h1>
                <p className="welcome-sub">Manage hospital departments, specialties, heads, and operational status.</p>
                <Space style={{ marginTop: '8px' }}>
                  <Tag color="processing">Total Departments: 15</Tag>
                  <Tag color="success">Active Departments: 14</Tag>
                  <Tag color="purple">Available Services: 284</Tag>
                </Space>
              </div>
              <Space>
                <Button type="default" icon={<ExportOutlined />} size="large" style={{ borderRadius: '8px' }}>Export Departments</Button>
                <Button type="primary" icon={<PlusOutlined />} size="large" style={{ borderRadius: '8px' }}>Add Department</Button>
              </Space>
            </motion.div>

            {/* 2. KPI Cards */}
            <div className="stat-charts-row" style={{ marginTop: '0', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '20px' }}>
              <StatCardChart title="Total Departments" value="15" icon={<AppstoreOutlined />} trend="Stable" trendColor="#10b981" />
              <StatCardChart title="Doctors Assigned" value="206" icon={<TeamOutlined />} trend="+15 this month" trendColor="#10b981" />
              <StatCardChart title="Today's Appointments" value="384" icon={<ClockCircleOutlined />} trend="High Volume" trendColor="#f59e0b" />
              <StatCardChart title="Average Rating" value="4.7/5" icon={<StarFilled />} trend="Excellent Output" trendColor="#0f8a8f" />
            </div>

            {/* 3. Search & 4. Filters & 5. Sort */}
            <motion.div className="table-card-wrapper" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
              <div className="filter-row-section">
                <div className="filter-group">
                  <Input
                    prefix={<SearchOutlined style={{ color: '#bfbfbf' }} />}
                    placeholder="Search ID, Dept Name, Head, Category..."
                    allowClear
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    style={{ width: '280px', borderRadius: '8px' }}
                  />
                  <Select value={categoryFilter} onChange={setCategoryFilter} style={{ width: '160px' }} showSearch>
                    <Option value="All">All Categories</Option>
                    {allCategories.map(c => <Option key={c} value={c}>{c}</Option>)}
                  </Select>
                  <Select value={availabilityFilter} onChange={setAvailabilityFilter} style={{ width: '140px' }}>
                    <Option value="All">Any Availability</Option>
                    <Option value="Available">Available</Option>
                    <Option value="Limited">Limited</Option>
                    <Option value="24/7">24/7</Option>
                  </Select>
                  <Select value={statusFilter} onChange={setStatusFilter} style={{ width: '130px' }}>
                    <Option value="All">Any Status</Option>
                    <Option value="Active">Active</Option>
                    <Option value="Inactive">Inactive</Option>
                  </Select>
                </div>

                <div className="filter-group">
                  <Space>
                    <SortAscendingOutlined style={{ color: '#64748b' }} />
                    <Select value={sort} onChange={setSort} style={{ width: '190px' }}>
                      {SORT_OPTIONS.map(opt => <Option key={opt.value} value={opt.value}>{opt.label}</Option>)}
                    </Select>
                  </Space>
                  <Button icon={<ClearOutlined />} onClick={() => {
                    setSearch("");
                    setCategoryFilter("All");
                    setAvailabilityFilter("All");
                    setStatusFilter("All");
                    setSort("newest");
                  }}>Clear</Button>
                </div>
              </div>

              {/* Table / Empty State block */}
              {sortedData.length === 0 ? (
                <EmptyState
                  title="No Departments Found"
                  description={isEmpty ? "There are no registered departments in the system yet." : "No departments match your current search and filter criteria."}
                />
              ) : (
                <>
                  {/* 6. Departments Table */}
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
                      total={sortedData.length}
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
        title="Delete Department"
        description={`Are you sure you want to delete the ${departmentToDelete?.name} department? This action cannot be undone and will unassign all linked doctors and services.`}
        type="danger"
        confirmText="Delete"
        cancelText="Cancel"
        onConfirm={confirmDelete}
        onCancel={() => setDeleteModalVisible(false)}
      />
    </>
  );
};

export default Departments;
