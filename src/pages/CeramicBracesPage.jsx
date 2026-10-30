import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Sparkles, ShieldCheck, Calendar, Phone, CheckCircle2, Clock,
  Award, Smile, ArrowRight, Info, Check, HelpCircle, AlertCircle,
  MapPin, ChevronRight, ChevronDown, Eye, Compass, Shield,
  Stethoscope, AlertTriangle, Layers, CheckSquare, Activity,
  Waves, Sparkle, RefreshCw, Scissors, Heart, Sparkles as SparklesIcon
} from 'lucide-react';
import PageBreadcrumbHero from '../components/common/PageBreadcrumbHero';
import TreatmentCtaBanner from '../components/common/TreatmentCtaBanner';
import TreatmentSectionNav from '../components/common/TreatmentSectionNav';
import TreatmentAppointmentForm from '../components/common/TreatmentAppointmentForm';
import useTreatmentScrollSpy from '../hooks/useTreatmentScrollSpy';

const STATS = [
  { value: 'Tooth-Coloured', label: 'Natural Enamel Match' },
  { value: '24/7 Alignment', label: 'Continuous Fixed Action' },
  { value: '10 - 18 Months', label: 'Average Treatment Time' },
  { value: '4 Regional Centres', label: 'Centres of Excellence' }
];

const TABS = [
  { id: 'technology', label: 'Ceramic Technology' },
  { id: 'candidates', label: 'Who Benefits' },
  { id: 'comparison', label: 'Ceramic vs Metal' },
  { id: 'journey', label: 'Treatment Journey' },
  { id: 'care', label: 'Care & Habits' },
  { id: 'results', label: 'Smile Alignment' },
  { id: 'faqs', label: 'FAQs' }
];

// 4 Modern Ceramic Technology Pillars (1024x576 - 16:9 Landscape)
const CERAMIC_PILLARS = [
  {
    id: 'appearance',
    title: 'Tooth-Coloured Appearance',
    subtitle: 'Blends With Natural Enamel',
    desc: 'Tooth-coloured or translucent ceramic brackets blend in with your natural teeth, providing a discreet orthodontic option for teens and professionals.',
    image: '/images/medical-services/dental-care/orthodontic-care/ceramic-braces/tooth-coloured-appearance.webp',
    alt: 'Tooth-coloured ceramic bracket blending naturally with tooth enamel',
    tag: 'Discreet Aesthetics',
    badgeColor: 'bg-sky-50 text-brandSky border-brandSky/20',
    accentBorder: 'hover:border-sky-400/70',
    features: [
      'Translucent ceramic matches warm and light tooth shades',
      'Smooth bracket contours prevent soft tissue irritation',
      'Ideal for patient-facing professionals and college students'
    ]
  },
  {
    id: 'fixed-treatment',
    title: 'Fixed Orthodontic Treatment',
    subtitle: 'Continuous 24/7 Alignment',
    desc: 'Brackets remain securely bonded to your teeth, working continuously without needing to be removed for meals, speech, or social occasions.',
    image: '/images/medical-services/dental-care/orthodontic-care/ceramic-braces/fixed-orthodontic-treatment.webp',
    alt: 'Fixed ceramic braces bonded securely to dental arch for continuous movement',
    tag: '24/7 Force',
    badgeColor: 'bg-blue-50 text-brandBlue border-brandBlue/20',
    accentBorder: 'hover:border-blue-400/70',
    features: [
      'No aligner trays to remove, lose, or replace',
      'Consistent biological tooth movement day and night',
      'Reliable tracking without patient compliance delays'
    ]
  },
  {
    id: 'controlled-movement',
    title: 'Controlled Tooth Movement',
    subtitle: 'Gentle Biological Traction',
    desc: 'Orthodontic archwires guide your teeth gently and steadily into optimal positions with calibrated clinical pressure planned by our specialists.',
    image: '/images/medical-services/dental-care/orthodontic-care/ceramic-braces/controlled-tooth-movement.webp',
    alt: 'Orthodontic archwire delivering controlled force through ceramic brackets',
    tag: 'Precision Engineering',
    badgeColor: 'bg-indigo-50 text-indigo-700 border-indigo-200',
    accentBorder: 'hover:border-indigo-400/70',
    features: [
      'High-elasticity shape-memory archwires',
      'Calibrated biomechanical force for root health',
      'Predictable arch widening and linear alignment'
    ]
  },
  {
    id: 'selected-alignment',
    title: 'Selected Alignment Solutions',
    subtitle: 'Versatile Bite Correction',
    desc: 'Suitable for a wide range of alignment issues, ceramic braces help resolve dental crowding, spacing, rotations, and selected bite irregularities.',
    image: '/images/medical-services/dental-care/orthodontic-care/ceramic-braces/selected-alignment-problems.webp',
    alt: 'Ceramic braces treating selected tooth crowding and bite irregularities',
    tag: 'Comprehensive Care',
    badgeColor: 'bg-emerald-50 text-emerald-700 border-emerald-200',
    accentBorder: 'hover:border-emerald-400/70',
    features: [
      'Corrects anterior crowding and wide spacing',
      'Realigns vertical and horizontal bite relationships',
      'Combines mechanical durability with aesthetic elegance'
    ]
  }
];

