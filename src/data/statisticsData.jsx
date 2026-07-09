import React from "react";
import {
  MedicineBoxOutlined,
  TeamOutlined,
  CalendarOutlined,
  SafetyCertificateOutlined
} from "@ant-design/icons";

const statisticsData = [
  {
    id: 1,
    icon: <MedicineBoxOutlined aria-hidden="true" />,
    target: 500,
    suffix: "+",
    title: "Verified Doctors",
    description: "Experienced specialists across multiple departments.",
    colorClass: "hospital-stat"
  },
  {
    id: 2,
    icon: <TeamOutlined aria-hidden="true" />,
    target: 10000,
    suffix: "+",
    title: "Happy Patients",
    description: "Successfully treated patients with excellent care.",
    colorClass: "team-stat"
  },
  {
    id: 3,
    icon: <CalendarOutlined aria-hidden="true" />,
    target: 50000,
    suffix: "+",
    title: "Appointments Booked",
    description: "Appointments booked quickly and efficiently.",
    colorClass: "calendar-stat"
  },
  {
    id: 4,
    icon: <SafetyCertificateOutlined aria-hidden="true" />,
    target: 98,
    suffix: "%",
    title: "Patient Satisfaction",
    description: "Highly rated healthcare experience.",
    colorClass: "safety-stat"
  }
];

export default statisticsData;
