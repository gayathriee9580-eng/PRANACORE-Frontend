import React, { useState, useMemo, useEffect } from 'react';
import { Input, Select, Table, Button, Tag, Space, Pagination, Tooltip } from 'antd';
import {
  SearchOutlined,
  SortAscendingOutlined,
  PlusOutlined,
  ExportOutlined,
  EyeOutlined,
  EditOutlined,
  DeleteOutlined,
  DownloadOutlined,
  FileTextOutlined,
  FolderOpenOutlined,
  CheckCircleOutlined,
  SyncOutlined,
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

// --- Mock Data ---
const mockRecords = Array.from({ length: 30 }, (_, index) => {
  const statuses = ['Active', 'Closed', 'Archived'];
  const types = ['Lab Report', 'Prescription', 'Diagnostic', 'Check-up Notes', 'Discharge Summary'];
  const doctors = ['Dr. Sarah Smith', 'Dr. Mark Lee', 'Dr. Alice Chen', 'Dr. Bob White', 'Dr. Michael Brown'];
  const departments = ['Cardiology', 'Neurology', 'Pediatrics', 'Orthopedics', 'Oncology'];
  const diagnoses = ['Hypertension', 'Migraine', 'Viral Fever', 'Fracture', 'Asthma', 'Diabetes', 'Anemia'];

  return {
    id: `MR-${5000 + index}`,
    patient: `Patient Name ${index + 1}`,
    doctor: doctors[index % doctors.length],
    department: departments[index % departments.length],
    diagnosis: diagnoses[index % diagnoses.length],
    recordType: types[index % types.length],
    status: statuses[index % statuses.length],
    createdDate: `2026-06-${(index % 30 + 1).toString().padStart(2, '0')}`,
    updatedDate: `2026-07-${(index % 15 + 1).toString().padStart(2, '0')}`,
    createdAt: `2026-06-${(index % 30 + 1).toString().padStart(2, '0')}T10:00:00Z`
  };
});

const statusColors = {
  Active: { color: '#0f8a8f', bg: 'rgba(15,138,143,0.1)' },
  Closed: { color: '#10b981', bg: 'rgba(16,185,129,0.1)' },
  Archived: { color: '#64748b', bg: 'rgba(100,116,139,0.1)' },
};

const SORT_OPTIONS = [
  { value: "newest", label: "Newest First" },
  { value: "oldest", label: "Oldest First" },
  { value: "patient_asc", label: "Patient Name A-Z" },
  { value: "doctor_asc", label: "Doctor Name A-Z" },
  { value: "diagnosis_asc", label: "Diagnosis A-Z" },
  { value: "status_asc", label: "Status" },
];

const MedicalRecords = () => {
  const toast = useToast();

  const [loading, setLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const [isEmpty, setIsEmpty] = useState(false);

  const [search, setSearch] = useState("");
  const [deptFilter, setDeptFilter] = useState("All");
  const [doctorFilter, setDoctorFilter] = useState("All");
  const [statusFilter, setStatusFilter] = useState("All");
  const [typeFilter, setTypeFilter] = useState("All");
  const [sort, setSort] = useState("newest");

  const [deleteModalVisible, setDeleteModalVisible] = useState(false);
  const [recordToDelete, setRecordToDelete] = useState(null);

  useEffect(() => {
    // 1-second simulated loading state
    const timer = setTimeout(() => setLoading(false), 1000);
    return () => clearTimeout(timer);
  }, []);

  const baseData = isEmpty ? [] : mockRecords;

  const searchedData = useSearch(baseData, search, ["id", "patient", "doctor", "diagnosis", "department", "recordType"]);

  const filters = useMemo(() => ({
    department: deptFilter === "All" ? undefined : deptFilter,
    doctor: doctorFilter === "All" ? undefined : doctorFilter,
    status: statusFilter === "All" ? undefined : statusFilter,
    recordType: typeFilter === "All" ? undefined : typeFilter,
  }), [deptFilter, doctorFilter, statusFilter, typeFilter]);

  const filteredData = useFilter(searchedData, filters);

  const sortConfig = useMemo(() => {
    switch (sort) {
      case "patient_asc": return { key: "patient", direction: "asc" };
      case "doctor_asc": return { key: "doctor", direction: "asc" };
      case "newest": return { key: "createdAt", direction: "desc" };
      case "oldest": return { key: "createdAt", direction: "asc" };
      case "diagnosis_asc": return { key: "diagnosis", direction: "asc" };
      case "status_asc": return { key: "status", direction: "asc" };
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
    setRecordToDelete(record);
    setDeleteModalVisible(true);
  };

  const confirmDelete = () => {
    setDeleteModalVisible(false);
    toast.success("Medical record deleted successfully");
  };

  const handleDownload = () => toast.success("Medical record downloaded");
  const handleEdit = () => toast.success("Medical record updated");

  const columns = [
    { title: 'Record ID', dataIndex: 'id', key: 'id', render: text => <strong style={{ color: '#0f8a8f' }}>{text}</strong> },
    { title: 'Patient', dataIndex: 'patient', key: 'patient', render: text => <strong>{text}</strong> },
    { title: 'Doctor', dataIndex: 'doctor', key: 'doctor' },
    { title: 'Department', dataIndex: 'department', key: 'department', render: cat => <Tag color="blue">{cat}</Tag> },
    { title: 'Diagnosis', dataIndex: 'diagnosis', key: 'diagnosis' },
    { title: 'Record Type', dataIndex: 'recordType', key: 'recordType', render: t => <span style={{ color: '#64748b' }}>{t}</span> },
    { title: 'Created Date', dataIndex: 'createdDate', key: 'createdDate' },
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
        <Space size="middle">
          <Tooltip title="View"><Button type="text" icon={<EyeOutlined />} style={{ color: '#1890ff' }} /></Tooltip>
          <Tooltip title="Download"><Button type="text" icon={<DownloadOutlined />} style={{ color: '#10b981' }} onClick={handleDownload} /></Tooltip>
          <Tooltip title="Edit"><Button type="text" icon={<EditOutlined />} style={{ color: '#f59e0b' }} onClick={handleEdit} /></Tooltip>
          <Tooltip title="Delete"><Button type="text" icon={<DeleteOutlined />} style={{ color: '#ff4d4f' }} onClick={() => handleDeleteClick(record)} /></Tooltip>
        </Space>
      ),
    },
  ];

  const allDepts = Array.from(new Set(mockRecords.map(d => d.department)));
  const allDoctors = Array.from(new Set(mockRecords.map(d => d.doctor)));
  const allTypes = Array.from(new Set(mockRecords.map(d => d.recordType)));

  return (
    <>
      <LoadingOverlay loading={loading} text="Loading Medical Records Database..." />
      <DashboardLayout>
        {loading ? (
          <DashboardSkeleton />
        ) : isError ? (
          <ErrorState
            title="Failed to Load Medical Records"
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

            <div className="mock-controls">
              <Tag color="warning">Demo Controls</Tag>
              <Button size="small" onClick={() => setIsEmpty(!isEmpty)}>{isEmpty ? 'Restore Mock Data' : 'Simulate Empty State'}</Button>
              <Button size="small" danger onClick={() => setIsError(true)}>Simulate Error</Button>
            </div>

            {/* 1. Hero Section */}
            <motion.div className="admin-header" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
              <div>
                <h1 className="welcome-heading">Medical Records Management</h1>
                <p className="welcome-sub">Manage patient medical records, diagnoses, prescriptions, reports, and treatment history.</p>
              </div>
              <Space>
                <Button type="default" icon={<ExportOutlined />} size="large" style={{ borderRadius: '8px' }}>Export Records</Button>
                <Button type="primary" icon={<PlusOutlined />} size="large" style={{ borderRadius: '8px' }}>Add Record</Button>
              </Space>
            </motion.div>

            {/* 2. KPI Cards */}
            <div className="stat-charts-row" style={{ marginTop: '0', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '20px' }}>
              <StatCardChart title="Total Records" value="1,245" icon={<FolderOpenOutlined />} trend="+34 this week" trendColor="#10b981" />
              <StatCardChart title="Active Cases" value="284" icon={<SyncOutlined />} trend="Stable Volume" trendColor="#0f8a8f" />
              <StatCardChart title="Closed Cases" value="961" icon={<CheckCircleOutlined />} trend="+15 this month" trendColor="#10b981" />
              <StatCardChart title="Reports Generated" value="84" icon={<FileTextOutlined />} trend="+6% since last week" trendColor="#f59e0b" />
            </div>

            {/* 3, 4, 5. Search, Filters & Sort */}
            <motion.div className="table-card-wrapper" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
              <div className="filter-row-section">
                <div className="filter-group">
                  <Input
                    prefix={<SearchOutlined style={{ color: '#bfbfbf' }} />}
                    placeholder="Search Record ID, Patient..."
                    allowClear
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    style={{ width: '250px', borderRadius: '8px' }}
                  />
                  <Select value={deptFilter} onChange={setDeptFilter} style={{ width: '150px' }} showSearch>
                    <Option value="All">All Departments</Option>
                    {allDepts.map(d => <Option key={d} value={d}>{d}</Option>)}
                  </Select>
                  <Select value={doctorFilter} onChange={setDoctorFilter} style={{ width: '160px' }} showSearch>
                    <Option value="All">All Doctors</Option>
                    {allDoctors.map(d => <Option key={d} value={d}>{d}</Option>)}
                  </Select>
                  <Select value={typeFilter} onChange={setTypeFilter} style={{ width: '140px' }}>
                    <Option value="All">Any Record Type</Option>
                    {allTypes.map(t => <Option key={t} value={t}>{t}</Option>)}
                  </Select>
                  <Select value={statusFilter} onChange={setStatusFilter} style={{ width: '120px' }}>
                    <Option value="All">Any Status</Option>
                    <Option value="Active">Active</Option>
                    <Option value="Closed">Closed</Option>
                    <Option value="Archived">Archived</Option>
                  </Select>
                </div>

                <div className="filter-group">
                  <Space>
                    <SortAscendingOutlined style={{ color: '#64748b' }} />
                    <Select value={sort} onChange={setSort} style={{ width: '160px' }}>
                      {SORT_OPTIONS.map(opt => <Option key={opt.value} value={opt.value}>{opt.label}</Option>)}
                    </Select>
                  </Space>
                  <Button icon={<ClearOutlined />} onClick={() => {
                    setSearch("");
                    setDeptFilter("All");
                    setDoctorFilter("All");
                    setStatusFilter("All");
                    setTypeFilter("All");
                    setSort("newest");
                  }}>Clear</Button>
                </div>
              </div>

              {sortedData.length === 0 ? (
                <EmptyState
                  title="No Records Found"
                  description={isEmpty ? "There are no medical records in the system." : "No records match your current search and filter criteria."}
                />
              ) : (
                <>
                  {/* 6. Medical Records Table */}
                  <Table
                    columns={columns}
                    dataSource={paginatedData}
                    rowKey="id"
                    pagination={false}
                    scroll={{ x: 1300 }}
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
        title="Delete Medical Record"
        description={`Are you sure you want to delete medical record ${recordToDelete?.id}? This action cannot be undone.`}
        type="danger"
        confirmText="Delete"
        cancelText="Cancel"
        onConfirm={confirmDelete}
        onCancel={() => setDeleteModalVisible(false)}
      />
    </>
  );
};

export default MedicalRecords;
