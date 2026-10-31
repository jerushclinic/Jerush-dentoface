import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ShieldCheck, Calendar, Phone, CheckCircle2, Clock,
  Award, Smile, ArrowRight, Info, Check, HelpCircle, AlertCircle,
  MapPin, ChevronRight, ChevronDown, Eye, Compass, Shield,
  Stethoscope, AlertTriangle, Layers, CheckSquare, Activity,
  Waves, Sparkles, RefreshCw, Scissors, Heart, Sparkle,
  FileCheck, Zap, Maximize2, ShieldAlert, Cpu
} from 'lucide-react';
import PageBreadcrumbHero from '../components/common/PageBreadcrumbHero';
import TreatmentCtaBanner from '../components/common/TreatmentCtaBanner';
import TreatmentSectionNav from '../components/common/TreatmentSectionNav';
import TreatmentAppointmentForm from '../components/common/TreatmentAppointmentForm';
import useTreatmentScrollSpy from '../hooks/useTreatmentScrollSpy';

// Key Stats Bar Data (Signature Navy Gradient)
const STATS = [
  { value: '1:1 Custom Fit', label: 'Precision Radicular Post Adaptation' },
  { value: '4 - 5 mm Seal', label: 'Preserved Apical Gutta-Percha' },
  { value: '360° Ferrule', label: 'Biomechanical Crown Fracture Defense' },
  { value: '4 Regional Centres', label: 'Centres of Excellence in TN' }
];

// Sticky Navigation Tabs
const TABS = [
  { id: 'triad', label: 'The Post & Core Triad' },
  { id: 'indications', label: 'Clinical Indications' },
  { id: 'procedure', label: '4-Step Placement' },
  { id: 'results', label: 'Expected Outcomes' },
  { id: 'aftercare', label: 'Care & Protection' },
  { id: 'locations', label: 'Regional Centres' },
  { id: 'faqs', label: 'FAQs' }
];

// Section 1: The Post & Core Triad (PDF Page 1 - 768x768 1:1 Square Images)
const TRIAD_ELEMENTS = [
  {
    id: 'metal-post',
    stepNumber: '01',
    title: 'Metal Post',
    subtitle: 'Intra-Radicular Anchor Foundation',
    badge: 'Root Canal Anchor',
    image: '/images/medical-services/dental-care/prosthodontic-care-tooth-replacement/metal-post-core/metal-post.webp',
    alt: 'High-strength dental metal post positioned inside the root canal of a treated tooth',
    description: 'A small metal post placed inside the prepared root canal of a suitable root-treated tooth. Its main purpose is to help retain the core when there is not enough natural tooth structure remaining.',
    technicalDetails: 'Precision machined from surgical-grade titanium alloy or custom-cast dental metal. Fitted passively into the coronal two-thirds of the root canal to retain the core securely without expanding or stressing delicate radicular walls.',
    features: [
      'Anchors firmly within the root canal space',
      'Preserves the vital 4–5 mm apical root canal seal',
      'Provides unyielding mechanical retention for the core'
    ]
  },
  {
    id: 'core-build-up',
    stepNumber: '02',
    title: 'Core Build-Up',
    subtitle: 'Coronal Dentin Reconstruction',
    badge: 'Foundation Rebuilder',
    image: '/images/medical-services/dental-care/prosthodontic-care-tooth-replacement/metal-post-core/metal-core.webp',
    alt: 'Coronal core build-up restoring missing tooth structure over a metal post',
    description: 'The built-up portion that replaces missing tooth structure and creates a foundation for the final crown.',
    technicalDetails: 'Sculpted from high-compressive-strength restorative core material or cast alloy bonded around the post head. Re-establishes optimal axial wall height, taper, and retentive geometric volume for crown cementation.',
    features: [
      'Replaces lost coronal tooth volume and dentin',
      'Creates stable axial retention walls for the crown',
      'Locks securely around the serrated retentive post head'
    ]
  },
  {
    id: 'dental-crown',
    stepNumber: '03',
    title: 'Dental Crown',
    subtitle: '360° Protective Full Coverage',
    badge: 'Prosthetic Armor',
    image: '/images/medical-services/dental-care/prosthodontic-care-tooth-replacement/metal-post-core/dental-crown.webp',
    alt: 'Custom ceramic or zirconia dental crown capping restored tooth structure',
    description: 'A custom-made covering that is placed over the restored tooth when indicated, helping restore its shape and function.',
    technicalDetails: 'Fabricated from monolithic zirconia, lithium disilicate (E.max), or porcelain-fused-to-metal (PFM). Encircles the core and natural tooth with a minimum 2 mm circumferential ferrule collar to resist heavy chewing shear forces.',
    features: [
      'Restores lifelike natural aesthetics and bite morphology',
      'Provides circumferential 360° ferrule reinforcement',
      'Protects brittle root-treated dentin from catastrophic split'
    ]
  }
];

// Section 2: Clinical Indications (PDF Page 2 - 1024x682 3:2 Landscape Images)
const CLINICAL_INDICATIONS = [
  {
    id: 'extensive-damage',
    title: 'Extensive Damage from Deep Decay',
    subtitle: 'Severe Caries Destruction',
    image: '/images/medical-services/dental-care/prosthodontic-care-tooth-replacement/metal-post-core/extensive-damage.webp',
    alt: 'Severe tooth breakdown and extensive cavity damage requiring post and core retention',
    description: 'Extensive damage caused by deep tooth decay where infectious caries has undermined the interior coronal tooth walls down to the gum margin.',
    clinicalRationale: 'Deep decay leaves thin, unsupported enamel shells that lack the tensile strength to hold a crown independently. A metal post distributes occlusal stress down the root axis to sustain chewing pressures.',
    tag: 'Deep Decay'
  },
  {
    id: 'tooth-broken-down',
    title: 'A Tooth That Has Broken Down Significantly',
    subtitle: 'Trauma & Cusp Fracture',
    image: '/images/medical-services/dental-care/prosthodontic-care-tooth-replacement/metal-post-core/tooth-that-has-broken.webp',
    alt: 'Severely broken tooth structure requiring intra-radicular post support',
    description: 'A tooth that has broken down significantly due to accidental impact, biting trauma, or sudden structural fracture of old, oversized fillings.',
    clinicalRationale: 'When more than 50% of the supragingival clinical crown is sheared off, standard composite restorations dislodge immediately. The metal post acts as a vertical structural pillar anchoring the replacement core.',
    tag: 'Structural Fracture'
  },
  {
    id: 'insufficient-structure',
    title: 'Insufficient Remaining Structure for Core Retention',
    subtitle: 'Lack of Natural Undercuts',
    image: '/images/medical-services/dental-care/prosthodontic-care-tooth-replacement/metal-post-core/insufficient-remaining-structure.webp',
    alt: 'Tooth with insufficient coronal tooth walls remaining to retain a core filling',
    description: 'Insufficient remaining structure to retain a core restoration where multiple missing axial walls leave no natural mechanical undercut for composite bonding.',
    clinicalRationale: 'Even advanced adhesive bonding agents cannot withstand masticatory shear vectors without macro-mechanical resistance. The post provides an essential intra-canal anchor preventing core debonding.',
    tag: 'Retention Deficit'
  },
  {
    id: 'tooth-needs-crown',
    title: 'A Tooth That Needs a Crown with Extra Retention',
    subtitle: 'Heavy Occlusal Demands',
    image: '/images/medical-services/dental-care/prosthodontic-care-tooth-replacement/metal-post-core/tooth-needs-a-crown.webp',
    alt: 'High functional load molar requiring additional post retention beneath a prosthetic crown',
    description: 'A tooth that needs a crown but requires additional retention for the core due to heavy functional bite forces, bruxism, or steep cuspal guidance.',
    clinicalRationale: 'Posterior molars and premolars handle crushing forces exceeding 500 Newtons. In structurally compromised teeth, a metal post provides rigidity and stability beneath the final crown.',
    tag: 'Masticatory Load'
  }
];

