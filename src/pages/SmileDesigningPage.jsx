import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Sparkles, ShieldCheck, Calendar, Phone, CheckCircle2, Clock,
  Award, Smile, ArrowRight, Info, Check, HelpCircle, AlertCircle,
  MapPin, ChevronRight, ChevronDown, Eye, Compass, Shield,
  Stethoscope, AlertTriangle, Layers, CheckSquare, Activity,
  Waves, Sparkle, RefreshCw, Scissors, Heart, Palette, Sliders,
  Camera, Zap, Maximize2, FileCheck, Navigation
} from 'lucide-react';
import PageBreadcrumbHero from '../components/common/PageBreadcrumbHero';
import TreatmentCtaBanner from '../components/common/TreatmentCtaBanner';
import TreatmentSectionNav from '../components/common/TreatmentSectionNav';
import TreatmentAppointmentForm from '../components/common/TreatmentAppointmentForm';
import useTreatmentScrollSpy from '../hooks/useTreatmentScrollSpy';

// Key Stats Bar Data
const STATS = [
  { value: '1:1.618', label: 'Golden Ratio Precision' },
  { value: '100% Digital', label: '3D Simulation & Mock-Up' },
  { value: '25,000+', label: 'Smiles Transformed' },
  { value: '4 Regional Centres', label: 'Centres of Excellence' }
];

// Sticky Navigation Tabs
const TABS = [
  { id: 'parameters', label: 'Aesthetic Analysis' },
  { id: 'workflow', label: '5-Stage Design Journey' },
  { id: 'palette', label: 'Treatment Palette' },
  { id: 'preservation', label: 'Smile Longevity' },
  { id: 'locations', label: 'Regional Smile Studios' },
  { id: 'faqs', label: 'Cosmetic FAQs' }
];

// Section 1: 4 Core Aesthetic Parameters of Smile Design (from PDF Page 1 & 2)
const AESTHETIC_PARAMETERS = [
  {
    id: 'gaps-uneven',
    title: 'Gaps & Uneven Teeth',
    category: 'Alignment & Spacing',
    summary: 'Correcting midline diastema, irregular incisal edges, and minor overlap to achieve fluid smile continuity.',
    image: '/images/medical-services/dental-care/cosmetic-dentistry/smile-designing/gaps-and-uneven-teeth.webp',
    alt: 'Midline diastema gap and uneven tooth edges before smile designing',
    clinicalAnalysis: 'Spacing discrepancies disrupt bilateral harmony and draw unwanted visual tension away from facial features.',
    solutions: [
      'Minimal-prep composite bonding for single-visit gap closure',
      'Ultra-thin ceramic veneers for permanent proportion balance',
      'Jerushaligne clear aligners for biological arch alignment'
    ],
    idealFor: 'Patients with noticeable central gaps or worn, chipped enamel edges.'
  },
  {
    id: 'colour-staining',
    title: 'Tooth Colour & Staining',
    category: 'Shade & Brightness',
    summary: 'Eliminating stubborn intrinsic discoloration, fluorosis, and deep dietary stains for radiant enamel luminescence.',
    image: '/images/medical-services/dental-care/cosmetic-dentistry/smile-designing/tooth-color-and-staining.webp',
    alt: 'Severe tooth discoloration and enamel staining evaluated for cosmetic smile design',
    clinicalAnalysis: 'Natural teeth display varying translucencies from gingival collar to incisal edge, requiring multi-layered shade matching.',
    solutions: [
      'In-office laser-assisted teeth whitening (up to 8 shades lighter)',
      'Porcelain veneers to mask deep fluorosis or tetracycline staining',
      'Conservative enamel micro-abrasion for superficial spots'
    ],
    idealFor: 'Individuals with age-related yellowing, coffee/tea stains, or medication-related discoloration.'
  },
  {
    id: 'shape-proportion',
    title: 'Tooth Shape & Proportion',
    category: 'Dental Architecture',
    summary: 'Refining width-to-length dimensions, rounded line angles, and individual tooth shapes to flatter facial gender and contour.',
    image: '/images/medical-services/dental-care/cosmetic-dentistry/smile-designing/tooth-shape-and-proportion.webp',
    alt: 'Evaluation of tooth shape, width-to-length ratio, and incisal proportions',
    clinicalAnalysis: 'The central incisors set the dominant aesthetic tone, ideally following a 75% to 80% width-to-height aesthetic ratio.',
    solutions: [
      'Custom cosmetic ceramic laminates crafted by master ceramists',
      'Artistic direct composite sculpting for pegged lateral incisors',
      'Enamel recontouring to smooth jagged or uneven canine tips'
    ],
    idealFor: 'Teeth that appear abnormally small, square, worn flat, or disproportionately narrow.'
  },
  {
    id: 'gum-balance',
    title: 'Smile & Gum Balance',
    category: 'Pink & White Harmony',
    summary: 'Harmonising the relationship between teeth and visible gumline to eliminate excessive gingival display or asymmetry.',
    image: '/images/medical-services/dental-care/cosmetic-dentistry/smile-designing/smile-gum-balance.webp',
    alt: 'Harmonising the gumline aesthetic and dental exposure during a full smile',
    clinicalAnalysis: 'Gingival zeniths should follow the curve of the upper lip, creating a graceful, symmetrical frame around every tooth.',
    solutions: [
      'Painless laser gingival recontouring (gum lift)',
      'Aesthetic crown lengthening to reveal hidden natural crown length',
      'Minimally invasive lip repositioning for high smile lines'
    ],
    idealFor: 'Patients with a "gummy smile", uneven gum scalloping, or short clinical crowns.'
  }
];

