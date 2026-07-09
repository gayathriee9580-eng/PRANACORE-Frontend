import { motion } from "framer-motion";
import PrimaryButton from "../PrimaryButton";
import "./EmptyState.css";

// ─── Animation variants ──────────────────────────────────────────────────────
const cardVariants = {
  hidden:  { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.35, ease: "easeOut" } },
};

// ─── Component ───────────────────────────────────────────────────────────────
const EmptyState = ({
  title,
  description,
  buttonText,
  onClick,
  icon,
}) => {
  return (
    <motion.div
      className="es-card"
      variants={cardVariants}
      initial="hidden"
      animate="visible"
      role="status"
      aria-live="polite"
    >
      {/* Icon badge */}
      {icon && (
        <div className="es-icon-wrap" aria-hidden="true">
          {icon}
        </div>
      )}

      {/* Title */}
      <h3 className="es-title">{title}</h3>

      {/* Description */}
      {description && (
        <p className="es-description">{description}</p>
      )}

      {/* Action button */}
      {buttonText && onClick && (
        <PrimaryButton
          text={buttonText}
          onClick={onClick}
          className="es-action-btn"
        />
      )}
    </motion.div>
  );
};

export default EmptyState;
