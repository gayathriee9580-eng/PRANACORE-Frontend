import { Modal } from "antd";
import {
  ExclamationCircleOutlined,
  CloseCircleOutlined,
  CheckCircleOutlined,
  InfoCircleOutlined,
} from "@ant-design/icons";
import { motion } from "framer-motion";
import "./ConfirmationModal.css";

// ─── Type configuration ──────────────────────────────────────────────────────
const TYPE_CONFIG = {
  warning: {
    icon: ExclamationCircleOutlined,
    color: "#f59e0b",
    confirmClass: "cm-btn-confirm cm-btn-warning",
  },
  danger: {
    icon: CloseCircleOutlined,
    color: "#ef4444",
    confirmClass: "cm-btn-confirm cm-btn-danger",
  },
  success: {
    icon: CheckCircleOutlined,
    color: "#10b981",
    confirmClass: "cm-btn-confirm cm-btn-success",
  },
  info: {
    icon: InfoCircleOutlined,
    color: "#0f8a8f",
    confirmClass: "cm-btn-confirm cm-btn-info",
  },
};

// ─── Animation variants ──────────────────────────────────────────────────────
const contentVariants = {
  hidden:  { opacity: 0, scale: 0.95 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.25 } },
};

// ─── Component ───────────────────────────────────────────────────────────────
const ConfirmationModal = ({
  visible = false,
  title = "Are you sure?",
  description = "",
  confirmText = "Confirm",
  cancelText = "Cancel",
  type = "warning",
  loading = false,
  onConfirm,
  onCancel,
}) => {
  const config = TYPE_CONFIG[type] ?? TYPE_CONFIG.warning;
  const Icon = config.icon;

  return (
    <Modal
      open={visible}
      onCancel={onCancel}
      footer={null}
      centered
      closable={false}
      maskClosable={true}
      keyboard={true}
      width={440}
      className="cm-modal"
      styles={{ body: { padding: 0 } }}
    >
      <motion.div
        className="cm-body"
        variants={contentVariants}
        initial="hidden"
        animate={visible ? "visible" : "hidden"}
      >
        {/* Icon */}
        <div className="cm-icon-wrap" style={{ color: config.color }}>
          <Icon className="cm-icon" />
        </div>

        {/* Title */}
        <h3 className="cm-title">{title}</h3>

        {/* Description */}
        {description && <p className="cm-description">{description}</p>}

        {/* Footer */}
        <div className="cm-footer">
          <button
            className="cm-btn-cancel"
            onClick={onCancel}
            disabled={loading}
            type="button"
          >
            {cancelText}
          </button>
          <button
            className={config.confirmClass}
            onClick={onConfirm}
            disabled={loading}
            type="button"
            style={{ backgroundColor: config.color, borderColor: config.color }}
          >
            {loading ? (
              <span className="cm-spinner" aria-hidden="true" />
            ) : null}
            {confirmText}
          </button>
        </div>
      </motion.div>
    </Modal>
  );
};

export default ConfirmationModal;
