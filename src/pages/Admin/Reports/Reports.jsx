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
  FilePdfOutlined,
  FileExcelOutlined,
  FileTextOutlined,
  FileDoneOutlined,
  FolderOpenOutlined,
  ClockCircleOutlined,
  CloudDownloadOutlined,
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
const mockReports = Array.from({ length: 25 }, (_, index) => {
  const statuses = ['Generated', 'Pending', 'Failed', 'Scheduled'];
  const categories = ['Financial', 'Medical', 'Inventory', 'Patient Data', 'Staff Performance'];
  const fileTypes = ['PDF', 'Excel', 'CSV'];
  const generatedBy = ['System', 'Dr. Sarah Smith', 'Admin User', 'Manager', 'Dr. Mark Lee'];

  const type = fileTypes[index % fileTypes.length];
  let sizeStr;
  if (type === 'PDF') sizeStr = `${(Math.random() * 5 + 1).toFixed(1)} MB`;
  else if (type === 'Excel') sizeStr = `${Math.floor(Math.random() * 500 + 100)} KB`;
  else sizeStr = `${Math.floor(Math.random() * 100 + 10)} KB`;

  return {
    id: `REP-${2000 + index}`,
    reportName: `${categories[index % categories.length]} Report - Q${(index % 4) + 1}`,
    category: categories[index % categories.length],
    generatedBy: generatedBy[index % generatedBy.length],
    date: `2026-07-${(index % 28 + 1).toString().padStart(2, '0')}`,
    createdAt: `2026-07-${(index % 28 + 1).toString().padStart(2, '0')}T09:00:00Z`,
    status: statuses[index % statuses.length],
    fileType: type,
    size: sizeStr,
    downloads: Math.floor(Math.random() * 150)
  };
});

const statusColors = {
  Generated: { color: '#10b981', bg: 'rgba(16,185,129,0.1)' },
  Scheduled: { color: '#0f8a8f', bg: 'rgba(15,138,143,0.1)' },
  Pending: { color: '#f59e0b', bg: 'rgba(245,158,11,0.1)' },
  Failed: { color: '#ef4444', bg: 'rgba(239,68,68,0.1)' }
};

const getFileIcon = (fileType) => {
  if (fileType === 'PDF') return <FilePdfOutlined style={{ color: '#ef4444' }} />;
  if (fileType === 'Excel') return <FileExcelOutlined style={{ color: '#10b981' }} />;
  return <FileTextOutlined style={{ color: '#0f8a8f' }} />;
};

const SORT_OPTIONS = [
  { value: "newest", label: "Newest First" },
  { value: "oldest", label: "Oldest First" },
  { value: "name_asc", label: "Report Name A-Z" },
  { value: "category_asc", label: "Category A-Z" },
  { value: "downloads_desc", label: "Downloads: Highest" },
  { value: "downloads_asc", label: "Downloads: Lowest" },
];

