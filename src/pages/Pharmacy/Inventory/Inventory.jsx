import React, { useState, useMemo, useEffect } from 'react';
import { Input, Select, Table, Button, Tag, Space, Pagination, Tooltip, Progress, Typography } from 'antd';
import { SearchOutlined, SortAscendingOutlined, PlusOutlined, ExportOutlined, EyeOutlined, EditOutlined, DeleteOutlined, ClearOutlined, DatabaseOutlined, WarningOutlined } from '@ant-design/icons';
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
const categories = ['Antibiotics', 'Analgesics', 'Antidiabetics', 'Cardiovascular', 'Antihistamines', 'Vitamins'];
const stockStatuses = ['Adequate', 'Low', 'Critical', 'Out of Stock'];

const mockInventory = Array.from({ length: 30 }, (_, i) => ({
    itemId: `INV-${5000 + i}`,
    medicine: ['Amoxicillin', 'Metformin', 'Paracetamol', 'Cetirizine', 'Omeprazole', 'Atorvastatin', 'Ibuprofen'][i % 7],
    category: categories[i % categories.length],
    currentStock: Math.floor(Math.random() * 500) + 5,
    minStock: 50,
    maxStock: 600,
    unit: ['Tablet', 'Capsule', 'Syrup', 'Injection'][i % 4],
    location: `Rack-${String.fromCharCode(65 + i % 8)}-${i % 10 + 1}`,
    expiryDate: `2027-${(i % 12 + 1).toString().padStart(2, '0')}-15`,
    stockStatus: stockStatuses[i % stockStatuses.length],
    createdAt: `2026-07-${(i % 28 + 1).toString().padStart(2, '0')}T09:00:00Z`,
}));

const statusColors = { Adequate: '#10b981', Low: '#f59e0b', Critical: '#ef4444', 'Out of Stock': '#64748b' };

