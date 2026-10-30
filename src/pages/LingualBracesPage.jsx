import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Sparkles, ShieldCheck, Calendar, Phone, CheckCircle2, Clock,
  Award, Smile, ArrowRight, Info, Check, HelpCircle, AlertCircle,
  MapPin, ChevronRight, ChevronDown, Eye, Compass, Shield,
  Stethoscope, AlertTriangle, Layers, CheckSquare, Activity,
  Waves, Sparkle, RefreshCw, Scissors, Heart, EyeOff, Utensils,
  Volume2, MessageSquare, ShieldAlert
} from 'lucide-react';
import PageBreadcrumbHero from '../components/common/PageBreadcrumbHero';
import TreatmentCtaBanner from '../components/common/TreatmentCtaBanner';
import TreatmentSectionNav from '../components/common/TreatmentSectionNav';
import TreatmentAppointmentForm from '../components/common/TreatmentAppointmentForm';
import useTreatmentScrollSpy from '../hooks/useTreatmentScrollSpy';

// Key Stats Bar Data
const STATS = [
  { value: '100% Hidden', label: 'Behind-the-Teeth Fit' },
  { value: '24/7 Alignment', label: 'Continuous Fixed Force' },
  { value: '25,000+', label: 'Smiles Aligned' },
  { value: '4 Regional Centres', label: 'Centres of Excellence' }
];

// Sticky Navigation Tabs
const TABS = [
  { id: 'features', label: 'What Makes Them Different' },
  { id: 'candidates', label: 'Who Can Consider' },
  { id: 'journey', label: 'Treatment Journey' },
  { id: 'adjustment', label: 'Adjustment & Habits' },
  { id: 'comparison', label: 'Treatment Comparison' },
  { id: 'faqs', label: 'FAQs' }
];

// Section 1: 4 Pillars of Lingual Braces Difference (from PDF Page 1)
const LINGUAL_PILLARS = [
  {
    id: 'hidden-placement',
    title: 'Hidden Inner Placement',
    subtitle: 'Invisible From the Front',
    desc: 'Brackets are attached to the inner (lingual) surfaces of your teeth facing the tongue, making them completely hidden from view when you smile, speak, or laugh.',
    image: '/images/medical-services/dental-care/orthodontic-care/lingual-braces/lingual-braces-different.webp',
    alt: 'Dual dental arch typodont showing lingual brackets on the inner teeth surfaces',
    tag: '100% Discreet',
    badgeColor: 'bg-sky-50 text-brandSky border-brandSky/20',
    accentBorder: 'hover:border-sky-400/70',
    features: [
      'Zero visible front brackets or archwires',
      'Uninterrupted smile aesthetics for public-facing careers',
      'Custom-contoured to fit individual lingual tooth contours'
    ]
  },
  {
    id: 'fixed-treatment',
    title: 'Fixed Orthodontic Treatment',
    subtitle: 'Continuous 24/7 Movement',
    desc: 'The braces remain securely attached throughout treatment and are periodically adjusted by your orthodontist, moving teeth without relying on removable aligner discipline.',
    image: '/images/medical-services/dental-care/orthodontic-care/lingual-braces/fixed-treatment.webp',
    alt: 'Fixed lingual orthodontic system bonded to tooth lingual surfaces',
    tag: 'Continuous Force',
    badgeColor: 'bg-blue-50 text-brandBlue border-brandBlue/20',
    accentBorder: 'hover:border-brandBlue/70',
    features: [
      'Works 24 hours a day without daily wear tracking',
      'No risk of losing trays during dining or social events',
      'Controlled biomechanical forces for complex movements'
    ]
  },
  {
    id: 'personalised-movement',
    title: 'Personalised Tooth Movement',
    subtitle: 'Custom Digital Planning',
    desc: 'Your orthodontist custom-plans the wire and bracket system to address your unique tooth anatomy, bite dynamics, and specific aesthetic alignment goals.',
    image: '/images/medical-services/dental-care/orthodontic-care/lingual-braces/personalised-tooth-movement.webp',
    alt: 'Orthodontic digital planning for personalised lingual tooth movement',
    tag: 'Custom Engineered',
    badgeColor: 'bg-indigo-50 text-indigo-700 border-indigo-200',
    accentBorder: 'hover:border-indigo-400/70',
    features: [
      'Individually cast brackets tailored to your inner tooth curvature',
      'Digitally shaped archwires programmed for gradual correction',
      'Specialist biomechanical control for high clinical predictability'
    ]
  },
  {
    id: 'discreet-alternative',
    title: 'A Discreet Alternative',
    subtitle: 'Confidence in Professional Life',
    desc: 'An optimal solution for adults, university students, and professionals who prefer the proven mechanics of fixed braces without any visible metal or ceramic hardware.',
    image: '/images/medical-services/dental-care/orthodontic-care/lingual-braces/discreet-alternative.webp',
    alt: 'Professional smiling with complete confidence wearing hidden lingual braces',
    tag: 'Social Confidence',
    badgeColor: 'bg-emerald-50 text-emerald-700 border-emerald-200',
    accentBorder: 'hover:border-emerald-400/70',
    features: [
      'Ideal for media, client-facing, and executive roles',
      'Enables normal smiling during photo shoots and presentations',
      'Preserves facial aesthetics while teeth undergo continuous alignment'
    ]
  }
];