// 4 Candidate Indications (768x768 - 1:1 Square)
const CANDIDATE_INDICATIONS = [
  {
    number: '01',
    title: 'Crowded Teeth that Overlap',
    lead: 'Space Relief & Arch Alignment',
    desc: 'Crowded teeth that overlap or are difficult to clean thoroughly. Ceramic brackets apply steady arch expansion forces to guide overlapping teeth into a smooth dental arch.',
    image: '/images/medical-services/dental-care/orthodontic-care/ceramic-braces/crowded-teeth-that-overlap.webp',
    alt: 'Severe dental arch crowding with overlapping front teeth',
    tag: 'Crowded Teeth',
    clinicalFocus: 'Arch Expansion & De-crowding'
  },
  {
    number: '02',
    title: 'Gaps Between Teeth',
    lead: 'Predictable Diastema Closure',
    desc: 'Noticeable spaces and gaps between teeth that compromise smile symmetry or speech. Ceramic braces close interdental spaces steadily while preserving healthy root parallelism.',
    image: '/images/medical-services/dental-care/orthodontic-care/ceramic-braces/gaps-between-teeth.webp',
    alt: 'Spacing and gaps between front teeth requiring orthodontic closure',
    tag: 'Tooth Gaps',
    clinicalFocus: 'Interdental Space Closure'
  },
  {
    number: '03',
    title: 'Crooked or Rotated Teeth',
    lead: 'Rotational Torque Control',
    desc: 'Crooked or turned teeth that disrupt proper bite function and smile harmony. Fixed ceramic brackets allow our orthodontists to apply rotational torque for perfect positioning.',
    image: '/images/medical-services/dental-care/orthodontic-care/ceramic-braces/crooked-teeth.webp',
    alt: 'Turned and rotated canine and incisor teeth needing alignment',
    tag: 'Rotated Teeth',
    clinicalFocus: 'Axial Rotational Alignment'
  },
  {
    number: '04',
    title: 'Upper & Lower Bite Irregularities',
    lead: 'Occlusal Harmonisation',
    desc: 'Bite problems where the upper and lower teeth do not meet properly when chewing or resting. Ceramic braces help improve occlusion for better chewing comfort and longevity.',
    image: '/images/medical-services/dental-care/orthodontic-care/ceramic-braces/upper-and-lower-problem.webp',
    alt: 'Improper upper and lower bite contact requiring orthodontic correction',
    tag: 'Bite Correction',
    clinicalFocus: 'Occlusal Plane Correction'
  }
];

// Comparison Matrix Data
const COMPARISON_ROWS = [
  {
    feature: 'Appearance',
    ceramic: 'Tooth-coloured or translucent ceramic brackets that blend with enamel',
    metal: 'Distinct silver or gunmetal stainless steel brackets',
    ceramicHighlight: true
  },
  {
    feature: 'Visibility',
    ceramic: 'Generally less noticeable; subtle during talking and photography',
    metal: 'Clearly visible across all smile angles',
    ceramicHighlight: true
  },
  {
    feature: 'Durability',
    ceramic: 'Strong polycrystalline ceramic; slightly more brittle under extreme impact',
    metal: 'Maximum fracture resistance for intense contact sports',
    ceramicHighlight: false
  },
  {
    feature: 'Staining',
    ceramic: 'Ceramic brackets resist staining; clear elastic ties are replaced monthly',
    metal: 'Metal brackets never stain; elastic bands swapped monthly',
    ceramicHighlight: true
  },
  {
    feature: 'Maintenance',
    ceramic: 'Attentive oral hygiene and gentle brushing around brackets required',
    metal: 'Standard daily orthodontic brushing and flossing required',
    ceramicHighlight: false
  }
];

// 4-Step Treatment Journey (1024x576 - 16:9 Landscape)
const JOURNEY_STEPS = [
  {
    step: '01',
    name: 'Smile Assessment',
    lead: 'Diagnostics, Scans & Digital Imaging',
    desc: 'Your orthodontist examines your teeth, jaw relationships, and facial aesthetics. We take digital X-rays, photographs, and 3D intraoral scans to create your personalized treatment plan.',
    image: '/images/medical-services/dental-care/orthodontic-care/ceramic-braces/smile-assessment.webp',
    alt: 'Orthodontic smile assessment and digital diagnostic check at Jerush clinic',
    highlights: [
      'Comprehensive bite and jaw examination',
      'Low-radiation digital panoramic X-rays & facial imaging',
      'Bracket shade matching to your natural tooth enamel'
    ]
  },
  {
    step: '02',
    name: 'Braces Placement',
    lead: 'Precision Enamel Bonding',
    desc: 'The ceramic brackets are bonded to your teeth using biocompatible dental adhesive, then connected with a flexible aesthetic orthodontic archwire. The appointment is gentle and pain-free.',
    image: '/images/medical-services/dental-care/orthodontic-care/ceramic-braces/braces-placement.webp',
    alt: 'Specialist bonding tooth-coloured ceramic brackets to teeth',
    highlights: [
      'Teeth are polished and isolated for clean adhesion',
      'Accurate bracket positioning using custom dental guides',
      'Esthetic archwire secured with clear or pearl elastic ties'
    ]
  },
  {
    step: '03',
    name: 'Regular Adjustments',
    lead: 'Progress Tracking Every 4 to 6 Weeks',
    desc: 'You attend brief scheduled visits so your orthodontist can monitor tooth movement, adjust wire tension, and replace elastic ligatures with fresh, stain-free bands.',
    image: '/images/medical-services/dental-care/orthodontic-care/ceramic-braces/regular-adjustments.webp',
    alt: 'Orthodontist adjusting ceramic braces archwire during scheduled review',
    highlights: [
      'Quick 15–20 minute check-up sessions',
      'Wire upgrades to guide teeth progressively into place',
      'Regular hygiene checks to ensure healthy gums'
    ]
  },
  {
    step: '04',
    name: 'Retention After Treatment',
    lead: 'Safeguarding Your Perfect Alignment',
    desc: 'Once braces are removed, custom retainers help maintain your newly corrected alignment. Wearing them as instructed is essential because teeth naturally tend to shift over time.',
    image: '/images/medical-services/dental-care/orthodontic-care/ceramic-braces/retension-after-alignment.webp',
    alt: 'Patient wearing custom orthodontic clear retainer after braces removal',
    highlights: [
      'Painless bracket debonding and enamel polishing',
      'Custom transparent retainers fabricated in-house',
      'Long-term follow-up to protect your investment'
    ]
  }
];

