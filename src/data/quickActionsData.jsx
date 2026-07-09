import {
  CalendarOutlined,
  TeamOutlined,
  FolderOpenOutlined,
  VideoCameraOutlined,
  AlertOutlined,
  CreditCardOutlined,
} from "@ant-design/icons";

const quickActionsData = [
  {
    id: 1,
    icon: <CalendarOutlined />,
    label: "Book Appointment",
    color: "#0f8a8f",
    bgColor: "rgba(15, 138, 143, 0.08)",
  },
  {
    id: 2,
    icon: <TeamOutlined />,
    label: "Find Doctors",
    color: "#6366f1",
    bgColor: "rgba(99, 102, 241, 0.08)",
  },
  {
    id: 3,
    icon: <FolderOpenOutlined />,
    label: "Medical Records",
    color: "#f59e0b",
    bgColor: "rgba(245, 158, 11, 0.08)",
  },
  {
    id: 4,
    icon: <VideoCameraOutlined />,
    label: "Online Consultation",
    color: "#10b981",
    bgColor: "rgba(16, 185, 129, 0.08)",
  },
  {
    id: 5,
    icon: <AlertOutlined />,
    label: "Emergency",
    color: "#ef4444",
    bgColor: "rgba(239, 68, 68, 0.08)",
  },
  {
    id: 6,
    icon: <CreditCardOutlined />,
    label: "Payments",
    color: "#8b5cf6",
    bgColor: "rgba(139, 92, 246, 0.08)",
  },
];

export default quickActionsData;