// Section 2: 4 Candidate Indications (from PDF Page 2)
const CANDIDATE_INDICATIONS = [
  {
    number: '01',
    title: 'Crowded Teeth',
    lead: 'Overlapping or Tight Spacing',
    desc: 'When teeth overlap or lack enough arch space, lingual braces exert gentle continuous pressure from the inside to guide teeth into harmonious alignment.',
    image: '/images/medical-services/dental-care/orthodontic-care/lingual-braces/crowded-teeth.webp',
    alt: 'Severe dental crowding before lingual orthodontic treatment',
    clinicalFocus: 'Arch Expansion & Uncrowding',
    tag: 'Crowding'
  },
  {
    number: '02',
    title: 'Gaps Between Teeth',
    lead: 'Diastema & Spacing Issues',
    desc: 'When noticeable gaps or excessive spacing exist between anterior teeth, custom lingual archwires pull teeth together smoothly without visible front attachments.',
    image: '/images/medical-services/dental-care/orthodontic-care/lingual-braces/gaps-between-teeth.webp',
    alt: 'Dental diastema and space closure using lingual orthodontic appliances',
    clinicalFocus: 'Controlled Space Closure',
    tag: 'Spacing'
  },
  {
    number: '03',
    title: 'Rotated Teeth',
    lead: 'Individual Tooth Repositioning',
    desc: 'When teeth are twisted or rotated along their long axis, lingual brackets provide the rotational leverage needed to derotate teeth into proper arch form.',
    image: '/images/medical-services/dental-care/orthodontic-care/lingual-braces/rotated-teeth.webp',
    alt: 'Correcting twisted and rotated anterior teeth with inner lingual brackets',
    clinicalFocus: 'Rotational Moment Control',
    tag: 'Rotation'
  },
  {
    number: '04',
    title: 'Selected Bite Problems',
    lead: 'Overbite, Underbite & Crossbite',
    desc: 'When upper and lower teeth do not meet correctly, the orthodontist assesses whether lingual mechanics can achieve the required functional occlusion.',
    image: '/images/medical-services/dental-care/orthodontic-care/lingual-braces/selected-bite-problems.webp',
    alt: 'Evaluating bite relationship and dental occlusion for lingual braces suitability',
    clinicalFocus: 'Occlusal Relationship',
    tag: 'Bite Correction'
  }
];

// Section 3: 4 Treatment Journey Steps (from PDF Page 3)
const JOURNEY_STEPS = [
  {
    step: '01',
    title: 'Orthodontic Assessment',
    subtitle: 'Diagnostic Scans & Planning',
    desc: 'Your orthodontist examines your teeth, bite, and gum health. High-resolution photographs, 3D digital intraoral scans, and digital X-rays are used to plan your exact tooth movements.',
    image: '/images/medical-services/dental-care/orthodontic-care/lingual-braces/orthodontic-assessment.webp',
    alt: 'Comprehensive orthodontic examination and 3D digital smile scan at Jerush',
    tag: 'Diagnostic Roadmap',
    duration: 'Visit 1'
  },
  {
    step: '02',
    title: 'Placing the Braces',
    subtitle: 'Precision Inner Bonding',
    desc: 'Custom-fabricated brackets are carefully attached to the inner surfaces of your teeth and connected with specialised orthodontic archwires according to your personalised treatment plan.',
    image: '/images/medical-services/dental-care/orthodontic-care/lingual-braces/placing-the-braces.webp',
    alt: 'Specialist orthodontist placing custom lingual brackets on the inner tooth surfaces',
    tag: 'Custom Placement',
    duration: 'Visit 2'
  },
  {
    step: '03',
    title: 'Monitoring Tooth Movement',
    subtitle: 'Regular Adjustments & Review',
    desc: 'Regular appointments allow the orthodontist to assess progress, refine archwire tensions, and make adjustments. You will be guided through tongue adaptation and oral hygiene techniques.',
    image: '/images/medical-services/dental-care/orthodontic-care/lingual-braces/monitor-tooth-movement.webp',
    alt: 'Periodic orthodontic review and wire adjustments for lingual braces',
    tag: 'Biomechanical Progress',
    duration: 'Every 4-6 Weeks'
  },
  {
    step: '04',
    title: 'Retaining Your Results',
    subtitle: 'Custom Retainers & Stability',
    desc: 'Once braces are removed, your orthodontist provides custom retainers to stabilize teeth in their corrected positions, preventing relapse and maintaining your lifelong smile.',
    image: '/images/medical-services/dental-care/orthodontic-care/lingual-braces/retaining-your-results.webp',
    alt: 'Custom orthodontic retainer preserving corrected teeth alignment after lingual braces',
    tag: 'Lifelong Retention',
    duration: 'Completion'
  }
];

