import React, { useState, useEffect } from 'react';
import { Button, Tag, Space, Typography, Badge, Card, Row, Col, Avatar, Timeline } from 'antd';
import {
  CalendarOutlined,
  ClockCircleOutlined,
  UserOutlined,
  ExportOutlined,
  CheckCircleOutlined,
  SyncOutlined,
  CloseCircleOutlined,
  RightOutlined,
  LeftOutlined,
} from '@ant-design/icons';
import { motion } from 'framer-motion';

import DashboardLayout from '../../../layouts/DashboardLayout/DashboardLayout';
import { StatCardChart } from '../../../components/Charts';
import LoadingOverlay from '../../../components/LoadingOverlay';
import { DashboardSkeleton } from '../../../components/Skeletons';
import EmptyState from '../../../components/EmptyState';
import { useToast } from '../../../context/ToastContext';
import '../../../pages/Dashboard/DashboardHome/DashboardHome.css';

const { Text, Title } = Typography;

// --- Days of week & mock schedule data ---
const DAYS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
const FULL_DAYS = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

const statusStyles = {
  Confirmed: { color: '#10b981', bg: 'rgba(16,185,129,0.1)' },
  Pending: { color: '#f59e0b', bg: 'rgba(245,158,11,0.1)' },
  Cancelled: { color: '#ef4444', bg: 'rgba(239,68,68,0.1)' },
  Completed: { color: '#3b82f6', bg: 'rgba(59,130,246,0.1)' },
};

const generateWeekSlots = (weekOffset) => {
  const today = new Date(2026, 6, 16); // fixed: July 16 2026
  today.setDate(today.getDate() + weekOffset * 7);
  const startOfWeek = new Date(today);
  startOfWeek.setDate(today.getDate() - today.getDay());

  return Array.from({ length: 7 }, (_, dayIdx) => {
    const dayDate = new Date(startOfWeek);
    dayDate.setDate(startOfWeek.getDate() + dayIdx);
    const isWeekend = dayIdx === 0 || dayIdx === 6;
    const slots = isWeekend ? [] : Array.from({ length: Math.floor(Math.random() * 4) + 2 }, (__, slotIdx) => ({
      id: `SL-${weekOffset}-${dayIdx}-${slotIdx}`,
      time: `${(9 + slotIdx * 2).toString().padStart(2, '0')}:00`,
      patient: `Patient ${dayIdx * 3 + slotIdx + 1}`,
      type: ['Consultation', 'Follow-up', 'Emergency', 'General'][slotIdx % 4],
      status: ['Confirmed', 'Pending', 'Completed', 'Cancelled'][slotIdx % 4],
      room: `Room ${101 + slotIdx}`,
    }));
    return { date: dayDate, dayIdx, slots };
  });
};

