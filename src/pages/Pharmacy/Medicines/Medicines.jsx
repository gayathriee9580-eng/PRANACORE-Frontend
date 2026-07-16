import React, { useState, useMemo, useEffect } from 'react';
import { Input, Select, Table, Button, Tag, Space, Pagination, Tooltip, Typography } from 'antd';
import { SearchOutlined, SortAscendingOutlined, PlusOutlined, ExportOutlined, EyeOutlined, EditOutlined, DeleteOutlined, ClearOutlined } from '@ant-design/icons';
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

const categories = ['Antibiotics', 'Analgesics', 'Antidiabetics', 'Cardiovascular', 'Antihistamines', 'Antifungals', 'Vitamins'];
const statuses = ['In Stock', 'Low Stock', 'Out of Stock', 'Discontinued'];

const mockMedicines = Array.from({ length: 30 }, (_, i) => ({
    medicineId: `MED-${8000 + i}`,
    name: ['Amoxicillin', 'Metformin', 'Amlodipine', 'Cetirizine', 'Omeprazole', 'Atorvastatin', 'Paracetamol'][i % 7] + ` ${i + 1}`,
    category: categories[i % categories.length],
    manufacturer: `Pharma Co. ${String.fromCharCode(65 + i % 8)}`,
    batchNo: `BTN-${2024 + (i % 3)}-${100 + i}`,
    expiryDate: `2027-${(i % 12 + 1).toString().padStart(2, '0')}-15`,
    price: ((i + 1) * 12.5).toFixed(2),
    stock: Math.floor(Math.random() * 500) + 10,
    unit: ['Tablet', 'Capsule', 'Syrup', 'Injection'][i % 4],
    status: statuses[i % statuses.length],
    createdAt: `2026-07-${(i % 28 + 1).toString().padStart(2, '0')}T09:00:00Z`,
}));

const statusColors = { 'In Stock': '#10b981', 'Low Stock': '#f59e0b', 'Out of Stock': '#ef4444', 'Discontinued': '#64748b' };

const SORT_OPTIONS = [
    { value: 'newest', label: 'Newest First' }, { value: 'oldest', label: 'Oldest First' },
    { value: 'name_asc', label: 'Name A-Z' }, { value: 'price_asc', label: 'Price: Low' }, { value: 'price_desc', label: 'Price: High' },
];