// Section 4: 6 Adjustment Period Habits (from PDF Page 3 & 4)
const ADJUSTMENT_HABITS = [
  {
    id: 'speaking',
    title: 'Practise Speaking Normally',
    desc: 'Because brackets sit near the tongue, slight speech changes can occur initially. Reading aloud and talking normally speeds up tongue adaptation within a few days.',
    image: '/images/medical-services/dental-care/orthodontic-care/lingual-braces/practice-speaking-normally.webp',
    alt: 'Practising natural speech and pronunciation during lingual braces adaptation',
    icon: Volume2,
    tip: 'Read aloud 10 minutes daily to adapt quickly'
  },
  {
    id: 'softer-food',
    title: 'Choose Softer Foods Initially',
    desc: 'Choose softer foods such as soups, smoothies, steamed vegetables, and yoghurt during the first few days when your tongue and teeth feel tender.',
    image: '/images/medical-services/dental-care/orthodontic-care/lingual-braces/choose-softer-food.webp',
    alt: 'Selecting softer nutritious foods during the initial lingual braces adjustment period',
    icon: Utensils,
    tip: 'Opt for pasta, eggs, and soft cooked grains'
  },
  {
    id: 'brush-carefully',
    title: 'Brush Carefully Around Brackets',
    desc: 'Brush thoroughly along the gumline and behind the teeth where brackets sit. Angle your toothbrush bristles carefully to clear food particles from under the wire.',
    image: '/images/medical-services/dental-care/orthodontic-care/lingual-braces/brush-carefully.webp',
    alt: 'Diligent toothbrushing on inner surfaces of teeth around lingual brackets',
    icon: Sparkles,
    tip: 'Brush after every meal for 2 full minutes'
  },
  {
    id: 'cleaning-aids',
    title: 'Use Suitable Interdental Aids',
    desc: 'Use interdental brushes, orthodontic floss threaders, or water flossers recommended by your orthodontist to keep spaces between brackets spotlessly clean.',
    image: '/images/medical-services/dental-care/orthodontic-care/lingual-braces/use-cleaning-aids.webp',
    alt: 'Using specialized interdental brushes to clean between lingual brackets and wires',
    icon: CheckSquare,
    tip: 'Specialist brushes reach tight lingual spaces'
  },
  {
    id: 'avoid-hard-foods',
    title: 'Avoid Hard or Sticky Foods',
    desc: 'Steer clear of hard candies, nuts, chewing gum, and sticky caramels that could dislodge a bracket or distort your inner orthodontic archwire.',
    image: '/images/medical-services/dental-care/orthodontic-care/lingual-braces/avoid-hard-sticky-foods.webp',
    alt: 'Avoiding hard and sticky foods to protect inner lingual orthodontic brackets',
    icon: AlertTriangle,
    tip: 'Cut apples and firm fruits into thin bite slices'
  },
  {
    id: 'contact-orthodontist',
    title: 'Contact Orthodontist When Needed',
    desc: 'If a wire repeatedly irritates your tongue or a bracket feels loose, apply orthodontic relief wax and contact our clinic for a prompt, comfortable adjustment.',
    image: '/images/medical-services/dental-care/orthodontic-care/lingual-braces/contact-orthodontist.webp',
    alt: 'Direct clinical support from orthodontist for lingual bracket comfort and care',
    icon: Phone,
    tip: 'Specialist orthodontic support across 4 centres'
  }
];

// Section 5: Direct Comparison Data (from PDF Page 4 & 5)
const COMPARISON_ROWS = [
  {
    feature: 'Visibility',
    lingual: '100% hidden on inner surfaces of teeth',
    ceramic: 'Tooth-coloured translucent front brackets',
    aligners: 'Clear plastic removable aligner trays'
  },
  {
    feature: 'Removability',
    lingual: 'Fixed 24/7 (cannot be misplaced)',
    ceramic: 'Fixed 24/7 (cannot be misplaced)',
    aligners: 'Removable (must be worn 22 hours daily)'
  },
  {
    feature: 'Speech Adjustment',
    lingual: 'May affect speech initially; tongue adapts over 1-2 weeks',
    ceramic: 'Minimal tongue interference; lips adapt quickly',
    aligners: 'Minor temporary lisp during the first few days'
  },
  {
    feature: 'Daily Cleaning',
    lingual: 'Requires dedicated cleaning behind teeth with interdental aids',
    ceramic: 'Requires careful cleaning around front brackets',
    aligners: 'Trays are removed for standard brushing and flossing'
  },
  {
    feature: 'Best Choice For',
    lingual: 'Maximum aesthetic secrecy with continuous fixed force',
    ceramic: 'Cost-effective subtlety without metal appearance',
    aligners: 'Discreet alignment with lifestyle flexibility for mild-moderate cases'
  }
];

