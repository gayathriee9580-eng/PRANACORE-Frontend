import React, { useState, useMemo, useEffect } from 'react';
import { Input, Select, Table, Button, Tag, Space, Pagination, Tooltip, Typography } from 'antd';
import { SearchOutlined, SortAscendingOutlined, ExportOutlined, EyeOutlined, ClearOutlined, CreditCardOutlined } from '@ant-design/icons';
import { motion } from 'framer-motion';
import DashboardLayout from '../../../layouts/DashboardLayout/DashboardLayout';
import { StatCardChart } from '../../../components/Charts';
import LoadingOverlay from '../../../components/LoadingOverlay';
import EmptyState from '../../../components/EmptyState';
import ErrorState from '../../../components/ErrorState';
import { DashboardSkeleton } from '../../../components/Skeletons';
import { useToast } from '../../../context/ToastContext';
import useSearch from '../../../hooks/useSearch';
import useFilter from '../../../hooks/useFilter';
import useSort from '../../../hooks/useSort';
import usePagination from '../../../hooks/usePagination';
import '../../../pages/Dashboard/DashboardHome/DashboardHome.css';

const { Option } = Select;
const { Text } = Typography;
const paymentStatuses = ['Paid', 'Pending', 'Refunded', 'Failed'];
const paymentMethods = ['Cash', 'Card', 'UPI', 'Insurance'];

const mockPayments = Array.from({ length: 30 }, (_, i) => ({
    paymentId: `PAY-${7000 + i}`,
    patientName: `Patient Name ${i + 1}`,
    prescription: `PRX-${9000 + i}`,
    amount: ((i + 1) * 145.5).toFixed(2),
    method: paymentMethods[i % paymentMethods.length],
    status: paymentStatuses[i % paymentStatuses.length],
    date: `2026-07-${(i % 28 + 1).toString().padStart(2, '0')}`,
    createdAt: `2026-07-${(i % 28 + 1).toString().padStart(2, '0')}T09:00:00Z`,
}));

const statusColors = { Paid: '#10b981', Pending: '#f59e0b', Refunded: '#3b82f6', Failed: '#ef4444' };
const methodColors = { Cash: 'green', Card: 'blue', UPI: 'purple', Insurance: 'orange' };

