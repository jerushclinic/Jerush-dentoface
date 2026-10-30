import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Sparkles, ShieldCheck, Calendar, Phone, CheckCircle2, Clock,
  Award, Smile, ArrowRight, Info, Check, HelpCircle, AlertCircle,
  MapPin, ChevronRight, ChevronDown, Eye, Compass, Shield,
  Stethoscope, AlertTriangle, Layers, CheckSquare, Activity,
  Waves, Sparkle, RefreshCw, Scissors, Heart, Palette, Sliders,
  Camera, Zap, Maximize2, FileCheck, Navigation, ShieldAlert,
  Moon, Ban
} from 'lucide-react';
import PageBreadcrumbHero from '../components/common/PageBreadcrumbHero';
import TreatmentCtaBanner from '../components/common/TreatmentCtaBanner';
import TreatmentSectionNav from '../components/common/TreatmentSectionNav';
import TreatmentAppointmentForm from '../components/common/TreatmentAppointmentForm';
import useTreatmentScrollSpy from '../hooks/useTreatmentScrollSpy';

// Key Stats Bar Data
const STATS = [
  { value: '0.3 - 0.5 mm', label: 'Ultra-Thin Laminate Profile' },
  { value: '10 - 15+ Yrs', label: 'Porcelain Veneer Longevity' },
  { value: '100% Custom', label: 'Digital Lab Shade Artistry' },
  { value: '4 Regional Centres', label: 'Centres of Excellence' }
];

// Sticky Navigation Tabs
const TABS = [
  { id: 'indications', label: 'Aesthetic Indications' },
  { id: 'comparison', label: 'Porcelain vs Composite' },
  { id: 'workflow', label: '5-Stage Clinical Planning' },
  { id: 'aftercare', label: 'Care & Protection' },
  { id: 'locations', label: 'Regional Veneer Studios' },
  { id: 'faqs', label: 'Veneer FAQs' }
];

// Section 1: 4 Core Aesthetic Indications (from PDF Page 1 & 2)
const AESTHETIC_INDICATIONS = [
  {
    id: 'discolouration',
    title: 'Persistent Tooth Discolouration',
    category: 'Enamel Shade & Luminosity',
    summary: 'Masking deep intrinsic staining, fluorosis, and medication discolouration that do not respond adequately to chemical whitening.',
    image: '/images/medical-services/dental-care/cosmetic-dentistry/veneers-laminates/persistent-tooth-discolouration.webp',
    alt: 'Severe tooth discolouration and deep staining addressed with porcelain dental veneers',
    clinicalNote: 'Porcelain offers custom opacity gradients, allowing clinicians to completely block dark underlying tetracycline or pulp-related shadows while maintaining natural surface vitality.',
    benefits: [
      'Masks severe fluorosis, intrinsic graying, and tetracycline stains',
      'Provides permanent, stain-resistant porcelain color stability',
      'Harmonises mismatched single dark front teeth with adjacent dentition'
    ],
    tag: 'Deep Stain Masking'
  },
  {
    id: 'gaps',
    title: 'Small Gaps Between Teeth',
    category: 'Space Closure & Arch Symmetry',
    summary: 'Closing midline diastemas and unsightly anterior spaces between front teeth for a seamless, continuous smile curve.',
    image: '/images/medical-services/dental-care/cosmetic-dentistry/veneers-laminates/small-gaps-between-teeth.webp',
    alt: 'Small spaces and midline diastema gap between front teeth closed with ceramic veneers',
    clinicalNote: 'In suitable cases where tooth positions are structurally sound, veneers offer an instant space-closure solution without requiring prolonged orthodontic alignment.',
    benefits: [
      'Closes central diastemas without brackets or wires',
      'Redistributes anterior tooth widths to eliminate black triangles',
      'Preserves biological tooth vitality with minimal enamel reshaping'
    ],
    tag: 'Diastema Closure'
  },
  {
    id: 'shape-irregularities',
    title: 'Tooth Shape & Edge Irregularities',
    category: 'Anatomical Contour Restoration',
    summary: 'Restoring teeth with chipped edges, uneven incisal wear, microdontia (peg laterals), or jagged contours into balanced harmony.',
    image: '/images/medical-services/dental-care/cosmetic-dentistry/veneers-laminates/tooth-shape-irregular-shapes.webp',
    alt: 'Tooth shape irregularities and chipped incisal edges restored with custom veneers',
    clinicalNote: 'Enamel chips and developmental shape abnormalities create visual disharmony; ceramic veneers restore correct golden proportion dimensions and rounded incisal line angles.',
    benefits: [
      'Builds up undersized, narrow, or pegged lateral incisors',
      'Smooths fractured, jagged, and worn-down incisal biting edges',
      'Creates uniform tooth lengths that follow your lower lip smile line'
    ],
    tag: 'Contour Refinement'
  },
  {
    id: 'proportions',
    title: 'Smile Proportions',
    category: 'Facial & Dentofacial Symmetry',
    summary: 'Carefully calibrating width-to-height ratios across your visible smile zone to complement your unique facial features and lip drape.',
    image: '/images/medical-services/dental-care/cosmetic-dentistry/veneers-laminates/smile-proportions.webp',
    alt: 'Harmonious smile proportions and balanced tooth lengths created with dental veneers',
    clinicalNote: 'The central incisors ideally display a 75% to 80% width-to-height ratio. Custom veneers recalculate this golden proportion across your entire aesthetic smile zone.',
    benefits: [
      'Lengthens short, hidden teeth for a more youthful, open smile',
      'Balances asymmetric tooth sizes across the dental midline',
      'Coordinates with natural lip contours for natural facial expression'
    ],
    tag: 'Golden Proportion'
  }
];

// Section 2: Direct Comparison Data (from PDF Page 2)
const COMPARISON_ROWS = [
  {
    feature: 'Material',
    porcelain: 'High-strength dental porcelain (Lithium Disilicate / E.max)',
    composite: 'Direct tooth-coloured hybrid composite resin'
  },
  {
    feature: 'Appearance & Translucency',
    porcelain: 'Exceptional lifelike translucency and natural enamel light reflection',
    composite: 'Pleasing aesthetic result when carefully layered and polished'
  },
  {
    feature: 'Treatment Approach',
    porcelain: 'Fabricated in an advanced digital dental laboratory (typically 2 visits)',
    composite: 'Artistically hand-sculpted directly on your teeth by the dentist (1 visit)'
  },
  {
    feature: 'Longevity & Maintenance',
    porcelain: '10 to 15+ years; highly stain-resistant; occasional clinical review',
    composite: '5 to 8 years; may require periodic repolishing or minor chip repairs'
  },
  {
    feature: 'Tooth Preparation',
    porcelain: 'Often requires conservative enamel removal (0.3 - 0.5 mm); minimal-prep in selected cases',
    composite: 'Minimal to zero enamel removal in suitable cases; highly reversible'
  },
  {
    feature: 'Stain Resistance',
    porcelain: 'Impervious to coffee, tea, turmeric, and smoking stains',
    composite: 'Can absorb dietary pigments over time; requires good oral hygiene'
  }
];

