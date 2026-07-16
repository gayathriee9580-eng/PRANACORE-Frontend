import React, { useState, useMemo, useEffect } from 'react';
import { Input, Select, Table, Button, Tag, Space, Pagination, Tooltip, Typography } from 'antd';
import { SearchOutlined, SortAscendingOutlined, EyeOutlined, CheckCircleOutlined, DeleteOutlined, ClearOutlined, ExportOutlined } from '@ant-design/icons';
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
const statuses = ['Pending', 'Dispensed', 'Cancelled', 'Partially Dispensed'];

const mockPrescriptions = Array.from({ length: 30 }, (_, i) => ({
    rxId: `PRX-${9000 + i}`,
    patientName: `Patient Name ${i + 1}`,
    doctor: 'Dr. Sarah Smith',
    medication: ['Amoxicillin', 'Metformin', 'Paracetamol', 'Cetirizine', 'Omeprazole'][i % 5],
    quantity: (i % 4 + 1) * 10,
    status: statuses[i % statuses.length],
    prescribedDate: `2026-07-${(i % 28 + 1).toString().padStart(2, '0')}`,
    createdAt: `2026-07-${(i % 28 + 1).toString().padStart(2, '0')}T09:00:00Z`,
}));

const statusColors = { Pending: '#f59e0b', Dispensed: '#10b981', Cancelled: '#ef4444', 'Partially Dispensed': '#3b82f6' };

