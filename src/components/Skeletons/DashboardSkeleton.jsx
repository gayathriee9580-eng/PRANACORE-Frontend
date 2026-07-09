import { Skeleton } from "antd";
import "./DashboardSkeleton.css";

const DashboardSkeleton = () => {
  return (
    <div className="dsk-root" aria-busy="true" aria-live="polite">

      {/* Hero Banner */}
      <div className="dsk-hero dsk-card">
        <Skeleton active paragraph={{ rows: 2 }} />
      </div>

      {/* KPI Cards */}
      <div className="dsk-kpi-grid">
        {Array.from({ length: 4 }).map((_, i) => (
          <div key={i} className="dsk-card dsk-kpi-card">
            <Skeleton active avatar={{ shape: "square", size: 48 }} paragraph={{ rows: 2 }} />
          </div>
        ))}
      </div>

      {/* Upcoming Appointment */}
      <div className="dsk-card dsk-section">
        <Skeleton active title={{ width: 200 }} paragraph={{ rows: 3 }} />
      </div>

      {/* Quick Actions */}
      <div className="dsk-quick-grid">
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className="dsk-card dsk-quick-card">
            <Skeleton active avatar={{ shape: "circle", size: 40 }} paragraph={{ rows: 1 }} />
          </div>
        ))}
      </div>

      {/* Recent Appointments Table */}
      <div className="dsk-card dsk-section">
        <Skeleton active title={{ width: 220 }} paragraph={false} />
        <div className="dsk-table-rows">
          {Array.from({ length: 5 }).map((_, i) => (
            <div key={i} className="dsk-table-row">
              <Skeleton active title={false} paragraph={{ rows: 1, width: "100%" }} />
            </div>
          ))}
        </div>
      </div>

      {/* Health Tips + Progress Cards */}
      <div className="dsk-bottom-grid">
        {Array.from({ length: 3 }).map((_, i) => (
          <div key={i} className="dsk-card">
            <Skeleton active avatar={{ shape: "square", size: 64 }} paragraph={{ rows: 2 }} />
          </div>
        ))}
      </div>

    </div>
  );
};

export default DashboardSkeleton;