// Section 3: 4-Stage Clinical Protocol (PDF Page 2 & 3)
const PLACEMENT_STAGES = [
  {
    stage: '01',
    title: 'Comprehensive Tooth Assessment',
    timeframe: 'Diagnostic Phase',
    image: '/images/medical-services/dental-care/prosthodontic-care-tooth-replacement/metal-post-core/tooth-assessment.webp',
    alt: 'Clinical dental examination and digital periapical radiograph assessing root health',
    description: 'The dentist examines the tooth and may take an X-ray to assess the root, previous root canal treatment and remaining tooth structure.',
    clinicalSteps: [
      'High-resolution digital periapical radiograph & 3D CBCT imaging',
      'Verification of adequate root length, canal curvature, and bone support',
      'Confirmation of a dense, infection-free apical root filling seal',
      'Assessment of circumferential ferrule height (minimum 1.5 - 2 mm required)'
    ]
  },
  {
    stage: '02',
    title: 'Precision Post Space Preparation & Placement',
    timeframe: 'Intra-Canal Phase',
    image: '/images/medical-services/dental-care/prosthodontic-care-tooth-replacement/metal-post-core/post-placement.webp',
    alt: 'Careful preparation of root canal post space preserving apical seal and securing metal post',
    description: 'When appropriate, space is carefully prepared within the root canal while preserving the root filling seal, and the metal post is secured in position.',
    clinicalSteps: [
      'Careful removal of coronal gutta-percha using calibrated low-speed instruments',
      'Strict preservation of a 4 to 5 mm undisturbed apical gutta-percha barrier',
      'Passivity check and radiographic verification of post alignment',
      'Cementation with biocompatible luting cement to eliminate micro-gaps'
    ]
  },
  {
    stage: '03',
    title: 'Coronal Core Build-Up',
    timeframe: 'Reconstructive Phase',
    image: '/images/medical-services/dental-care/prosthodontic-care-tooth-replacement/metal-post-core/core-build-up.webp',
    alt: 'Applying high-strength core restorative material over metal post head to rebuild tooth volume',
    description: 'A core material is used to rebuild the missing upper portion of the tooth and provide a foundation for the planned restoration.',
    clinicalSteps: [
      'Application of dentin bonding adhesive to post head and coronal tooth walls',
      'Layered placement of high-compressive-strength restorative core material',
      'Light or chemical polymerization creating a dense, void-free monolith',
      'Precise axial tapering and anatomical carving ready for crown impression'
    ]
  },
  {
    stage: '04',
    title: 'Crown Preparation & Final Prosthetic Delivery',
    timeframe: 'Final Restoration',
    image: '/images/medical-services/dental-care/prosthodontic-care-tooth-replacement/metal-post-core/final-crown.webp',
    alt: 'Precision crown seated over rebuilt core foundation to restore masticatory function',
    description: 'A crown may then be placed to restore the tooth’s shape, appearance and function, depending on the clinical plan. The number of visits depends on the type of post, the condition of the tooth and the final restoration required.',
    clinicalSteps: [
      'Tooth preparation establishing a clean 360° shoulder or deep chamfer finish line',
      'Digital 3D intraoral optical impression capturing micro-details',
      'Placement of custom provisional crown to protect the core between visits',
      'Permanent cementation of precision-milled Zirconia, E.max, or PFM crown'
    ]
  }
];

// Section 4: Expected Outcomes (PDF Page 3 - 768x768 1:1 Square Images)
const EXPECTED_RESULTS = [
  {
    id: 'helps-retain-core',
    title: 'Helps Retain a Core When Little Natural Tooth Structure Remains',
    desc: 'Provides reliable intra-radicular retention so the core filling cannot detach under intense chewing or lateral jaw movements.',
    image: '/images/medical-services/dental-care/prosthodontic-care-tooth-replacement/metal-post-core/helps-retain-a-core.webp',
    alt: 'Metal post anchoring core restoration firmly in damaged root canal tooth',
    badge: 'Mechanical Retention'
  },
  {
    id: 'provides-foundation',
    title: 'Provides a Foundation for a Planned Crown',
    desc: 'Rebuilds missing tooth height and taper, giving prosthodontists the geometric structure necessary for long-term crown retention.',
    image: '/images/medical-services/dental-care/prosthodontic-care-tooth-replacement/metal-post-core/provides-a-foundation.webp',
    alt: 'Solid foundation created for custom crown placement after post and core',
    badge: 'Geometric Foundation'
  },
  {
    id: 'damaged-tooth-restored',
    title: 'May Allow a Suitable Damaged Tooth to Be Restored',
    desc: 'Saves your natural biological tooth from unnecessary extraction, preserving your natural periodontal ligament and alveolar bone.',
    image: '/images/medical-services/dental-care/prosthodontic-care-tooth-replacement/metal-post-core/damaged-tooth-restored.webp',
    alt: 'Severely damaged tooth successfully restored and protected from extraction',
    badge: 'Tooth Preservation'
  },
  {
    id: 'restore-tooth-shape',
    title: 'Helps Restore the Tooth’s Shape & Chewing Function',
    desc: 'When combined with an appropriate final restoration, returns complete biting power, proper speech articulation, and natural smile contours.',
    image: '/images/medical-services/dental-care/prosthodontic-care-tooth-replacement/metal-post-core/restore-the-tooth-shape.webp',
    alt: 'Full tooth shape and chewing function restored with post, core, and crown',
    badge: 'Functional Harmony'
  }
];

