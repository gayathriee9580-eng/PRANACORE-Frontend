import { createContext, useContext, useMemo } from "react";
import { message } from "antd";

// ─── Config ──────────────────────────────────────────────────────────────────
const MESSAGE_CONFIG = {
  top: 24,
  duration: 3,
  maxCount: 3,
};

// ─── Context ──────────────────────────────────────────────────────────────────
const ToastContext = createContext(null);

// ─── Provider ────────────────────────────────────────────────────────────────
export const ToastProvider = ({ children }) => {
  const [messageApi, contextHolder] = message.useMessage(MESSAGE_CONFIG);

  const toast = useMemo(
    () => ({
      success: (msg) => messageApi.success(msg),
      error:   (msg) => messageApi.error(msg),
      warning: (msg) => messageApi.warning(msg),
      info:    (msg) => messageApi.info(msg),
    }),
    [messageApi]
  );

  return (
    <ToastContext.Provider value={toast}>
      {contextHolder}
      {children}
    </ToastContext.Provider>
  );
};

// ─── Hook ────────────────────────────────────────────────────────────────────
export const useToast = () => {
  const context = useContext(ToastContext);

  if (context === null) {
    throw new Error("useToast must be used within ToastProvider");
  }

  return context;
};
