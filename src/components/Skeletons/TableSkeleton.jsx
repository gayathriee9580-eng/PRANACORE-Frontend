import { Skeleton } from "antd";
import "./TableSkeleton.css";

const TableSkeleton = ({ rows = 8 }) => {
  return (
    <div className="tsk-root" aria-busy="true" aria-live="polite">

      {/* Toolbar */}
      <div className="tsk-toolbar">
        <Skeleton active title={{ width: 200 }} paragraph={false} />
        <div className="tsk-toolbar-actions">
          <Skeleton.Button active size="default" style={{ width: 100 }} />
          <Skeleton.Button active size="default" style={{ width: 100 }} />
        </div>
      </div>

      {/* Table Header */}
      <div className="tsk-header">
        {Array.from({ length: 5 }).map((_, i) => (
          <div key={i} className="tsk-header-cell">
            <Skeleton active title={{ width: "80%" }} paragraph={false} />
          </div>
        ))}
      </div>

      {/* Table Rows */}
      <div className="tsk-body">
        {Array.from({ length: rows }).map((_, i) => (
          <div key={i} className="tsk-row">
            {Array.from({ length: 5 }).map((_, j) => (
              <div key={j} className="tsk-cell">
                <Skeleton active title={{ width: j === 0 ? "60%" : "80%" }} paragraph={false} />
              </div>
            ))}
          </div>
        ))}
      </div>

    </div>
  );
};

export default TableSkeleton;