// 6 Everyday Care Habits (768x768 - 1:1 Square)
const CARE_HABITS = [
  {
    id: 'brush-carefully',
    title: 'Brush Carefully',
    desc: 'Brush carefully around each bracket and along the gum line at least twice daily with a soft-bristled toothbrush to remove plaque and trapped food particles.',
    image: '/images/medical-services/dental-care/orthodontic-care/ceramic-braces/brushc-carefully.webp',
    alt: 'Careful brushing around ceramic braces brackets with soft toothbrush',
    tag: 'Twice Daily',
    badgeColor: 'bg-sky-50 text-brandSky border-sky-200'
  },
  {
    id: 'interdental-brushes',
    title: 'Use Interdental Brushes',
    desc: 'Use interdental micro-brushes or floss threaders daily to clean under the archwires and between tooth contacts where regular bristles cannot reach.',
    image: '/images/medical-services/dental-care/orthodontic-care/ceramic-braces/use-interdental-brushes.webp',
    alt: 'Cleaning under orthodontic wire with an interdental brush',
    tag: 'Micro-Cleaning',
    badgeColor: 'bg-blue-50 text-brandBlue border-blue-200'
  },
  {
    id: 'limit-hard-foods',
    title: 'Limit Hard & Sticky Foods',
    desc: 'Avoid chewing ice, hard candies, nuts, popcorn kernels, and sticky sweets like caramel, which can loosen or dislodge ceramic brackets.',
    image: '/images/medical-services/dental-care/orthodontic-care/ceramic-braces/limit-hard-food.webp',
    alt: 'Avoiding hard and sticky foods that may fracture ceramic brackets',
    tag: 'Bracket Safety',
    badgeColor: 'bg-amber-50 text-amber-700 border-amber-200'
  },
  {
    id: 'reduce-sugary-snacks',
    title: 'Reduce Sugary Snacks',
    desc: 'Limit frequent sugary snacks, carbonated sodas, and sweet drinks that feed cavity-causing bacteria and cause white spot lesions on enamel.',
    image: '/images/medical-services/dental-care/orthodontic-care/ceramic-braces/reduce-sugary-snacks.webp',
    alt: 'Reducing sugary foods and carbonated drinks during braces wear',
    tag: 'Enamel Defense',
    badgeColor: 'bg-rose-50 text-rose-700 border-rose-200'
  },
  {
    id: 'oral-health-reviews',
    title: 'Attend Oral-Health Reviews',
    desc: 'Attend all scheduled adjustment and oral-health review appointments so your orthodontist can monitor hygiene and maintain ideal wire calibration.',
    image: '/images/medical-services/dental-care/orthodontic-care/ceramic-braces/oral-health-review.webp',
    alt: 'Attending regular orthodontic oral health review appointments',
    tag: 'Routine Visits',
    badgeColor: 'bg-emerald-50 text-emerald-700 border-emerald-200'
  },
  {
    id: 'contact-orthodontist',
    title: 'Contact Your Orthodontist',
    desc: 'If a bracket comes loose or a wire pokes your cheek, contact your clinic team right away for guidance rather than attempting home repairs.',
    image: '/images/medical-services/dental-care/orthodontic-care/ceramic-braces/contact-your-orthodontist.webp',
    alt: 'Prompt communication with orthodontist if a bracket becomes loose',
    tag: 'Rapid Support',
    badgeColor: 'bg-purple-50 text-purple-700 border-purple-200'
  }
];

// 7 FAQs from PDF Page 4 & 5
const FAQS = [
  {
    q: 'Are ceramic braces completely invisible?',
    a: 'No. Their tooth-coloured brackets blend with natural teeth, making them far less noticeable than metal braces, but the brackets and orthodontic wire can still be seen up close.'
  },
  {
    q: 'Do ceramic braces take longer than metal braces?',
    a: 'Not necessarily. Treatment time depends mainly on the complexity of the alignment problem, the customized treatment plan, and how consistently appointments and instructions are followed. Most treatments finish within 10 to 18 months.'
  },
  {
    q: 'Do ceramic braces stain?',
    a: 'Ceramic brackets are generally stain-resistant and will not absorb colours from food or drinks. However, the clear elastic ties used with braces can discolour with curry, coffee, or tea. These ties are replaced with fresh, clean ones at every monthly appointment.'
  },
  {
    q: 'Are ceramic braces painful?',
    a: 'Placement is completely painless. You may experience pressure, tenderness, or mild soreness for 2 to 4 days after initial fitting and routine adjustments as teeth begin shifting. This is temporary and can be easily managed with soft foods and orthodontist-recommended relief.'
  },
  {
    q: 'Can adults get ceramic braces?',
    a: 'Yes, absolutely. Adults are great candidates for ceramic braces if their teeth and gums are healthy enough for orthodontic movement. Many working professionals and university students choose ceramic braces for their discreet appearance.'
  },
  {
    q: 'Can ceramic braces correct gaps and crowded teeth?',
    a: 'Yes. Ceramic braces treat many spacing and crowding problems, as well as selected overbites, underbites, and rotated teeth. The exact suitability depends on your individual dental anatomy.'
  },
  {
    q: 'How long will I need to wear ceramic braces?',
    a: 'Treatment typically ranges from 10 to 18 months, though mild cases may take less time and complex jaw irregularities may take up to 2 years. Your orthodontist will provide a realistic timeline after examining your digital scans.'
  }
];

// 4 Related Treatments in Orthodontics & Smile Care
const RELATED_TREATMENTS = [
  {
    title: 'Jerushaligne Clear Aligners',
    desc: 'Custom invisible aligners designed with 3D digital precision to straighten teeth comfortably without brackets or wires.',
    link: '/dental-care/orthodontic-care/clear-aligners-jerushaligne',
    image: '/images/medical-services/dental-care/jerushaligne/girl.webp',
    alt: 'Jerushaligne clear invisible aligners for teeth straightening',
    badge: 'Invisible Orthodontics',
    badgeColor: 'bg-blue-50 text-brandBlue border-blue-200',
    accentBorder: 'hover:border-blue-400/60'
  },
  {
    title: 'Metal Orthodontic Braces',
    desc: 'Traditional low-profile stainless steel braces offering maximum strength and cost-effective treatment for complex malocclusions.',
    link: '/dental-care/orthodontic-care/metal-braces',
    image: '/images/medical-services/dental-care/metal-braces/modern-metal-upgrade.webp',
    alt: 'Modern low-profile metal orthodontic braces',
    badge: 'Maximum Strength',
    badgeColor: 'bg-sky-50 text-brandSky border-sky-200',
    accentBorder: 'hover:border-sky-400/60'
  },
  {
    title: 'Tooth Jewellery',
    desc: 'Decorative dental crystals and gold ornaments bonded safely to natural enamel without drilling or tooth damage.',
    link: '/dental-care/cosmetic-dentistry/tooth-jewellery',
    image: '/images/medical-services/dental-care/cosmetic-dentistry/tooth-jewellery/personal-touch.webp',
    alt: 'Small crystal tooth gem bonded to natural front tooth',
    badge: 'Smile Sparkle',
    badgeColor: 'bg-purple-50 text-purple-700 border-purple-200',
    accentBorder: 'hover:border-purple-400/60'
  },
  {
    title: 'Crowns & Bridges',
    desc: 'High-strength monolithic zirconia and ceramic restorations to replace missing teeth or protect heavily restored dentition.',
    link: '/dental-care/prosthodontic-care/dental-crowns-bridges',
    image: '/images/medical-services/dental-care/crowns-bridges/dental-bridge.webp',
    alt: 'Ceramic dental crowns and fixed bridges restoration',
    badge: 'Restorative Care',
    badgeColor: 'bg-emerald-50 text-emerald-700 border-emerald-200',
    accentBorder: 'hover:border-emerald-400/60'
  }
];

