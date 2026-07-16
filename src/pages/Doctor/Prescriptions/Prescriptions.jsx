import React, { useState, useMemo, useEffect } from 'react';
import { Input, Select, Table, Button, Tag, Space, Pagination, Tooltip, Typography } from 'antd';
import {
  SearchOutlined,
  SortAscendingOutlined,
  ExportOutlined,
  MedicineBoxOutlined,
  CheckCircleOutlined,
  ClockCircleOutlined,
  SyncOutlined,
  EyeOutlined,
  EditOutlined,
  PrinterOutlined,
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
const mockPrescriptions = Array.from({ length: 30 }, (_, i) => {
  const statuses = ['Active', 'Completed', 'Expired', 'Pending'];
  const medicationNames = ['Amoxicillin', 'Metformin', 'Amlodipine', 'Atorvastatin', 'Omeprazole', 'Lisinopril', 'Sertraline', 'Cetirizine'];
  const frequencies = ['Once daily', 'Twice daily', 'Three times daily', 'Every 8 hours', 'As needed'];
  const durations = ['7 days', '14 days', '30 days', '3 months', '6 months'];
  const departments = ['Cardiology', 'Neurology', 'Pediatrics', 'General Medicine', 'Orthopedics'];
  const dateStr = `2026-07-${(i % 28 + 1).toString().padStart(2, '0')}`;

  return {
    prescriptionId: `RX-${6000 + i}`,
    patientName: `Patient Name ${i + 1}`,
    age: Math.floor(Math.random() * 60) + 18,
    gender: i % 2 === 0 ? 'Male' : 'Female',
    medication: medicationNames[i % medicationNames.length],
    dosage: `${(i % 5 + 1) * 50} mg`,
    frequency: frequencies[i % frequencies.length],
    duration: durations[i % durations.length],
    department: departments[i % departments.length],
    diagnosis: 'Routine prescription',
    prescribedDate: dateStr,
    createdAt: `${dateStr}T09:00:00Z`,
    status: statuses[i % statuses.length],
    refillsLeft: i % 4,
  };
});

const statusStyles = {
  Active: { color: '#10b981', bg: 'rgba(16,185,129,0.1)' },
  Completed: { color: '#3b82f6', bg: 'rgba(59,130,246,0.1)' },
  Expired: { color: '#64748b', bg: '#f1f5f9' },
  Pending: { color: '#f59e0b', bg: 'rgba(245,158,11,0.1)' },
};

const SORT_OPTIONS = [
  { value: 'newest', label: 'Newest First' },
  { value: 'oldest', label: 'Oldest First' },
  { value: 'name_asc', label: 'Patient Name A-Z' },
  { value: 'medication_asc', label: 'Medication A-Z' },
  { value: 'status_asc', label: 'Status A-Z' },
];

const Prescriptions = () => {
  const toast = useToast();

  const [loading, setLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const [isEmpty, setIsEmpty] = useState(false);

  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [deptFilter, setDeptFilter] = useState('All');
  const [sort, setSort] = useState('newest');

  const [deleteModal, setDeleteModal] = useState(false);
  const [selectedRecord, setSelectedRecord] = useState(null);

  useEffect(() => {
    const t = setTimeout(() => setLoading(false), 1000);
    return () => clearTimeout(t);
  }, []);

  const baseData = isEmpty ? [] : mockPrescriptions;
  const searchedData = useSearch(baseData, search, ['prescriptionId', 'patientName', 'medication', 'diagnosis', 'department', 'status']);
  const filters = useMemo(() => ({
    status: statusFilter === 'All' ? undefined : statusFilter,
    department: deptFilter === 'All' ? undefined : deptFilter,
  }), [statusFilter, deptFilter]);
  const filteredData = useFilter(searchedData, filters);
  const sortConfig = useMemo(() => {
    switch (sort) {
      case 'name_asc': return { key: 'patientName', direction: 'asc' };
      case 'medication_asc': return { key: 'medication', direction: 'asc' };
      case 'status_asc': return { key: 'status', direction: 'asc' };
      case 'oldest': return { key: 'createdAt', direction: 'asc' };
      default: return { key: 'createdAt', direction: 'desc' };
    }
  }, [sort]);
  const sortedData = useSort(filteredData, sortConfig);
  const { paginatedData, currentPage, setPage, pageSize, setPageSize } = usePagination(sortedData, 10);

  const handleAction = (type, record) => {
    if (type === 'delete') { setSelectedRecord(record); setDeleteModal(true); }
    else if (type === 'view') toast.success('Prescription details opened.');
    else if (type === 'edit') toast.success('Prescription opened for editing.');
    else if (type === 'print') toast.success('Prescription sent to printer.');
  };

  const columns = [
    { title: 'Rx ID', dataIndex: 'prescriptionId', key: 'prescriptionId', render: t => <strong style={{ color: '#0f8a8f' }}>{t}</strong> },
    { title: 'Patient Name', dataIndex: 'patientName', key: 'patientName', render: t => <strong>{t}</strong> },
    { title: 'Age', dataIndex: 'age', key: 'age' },
    { title: 'Gender', dataIndex: 'gender', key: 'gender', render: t => <Text type="secondary">{t}</Text> },
    { title: 'Medication', dataIndex: 'medication', key: 'medication', render: t => <Tag color="purple">{t}</Tag> },
    { title: 'Dosage', dataIndex: 'dosage', key: 'dosage' },
    { title: 'Frequency', dataIndex: 'frequency', key: 'frequency' },
    { title: 'Duration', dataIndex: 'duration', key: 'duration' },
    { title: 'Department', dataIndex: 'department', key: 'department' },
    { title: 'Prescribed', dataIndex: 'prescribedDate', key: 'prescribedDate' },
    { title: 'Refills', dataIndex: 'refillsLeft', key: 'refillsLeft', render: n => <Tag color={n > 0 ? 'green' : 'default'}>{n} left</Tag> },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      render: s => {
        const c = statusStyles[s] || { color: '#64748b', bg: '#f1f5f9' };
        return <span style={{ color: c.color, background: c.bg, padding: '4px 12px', borderRadius: '12px', fontSize: '0.8rem', fontWeight: 600 }}>{s}</span>;
      }
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (_, record) => (
        <Space size="small">
          <Tooltip title="View"><Button type="text" icon={<EyeOutlined />} style={{ color: '#3b82f6' }} onClick={() => handleAction('view', record)} /></Tooltip>
          <Tooltip title="Edit"><Button type="text" icon={<EditOutlined />} style={{ color: '#f59e0b' }} onClick={() => handleAction('edit', record)} /></Tooltip>
          <Tooltip title="Print"><Button type="text" icon={<PrinterOutlined />} style={{ color: '#10b981' }} onClick={() => handleAction('print', record)} /></Tooltip>
          <Tooltip title="Delete"><Button type="text" icon={<DeleteOutlined />} style={{ color: '#ef4444' }} onClick={() => handleAction('delete', record)} /></Tooltip>
        </Space>
      ),
    },
  ];

  return (
    <>
      <LoadingOverlay loading={loading} text="Loading Prescriptions..." />
      <DashboardLayout>
        {loading ? <DashboardSkeleton /> : isError ? (
          <ErrorState title="Failed to Load Prescriptions" description="Unable to fetch prescription data." buttonText="Try Again" onRetry={() => setIsError(false)} />
        ) : (
          <div className="dashboard-home">
            <style>{`
              .admin-header{display:flex;justify-content:space-between;align-items:flex-end;margin-bottom:24px;flex-wrap:wrap;gap:16px;}
              .table-card-wrapper{background:#fff;padding:24px;border-radius:12px;box-shadow:0 4px 16px rgba(0,0,0,0.02);margin-top:24px;}
              .filter-row-section{display:flex;align-items:center;justify-content:space-between;flex-wrap:wrap;gap:16px;margin-bottom:24px;background:#f8fafc;padding:16px;border-radius:8px;}
              .filter-group{display:flex;gap:12px;align-items:center;flex-wrap:wrap;}
              .mock-controls{display:flex;gap:8px;margin-bottom:16px;background:#fffbe6;padding:10px;border:1px dashed #ffe58f;border-radius:8px;}
              @media(max-width:768px){.filter-row-section{flex-direction:column;align-items:stretch;}.admin-header{flex-direction:column;align-items:flex-start;}}
            `}</style>

            <div className="mock-controls">
              <Tag color="warning">Demo Controls</Tag>
              <Button size="small" onClick={() => setIsEmpty(!isEmpty)}>{isEmpty ? 'Restore Data' : 'Simulate Empty'}</Button>
              <Button size="small" danger onClick={() => setIsError(true)}>Simulate Error</Button>
            </div>

            <motion.div className="admin-header" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
              <div>
                <h1 className="welcome-heading">Prescriptions</h1>
                <p className="welcome-sub">Manage and issue prescriptions for your patients.</p>
              </div>
              <Space>
                <Button type="default" icon={<ExportOutlined />} size="large" style={{ borderRadius: '8px' }}>Export</Button>
                <Button type="primary" icon={<PlusOutlined />} size="large" style={{ borderRadius: '8px' }}>New Prescription</Button>
              </Space>
            </motion.div>

            <div className="stat-charts-row" style={{ marginTop: '0', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '20px' }}>
              <StatCardChart title="Total Prescriptions" value="1,842" icon={<MedicineBoxOutlined />} trend="+28 this week" trendColor="#10b981" />
              <StatCardChart title="Active" value="312" icon={<CheckCircleOutlined />} trend="Currently dispensed" trendColor="#0f8a8f" />
              <StatCardChart title="Pending Review" value="24" icon={<ClockCircleOutlined />} trend="Awaiting approval" trendColor="#f59e0b" />
              <StatCardChart title="Refills This Week" value="87" icon={<SyncOutlined />} trend="+12% vs last week" trendColor="#3b82f6" />
            </div>

            <motion.div className="table-card-wrapper" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
              <div className="filter-row-section">
                <div className="filter-group">
                  <Input prefix={<SearchOutlined style={{ color: '#bfbfbf' }} />} placeholder="Search Rx ID, Patient, Medication..." allowClear value={search} onChange={e => setSearch(e.target.value)} style={{ width: 280, borderRadius: 8 }} />
                  <Select value={statusFilter} onChange={setStatusFilter} style={{ width: 130 }}>
                    <Option value="All">Any Status</Option>
                    <Option value="Active">Active</Option>
                    <Option value="Completed">Completed</Option>
                    <Option value="Expired">Expired</Option>
                    <Option value="Pending">Pending</Option>
                  </Select>
                  <Select value={deptFilter} onChange={setDeptFilter} style={{ width: 160 }}>
                    <Option value="All">All Departments</Option>
                    <Option value="Cardiology">Cardiology</Option>
                    <Option value="Neurology">Neurology</Option>
                    <Option value="Pediatrics">Pediatrics</Option>
                    <Option value="General Medicine">General Medicine</Option>
                    <Option value="Orthopedics">Orthopedics</Option>
                  </Select>
                </div>
                <div className="filter-group">
                  <Space>
                    <SortAscendingOutlined style={{ color: '#64748b' }} />
                    <Select value={sort} onChange={setSort} style={{ width: 170 }}>
                      {SORT_OPTIONS.map(o => <Option key={o.value} value={o.value}>{o.label}</Option>)}
                    </Select>
                  </Space>
                  <Button icon={<ClearOutlined />} onClick={() => { setSearch(''); setStatusFilter('All'); setDeptFilter('All'); setSort('newest'); }}>Clear</Button>
                </div>
              </div>

              {sortedData.length === 0 ? (
                <EmptyState title="No Prescriptions Found" description={isEmpty ? 'No prescriptions exist.' : 'No prescriptions match your filters.'} />
              ) : (
                <>
                  <Table columns={columns} dataSource={paginatedData} rowKey="prescriptionId" pagination={false} scroll={{ x: 1600 }} />
                  <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: 24 }}>
                    <Pagination current={currentPage} total={sortedData.length} pageSize={pageSize} pageSizeOptions={['10', '20', '30', '50']} showSizeChanger onChange={p => setPage(p)} onShowSizeChange={(_, s) => setPageSize(s)} />
                  </div>
                </>
              )}
            </motion.div>
          </div>
        )}
      </DashboardLayout>

      <ConfirmationModal
        visible={deleteModal}
        title="Delete Prescription"
        description={`Delete the prescription for ${selectedRecord?.patientName}? This cannot be undone.`}
        type="danger"
        confirmText="Confirm Delete"
        cancelText="Cancel"
        onConfirm={() => { setDeleteModal(false); toast.success('Prescription deleted successfully.'); }}
        onCancel={() => setDeleteModal(false)}
      />
    </>
  );
};

export default Prescriptions;
