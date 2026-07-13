import React, { memo } from "react";
import {
  BarChart as RechartsBarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { motion } from "framer-motion";
import "./Charts.css";

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: "easeOut" } },
};

/**
 * Reusable BarChart component for the PRANACORE Analytics library.
 *
 * @param {Object} props
 * @param {string} props.title - Chart heading.
 * @param {Array<Object>} props.data - Array of data points.
 * @param {string} props.dataKey - Key in data objects to render as bar values.
 * @param {string} props.xKey - Key in data objects to use for the X axis.
 * @param {number} [props.height=280] - Chart height in pixels.
 */
const BarChart = memo(({ title, data = [], dataKey, xKey, height = 280 }) => {
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
          <RechartsBarChart data={data} margin={{ top: 8, right: 16, left: 0, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" vertical={false} />
            <XAxis
              dataKey={xKey}
              tick={{ fill: "#64748b", fontSize: 12 }}
              axisLine={false}
              tickLine={false}
            />
            <YAxis
              tick={{ fill: "#64748b", fontSize: 12 }}
              axisLine={false}
              tickLine={false}
            />
            <Tooltip
              contentStyle={{
                background: "#ffffff",
                border: "1px solid #e5e7eb",
                borderRadius: 12,
                fontSize: 13,
                boxShadow: "0 4px 12px rgba(15,23,42,0.08)",
              }}
              cursor={{ fill: "rgba(15,138,143,0.06)" }}
            />
            <Bar
              dataKey={dataKey}
              fill="#0f8a8f"
              radius={[6, 6, 0, 0]}
              isAnimationActive
              animationDuration={800}
            />
          </RechartsBarChart>
        </ResponsiveContainer>
      </div>
    </motion.div>
  );
});

BarChart.displayName = "BarChart";

export default BarChart;
