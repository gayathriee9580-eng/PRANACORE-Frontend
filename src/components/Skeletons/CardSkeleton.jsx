import { Skeleton } from "antd";
import "./CardSkeleton.css";

const CardSkeleton = ({ count = 1 }) => {
  return (
    <div className="csk-grid" aria-busy="true" aria-live="polite">
      {Array.from({ length: count }).map((_, i) => (
        <div key={i} className="csk-card">

          {/* Image placeholder */}
          <Skeleton.Image active className="csk-image" />

          {/* Content */}
          <div className="csk-content">
            <Skeleton active title={{ width: "60%" }} paragraph={{ rows: 2, width: ["90%", "75%"] }} />
          </div>

          {/* Footer action */}
          <div className="csk-footer">
            <Skeleton.Button active size="default" style={{ width: 120 }} />
          </div>

        </div>
      ))}
    </div>
  );
};

export default CardSkeleton;
