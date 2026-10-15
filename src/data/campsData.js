export const CAMP_CATEGORIES = [
  { id: 'all', label: 'All Speciality Camps', icon: 'Sparkles', count: 8 },
  { id: 'dental', label: 'Dental Camps', icon: 'Smile', count: 2 },
  { id: 'aligner', label: 'Aligner Camps', icon: 'Layers', count: 1 },
  { id: 'skin', label: 'Skin & Laser Camps', icon: 'Sparkles', count: 2 },
  { id: 'hair', label: 'Hair & Scalp Camps', icon: 'Zap', count: 1 },
  { id: 'fat-reduction', label: 'Body Fat Reduction Camps', icon: 'Activity', count: 1 },
  { id: 'social', label: 'Social & Rural Outreach', icon: 'HeartHandshake', count: 1 }
];

export const CAMP_SERVICES = [
  {
    id: 'free-consultation',
    title: '100% Free Specialist Consultations',
    description: 'Direct 1-on-1 evaluation with certified Maxillofacial Surgeons, Cosmetic Dermatologists, and Trichologists.',
    icon: 'ShieldCheck',
    badge: 'Zero Fee'
  },
  {
    id: 'digital-scans',
    title: '3D Intraoral & AI Body Scans',
    description: 'High-precision 3D digital dental scans, InBody 570 metabolic composition, and digital skin pigmentation mapping.',
    icon: 'Search',
    badge: 'Advanced Tech'
  },
  {
    id: 'trichoscopy-skin',
    title: 'Follicular & Wood’s Lamp Analysis',
    description: 'Magnified scalp density trichoscopy and UV skin analysis for deep dermal sun damage and melanin distribution.',
    icon: 'Sparkles',
    badge: 'Specialist Diagnostics'
  },
  {
    id: 'oral-cancer',
    title: 'Oral Cancer & Pre-Cancer Screening',
    description: 'Specialized visual & VELscope screening for early detection of leukoplakia, submucous fibrosis, and mucosal health.',
    icon: 'Activity',
    badge: 'Early Detection'
  },
  {
    id: 'subsidized-care',
    title: 'Camp-Exclusive Concession Vouchers',
    description: 'Up to 40% privilege treatment vouchers for follow-up root canals, laser treatments, aligners, and hair therapies.',
    icon: 'CheckCircle2',
    badge: 'Special Privilege'
  },
  {
    id: 'free-starter-kits',
    title: 'Complimentary Care Starter Kits',
    description: 'Free specialized oral hygiene kits, therapeutic skincare samples, and personalized nutritional guidance charts.',
    icon: 'Gift',
    badge: 'Free Giveaway'
  }
];

export const CAMP_STATS = [
  { value: '180+', label: 'Speciality Camps', sub: 'Across Tamil Nadu & Kerala' },
  { value: '55,000+', label: 'Patients Evaluated', sub: 'Dental, Skin, Hair & Body' },
  { value: '100%', label: 'Free Diagnostics', sub: 'Zero Consultation Fees' },
  { value: '25+', label: 'Years of Trust', sub: 'Under Dr. A. Bladbin & Specialists' }
];

