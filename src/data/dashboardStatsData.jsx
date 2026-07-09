import { 
  CalendarOutlined, 
  MedicineBoxOutlined,
  FolderOpenOutlined,
  CreditCardOutlined
} from "@ant-design/icons";

const dashboardStatsData = [
  {
    id: 1,
    icon: <CalendarOutlined />,
    label: "Upcoming Appointments",
    value: "12",
    description: "Scheduled this month",
    trend: "+3 this week",
    trendUp: true,
    color: "#0f8a8f",
    bgColor: "rgba(15, 138, 143, 0.08)",
  },
  {
    id: 2,
    icon: <MedicineBoxOutlined />,
    label: "Today's Consultations",
    value: "4",
    description: "Consultations today",
    trend: "2 remaining",
    trendUp: null,
    color: "#6366f1",
    bgColor: "rgba(99, 102, 241, 0.08)",
  },
  {
    id: 3,
    icon: <FolderOpenOutlined />,
    label: "Medical Records",
    value: "36",
    description: "Records available",
    trend: "+2 new reports",
    trendUp: true,
    color: "#f59e0b",
    bgColor: "rgba(245, 158, 11, 0.08)",
  },
  {
    id: 4,
    icon: <CreditCardOutlined />,
    label: "Pending Payments",
    value: "3",
    description: "Invoices outstanding",
    trend: "$240 due",
    trendUp: false,
    color: "#ef4444",
    bgColor: "rgba(239, 68, 68, 0.08)",
  },
];

export default dashboardStatsData;
