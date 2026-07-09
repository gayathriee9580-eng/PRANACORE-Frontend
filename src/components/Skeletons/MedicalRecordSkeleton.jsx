import { Skeleton } from "antd";
import "./MedicalRecordSkeleton.css";

const MedicalRecordSkeleton = () => {
  return (
    <div className="mrsk-root" aria-busy="true" aria-live="polite">

      {/* Hero Banner */}
      <div className="mrsk-card mrsk-hero">
        <Skeleton active paragraph={{ rows: 2 }} title={{ width: 260 }} />
      </div>

      {/* Filter Toolbar */}
      <div className="mrsk-toolbar">
        <Skeleton.Input active style={{ width: 220 }} />
        <Skeleton.Button active size="default" style={{ width: 100 }} />
        <Skeleton.Button active size="default" style={{ width: 100 }} />
      </div>

      {/* Medical Record Cards */}
      <div className="mrsk-cards-grid">
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className="mrsk-card mrsk-record-card">
            <div className="mrsk-record-header">
              <Skeleton active avatar={{ shape: "square", size: 48 }} title={{ width: "55%" }} paragraph={{ rows: 1 }} />
            </div>
            <Skeleton active title={false} paragraph={{ rows: 3, width: ["90%", "70%", "80%"] }} />
            <div className="mrsk-record-footer">
              <Skeleton.Button active size="small" style={{ width: 90 }} />
              <Skeleton.Button active size="small" style={{ width: 90 }} />
            </div>
          </div>
        ))}
      </div>

    </div>
  );
};

export default MedicalRecordSkeleton;