// Section 2: 5-Stage Step-by-Step Smile Design Journey (from PDF Page 2 & 3)
const DESIGN_WORKFLOW = [
  {
    stage: '01',
    title: 'Understanding Your Personal Goals',
    phase: 'Consultation & Vision Discovery',
    desc: 'You sit down with our cosmetic dental surgeon to discuss what you love about your smile and what you wish to refine—from shade preference to tooth length.',
    image: '/images/medical-services/dental-care/cosmetic-dentistry/smile-designing/understanding-your-goals.webp',
    alt: 'Cosmetic dentist discussing smile goals and aesthetic preferences with patient at Jerush',
    deliverables: ['Face & smile aesthetic questionnaire', 'Personalised expectation alignment', 'Timeline & lifestyle assessment']
  },
  {
    stage: '02',
    title: 'Evaluating Complete Dental Health',
    phase: 'Diagnostic Facial & Oral Assessment',
    desc: 'We perform high-definition photographic studio portraits, 3D intraoral digital scans, and low-radiation digital X-rays to assess gums, bite, and jaw relationship.',
    image: '/images/medical-services/dental-care/cosmetic-dentistry/smile-designing/evaluating-dental-health.webp',
    alt: 'Comprehensive oral health and facial symmetry diagnostic evaluation at Jerush',
    deliverables: ['3D digital intraoral scan', 'Facial & occlusal photographic series', 'Periodontal & enamel integrity review']
  },
  {
    stage: '03',
    title: 'Planning Suitable Treatments',
    phase: 'Multidisciplinary Blueprint',
    desc: 'Your treatment plan is custom-crafted to your dental needs, aesthetic priorities, and budget—combining micro-invasive options with restorative precision.',
    image: '/images/medical-services/dental-care/cosmetic-dentistry/smile-designing/planning-suitable-treatments.webp',
    alt: 'Multidisciplinary cosmetic treatment planning and material selection',
    deliverables: ['Step-by-step treatment road map', 'Transparent cost & EMI breakdown', 'Structure-preserving clinical options']
  },
  {
    stage: '04',
    title: 'Reviewing the Proposed Smile',
    phase: 'Digital Simulation & Trial Mock-Up',
    desc: 'Before any treatment starts, digital smile simulations and in-mouth temporary mock-ups allow you to preview and "test-drive" your new smile in real life.',
    image: '/images/medical-services/dental-care/cosmetic-dentistry/smile-designing/reviewing-proposed-smile.webp',
    alt: 'Digital simulation and in-mouth diagnostic mock-up preview for smile designing',
    deliverables: ['Interactive 3D digital simulation', 'In-mouth diagnostic acrylic mock-up', 'Patient feedback & fine-tuning']
  },
  {
    stage: '05',
    title: 'Carrying Out Precision Treatment',
    phase: 'Artistic Clinical Execution',
    desc: 'Agreed procedures are performed with gentle pacing and local anaesthesia comfort, followed by detailed aftercare guidance and clinical review.',
    image: '/images/medical-services/dental-care/cosmetic-dentistry/smile-designing/carrying-out-treatment.webp',
    alt: 'Cosmetic dental specialist executing gentle smile design procedure at Jerush',
    deliverables: ['Painless microscopic execution', 'High-gloss aesthetic finishing', 'Long-term maintenance protocol']
  }
];

// Section 3: 6 Treatments in the Smile Designing Palette (from PDF Page 3)
const TREATMENT_PALETTE = [
  {
    id: 'teeth-whitening',
    title: 'Teeth Whitening',
    role: 'Enamel Brightening',
    desc: 'Safely lightens natural tooth enamel by up to 8 shades in a single in-office laser visit without altering tooth structure.',
    image: '/images/medical-services/dental-care/cosmetic-dentistry/smile-designing/teeth-whitening.webp',
    alt: 'Professional in-office teeth whitening treatment at Jerush',
    invasiveness: 'Non-Invasive',
    longevity: '12 - 24 Months',
    badgeColor: 'bg-amber-50 text-amber-700 border-amber-200'
  },
  {
    id: 'composite-bonding',
    title: 'Composite Bonding',
    role: 'Micro-Invasive Sculpting',
    desc: 'Direct composite resin is layered and hand-sculpted to repair chipped edges, close small gaps, and refine shape in one sitting.',
    image: '/images/medical-services/dental-care/cosmetic-dentistry/smile-designing/composite-bonding.webp',
    alt: 'Cosmetic composite dental bonding for chipped tooth restoration',
    invasiveness: 'Micro-Invasive',
    longevity: '5 - 8 Years',
    badgeColor: 'bg-blue-50 text-brandBlue border-blue-200'
  },
  {
    id: 'dental-veneers',
    title: 'Dental Veneers',
    role: 'Porcelain & Ceramic Artistry',
    desc: 'Ultra-thin, custom-fabricated ceramic shells bonded to the front surfaces of teeth for transformative color, symmetry, and contour.',
    image: '/images/medical-services/dental-care/cosmetic-dentistry/smile-designing/dental-veneers.webp',
    alt: 'Ultra-thin porcelain dental veneers placed on natural teeth',
    invasiveness: 'Minimally Invasive',
    longevity: '10 - 15+ Years',
    badgeColor: 'bg-sky-50 text-brandSky border-sky-200'
  },
  {
    id: 'orthodontic-alignment',
    title: 'Orthodontic Alignment',
    role: 'Biological Tooth Repositioning',
    desc: 'Discreet clear aligners (Jerushaligne) or lingual/ceramic braces align crowded or rotated teeth before final cosmetic finishing.',
    image: '/images/medical-services/dental-care/cosmetic-dentistry/smile-designing/orthodontic-treatment.webp',
    alt: 'Orthodontic tooth alignment and invisible aligners prior to cosmetic smile design',
    invasiveness: 'Non-Invasive Biological',
    longevity: 'Permanent (With Retainer)',
    badgeColor: 'bg-emerald-50 text-emerald-700 border-emerald-200'
  },
  {
    id: 'gum-contouring',
    title: 'Aesthetic Gum Contouring',
    role: 'Gingival Zenith Balancing',
    desc: 'Gentle dental laser reshaping of uneven or excessive gum tissue to reveal more natural tooth length and balance a gummy smile.',
    image: '/images/medical-services/dental-care/cosmetic-dentistry/smile-designing/gum-contouring.webp',
    alt: 'Laser gum contouring and gingival balance for smile aesthetics',
    invasiveness: 'Soft-Tissue Laser',
    longevity: 'Permanent',
    badgeColor: 'bg-rose-50 text-rose-700 border-rose-200'
  },
  {
    id: 'crowns-restorations',
    title: 'Crowns & Aesthetic Restorations',
    role: 'Structural & Cosmetic Reinforcement',
    desc: 'High-strength monolithic zirconia or E.max ceramic crowns protect heavily worn, root-canal-treated, or broken teeth seamlessly.',
    image: '/images/medical-services/dental-care/cosmetic-dentistry/smile-designing/crowns-other-restorations.webp',
    alt: 'High-strength aesthetic ceramic crowns and restorative dental bridges',
    invasiveness: 'Restorative Coverage',
    longevity: '15 - 20+ Years',
    badgeColor: 'bg-purple-50 text-purple-700 border-purple-200'
  }
];

