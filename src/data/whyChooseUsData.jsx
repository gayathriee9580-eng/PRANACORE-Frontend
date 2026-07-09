import React from "react";
import {
  SafetyCertificateOutlined,
  CalendarOutlined,
  FileProtectOutlined,
  CustomerServiceOutlined,
  DeploymentUnitOutlined,
  HeartOutlined
} from "@ant-design/icons";

const whyChooseUsData = [
  {
    id: 1,
    icon: <SafetyCertificateOutlined aria-hidden="true" />,
    title: "Verified Doctors",
    description: "Every healthcare provider is thoroughly certified and vetted."
  },
  {
    id: 2,
    icon: <CalendarOutlined aria-hidden="true" />,
    title: "Instant Appointment Booking",
    description: "Book physically or consult digitally in just a few clicks."
  },
  {
    id: 3,
    icon: <FileProtectOutlined aria-hidden="true" />,
    title: "Secure Medical Records",
    description: "Your health records are encrypted and securely stored."
  },
  {
    id: 4,
    icon: <CustomerServiceOutlined aria-hidden="true" />,
    title: "24/7 Patient Support",
    description: "Our dedicated support desk is available around the clock."
  },
  {
    id: 5,
    icon: <DeploymentUnitOutlined aria-hidden="true" />,
    title: "Modern Healthcare Technology",
    description: "Equipped with state-of-the-art virtual consultation tools."
  },
  {
    id: 6,
    icon: <HeartOutlined aria-hidden="true" />,
    title: "Trusted by Thousands",
    description: "Delivering patient-centric healthcare with high satisfaction."
  }
];

export default whyChooseUsData;
