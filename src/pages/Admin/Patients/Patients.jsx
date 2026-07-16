import React, { useState, useMemo, useEffect } from 'react';
import { Input, Select, Table, Button, Tag, Space, Pagination, Row, Col, Tooltip } from 'antd';
import {
  SearchOutlined,
  FilterOutlined,
  SortAscendingOutlined,
  UserAddOutlined,
  ExportOutlined,
  EyeOutlined,
  EditOutlined,
  DeleteOutlined,
  TeamOutlined,
  UserOutlined,
  HeartOutlined,
  ClockCircleOutlined,
  ClearOutlined
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

const mockPatients = [
  { id: 'PT-1001', name: 'John Doe', age: 34, gender: 'Male', bloodGroup: 'O+', phone: '+1234567890', email: 'john@example.com', doctor: 'Dr. Sarah Smith', status: 'Admitted' },
  { id: 'PT-1002', name: 'Jane Roe', age: 28, gender: 'Female', bloodGroup: 'A+', phone: '+1234567891', email: 'jane@example.com', doctor: 'Dr. Mark Lee', status: 'Pending' },
  { id: 'PT-1003', name: 'Alice Chen', age: 45, gender: 'Female', bloodGroup: 'B+', phone: '+1234567892', email: 'alice@example.com', doctor: 'Dr. Alice Chen', status: 'Discharged' },
  { id: 'PT-1004', name: 'Bob White', age: 52, gender: 'Male', bloodGroup: 'O-', phone: '+1234567893', email: 'bob@example.com', doctor: 'Dr. Bob White', status: 'Active' },
  { id: 'PT-1005', name: 'Emily Davis', age: 22, gender: 'Female', bloodGroup: 'AB+', phone: '+1234567894', email: 'emily@example.com', doctor: 'Dr. Mark Lee', status: 'Admitted' },
  { id: 'PT-1006', name: 'Michael Brown', age: 60, gender: 'Male', bloodGroup: 'A-', phone: '+1234567895', email: 'michael@example.com', doctor: 'Dr. Sarah Smith', status: 'Pending' },
  { id: 'PT-1007', name: 'Sophie Miller', age: 19, gender: 'Female', bloodGroup: 'O+', phone: '+1234567896', email: 'sophie@example.com', doctor: 'Dr. Alice Chen', status: 'Active' },
  { id: 'PT-1008', name: 'David Wilson', age: 41, gender: 'Male', bloodGroup: 'B-', phone: '+1234567897', email: 'david@example.com', doctor: 'Dr. Bob White', status: 'Discharged' },
  { id: 'PT-1009', name: 'Olivia Moore', age: 31, gender: 'Female', bloodGroup: 'A+', phone: '+1234567898', email: 'olivia@example.com', doctor: 'Dr. Mark Lee', status: 'Admitted' },
  { id: 'PT-1010', name: 'James Taylor', age: 72, gender: 'Male', bloodGroup: 'O+', phone: '+1234567899', email: 'james@example.com', doctor: 'Dr. Alice Chen', status: 'Discharged' },
  { id: 'PT-1011', name: 'Emma Anderson', age: 26, gender: 'Female', bloodGroup: 'AB-', phone: '+9876543210', email: 'emma@example.com', doctor: 'Dr. Sarah Smith', status: 'Active' },
  { id: 'PT-1012', name: 'Liam Thomas', age: 38, gender: 'Male', bloodGroup: 'B+', phone: '+9876543211', email: 'liam@example.com', doctor: 'Dr. Bob White', status: 'Pending' },
  { id: 'PT-1013', name: 'Isabella Jackson', age: 50, gender: 'Female', bloodGroup: 'O-', phone: '+9876543212', email: 'isabella@example.com', doctor: 'Dr. Mark Lee', status: 'Admitted' },
  { id: 'PT-1014', name: 'William White', age: 64, gender: 'Male', bloodGroup: 'A+', phone: '+9876543213', email: 'william@example.com', doctor: 'Dr. Alice Chen', status: 'Discharged' },
  { id: 'PT-1015', name: 'Sophia Harris', age: 29, gender: 'Female', bloodGroup: 'O+', phone: '+9876543214', email: 'sophia@example.com', doctor: 'Dr. Sarah Smith', status: 'Active' },
  { id: 'PT-1016', name: 'Benjamin Martin', age: 47, gender: 'Male', bloodGroup: 'B-', phone: '+9876543215', email: 'benjamin@example.com', doctor: 'Dr. Bob White', status: 'Pending' },
  { id: 'PT-1017', name: 'Mia Thompson', age: 33, gender: 'Female', bloodGroup: 'A-', phone: '+9876543216', email: 'mia@example.com', doctor: 'Dr. Mark Lee', status: 'Admitted' },
  { id: 'PT-1018', name: 'Lucas Garcia', age: 55, gender: 'Male', bloodGroup: 'AB+', phone: '+9876543217', email: 'lucas@example.com', doctor: 'Dr. Alice Chen', status: 'Discharged' },
  { id: 'PT-1019', name: 'Charlotte Martinez', age: 21, gender: 'Female', bloodGroup: 'O+', phone: '+9876543218', email: 'charlotte@example.com', doctor: 'Dr. Sarah Smith', status: 'Active' },
  { id: 'PT-1020', name: 'Elijah Robinson', age: 40, gender: 'Male', bloodGroup: 'O-', phone: '+9876543219', email: 'elijah@example.com', doctor: 'Dr. Bob White', status: 'Pending' },
];

const statusColors = {
  Admitted: { color: '#0f8a8f', bg: 'rgba(15,138,143,0.1)' },
  Discharged: { color: '#64748b', bg: 'rgba(100,116,139,0.1)' },
  Pending: { color: '#f59e0b', bg: 'rgba(245,158,11,0.1)' },
  Active: { color: '#10b981', bg: 'rgba(16,185,129,0.1)' }
};

const SORT_OPTIONS = [
  { value: "newest", label: "Newest" },
  { value: "oldest", label: "Oldest" },
  { value: "name_asc", label: "Name A-Z" },
  { value: "name_desc", label: "Name Z-A" },
];

const Patients = () => {
  const toast = useToast();

  const [loading, setLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const [isEmpty, setIsEmpty] = useState(false);

  const [search, setSearch] = useState("");
  const [genderFilter, setGenderFilter] = useState("All");
  const [statusFilter, setStatusFilter] = useState("All");
  const [bloodFilter, setBloodFilter] = useState("All");
  const [sort, setSort] = useState("newest");

  const [deleteModalVisible, setDeleteModalVisible] = useState(false);
  const [patientToDelete, setPatientToDelete] = useState(null);

  useEffect(() => {
    // Initial loading simulation
    const timer = setTimeout(() => setLoading(false), 1000);
    return () => clearTimeout(timer);
  }, []);

  const baseData = isEmpty ? [] : mockPatients;
  const searchedPatients = useSearch(baseData, search, ["id", "name", "email", "phone"]);

  const filters = useMemo(() => ({
    gender: genderFilter === "All" ? undefined : genderFilter,
    status: statusFilter === "All" ? undefined : statusFilter,
    bloodGroup: bloodFilter === "All" ? undefined : bloodFilter,
  }), [genderFilter, statusFilter, bloodFilter]);

  const filteredPatients = useFilter(searchedPatients, filters);

  const sortConfig = useMemo(() => {
    switch (sort) {
      case "name_asc": return { key: "name", direction: "asc" };
      case "name_desc": return { key: "name", direction: "desc" };
      case "newest": return { key: "id", direction: "desc" };
      case "oldest": return { key: "id", direction: "asc" };
      default: return null;
    }
  }, [sort]);

  const sortedPatients = useSort(filteredPatients, sortConfig);

  const {
    paginatedData,
    currentPage,
    setPage,
    pageSize,
    setPageSize,
  } = usePagination(sortedPatients, 10);

  const handleDeleteClick = (record) => {
    setPatientToDelete(record);
    setDeleteModalVisible(true);
  };

  const confirmDelete = () => {
    setDeleteModalVisible(false);
    toast.success("Patient deleted successfully (Frontend demo only)");
  };

  const columns = [
    { title: 'Patient ID', dataIndex: 'id', key: 'id', render: text => <strong style={{ color: '#0f8a8f' }}>{text}</strong> },
    { title: 'Name', dataIndex: 'name', key: 'name' },
    { title: 'Age', dataIndex: 'age', key: 'age' },
    { title: 'Gender', dataIndex: 'gender', key: 'gender' },
    { title: 'Blood Group', dataIndex: 'bloodGroup', key: 'bloodGroup', render: text => <Tag color="error">{text}</Tag> },
    { title: 'Phone', dataIndex: 'phone', key: 'phone' },
    { title: 'Doctor Assigned', dataIndex: 'doctor', key: 'doctor' },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      render: status => {
        const config = statusColors[status] || statusColors.Active;
        return <span style={{ color: config.color, background: config.bg, padding: '4px 12px', borderRadius: '12px', fontSize: '0.8rem', fontWeight: 600 }}>{status}</span>;
      }
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

  return (
    <>
      <LoadingOverlay loading={loading} text="Loading Patients..." />
      <DashboardLayout>
        {loading ? (
          <DashboardSkeleton />
        ) : isError ? (
          <ErrorState
            title="Failed to Load Patients"
            description="We encountered an issue fetching the latest patient directory. Please try again."
            buttonText="Try Again"
            onRetry={() => setIsError(false)}
          />
        ) : (
          <div className="dashboard-home">
            <style>{`
              .admin-patients-header { display: flex; justify-content: space-between; align-items: flex-end; margin-bottom: 24px; flex-wrap: wrap; gap: 16px; }
              .patients-table-card { background: #fff; padding: 24px; border-radius: 12px; box-shadow: 0 4px 16px rgba(0,0,0,0.02); margin-top: 24px; }
              .patients-filter-row { display: flex; align-items: center; justify-content: space-between; flex-wrap: wrap; gap: 16px; margin-bottom: 24px; background: #f8fafc; padding: 16px; border-radius: 8px; }
              .filter-group { display: flex; gap: 12px; align-items: center; flex-wrap: wrap; }
              .mock-controls { display: flex; gap: 8px; margin-bottom: 16px; background: #fffbe6; padding: 10px; border: 1px dashed #ffe58f; border-radius: 8px; }
              @media (max-width: 768px) {
                .patients-filter-row { flex-direction: column; align-items: stretch; }
                .admin-patients-header { flex-direction: column; align-items: flex-start; }
              }
             `}</style>

            {/* MOCK CONTROLS (Development Only) */}
            <div className="mock-controls">
              <Tag color="warning">Demo Controls</Tag>
              <Button size="small" onClick={() => setIsEmpty(!isEmpty)}>{isEmpty ? 'Restore Mock Data' : 'Simulate Empty State'}</Button>
              <Button size="small" danger onClick={() => setIsError(true)}>Simulate Error</Button>
            </div>

            {/* 1. Hero Section */}
            <motion.div className="admin-patients-header" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
              <div>
                <h1 className="welcome-heading">Patient Management</h1>
                <p className="welcome-sub">View, search, filter, and manage all registered patients.</p>
                <Space style={{ marginTop: '8px' }}>
                  <Tag color="processing">Total Patients: 20</Tag>
                  <Tag color="success">Active Patients: 5</Tag>
                  <Tag color="warning">New Registrations Today: 3</Tag>
                </Space>
              </div>
              <Space>
                <Button type="default" icon={<ExportOutlined />} size="large" style={{ borderRadius: '8px' }}>Export Patients</Button>
                <Button type="primary" icon={<UserAddOutlined />} size="large" style={{ borderRadius: '8px' }}>Add Patient</Button>
              </Space>
            </motion.div>

            {/* 2. KPI Cards */}
            <div className="stat-charts-row" style={{ marginTop: '0', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '20px' }}>
              <StatCardChart title="Total Patients" value="20" icon={<TeamOutlined />} trend="+12 this month" trendColor="#10b981" />
              <StatCardChart title="Admitted" value="5" icon={<HeartOutlined />} trend="Stable" trendColor="#0f8a8f" />
              <StatCardChart title="Discharged" value="5" icon={<CheckCircleOutlined />} trend="+2 today" trendColor="#10b981" />
              <StatCardChart title="Pending Appointments" value="5" icon={<ClockCircleOutlined />} trend="-1 since yesterday" trendColor="#f59e0b" />
            </div>

            {/* 3. Search & Filters + 4. Patients Table */}
            <motion.div className="patients-table-card" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
              <div className="patients-filter-row">
                <div className="filter-group">
                  <Input
                    prefix={<SearchOutlined style={{ color: '#bfbfbf' }} />}
                    placeholder="Search ID, Name, Email, Phone..."
                    allowClear
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    style={{ width: '280px', borderRadius: '8px' }}
                  />
                  <Select value={genderFilter} onChange={setGenderFilter} style={{ width: '120px' }}>
                    <Option value="All">All Genders</Option>
                    <Option value="Male">Male</Option>
                    <Option value="Female">Female</Option>
                  </Select>
                  <Select value={statusFilter} onChange={setStatusFilter} style={{ width: '140px' }}>
                    <Option value="All">All Statuses</Option>
                    <Option value="Admitted">Admitted</Option>
                    <Option value="Discharged">Discharged</Option>
                    <Option value="Pending">Pending</Option>
                    <Option value="Active">Active</Option>
                  </Select>
                  <Select value={bloodFilter} onChange={setBloodFilter} style={{ width: '140px' }}>
                    <Option value="All">All Blood Groups</Option>
                    <Option value="A+">A+</Option>
                    <Option value="A-">A-</Option>
                    <Option value="B+">B+</Option>
                    <Option value="B-">B-</Option>
                    <Option value="O+">O+</Option>
                    <Option value="O-">O-</Option>
                    <Option value="AB+">AB+</Option>
                    <Option value="AB-">AB-</Option>
                  </Select>
                </div>

                <div className="filter-group">
                  <Space>
                    <SortAscendingOutlined style={{ color: '#64748b' }} />
                    <Select value={sort} onChange={setSort} style={{ width: '130px' }}>
                      {SORT_OPTIONS.map(opt => <Option key={opt.value} value={opt.value}>{opt.label}</Option>)}
                    </Select>
                  </Space>
                  <Button icon={<ClearOutlined />} onClick={() => {
                    setSearch("");
                    setGenderFilter("All");
                    setStatusFilter("All");
                    setBloodFilter("All");
                    setSort("newest");
                  }}>Clear</Button>
                </div>
              </div>

              {/* Table / Empty State block */}
              {sortedPatients.length === 0 ? (
                <EmptyState
                  title="No Patients Found"
                  description={isEmpty ? "There are no registered patients in the system yet." : "No patients match your current search and filter criteria."}
                />
              ) : (
                <>
                  <Table
                    columns={columns}
                    dataSource={paginatedData}
                    rowKey="id"
                    pagination={false}
                    scroll={{ x: 1000 }}
                  />

                  {/* 5. Pagination */}
                  <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '24px' }}>
                    <Pagination
                      current={currentPage}
                      total={sortedPatients.length}
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

      {/* 9. Confirmation Modal */}
      <ConfirmationModal
        visible={deleteModalVisible}
        title="Delete Patient"
        description={`Are you sure you want to delete patient ${patientToDelete?.name}? This action cannot be undone.`}
        type="danger"
        confirmText="Delete"
        cancelText="Cancel"
        onConfirm={confirmDelete}
        onCancel={() => setDeleteModalVisible(false)}
      />
    </>
  );
};

export default Patients;