// Section 4: 5 Longevity & Maintenance Protocols (from PDF Page 4)
const LONGEVITY_PROTOCOLS = [
  {
    id: 'brush-daily',
    title: 'Brush Twice Daily with Fluoride Paste',
    desc: 'Clean teeth and restorations for two full minutes twice daily. Use a soft-bristled brush and non-abrasive paste to protect ceramic glaze and composite polish.',
    image: '/images/medical-services/dental-care/cosmetic-dentistry/smile-designing/brush-twice-daily.webp',
    alt: 'Diligent daily toothbrushing with soft bristles to protect cosmetic restorations',
    tip: 'Avoid coarse abrasive charcoal toothpastes'
  },
  {
    id: 'regular-checkup',
    title: 'Attend Regular Dental Check-ups',
    desc: 'Visit our hospital every six months for routine dental examinations and professional ultrasonic cleaning to maintain gum health and inspect bonding margins.',
    image: '/images/medical-services/dental-care/cosmetic-dentistry/smile-designing/dental-checkup.webp',
    alt: 'Routine bi-annual dental check-up and prophylaxis at Jerush hospital',
    tip: 'Professional cleanings preserve porcelain gloss'
  },
  {
    id: 'avoid-hard-objects',
    title: 'Avoid Biting Hard Objects & Packaging',
    desc: 'Never use cosmetic restorations to open bottle caps, tear plastic packages, or chew on ice cubes, hard nut shells, or pens.',
    image: '/images/medical-services/dental-care/cosmetic-dentistry/smile-designing/avoid-biting-hard-objects.webp',
    alt: 'Protecting front teeth and veneers from hard biting forces',
    tip: 'Use appropriate tools rather than teeth to open items'
  },
  {
    id: 'nightguard-advice',
    title: 'Follow Advice for Night-time Grinding',
    desc: 'If you clench or grind your teeth during sleep (bruxism), wear a custom-moulded nightguard to safeguard porcelain veneers and composite resins from heavy occlusal forces.',
    image: '/images/medical-services/dental-care/cosmetic-dentistry/smile-designing/follow-your-dentists-advice.webp',
    alt: 'Wearing custom nightguard to protect cosmetic restorations against bruxism',
    tip: 'Custom nightguards absorb nocturnal forces'
  },
  {
    id: 'touch-ups',
    title: 'Maintain Whitening & Restorative Touch-ups',
    desc: 'Natural enamel can pick up daily dietary pigments over time. Periodic touch-up whitening and composite repolishing ensure your smile stays vivid and youthful.',
    image: '/images/medical-services/dental-care/cosmetic-dentistry/smile-designing/whitening-restorative-treatments.webp',
    alt: 'Periodic cosmetic touch-ups and maintenance of dental restorations',
    tip: 'Refill whitening trays as advised by your doctor'
  }
];

// Section 5: Regional Locations & Service Centers (Fulfilling user request for location-based names)
const REGIONAL_LOCATIONS = [
  {
    name: 'Thuckalay (Central Hospital)',
    region: 'Kanyakumari District Headquarters',
        highlight: 'Advanced Digital Smile Studio & Surgical Laser Wing',
    serving: 'Serving Thuckalay, Marthandam, Karungal, Colachel, Kulasekharam, Padmanabhapuram, Eraniel & Kaliakkavilai.',
    badge: 'Flagship Multispecialty Hospital'
  },
  {
    name: 'Nagercoil Regional Centre',
    region: 'Southern Tamil Nadu Hub',
        highlight: 'Comprehensive Cosmetic & Orthodontic Outpatient Wing',
    serving: 'Serving Nagercoil Town, Kanyakumari Coast, Suchindram, Agastheeswaram, Valliyoor, Radhapuram & Southern Tirunelveli.',
    badge: 'Specialist Regional Centre'
  },
  {
    name: 'Tirunelveli & Madurai Corridor',
    region: 'Southern Highway Patient Access',
        highlight: 'Dedicated Smile Makeover & Tertiary Dental Concierge',
    serving: 'Catering to travelling patients from Tirunelveli, Palayamkottai, Madurai, Tuticorin, Kovilpatti & Virudhunagar.',
    badge: 'Regional Referral Network'
  },
  {
    name: 'Trichy Regional Centre',
    region: 'Central Tamil Nadu Hub',
        highlight: 'Aesthetic Dentistry, Implants & Digital Orthodontics',
    serving: 'Serving Tiruchirappalli, Thanjavur, Karur, Pudukkottai, Dindigul, Perambalur & Central Tamil Nadu districts.',
    badge: 'Centres of Excellence'
  },
  {
    name: 'Chennai Regional Centre',
    region: 'Metropolitan & International Hub',
        highlight: 'Smile Design Studio & International Patient Lounge',
    serving: 'Serving Greater Chennai, Kanchipuram, Chengalpattu & Global Dental Tourism patients from Sri Lanka, Singapore, Malaysia & Gulf.',
    badge: 'Metro Smile Suite'
  },
  {
    name: 'Cross-Border Kerala Access',
    region: 'Trivandrum & South Kerala Border',
        highlight: 'Cross-Border Cosmetic Dentistry & Transparent Care',
    serving: 'Serving Trivandrum (Thiruvananthapuram), Neyyattinkara, Balaramapuram, Parasala & Poovar.',
    badge: 'Cross-Border Access'
  }
];