// Section 3: 5 Clinical Stages of Veneer Treatment Planning (from PDF Page 3)
const VENEER_WORKFLOW = [
  {
    stage: '01',
    title: 'Smile Consultation',
    subtitle: 'Aesthetic Discovery & Goal Setting',
    desc: 'You sit down with our cosmetic dental team to discuss what you want to change, shade preferences, and the smile appearance you hope to achieve.',
    image: '/images/medical-services/dental-care/cosmetic-dentistry/veneers-laminates/smile-consultation.webp',
    alt: 'Cosmetic dentist discussing smile goals and veneer options with patient at Jerush',
    focus: 'Patient Vision Alignment'
  },
  {
    stage: '02',
    title: 'Dental Examination',
    subtitle: 'Health & Structural Evaluation',
    desc: 'The dentist checks tooth structure, gum health, bite dynamics, and existing restorations. High-definition photographs and digital X-rays are taken as clinically needed.',
    image: '/images/medical-services/dental-care/cosmetic-dentistry/veneers-laminates/dental-examination.webp',
    alt: 'Comprehensive oral health examination and digital scan for veneer suitability',
    focus: 'Biological Foundation'
  },
  {
    stage: '03',
    title: 'Treatment Planning & Mock-Up',
    subtitle: 'Digital Architecture & Material Selection',
    desc: 'Tooth shape, shade, proportions, and material options are considered. Photographs, 3D digital planning, or an in-mouth trial mock-up are used in selected cases.',
    image: '/images/medical-services/dental-care/cosmetic-dentistry/veneers-laminates/treatment-planning.webp',
    alt: 'Aesthetic veneer treatment planning and shade matching with dental shade guide',
    focus: 'Trial Smile Visualization'
  },
  {
    stage: '04',
    title: 'Conservative Tooth Preparation',
    subtitle: 'Micro-Reshaping & Impressions',
    desc: 'If required, a tiny amount of outer enamel (0.3–0.5 mm) is reshaped to create precise space for the veneer. Digital impressions are taken and temporary veneers placed if necessary.',
    image: '/images/medical-services/dental-care/cosmetic-dentistry/veneers-laminates/tooth-preparation.webp',
    alt: 'Micro-invasive enamel preparation for custom ceramic dental veneers',
    focus: 'Enamel Preservation'
  },
  {
    stage: '05',
    title: 'Veneer Placement & Bonding',
    subtitle: 'Precision Adhesive Integration',
    desc: 'Your custom-crafted laboratory veneers are bonded or cemented to your teeth using high-strength light-cured resin cement. Final bite checks and micro-polishing ensure flawless comfort.',
    image: '/images/medical-services/dental-care/cosmetic-dentistry/veneers-laminates/veneer-placement.webp',
    alt: 'Specialist dentist bonding porcelain veneer onto tooth surface with high precision',
    focus: 'Permanent Artistry'
  }
];

// Section 4: 5 Essential Aftercare & Protection Habits (from PDF Page 4)
const CARE_HABITS = [
  {
    id: 'brushing',
    title: 'Brush Twice Daily with Fluoride Paste',
    desc: 'Veneers need the same consistent oral hygiene as natural teeth. Clean between your teeth daily with dental floss or interdental brushes to keep the gum margins healthy.',
    image: '/images/medical-services/dental-care/cosmetic-dentistry/veneers-laminates/brush-twice-daily.webp',
    alt: 'Brushing teeth twice daily with non-abrasive fluoride toothpaste for veneer care',
    icon: Sparkles,
    tip: 'Use a soft-bristled brush to protect porcelain glaze'
  },
  {
    id: 'checkup',
    title: 'Attend Regular Check-ups & Cleanings',
    desc: 'Visit our hospital every six months for routine professional cleanings and examinations. Your dentist will inspect bonding margins, bite forces, and surrounding gum tissue.',
    image: '/images/medical-services/dental-care/cosmetic-dentistry/veneers-laminates/regular-check-up.webp',
    alt: 'Regular dental check-up and professional prophylaxis to maintain veneers',
    icon: ShieldCheck,
    tip: 'Bi-annual check-ups extend veneer lifespan'
  },
  {
    id: 'avoid-hard',
    title: 'Avoid Biting Hard Objects & Packaging',
    desc: 'Do not bite fingernails, pens, ice cubes, hard nuts, or use veneered front teeth to open plastic packaging. While porcelain is strong, shear forces can cause chips.',
    image: '/images/medical-services/dental-care/cosmetic-dentistry/veneers-laminates/avoid-biting-hard.webp',
    alt: 'Avoiding biting hard items to safeguard porcelain veneers from chipping',
    icon: Ban,
    tip: 'Never use teeth as cutting or opening tools'
  },
  {
    id: 'nightguard',
    title: 'Tell Us If You Grind or Clench',
    desc: 'If you clench or grind your teeth during sleep (bruxism), let your dentist know. A custom-fitted acrylic nightguard protects your veneers from heavy nocturnal forces.',
    image: '/images/medical-services/dental-care/cosmetic-dentistry/veneers-laminates/grinding-night-guard-protection.webp',
    alt: 'Custom nightguard protective appliance to prevent veneer damage from bruxism',
    icon: Moon,
    tip: 'Custom nightguards absorb heavy grinding stress'
  },
  {
    id: 'prompt-contact',
    title: 'Contact Dentist for Chips or Loosening',
    desc: 'If a veneer ever chips, loosens, or feels different when you bite, contact our clinic immediately. Prompt clinical intervention can often re-bond or smooth the restoration safely.',
    image: '/images/medical-services/dental-care/cosmetic-dentistry/veneers-laminates/veneer-chips-loosens.webp',
    alt: 'Direct clinical support for veneer adjustments and maintenance at Jerush',
    icon: Phone,
    tip: 'Specialist cosmetic support across 4 regional centres'
  }
];

