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
  CalendarOutlined,
  CloseCircleOutlined,
  ClearOutlined,
  ClockCircleOutlined,
  CheckCircleOutlined,
  SyncOutlined
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
const mockAppointments = Array.from({ length: 30 }, (_, index) => {
  const statuses = ['Completed', 'Pending', 'Cancelled', 'Confirmed'];
  const types = ['Consultation', 'Follow-up', 'Surgery', 'Check-up', 'Emergency'];
  const payments = ['Paid', 'Unpaid', 'Pending'];
  const doctors = ['Dr. Sarah Smith', 'Dr. Mark Lee', 'Dr. Alice Chen', 'Dr. Bob White', 'Dr. Michael Brown'];
  const departments = ['Cardiology', 'Neurology', 'Pediatrics', 'Orthopedics', 'Oncology'];

  return {
    id: `APT-${1420 + index}`,
    patient: `Patient Name ${index + 1}`,
    doctor: doctors[index % doctors.length],
    department: departments[index % departments.length],
    date: `2026-07-${(index % 30 + 1).toString().padStart(2, '0')}`,
    time: `${(8 + (index % 10)).toString().padStart(2, '0')}:00 ${index % 2 === 0 ? 'AM' : 'PM'}`,
    type: types[index % types.length],
    payment: payments[index % payments.length],
    status: statuses[index % statuses.length],
    createdAt: `2026-06-${(index % 30 + 1).toString().padStart(2, '0')}T10:00:00Z`
  };
});

const statusColors = {
  Completed: { color: '#10b981', bg: 'rgba(16,185,129,0.1)' },
  Confirmed: { color: '#0f8a8f', bg: 'rgba(15,138,143,0.1)' },
  Pending: { color: '#f59e0b', bg: 'rgba(245,158,11,0.1)' },
  Cancelled: { color: '#ef4444', bg: 'rgba(239,68,68,0.1)' },
};

const paymentConfig = {
  Paid: 'success',
  Unpaid: 'error',
  Pending: 'warning'
};

const SORT_OPTIONS = [
  { value: "newest", label: "Newest First" },
  { value: "oldest", label: "Oldest First" },
  { value: "patient_asc", label: "Patient Name A-Z" },
  { value: "doctor_asc", label: "Doctor Name A-Z" },
  { value: "date_asc", label: "Appointment Date" },
  { value: "status_asc", label: "Status" },
];

