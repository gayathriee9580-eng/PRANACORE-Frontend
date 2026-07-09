import React from "react";
import {
  TeamOutlined,
  CalendarOutlined,
  FileProtectOutlined,
  VideoCameraOutlined,
  CreditCardOutlined,
  HeartOutlined
} from "@ant-design/icons";

const servicesData = [
  {
    id: 1,
    icon: <TeamOutlined aria-hidden="true" />,
    title: "Find Doctors",
    description: "Search and connect with experienced doctors across multiple specialties.",
    colorClass: "icon-find-docs"
  },
  {
    id: 2,
    icon: <CalendarOutlined aria-hidden="true" />,
    title: "Book Appointments",
    description: "Schedule appointments online with real-time availability.",
    colorClass: "icon-book-app"
  },
  {
    id: 3,
    icon: <FileProtectOutlined aria-hidden="true" />,
    title: "Medical Records",
    description: "Securely access prescriptions and medical history anytime.",
    colorClass: "icon-med-records"
  },
  {
    id: 4,
    icon: <VideoCameraOutlined aria-hidden="true" />,
    title: "Online Consultation",
    description: "Consult doctors remotely through secure video appointments.",
    colorClass: "icon-online-consult"
  },
  {
    id: 5,
    icon: <CreditCardOutlined aria-hidden="true" />,
    title: "Secure Payments",
    description: "Pay consultation fees safely using trusted payment methods.",
    colorClass: "icon-payments"
  },
  {
    id: 6,
    icon: <HeartOutlined aria-hidden="true" />,
    title: "24/7 Emergency Support",
    description: "Immediate assistance whenever urgent healthcare is needed.",
    colorClass: "icon-emergency"
  }
];

export default servicesData;
