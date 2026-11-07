import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ShieldCheck, Calendar, Phone, CheckCircle2, Clock,
  Award, Smile, ArrowRight, Info, Check, HelpCircle, AlertCircle,
  MapPin, ChevronRight, ChevronDown, Eye, Compass, Shield,
  Stethoscope, AlertTriangle, Layers, CheckSquare, Activity,
  Sparkles, RefreshCw, Heart, Zap, FileCheck, Sparkle
} from 'lucide-react';
import PageBreadcrumbHero from '../components/common/PageBreadcrumbHero';
import TreatmentCtaBanner from '../components/common/TreatmentCtaBanner';
import TreatmentSectionNav from '../components/common/TreatmentSectionNav';
import TreatmentAppointmentForm from '../components/common/TreatmentAppointmentForm';
import useTreatmentScrollSpy from '../hooks/useTreatmentScrollSpy';

// Key Stats Bar Data (Signature Jerush Navy Gradient)
const STATS = [
  { value: 'Dentine-Like Flex', label: 'Elastic Modulus Harmony' },
  { value: 'Natural Aesthetics', label: 'Metal-Free Translucency' },
  { value: 'Conservative Prep', label: 'Maximized Root Preservation' },
  { value: '4 Regional Centres', label: 'Centres of Excellence in TN & UAE' }
];

// Sticky Navigation Tabs (Pill Subnav)
const TABS = [
  { id: 'triad', label: 'What Is Fibre Post & Core' },
  { id: 'indications', label: 'When Recommended' },
  { id: 'procedure', label: '3-Step Placement' },
  { id: 'comparison', label: 'Fibre vs Metal Post' },
  { id: 'transformation', label: 'Before & After' },
  { id: 'aftercare', label: 'Care & Protection' },
  { id: 'centres', label: 'Regional Centres' },
  { id: 'faqs', label: 'FAQs' }
];

// Section 1: The Three Parts of a Fibre Post & Core Restoration (PDF Page 1 - 768x768 1:1 Square Images)
const TRIAD_PARTS = [
  {
    id: 'fibre-post',
    stepNumber: '01',
    title: 'Fibre Post',
    subtitle: 'Intra-Radicular Core Retention',
    badge: 'Glass-Fibre Reinforced',
    image: '/images/medical-services/dental-care/prosthodontic-care-tooth-replacement/fibre-post-core/fibre-post.webp',
    alt: 'Glass fibre post placed inside the prepared root canal to help retain the core build-up',
    description: 'A small, fibre-reinforced post placed inside the prepared root canal to help retain the core.',
    technicalDetails: 'Commonly fabricated from high-tensile glass fibres embedded in a biocompatible epoxy resin matrix. It bonds adhesively to radicular dentine using resin cement, distributing masticatory stress uniformly along the root.',
    features: [
      'Placed inside the prepared root canal',
      'Provides secure mechanical retention for the core',
      'Minimizes root wedging stress with dentine-like elasticity'
    ]
  },
  {
    id: 'core-build-up',
    stepNumber: '02',
    title: 'Core Build-Up',
    subtitle: 'Coronal Dentin Reconstruction',
    badge: 'Anatomical Foundation',
    image: '/images/medical-services/dental-care/prosthodontic-care-tooth-replacement/fibre-post-core/core-build-up.webp',
    alt: 'Restorative core build-up material rebuilding missing tooth structure over a fibre post',
    description: 'A restorative material used to rebuild the missing portion of the tooth.',
    technicalDetails: 'Sculpted from high-performance composite resin that adheres seamlessly to both the bonded fibre post and natural tooth walls, restoring axial height and retentive geometry.',
    features: [
      'Rebuilds missing tooth structure and coronal volume',
      'Creates a stable geometrical foundation for crown placement',
      'Chemically bonds with resin matrix of the fibre post'
    ]
  },
  {
    id: 'final-crown',
    stepNumber: '03',
    title: 'Final Crown',
    subtitle: '360° Full-Coverage Protection',
    badge: 'Custom Restoration',
    image: '/images/medical-services/dental-care/prosthodontic-care-tooth-replacement/fibre-post-core/final-crown.webp',
    alt: 'Custom-made dental crown placed over restored tooth to protect it and restore function',
    description: 'A custom-made covering that may be placed over the restored tooth to help protect it and restore its shape and function.',
    technicalDetails: 'Custom-milled from monolithic zirconia, lithium disilicate, or all-ceramic materials. Encircles the restored core with a protective 360° ferrule collar to withstand normal chewing forces.',
    features: [
      'Custom-made protective covering over restored tooth',
      'Restores natural chewing efficiency, aesthetics, and bite',
      'Offers superior optical vitality without metal show-through'
    ]
  }
];

// Section 2: Clinical Indications (PDF Page 2 - 768x768 1:1 Square Images)
const INDICATIONS = [
  {
    id: 'extensive-decay',
    number: '01',
    title: 'Extensive Tooth Decay or Structural Damage',
    shortTitle: 'Extensive Decay or Damage',
    badge: 'Significant Loss',
    image: '/images/medical-services/dental-care/prosthodontic-care-tooth-replacement/fibre-post-core/structural-damage.webp',
    alt: 'Extensive tooth decay or structural damage requiring a fibre post and core restoration',
    description: 'When deep dental cavities or traumatic damage have destroyed large portions of natural tooth substance, leaving inadequate retention for standard direct fillings.'
  },
  {
    id: 'fractured-weakened',
    number: '02',
    title: 'A Fractured or Weakened Upper Portion of the Tooth',
    shortTitle: 'Fractured or Weakened Tooth',
    badge: 'Coronal Fracture',
    image: '/images/medical-services/dental-care/prosthodontic-care-tooth-replacement/fibre-post-core/fractured-upper-portion.webp',
    alt: 'Fractured or weakened coronal portion of a root canal-treated tooth',
    description: 'Teeth with fractured cusps or thin coronal walls that require internal anchorage within the canal to support a stable rebuild.'
  },
  {
    id: 'insufficient-structure',
    number: '03',
    title: 'Insufficient Remaining Tooth Structure to Retain a Core',
    shortTitle: 'Insufficient Tooth Structure',
    badge: 'Low Retention',
    image: '/images/medical-services/dental-care/prosthodontic-care-tooth-replacement/fibre-post-core/insufficient-remaining-tooth-structure.webp',
    alt: 'Insufficient remaining tooth structure to retain a restorative core without post anchorage',
    description: 'Where less than half of the natural coronal tooth wall remains standing, necessitating an intra-radicular post to anchor the core securely.'
  },
  {
    id: 'crown-after-rct',
    number: '04',
    title: 'A Tooth That Requires a Crown After Root Canal Treatment',
    shortTitle: 'Crown Following Root Canal',
    badge: 'Post-Endodontic Care',
    image: '/images/medical-services/dental-care/prosthodontic-care-tooth-replacement/fibre-post-core/tooth-requires-a-crown.webp',
    alt: 'Root canal-treated tooth prepared for a crown requiring fibre post and core foundation',
    description: 'Root-treated posterior or anterior teeth requiring complete crown coverage where the foundation must be rebuilt before crown preparation.'
  }
];

