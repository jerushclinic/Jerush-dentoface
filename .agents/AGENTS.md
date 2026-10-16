# Custom Rules

## CTA Section Design for Treatment Pages
- **Style Requirement**: All CTA (Call to Action) sections at the bottom of treatment pages and related landing pages must follow the unified `TreatmentCtaBanner` / `DentalAppointmentBanner` dark navy format:
  - Container: Deep navy background `bg-gradient-to-r from-[#071324] via-[#0E2752] to-[#071324]` with atmospheric cyan & blue glow blurs, rounded 3xl corners, and subtle borders.
  - Left side (when doctor is specified): Specialist doctor cutout aligned to the bottom with ambient glow behind and a frosted dark name/specialty tag overlay (`bg-slate-900/85 backdrop-blur-md`).
  - Right side:
    - Translucent sky blue badge pill (`READY TO SMILE?` or specialist tag) with outline icon.
    - Large bold white headline with a curved sky-blue brush underline accent on the key phrase.
    - Clean description in `text-slate-300`.
    - Primary button: Glowing cyan/blue gradient pill button (`bg-gradient-to-r from-brandSky via-[#198BC8] to-brandBlue`) with white circular icon wrapper.
    - Secondary button: Translucent dark pill button with phone or external link icon.

## Language & Terminology
- **Spelling Convention**: Always use British English spelling for **"Centre"** and **"Centres"** (never "Center" or "Centers") when referring to hospital wings, medical facilities, regional branches ("4 Regional Centres"), excellence centres ("Centres of Excellence"), or the organization name ("Jerush Dentofacial & Cosmetic Laser Centre").

## Two-Color Title Convention
- **Style Requirement**: All page headlines and section titles (`h1`, `h2`) on treatment pages and landing pages MUST follow the two-color format:
  - Base text: Dark slate `text-slate-900` (or `text-white` on dark backgrounds).
  - Highlighted keyword phrase: `<span className="bg-gradient-to-r from-brandBlue to-brandSky bg-clip-text text-transparent">...</span>` (or `<span className="bg-gradient-to-r from-brandSky via-sky-300 to-white bg-clip-text text-transparent">...</span>` on dark backgrounds).
  - Never render major section titles in a single flat solid color.

## Counter & Key Stats Section Design
- **Gradient Background**: All full-width stats / counter bars MUST use our signature Jerush royal blue gradient:
  - Container: `bg-gradient-to-r from-brandBlue to-[#1b4393] py-10 sm:py-12 px-4 sm:px-6 text-white shadow-inner relative overflow-hidden`.
  - Values: Crisp white bold typography (`font-headline font-black text-2xl sm:text-3xl lg:text-4xl text-white tracking-tight`).
  - Labels: Uppercase tracking text (`text-white/80 text-xs sm:text-sm font-semibold uppercase tracking-wider mt-1`).
  - Never use dark navy/black (`from-slate-900 via-[#071324] to-slate-900`) for the counter section.

## Clean Hero Section & No Unwanted Badges
- **Hero Title Clearance**: Do not clutter the hero with excessive pill badges, category chips, or tags above the title (e.g., avoid "Category: ..." and "Custom Precision Fit" pills above headlines). Lead cleanly with the clinic branding and title.
- **Hero Image Presentation**: Keep hero image cards clean and frame-focused. Do not add top banner header strips with labels or pulsing status dots (e.g., avoid "Clinical Dental Model", "Prosthodontic Care" top tags on image cards).

## Title Typography & Line Spacing (1.40 Line-Height Convention)
- **Ratio Standard**: All `h1`, `h2`, and multi-line display headlines across all current and upcoming treatment pages and landing pages MUST maintain a clean **1.40 line-height ratio** (`line-height: 1.4` or `leading-[1.4]`).
- **Rationale**: Never use cramped ratios (such as `leading-tight`, `leading-[1.15]`, `leading-[1.18]`, `leading-[1.2]`) which cause descenders ('g', 'p', 'y', 'j') to collide with capital letters on subsequent lines, nor overly loose ratios (such as `1.48`+). 1.40 gives optimal breathability, modern editorial elegance, and flawless legibility.
- **Implementation**: Enforce with `leading-[1.4]` class and `style={{ lineHeight: 1.4 }}` on all `h1` and `h2` elements, supported by the global CSS rule in `src/input.css`.


