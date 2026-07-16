import React, { useState, useMemo, useEffect } from 'react';
import { Input, Select, Table, Button, Tag, Space, Pagination, Tooltip, Typography } from 'antd';
import {
  SearchOutlined,
  SortAscendingOutlined,
  ExportOutlined,
  CalendarOutlined,
  CheckCircleOutlined,
  ClockCircleOutlined,
  CloseCircleOutlined,
  EyeOutlined,
  VideoCameraOutlined,
  SyncOutlined,
  DeleteOutlined,
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
const { Text } = Typography;

// --- Mock Data ---
const mockAppointments = Array.from({ length: 30 }, (_, index) => {
  const genders = ['Male', 'Female'];
  const statuses = ['Pending', 'Completed', 'Cancelled', 'In Progress'];
  const priorities = ['Normal', 'High', 'Urgent'];
  const consultationTypes = ['General', 'Follow-up', 'Consultation', 'Emergency'];
  const departments = ['Cardiology', 'Neurology', 'Pediatrics', 'Orthopedics', 'General Medicine'];
  const paymentStatuses = ['Paid', 'Pending', 'Failed'];
  const dateStr = `2026-07-${(index % 28 + 1).toString().padStart(2, '0')}`;

  return {
    appointmentId: `APT-${4000 + index}`,
    tokenNumber: `T-${(index % 50) + 1}`,
    patientName: `Patient Name ${index + 1}`,
    age: Math.floor(Math.random() * 60) + 18,
    gender: genders[index % genders.length],
    doctor: 'Dr. Sarah Smith',
    department: departments[index % departments.length],
    appointmentDate: dateStr,
    appointmentTime: `${(9 + (index % 8)).toString().padStart(2, '0')}:00 AM`,
    createdAt: `${dateStr}T10:00:00Z`,
    consultationType: consultationTypes[index % consultationTypes.length],
    status: statuses[index % statuses.length],
    priority: priorities[index % priorities.length],
    paymentStatus: paymentStatuses[index % paymentStatuses.length],
    phone: `+1 (555) 000-${(1000 + index).toString().slice(-4)}`,
    reason: 'Routine checkup and consultation details',
    room: `Room ${101 + (index % 20)}`
  };
});

const statusColors = {
  'In Progress': { color: '#0f8a8f', bg: 'rgba(15,138,143,0.1)' },
  'Completed': { color: '#10b981', bg: 'rgba(16,185,129,0.1)' },
  'Pending': { color: '#f59e0b', bg: 'rgba(245,158,11,0.1)' },
  'Cancelled': { color: '#ef4444', bg: 'rgba(239,68,68,0.1)' }
};
const priorityColors = {
  'Normal': 'blue',
  'High': 'orange',
  'Urgent': 'red'
};

const SORT_OPTIONS = [
  { value: "newest", label: "Newest Appointments" },
  { value: "oldest", label: "Oldest Appointments" },
  { value: "name_asc", label: "Patient Name A-Z" },
  { value: "time_asc", label: "Appointment Time A-Z" },
  { value: "status_asc", label: "Status" },
];

const Appointments = () => {
  const toast = useToast();

  const [loading, setLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const [isEmpty, setIsEmpty] = useState(false);

  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [priorityFilter, setPriorityFilter] = useState("All");
  const [typeFilter, setTypeFilter] = useState("All");
  const [sort, setSort] = useState("newest");

  const [deleteModalVisible, setDeleteModalVisible] = useState(false);
  const [selectedRecord, setSelectedRecord] = useState(null);

  useEffect(() => {
    // 1-second simulated loading state
    const timer = setTimeout(() => setLoading(false), 1000);
    return () => clearTimeout(timer);
  }, []);

  const baseData = isEmpty ? [] : mockAppointments;

  const searchedData = useSearch(baseData, search, ["appointmentId", "patientName", "phone", "department", "reason", "tokenNumber"]);

  const filters = useMemo(() => ({
    status: statusFilter === "All" ? undefined : statusFilter,
    priority: priorityFilter === "All" ? undefined : priorityFilter,
    consultationType: typeFilter === "All" ? undefined : typeFilter,
  }), [statusFilter, priorityFilter, typeFilter]);

  const filteredData = useFilter(searchedData, filters);

  const sortConfig = useMemo(() => {
    switch (sort) {
      case "name_asc": return { key: "patientName", direction: "asc" };
      case "time_asc": return { key: "appointmentTime", direction: "asc" };
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
    if (type === 'cancel') {
      setSelectedRecord(record);
      setDeleteModalVisible(true);
    } else if (type === 'view') {
      toast.success("Appointment details opened successfully.");
    } else if (type === 'consultation') {
      toast.success(`Starting consultation window for ${record.patientName}`);
    } else if (type === 'reschedule') {
      toast.success("Rescheduling workflow initiated.");
    }
  };

  const confirmCancel = () => {
    setDeleteModalVisible(false);
    toast.success("Appointment has been successfully cancelled.");
  };

  const columns = [
    { title: 'ID', dataIndex: 'appointmentId', key: 'appointmentId', render: text => <strong style={{ color: '#0f8a8f' }}>{text}</strong> },
    { title: 'Token', dataIndex: 'tokenNumber', key: 'tokenNumber', render: text => <Tag color="cyan">{text}</Tag> },
    { title: 'Patient', dataIndex: 'patientName', key: 'patientName', render: text => <strong>{text}</strong> },
    { title: 'Age', dataIndex: 'age', key: 'age' },
    { title: 'Gender', dataIndex: 'gender', key: 'gender', render: text => <Text type="secondary">{text}</Text> },
    { title: 'Department', dataIndex: 'department', key: 'department', render: text => <Text type="secondary">{text}</Text> },
    { title: 'Date', dataIndex: 'appointmentDate', key: 'appointmentDate' },
    { title: 'Time', dataIndex: 'appointmentTime', key: 'appointmentTime', render: text => <strong>{text}</strong> },
    { title: 'Type', dataIndex: 'consultationType', key: 'consultationType' },
    { title: 'Priority', dataIndex: 'priority', key: 'priority', render: priority => <Tag color={priorityColors[priority]}>{priority}</Tag> },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      render: status => {
        const config = statusColors[status] || { color: '#64748b', bg: '#f1f5f9' };
        return <span style={{ color: config.color, background: config.bg, padding: '4px 12px', borderRadius: '12px', fontSize: '0.8rem', fontWeight: 600 }}>{status}</span>;
      }
    },
    { title: 'Payment', dataIndex: 'paymentStatus', key: 'paymentStatus', render: text => <Text strong type={text === 'Paid' ? 'success' : 'danger'}>{text}</Text> },
    { title: 'Room', dataIndex: 'room', key: 'room' },
    {
      title: 'Actions',
      key: 'actions',
      render: (_, record) => (
        <Space size="small">
          <Tooltip title="View Details"><Button type="text" icon={<EyeOutlined />} style={{ color: '#3b82f6' }} onClick={() => handleAction('view', record)} /></Tooltip>
          <Tooltip title="Start Consultation"><Button type="text" icon={<VideoCameraOutlined />} style={{ color: '#10b981' }} onClick={() => handleAction('consultation', record)} /></Tooltip>
          <Tooltip title="Reschedule"><Button type="text" icon={<SyncOutlined />} style={{ color: '#f59e0b' }} onClick={() => handleAction('reschedule', record)} /></Tooltip>
          <Tooltip title="Cancel"><Button type="text" icon={<DeleteOutlined />} style={{ color: '#ef4444' }} onClick={() => handleAction('cancel', record)} /></Tooltip>
        </Space>
      ),
    },
  ];

  return (
    <>
      <LoadingOverlay loading={loading} text="Fetching Appointment Data..." />
      <DashboardLayout>
        {loading ? (
          <DashboardSkeleton />
        ) : isError ? (
          <ErrorState
            title="Failed to Load Appointments"
            description="We encountered an issue fetching today's allocated schedules. Please refresh."
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
              <Button size="small" onClick={() => setIsEmpty(!isEmpty)}>{isEmpty ? 'Restore Appointments' : 'Simulate Empty State'}</Button>
              <Button size="small" danger onClick={() => setIsError(true)}>Simulate Error</Button>
            </div>

            {/* Hero Section */}
            <motion.div className="admin-header" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
              <div>
                <h1 className="welcome-heading">Doctor Appointments</h1>
                <p className="welcome-sub">View and manage today's appointments securely.</p>
              </div>
              <Space>
                <Button type="default" icon={<ExportOutlined />} size="large" style={{ borderRadius: '8px' }}>Export</Button>
                <Button type="primary" icon={<CalendarOutlined />} size="large" style={{ borderRadius: '8px' }}>View Schedule</Button>
              </Space>
            </motion.div>

            {/* KPI Cards */}
            <div className="stat-charts-row" style={{ marginTop: '0', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '20px' }}>
              <StatCardChart title="Today's Appointments" value="18" icon={<CalendarOutlined />} trend="+3 vs yesterday" trendColor="#10b981" />
              <StatCardChart title="Completed" value="5" icon={<CheckCircleOutlined />} trend="On schedule" trendColor="#0f8a8f" />
              <StatCardChart title="Pending" value="11" icon={<ClockCircleOutlined />} trend="Awaiting consultation" trendColor="#f59e0b" />
              <StatCardChart title="Cancelled" value="2" icon={<CloseCircleOutlined />} trend="Notice cleared" trendColor="#64748b" />
            </div>

            {/* Search, Filters & Sort */}
            <motion.div className="table-card-wrapper" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
              <div className="filter-row-section">
                <div className="filter-group">
                  <Input
                    prefix={<SearchOutlined style={{ color: '#bfbfbf' }} />}
                    placeholder="Search Patient, ID, Phone, Token..."
                    allowClear
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    style={{ width: '280px', borderRadius: '8px' }}
                  />
                  <Select value={statusFilter} onChange={setStatusFilter} style={{ width: '130px' }}>
                    <Option value="All">Any Status</Option>
                    <Option value="Pending">Pending</Option>
                    <Option value="In Progress">In Progress</Option>
                    <Option value="Completed">Completed</Option>
                    <Option value="Cancelled">Cancelled</Option>
                  </Select>
                  <Select value={priorityFilter} onChange={setPriorityFilter} style={{ width: '130px' }}>
                    <Option value="All">Any Priority</Option>
                    <Option value="Normal">Normal</Option>
                    <Option value="High">High</Option>
                    <Option value="Urgent">Urgent</Option>
                  </Select>
                  <Select value={typeFilter} onChange={setTypeFilter} style={{ width: '160px' }}>
                    <Option value="All">All Types</Option>
                    <Option value="General">General</Option>
                    <Option value="Follow-up">Follow-up</Option>
                    <Option value="Consultation">Consultation</Option>
                    <Option value="Emergency">Emergency</Option>
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
                    setPriorityFilter("All");
                    setTypeFilter("All");
                    setSort("newest");
                  }}>Clear</Button>
                </div>
              </div>

              {sortedData.length === 0 ? (
                <EmptyState
                  title="No Appointments Found"
                  description={isEmpty ? "Your schedule currently contains zero appointments." : "No appointments match your filters."}
                />
              ) : (
                <>
                  {/* Appointments Table */}
                  <Table
                    columns={columns}
                    dataSource={paginatedData}
                    rowKey="appointmentId"
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

      {/* Cancel Appointment Modal */}
      <ConfirmationModal
        visible={deleteModalVisible}
        title="Cancel Appointment"
        description={`Are you sure you want to cancel the appointment for ${selectedRecord?.patientName}? This action updates the system logs irrevocably.`}
        type="danger"
        confirmText="Confirm Cancel"
        cancelText="Abort"
        onConfirm={confirmCancel}
        onCancel={() => setDeleteModalVisible(false)}
      />
    </>
  );
};

export default Appointments;