const Inventory = () => {
    const toast = useToast();
    const [loading, setLoading] = useState(true);
    const [isError, setIsError] = useState(false);
    const [isEmpty, setIsEmpty] = useState(false);
    const [search, setSearch] = useState('');
    const [statusFilter, setStatusFilter] = useState('All');
    const [categoryFilter, setCategoryFilter] = useState('All');
    const [sort, setSort] = useState('newest');
    const [deleteModal, setDeleteModal] = useState(false);
    const [selectedRecord, setSelectedRecord] = useState(null);

    useEffect(() => { const t = setTimeout(() => setLoading(false), 1000); return () => clearTimeout(t); }, []);
    const baseData = isEmpty ? [] : mockInventory;
    const searchedData = useSearch(baseData, search, ['itemId', 'medicine', 'category', 'location', 'unit']);
    const filters = useMemo(() => ({ stockStatus: statusFilter === 'All' ? undefined : statusFilter, category: categoryFilter === 'All' ? undefined : categoryFilter }), [statusFilter, categoryFilter]);
    const filteredData = useFilter(searchedData, filters);
    const sortConfig = useMemo(() => sort === 'oldest' ? { key: 'createdAt', direction: 'asc' } : { key: 'createdAt', direction: 'desc' }, [sort]);
    const sortedData = useSort(filteredData, sortConfig);
    const { paginatedData, currentPage, setPage, pageSize, setPageSize } = usePagination(sortedData, 10);

    const columns = [
        { title: 'Item ID', dataIndex: 'itemId', key: 'itemId', render: t => <strong style={{ color: '#0f8a8f' }}>{t}</strong> },
        { title: 'Medicine', dataIndex: 'medicine', key: 'medicine', render: t => <strong>{t}</strong> },
        { title: 'Category', dataIndex: 'category', key: 'category', render: t => <Tag color="blue">{t}</Tag> },
        {
            title: 'Current Stock', dataIndex: 'currentStock', key: 'currentStock', render: (v, r) => (
                <div style={{ minWidth: 100 }}><div style={{ display: 'flex', justifyContent: 'space-between' }}><Text style={{ fontSize: 12 }}>{v}</Text><Text style={{ fontSize: 12 }}>{r.maxStock}</Text></div><Progress percent={Math.round(v / r.maxStock * 100)} showInfo={false} strokeColor={v < r.minStock ? '#ef4444' : '#10b981'} trailColor="#e2e8f0" /></div>
            )
        },
        { title: 'Unit', dataIndex: 'unit', key: 'unit' },
        { title: 'Location', dataIndex: 'location', key: 'location' },
        { title: 'Expiry', dataIndex: 'expiryDate', key: 'expiryDate' },
        { title: 'Status', dataIndex: 'stockStatus', key: 'stockStatus', render: s => { const c = statusColors[s] || '#64748b'; return <span style={{ color: c, background: c + '18', padding: '3px 12px', borderRadius: 10, fontSize: '0.8rem', fontWeight: 600 }}>{s}</span>; } },
        {
            title: 'Actions', key: 'actions', render: (_, r) => (
                <Space size="small">
                    <Tooltip title="View"><Button type="text" icon={<EyeOutlined />} style={{ color: '#3b82f6' }} onClick={() => toast.success('Inventory item opened.')} /></Tooltip>
                    <Tooltip title="Update Stock"><Button type="text" icon={<EditOutlined />} style={{ color: '#f59e0b' }} onClick={() => toast.success('Stock update form opened.')} /></Tooltip>
                    <Tooltip title="Remove"><Button type="text" icon={<DeleteOutlined />} style={{ color: '#ef4444' }} onClick={() => { setSelectedRecord(r); setDeleteModal(true); }} /></Tooltip>
                </Space>
            )
        },
    ];

    return (
        <>
            <LoadingOverlay loading={loading} text="Loading Inventory..." />
            <DashboardLayout>
                {loading ? <DashboardSkeleton /> : isError ? <ErrorState title="Failed" description="Unable to load inventory." buttonText="Try Again" onRetry={() => setIsError(false)} /> : (
                    <div className="dashboard-home">
                        <style>{`.admin-header{display:flex;justify-content:space-between;align-items:flex-end;margin-bottom:24px;flex-wrap:wrap;gap:16px;}.table-card-wrapper{background:#fff;padding:24px;border-radius:12px;box-shadow:0 4px 16px rgba(0,0,0,0.02);margin-top:24px;}.filter-row-section{display:flex;align-items:center;justify-content:space-between;flex-wrap:wrap;gap:16px;margin-bottom:24px;background:#f8fafc;padding:16px;border-radius:8px;}.filter-group{display:flex;gap:12px;align-items:center;flex-wrap:wrap;}.mock-controls{display:flex;gap:8px;margin-bottom:16px;background:#fffbe6;padding:10px;border:1px dashed #ffe58f;border-radius:8px;}`}</style>
                        <div className="mock-controls"><Tag color="warning">Demo Controls</Tag><Button size="small" onClick={() => setIsEmpty(!isEmpty)}>{isEmpty ? 'Restore' : 'Simulate Empty'}</Button><Button size="small" danger onClick={() => setIsError(true)}>Simulate Error</Button></div>
                        <motion.div className="admin-header" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
                            <div><h1 className="welcome-heading">Inventory</h1><p className="welcome-sub">Monitor and manage pharmacy stock levels.</p></div>
                            <Space><Button type="default" icon={<ExportOutlined />} size="large" style={{ borderRadius: 8 }}>Export</Button><Button type="primary" icon={<PlusOutlined />} size="large" style={{ borderRadius: 8 }} onClick={() => toast.success('Add inventory item form opened.')}>Add Item</Button></Space>
                        </motion.div>
                        <div className="stat-charts-row" style={{ marginTop: 0, display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px,1fr))', gap: 20 }}>
                            <StatCardChart title="Total Items" value="2,847" icon={<DatabaseOutlined />} trend="Catalogue size" trendColor="#10b981" />
                            <StatCardChart title="Low Stock" value="12" icon={<WarningOutlined />} trend="Reorder needed" trendColor="#f59e0b" />
                            <StatCardChart title="Critical" value="4" icon={<WarningOutlined />} trend="Immediate action" trendColor="#ef4444" />
                            <StatCardChart title="Out of Stock" value="2" icon={<DatabaseOutlined />} trend="Unavailable items" trendColor="#64748b" />
                        </div>
                        <motion.div className="table-card-wrapper" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
                            <div className="filter-row-section">
                                <div className="filter-group">
                                    <Input prefix={<SearchOutlined style={{ color: '#bfbfbf' }} />} placeholder="Search medicine, location..." allowClear value={search} onChange={e => setSearch(e.target.value)} style={{ width: 260, borderRadius: 8 }} />
                                    <Select value={statusFilter} onChange={setStatusFilter} style={{ width: 140 }}><Option value="All">Any Status</Option>{stockStatuses.map(s => <Option key={s} value={s}>{s}</Option>)}</Select>
                                    <Select value={categoryFilter} onChange={setCategoryFilter} style={{ width: 140 }}><Option value="All">All Categories</Option>{categories.map(c => <Option key={c} value={c}>{c}</Option>)}</Select>
                                </div>
                                <div className="filter-group">
                                    <Space><SortAscendingOutlined style={{ color: '#64748b' }} /><Select value={sort} onChange={setSort} style={{ width: 140 }}><Option value="newest">Newest</Option><Option value="oldest">Oldest</Option></Select></Space>
                                    <Button icon={<ClearOutlined />} onClick={() => { setSearch(''); setStatusFilter('All'); setCategoryFilter('All'); setSort('newest'); }}>Clear</Button>
                                </div>
                            </div>
                            {sortedData.length === 0 ? <EmptyState title="No Inventory Items" description={isEmpty ? 'No data.' : 'No results match your filters.'} /> : (
                                <><Table columns={columns} dataSource={paginatedData} rowKey="itemId" pagination={false} scroll={{ x: 1200 }} />
                                    <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: 24 }}><Pagination current={currentPage} total={sortedData.length} pageSize={pageSize} pageSizeOptions={['10', '20', '30', '50']} showSizeChanger onChange={p => setPage(p)} onShowSizeChange={(_, s) => setPageSize(s)} /></div></>
                            )}
                        </motion.div>
                    </div>
                )}
            </DashboardLayout>
            <ConfirmationModal visible={deleteModal} title="Remove Inventory Item" description={`Remove ${selectedRecord?.itemId}? This is permanent.`} type="danger" confirmText="Remove" cancelText="Cancel" onConfirm={() => { setDeleteModal(false); toast.success('Item removed.'); }} onCancel={() => setDeleteModal(false)} />
        </>
    );
};
export default Inventory;