// Section 5: Aftercare Protocols (PDF Page 3 & 4 - 1024x576 16:9 Landscape Images)
const AFTERCARE_GUIDELINES = [
  {
    id: 'brush-twice-daily',
    step: '01',
    title: 'Brush Twice Daily & Clean Between Your Teeth',
    desc: 'Maintain meticulous oral hygiene with a soft-bristled brush and interdental cleaners around the crown margins to prevent recurrent decay at the root boundary.',
    image: '/images/medical-services/dental-care/prosthodontic-care-tooth-replacement/metal-post-core/brush-twice-daily.webp',
    alt: 'Daily brushing and interdental cleaning around restored crown margins',
    tag: 'Daily Hygiene'
  },
  {
    id: 'follow-dentist-instructions',
    step: '02',
    title: 'Follow Your Dentist’s Instructions While Waiting for Final Crown',
    desc: 'Protect the temporary restoration conscientiously. Adhere to all dietary advice and return promptly on your scheduled crown cementation appointment.',
    image: '/images/medical-services/dental-care/prosthodontic-care-tooth-replacement/metal-post-core/follow-dentist-instructions.webp',
    alt: 'Adhering to dentist instructions and scheduled crown delivery appointments',
    tag: 'Interim Care'
  },
  {
    id: 'avoid-biting-hard-objects',
    step: '03',
    title: 'Avoid Biting Hard Objects with a Temporary Restoration',
    desc: 'Do not bite ice, hard candy, uncracked nuts, crusty bread, or hard non-food objects. Never use your restored teeth to open packages or tear packaging.',
    image: '/images/medical-services/dental-care/prosthodontic-care-tooth-replacement/metal-post-core/biting-hard-objects.webp',
    alt: 'Avoiding biting hard objects, ice, and hard foods with temporary restorations',
    tag: 'Fracture Defense'
  },
  {
    id: 'attend-scheduled-reviews',
    step: '04',
    title: 'Attend Scheduled Reviews to Monitor Tooth & Gums',
    desc: 'Visit our regional centres for 6-month clinical check-ups and follow-up digital radiographs to assess bone density, root seal stability, and gum health.',
    image: '/images/medical-services/dental-care/prosthodontic-care-tooth-replacement/metal-post-core/attend-scheduled-reviews.webp',
    alt: 'Attending routine dental reviews and monitoring periapical health',
    tag: 'Clinical Reviews'
  },
  {
    id: 'seek-assessment',
    step: '05',
    title: 'Seek Dental Assessment if Pain or Loosening Develops',
    desc: 'If the restored tooth becomes painful to bite on, feels mobile, or swelling develops near the root tip, contact our clinic immediately for prompt evaluation.',
    image: '/images/medical-services/dental-care/prosthodontic-care-tooth-replacement/metal-post-core/seek-a-dental-assessment.webp',
    alt: 'Prompt clinical evaluation if discomfort or looseness develops around restored tooth',
    tag: 'Prompt Attention'
  }
];

// Section 6: Regional Location Coverage Tags (Official addresses in hospital footer)
const REGIONAL_LOCATION_TAGS = [
  { name: 'Thuckalay (Hospital HQ)', highlight: 'Main Multispecialty Hospital' },
  { name: 'Nagercoil', highlight: 'Regional Dental Centre' },
  { name: 'Tirunelveli', highlight: 'Comprehensive Dental Hub' },
  { name: 'Trichy', highlight: 'Central Tamil Nadu Centre' },
  { name: 'Chennai', highlight: 'Specialist Consultation Hub' },
  { name: 'Madurai Corridor', highlight: 'Regional Referral Network' },
  { name: 'Marthandam', highlight: 'Local Access Wing' },
  { name: 'Kanyakumari Coast', highlight: 'Coastal Coverage' },
  { name: 'South Kerala / Trivandrum', highlight: 'Cross-Border Patient Access' }
];

// Section 7: 7 FAQs from PDF Page 4
const FAQS = [
  {
    q: 'What is a metal post in dentistry?',
    a: 'A metal post is a small, rigid support placed inside the prepared root canal of a suitable root-treated tooth. Its primary purpose is not to strengthen the tooth root itself, but to provide a secure anchor to retain the core build-up restoration when substantial coronal tooth structure is missing.'
  },
  {
    q: 'Does every root canal-treated tooth need a post?',
    a: 'No. A post is considered only when there is insufficient remaining natural tooth structure to retain the core. If more than 50% of the natural crown remains with sound axial walls, a standard direct core restoration can be placed without needing an intra-canal post.'
  },
  {
    q: 'Is placing a metal post painful?',
    a: 'No. The procedure is performed with appropriate local anaesthetic and gentle techniques. Furthermore, because the tooth has already undergone root canal treatment, the internal nerve tissue has been completely removed, making post space preparation and seating completely painless.'
  },
  {
    q: 'Will I need a crown after the post and core?',
    a: 'A crown is often considered to protect and restore a significantly damaged tooth, but the final restoration depends on the tooth’s condition and clinical assessment. A full-coverage crown provides the vital 360-degree ferrule effect needed to encircle natural tooth dentin and prevent root fracture under chewing pressure.'
  },
  {
    q: 'How long does a metal post and core last?',
    a: 'There is no fixed lifespan. Longevity depends on the remaining natural tooth structure, root health, bite forces, oral hygiene, and the precision fit of the final crown. When supported by adequate ferrule and maintained with routine check-ups, post-and-core restorations frequently function successfully for decades.'
  },
  {
    q: 'Can a metal post cause a root fracture?',
    a: 'A post can place stress on the remaining root, and a structurally compromised tooth may be at risk of fracture if subjected to excessive forces. Careful case selection, conservative post-space preparation that preserves dentin, passive post seating, and ensuring a proper 2 mm ferrule collar are vital clinical safeguards against fracture.'
  },
  {
    q: 'What happens if the tooth cannot be restored?',
    a: 'If the root is severely damaged, vertically fractured, or has inadequate periodontal bone support, a post and core may not be suitable. In such situations, our dental team will explain alternative treatment pathways, such as a dental implant or bridge restoration, to protect your overall oral health and bite function.'
  }
];

