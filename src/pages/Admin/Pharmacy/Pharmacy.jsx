import React, { useState, useMemo, useEffect } from 'react';
import { Input, Select, Table, Button, Tag, Space, Pagination, Tooltip, Typography } from 'antd';
import {
  SearchOutlined,
  SortAscendingOutlined,
  PlusOutlined,
  ExportOutlined,
  EyeOutlined,
  EditOutlined,
  DeleteOutlined,
  PlusCircleOutlined,
  MedicineBoxOutlined,
  WarningOutlined,
  StopOutlined,
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
const { Text } = Typography;

// --- Mock Data ---
const mockMedicines = Array.from({ length: 30 }, (_, index) => {
  const statuses = ['Available', 'Low Stock', 'Out of Stock', 'Expired'];
  const categories = ['Antibiotics', 'Painkillers', 'Vitamins', 'Syrup', 'Injections'];
  const suppliers = ['PharmaCorp', 'MedSupply Inc', 'Global Health Distributors', 'CarePlus Suppliers'];
  const manufacturers = ['Sun Pharma', 'Cipla', 'Pfizer', 'GSK', 'Novartis'];
  const basePrice = Math.random() * 50 + 5;
  let stockQty = Math.floor(Math.random() * 300);

  if (index === 2) stockQty = 0; // Force out of stock
  if (index === 5) stockQty = 12; // Force low stock

  let status = statuses[0];
  if (stockQty === 0) status = 'Out of Stock';
  else if (stockQty < 50) status = 'Low Stock';
  else if (index % 12 === 0 && stockQty > 0) status = 'Expired';

  return {
    id: `MED-${8000 + index}`,
    medicineName: `Medicine Brand ${index + 1}`,
    genericName: `Generic Component ${index % 5 + 1}`,
    category: categories[index % categories.length],
    batchNumber: `BAT${Math.floor(1000 + Math.random() * 9000)}-${index}`,
    manufacturer: manufacturers[index % manufacturers.length],
    supplier: suppliers[index % suppliers.length],
    stock: stockQty,
    price: parseFloat(basePrice.toFixed(2)),
    expiryDate: `202${6 + (index % 3)}-${(index % 12 + 1).toString().padStart(2, '0')}-01`,
    createdAt: `2026-05-${(index % 30 + 1).toString().padStart(2, '0')}T10:00:00Z`,
    status: status
  };
});

const statusColors = {
  'Available': { color: '#10b981', bg: 'rgba(16,185,129,0.1)' },
  'Low Stock': { color: '#f59e0b', bg: 'rgba(245,158,11,0.1)' },
  'Out of Stock': { color: '#ef4444', bg: 'rgba(239,68,68,0.1)' },
  'Expired': { color: '#64748b', bg: 'rgba(100,116,139,0.1)' }
};

const SORT_OPTIONS = [
  { value: "newest", label: "Newest First" },
  { value: "oldest", label: "Oldest First" },
  { value: "name_asc", label: "Medicine Name A-Z" },
  { value: "stock_desc", label: "Stock Amount: High" },
  { value: "stock_asc", label: "Stock Amount: Low" },
  { value: "price_desc", label: "Price: High" },
  { value: "price_asc", label: "Price: Low" },
  { value: "expiry_asc", label: "Expiry Date" },
];

const Pharmacy = () => {
  const toast = useToast();

  const [loading, setLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const [isEmpty, setIsEmpty] = useState(false);

  const [search, setSearch] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("All");
  const [supplierFilter, setSupplierFilter] = useState("All");
  const [statusFilter, setStatusFilter] = useState("All");
  const [sort, setSort] = useState("newest");

  const [deleteModalVisible, setDeleteModalVisible] = useState(false);
  const [selectedRecord, setSelectedRecord] = useState(null);

  useEffect(() => {
    // 1-second simulated loading state
    const timer = setTimeout(() => setLoading(false), 1000);
    return () => clearTimeout(timer);
  }, []);

  const baseData = isEmpty ? [] : mockMedicines;

  const searchedData = useSearch(baseData, search, ["medicineName", "genericName", "category", "manufacturer", "supplier", "batchNumber"]);

  const filters = useMemo(() => ({
    category: categoryFilter === "All" ? undefined : categoryFilter,
    supplier: supplierFilter === "All" ? undefined : supplierFilter,
    status: statusFilter === "All" ? undefined : statusFilter,
  }), [categoryFilter, supplierFilter, statusFilter]);

  const filteredData = useFilter(searchedData, filters);

  const sortConfig = useMemo(() => {
    switch (sort) {
      case "name_asc": return { key: "medicineName", direction: "asc" };
      case "stock_asc": return { key: "stock", direction: "asc", type: "number" };
      case "stock_desc": return { key: "stock", direction: "desc", type: "number" };
      case "price_asc": return { key: "price", direction: "asc", type: "number" };
      case "price_desc": return { key: "price", direction: "desc", type: "number" };
      case "expiry_asc": return { key: "expiryDate", direction: "asc" };
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
      toast.success("Viewing medicine details");
    } else if (type === 'edit') {
      toast.success("Opening editor...");
    } else if (type === 'restock') {
      toast.success("Restock request initiated");
    }
  };

  const confirmDelete = () => {
    setDeleteModalVisible(false);
    toast.success("Medicine deleted successfully");
  };

  const columns = [
    { title: 'Medicine ID', dataIndex: 'id', key: 'id', render: text => <strong style={{ color: '#0f8a8f' }}>{text}</strong> },
    {
      title: 'Medicine Name',
      dataIndex: 'medicineName',
      key: 'medicineName',
      render: (text, record) => (
        <div>
          <strong>{text}</strong><br />
          <small style={{ color: '#8c8c8c' }}>{record.genericName}</small>
        </div>
      )
    },
    { title: 'Category', dataIndex: 'category', key: 'category', render: cat => <Tag color="cyan">{cat}</Tag> },
    { title: 'Batch No', dataIndex: 'batchNumber', key: 'batchNumber', render: text => <Text type="secondary">{text}</Text> },
    { title: 'Manufacturer', dataIndex: 'manufacturer', key: 'manufacturer' },
    { title: 'Supplier', dataIndex: 'supplier', key: 'supplier' },
    {
      title: 'Stock',
      dataIndex: 'stock',
      key: 'stock',
      render: stock => <strong style={{ color: stock === 0 ? '#ef4444' : stock < 50 ? '#f59e0b' : '#10b981' }}>{stock}</strong>
    },
    { title: 'Price', dataIndex: 'price', key: 'price', render: amt => <strong>${amt.toFixed(2)}</strong> },
    { title: 'Expiry Date', dataIndex: 'expiryDate', key: 'expiryDate' },
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
          <Tooltip title="View"><Button type="text" icon={<EyeOutlined />} style={{ color: '#1890ff' }} onClick={() => handleAction('view', record)} /></Tooltip>
          <Tooltip title="Edit"><Button type="text" icon={<EditOutlined />} style={{ color: '#f59e0b' }} onClick={() => handleAction('edit', record)} /></Tooltip>
          <Tooltip title="Restock"><Button type="text" icon={<PlusCircleOutlined />} style={{ color: '#10b981' }} onClick={() => handleAction('restock', record)} /></Tooltip>
          <Tooltip title="Delete"><Button type="text" icon={<DeleteOutlined />} style={{ color: '#ff4d4f' }} onClick={() => handleAction('delete', record)} /></Tooltip>
        </Space>
      ),
    },
  ];

  const allCategories = Array.from(new Set(mockMedicines.map(d => d.category)));
  const allSuppliers = Array.from(new Set(mockMedicines.map(d => d.supplier)));

  return (
    <>
      <LoadingOverlay loading={loading} text="Loading Pharmacy Inventory..." />
      <DashboardLayout>
        {loading ? (
          <DashboardSkeleton />
        ) : isError ? (
          <ErrorState
            title="Failed to Load Inventory"
            description="We encountered an issue fetching the latest stock levels. Please try again."
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
                <h1 className="welcome-heading">Admin Pharmacy</h1>
                <p className="welcome-sub">Manage medicines, stock, suppliers, expiry dates and inventory.</p>
              </div>
              <Space>
                <Button type="default" icon={<ExportOutlined />} size="large" style={{ borderRadius: '8px' }}>Export Inventory</Button>
                <Button type="primary" icon={<PlusOutlined />} size="large" style={{ borderRadius: '8px' }}>Add Medicine</Button>
              </Space>
            </motion.div>

            {/* 2. KPI Cards */}
            <div className="stat-charts-row" style={{ marginTop: '0', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '20px' }}>
              <StatCardChart title="Total Medicines" value="482" icon={<MedicineBoxOutlined />} trend="+15 this week" trendColor="#10b981" />
              <StatCardChart title="Low Stock" value="34" icon={<WarningOutlined />} trend="Requires action" trendColor="#f59e0b" />
              <StatCardChart title="Out Of Stock" value="12" icon={<StopOutlined />} trend="Requires restock" trendColor="#ef4444" />
              <StatCardChart title="Expiring Soon" value="18" icon={<ClockCircleOutlined />} trend="Check expiry dates" trendColor="#f59e0b" />
            </div>

            {/* 3, 4, 5. Search, Filters & Sort */}
            <motion.div className="table-card-wrapper" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
              <div className="filter-row-section">
                <div className="filter-group">
                  <Input
                    prefix={<SearchOutlined style={{ color: '#bfbfbf' }} />}
                    placeholder="Search Medicine, generic, batch..."
                    allowClear
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    style={{ width: '280px', borderRadius: '8px' }}
                  />
                  <Select value={categoryFilter} onChange={setCategoryFilter} style={{ width: '150px' }} showSearch>
                    <Option value="All">All Categories</Option>
                    {allCategories.map(c => <Option key={c} value={c}>{c}</Option>)}
                  </Select>
                  <Select value={supplierFilter} onChange={setSupplierFilter} style={{ width: '180px' }} showSearch>
                    <Option value="All">All Suppliers</Option>
                    {allSuppliers.map(s => <Option key={s} value={s}>{s}</Option>)}
                  </Select>
                  <Select value={statusFilter} onChange={setStatusFilter} style={{ width: '140px' }}>
                    <Option value="All">Any Status</Option>
                    <Option value="Available">Available</Option>
                    <Option value="Low Stock">Low Stock</Option>
                    <Option value="Out of Stock">Out of Stock</Option>
                    <Option value="Expired">Expired</Option>
                  </Select>
                </div>

                <div className="filter-group">
                  <Space>
                    <SortAscendingOutlined style={{ color: '#64748b' }} />
                    <Select value={sort} onChange={setSort} style={{ width: '180px' }}>
                      {SORT_OPTIONS.map(opt => <Option key={opt.value} value={opt.value}>{opt.label}</Option>)}
                    </Select>
                  </Space>
                  <Button icon={<ClearOutlined />} onClick={() => {
                    setSearch("");
                    setCategoryFilter("All");
                    setSupplierFilter("All");
                    setStatusFilter("All");
                    setSort("newest");
                  }}>Clear</Button>
                </div>
              </div>

              {sortedData.length === 0 ? (
                <EmptyState
                  title="No Inventory Found"
                  description={isEmpty ? "There is no medicine inventory recorded." : "No medicines match your current search criteria."}
                />
              ) : (
                <>
                  {/* Pharmacy Table */}
                  <Table
                    columns={columns}
                    dataSource={paginatedData}
                    rowKey="id"
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

      {/* Delete Modal */}
      <ConfirmationModal
        visible={deleteModalVisible}
        title="Delete Medicine Record"
        description={`Are you sure you want to delete ${selectedRecord?.medicineName} from the inventory? This action cannot be undone.`}
        type="danger"
        confirmText="Confirm Delete"
        cancelText="Cancel"
        onConfirm={confirmDelete}
        onCancel={() => setDeleteModalVisible(false)}
      />
    </>
  );
};

export default Pharmacy;