const Reports = () => {
  const toast = useToast();

  const [loading, setLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const [isEmpty, setIsEmpty] = useState(false);

  const [search, setSearch] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("All");
  const [typeFilter, setTypeFilter] = useState("All");
  const [statusFilter, setStatusFilter] = useState("All");
  const [sort, setSort] = useState("newest");

  const [deleteModalVisible, setDeleteModalVisible] = useState(false);
  const [selectedRecord, setSelectedRecord] = useState(null);

  useEffect(() => {
    // 1-second simulated loading state
    const timer = setTimeout(() => setLoading(false), 1000);
    return () => clearTimeout(timer);
  }, []);

  const baseData = isEmpty ? [] : mockReports;

  const searchedData = useSearch(baseData, search, ["id", "reportName", "category", "generatedBy", "fileType", "status"]);

  const filters = useMemo(() => ({
    category: categoryFilter === "All" ? undefined : categoryFilter,
    fileType: typeFilter === "All" ? undefined : typeFilter,
    status: statusFilter === "All" ? undefined : statusFilter,
  }), [categoryFilter, typeFilter, statusFilter]);

  const filteredData = useFilter(searchedData, filters);

  const sortConfig = useMemo(() => {
    switch (sort) {
      case "name_asc": return { key: "reportName", direction: "asc" };
      case "category_asc": return { key: "category", direction: "asc" };
      case "downloads_desc": return { key: "downloads", direction: "desc", type: "number" };
      case "downloads_asc": return { key: "downloads", direction: "asc", type: "number" };
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
      toast.success("Opening report viewer");
    } else if (type === 'download') {
      toast.success("Report downloaded successfully");
    }
  };

  const confirmDelete = () => {
    setDeleteModalVisible(false);
    toast.success("Report deleted successfully");
  };

  const columns = [
    { title: 'ID', dataIndex: 'id', key: 'id', render: text => <strong style={{ color: '#0f8a8f' }}>{text}</strong> },
    { title: 'Report Name', dataIndex: 'reportName', key: 'reportName', render: text => <strong>{text}</strong> },
    { title: 'Category', dataIndex: 'category', key: 'category', render: cat => <Tag color="blue">{cat}</Tag> },
    { title: 'Generated By', dataIndex: 'generatedBy', key: 'generatedBy', render: text => <Text type="secondary">{text}</Text> },
    { title: 'Date', dataIndex: 'date', key: 'date' },
    {
      title: 'File Type',
      dataIndex: 'fileType',
      key: 'fileType',
      render: (type, record) => (
        <Space>
          {getFileIcon(type)}
          <span>{type}</span>
          <small style={{ color: '#8c8c8c' }}>({record.size})</small>
        </Space>
      )
    },
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
      title: 'Downloads',
      dataIndex: 'downloads',
      key: 'downloads',
      render: count => <strong style={{ color: '#64748b' }}>{count}</strong>
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (_, record) => (
        <Space size="middle">
          <Tooltip title="View"><Button type="text" icon={<EyeOutlined />} style={{ color: '#1890ff' }} onClick={() => handleAction('view', record)} /></Tooltip>
          <Tooltip title="Download"><Button type="text" icon={<DownloadOutlined />} style={{ color: '#10b981' }} onClick={() => handleAction('download', record)} /></Tooltip>
          <Tooltip title="Delete"><Button type="text" icon={<DeleteOutlined />} style={{ color: '#ff4d4f' }} onClick={() => handleAction('delete', record)} /></Tooltip>
        </Space>
      ),
    },
  ];

  const allCategories = Array.from(new Set(mockReports.map(d => d.category)));
  const allTypes = Array.from(new Set(mockReports.map(d => d.fileType)));

  return (
    <>
      <LoadingOverlay loading={loading} text="Loading Analytics & Reports..." />
      <DashboardLayout>
        {loading ? (
          <DashboardSkeleton />
        ) : isError ? (
          <ErrorState
            title="Failed to Load Reports"
            description="We encountered an issue fetching the reports directory. Please try again."
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

            {/* Hero Section */}
            <motion.div className="admin-header" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
              <div>
                <h1 className="welcome-heading">Reports Management</h1>
                <p className="welcome-sub">Manage system analytics, operational metrics, and generated reports across the platform.</p>
              </div>
              <Space>
                <Button type="default" icon={<ExportOutlined />} size="large" style={{ borderRadius: '8px' }}>Export All</Button>
                <Button type="primary" icon={<PlusOutlined />} size="large" style={{ borderRadius: '8px' }}>Generate Report</Button>
              </Space>
            </motion.div>

            {/* KPI Cards */}
            <div className="stat-charts-row" style={{ marginTop: '0', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '20px' }}>
              <StatCardChart title="Total Reports" value="1,842" icon={<FolderOpenOutlined />} trend="+34 this month" trendColor="#10b981" />
              <StatCardChart title="Generated Today" value="15" icon={<FileDoneOutlined />} trend="Consistent output" trendColor="#0f8a8f" />
              <StatCardChart title="Downloads" value="3,942" icon={<CloudDownloadOutlined />} trend="+15% since last week" trendColor="#10b981" />
              <StatCardChart title="Scheduled Reports" value="8" icon={<ClockCircleOutlined />} trend="Upcoming tasks" trendColor="#f59e0b" />
            </div>

            {/* Search, Filters & Sort */}
            <motion.div className="table-card-wrapper" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
              <div className="filter-row-section">
                <div className="filter-group">
                  <Input
                    prefix={<SearchOutlined style={{ color: '#bfbfbf' }} />}
                    placeholder="Search Document ID, Name, Author..."
                    allowClear
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    style={{ width: '280px', borderRadius: '8px' }}
                  />
                  <Select value={categoryFilter} onChange={setCategoryFilter} style={{ width: '160px' }} showSearch>
                    <Option value="All">All Categories</Option>
                    {allCategories.map(c => <Option key={c} value={c}>{c}</Option>)}
                  </Select>
                  <Select value={typeFilter} onChange={setTypeFilter} style={{ width: '150px' }}>
                    <Option value="All">All File Types</Option>
                    {allTypes.map(t => <Option key={t} value={t}>{t}</Option>)}
                  </Select>
                  <Select value={statusFilter} onChange={setStatusFilter} style={{ width: '140px' }}>
                    <Option value="All">Any Status</Option>
                    <Option value="Generated">Generated</Option>
                    <Option value="Pending">Pending</Option>
                    <Option value="Scheduled">Scheduled</Option>
                    <Option value="Failed">Failed</Option>
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
                    setTypeFilter("All");
                    setStatusFilter("All");
                    setSort("newest");
                  }}>Clear</Button>
                </div>
              </div>

              {sortedData.length === 0 ? (
                <EmptyState
                  title="No Reports Found"
                  description={isEmpty ? "There are no reports available in the system." : "No reports match your current search and filter constraints."}
                />
              ) : (
                <>
                  {/* Reports Table */}
                  <Table
                    columns={columns}
                    dataSource={paginatedData}
                    rowKey="id"
                    pagination={false}
                    scroll={{ x: 1300 }}
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

      {/* Delete Modal */}
      <ConfirmationModal
        visible={deleteModalVisible}
        title="Delete Report"
        description={`Are you sure you want to delete ${selectedRecord?.reportName}? This file will be permanently removed.`}
        type="danger"
        confirmText="Confirm Delete"
        cancelText="Cancel"
        onConfirm={confirmDelete}
        onCancel={() => setDeleteModalVisible(false)}
      />
    </>
  );
};

export default Reports;