// Related Treatments in Prosthodontics & Endodontics
const RELATED_TREATMENTS = [
  {
    title: 'Single Visit Rotary RCT',
    category: 'Endodontic Care',
    desc: 'Advanced motorized rotary endodontic therapy that painlessly cleans, shapes, and seals infected root canals in one appointment.',
    link: '/dental-care/endodontic-care/root-canal-treatment',
    image: '/images/medical-services/root_canal.png'
  },
  {
    title: 'Dental Crowns & Bridges',
    category: 'Prosthodontic Care',
    desc: 'Precision CAD/CAM milled monolithic Zirconia and E.max ceramic crowns providing high-strength full-coverage tooth protection.',
    link: '/dental-care/prosthodontic-care/dental-crowns-bridges',
    image: '/images/medical-services/fixed_partial_denture.png'
  },
  {
    title: 'Dental Implants',
    category: 'Tooth Replacement',
    desc: 'Titanium bio-integrated fixtures permanently replacing non-restorable teeth with lifelike ceramic crowns and lifetime osseointegration.',
    link: '/dental-care/prosthodontic-care/dental-implants',
    image: '/images/medical-services/dental_implants.png'
  },
  {
    title: 'Removable Partial Dentures',
    category: 'Prosthodontic Care',
    desc: 'Cast metal and flexible partial dentures designed to restore chewing comfort and smile fullness for missing multiple teeth.',
    link: '/dental-care/prosthodontic-care/removable-partial-dentures',
    image: '/images/medical-services/dental-care/prosthodontic-care-tooth-replacement/removable-partial-dentures/what-are-removable-partial-dentures.webp'
  }
];