export const defaultCamps = [
  // ─── 1. DENTAL CAMPS ───
  {
    id: 'mega-dental-camp-thuckalay-2026',
    title: 'Mega Dental & Oral Health Screening Camp',
    tagline: 'Comprehensive Oral Checkup, Digital Caries Detection & Free Emergency Pain Relief',
    category: 'dental',
    campType: 'Dental Camp',
    status: 'upcoming',
    date: 'September 28, 2026',
    isoDate: '2026-09-28T09:00:00',
    time: '9:00 AM – 4:30 PM',
    location: 'Jerush Community Hall, Near Old Bus Stand, Thuckalay',
    targetBeneficiaries: 'General Public, Senior Citizens & Families',
    expectedBeneficiaries: '600+ Patients',
    leadDoctors: 'Dr. A. Bladbin, MDS, PhD & Dr. C. Binila Asir, MDS',
    teamSize: '8 Dental Surgeons, 4 Hygienists, 6 Nursing Staff',
    coverImage: '/images/events/medical-camp/free-community-medical-camp-group-photo.webp',
    galleryImages: [
      '/images/events/medical-camp/free-community-medical-camp-group-photo.webp',
      '/images/events/medical-camp/doctors-providing-health-consultation-medical-camp.webp',
      '/images/events/medical-camp/medical-camp-health-screening-patient-care.webp',
      '/images/events/medical-camp/bladbin-inaugurating-medical-camp-jerush.webp'
    ],
    servicesProvided: [
      'Free Oral Cancer & Leukoplakia Screening',
      'Digital Intraoral Camera Caries Checkups',
      'Free Pediatric Fluoride Cavity Barrier Varnish',
      'Emergency Tooth Extraction for Severe Pain Relief',
      'Complimentary Toothbrush & Fluoride Paste Kit',
      '40% Concession Vouchers for Crowns, RCT & Implants'
    ],
    description: 'Jerush Dentofacial organizes a mega one-day dental outreach camp bringing hospital-grade diagnostic chairs and sterilization to provide free oral diagnosis, emergency relief, and hygiene guidance.',
    organizer: 'Jerush Medical Foundation & Rotary Club of Thuckalay',
    contactNumber: '+91 94891 60055',
    registrationRequired: true,
    capacity: 500,
    registeredCount: 184
  },
  {
    id: 'school-smile-bright-nagercoil-2026',
    title: 'School Smile Bright — Pediatric Preventive Dental Camp',
    tagline: 'Empowering Children with Healthy Cavity-Free Smiles & Fluoride Protection',
    category: 'dental',
    campType: 'Dental Camp',
    status: 'upcoming',
    date: 'October 14, 2026',
    isoDate: '2026-10-14T09:30:00',
    time: '9:30 AM – 3:30 PM',
    location: 'St. Joseph Higher Secondary School Auditorium, Nagercoil',
    targetBeneficiaries: 'Primary & High School Students (Ages 5–16)',
    expectedBeneficiaries: '850+ Students',
    leadDoctors: 'Dr. Sherine Ponraj, MDS & Dr. Suryambika, BDS',
    teamSize: '5 Pediatric Dental Specialists, 6 Clinical Assistants',
    coverImage: '/images/events/medical-camp/medical-camp-health-screening-patient-care.webp',
    galleryImages: [
      '/images/events/medical-camp/medical-camp-health-screening-patient-care.webp',
      '/images/events/medical-camp/free-medical-checkup-community-health-camp.webp',
      '/images/events/medical-camp/jerush-medical-camp-group-photo.webp'
    ],
    servicesProvided: [
      'Milk & Permanent Teeth Cavity Screening',
      'Pit & Fissure Sealant Applications for Molars',
      'Topical Fluoride Protective Enamel Varnish',
      'Interactive 2-Minute Circular Brushing Workshop',
      'Personalized Dental Health Report Card for Parents',
      'Free Smile Champion Medals & Dental Care Kits'
    ],
    description: 'A focused pediatric oral health intervention designed to stop childhood tooth decay before it starts, featuring painless preventive sealants and child-friendly dental education.',
    organizer: 'Jerush Pediatric Dental Wing & School PTA',
    contactNumber: '+91 94891 60055',
    registrationRequired: false,
    capacity: 900,
    registeredCount: 420
  },

  // ─── 2. ALIGNER CAMPS ───
  {
    id: 'jerush-aligner-smile-preview-camp-2026',
    title: 'Jerush Clear Aligner 3D Scan & Smile Simulation Camp',
    tagline: 'Experience Instant Before-and-After 3D Smile Transformation Preview at Zero Cost',
    category: 'aligner',
    campType: 'Aligner Camp',
    status: 'upcoming',
    date: 'October 22, 2026',
    isoDate: '2026-10-22T10:00:00',
    time: '10:00 AM – 6:00 PM',
    location: 'Jerush Aligner Innovation Lounge, Anna Nagar, Chennai & Thuckalay',
    targetBeneficiaries: 'Teens, Young Adults & Working Professionals with Crooked Teeth or Gaps',
    expectedBeneficiaries: '250+ Participants',
    leadDoctors: 'Dr. A. Prabin, CEO & Certified Clear Aligner Orthodontists',
    teamSize: '4 Orthodontic Specialists, 4 3D Digital Scanning Technicians',
    coverImage: '/images/events/jerushaligne-opening-event/jerushaligne-manufacturing-units-open.webp',
    galleryImages: [
      '/images/events/jerushaligne-opening-event/jerushaligne-manufacturing-units-open.webp',
      '/images/events/jerushaligne-opening-event/clear-aligner-sheet-printing-unit.webp',
      '/images/events/jerushaligne-opening-event/clear-aligner-jerushaligne-drilling-unit.webp',
      '/images/events/jerushaligne-opening-event/jerush-doctors-ceo.webp'
    ],
    servicesProvided: [
      'Free High-Definition 3D Intraoral Digital Scanning (Zero Gooey Impression)',
      'Instant AI-Powered 3D Smile Transformation Simulation',
      'Comprehensive Malocclusion & Overbite Assessment',
      'Personalized Clear Aligner Treatment Roadmap & Duration Estimate',
      'Flat ₹15,000 Camp Privilege Voucher for Full In-House Aligner Treatment',
      'Complimentary Retainer Case & Cleaning Tablets on Booking'
    ],
    description: 'Discover how invisible, custom-fabricated Jerush Aligners can straighten your teeth without painful wires or brackets. Get your digital 3D scan and walk away with an exact 3D visual preview of your future smile.',
    organizer: 'Jerush Aligner Manufacturing Division',
    contactNumber: '+91 97510 10107',
    registrationRequired: true,
    capacity: 300,
    registeredCount: 168
  },

  // ─── 3. SKIN & DERMATOLOGY CAMPS ───
  {
    id: 'skin-glow-laser-screening-camp-2026',
    title: 'Advanced Skin, Acne & Laser Pigmentation Assessment Camp',
    tagline: 'Comprehensive Dermascope Analysis, Acne Scar Consultation & Pico Laser Demos',
    category: 'skin',
    campType: 'Skin Camp',
    status: 'upcoming',
    date: 'November 08, 2026',
    isoDate: '2026-11-08T10:00:00',
    time: '10:00 AM – 5:30 PM',
    location: 'Jerush Cosmetology & Laser Centre, Super-Speciality Wing, Trichy',
    targetBeneficiaries: 'Individuals with Acne Scars, Melasma, Hyperpigmentation & Dull Skin',
    expectedBeneficiaries: '300+ Attendees',
    leadDoctors: 'Dr. Aishwarya, MD (Dermatology) & Aesthetic Laser Specialists',
    teamSize: '4 Cosmetic Dermatologists, 5 Clinical Estheticians',
    coverImage: '/images/medical-services/fractional_co2_laser.png',
    galleryImages: [
      '/images/medical-services/fractional_co2_laser.png',
      '/images/medical-services/pico_laser.png',
      '/images/medical-services/hydrafacial.png',
      '/images/events/dr-bladbin-birthday/jerush-dental-cosmetic-doctors.webp'
    ],
    servicesProvided: [
      'Free High-Resolution Digital Dermascope Skin Analysis',
      'Wood’s Lamp Deep Epidermal Pigmentation Screening',
      'Fractional CO2 Laser & Pico-Toning Suitability Evaluation',
      'Custom Medical-Grade Acne & Chemical Peel Prescriptions',
      '35% Camp Concession on HydraFacial & Laser Carbon Peel Packages',
      'Complimentary Dermatologist-Formulated Sunscreen & Cleanser Trial Kit'
    ],
    description: 'Get deep clinical insights into your skin health. Our cosmetic dermatologists evaluate melanin depth, sebum levels, collagen health, and recommend US-FDA approved laser therapies tailored to your skin type.',
    organizer: 'Jerush Advanced Cosmetology & Laser Institute',
    contactNumber: '+91 94891 60011',
    registrationRequired: true,
    capacity: 250,
    registeredCount: 145
  },
  {
    id: 'skin-anti-aging-bridal-glow-camp-2026',
    title: 'Bridal Skin Radiance & Anti-Aging Aesthetic Camp',
    tagline: 'Non-Invasive Skin Rejuvenation, Collagen Boosting & Glow Protocol Consultations',
    category: 'skin',
    campType: 'Skin Camp',
    status: 'completed',
    date: 'June 20, 2026',
    isoDate: '2026-06-20T09:30:00',
    time: '9:30 AM – 5:00 PM',
    location: 'Jerush Aesthetic Clinic, Marthandam',
    targetBeneficiaries: 'Brides, Grooms & Anyone Seeking Youthful Skin Rejuvenation',
    expectedBeneficiaries: '220+ Participants',
    leadDoctors: 'Dr. C. Binila Asir, MDS & Cosmetology Clinical Team',
    teamSize: '3 Aesthetic Specialists, 4 Laser Therapists',
    coverImage: '/images/medical-services/skin_whitening.png',
    galleryImages: [
      '/images/medical-services/skin_whitening.png',
      '/images/medical-services/carbon_peel.png',
      '/images/events/dr-bladbin-birthday/aishwarya-with-binila-priya-doctor.webp'
    ],
    servicesProvided: [
      '3D Facial Volume & Wrinkle Depth Profiling',
      'Glutathione & Vitamin C Infusion Assessment',
      'Carbon Laser Peel Live Demonstration',
      'Personalized Pre-Wedding Skincare Regimen',
      'Free Anti-Oxidant Serum Sample Dispensary'
    ],
    description: 'A specialized aesthetic camp assisting wedding couples and individuals in achieving healthy, radiant skin using modern non-invasive dermatological protocols.',
    organizer: 'Jerush Cosmetology Wing',
    contactNumber: '+91 94891 60055',
    registrationRequired: false,
    capacity: 250,
    registeredCount: 242
  },

  // ─── 4. HAIR & SCALP CAMPS ───
  {
    id: 'hair-loss-trichoscopy-gfc-camp-2026',
    title: 'Advanced Hair Loss, Scalp Trichoscopy & GFC Therapy Camp',
    tagline: 'State-of-the-Art Micro-Camera Scalp Diagnosis, GFC/PRP Assessment & Hair Transplant Evaluation',
    category: 'hair',
    campType: 'Hair Camp',
    status: 'upcoming',
    date: 'November 18, 2026',
    isoDate: '2026-11-18T10:00:00',
    time: '10:00 AM – 6:00 PM',
    location: 'Jerush Hair Restoration Centre, Thuckalay & Kanyakumari',
    targetBeneficiaries: 'Men & Women Experiencing Thinning Hair, Receding Hairline, Alopecia or Dandruff',
    expectedBeneficiaries: '350+ Patients',
    leadDoctors: 'Certified Trichology Surgeons & Hair Restoration Specialists',
    teamSize: '4 Hair Surgeons, 4 Scalp Technicians, 3 Patient Counselors',
    coverImage: '/images/medical-services/gfc_hair_therapy.png',
    galleryImages: [
      '/images/medical-services/gfc_hair_therapy.png',
      '/images/medical-services/qr678_therapy.png',
      '/images/events/medical-camp/doctors-providing-health-consultation-medical-camp.webp'
    ],
    servicesProvided: [
      'Free High-Magnification Scalp Trichoscopy & Follicular Density Analysis',
      'Evaluation of Norwood / Ludwig Scale Hair Loss Pattern',
      'GFC (Growth Factor Concentrate) & QR678 Bio-Therapy Suitability Test',
      'Painless FUE & DHI Robotic Hair Transplant Graft Calculation',
      'Flat 30% Privilege Voucher for GFC Hair Growth Session Packages',
      'Complimentary Scalp Balancing Shampoo & Peptide Hair Serum Sample'
    ],
    description: 'Address hair loss scientifically. Using 200x digital trichoscopy, our hair doctors examine hair root miniaturization, scalp sebum balance, and deliver personalized non-surgical and surgical regrowth plans.',
    organizer: 'Jerush Hair & Scalp Restoration Institute',
    contactNumber: '+91 94891 60055',
    registrationRequired: true,
    capacity: 400,
    registeredCount: 210
  },

  // ─── 5. BODY FAT REDUCTION & WELLNESS CAMPS ───
  {
    id: 'body-fat-cryo-sculpting-camp-2026',
    title: 'Non-Surgical Body Fat Reduction & Cryo-Sculpting Camp',
    tagline: 'Medical InBody 570 Body Composition, Stubborn Belly Fat Analysis & Free Cryolipolysis Demos',
    category: 'fat-reduction',
    campType: 'Body Fat Reduction Camp',
    status: 'upcoming',
    date: 'December 05, 2026',
    isoDate: '2026-12-05T09:30:00',
    time: '9:30 AM – 5:30 PM',
    location: 'Jerush Wellness & Body Contouring Centre, Thuckalay Main Campus',
    targetBeneficiaries: 'Individuals Seeking Non-Surgical Belly, Thigh, Love Handles & Double Chin Fat Loss',
    expectedBeneficiaries: '280+ Participants',
    leadDoctors: 'Body Contouring Specialists & Clinical Nutritionists',
    teamSize: '3 Aesthetic Physicians, 3 Cryo Technicians, 2 Dieticians',
    coverImage: '/images/medical-services/cryo_sculpting.png',
    galleryImages: [
      '/images/medical-services/cryo_sculpting.png',
      '/images/events/dr-bladbin-birthday/jerush-all-team-thuckalay.webp',
      '/images/events/medical-camp/dr-stalin-medical-camp-press-meet.webp'
    ],
    servicesProvided: [
      'Free InBody 570 Multi-Frequency Segmental Fat & Muscle Scan',
      'Visceral Fat, Basal Metabolic Rate (BMR) & Water Balance Profiling',
      'Targeted Stubborn Fat Cryolipolysis (Fat Freezing) Assessment',
      'Non-Surgical Double Chin & Abdominal Sculpting Treatment Planning',
      '35% Camp Concession Voucher for 360° Cryo-Sculpting Sessions',
      'Complimentary Personalized Anti-Inflammatory Metabolic Diet Plan'
    ],
    description: 'Target stubborn fat pockets without surgery, cuts, or downtime. Receive a comprehensive medical body composition scan and learn how controlled thermal cooling permanently eliminates localized fat cells.',
    organizer: 'Jerush Body Wellness & Aesthetic Medicine Department',
    contactNumber: '+91 94891 60055',
    registrationRequired: true,
    capacity: 300,
    registeredCount: 156
  },

  // ─── 6. SOCIAL & COMMUNITY WELFARE CAMPS ───
  {
    id: 'coastal-tribal-social-welfare-camp-2026',
    title: 'Free Coastal & Tribal Village Multi-Speciality Health Mission',
    tagline: 'Delivering Free Dental, General Health, Scalp & Oral Cancer Relief to Underserved Communities',
    category: 'social',
    campType: 'Social & Rural Outreach',
    status: 'completed',
    date: 'July 18, 2026',
    isoDate: '2026-07-18T09:00:00',
    time: '9:00 AM – 5:00 PM',
    location: 'St. Mary’s Parish Community Grounds, Colachel Coastal Road',
    targetBeneficiaries: 'Fishermen Families, Tribal Settlements & Senior Citizens',
    expectedBeneficiaries: '520+ Screened',
    leadDoctors: 'Dr. A. Bladbin, MDS, PhD & Jerush Multi-Disciplinary Doctor Team',
    teamSize: '10 Specialists, 6 Nurses, 8 Community Volunteers',
    coverImage: '/images/events/medical-camp/jerush-medical-camp-group-photo.webp',
    galleryImages: [
      '/images/events/medical-camp/jerush-medical-camp-group-photo.webp',
      '/images/events/medical-camp/doctors-providing-health-consultation-medical-camp.webp',
      '/images/events/medical-camp/dr-stalin-dr-bladbin-jerush-stage.webp',
      '/images/events/medical-camp/medical-awareness-rally-police-department.webp',
      '/images/events/medical-camp/medical-camp-group-photo-with-police.webp'
    ],
    servicesProvided: [
      'Free Denture Consultations & Mobile Extractions for Elderly',
      'Oral Submucous Fibrosis & Tobacco Cancer Screening',
      'Scalp Fungal & Dermatological Infection Screening',
      'Blood Pressure, Blood Glucose & BMI Cross-Examinations',
      'Free Distribution of 400+ Vitamin Supplements & Oral Hygiene Kits',
      'Delivery of 48 Free Custom Removable Acrylic Dentures'
    ],
    description: 'A landmark community initiative by Jerush Medical Foundation providing high-standard medical, dental, and dermatological relief to remote coastal and hill-tract communities with zero charges.',
    organizer: 'Jerush Medical Foundation & Coastal Fishermen Welfare Association',
    contactNumber: '+91 94891 60055',
    registrationRequired: false,
    capacity: 600,
    registeredCount: 520
  }
];

