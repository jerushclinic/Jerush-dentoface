import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ShieldCheck, Calendar, Phone, CheckCircle2, Clock,
  Award, Smile, ArrowRight, Info, Check, HelpCircle, AlertCircle,
  MapPin, ChevronRight, ChevronDown, Heart, Shield, Activity,
  Sparkles, Layers, Cpu, Eye, Zap, Target, Stethoscope,
  RefreshCw, CheckCheck, FileText, ArrowLeftRight, Split,
  Sliders, Microscope, Sparkle
} from 'lucide-react';
import PageBreadcrumbHero from '../components/common/PageBreadcrumbHero';
import TreatmentCtaBanner from '../components/common/TreatmentCtaBanner';
import TreatmentSectionNav from '../components/common/TreatmentSectionNav';
import TreatmentAppointmentForm from '../components/common/TreatmentAppointmentForm';
import useTreatmentScrollSpy from '../hooks/useTreatmentScrollSpy';

// Signature Counter & Key Stats Bar Data
const KEY_STATS = [
  { value: '15,000+', label: 'Crowns & Bridges Restored' },
  { value: 'Sub-Millimetre', label: 'Digital CAD/CAM Accuracy' },
  { value: '100% Fixed', label: 'Non-Removable Everyday Wear' },
  { value: '4 Regional Centres', label: 'Centres of Excellence in TN' }
];

// Sticky Sub-Navigation Tabs
const NAVIGATION_TABS = [
  { id: 'crowns-vs-bridges', label: 'Crowns vs Bridges' },
  { id: 'clinical-indications', label: 'When Needed' },
  { id: 'treatment-journey', label: '5-Step Process' },
  { id: 'transformations', label: 'Before & After' },
  { id: 'daily-care', label: 'Care & Longevity' },
  { id: 'regional-centres', label: 'Regional Centres' },
  { id: 'faqs', label: 'FAQs' }
];

// 1. Crowns vs Bridges: Dual Comparison Showcase (PDF Page 1)
const COMPARISON_DATA = {
  crowns: {
    id: 'crowns',
    title: 'Dental Crowns',
    subtitle: 'Single Tooth Protection & Reinforcement',
    tag: 'Tooth Cap Restoration',
    badgeColor: 'bg-blue-50 text-brandBlue border-blue-200/80',
    img: '/images/medical-services/dental-care/prosthodontic-care-tooth-replacement/fixed-partial-dentures-crowns-bridges/dental-crown.webp',
    alt: 'Custom precision dental crown covering and strengthening a damaged tooth',
    definition: "A crown covers and protects a damaged or weakened tooth. It helps restore the tooth's shape, structural strength, and natural appearance when recommended by your dentist.",
    specs: [
      { label: 'Coverage Area', value: '360° Circumferential Cap' },
      { label: 'Foundation Requirement', value: 'Prepped Natural Tooth / Post-Core' },
      { label: 'Primary Purpose', value: 'Fracture Defense & Shape Restoration' },
      { label: 'Fixation Method', value: 'Permanent Adhesive Cementation' }
    ],
    highlights: [
      'Encapsulates fractured, heavily decayed, or brittle root-treated teeth',
      'Restores full biting and grinding capacity with anatomical tooth contours',
      'Shade-matched with high-translucency Zirconia or E-Max porcelain',
      'Maintains ideal dental contact points to prevent food impaction'
    ]
  },
  bridges: {
    id: 'bridges',
    title: 'Dental Bridges (Fixed Partials)',
    subtitle: 'Tooth Replacement Across Gap Spans',
    tag: 'Multi-Tooth Replacement',
    badgeColor: 'bg-sky-50 text-brandSky border-brandSky/30',
    img: '/images/medical-services/dental-care/prosthodontic-care-tooth-replacement/fixed-partial-dentures-crowns-bridges/dental-bridge.webp',
    alt: 'Fixed dental bridge replacing missing teeth anchored to supporting teeth',
    definition: 'A bridge replaces one or more missing teeth by attaching an artificial tooth (pontic) securely to adjacent supporting natural teeth or suitable dental restorations.',
    specs: [
      { label: 'Coverage Area', value: '1 to 3 Consecutive Missing Teeth' },
      { label: 'Foundation Requirement', value: 'Healthy Adjacent Abutment Teeth' },
      { label: 'Primary Purpose', value: 'Fills Gaps & Restores Occlusion' },
      { label: 'Fixation Method', value: 'Permanently Fixed (Non-Removable)' }
    ],
    highlights: [
      'Permanently replaces missing teeth without bulky acrylic plates or metal clasps',
      'Prevents neighbouring teeth from drifting, tilting, or over-erupting into the gap',
      'Restores natural facial contours, lip support, and effortless speech articulation',
      'Engineered with monolithic ceramic framework for enduring chewing durability'
    ]
  }
};

// 2. When Might You Need a Crown or Bridge? (PDF Page 1 & 2)
const CLINICAL_INDICATIONS = [
  {
    id: 'damaged-teeth',
    number: '01',
    title: 'Damaged Teeth',
    category: 'Structural Defense',
    desc: 'Restore teeth weakened by extensive tooth decay, deep cracks, structural chips, or large failed restorations.',
    clinicalGoal: 'Full circumferential crown reinforces fragile remaining tooth walls and prevents catastrophic splits.',
    img: '/images/medical-services/dental-care/prosthodontic-care-tooth-replacement/fixed-partial-dentures-crowns-bridges/damaged-teeth.webp',
    alt: 'Restoring teeth damaged by decay or fracture with precision dental crown',
    recommended: 'Dental Crown'
  },
  {
    id: 'after-rct',
    number: '02',
    title: 'After Root Canal Treatment',
    category: 'Post-Endodontic Care',
    desc: 'Protect endodontically treated teeth that have lost internal moisture and structural dentin from brittle fractures.',
    clinicalGoal: 'Seals the coronal access, shields the tooth root against occlusal stress, and guarantees long-term durability.',
    img: '/images/medical-services/dental-care/prosthodontic-care-tooth-replacement/fixed-partial-dentures-crowns-bridges/after-root-canal-treatment.webp',
    alt: 'Protecting tooth after root canal therapy with custom crown reinforcement',
    recommended: 'Dental Crown / Core'
  },
  {
    id: 'missing-teeth',
    number: '03',
    title: 'Missing Teeth Gaps',
    category: 'Prosthetic Replacement',
    desc: 'Replace one or more missing teeth with a fixed dental bridge when neighbouring natural anchor teeth are sound.',
    clinicalGoal: 'Spans the empty space with an aesthetic artificial tooth (pontic) bonded to solid anchor abutments.',
    img: '/images/medical-services/dental-care/prosthodontic-care-tooth-replacement/fixed-partial-dentures-crowns-bridges/missing-teeth.webp',
    alt: 'Replacing missing teeth gaps with fixed partial bridge restoration',
    recommended: 'Fixed Dental Bridge'
  },
  {
    id: 'worn-misshapen',
    number: '04',
    title: 'Worn or Misshapen Teeth',
    category: 'Anatomical Rehabilitation',
    desc: 'Restore natural tooth height, shape, and pleasing cosmetic appearance for teeth worn down by severe attrition or erosion.',
    clinicalGoal: 'Re-establishes optimal canine guidance, vertical jaw dimension, and balanced cosmetic proportions.',
    img: '/images/medical-services/dental-care/prosthodontic-care-tooth-replacement/fixed-partial-dentures-crowns-bridges/misshapen-teeth.webp',
    alt: 'Restoring worn and misshapen teeth with custom aesthetic porcelain restorations',
    recommended: 'Aesthetic Crown'
  },
  {
    id: 'chewing-difficulties',
    number: '05',
    title: 'Chewing Difficulties',
    category: 'Functional Recovery',
    desc: 'Improve bite efficiency and comfortable chewing by restoring collapsed or uneven dental contact areas.',
    clinicalGoal: 'Eliminates one-sided chewing compensation and distributes chewing pressure harmoniously across both jaws.',
    img: '/images/medical-services/dental-care/prosthodontic-care-tooth-replacement/fixed-partial-dentures-crowns-bridges/chewing-difficulties.webp',
    alt: 'Improving chewing difficulties and restoring bite balance with fixed restorations',
    recommended: 'Crown or Bridge'
  }
];

