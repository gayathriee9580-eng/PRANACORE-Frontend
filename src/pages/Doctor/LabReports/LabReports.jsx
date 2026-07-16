import React, { useState, useMemo, useEffect } from 'react';
import { Input, Select, Table, Button, Tag, Space, Pagination, Tooltip, Typography } from 'antd';
import {
  SearchOutlined,
  SortAscendingOutlined,
  ExportOutlined,
  ExperimentOutlined,
  CheckCircleOutlined,
  ClockCircleOutlined,
  WarningOutlined,
  EyeOutlined,
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
const mockLabReports = Array.from({ length: 30 }, (_, i) => {
  const statuses = ['Completed', 'Pending', 'In Progress', 'Critical'];
  const testTypes = ['Blood Test', 'Urine Analysis', 'MRI Scan', 'X-Ray', 'ECG', 'CT Scan', 'Biopsy'];
  const departments = ['Pathology', 'Radiology', 'Cardiology', 'Neurology', 'General Medicine'];
  const priorities = ['Normal', 'High', 'Urgent'];
  const dateStr = `2026-07-${(i % 28 + 1).toString().padStart(2, '0')}`;

  return {
    reportId: `LAB-${7000 + i}`,
    patientName: `Patient Name ${i + 1}`,
    age: Math.floor(Math.random() * 60) + 18,
    gender: i % 2 === 0 ? 'Male' : 'Female',
    testType: testTypes[i % testTypes.length],
    department: departments[i % departments.length],
    priority: priorities[i % priorities.length],
    status: statuses[i % statuses.length],
    orderedDate: dateStr,
    createdAt: `${dateStr}T08:00:00Z`,
    resultDate: i % 3 === 0 ? null : dateStr,
    technician: `Tech. ${String.fromCharCode(65 + (i % 5))}. Johnson`,
    notes: 'Standard lab test results pending review.',
  };
});

const statusStyles = {
  Completed: { color: '#10b981', bg: 'rgba(16,185,129,0.1)' },
  Pending: { color: '#f59e0b', bg: 'rgba(245,158,11,0.1)' },
  'In Progress': { color: '#3b82f6', bg: 'rgba(59,130,246,0.1)' },
  Critical: { color: '#ef4444', bg: 'rgba(239,68,68,0.1)' },
};

const SORT_OPTIONS = [
  { value: 'newest', label: 'Newest First' },
  { value: 'oldest', label: 'Oldest First' },
  { value: 'name_asc', label: 'Patient Name A-Z' },
  { value: 'test_asc', label: 'Test Type A-Z' },
  { value: 'status_asc', label: 'Status A-Z' },
];

const LabReports = () => {
  const toast = useToast();

  const [loading, setLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const [isEmpty, setIsEmpty] = useState(false);

  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [priorityFilter, setPriorityFilter] = useState('All');
  const [deptFilter, setDeptFilter] = useState('All');
  const [sort, setSort] = useState('newest');

  const [deleteModal, setDeleteModal] = useState(false);
  const [selectedRecord, setSelectedRecord] = useState(null);

  useEffect(() => {
    const t = setTimeout(() => setLoading(false), 1000);
    return () => clearTimeout(t);
  }, []);

  const baseData = isEmpty ? [] : mockLabReports;
  const searchedData = useSearch(baseData, search, ['reportId', 'patientName', 'testType', 'department', 'status', 'technician']);
  const filters = useMemo(() => ({
    status: statusFilter === 'All' ? undefined : statusFilter,
    priority: priorityFilter === 'All' ? undefined : priorityFilter,
    department: deptFilter === 'All' ? undefined : deptFilter,
  }), [statusFilter, priorityFilter, deptFilter]);
  const filteredData = useFilter(searchedData, filters);
  const sortConfig = useMemo(() => {
    switch (sort) {
      case 'name_asc': return { key: 'patientName', direction: 'asc' };
      case 'test_asc': return { key: 'testType', direction: 'asc' };
      case 'status_asc': return { key: 'status', direction: 'asc' };
      case 'oldest': return { key: 'createdAt', direction: 'asc' };
      default: return { key: 'createdAt', direction: 'desc' };
    }
  }, [sort]);
  const sortedData = useSort(filteredData, sortConfig);
  const { paginatedData, currentPage, setPage, pageSize, setPageSize } = usePagination(sortedData, 10);

  const handleAction = (type, record) => {
    if (type === 'delete') { setSelectedRecord(record); setDeleteModal(true); }
    else if (type === 'view') toast.success('Lab report opened for review.');
    else if (type === 'download') toast.success('Lab report downloaded as PDF.');
  };

  const columns = [
    { title: 'Report ID', dataIndex: 'reportId', key: 'reportId', render: t => <strong style={{ color: '#0f8a8f' }}>{t}</strong> },
    { title: 'Patient Name', dataIndex: 'patientName', key: 'patientName', render: t => <strong>{t}</strong> },
    { title: 'Age', dataIndex: 'age', key: 'age' },
    { title: 'Gender', dataIndex: 'gender', key: 'gender', render: t => <Text type="secondary">{t}</Text> },
    { title: 'Test Type', dataIndex: 'testType', key: 'testType', render: t => <Tag color="blue">{t}</Tag> },
    { title: 'Department', dataIndex: 'department', key: 'department' },
    { title: 'Priority', dataIndex: 'priority', key: 'priority', render: p => <Tag color={p === 'Urgent' ? 'red' : p === 'High' ? 'orange' : 'default'}>{p}</Tag> },
    { title: 'Ordered', dataIndex: 'orderedDate', key: 'orderedDate' },
    { title: 'Result Date', dataIndex: 'resultDate', key: 'resultDate', render: d => d || <Text type="secondary">Pending</Text> },
    { title: 'Technician', dataIndex: 'technician', key: 'technician' },
    {
      title: 'Status', dataIndex: 'status', key: 'status',
      render: s => {
        const c = statusStyles[s] || { color: '#64748b', bg: '#f1f5f9' };
        return <span style={{ color: c.color, background: c.bg, padding: '4px 12px', borderRadius: '12px', fontSize: '0.8rem', fontWeight: 600 }}>{s}</span>;
      }
    },
    {
      title: 'Actions', key: 'actions',
      render: (_, record) => (
        <Space size="small">
          <Tooltip title="View Report"><Button type="text" icon={<EyeOutlined />} style={{ color: '#3b82f6' }} onClick={() => handleAction('view', record)} /></Tooltip>
          <Tooltip title="Download PDF"><Button type="text" icon={<DownloadOutlined />} style={{ color: '#10b981' }} onClick={() => handleAction('download', record)} /></Tooltip>
          <Tooltip title="Delete"><Button type="text" icon={<DeleteOutlined />} style={{ color: '#ef4444' }} onClick={() => handleAction('delete', record)} /></Tooltip>
        </Space>
      ),
    },
  ];

  return (
    <>
      <LoadingOverlay loading={loading} text="Loading Lab Reports..." />
      <DashboardLayout>
        {loading ? <DashboardSkeleton /> : isError ? (
          <ErrorState title="Failed to Load Lab Reports" description="Unable to retrieve lab data from system." buttonText="Try Again" onRetry={() => setIsError(false)} />
        ) : (
          <div className="dashboard-home">
            <style>{`
              .admin-header{display:flex;justify-content:space-between;align-items:flex-end;margin-bottom:24px;flex-wrap:wrap;gap:16px;}
              .table-card-wrapper{background:#fff;padding:24px;border-radius:12px;box-shadow:0 4px 16px rgba(0,0,0,0.02);margin-top:24px;}
              .filter-row-section{display:flex;align-items:center;justify-content:space-between;flex-wrap:wrap;gap:16px;margin-bottom:24px;background:#f8fafc;padding:16px;border-radius:8px;}
              .filter-group{display:flex;gap:12px;align-items:center;flex-wrap:wrap;}
              .mock-controls{display:flex;gap:8px;margin-bottom:16px;background:#fffbe6;padding:10px;border:1px dashed #ffe58f;border-radius:8px;}
              @media(max-width:768px){.filter-row-section{flex-direction:column;}.admin-header{flex-direction:column;}}
            `}</style>

            <div className="mock-controls">
              <Tag color="warning">Demo Controls</Tag>
              <Button size="small" onClick={() => setIsEmpty(!isEmpty)}>{isEmpty ? 'Restore Data' : 'Simulate Empty'}</Button>
              <Button size="small" danger onClick={() => setIsError(true)}>Simulate Error</Button>
            </div>

            <motion.div className="admin-header" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
              <div>
                <h1 className="welcome-heading">Lab Reports</h1>
                <p className="welcome-sub">Review and manage lab test results for your patients.</p>
              </div>
              <Space>
                <Button type="default" icon={<ExportOutlined />} size="large" style={{ borderRadius: 8 }}>Export</Button>
                <Button type="primary" icon={<PlusOutlined />} size="large" style={{ borderRadius: 8 }}>Request Lab Test</Button>
              </Space>
            </motion.div>

            <div className="stat-charts-row" style={{ marginTop: 0, display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 20 }}>
              <StatCardChart title="Total Lab Reports" value="2,147" icon={<ExperimentOutlined />} trend="+32 this week" trendColor="#10b981" />
              <StatCardChart title="Completed" value="1,894" icon={<CheckCircleOutlined />} trend="Results available" trendColor="#0f8a8f" />
              <StatCardChart title="Pending Results" value="214" icon={<ClockCircleOutlined />} trend="Processing" trendColor="#f59e0b" />
              <StatCardChart title="Critical Findings" value="39" icon={<WarningOutlined />} trend="Urgent attention needed" trendColor="#ef4444" />
            </div>

            <motion.div className="table-card-wrapper" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
              <div className="filter-row-section">
                <div className="filter-group">
                  <Input prefix={<SearchOutlined style={{ color: '#bfbfbf' }} />} placeholder="Search Report ID, Patient, Test Type..." allowClear value={search} onChange={e => setSearch(e.target.value)} style={{ width: 280, borderRadius: 8 }} />
                  <Select value={statusFilter} onChange={setStatusFilter} style={{ width: 130 }}>
                    <Option value="All">Any Status</Option>
                    <Option value="Completed">Completed</Option>
                    <Option value="Pending">Pending</Option>
                    <Option value="In Progress">In Progress</Option>
                    <Option value="Critical">Critical</Option>
                  </Select>
                  <Select value={priorityFilter} onChange={setPriorityFilter} style={{ width: 130 }}>
                    <Option value="All">Any Priority</Option>
                    <Option value="Normal">Normal</Option>
                    <Option value="High">High</Option>
                    <Option value="Urgent">Urgent</Option>
                  </Select>
                  <Select value={deptFilter} onChange={setDeptFilter} style={{ width: 160 }}>
                    <Option value="All">All Departments</Option>
                    <Option value="Pathology">Pathology</Option>
                    <Option value="Radiology">Radiology</Option>
                    <Option value="Cardiology">Cardiology</Option>
                    <Option value="Neurology">Neurology</Option>
                    <Option value="General Medicine">General Medicine</Option>
                  </Select>
                </div>
                <div className="filter-group">
                  <Space>
                    <SortAscendingOutlined style={{ color: '#64748b' }} />
                    <Select value={sort} onChange={setSort} style={{ width: 160 }}>
                      {SORT_OPTIONS.map(o => <Option key={o.value} value={o.value}>{o.label}</Option>)}
                    </Select>
                  </Space>
                  <Button icon={<ClearOutlined />} onClick={() => { setSearch(''); setStatusFilter('All'); setPriorityFilter('All'); setDeptFilter('All'); setSort('newest'); }}>Clear</Button>
                </div>
              </div>

              {sortedData.length === 0 ? (
                <EmptyState title="No Lab Reports Found" description={isEmpty ? 'No lab reports exist.' : 'No reports match your filters.'} />
              ) : (
                <>
                  <Table columns={columns} dataSource={paginatedData} rowKey="reportId" pagination={false} scroll={{ x: 1500 }} />
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
        title="Delete Lab Report"
        description={`Delete the lab report for ${selectedRecord?.patientName}? This is permanent.`}
        type="danger"
        confirmText="Confirm Delete"
        cancelText="Cancel"
        onConfirm={() => { setDeleteModal(false); toast.success('Lab report deleted successfully.'); }}
        onCancel={() => setDeleteModal(false)}
      />
    </>
  );
};

export default LabReports;