export const defaultCampInquiries = [
  {
    id: 'inq-101',
    organizationName: 'Rotary Club of Marthandam',
    contactPerson: 'Mr. S. Rajendran',
    designation: 'Community Service Director',
    phone: '+91 98421 77211',
    email: 'rajendran.rotary@gmail.com',
    preferredDate: '2026-11-15',
    location: 'Marthandam Town Hall',
    campType: 'Dental Camp',
    expectedCount: '300-400 People',
    notes: 'We would like to request Jerush Mobile Dental Unit for a Sunday free screening camp focusing on rural families.',
    status: 'approved',
    submittedAt: '2026-08-10T14:30:00'
  },
  {
    id: 'inq-102',
    organizationName: 'Little Flower Matriculation School',
    contactPerson: 'Sister Philomina',
    designation: 'Principal',
    phone: '+91 94432 88123',
    email: 'littleflower.thuckalay@edu.in',
    preferredDate: '2026-11-28',
    location: 'School Campus, Thuckalay',
    campType: 'Dental Camp',
    expectedCount: '650 Students',
    notes: 'Requesting pediatric screening for grades 1 to 8 with toothbrush distribution.',
    status: 'pending',
    submittedAt: '2026-08-15T11:15:00'
  },
  {
    id: 'inq-103',
    organizationName: 'TechPark Employees Welfare Association',
    contactPerson: 'Mrs. Deepa Krishnan',
    designation: 'HR Lead',
    phone: '+91 97890 12345',
    email: 'deepa.hr@techpark.in',
    preferredDate: '2026-12-10',
    location: 'TechPark Campus, Trichy',
    campType: 'Skin Camp',
    expectedCount: '250+ Tech Professionals',
    notes: 'Requesting workplace dermatology and laser skin consultation camp for software engineers.',
    status: 'pending',
    submittedAt: '2026-08-18T16:20:00'
  }
];


