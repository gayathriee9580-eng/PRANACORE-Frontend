import React, { useState, useMemo, useEffect } from 'react';
import { Input, Select, Table, Button, Tag, Space, Pagination, Tooltip, Avatar, Typography } from 'antd';
import {
  SearchOutlined,
  SortAscendingOutlined,
  ExportOutlined,
  UserOutlined,
  TeamOutlined,
  FolderOpenOutlined,
  MedicineBoxOutlined,
  ExperimentOutlined,
  DeleteOutlined,
  WarningOutlined,
  SyncOutlined,
  ClearOutlined,
  ClockCircleOutlined
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
const { Text } = Typography;

// --- Mock Data ---
const mockPatients = Array.from({ length: 30 }, (_, index) => {
  const genders = ['Male', 'Female'];
  const bloodGroups = ['A+', 'A-', 'B+', 'B-', 'O+', 'O-', 'AB+', 'AB-'];
  const statuses = ['Active', 'Discharged', 'Critical', 'Follow-up'];
  const diagnoses = ['Hypertension', 'Diabetes Type II', 'Migraine', 'Asthma', 'Arthritis', 'Anemia', 'Flu', 'Fracture'];

  const statusCounts = index < 3 ? 'Critical' : (index % 5 === 0 ? 'Follow-up' : statuses[index % statuses.length]);

  return {
    patientId: `PT-${3000 + index}`,
    photo: `https://i.pravatar.cc/150?u=${3000 + index}`,
    name: `Patient Name ${index + 1}`,
    age: Math.floor(Math.random() * 60) + 18,
    gender: genders[index % genders.length],
    bloodGroup: bloodGroups[index % bloodGroups.length],
    phone: `+1 (555) 000-${(1000 + index).toString().slice(-4)}`,
    diagnosis: diagnoses[index % diagnoses.length],
    lastVisit: `2026-07-${(index % 28 + 1).toString().padStart(2, '0')}`,
    createdAt: `2026-07-${(index % 28 + 1).toString().padStart(2, '0')}T10:00:00Z`,
    status: statusCounts
  };
});

const statusColors = {
  'Active': { color: '#0f8a8f', bg: 'rgba(15,138,143,0.1)' },
  'Discharged': { color: '#64748b', bg: '#f1f5f9' },
  'Critical': { color: '#ef4444', bg: 'rgba(239,68,68,0.1)' },
  'Follow-up': { color: '#f59e0b', bg: 'rgba(245,158,11,0.1)' }
};

const SORT_OPTIONS = [
  { value: "newest", label: "Newest First" },
  { value: "oldest", label: "Oldest First" },
  { value: "name_asc", label: "Patient Name A-Z" },
  { value: "age_asc", label: "Age: Lowest" },
  { value: "age_desc", label: "Age: Highest" },
  { value: "lastVisit_desc", label: "Last Visit (Recent)" },
];

const Patients = () => {
  const toast = useToast();

  const [loading, setLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const [isEmpty, setIsEmpty] = useState(false);

  const [search, setSearch] = useState("");
  const [genderFilter, setGenderFilter] = useState("All");
  const [bloodGroupFilter, setBloodGroupFilter] = useState("All");
  const [statusFilter, setStatusFilter] = useState("All");
  const [sort, setSort] = useState("newest");

  const [deleteModalVisible, setDeleteModalVisible] = useState(false);
  const [selectedRecord, setSelectedRecord] = useState(null);

  useEffect(() => {
    // 1-second simulated loading state
    const timer = setTimeout(() => setLoading(false), 1000);
    return () => clearTimeout(timer);
  }, []);

  const baseData = isEmpty ? [] : mockPatients;

  const searchedData = useSearch(baseData, search, ["patientId", "name", "age", "gender", "diagnosis", "phone", "bloodGroup"]);

  const filters = useMemo(() => ({
    gender: genderFilter === "All" ? undefined : genderFilter,
    bloodGroup: bloodGroupFilter === "All" ? undefined : bloodGroupFilter,
    status: statusFilter === "All" ? undefined : statusFilter,
  }), [genderFilter, bloodGroupFilter, statusFilter]);

  const filteredData = useFilter(searchedData, filters);

  const sortConfig = useMemo(() => {
    switch (sort) {
      case "name_asc": return { key: "name", direction: "asc" };
      case "age_asc": return { key: "age", direction: "asc", type: "number" };
      case "age_desc": return { key: "age", direction: "desc", type: "number" };
      case "lastVisit_desc": return { key: "lastVisit", direction: "desc" };
      case "newest": return { key: "createdAt", direction: "desc" };
      case "oldest": return { key: "createdAt", direction: "asc" };
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

  const handleAction = (type, record) => {
    if (type === 'delete') {
      setSelectedRecord(record);
      setDeleteModalVisible(true);
    } else if (type === 'profile') {
      toast.success("Patient profile opened");
    } else if (type === 'records') {
      toast.success("Medical records opened");
    } else if (type === 'prescription') {
      toast.success("Prescription page opened");
    } else if (type === 'lab') {
      toast.success("Lab reports opened");
    }
  };

  const confirmDelete = () => {
    setDeleteModalVisible(false);
    toast.success("Patient removed successfully");
  };

  const columns = [
    { title: 'ID', dataIndex: 'patientId', key: 'patientId', render: text => <strong style={{ color: '#0f8a8f' }}>{text}</strong> },
    { title: 'Photo', dataIndex: 'photo', key: 'photo', render: url => <Avatar src={url} size={40} style={{ border: '1px solid #e2e8f0' }} /> },
    { title: 'Patient Name', dataIndex: 'name', key: 'name', render: text => <strong>{text}</strong> },
    { title: 'Age', dataIndex: 'age', key: 'age' },
    { title: 'Gender', dataIndex: 'gender', key: 'gender', render: text => <Text type="secondary">{text}</Text> },
    { title: 'Blood Group', dataIndex: 'bloodGroup', key: 'bloodGroup', render: text => <Tag color="red" bordered={false}>{text}</Tag> },
    { title: 'Diagnosis', dataIndex: 'diagnosis', key: 'diagnosis' },
    { title: 'Last Visit', dataIndex: 'lastVisit', key: 'lastVisit' },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      render: status => {
        const config = statusColors[status] || { color: '#64748b', bg: '#f1f5f9' };
        return <span style={{ color: config.color, background: config.bg, padding: '4px 12px', borderRadius: '12px', fontSize: '0.8rem', fontWeight: 600 }}>{status}</span>;
      }
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (_, record) => (
        <Space size="small">
          <Tooltip title="View Profile"><Button type="text" icon={<UserOutlined />} style={{ color: '#3b82f6' }} onClick={() => handleAction('profile', record)} /></Tooltip>
          <Tooltip title="Medical Records"><Button type="text" icon={<FolderOpenOutlined />} style={{ color: '#10b981' }} onClick={() => handleAction('records', record)} /></Tooltip>
          <Tooltip title="Prescription"><Button type="text" icon={<MedicineBoxOutlined />} style={{ color: '#f59e0b' }} onClick={() => handleAction('prescription', record)} /></Tooltip>
          <Tooltip title="Lab Reports"><Button type="text" icon={<ExperimentOutlined />} style={{ color: '#8b5cf6' }} onClick={() => handleAction('lab', record)} /></Tooltip>
          <Tooltip title="Remove Patient"><Button type="text" icon={<DeleteOutlined />} style={{ color: '#ef4444' }} onClick={() => handleAction('delete', record)} /></Tooltip>
        </Space>
      ),
    },
  ];

  return (
    <>
      <LoadingOverlay loading={loading} text="Retrieving Patients Roster..." />
      <DashboardLayout>
        {loading ? (
          <DashboardSkeleton />
        ) : isError ? (
          <ErrorState
            title="Failed to Load Patients"
            description="We encountered an issue fetching the assigned patients list. Please attempt to reconnect."
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

            <div className="mock-controls">
              <Tag color="warning">Demo Controls</Tag>
              <Button size="small" onClick={() => setIsEmpty(!isEmpty)}>{isEmpty ? 'Restore Patients' : 'Simulate Empty State'}</Button>
              <Button size="small" danger onClick={() => setIsError(true)}>Simulate Error</Button>
            </div>

            {/* Hero Section */}
            <motion.div className="admin-header" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
              <div>
                <h1 className="welcome-heading">My Patients</h1>
                <p className="welcome-sub">View and manage patients assigned to you.</p>
              </div>
              <Space>
                <Button type="default" icon={<ExportOutlined />} size="large" style={{ borderRadius: '8px' }}>Export List</Button>
                <Button type="primary" icon={<ClockCircleOutlined />} size="large" style={{ borderRadius: '8px' }}>Today's Patients</Button>
              </Space>
            </motion.div>

            {/* KPI Cards */}
            <div className="stat-charts-row" style={{ marginTop: '0', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '20px' }}>
              <StatCardChart title="Total Assigned" value="142" icon={<TeamOutlined />} trend="+15 this month" trendColor="#10b981" />
              <StatCardChart title="New Patients Today" value="8" icon={<UserOutlined />} trend="Stable intake" trendColor="#0f8a8f" />
              <StatCardChart title="Critical Patients" value="3" icon={<WarningOutlined />} trend="Needs attention" trendColor="#ef4444" />
              <StatCardChart title="Follow-up Patients" value="12" icon={<SyncOutlined />} trend="Scheduled this week" trendColor="#f59e0b" />
            </div>

            {/* Search, Filters & Sort */}
            <motion.div className="table-card-wrapper" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
              <div className="filter-row-section">
                <div className="filter-group">
                  <Input
                    prefix={<SearchOutlined style={{ color: '#bfbfbf' }} />}
                    placeholder="Search Name, ID, Phone, Diagnosis..."
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
                  <Select value={bloodGroupFilter} onChange={setBloodGroupFilter} style={{ width: '150px' }}>
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
                  <Select value={statusFilter} onChange={setStatusFilter} style={{ width: '130px' }}>
                    <Option value="All">Any Status</Option>
                    <Option value="Active">Active</Option>
                    <Option value="Discharged">Discharged</Option>
                    <Option value="Critical">Critical</Option>
                    <Option value="Follow-up">Follow-up</Option>
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
                    setGenderFilter("All");
                    setBloodGroupFilter("All");
                    setStatusFilter("All");
                    setSort("newest");
                  }}>Clear</Button>
                </div>
              </div>

              {sortedData.length === 0 ? (
                <EmptyState
                  title="No Patients Found"
                  description={isEmpty ? "Your patient roster is currently empty." : "No patients match your applied filters and search."}
                />
              ) : (
                <>
                  {/* Patients Table */}
                  <Table
                    columns={columns}
                    dataSource={paginatedData}
                    rowKey="patientId"
                    pagination={false}
                    scroll={{ x: 1400 }}
                  />

                  {/* Pagination */}
                  <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '24px' }}>
                    <Pagination
                      current={currentPage}
                      total={sortedData.length}
                      pageSize={pageSize}
                      pageSizeOptions={['10', '20', '30', '50']}
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

      {/* Delete Patient Modal */}
      <ConfirmationModal
        visible={deleteModalVisible}
        title="Remove Patient"
        description={`Are you sure you want to remove ${selectedRecord?.name} from your immediate roster? This action is not easily reversible.`}
        type="danger"
        confirmText="Confirm Remove"
        cancelText="Cancel"
        onConfirm={confirmDelete}
        onCancel={() => setDeleteModalVisible(false)}
      />
    </>
  );
};

export default Patients;