// 7 FAQs from PDF Page 4 & 5
const FAQS = [
  {
    q: 'What is smile designing in dentistry?',
    a: 'Smile designing is a personalised treatment-planning approach that considers the appearance of your teeth, gums, lips, and facial symmetry to identify suitable cosmetic or restorative options. Rather than treating a single tooth in isolation, it plans harmonious changes across your entire smile.'
  },
  {
    q: 'Is smile designing suitable for everyone?',
    a: 'Many people can explore cosmetic dental options, but the appropriate treatment depends on your oral health, gum condition, bite dynamics, and individual aesthetic goals. Existing dental problems such as active decay or periodontal disease must be treated first to establish a healthy foundation.'
  },
  {
    q: 'Does smile designing always involve veneers?',
    a: 'No. Some people achieve their desired smile with professional teeth whitening, composite bonding, orthodontic alignment, or a thoughtful combination of conservative options. Porcelain veneers are only one possible treatment modality and are reserved for cases requiring structural or permanent shade modification.'
  },
  {
    q: 'Can smile designing close gaps between teeth?',
    a: 'Yes. Depending on the size of the gaps and the underlying cause, options may include orthodontic treatment (such as Jerushaligne clear aligners), cosmetic composite bonding, or ceramic veneers. Your dentist will explain which approach best preserves your natural tooth structure.'
  },
  {
    q: 'How long does smile designing take?',
    a: 'The timeline depends on the procedures involved. Teeth whitening or direct composite bonding can often be completed in one or two visits. Orthodontic alignment or multi-unit ceramic restorative treatments typically take several weeks to months to complete properly.'
  },
  {
    q: 'Are smile designing results permanent?',
    a: 'No cosmetic treatment lasts indefinitely. Results vary by procedure, and restorations may eventually require maintenance, repolishing, or replacement over time. Diligent daily oral hygiene, avoiding excessive biting forces, and regular dental check-ups are essential to maximize longevity.'
  },
  {
    q: 'Can I see my proposed smile before treatment starts?',
    a: 'Yes. Digital smile simulations and trial intraoral mock-ups are available for selected treatments. They help you visualize proposed changes in your own mouth and provide valuable feedback before any permanent treatment begins.'
  }
];

// Related Cosmetic & Restorative Treatments
const RELATED_TREATMENTS = [
  {
    title: 'Dental Veneers & Laminates',
    desc: 'Custom-crafted porcelain shells that transform tooth color, shape, and symmetry with lifelong natural radiance.',
    image: '/images/medical-services/dental-care/cosmetic-dentistry/smile-designing/dental-veneers.webp',
    alt: 'Dental porcelain veneers for smile aesthetics at Jerush',
    link: '/treatments/dental-veneers',
    badge: 'Aesthetic Porcelain',
    badgeColor: 'bg-sky-50 text-brandSky border-brandSky/20',
    accentBorder: 'hover:border-brandSky/60'
  },
  {
    title: 'Professional Teeth Whitening',
    desc: 'In-office laser whitening designed to safely lighten enamel discoloration by up to 8 shades in a single session.',
    image: '/images/medical-services/dental-care/cosmetic-dentistry/smile-designing/teeth-whitening.webp',
    alt: 'Laser teeth whitening treatment at Jerush',
    link: '/treatments/teeth-whitening',
    badge: 'Bright Radiance',
    badgeColor: 'bg-amber-50 text-amber-700 border-amber-200',
    accentBorder: 'hover:border-amber-400/60'
  },
  {
    title: 'Jerushaligne Clear Aligners',
    desc: 'Custom invisible 3D aligners designed to straighten teeth comfortably without fixed metal brackets or wires.',
    image: '/images/medical-services/dental-care/jerushaligne/virtually-invisible.webp',
    alt: 'Jerushaligne clear aligners treatment at Jerush',
    link: '/dental-care/orthodontic-care/clear-aligners-jerushaligne',
    badge: 'Invisible Orthodontics',
    badgeColor: 'bg-emerald-50 text-emerald-700 border-emerald-200',
    accentBorder: 'hover:border-emerald-500/60'
  },
  {
    title: 'Tooth Jewellery & Gems',
    desc: 'Certified crystal gems and gold ornaments bonded safely to natural enamel without drilling or tooth damage.',
    image: '/images/medical-services/dental-care/cosmetic-dentistry/tooth-jewellery/personal-touch.webp',
    alt: 'Cosmetic tooth jewellery bonding at Jerush',
    link: '/dental-care/cosmetic-dentistry/tooth-jewellery',
    badge: 'Smile Sparkle',
    badgeColor: 'bg-purple-50 text-purple-700 border-purple-200',
    accentBorder: 'hover:border-purple-500/60'
  }
];