// Section 5: Regional Veneer Studios Across Tamil Nadu (Fulfilling user location-based requirement)
const REGIONAL_LOCATIONS = [
  {
    name: 'Thuckalay (Central Hospital)',
    region: 'Kanyakumari District Flagship',
    address: 'NH 47, Main Road, Thuckalay, Tamil Nadu',
    highlight: 'In-House Digital Smile CAD/CAM & Ceramic Artistry Lab',
    serving: 'Serving Thuckalay, Marthandam, Karungal, Colachel, Kulasekharam, Padmanabhapuram, Eraniel & Kaliakkavilai.',
    badge: 'Flagship Multispecialty Hospital'
  },
  {
    name: 'Nagercoil Regional Centre',
    region: 'Southern Tamil Nadu Aesthetic Hub',
    address: 'Court Road / Cape Road, Nagercoil, Tamil Nadu',
    highlight: 'Comprehensive Veneers, Laminates & Cosmetic Suite',
    serving: 'Serving Nagercoil Town, Kanyakumari Coast, Suchindram, Agastheeswaram, Valliyoor, Radhapuram & Tirunelveli district.',
    badge: 'Specialist Regional Centre'
  },
  {
    name: 'Tirunelveli & Madurai Corridor',
    region: 'Southern Highway Patient Access',
    address: 'Direct access via NH 44 / NH 7 Corridor',
    highlight: 'Dedicated Smile Makeover & Tertiary Dental Concierge',
    serving: 'Catering to travelling patients from Tirunelveli, Palayamkottai, Madurai, Tuticorin, Kovilpatti & Virudhunagar.',
    badge: 'Regional Referral Network'
  },
  {
    name: 'Trichy Regional Centre',
    region: 'Central Tamil Nadu Hub',
    address: 'Cantonment / Thillai Nagar, Tiruchirappalli, Tamil Nadu',
    highlight: 'Cosmetic Dentistry, E.max Veneers & Implant Aesthetics',
    serving: 'Serving Tiruchirappalli, Thanjavur, Karur, Pudukkottai, Dindigul, Perambalur & Central Tamil Nadu districts.',
    badge: 'Centres of Excellence'
  },
  {
    name: 'Chennai Regional Centre',
    region: 'Metropolitan & International Hub',
    address: 'City Metro Suite, Chennai, Tamil Nadu',
    highlight: 'Aesthetic Veneer Studio & International Patient Lounge',
    serving: 'Serving Greater Chennai, Kanchipuram, Chengalpattu & Global Dental Tourism patients from Sri Lanka, Singapore, Malaysia & Gulf.',
    badge: 'Metro Smile Suite'
  },
  {
    name: 'Cross-Border South Kerala Access',
    region: 'Trivandrum & South Kerala Border',
    address: 'Within 45 Mins via NH 66 from Trivandrum',
    highlight: 'Cross-Border Cosmetic Dentistry & Transparent Care',
    serving: 'Serving Trivandrum (Thiruvananthapuram), Neyyattinkara, Balaramapuram, Parasala & Poovar.',
    badge: 'Cross-Border Access'
  }
];

// 7 FAQs from PDF Page 4 & 5
const FAQS = [
  {
    q: 'Are veneers and laminates the same?',
    a: 'The terms are often used interchangeably to describe thin coverings placed on the front surfaces of teeth. In clinical practice, "laminates" often refers specifically to ultra-thin porcelain shells (0.3–0.5 mm) requiring minimal tooth preparation, while "veneers" is the broader category encompassing both porcelain and direct composite options.'
  },
  {
    q: 'Do veneers look natural?',
    a: 'Yes. Modern dental porcelain closely replicates the optical properties of natural tooth enamel, including its translucency, depth, and light reflection. When the shade, shape, surface texture, and proportions are carefully matched to your facial features and adjacent teeth, veneers blend seamlessly.'
  },
  {
    q: 'Is veneer treatment painful?',
    a: 'Veneer treatment is generally very well tolerated. If conservative enamel preparation is required, local anaesthesia is used to ensure complete comfort throughout the procedure. Some patients experience mild, temporary sensitivity to hot or cold foods for a few days after placement, which quickly subsides.'
  },
  {
    q: 'Do all veneers require shaving the teeth?',
    a: 'No. Some selected cases qualify for minimal-preparation or "no-prep" veneers, where little to no enamel is removed. However, no-prep veneers are not suitable for everyone; placing veneers over bulky or forward-angled teeth without proper space creation can result in an unnatural, over-contoured appearance.'
  },
  {
    q: 'How long do dental veneers last?',
    a: 'High-quality porcelain veneers typically last 10 to 15 years or longer with excellent oral hygiene and routine check-ups. Composite veneers generally last 5 to 8 years and may require periodic repolishing or minor chip repairs over time. Neither treatment lasts indefinitely.'
  },
  {
    q: 'Can veneers fix crooked teeth?',
    a: 'Veneers can improve the aesthetic appearance of minor irregularities, slight rotations, or small overlaps without braces. However, they do not physically move your natural teeth. For moderate to severe misalignment or bite issues, orthodontic treatment (such as Jerushaligne clear aligners or braces) is recommended prior to or instead of veneers.'
  },
  {
    q: 'Are veneers better than teeth whitening?',
    a: 'Neither option is universally "better"—they serve different clinical purposes. Professional whitening is non-invasive and ideal for natural teeth with surface or age-related staining. Veneers are indicated when discoloration does not respond to whitening (such as fluorosis or tetracycline stains) or when tooth shape, chipped edges, or gaps also need correction.'
  }
];

// Related Cosmetic & Smile Care Treatments
const RELATED_TREATMENTS = [
  {
    title: 'Smile Designing',
    desc: 'Comprehensive 3D digital planning combining veneers, whitening, and gum aesthetics tailored to your facial architecture.',
    image: '/images/medical-services/dental-care/cosmetic-dentistry/smile-designing/smile-design-around-you.webp',
    alt: 'Comprehensive digital smile design treatment at Jerush',
    link: '/dental-care/cosmetic-dentistry/smile-designing',
    badge: 'Smile Makeover',
    badgeColor: 'bg-sky-50 text-brandSky border-brandSky/20',
    accentBorder: 'hover:border-brandSky/60'
  },
  {
    title: 'Professional Teeth Whitening',
    desc: 'In-office laser whitening designed to safely lighten enamel discoloration by up to 8 shades in a single clinical visit.',
    image: '/images/medical-services/dental-care/cosmetic-dentistry/smile-designing/teeth-whitening.webp',
    alt: 'Professional in-office laser teeth whitening at Jerush',
    link: '/treatments/teeth-whitening',
    badge: 'Bright Radiance',
    badgeColor: 'bg-amber-50 text-amber-700 border-amber-200',
    accentBorder: 'hover:border-amber-400/60'
  },
  {
    title: 'Jerushaligne Clear Aligners',
    desc: 'Custom invisible 3D aligners designed to straighten teeth comfortably without fixed metal brackets or wires.',
    image: '/images/medical-services/dental-care/jerushaligne/virtually-invisible.webp',
    alt: 'Jerushaligne custom clear aligners for invisible teeth straightening',
    link: '/dental-care/orthodontic-care/clear-aligners-jerushaligne',
    badge: 'Invisible Orthodontics',
    badgeColor: 'bg-emerald-50 text-emerald-700 border-emerald-200',
    accentBorder: 'hover:border-emerald-500/60'
  },
  {
    title: 'Tooth Jewellery & Gems',
    desc: 'Decorative crystal gems and gold ornaments bonded safely to natural enamel without drilling or tooth damage.',
    image: '/images/medical-services/dental-care/cosmetic-dentistry/tooth-jewellery/personal-touch.webp',
    alt: 'Cosmetic tooth gem bonding at Jerush',
    link: '/dental-care/cosmetic-dentistry/tooth-jewellery',
    badge: 'Smile Sparkle',
    badgeColor: 'bg-purple-50 text-purple-700 border-purple-200',
    accentBorder: 'hover:border-purple-500/60'
  }
];