// Section 3: Clinical Steps (PDF Page 2 & 3)
const PROCEDURE_STEPS = [
  {
    step: '01',
    title: 'Tooth Assessment',
    subtitle: 'Clinical & Radiographic Evaluation',
    image: '/images/medical-services/dental-care/prosthodontic-care-tooth-replacement/fibre-post-core/tooth-assessment.webp',
    alt: 'Dentist examining tooth and taking an X-ray to assess root canal treatment and remaining structure',
    description: 'The dentist examines the tooth and may take an X-ray to assess the root and previous root canal treatment.',
    points: [
      'Comprehensive clinical examination of remaining tooth walls and bite',
      'Diagnostic X-ray evaluation to verify sound apical root canal sealing',
      'Assessment of root length, curvature, and canal morphology'
    ]
  },
  {
    step: '02',
    title: 'Fibre Post Placement',
    subtitle: 'Conservative Canal Preparation & Adhesive Bonding',
    image: '/images/medical-services/dental-care/prosthodontic-care-tooth-replacement/fibre-post-core/how-is-the-fibre-post-placed.webp',
    alt: 'Fibre post placement inside conservatively prepared root canal using bonding and cementation',
    description: 'When appropriate, the canal space is prepared conservatively and the fibre post is secured using a suitable bonding and cementation technique.',
    points: [
      'Conservative preparation preserving healthy radicular dentine',
      'Maintenance of vital 4–5 mm apical gutta-percha root seal',
      'Adhesive resin bonding and light-activation for secure retention'
    ]
  },
  {
    step: '03',
    title: 'Core Build-Up and Crown',
    subtitle: 'Anatomical Rebuilding & Final Prosthetic Protection',
    image: '/images/medical-services/dental-care/prosthodontic-care-tooth-replacement/fibre-post-core/core-build-up-and-crown.webp',
    alt: 'Rebuilding missing tooth structure with core build-up and planning custom final crown',
    description: 'The missing tooth structure is rebuilt. A suitable final crown may then be planned to restore the tooth\'s function and appearance.',
    points: [
      'Missing tooth structure is rebuilt using durable composite resin',
      'Precision shaping to establish optimal axial taper and retention',
      'Planning and placement of a custom crown to restore function and aesthetics'
    ]
  }
];

// Section 6: Caring for Your Restored Tooth (PDF Page 3 & 4)
const AFTERCARE_GUIDELINES = [
  {
    id: 'brush-twice',
    number: '01',
    title: 'Brush Twice Daily and Clean Between Teeth',
    image: '/images/medical-services/dental-care/prosthodontic-care-tooth-replacement/fibre-post-core/brush-twice-daily.webp',
    alt: 'Patient brushing teeth twice daily and cleaning between teeth with dental floss',
    description: 'Brush twice daily and clean between your teeth with dental floss or interdental brushes to protect the gum line and prevent secondary decay.'
  },
  {
    id: 'follow-instructions',
    number: '02',
    title: 'Follow Instructions While Waiting for Crown',
    image: '/images/medical-services/dental-care/prosthodontic-care-tooth-replacement/fibre-post-core/regular-dental-check-ups.webp',
    alt: 'Following dentist instructions carefully while waiting for final crown fabrication',
    description: 'Follow your dentist\'s instructions while waiting for the final crown to ensure the temporary restoration stays secure and intact.'
  },
  {
    id: 'avoid-hard-objects',
    number: '03',
    title: 'Avoid Biting Hard Objects with Temporary Restoration',
    image: '/images/medical-services/dental-care/prosthodontic-care-tooth-replacement/fibre-post-core/biting-hard-objects.webp',
    alt: 'Avoiding biting hard food items or ice with a temporary dental restoration',
    description: 'Avoid biting hard objects, ice, or sticky foods with a temporary restoration to prevent accidental dislodgement or crown fracture.'
  },
  {
    id: 'regular-checkups',
    number: '04',
    title: 'Attend Regular Dental Check-Ups',
    image: '/images/medical-services/dental-care/prosthodontic-care-tooth-replacement/fibre-post-core/regular-dental-check-ups.webp',
    alt: 'Attending regular dental check-ups and cleanings to evaluate restored tooth longevity',
    description: 'Attend regular dental check-ups so your dentist can monitor the margins, bite balance, and periodontal health around the restored tooth.'
  },
  {
    id: 'seek-advice',
    number: '05',
    title: 'Seek Dental Advice If Painful or Loose',
    image: '/images/medical-services/dental-care/prosthodontic-care-tooth-replacement/fibre-post-core/seek-dental-advice.webp',
    alt: 'Patient seeking dental advice promptly if tooth becomes painful or restoration feels loose',
    description: 'Seek dental advice if the tooth becomes painful or the restoration feels loose, allowing immediate evaluation and adjustment.'
  }
];