const Schedule = () => {
  const toast = useToast();
  const [loading, setLoading] = useState(true);
  const [weekOffset, setWeekOffset] = useState(0);
  const [selectedDay, setSelectedDay] = useState(new Date(2026, 6, 16).getDay());

  useEffect(() => {
    const t = setTimeout(() => setLoading(false), 1000);
    return () => clearTimeout(t);
  }, []);

  const week = generateWeekSlots(weekOffset);
  const selectedDayData = week[selectedDay];
  const totalSlots = week.reduce((acc, d) => acc + d.slots.length, 0);
  const confirmedSlots = week.reduce((acc, d) => acc + d.slots.filter(s => s.status === 'Confirmed').length, 0);
  const pendingSlots = week.reduce((acc, d) => acc + d.slots.filter(s => s.status === 'Pending').length, 0);

  return (
    <>
      <LoadingOverlay loading={loading} text="Loading Your Schedule..." />
      <DashboardLayout>
        {loading ? <DashboardSkeleton /> : (
          <div className="dashboard-home">
            <style>{`
              .admin-header{display:flex;justify-content:space-between;align-items:flex-end;margin-bottom:24px;flex-wrap:wrap;gap:16px;}
              .schedule-week-nav{display:flex;align-items:center;gap:12px;margin-bottom:20px;}
              .day-selector{display:grid;grid-template-columns:repeat(7,1fr);gap:10px;margin-bottom:24px;}
              .day-card{background:#fff;border-radius:10px;padding:12px 8px;text-align:center;cursor:pointer;border:2px solid transparent;transition:all 0.2s;}
              .day-card:hover{border-color:#0f8a8f;}
              .day-card.active{border-color:#0f8a8f;background:rgba(15,138,143,0.06);}
              .day-card.weekend{opacity:0.45;}
              .slot-list{display:flex;flex-direction:column;gap:12px;}
              .slot-card{background:#fff;border-radius:10px;padding:16px;border:1px solid #f1f5f9;display:flex;align-items:center;justify-content:space-between;flex-wrap:wrap;gap:8px;transition:box-shadow 0.2s;}
              .slot-card:hover{box-shadow:0 4px 14px rgba(0,0,0,0.06);}
              @media(max-width:768px){.admin-header{flex-direction:column;}.day-selector{grid-template-columns:repeat(4,1fr);}}
            `}</style>

            <motion.div className="admin-header" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
              <div>
                <h1 className="welcome-heading">My Schedule</h1>
                <p className="welcome-sub">View and manage your weekly appointment schedule.</p>
              </div>
              <Space>
                <Button type="default" icon={<ExportOutlined />} size="large" style={{ borderRadius: 8 }}>Export</Button>
                <Button type="primary" icon={<CalendarOutlined />} size="large" style={{ borderRadius: 8 }} onClick={() => toast.success('Block time slot initiated.')}>Block Time</Button>
              </Space>
            </motion.div>

            {/* KPI */}
            <div className="stat-charts-row" style={{ marginTop: 0, display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 20 }}>
              <StatCardChart title="Total This Week" value={String(totalSlots)} icon={<CalendarOutlined />} trend="Scheduled slots" trendColor="#10b981" />
              <StatCardChart title="Confirmed" value={String(confirmedSlots)} icon={<CheckCircleOutlined />} trend="Ready to go" trendColor="#0f8a8f" />
              <StatCardChart title="Pending" value={String(pendingSlots)} icon={<SyncOutlined />} trend="Awaiting confirmation" trendColor="#f59e0b" />
              <StatCardChart title="Today's Total" value={String(week[new Date(2026, 6, 16).getDay()]?.slots.length || 0)} icon={<ClockCircleOutlined />} trend="Active today" trendColor="#3b82f6" />
            </div>

            {/* Week navigator */}
            <motion.div style={{ background: '#fff', borderRadius: 12, padding: 24, marginTop: 24, boxShadow: '0 4px 16px rgba(0,0,0,0.02)' }} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
              <div className="schedule-week-nav">
                <Button icon={<LeftOutlined />} onClick={() => setWeekOffset(w => w - 1)}>Prev Week</Button>
                <Title level={5} style={{ margin: 0 }}>
                  {week[0].date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })} – {week[6].date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                </Title>
                <Button icon={<RightOutlined />} onClick={() => setWeekOffset(w => w + 1)}>Next Week</Button>
              </div>

              {/* Day selector */}
              <div className="day-selector">
                {week.map(({ date, dayIdx, slots }) => (
                  <div key={dayIdx} className={`day-card ${selectedDay === dayIdx ? 'active' : ''} ${dayIdx === 0 || dayIdx === 6 ? 'weekend' : ''}`} onClick={() => setSelectedDay(dayIdx)}>
                    <Text style={{ fontSize: 12, color: '#94a3b8' }}>{DAYS[dayIdx]}</Text>
                    <div style={{ fontSize: 22, fontWeight: 700, color: selectedDay === dayIdx ? '#0f8a8f' : '#1e293b' }}>{date.getDate()}</div>
                    <Badge count={slots.length} style={{ backgroundColor: selectedDay === dayIdx ? '#0f8a8f' : '#94a3b8' }} />
                  </div>
                ))}
              </div>

              {/* Slots for selected day */}
              <Title level={5} style={{ marginBottom: 16, color: '#475569' }}>{FULL_DAYS[selectedDay]} — {selectedDayData.slots.length} slot(s)</Title>
              {selectedDayData.slots.length === 0 ? (
                <EmptyState title="No Appointments" description="No scheduled slots for this day." />
              ) : (
                <div className="slot-list">
                  {selectedDayData.slots.map(slot => {
                    const sc = statusStyles[slot.status] || { color: '#64748b', bg: '#f1f5f9' };
                    return (
                      <motion.div key={slot.id} className="slot-card" whileHover={{ y: -2 }}>
                        <Space>
                          <Avatar icon={<UserOutlined />} style={{ background: '#e0f2fe' }} />
                          <div>
                            <strong>{slot.patient}</strong>
                            <div><Text type="secondary" style={{ fontSize: 12 }}>{slot.type} · {slot.room}</Text></div>
                          </div>
                        </Space>
                        <Space>
                          <Tag icon={<ClockCircleOutlined />}>{slot.time}</Tag>
                          <span style={{ color: sc.color, background: sc.bg, padding: '3px 10px', borderRadius: 10, fontSize: '0.78rem', fontWeight: 600 }}>{slot.status}</span>
                          <Button size="small" type="primary" ghost onClick={() => toast.success(`Consultation started for ${slot.patient}`)}>Start</Button>
                        </Space>
                      </motion.div>
                    );
                  })}
                </div>
              )}
            </motion.div>
          </div>
        )}
      </DashboardLayout>
    </>
  );
};

export default Schedule;