// 7 FAQs from PDF Page 5 & 6
const FAQS = [
  {
    q: 'Are lingual braces completely invisible?',
    a: 'They are much less visible than braces attached to the front of the teeth because the brackets sit on the inner (lingual) surfaces facing your tongue. Unless someone looks closely inside your mouth when it is opened widely, they remain virtually undetectable in normal social and professional situations.'
  },
  {
    q: 'Do lingual braces affect speech?',
    a: 'They can temporarily affect pronunciation because your tongue touches the brackets when pronouncing sounds like "s", "t", and "th". Most patients adapt comfortably within one to two weeks by practising reading aloud and speaking normally.'
  },
  {
    q: 'Are lingual braces painful?',
    a: 'Some mild pressure, tooth tenderness, and tongue irritation are common during the first few days after placement or adjustments. Orthodontic relief wax, warm salt water rinses, and soft foods can significantly reduce discomfort while your mouth adapts.'
  },
  {
    q: 'How long does lingual braces treatment take?',
    a: 'Treatment duration depends on the complexity of your bite, the tooth movements required, and individual biological response. Most comprehensive treatments range between 12 to 24 months. Your orthodontist will provide an estimated timeframe following your 3D digital assessment.'
  },
  {
    q: 'Can lingual braces correct crowded teeth and gaps?',
    a: 'Yes. Lingual braces can treat many alignment issues, including moderate-to-severe crowding, spacing (diastema), and selected bite discrepancies. Suitability depends on your specific jaw dynamics, bite depth, and crown anatomy.'
  },
  {
    q: 'Are lingual braces harder to clean?',
    a: 'Cleaning can be slightly more demanding because the brackets sit on the inner surfaces where direct visual inspection is harder. Using specialised angled toothbrushes, interdental brushes, and water flossers ensures thorough plaque removal around every bracket.'
  },
  {
    q: 'Are lingual braces better than clear aligners?',
    a: 'Neither option is universally superior. Lingual braces offer total front-facing invisibility combined with the continuous 24/7 force of a fixed appliance, which is ideal if you do not want to manage removable trays. Clear aligners offer convenience for eating and cleaning. The right choice depends on your clinical bite needs and personal lifestyle.'
  }
];

// Related Orthodontic Treatments
const RELATED_TREATMENTS = [
  {
    title: 'Ceramic Braces',
    desc: 'Tooth-coloured translucent ceramic brackets that blend in naturally with enamel for discreet smile correction.',
    image: '/images/medical-services/dental-care/orthodontic-care/ceramic-braces/straighten-your-smile.webp',
    alt: 'Ceramic clear braces treatment at Jerush',
    link: '/dental-care/orthodontic-care/ceramic-braces',
    badge: 'Discreet Fixed',
    badgeColor: 'bg-sky-50 text-brandSky border-brandSky/20',
    accentBorder: 'hover:border-brandSky/60'
  },
  {
    title: 'Jerushaligne Clear Aligners',
    desc: 'Custom invisible 3D aligners designed to straighten teeth comfortably without fixed wires or brackets.',
    image: '/images/medical-services/dental-care/jerushaligne/virtually-invisible.webp',
    alt: 'Jerushaligne custom clear aligners for invisible teeth straightening',
    link: '/dental-care/orthodontic-care/clear-aligners-jerushaligne',
    badge: 'Removable Trays',
    badgeColor: 'bg-emerald-50 text-emerald-700 border-emerald-200',
    accentBorder: 'hover:border-emerald-500/60'
  },
  {
    title: 'Precision Metal Braces',
    desc: 'Low-profile German stainless steel brackets delivering reliable, high-precision tooth alignment at every age.',
    image: '/images/medical-services/dental-care/metal-braces/modern-metal-upgrade.webp',
    alt: 'Modern low-profile metal braces at Jerush',
    link: '/dental-care/orthodontic-care/metal-braces',
    badge: 'Maximum Durability',
    badgeColor: 'bg-blue-50 text-brandBlue border-brandBlue/20',
    accentBorder: 'hover:border-brandBlue/60'
  },
  {
    title: 'Retainers & Space Maintainers',
    desc: 'Post-alignment retention appliances designed to preserve your newly perfected smile for a lifetime.',
    image: '/images/medical-services/dental-care/orthodontic-care/lingual-braces/retaining-your-results.webp',
    alt: 'Orthodontic retainers for smile stability at Jerush',
    link: '/dental-care/kids-dentistry/space-maintainers',
    badge: 'Smile Retention',
    badgeColor: 'bg-purple-50 text-purple-700 border-purple-200',
    accentBorder: 'hover:border-purple-500/60'
  }
];