export default function CeramicBracesPage() {
  const navigate = useNavigate();
  const [expandedFaq, setExpandedFaq] = useState(null);

  const { activeSection, scrollToSection } = useTreatmentScrollSpy(
    TABS.map(tab => tab.id),
    138
  );

  useEffect(() => {
    // Canonical SEO Setup from PDF Page 6
    document.title = 'Ceramic Braces Treatment for Straighter Teeth | Jerush';

    let metaDesc = document.querySelector('meta[name="description"]');
    if (!metaDesc) {
      metaDesc = document.createElement('meta');
      metaDesc.name = 'description';
      document.head.appendChild(metaDesc);
    }
    metaDesc.content = 'Explore ceramic braces for a less noticeable way to straighten crowded, crooked or spaced teeth. Learn about treatment, benefits and care at Jerush.';

    let metaKeywords = document.querySelector('meta[name="keywords"]');
    if (!metaKeywords) {
      metaKeywords = document.createElement('meta');
      metaKeywords.name = 'keywords';
      document.head.appendChild(metaKeywords);
    }
    metaKeywords.content = 'Tooth-coloured braces, clear ceramic braces, ceramic braces treatment, braces for adults, orthodontic treatment, ceramic braces Tamil Nadu';

    // Inject FAQ Schema
    const faqSchemaScript = document.createElement('script');
    faqSchemaScript.type = 'application/ld+json';
    faqSchemaScript.id = 'faq-schema-ceramic-braces';
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
      const existingScript = document.getElementById('faq-schema-ceramic-braces');
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
        title="Ceramic Braces"
        breadcrumbs={[
          { label: 'Dental Care', path: '/treatments' },
          { label: 'Orthodontic Care', path: '/treatments?category=dental&sub=Orthodontic%20Care' },
          { label: 'Ceramic Braces', active: true }
        ]}
      />

      {/* ─── Hero Section (Clean Hero, No Unwanted Badges, 1.40 Line-Height Convention) ─── */}
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
                  Ceramic Braces:{' '}
                  <span className="bg-gradient-to-r from-brandBlue to-brandSky bg-clip-text text-transparent">
                    Straighten Your Teeth with Natural-Looking Braces
                  </span>
                </h1>
                <p className="text-slate-600 text-base sm:text-lg leading-relaxed mt-4">
                  Clear ceramic braces provide a subtle fixed orthodontic option that blends in naturally with your teeth. Designed for teenagers, university students, and working professionals who want effective tooth movement without prominent metal brackets.
                </p>
                <div className="mt-4 p-4.5 rounded-2xl bg-white/95 backdrop-blur-sm border border-slate-200/90 shadow-sm space-y-2">
                  <p className="text-slate-700 text-sm sm:text-base leading-relaxed">
                    Unlike removable aligners that require strict discipline to wear 22 hours daily, ceramic braces work continuously 24/7. Their translucent brackets resist staining from daily meals, tea, and coffee.
                  </p>
                  <p className="text-slate-600 text-xs sm:text-sm leading-relaxed pt-1 border-t border-slate-100">
                    At <strong className="text-slate-900 font-semibold">Jerush Dentofacial & Cosmetic Laser Centre</strong>, orthodontic consultations are available across our 4 regional centres in Thuckalay, Nagercoil, Trichy, and Chennai with flexible monthly EMI options.
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
                  <span>Translucent Tooth-Matching Brackets</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Check className="w-4 h-4 text-brandBlue shrink-0" />
                  <span>Continuous 24/7 Fixed Force</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Check className="w-4 h-4 text-brandBlue shrink-0" />
                  <span>Stain-Resistant Polycrystalline Ceramic</span>
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
                    src="/images/medical-services/dental-care/orthodontic-care/ceramic-braces/straighten-your-smile.webp"
                    alt="Tooth-coloured ceramic braces used to straighten teeth and improve alignment"
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
        treatmentName="Ceramic Braces"
        title="Book an Orthodontic Consultation"
        highlightWord="Discreet Smile Straightening"
        subtitle="Straighten crowded or crooked teeth with natural-looking clear ceramic brackets. Schedule a comprehensive diagnostic scan at Jerush across Tamil Nadu."
        features={[
          {
            icon: ShieldCheck,
            title: 'Discreet Appearance',
            desc: 'Tooth-coloured translucent ceramic brackets blend in with your natural enamel.'
          },
          {
            icon: Clock,
            title: 'Continuous 24/7 Movement',
            desc: 'Fixed brackets maintain steady alignment forces without daily tray management.'
          },
          {
            icon: Award,
            title: 'Specialist Orthodontists',
            desc: 'Custom bracket positioning and biomechanical alignment planned by hospital specialists.'
          },
          {
            icon: MapPin,
            title: '4 Regional Centres',
            desc: 'Convenient monthly adjustment visits available across Thuckalay, Nagercoil, Trichy, and Chennai.'
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

      {/* ─── SECTION 1: Modern Ceramic Technology (id="technology") ─── */}
      <section
        id="technology"
        className="w-full py-16 lg:py-24 bg-gradient-to-b from-slate-50 via-sky-50/20 to-white relative scroll-mt-28 border-b border-slate-200/70 overflow-hidden"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mb-12 text-left">
            <span className="text-xs font-bold text-brandBlue uppercase tracking-wider font-headline block mb-2.5">
              Modern Bracket Engineering
            </span>
            <h2
              style={{ lineHeight: 1.4 }}
              className="text-2xl sm:text-3xl lg:text-[36px] font-extrabold font-headline text-slate-900 tracking-tight leading-[1.4]"
            >
              Modern Ceramic Bracket{' '}
              <span className="bg-gradient-to-r from-brandBlue to-brandSky bg-clip-text text-transparent">
                Technology
              </span>
            </h2>
            <p className="text-slate-600 text-sm sm:text-base leading-relaxed mt-3.5">
              Ceramic braces combine the proven mechanical strength of traditional orthodontic appliances with translucent or tooth-coloured materials that blend gracefully with your natural teeth.
            </p>
          </div>

          {/* 4 Pillars Grid (Native 1024x576 16:9 Ratio - Zero Cropping) */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {CERAMIC_PILLARS.map((pillar, index) => (
              <motion.div
                key={pillar.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className={`bg-white rounded-3xl overflow-hidden border border-slate-200/80 shadow-md hover:shadow-xl transition-all duration-300 flex flex-col group ${pillar.accentBorder}`}
              >
                {/* 16:9 Image Frame */}
                <div className="relative p-3 pb-0">
                  <div className="relative rounded-2xl overflow-hidden bg-slate-50 aspect-[16/9] border border-slate-100 shadow-inner">
                    <img
                      src={pillar.image}
                      alt={pillar.alt}
                      className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute top-2.5 left-2.5">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-[10px] font-headline font-bold border backdrop-blur-md shadow-xs ${pillar.badgeColor}`}>
                        {pillar.tag}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Content */}
                <div className="p-5 sm:p-6 flex flex-col flex-1 justify-between space-y-4">
                  <div>
                    <h3 className="font-headline font-bold text-lg text-slate-900 group-hover:text-brandBlue transition-colors">
                      {pillar.title}
                    </h3>
                    <p className="text-xs font-semibold text-brandSky uppercase tracking-wider mt-0.5">
                      {pillar.subtitle}
                    </p>
                    <p className="text-slate-600 text-xs sm:text-sm leading-relaxed mt-3">
                      {pillar.desc}
                    </p>
                  </div>

                  <div className="pt-3 border-t border-slate-100 space-y-2">
                    {pillar.features.map((feat, fIdx) => (
                      <div key={fIdx} className="flex items-start gap-2 text-xs text-slate-700">
                        <Check className="w-3.5 h-3.5 text-brandBlue shrink-0 mt-0.5" />
                        <span>{feat}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Clinical Transparency Notice */}
          <div className="mt-10 p-5 sm:p-6 rounded-2xl bg-white border border-sky-200 shadow-sm flex flex-col sm:flex-row items-start sm:items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-sky-50 border border-sky-200 flex items-center justify-center shrink-0 text-brandBlue">
              <Info className="w-6 h-6" />
            </div>
            <div className="space-y-1">
              <h4 className="font-headline font-bold text-sm sm:text-base text-slate-900">
                Aesthetic Transparency & Care Considerations
              </h4>
              <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">
                Ceramic braces are not completely invisible, and the orthodontic wire may still be visible up close. The brackets can also be slightly more fragile than metal ones under heavy impact, so careful handling and diligent oral hygiene are important throughout your journey.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ─── SECTION 2: Could Ceramic Braces Be Right for You? (id="candidates") ─── */}
      <section
        id="candidates"
        className="w-full py-16 lg:py-24 bg-white relative scroll-mt-28 border-b border-slate-200/70 overflow-hidden"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mb-12 text-left">
            <span className="text-xs font-bold text-brandBlue uppercase tracking-wider font-headline block mb-2.5">
              Candidate Indications & Bite Problems
            </span>
            <h2
              style={{ lineHeight: 1.4 }}
              className="text-2xl sm:text-3xl lg:text-[36px] font-extrabold font-headline text-slate-900 tracking-tight leading-[1.4]"
            >
              Could Ceramic Braces Be{' '}
              <span className="bg-gradient-to-r from-brandBlue to-brandSky bg-clip-text text-transparent">
                Right for You?
              </span>
            </h2>
            <p className="text-slate-600 text-sm sm:text-base leading-relaxed mt-3.5">
              Ceramic braces may appeal to teenagers and adults who want fixed orthodontic treatment with a more subtle appearance. They may be considered if you have:
            </p>
          </div>

          {/* 4 Conditions (768x768 1:1 Square - Pristine Square Ratio with Zero Cropping) */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {CANDIDATE_INDICATIONS.map((item, index) => (
              <motion.div
                key={item.number}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-white rounded-3xl overflow-hidden border border-slate-200/80 shadow-md hover:shadow-xl transition-all duration-300 flex flex-col group hover:border-brandSky/60"
              >
                {/* 1:1 Square Container with framed padding */}
                <div className="relative p-3 pb-0">
                  <div className="relative rounded-2xl overflow-hidden bg-slate-50 aspect-square border border-slate-100 shadow-inner">
                    <img
                      src={item.image}
                      alt={item.alt}
                      className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute top-2.5 left-2.5">
                      <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-headline font-bold bg-white/95 text-slate-900 border border-slate-200 shadow-xs backdrop-blur-md">
                        <span className="w-1.5 h-1.5 rounded-full bg-brandBlue"></span>
                        <span>{item.number}</span>
                      </span>
                    </div>
                    <div className="absolute top-2.5 right-2.5">
                      <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-headline font-bold bg-brandBlue/90 text-white shadow-xs">
                        {item.tag}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Content */}
                <div className="p-5 sm:p-6 flex flex-col flex-1 justify-between space-y-3">
                  <div>
                    <h3 className="font-headline font-bold text-lg text-slate-900 group-hover:text-brandBlue transition-colors">
                      {item.title}
                    </h3>
                    <p className="text-xs font-semibold text-brandSky uppercase tracking-wider mt-0.5">
                      {item.lead}
                    </p>
                    <p className="text-slate-600 text-xs sm:text-sm leading-relaxed mt-2.5">
                      {item.desc}
                    </p>
                  </div>

                  <div className="pt-3 border-t border-slate-100">
                    <span className="text-[11px] font-medium text-slate-500 block">
                      Clinical focus: <strong className="text-slate-800 font-semibold">{item.clinicalFocus}</strong>
                    </span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Bite Problem Planning Note */}
          <div className="mt-8 p-4.5 rounded-2xl bg-sky-50/70 border border-brandSky/25 flex items-center gap-3 text-xs sm:text-sm text-slate-700">
            <Info className="w-5 h-5 text-brandBlue shrink-0" />
            <span>
              Not every bite problem can be treated with ceramic braces alone. The orthodontist will evaluate your teeth, jaw relationship, and treatment goals before recommending a customized plan.
            </span>
          </div>
        </div>
      </section>

      {/* ─── SECTION 3: Ceramic Braces vs. Metal Braces (id="comparison") ─── */}
      <section
        id="comparison"
        className="w-full py-16 lg:py-24 bg-gradient-to-b from-slate-50 via-sky-50/20 to-white relative scroll-mt-28 border-b border-slate-200/70 overflow-hidden"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mb-12 text-left">
            <span className="text-xs font-bold text-brandBlue uppercase tracking-wider font-headline block mb-2.5">
              Direct Treatment Comparison
            </span>
            <h2
              style={{ lineHeight: 1.4 }}
              className="text-2xl sm:text-3xl lg:text-[36px] font-extrabold font-headline text-slate-900 tracking-tight leading-[1.4]"
            >
              Ceramic Braces vs.{' '}
              <span className="bg-gradient-to-r from-brandBlue to-brandSky bg-clip-text text-transparent">
                Metal Braces
              </span>
            </h2>
            <p className="text-slate-600 text-sm sm:text-base leading-relaxed mt-3.5">
              Choosing braces is about balancing appearance, durability, comfort, and cost. Neither option is automatically better for everyone—your orthodontist will explain which system fits your lifestyle and alignment goals.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            {/* Left Column: Visual Card (1024x576 - 16:9 Ratio) */}
            <div className="lg:col-span-5">
              <div className="relative rounded-3xl overflow-hidden bg-white border border-slate-200 shadow-xl p-3 group">
                <div className="relative rounded-2xl overflow-hidden bg-slate-50 aspect-[16/9]">
                  <img
                    src="/images/medical-services/dental-care/orthodontic-care/ceramic-braces/ceramic-vs-metal-braces.webp"
                    alt="Side by side comparison of ceramic clear braces vs traditional metal braces"
                    className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700"
                  />
                </div>
                <div className="p-4 space-y-1.5">
                  <h4 className="font-headline font-bold text-sm sm:text-base text-slate-900">
                    Aesthetics vs. Mechanical Resistance
                  </h4>
                  <p className="text-slate-600 text-xs leading-relaxed">
                    Ceramic brackets deliver an ultra-discrete profile for social and professional confidence, while metal brackets offer maximum resistance against heavy contact forces.
                  </p>
                </div>
              </div>
            </div>

            {/* Right Column: Comparison Table */}
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
                          Ceramic Braces
                        </th>
                        <th className="p-4 sm:p-5 text-xs font-headline font-bold uppercase tracking-wider">
                          Metal Braces
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 text-xs sm:text-sm">
                      {COMPARISON_ROWS.map((row, rIdx) => (
                        <tr
                          key={rIdx}
                          className={rIdx % 2 === 0 ? 'bg-white' : 'bg-slate-50/50'}
                        >
                          <td className="p-4 sm:p-5 font-headline font-bold text-slate-900 whitespace-nowrap">
                            {row.feature}
                          </td>
                          <td className="p-4 sm:p-5 text-slate-700 bg-sky-50/40 font-medium">
                            {row.ceramic}
                          </td>
                          <td className="p-4 sm:p-5 text-slate-600">
                            {row.metal}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── SECTION 4: Your Ceramic Braces Journey (id="journey") ─── */}
      <section
        id="journey"
        className="w-full py-16 lg:py-24 bg-white relative scroll-mt-28 border-b border-slate-200/70 overflow-hidden"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mb-12 text-left">
            <span className="text-xs font-bold text-brandBlue uppercase tracking-wider font-headline block mb-2.5">
              4-Step Clinical Sequence
            </span>
            <h2
              style={{ lineHeight: 1.4 }}
              className="text-2xl sm:text-3xl lg:text-[36px] font-extrabold font-headline text-slate-900 tracking-tight leading-[1.4]"
            >
              Your Ceramic Braces{' '}
              <span className="bg-gradient-to-r from-brandBlue to-brandSky bg-clip-text text-transparent">
                Treatment Journey
              </span>
            </h2>
            <p className="text-slate-600 text-sm sm:text-base leading-relaxed mt-3.5">
              From your very first digital smile assessment to the day your custom retainers are fitted, our orthodontists guide every millimeter of tooth movement with gentle precision.
            </p>
          </div>

          {/* 4 Steps Grid (1024x576 - 16:9 Landscape - Zero Cropping) */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {JOURNEY_STEPS.map((step, idx) => (
              <motion.div
                key={step.step}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className="bg-white rounded-3xl overflow-hidden border border-slate-200/90 shadow-md hover:shadow-xl transition-all duration-300 flex flex-col group hover:border-brandSky/60"
              >
                {/* 16:9 Image Container */}
                <div className="relative p-3 pb-0">
                  <div className="relative rounded-2xl overflow-hidden bg-slate-50 aspect-[16/9] border border-slate-100 shadow-inner">
                    <img
                      src={step.image}
                      alt={step.alt}
                      className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute top-2.5 left-2.5">
                      <span className="inline-flex items-center px-3 py-1 rounded-full text-[11px] font-headline font-extrabold bg-brandBlue text-white shadow-xs">
                        Step {step.step}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6 flex flex-col flex-1 justify-between space-y-4">
                  <div>
                    <h3 className="font-headline font-bold text-xl text-slate-900 group-hover:text-brandBlue transition-colors">
                      {step.name}
                    </h3>
                    <p className="text-xs font-semibold text-brandSky uppercase tracking-wider mt-0.5">
                      {step.lead}
                    </p>
                    <p className="text-slate-600 text-xs sm:text-sm leading-relaxed mt-3">
                      {step.desc}
                    </p>
                  </div>

                  <div className="pt-3 border-t border-slate-100 space-y-2">
                    {step.highlights.map((item, hIdx) => (
                      <div key={hIdx} className="flex items-start gap-2 text-xs text-slate-700">
                        <CheckCircle2 className="w-3.5 h-3.5 text-brandBlue shrink-0 mt-0.5" />
                        <span>{item}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── SECTION 5: Everyday Care: Keeping Your Braces Clean (id="care") ─── */}
      <section
        id="care"
        className="w-full py-16 lg:py-24 bg-gradient-to-b from-slate-50 via-sky-50/20 to-white relative scroll-mt-28 border-b border-slate-200/70 overflow-hidden"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mb-12 text-left">
            <span className="text-xs font-bold text-brandBlue uppercase tracking-wider font-headline block mb-2.5">
              Hygiene & Maintenance Protocol
            </span>
            <h2
              style={{ lineHeight: 1.4 }}
              className="text-2xl sm:text-3xl lg:text-[36px] font-extrabold font-headline text-slate-900 tracking-tight leading-[1.4]"
            >
              Everyday Care:{' '}
              <span className="bg-gradient-to-r from-brandBlue to-brandSky bg-clip-text text-transparent">
                Keeping Your Braces Clean
              </span>
            </h2>
            <p className="text-slate-600 text-sm sm:text-base leading-relaxed mt-3.5">
              Ceramic braces need consistent care throughout orthodontic treatment. Food can collect around brackets, and plaque buildup may increase the risk of gum inflammation, white spots on teeth, and tooth decay.
            </p>
          </div>

          {/* 6 Daily Habits (768x768 1:1 Square - Pristine Square Ratio with Zero Cropping) */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {CARE_HABITS.map((habit, index) => (
              <motion.div
                key={habit.id}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.45, delay: index * 0.08 }}
                className="bg-white rounded-3xl overflow-hidden border border-slate-200/80 shadow-sm hover:shadow-lg transition-all duration-300 flex flex-col group hover:border-brandSky/60"
              >
                {/* 1:1 Square Container with framed padding */}
                <div className="relative p-3 pb-0">
                  <div className="relative rounded-2xl overflow-hidden bg-slate-50 aspect-square border border-slate-100 shadow-inner">
                    <img
                      src={habit.image}
                      alt={habit.alt}
                      className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute top-2.5 left-2.5">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-[10px] font-headline font-bold border backdrop-blur-md shadow-xs ${habit.badgeColor}`}>
                        {habit.tag}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="p-5 sm:p-6 flex-1 flex flex-col justify-between">
                  <div>
                    <h3 className="font-headline font-bold text-lg text-slate-900 group-hover:text-brandBlue transition-colors">
                      {habit.title}
                    </h3>
                    <p className="text-slate-600 text-xs sm:text-sm leading-relaxed mt-2.5">
                      {habit.desc}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Tenderness Guidance Callout */}
          <div className="mt-8 p-4.5 rounded-2xl bg-sky-50/70 border border-brandSky/25 flex items-center gap-3 text-xs sm:text-sm text-slate-700">
            <Info className="w-5 h-5 text-brandBlue shrink-0" />
            <span>
              Some tenderness is common after braces are fitted or adjusted and usually settles over a few days. Your orthodontist can advise you on simple ways to manage mild discomfort.
            </span>
          </div>
        </div>
      </section>

      {/* ─── SECTION 6: Before and After: Your Smile Alignment (id="results") ─── */}
      <section
        id="results"
        className="w-full py-16 lg:py-24 bg-white relative scroll-mt-28 border-b border-slate-200/70 overflow-hidden"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mb-12 text-left">
            <span className="text-xs font-bold text-brandBlue uppercase tracking-wider font-headline block mb-2.5">
              Clinical Visual Progress
            </span>
            <h2
              style={{ lineHeight: 1.4 }}
              className="text-2xl sm:text-3xl lg:text-[36px] font-extrabold font-headline text-slate-900 tracking-tight leading-[1.4]"
            >
              Before and After:{' '}
              <span className="bg-gradient-to-r from-brandBlue to-brandSky bg-clip-text text-transparent">
                Your Smile Alignment
              </span>
            </h2>
            <p className="text-slate-600 text-sm sm:text-base leading-relaxed mt-3.5">
              Orthodontic treatment aims to improve alignment, close unwanted spaces, and restore a harmonious relationship between upper and lower teeth.
            </p>
          </div>

          {/* Two 16:9 Showcase Cards (1024x576 - 16:9 Ratio - Zero Cropping) */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Before Card */}
            <div className="bg-white rounded-3xl overflow-hidden border border-slate-200/90 shadow-md p-3 group">
              <div className="relative rounded-2xl overflow-hidden bg-slate-50 aspect-[16/9]">
                <img
                  src="/images/medical-services/dental-care/orthodontic-care/ceramic-braces/before.webp"
                  alt="Pre-treatment dental crowding and malalignment"
                  className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute top-3 left-3">
                  <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-headline font-extrabold bg-slate-900/85 text-white backdrop-blur-md shadow-xs">
                    Before Treatment
                  </span>
                </div>
              </div>
              <div className="p-4 sm:p-5 space-y-1">
                <h4 className="font-headline font-bold text-base text-slate-900">
                  Crowded & Misaligned Teeth
                </h4>
                <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">
                  Crowding, overlapping incisors, or uneven tooth alignment that affects the appearance and chewing function of your smile.
                </p>
              </div>
            </div>

            {/* After Card */}
            <div className="bg-white rounded-3xl overflow-hidden border border-brandSky/40 shadow-md p-3 group">
              <div className="relative rounded-2xl overflow-hidden bg-slate-50 aspect-[16/9]">
                <img
                  src="/images/medical-services/dental-care/orthodontic-care/ceramic-braces/after.webp"
                  alt="Post-treatment aligned teeth with corrected bite relationships"
                  className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute top-3 left-3">
                  <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-headline font-extrabold bg-gradient-to-r from-brandBlue to-brandSky text-white shadow-xs">
                    After Treatment
                  </span>
                </div>
              </div>
              <div className="p-4 sm:p-5 space-y-1">
                <h4 className="font-headline font-bold text-base text-slate-900">
                  Straightened, Harmonious Smile
                </h4>
                <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">
                  Evenly aligned dental arch, balanced upper and lower contact, and confident natural smile aesthetics.
                </p>
              </div>
            </div>
          </div>

          <p className="text-xs text-slate-400 mt-6 text-center italic">
            * Note: These images are illustrative of orthodontic alignment outcomes. For the Jerush website, genuine before-and-after patient photographs are shared only with appropriate clinical consent.
          </p>
        </div>
      </section>

      {/* ─── SECTION 7: Frequently Asked Questions (id="faqs") ─── */}
      <section id="faqs" className="w-full py-16 lg:py-24 bg-gradient-to-b from-slate-50 via-sky-50/20 to-white relative scroll-mt-28 overflow-hidden">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mb-12 text-left">
            <span className="text-xs font-bold text-brandBlue uppercase tracking-wider font-headline block mb-2.5">
              Clear Advice & Answers
            </span>
            <h2
              style={{ lineHeight: 1.4 }}
              className="text-2xl sm:text-3xl lg:text-[36px] font-extrabold font-headline text-slate-900 tracking-tight leading-[1.4]"
            >
              Frequently Asked{' '}
              <span className="bg-gradient-to-r from-brandBlue to-brandSky bg-clip-text text-transparent">
                Questions
              </span>
            </h2>
            <p className="text-slate-600 text-sm sm:text-base leading-relaxed mt-3.5">
              Find answers to common questions about ceramic brace visibility, treatment timeline, food restrictions, staining, and comfort.
            </p>
          </div>

          <div className="space-y-4">
            {FAQS.map((faq, index) => {
              const isExpanded = expandedFaq === index;
              return (
                <motion.div
                  key={index}
                  className={`rounded-2xl overflow-hidden transition-all duration-300 ${isExpanded
                    ? 'bg-gradient-to-r from-white via-blue-50/50 to-sky-50/40 border border-brandSky/40 shadow-md ring-1 ring-brandSky/20'
                    : 'bg-white border border-slate-200/80 hover:border-brandSky/40 hover:shadow-md'
                    }`}
                >
                  <button
                    type="button"
                    onClick={() => setExpandedFaq(isExpanded ? null : index)}
                    className="w-full px-6 py-5 flex items-center justify-between text-left font-headline font-bold text-sm sm:text-base text-slate-900 hover:text-brandBlue transition-colors group cursor-pointer"
                  >
                    <span className="pr-4">{faq.q}</span>
                    <div
                      className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 transition-all duration-300 ${isExpanded
                        ? 'bg-gradient-to-r from-brandBlue to-brandSky text-white rotate-180 shadow-sm'
                        : 'bg-gradient-to-br from-brandBlue/10 to-brandSky/10 text-brandBlue group-hover:bg-brandBlue group-hover:text-white'
                        }`}
                    >
                      <ChevronDown className="w-4 h-4" />
                    </div>
                  </button>

                  <AnimatePresence initial={false}>
                    {isExpanded && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: 'easeInOut' }}
                        className="overflow-hidden"
                      >
                        <div className="px-6 pb-6 pt-2 text-slate-600 text-xs sm:text-sm leading-relaxed border-t border-slate-100 bg-gradient-to-br from-white/40 via-blue-50/20 to-slate-50/50 font-body">
                          {faq.a}
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

      {/* ─── Related Treatments in Orthodontics & Smile Care ─── */}
      <section className="w-full py-16 bg-white border-t border-slate-200/70">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mb-10 text-left">
            <span className="text-xs font-bold text-brandBlue uppercase tracking-wider font-headline block mb-2">
              Complementary Orthodontic & Aesthetic Options
            </span>
            <h2
              style={{ lineHeight: 1.4 }}
              className="text-2xl sm:text-3xl font-extrabold font-headline text-slate-900 tracking-tight leading-[1.4]"
            >
              Related Treatments in{' '}
              <span className="bg-gradient-to-r from-brandBlue to-brandSky bg-clip-text text-transparent">
                Orthodontics & Smile Care
              </span>
            </h2>
            <p className="text-slate-600 text-xs sm:text-sm mt-2">
              Explore our full spectrum of fixed, removable, and cosmetic smile enhancement solutions delivered by hospital specialists across Tamil Nadu.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {RELATED_TREATMENTS.map((item, idx) => (
              <Link
                key={idx}
                to={item.link}
                className={`bg-white rounded-3xl overflow-hidden border border-slate-200/80 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col group ${item.accentBorder}`}
              >
                {/* Framed Image Container: Clean Uncropped Display */}
                <div className="relative p-3 pb-0">
                  <div className="relative rounded-2xl overflow-hidden bg-slate-50 aspect-[4/3] border border-slate-100 shadow-inner">
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

                <div className="p-5 flex flex-col flex-1 justify-between space-y-3">
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

      {/* ─── Bottom CTA Banner (Dr. Neranjana Cutout & Compliant Dark Navy Format) ─── */}
      <TreatmentCtaBanner
        badgeText="START YOUR SMILE JOURNEY"
        titlePrefix="Start Your Smile Journey at"
        highlightWord="Jerush Dentofacial"
        titleSuffix="with Ceramic Braces"
        subtitle="Straightening your teeth does not have to mean choosing the most noticeable braces. Ceramic braces may offer a more discreet fixed option while helping address alignment concerns. At Jerush Dentofacial & Cosmetic Laser Centre, an orthodontic consultation can help you understand whether ceramic braces are suitable and what your personalised treatment plan may involve."
        primaryBtnText="Book an Orthodontic Consultation"
        onPrimaryClick={handleBookClick}
        secondaryBtnText="Call +91 94891 60000"
        secondaryBtnPhone="+919489160000"
        doctorImage="/images/doctors/neranjana2.webp"
        doctorName="DR. NERANJANA"
        doctorRole="Orthodontic Specialist"
        doctorAlt="DR. NERANJANA - Orthodontic Specialist at Jerush Dentofacial & Cosmetic Laser Centre"
      />
    </div>
  );
}