// 3. How Is the Treatment Done? 5-Step Process (PDF Page 2 & 3)
const TREATMENT_STEPS = [
  {
    step: '01',
    title: 'Dental Assessment',
    phase: 'Diagnostic Evaluation',
    desc: 'Examine the tooth, surrounding periodontal gums, bite alignment, and underlying jawbone health with high-resolution digital imaging.',
    img: '/images/medical-services/dental-care/prosthodontic-care-tooth-replacement/fixed-partial-dentures-crowns-bridges/dental-assessment.webp',
    alt: 'Comprehensive dental assessment and digital diagnostics at Jerush',
    checkpoint: '3D bite evaluation & bone stability review',
    patientExperience: 'Gentle, pain-free clinical examination with clear diagnostic explanations.'
  },
  {
    step: '02',
    title: 'Treatment Planning',
    phase: 'Personalised Blueprint',
    desc: 'Decide whether a single crown, multi-unit fixed bridge, or another restorative option is most appropriate for your oral health and smile goals.',
    img: '/images/medical-services/dental-care/prosthodontic-care-tooth-replacement/fixed-partial-dentures-crowns-bridges/treatment-panning.webp',
    alt: 'Personalised treatment planning for crowns and bridges at Jerush',
    checkpoint: 'Material selection (Zirconia, E-Max, CAD/CAM Ceramic)',
    patientExperience: 'Transparent walkthrough of restorative options, lifespans, and timeline.'
  },
  {
    step: '03',
    title: 'Tooth Preparation',
    phase: 'Micro-Precise Shaping',
    desc: 'Carefully prepare the supporting tooth or anchor teeth under local anaesthesia to create ideal space for the custom restoration.',
    img: '/images/medical-services/dental-care/prosthodontic-care-tooth-replacement/fixed-partial-dentures-crowns-bridges/tooth-preparation.webp',
    alt: 'Tooth preparation and gentle shaping for crown and bridge seating',
    checkpoint: 'Sub-gingival margin refinement & structural conservation',
    patientExperience: 'Completely numb and comfortable, followed by a protective temporary restoration.'
  },
  {
    step: '04',
    title: 'Custom Restoration',
    phase: 'Digital CAD/CAM Fabrication',
    desc: 'Take high-precision 3D digital intraoral scans or detailed impressions to craft the restoration to exact micro-millimetre standards.',
    img: '/images/medical-services/dental-care/prosthodontic-care-tooth-replacement/fixed-partial-dentures-crowns-bridges/custom-restoration.webp',
    alt: 'Custom CAD/CAM milling and fabrication of crowns and fixed partial bridges',
    checkpoint: 'Digital shade matching & contact point verification',
    patientExperience: 'Quick, gag-free 3D digital scanning with no messy putty trays.'
  },
  {
    step: '05',
    title: 'Final Fitting & Bonding',
    phase: 'Precision Delivery',
    desc: 'Thoroughly check the fit, margin seal, color harmony, and bite balance before permanently bonding the restoration into place.',
    img: '/images/medical-services/dental-care/prosthodontic-care-tooth-replacement/fixed-partial-dentures-crowns-bridges/final-fitting.webp',
    alt: 'Final fitting and permanent bonding of dental crowns and bridges',
    checkpoint: 'Bite clearance check & medical-grade adhesive cure',
    patientExperience: 'Immediate restoration of comfortable chewing and confident, natural aesthetics.'
  }
];

// 4. Before & After Cases (PDF Page 3)
const BEFORE_AFTER_CASES = [
  {
    id: 'primary-case',
    patient: 'Clinical Case 01: Anterior Tooth Restoration',
    diagnosis: 'Severe Fractured Tooth Structure & Missing Adjacent Gap',
    beforeImg: '/images/medical-services/dental-care/prosthodontic-care-tooth-replacement/fixed-partial-dentures-crowns-bridges/before-damaged-tooth.webp',
    afterImg: '/images/medical-services/dental-care/prosthodontic-care-tooth-replacement/fixed-partial-dentures-crowns-bridges/after-restored-tooth.webp',
    beforeText: 'Damaged, fractured tooth structure with noticeable aesthetic loss and compromised bite function.',
    afterText: 'Flawlessly restored tooth shape and natural gap replacement with seamless ceramic shade integration.',
    note: 'Images are illustrative. Actual treatment outcomes depend on individual dental condition and restoration design.'
  },
  {
    id: 'anitha-case',
    patient: 'Clinical Case 02: Full Ceramic Bridge',
    diagnosis: 'Premolar Missing Tooth Gap with Occlusal Disruption',
    beforeImg: '/images/before-after/dental/crowns-bridges/anitha-before.webp',
    afterImg: '/images/before-after/dental/crowns-bridges/aniitha-after.webp',
    beforeText: 'Missing posterior tooth causing adjacent tilting and unilateral chewing fatigue.',
    afterText: 'Fixed 3-unit monolithic zirconia bridge restoring full mastication and arch alignment.',
    note: 'Completed under specialist prosthodontic supervision at Jerush HQ.'
  },
  {
    id: 'vincent-case',
    patient: 'Clinical Case 03: Anterior Esthetic Crown',
    diagnosis: 'Discoloured & Fractured Central Incisor',
    beforeImg: '/images/before-after/dental/crowns-bridges/vincent-before.webp',
    afterImg: '/images/before-after/dental/crowns-bridges/vincent-after.webp',
    beforeText: 'Fractured incisal edge with deep discolouration after past trauma.',
    afterText: 'Layered ceramic crown replicating natural translucency, mamelons, and gum contour.',
    note: 'Individual biological response and gum architecture guide the final aesthetic outcome.'
  }
];