const Medicines = () => {
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

    const baseData = isEmpty ? [] : mockMedicines;
    const searchedData = useSearch(baseData, search, ['medicineId', 'name', 'category', 'manufacturer', 'batchNo', 'unit']);
    const filters = useMemo(() => ({ status: statusFilter === 'All' ? undefined : statusFilter, category: categoryFilter === 'All' ? undefined : categoryFilter }), [statusFilter, categoryFilter]);
    const filteredData = useFilter(searchedData, filters);
    const sortConfig = useMemo(() => {
        switch (sort) {
            case 'name_asc': return { key: 'name', direction: 'asc' };
            case 'price_asc': return { key: 'price', direction: 'asc', type: 'number' };
            case 'price_desc': return { key: 'price', direction: 'desc', type: 'number' };
            case 'oldest': return { key: 'createdAt', direction: 'asc' };
            default: return { key: 'createdAt', direction: 'desc' };
        }
    }, [sort]);
    const sortedData = useSort(filteredData, sortConfig);
    const { paginatedData, currentPage, setPage, pageSize, setPageSize } = usePagination(sortedData, 10);

    const columns = [
        { title: 'Medicine ID', dataIndex: 'medicineId', key: 'medicineId', render: t => <strong style={{ color: '#0f8a8f' }}>{t}</strong> },
        { title: 'Name', dataIndex: 'name', key: 'name', render: t => <strong>{t}</strong> },
        { title: 'Category', dataIndex: 'category', key: 'category', render: t => <Tag color="blue">{t}</Tag> },
        { title: 'Manufacturer', dataIndex: 'manufacturer', key: 'manufacturer' },
        { title: 'Batch No.', dataIndex: 'batchNo', key: 'batchNo' },
        { title: 'Expiry', dataIndex: 'expiryDate', key: 'expiryDate' },
        { title: 'Unit', dataIndex: 'unit', key: 'unit' },
        { title: 'Stock', dataIndex: 'stock', key: 'stock' },
        { title: 'Price (₹)', dataIndex: 'price', key: 'price', render: t => <strong>₹{t}</strong> },
        { title: 'Status', dataIndex: 'status', key: 'status', render: s => { const c = statusColors[s] || '#64748b'; return <span style={{ color: c, background: c + '18', padding: '3px 12px', borderRadius: 10, fontSize: '0.8rem', fontWeight: 600 }}>{s}</span>; } },
        {
            title: 'Actions', key: 'actions', render: (_, r) => (
                <Space size="small">
                    <Tooltip title="View"><Button type="text" icon={<EyeOutlined />} style={{ color: '#3b82f6' }} onClick={() => toast.success('Medicine details opened.')} /></Tooltip>
                    <Tooltip title="Edit"><Button type="text" icon={<EditOutlined />} style={{ color: '#f59e0b' }} onClick={() => toast.success('Edit mode activated.')} /></Tooltip>
                    <Tooltip title="Delete"><Button type="text" icon={<DeleteOutlined />} style={{ color: '#ef4444' }} onClick={() => { setSelectedRecord(r); setDeleteModal(true); }} /></Tooltip>
                </Space>
            )
        },
    ];

    return (
        <>
            <LoadingOverlay loading={loading} text="Loading Medicines..." />
            <DashboardLayout>
                {loading ? <DashboardSkeleton /> : isError ? <ErrorState title="Failed to Load" description="Unable to fetch medicines." buttonText="Try Again" onRetry={() => setIsError(false)} /> : (
                    <div className="dashboard-home">
                        <style>{`.admin-header{display:flex;justify-content:space-between;align-items:flex-end;margin-bottom:24px;flex-wrap:wrap;gap:16px;}.table-card-wrapper{background:#fff;padding:24px;border-radius:12px;box-shadow:0 4px 16px rgba(0,0,0,0.02);margin-top:24px;}.filter-row-section{display:flex;align-items:center;justify-content:space-between;flex-wrap:wrap;gap:16px;margin-bottom:24px;background:#f8fafc;padding:16px;border-radius:8px;}.filter-group{display:flex;gap:12px;align-items:center;flex-wrap:wrap;}.mock-controls{display:flex;gap:8px;margin-bottom:16px;background:#fffbe6;padding:10px;border:1px dashed #ffe58f;border-radius:8px;}`}</style>
                        <div className="mock-controls"><Tag color="warning">Demo Controls</Tag><Button size="small" onClick={() => setIsEmpty(!isEmpty)}>{isEmpty ? 'Restore' : 'Simulate Empty'}</Button><Button size="small" danger onClick={() => setIsError(true)}>Simulate Error</Button></div>
                        <motion.div className="admin-header" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
                            <div><h1 className="welcome-heading">Medicines</h1><p className="welcome-sub">Manage the pharmacy medicine catalogue.</p></div>
                            <Space><Button type="default" icon={<ExportOutlined />} size="large" style={{ borderRadius: 8 }}>Export</Button><Button type="primary" icon={<PlusOutlined />} size="large" style={{ borderRadius: 8 }} onClick={() => toast.success('Add medicine form opened.')}>Add Medicine</Button></Space>
                        </motion.div>
                        <motion.div className="table-card-wrapper" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
                            <div className="filter-row-section">
                                <div className="filter-group">
                                    <Input prefix={<SearchOutlined style={{ color: '#bfbfbf' }} />} placeholder="Search name, ID, batch..." allowClear value={search} onChange={e => setSearch(e.target.value)} style={{ width: 260, borderRadius: 8 }} />
                                    <Select value={statusFilter} onChange={setStatusFilter} style={{ width: 140 }}><Option value="All">Any Status</Option>{statuses.map(s => <Option key={s} value={s}>{s}</Option>)}</Select>
                                    <Select value={categoryFilter} onChange={setCategoryFilter} style={{ width: 140 }}><Option value="All">All Categories</Option>{categories.map(c => <Option key={c} value={c}>{c}</Option>)}</Select>
                                </div>
                                <div className="filter-group">
                                    <Space><SortAscendingOutlined style={{ color: '#64748b' }} /><Select value={sort} onChange={setSort} style={{ width: 160 }}>{SORT_OPTIONS.map(o => <Option key={o.value} value={o.value}>{o.label}</Option>)}</Select></Space>
                                    <Button icon={<ClearOutlined />} onClick={() => { setSearch(''); setStatusFilter('All'); setCategoryFilter('All'); setSort('newest'); }}>Clear</Button>
                                </div>
                            </div>
                            {sortedData.length === 0 ? <EmptyState title="No Medicines Found" description={isEmpty ? 'Catalogue is empty.' : 'No results match your filters.'} /> : (
                                <><Table columns={columns} dataSource={paginatedData} rowKey="medicineId" pagination={false} scroll={{ x: 1400 }} />
                                    <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: 24 }}><Pagination current={currentPage} total={sortedData.length} pageSize={pageSize} pageSizeOptions={['10', '20', '30', '50']} showSizeChanger onChange={p => setPage(p)} onShowSizeChange={(_, s) => setPageSize(s)} /></div></>
                            )}
                        </motion.div>
                    </div>
                )}
            </DashboardLayout>
            <ConfirmationModal visible={deleteModal} title="Delete Medicine" description={`Delete ${selectedRecord?.name}? This is permanent.`} type="danger" confirmText="Delete" cancelText="Cancel" onConfirm={() => { setDeleteModal(false); toast.success('Medicine deleted.'); }} onCancel={() => setDeleteModal(false)} />
        </>
    );
};

export default Medicines;
