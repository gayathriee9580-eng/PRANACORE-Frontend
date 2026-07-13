import React, { memo } from "react";
import {
  PieChart as RechartsPieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { motion } from "framer-motion";
import "./Charts.css";

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: "easeOut" } },
};

const PIE_COLORS = [
  "#0f8a8f",
  "#38b2ac",
  "#14b8a6",
  "#34d399",
  "#60a5fa",
  "#a78bfa",
  "#fb923c",
  "#f87171",
];

/**
 * Reusable PieChart component for the PRANACORE Analytics library.
 *
 * @param {Object} props
 * @param {string} props.title - Chart heading.
 * @param {Array<Object>} props.data - Array of data points.
 * @param {string} props.dataKey - Key in data objects for numeric values.
 * @param {string} props.nameKey - Key in data objects for slice labels.
 * @param {number} [props.height=280] - Chart height in pixels.
 */
const PieChart = memo(({ title, data = [], dataKey, nameKey, height = 280 }) => {
  return (
    <motion.div
      className="chart-card"
      variants={fadeUp}
      initial="hidden"
      animate="visible"
    >
      {title && (
        <div className="chart-card-header">
          <h3 className="chart-card-title">{title}</h3>
        </div>
      )}
      <div className="chart-card-body">
        <ResponsiveContainer width="100%" height={height}>
          <RechartsPieChart>
            <Pie
              data={data}
              dataKey={dataKey}
              nameKey={nameKey}
              cx="50%"
              cy="50%"
              outerRadius="70%"
              isAnimationActive
              animationBegin={0}
              animationDuration={800}
            >
              {data.map((_, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={PIE_COLORS[index % PIE_COLORS.length]}
                />
              ))}
            </Pie>
            <Tooltip
              contentStyle={{
                background: "#ffffff",
                border: "1px solid #e5e7eb",
                borderRadius: 12,
                fontSize: 13,
                boxShadow: "0 4px 12px rgba(15,23,42,0.08)",
              }}
            />
            <Legend
              iconType="circle"
              iconSize={10}
              wrapperStyle={{ fontSize: 13, color: "#64748b", paddingTop: 12 }}
            />
          </RechartsPieChart>
        </ResponsiveContainer>
      </div>
    </motion.div>
  );
});

PieChart.displayName = "PieChart";

export default PieChart;