const Appointments = () => {
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
  const [appointmentToDelete, setAppointmentToDelete] = useState(null);

  useEffect(() => {
    // 1-second simulated loading state
    const timer = setTimeout(() => setLoading(false), 1000);
    return () => clearTimeout(timer);
  }, []);

  const baseData = isEmpty ? [] : mockAppointments;

  const searchedData = useSearch(baseData, search, ["id", "patient", "doctor", "department", "status"]);

  const filters = useMemo(() => ({
    department: deptFilter === "All" ? undefined : deptFilter,
    doctor: doctorFilter === "All" ? undefined : doctorFilter,
    status: statusFilter === "All" ? undefined : statusFilter,
    type: typeFilter === "All" ? undefined : typeFilter,
  }), [deptFilter, doctorFilter, statusFilter, typeFilter]);

  const filteredData = useFilter(searchedData, filters);

  const sortConfig = useMemo(() => {
    switch (sort) {
      case "patient_asc": return { key: "patient", direction: "asc" };
      case "doctor_asc": return { key: "doctor", direction: "asc" };
      case "newest": return { key: "createdAt", direction: "desc" };
      case "oldest": return { key: "createdAt", direction: "asc" };
      case "date_asc": return { key: "date", direction: "desc" };
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
    setAppointmentToDelete(record);
    setDeleteModalVisible(true);
  };

  const confirmDelete = () => {
    setDeleteModalVisible(false);
    toast.success("Appointment deleted successfully");
  };

  const handleReschedule = () => toast.success("Appointment rescheduled");
  const handleCancel = () => toast.success("Appointment cancelled");

  const columns = [
    { title: 'Appointment ID', dataIndex: 'id', key: 'id', render: text => <strong style={{ color: '#0f8a8f' }}>{text}</strong> },
    { title: 'Patient', dataIndex: 'patient', key: 'patient', render: text => <strong>{text}</strong> },
    { title: 'Doctor', dataIndex: 'doctor', key: 'doctor' },
    { title: 'Department', dataIndex: 'department', key: 'department', render: cat => <Tag color="blue">{cat}</Tag> },
    { title: 'Date', dataIndex: 'date', key: 'date' },
    { title: 'Time', dataIndex: 'time', key: 'time' },
    { title: 'Type', dataIndex: 'type', key: 'type', render: t => <span style={{ color: '#64748b' }}>{t}</span> },
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
      title: 'Payment',
      dataIndex: 'payment',
      key: 'payment',
      render: status => <Tag color={paymentConfig[status]}>{status}</Tag>
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (_, record) => (
        <Space size="middle">
          <Tooltip title="View"><Button type="text" icon={<EyeOutlined />} style={{ color: '#1890ff' }} /></Tooltip>
          <Tooltip title="Reschedule"><Button type="text" icon={<SyncOutlined />} style={{ color: '#f59e0b' }} onClick={handleReschedule} /></Tooltip>
          <Tooltip title="Cancel"><Button type="text" icon={<CloseCircleOutlined />} style={{ color: '#ef4444' }} onClick={handleCancel} /></Tooltip>
          <Tooltip title="Delete"><Button type="text" icon={<DeleteOutlined />} style={{ color: '#ff4d4f' }} onClick={() => handleDeleteClick(record)} /></Tooltip>
        </Space>
      ),
    },
  ];

  // Distinct arrays for filters
  const allDepts = Array.from(new Set(mockAppointments.map(d => d.department)));
  const allDoctors = Array.from(new Set(mockAppointments.map(d => d.doctor)));
  const allTypes = Array.from(new Set(mockAppointments.map(d => d.type)));

  return (
    <>
      <LoadingOverlay loading={loading} text="Loading Appointments Database..." />
      <DashboardLayout>
        {loading ? (
          <DashboardSkeleton />
        ) : isError ? (
          <ErrorState
            title="Failed to Load Appointments"
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
                <h1 className="welcome-heading">Appointment Management</h1>
                <p className="welcome-sub">Manage hospital appointments, schedules, consultations, and patient bookings.</p>
                <Space style={{ marginTop: '8px' }}>
                  <Tag color="processing">Total Appointments: 30</Tag>
                  <Tag color="warning">Today's Appointments: 15</Tag>
                  <Tag color="success">Completed Today: 10</Tag>
                  <Tag color="default">Pending Today: 5</Tag>
                </Space>
              </div>
              <Space>
                <Button type="default" icon={<ExportOutlined />} size="large" style={{ borderRadius: '8px' }}>Export Appointments</Button>
                <Button type="primary" icon={<PlusOutlined />} size="large" style={{ borderRadius: '8px' }}>New Appointment</Button>
              </Space>
            </motion.div>

            {/* 2. KPI Cards */}
            <div className="stat-charts-row" style={{ marginTop: '0', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '20px' }}>
              <StatCardChart title="Today's Appointments" value="15" icon={<CalendarOutlined />} trend="Stable Volume" trendColor="#10b981" />
              <StatCardChart title="Completed" value="10" icon={<CheckCircleOutlined />} trend="+12 this month" trendColor="#10b981" />
              <StatCardChart title="Pending" value="5" icon={<ClockCircleOutlined />} trend="-1 since yesterday" trendColor="#f59e0b" />
              <StatCardChart title="Cancelled" value="2" icon={<CloseCircleOutlined />} trend="Within limits" trendColor="#ef4444" />
            </div>

            {/* 3. Search & 4. Filters & 5. Sort */}
            <motion.div className="table-card-wrapper" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
              <div className="filter-row-section">
                <div className="filter-group">
                  <Input
                    prefix={<SearchOutlined style={{ color: '#bfbfbf' }} />}
                    placeholder="Search ID, Patient, Doctor, Dept..."
                    allowClear
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    style={{ width: '280px', borderRadius: '8px' }}
                  />
                  <Select value={deptFilter} onChange={setDeptFilter} style={{ width: '150px' }} showSearch>
                    <Option value="All">All Departments</Option>
                    {allDepts.map(d => <Option key={d} value={d}>{d}</Option>)}
                  </Select>
                  <Select value={doctorFilter} onChange={setDoctorFilter} style={{ width: '160px' }} showSearch>
                    <Option value="All">All Doctors</Option>
                    {allDoctors.map(d => <Option key={d} value={d}>{d}</Option>)}
                  </Select>
                  <Select value={statusFilter} onChange={setStatusFilter} style={{ width: '130px' }}>
                    <Option value="All">Any Status</Option>
                    <Option value="Completed">Completed</Option>
                    <Option value="Pending">Pending</Option>
                    <Option value="Confirmed">Confirmed</Option>
                    <Option value="Cancelled">Cancelled</Option>
                  </Select>
                  <Select value={typeFilter} onChange={setTypeFilter} style={{ width: '130px' }}>
                    <Option value="All">Any Type</Option>
                    {allTypes.map(t => <Option key={t} value={t}>{t}</Option>)}
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
                    setDoctorFilter("All");
                    setStatusFilter("All");
                    setTypeFilter("All");
                    setSort("newest");
                  }}>Clear</Button>
                </div>
              </div>

              {/* Table / Empty State block */}
              {sortedData.length === 0 ? (
                <EmptyState
                  title="No Appointments Found"
                  description={isEmpty ? "There are no registered appointments." : "No appointments match your current search and filter criteria."}
                />
              ) : (
                <>
                  {/* 6. Appointments Table */}
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
        title="Delete Appointment"
        description={`Are you sure you want to delete appointment ${appointmentToDelete?.id}? This action cannot be undone.`}
        type="danger"
        confirmText="Delete"
        cancelText="Cancel"
        onConfirm={confirmDelete}
        onCancel={() => setDeleteModalVisible(false)}
      />
    </>
  );
};

export default Appointments;
