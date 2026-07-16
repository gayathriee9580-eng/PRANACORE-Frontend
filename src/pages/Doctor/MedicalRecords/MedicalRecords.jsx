import React, { useState, useMemo, useEffect } from 'react';
import { Input, Select, Table, Button, Tag, Space, Pagination, Tooltip, Typography } from 'antd';
import {
  SearchOutlined,
  SortAscendingOutlined,
  ExportOutlined,
  FolderOpenOutlined,
  FileDoneOutlined,
  ExperimentOutlined,
  WarningOutlined,
  EyeOutlined,
  EditOutlined,
  DownloadOutlined,
  DeleteOutlined,
  ClearOutlined,
  PlusOutlined
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
const mockMedicalRecords = Array.from({ length: 30 }, (_, index) => {
  const genders = ['Male', 'Female'];
  const statuses = ['Completed', 'In Review', 'Pending', 'Critical'];
  const recordTypes = ['Consultation', 'Lab Result', 'Prescription', 'Surgical Report', 'Imaging'];
  const departments = ['Cardiology', 'Neurology', 'Pediatrics', 'Orthopedics', 'General Medicine'];
  const diagnoses = ['Hypertension', 'Migraine', 'Asthma', 'Fracture', 'Diabetes Type II', 'Anemia', 'Flu', 'Arrhythmia'];
  const bloodGroups = ['A+', 'A-', 'B+', 'B-', 'O+', 'O-', 'AB+', 'AB-'];

  const dateStr = `2026-07-${(index % 28 + 1).toString().padStart(2, '0')}`;

  return {
    recordId: `MR-${5000 + index}`,
    patientName: `Patient Name ${index + 1}`,
    age: Math.floor(Math.random() * 60) + 18,
    gender: genders[index % genders.length],
    bloodGroup: bloodGroups[index % bloodGroups.length],
    doctor: 'Dr. Sarah Smith',
    department: departments[index % departments.length],
    diagnosis: diagnoses[index % diagnoses.length],
    recordType: recordTypes[index % recordTypes.length],
    visitDate: dateStr,
    createdAt: `${dateStr}T10:00:00Z`,
    status: statuses[index % statuses.length],
  };
});

const statusColors = {
  'Completed': { color: '#10b981', bg: 'rgba(16,185,129,0.1)' },
  'In Review': { color: '#3b82f6', bg: 'rgba(59,130,246,0.1)' },
  'Pending': { color: '#f59e0b', bg: 'rgba(245,158,11,0.1)' },
  'Critical': { color: '#ef4444', bg: 'rgba(239,68,68,0.1)' }
};

const SORT_OPTIONS = [
  { value: "newest", label: "Newest Records" },
  { value: "oldest", label: "Oldest Records" },
  { value: "name_asc", label: "Patient Name A-Z" },
  { value: "doctor_asc", label: "Doctor Name A-Z" },
  { value: "department_asc", label: "Department A-Z" },
  { value: "status_asc", label: "Status" },
];

const MedicalRecords = () => {
  const toast = useToast();

  const [loading, setLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const [isEmpty, setIsEmpty] = useState(false);

  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [typeFilter, setTypeFilter] = useState("All");
  const [deptFilter, setDeptFilter] = useState("All");
  const [sort, setSort] = useState("newest");

  const [deleteModalVisible, setDeleteModalVisible] = useState(false);
  const [selectedRecord, setSelectedRecord] = useState(null);

  useEffect(() => {
    // 1-second simulated loading state
    const timer = setTimeout(() => setLoading(false), 1000);
    return () => clearTimeout(timer);
  }, []);

  const baseData = isEmpty ? [] : mockMedicalRecords;

  const searchedData = useSearch(baseData, search, ["recordId", "patientName", "doctor", "diagnosis", "department", "recordType", "status"]);

  const filters = useMemo(() => ({
    status: statusFilter === "All" ? undefined : statusFilter,
    recordType: typeFilter === "All" ? undefined : typeFilter,
    department: deptFilter === "All" ? undefined : deptFilter,
  }), [statusFilter, typeFilter, deptFilter]);

  const filteredData = useFilter(searchedData, filters);

  const sortConfig = useMemo(() => {
    switch (sort) {
      case "name_asc": return { key: "patientName", direction: "asc" };
      case "doctor_asc": return { key: "doctor", direction: "asc" };
      case "department_asc": return { key: "department", direction: "asc" };
      case "status_asc": return { key: "status", direction: "asc" };
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
    } else if (type === 'view') {
      toast.success("Medical record opened for viewing.");
    } else if (type === 'edit') {
      toast.success("Medical record opened in edit mode.");
    } else if (type === 'download') {
      toast.success("Medical record downloaded as PDF.");
    }
  };

  const confirmDelete = () => {
    setDeleteModalVisible(false);
    toast.success("Medical record securely deleted.");
  };

  const columns = [
    { title: 'Record ID', dataIndex: 'recordId', key: 'recordId', render: text => <strong style={{ color: '#0f8a8f' }}>{text}</strong> },
    { title: 'Patient Name', dataIndex: 'patientName', key: 'patientName', render: text => <strong>{text}</strong> },
    { title: 'Age', dataIndex: 'age', key: 'age' },
    { title: 'Gender', dataIndex: 'gender', key: 'gender', render: text => <Text type="secondary">{text}</Text> },
    { title: 'Doctor', dataIndex: 'doctor', key: 'doctor' },
    { title: 'Department', dataIndex: 'department', key: 'department', render: text => <Tag color="blue">{text}</Tag> },
    { title: 'Diagnosis', dataIndex: 'diagnosis', key: 'diagnosis' },
    { title: 'Record Type', dataIndex: 'recordType', key: 'recordType' },
    { title: 'Visit Date', dataIndex: 'visitDate', key: 'visitDate' },
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
          <Tooltip title="View Record"><Button type="text" icon={<EyeOutlined />} style={{ color: '#3b82f6' }} onClick={() => handleAction('view', record)} /></Tooltip>
          <Tooltip title="Edit Record"><Button type="text" icon={<EditOutlined />} style={{ color: '#f59e0b' }} onClick={() => handleAction('edit', record)} /></Tooltip>
          <Tooltip title="Download PDF"><Button type="text" icon={<DownloadOutlined />} style={{ color: '#10b981' }} onClick={() => handleAction('download', record)} /></Tooltip>
          <Tooltip title="Delete"><Button type="text" icon={<DeleteOutlined />} style={{ color: '#ef4444' }} onClick={() => handleAction('delete', record)} /></Tooltip>
        </Space>
      ),
    },
  ];

  return (
    <>
      <LoadingOverlay loading={loading} text="Fetching Medical Records..." />
      <DashboardLayout>
        {loading ? (
          <DashboardSkeleton />
        ) : isError ? (
          <ErrorState
            title="Failed to Load Records"
            description="We encountered an issue fetching the medical records directory. Please reconnect."
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
              <Button size="small" onClick={() => setIsEmpty(!isEmpty)}>{isEmpty ? 'Restore Records' : 'Simulate Empty State'}</Button>
              <Button size="small" danger onClick={() => setIsError(true)}>Simulate Error</Button>
            </div>

            {/* Hero Section */}
            <motion.div className="admin-header" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
              <div>
                <h1 className="welcome-heading">Doctor Medical Records</h1>
                <p className="welcome-sub">View, manage and update patient medical records.</p>
              </div>
              <Space>
                <Button type="default" icon={<ExportOutlined />} size="large" style={{ borderRadius: '8px' }}>Export Records</Button>
                <Button type="primary" icon={<PlusOutlined />} size="large" style={{ borderRadius: '8px' }}>Add Record</Button>
              </Space>
            </motion.div>

            {/* KPI Cards */}
            <div className="stat-charts-row" style={{ marginTop: '0', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '20px' }}>
              <StatCardChart title="Total Records" value="3,214" icon={<FolderOpenOutlined />} trend="+42 this month" trendColor="#10b981" />
              <StatCardChart title="Today's Consultations" value="18" icon={<FileDoneOutlined />} trend="On schedule" trendColor="#0f8a8f" />
              <StatCardChart title="Lab Reports Pending" value="7" icon={<ExperimentOutlined />} trend="Processing" trendColor="#f59e0b" />
              <StatCardChart title="Critical Cases" value="4" icon={<WarningOutlined />} trend="Requires attention" trendColor="#ef4444" />
            </div>

            {/* Search, Filters & Sort */}
            <motion.div className="table-card-wrapper" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
              <div className="filter-row-section">
                <div className="filter-group">
                  <Input
                    prefix={<SearchOutlined style={{ color: '#bfbfbf' }} />}
                    placeholder="Search Record ID, Patient... "
                    allowClear
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    style={{ width: '280px', borderRadius: '8px' }}
                  />
                  <Select value={statusFilter} onChange={setStatusFilter} style={{ width: '130px' }}>
                    <Option value="All">Any Status</Option>
                    <Option value="Completed">Completed</Option>
                    <Option value="In Review">In Review</Option>
                    <Option value="Pending">Pending</Option>
                    <Option value="Critical">Critical</Option>
                  </Select>
                  <Select value={typeFilter} onChange={setTypeFilter} style={{ width: '150px' }}>
                    <Option value="All">All Types</Option>
                    <Option value="Consultation">Consultation</Option>
                    <Option value="Lab Result">Lab Result</Option>
                    <Option value="Prescription">Prescription</Option>
                    <Option value="Surgical Report">Surgical Report</Option>
                    <Option value="Imaging">Imaging</Option>
                  </Select>
                  <Select value={deptFilter} onChange={setDeptFilter} style={{ width: '150px' }}>
                    <Option value="All">All Departments</Option>
                    <Option value="Cardiology">Cardiology</Option>
                    <Option value="Neurology">Neurology</Option>
                    <Option value="Pediatrics">Pediatrics</Option>
                    <Option value="Orthopedics">Orthopedics</Option>
                    <Option value="General Medicine">General Medicine</Option>
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
                    setStatusFilter("All");
                    setTypeFilter("All");
                    setDeptFilter("All");
                    setSort("newest");
                  }}>Clear</Button>
                </div>
              </div>

              {sortedData.length === 0 ? (
                <EmptyState
                  title="No Medical Records Found"
                  description={isEmpty ? "There are currently zero records inside the repository." : "No records match your filters."}
                />
              ) : (
                <>
                  {/* Records Table */}
                  <Table
                    columns={columns}
                    dataSource={paginatedData}
                    rowKey="recordId"
                    pagination={false}
                    scroll={{ x: 1500 }}
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

      {/* Delete Record Modal */}
      <ConfirmationModal
        visible={deleteModalVisible}
        title="Delete Medical Record"
        description={`Are you sure you want to delete the clinical record for ${selectedRecord?.patientName}? This action permanently modifies core PRANACORE archives.`}
        type="danger"
        confirmText="Confirm Delete"
        cancelText="Abort"
        onConfirm={confirmDelete}
        onCancel={() => setDeleteModalVisible(false)}
      />
    </>
  );
};

export default MedicalRecords;
