# Jerush Dentofacial — Website Audit & Pending Tasks Roadmap

This document provides a comprehensive audit of all uncompleted pages, SEO deficiencies, navigation mismatches, media gaps, and pending functional improvements across the **Jerush Dentofacial & Cosmetic Laser Centre** website.

---

## 1. Missing & Pending Pages

| Page / Route | Current Status | Required Action | Priority |
| :--- | :--- | :--- | :--- |
| **Custom 404 Error Page** | Missing (`Route path="*"` redirects to `/`) | Build a branded, user-friendly 404 page with search, quick links (Home, Treatments, Doctors, Contact), and direct WhatsApp support. Prevents SEO "soft 404" ranking drops. | **High** |
| **Privacy Policy (`/privacy-policy`)** | Dead link in Footer (`<a href="#">`) | Create a compliant medical privacy policy covering patient health data, digital diagnostic scans, contact inquiries, and confidentiality. Essential for Google Ads & SEO E-E-A-T. | **High** |
| **Terms of Use (`/terms-of-use`)** | Dead link in Footer (`<a href="#">`) | Create terms of use outlining consultation terms, intellectual property, medical disclaimer, and appointment cancellation policies. | **High** |
| **High-Volume Treatments Needing Dedicated Pages** | 10 treatments have custom landing pages; the remaining 40+ use a generic fallback template. | Build dedicated, high-converting showcase pages for top revenue and high-inquiry clinical procedures (see list below). | **High** |
| **Orphaned `GalleryPage.jsx`** | File exists (446 lines) in `src/pages/`, but `/gallery` route redirects to `/smile-transformations`. | Either remove the obsolete file or connect it to an interactive facility & hospital tour page. | **Low** |

### Priority Treatment Pages Needing Dedicated Showcase Landing Pages:
1. **Teeth Whitening & Aesthetics** (`/treatments/teeth-whitening`)
2. **Dental Veneers & Porcelain Laminates** (`/treatments/dental-veneers`)
3. **Wisdom Tooth Extraction & Impaction Surgery** (`/treatments/wisdom-tooth`)
4. **Complete & Partial Dentures** (`/treatments/dentures`)
5. **Periodontics / Laser Gum Flap Surgery** (`/treatments/gum-disease-treatment`)
6. **Pediatric Dentistry** (`/treatments/pediatric-dentistry`)
7. **Smile Makeover & Smile Designing** (`/treatments/smile-makeover`)
8. **Orthognathic & Maxillofacial Jaw Surgery** (`/treatments/jaw-surgery`)
9. **Cleft Lip & Palate Reconstructive Surgery** (`/treatments/cleft-lip-palate`)
10. **PRP Hair Restoration Therapy** (`/treatments/prp-hair-treatment`)
11. **Hydrafacial & Medical Chemical Peels** (`/treatments/hydrafacial`)
12. **Full Body & Facial Laser Hair Removal** (`/treatments/laser-hair-removal`)
13. **HIFU Skin Tightening & Botox / Fillers** (`/treatments/botox-fillers`, `/treatments/hifu-skin-tightening`)

---

## 2. Mega-Menu Treatment Slug Mismatches (33 Links)

In `src/layout/Header.jsx`, 33 menu items link to URL slugs that do not match keys in `src/data/treatments.js`. When clicked, these trigger a generic fallback message (*"Our expert team at Jerush Dentoface provides specialized..."*) with an irrelevant dental implant picture.

### A. Typo / Slug Name Mismatches (Header vs Data File)
- [ ] `beard-transplant` &rarr; Update target to `/hair-restoration-treatments/hair-transplant` or `beard-hairline-transplant`
- [ ] `carbon-peel-laser` &rarr; Update target to `/treatments/carbon-peel-laser-treatment`
- [ ] `chemical-peel` &rarr; Update target to `/treatments/chemical-peels`
- [ ] `deep-teeth-cleaning` &rarr; Update target to `/treatments/dental-curettage`
- [ ] `emsculpt-body-contouring` &rarr; Update target to `/treatments/em-sculpting`
- [ ] `emsella-chair` &rarr; Update target to `/treatments/emsella-wellness`
- [ ] `gum-grafting` &rarr; Update target to `/treatments/gum-graft-surgery`
- [ ] `wisdom-tooth-removal` &rarr; Update target to `/treatments/wisdom-tooth`
- [ ] `facial-surgery` &rarr; Update target to `/treatments/facial-surgery-treatment`
- [ ] `qr678-hair-treatment` &rarr; Update target to `/treatments/qr678-therapy`
- [ ] `dental-crowns-bridges` &rarr; Route directly to dedicated page `/dental-crowns-bridges`
- [ ] `dental-implant-surgery` &rarr; Route directly to dedicated page `/dental-implants`

