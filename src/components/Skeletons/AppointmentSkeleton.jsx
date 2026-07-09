import { Skeleton } from "antd";
import "./AppointmentSkeleton.css";

const AppointmentSkeleton = () => {
  return (
    <div className="ask-root" aria-busy="true" aria-live="polite">

      {/* Search / Filter Bar */}
      <div className="ask-filter-bar">
        <Skeleton.Input active style={{ width: 240 }} />
        <Skeleton.Button active size="default" style={{ width: 110 }} />
        <Skeleton.Button active size="default" style={{ width: 110 }} />
        <Skeleton.Button active size="default" style={{ width: 110 }} />
      </div>

      {/* Appointment Cards */}
      <div className="ask-cards-grid">
        {Array.from({ length: 4 }).map((_, i) => (
          <div key={i} className="ask-card">
            <div className="ask-card-header">
              <Skeleton active avatar={{ shape: "circle", size: 48 }} title={{ width: "50%" }} paragraph={{ rows: 1 }} />
            </div>
            <Skeleton active title={false} paragraph={{ rows: 3, width: ["80%", "65%", "75%"] }} />
            <div className="ask-card-footer">
              <Skeleton.Button active size="small" style={{ width: 90 }} />
              <Skeleton.Button active size="small" style={{ width: 90 }} />
            </div>
          </div>
        ))}
      </div>

      {/* Table Placeholder */}
      <div className="ask-card ask-table-section">
        <Skeleton active title={{ width: 200 }} paragraph={false} />
        <div className="ask-table-rows">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="ask-table-row">
              <Skeleton active title={false} paragraph={{ rows: 1, width: "100%" }} />
            </div>
          ))}
        </div>
      </div>

    </div>
  );
};

export default AppointmentSkeleton;