export default function SmileDesigningPage() {
  const navigate = useNavigate();
  const [activeParam, setActiveParam] = useState(AESTHETIC_PARAMETERS[0].id);
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
    document.title = 'Smile Designing Treatment | Cosmetic Dentistry – Jerush';

    let metaDesc = document.querySelector('meta[name="description"]');
    if (!metaDesc) {
      metaDesc = document.createElement('meta');
      metaDesc.name = 'description';
      document.head.appendChild(metaDesc);
    }
    metaDesc.content = 'Explore smile designing at Jerush. Learn about teeth whitening, veneers, bonding, orthodontics, and personalised options for a balanced, natural-looking smile.';

    let metaKeywords = document.querySelector('meta[name="keywords"]');
    if (!metaKeywords) {
      metaKeywords = document.createElement('meta');
      metaKeywords.name = 'keywords';
      document.head.appendChild(metaKeywords);
    }
    metaKeywords.content = 'Smile designing, smile design treatment, cosmetic dentistry, smile makeover, dental veneers, teeth whitening, cosmetic dental bonding, Tamil Nadu, Thuckalay, Nagercoil, Chennai, Trichy';

    // Inject FAQ Schema
    const faqSchemaScript = document.createElement('script');
    faqSchemaScript.type = 'application/ld+json';
    faqSchemaScript.id = 'faq-schema-smile-designing';
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
      const existingScript = document.getElementById('faq-schema-smile-designing');
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

  const currentParameter = AESTHETIC_PARAMETERS.find(p => p.id === activeParam) || AESTHETIC_PARAMETERS[0];

  return (
    <div className="w-full font-body text-left relative min-h-screen text-slate-800 bg-white">
      {/* ─── Breadcrumb Hero ─── */}
      <PageBreadcrumbHero
        title="Smile Designing"
        breadcrumbs={[
          { label: 'Dental Care', path: '/treatments' },
          { label: 'Cosmetic Dentistry', path: '/treatments?category=dental&sub=Cosmetic%20Dentistry' },
          { label: 'Smile Designing', active: true }
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
                  Jerush Dentofacial & Cosmetic Laser Centre
                </span>
                <h1
                  style={{ lineHeight: 1.4 }}
                  className="text-3xl sm:text-4xl lg:text-[40px] xl:text-[44px] font-extrabold font-headline tracking-tight leading-[1.4] text-slate-900"
                >
                  A Smile Designed:{' '}
                  <span className="bg-gradient-to-r from-brandBlue to-brandSky bg-clip-text text-transparent">
                    Artistically Crafted Around Your Facial Features
                  </span>
                </h1>
                <p className="text-slate-600 text-base sm:text-lg leading-relaxed mt-4">
                  A beautiful smile is about more than straight, white teeth. The shape, size, colour, alignment, and proportions of your teeth all contribute to the way your smile looks. Smile designing is a personalised approach to improving these features while considering your unique facial appearance, natural dentition, and individual aesthetic goals.
                </p>
                <div className="mt-4 p-4.5 rounded-2xl bg-white/95 backdrop-blur-sm border border-slate-200/90 shadow-sm space-y-2">
                  <p className="text-slate-700 text-sm sm:text-base leading-relaxed">
                    At <strong className="text-slate-900 font-semibold">Jerush Dentofacial & Cosmetic Laser Centre</strong>, smile designing focuses on identifying the changes that may help you achieve a balanced, natural-looking smile. Depending on your dental condition, treatment may involve one gentle procedure or a coordinated combination of cosmetic and restorative dental treatments.
                  </p>
                  <p className="text-slate-600 text-xs sm:text-sm leading-relaxed pt-1 border-t border-slate-100">
                    Comprehensive digital smile planning consultations are available across our hospital centres in Thuckalay, Nagercoil, Trichy, and Chennai with flexible monthly EMI payment options.
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
                  <span>3D Digital Smile Simulation & Trial Mock-Up</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Check className="w-4 h-4 text-brandBlue shrink-0" />
                  <span>Facial Aesthetic Harmony & Golden Proportion</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Check className="w-4 h-4 text-brandBlue shrink-0" />
                  <span>Structure-Preserving Minimal-Prep Philosophy</span>
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
                    src="/images/medical-services/dental-care/cosmetic-dentistry/smile-designing/smile-design-around-you.webp"
                    alt="Natural-looking smile showing balanced teeth and healthy gums for cosmetic smile designing"
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
        treatmentName="Smile Designing"
        title="Book a Smile Designing Consultation"
        highlightWord="Personalised Cosmetic Care"
        subtitle="Experience digital aesthetic planning tailored to your face, lips, and tooth contours. Consult with hospital specialists across Tamil Nadu."
        features={[
          {
            icon: Sparkles,
            title: 'Facial Aesthetic Analysis',
            desc: 'Digital golden ratio measurements that balance teeth with your lips, eyes, and facial midline.'
          },
          {
            icon: Camera,
            title: 'Digital 3D Smile Preview',
            desc: 'Preview and test-drive your proposed new smile with temporary mock-ups before any treatment begins.'
          },
          {
            icon: Award,
            title: 'Multidisciplinary Team',
            desc: 'Coordinated care by cosmetic surgeons, prosthodontists, orthodontists, and master ceramists.'
          },
          {
            icon: MapPin,
            title: '4 Regional Centres',
            desc: 'Convenient specialist aesthetic appointments in Thuckalay, Nagercoil, Trichy, and Chennai.'
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

      {/* ─── UNIQUE SECTION 1: The Clinical Smile Architecture Matrix (id="parameters") ─── */}
      <section
        id="parameters"
        className="w-full py-16 lg:py-24 bg-gradient-to-b from-slate-50 via-sky-50/20 to-white relative scroll-mt-28 border-b border-slate-200/70 overflow-hidden"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mb-12 text-left">
            <span className="text-xs font-bold text-brandBlue uppercase tracking-wider font-headline block mb-2.5">
              Clinical Aesthetic Diagnostic Matrix
            </span>
            <h2
              style={{ lineHeight: 1.4 }}
              className="text-2xl sm:text-3xl lg:text-[36px] font-extrabold font-headline text-slate-900 tracking-tight leading-[1.4]"
            >
              What Can Smile Designing{' '}
              <span className="bg-gradient-to-r from-brandBlue to-brandSky bg-clip-text text-transparent">
                Improve?
              </span>
            </h2>
            <p className="text-slate-600 text-sm sm:text-base leading-relaxed mt-3.5">
              Smile designing addresses specific cosmetic concerns while respecting your natural oral anatomy and gum health. Explore the four core aesthetic dimensions analyzed by our clinical team:
            </p>
          </div>

          {/* Interactive Navigation Pills for the 4 Parameters */}
          <div className="flex flex-wrap items-center gap-3 mb-8">
            {AESTHETIC_PARAMETERS.map(param => (
              <button
                key={param.id}
                type="button"
                onClick={() => setActiveParam(param.id)}
                className={`px-5 py-2.5 rounded-full font-headline font-bold text-xs sm:text-sm tracking-wider uppercase transition-all duration-300 cursor-pointer ${
                  activeParam === param.id
                    ? 'bg-gradient-to-r from-brandSky to-brandBlue text-white shadow-md shadow-brandSky/25 scale-[1.02]'
                    : 'bg-white text-slate-700 border border-slate-200/80 hover:bg-slate-50'
                }`}
              >
                {param.title}
              </button>
            ))}
          </div>

          {/* Featured Active Parameter Interactive Showcase */}
          <div className="bg-white rounded-3xl border border-slate-200/90 shadow-xl overflow-hidden p-6 sm:p-8 lg:p-10 mb-12">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
              {/* Left Column: 1:1 Native Square Image Frame (Zero Cropping) */}
              <div className="lg:col-span-5">
                <div className="relative rounded-2xl overflow-hidden bg-slate-50 aspect-square border border-slate-200/80 shadow-md group">
                  <img
                    src={currentParameter.image}
                    alt={currentParameter.alt}
                    className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute top-3 left-3">
                    <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-headline font-bold bg-white/95 text-brandBlue border border-slate-200 shadow-xs backdrop-blur-md">
                      {currentParameter.category}
                    </span>
                  </div>
                </div>
              </div>

              {/* Right Column: In-Depth Clinical Evaluation & Solutions */}
              <div className="lg:col-span-7 space-y-5 text-left">
                <div>
                  <h3 className="font-headline font-extrabold text-2xl sm:text-3xl text-slate-900 tracking-tight">
                    {currentParameter.title}
                  </h3>
                  <p className="text-slate-600 text-sm sm:text-base leading-relaxed mt-2.5">
                    {currentParameter.summary}
                  </p>
                </div>

                <div className="p-4.5 rounded-2xl bg-sky-50/70 border border-brandSky/25 space-y-1.5">
                  <span className="text-xs font-bold text-brandBlue uppercase tracking-wider font-headline block">
                    Clinical Aesthetic Rationale
                  </span>
                  <p className="text-slate-700 text-xs sm:text-sm leading-relaxed">
                    {currentParameter.clinicalAnalysis}
                  </p>
                </div>

                <div className="space-y-2.5">
                  <span className="text-xs font-bold text-slate-800 uppercase tracking-wider font-headline block">
                    Specialist Cosmetic Solutions Available at Jerush
                  </span>
                  <div className="space-y-2">
                    {currentParameter.solutions.map((sol, idx) => (
                      <div key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-700">
                        <Check className="w-4 h-4 text-brandBlue shrink-0 mt-0.5" />
                        <span>{sol}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="pt-2 border-t border-slate-100 flex items-center gap-2 text-xs text-slate-500">
                  <Sparkles className="w-4 h-4 text-brandSky shrink-0" />
                  <span><strong>Ideal Candidate:</strong> {currentParameter.idealFor}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Complete 4-Card Overview for Quick Comparison */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {AESTHETIC_PARAMETERS.map(param => (
              <div
                key={param.id}
                onClick={() => setActiveParam(param.id)}
                className={`bg-white rounded-2xl overflow-hidden border p-4 transition-all duration-300 cursor-pointer flex flex-col justify-between ${
                  activeParam === param.id
                    ? 'border-brandBlue ring-2 ring-brandBlue/20 shadow-md'
                    : 'border-slate-200/80 hover:border-brandSky/50 hover:shadow-sm'
                }`}
              >
                <div className="relative rounded-xl overflow-hidden bg-slate-50 aspect-square mb-3.5">
                  <img
                    src={param.image}
                    alt={param.alt}
                    className="w-full h-full object-cover object-center"
                  />
                </div>
                <div>
                  <h4 className="font-headline font-bold text-sm text-slate-900">{param.title}</h4>
                  <p className="text-slate-500 text-xs mt-1 line-clamp-2">{param.summary}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── UNIQUE SECTION 2: The 5-Phase Smile Design Journey (id="workflow") ─── */}
      <section
        id="workflow"
        className="w-full py-16 lg:py-24 bg-white relative scroll-mt-28 border-b border-slate-200/70 overflow-hidden"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mb-14 text-left">
            <span className="text-xs font-bold text-brandBlue uppercase tracking-wider font-headline block mb-2.5">
              Structured Clinical Workflow
            </span>
            <h2
              style={{ lineHeight: 1.4 }}
              className="text-2xl sm:text-3xl lg:text-[36px] font-extrabold font-headline text-slate-900 tracking-tight leading-[1.4]"
            >
              Your Smile Designing{' '}
              <span className="bg-gradient-to-r from-brandBlue to-brandSky bg-clip-text text-transparent">
                Journey: From Concept to Reveal
              </span>
            </h2>
            <p className="text-slate-600 text-sm sm:text-base leading-relaxed mt-3.5">
              Smile design begins with listening closely to what you want to change, thoroughly analyzing your oral health, and letting you test-drive your smile before finalizing any procedure.
            </p>
          </div>

          {/* Stepper Timeline Workflow */}
          <div className="space-y-8 lg:space-y-12">
            {DESIGN_WORKFLOW.map((stage, idx) => {
              const isEven = idx % 2 === 1;
              return (
                <motion.div
                  key={stage.stage}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: idx * 0.08 }}
                  className="bg-slate-50/70 rounded-3xl border border-slate-200/90 shadow-sm hover:shadow-md transition-all p-6 sm:p-8 lg:p-10"
                >
                  <div className={`grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center ${isEven ? 'lg:flex-row-reverse' : ''}`}>
                    {/* Visual Card (16:10 Aspect matching 1536x1024 & 1374x1145) */}
                    <div className={`lg:col-span-5 ${isEven ? 'lg:order-2' : 'lg:order-1'}`}>
                      <div className="relative rounded-2xl overflow-hidden bg-white border border-slate-200/90 shadow-md aspect-[16/11] group">
                        <img
                          src={stage.image}
                          alt={stage.alt}
                          className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700"
                        />
                        <div className="absolute top-3 left-3">
                          <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-headline font-black bg-brandBlue text-white shadow-xs">
                            PHASE {stage.stage}
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Content */}
                    <div className={`lg:col-span-7 space-y-4 text-left ${isEven ? 'lg:order-1' : 'lg:order-2'}`}>
                      <div>
                        <span className="text-xs font-bold text-brandSky uppercase tracking-wider font-headline block">
                          {stage.phase}
                        </span>
                        <h3 className="font-headline font-extrabold text-2xl sm:text-3xl text-slate-900 tracking-tight mt-1">
                          {stage.title}
                        </h3>
                        <p className="text-slate-600 text-sm sm:text-base leading-relaxed mt-3">
                          {stage.desc}
                        </p>
                      </div>

                      <div className="pt-2 border-t border-slate-200/80">
                        <span className="text-xs font-bold text-slate-800 uppercase tracking-wider font-headline block mb-2">
                          Key Clinical Milestones
                        </span>
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                          {stage.deliverables.map((item, dIdx) => (
                            <div key={dIdx} className="flex items-center gap-2 p-2.5 rounded-xl bg-white border border-slate-200/80 text-xs text-slate-700 font-medium shadow-2xs">
                              <CheckCircle2 className="w-3.5 h-3.5 text-brandBlue shrink-0" />
                              <span>{item}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>

          {/* Mock-Up Clinical Transparency Note */}
          <div className="mt-10 p-5 sm:p-6 rounded-2xl bg-sky-50/80 border border-sky-200 shadow-xs flex flex-col sm:flex-row items-start sm:items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-white border border-sky-300 text-brandBlue flex items-center justify-center shrink-0 shadow-2xs">
              <Info className="w-6 h-6" />
            </div>
            <div className="space-y-1 text-left">
              <h4 className="font-headline font-bold text-sm sm:text-base text-slate-900">
                Digital Simulation & Diagnostic Mock-Up Disclaimer
              </h4>
              <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">
                Digital simulations and trial intraoral mock-ups are clinical planning aids that help visualize possible aesthetic changes. They communicate proposed aesthetic transformations but are not intended as absolute guarantees of final biological results.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ─── UNIQUE SECTION 3: The Multidisciplinary Cosmetic Treatment Palette (id="palette") ─── */}
      <section
        id="palette"
        className="w-full py-16 lg:py-24 bg-gradient-to-b from-slate-50 via-sky-50/20 to-white relative scroll-mt-28 border-b border-slate-200/70 overflow-hidden"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mb-14 text-left">
            <span className="text-xs font-bold text-brandBlue uppercase tracking-wider font-headline block mb-2.5">
              Multidisciplinary Clinical Toolset
            </span>
            <h2
              style={{ lineHeight: 1.4 }}
              className="text-2xl sm:text-3xl lg:text-[36px] font-extrabold font-headline text-slate-900 tracking-tight leading-[1.4]"
            >
              Treatments That May Be Part of{' '}
              <span className="bg-gradient-to-r from-brandBlue to-brandSky bg-clip-text text-transparent">
                Your Smile Design
              </span>
            </h2>
            <p className="text-slate-600 text-sm sm:text-base leading-relaxed mt-3.5">
              Smile designing is not one rigid, fixed procedure. Depending on your dental health, enamel thickness, and aesthetic vision, our clinicians select from this comprehensive aesthetic palette:
            </p>
          </div>

          {/* 6 Specialized Treatment Cards (Native 1254x1254 Square Webp Images - 0% Distortion) */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {TREATMENT_PALETTE.map((item, idx) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.45, delay: idx * 0.08 }}
                className="bg-white rounded-3xl overflow-hidden border border-slate-200/90 shadow-md hover:shadow-xl transition-all duration-300 flex flex-col group hover:border-brandSky/60"
              >
                {/* 1:1 Aspect Frame for 1254x1254 Square */}
                <div className="relative p-3 pb-0">
                  <div className="relative rounded-2xl overflow-hidden bg-slate-50 aspect-square border border-slate-100 shadow-inner">
                    <img
                      src={item.image}
                      alt={item.alt}
                      className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute top-2.5 left-2.5">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-[10px] font-headline font-bold border backdrop-blur-md shadow-xs ${item.badgeColor}`}>
                        {item.role}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Content */}
                <div className="p-5 sm:p-6 flex flex-col flex-1 justify-between space-y-4 text-left">
                  <div>
                    <h3 className="font-headline font-bold text-lg sm:text-xl text-slate-900 group-hover:text-brandBlue transition-colors">
                      {item.title}
                    </h3>
                    <p className="text-slate-600 text-xs sm:text-sm leading-relaxed mt-2.5">
                      {item.desc}
                    </p>
                  </div>

                  <div className="pt-3 border-t border-slate-100 grid grid-cols-2 gap-2 text-xs">
                    <div className="p-2 rounded-xl bg-slate-50 border border-slate-100">
                      <span className="text-[10px] text-slate-400 uppercase font-headline font-bold block">Invasiveness</span>
                      <strong className="text-slate-800 text-[11px] font-semibold">{item.invasiveness}</strong>
                    </div>
                    <div className="p-2 rounded-xl bg-slate-50 border border-slate-100">
                      <span className="text-[10px] text-slate-400 uppercase font-headline font-bold block">Longevity</span>
                      <strong className="text-slate-800 text-[11px] font-semibold">{item.longevity}</strong>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Conservation of Tooth Structure Notice from PDF Page 3 */}
          <div className="mt-10 p-5 sm:p-6 rounded-2xl bg-white border border-emerald-200 shadow-sm flex flex-col sm:flex-row items-start sm:items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-emerald-50 border border-emerald-300 text-emerald-700 flex items-center justify-center shrink-0">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div className="space-y-1 text-left">
              <h4 className="font-headline font-bold text-sm sm:text-base text-slate-900">
                Ethical Enamel Preservation & Minimal-Prep Commitment
              </h4>
              <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">
                Not everyone needs every treatment. Preserving healthy natural tooth structure and choosing procedures that suit your oral health are vital components of our ethical smile design philosophy at Jerush.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ─── UNIQUE SECTION 4: Smile Longevity & Aftercare Protocol (id="preservation") ─── */}
      <section
        id="preservation"
        className="w-full py-16 lg:py-24 bg-white relative scroll-mt-28 border-b border-slate-200/70 overflow-hidden"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mb-14 text-left">
            <span className="text-xs font-bold text-brandBlue uppercase tracking-wider font-headline block mb-2.5">
              Lifelong Smile Preservation
            </span>
            <h2
              style={{ lineHeight: 1.4 }}
              className="text-2xl sm:text-3xl lg:text-[36px] font-extrabold font-headline text-slate-900 tracking-tight leading-[1.4]"
            >
              Maintaining Your{' '}
              <span className="bg-gradient-to-r from-brandBlue to-brandSky bg-clip-text text-transparent">
                New Smile for a Lifetime
              </span>
            </h2>
            <p className="text-slate-600 text-sm sm:text-base leading-relaxed mt-3.5">
              The longevity of cosmetic dental work depends on the treatments performed, your daily oral hygiene routine, and everyday eating habits. Follow these five core clinical protocols:
            </p>
          </div>

          {/* 5 Longevity Protocol Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {LONGEVITY_PROTOCOLS.map((item, idx) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.45, delay: idx * 0.08 }}
                className="bg-white rounded-3xl overflow-hidden border border-slate-200/90 shadow-md hover:shadow-xl transition-all duration-300 flex flex-col group hover:border-brandSky/60"
              >
                {/* 16:10 Frame for 1536x1024 Landscape */}
                <div className="relative p-3 pb-0">
                  <div className="relative rounded-2xl overflow-hidden bg-slate-50 aspect-[16/10] border border-slate-100 shadow-inner">
                    <img
                      src={item.image}
                      alt={item.alt}
                      className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute top-2.5 left-2.5">
                      <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-headline font-bold bg-white/95 text-brandBlue border border-slate-200 shadow-xs backdrop-blur-md">
                        <span className="w-1.5 h-1.5 rounded-full bg-brandBlue"></span>
                        <span>Protocol {idx + 1}</span>
                      </span>
                    </div>
                  </div>
                </div>

                {/* Content */}
                <div className="p-5 sm:p-6 flex flex-col flex-1 justify-between space-y-3 text-left">
                  <div>
                    <h3 className="font-headline font-bold text-base sm:text-lg text-slate-900 group-hover:text-brandBlue transition-colors">
                      {item.title}
                    </h3>
                    <p className="text-slate-600 text-xs sm:text-sm leading-relaxed mt-2">
                      {item.desc}
                    </p>
                  </div>

                  <div className="pt-3 border-t border-slate-100 flex items-center gap-2 text-xs text-brandBlue font-medium">
                    <CheckCircle2 className="w-3.5 h-3.5 text-brandSky shrink-0" />
                    <span>{item.tip}</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Replacement & Wear Transparency Notice from PDF Page 4 */}
          <div className="mt-10 p-5 sm:p-6 rounded-2xl bg-amber-50/70 border border-amber-200/80 shadow-sm flex flex-col sm:flex-row items-start sm:items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-amber-100/80 border border-amber-300 text-amber-800 flex items-center justify-center shrink-0">
              <AlertTriangle className="w-6 h-6" />
            </div>
            <div className="space-y-1 text-left">
              <h4 className="font-headline font-bold text-sm sm:text-base text-amber-950">
                Restorative Realism & Future Maintenance
              </h4>
              <p className="text-amber-900 text-xs sm:text-sm leading-relaxed">
                Some treatments, such as veneers and crowns, may require minor removal of tooth structure and may need replacement in the future. Your dentist will explain the longevity, limitations, maintenance requirements, and alternatives before treatment begins.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ─── UNIQUE SECTION 5: Regional Smile Studios Across Tamil Nadu (id="locations") ─── */}
      <section
        id="locations"
        className="w-full py-16 lg:py-24 bg-gradient-to-b from-slate-50 via-sky-50/20 to-white relative scroll-mt-28 border-b border-slate-200/70 overflow-hidden"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mb-14 text-left">
            <span className="text-xs font-bold text-brandBlue uppercase tracking-wider font-headline block mb-2.5">
              Regional Centres of Excellence
            </span>
            <h2
              style={{ lineHeight: 1.4 }}
              className="text-2xl sm:text-3xl lg:text-[36px] font-extrabold font-headline text-slate-900 tracking-tight leading-[1.4]"
            >
              Specialist Smile Designing{' '}
              <span className="bg-gradient-to-r from-brandBlue to-brandSky bg-clip-text text-transparent">
                Across Our Tamil Nadu Centres
              </span>
            </h2>
            <p className="text-slate-600 text-sm sm:text-base leading-relaxed mt-3.5">
              Whether you reside locally in Kanyakumari district, travel along the Tirunelveli-Madurai highway corridor, or visit our central Tamil Nadu or Chennai suites, world-class cosmetic dentistry is directly within reach:
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
                  <span className="text-slate-500 font-medium">Official address in footer below</span>
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

          {/* Outstation & Travel Concierge Banner */}
          <div className="mt-10 p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-slate-900 to-[#123164] text-white shadow-xl flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6 text-left">
            <div className="space-y-1.5 max-w-2xl">
              <span className="text-xs font-bold text-brandSky uppercase tracking-wider font-headline block">
                Outstation & International Patients
              </span>
              <h4 className="font-headline font-black text-xl sm:text-2xl text-white tracking-tight">
                Express Digital Smile Designing for Travelling Patients
              </h4>
              <p className="text-slate-300 text-xs sm:text-sm leading-relaxed">
                Travelling from Madurai, Coimbatore, Kerala, or abroad? Pre-schedule your 3D digital smile scan and trial mock-up in advance for compressed, high-efficiency appointment workflows.
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
              Aesthetic Dental Guidance
            </span>
            <h2
              style={{ lineHeight: 1.4 }}
              className="text-2xl sm:text-3xl lg:text-[36px] font-extrabold font-headline text-slate-900 tracking-tight leading-[1.4]"
            >
              Frequently Asked{' '}
              <span className="bg-gradient-to-r from-brandBlue to-brandSky bg-clip-text text-transparent">
                Questions on Smile Designing
              </span>
            </h2>
            <p className="text-slate-600 text-sm sm:text-base leading-relaxed mt-3.5">
              Clear clinical answers regarding candidacy, mock-up previews, procedures, and long-term care at Jerush.
            </p>
          </div>

          <div className="space-y-3.5">
            {FAQS.map((faq, index) => {
              const isOpen = openFaq === index;
              return (
                <div
                  key={index}
                  className="rounded-2xl border border-slate-200/90 bg-white overflow-hidden shadow-xs transition-all duration-200 hover:border-brandSky/60"
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

      {/* ─── SECTION 7: Related Cosmetic & Restorative Treatments ─── */}
      <section className="w-full py-16 lg:py-20 bg-slate-50/60 border-b border-slate-200/70">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mb-12 text-left">
            <span className="text-xs font-bold text-brandBlue uppercase tracking-wider font-headline block mb-2.5">
              Complementary Smile Aesthetics
            </span>
            <h2
              style={{ lineHeight: 1.4 }}
              className="text-2xl sm:text-3xl lg:text-[36px] font-extrabold font-headline text-slate-900 tracking-tight leading-[1.4]"
            >
              Related Treatments in{' '}
              <span className="bg-gradient-to-r from-brandBlue to-brandSky bg-clip-text text-transparent">
                Cosmetic & Restorative Dentistry
              </span>
            </h2>
            <p className="text-slate-600 text-sm sm:text-base leading-relaxed mt-3.5">
              Explore individual cosmetic and smile alignment treatments delivered by hospital specialists across Tamil Nadu.
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

      {/* ─── Bottom CTA Banner (Dr. Priyadharshini Cutout & Compliant Dark Navy Format from PDF Page 5) ─── */}
      <TreatmentCtaBanner
        badgeText="COSMETIC SMILE ENHANCEMENT"
        titlePrefix="Discover Your Smile"
        highlightWord="Options at Jerush"
        titleSuffix="Across Tamil Nadu"
        subtitle="Your smile should complement your natural features while supporting healthy teeth and gums. At Jerush Dentofacial & Cosmetic Laser Centre, a personalised consultation can help you understand the available options and choose an approach suited to your needs."
        primaryBtnText="Book Smile Designing Consultation"
        onPrimaryClick={handleBookClick}
        secondaryBtnText="Call +91 94891 60000"
        secondaryBtnPhone="+919489160000"
        doctorImage="/images/doctors/priya2.webp"
        doctorName="DR. PRIYADHARSHINI"
        doctorRole="Dental Surgeon (BDS)"
      />
    </div>
  );
}

