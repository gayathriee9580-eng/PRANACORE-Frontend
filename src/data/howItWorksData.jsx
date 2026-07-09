import React from "react";
import {
  SearchOutlined,
  CalendarOutlined,
  CheckCircleOutlined,
  HeartOutlined
} from "@ant-design/icons";

const howItWorksData = [
  {
    id: 1,
    stepNumber: "01",
    icon: <SearchOutlined aria-hidden="true" />,
    title: "Find a Doctor",
    description: "Browse verified specialists across multiple departments."
  },
  {
    id: 2,
    stepNumber: "02",
    icon: <CalendarOutlined aria-hidden="true" />,
    title: "Choose Date & Time",
    description: "Select your preferred appointment slot."
  },
  {
    id: 3,
    stepNumber: "03",
    icon: <CheckCircleOutlined aria-hidden="true" />,
    title: "Confirm Booking",
    description: "Receive instant appointment confirmation."
  },
  {
    id: 4,
    stepNumber: "04",
    icon: <HeartOutlined aria-hidden="true" />,
    title: "Visit the Doctor",
    description: "Meet your doctor and receive quality healthcare."
  }
];

export default howItWorksData;
