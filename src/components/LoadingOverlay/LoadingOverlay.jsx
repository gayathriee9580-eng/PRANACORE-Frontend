import { Spin } from "antd";
import { motion, AnimatePresence } from "framer-motion";
import "./LoadingOverlay.css";

const overlayVariants = {
  hidden:  { opacity: 0 },
  visible: { opacity: 1 },
  exit:    { opacity: 0 },
};

const LoadingOverlay = ({ loading, text = "Loading..." }) => {
  return (
    <AnimatePresence>
      {loading && (
        <motion.div
          className="lo-backdrop"
          key="loading-overlay"
          variants={overlayVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
          transition={{ duration: 0.25 }}
          aria-live="polite"
          aria-busy="true"
          role="status"
        >
          <div className="lo-container">
            <Spin size="large" className="lo-spinner" />
            {text && <p className="lo-text">{text}</p>}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default LoadingOverlay;