// 5. Frequently Asked Questions (PDF Page 4)
const FAQS = [
  {
    q: 'Is a dental crown the same as a bridge?',
    a: 'No. A crown covers and strengthens an existing natural tooth that is damaged or weakened, while a bridge replaces one or more missing teeth by anchoring an artificial tooth (pontic) to adjacent supporting teeth or dental implants.'
  },
  {
    q: 'Are crowns and bridges permanently fixed?',
    a: 'Yes. Both dental crowns and fixed bridges are bonded securely to your teeth using high-strength dental cements. They remain firmly in place during everyday eating, speaking, and brushing, and are not removed by the patient.'
  },
  {
    q: 'Does getting a crown or bridge hurt?',
    a: 'No. The tooth preparation procedure is performed under gentle local anaesthesia, ensuring complete comfort. Some mild temporary sensitivity or gum tenderness can occur for a few days afterward, which resolves smoothly.'
  },
  {
    q: 'How long do crowns and bridges last?',
    a: 'Their lifespan typically ranges from 10 to 15+ years with diligent oral hygiene, regular flossing, balanced bite habits, and routine dental check-ups. High-grade materials like Monolithic Zirconia offer exceptional long-term fracture resistance.'
  },
  {
    q: 'Can a bridge replace multiple missing teeth?',
    a: 'Yes, in suitable clinical situations, a fixed bridge can replace several missing teeth. Your prosthodontist evaluates the span length, the bone support of adjacent anchor teeth, and bite forces to determine if a bridge or dental implants offer the best long-term prognosis.'
  },
  {
    q: 'How do I care for crowns and bridges?',
    a: 'Brush twice daily with a soft toothbrush, clean between teeth and underneath the artificial bridge pontic using specialized superfloss, interdental brushes, or water flossers, avoid biting excessively hard objects, and visit your dentist for bi-annual check-ups and professional cleanings.'
  }
];

// 6. Related Treatments in Prosthodontic Care
const RELATED_TREATMENTS = [
  {
    title: 'Removable Partial Dentures',
    desc: 'Precision cast metal and flexible acrylic frameworks engineered to replace multiple missing teeth while preserving natural anchor dentition.',
    link: '/dental-care/prosthodontic-care/removable-partial-dentures',
    tag: 'Tooth Replacement',
    image: '/images/medical-services/dental-care/prosthodontic-care-tooth-replacement/removable-partial-dentures/removable-partial-denture-dental-model.webp',
    alt: 'Precision removable partial denture clinical model'
  },
  {
    title: 'Dentures',
    desc: 'Custom complete and implant-supported dentures designed to replace full or partial arches, restoring everyday chewing comfort and speech.',
    link: '/dental-care/geriatric-dentistry/dentures',
    tag: 'Prosthodontic Care',
    image: '/images/medical-services/dental-care/geriatric-dentistry/dentures/replacing-missing-teeth.webp',
    alt: 'Custom dentures replacing missing teeth at Jerush'
  },
  {
    title: 'Metal Post & Core',
    desc: 'High-strength anatomical metal post and core restorations providing solid internal retention for badly broken teeth before crown placement.',
    link: '/dental-care/prosthodontic-care/metal-post-core',
    tag: 'Foundation Restoration',
    image: '/images/medical-services/dental-care/prosthodontic-care-tooth-replacement/metal-post-core/damaged-tooth-restored.webp',
    alt: 'Metal post and core foundation restoration for damaged teeth'
  }
];