export default function VeneersLaminatesPage() {
  const navigate = useNavigate();
  const [openFaq, setOpenFaq] = useState(null);

  const toggleFaq = (index) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  const { activeSection, scrollToSection } = useTreatmentScrollSpy(
    TABS.map(tab => tab.id),
    138
  );

  useEffect(() => {
    // Canonical SEO Setup from PDF Page 5
    document.title = 'Dental Veneers and Laminates | Cosmetic Dentistry – Jerush';

    let metaDesc = document.querySelector('meta[name="description"]');
    if (!metaDesc) {
      metaDesc = document.createElement('meta');
      metaDesc.name = 'description';
      document.head.appendChild(metaDesc);
    }
    metaDesc.content = 'Learn about porcelain and composite dental veneers, their benefits, treatment process, aftercare, and suitability for improving tooth colour, shape, and smile proportions.';

    let metaKeywords = document.querySelector('meta[name="keywords"]');
    if (!metaKeywords) {
      metaKeywords = document.createElement('meta');
      metaKeywords.name = 'keywords';
      document.head.appendChild(metaKeywords);
    }
    metaKeywords.content = 'Veneers and laminates, Dental veneers, porcelain veneers, composite veneers, cosmetic dentistry, smile makeover, front teeth veneers, Tamil Nadu, Thuckalay, Nagercoil, Chennai, Trichy';

    // Inject FAQ Schema
    const faqSchemaScript = document.createElement('script');
    faqSchemaScript.type = 'application/ld+json';
    faqSchemaScript.id = 'faq-schema-veneers-laminates';
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
      const existingScript = document.getElementById('faq-schema-veneers-laminates');
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

  return (
    <div className="w-full font-body text-left relative min-h-screen text-slate-800 bg-white">
      {/* ─── Breadcrumb Hero ─── */}
      <PageBreadcrumbHero
        title="Veneers &amp; Laminates"
        breadcrumbs={[
          { label: 'Dental Care', path: '/treatments' },
          { label: 'Cosmetic Dentistry', path: '/treatments?category=dental&sub=Cosmetic%20Dentistry' },
          { label: 'Veneers & Laminates', active: true }
        ]}
      />

      {/* ─── Hero Section (Clean Hero, 1:1 Aspect-Square Image, 1.40 Line-Height Convention) ─── */}
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
                  Jerush Dentofacial &amp; Cosmetic Laser Centre
                </span>
                <h1
                  style={{ lineHeight: 1.4 }}
                  className="text-3xl sm:text-4xl lg:text-[40px] xl:text-[44px] font-extrabold font-headline tracking-tight leading-[1.4] text-slate-900"
                >
                  A Refined Smile:{' '}
                  <span className="bg-gradient-to-r from-brandBlue to-brandSky bg-clip-text text-transparent">
                    Artistically Crafted with Dental Veneers &amp; Laminates
                  </span>
                </h1>
                <p className="text-slate-600 text-base sm:text-lg leading-relaxed mt-4">
                  Dental veneers, also called dental laminates in many clinical contexts, are thin custom coverings bonded to the front surfaces of teeth to improve their appearance. They can help address cosmetic concerns such as discolouration, small gaps, uneven edges, and minor shape irregularities.
                </p>
                <div className="mt-4 p-4.5 rounded-2xl bg-white/95 backdrop-blur-sm border border-slate-200/90 shadow-sm space-y-2">
                  <p className="text-slate-700 text-sm sm:text-base leading-relaxed">
                    Depending on your needs, veneers may be made from porcelain or composite resin. The choice depends on the condition of the teeth, the desired appearance, the available space, and your personal preferences.
                  </p>
                  <p className="text-slate-600 text-xs sm:text-sm leading-relaxed pt-1 border-t border-slate-100">
                    At <strong className="text-slate-900 font-semibold">Jerush Dentofacial &amp; Cosmetic Laser Centre</strong>, veneer treatment planning focuses on creating a smile that complements your facial features while preserving as much healthy natural tooth structure as possible.
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
                  <span>Conservative Minimal-Prep Enamel Care</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Check className="w-4 h-4 text-brandBlue shrink-0" />
                  <span>Laboratory-Grade E.max Porcelain Artistry</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Check className="w-4 h-4 text-brandBlue shrink-0" />
                  <span>Natural Enamel Translucency &amp; Depth</span>
                </div>
              </div>
            </motion.div>

            {/* Right Column: Hero Graphic - 1:1 Aspect Ratio Square Presentation */}
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
                    src="/images/medical-services/dental-care/cosmetic-dentistry/veneers-laminates/smile-with-dental-veneers.webp"
                    alt="Natural-looking porcelain dental veneers on upper front teeth with balanced proportions and healthy gums"
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
        treatmentName="Dental Veneers &amp; Laminates"
        title="Book a Veneer Smile Consultation"
        highlightWord="Aesthetic Porcelain &amp; Composite Care"
        subtitle="Experience bespoke smile refinement with ultra-thin ceramic laminates tailored to your face, tooth proportions, and shade preferences across Tamil Nadu."
        features={[
          {
            icon: Sparkles,
            title: 'Natural Light Transmission',
            desc: 'Multi-layered ceramic replicates the optical luminescence, surface texture, and depth of natural tooth enamel.'
          },
          {
            icon: Camera,
            title: 'Diagnostic Mock-Up Preview',
            desc: 'Preview and test-drive your proposed new smile with temporary mock-ups before any permanent bonding begins.'
          },
          {
            icon: ShieldCheck,
            title: 'Conservative Tooth Prep',
            desc: 'Ultra-thin 0.3 mm to 0.5 mm profile engineered to maximize biological enamel preservation.'
          },
          {
            icon: MapPin,
            title: '4 Regional Centres',
            desc: 'Specialist cosmetic dental surgeons available in Thuckalay, Nagercoil, Trichy, and Chennai.'
          }
        ]}
      />

      {/* ─── Key Stats Bar (Exact Jerush deep-navy to royal-blue center gradient) ─── */}
      <section className="bg-gradient-to-r from-[#0F172A] via-[#2852A3] to-[#0F172A] py-10 sm:py-12 px-4 sm:px-6 text-white shadow-inner relative overflow-hidden">
        <div className="max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-6 text-center text-white relative z-10">
          {STATS.map((stat, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: idx * 0.1 }}
              className="space-y-1"
            >
              <p className="font-headline font-black text-2xl sm:text-3xl lg:text-4xl text-white tracking-tight">
                {stat.value}
              </p>
              <p className="text-brandSky text-xs sm:text-sm font-bold uppercase tracking-wider mt-1">
                {stat.label}
              </p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ─── Sticky Section Navigation ─── */}
      <TreatmentSectionNav
        tabs={TABS}
        activeSection={activeSection}
        onTabClick={scrollToSection}
      />

      {/* ─── SECTION 1: What Can Veneers and Laminates Improve? (id="indications") ─── */}
      <section
        id="indications"
        className="w-full py-16 lg:py-24 bg-gradient-to-b from-slate-50 via-sky-50/20 to-white relative scroll-mt-28 border-b border-slate-200/70 overflow-hidden"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mb-12 text-left">
            <span className="text-xs font-bold text-brandBlue uppercase tracking-wider font-headline block mb-2.5">
              Clinical Cosmetic Indications
            </span>
            <h2
              style={{ lineHeight: 1.4 }}
              className="text-2xl sm:text-3xl lg:text-[36px] font-extrabold font-headline text-slate-900 tracking-tight leading-[1.4]"
            >
              What Can Veneers and Laminates{' '}
              <span className="bg-gradient-to-r from-brandBlue to-brandSky bg-clip-text text-transparent">
                Improve?
              </span>
            </h2>
            <p className="text-slate-600 text-sm sm:text-base leading-relaxed mt-3.5">
              Veneers may be considered when certain cosmetic concerns affect the appearance of the front teeth. Explore the four core clinical indications addressed by our dental team:
            </p>
          </div>

          {/* 4 Architectural Cards Grid (Native 16:9 / 16:10 Ratios - Zero Cropping) */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {AESTHETIC_INDICATIONS.map((item, index) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-white rounded-3xl overflow-hidden border border-slate-200/90 shadow-md hover:shadow-xl transition-all duration-300 flex flex-col group hover:border-brandSky/60"
              >
                {/* 16:10 Framed Window */}
                <div className="relative p-3 pb-0">
                  <div className="relative rounded-2xl overflow-hidden bg-slate-50 aspect-[16/10] border border-slate-100 shadow-inner">
                    <img
                      src={item.image}
                      alt={item.alt}
                      className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute top-2.5 left-2.5">
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-[10px] font-headline font-bold bg-white/95 text-brandBlue border border-slate-200 shadow-xs backdrop-blur-md">
                        {item.tag}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6 sm:p-7 flex flex-col flex-1 justify-between space-y-4 text-left">
                  <div>
                    <span className="text-xs font-bold text-brandSky uppercase tracking-wider font-headline block">
                      {item.category}
                    </span>
                    <h3 className="font-headline font-bold text-xl sm:text-2xl text-slate-900 group-hover:text-brandBlue transition-colors mt-1">
                      {item.title}
                    </h3>
                    <p className="text-slate-600 text-sm leading-relaxed mt-2.5">
                      {item.summary}
                    </p>
                  </div>

                  <div className="p-4 rounded-2xl bg-sky-50/70 border border-brandSky/20">
                    <p className="text-slate-700 text-xs sm:text-sm leading-relaxed">
                      {item.clinicalNote}
                    </p>
                  </div>

                  <div className="pt-2 border-t border-slate-100 space-y-2">
                    <span className="text-xs font-bold text-slate-800 uppercase tracking-wider font-headline block">
                      Key Aesthetic Benefits:
                    </span>
                    {item.benefits.map((b, bIdx) => (
                      <div key={bIdx} className="flex items-start gap-2 text-xs text-slate-700">
                        <Check className="w-3.5 h-3.5 text-brandBlue shrink-0 mt-0.5" />
                        <span>{b}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Clinical Orthodontic Alternative Note from PDF Page 1 */}
          <div className="mt-10 p-5 sm:p-6 rounded-2xl bg-white border border-sky-200 shadow-sm flex flex-col sm:flex-row items-start sm:items-center gap-4 text-left">
            <div className="w-12 h-12 rounded-xl bg-sky-50 border border-sky-200 flex items-center justify-center shrink-0 text-brandBlue">
              <Info className="w-6 h-6" />
            </div>
            <div className="space-y-1">
              <h4 className="font-headline font-bold text-sm sm:text-base text-slate-900">
                Conservative Space Closure &amp; Orthodontic Options
              </h4>
              <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">
                In suitable cases, veneers can improve the appearance of spaces between front teeth. However, for significant spacing or complex bite alignment, biological orthodontic treatment (such as Jerushaligne clear aligners) may be preferable to preserve natural tooth structure.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ─── SECTION 2: Porcelain Veneers vs. Composite Veneers (id="comparison") ─── */}
      <section
        id="comparison"
        className="w-full py-16 lg:py-24 bg-white relative scroll-mt-28 border-b border-slate-200/70 overflow-hidden"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mb-12 text-left">
            <span className="text-xs font-bold text-brandBlue uppercase tracking-wider font-headline block mb-2.5">
              Material Science &amp; Clinical Comparison
            </span>
            <h2
              style={{ lineHeight: 1.4 }}
              className="text-2xl sm:text-3xl lg:text-[36px] font-extrabold font-headline text-slate-900 tracking-tight leading-[1.4]"
            >
              Porcelain Veneers vs.{' '}
              <span className="bg-gradient-to-r from-brandBlue to-brandSky bg-clip-text text-transparent">
                Composite Veneers
              </span>
            </h2>
            <p className="text-slate-600 text-sm sm:text-base leading-relaxed mt-3.5">
              The best option depends on your dental condition, aesthetic expectations, tooth preservation goals, and budget. Compare the two primary veneer modalities below:
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            {/* Left Column: Visual Showcase Card (1672x941 - 16:10 Ratio, Zero Cropping) */}
            <div className="lg:col-span-5">
              <div className="relative rounded-3xl overflow-hidden bg-white border border-slate-200 shadow-xl p-3 group text-left">
                <div className="relative rounded-2xl overflow-hidden bg-slate-50 aspect-[16/10]">
                  <img
                    src="/images/medical-services/dental-care/cosmetic-dentistry/veneers-laminates/veneers-vs-composite-veneers.webp"
                    alt="Side-by-side comparison of laboratory porcelain dental veneers versus direct composite veneers"
                    className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700"
                  />
                </div>
                <div className="p-4 space-y-1.5">
                  <h4 className="font-headline font-bold text-base text-slate-900">
                    Laboratory Artistry vs. Direct Sculpting
                  </h4>
                  <p className="text-slate-600 text-xs leading-relaxed">
                    Porcelain veneers deliver maximum stain resistance and natural light reflectivity, while composite veneers offer a conservative single-visit aesthetic option.
                  </p>
                </div>
              </div>
            </div>

            {/* Right Column: Comparison Table from PDF Page 2 */}
            <div className="lg:col-span-7">
              <div className="bg-white rounded-3xl border border-slate-200/90 shadow-xl overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse">
                    <thead>
                      <tr className="bg-gradient-to-r from-slate-900 to-[#123164] text-white">
                        <th className="p-4 sm:p-5 text-xs font-headline font-bold uppercase tracking-wider">
                          Feature
                        </th>
                        <th className="p-4 sm:p-5 text-xs font-headline font-bold uppercase tracking-wider bg-brandBlue/30 text-sky-200">
                          Porcelain Veneers
                        </th>
                        <th className="p-4 sm:p-5 text-xs font-headline font-bold uppercase tracking-wider text-slate-300">
                          Composite Veneers
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 text-xs sm:text-sm">
                      {COMPARISON_ROWS.map((row, rIdx) => (
                        <tr key={rIdx} className="hover:bg-slate-50/70 transition-colors">
                          <td className="p-4 sm:p-5 font-headline font-bold text-slate-900">
                            {row.feature}
                          </td>
                          <td className="p-4 sm:p-5 font-semibold text-brandBlue bg-sky-50/40">
                            {row.porcelain}
                          </td>
                          <td className="p-4 sm:p-5 text-slate-600">
                            {row.composite}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>

          {/* Candidacy & Consultation Notice from PDF Page 3 */}
          <div className="mt-8 p-4.5 rounded-2xl bg-amber-50/70 border border-amber-200/80 flex items-start sm:items-center gap-3 text-xs sm:text-sm text-slate-700 text-left">
            <AlertCircle className="w-5 h-5 text-amber-700 shrink-0 mt-0.5 sm:mt-0" />
            <span>
              <strong className="text-slate-900 font-semibold">Important Consideration:</strong> Porcelain veneers and composite veneers have different material properties and maintenance needs. Not every patient is suitable for veneers, and a clinical consultation is needed before choosing a treatment.
            </span>
          </div>
        </div>
      </section>

      {/* ─── SECTION 3: How Is Veneer Treatment Planned? (id="workflow") ─── */}
      <section
        id="workflow"
        className="w-full py-16 lg:py-24 bg-gradient-to-b from-slate-50 via-sky-50/20 to-white relative scroll-mt-28 border-b border-slate-200/70 overflow-hidden"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mb-12 text-left">
            <span className="text-xs font-bold text-brandBlue uppercase tracking-wider font-headline block mb-2.5">
              Structured Step-by-Step Pathway
            </span>
            <h2
              style={{ lineHeight: 1.4 }}
              className="text-2xl sm:text-3xl lg:text-[36px] font-extrabold font-headline text-slate-900 tracking-tight leading-[1.4]"
            >
              How Is Veneer Treatment{' '}
              <span className="bg-gradient-to-r from-brandBlue to-brandSky bg-clip-text text-transparent">
                Planned &amp; Executed?
              </span>
            </h2>
            <p className="text-slate-600 text-sm sm:text-base leading-relaxed mt-3.5">
              Veneer treatment usually involves several coordinated steps, depending on the material, laboratory workflow, and clinical complexity of your case:
            </p>
          </div>

          {/* 5-Stage Stepper Grid (Native 1254x1254 1:1 Aspect-Square Images - Zero Distortion) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
            {VENEER_WORKFLOW.map((step, idx) => (
              <motion.div
                key={step.stage}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.45, delay: idx * 0.08 }}
                className="bg-white rounded-3xl overflow-hidden border border-slate-200/90 shadow-md hover:shadow-xl transition-all duration-300 flex flex-col group hover:border-brandBlue/60 text-left"
              >
                {/* 1:1 Aspect Frame */}
                <div className="relative p-3 pb-0">
                  <div className="relative rounded-2xl overflow-hidden bg-slate-50 aspect-square border border-slate-100 shadow-inner">
                    <img
                      src={step.image}
                      alt={step.alt}
                      className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute top-2.5 left-2.5">
                      <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-headline font-black bg-brandBlue text-white shadow-xs">
                        STAGE {step.stage}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Content */}
                <div className="p-4 sm:p-5 flex flex-col flex-1 justify-between space-y-3">
                  <div>
                    <span className="text-[10px] font-bold text-brandSky uppercase tracking-wider font-headline block">
                      {step.subtitle}
                    </span>
                    <h3 className="font-headline font-bold text-base text-slate-900 group-hover:text-brandBlue transition-colors mt-0.5">
                      {step.title}
                    </h3>
                    <p className="text-slate-600 text-xs leading-relaxed mt-2">
                      {step.desc}
                    </p>
                  </div>

                  <div className="pt-3 border-t border-slate-100 text-[11px] text-slate-500">
                    Focus: <strong className="text-slate-800 font-semibold">{step.focus}</strong>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Appointments Note from PDF Page 3 */}
          <div className="mt-8 p-4.5 rounded-2xl bg-sky-50/70 border border-brandSky/25 flex items-center gap-3 text-xs sm:text-sm text-slate-700 text-left">
            <Clock className="w-5 h-5 text-brandBlue shrink-0" />
            <span>
              The number of appointments depends on the chosen material, laboratory workflow, and personalized treatment plan. Direct composite veneers can often be completed in a single visit, while custom porcelain veneers typically require two visits.
            </span>
          </div>
        </div>
      </section>

      {/* ─── SECTION 4: Caring for Your Veneers (id="aftercare") ─── */}
      <section
        id="aftercare"
        className="w-full py-16 lg:py-24 bg-white relative scroll-mt-28 border-b border-slate-200/70 overflow-hidden"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mb-12 text-left">
            <span className="text-xs font-bold text-brandBlue uppercase tracking-wider font-headline block mb-2.5">
              Long-Term Maintenance &amp; Protection
            </span>
            <h2
              style={{ lineHeight: 1.4 }}
              className="text-2xl sm:text-3xl lg:text-[36px] font-extrabold font-headline text-slate-900 tracking-tight leading-[1.4]"
            >
              Caring for Your Veneers:{' '}
              <span className="bg-gradient-to-r from-brandBlue to-brandSky bg-clip-text text-transparent">
                Daily Habits &amp; Longevity
              </span>
            </h2>
            <p className="text-slate-600 text-sm sm:text-base leading-relaxed mt-3.5">
              Veneers need the same consistent oral hygiene as natural teeth. Proper care helps protect the underlying tooth structure and gums, maximizing the lifespan of your cosmetic restorations:
            </p>
          </div>

          {/* 5 Habit Cards Grid (Native 1254x1254 1:1 Aspect-Square Images) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
            {CARE_HABITS.map((habit, idx) => {
              const IconComp = habit.icon;
              return (
                <motion.div
                  key={habit.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.45, delay: idx * 0.08 }}
                  className="bg-white rounded-3xl overflow-hidden border border-slate-200/90 shadow-md hover:shadow-xl transition-all duration-300 flex flex-col group hover:border-brandSky/60 text-left"
                >
                  {/* 1:1 Frame */}
                  <div className="relative p-3 pb-0">
                    <div className="relative rounded-2xl overflow-hidden bg-slate-50 aspect-square border border-slate-100 shadow-inner">
                      <img
                        src={habit.image}
                        alt={habit.alt}
                        className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute top-2.5 right-2.5">
                        <div className="w-8 h-8 rounded-xl bg-white/90 backdrop-blur-md border border-slate-200 text-brandBlue flex items-center justify-center shadow-xs">
                          <IconComp className="w-4 h-4" />
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-4 sm:p-5 flex flex-col flex-1 justify-between space-y-3">
                    <div>
                      <h3 className="font-headline font-bold text-sm sm:text-base text-slate-900 group-hover:text-brandBlue transition-colors">
                        {habit.title}
                      </h3>
                      <p className="text-slate-600 text-xs leading-relaxed mt-1.5">
                        {habit.desc}
                      </p>
                    </div>

                    <div className="pt-2.5 border-t border-slate-100 flex items-center gap-1.5 text-[11px] text-brandBlue font-medium">
                      <CheckCircle2 className="w-3.5 h-3.5 text-brandSky shrink-0" />
                      <span>{habit.tip}</span>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>

          {/* Longevity & Irreversibility Advisory from PDF Page 4 */}
          <div className="mt-10 p-5 sm:p-6 rounded-2xl bg-amber-50/70 border border-amber-200/80 shadow-sm flex flex-col sm:flex-row items-start sm:items-center gap-4 text-left">
            <div className="w-12 h-12 rounded-xl bg-amber-100/80 border border-amber-300 text-amber-800 flex items-center justify-center shrink-0">
              <ShieldAlert className="w-6 h-6" />
            </div>
            <div className="space-y-1">
              <h4 className="font-headline font-bold text-sm sm:text-base text-amber-950">
                Restorative Longevity &amp; Treatment Transparency
              </h4>
              <p className="text-amber-900 text-xs sm:text-sm leading-relaxed">
                Veneers are not necessarily permanent. They may need repair or replacement over time, and conventional veneers that require enamel removal are generally an irreversible treatment. Your dentist will explain all conservative options, benefits, and long-term maintenance requirements before treatment begins.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ─── SECTION 5: Regional Veneer Studios Across Tamil Nadu (id="locations") ─── */}
      <section
        id="locations"
        className="w-full py-16 lg:py-24 bg-gradient-to-b from-slate-50 via-sky-50/20 to-white relative scroll-mt-28 border-b border-slate-200/70 overflow-hidden"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mb-12 text-left">
            <span className="text-xs font-bold text-brandBlue uppercase tracking-wider font-headline block mb-2.5">
              Regional Centres of Excellence
            </span>
            <h2
              style={{ lineHeight: 1.4 }}
              className="text-2xl sm:text-3xl lg:text-[36px] font-extrabold font-headline text-slate-900 tracking-tight leading-[1.4]"
            >
              Specialist Veneer &amp; Laminate Care{' '}
              <span className="bg-gradient-to-r from-brandBlue to-brandSky bg-clip-text text-transparent">
                Across Our Tamil Nadu Centres
              </span>
            </h2>
            <p className="text-slate-600 text-sm sm:text-base leading-relaxed mt-3.5">
              Whether you reside in Kanyakumari district, travel along the Southern highway corridor, or access our central Tamil Nadu or Chennai suites, hospital-grade cosmetic dentistry is conveniently within reach:
            </p>
          </div>

          {/* Regional Hub Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {REGIONAL_LOCATIONS.map((loc, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.45, delay: idx * 0.08 }}
                className="bg-white rounded-3xl p-6 sm:p-7 border border-slate-200/90 shadow-md hover:shadow-xl transition-all flex flex-col justify-between text-left group hover:border-brandSky/60"
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-3">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-[10px] font-headline font-bold bg-sky-50 text-brandBlue border border-brandSky/20">
                      {loc.badge}
                    </span>
                    <MapPin className="w-4 h-4 text-brandSky group-hover:scale-110 transition-transform" />
                  </div>

                  <h3 className="font-headline font-bold text-lg sm:text-xl text-slate-900 group-hover:text-brandBlue transition-colors">
                    {loc.name}
                  </h3>
                  <p className="text-xs font-semibold text-brandSky uppercase tracking-wider mt-0.5">
                    {loc.region}
                  </p>

                  <div className="mt-4 p-3 rounded-2xl bg-slate-50 border border-slate-100">
                    <p className="text-slate-700 text-xs leading-relaxed font-medium">
                      {loc.highlight}
                    </p>
                  </div>

                  <p className="text-slate-600 text-xs leading-relaxed mt-3.5">
                    {loc.serving}
                  </p>
                </div>

                <div className="pt-4 mt-5 border-t border-slate-100 flex items-center justify-between text-xs">
                  <span className="text-slate-500 font-medium">{loc.address}</span>
                  <button
                    type="button"
                    onClick={handleBookClick}
                    className="text-brandBlue font-headline font-bold hover:text-brandSky inline-flex items-center gap-1 cursor-pointer"
                  >
                    <span>Book visit</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Outstation Concierge Banner */}
          <div className="mt-10 p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-slate-900 to-[#123164] text-white shadow-xl flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6 text-left">
            <div className="space-y-1.5 max-w-2xl">
              <span className="text-xs font-bold text-brandSky uppercase tracking-wider font-headline block">
                Outstation &amp; Travelling Patients
              </span>
              <h4 className="font-headline font-black text-xl sm:text-2xl text-white tracking-tight">
                Express Digital Veneer Workflows for Travelling Patients
              </h4>
              <p className="text-slate-300 text-xs sm:text-sm leading-relaxed">
                Travelling from Madurai, Coimbatore, Kerala, or abroad? Pre-book your digital smile mock-up and diagnostic scans in advance for compressed, high-efficiency appointment scheduling.
              </p>
            </div>
            <button
              type="button"
              onClick={handleBookClick}
              className="inline-flex items-center gap-2.5 px-6 py-3.5 rounded-full bg-gradient-to-r from-brandSky to-brandBlue text-white font-headline font-bold text-xs uppercase tracking-wider shadow-lg hover:scale-105 transition-all shrink-0 cursor-pointer border-none"
            >
              <span>Schedule Express Visit</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </section>

      {/* ─── SECTION 6: Frequently Asked Questions (id="faqs") ─── */}
      <section
        id="faqs"
        className="w-full py-16 lg:py-24 bg-white relative scroll-mt-28 border-b border-slate-200/70 overflow-hidden"
      >
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-xs font-bold text-brandBlue uppercase tracking-wider font-headline block mb-2.5">
              Clear Clinical Guidance
            </span>
            <h2
              style={{ lineHeight: 1.4 }}
              className="text-2xl sm:text-3xl lg:text-[36px] font-extrabold font-headline text-slate-900 tracking-tight leading-[1.4]"
            >
              Frequently Asked{' '}
              <span className="bg-gradient-to-r from-brandBlue to-brandSky bg-clip-text text-transparent">
                Questions on Veneers &amp; Laminates
              </span>
            </h2>
            <p className="text-slate-600 text-sm sm:text-base leading-relaxed mt-3.5">
              Honest clinical answers regarding tooth preparation, longevity, natural aesthetics, and procedure comfort.
            </p>
          </div>

          <div className="space-y-3.5">
            {FAQS.map((faq, index) => {
              const isOpen = openFaq === index;
              return (
                <div
                  key={index}
                  className="rounded-2xl border border-slate-200/90 bg-white overflow-hidden shadow-xs transition-all duration-200 hover:border-brandSky/60 text-left"
                >
                  <button
                    type="button"
                    onClick={() => toggleFaq(index)}
                    className="w-full p-4.5 sm:p-5 text-left flex items-center justify-between gap-4 cursor-pointer hover:bg-slate-50/60 transition-colors"
                  >
                    <span className="font-headline font-bold text-sm sm:text-base text-slate-900 pr-2">
                      {index + 1}. {faq.q}
                    </span>
                    <div
                      className={`w-7 h-7 rounded-full flex items-center justify-center shrink-0 transition-transform duration-300 ${
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
                        <div className="p-4.5 sm:p-5 pt-0 text-xs sm:text-sm text-slate-600 leading-relaxed border-t border-slate-100">
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

      {/* ─── SECTION 7: Related Cosmetic & Smile Care Treatments ─── */}
      <section className="w-full py-16 lg:py-20 bg-slate-50/60 border-b border-slate-200/70">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mb-12 text-left">
            <span className="text-xs font-bold text-brandBlue uppercase tracking-wider font-headline block mb-2.5">
              Comprehensive Aesthetic Dentistry
            </span>
            <h2
              style={{ lineHeight: 1.4 }}
              className="text-2xl sm:text-3xl lg:text-[36px] font-extrabold font-headline text-slate-900 tracking-tight leading-[1.4]"
            >
              Related Treatments in{' '}
              <span className="bg-gradient-to-r from-brandBlue to-brandSky bg-clip-text text-transparent">
                Cosmetic &amp; Smile Care
              </span>
            </h2>
            <p className="text-slate-600 text-sm sm:text-base leading-relaxed mt-3.5">
              Explore alternative and complementary cosmetic smile options delivered by hospital specialists across Tamil Nadu.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {RELATED_TREATMENTS.map((item, idx) => (
              <Link
                key={idx}
                to={item.link}
                className={`bg-white rounded-3xl overflow-hidden border border-slate-200/80 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col group ${item.accentBorder}`}
              >
                {/* Framed Image Container */}
                <div className="relative p-3 pb-0">
                  <div className="relative rounded-2xl overflow-hidden bg-slate-50 aspect-[16/10] border border-slate-100 shadow-inner">
                    <img
                      src={item.image}
                      alt={item.alt}
                      className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute top-2.5 left-2.5">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-[10px] font-headline font-bold border backdrop-blur-md shadow-xs ${item.badgeColor}`}>
                        {item.badge}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="p-4 sm:p-5 flex flex-col flex-1 justify-between space-y-3 text-left">
                  <div>
                    <h3 className="font-headline font-bold text-base text-slate-900 group-hover:text-brandBlue transition-colors">
                      {item.title}
                    </h3>
                    <p className="text-slate-600 text-xs leading-relaxed mt-1.5">
                      {item.desc}
                    </p>
                  </div>

                  <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs font-headline font-bold text-brandBlue group-hover:text-brandSky transition-colors">
                    <span>Explore treatment</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Bottom CTA Banner (Dr. Binila Cutout & Compliant Dark Navy Format from PDF Page 5) ─── */}
      <TreatmentCtaBanner
        badgeText="COSMETIC SMILE EXCELLENCE"
        titlePrefix="Explore Your Veneer"
        highlightWord="Options at Jerush"
        titleSuffix="Across Tamil Nadu"
        subtitle="A well-planned veneer treatment should suit your natural smile, dental health, and personal preferences. At Jerush Dentofacial & Cosmetic Laser Centre, a cosmetic dental consultation can help you understand whether porcelain veneers, composite veneers, whitening, or another treatment is appropriate for you."
        primaryBtnText="Book a Smile Consultation"
        onPrimaryClick={handleBookClick}
        secondaryBtnText="Call +91 94891 60000"
        secondaryBtnPhone="+919489160000"
        doctorImage="/images/doctors/dr-binila-portrait.webp"
        doctorName="DR. C. BINILA BLADBIN"
        doctorRole="Director &amp; Oral Surgeon (MDS)"
      />
    </div>
  );
}

