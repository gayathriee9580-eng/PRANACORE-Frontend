import React, { memo } from "react";
import { motion } from "framer-motion";
import "./Charts.css";

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: "easeOut" } },
};

/**
 * Reusable StatCardChart component for the PRANACORE Analytics library.
 * Displays a small KPI card with an icon, title, value, and optional trend indicator.
 *
 * @param {Object} props
 * @param {string} props.title - Card label.
 * @param {string|number} props.value - Main value to display.
 * @param {React.ReactNode} [props.icon] - Icon element.
 * @param {string} [props.trend] - Trend text (e.g. "+12% this week").
 * @param {string} [props.trendColor] - CSS color for the trend text (e.g. "#10b981").
 */
const StatCardChart = memo(({ title, value, icon, trend, trendColor = "#10b981" }) => {
  return (
    <motion.div
      className="stat-card"
      variants={fadeUp}
      initial="hidden"
      animate="visible"
      whileHover={{ y: -3 }}
    >
      {icon && (
        <div className="stat-card-icon-wrap" aria-hidden="true">
          {icon}
        </div>
      )}
      <div className="stat-card-content">
        <p className="stat-card-title">{title}</p>
        <p className="stat-card-value">{value}</p>
        {trend && (
          <p className="stat-card-trend" style={{ color: trendColor }}>
            {trend}
          </p>
        )}
      </div>
    </motion.div>
  );
});

StatCardChart.displayName = "StatCardChart";

export default StatCardChart;
