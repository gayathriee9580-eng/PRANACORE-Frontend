import { ExclamationCircleOutlined } from "@ant-design/icons";
import { motion } from "framer-motion";
import PrimaryButton from "../PrimaryButton";
import "./ErrorState.css";

// ─── Animation variants ──────────────────────────────────────────────────────
const cardVariants = {
  hidden:  { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.35, ease: "easeOut" } },
};

// ─── Component ───────────────────────────────────────────────────────────────
const ErrorState = ({
  title = "Something Went Wrong",
  description,
  buttonText = "Try Again",
  onRetry,
  icon,
}) => {
  const IconComponent = icon ?? <ExclamationCircleOutlined />;

  return (
    <motion.div
      className="err-card"
      variants={cardVariants}
      initial="hidden"
      animate="visible"
      role="alert"
      aria-live="assertive"
    >
      {/* Icon badge */}
      <div className="err-icon-wrap" aria-hidden="true">
        {IconComponent}
      </div>

      {/* Title */}
      <h3 className="err-title">{title}</h3>

      {/* Description */}
      {description && (
        <p className="err-description">{description}</p>
      )}

      {/* Retry button */}
      {onRetry && (
        <PrimaryButton
          text={buttonText}
          onClick={onRetry}
          className="err-action-btn"
        />
      )}
    </motion.div>
  );
};

export default ErrorState;