const Payments = () => {
    const toast = useToast();
    const [loading, setLoading] = useState(true);
    const [isError, setIsError] = useState(false);
    const [isEmpty, setIsEmpty] = useState(false);
    const [search, setSearch] = useState('');
    const [statusFilter, setStatusFilter] = useState('All');
    const [methodFilter, setMethodFilter] = useState('All');
    const [sort, setSort] = useState('newest');

    useEffect(() => { const t = setTimeout(() => setLoading(false), 1000); return () => clearTimeout(t); }, []);
    const baseData = isEmpty ? [] : mockPayments;
    const searchedData = useSearch(baseData, search, ['paymentId', 'patientName', 'prescription', 'method', 'status']);
    const filters = useMemo(() => ({ status: statusFilter === 'All' ? undefined : statusFilter, method: methodFilter === 'All' ? undefined : methodFilter }), [statusFilter, methodFilter]);
    const filteredData = useFilter(searchedData, filters);
    const sortConfig = useMemo(() => sort === 'oldest' ? { key: 'createdAt', direction: 'asc' } : { key: 'createdAt', direction: 'desc' }, [sort]);
    const sortedData = useSort(filteredData, sortConfig);
    const { paginatedData, currentPage, setPage, pageSize, setPageSize } = usePagination(sortedData, 10);

    const columns = [
        { title: 'Payment ID', dataIndex: 'paymentId', key: 'paymentId', render: t => <strong style={{ color: '#0f8a8f' }}>{t}</strong> },
        { title: 'Patient', dataIndex: 'patientName', key: 'patientName', render: t => <strong>{t}</strong> },
        { title: 'Prescription', dataIndex: 'prescription', key: 'prescription', render: t => <Tag color="purple">{t}</Tag> },
        { title: 'Amount (₹)', dataIndex: 'amount', key: 'amount', render: t => <strong>₹{t}</strong> },
        { title: 'Method', dataIndex: 'method', key: 'method', render: t => <Tag color={methodColors[t]}>{t}</Tag> },
        { title: 'Date', dataIndex: 'date', key: 'date' },
        { title: 'Status', dataIndex: 'status', key: 'status', render: s => { const c = statusColors[s] || '#64748b'; return <span style={{ color: c, background: c + '18', padding: '3px 12px', borderRadius: 10, fontSize: '0.8rem', fontWeight: 600 }}>{s}</span>; } },
        { title: 'Actions', key: 'actions', render: () => <Tooltip title="View Receipt"><Button type="text" icon={<EyeOutlined />} style={{ color: '#3b82f6' }} onClick={() => toast.success('Receipt opened.')} /></Tooltip> },
    ];

    return (
        <>
            <LoadingOverlay loading={loading} text="Loading Payments..." />
            <DashboardLayout>
                {loading ? <DashboardSkeleton /> : isError ? <ErrorState title="Failed" description="Unable to load payments." buttonText="Try Again" onRetry={() => setIsError(false)} /> : (
                    <div className="dashboard-home">
                        <style>{`.admin-header{display:flex;justify-content:space-between;align-items:flex-end;margin-bottom:24px;flex-wrap:wrap;gap:16px;}.table-card-wrapper{background:#fff;padding:24px;border-radius:12px;box-shadow:0 4px 16px rgba(0,0,0,0.02);margin-top:24px;}.filter-row-section{display:flex;align-items:center;justify-content:space-between;flex-wrap:wrap;gap:16px;margin-bottom:24px;background:#f8fafc;padding:16px;border-radius:8px;}.filter-group{display:flex;gap:12px;align-items:center;flex-wrap:wrap;}.mock-controls{display:flex;gap:8px;margin-bottom:16px;background:#fffbe6;padding:10px;border:1px dashed #ffe58f;border-radius:8px;}`}</style>
                        <div className="mock-controls"><Tag color="warning">Demo Controls</Tag><Button size="small" onClick={() => setIsEmpty(!isEmpty)}>{isEmpty ? 'Restore' : 'Simulate Empty'}</Button><Button size="small" danger onClick={() => setIsError(true)}>Simulate Error</Button></div>
                        <motion.div className="admin-header" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
                            <div><h1 className="welcome-heading">Payments</h1><p className="welcome-sub">Track pharmacy billing and transaction records.</p></div>
                            <Button type="default" icon={<ExportOutlined />} size="large" style={{ borderRadius: 8 }}>Export</Button>
                        </motion.div>
                        <div className="stat-charts-row" style={{ marginTop: 0, display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px,1fr))', gap: 20 }}>
                            <StatCardChart title="Total Revenue" value="₹4,23,800" icon={<CreditCardOutlined />} trend="+12% this month" trendColor="#10b981" />
                            <StatCardChart title="Pending" value="₹18,420" icon={<CreditCardOutlined />} trend="Awaiting collection" trendColor="#f59e0b" />
                            <StatCardChart title="Refunds" value="₹3,200" icon={<CreditCardOutlined />} trend="This month" trendColor="#3b82f6" />
                            <StatCardChart title="Failed" value="₹980" icon={<CreditCardOutlined />} trend="Requires follow-up" trendColor="#ef4444" />
                        </div>
                        <motion.div className="table-card-wrapper" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
                            <div className="filter-row-section">
                                <div className="filter-group">
                                    <Input prefix={<SearchOutlined style={{ color: '#bfbfbf' }} />} placeholder="Search payment ID, patient..." allowClear value={search} onChange={e => setSearch(e.target.value)} style={{ width: 260, borderRadius: 8 }} />
                                    <Select value={statusFilter} onChange={setStatusFilter} style={{ width: 130 }}><Option value="All">Any Status</Option>{paymentStatuses.map(s => <Option key={s} value={s}>{s}</Option>)}</Select>
                                    <Select value={methodFilter} onChange={setMethodFilter} style={{ width: 120 }}><Option value="All">All Methods</Option>{paymentMethods.map(m => <Option key={m} value={m}>{m}</Option>)}</Select>
                                </div>
                                <div className="filter-group">
                                    <Space><SortAscendingOutlined style={{ color: '#64748b' }} /><Select value={sort} onChange={setSort} style={{ width: 140 }}><Option value="newest">Newest</Option><Option value="oldest">Oldest</Option></Select></Space>
                                    <Button icon={<ClearOutlined />} onClick={() => { setSearch(''); setStatusFilter('All'); setMethodFilter('All'); setSort('newest'); }}>Clear</Button>
                                </div>
                            </div>
                            {sortedData.length === 0 ? <EmptyState title="No Payments Found" description={isEmpty ? 'No data.' : 'No results match your filters.'} /> : (
                                <><Table columns={columns} dataSource={paginatedData} rowKey="paymentId" pagination={false} scroll={{ x: 1000 }} />
                                    <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: 24 }}><Pagination current={currentPage} total={sortedData.length} pageSize={pageSize} pageSizeOptions={['10', '20', '30', '50']} showSizeChanger onChange={p => setPage(p)} onShowSizeChange={(_, s) => setPageSize(s)} /></div></>
                            )}
                        </motion.div>
                    </div>
                )}
            </DashboardLayout>
        </>
    );
};
export default Payments;
