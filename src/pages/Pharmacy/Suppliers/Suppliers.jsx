import React, { useState, useMemo, useEffect } from 'react';
import { Input, Select, Table, Button, Tag, Space, Pagination, Tooltip, Avatar, Typography } from 'antd';
import { SearchOutlined, SortAscendingOutlined, PlusOutlined, ExportOutlined, EyeOutlined, EditOutlined, DeleteOutlined, ClearOutlined, TeamOutlined, PhoneOutlined, MailOutlined } from '@ant-design/icons';
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
const supplierStatuses = ['Active', 'Inactive', 'Blacklisted'];
const regions = ['North', 'South', 'East', 'West', 'Central'];

const mockSuppliers = Array.from({ length: 30 }, (_, i) => ({
    supplierId: `SUP-${3000 + i}`,
    name: `Supplier ${String.fromCharCode(65 + i % 10)} Healthcare`,
    contactPerson: `Contact Name ${i + 1}`,
    email: `supplier${i + 1}@pharma.com`,
    phone: `+91 98765 ${(43210 + i).toString().slice(-5)}`,
    region: regions[i % regions.length],
    totalOrders: Math.floor(Math.random() * 100) + 5,
    rating: (3.5 + (i % 15) * 0.1).toFixed(1),
    status: supplierStatuses[i % supplierStatuses.length],
    createdAt: `2026-07-${(i % 28 + 1).toString().padStart(2, '0')}T09:00:00Z`,
}));

const statusColors = { Active: '#10b981', Inactive: '#f59e0b', Blacklisted: '#ef4444' };

