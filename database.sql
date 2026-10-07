-- Jerush Dentoface & Cosmetic Laser Centre Database Schema
-- Compatible with MySQL 5.7+ and 8.0+
-- USE `jerush_dentoface`;

-- 1. ADMIN USERS TABLE
CREATE TABLE IF NOT EXISTS `admin_users` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `email` VARCHAR(255) UNIQUE NOT NULL,
  `password` VARCHAR(255) NOT NULL, -- Bcrypt hash of password
  `name` VARCHAR(255) NOT NULL,
  `role` VARCHAR(100) DEFAULT 'Admin',
  `avatar` VARCHAR(255) DEFAULT NULL,
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 2. DOCTORS TABLE
CREATE TABLE IF NOT EXISTS `doctors` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `sort_order` INT DEFAULT 0,
  `name` VARCHAR(255) NOT NULL,
  `role` VARCHAR(255) NOT NULL,
  `qualification` VARCHAR(500) NOT NULL,
  `experience` VARCHAR(100) NOT NULL,
  `image` MEDIUMTEXT DEFAULT NULL,
  `fallback_img` VARCHAR(255) DEFAULT NULL,
  `specialties` TEXT NOT NULL, -- JSON array of strings
  `bio` TEXT NOT NULL,
  `schedule` VARCHAR(255) DEFAULT NULL,
  `facebook` VARCHAR(255) DEFAULT NULL,
  `instagram` VARCHAR(255) DEFAULT NULL,
  `linkedin` VARCHAR(255) DEFAULT NULL,
  `twitter` VARCHAR(255) DEFAULT NULL,
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 3. TREATMENTS TABLE
CREATE TABLE IF NOT EXISTS `treatments` (
  `id` VARCHAR(100) PRIMARY KEY, -- Slug-like unique string identifier
  `title` VARCHAR(255) NOT NULL,
  `category` VARCHAR(100) NOT NULL, -- 'dental', 'cosmetic', 'hair', 'body'
  `desc` TEXT NOT NULL,
  `details` TEXT NOT NULL,
  `benefits` TEXT NOT NULL, -- JSON array of strings
  `image` VARCHAR(255) DEFAULT NULL,
  `iconName` VARCHAR(100) DEFAULT NULL,
  `subtitle` VARCHAR(255) DEFAULT NULL,
  `backDesc` TEXT DEFAULT NULL,
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 4. BLOGS TABLE
CREATE TABLE IF NOT EXISTS `blogs` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `title` VARCHAR(255) NOT NULL,
  `slug` VARCHAR(255) UNIQUE NOT NULL,
  `excerpt` TEXT NOT NULL,
  `content` LONGTEXT NOT NULL,
  `category` VARCHAR(100) NOT NULL,
  `featured_image` VARCHAR(255) DEFAULT NULL,
  `author_name` VARCHAR(255) NOT NULL, -- Author name to map with doctor
  `published_date` VARCHAR(100) NOT NULL,
  `reading_time` VARCHAR(100) DEFAULT '5 min read',
  `status` VARCHAR(50) DEFAULT 'draft', -- 'draft' or 'published'
  `seo_title` VARCHAR(255) DEFAULT NULL,
  `seo_description` TEXT DEFAULT NULL,
  `focus_keywords` TEXT DEFAULT NULL,
  `secondary_keywords` TEXT DEFAULT NULL,
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 5. REVIEWS TABLE
CREATE TABLE IF NOT EXISTS `reviews` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `name` VARCHAR(255) NOT NULL,
  `location` VARCHAR(255) NOT NULL,
  `rating` INT DEFAULT 5,
  `type` VARCHAR(50) DEFAULT 'text',
  `video_url` VARCHAR(255) DEFAULT NULL,
  `video_thumbnail` VARCHAR(255) DEFAULT NULL,
  `treatment` VARCHAR(255) NOT NULL,
  `image` VARCHAR(255) DEFAULT NULL,
  `text` TEXT NOT NULL,
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 6. CAREERS TABLE
CREATE TABLE IF NOT EXISTS `careers` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `title` VARCHAR(255) NOT NULL,
  `department` VARCHAR(255) NOT NULL,
  `location` VARCHAR(255) NOT NULL,
  `type` VARCHAR(100) NOT NULL,
  `experience` VARCHAR(100) NOT NULL,
  `description` TEXT NOT NULL,
  `requirements` TEXT NOT NULL, -- JSON array of strings
  `image` MEDIUMTEXT DEFAULT NULL,
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 6b. CAREER APPLICATIONS TABLE
CREATE TABLE IF NOT EXISTS `career_applications` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `name` VARCHAR(255) NOT NULL,
  `email` VARCHAR(255) NOT NULL,
  `phone` VARCHAR(100) NOT NULL,
  `position` VARCHAR(255) DEFAULT NULL,
  `experience` VARCHAR(255) DEFAULT NULL,
  `resumeName` VARCHAR(255) DEFAULT NULL,
  `resumeData` LONGTEXT DEFAULT NULL,
  `notes` TEXT DEFAULT NULL,
  `submitted_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 7. ADMIN TOKENS TABLE
CREATE TABLE IF NOT EXISTS `admin_tokens` (
  `token` VARCHAR(255) PRIMARY KEY,
  `email` VARCHAR(255) NOT NULL,
  `expires_at` DATETIME NOT NULL,
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 8. ACTIVITY LOG TABLE
CREATE TABLE IF NOT EXISTS `activity_log` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `action` VARCHAR(255) NOT NULL,
  `detail` VARCHAR(500) NOT NULL,
  `type` VARCHAR(100) NOT NULL,
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;



-- ==========================================
-- SEED DATA
-- ==========================================

-- Seed Admin User (Username: admin, Password: admin123)
-- Default bcrypt hash for 'admin123'
INSERT INTO `admin_users` (`email`, `password`, `name`, `role`, `avatar`) VALUES 
('admin', '$2y$10$w4/G/1dM5N3JpX1rP8iBduG2D.aA6K.o0L.rG1sVzU/Yq9fH4v9Z2', 'Jerush Dentoface', 'Super Admin', NULL);

-- Seed Doctors
INSERT INTO `doctors` (`id`, `sort_order`, `name`, `role`, `qualification`, `experience`, `image`, `fallback_img`, `specialties`, `bio`, `schedule`, `facebook`, `instagram`, `linkedin`, `twitter`) VALUES
(1, 1, 'DR. A. BLADBIN', 'Chairman & Maxillofacial Surgeon', 'MBBS(Ukraine), LLB, MDS(OMFS), PHD(Srilanka), PHD(Hons), FAM(Ger), MCHT(Ger), MCDC(Ger)', '27+ Years Experience', '/images/doctors/bladbin1.webp', 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&q=80&w=400', '[\"Maxillofacial Surgery\",\"Hair Transplantation\",\"Dimple Creation\",\"Implantology\",\"Aesthetic Medicine\",\"Cosmetic Dentistry\"]', 'Dr. A. Bladbin stands as a paragon of excellence in the fields of dentistry and oral surgery, serving as the founding Chairman and Chief Dental Surgeon of Jerush Hospitals. Under his visionary leadership, the hospital has grown to serve and treat over one lakh active patients, becoming a beacon of advanced dental and facial healthcare.', 'Mon - Sat (10:00 AM - 6:00 PM)', 'https://www.facebook.com/Dr.A.Bladbin', 'https://www.instagram.com/dr.a.bladbin/', 'https://www.linkedin.com/in/anbiah-bladbin-llb-mds-omfs-fam-mcht-mcdc-99a44561/', NULL),
(2, 2, 'DR. C. BINILA BLADBIN', 'Director & Oral Surgeon', 'MDS (Oral & Maxillofacial Surgery)', '20+ Years Experience', '/images/doctors/binila1.webp', 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&q=80&w=400', '[\"Oral & Maxillofacial Surgery\",\"Cosmetic Dentistry\",\"Dental Implants\",\"Aesthetic Treatments\"]', 'Dr. Binila serves as the esteemed Director of Jerush Dental Hospitals, bringing over 20 years of clinical experience as a leading dental surgeon. She completed her B.D.S. degree in 2004 and subsequently pursued a Postgraduate Master\'s degree in Oral and Maxillofacial Surgery in 2012. Alongside her clinical excellence, she has carved a niche for herself as a Cosmetologist, seamlessly integrating aesthetic treatments into her dental practice.', 'Mon - Sat (9:00 AM - 5:00 PM)', 'https://www.facebook.com/binila.asir', NULL, 'https://www.linkedin.com/in/dr-binila-bladbin-b198b758/', 'https://twitter.com/BladbinBinila?s=09'),
(3, 3, 'DR. SHERINE PONRAJ', 'Prosthodontist', 'BDS., MDS', '18+ Years Experience', '/images/doctors/sherine1.webp', 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&q=80&w=400', '[\"Prosthodontics\",\"Crown and Bridge\",\"Dental Restorations\",\"Evidence-Based Dentistry\"]', 'Sherine graduated with a Bachelor of Dental Science from Annamalai University – 2008. She has been practising dentistry in Missionary hospitals and private practices for over 14 years. She initially obtained \"Fellowship in General and Hospital Dentistry\" from Christian Medical College, Vellore and currently has a post graduation degree in Prosthodontics and Crown and Bridge from Christian Medical College, Ludhiana. Sherine enjoys all aspects of Dentistry and is passionate about delivering evidence based treatments and quality care to her patients in the most professional way possible.', 'Mon - Sat (9:00 AM - 5:00 PM)', NULL, NULL, NULL, NULL),
(4, 4, 'DR. S. BRINDHA', 'Prosthodontist & Implantologist', 'MBA., BDS., MDS', '15+ Years Experience', '/images/doctors/brindha1.webp', 'https://images.unsplash.com/photo-1594824813573-246434de83fb?auto=format&fit=crop&q=80&w=400', '[\"Prosthodontics\",\"Crown and Bridge\",\"Implantology\",\"Cosmetic Treatments\",\"Body Slimming\"]', 'She qualified as a dental surgeon in the year 2010 in KSR Institute of Dental Science and Research, Tiruchengode. She joined as a Dentist in Jerush Dentofacial and Cosmetic Laser Centre, Thuckalay in 2010-2011 and went on to completing her post graduate master degree in Prosthodontics/Crown/Bridge in the year 2014. She has an experience of Academic teaching in CSI Dental College 2014-2016. She also completed MBA (Hospital Management) in Alagappa University in the year 2022. She is talented in all dental/cosmetic oriented treatments and has a special interest in body slimming procedures.', 'Mon - Sat (10:00 AM - 6:00 PM)', NULL, NULL, NULL, NULL),
(5, 5, 'DR. U. NIVEDAN', 'Dental Surgeon & Cosmetologist', 'BDS., FMC., FFAM., PGDMT., PGDAC., MMP', '16+ Years Experience', '/images/doctors/nivethan1.webp', 'https://images.unsplash.com/photo-1537368910025-700350fe46c7?auto=format&fit=crop&q=80&w=400', '[\"Dental Surgery\",\"Cosmetology\",\"Medical Trichology\",\"Diagnostic Radiology\",\"Facial Cosmetics\"]', 'He has done his schooling in Chettinad Vidyashram, Chennai and graduated with his Bachelor Dental Surgery degree from SRM Dental College and Hospital, Kattankulathur. He has thorough clinical knowledge and diagnoses well in accordance to various specialities in his field of interest. He has pursued his facial cosmetic and trichology medicine at ILAMED, Germany and Medical semi permanent makeup at IATAM, US. He is currently pursuing his specialty fellowship in Root canal therapy and Implant Surgery. His areas of special interest are Medical Trichology and Diagnostic Radiology.', 'Mon - Sat (10:00 AM - 6:00 PM)', NULL, NULL, NULL, NULL),
(6, 6, 'DR. V. JASMIN SHAMILI', 'Endodontist & Cosmetic Dentist', 'BDS., MDS', '3+ Years Experience', '/images/doctors/jasmin1.webp', 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&q=80&w=400', '[\"Endodontics\",\"Cosmetic Dentistry\",\"Root Canal Treatment\",\"Advanced Dental Technology\"]', 'Dr. Jasmin Shamili is an excellent oral healthcare professional Endodontist from Kanyakumari, Tamil Nadu. She completed her Post-Graduation in Operative Dentistry and Endodontics in CSI College of Dental Sciences and Research at Madurai. She had published a research paper and won the award of the Journal of Endodontics in the category of Basic Research: Technology from USA. She is more passionate in complicated Endodontics procedures through well advanced technology.', 'Mon - Sat (9:00 AM - 5:00 PM)', NULL, NULL, NULL, NULL),
(7, 7, 'DR. C. J. AISHWARYA', 'Dental Surgeon', 'BDS', '11+ Years Experience', '/images/doctors/aishwarya1.webp', 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&q=80&w=400', '[\"Endodontics\",\"Fixed Partial Dentures\",\"Restorations\",\"Extractions\"]', 'Dr. Aishwarya qualified as a dental surgeon in 2014 and joined Jerush as a duty doctor in 2015. Since her joining, she has excelled in diagnosing dental issues with expertise and precision. Her primary area of interest lies in endodontics, though she has also developed significant expertise in fixed partial dentures, restorations, extractions, and other dental procedures. Dr. Aishwarya\'s dedication and skill have consistently earned positive feedback from patients.', 'Mon - Sat (9:00 AM - 5:00 PM)', NULL, NULL, NULL, NULL),
(8, 8, 'DR. L. V. SARU PADMA', 'Dental Surgeon & Aesthetic Specialist', 'BDS., FDS., FMC', '5+ Years Experience', '/images/doctors/saaru1.webp', 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&q=80&w=400', '[\"Aesthetic Medicine\",\"Dermal Fillers\",\"Neuromodulators\",\"Dental Surgery\"]', 'Dr. Saru Thampi is a distinguished consultant doctor in Aesthetic Medicine with a strong passion for injectables. She has done Graduation from Rajarajeshwari College, Bangalore & Saveetha College, Chennai. She has worked in various hospitals in Chennai and also the faculty for aesthetic courses academy. She is presently doing her specialisation degree from RCPI, Ireland. Her main focus is on enhancing natural beauty through advanced techniques in dermal fillers and neuromodulators. She has received Excellence award in Aesthetic Medicine – Young Doctor\'s category for the year of 2024.', 'Mon - Sat (10:00 AM - 6:00 PM)', NULL, NULL, NULL, NULL),
(9, 9, 'DR. S. GEETHA PRIYA', 'Dental Surgeon & Cosmetologist', 'BDS., MCC., DIRM, SPMU', '15+ Years Experience', '/images/doctors/geetha-priya1.webp', 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&q=80&w=400', '[\"Regenerative Medicine\",\"Cosmetology\",\"Acne Scar Treatment\",\"Anti-Aging Therapy\",\"Semi-Permanent Makeup\"]', 'Qualified dental surgeon in the year 2011 from KSR Institute of Dental Science and Research, Thiruchengode. Practicing Regenerative medicine since 2012. Completed Masters in facial aesthetics and practicing regenerative cosmetology since 2018. Professional Semi-permanent make up since 2020. Received \"Innovative Cosmetologist\" award from Hon CM Dr. Pramod Sawant. Specially interested in regenerative therapy for acne scar & anti-aging, collagen induction therapy, Growth factor therapy.', 'Mon - Sat (10:00 AM - 6:00 PM)', NULL, NULL, NULL, NULL),
(10, 10, 'DR. T. AMEEGA JOLLY', 'Cosmetologist', 'BAMS', '5+ Years Experience', '/images/doctors/ameega1.webp', 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&q=80&w=400', '[\"Cosmetology\",\"Ayurvedic Medicine\",\"Memory Development\",\"Psycho Neurobics\"]', 'Completed BAMS from Maria Ayurveda Medical College. Have a Diploma Degree in Memory Development & Psycho Neurobics. Had worked as Resident Medical Officer in Rishi Ayurveda Hospital, Kottayam & also as a Consultant in B.R Ayush Hospital, Nagercoil. Now working as a Consultant in Jerush Cosmetic Laser Centre. Ability to take initiative with result oriented approach and a positive attitude.', 'Mon - Sat (10:00 AM - 6:00 PM)', NULL, NULL, NULL, NULL),
(11, 11, 'DR. S. ABIRAM PRASAANTH', 'Dental Surgeon, Implantologist & Cosmetologist', 'BDS., FAAID(USA)., FMC., PGDCR', '9+ Years Experience', '/images/doctors/abiram1.webp', 'https://images.unsplash.com/photo-1537368910025-700350fe46c7?auto=format&fit=crop&q=80&w=400', '[\"Dental Surgery\",\"Implantology\",\"Cosmetology\",\"Clinical Research\",\"Root Canal Treatment\"]', 'Dr. Abiram Prasaanth has completed his schooling in Vidya Vikas Boys Higher Secondary School, Tiruchengode and done his under graduation degree in Bachelor of Dental Surgery at SRM Dental College and Hospital, Kattankulathur. He is a registered dental surgeon in Dental Council of Tamil Nadu. He also did his advanced post graduate diploma in clinical research and now currently pursuing a speciality course in root canal treatment. Now he has joined as a dentist in Jerush Hospitals and being a part of Jerush family.', 'Mon - Sat (10:00 AM - 6:00 PM)', NULL, NULL, NULL, NULL),
(12, 12, 'DR. A. VIJAYALAKSHMI', 'Cosmetologist', 'BHMS', '6+ Years Experience', '/images/doctors/viji1.webp', 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&q=80&w=400', '[\"Cosmetology\",\"Homeopathic Medicine\",\"Skin Care\",\"Hair Care\"]', 'Dr. Vijayalakshmi completed her UG degree from White Memorial Homeopathic Medical College in 2019. She started her cosmetologist practice since 2019 in Vcare Hair and Skin Clinic, Tirunelveli. Now she is working as a cosmetologist in Jerush Dentofacial and Cosmetic Laser Center since May 2024.', 'Mon - Sat (10:00 AM - 6:00 PM)', NULL, NULL, NULL, NULL),
(13, 13, 'DR. R. RANISHA', 'Cosmetologist', 'BAMS', '3+ Years Experience', '/images/doctors/renisha1.webp', 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&q=80&w=400', '[\"Cosmetology\",\"Ayurvedic Medicine\",\"Skin Treatments\"]', 'Dr. Ranisha completed her UG from Maria Ayurveda Medical College and Hospital. She practised as a Junior Doctor in Samuel Aayush Hospital for 6 months. Now she is currently working in Jerush Hospital as a Cosmetologist since May 2024.', 'Mon - Sat (10:00 AM - 6:00 PM)', NULL, NULL, NULL, NULL),
(14, 14, 'DR. PRIYADHARSHINI', 'Dental Surgeon', 'BDS', '5+ Years Experience', '/images/doctors/priya1.webp', 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&q=80&w=400', '[\"General Dentistry\",\"Dental Restorations\",\"Oral Diagnostics\"]', 'Dr. Priyadharshini is a dedicated dental surgeon at Jerush Dentofacial and Cosmetic Laser Centre. With her strong clinical foundation and commitment to patient care, she provides comprehensive dental treatment services ranging from routine check-ups to advanced restorations. Her compassionate approach and attention to detail ensure every patient receives the highest quality care.', 'Mon - Sat (9:00 AM - 5:00 PM)', NULL, NULL, NULL, NULL),
(15, 15, 'DR. P. G. SURYAMBIKA', 'Dental Surgeon', 'BDS', '10+ Years Experience', '/images/doctors/suryambika1.webp', 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&q=80&w=400', '[\"General Dentistry\",\"Dental Camps\",\"Advanced Dental Techniques\"]', 'Dr. Suryambika completed BDS in 2014 from Rajas Dental College. She worked in St. Mary\'s Multispeciality Dental Clinic and Kottarathil Dental Clinic in Kottayam District of Kerala for past 7 years. She has attended various camps, public awareness Dental programs and school Dental camps. She is enthusiastic in learning advanced techniques in Dentistry.', 'Mon - Sat (9:00 AM - 5:00 PM)', NULL, NULL, NULL, NULL),
(16, 16, 'DR. C. MONICKA', 'Radiologist & Implantologist', 'BDS, Radiologist', '5+ Years Experience', '', 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&q=80&w=400', '[\"Radiology\",\"Dental Implants\",\"Diagnostic Imaging\"]', 'Dr. C. Monicka is a distinguished Radiologist and Implantologist at Jerush\'s Chennai clinic. With 5+ years of experience, she brings unparalleled diagnostic expertise to the team, combining advanced radiological imaging with precision implant placement for comprehensive patient care.', 'Mon - Sat (10:00 AM - 6:00 PM)', NULL, NULL, NULL, NULL),
(17, 17, 'DR. E. S. JINCY', 'Dental Surgeon, Jerush Dubai', 'BDS', '7+ Years Experience', '/images/doctors/jincy1.webp', 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&q=80&w=400', '[\"General Dentistry\",\"Cosmetic Dentistry\",\"Multilingual Patient Care\"]', 'Dr. Jincy ES is an MOH licensed, dynamic and patient focused dentist who serves her patients to make a tremendous difference in their oral health by diagnosing, treating and managing dental problems using her experience of over 7+ years as a general Dental Professional. She graduated in 2017 from RVS Dental College and Hospital (Coimbatore), and completed senior internship in government hospital, Kuzhithurai. She has a talent to communicate in several languages including English, Tamil, Malayalam, Hindi and Arabic.', 'Mon - Sat (10:00 AM - 6:00 PM)', NULL, NULL, NULL, NULL);

-- Seed Treatments
INSERT INTO `treatments` (`id`, `title`, `category`, `desc`, `details`, `benefits`, `image`, `iconName`, `subtitle`, `backDesc`) VALUES
('clear-aligners', 'Clear Aligners (Jerushaligne)', 'dental', 'Custom invisible aligners designed and manufactured in-house for precise, comfortable teeth straightening without metal braces.', 'Nearly invisible orthodontic treatment using custom digital modeling (CAD/CAM). Removable for meals and oral hygiene, offering a highly convenient alternative to traditional braces.', '[\"Nearly invisible treatment\",\"Removable for eating & cleaning\",\"Digital 3D treatment planning\"]', '/images/treatments/clear_aligners.png', 'Smile', 'Custom invisible aligners designed in-house', 'Our proprietary Jerushaligne clear aligners offer a virtually invisible way to straighten your teeth with precision-engineered, custom-fit trays.'),
('dental-implants', 'Advanced Dental Implants', 'dental', 'CBCT-guided precision titanium implants for permanent tooth replacement with digital 3D planning for optimal results.', 'Bio-compatible titanium anchors placed directly into the jawbone, acting as artificial roots. Provides permanent, robust foundations for crowns, bridges, or dentures.', '[\"CBCT-guided precision planning\",\"98% success rate globally\",\"Lifetime durability with care\"]', '/images/treatments/dental_implants.png', 'ShieldCheck', 'Precision titanium implants for permanent teeth', 'State-of-the-art digital implant placement using CBCT-guided 3D planning for permanent, natural-looking tooth replacement that lasts a lifetime.'),
('root-canal', 'Root Canal Treatment', 'dental', 'Single-visit painless root canal procedures using advanced rotary instruments and apex locators to save damaged teeth.', 'Minimally invasive, single-visit therapy using high-precision rotary instruments to clean, disinfect, and seal infected tooth root canals with virtually zero pain.', '[\"Completed in a single visit\",\"Painless with modern anaesthesia\",\"Save natural tooth structure\"]', '/images/treatments/root_canal.png', 'Heart', 'Single-visit painless root canal with rotary tech', 'Our advanced single-visit root canal procedure uses precision rotary instruments and apex locators to save infected teeth painlessly and efficiently.'),
('fixed-partial-denture', 'Fixed Partial Denture', 'dental', 'Precision dental bridge prosthetics cemented in place to replace one or more missing teeth with natural-looking results.', 'Custom bridges created from premium ceramics or zirconia, permanently fixed to adjacent teeth to bridge dental gaps and restore a complete bite.', '[\"Permanent fixed bridge\",\"Natural appearance\",\"Restores facial structure\"]', '/images/treatments/fixed_partial_denture.png', 'ShieldCheck', NULL, NULL),
('teeth-whitening', 'Professional Teeth Whitening', 'dental', 'In-office laser-assisted whitening treatment that brightens teeth up to 8 shades in a single comfortable session.', 'Clinically supervised whitening utilizing premium bleaching gels activated by cool-blue LED lasers, delivering immediate dramatic results safely.', '[\"Up to 8 shades whiter\",\"Safe on enamel\",\"Immediate 45-minute results\"]', '/images/treatments/teeth_whitening.png', 'Sparkles', NULL, NULL),
('orthodontics', 'Orthodontics (Braces)', 'dental', 'Traditional and modern ceramic braces for complex bite corrections and smile alignment, guided by digital orthodontic planning.', 'Correction of misaligned teeth using high-grade metal, aesthetic ceramic, or self-ligating braces to achieve functional harmony and smile beauty.', '[\"For adults and teens\",\"Corrects complex bites\",\"Long-lasting structural stability\"]', '/images/treatments/orthodontics_braces.png', 'Smile', NULL, NULL),
('wisdom-tooth', 'Wisdom Tooth Extraction', 'dental', 'Safe, minimally invasive extraction of impacted or problematic wisdom teeth with advanced surgical techniques and rapid healing.', 'Surgical removal of impacted third molars performed under localized anesthesia, utilizing advanced sutures and healing protocols to minimize swelling.', '[\"Relieves chronic jaw pain\",\"Minimally invasive extraction\",\"Prevents damage to adjacent teeth\"]', '/images/treatments/wisdom_tooth.png', 'Activity', NULL, NULL),
('fractional-co2-laser', 'Fractional CO₂ Laser', 'cosmetic', 'FDA-approved fractional laser resurfacing for deep acne scar reduction, wrinkle correction, and overall skin texture improvement.', 'Highly advanced carbon dioxide laser emitting columns of thermal energy to trigger deep dermal repair and stimulate abundant collagen, smoothing skin surfaces.', '[\"Visible results in 3-4 sessions\",\"Stimulates collagen production\",\"Minimal downtime recovery\"]', '/images/treatments/fractional_co2_laser.png', 'Flame', 'Advanced skin resurfacing for acne scars & wrinkles', 'FDA-approved fractional laser technology for deep skin resurfacing, dramatically reducing acne scars, fine lines, and uneven skin texture.'),
('hydrafacial', 'HydraFacial Treatment', 'cosmetic', 'Patented multi-step treatment combining cleansing, exfoliation, extraction, and hydration with nutrient-rich serums for instant glow.', 'A clinical skin conditioning therapy using vortex-extraction to deeply purify pores, apply medical-grade chemical peels, and infuse high-dose antioxidants.', '[\"Instant visible skin glow\",\"Suitable for all skin types\",\"Zero downtime, pain-free\"]', '/images/treatments/hydrafacial.png', 'Sparkles', 'Multi-step facial for deep cleansing & radiance', 'A patented multi-step treatment that cleanses, exfoliates, extracts, and hydrates the skin with nutrient-rich serums for instant visible glow.'),
('pico-laser', 'Pico Laser Treatment', 'cosmetic', 'Picosecond laser technology for precise pigmentation removal, tattoo erasure, and skin rejuvenation with minimal heat damage.', 'Delivers laser energy in picoseconds (trillionths of a second) to shatter stubborn melanin pigments and tattoo ink into tiny dust particles without burning the skin.', '[\"Effective pigment removal\",\"Tattoo removal capable\",\"Minimal heat, less discomfort\"]', '/images/treatments/pico_laser.png', 'TrendingUp', 'Ultra-fast laser for pigmentation & skin rejuvenation', 'Picosecond laser technology delivers ultra-short pulses for precise pigmentation removal, tattoo erasure, and overall skin rejuvenation with minimal heat damage.'),
('carbon-peel', 'Carbon Peel Laser', 'cosmetic', 'Hollywood-style carbon peel laser facial for deep pore cleansing, oil control, and radiant, even-toned skin in one session.', 'Liquid carbon mask is applied to the face to absorb impurities. Pico/Q-switched laser is then swept over, instantly vaporizing the carbon and clearing pores.', '[\"Instantly shrinks large pores\",\"Reduces excessive oiliness\",\"Exfoliates dead skin\"]', '/images/treatments/carbon_peel.png', 'Sparkles', NULL, NULL),
('skin-whitening', 'Skin Brightening Treatment', 'cosmetic', 'Advanced glutathione-based skin brightening therapy combined with laser toning for even, luminous complexion results.', 'Synergistic combination of antioxidant therapy, custom vitamin-C infusions, and low-energy laser toning to inhibit melanin synthesis safely.', '[\"Even skin tone\",\"Powerful antioxidant benefits\",\"Fades dark spots\"]', '/images/treatments/skin_whitening.png', 'Sparkles', NULL, NULL),
('chemical-peels', 'Chemical Peels', 'cosmetic', 'Medical-grade chemical exfoliation treatments to improve skin texture, reduce pigmentation, and reveal fresher, younger-looking skin.', 'Controlled application of clinical acids (salicylic, glycolic, lactic, TCA) to target acne, superficial scars, and sun damage, promoting cell turnover.', '[\"Clears active acne\",\"Fades hyperpigmentation\",\"Improves overall radiance\"]', '/images/treatments/chemical_peels.png', 'Scissors', NULL, NULL),
('botox-fillers', 'Botox & Dermal Fillers', 'cosmetic', 'Expert facial rejuvenation with US FDA-approved botulinum toxin and hyaluronic acid fillers for wrinkle smoothing and volume restoration.', 'Injectable cosmetics precisely administered by specialized dermatologists to relax dynamic lines and restore volume to cheeks, lips, and under-eyes.', '[\"Restores youthful volume\",\"Softens deep forehead lines\",\"Natural-looking contours\"]', '/images/treatments/botox_fillers.png', 'UserCheck', NULL, NULL),
('gfc-hair', 'GFC Hair Therapy', 'hair', 'Growth Factor Concentrate therapy using your own blood-derived growth factors to stimulate dormant follicles and promote natural hair regrowth.', 'Next-generation autologous therapy where high concentrations of growth factors are extracted from the patient\'s blood platelets and delivered into the scalp.', '[\"100% natural autologous therapy\",\"Visible results in 6 sessions\",\"No synthetic chemicals involved\"]', '/images/treatments/gfc_hair_therapy.png', 'Activity', 'Growth Factor Concentrate for natural hair regrowth', 'Growth Factor Concentrate therapy uses your own blood-derived growth factors to stimulate dormant hair follicles and promote natural, thick hair regrowth.'),
('qr678-therapy', 'QR678 Regrowth Therapy', 'hair', 'Patented Indian hair regrowth formulation QR678 that targets hair follicle stem cells for clinically proven anti-hair-loss results.', 'A bio-engineered peptide solution containing essential hair growth factors, micro-injected into the scalp to arrest hair loss and trigger new follicle growth.', '[\"USA & Indian patented\",\"Clinically proven results\",\"Minimal discomfort\"]', '/images/treatments/qr678_therapy.png', 'TrendingUp', NULL, NULL),
('fue-transplant', 'Micro-FUE Transplant', 'hair', 'Minimally invasive follicular unit extraction technique for natural-looking hair transplantation with faster recovery and no linear scars.', 'Individual hair grafts are harvested from the donor site using micro-punches and implanted into the balding area with natural density and angle.', '[\"Natural hair density\",\"Virtually scarless recovery\",\"Permanent follicular grafts\"]', '/images/treatments/fue_transplant.png', 'Scissors', NULL, NULL),
('scalp-laser', 'Scalp Laser Therapy', 'hair', 'Low-level laser therapy (LLLT) for scalp stimulation, improving blood circulation and follicular health for thicker, healthier hair growth.', 'Cool-laser light therapy that increases cellular ATP production in hair follicles, improving blood microcirculation and prolonging the anagen growth phase.', '[\"Non-invasive, drug-free\",\"Boosts blood circulation\",\"Strengthens thinning hair\"]', '/images/treatments/scalp_laser.png', 'Activity', NULL, NULL),
('cryo-sculpting', 'Cryo Cool Sculpting', 'body', 'FDA-cleared cryolipolysis technology that freezes and eliminates stubborn fat cells without surgery, needles, or downtime.', 'Non-surgical cooling targets fat cells beneath the skin, causing them to crystalize and die. Over time, the body naturally processes and eliminates them.', '[\"Non-surgical fat reduction\",\"Up to 25% fat loss per session\",\"No downtime, resume activities\"]', '/images/treatments/cryo_sculpting.png', 'Heart', 'Non-invasive fat reduction with controlled cooling', 'FDA-cleared cryolipolysis technology that freezes and eliminates stubborn fat cells without surgery, needles, or downtime for targeted body contouring.'),
('emsella-wellness', 'Emsella Pelvic Wellness', 'body', 'Revolutionary non-invasive electromagnetic chair therapy for pelvic floor strengthening and urinary incontinence treatment.', 'Uses High-Intensity Focused Electromagnetic (HIFEM) technology to stimulate thousands of pelvic floor muscle contractions, equivalent to 11,000 Kegels.', '[\"Restores bladder control\",\"Non-invasive (fully clothed)\",\"Improves core wellness\"]', '/images/treatments/emsella_wellness.png', 'UserCheck', NULL, NULL),
('em-sculpting', 'EM-Muscle Sculpting', 'body', 'High-intensity focused electromagnetic energy for targeted muscle building and fat reduction — equivalent to 20,000 crunches per session.', 'Induces supramaximal muscle contractions using HIFEM energy. Rebuilds muscle fibers and burns regional fat cells in short, comfortable 30-minute sessions.', '[\"Builds muscle & burns fat\",\"Equivalent to 20,000 sit-ups\",\"Improves posture & tone\"]', '/images/treatments/em_sculpting.png', 'Activity', NULL, NULL);

-- Seed Blogs
INSERT INTO `blogs` (`id`, `title`, `slug`, `excerpt`, `content`, `category`, `featured_image`, `author_name`, `published_date`, `reading_time`, `status`, `seo_title`, `seo_description`) VALUES
(1, 'Clear Aligners: The Premium Path to a Perfect Smile', 'clear-aligners-perfect-smile', 'Discover how advanced clear aligners design and digital orthodontics are transforming dental treatments for patients seeking comfortable, invisible teeth alignment.', '<h2>Understanding Clear Aligners</h2><p>Orthodontic treatment has evolved dramatically over the last decade. Traditional braces, while highly effective, present aesthetic and practical challenges for many adults. Enter <strong>clear aligners</strong>—the modern solution that offers invisible, removable, and comfortable teeth straightening.</p><h3>Why Choose Jerushaligne?</h3><p>At Jerush, we design and manufacture our aligners (Jerushaligne) in-house. This gives us complete control over the treatment planning, raw material quality, and delivery speed, ensuring a premium dental experience.</p><h2>Frequently Asked Questions</h2><p>Here are answers to the most common questions our specialists receive about aligners.</p><h3>How long do I need to wear aligners daily?</h3><p>For the best results, you should wear your clear aligners for 20 to 22 hours per day. Only take them out to eat, drink hot liquids, brush, and floss.</p><h3>Is the aligner treatment painful?</h3><p>Most patients experience mild pressure or discomfort for the first 2-3 days of wearing a new aligner set. This is completely normal and indicates that the teeth are moving into their planned positions.</p>', 'Orthodontics', '/images/treatments/clear_aligners.png', 'DR. A. BLADBIN', 'June 15, 2026', '5 min read', 'published', 'Clear Aligners: The Premium Path to a Perfect Smile', 'Learn about modern clear aligners treatment, the advantages of Jerushaligne, and answers to frequently asked questions about invisible braces.'),
(2, 'Fractional CO2 Laser: Rewinding the Clock on Skin Scars', 'fractional-co2-laser-scars', 'Learn about the clinical efficacy of Fractional CO2 laser technology in smoothing deep acne scars, reducing wrinkles, and revitalizing skin textures safely.', '<h2>Rejuvenating Skin with Fractional CO2 Laser</h2><p>Acne scars and age-related fine lines can significantly affect self-confidence. Fortunately, laser dermatological innovations have provided us with powerful restorative solutions. The <strong>Fractional CO2 Laser</strong> stands out as the clinical gold standard for skin resurfacing.</p><h3>How CO2 Resurfacing Works</h3><p>The laser emits microscopic columns of carbon dioxide light energy deep into the skin layers. This energy selectively vaporizes damaged tissue while leaving surrounding micro-zones untouched, triggering rapid healing and fresh collagen synthesis.</p>', 'Dermatology', '/images/treatments/fractional_co2_laser.png', 'DR. C. BINILA BLADBIN', 'June 10, 2026', '6 min read', 'published', 'Fractional CO2 Laser: Rewinding the Clock on Skin Scars', 'Understand how Fractional CO2 laser therapy reduces deep acne scars, improves skin texture, and triggers collagen regrowth.'),
(3, 'Understanding GFC: The Science of Natural Hair Regrowth', 'science-gfc-hair-regrowth', 'Unlock the mechanism of Growth Factor Concentrate (GFC) therapy and how it harvests blood-derived platelets to combat pattern baldness and thinning.', '<h2>Understanding GFC Hair Therapy</h2><p>Hair loss is a widespread concern, but modern science offers advanced, non-surgical options that use the body\'s own restorative elements. <strong>Growth Factor Concentrate (GFC)</strong> therapy is a highly advanced, autologous hair loss treatment that triggers follicle regeneration.</p><h3>The Biological Mechanism</h3><p>GFC therapy utilizes specific growth factors extracted from the patient\'s own blood platelets (including PDGF, VEGF, EGF, and IGF). These highly purified growth factors are micro-delivered directly to the hair roots, stimulating cell proliferation, vascular growth, and dormant follicle activation.</p>', 'Hair Care', '/images/treatments/gfc_hair_therapy.png', 'DR. U. NIVEDAN', 'June 05, 2026', '4 min read', 'published', 'Understanding GFC: The Science of Natural Hair Regrowth', 'Discover GFC hair regrowth therapy, its biological mechanism, and why it is a highly effective, natural treatment for hair loss.'),
(4, 'Dental Implants in Chennai – Cost, Benefits & Procedure', 'dental-implants-in-chennai-cost-benefits-procedure', 'Missing teeth can affect your smile, chewing ability, and overall dental health. In Jerush Dentofacial, Chennai, we provide advanced, affordable dental implants.', '<p>Missing teeth can affect your smile, chewing ability, and overall dental health.</p><p>At Jerush Dentofacial and Cosmetic Laser Center, Chennai, we provide advanced dental implants treatment that restores your confidence and gives you a permanent solution to tooth loss.</p><p>Whether you’re looking for a single tooth replacement or full dental implants, our expert implantologists provide inexpensive, reliable, and long-lasting results.</p><h2 id=\"what-is-dental-implant\">What is a Dental Implant?</h2><p>A dental implant is a titanium post that serves as the root of an artificial tooth. Once it is fixed in your jaw, a custom-made crown tooth or bridge is placed, giving you natural-looking and fully functional teeth. Unlike dentures, implants do not slip or cause discomfort.</p><p>Dental implants are considered one of the best dental treatments in India because they are safe, long-lasting, and improve overall dental health care.</p>', 'Dental Care', '/images/blog/dental-implants-blog/anatomy-of-healthy-teeth-and-tooth-dental-implant.webp', 'DR. S. K. JEROME', 'June 25, 2026', '8 min read', 'published', 'Dental Implants in Chennai: Cost, Benefits & Procedure at Jerush', 'Looking for dental implants in Chennai? Get expert insights on dental implant costs, procedure details, and top benefits at Jerush Dentofacial.');

-- Seed Reviews
INSERT INTO `reviews` (`id`, `name`, `location`, `rating`, `treatment`, `image`, `text`) VALUES
(1, 'D.N. Hari Kiran Prasad', 'Kanyakumari District', 5, 'Cosmetic Laser Treatment', '/images/testimonials/hari-kiran-prasad.webp', 'I’m proud to share about one of the best in Kanyakumari district! Jerush Dentofacial Cosmetic Laser Centre is the top cosmetic centre in the district – known for its world-class treatments and beautiful results. Dr. Bladbin, the lead specialist, is not only a highly talented professional but also a very close personal and family friend. The environment at Jerush is unique—it doesn’t feel like a hospital at all. It's warm, welcoming and designed to put every patient at ease. I wholeheartedly recommend Jerush to anyone looking for top-tier cosmetic dental care.'),
(2, 'Mr. Hewon Park', 'South Korea', 5, 'Dental Implant Treatment', '/images/testimonials/hewon.webp', 'I am very happy with the treatment from Jerush Dental Center. During my implant treatment, all staff were very kind and supportive, especially Dr. Bladbin had explained all treatment well so that I could understand how my teeth is getting better. I highly recommend this clinic and can say you can count on them for any treatment.'),
(3, 'Mrs. Madhu Mala., MA, MPhil, M.Ed', 'Thuckalay', 5, 'Dental & Facial Corrective Care', '/images/testimonials/madhu.webp', 'Jerush Dental & Facial Corrective Centre is, undoubtedly, one of the most recognised names in dental care in Tamil Nadu. They have secured the reputation through delivering a comprehensive range of top quality procedures and support services. Whenever I visited them, I received extremely personalised care. The facilities are top-notch. The people who work over there are very professional. I wish them further growth in the years to come.'),
(4, 'Shri. Arunachalam., District judge, Tamilnadu', 'Thuckalay', 5, 'Clear Aligners (Jerushaligne)', '/images/testimonials/arunachalam.webp', 'I had long avoided dental work but always had insecurity about my tooth. I finally decided to try the aligners. The comfortable and convenient process has allowed me to embrace my smile, especially during family gatherings.'),
(5, 'Mrs. Prabha', 'Malaysia', 5, 'Braces Treatment', '/images/testimonials/prabha.webp', 'Really good dental hospital to look through. My daughter had braces over there. The price is very reasonable. The services are very good. Even the doctors and nurses are really friendly.'),
(6, 'The Rajendran\'s Family', 'Australia', 5, 'Dental & Facial Corrections', '/images/testimonials/rajendran.webp', 'During our family Christmas holidays in 2008, we popped into Dr Bladbin\'s surgery for a dental check up. From the first consultation onwards, Dr Bladbin was very accommodating and took great responsibility for our dental care. Two of my children had braces and it is great to see their stunning smiles now. He keeps his clinic very clean and tidy. I saw periodical cleaning happening in his place at all times, which is unheard of. After several visits to his practice, we can confidently say that Dr Bladbin is a true professional and is capable of completing a wide range of dental and facial corrections. Wherever you are, if you visit him for a dental or a facial services, you will definitely be satisfied with his high standards and impeccable reputation. We wish you all the best. May God Bless you.'),
(7, 'Shri. George Genner IFS', 'Thuckalay', 5, 'Dental and Facial Corrective Care', '/images/testimonials/george.webp', 'Everyone is pleasant and helpful. First class Doctors, Nurses and other supporting staff – I feel comfortable. Grateful and glad you are here in Jerush. How do you make an otherwise ordinary hospital extraordinary? You fill it with friendly, proficient and CARING staff. Jerush Dental and Facial Corrective Centre has been extraordinary for more than two decades under the leadership of DR. A. BLADBIN LLB, MDS, Ph.D. I am very thankful for the dedicated professional and hard-working staff at the hospital. I watched the cleaners working hard to keep the wards clean and free from infections during the treatment to my father and son. We would be very grateful if you are able to express our thanks and gratitude to all the staff, for their professionalism, kindness and the real human touch they gave. I would like to highly commend Dr. A. Bladbin, Dr. C. Binila Bladbin and all the staff for their contribution in the dental field.'),
(8, 'Shri. Abash Kumar., IPS, DGP', 'Thuckalay', 5, 'Dental & Aesthetic Care', NULL, 'Jerush Dental Hospital, KK district has etched its name among the best health care institutions in the state. It is not only catering to southern Tamil Nadu but provides best of dental care to southern Kerala as well. The top notch and up to date equipments coupled with highly trained and motivated staff makes it the institution of natural choice for all and sundry. I am thrilled to know that this great institution is celebrating its 20th anniversary. I wish Dr Bladbin and Dr (Mrs) Binila Bladbin many more successes. May you both bring more laurels to this institution. May the aplomb and panache that you have associated with your hospital know no bounds. May you both grow to touch stars. I wish Dr. Bladbin well and pray that he may render better and better service to the society.');

-- Seed Careers
INSERT INTO `careers` (`id`, `title`, `department`, `location`, `type`, `experience`, `description`, `requirements`) VALUES
(1, 'Dental Surgeon', 'Dental Services', 'Thuckalay, KK District', 'Full-Time', '2+ Years', 'We are looking for a skilled Dental Surgeon to join our growing team. The ideal candidate will have hands-on experience in general dentistry, restorations, and root canal treatments.', '[\"BDS from a recognized university\",\"Valid Dental Council Registration\",\"Proficiency in general dentistry procedures\",\"Strong patient communication skills\"]'),
(2, 'Cosmetologist', 'Cosmetic & Laser', 'Thuckalay, KK District', 'Full-Time', '1+ Years', 'Join our cosmetic laser centre as a Cosmetologist. You will perform advanced facial treatments, laser procedures, and skin care therapies under specialist supervision.', '[\"BHMS / BAMS / BDS with cosmetology certification\",\"Experience in facial aesthetics and laser treatments\",\"Knowledge of latest cosmetic procedures\",\"Passion for patient-centered aesthetic care\"]'),
(3, 'Orthodontist', 'Dental Services', 'Trichy Branch', 'Full-Time', '3+ Years', 'Seeking an experienced Orthodontist to manage orthodontic cases including clear aligners, metal and ceramic braces, and complex bite corrections.', '[\"MDS in Orthodontics from a recognized institution\",\"Experience with Invisalign / clear aligner systems\",\"Digital orthodontic planning experience\",\"Published research is a plus\"]'),
(4, 'Front Desk Receptionist', 'Administration', 'Thuckalay, KK District', 'Full-Time', 'Freshers Welcome', 'We need a friendly, professional receptionist to manage patient scheduling, billing, and front-desk operations at our main hospital.', '[\"Graduation in any discipline\",\"Fluency in Tamil and English (Hindi is a plus)\",\"Computer proficiency (MS Office, billing software)\",\"Excellent interpersonal and organizational skills\"]'),
(5, 'Dental Lab Technician', 'In-House Dental Lab', 'Thuckalay, KK District', 'Full-Time', '2+ Years', 'We are expanding our in-house dental lab and need a skilled technician for crown, bridge, and denture fabrication using CAD/CAM technology.', '[\"Diploma or degree in Dental Mechanics\",\"Experience with CAD/CAM dental systems\",\"Proficiency in zirconia and ceramic restorations\",\"Attention to detail and quality\"]'),
(6, 'Dental Assistant / Nurse', 'Clinical Support', 'Chennai Branch', 'Full-Time', '1+ Years', 'Assist our dental surgeons during clinical procedures, manage sterilization protocols, and help provide the best patient experience.', '[\"Diploma in Dental Hygiene or Nursing\",\"Experience in dental clinical settings\",\"Knowledge of sterilization and infection control\",\"Caring and patient-focused demeanor\"]');

-- 7. TEAM MEMBERS TABLE
CREATE TABLE IF NOT EXISTS `team_members` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `name` VARCHAR(255) NOT NULL,
  `role` VARCHAR(255) NOT NULL,
  `department` VARCHAR(100) NOT NULL,
  `branch` VARCHAR(255) DEFAULT '',
  `image` MEDIUMTEXT DEFAULT NULL,
  `sort_order` INT DEFAULT 0,
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Seed Team Members
INSERT INTO `team_members` (`name`, `role`, `department`, `branch`, `sort_order`) VALUES
('Mr. Rajesh Kumar Pius', 'Manager', 'management', 'Jerush Groups', 1),
('Miss. Monika', 'Dental PRO', 'pro', 'Jerush Head Clinic – Thuckalay', 1),
('Mrs. Renisha', 'Cosmetic PRO', 'pro', 'Jerush Head Clinic – Thuckalay', 2),
('Miss. Ashmi Sharo', 'Cosmetic PRO', 'pro', 'Jerush Head Clinic – Thuckalay', 3),
('Miss. Shivani Sharo', 'PRO', 'pro', 'Jerush Chennai Branch', 4),
('Mrs. Suja', 'Accountant', 'accounts', 'Jerush Head Clinic – Thuckalay', 1),
('Miss. Anishka', 'Accountant', 'accounts', 'Jerush Head Clinic – Thuckalay', 2),
('Miss. Ashika', 'Accountant', 'accounts', 'Jerush Head Clinic – Thuckalay', 3),
('Mrs. Praveena', 'Accountant', 'accounts', 'Jerush Chennai Branch', 4),
('Miss. Jenisha', 'Accountant & PRO', 'accounts', 'Jerush Trichy Branch', 5),
('Mrs. Berlin Monisha', 'Clear Aligner Technician', 'aligners', 'Jerush Head Clinic – Thuckalay', 1),
('Mr. Sukustel Martin', 'Clear Aligner Technician', 'aligners', 'Jerush Head Clinic – Thuckalay', 2),
('Mr. Darbin', 'Ceramic Crown Technician', 'aligners', 'Jerush Head Clinic – Thuckalay', 3),
('Mr. Jophy Robinson', 'Radiographic Technician', 'radiology', 'Jerush Head Clinic – Thuckalay', 1),
('Mr. Satheesh', 'Graphic Designer & Social Media Manager', 'it', 'Jerush Head Clinic – Thuckalay', 1),
('Mr. Shine Peter', 'Full-Stack Developer', 'it', 'Jerush Head Clinic – Thuckalay', 2),
('Mrs. Shamna', 'Marketing Manager', 'it', 'Jerush Head Clinic – Thuckalay', 3),
('Miss. Vaishnavi', 'Telecaller', 'it', 'Jerush Head Clinic – Thuckalay', 4),
('Miss. Abisha', 'Dental Assistant', 'dental_assistants', 'Jerush Head Clinic – Thuckalay', 1),
('Miss. Sherin', 'Dental Assistant', 'dental_assistants', 'Jerush Head Clinic – Thuckalay', 2),
('Miss. Neslin', 'Dental Assistant', 'dental_assistants', 'Jerush Head Clinic – Thuckalay', 3),
('Miss. Saranya', 'Dental Assistant', 'dental_assistants', 'Jerush Head Clinic – Thuckalay', 4),
('Miss. Suganya', 'Dental Assistant', 'dental_assistants', 'Jerush Head Clinic – Thuckalay', 5),
('Miss. Ansuya', 'Dental Assistant', 'dental_assistants', 'Jerush Head Clinic – Thuckalay', 6),
('Miss. Jeni', 'Dental Assistant', 'dental_assistants', 'Jerush Head Clinic – Thuckalay', 7),
('Miss. Lijiya', 'Dental Assistant', 'dental_assistants', 'Jerush Trichy Branch', 8),
('Miss. Vijiya', 'Dental Assistant', 'dental_assistants', 'Jerush Chennai Branch', 9),
('Mrs. Sangeetha', 'Cosmetic Assistant', 'cosmetic_assistants', 'Jerush Head Clinic – Thuckalay', 1),
('Mrs. Lija', 'Cosmetic Assistant', 'cosmetic_assistants', 'Jerush Head Clinic – Thuckalay', 2),
('Mrs. Sheeba', 'Cosmetic Assistant', 'cosmetic_assistants', 'Jerush Head Clinic – Thuckalay', 3),
('Miss. Riya', 'Cosmetic Assistant', 'cosmetic_assistants', 'Jerush Head Clinic – Thuckalay', 4),
('Miss. Daisy', 'Cosmetic Assistant', 'cosmetic_assistants', 'Jerush Head Clinic – Thuckalay', 5),
('Mrs. Reji', 'Front Desk Receptionist', 'front_desk', 'Jerush Head Clinic – Thuckalay', 1),
('Mrs. Jincy', 'Front Desk Receptionist', 'front_desk', 'Jerush Head Clinic – Thuckalay', 2),
('Miss. Rithya', 'Front Desk Receptionist', 'front_desk', 'Jerush Chennai Branch', 3),
('Mrs. Anju', 'Front Desk Receptionist', 'front_desk', 'Jerush Trichy Branch', 4),
('Mr. Dhivin', 'Maintenance Manager', 'maintenance', 'Jerush Head Clinic – Thuckalay', 1),
('Mrs. Anitha', 'Housekeeping Staff', 'housekeeping', 'Jerush Head Clinic – Thuckalay', 1),
('Mrs. Mini', 'Housekeeping Staff', 'housekeeping', 'Jerush Head Clinic – Thuckalay', 2),
('Mrs. Princiya', 'Housekeeping Staff', 'housekeeping', 'Jerush Head Clinic – Thuckalay', 3),
('Mrs. Sasi', 'Housekeeping Staff', 'housekeeping', 'Jerush Head Clinic – Thuckalay', 4),
('Mr. Sugumaran', 'Security Guard', 'security', 'Jerush Head Clinic – Thuckalay', 1),
('Mr. Robinson', 'Security Guard', 'security', 'Jerush Head Clinic – Thuckalay', 2);


-- 10. CLINIC HIGHLIGHTS & EVENTS TABLE
CREATE TABLE IF NOT EXISTS `clinic_highlights` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `title` VARCHAR(255) NOT NULL,
  `description` TEXT NOT NULL,
  `date` VARCHAR(100) NOT NULL,
  `image` MEDIUMTEXT DEFAULT NULL,
  `category` VARCHAR(100) DEFAULT 'General',
  `link` VARCHAR(255) DEFAULT NULL,
  `status` VARCHAR(50) DEFAULT 'published',
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;


-- 11. SPECIALITY HEALTH & COMMUNITY OUTREACH CAMPS TABLE
CREATE TABLE IF NOT EXISTS `camps` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `title` VARCHAR(255) NOT NULL,
  `tagline` VARCHAR(255) DEFAULT '',
  `category` VARCHAR(50) NOT NULL DEFAULT 'dental',
  `camp_type` VARCHAR(100) NOT NULL DEFAULT 'Dental Camp',
  `status` VARCHAR(50) NOT NULL DEFAULT 'upcoming',
  `date` VARCHAR(100) NOT NULL,
  `time` VARCHAR(100) NOT NULL,
  `location` VARCHAR(255) NOT NULL,
  `lead_doctors` VARCHAR(255) DEFAULT '',
  `target_beneficiaries` VARCHAR(255) DEFAULT '',
  `cover_image` VARCHAR(500) DEFAULT '',
  `gallery_images` TEXT DEFAULT NULL,
  `services_provided` TEXT DEFAULT NULL,
  `description` TEXT DEFAULT NULL,
  `organizer` VARCHAR(255) DEFAULT 'Jerush Medical Foundation',
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  `updated_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

INSERT INTO `camps` (`title`, `tagline`, `category`, `camp_type`, `status`, `date`, `time`, `location`, `lead_doctors`, `target_beneficiaries`, `cover_image`, `gallery_images`, `services_provided`, `description`, `organizer`) VALUES
('Mega Community Health & Smile Camp', 'Comprehensive oral wellness, preventive cancer screening & treatment vouchers', 'dental', 'Dental Camp', 'upcoming', 'October 24, 2026', '9:00 AM – 4:00 PM', 'Jerush Community Hall, Near Main Bus Stand, Thuckalay', 'Dr. C. Binila Asir, Dr. A. Bladbin, Dr. S. Rajmohan', 'Families, Seniors, School Students & General Public', '/images/events/medical-camp/free-community-medical-camp-group-photo.webp', '[\"/images/events/medical-camp/free-community-medical-camp-group-photo.webp\",\"/images/events/medical-camp/free-community-medical-camp-banner.webp\",\"/images/events/medical-camp/free-community-medical-camp-lead-doctor-group-photo.webp\"]', '[\"Full-Mouth Ultrasonic Scaling & Plaque Assessment\",\"Oral Cancer Screening with Intraoral Camera\",\"Free Denture Evaluation for Seniors\",\"Fluoride Varnish for Kids\"]', 'Comprehensive free community screening camp organized by Jerush Medical Foundation providing diagnostics, oral hygiene kits, and treatment discounts.', 'Jerush Medical Foundation'),
('Jerush 3D Clear Aligner Smile Transformation Drive', 'Experience high-precision digital intraoral scans and instant AI smile previews', 'aligner', 'Aligner Camp', 'upcoming', 'November 12, 2026', '10:00 AM – 5:00 PM', 'Jerush Super-Speciality Dental Hospital, Thuckalay', 'Dr. C. Binila Asir (Orthodontist & Aligner Specialist)', 'Teens, College Students, Working Professionals', '/images/events/jerushaligne-opening-event/dr-c-binila-asir-inauguration-jerush-aligner.webp', '[\"/images/events/jerushaligne-opening-event/dr-c-binila-asir-inauguration-jerush-aligner.webp\",\"/images/events/jerushaligne-opening-event/jerush-clear-aligner-inauguration-ceremony.webp\",\"/images/events/jerushaligne-opening-event/doctor-team-jerushaligner-inauguration.webp\"]', '[\"High-Speed 3D Digital Intraoral Smile Scan\",\"AI Before-and-After Treatment Simulation\",\"Customized Aligner Treatment Plan Voucher\"]', 'Exclusive clear aligner camp with live 3D intraoral digital scanning demonstration and custom aligner package concessions.', 'Jerush Orthodontic & Cosmetic Wing');