export default function FixedPartialDenturesPage() {
  const navigate = useNavigate();
  const [selectedComparison, setSelectedComparison] = useState('crowns');
  const [activeStep, setActiveStep] = useState(0);
  const [activeCase, setActiveCase] = useState(0);
  const [expandedFaq, setExpandedFaq] = useState(null);

  // Destructure activeSection AND scrollToSection from hook
  const { activeSection, scrollToSection } = useTreatmentScrollSpy(
    NAVIGATION_TABS.map(t => t.id),
    138
  );

  const handleBookClick = () => {
    const el = document.getElementById('consultation-form') || document.getElementById('treatment-appointment-section');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      const nameInput = document.getElementById('treatment-form-name');
      if (nameInput) nameInput.focus();
    } else {
      navigate('/contact');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const toggleFaq = (index) => {
    setExpandedFaq(expandedFaq === index ? null : index);
  };

  return (
    <div className="bg-slate-50 min-h-screen text-slate-800 selection:bg-brandSky selection:text-white">
      {/* ─── Breadcrumb ─── */}
      <PageBreadcrumbHero
        breadcrumbs={[
          { label: 'Dental Care', path: '/dental-care' },
          { label: 'Prosthodontic Care', path: '/dental-care/prosthodontic-care' },
          { label: 'Fixed Partial Dentures', active: true }
        ]}
      />

      {/* ─── Hero Section with Entrance Animations & Pure White Glowing Frame ─── */}
      <section className="relative overflow-hidden bg-white pt-10 pb-16 lg:pt-14 lg:pb-20 border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
            
            {/* Left Column: Headlines & Clinical Context */}
            <motion.div
              initial={{ opacity: 0, x: -24 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="lg:col-span-7 space-y-6"
            >
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-50 border border-blue-200/80 text-brandBlue text-xs font-bold uppercase tracking-wider font-headline">
                <Smile className="w-3.5 h-3.5 text-brandSky shrink-0" />
                <span>Prosthodontic Care • Fixed Partial Dentures</span>
              </div>

              <h1
                style={{ lineHeight: 1.4 }}
                className="text-3xl sm:text-4xl lg:text-5xl font-black font-headline text-slate-900 tracking-tight leading-[1.4]"
              >
                Restore Damaged Teeth &{' '}
                <span className="bg-gradient-to-r from-brandBlue to-brandSky bg-clip-text text-transparent">
                  Fill the Gaps in Your Smile
                </span>
              </h1>

              <div className="space-y-4 text-slate-600 text-sm sm:text-base leading-relaxed">
                <p>
                  Damaged, weakened or missing teeth can affect your chewing, comfort and confidence. Dental crowns and bridges are fixed restorations designed to strengthen selected teeth or replace missing teeth without needing to remove the restoration every day.
                </p>
                <p className="text-slate-500 text-xs sm:text-sm">
                  At Jerush Dentofacial &amp; Cosmetic Laser Centre, treatment is planned according to your tooth condition, bite and smile goals using precision CAD/CAM digital technology and lifelike dental ceramics.
                </p>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center gap-4 pt-2">
                <button
                  onClick={handleBookClick}
                  className="px-8 py-3.5 rounded-full bg-gradient-to-r from-brandBlue to-brandSky text-white font-headline font-bold text-sm shadow-md hover:shadow-lg hover:brightness-105 transition-all flex items-center gap-2 group cursor-pointer"
                >
                  <Calendar className="w-4 h-4 text-white" />
                  <span>Book Your Consultation</span>
                </button>
                <a
                  href="tel:+919489160000"
                  className="px-6 py-3.5 rounded-full bg-slate-900 text-white font-headline font-semibold text-sm hover:bg-brandBlue transition-all flex items-center gap-2 shadow-sm"
                >
                  <Phone className="w-4 h-4 text-brandSky" />
                  <span>Call +91 94891 60000</span>
                </a>
              </div>

              {/* Trust Badges Row */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-4 border-t border-slate-100">
                <div className="flex items-center gap-2 text-xs font-semibold text-slate-700">
                  <CheckCircle2 className="w-4 h-4 text-brandSky shrink-0" />
                  <span>Permanently Fixed</span>
                </div>
                <div className="flex items-center gap-2 text-xs font-semibold text-slate-700">
                  <CheckCircle2 className="w-4 h-4 text-brandSky shrink-0" />
                  <span>Lifelike Shade Match</span>
                </div>
                <div className="flex items-center gap-2 text-xs font-semibold text-slate-700">
                  <CheckCircle2 className="w-4 h-4 text-brandSky shrink-0" />
                  <span>In-House CAD/CAM Lab</span>
                </div>
                <div className="flex items-center gap-2 text-xs font-semibold text-slate-700">
                  <CheckCircle2 className="w-4 h-4 text-brandSky shrink-0" />
                  <span>Prosthodontist Led</span>
                </div>
              </div>
            </motion.div>

            {/* Right Column: Clean White Frame Hero Image with Ambient Glow (Zero Black Border) */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.15 }}
              className="lg:col-span-5 relative"
            >
              {/* Radiant Ambient Soft Blur */}
              <div className="absolute -inset-4 bg-gradient-to-tr from-sky-400/20 via-brandBlue/15 to-transparent rounded-3xl blur-2xl -z-10" />

              <div className="relative rounded-3xl overflow-hidden bg-white border border-slate-200/90 shadow-2xl p-2.5 sm:p-3 group">
                <div className="relative aspect-square w-full rounded-2xl overflow-hidden bg-slate-50 flex items-center justify-center">
                  <img
                    src="/images/medical-services/dental-care/prosthodontic-care-tooth-replacement/fixed-partial-dentures-crowns-bridges/natural-look-crowns-and-bridges.webp"
                    alt="Natural-looking dental crowns and bridges restoring smile confidence and bite function - Jerush Dentofacial"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                </div>
              </div>
            </motion.div>

          </div>
        </div>
      </section>

      {/* ─── Top Second Section: Consultation Appointment Form ─── */}
      <section id="consultation-form" className="py-12 sm:py-16 bg-slate-50 border-b border-slate-200/80 scroll-mt-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <TreatmentAppointmentForm
            treatmentName="Fixed Partial Dentures / Crowns & Bridges"
            treatmentCategory="dental"
            title="Book a Consultation"
            highlightWord="Near You"
            subtitle="Get personalised advice from Jerush Dentofacial & Cosmetic Laser Centre's leading prosthodontic specialists."
            features={[
              {
                icon: ShieldCheck,
                title: 'Custom Precision Fit',
                desc: 'Shade-matched porcelain and anatomical contours tailored to your natural bite.'
              },
              {
                icon: Stethoscope,
                title: 'Specialist-Led Care',
                desc: 'Consultations and clinical treatment supervised by hospital prosthodontic specialists.'
              },
              {
                icon: Cpu,
                title: 'Advanced In-House Lab',
                desc: 'Fast turnaround times with high-precision digital 3D scanning and CAD/CAM milling.'
              },
              {
                icon: MapPin,
                title: '4 Regional Centres',
                desc: 'World-class hospital care available across Thuckalay, Chennai, Trichy, and UAE.'
              }
            ]}
          />
        </div>
      </section>

      {/* ─── Signature Counter & Key Stats Bar ─── */}
      <section className="bg-gradient-to-r from-[#0F172A] via-[#2852A3] to-[#0F172A] py-10 sm:py-12 px-4 sm:px-6 text-white shadow-inner relative overflow-hidden">
        {/* Subtle geometric light pattern */}
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#38bdf8_1px,transparent_1px)] [background-size:16px_16px] pointer-events-none" />

        <div className="max-w-7xl mx-auto relative z-10">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8 text-center">
            {KEY_STATS.map((stat, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className="space-y-1.5"
              >
                <div className="font-headline font-black text-2xl sm:text-3xl lg:text-4xl text-white tracking-tight">
                  {stat.value}
                </div>
                <div className="text-brandSky text-xs sm:text-sm font-bold uppercase tracking-wider mt-1">
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Sticky Sub-Navigation Bar ─── */}
      <TreatmentSectionNav
        tabs={NAVIGATION_TABS}
        activeSection={activeSection}
        onTabClick={scrollToSection}
      />

      {/* ─── Section 1: Crowns vs Bridges: What's the Difference? ─── */}
      <section id="crowns-vs-bridges" className="py-16 sm:py-20 lg:py-24 bg-white relative overflow-hidden scroll-mt-28 border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="max-w-3xl mx-auto text-center space-y-4 mb-14"
          >
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-blue-50 border border-blue-200 text-brandBlue text-xs font-bold uppercase tracking-wider font-headline">
              <ArrowLeftRight className="w-3.5 h-3.5 text-brandSky" />
              <span>Diagnostic Comparison</span>
            </div>
            <h2
              style={{ lineHeight: 1.4 }}
              className="text-2xl sm:text-3xl lg:text-4xl font-extrabold font-headline text-slate-900 tracking-tight leading-[1.4]"
            >
              Crowns vs Bridges:{' '}
              <span className="bg-gradient-to-r from-brandBlue to-brandSky bg-clip-text text-transparent">
                What's the Difference?
              </span>
            </h2>
            <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
              Both restorations are permanently cemented and non-removable. However, they serve two distinct clinical purposes depending on whether a tooth needs structural shielding or an empty gap needs bridging.
            </p>

            {/* Interactive Selector Pill Toggle */}
            <div className="inline-flex p-1.5 rounded-full bg-slate-100 border border-slate-200/80 shadow-inner mt-4">
              <button
                type="button"
                onClick={() => setSelectedComparison('crowns')}
                className={`px-5 py-2 rounded-full font-headline font-bold text-xs sm:text-sm transition-all duration-300 cursor-pointer ${
                  selectedComparison === 'crowns'
                    ? 'bg-brandBlue text-white shadow-md'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                Dental Crowns (Single Tooth)
              </button>
              <button
                type="button"
                onClick={() => setSelectedComparison('bridges')}
                className={`px-5 py-2 rounded-full font-headline font-bold text-xs sm:text-sm transition-all duration-300 cursor-pointer ${
                  selectedComparison === 'bridges'
                    ? 'bg-brandBlue text-white shadow-md'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                Dental Bridges (Gap Spans)
              </button>
            </div>
          </motion.div>

          {/* Interactive Dual Showcase Cards */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
            {Object.values(COMPARISON_DATA).map((item) => {
              const isSelected = selectedComparison === item.id;
              return (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5 }}
                  onClick={() => setSelectedComparison(item.id)}
                  className={`rounded-3xl p-6 sm:p-8 transition-all duration-400 cursor-pointer border flex flex-col justify-between ${
                    isSelected
                      ? 'bg-white border-brandSky shadow-2xl ring-2 ring-brandSky/20'
                      : 'bg-slate-50/70 border-slate-200/80 hover:bg-white hover:shadow-lg hover:border-slate-300'
                  }`}
                >
                  <div>
                    {/* Header Strip */}
                    <div className="flex items-center justify-between mb-4">
                      <span className={`text-[11px] font-bold uppercase tracking-wider font-headline px-3 py-1 rounded-full border ${item.badgeColor}`}>
                        {item.tag}
                      </span>
                      <span className="text-xs font-semibold text-slate-400">
                        {item.subtitle}
                      </span>
                    </div>

                    <h3 className="text-2xl font-black font-headline text-slate-900 mb-3">
                      {item.title}
                    </h3>

                    {/* Framed Clinical Image (Uncropped Object-Contain) */}
                    <div className="relative rounded-2xl overflow-hidden bg-white aspect-[16/10] mb-5 border border-slate-200/80 p-3 sm:p-4 flex items-center justify-center group shadow-inner">
                      <img
                        src={item.img}
                        alt={item.alt}
                        className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-500"
                      />
                    </div>

                    {/* Definition */}
                    <p className="text-slate-600 text-sm leading-relaxed mb-6">
                      {item.definition}
                    </p>

                    {/* Specification Grid */}
                    <div className="grid grid-cols-2 gap-3 mb-6 p-4 rounded-2xl bg-slate-50 border border-slate-200/70">
                      {item.specs.map((spec, sIdx) => (
                        <div key={sIdx} className="space-y-0.5">
                          <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                            {spec.label}
                          </p>
                          <p className="text-xs font-bold text-slate-800">
                            {spec.value}
                          </p>
                        </div>
                      ))}
                    </div>

                    {/* Clinical Features List */}
                    <div className="space-y-2.5">
                      <p className="text-xs font-bold uppercase tracking-wider text-slate-700 font-headline">
                        Key Clinical Advantages:
                      </p>
                      {item.highlights.map((feat, fIdx) => (
                        <div key={fIdx} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-600">
                          <Check className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                          <span>{feat}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="pt-6 mt-6 border-t border-slate-100 flex items-center justify-between">
                    <span className="text-xs font-bold text-brandBlue font-headline">
                      {isSelected ? '✓ Currently Focused' : 'Click to Focus'}
                    </span>
                    <button
                      onClick={handleBookClick}
                      className="inline-flex items-center gap-1.5 text-xs font-bold text-brandSky hover:text-brandBlue transition-colors font-headline"
                    >
                      <span>Consult Specialist</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </motion.div>
              );
            })}
          </div>

        </div>
      </section>

      {/* ─── Section 2: When Might You Need a Crown or Bridge? ─── */}
      <section id="clinical-indications" className="py-16 sm:py-20 lg:py-24 bg-slate-50 relative overflow-hidden scroll-mt-28 border-b border-slate-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="max-w-3xl mx-auto text-center space-y-4 mb-14"
          >
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-blue-100/70 border border-blue-200 text-brandBlue text-xs font-bold uppercase tracking-wider font-headline">
              <Target className="w-3.5 h-3.5 text-brandSky" />
              <span>Diagnostic Indications</span>
            </div>
            <h2
              style={{ lineHeight: 1.4 }}
              className="text-2xl sm:text-3xl lg:text-4xl font-extrabold font-headline text-slate-900 tracking-tight leading-[1.4]"
            >
              When Might You Need a{' '}
              <span className="bg-gradient-to-r from-brandBlue to-brandSky bg-clip-text text-transparent">
                Crown or Bridge?
              </span>
            </h2>
            <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
              Your dentist may recommend these restorations for several common clinical reasons. The best option depends on the health of your remaining teeth, gums and supporting structures.
            </p>
          </motion.div>

          {/* 5 Clinical Indications Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {CLINICAL_INDICATIONS.map((ind, idx) => (
              <motion.div
                key={ind.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: idx * 0.08 }}
                className="bg-white rounded-3xl overflow-hidden border border-slate-200/90 shadow-sm hover:shadow-xl hover:border-brandSky/60 transition-all duration-300 flex flex-col justify-between group"
              >
                <div>
                  {/* Framed Image Header */}
                  <div className="p-3 pb-0">
                    <div className="relative rounded-2xl overflow-hidden bg-slate-100 aspect-[16/10] border border-slate-100">
                      <img
                        src={ind.img}
                        alt={ind.alt}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute top-2.5 left-2.5">
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-[10px] font-headline font-bold bg-white/95 text-brandBlue border border-blue-200/80 backdrop-blur-md shadow-xs">
                          {ind.category}
                        </span>
                      </div>
                      <div className="absolute top-2.5 right-2.5 w-6 h-6 rounded-full bg-slate-900/80 text-white text-[11px] font-headline font-bold flex items-center justify-center">
                        {ind.number}
                      </div>
                    </div>
                  </div>

                  {/* Content Area */}
                  <div className="p-5 space-y-3">
                    <h3 className="font-headline font-bold text-lg text-slate-900 group-hover:text-brandBlue transition-colors">
                      {ind.title}
                    </h3>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      {ind.desc}
                    </p>

                    <div className="p-3 rounded-xl bg-slate-50 border border-slate-100 space-y-1">
                      <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                        Clinical Goal
                      </p>
                      <p className="text-xs text-slate-700 leading-relaxed font-medium">
                        {ind.clinicalGoal}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="px-5 pb-5 pt-3 border-t border-slate-100 flex items-center justify-between">
                  <span className="inline-flex items-center gap-1.5 text-[11px] font-bold text-brandBlue font-headline">
                    <Sparkles className="w-3.5 h-3.5 text-brandSky" />
                    <span>Recommended: {ind.recommended}</span>
                  </span>
                  <button
                    onClick={handleBookClick}
                    className="text-xs text-slate-400 group-hover:text-brandSky font-bold transition-colors"
                  >
                    →
                  </button>
                </div>
              </motion.div>
            ))}

            {/* Sixth Clinical Summary Card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: 0.4 }}
              className="bg-gradient-to-br from-[#0F172A] to-[#1E293B] text-white rounded-3xl p-6 sm:p-7 flex flex-col justify-between shadow-lg relative overflow-hidden"
            >
              <div className="space-y-4">
                <div className="w-10 h-10 rounded-2xl bg-brandSky/20 border border-brandSky/40 flex items-center justify-center text-brandSky">
                  <Microscope className="w-5 h-5" />
                </div>
                <h3 className="font-headline font-bold text-xl text-white">
                  Personalised Clinical Assessment
                </h3>
                <p className="text-xs text-slate-300 leading-relaxed">
                  The ideal restoration depends on your unique bite patterns, the health of your periodontium, remaining bone support, and cosmetic smile balance.
                </p>
                <div className="p-3 rounded-xl bg-white/10 border border-white/10 text-xs text-brandSky font-medium">
                  • 3D Digital Impressions<br />
                  • Sub-millimetre Marginal Seal<br />
                  • Certified Biocompatible Ceramics
                </div>
              </div>

              <div className="pt-5 mt-4 border-t border-white/10">
                <button
                  onClick={handleBookClick}
                  className="w-full py-3 rounded-full bg-gradient-to-r from-brandSky to-brandBlue text-white font-headline font-bold text-xs shadow-md hover:brightness-110 transition-all cursor-pointer text-center"
                >
                  Arrange Clinical Examination
                </button>
              </div>
            </motion.div>
          </div>

        </div>
      </section>

      {/* ─── Section 3: How Is the Treatment Done? (5-Step Interactive Stepper) ─── */}
      <section id="treatment-journey" className="py-16 sm:py-20 lg:py-24 bg-white relative overflow-hidden scroll-mt-28 border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="max-w-3xl mx-auto text-center space-y-4 mb-14"
          >
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-blue-50 border border-blue-200 text-brandBlue text-xs font-bold uppercase tracking-wider font-headline">
              <Clock className="w-3.5 h-3.5 text-brandSky" />
              <span>Step-by-Step Pathway</span>
            </div>
            <h2
              style={{ lineHeight: 1.4 }}
              className="text-2xl sm:text-3xl lg:text-4xl font-extrabold font-headline text-slate-900 tracking-tight leading-[1.4]"
            >
              How Is the{' '}
              <span className="bg-gradient-to-r from-brandBlue to-brandSky bg-clip-text text-transparent">
                Treatment Done?
              </span>
            </h2>
            <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
              At Jerush, crowns and fixed partial bridges are created through a structured, predictable 5-step clinical process designed for maximum tooth longevity and complete patient comfort.
            </p>
          </motion.div>

          {/* Stepper Navigation Buttons */}
          <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 mb-10 max-w-4xl mx-auto">
            {TREATMENT_STEPS.map((s, idx) => {
              const isActive = activeStep === idx;
              return (
                <button
                  key={idx}
                  type="button"
                  onClick={() => setActiveStep(idx)}
                  className={`px-4 sm:px-5 py-2.5 rounded-full font-headline font-bold text-xs transition-all duration-300 flex items-center gap-2 cursor-pointer ${
                    isActive
                      ? 'bg-brandBlue text-white shadow-md ring-2 ring-brandBlue/30'
                      : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                  }`}
                >
                  <span className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold ${
                    isActive ? 'bg-white text-brandBlue' : 'bg-slate-200 text-slate-600'
                  }`}>
                    {s.step}
                  </span>
                  <span>{s.title}</span>
                </button>
              );
            })}
          </div>

          {/* Active Step Showcase Card */}
          <div className="max-w-5xl mx-auto">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeStep}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.4 }}
                className="bg-slate-50 border border-slate-200/90 rounded-3xl p-6 sm:p-10 shadow-lg"
              >
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                  
                  {/* Left Column: Details */}
                  <div className="lg:col-span-7 space-y-5">
                    <div className="flex items-center gap-3">
                      <span className="px-3 py-1 rounded-full bg-blue-100 text-brandBlue font-headline font-bold text-xs">
                        Stage {TREATMENT_STEPS[activeStep].step} of 05
                      </span>
                      <span className="text-xs font-semibold text-brandSky uppercase tracking-wider font-headline">
                        {TREATMENT_STEPS[activeStep].phase}
                      </span>
                    </div>

                    <h3 className="text-2xl sm:text-3xl font-black font-headline text-slate-900">
                      {TREATMENT_STEPS[activeStep].title}
                    </h3>

                    <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
                      {TREATMENT_STEPS[activeStep].desc}
                    </p>

                    <div className="space-y-3 pt-2">
                      <div className="p-3.5 rounded-2xl bg-white border border-slate-200/80 shadow-xs flex items-start gap-3">
                        <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0 mt-0.5" />
                        <div>
                          <p className="text-xs font-bold text-slate-900">Doctor Quality Checkpoint:</p>
                          <p className="text-xs text-slate-600">{TREATMENT_STEPS[activeStep].checkpoint}</p>
                        </div>
                      </div>

                      <div className="p-3.5 rounded-2xl bg-white border border-slate-200/80 shadow-xs flex items-start gap-3">
                        <Heart className="w-5 h-5 text-brandSky shrink-0 mt-0.5" />
                        <div>
                          <p className="text-xs font-bold text-slate-900">Patient Comfort Standard:</p>
                          <p className="text-xs text-slate-600">{TREATMENT_STEPS[activeStep].patientExperience}</p>
                        </div>
                      </div>
                    </div>

                    {/* Stepper Navigation Arrows */}
                    <div className="flex items-center gap-3 pt-3">
                      <button
                        type="button"
                        disabled={activeStep === 0}
                        onClick={() => setActiveStep(prev => Math.max(0, prev - 1))}
                        className={`px-4 py-2 rounded-full font-headline font-bold text-xs border transition-all cursor-pointer ${
                          activeStep === 0 ? 'opacity-40 cursor-not-allowed bg-slate-100 text-slate-400 border-slate-200' : 'bg-white text-slate-700 hover:bg-slate-100 border-slate-200'
                        }`}
                      >
                        ← Previous Step
                      </button>
                      <button
                        type="button"
                        disabled={activeStep === TREATMENT_STEPS.length - 1}
                        onClick={() => setActiveStep(prev => Math.min(TREATMENT_STEPS.length - 1, prev + 1))}
                        className={`px-4 py-2 rounded-full font-headline font-bold text-xs border transition-all cursor-pointer ${
                          activeStep === TREATMENT_STEPS.length - 1 ? 'opacity-40 cursor-not-allowed bg-slate-100 text-slate-400 border-slate-200' : 'bg-brandBlue text-white hover:bg-brandBlue/90 border-brandBlue'
                        }`}
                      >
                        Next Step →
                      </button>
                    </div>
                  </div>

                  {/* Right Column: Image (Uncropped Aspect-Square with Object-Contain) */}
                  <div className="lg:col-span-5 flex flex-col items-center justify-center">
                    <div className="relative rounded-3xl overflow-hidden bg-white border border-slate-200 shadow-md p-4 sm:p-5 w-full max-w-[420px] group">
                      <div className="relative aspect-square w-full rounded-2xl overflow-hidden flex items-center justify-center bg-slate-50/60 p-2 sm:p-3">
                        <img
                          src={TREATMENT_STEPS[activeStep].img}
                          alt={TREATMENT_STEPS[activeStep].alt}
                          className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-500"
                        />
                      </div>
                      <div className="pt-3 pb-1 text-center">
                        <span className="text-[11px] font-semibold text-slate-500 font-headline">
                          Jerush Prosthodontic Pathway • Stage {TREATMENT_STEPS[activeStep].step} of 05
                        </span>
                      </div>
                    </div>
                  </div>

                </div>
              </motion.div>
            </AnimatePresence>
          </div>

        </div>
      </section>

      {/* ─── Section 4: Real Patient Transformations (PDF Page 3) ─── */}
      <section id="transformations" className="py-16 sm:py-20 lg:py-24 bg-slate-50 relative overflow-hidden scroll-mt-28 border-b border-slate-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="max-w-3xl mx-auto text-center space-y-4 mb-14"
          >
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-blue-100/70 border border-blue-200 text-brandBlue text-xs font-bold uppercase tracking-wider font-headline">
              <Eye className="w-3.5 h-3.5 text-brandSky" />
              <span>Visible Clinical Results</span>
            </div>
            <h2
              style={{ lineHeight: 1.4 }}
              className="text-2xl sm:text-3xl lg:text-4xl font-extrabold font-headline text-slate-900 tracking-tight leading-[1.4]"
            >
              Before &amp; After{' '}
              <span className="bg-gradient-to-r from-brandBlue to-brandSky bg-clip-text text-transparent">
                Transformations
              </span>
            </h2>
            <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
              Explore real-world dental crown and fixed bridge outcomes restored by our hospital prosthodontic team.
            </p>

            {/* Case Selection Tabs */}
            <div className="flex flex-wrap items-center justify-center gap-2 pt-2">
              {BEFORE_AFTER_CASES.map((c, cIdx) => (
                <button
                  key={c.id}
                  type="button"
                  onClick={() => setActiveCase(cIdx)}
                  className={`px-4 py-2 rounded-full font-headline font-bold text-xs transition-all cursor-pointer ${
                    activeCase === cIdx
                      ? 'bg-slate-900 text-white shadow-md'
                      : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
                  }`}
                >
                  Case {cIdx + 1}
                </button>
              ))}
            </div>
          </motion.div>

          {/* Active Before/After Showcase */}
          <div className="max-w-5xl mx-auto">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeCase}
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.98 }}
                transition={{ duration: 0.4 }}
                className="bg-white border border-slate-200/90 rounded-3xl p-6 sm:p-8 shadow-xl"
              >
                <div className="text-center mb-6 space-y-1">
                  <h3 className="font-headline font-bold text-lg sm:text-xl text-slate-900">
                    {BEFORE_AFTER_CASES[activeCase].patient}
                  </h3>
                  <p className="text-xs text-brandBlue font-semibold">
                    {BEFORE_AFTER_CASES[activeCase].diagnosis}
                  </p>
                </div>

                {/* Side-by-Side Dual View */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
                  
                  {/* Before Box */}
                  <div className="space-y-3">
                    <div className="relative rounded-2xl overflow-hidden bg-slate-100 border border-slate-200/80 shadow-inner group">
                      <img
                        src={BEFORE_AFTER_CASES[activeCase].beforeImg}
                        alt="Before dental crown and bridge restoration"
                        className="w-full aspect-[16/10] object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute top-3 left-3 bg-red-600/90 text-white font-headline font-bold text-[11px] px-3 py-1 rounded-full backdrop-blur-xs shadow-xs">
                        BEFORE
                      </div>
                    </div>
                    <div className="p-3.5 rounded-2xl bg-red-50/60 border border-red-100 text-xs text-slate-700 leading-relaxed">
                      <strong>Pre-Treatment:</strong> {BEFORE_AFTER_CASES[activeCase].beforeText}
                    </div>
                  </div>

                  {/* After Box */}
                  <div className="space-y-3">
                    <div className="relative rounded-2xl overflow-hidden bg-slate-100 border border-emerald-300 shadow-md group">
                      <img
                        src={BEFORE_AFTER_CASES[activeCase].afterImg}
                        alt="After dental crown and bridge restoration"
                        className="w-full aspect-[16/10] object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute top-3 left-3 bg-emerald-600/90 text-white font-headline font-bold text-[11px] px-3 py-1 rounded-full backdrop-blur-xs shadow-xs">
                        AFTER RESTORATION
                      </div>
                    </div>
                    <div className="p-3.5 rounded-2xl bg-emerald-50/70 border border-emerald-100 text-xs text-slate-700 leading-relaxed">
                      <strong>Post-Treatment:</strong> {BEFORE_AFTER_CASES[activeCase].afterText}
                    </div>
                  </div>

                </div>

                <div className="mt-6 pt-4 border-t border-slate-100 text-center">
                  <p className="text-[11px] text-slate-500 italic">
                    {BEFORE_AFTER_CASES[activeCase].note}
                  </p>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

        </div>
      </section>

      {/* ─── Section 5: Daily Care & Longevity Protocols ─── */}
      <section id="daily-care" className="py-16 sm:py-20 bg-white relative overflow-hidden scroll-mt-28 border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="max-w-3xl mx-auto text-center space-y-4 mb-14"
          >
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-blue-50 border border-blue-200 text-brandBlue text-xs font-bold uppercase tracking-wider font-headline">
              <ShieldCheck className="w-3.5 h-3.5 text-brandSky" />
              <span>Restoration Longevity</span>
            </div>
            <h2
              style={{ lineHeight: 1.4 }}
              className="text-2xl sm:text-3xl lg:text-4xl font-extrabold font-headline text-slate-900 tracking-tight leading-[1.4]"
            >
              Essential Daily Care &amp;{' '}
              <span className="bg-gradient-to-r from-brandBlue to-brandSky bg-clip-text text-transparent">
                Longevity Guidelines
              </span>
            </h2>
            <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
              With attentive hygiene and regular check-ups, your crowns and fixed partial dentures can provide over 10 to 15+ years of trouble-free daily function.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
            {[
              {
                icon: Smile,
                title: 'Twice-Daily Brushing',
                desc: 'Brush thoroughly along the gumline with a soft-bristle brush and non-abrasive fluoride toothpaste to protect underlying margins.'
              },
              {
                icon: Layers,
                title: 'Floss Under Bridges',
                desc: 'Use special floss threaders, superfloss or a water flosser daily to remove trapped plaque beneath the artificial bridge pontic.'
              },
              {
                icon: Shield,
                title: 'Avoid Hard Chewing',
                desc: 'Never use restored teeth to crack ice cubes, nut shells, or hard sweets, which could induce micro-fractures in ceramic crowns.'
              },
              {
                icon: RefreshCw,
                title: 'Bi-Annual Reviews',
                desc: 'Attend routine 6-month clinical check-ups for professional cleaning, margin seal verification, and bite adjustments.'
              }
            ].map((rule, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: idx * 0.08 }}
                className="p-6 rounded-3xl bg-slate-50 border border-slate-200/80 hover:border-brandSky/60 hover:bg-white hover:shadow-lg transition-all duration-300"
              >
                <div className="w-10 h-10 rounded-2xl bg-blue-100/70 text-brandBlue flex items-center justify-center mb-4">
                  <rule.icon className="w-5 h-5 text-brandSky" />
                </div>
                <h3 className="font-headline font-bold text-base text-slate-900 mb-2">
                  {rule.title}
                </h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  {rule.desc}
                </p>
              </motion.div>
            ))}
          </div>

        </div>
      </section>

      {/* ─── Section 6: Regional Centres of Excellence ─── */}
      <section id="regional-centres" className="py-16 sm:py-20 lg:py-24 bg-slate-50 relative overflow-hidden scroll-mt-28 border-b border-slate-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="max-w-3xl mx-auto text-center space-y-4 mb-14"
          >
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-blue-100/70 border border-blue-200 text-brandBlue text-xs font-bold uppercase tracking-wider font-headline">
              <MapPin className="w-3.5 h-3.5 text-brandSky" />
              <span>Centres of Excellence</span>
            </div>
            <h2
              style={{ lineHeight: 1.4 }}
              className="text-2xl sm:text-3xl lg:text-4xl font-extrabold font-headline text-slate-900 tracking-tight leading-[1.4]"
            >
              Consult Prosthodontic Specialists Across{' '}
              <span className="bg-gradient-to-r from-brandBlue to-brandSky bg-clip-text text-transparent">
                Tamil Nadu
              </span>
            </h2>
            <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
              Our hospital-grade restorative and prosthodontic services are accessible across 4 state-of-the-art regional centres:
            </p>
          </motion.div>

          {/* Regional Centres Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
            {[
              {
                title: 'Thuckalay (Hospital HQ)',
                role: 'Main Multispecialty Hospital & Prosthodontic Wing',
                city: 'Kanyakumari District'
              },
              {
                title: 'Chennai Centre',
                role: 'Digital Smile Design & Restorative Wing',
                city: 'Adyar, Chennai'
              },
              {
                title: 'UAE Clinic',
                role: 'International Dental & Aesthetic Wing',
                city: 'Fujairah / UAE'
              },
              {
                title: 'Trichy Centre',
                role: 'Central Tamil Nadu Consultations & Bridge Care',
                city: 'Trichy Central'
              }
            ].map((c, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.08 }}
                className="p-6 rounded-3xl bg-white border border-slate-200/80 hover:border-brandSky/60 hover:shadow-lg transition-all duration-300"
              >
                <div className="w-10 h-10 rounded-xl bg-blue-100 text-brandBlue flex items-center justify-center mb-4">
                  <MapPin className="w-5 h-5 text-brandSky" />
                </div>
                <h3 className="font-headline font-bold text-base text-slate-900 mb-1">
                  {c.title}
                </h3>
                <p className="text-xs font-semibold text-brandBlue mb-2">
                  {c.city}
                </p>
                <p className="text-xs text-slate-600 leading-relaxed">
                  {c.role}
                </p>
              </motion.div>
            ))}
          </div>

          <div className="mt-8 text-center">
            <div className="inline-block p-3.5 rounded-2xl bg-white border border-slate-200 text-xs text-slate-500 shadow-xs">
              <strong className="text-slate-700">Hospital Branch Addresses:</strong> Complete clinic street addresses, Google Maps directions, and direct phone lines are available in the footer section below.
            </div>
          </div>

        </div>
      </section>

      {/* ─── Section 7: Frequently Asked Questions (PDF Page 4) ─── */}
      <section id="faqs" className="py-16 sm:py-20 lg:py-24 bg-white relative overflow-hidden scroll-mt-28 border-b border-slate-100">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center space-y-4 mb-14"
          >
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-blue-100/70 border border-blue-200 text-brandBlue text-xs font-bold uppercase tracking-wider font-headline">
              <HelpCircle className="w-3.5 h-3.5 text-brandSky" />
              <span>Clear Clinical Answers</span>
            </div>
            <h2
              style={{ lineHeight: 1.4 }}
              className="text-2xl sm:text-3xl lg:text-4xl font-extrabold font-headline text-slate-900 tracking-tight leading-[1.4]"
            >
              Frequently Asked{' '}
              <span className="bg-gradient-to-r from-brandBlue to-brandSky bg-clip-text text-transparent">
                Questions
              </span>
            </h2>
            <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
              Clear clinical guidance on dental crowns, bridges, pain management, lifespan, and home maintenance.
            </p>
          </motion.div>

          {/* Accordion FAQ List */}
          <div className="space-y-3.5">
            {FAQS.map((faq, fIdx) => {
              const isOpen = expandedFaq === fIdx;
              return (
                <div
                  key={fIdx}
                  className={`rounded-2xl border transition-all duration-200 overflow-hidden text-left bg-slate-50/70 ${
                    isOpen
                      ? 'border-brandSky/60 shadow-md ring-1 ring-brandSky/20 bg-white'
                      : 'border-slate-200/80 hover:border-brandSky/40'
                  }`}
                >
                  <button
                    type="button"
                    onClick={() => toggleFaq(fIdx)}
                    className="w-full py-4 sm:py-5 px-5 sm:px-6 text-left flex items-center justify-between gap-4 cursor-pointer hover:bg-slate-50/70 transition-colors"
                  >
                    <span className="font-headline font-bold text-sm sm:text-base text-slate-900 leading-snug pr-2">
                      {fIdx + 1}. {faq.q}
                    </span>
                    <div
                      className={`w-7 h-7 sm:w-8 sm:h-8 rounded-full flex items-center justify-center shrink-0 transition-transform duration-300 ${
                        isOpen ? 'bg-brandBlue text-white rotate-180 shadow-sm' : 'bg-slate-200/80 text-slate-600'
                      }`}
                    >
                      <ChevronDown className="w-4 h-4" />
                    </div>
                  </button>

                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.25, ease: 'easeInOut' }}
                      >
                        <div className="px-6 pb-6 pt-1 text-slate-600 text-xs sm:text-sm leading-relaxed border-t border-slate-100">
                          {faq.a}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>

        </div>
      </section>

      {/* ─── Section 8: Related Treatments in Prosthodontic Care ─── */}
      <section className="py-16 sm:py-20 bg-slate-50 relative overflow-hidden border-b border-slate-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="max-w-3xl mx-auto text-center space-y-3 mb-12"
          >
            <span className="text-xs font-bold text-brandSky uppercase tracking-widest font-headline">
              Comprehensive Tooth Replacement
            </span>
            <h2
              style={{ lineHeight: 1.4 }}
              className="text-2xl sm:text-3xl font-extrabold font-headline text-slate-900 tracking-tight leading-[1.4]"
            >
              Related Treatments in{' '}
              <span className="bg-gradient-to-r from-brandBlue to-brandSky bg-clip-text text-transparent">
                Prosthodontic Care
              </span>
            </h2>
            <p className="text-slate-600 text-sm leading-relaxed">
              Explore complementary removable and foundation tooth restoration options provided by our prosthodontic team across Tamil Nadu.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {RELATED_TREATMENTS.map((rel, rIdx) => (
              <motion.div
                key={rIdx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: rIdx * 0.1 }}
                className="h-full"
              >
                <Link
                  to={rel.link}
                  className="bg-white rounded-3xl overflow-hidden border border-slate-200/90 shadow-sm hover:shadow-xl hover:border-brandSky/60 transition-all duration-300 flex flex-col h-full group text-left"
                >
                  {/* Framed Image Container */}
                  <div className="p-3 pb-0">
                    <div className="relative rounded-2xl overflow-hidden bg-slate-50 aspect-[16/10] border border-slate-100 shadow-inner">
                      <img
                        src={rel.image}
                        alt={rel.alt || rel.title}
                        className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute top-2.5 left-2.5">
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-[10px] font-headline font-bold bg-white/95 text-brandBlue border border-blue-200/80 backdrop-blur-md shadow-xs">
                          {rel.tag}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="p-5 flex-1 flex flex-col justify-between space-y-3">
                    <div>
                      <h3 className="font-headline font-bold text-base sm:text-lg text-slate-900 group-hover:text-brandBlue transition-colors">
                        {rel.title}
                      </h3>
                      <p className="text-xs text-slate-600 leading-relaxed mt-1.5">
                        {rel.desc}
                      </p>
                    </div>

                    <div className="pt-4 border-t border-slate-100 flex items-center justify-between text-xs font-headline font-bold text-brandBlue group-hover:text-brandSky transition-colors">
                      <span>Explore treatment</span>
                      <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>

        </div>
      </section>

      {/* ─── Bottom CTA Banner (Dr. Sherine Ponraj & Unified Dark Navy Format from PDF Page 4) ─── */}
      <TreatmentCtaBanner
        badgeText="SPECIALIST PROSTHODONTIST & IMPLANTOLOGIST"
        titlePrefix="Damaged Tooth? Missing Tooth?"
        highlightWord="Let's Restore It"
        titleSuffix="at Jerush"
        subtitle="Discover personalised crowns and bridges designed to restore your smile, bite and confidence at Jerush Dentofacial."
        primaryBtnText="Book Your Consultation"
        onPrimaryClick={handleBookClick}
        secondaryBtnText="Call Our Team: +91 94891 60000"
        secondaryBtnPhone="+919489160000"
        doctorImage="/images/doctors/dr-sherine-ponraj-prosthodontist.webp"
        doctorName="DR. SHERINE PONRAJ"
        doctorRole="Consultant Prosthodontist & Implantologist"
        doctorAlt="DR. SHERINE PONRAJ - Consultant Prosthodontist at Jerush Dentofacial"
      />
    </div>
  );
}