const Suppliers = () => {
    const toast = useToast();
    const [loading, setLoading] = useState(true);
    const [isError, setIsError] = useState(false);
    const [isEmpty, setIsEmpty] = useState(false);
    const [search, setSearch] = useState('');
    const [statusFilter, setStatusFilter] = useState('All');
    const [regionFilter, setRegionFilter] = useState('All');
    const [sort, setSort] = useState('newest');
    const [deleteModal, setDeleteModal] = useState(false);
    const [selectedRecord, setSelectedRecord] = useState(null);

    useEffect(() => { const t = setTimeout(() => setLoading(false), 1000); return () => clearTimeout(t); }, []);
    const baseData = isEmpty ? [] : mockSuppliers;
    const searchedData = useSearch(baseData, search, ['supplierId', 'name', 'contactPerson', 'email', 'phone', 'region']);
    const filters = useMemo(() => ({ status: statusFilter === 'All' ? undefined : statusFilter, region: regionFilter === 'All' ? undefined : regionFilter }), [statusFilter, regionFilter]);
    const filteredData = useFilter(searchedData, filters);
    const sortConfig = useMemo(() => sort === 'oldest' ? { key: 'createdAt', direction: 'asc' } : { key: 'createdAt', direction: 'desc' }, [sort]);
    const sortedData = useSort(filteredData, sortConfig);
    const { paginatedData, currentPage, setPage, pageSize, setPageSize } = usePagination(sortedData, 10);

    const columns = [
        { title: 'ID', dataIndex: 'supplierId', key: 'supplierId', render: t => <strong style={{ color: '#0f8a8f' }}>{t}</strong> },
        { title: 'Supplier', dataIndex: 'name', key: 'name', render: (t, r) => <Space><Avatar style={{ background: '#e0f2fe', color: '#0f8a8f' }}>{t[0]}</Avatar><strong>{t}</strong></Space> },
        { title: 'Contact Person', dataIndex: 'contactPerson', key: 'contactPerson' },
        { title: 'Email', dataIndex: 'email', key: 'email', render: t => <Space size="small"><MailOutlined style={{ color: '#64748b' }} /><Text style={{ fontSize: 13 }}>{t}</Text></Space> },
        { title: 'Phone', dataIndex: 'phone', key: 'phone', render: t => <Space size="small"><PhoneOutlined style={{ color: '#64748b' }} /><Text style={{ fontSize: 13 }}>{t}</Text></Space> },
        { title: 'Region', dataIndex: 'region', key: 'region', render: t => <Tag color="geekblue">{t}</Tag> },
        { title: 'Orders', dataIndex: 'totalOrders', key: 'totalOrders' },
        { title: 'Rating', dataIndex: 'rating', key: 'rating', render: t => <Tag color="gold">⭐ {t}</Tag> },
        { title: 'Status', dataIndex: 'status', key: 'status', render: s => { const c = statusColors[s] || '#64748b'; return <span style={{ color: c, background: c + '18', padding: '3px 12px', borderRadius: 10, fontSize: '0.8rem', fontWeight: 600 }}>{s}</span>; } },
        {
            title: 'Actions', key: 'actions', render: (_, r) => (
                <Space size="small">
                    <Tooltip title="View"><Button type="text" icon={<EyeOutlined />} style={{ color: '#3b82f6' }} onClick={() => toast.success('Supplier details opened.')} /></Tooltip>
                    <Tooltip title="Edit"><Button type="text" icon={<EditOutlined />} style={{ color: '#f59e0b' }} onClick={() => toast.success('Edit supplier form opened.')} /></Tooltip>
                    <Tooltip title="Remove"><Button type="text" icon={<DeleteOutlined />} style={{ color: '#ef4444' }} onClick={() => { setSelectedRecord(r); setDeleteModal(true); }} /></Tooltip>
                </Space>
            )
        },
    ];

    return (
        <>
            <LoadingOverlay loading={loading} text="Loading Suppliers..." />
            <DashboardLayout>
                {loading ? <DashboardSkeleton /> : isError ? <ErrorState title="Failed" description="Unable to load suppliers." buttonText="Try Again" onRetry={() => setIsError(false)} /> : (
                    <div className="dashboard-home">
                        <style>{`.admin-header{display:flex;justify-content:space-between;align-items:flex-end;margin-bottom:24px;flex-wrap:wrap;gap:16px;}.table-card-wrapper{background:#fff;padding:24px;border-radius:12px;box-shadow:0 4px 16px rgba(0,0,0,0.02);margin-top:24px;}.filter-row-section{display:flex;align-items:center;justify-content:space-between;flex-wrap:wrap;gap:16px;margin-bottom:24px;background:#f8fafc;padding:16px;border-radius:8px;}.filter-group{display:flex;gap:12px;align-items:center;flex-wrap:wrap;}.mock-controls{display:flex;gap:8px;margin-bottom:16px;background:#fffbe6;padding:10px;border:1px dashed #ffe58f;border-radius:8px;}`}</style>
                        <div className="mock-controls"><Tag color="warning">Demo Controls</Tag><Button size="small" onClick={() => setIsEmpty(!isEmpty)}>{isEmpty ? 'Restore' : 'Simulate Empty'}</Button><Button size="small" danger onClick={() => setIsError(true)}>Simulate Error</Button></div>
                        <motion.div className="admin-header" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
                            <div><h1 className="welcome-heading">Suppliers</h1><p className="welcome-sub">Manage your pharmacy medicine suppliers.</p></div>
                            <Space><Button type="default" icon={<ExportOutlined />} size="large" style={{ borderRadius: 8 }}>Export</Button><Button type="primary" icon={<PlusOutlined />} size="large" style={{ borderRadius: 8 }} onClick={() => toast.success('Add supplier form opened.')}>Add Supplier</Button></Space>
                        </motion.div>
                        <div className="stat-charts-row" style={{ marginTop: 0, display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px,1fr))', gap: 20 }}>
                            <StatCardChart title="Total Suppliers" value="47" icon={<TeamOutlined />} trend="All registered" trendColor="#10b981" />
                            <StatCardChart title="Active" value="38" icon={<TeamOutlined />} trend="Operational" trendColor="#0f8a8f" />
                            <StatCardChart title="Inactive" value="6" icon={<TeamOutlined />} trend="Temporary halt" trendColor="#f59e0b" />
                            <StatCardChart title="Blacklisted" value="3" icon={<TeamOutlined />} trend="Restricted" trendColor="#ef4444" />
                        </div>
                        <motion.div className="table-card-wrapper" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
                            <div className="filter-row-section">
                                <div className="filter-group">
                                    <Input prefix={<SearchOutlined style={{ color: '#bfbfbf' }} />} placeholder="Search name, ID, region..." allowClear value={search} onChange={e => setSearch(e.target.value)} style={{ width: 260, borderRadius: 8 }} />
                                    <Select value={statusFilter} onChange={setStatusFilter} style={{ width: 130 }}><Option value="All">Any Status</Option>{supplierStatuses.map(s => <Option key={s} value={s}>{s}</Option>)}</Select>
                                    <Select value={regionFilter} onChange={setRegionFilter} style={{ width: 120 }}><Option value="All">All Regions</Option>{regions.map(r => <Option key={r} value={r}>{r}</Option>)}</Select>
                                </div>
                                <div className="filter-group">
                                    <Space><SortAscendingOutlined style={{ color: '#64748b' }} /><Select value={sort} onChange={setSort} style={{ width: 140 }}><Option value="newest">Newest</Option><Option value="oldest">Oldest</Option></Select></Space>
                                    <Button icon={<ClearOutlined />} onClick={() => { setSearch(''); setStatusFilter('All'); setRegionFilter('All'); setSort('newest'); }}>Clear</Button>
                                </div>
                            </div>
                            {sortedData.length === 0 ? <EmptyState title="No Suppliers Found" description={isEmpty ? 'No data.' : 'No results match your filters.'} /> : (
                                <><Table columns={columns} dataSource={paginatedData} rowKey="supplierId" pagination={false} scroll={{ x: 1400 }} />
                                    <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: 24 }}><Pagination current={currentPage} total={sortedData.length} pageSize={pageSize} pageSizeOptions={['10', '20', '30', '50']} showSizeChanger onChange={p => setPage(p)} onShowSizeChange={(_, s) => setPageSize(s)} /></div></>
                            )}
                        </motion.div>
                    </div>
                )}
            </DashboardLayout>
            <ConfirmationModal visible={deleteModal} title="Remove Supplier" description={`Remove ${selectedRecord?.name}? This cannot be undone.`} type="danger" confirmText="Remove" cancelText="Cancel" onConfirm={() => { setDeleteModal(false); toast.success('Supplier removed.'); }} onCancel={() => setDeleteModal(false)} />
        </>
    );
};
export default Suppliers;
