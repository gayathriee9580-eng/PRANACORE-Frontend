const invoicesData = [
  {
    key: "INV-2026-001",
    id: "INV-2026-001",
    doctor: "Dr. Sarah Mitchell",
    department: "Cardiology",
    hospital: "PRANACORE City Hospital",
    issueDate: "June 20, 2026",
    dueDate: "July 05, 2026",
    patientName: "John Doe",
    patientAge: 45,
    patientGender: "Male",
    status: "Paid",
    items: [
      { id: 1, name: "Specialist Consultation Fee", quantity: 1, unitPrice: 120, total: 120 },
      { id: 2, name: "Electrocardiogram (ECG)", quantity: 1, unitPrice: 85, total: 85 },
      { id: 3, name: "Echocardiogram", quantity: 1, unitPrice: 220, total: 220 },
      { id: 4, name: "Pharmacy - Antihypertensive Medications", quantity: 1, unitPrice: 45, total: 45 }
    ],
    subtotal: 470,
    tax: 37.60,
    discount: 50.00,
    total: 457.60,
    paymentMethod: "Visa ending in 4242",
    paymentDate: "June 20, 2026",
    transactionId: "TXN-90281-9201"
  },
  {
    key: "INV-2026-002",
    id: "INV-2026-002",
    doctor: "Dr. James Patel",
    department: "Neurology",
    hospital: "PRANACORE North Wing",
    issueDate: "June 15, 2026",
    dueDate: "June 30, 2026",
    patientName: "John Doe",
    patientAge: 45,
    patientGender: "Male",
    status: "Paid",
    items: [
      { id: 1, name: "Neurology Consultation", quantity: 1, unitPrice: 150, total: 150 },
      { id: 2, name: "MRI Brain (Contrast)", quantity: 1, unitPrice: 650, total: 650 },
      { id: 3, name: "Pharmacy - Muscle Relaxants", quantity: 1, unitPrice: 32, total: 32 }
    ],
    subtotal: 832,
    tax: 66.56,
    discount: 0.00,
    total: 898.56,
    paymentMethod: "Apple Pay (Mastercard)",
    paymentDate: "June 15, 2026",
    transactionId: "TXN-82710-1829"
  },
  {
    key: "INV-2026-003",
    id: "INV-2026-003",
    doctor: "Dr. Aisha Rauf",
    department: "Pediatrics",
    hospital: "PRANACORE Children's Centre",
    issueDate: "June 08, 2026",
    dueDate: "June 23, 2026",
    patientName: "Emily Doe",
    patientAge: 8,
    patientGender: "Female",
    status: "Paid",
    items: [
      { id: 1, name: "Pediatric Consultation", quantity: 1, unitPrice: 80, total: 80 },
      { id: 2, name: "Annual Immunization Package", quantity: 1, unitPrice: 110, total: 110 }
    ],
    subtotal: 190,
    tax: 15.20,
    discount: 25.20,
    total: 180.00,
    paymentMethod: "Visa ending in 4242",
    paymentDate: "June 08, 2026",
    transactionId: "TXN-17293-9201"
  },
  {
    key: "INV-2026-004",
    id: "INV-2026-004",
    doctor: "Dr. Kevin Brooks",
    department: "Orthopedics",
    hospital: "PRANACORE City Hospital",
    issueDate: "June 28, 2026",
    dueDate: "July 15, 2026",
    patientName: "John Doe",
    patientAge: 45,
    patientGender: "Male",
    status: "Unpaid",
    items: [
      { id: 1, name: "Orthopedic Consultation", quantity: 1, unitPrice: 200, total: 200 },
      { id: 2, name: "X-Ray Left Knee (AP & Lateral)", quantity: 1, unitPrice: 95, total: 95 },
      { id: 3, name: "Knee Joint Infiltration (Steroid)", quantity: 1, unitPrice: 150, total: 150 },
      { id: 4, name: "Physiotherapy Session (Initial)", quantity: 1, unitPrice: 75, total: 75 }
    ],
    subtotal: 520,
    tax: 41.60,
    discount: 0.00,
    total: 561.60
  },
  {
    key: "INV-2026-005",
    id: "INV-2026-005",
    doctor: "Dr. Meera Nair",
    department: "Dermatology",
    hospital: "PRANACORE Skin Care Clinic",
    issueDate: "July 01, 2026",
    dueDate: "July 16, 2026",
    patientName: "John Doe",
    patientAge: 45,
    patientGender: "Male",
    status: "Unpaid",
    items: [
      { id: 1, name: "Dermatology Consultation", quantity: 1, unitPrice: 90, total: 90 },
      { id: 2, name: "Cryotherapy (Lesions Removal)", quantity: 1, unitPrice: 120, total: 120 },
      { id: 3, name: "Pharmacy - Topical Treatments", quantity: 1, unitPrice: 58, total: 58 }
    ],
    subtotal: 268,
    tax: 21.44,
    discount: 20.00,
    total: 269.44
  },
  {
    key: "INV-2026-006",
    id: "INV-2026-006",
    doctor: "Dr. Rahul Sharma",
    department: "Ophthalmology",
    hospital: "PRANACORE Eye Care",
    issueDate: "June 25, 2026",
    dueDate: "July 10, 2026",
    patientName: "John Doe",
    patientAge: 45,
    patientGender: "Male",
    status: "Overdue",
    items: [
      { id: 1, name: "Comprehensive Eye Exam", quantity: 1, unitPrice: 100, total: 100 },
      { id: 2, name: "Retinal Imaging Scan", quantity: 1, unitPrice: 85, total: 85 },
      { id: 3, name: "Prescription Corrective Lenses", quantity: 1, unitPrice: 140, total: 140 }
    ],
    subtotal: 325,
    tax: 26.00,
    discount: 15.00,
    total: 336.00
  }
];

export default invoicesData;
