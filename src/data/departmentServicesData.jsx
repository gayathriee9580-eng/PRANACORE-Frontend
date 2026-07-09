const departmentServicesData = {
  Cardiology: {
    hodName: "Dr. Sarah Mitchell",
    hodCredential: "MD, FACC - Chief of Cardiology",
    hodBio: "Dr. Mitchell is a fellow of the American College of Cardiology with 14+ years of expertise in interventional cardiology and structural heart treatments.",
    equipment: ["State-of-the-art Cath Lab", "3D Echocardiography Scanner", "High-Resolution ECG Monitors", "Holter Monitor Workstations"],
    services: ["Coronary Angioplasty", "Heart Failure Management", "Arrhythmia Treatment", "Preventive Cardiology Screenings"],
    hours: "Monday - Friday: 8 AM - 6 PM",
    contactHotline: "+1 (555) 392-1001",
    overview: "Our Cardiology department offers advanced cardiovascular diagnostic testing, clinical therapies, and interventional procedures. We are committed to rendering top-tier heart care with high precision.",
    testimonials: [
      { id: 1, name: "Marcus Aurelius", rating: 5, comment: "Exceptional care during my angioplasty procedure. Dr. Mitchell was extremely reassuring." },
      { id: 2, name: "Livia Drusilla", rating: 5, comment: "High-end heart failure monitoring clinic. Very thorough analysis." }
    ],
    faqs: [
      { q: "What should I bring for my first consultation?", a: "Please bring all previous ECG graphs, lab blood results, and a list of active medications." },
      { q: "How long does a general consultation take?", a: "Consultations usually take about 30 to 45 minutes depending on additional tests required." }
    ]
  },
  Neurology: {
    hodName: "Dr. James Patel",
    hodCredential: "MD, PhD - Chief of Neurology",
    hodBio: "Dr. Patel is a leading researcher in neurodegenerative diseases with Johns Hopkins credentials, specializing in movement disorders.",
    equipment: ["3T MRI Scanner", "Digital EEG Workstation", "EMG Diagnostic Unit", "Visual Evoked Potentials Box"],
    services: ["Epilepsy Treatment", "Stroke Rehabilitation Program", "Alzheimer's Care", "Neuromuscular Diagnostics"],
    hours: "Monday - Thursday: 9 AM - 5 PM",
    contactHotline: "+1 (555) 392-1002",
    overview: "The Neurology department focuses on treatments for brain, spinal cord, and peripheral nervous system disorders. We utilize cutting-edge scanners for diagnostic clarity.",
    testimonials: [
      { id: 1, name: "Cassius Clay", rating: 5, comment: "Dr. Patel's approach to epilepsy management changed my life. Excellent diagnostics." }
    ],
    faqs: [
      { q: "Do I need a referral to see a neurologist?", a: "Yes, most plans require a primary physician referral code for specialist billing approvals." }
    ]
  },
  Orthopedics: {
    hodName: "Dr. Kevin Brooks",
    hodCredential: "MD, Board Certified Orthopedic Surgeon",
    hodBio: "Dr. Brooks specializes in advanced minimally invasive joint replacement surgeries and sports rehabilitation.",
    equipment: ["Robotic Joint Replacement Suite", "Digital X-Ray and Fluoroscopy", "High-Field CT Scanner"],
    services: ["Total Knee & Hip Replacement", "Sports Injury Treatments", "Spine Surgery", "Physical Rehabilitation Services"],
    hours: "Monday - Friday: 8 AM - 5 PM",
    contactHotline: "+1 (555) 392-1003",
    overview: "We offer comprehensive bone and musculoskeletal care, covering orthopedic surgeries, trauma alignments, joint fixes, and physical rehabilitation.",
    testimonials: [
      { id: 1, name: "Arthur Pendragon", rating: 5, comment: "Replaced my left hip joint seamlessly. Mobility is completely restored." }
    ],
    faqs: [
      { q: "How long is recovery after joint replacement?", a: "Most patients start walking within 24 hours post-op, with full rehab completing in 8 to 12 weeks." }
    ]
  },
  Pediatrics: {
    hodName: "Dr. Aisha Rauf",
    hodCredential: "MD, FAAP - Director of Pediatrics",
    hodBio: "Dr. Rauf has over 8 years of pediatric experience specializing in adolescent medicine and neonatal care.",
    equipment: ["Pediatric Intensive Care Unit (PICU)", "Neonatal Incubators", "Pediatric Ultrasound Units"],
    services: ["Well-Child Care Checks", "Pediatric Immunization Program", "Developmental Screenings", "Asthma & Allergy Management"],
    hours: "Monday - Saturday: 8 AM - 4 PM",
    contactHotline: "+1 (555) 392-1004",
    overview: "Our team renders clinical wellness checkups, emergency care, and chronic medical support for infants, toddlers, children, and young adolescents.",
    testimonials: [
      { id: 1, name: "Helen of Troy", rating: 5, comment: "Very gentle with my toddler during her flu vaccinations. Highly recommend." }
    ],
    faqs: [
      { q: "Is the department open on weekends?", a: "Yes, our pediatric care department operates on Saturdays until 4:00 PM." }
    ]
  },
  Dermatology: {
    hodName: "Dr. Meera Nair",
    hodCredential: "MD, FAAD - Head of Dermatology",
    hodBio: "Dr. Nair is an expert in cosmetic and medical dermatology, specializing in laser therapies and skin oncology.",
    equipment: ["PicoSure Laser Workstation", "Narrowband UVB Phototherapy Unit", "Digital Dermoscopy System"],
    services: ["Acne & Psoriasis Treatments", "Skin Cancer Screenings", "Laser Resurfacing & Cosmetic Care", "Micrographic Surgery (Mohs)"],
    hours: "Monday - Friday: 9 AM - 6 PM",
    contactHotline: "+1 (555) 392-1005",
    overview: "We offer full-spectrum diagnostics and therapies for skin, hair, nail diseases, cosmetic issues, and skin cancer surgeries.",
    testimonials: [
      { id: 1, name: "Elizabeth Bennet", rating: 4.8, comment: "Cleared my severe eczema flareups within weeks. Very knowledgeable." }
    ],
    faqs: [
      { q: "What cosmetic procedures are offered?", a: "We offer laser surfacing, chemical peels, and cosmetic injections under physician guidance." }
    ]
  },
  Gynecology: {
    hodName: "Dr. Linda Torres",
    hodCredential: "MD, FACOG - Director of Gynecology",
    hodBio: "Dr. Linda Torres is a board-certified Gynecologist with 14 years of experience, specializing in prenatal care and women's health wellness.",
    equipment: ["High-Resolution OB/GYN Ultrasound", "Colposcopy Suite", "Fetal Monitoring Stations"],
    services: ["Prenatal Care & Ultrasound", "Routine Gynecological Screenings", "Family Planning & Birth Control", "Menopause Management"],
    hours: "Monday - Friday: 8 AM - 4 PM",
    contactHotline: "+1 (555) 392-1006",
    overview: "Renders complete reproductive and maternal medical parameters, pregnancy support, routine exams, and gynecological surgical solutions.",
    testimonials: [
      { id: 1, name: "Jane Eyre", rating: 5, comment: "Caring staff and highly skilled doctors. Extremely comfortable checkups." }
    ],
    faqs: [
      { q: "How frequently should I schedule a screening?", a: "An annual gynecological checkup is recommended for preventive care." }
    ]
  },
  ENT: {
    hodName: "Dr. David Vance",
    hodCredential: "MD - Head of Otolaryngology",
    hodBio: "Dr. Vance is a double board-certified ENT surgeon specializing in sinus surgeries and audiological rehabilitation.",
    equipment: ["Video Otoscopy Tower", "Audiology Sound Proof Booth", "Nasal Endoscopy Scopes"],
    services: ["Sinusitis Management & Scope", "Tonsillectomy & Adenoidectomy", "Hearing Assessment & Aids", "Allergy Testing & Therapy"],
    hours: "Monday - Friday: 9 AM - 5 PM",
    contactHotline: "+1 (555) 392-1007",
    overview: "Diagnoses and treats ear, nose, throat, sinuses, larynx, and head/neck structural disorders using advanced endoscopies.",
    testimonials: [
      { id: 1, name: "John Watson", rating: 5, comment: "Resolved my chronic sinusitis which had persisted for years. Excellent surgical care." }
    ],
    faqs: [
      { q: "Do you treat pediatric ear infections?", a: "Yes, our ENT specialists collaborate with pediatrics for pediatric ear tube implants." }
    ]
  },
  Ophthalmology: {
    hodName: "Dr. Rahul Sharma",
    hodCredential: "MD - Ophthalmology Director",
    hodBio: "Dr. Rahul Sharma is a specialist in retinal imaging scans, cataracts, and refractive laser vision corrections.",
    equipment: ["OCT Retinal Scanner", "Refractive Laser Eye Suite", "Autorefractor & Tonometry Bench"],
    services: ["Cataract & Glaucoma Surgery", "LASIK Laser Eye Correction", "Diabetic Retinopathy Management", "Corrective Optical Prescriptions"],
    hours: "Monday - Saturday: 8 AM - 5 PM",
    contactHotline: "+1 (555) 392-1008",
    overview: "The Ophthalmology department provides vision checkups, optic prescription lenses, and laser eye surgeries to restore optical clarity.",
    testimonials: [
      { id: 1, name: "Sherlock Holmes", rating: 5, comment: "Laser corrective surgery was flawless. Vision is back to 20/20." }
    ],
    faqs: [
      { q: "Is LASIK covered under standard health plans?", a: "Most basic insurance plans treat LASIK as elective. Check with our billing desk for packages." }
    ]
  },
  Radiology: {
    hodName: "Dr. Robert Vance",
    hodCredential: "MD - Radiology Director",
    hodBio: "Dr. Vance is an expert in neuroimaging, CT angiography, and interventional radiology protocols with 12+ years expertise.",
    equipment: ["3T MRI Scanner", "64-Slice Cardiac CT Scanner", "High-Resolution Mammography Systems", "Digital X-Ray Room"],
    services: ["MRI & CT Scanning", "Diagnostic Ultrasound Screens", "Mammography Screenings", "Interventional Radiography Guidance"],
    hours: "Monday - Saturday: 24/7 (Emergency Scans)",
    contactHotline: "+1 (555) 392-1009",
    overview: "Provides diagnostics imaging scans supporting all clinical blocks. Reports are processed and digitally signed within hours.",
    testimonials: [
      { id: 1, name: "Winston Smith", rating: 5, comment: "Fast scanning timeline and MRI report upload was completed within 3 hours." }
    ],
    faqs: [
      { q: "How quickly are MRI results uploaded?", a: "Reports are reviewed, signed, and uploaded to the Medical Records portal within 12 to 24 hours." }
    ]
  },
  "General Medicine": {
    hodName: "Dr. Omar Farouk",
    hodCredential: "MD - General Medicine Chief",
    hodBio: "Dr. Omar Farouk is a certified family practitioner dedicated to wellness consultations and managing chronic conditions.",
    equipment: ["Point-of-Care Blood Analyzers", "Spirometry Diagnostic Systems", "Ambulatory Blood Pressure Monitors"],
    services: ["Chronic Health Management", "Adult Vaccinations & Checks", "Annual Physical Examinations", "Acute Illness Treatments"],
    hours: "Monday - Saturday: 8 AM - 8 PM",
    contactHotline: "+1 (555) 392-1010",
    overview: "Our General Medicine department delivers primary healthcare, chronic health parameters alignment, and physical checkup programs.",
    testimonials: [
      { id: 1, name: "Emma Bovary", rating: 5, comment: "The primary care team here is highly supportive and responsive to my Gp consult requests." }
    ],
    faqs: [
      { q: "Do you offer physicals for school/work?", a: "Yes, book a General Medicine slot and we will complete all parameters checklists." }
    ]
  }
};

export default departmentServicesData;
