import React, { memo } from "react";
import {
  AreaChart as RechartsAreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  defs,
  linearGradient,
  stop,
} from "recharts";
import { motion } from "framer-motion";
import "./Charts.css";

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: "easeOut" } },
};

/**
 * Reusable AreaChart component for the PRANACORE Analytics library.
 * Renders with a gradient fill beneath the line.
 *
 * @param {Object} props
 * @param {string} props.title - Chart heading.
 * @param {Array<Object>} props.data - Array of data points.
 * @param {string} props.dataKey - Key in data objects to render as area values.
 * @param {string} props.xKey - Key in data objects to use for the X axis.
 * @param {number} [props.height=280] - Chart height in pixels.
 */
const AreaChart = memo(({ title, data = [], dataKey, xKey, height = 280 }) => {
  const gradientId = `gradient-${dataKey || "area"}`;

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
          <RechartsAreaChart data={data} margin={{ top: 8, right: 16, left: 0, bottom: 0 }}>
            <defs>
              <linearGradient id={gradientId} x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#0f8a8f" stopOpacity={0.25} />
                <stop offset="95%" stopColor="#0f8a8f" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
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
            />
            <Area
              type="monotone"
              dataKey={dataKey}
              stroke="#0f8a8f"
              strokeWidth={2.5}
              fill={`url(#${gradientId})`}
              dot={{ fill: "#0f8a8f", r: 4 }}
              activeDot={{ r: 6, fill: "#14b8a6" }}
              isAnimationActive
              animationDuration={800}
            />
          </RechartsAreaChart>
        </ResponsiveContainer>
      </div>
    </motion.div>
  );
});

AreaChart.displayName = "AreaChart";

export default AreaChart;