const Prescriptions = () => {
    const toast = useToast();
    const [loading, setLoading] = useState(true);
    const [isError, setIsError] = useState(false);
    const [isEmpty, setIsEmpty] = useState(false);
    const [search, setSearch] = useState('');
    const [statusFilter, setStatusFilter] = useState('All');
    const [sort, setSort] = useState('newest');
    const [deleteModal, setDeleteModal] = useState(false);
    const [selectedRecord, setSelectedRecord] = useState(null);

    useEffect(() => { const t = setTimeout(() => setLoading(false), 1000); return () => clearTimeout(t); }, []);

    const baseData = isEmpty ? [] : mockPrescriptions;
    const searchedData = useSearch(baseData, search, ['rxId', 'patientName', 'doctor', 'medication', 'status']);
    const filters = useMemo(() => ({ status: statusFilter === 'All' ? undefined : statusFilter }), [statusFilter]);
    const filteredData = useFilter(searchedData, filters);
    const sortConfig = useMemo(() => sort === 'oldest' ? { key: 'createdAt', direction: 'asc' } : { key: 'createdAt', direction: 'desc' }, [sort]);
    const sortedData = useSort(filteredData, sortConfig);
    const { paginatedData, currentPage, setPage, pageSize, setPageSize } = usePagination(sortedData, 10);

    const columns = [
        { title: 'Rx ID', dataIndex: 'rxId', key: 'rxId', render: t => <strong style={{ color: '#0f8a8f' }}>{t}</strong> },
        { title: 'Patient', dataIndex: 'patientName', key: 'patientName', render: t => <strong>{t}</strong> },
        { title: 'Doctor', dataIndex: 'doctor', key: 'doctor' },
        { title: 'Medication', dataIndex: 'medication', key: 'medication', render: t => <Tag color="purple">{t}</Tag> },
        { title: 'Qty', dataIndex: 'quantity', key: 'quantity' },
        { title: 'Prescribed', dataIndex: 'prescribedDate', key: 'prescribedDate' },
        { title: 'Status', dataIndex: 'status', key: 'status', render: s => { const c = statusColors[s] || '#64748b'; return <span style={{ color: c, background: c + '18', padding: '3px 12px', borderRadius: 10, fontSize: '0.8rem', fontWeight: 600 }}>{s}</span>; } },
        {
            title: 'Actions', key: 'actions', render: (_, r) => (
                <Space size="small">
                    <Tooltip title="View"><Button type="text" icon={<EyeOutlined />} style={{ color: '#3b82f6' }} onClick={() => toast.success('Prescription opened.')} /></Tooltip>
                    <Tooltip title="Dispense"><Button type="text" icon={<CheckCircleOutlined />} style={{ color: '#10b981' }} onClick={() => toast.success('Prescription marked as dispensed.')} /></Tooltip>
                    <Tooltip title="Cancel"><Button type="text" icon={<DeleteOutlined />} style={{ color: '#ef4444' }} onClick={() => { setSelectedRecord(r); setDeleteModal(true); }} /></Tooltip>
                </Space>
            )
        },
    ];

    return (
        <>
            <LoadingOverlay loading={loading} text="Loading Prescriptions..." />
            <DashboardLayout>
                {loading ? <DashboardSkeleton /> : isError ? <ErrorState title="Failed" description="Unable to load prescriptions." buttonText="Try Again" onRetry={() => setIsError(false)} /> : (
                    <div className="dashboard-home">
                        <style>{`.admin-header{display:flex;justify-content:space-between;align-items:flex-end;margin-bottom:24px;flex-wrap:wrap;gap:16px;}.table-card-wrapper{background:#fff;padding:24px;border-radius:12px;box-shadow:0 4px 16px rgba(0,0,0,0.02);margin-top:24px;}.filter-row-section{display:flex;align-items:center;justify-content:space-between;flex-wrap:wrap;gap:16px;margin-bottom:24px;background:#f8fafc;padding:16px;border-radius:8px;}.filter-group{display:flex;gap:12px;align-items:center;flex-wrap:wrap;}.mock-controls{display:flex;gap:8px;margin-bottom:16px;background:#fffbe6;padding:10px;border:1px dashed #ffe58f;border-radius:8px;}`}</style>
                        <div className="mock-controls"><Tag color="warning">Demo Controls</Tag><Button size="small" onClick={() => setIsEmpty(!isEmpty)}>{isEmpty ? 'Restore' : 'Simulate Empty'}</Button><Button size="small" danger onClick={() => setIsError(true)}>Simulate Error</Button></div>
                        <motion.div className="admin-header" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
                            <div><h1 className="welcome-heading">Prescriptions</h1><p className="welcome-sub">View and dispense incoming prescriptions.</p></div>
                            <Button type="default" icon={<ExportOutlined />} size="large" style={{ borderRadius: 8 }}>Export</Button>
                        </motion.div>
                        <div className="stat-charts-row" style={{ marginTop: 0, display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px,1fr))', gap: 20 }}>
                            <StatCardChart title="Total Prescriptions" value="312" icon={<CheckCircleOutlined />} trend="+18 today" trendColor="#10b981" />
                            <StatCardChart title="Pending" value="47" icon={<CheckCircleOutlined />} trend="Awaiting dispense" trendColor="#f59e0b" />
                            <StatCardChart title="Dispensed Today" value="23" icon={<CheckCircleOutlined />} trend="On track" trendColor="#0f8a8f" />
                            <StatCardChart title="Cancelled" value="4" icon={<CheckCircleOutlined />} trend="Cleared" trendColor="#64748b" />
                        </div>
                        <motion.div className="table-card-wrapper" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
                            <div className="filter-row-section">
                                <div className="filter-group">
                                    <Input prefix={<SearchOutlined style={{ color: '#bfbfbf' }} />} placeholder="Search Rx ID, patient, medication..." allowClear value={search} onChange={e => setSearch(e.target.value)} style={{ width: 280, borderRadius: 8 }} />
                                    <Select value={statusFilter} onChange={setStatusFilter} style={{ width: 170 }}><Option value="All">Any Status</Option>{statuses.map(s => <Option key={s} value={s}>{s}</Option>)}</Select>
                                </div>
                                <div className="filter-group">
                                    <Space><SortAscendingOutlined style={{ color: '#64748b' }} /><Select value={sort} onChange={setSort} style={{ width: 140 }}><Option value="newest">Newest</Option><Option value="oldest">Oldest</Option></Select></Space>
                                    <Button icon={<ClearOutlined />} onClick={() => { setSearch(''); setStatusFilter('All'); setSort('newest'); }}>Clear</Button>
                                </div>
                            </div>
                            {sortedData.length === 0 ? <EmptyState title="No Prescriptions" description={isEmpty ? 'No data.' : 'No results match your filters.'} /> : (
                                <><Table columns={columns} dataSource={paginatedData} rowKey="rxId" pagination={false} scroll={{ x: 1000 }} />
                                    <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: 24 }}><Pagination current={currentPage} total={sortedData.length} pageSize={pageSize} pageSizeOptions={['10', '20', '30', '50']} showSizeChanger onChange={p => setPage(p)} onShowSizeChange={(_, s) => setPageSize(s)} /></div></>
                            )}
                        </motion.div>
                    </div>
                )}
            </DashboardLayout>
            <ConfirmationModal visible={deleteModal} title="Cancel Prescription" description={`Cancel prescription ${selectedRecord?.rxId}?`} type="danger" confirmText="Confirm" cancelText="Abort" onConfirm={() => { setDeleteModal(false); toast.success('Prescription cancelled.'); }} onCancel={() => setDeleteModal(false)} />
        </>
    );
};
export default Prescriptions;