### B. Missing Data Entries in `src/data/treatments.js`
The following treatments are linked in the Header navigation but lack entries in `src/data/treatments.js`:
- [ ] **Cosmetic Dermatology & Laser**:
  - `eczema-treatment`
  - `psoriasis-treatment`
  - `vitiligo-treatment`
  - `lip-brightening`
  - `suntan-removal`
  - `skin-tag-removal`
  - `wart-removal`
  - `xanthelasma-removal`
  - `wrinkle-treatment`
  - `skin-brightening`
  - `skin-whitening`
  - `dermal-fillers`
  - `botox`
- [ ] **Hair Restoration**:
  - `biocell-hair-treatment`
  - `hair-growth-booster`
  - `hairline-correction`
  - `scalp-cleansing`
- [ ] **Dental & Maxillofacial**:
  - `jaw-surgery`
  - `lip-correction-surgery`
  - `scar-revision-surgery`

---

## 3. SEO Audit & Technical Requirements

### A. Meta Tags & Dynamic Document Titles
- [ ] **Install `react-helmet-async`**:
  - Currently, every single page (except Blog Details) displays the identical static title from `index.html`: `Jerush | South India's Leading Dental and Cosmetic Care`.
  - Zero pages have `<meta name="description">` or `<meta name="keywords">`.
- [ ] **Create `<SEOHead />` Reusable Component**:
  - Automatically manage dynamic title (`{Page Title} | Jerush Dentofacial`), 155-character meta descriptions, canonical URLs, and OpenGraph/Twitter meta tags across all pages.

### B. Sitemap & Robots.txt
- [ ] **Create `public/sitemap.xml`**:
  - Generate an XML sitemap covering all 60+ routes, clinical treatments, doctor bios, transformation dossiers, blog articles, and camp events.
- [ ] **Update `public/robots.txt`**:
  - Add `Sitemap: https://jerushdentoface.com/sitemap.xml` and configure crawling rules.

### C. Schema.org Structured Data (JSON-LD)
*Currently, **zero** structured data exists in the project.*
- [ ] **`MedicalOrganization` / `Hospital` Schema**:
  - Embed official organization details, accreditation, emergency contact, opening hours, and 4 physical branches (Thuckalay, Trichy, Chennai, Dubai).
- [ ] **`Physician` / `Dentist` Schema**:
  - Add rich doctor profile schema on `DoctorsPage.jsx`, `DrBladbinPage.jsx`, `DrBinilaPage.jsx`, and `DrPrabinPage.jsx` (medical council registration, qualifications, specialties).
- [ ] **`MedicalProcedure` Schema**:
  - Implement on treatment landing pages (Dental Implants, Root Canal, Braces, Aligners, CO₂ Laser, etc.).
- [ ] **`FAQPage` Schema**:
  - Implement on all pages featuring accordion FAQs to win rich interactive snippets in Google Search results.
- [ ] **`BreadcrumbList` Schema**:
  - Add structured breadcrumb trails for Google search hierarchy display.
- [ ] **`AggregateRating` & `Review` Schema**:
  - Mark up 4.9★ patient reviews and video testimonials to show golden rating stars on Google search results.

### D. OpenGraph & Social Sharing
- [ ] Add `og:title`, `og:description`, `og:image`, and `og:url` tags to ensure attractive link preview cards when sharing links on WhatsApp, Facebook, LinkedIn, and X.
- [ ] Create a high-resolution 1200×630px social banner asset (`/images/og-banner.jpg`).

### E. Regional & Local SEO Keywords
- [ ] Optimize page copy for key geographic search intents:
  - *Kanyakumari & Thuckalay*: "Best dental hospital in Kanyakumari", "Dental implants Thuckalay", "Clear aligners Nagercoil"
  - *Tamil Nadu & Kerala Border*: "Painless root canal treatment Tamil Nadu", "Cosmetic laser centre South India", "Medical tourism Trivandrum / Kerala"
  - *Trichy & Chennai*: "Dental clinic Trichy", "Orthodontist in Chennai"
  - *Dubai Liaison*: "Dental and cosmetic care for NRI patients in UAE"

