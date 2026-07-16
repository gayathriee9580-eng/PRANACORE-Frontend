import React, { useState, useMemo, useEffect } from 'react';
import { Input, Select, Table, Button, Tag, Space, Pagination, Tooltip, Typography } from 'antd';
import {
  SearchOutlined,
  SortAscendingOutlined,
  PlusOutlined,
  ExportOutlined,
  EyeOutlined,
  DeleteOutlined,
  DownloadOutlined,
  UndoOutlined,
  DollarOutlined,
  BankOutlined,
  ClockCircleOutlined,
  CheckCircleOutlined,
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
const mockPayments = Array.from({ length: 30 }, (_, index) => {
  const statuses = ['Successful', 'Pending', 'Failed', 'Refunded'];
  const methods = ['Credit Card', 'Cash', 'Insurance', 'Bank Transfer', 'UPI'];
  const doctors = ['Dr. Sarah Smith', 'Dr. Mark Lee', 'Dr. Alice Chen', 'Dr. Bob White', 'Dr. Michael Brown'];
  const departments = ['Cardiology', 'Neurology', 'Pediatrics', 'Orthopedics', 'Oncology'];

  return {
    id: `PAY-${10000 + index}`,
    invoiceId: `INV-${50000 + index}`,
    patient: `Patient Name ${index + 1}`,
    doctor: doctors[index % doctors.length],
    department: departments[index % departments.length],
    amount: parseFloat((Math.random() * 500 + 50).toFixed(2)),
    paymentMethod: methods[index % methods.length],
    status: statuses[index % statuses.length],
    transactionId: `TXN${Math.floor(100000000 + Math.random() * 900000000)}`,
    date: `2026-07-${(index % 30 + 1).toString().padStart(2, '0')}T10:30:00Z`
  };
});

const statusColors = {
  Successful: { color: '#10b981', bg: 'rgba(16,185,129,0.1)' },
  Pending: { color: '#f59e0b', bg: 'rgba(245,158,11,0.1)' },
  Failed: { color: '#ef4444', bg: 'rgba(239,68,68,0.1)' },
  Refunded: { color: '#64748b', bg: 'rgba(100,116,139,0.1)' },
};

const SORT_OPTIONS = [
  { value: "newest", label: "Newest First" },
  { value: "oldest", label: "Oldest First" },
  { value: "highest", label: "Highest Amount" },
  { value: "lowest", label: "Lowest Amount" },
  { value: "patient_asc", label: "Patient Name A-Z" },
  { value: "status_asc", label: "Status A-Z" },
];

const Payments = () => {
  const toast = useToast();

  const [loading, setLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const [isEmpty, setIsEmpty] = useState(false);

  const [search, setSearch] = useState("");
  const [deptFilter, setDeptFilter] = useState("All");
  const [methodFilter, setMethodFilter] = useState("All");
  const [statusFilter, setStatusFilter] = useState("All");
  const [sort, setSort] = useState("newest");

  const [modalVisible, setModalVisible] = useState(false);
  const [modalType, setModalType] = useState(null); // 'delete' or 'refund'
  const [selectedRecord, setSelectedRecord] = useState(null);

  useEffect(() => {
    // 1-second simulated loading state
    const timer = setTimeout(() => setLoading(false), 1000);
    return () => clearTimeout(timer);
  }, []);

  const baseData = isEmpty ? [] : mockPayments;

  const searchedData = useSearch(baseData, search, ["id", "invoiceId", "patient", "doctor", "department", "paymentMethod", "status"]);

  const filters = useMemo(() => ({
    department: deptFilter === "All" ? undefined : deptFilter,
    paymentMethod: methodFilter === "All" ? undefined : methodFilter,
    status: statusFilter === "All" ? undefined : statusFilter,
  }), [deptFilter, methodFilter, statusFilter]);

  const filteredData = useFilter(searchedData, filters);

  const sortConfig = useMemo(() => {
    switch (sort) {
      case "patient_asc": return { key: "patient", direction: "asc" };
      case "highest": return { key: "amount", direction: "desc", type: "number" };
      case "lowest": return { key: "amount", direction: "asc", type: "number" };
      case "newest": return { key: "date", direction: "desc" };
      case "oldest": return { key: "date", direction: "asc" };
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

  const handleActionClick = (type, record) => {
    setModalType(type);
    setSelectedRecord(record);
    setModalVisible(true);
  };

  const confirmAction = () => {
    setModalVisible(false);
    if (modalType === 'delete') {
      toast.success("Payment deleted successfully");
    } else if (modalType === 'refund') {
      toast.success("Refund initiated successfully");
    }
  };

  const handleView = () => toast.success("Opening payment details");
  const handleDownload = () => toast.success("Invoice downloaded successfully");

  const columns = [
    { title: 'Payment ID', dataIndex: 'id', key: 'id', render: text => <strong style={{ color: '#0f8a8f' }}>{text}</strong> },
    { title: 'Invoice ID', dataIndex: 'invoiceId', key: 'invoiceId', render: text => <span style={{ color: '#64748b' }}>{text}</span> },
    { title: 'Patient', dataIndex: 'patient', key: 'patient', render: text => <strong>{text}</strong> },
    { title: 'Doctor', dataIndex: 'doctor', key: 'doctor' },
    { title: 'Department', dataIndex: 'department', key: 'department', render: cat => <Tag color="blue">{cat}</Tag> },
    { title: 'Amount', dataIndex: 'amount', key: 'amount', render: amt => <strong style={{ color: '#10b981' }}>${amt.toFixed(2)}</strong> },
    { title: 'Method', dataIndex: 'paymentMethod', key: 'paymentMethod' },
    { title: 'Date', dataIndex: 'date', key: 'date', render: dateStr => new Date(dateStr).toLocaleDateString() },
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
          <Tooltip title="View"><Button type="text" icon={<EyeOutlined />} style={{ color: '#1890ff' }} onClick={handleView} /></Tooltip>
          <Tooltip title="Download Invoice"><Button type="text" icon={<DownloadOutlined />} style={{ color: '#10b981' }} onClick={handleDownload} /></Tooltip>
          <Tooltip title="Refund"><Button type="text" icon={<UndoOutlined />} style={{ color: '#f59e0b' }} onClick={() => handleActionClick('refund', record)} /></Tooltip>
          <Tooltip title="Delete"><Button type="text" icon={<DeleteOutlined />} style={{ color: '#ff4d4f' }} onClick={() => handleActionClick('delete', record)} /></Tooltip>
        </Space>
      ),
    },
  ];

  const allDepts = Array.from(new Set(mockPayments.map(d => d.department)));
  const allMethods = Array.from(new Set(mockPayments.map(d => d.paymentMethod)));

  return (
    <>
      <LoadingOverlay loading={loading} text="Loading Financial Records..." />
      <DashboardLayout>
        {loading ? (
          <DashboardSkeleton />
        ) : isError ? (
          <ErrorState
            title="Failed to Load Financial Data"
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
                <h1 className="welcome-heading">Payments Management</h1>
                <p className="welcome-sub">Monitor payments, invoices, billing history, refunds, and revenue across the hospital.</p>
              </div>
              <Space>
                <Button type="default" icon={<ExportOutlined />} size="large" style={{ borderRadius: '8px' }}>Export Payments</Button>
                <Button type="primary" icon={<PlusOutlined />} size="large" style={{ borderRadius: '8px' }}>Generate Invoice</Button>
              </Space>
            </motion.div>

            {/* 2. KPI Cards */}
            <div className="stat-charts-row" style={{ marginTop: '0', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '20px' }}>
              <StatCardChart title="Total Revenue" value="$45,231" icon={<BankOutlined />} trend="+12% this month" trendColor="#10b981" />
              <StatCardChart title="Today's Revenue" value="$3,150" icon={<DollarOutlined />} trend="+5% since yesterday" trendColor="#10b981" />
              <StatCardChart title="Pending Payments" value="12" icon={<ClockCircleOutlined />} trend="Check pending bills" trendColor="#f59e0b" />
              <StatCardChart title="Successful Transactions" value="1,492" icon={<CheckCircleOutlined />} trend="High success rate" trendColor="#10b981" />
            </div>

            {/* 3, 4, 5. Search, Filters & Sort */}
            <motion.div className="table-card-wrapper" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
              <div className="filter-row-section">
                <div className="filter-group">
                  <Input
                    prefix={<SearchOutlined style={{ color: '#bfbfbf' }} />}
                    placeholder="Search Payment ID, Invoice..."
                    allowClear
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    style={{ width: '250px', borderRadius: '8px' }}
                  />
                  <Select value={statusFilter} onChange={setStatusFilter} style={{ width: '130px' }}>
                    <Option value="All">Any Status</Option>
                    <Option value="Successful">Successful</Option>
                    <Option value="Pending">Pending</Option>
                    <Option value="Failed">Failed</Option>
                    <Option value="Refunded">Refunded</Option>
                  </Select>
                  <Select value={methodFilter} onChange={setMethodFilter} style={{ width: '150px' }}>
                    <Option value="All">Any Method</Option>
                    {allMethods.map(m => <Option key={m} value={m}>{m}</Option>)}
                  </Select>
                  <Select value={deptFilter} onChange={setDeptFilter} style={{ width: '150px' }} showSearch>
                    <Option value="All">All Departments</Option>
                    {allDepts.map(d => <Option key={d} value={d}>{d}</Option>)}
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
                    setMethodFilter("All");
                    setStatusFilter("All");
                    setSort("newest");
                  }}>Clear</Button>
                </div>
              </div>

              {sortedData.length === 0 ? (
                <EmptyState
                  title="No Payments Found"
                  description={isEmpty ? "There are no payment records in the system." : "No records match your current search and filter criteria."}
                />
              ) : (
                <>
                  {/* 6. Payments Table */}
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
        visible={modalVisible}
        title={modalType === 'delete' ? "Delete Payment Record" : "Initiate Refund"}
        description={modalType === 'delete'
          ? `Are you sure you want to delete payment ${selectedRecord?.id}? This action cannot be undone.`
          : `Are you sure you want to process a refund for payment ${selectedRecord?.id}?`
        }
        type={modalType === 'delete' ? "danger" : "warning"}
        confirmText={modalType === 'delete' ? "Delete" : "Confirm Refund"}
        cancelText="Cancel"
        onConfirm={confirmAction}
        onCancel={() => setModalVisible(false)}
      />
    </>
  );
};

export default Payments;
