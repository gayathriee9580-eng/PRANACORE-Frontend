import React from "react";
import {
  HeartFilled,
  BulbOutlined,
  BranchesOutlined,
  SmileOutlined,
  BgColorsOutlined,
  WomanOutlined,
  SoundOutlined,
  EyeOutlined,
  ExperimentOutlined,
  MedicineBoxOutlined
} from "@ant-design/icons";

const departmentsData = [
  {
    id: 1,
    iconKey: "Cardiology",
    name: "Cardiology",
    description: "Comprehensive cardiovascular care for heart health, electrophysiology, and failure programs.",
    doctorCount: 25,
    servicesCount: 12,
    rating: 4.9,
    availability: "Available Today",
    colorClass: "dept-cardiology"
  },
  {
    id: 2,
    iconKey: "Neurology",
    name: "Neurology",
    description: "Advanced brain and nerve clinics for neurological recovery, headache management, and seizures.",
    doctorCount: 18,
    servicesCount: 9,
    rating: 4.8,
    availability: "Available Today",
    colorClass: "dept-neurology"
  },
  {
    id: 3,
    iconKey: "Orthopedics",
    name: "Orthopedics",
    description: "Specialized joint surgeries, bone alignments, cast settings, and physical rehabilitation.",
    doctorCount: 22,
    servicesCount: 11,
    rating: 4.7,
    availability: "Available Today",
    colorClass: "dept-orthopedics"
  },
  {
    id: 4,
    iconKey: "Pediatrics",
    name: "Pediatrics",
    description: "Holistic child healthcare parameters, neonatal support, immunizations, and wellness clinics.",
    doctorCount: 30,
    servicesCount: 14,
    rating: 4.9,
    availability: "Available Today",
    colorClass: "dept-pediatrics"
  },
  {
    id: 5,
    iconKey: "Dermatology",
    name: "Dermatology",
    description: "Professional laser therapies, medical dermatology, skin cancer screenings, and cosmetology.",
    doctorCount: 15,
    servicesCount: 8,
    rating: 4.6,
    availability: "Available Today",
    colorClass: "dept-dermatology"
  },
  {
    id: 6,
    iconKey: "Gynecology",
    name: "Gynecology",
    description: "Premium women's health wellness, prenatal screenings, and reproductive system therapies.",
    doctorCount: 20,
    servicesCount: 10,
    rating: 4.8,
    availability: "Available Today",
    colorClass: "dept-gynecology"
  },
  {
    id: 7,
    iconKey: "ENT",
    name: "ENT",
    description: "Diagnosis and treatments of ear, nose, throat disorders, sinuses, and auditory parameter issues.",
    doctorCount: 12,
    servicesCount: 7,
    rating: 4.5,
    availability: "Available Today",
    colorClass: "dept-ent"
  },
  {
    id: 8,
    iconKey: "Ophthalmology",
    name: "Ophthalmology",
    description: "Expert eye diagnostics, corrective optical services, cataracts treatments, and retinal care.",
    doctorCount: 16,
    servicesCount: 8,
    rating: 4.7,
    availability: "Available Today",
    colorClass: "dept-ophthalmology"
  },
  {
    id: 9,
    iconKey: "Radiology",
    name: "Radiology",
    description: "High-resolution diagnostics imaging, MRI scans, CT screens, and bone densitometry.",
    doctorCount: 14,
    servicesCount: 6,
    rating: 4.9,
    availability: "Available Today",
    colorClass: "dept-radiology"
  },
  {
    id: 10,
    iconKey: "GeneralMedicine",
    name: "General Medicine",
    description: "Family medical care, physical checkups, chronic health alignments, and routine treatments.",
    doctorCount: 40,
    servicesCount: 18,
    rating: 4.8,
    availability: "Available Today",
    colorClass: "dept-general"
  }
];

export const getDeptIcon = (key) => {
  switch (key) {
    case "Cardiology":
      return <HeartFilled />;
    case "Neurology":
      return <BulbOutlined />;
    case "Orthopedics":
      return <BranchesOutlined />;
    case "Pediatrics":
      return <SmileOutlined />;
    case "Dermatology":
      return <BgColorsOutlined />;
    case "Gynecology":
      return <WomanOutlined />;
    case "ENT":
      return <SoundOutlined />;
    case "Ophthalmology":
      return <EyeOutlined />;
    case "Radiology":
      return <ExperimentOutlined />;
    default:
      return <MedicineBoxOutlined />;
  }
};

export default departmentsData;