---

## 4. Media, Assets & Content Gaps

- [ ] **Missing Image Asset**: `/images/doctors/dr-bladbin-cutout.webp` is referenced in `BlogPreviewSection.jsx` but does not exist in `public/images/doctors/`. (Update to point to `/images/doctors/dr-bladbin-portrait.webp`).
- [ ] **Missing Video Placeholder**: `/images/placeholder-video.webp` is referenced in `Testimonials.jsx` and `VideoTestimonialsPage.jsx` but does not exist in `public/images/`.
- [ ] **File Path URL Encoding**: `/images/treatments/dental/dental-implants/bone%20loss%20issues.webp` has spaces/URL encodings in filename. Rename to `bone-loss-issues.webp`.
- [ ] **Staff Profiles Imagery**: All 43 staff members in `src/data/team.js` have `image: ''` and render initials. Populate real staff photos or uniform illustrated avatars.
- [ ] **Doctor Profile Image**: Dr. C. Monicka in `src/data/doctors.js` has `image: ''` and falls back to an Unsplash stock photo.
- [ ] **Replace Stock Photography**: Replace external Unsplash stock images on `CareersPage.jsx` and blog banners with authentic photographs of Jerush hospital facilities, digital 3D labs, and surgical suites.

---

## 5. Interactive Features & Form Integrations

- [ ] **Contact & Appointment Form Integration**:
  - `ContactPage.jsx` currently uses a simulated `setTimeout` submission.
  - Connect form submissions to:
    1. Direct email notification (via PHPMailer or transactional email service)
    2. Hospital WhatsApp desk routing
    3. MySQL database lead recording
- [ ] **reCAPTCHA Upgrade**:
  - Replace the client-side checkbox simulation with official Google reCAPTCHA v3 or Cloudflare Turnstile to prevent spam.
- [ ] **Floating WhatsApp Action**:
  - Add a floating quick-booking button allowing patients to select their nearest clinic (Thuckalay, Trichy, Chennai, or Dubai) and initiate an instant WhatsApp consultation.
- [ ] **Expand Blog Articles**:
  - Currently only 5 articles exist in `src/data/blogs.js`. Regularly publishing detailed clinical guides (written by the doctors) will boost search traffic.

---

## 6. Brand Guidelines & Spelling Compliance

- [ ] **Enforce British English "Centre" / "Centres"**:
  - Update `src/pages/ContactPage.jsx:75` from `Thuckalay Center` &rarr; **`Thuckalay Centre`**.
  - Update `src/components/home/Testimonials.jsx:33` from `Jerush Dental Center` &rarr; **`Jerush Dental Centre`**.
- [ ] **Track Pending Admin Files**:
  - Verify and commit untracked admin profiles and modal components in `src/admin/pages/AdminStaffProfiles.jsx`, `src/services/staffService.js`, and related modal dialogs.

---

## 7. Recommended Action Plan & Milestones

### Milestone 1: Navigation & Link Integrity (Immediate)
- Fix all 33 treatment slug mismatches in `Header.jsx`.
- Update `ContactPage.jsx` and `Testimonials.jsx` spelling to "Centre".
- Fix missing image references (`dr-bladbin-cutout.webp`, `placeholder-video.webp`).

### Milestone 2: Technical SEO & Discoverability (Days 1–2)
- Install `react-helmet-async` and configure dynamic page titles + meta descriptions for all pages.
- Generate `public/sitemap.xml` and update `public/robots.txt`.
- Add Schema.org JSON-LD (`MedicalOrganization`, `Physician`, `FAQPage`, `BreadcrumbList`).

### Milestone 3: Core Missing Pages (Days 2–3)
- Build custom **404 Not Found Page**.
- Build **Privacy Policy** (`/privacy-policy`) and **Terms of Use** (`/terms-of-use`).
- Wire footer links to the new pages.

### Milestone 4: Backend & Lead Capture (Days 3–4)
- Connect contact/appointment form to live email/database endpoints.
- Integrate official spam protection (Cloudflare Turnstile or Google reCAPTCHA).
- Add multi-branch WhatsApp booking flow.

### Milestone 5: Treatment Landing Pages Expansion (Ongoing)
- Progressively design and launch dedicated interactive landing pages for the top remaining treatments (Veneers, Teeth Whitening, Wisdom Tooth, Dentures, Gum Surgery, etc.).