// Section 8: Frequently Asked Questions (PDF Page 4 - 7 FAQs Verbatim)
const FAQS = [
  {
    question: '1. What is a fibre post in dentistry?',
    answer: 'A fibre post is a fibre-reinforced post placed inside a prepared root canal to help retain the core restoration when insufficient natural tooth structure remains.'
  },
  {
    question: '2. Is a fibre post better than a metal post?',
    answer: 'Not in every case. Fibre and metal posts have different properties, and the choice depends on the remaining tooth structure, root condition and planned restoration.'
  },
  {
    question: '3. Does every root canal-treated tooth need a fibre post?',
    answer: 'No. A post is considered only when needed to retain the core. Some teeth can be restored without a post.'
  },
  {
    question: '4. Is fibre post placement painful?',
    answer: 'The procedure is carried out using appropriate pain-control measures. Your dentist will explain what to expect based on your tooth\'s condition.'
  },
  {
    question: '5. Will I need a crown after a fibre post?',
    answer: 'A crown may be recommended to protect and restore a significantly damaged tooth. The final decision depends on the tooth and the clinical assessment.'
  },
  {
    question: '6. How long does a fibre post last?',
    answer: 'There is no fixed lifespan. The outcome depends on the tooth\'s condition, the restoration, bite forces and ongoing oral care.'
  },
  {
    question: '7. Can a fibre post-treated tooth fracture?',
    answer: 'Yes. A post cannot eliminate the risk of root or tooth fracture. Careful case selection, conservative preparation and an appropriate final restoration are important.'
  }
];

// 4 Regional Centres Data (British English Spelling Convention)
const REGIONAL_CENTRES = [
  {
    city: 'Thuckalay (HQ)',
    name: 'Jerush Dentofacial & Cosmetic Laser Centre',
    phones: ['+91 94891 60055', '+91 94891 60000', '+91 94891 50011'],
    timing: 'Mon - Sat: 9:00 AM - 8:30 PM',
    address: 'Near Bus Stand, Brammapuram South, Thuckalay, Tamil Nadu - 629175',
    badge: 'Flagship Hospital & Apex Centre'
  },
  {
    city: 'Chennai (Adyar)',
    name: 'Jerush Dentofacial & Cosmetic Laser Centre',
    phones: ['+91 97510 10107'],
    timing: 'Mon - Sat: 9:30 AM - 8:00 PM',
    address: 'Chandhini Apartment, 29, Mahatma Gandhi Rd, Near SBI, Shastri Nagar, Adyar, Chennai - 600020',
    badge: 'Cosmetic & Aesthetic Care'
  },
  {
    city: 'Trichy (Thenur)',
    name: 'Jerush Dentofacial & Cosmetic Laser Centre',
    phones: ['+91 94891 60033', '+91 94891 60011'],
    timing: 'Mon - Sat: 9:30 AM - 7:30 PM',
    address: 'No. 72, Second Floor, Pattabiraman Pillai Road, Thenur, Trichy - 620017',
    badge: 'Advanced Restorative Wing'
  },
  {
    city: 'Fujairah (UAE)',
    name: 'Jerush Dental and Aesthetic Laser Clinic LLC',
    phones: ['+971 50 725 3105'],
    timing: 'Mon - Sat: 10:00 AM - 8:00 PM',
    address: 'Flat 101 & 102, First Floor, Fahad Building, Near Talal Market, Fujairah - UAE',
    badge: 'International Aesthetic Centre'
  }
];