export default function LingualBracesPage() {
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
    // Canonical SEO Setup from PDF Page 6
    document.title = 'Lingual Braces Treatment for Discreet Teeth Straightening | Jerush';

    let metaDesc = document.querySelector('meta[name="description"]');
    if (!metaDesc) {
      metaDesc = document.createElement('meta');
      metaDesc.name = 'description';
      document.head.appendChild(metaDesc);
    }
    metaDesc.content = 'Discover lingual braces, the discreet orthodontic option fitted behind your teeth. Learn about suitability, treatment, comfort and aftercare at Jerush.';

    let metaKeywords = document.querySelector('meta[name="keywords"]');
    if (!metaKeywords) {
      metaKeywords = document.createElement('meta');
      metaKeywords.name = 'keywords';
      document.head.appendChild(metaKeywords);
    }
    metaKeywords.content = 'Invisible braces, braces behind teeth, lingual orthodontics, discreet teeth straightening, orthodontic treatment, lingual braces Tamil Nadu';

    // Inject FAQ Schema
    const faqSchemaScript = document.createElement('script');
    faqSchemaScript.type = 'application/ld+json';
    faqSchemaScript.id = 'faq-schema-lingual-braces';
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
      const existingScript = document.getElementById('faq-schema-lingual-braces');
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
        title="Lingual Braces"
        breadcrumbs={[
          { label: 'Dental Care', path: '/treatments' },
          { label: 'Orthodontic Care', path: '/treatments?category=dental&sub=Orthodontic%20Care' },
          { label: 'Lingual Braces', active: true }
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
                  Lingual Braces:{' '}
                  <span className="bg-gradient-to-r from-brandBlue to-brandSky bg-clip-text text-transparent">
                    Straighten Your Teeth Without Brackets on the Front
                  </span>
                </h1>
                <p className="text-slate-600 text-base sm:text-lg leading-relaxed mt-4">
                  If you want to improve your tooth alignment while keeping your braces hidden from view, lingual braces may be an option worth exploring. Unlike conventional braces, which are attached to the front surfaces of the teeth, lingual braces are fixed to the inner surfaces facing the tongue.
                </p>
                <div className="mt-4 p-4.5 rounded-2xl bg-white/95 backdrop-blur-sm border border-slate-200/90 shadow-sm space-y-2">
                  <p className="text-slate-700 text-sm sm:text-base leading-relaxed">
                    They use brackets and orthodontic wires to move teeth gradually according to a personalised treatment plan. Because the braces sit behind the teeth, they are completely hidden when you smile or speak.
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
                  <span>100% Hidden on Inner Teeth Surfaces</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Check className="w-4 h-4 text-brandBlue shrink-0" />
                  <span>Continuous 24/7 Fixed Force</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Check className="w-4 h-4 text-brandBlue shrink-0" />
                  <span>Custom Digital Fit for Tongue Comfort</span>
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
                    src="/images/medical-services/dental-care/orthodontic-care/lingual-braces/teeth-without-brackets.webp"
                    alt="Lingual braces fitted to the inner surfaces of teeth for discreet orthodontic treatment"
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
        treatmentName="Lingual Braces"
        title="Book an Orthodontic Consultation"
        highlightWord="Discreet Inner Teeth Alignment"
        subtitle="Straighten crowded or spaced teeth with custom braces fitted on the inner tooth surfaces. Schedule a comprehensive diagnostic scan at Jerush across Tamil Nadu."
        features={[
          {
            icon: EyeOff,
            title: '100% Discreet Aesthetics',
            desc: 'Fitted completely on inner surfaces facing the tongue, hidden from view when talking or smiling.'
          },
          {
            icon: Clock,
            title: 'Continuous 24/7 Movement',
            desc: 'Fixed brackets maintain steady alignment forces without daily tray management or compliance worries.'
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

      {/* ─── SECTION 1: What Makes Lingual Braces Different? (id="features") ─── */}
      <section
        id="features"
        className="w-full py-16 lg:py-24 bg-gradient-to-b from-slate-50 via-sky-50/20 to-white relative scroll-mt-28 border-b border-slate-200/70 overflow-hidden"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mb-12 text-left">
            <span className="text-xs font-bold text-brandBlue uppercase tracking-wider font-headline block mb-2.5">
              Inner Arch Mechanics
            </span>
            <h2
              style={{ lineHeight: 1.4 }}
              className="text-2xl sm:text-3xl lg:text-[36px] font-extrabold font-headline text-slate-900 tracking-tight leading-[1.4]"
            >
              What Makes Lingual Braces{' '}
              <span className="bg-gradient-to-r from-brandBlue to-brandSky bg-clip-text text-transparent">
                Different?
              </span>
            </h2>
            <p className="text-slate-600 text-sm sm:text-base leading-relaxed mt-3.5">
              Lingual braces work on the same general principle as traditional fixed braces, but their inner placement changes how they look and feel throughout your smile journey.
            </p>
          </div>

          {/* 4 Pillars Grid (Native 3:2 / 16:9 Ratios - Zero Cropping) */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {LINGUAL_PILLARS.map((pillar, index) => (
              <motion.div
                key={pillar.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className={`bg-white rounded-3xl overflow-hidden border border-slate-200/80 shadow-md hover:shadow-xl transition-all duration-300 flex flex-col group ${pillar.accentBorder}`}
              >
                {/* 16:10 Framed Image Container */}
                <div className="relative p-3 pb-0">
                  <div className="relative rounded-2xl overflow-hidden bg-slate-50 aspect-[16/10] border border-slate-100 shadow-inner">
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
                Fixed Appliance Dynamics & Tongue Adaptation
              </h4>
              <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">
                Lingual braces are not removable like clear aligners. Although they are discreet and remain completely hidden from the front, they can take a short time to get used to because the brackets sit close to the tongue.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ─── SECTION 2: Who Might Consider Lingual Braces? (id="candidates") ─── */}
      <section
        id="candidates"
        className="w-full py-16 lg:py-24 bg-white relative scroll-mt-28 border-b border-slate-200/70 overflow-hidden"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mb-12 text-left">
            <span className="text-xs font-bold text-brandBlue uppercase tracking-wider font-headline block mb-2.5">
              Candidate Indications & Bite Concerns
            </span>
            <h2
              style={{ lineHeight: 1.4 }}
              className="text-2xl sm:text-3xl lg:text-[36px] font-extrabold font-headline text-slate-900 tracking-tight leading-[1.4]"
            >
              Who Might Consider{' '}
              <span className="bg-gradient-to-r from-brandBlue to-brandSky bg-clip-text text-transparent">
                Lingual Braces?
              </span>
            </h2>
            <p className="text-slate-600 text-sm sm:text-base leading-relaxed mt-3.5">
              Lingual braces may be suitable for adults and selected teenagers who want a discreet way to correct their teeth. The orthodontist will assess whether the system can address specific alignment and bite concerns:
            </p>
          </div>

          {/* 4 Conditions (Native 1024x682 3:2 Ratio - Framed with Clean Aspect) */}
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
                {/* 16:10 Aspect Container with Framed Padding */}
                <div className="relative p-3 pb-0">
                  <div className="relative rounded-2xl overflow-hidden bg-slate-50 aspect-[16/10] border border-slate-100 shadow-inner">
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
              Lingual braces are not the best option for every case. Your orthodontist may recommend another treatment if the bite, tooth shape or complexity of the required movement makes lingual braces unsuitable.
            </span>
          </div>
        </div>
      </section>

      {/* ─── SECTION 3: Your Treatment Journey: From Planning to Retention (id="journey") ─── */}
      <section
        id="journey"
        className="w-full py-16 lg:py-24 bg-gradient-to-b from-slate-50 via-sky-50/20 to-white relative scroll-mt-28 border-b border-slate-200/70 overflow-hidden"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mb-12 text-left">
            <span className="text-xs font-bold text-brandBlue uppercase tracking-wider font-headline block mb-2.5">
              Step-by-Step Clinical Care
            </span>
            <h2
              style={{ lineHeight: 1.4 }}
              className="text-2xl sm:text-3xl lg:text-[36px] font-extrabold font-headline text-slate-900 tracking-tight leading-[1.4]"
            >
              Your Treatment Journey:{' '}
              <span className="bg-gradient-to-r from-brandBlue to-brandSky bg-clip-text text-transparent">
                From Planning to Retention
              </span>
            </h2>
            <p className="text-slate-600 text-sm sm:text-base leading-relaxed mt-3.5">
              A structured orthodontic journey ensures your lingual braces deliver maximum precision, continuous comfort, and lasting alignment stability.
            </p>
          </div>

          {/* 4 Journey Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {JOURNEY_STEPS.map((step, idx) => (
              <motion.div
                key={step.step}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className="bg-white rounded-3xl overflow-hidden border border-slate-200/90 shadow-md hover:shadow-xl transition-all duration-300 flex flex-col group hover:border-brandBlue/60"
              >
                {/* Framed Image Container */}
                <div className="relative p-3 pb-0">
                  <div className="relative rounded-2xl overflow-hidden bg-slate-50 aspect-[16/10] border border-slate-100 shadow-inner">
                    <img
                      src={step.image}
                      alt={step.alt}
                      className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute top-2.5 left-2.5">
                      <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-headline font-black bg-brandBlue text-white shadow-xs">
                        <span>STAGE {step.step}</span>
                      </span>
                    </div>
                    <div className="absolute bottom-2.5 right-2.5">
                      <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-headline font-bold bg-white/95 text-slate-800 shadow-xs backdrop-blur-md border border-slate-200">
                        {step.duration}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Content */}
                <div className="p-5 sm:p-6 flex flex-col flex-1 justify-between space-y-3">
                  <div>
                    <h3 className="font-headline font-bold text-lg text-slate-900 group-hover:text-brandBlue transition-colors">
                      {step.title}
                    </h3>
                    <p className="text-xs font-semibold text-brandSky uppercase tracking-wider mt-0.5">
                      {step.subtitle}
                    </p>
                    <p className="text-slate-600 text-xs sm:text-sm leading-relaxed mt-2.5">
                      {step.desc}
                    </p>
                  </div>

                  <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-500">
                    <span>Clinical Focus</span>
                    <strong className="text-slate-800 font-semibold">{step.tag}</strong>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── SECTION 4: The Adjustment Period: Speech, Comfort and Cleaning (id="adjustment") ─── */}
      <section
        id="adjustment"
        className="w-full py-16 lg:py-24 bg-white relative scroll-mt-28 border-b border-slate-200/70 overflow-hidden"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mb-12 text-left">
            <span className="text-xs font-bold text-brandBlue uppercase tracking-wider font-headline block mb-2.5">
              Daily Living & Oral Hygiene
            </span>
            <h2
              style={{ lineHeight: 1.4 }}
              className="text-2xl sm:text-3xl lg:text-[36px] font-extrabold font-headline text-slate-900 tracking-tight leading-[1.4]"
            >
              The Adjustment Period:{' '}
              <span className="bg-gradient-to-r from-brandBlue to-brandSky bg-clip-text text-transparent">
                Speech, Comfort & Cleaning
              </span>
            </h2>
            <p className="text-slate-600 text-sm sm:text-base leading-relaxed mt-3.5">
              Because lingual braces sit close to the tongue, the first few days or weeks may feel different from wearing conventional braces. You can make the adjustment period smoother and easier by following these six practical habits:
            </p>
          </div>

          {/* 6 Habit Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {ADJUSTMENT_HABITS.map((habit, idx) => {
              const IconComp = habit.icon;
              return (
                <motion.div
                  key={habit.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.45, delay: idx * 0.08 }}
                  className="bg-white rounded-3xl overflow-hidden border border-slate-200/90 shadow-md hover:shadow-xl transition-all duration-300 flex flex-col group hover:border-brandSky/60"
                >
                  {/* Framed Image Container */}
                  <div className="relative p-3 pb-0">
                    <div className="relative rounded-2xl overflow-hidden bg-slate-50 aspect-[16/10] border border-slate-100 shadow-inner">
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
                  <div className="p-5 sm:p-6 flex flex-col flex-1 justify-between space-y-3">
                    <div>
                      <h3 className="font-headline font-bold text-base sm:text-lg text-slate-900 group-hover:text-brandBlue transition-colors">
                        {habit.title}
                      </h3>
                      <p className="text-slate-600 text-xs sm:text-sm leading-relaxed mt-2">
                        {habit.desc}
                      </p>
                    </div>

                    <div className="pt-3 border-t border-slate-100 flex items-center gap-2 text-xs text-brandBlue font-medium">
                      <CheckCircle2 className="w-3.5 h-3.5 text-brandSky shrink-0" />
                      <span>{habit.tip}</span>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>

          {/* Clinical Hygiene Advisory */}
          <div className="mt-10 p-5 sm:p-6 rounded-2xl bg-amber-50/70 border border-amber-200/80 shadow-sm flex flex-col sm:flex-row items-start sm:items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-amber-100/80 border border-amber-300 text-amber-800 flex items-center justify-center shrink-0">
              <ShieldAlert className="w-6 h-6" />
            </div>
            <div className="space-y-1">
              <h4 className="font-headline font-bold text-sm sm:text-base text-amber-950">
                Plaque Prevention & Gingival Health
              </h4>
              <p className="text-amber-900 text-xs sm:text-sm leading-relaxed">
                Keeping the inner surfaces of your teeth clean can take extra care with lingual braces. Diligent daily oral hygiene reduces the risk of gum inflammation, enamel decay, and white spots around inner brackets.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ─── SECTION 5: Lingual Braces vs. Other Orthodontic Options (id="comparison") ─── */}
      <section
        id="comparison"
        className="w-full py-16 lg:py-24 bg-gradient-to-b from-slate-50 via-sky-50/20 to-white relative scroll-mt-28 border-b border-slate-200/70 overflow-hidden"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mb-12 text-left">
            <span className="text-xs font-bold text-brandBlue uppercase tracking-wider font-headline block mb-2.5">
              Comprehensive Appliance Comparison
            </span>
            <h2
              style={{ lineHeight: 1.4 }}
              className="text-2xl sm:text-3xl lg:text-[36px] font-extrabold font-headline text-slate-900 tracking-tight leading-[1.4]"
            >
              Lingual Braces vs.{' '}
              <span className="bg-gradient-to-r from-brandBlue to-brandSky bg-clip-text text-transparent">
                Other Orthodontic Options
              </span>
            </h2>
            <p className="text-slate-600 text-sm sm:text-base leading-relaxed mt-3.5">
              Choosing an orthodontic system involves more than appearance. Consider the differences in mechanics, speech adjustment, and daily maintenance before deciding which approach to discuss with your orthodontist.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            {/* Left Column: Visual Card (1024x630 - 16:10 Ratio) */}
            <div className="lg:col-span-5">
              <div className="relative rounded-3xl overflow-hidden bg-white border border-slate-200 shadow-xl p-3 group">
                <div className="relative rounded-2xl overflow-hidden bg-slate-50 aspect-[16/10]">
                  <img
                    src="/images/medical-services/dental-care/orthodontic-care/lingual-braces/four-orthodontic-options.webp"
                    alt="Side-by-side comparison of modern orthodontic options including lingual, ceramic, and aligners"
                    className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700"
                  />
                </div>
                <div className="p-4 space-y-1.5">
                  <h4 className="font-headline font-bold text-sm sm:text-base text-slate-900">
                    Aesthetics, Fixed Force & Lifestyle Match
                  </h4>
                  <p className="text-slate-600 text-xs leading-relaxed">
                    There is no single best option for everyone. Your orthodontist can explain the expected treatment duration, practical considerations, and investment of each suitable system.
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
                          Lingual Braces
                        </th>
                        <th className="p-4 sm:p-5 text-xs font-headline font-bold uppercase tracking-wider text-slate-300">
                          Ceramic Braces
                        </th>
                        <th className="p-4 sm:p-5 text-xs font-headline font-bold uppercase tracking-wider text-slate-300">
                          Clear Aligners
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
                            {row.lingual}
                          </td>
                          <td className="p-4 sm:p-5 text-slate-600">
                            {row.ceramic}
                          </td>
                          <td className="p-4 sm:p-5 text-slate-600">
                            {row.aligners}
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

      {/* ─── SECTION 6: Frequently Asked Questions (id="faqs") ─── */}
      <section
        id="faqs"
        className="w-full py-16 lg:py-24 bg-white relative scroll-mt-28 border-b border-slate-200/70 overflow-hidden"
      >
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-xs font-bold text-brandBlue uppercase tracking-wider font-headline block mb-2.5">
              Clear Clinical Answers
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
              Everything you need to know about hidden lingual braces, speech adjustment, comfort, and clinical suitability at Jerush.
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
                      className={`w-7 h-7 rounded-full flex items-center justify-center shrink-0 transition-transform duration-300 ${isOpen ? 'bg-brandBlue text-white rotate-180' : 'bg-slate-100 text-slate-600'
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

      {/* ─── SECTION 7: Related Orthodontic Treatments ─── */}
      <section className="w-full py-16 lg:py-20 bg-slate-50/60 border-b border-slate-200/70">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mb-12 text-left">
            <span className="text-xs font-bold text-brandBlue uppercase tracking-wider font-headline block mb-2.5">
              Comprehensive Orthodontic Options
            </span>
            <h2
              style={{ lineHeight: 1.4 }}
              className="text-2xl sm:text-3xl lg:text-[36px] font-extrabold font-headline text-slate-900 tracking-tight leading-[1.4]"
            >
              Related Treatments in{' '}
              <span className="bg-gradient-to-r from-brandBlue to-brandSky bg-clip-text text-transparent">
                Orthodontic Care
              </span>
            </h2>
            <p className="text-slate-600 text-sm sm:text-base leading-relaxed mt-3.5">
              Explore alternative and complementary orthodontic treatments provided by hospital specialists across Tamil Nadu.
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

                <div className="p-4 sm:p-5 flex flex-col flex-1 justify-between space-y-3">
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

      {/* ─── Bottom CTA Banner (Dr. A. Bladbin Cutout & Compliant Dark Navy Format from PDF Page 6) ─── */}
      <TreatmentCtaBanner
        badgeText="SPECIALIST ORTHODONTIC CARE"
        titlePrefix="Discover a More Discreet"
        highlightWord="Orthodontic Option"
        titleSuffix="at Jerush"
        subtitle="You can work towards a straighter smile while choosing an orthodontic option that fits your preferences. Lingual braces offer a discreet fixed approach, but a personalised assessment is essential to determine whether they are suitable for your teeth and bite."
        primaryBtnText="Book Lingual Consultation"
        onPrimaryClick={handleBookClick}
        secondaryBtnText="Call +91 94891 60000"
        secondaryBtnPhone="+919489160000"
        doctorImage="/images/doctors/dr-bladbin-portrait.webp"
        doctorName="DR. A. BLADBIN"
        doctorRole="Chief Craniofacial & Dental Surgeon"
      />
    </div>
  );
}