export default function MetalPostCorePage() {
  const navigate = useNavigate();
  const [openFaqIndex, setOpenFaqIndex] = useState(0);

  // ScrollSpy for Sticky Navigation Tabs
  const activeTab = useTreatmentScrollSpy(TABS.map(tab => tab.id), 120);

  // Dynamic SEO & FAQ Schema Insertion
  useEffect(() => {
    document.title = 'Post & Core: Metal Post Reconstruction | Jerush Dental Centre Tamil Nadu';

    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute(
        'content',
        'Specialist post and core reconstruction using medical-grade metal posts after root canal treatment at Jerush Dentofacial & Cosmetic Laser Centre. Centres in Thuckalay, Nagercoil, Tirunelveli, Trichy, and Chennai.'
      );
    }

    const faqSchemaScript = document.createElement('script');
    faqSchemaScript.type = 'application/ld+json';
    faqSchemaScript.id = 'faq-schema-metal-post-core';
    faqSchemaScript.text = JSON.stringify({
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      'mainEntity': FAQS.map(faq => ({
        '@type': 'Question',
        'name': faq.q,
        'acceptedAnswer': {
          '@type': 'Answer',
          'text': faq.a
        }
      }))
    });
    document.head.appendChild(faqSchemaScript);

    return () => {
      const existingScript = document.getElementById('faq-schema-metal-post-core');
      if (existingScript) existingScript.remove();
    };
  }, []);

  const handleBookClick = () => {
    const el = document.getElementById('treatment-appointment-section');
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
    setOpenFaqIndex(openFaqIndex === index ? -1 : index);
  };

  return (
    <div className="w-full font-body text-left relative min-h-screen text-slate-800 bg-white">
      {/* ─── Breadcrumb Hero ─── */}
      <PageBreadcrumbHero
        title="Post & Core: Metal Post"
        breadcrumbs={[
          { label: 'Dental Care', path: '/treatments' },
          { label: 'Prosthodontic Care', path: '/treatments?category=dental&sub=Prosthodontic%20Care%20%2F%20Tooth%20Replacement' },
          { label: 'Post & Core: Metal Post', active: true }
        ]}
      />

      {/* ─── Hero Section (Clean Hero, No Unwanted Badges, 1:1 Aspect Ratio Square Presentation, 1.40 Line-Height Convention) ─── */}
      <section className="w-full bg-gradient-to-b from-white via-sky-50/25 to-slate-50/60 py-12 lg:py-18 relative overflow-hidden border-b border-slate-200/70">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">

            {/* Left Column: Clinic Branding, Headline & Value Content */}
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
                  Post & Core:{' '}
                  <span className="bg-gradient-to-r from-brandBlue to-brandSky bg-clip-text text-transparent">
                    Rebuilding a Tooth That Has Lost Significant Structure
                  </span>
                </h1>
                <p className="text-slate-600 text-base sm:text-lg leading-relaxed mt-4">
                  When a tooth is badly damaged by decay, fracture or previous dental treatment, there may not be enough natural tooth structure left to support a crown. A metal post and core may be recommended in selected cases after root canal treatment to help retain the foundation on which the final crown is placed.
                </p>
                <div className="mt-4 p-4.5 rounded-2xl bg-white/95 backdrop-blur-sm border border-slate-200/90 shadow-sm space-y-2">
                  <p className="text-slate-700 text-sm sm:text-base leading-relaxed">
                    At <strong className="text-slate-900 font-semibold">Jerush Dentofacial & Cosmetic Laser Centre</strong>, treatment is planned according to the remaining tooth structure, root condition and the restoration needed to protect the tooth.
                  </p>
                  <p className="text-slate-600 text-xs sm:text-sm leading-relaxed pt-1 border-t border-slate-100">
                    Prosthodontic & endodontic restorative consultations are available across our 4 regional centres in Thuckalay, Nagercoil, Tirunelveli, and Trichy with hospital-grade sterilization and digital imaging.
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
                  className="inline-flex items-center gap-2 px-5 sm:px-6 py-3.5 rounded-full bg-white text-slate-700 font-headline font-bold text-xs sm:text-sm uppercase tracking-wider border border-slate-300 shadow-sm hover:bg-slate-50 hover:text-brandBlue hover:border-brandSky/40 transition-all"
                >
                  <Phone className="w-4 h-4 text-brandBlue" />
                  <span>Call +91 94891 60000</span>
                </a>
              </div>

              {/* Three Trust Checkpoints */}
              <div className="pt-3 flex flex-wrap items-center gap-y-2 gap-x-6 text-xs sm:text-sm text-slate-600 font-medium border-t border-slate-200/80">
                <div className="flex items-center gap-1.5">
                  <Check className="w-4 h-4 text-brandBlue shrink-0" />
                  <span>Root-Anchored Core Retention</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Check className="w-4 h-4 text-brandBlue shrink-0" />
                  <span>Biological Tooth Preservation</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Check className="w-4 h-4 text-brandBlue shrink-0" />
                  <span>Solid Foundation for Final Crown</span>
                </div>
              </div>
            </motion.div>

            {/* Right Column: Hero Graphic - 1:1 Aspect Ratio Square Presentation (768x768 Native) */}
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
                    src="/images/medical-services/dental-care/prosthodontic-care-tooth-replacement/metal-post-core/rebuilding-a-tooth.webp"
                    alt="Rebuilding a tooth that has lost significant structure using a metal post and core at Jerush Centre"
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
        treatmentName="Post & Core: Metal Post"
        title="Schedule a Specialist Consultation"
        highlightWord="Tooth Reconstruction"
        subtitle="Rebuild badly broken or decayed root canal-treated teeth with advanced post and core foundation restoration. Comprehensive diagnostic X-rays and specialist assessment across Tamil Nadu."
        features={[
          {
            icon: ShieldCheck,
            title: 'Radicular Retention',
            desc: 'Anchors securely inside root-treated canal space to retain core fillings.'
          },
          {
            icon: Layers,
            title: 'Crown Foundation',
            desc: 'Restores anatomical crown volume, geometric taper, and chewing resistance.'
          },
          {
            icon: Shield,
            title: 'Root Preservation',
            desc: 'Preserves the biological root rather than resorting to premature tooth extraction.'
          }
        ]}
      />

      {/* ─── Signature Navy Key Stats Section (Strict AGENTS.md Gradient) ─── */}
      <section className="w-full bg-gradient-to-r from-[#0F172A] via-[#2852A3] to-[#0F172A] py-10 sm:py-12 px-4 sm:px-6 text-white shadow-inner relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(56,189,248,0.15),transparent_70%)] pointer-events-none" />
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 text-center">
            {STATS.map((stat, idx) => (
              <div key={idx} className="p-3 sm:p-4 rounded-xl bg-white/5 border border-white/10 backdrop-blur-sm">
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

      {/* ─── Sticky Section Navigation Bar ─── */}
      <TreatmentSectionNav tabs={TABS} activeTab={activeTab} />

      {/* ─── Section 1: The Post & Core Triad (PDF Page 1) ─── */}
      <section id="triad" className="py-16 sm:py-20 lg:py-24 bg-slate-50 relative overflow-hidden border-b border-slate-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Section Header with Two-Color Convention & 1.40 Line-Height */}
          <div className="max-w-3xl mx-auto text-center space-y-4 mb-14">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-sky-100/80 border border-sky-200 text-brandBlue text-xs font-bold uppercase tracking-wider">
              <Cpu className="w-3.5 h-3.5 text-brandSky" />
              <span>Biomechanical Anatomy</span>
            </div>
            <h2
              style={{ lineHeight: 1.4 }}
              className="text-2xl sm:text-3xl lg:text-4xl font-extrabold font-headline text-slate-900 tracking-tight leading-[1.4]"
            >
              What Are the Post and Core and{' '}
              <span className="bg-gradient-to-r from-brandBlue to-brandSky bg-clip-text text-transparent">
                How Do They Work?
              </span>
            </h2>
            <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
              A post and core has two main parts, each with a specific purpose. Working alongside the final crown, they form a cohesive 3-element system engineered to protect badly broken teeth from fracture.
            </p>
          </div>

          {/* 3-Column Triad Cards with Native 1:1 Aspect Ratio Images */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {TRIAD_ELEMENTS.map((item) => (
              <div
                key={item.id}
                className="bg-white rounded-3xl p-6 sm:p-7 border border-slate-200/90 shadow-sm hover:shadow-xl hover:border-brandSky/40 transition-all duration-300 flex flex-col justify-between group"
              >
                <div>
                  {/* Card Image: Native 1:1 Aspect Ratio */}
                  <div className="relative rounded-2xl overflow-hidden bg-slate-100 aspect-square mb-6 border border-slate-200/80">
                    <img
                      src={item.image}
                      alt={item.alt}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute top-3 left-3 px-3 py-1 rounded-full bg-slate-900/85 backdrop-blur-md text-white text-xs font-bold uppercase tracking-wider">
                      {item.badge}
                    </div>
                    <div className="absolute top-3 right-3 w-8 h-8 rounded-full bg-brandBlue text-white font-headline font-bold text-xs flex items-center justify-center shadow-md">
                      {item.stepNumber}
                    </div>
                  </div>

                  <span className="text-xs font-bold text-brandBlue uppercase tracking-wider block font-headline">
                    {item.subtitle}
                  </span>
                  <h3 className="text-xl sm:text-2xl font-bold font-headline text-slate-900 mt-1 mb-3">
                    {item.title}
                  </h3>
                  <p className="text-slate-600 text-sm leading-relaxed mb-4">
                    {item.description}
                  </p>
                  <p className="text-slate-500 text-xs sm:text-sm leading-relaxed bg-slate-50 p-3.5 rounded-xl border border-slate-100 mb-5">
                    {item.technicalDetails}
                  </p>
                </div>

                <div className="pt-4 border-t border-slate-100 space-y-2">
                  {item.features.map((feat, fIdx) => (
                    <div key={fIdx} className="flex items-start gap-2 text-xs sm:text-sm text-slate-700">
                      <CheckCircle2 className="w-4 h-4 text-brandSky shrink-0 mt-0.5" />
                      <span>{feat}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* Clinical Clarification Callout Box (from PDF Page 1) */}
          <div className="mt-12 bg-gradient-to-r from-sky-50 via-white to-blue-50 rounded-2xl p-6 sm:p-8 border border-sky-200/80 shadow-sm">
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-brandBlue text-white flex items-center justify-center shrink-0 shadow-md">
                <Info className="w-6 h-6 text-brandSky" />
              </div>
              <div className="space-y-1">
                <h4 className="font-headline font-bold text-base sm:text-lg text-slate-900">
                  Essential Clinical Insight on Tooth Reinforcement
                </h4>
                <p className="text-slate-600 text-sm leading-relaxed">
                  A post does not automatically strengthen a tooth or make every damaged tooth suitable for restoration. The amount of healthy tooth structure remaining (ferrule) is an important part of treatment planning. Our specialists prioritize conservative preservation to ensure long-term stability.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── Section 2: Clinical Indications (PDF Page 2) ─── */}
      <section id="indications" className="py-16 sm:py-20 lg:py-24 bg-white relative overflow-hidden border-b border-slate-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          {/* Section Header */}
          <div className="max-w-3xl mx-auto text-center space-y-4 mb-14">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-blue-100/80 border border-blue-200 text-brandBlue text-xs font-bold uppercase tracking-wider">
              <Stethoscope className="w-3.5 h-3.5 text-brandBlue" />
              <span>Assessment & Criteria</span>
            </div>
            <h2
              style={{ lineHeight: 1.4 }}
              className="text-2xl sm:text-3xl lg:text-4xl font-extrabold font-headline text-slate-900 tracking-tight leading-[1.4]"
            >
              When Might a Metal Post{' '}
              <span className="bg-gradient-to-r from-brandBlue to-brandSky bg-clip-text text-transparent">
                Be Recommended?
              </span>
            </h2>
            <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
              A metal post may be considered when a tooth has undergone root canal treatment and has lost a substantial amount of its upper structure. Here are the four primary clinical situations assessed at Jerush.
            </p>
          </div>

          {/* 4 Clinical Situations (2x2 Grid with 1024x682 3:2 Landscape Images) */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {CLINICAL_INDICATIONS.map((indication) => (
              <div
                key={indication.id}
                className="bg-slate-50/70 rounded-3xl p-6 sm:p-7 border border-slate-200/90 shadow-sm hover:shadow-lg hover:border-brandSky/40 transition-all duration-300 flex flex-col justify-between group"
              >
                <div>
                  {/* Image: 3:2 Landscape Aspect Ratio */}
                  <div className="relative rounded-2xl overflow-hidden bg-slate-200 aspect-[16/10] mb-6 border border-slate-200">
                    <img
                      src={indication.image}
                      alt={indication.alt}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute top-3 left-3 px-3 py-1 rounded-full bg-slate-900/85 backdrop-blur-md text-white text-xs font-bold uppercase tracking-wider">
                      {indication.tag}
                    </div>
                  </div>

                  <span className="text-xs font-bold text-brandBlue uppercase tracking-wider block font-headline">
                    {indication.subtitle}
                  </span>
                  <h3 className="text-xl sm:text-2xl font-bold font-headline text-slate-900 mt-1 mb-2.5">
                    {indication.title}
                  </h3>
                  <p className="text-slate-700 text-sm leading-relaxed mb-4">
                    {indication.description}
                  </p>
                </div>

                <div className="pt-4 border-t border-slate-200/80 bg-white p-4 rounded-xl border">
                  <span className="text-xs font-bold text-slate-900 uppercase tracking-wider block font-headline mb-1">
                    Clinical Treatment Rationale:
                  </span>
                  <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">
                    {indication.clinicalRationale}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Clinical Assessment Caveat Callout (from PDF Page 2) */}
          <div className="mt-12 p-6 sm:p-8 rounded-2xl bg-amber-50/80 border border-amber-200/90 text-amber-950 flex flex-col sm:flex-row items-start gap-4">
            <div className="w-10 h-10 rounded-xl bg-amber-200/90 text-amber-900 flex items-center justify-center shrink-0">
              <AlertTriangle className="w-5 h-5" />
            </div>
            <div>
              <h4 className="font-headline font-bold text-base text-amber-900 mb-1">
                Not Every Root Canal-Treated Tooth Needs a Post
              </h4>
              <p className="text-amber-800 text-sm leading-relaxed">
                If enough healthy tooth structure remains, a post may not be necessary. The condition of the root, surrounding bone, and supporting periodontal tissues must always be thoroughly assessed before treatment begins. At Jerush, our doctors recommend posts strictly when bio-mechanically indicated.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ─── Section 3: 4-Stage Clinical Protocol (PDF Page 2 & 3) ─── */}
      <section id="procedure" className="py-16 sm:py-20 lg:py-24 bg-slate-50 relative overflow-hidden border-b border-slate-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          {/* Section Header */}
          <div className="max-w-3xl mx-auto text-center space-y-4 mb-16">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-sky-100/80 border border-sky-200 text-brandBlue text-xs font-bold uppercase tracking-wider">
              <Activity className="w-3.5 h-3.5 text-brandSky" />
              <span>Step-by-Step Procedure</span>
            </div>
            <h2
              style={{ lineHeight: 1.4 }}
              className="text-2xl sm:text-3xl lg:text-4xl font-extrabold font-headline text-slate-900 tracking-tight leading-[1.4]"
            >
              How Is a Metal Post and Core{' '}
              <span className="bg-gradient-to-r from-brandBlue to-brandSky bg-clip-text text-transparent">
                Placed?
              </span>
            </h2>
            <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
              The procedure is planned carefully to preserve as much healthy tooth structure as possible. Every step follows strict prosthodontic protocols to protect the root canal seal and tooth vitality.
            </p>
          </div>

          {/* 4 Clinical Stages Layout with Landscape Images */}
          <div className="space-y-12">
            {PLACEMENT_STAGES.map((stageItem, index) => {
              const isEven = index % 2 === 1;
              return (
                <div
                  key={stageItem.stage}
                  className={`flex flex-col ${isEven ? 'lg:flex-row-reverse' : 'lg:flex-row'} items-center gap-8 lg:gap-12 bg-white rounded-3xl p-6 sm:p-8 lg:p-10 border border-slate-200/90 shadow-sm hover:shadow-md transition-shadow`}
                >
                  {/* Image Column: 16:9 / 3:2 Widescreen Aspect Ratio */}
                  <div className="w-full lg:w-1/2">
                    <div className="relative rounded-2xl overflow-hidden bg-slate-100 aspect-[16/10] border border-slate-200/90 shadow-inner group">
                      <img
                        src={stageItem.image}
                        alt={stageItem.alt}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                      />
                      <div className="absolute top-4 left-4 px-3.5 py-1.5 rounded-full bg-brandBlue text-white font-headline font-bold text-xs uppercase tracking-wider shadow-md">
                        Stage {stageItem.stage}
                      </div>
                      <div className="absolute top-4 right-4 px-3 py-1 rounded-full bg-slate-900/85 backdrop-blur-md text-white text-xs font-medium">
                        {stageItem.timeframe}
                      </div>
                    </div>
                  </div>

                  {/* Text Column */}
                  <div className="w-full lg:w-1/2 space-y-4">
                    <span className="text-xs font-bold text-brandBlue uppercase tracking-wider block font-headline">
                      Clinical Milestone {stageItem.stage}
                    </span>
                    <h3 className="text-2xl sm:text-3xl font-bold font-headline text-slate-900">
                      {stageItem.title}
                    </h3>
                    <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
                      {stageItem.description}
                    </p>

                    <div className="pt-2 space-y-2.5">
                      <span className="text-xs font-bold text-slate-900 uppercase tracking-wider block font-headline">
                        Protocol Key Actions:
                      </span>
                      {stageItem.clinicalSteps.map((step, sIdx) => (
                        <div key={sIdx} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-700">
                          <CheckCircle2 className="w-4 h-4 text-brandBlue shrink-0 mt-0.5" />
                          <span>{step}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Visits Note from PDF Page 3 */}
          <div className="mt-10 text-center text-xs sm:text-sm text-slate-600 max-w-2xl mx-auto bg-white p-4.5 rounded-xl border border-slate-200">
            <span className="font-semibold text-slate-900">Note on Appointment Schedule:</span> The number of visits depends on the type of post (prefabricated vs custom cast metal), the clinical condition of the tooth, and the final restoration required.
          </div>
        </div>
      </section>

      {/* ─── Section 4: Expected Outcomes (PDF Page 3 - 768x768 1:1 Square Images) ─── */}
      <section id="results" className="py-16 sm:py-20 lg:py-24 bg-white relative overflow-hidden border-b border-slate-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          {/* Section Header */}
          <div className="max-w-3xl mx-auto text-center space-y-4 mb-14">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-emerald-100/80 border border-emerald-200 text-emerald-800 text-xs font-bold uppercase tracking-wider">
              <Award className="w-3.5 h-3.5 text-emerald-700" />
              <span>Restoration Value</span>
            </div>
            <h2
              style={{ lineHeight: 1.4 }}
              className="text-2xl sm:text-3xl lg:text-4xl font-extrabold font-headline text-slate-900 tracking-tight leading-[1.4]"
            >
              What Results Can You{' '}
              <span className="bg-gradient-to-r from-brandBlue to-brandSky bg-clip-text text-transparent">
                Expect?
              </span>
            </h2>
            <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
              When the tooth is suitable for restoration, a post and core can help retain the core and support the planned crown. The aim is to preserve the existing tooth where possible rather than remove it simply because a large portion has been damaged.
            </p>
          </div>

          {/* 4 Results Cards with Native 1:1 Aspect Ratio Images */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
            {EXPECTED_RESULTS.map((res) => (
              <div
                key={res.id}
                className="bg-slate-50/70 rounded-3xl p-5 sm:p-6 border border-slate-200/90 shadow-sm hover:shadow-xl hover:border-brandSky/40 transition-all duration-300 flex flex-col justify-between group"
              >
                <div>
                  {/* Image: Native 1:1 Aspect Ratio */}
                  <div className="relative rounded-2xl overflow-hidden bg-slate-100 aspect-square mb-5 border border-slate-200/80">
                    <img
                      src={res.image}
                      alt={res.alt}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute top-3 left-3 px-2.5 py-1 rounded-full bg-slate-900/85 backdrop-blur-md text-white text-[10px] font-bold uppercase tracking-wider">
                      {res.badge}
                    </div>
                  </div>

                  <h3 className="text-base sm:text-lg font-bold font-headline text-slate-900 leading-snug mb-2.5">
                    {res.title}
                  </h3>
                  <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">
                    {res.desc}
                  </p>
                </div>

                <div className="pt-4 mt-4 border-t border-slate-200/80 flex items-center gap-1.5 text-brandBlue text-xs font-bold font-headline">
                  <span>Preservation Focus</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Section 5: Aftercare Protocols (PDF Page 3 & 4 - 1024x576 16:9 Landscape Images) ─── */}
      <section id="aftercare" className="py-16 sm:py-20 lg:py-24 bg-slate-50 relative overflow-hidden border-b border-slate-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          {/* Section Header */}
          <div className="max-w-3xl mx-auto text-center space-y-4 mb-14">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-rose-100/80 border border-rose-200 text-rose-800 text-xs font-bold uppercase tracking-wider">
              <ShieldAlert className="w-3.5 h-3.5 text-rose-600" />
              <span>Protection & Longevity</span>
            </div>
            <h2
              style={{ lineHeight: 1.4 }}
              className="text-2xl sm:text-3xl lg:text-4xl font-extrabold font-headline text-slate-900 tracking-tight leading-[1.4]"
            >
              Aftercare & Protecting{' '}
              <span className="bg-gradient-to-r from-brandBlue to-brandSky bg-clip-text text-transparent">
                Your Restored Tooth
              </span>
            </h2>
            <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
              A restored tooth still needs regular care. The post does not eliminate the risk of fracture, decay or problems around the root. Follow these five clinical guidelines to safeguard your investment.
            </p>
          </div>

          {/* 5 Aftercare Guidelines Grid (1024x576 16:9 Widescreen Images) */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {AFTERCARE_GUIDELINES.map((habit, idx) => {
              const isWide = idx === 3 || idx === 4;
              return (
                <div
                  key={habit.id}
                  className={`bg-white rounded-3xl p-6 border border-slate-200/90 shadow-sm hover:shadow-lg hover:border-brandSky/40 transition-all duration-300 flex flex-col justify-between group ${
                    isWide && idx === 3 ? 'lg:col-span-1' : isWide && idx === 4 ? 'lg:col-span-2' : ''
                  }`}
                >
                  <div>
                    {/* Image: 16:9 Widescreen Landscape */}
                    <div className="relative rounded-2xl overflow-hidden bg-slate-100 aspect-video mb-5 border border-slate-200">
                      <img
                        src={habit.image}
                        alt={habit.alt}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute top-3 left-3 px-3 py-1 rounded-full bg-slate-900/85 backdrop-blur-md text-white text-xs font-bold uppercase tracking-wider">
                        Step {habit.step}
                      </div>
                      <div className="absolute top-3 right-3 px-2.5 py-1 rounded-full bg-white/90 text-brandBlue text-xs font-bold">
                        {habit.tag}
                      </div>
                    </div>

                    <h3 className="text-lg sm:text-xl font-bold font-headline text-slate-900 mb-2 leading-snug">
                      {habit.title}
                    </h3>
                    <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">
                      {habit.desc}
                    </p>
                  </div>

                  <div className="pt-4 mt-4 border-t border-slate-100 flex items-center gap-2 text-xs font-medium text-slate-500">
                    <CheckCircle2 className="w-4 h-4 text-brandSky shrink-0" />
                    <span>Essential preventive maintenance</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ─── Section 6: Regional Location Coverage (Tags Only - Official Address in Footer) ─── */}
      <section id="locations" className="py-16 sm:py-20 bg-white relative overflow-hidden border-b border-slate-200/80">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">

          {/* Section Header */}
          <div className="max-w-3xl mx-auto space-y-4 mb-10">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-sky-100/80 border border-sky-200 text-brandBlue text-xs font-bold uppercase tracking-wider">
              <MapPin className="w-3.5 h-3.5 text-brandSky" />
              <span>Regional Coverage</span>
            </div>
            <h2
              style={{ lineHeight: 1.4 }}
              className="text-2xl sm:text-3xl lg:text-4xl font-extrabold font-headline text-slate-900 tracking-tight leading-[1.4]"
            >
              Serving Patients Across{' '}
              <span className="bg-gradient-to-r from-brandBlue to-brandSky bg-clip-text text-transparent">
                Tamil Nadu & South Kerala
              </span>
            </h2>
            <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
              Specialist post and core tooth reconstruction is accessible to patients across our regional network locations:
            </p>
          </div>

          {/* Location Tags Grid */}
          <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4 max-w-4xl mx-auto">
            {REGIONAL_LOCATION_TAGS.map((loc, idx) => (
              <div
                key={idx}
                className="inline-flex items-center gap-2.5 px-4 sm:px-5 py-2.5 sm:py-3 rounded-2xl bg-slate-50 border border-slate-200/90 hover:border-brandSky/60 hover:bg-sky-50/40 hover:shadow-xs transition-all text-left group"
              >
                <div className="w-7 h-7 rounded-lg bg-sky-100 flex items-center justify-center shrink-0 group-hover:bg-brandBlue transition-colors">
                  <MapPin className="w-3.5 h-3.5 text-brandBlue group-hover:text-white transition-colors" />
                </div>
                <div>
                  <span className="font-headline font-bold text-xs sm:text-sm text-slate-900 block leading-tight">
                    {loc.name}
                  </span>
                  <span className="text-[11px] text-slate-500 block">
                    {loc.highlight}
                  </span>
                </div>
              </div>
            ))}
          </div>

          {/* Reference to Official Address in Footer */}
          <div className="mt-10 p-4.5 rounded-2xl bg-sky-50/60 border border-sky-100 text-center text-xs sm:text-sm text-slate-600 max-w-2xl mx-auto">
            <span className="font-semibold text-slate-900">Hospital Branch Addresses:</span> Complete clinic street addresses, Google Maps locations, and contact details are available in the footer section below.
          </div>
        </div>
      </section>

      {/* ─── Section 7: Frequently Asked Questions (PDF Page 4 - Schema Markup) ─── */}
      <section id="faqs" className="py-16 sm:py-20 lg:py-24 bg-slate-50 relative overflow-hidden border-b border-slate-200/80">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">

          {/* Section Header */}
          <div className="text-center space-y-4 mb-14">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-sky-100/80 border border-sky-200 text-brandBlue text-xs font-bold uppercase tracking-wider">
              <HelpCircle className="w-3.5 h-3.5 text-brandSky" />
              <span>Evidence-Based Clarity</span>
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
              Clear clinical answers regarding metal post indications, comfort, longevity, and alternative restorative pathways.
            </p>
          </div>

          {/* FAQ Accordion List */}
          <div className="space-y-3.5">
            {FAQS.map((faq, index) => {
              const isOpen = openFaqIndex === index;
              return (
                <div
                  key={index}
                  className={`bg-white rounded-2xl border transition-all duration-200 overflow-hidden text-left ${
                    isOpen
                      ? 'border-brandSky/60 shadow-md ring-1 ring-brandSky/20'
                      : 'border-slate-200/90 shadow-xs hover:border-brandSky/50'
                  }`}
                >
                  <button
                    type="button"
                    onClick={() => toggleFaq(index)}
                    className="w-full py-4.5 sm:py-5 px-5 sm:px-6 text-left flex items-center justify-between gap-4 cursor-pointer hover:bg-slate-50/70 transition-colors"
                    style={{ padding: '18px 24px' }}
                  >
                    <span className="font-headline font-bold text-sm sm:text-base text-slate-900 pr-2">
                      {index + 1}. {faq.q}
                    </span>
                    <div
                      className={`w-7 h-7 sm:w-8 sm:h-8 rounded-full flex items-center justify-center shrink-0 transition-transform duration-300 ${
                        isOpen ? 'bg-brandBlue text-white rotate-180' : 'bg-slate-100 text-slate-600'
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
                        transition={{ duration: 0.25 }}
                        className="overflow-hidden"
                      >
                        <div className="p-5 sm:p-6 pt-0 text-xs sm:text-sm sm:text-base text-slate-600 leading-relaxed border-t border-slate-100">
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

      {/* ─── Section 8: Related Treatments in Prosthodontics & Endodontics ─── */}
      <section className="py-16 sm:py-20 lg:py-24 bg-white relative overflow-hidden border-b border-slate-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          {/* Section Header */}
          <div className="max-w-3xl mx-auto text-center space-y-4 mb-14">
            <span className="text-xs font-bold text-brandBlue uppercase tracking-wider block font-headline">
              Comprehensive Restorative Dental Care
            </span>
            <h2
              style={{ lineHeight: 1.4 }}
              className="text-2xl sm:text-3xl lg:text-4xl font-extrabold font-headline text-slate-900 tracking-tight leading-[1.4]"
            >
              Related Treatments in{' '}
              <span className="bg-gradient-to-r from-brandBlue to-brandSky bg-clip-text text-transparent">
                Prosthodontics & Endodontics
              </span>
            </h2>
            <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
              Explore complementary dental restorations provided by our hospital dental specialists across Tamil Nadu.
            </p>
          </div>

          {/* Related Treatments Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {RELATED_TREATMENTS.map((treat, idx) => (
              <div
                key={idx}
                className="bg-slate-50/70 rounded-2xl overflow-hidden border border-slate-200/90 shadow-sm hover:shadow-lg hover:border-brandSky/40 transition-all flex flex-col justify-between group"
              >
                <div>
                  <div className="relative aspect-[16/10] bg-slate-100 overflow-hidden border-b border-slate-200/80">
                    <img
                      src={treat.image}
                      alt={treat.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute top-2.5 left-2.5 px-2.5 py-0.5 rounded-full bg-slate-900/80 backdrop-blur-sm text-white text-[10px] font-bold uppercase tracking-wider">
                      {treat.category}
                    </div>
                  </div>
                  <div className="p-5">
                    <h3 className="font-headline font-bold text-base sm:text-lg text-slate-900 mb-2 group-hover:text-brandBlue transition-colors">
                      {treat.title}
                    </h3>
                    <p className="text-slate-600 text-xs sm:text-sm leading-relaxed line-clamp-3">
                      {treat.desc}
                    </p>
                  </div>
                </div>

                <div className="p-5 pt-0">
                  <Link
                    to={treat.link}
                    className="inline-flex items-center gap-1.5 text-xs font-bold text-brandBlue hover:text-brandSky transition-colors uppercase tracking-wider"
                  >
                    <span>Explore Treatment</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Bottom CTA Banner (Dr. Sherine Ponraj MDS & Dark Navy Unified Format) ─── */}
      <TreatmentCtaBanner
        badgeText="ENDODONTIC & PROSTHODONTIC CARE"
        titlePrefix="Restore and Protect"
        highlightWord="Your Natural Tooth"
        titleSuffix="at Jerush"
        subtitle="A badly damaged tooth may still be suitable for restoration, depending on the health of its root and the amount of natural structure remaining. At Jerush Dentofacial & Cosmetic Laser Centre, our prosthodontic and restorative dental team assesses each case thoroughly to explain suitable restorative options before treatment. Book your specialist consultation across Thuckalay, Nagercoil, Tirunelveli, Madurai, Trichy, and Chennai."
        primaryBtnText="Book Dental Consultation"
        onPrimaryClick={handleBookClick}
        secondaryBtnText="Call +91 94891 60000"
        secondaryBtnPhone="+919489160000"
        doctorImage="/images/doctors/sherine2.webp"
        doctorName="DR. SHERINE PONRAJ"
        doctorRole="MDS Prosthodontics & Crown and Bridge"
        doctorAlt="DR. SHERINE PONRAJ - Specialist Prosthodontist at Jerush Dentofacial"
      />
    </div>
  );
}