export default function FibrePostCorePage() {
  const navigate = useNavigate();
  const [openFaq, setOpenFaq] = useState(0);

  // Set page meta title
  useEffect(() => {
    document.title = 'Fibre Post & Core Restoration | Jerush Dentofacial & Cosmetic Laser Centre';
    window.scrollTo(0, 0);
  }, []);

  // Sticky subnav scroll spy with exact header offset
  const { activeSection, scrollToSection } = useTreatmentScrollSpy(
    TABS.map((t) => t.id),
    140
  );

  const toggleFaq = (idx) => {
    setOpenFaq(openFaq === idx ? null : idx);
  };

  const handleBookClick = () => {
    const el = document.getElementById('treatment-appointment-section');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    } else {
      navigate('/contact');
    }
  };

  return (
    <div className="bg-slate-50 min-h-screen text-slate-800 font-body selection:bg-brandSky/20 selection:text-brandBlue">
      {/* ─── Breadcrumb Navigation ─── */}
      <PageBreadcrumbHero
        title="Post & Core: Fibre Post"
        subtitle="Restoring Damaged Teeth with a Natural-Looking Foundation"
        breadcrumbs={[
          { label: 'Home', href: '/' },
          { label: 'Dental Care', href: '/treatments?category=dental' },
          { label: 'Prosthodontics', href: '/treatments?category=dental&sub=Prosthodontic%20Care%20%2F%20Tooth%20Replacement' },
          { label: 'Post & Core: Fibre Post', href: '/dental-care/prosthodontic-care/fibre-post-core', active: true }
        ]}
      />

      {/* ─── Hero Section (Clean Frame, No floating image badges, 1:1 Aspect-Square Hero Image) ─── */}
      <section className="relative bg-gradient-to-b from-white via-sky-50/20 to-white py-12 sm:py-16 lg:py-20 border-b border-slate-200/80 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">

            {/* Left Column: Clean Clinic Branding, Two-Color Headline & Exact Content */}
            <motion.div
              initial={{ opacity: 0, x: -24 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="lg:col-span-7 space-y-5"
            >
              <div>
                <span className="text-xs sm:text-sm font-bold text-brandBlue uppercase tracking-wider block font-headline mb-2.5">
                  Jerush Dentofacial & Cosmetic Laser Centre
                </span>
                <h1
                  style={{ lineHeight: 1.4 }}
                  className="text-3xl sm:text-4xl lg:text-[40px] xl:text-[44px] font-extrabold font-headline tracking-tight leading-[1.4] text-slate-900"
                >
                  Post & Core: Fibre Post:{' '}
                  <span className="bg-gradient-to-r from-brandBlue to-brandSky bg-clip-text text-transparent">
                    Restoring Damaged Teeth with a Natural-Looking Foundation
                  </span>
                </h1>
                <p className="text-slate-600 text-base sm:text-lg leading-relaxed mt-4">
                  When a tooth has been severely damaged by decay or fracture, there may not be enough natural tooth structure left to support a crown. After root canal treatment, a fibre post and core may be recommended to help retain the core build-up and provide a foundation for the final restoration.
                </p>
                <div className="mt-4 p-4.5 rounded-2xl bg-white/95 backdrop-blur-sm border border-slate-200/90 shadow-sm space-y-2">
                  <p className="text-slate-700 text-sm sm:text-base leading-relaxed">
                    Fibre posts are commonly made from glass fibres embedded in resin. Their properties differ from metal posts, and they may be considered when restoring a suitable root-treated tooth.
                  </p>
                  <p className="text-slate-600 text-xs sm:text-sm leading-relaxed pt-1 border-t border-slate-100">
                    At <strong className="text-slate-900 font-semibold">Jerush Dentofacial & Cosmetic Laser Centre</strong>, our prosthodontic team evaluates each case carefully to choose the most suitable restorative option for your tooth.
                  </p>
                </div>
              </div>

              {/* Quick Action Buttons */}
              <div className="flex flex-wrap items-center gap-4 pt-2">
                <button
                  type="button"
                  onClick={handleBookClick}
                  className="inline-flex items-center gap-2.5 px-6 sm:px-7 py-3.5 rounded-full bg-gradient-to-r from-brandSky via-[#198BC8] to-brandBlue text-white font-headline font-bold text-xs sm:text-sm uppercase tracking-wider shadow-lg shadow-brandSky/25 hover:shadow-brandSky/40 hover:scale-[1.02] active:scale-[0.98] transition-all group cursor-pointer border-none"
                >
                  <Calendar className="w-4 h-4 text-white" />
                  <span>Book Consultation</span>
                  <div className="w-5 h-5 rounded-full bg-white/20 flex items-center justify-center group-hover:translate-x-1 transition-transform">
                    <ArrowRight className="w-3 h-3 text-white" />
                  </div>
                </button>

                <a
                  href="tel:+919489160000"
                  className="inline-flex items-center gap-2.5 px-5 sm:px-6 py-3.5 rounded-full border border-slate-300 hover:border-brandSky bg-white hover:bg-slate-50 text-slate-800 font-headline font-bold text-xs sm:text-sm uppercase tracking-wider shadow-sm transition-all group"
                >
                  <Phone className="w-4 h-4 text-brandBlue group-hover:rotate-12 transition-transform" />
                  <span>Call +91 94891 60000</span>
                </a>
              </div>

              {/* Trust Points */}
              <div className="pt-2 flex flex-wrap items-center gap-x-6 gap-y-2 text-xs text-slate-600">
                <div className="flex items-center gap-1.5">
                  <Check className="w-4 h-4 text-brandBlue shrink-0" />
                  <span>Glass-Fibres Embedded in Resin</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Check className="w-4 h-4 text-brandBlue shrink-0" />
                  <span>Dentine-Matching Flexibility</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Check className="w-4 h-4 text-brandBlue shrink-0" />
                  <span>Aesthetic Metal-Free Foundation</span>
                </div>
              </div>
            </motion.div>

            {/* Right Column: Hero Graphic - Clean Frame, No text inside image, Aspect-Square Ratio */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.15 }}
              className="lg:col-span-5 relative"
            >
              <div className="absolute -inset-4 bg-gradient-to-tr from-brandSky/20 via-brandBlue/15 to-transparent rounded-3xl blur-2xl -z-10" />

              <div className="relative rounded-3xl overflow-hidden bg-white border border-slate-200/90 shadow-2xl p-2.5 sm:p-3 group">
                <div className="relative rounded-2xl overflow-hidden bg-slate-50 aspect-square">
                  <img
                    src="/images/medical-services/dental-care/prosthodontic-care-tooth-replacement/fibre-post-core/restoring-damaged-teeth.webp"
                    alt="Cross-sectional clinical view of a fibre post placed in the root canal to retain the core build-up"
                    className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700"
                  />
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ─── Top Appointment Consultation Section ─── */}
      <TreatmentAppointmentForm
        treatmentName="Post & Core: Fibre Post"
        title="Book a Fibre Post Consultation"
        highlightWord="For Restoring Your Tooth"
        subtitle="Protect and reinforce root canal-treated teeth before final crown fabrication. Schedule a specialist prosthodontic evaluation at Jerush across Tamil Nadu."
        features={[
          {
            icon: Award,
            title: 'Specialist Prosthodontic Care',
            desc: 'Restorative evaluation and treatment planned by hospital prosthodontic specialists.'
          },
          {
            icon: ShieldCheck,
            title: 'Conservative Dentin Preservation',
            desc: 'Gentle radicular canal preparation preserving healthy natural tooth structure.'
          },
          {
            icon: Sparkles,
            title: 'Aesthetic Foundation Planning',
            desc: 'Metal-free glass fibre post provides lifelike translucency under all-ceramic crowns.'
          },
          {
            icon: MapPin,
            title: '4 Regional Centres',
            desc: 'Centres of Excellence located in Thuckalay, Chennai, Trichy, and UAE.'
          }
        ]}
      />

      {/* ─── Key Stats Bar (Signature Jerush Navy Gradient) ─── */}
      <section className="bg-gradient-to-r from-[#0F172A] via-[#2852A3] to-[#0F172A] py-10 sm:py-12 px-4 sm:px-6 text-white shadow-inner relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-white/10 via-transparent to-transparent pointer-events-none" />
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8 text-center divide-y md:divide-y-0 md:divide-x divide-white/15">
            {STATS.map((stat, idx) => (
              <div key={idx} className={idx > 0 ? 'pt-4 md:pt-0' : ''}>
                <div className="font-headline font-black text-2xl sm:text-3xl lg:text-4xl text-white tracking-tight">
                  {stat.value}
                </div>
                <div className="text-brandSky text-xs sm:text-sm font-bold uppercase tracking-wider mt-1">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Sticky In-Page Pill Subnav ─── */}
      <TreatmentSectionNav
        tabs={TABS}
        activeSection={activeSection}
        onTabClick={scrollToSection}
      />

      {/* ─── SECTION 1: What Is a Fibre Post & Core? (The Triad, id="triad") ─── */}
      <section id="triad" className="py-14 sm:py-20 bg-white border-b border-slate-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
            <span className="text-xs sm:text-sm font-bold text-brandBlue uppercase tracking-wider block font-headline mb-2">
              The Three Restorative Components
            </span>
            <h2
              style={{ lineHeight: 1.4 }}
              className="text-2xl sm:text-3xl lg:text-4xl font-extrabold font-headline tracking-tight text-slate-900 leading-[1.4]"
            >
              What Is a{' '}
              <span className="bg-gradient-to-r from-brandBlue to-brandSky bg-clip-text text-transparent">
                Fibre Post & Core?
              </span>
            </h2>
            <p className="text-slate-600 text-base sm:text-lg mt-3">
              A fibre post and core restoration consists of three parts:
            </p>
          </div>

          {/* 3 Pillar Cards Grid (768x768 1:1 Aspect-Square Images) */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {TRIAD_PARTS.map((part, index) => (
              <motion.div
                key={part.id}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.5, delay: index * 0.15 }}
                className="bg-slate-50/80 rounded-3xl border border-slate-200/90 shadow-sm hover:shadow-xl hover:border-brandSky/40 transition-all duration-300 flex flex-col overflow-hidden group"
              >
                {/* Clean Frame Square Image */}
                <div className="p-4 pb-0">
                  <div className="relative rounded-2xl overflow-hidden bg-white aspect-square border border-slate-200/70 shadow-inner">
                    <img
                      src={part.image}
                      alt={part.alt}
                      className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                </div>

                {/* Card Content */}
                <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                  <div>
                    <div className="flex items-center justify-between gap-2 mb-2">
                      <span className="text-xs font-bold font-headline text-brandSky tracking-wider uppercase">
                        Part {part.stepNumber}
                      </span>
                      <span className="text-[11px] font-bold font-headline px-2.5 py-0.5 rounded-full bg-brandSky/10 text-brandBlue border border-brandSky/20">
                        {part.badge}
                      </span>
                    </div>
                    <h3 className="text-xl font-bold font-headline text-slate-900 group-hover:text-brandBlue transition-colors">
                      {part.title}
                    </h3>
                    <p className="text-xs font-semibold text-slate-500 uppercase tracking-wide mt-0.5 mb-3">
                      {part.subtitle}
                    </p>
                    <p className="text-slate-700 text-sm leading-relaxed font-medium">
                      {part.description}
                    </p>
                    <p className="text-slate-500 text-xs leading-relaxed mt-2 pt-2 border-t border-slate-200/80">
                      {part.technicalDetails}
                    </p>
                  </div>

                  <ul className="space-y-1.5 pt-2 border-t border-slate-200/60 text-xs text-slate-600">
                    {part.features.map((feat, fIdx) => (
                      <li key={fIdx} className="flex items-start gap-2">
                        <CheckCircle2 className="w-3.5 h-3.5 text-brandSky shrink-0 mt-0.5" />
                        <span>{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Clinical Note Callout Box from PDF Page 1 */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="mt-10 p-5 sm:p-6 rounded-2xl bg-gradient-to-r from-sky-50 via-blue-50/50 to-indigo-50/40 border border-brandSky/30 shadow-xs flex items-start gap-4"
          >
            <div className="w-10 h-10 rounded-xl bg-brandBlue text-white flex items-center justify-center shrink-0 shadow-sm mt-0.5">
              <Info className="w-5 h-5 text-white" />
            </div>
            <div className="space-y-1">
              <h4 className="text-sm font-bold font-headline uppercase tracking-wider text-brandBlue">
                Essential Prosthodontic Clinical Principle
              </h4>
              <p className="text-slate-700 text-sm sm:text-base leading-relaxed">
                A post is primarily used to retain the core when insufficient tooth structure remains. It does not automatically strengthen the root, and not every root canal-treated tooth requires one.
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ─── SECTION 2: When Might a Fibre Post Be Recommended? (id="indications") ─── */}
      <section id="indications" className="py-14 sm:py-20 bg-slate-50 border-b border-slate-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
            <span className="text-xs sm:text-sm font-bold text-brandBlue uppercase tracking-wider block font-headline mb-2">
              Clinical Assessment & Indications
            </span>
            <h2
              style={{ lineHeight: 1.4 }}
              className="text-2xl sm:text-3xl lg:text-4xl font-extrabold font-headline tracking-tight text-slate-900 leading-[1.4]"
            >
              When Might a{' '}
              <span className="bg-gradient-to-r from-brandBlue to-brandSky bg-clip-text text-transparent">
                Fibre Post Be Recommended?
              </span>
            </h2>
            <p className="text-slate-600 text-base sm:text-lg mt-3">
              A fibre post may be considered when a root canal-treated tooth has lost a significant amount of its natural structure. Possible situations include:
            </p>
          </div>

          {/* 4 Indications Grid (768x768 1:1 Aspect-Square Images) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
            {INDICATIONS.map((item, index) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-white rounded-3xl border border-slate-200/90 shadow-sm hover:shadow-xl hover:border-brandSky/40 transition-all duration-300 flex flex-col overflow-hidden group"
              >
                <div className="p-3.5 pb-0">
                  <div className="relative rounded-2xl overflow-hidden bg-slate-50 aspect-square border border-slate-100 shadow-inner">
                    <img
                      src={item.image}
                      alt={item.alt}
                      className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                </div>
                <div className="p-5 flex-1 flex flex-col justify-between space-y-3">
                  <div>
                    <div className="flex items-center justify-between gap-2 mb-1.5">
                      <span className="text-xs font-bold font-headline text-brandSky tracking-wider uppercase">
                        Situation {item.number}
                      </span>
                      <span className="text-[10px] font-bold font-headline px-2 py-0.5 rounded-full bg-slate-100 text-slate-700 border border-slate-200">
                        {item.badge}
                      </span>
                    </div>
                    <h3 className="text-base sm:text-lg font-bold font-headline text-slate-900 group-hover:text-brandBlue transition-colors leading-snug">
                      {item.title}
                    </h3>
                    <p className="text-slate-600 text-xs sm:text-sm leading-relaxed mt-2">
                      {item.description}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Assessment Note from PDF Page 2 */}
          <div className="mt-10 p-5 rounded-2xl bg-white border border-slate-200/90 shadow-sm text-center max-w-3xl mx-auto">
            <p className="text-slate-700 text-sm sm:text-base leading-relaxed">
              <strong className="text-slate-900 font-semibold">Specialist Clinical Evaluation:</strong> The dentist will assess the remaining tooth structure, root condition, bite and expected restoration before deciding whether a fibre post is appropriate.
            </p>
          </div>
        </div>
      </section>

      {/* ─── SECTION 3: How Is the Fibre Post Placed? (id="procedure") ─── */}
      <section id="procedure" className="py-14 sm:py-20 bg-white border-b border-slate-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
            <span className="text-xs sm:text-sm font-bold text-brandBlue uppercase tracking-wider block font-headline mb-2">
              Clinical Protocol & Workflow
            </span>
            <h2
              style={{ lineHeight: 1.4 }}
              className="text-2xl sm:text-3xl lg:text-4xl font-extrabold font-headline tracking-tight text-slate-900 leading-[1.4]"
            >
              How Is the{' '}
              <span className="bg-gradient-to-r from-brandBlue to-brandSky bg-clip-text text-transparent">
                Fibre Post Placed?
              </span>
            </h2>
            <p className="text-slate-600 text-base sm:text-lg mt-3">
              The procedure is planned to preserve as much healthy tooth structure as possible.
            </p>
          </div>

          {/* 3 Step Cards */}
          <div className="space-y-8 max-w-5xl mx-auto">
            {PROCEDURE_STEPS.map((stepItem, index) => (
              <motion.div
                key={stepItem.step}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.5, delay: index * 0.15 }}
                className="bg-slate-50/70 rounded-3xl border border-slate-200/90 p-5 sm:p-7 shadow-sm hover:shadow-lg transition-all duration-300"
              >
                <div className="grid grid-cols-1 md:grid-cols-12 gap-6 sm:gap-8 items-center">
                  {/* Step Image */}
                  <div className="md:col-span-5">
                    <div className="relative rounded-2xl overflow-hidden bg-white aspect-[4/3] border border-slate-200/80 shadow-inner group">
                      <img
                        src={stepItem.image}
                        alt={stepItem.alt}
                        className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                      />
                    </div>
                  </div>

                  {/* Step Text Details */}
                  <div className="md:col-span-7 space-y-3">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brandSky/10 border border-brandSky/20 text-brandBlue font-headline font-bold text-xs uppercase tracking-wider">
                      <span>Step {stepItem.step}</span>
                    </div>
                    <h3 className="text-xl sm:text-2xl font-bold font-headline text-slate-900">
                      {stepItem.title}
                    </h3>
                    <p className="text-xs font-semibold text-slate-500 uppercase tracking-wide">
                      {stepItem.subtitle}
                    </p>
                    <p className="text-slate-700 text-sm sm:text-base leading-relaxed font-medium">
                      {stepItem.description}
                    </p>
                    <ul className="space-y-1.5 pt-2 border-t border-slate-200/70 text-xs sm:text-sm text-slate-600">
                      {stepItem.points.map((point, pIdx) => (
                        <li key={pIdx} className="flex items-start gap-2">
                          <Check className="w-4 h-4 text-brandSky shrink-0 mt-0.5" />
                          <span>{point}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── SECTION 4: Fibre Post vs Metal Post: What Is the Difference? (id="comparison") ─── */}
      <section id="comparison" className="py-14 sm:py-20 bg-slate-50 border-b border-slate-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
            <span className="text-xs sm:text-sm font-bold text-brandBlue uppercase tracking-wider block font-headline mb-2">
              Comparative Analysis & Biomechanics
            </span>
            <h2
              style={{ lineHeight: 1.4 }}
              className="text-2xl sm:text-3xl lg:text-4xl font-extrabold font-headline tracking-tight text-slate-900 leading-[1.4]"
            >
              Fibre Post vs Metal Post:{' '}
              <span className="bg-gradient-to-r from-brandBlue to-brandSky bg-clip-text text-transparent">
                What Is the Difference?
              </span>
            </h2>
            <p className="text-slate-600 text-base sm:text-lg mt-3">
              Both fibre and metal posts may be used to retain a core in selected root canal-treated teeth. The right choice depends on the tooth and the planned restoration.
            </p>
          </div>

          {/* Comparison Cards & Visual Showcase */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch max-w-6xl mx-auto">
            {/* Visual Comparison Graphic */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="lg:col-span-5 bg-white rounded-3xl border border-slate-200/90 p-4 shadow-sm flex flex-col justify-center"
            >
              <div className="relative rounded-2xl overflow-hidden bg-slate-50 aspect-[4/3] border border-slate-200/80 shadow-inner group">
                <img
                  src="/images/medical-services/dental-care/prosthodontic-care-tooth-replacement/fibre-post-core/fiber-vs-metal-post-comparison.webp"
                  alt="Side-by-side comparison between glass fibre post and metal post in dental restorations"
                  className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              <div className="p-3 text-center">
                <span className="text-xs font-bold font-headline text-slate-500 uppercase tracking-wider">
                  Material Comparison: Fibre vs Metal Post
                </span>
              </div>
            </motion.div>

            {/* Comparison Details Side */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="lg:col-span-7 space-y-5 flex flex-col justify-center"
            >
              {/* Fibre Post Card */}
              <div className="p-5 sm:p-6 rounded-2xl bg-white border border-brandSky/30 shadow-sm relative overflow-hidden">
                <div className="flex items-center gap-2.5 mb-2">
                  <div className="w-8 h-8 rounded-lg bg-brandSky/15 text-brandBlue flex items-center justify-center font-bold">
                    <Sparkles className="w-4 h-4 text-brandBlue" />
                  </div>
                  <h3 className="text-lg font-bold font-headline text-slate-900">
                    Fibre Post
                  </h3>
                </div>
                <p className="text-slate-700 text-sm sm:text-base leading-relaxed">
                  Has properties that can be closer to dentine in flexibility and may offer aesthetic advantages in certain restorations.
                </p>
                <div className="mt-3 pt-2 border-t border-slate-100 flex flex-wrap gap-2 text-xs text-slate-600">
                  <span className="px-2.5 py-1 rounded-md bg-sky-50 text-brandBlue font-medium">Dentine-Like Elasticity</span>
                  <span className="px-2.5 py-1 rounded-md bg-sky-50 text-brandBlue font-medium">Aesthetic All-Ceramic Foundation</span>
                  <span className="px-2.5 py-1 rounded-md bg-sky-50 text-brandBlue font-medium">Uniform Stress Distribution</span>
                </div>
              </div>

              {/* Metal Post Card */}
              <div className="p-5 sm:p-6 rounded-2xl bg-white border border-slate-200/90 shadow-sm">
                <div className="flex items-center gap-2.5 mb-2">
                  <div className="w-8 h-8 rounded-lg bg-slate-100 text-slate-700 flex items-center justify-center font-bold">
                    <Shield className="w-4 h-4 text-slate-700" />
                  </div>
                  <h3 className="text-lg font-bold font-headline text-slate-900">
                    Metal Post
                  </h3>
                </div>
                <p className="text-slate-700 text-sm sm:text-base leading-relaxed">
                  Has different mechanical properties and may be appropriate in selected clinical situations.
                </p>
                <div className="mt-3 pt-2 border-t border-slate-100 flex flex-wrap gap-2 text-xs text-slate-600">
                  <span className="px-2.5 py-1 rounded-md bg-slate-100 text-slate-700 font-medium">High Rigidity</span>
                  <span className="px-2.5 py-1 rounded-md bg-slate-100 text-slate-700 font-medium">Heavy Occlusal Forces</span>
                  <span className="px-2.5 py-1 rounded-md bg-slate-100 text-slate-700 font-medium">Selected Molar Cases</span>
                </div>
              </div>

              {/* Important Consideration Box from PDF Page 3 */}
              <div className="p-4.5 rounded-2xl bg-amber-50/80 border border-amber-200/80 text-amber-900 text-xs sm:text-sm flex items-start gap-3">
                <AlertCircle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
                <p className="leading-relaxed">
                  <strong className="font-semibold">Important Consideration:</strong> Neither option is automatically best for every tooth. The remaining root and tooth structure are central to treatment planning.
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ─── SECTION 5: Before & After: Rebuilding the Tooth (id="transformation") ─── */}
      <section id="transformation" className="py-14 sm:py-20 bg-white border-b border-slate-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
            <span className="text-xs sm:text-sm font-bold text-brandBlue uppercase tracking-wider block font-headline mb-2">
              Clinical Transformation
            </span>
            <h2
              style={{ lineHeight: 1.4 }}
              className="text-2xl sm:text-3xl lg:text-4xl font-extrabold font-headline tracking-tight text-slate-900 leading-[1.4]"
            >
              Before & After:{' '}
              <span className="bg-gradient-to-r from-brandBlue to-brandSky bg-clip-text text-transparent">
                Rebuilding the Tooth
              </span>
            </h2>
            <p className="text-slate-600 text-base sm:text-lg mt-3">
              A fibre post and core may help retain a restoration when a tooth has lost substantial structure. The long-term outcome depends on root health, the amount of remaining tooth structure, bite forces and the quality of the final restoration.
            </p>
          </div>

          {/* Before & After Comparison Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {/* Before Card */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="bg-slate-50 rounded-3xl border border-slate-200/90 p-4 sm:p-5 shadow-sm group"
            >
              <div className="relative rounded-2xl overflow-hidden bg-white aspect-[16/9] border border-slate-200 shadow-inner">
                <img
                  src="/images/medical-services/dental-care/prosthodontic-care-tooth-replacement/fibre-post-core/before.webp"
                  alt="Before treatment: Damaged or fractured root-treated tooth requiring fibre post and core rebuild"
                  className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                />
                <span className="absolute top-3 left-3 px-3 py-1 rounded-full bg-slate-900/85 backdrop-blur-md text-white font-headline font-bold text-xs uppercase tracking-wider">
                  Before Treatment
                </span>
              </div>
              <div className="p-4 space-y-1">
                <h3 className="font-bold font-headline text-lg text-slate-900">
                  Pre-Restoration State
                </h3>
                <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">
                  Severe coronal structure loss following extensive decay or fracture, leaving inadequate retention for direct crown placement without intra-radicular post support.
                </p>
              </div>
            </motion.div>

            {/* After Card */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="bg-sky-50/50 rounded-3xl border border-brandSky/40 p-4 sm:p-5 shadow-sm group"
            >
              <div className="relative rounded-2xl overflow-hidden bg-white aspect-[16/9] border border-brandSky/30 shadow-inner">
                <img
                  src="/images/medical-services/dental-care/prosthodontic-care-tooth-replacement/fibre-post-core/after.webp"
                  alt="After treatment: Fully rebuilt tooth with bonded fibre post, composite core, and custom crown"
                  className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                />
                <span className="absolute top-3 left-3 px-3 py-1 rounded-full bg-gradient-to-r from-brandBlue to-brandSky text-white font-headline font-bold text-xs uppercase tracking-wider shadow-sm">
                  After Treatment
                </span>
              </div>
              <div className="p-4 space-y-1">
                <h3 className="font-bold font-headline text-lg text-slate-900">
                  Rebuilt Foundation & Final Crown
                </h3>
                <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">
                  Intra-radicular fibre post adhesively cemented, missing coronal structure rebuilt with composite resin, and custom crown seated to restore natural chewing function.
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ─── SECTION 6: Caring for Your Restored Tooth (id="aftercare") ─── */}
      <section id="aftercare" className="py-14 sm:py-20 bg-slate-50 border-b border-slate-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
            <span className="text-xs sm:text-sm font-bold text-brandBlue uppercase tracking-wider block font-headline mb-2">
              Post-Treatment Maintenance & Longevity
            </span>
            <h2
              style={{ lineHeight: 1.4 }}
              className="text-2xl sm:text-3xl lg:text-4xl font-extrabold font-headline tracking-tight text-slate-900 leading-[1.4]"
            >
              Caring for Your{' '}
              <span className="bg-gradient-to-r from-brandBlue to-brandSky bg-clip-text text-transparent">
                Restored Tooth
              </span>
            </h2>
            <p className="text-slate-600 text-base sm:text-lg mt-3">
              Proper oral care and regular clinical follow-up help protect your rebuilt foundation and final crown for years to come.
            </p>
          </div>

          {/* 5 Aftercare Guidelines Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 max-w-6xl mx-auto">
            {AFTERCARE_GUIDELINES.map((item, index) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-white rounded-3xl border border-slate-200/90 shadow-sm hover:shadow-xl hover:border-brandSky/40 transition-all duration-300 flex flex-col overflow-hidden group"
              >
                <div className="p-3.5 pb-0">
                  <div className="relative rounded-2xl overflow-hidden bg-slate-50 aspect-[4/3] border border-slate-100 shadow-inner">
                    <img
                      src={item.image}
                      alt={item.alt}
                      className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                </div>
                <div className="p-5 flex-1 flex flex-col justify-between space-y-2">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-xs font-bold font-headline text-brandSky tracking-wider uppercase">
                      Care Step {item.number}
                    </span>
                  </div>
                  <h3 className="text-base sm:text-lg font-bold font-headline text-slate-900 group-hover:text-brandBlue transition-colors leading-snug">
                    {item.title}
                  </h3>
                  <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── SECTION 7: Accessible Care Across 4 Regional Centres (id="centres") ─── */}
      <section id="centres" className="py-14 sm:py-20 bg-white border-b border-slate-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
            <span className="text-xs sm:text-sm font-bold text-brandBlue uppercase tracking-wider block font-headline mb-2">
              Centres of Excellence
            </span>
            <h2
              style={{ lineHeight: 1.4 }}
              className="text-2xl sm:text-3xl lg:text-4xl font-extrabold font-headline tracking-tight text-slate-900 leading-[1.4]"
            >
              Accessible Care Across{' '}
              <span className="bg-gradient-to-r from-brandBlue to-brandSky bg-clip-text text-transparent">
                4 Regional Centres
              </span>
            </h2>
            <p className="text-slate-600 text-base sm:text-lg mt-3">
              Advanced prosthodontic assessments, fibre post placement, and precision crown reconstructions available across Tamil Nadu &amp; UAE.
            </p>
          </div>

          {/* 4 Regional Centres Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {REGIONAL_CENTRES.map((centre, index) => (
              <motion.div
                key={centre.city}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ y: -6, transition: { duration: 0.2 } }}
                className="bg-slate-50/80 rounded-3xl border border-slate-200/90 p-5 sm:p-6 shadow-sm hover:shadow-lg hover:border-brandSky/40 transition-all duration-300 flex flex-col justify-between space-y-4"
              >
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <MapPin className="w-4 h-4 text-brandSky shrink-0" />
                    <span className="text-xs font-bold font-headline text-brandBlue uppercase tracking-wider">
                      {centre.city}
                    </span>
                  </div>
                  <h3 className="font-bold font-headline text-base text-slate-900 leading-snug">
                    {centre.name}
                  </h3>
                  <p className="text-slate-600 text-xs sm:text-sm mt-2 leading-relaxed">
                    {centre.address}
                  </p>
                </div>

                <div className="pt-3 border-t border-slate-200/80 space-y-2 text-xs text-slate-600">
                  <div className="flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                    <span>{centre.timing}</span>
                  </div>
                  <div className="flex flex-col gap-1.5">
                    {centre.phones.map((phone) => (
                      <a
                        key={phone}
                        href={`tel:${phone.replace(/[^+\d]/g, '')}`}
                        className="inline-flex items-center gap-1.5 text-xs font-headline font-bold text-brandBlue hover:text-brandSky transition-colors"
                      >
                        <Phone className="w-3.5 h-3.5" />
                        <span>{phone}</span>
                      </a>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── SECTION 8: Frequently Asked Questions (id="faqs") ─── */}
      <section id="faqs" className="py-14 sm:py-20 bg-slate-50 border-b border-slate-200/80">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
            <span className="text-xs sm:text-sm font-bold text-brandBlue uppercase tracking-wider block font-headline mb-2">
              Got Questions?
            </span>
            <h2
              style={{ lineHeight: 1.4 }}
              className="text-2xl sm:text-3xl lg:text-4xl font-extrabold font-headline tracking-tight text-slate-900 leading-[1.4]"
            >
              Frequently Asked{' '}
              <span className="bg-gradient-to-r from-brandBlue to-brandSky bg-clip-text text-transparent">
                Questions
              </span>
            </h2>
            <p className="text-slate-600 text-base sm:text-lg mt-3">
              Clear clinical answers about fibre post and core restorations from our specialist prosthodontists.
            </p>
          </div>

          {/* Accordion List (7 FAQs from PDF Page 4) */}
          <div className="space-y-4">
            {FAQS.map((faq, idx) => {
              const isOpen = openFaq === idx;
              return (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: idx * 0.05 }}
                  className="rounded-2xl bg-white border border-slate-200/90 shadow-sm overflow-hidden transition-all duration-200"
                >
                  <button
                    type="button"
                    onClick={() => toggleFaq(idx)}
                    className="w-full p-5 sm:p-6 text-left flex items-center justify-between gap-4 cursor-pointer focus:outline-none"
                  >
                    <span className="font-headline font-bold text-slate-900 text-base sm:text-lg leading-snug">
                      {faq.question}
                    </span>
                    <div
                      className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 transition-transform duration-300 ${
                        isOpen ? 'bg-brandBlue text-white rotate-180' : 'bg-slate-100 text-slate-600'
                      }`}
                    >
                      <ChevronDown className="w-4 h-4" />
                    </div>
                  </button>

                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.3 }}
                      >
                        <div className="px-5 sm:px-6 pb-5 sm:pb-6 pt-1 text-slate-600 text-sm sm:text-base leading-relaxed border-t border-slate-100">
                          {faq.answer}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ─── SECTION 9: Bottom CTA Banner with Dr. Sherine Ponraj Cutout ─── */}
      <TreatmentCtaBanner
        badgeText="SPECIALIST RESTORATIVE CARE"
        titlePrefix="Restore Your Tooth with"
        highlightWord="Personalised Care"
        titleSuffix="at Jerush"
        subtitle="A damaged tooth may still be suitable for restoration when its root and remaining structure can support treatment. At Jerush Dentofacial & Cosmetic Laser Centre, our dental team evaluates each case and explains the available restorative options."
        primaryBtnText="Book Dental Consultation"
        onPrimaryClick={handleBookClick}
        secondaryBtnText="Call +91 94891 60000"
        secondaryBtnPhone="+919489160000"
        doctorImage="/images/doctors/dr-sherine-ponraj-prosthodontist.webp"
        doctorName="Dr. Sherine Ponraj"
        doctorRole="Specialist Prosthodontist"
        doctorAlt="Dr. Sherine Ponraj, Specialist Prosthodontist at Jerush Dentofacial & Cosmetic Laser Centre"
        className="py-14 sm:py-20"
      />
    </div>
  );
}

