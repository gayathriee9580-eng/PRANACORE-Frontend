import { Skeleton } from "antd";
import "./ProfileSkeleton.css";

const ProfileSkeleton = () => {
  return (
    <div className="psk-root" aria-busy="true" aria-live="polite">

      {/* Avatar + Identity */}
      <div className="psk-card psk-identity">
        <Skeleton active avatar={{ size: 96, shape: "circle" }} title={{ width: 180 }} paragraph={{ rows: 2, width: [160, 200] }} />
      </div>

      {/* KPI Cards */}
      <div className="psk-kpi-grid">
        {Array.from({ length: 4 }).map((_, i) => (
          <div key={i} className="psk-card psk-kpi">
            <Skeleton active title={{ width: "50%" }} paragraph={{ rows: 1 }} />
          </div>
        ))}
      </div>

      {/* Personal Info */}
      <div className="psk-card psk-section">
        <Skeleton active title={{ width: 200 }} paragraph={{ rows: 5, width: ["60%", "80%", "70%", "55%", "75%"] }} />
      </div>

      {/* Health Summary */}
      <div className="psk-bottom-grid">
        {Array.from({ length: 2 }).map((_, i) => (
          <div key={i} className="psk-card psk-health">
            <Skeleton active title={{ width: 160 }} paragraph={{ rows: 4 }} />
          </div>
        ))}
      </div>

    </div>
  );
};

export default ProfileSkeleton;
