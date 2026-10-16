import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ShieldCheck, Star, ChevronDown, Calendar, Phone, MapPin,
  CheckCircle2, ArrowRight, Clock, Users, Award, Heart, Sparkles,
  ExternalLink, Zap, RefreshCw, Smile, FileText, Check, Shield,
  Layers, CheckCircle, MessageCircle, ChevronLeft, ChevronRight, Quote
} from 'lucide-react';
import PageBreadcrumbHero from '../components/common/PageBreadcrumbHero';
import TreatmentCtaBanner from '../components/common/TreatmentCtaBanner';
import TreatmentSectionNav from '../components/common/TreatmentSectionNav';
import useTreatmentScrollSpy from '../hooks/useTreatmentScrollSpy';

const STATS = [
  { value: '25,000+', label: 'Smiles Aligned' },
  { value: '30% Smaller', label: 'Micro-Sized German Steel' },
  { value: '0% EMI', label: 'Monthly Payment Plans' },
  { value: '4 Regional Centres', label: 'Tamil Nadu & Global' }
];

const TABS = [
  { id: 'upgrade', label: '1. The Modern Upgrade' },
  { id: 'why-steel', label: '2. Why Steel Rules' },
  { id: 'transformations', label: '3. Real Transformations' },
  { id: 'hardware', label: '4. Hardware Options' },
  { id: 'what-we-fix', label: '5. What We Fix' },
  { id: 'journey', label: '6. 4-Step Journey' },
  { id: 'faqs', label: '7. FAQs' }
];

const REVIEWS = [
  {
    name: 'Anand S.',
    location: 'Trichy Regional Centre',
    tag: 'Severe Crowding • 14 Months',
    image: '/images/testimonials/anand-s-metal-braces-trichy.webp',
    review: 'I had severe overlapping front teeth and was worried about braces looking bulky. But the German micro-brackets at Jerush were ultra-smooth, low-profile, and caused zero ulcers. My alignment was completely perfected in 14 months!',
    treatment: 'Micro-Bracket Metal Braces'
  },
  {
    name: 'Julie M.',
    location: 'Chennai Metro Centre',
    tag: 'Rotated Canine Correction • 12 Months',
    image: '/images/testimonials/julie-metal-braces-chennai.webp',
    review: 'My upper canine was rotated 45 degrees, and other clinics suggested tooth extractions. Jerush’s orthodontic team used smart shape-memory wires to gently guide it into place without losing a single tooth in 12 months!',
    treatment: 'Rotational Orthodontic Realignment'
  },
  {
    name: 'Karan Nair',
    location: 'Coimbatore / Thuckalay Hub',
    tag: 'Deep Overbite • 15 Months',
    image: '/images/testimonials/karan-nair-metal-braces-coimbatore.webp',
    review: 'I struggled with a deep overbite that affected my chewing. Jerush gave me a transparent 3D digital plan and easy 0% interest EMI options. The monthly calibrations were quick, and my jaw profile has never looked better.',
    treatment: 'Deep Bite Orthodontic Correction'
  },
  {
    name: 'Kavya Nair',
    location: 'Kottayam (Treated at Nagercoil Flagship)',
    tag: 'Interdental Gap Closure • 9 Months',
    image: '/images/testimonials/kavya-nair-metal-braces-kottayam.webp',
    review: 'Traveling from Kerala to Jerush Nagercoil was totally worth it. The orthodontists closed my wide front tooth gaps in just 9 months. I loved customizing my elastic band colors every month. Highly recommended!',
    treatment: 'Diastema Gap Closure'
  },
  {
    name: 'Richard Philips',
    location: 'Dublin, Ireland (Global Concierge)',
    tag: 'International Orthodontic Care',
    image: '/images/testimonials/richard-philips-ireland-metal-braces.webp',
    review: 'As an overseas patient traveling to Tamil Nadu, the precision technology and digital coordination at Jerush exceeded UK and EU standards at a fraction of the cost. My lifetime retainers have kept my smile perfect.',
    treatment: 'Comprehensive Smile Realignment'
  }
];

const HARDWARE_OPTIONS = [
  {
    title: 'Low-Profile Stainless Brackets',
    subtitle: 'German Surgical Steel',
    desc: 'Ultra-thin, rounded metal brackets designed to minimize cheek friction and eliminate ulcers.',
    img: '/images/medical-services/dental-care/metal-braces/low-profile-stainless-brackets.webp',
    features: [
      'Up to 30% smaller than legacy brackets',
      'Rounded, mirror-polished edges for cheek comfort',
      'Hypoallergenic, medical-grade alloy'
    ]
  },
  {
    title: 'Smart Shape-Memory Wires',
    subtitle: 'Continuous Gentle Force',
    desc: 'Advanced nickel-titanium archwires that activate at body temperature for faster tooth alignment.',
    img: '/images/medical-services/dental-care/metal-braces/smart-shape-memory-wires.webp',
    features: [
      'Constant, gentle biological tooth movement',
      'Fewer adjustment visits required',
      'Significantly less soreness after tightenings'
    ]
  },
  {
    title: 'Hygienic Archwire Fasteners',
    subtitle: 'Snag-Free Elastic Ties',
    desc: 'Smooth, snag-free ties that secure the wire tightly while making daily brushing and flossing effortless.',
    img: '/images/medical-services/dental-care/metal-braces/hygienic-archwire-fasteners.webp',
    features: [
      'Snag-free ligature security',
      'Custom color bands (or discreet silver)',
      'Smooth contour prevents plaque buildup'
    ]
  }
];

const WHAT_WE_FIX = [
  {
    title: 'Severe Arch Crowding',
    desc: 'Opens up room in tight jaws to align squeezed and overlapping teeth into a perfectly rounded arch line.',
    img: '/images/medical-services/dental-care/metal-braces/severe-arch-crowding.webp',
    tag: 'Space Expansion'
  },
  {
    title: 'Stubborn Rotations',
    desc: 'Turns twisted incisors, premolars, and molars into their anatomically correct facial alignment.',
    img: '/images/medical-services/dental-care/metal-braces/stubborn-rotations.webp',
    tag: 'Rotational Control'
  },
  {
    title: 'Overbites & Underbites',
    desc: 'Corrects vertical bite imbalances where upper teeth hide lower teeth or lower teeth protrude outwards.',
    img: '/images/medical-services/dental-care/metal-braces/overbites-underbites.webp',
    tag: 'Bite Correction'
  },
  {
    title: 'Crossbites & Open Bites',
    desc: 'Realigns misaligned bite planes so upper and lower teeth meet properly when chewing and speaking.',
    img: '/images/medical-services/dental-care/metal-braces/crossbites-openbites.webp',
    tag: 'Jaw Alignment'
  },
  {
    title: 'Interdental Gap Spacing',
    desc: 'Closes wide gaps (diastema) between front teeth permanently with strong continuous tension.',
    img: '/images/medical-services/dental-care/metal-braces/interdental-gap-spacing.webp',
    tag: 'Gap Closure'
  },
  {
    title: 'Impacted Teeth Trajectories',
    desc: 'Gently guides hidden, unerupted teeth out of the gum line into the natural dental arch line.',
    img: '/images/medical-services/dental-care/metal-braces/impacted-teeth-trajectories.webp',
    tag: 'Eruption Guidance'
  }
];

const TRANSFORMATIONS = [
  {
    caseType: 'Severe Crowding',
    location: 'Nagercoil',
    before: 'Overlapping front teeth with narrow dental arch.',
    after: 'Perfectly rounded arch line with zero overlap.',
    duration: '14 Months'
  },
  {
    caseType: 'Deep Overbite',
    location: 'Trichy',
    before: 'Upper teeth completely hiding lower arch when biting.',
    after: 'Balanced vertical overlap and enhanced facial profile.',
    duration: '16 Months'
  },
  {
    caseType: 'Wide Tooth Gaps',
    location: 'Thuckalay',
    before: '4mm space (diastema) between central front teeth.',
    after: 'Seamless gap closure with natural contact points.',
    duration: '9 Months'
  },
  {
    caseType: 'Severe Rotated Canine',
    location: 'Chennai',
    before: 'Upper canine twisted 45 degrees outward.',
    after: 'Full rotation correction aligned smoothly with dental arch.',
    duration: '12 Months'
  }
];

const PROCEDURE_STEPS = [
  {
    step: '01',
    title: '3D Digital Scan & Facial X-Ray',
    desc: 'Comprehensive oral evaluation, OPG digital X-rays, and custom 3D treatment planning at your nearest Jerush centre.',
    img: '/images/medical-services/dental-care/metal-braces/step-1-3d-digital-scan.webp',
    badge: '3D Diagnostic Scan'
  },
  {
    step: '02',
    title: 'Precision Micro-Bracket Bonding',
    desc: 'Pain-free bonding of sleek stainless steel brackets onto teeth using light-cured, enamel-safe dental adhesives.',
    img: '/images/medical-services/dental-care/metal-braces/step-2-precision-micro-bracket-bonding.webp',
    badge: 'Enamel-Safe Bonding'
  },
  {
    step: '03',
    title: 'Archwire Fitting & Color Customization',
    desc: 'Activation with smart shape-memory wires locked with your favorite custom color elastic bands or discreet silver modules.',
    img: '/images/medical-services/dental-care/metal-braces/step-3-fitting-color-custom.webp',
    badge: 'Memory Wire Activation'
  },
  {
    step: '04',
    title: 'Quick Monthly Calibration & Lifetime Retainer',
    desc: '15-minute routine checkups every 4–6 weeks, concluding with custom retainers to lock in your perfect smile forever.',
    img: '/images/medical-services/dental-care/metal-braces/step-quick-monthly-calibration.webp',
    badge: 'Lifetime Smile Lock'
  }
];

const FAQS = [
  {
    q: 'How much do metal braces cost in Nagercoil, Thuckalay, Trichy or Chennai?',
    a: 'We offer the most competitive metal braces packages in Tamil Nadu, backed by flexible 0% interest monthly EMI options so you can pay comfortably over time without financial stress. Schedule a consultation for a personalized quote based on your exact dental arch requirements.'
  },
  {
    q: 'Will metal braces hurt my cheeks or gums?',
    a: 'Our modern German stainless steel brackets feature rounded, low-profile contours designed specifically to protect soft cheek tissue and eliminate ulcers. You may feel mild tightness for 2 to 3 days after adjustments, which simply shows your teeth are aligning safely.'
  },
  {
    q: 'How long will I need to wear metal braces?',
    a: 'Most treatments take 12 to 18 months, depending on your bite structure and complexity. Minor alignment and gap closures can be completed in as little as 9 months!'
  },
  {
    q: 'Which Jerush Dentofacial clinic is closest to me?',
    a: 'We operate fully equipped orthodontic centres across Tamil Nadu: Thuckalay & Nagercoil (serving Kanyakumari District and Trivandrum, Kerala), Trichy (serving Central Tamil Nadu), and Chennai (serving Metro Chennai and coastal districts).'
  },
  {
    q: 'Can I choose colored elastic bands on my metal braces?',
    a: 'Yes! At every routine calibration visit (every 4–6 weeks), you can pick from dozens of vibrant colors or choose discreet silver/clear ties according to your personal preference.'
  },
  {
    q: 'Are metal braces better than clear aligners for complex cases?',
    a: 'Yes. While clear aligners are great for mild to moderate cases, precision metal braces remain the undisputed gold standard for severe crowding, stubborn twisted teeth, and deep bite misalignments because they apply 24/7 continuous multidirectional force.'
  }
];

export default function MetalBracesPage() {
  const navigate = useNavigate();
  const [expandedFaq, setExpandedFaq] = useState(null);
  const [currentReview, setCurrentReview] = useState(0);
  const [isReviewAutoPlaying, setIsReviewAutoPlaying] = useState(true);

  const { activeSection, scrollToSection } = useTreatmentScrollSpy(
    TABS.map(tab => tab.id),
    138
  );

  useEffect(() => {
    if (!isReviewAutoPlaying) return;
    const interval = setInterval(() => {
      setCurrentReview((prev) => (prev + 1) % REVIEWS.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [isReviewAutoPlaying]);

  const handlePrevReview = () => {
    setCurrentReview((prev) => (prev - 1 + REVIEWS.length) % REVIEWS.length);
  };

  const handleNextReview = () => {
    setCurrentReview((prev) => (prev + 1) % REVIEWS.length);
  };

  const handleBookClick = () => {
    navigate('/contact');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="w-full bg-slate-50 font-body text-left relative min-h-screen">

      {/* ─── 1. HERO SECTION (ABOVE THE FOLD) ─── */}
      <section className="w-full bg-white relative overflow-hidden text-left">

        {/* Page Hero Breadcrumbs */}
        <PageBreadcrumbHero
          title="Precision Metal Braces in Tamil Nadu — Nagercoil, Thuckalay, Trichy & Chennai"
          breadcrumbs={[
            { label: 'Dental Care', path: '/treatments' },
            { label: 'Precision Metal Braces', active: true }
          ]}
        />

        {/* Subtle Ambient Lighting Glows */}
        <div className="absolute top-20 right-0 w-[500px] h-[500px] bg-brandSky/8 rounded-full blur-[100px] pointer-events-none -mr-40 transform-gpu will-change-transform" />
        <div className="absolute bottom-10 left-0 w-[500px] h-[500px] bg-brandBlue/6 rounded-full blur-[100px] pointer-events-none -ml-40 transform-gpu will-change-transform" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 pb-14 sm:pb-16 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">

            {/* Left Column: Main Title, Subtitle, Intro & CTAs */}
            <div className="lg:col-span-5 space-y-5">

              {/* Badge */}
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-brandBlue/5 border border-brandBlue/15 text-brandBlue text-[11px] font-bold uppercase tracking-wider font-headline shadow-xs">
                <span className="w-2 h-2 rounded-full bg-brandSky relative">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-brandSky opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-brandSky"></span>
                </span>
                <span>Micro-Sized German Steel</span>
              </div>

              {/* Main Title */}
              <h1
                style={{ lineHeight: 1.4 }}
                className="font-headline font-black text-3xl sm:text-4xl lg:text-[42px] text-slate-900 leading-[1.4] tracking-tight"
              >
                Heavy-Duty Precision.{' '}
                <span className="bg-gradient-to-r from-brandBlue via-[#1479BD] to-brandSky bg-clip-text text-transparent">
                  Unstoppable Confidence.
                </span>
              </h1>

              {/* Subtitle */}
              <p className="font-headline font-bold text-slate-700 text-sm sm:text-base leading-snug">
                Smaller brackets, smoother contours and faster results. Built by specialist orthodontists across Nagercoil, Thuckalay, Trichy and Chennai.
              </p>

              {/* Lead Paragraph */}
              <p className="text-slate-600 text-xs sm:text-sm leading-relaxed font-normal">
                Forget old-school "train tracks." Welcome to modern, micro-engineered steel braces designed for maximum speed, zero hassle, and lifetime confidence. Welcome to <strong className="text-slate-900 font-semibold">Jerush Dentofacial & Cosmetic Laser Centre</strong>, Tamil Nadu’s home for precision orthodontic transformations.
              </p>

              {/* Badges Pill Grid */}
              <div className="grid grid-cols-2 gap-2.5 pt-1">
                {[
                  'Micro-Sized German Steel',
                  '0% Interest Monthly Plans',
                  '4 Regional Centres',
                  'Lifetime Smile Retention'
                ].map((badge, idx) => (
                  <div key={idx} className="flex items-center gap-2 p-2 rounded-xl bg-slate-50 border border-slate-200/80 shadow-xs">
                    <div className="w-4 h-4 rounded-full bg-brandSky/20 text-brandBlue flex items-center justify-center shrink-0">
                      <Check className="w-2.5 h-2.5 stroke-[3]" />
                    </div>
                    <span className="text-[11px] sm:text-xs font-bold text-slate-700">{badge}</span>
                  </div>
                ))}
              </div>

              {/* CTA Action Buttons */}
              <div className="flex flex-wrap items-center gap-3.5 pt-2">
                <button
                  type="button"
                  onClick={handleBookClick}
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-gradient-to-r from-brandSky via-[#198BC8] to-brandBlue text-white font-headline font-bold text-xs sm:text-sm uppercase tracking-wider shadow-lg shadow-brandSky/25 hover:shadow-brandSky/40 hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 group cursor-pointer"
                >
                  <span>Book 3D Smile Scan</span>
                  <div className="w-5 h-5 rounded-full bg-white/20 flex items-center justify-center group-hover:translate-x-1 transition-transform">
                    <ArrowRight className="w-3 h-3 text-white" />
                  </div>
                </button>

                <a
                  href="https://wa.me/919489160000?text=Hi%20Jerush%20Dentofacial,%20I%20would%20like%20to%20chat%20with%20an%20orthodontist%20about%20Precision%20Metal%20Braces."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-5 py-3 rounded-full border border-slate-300 hover:border-emerald-500 bg-white hover:bg-emerald-50 text-slate-700 hover:text-emerald-700 font-headline font-bold text-xs sm:text-sm uppercase tracking-wider shadow-xs hover:shadow-sm transition-all duration-300"
                >
                  <MessageCircle className="w-4 h-4 text-emerald-600" />
                  <span>WhatsApp</span>
                </a>
              </div>
            </div>

            {/* Right Column: Hero Visual Graphic (Extra Large 16:9 Landscape - lg:col-span-7) */}
            <div className="lg:col-span-7 relative">
              <div className="relative rounded-2xl sm:rounded-3xl overflow-hidden border border-slate-200/90 shadow-2xl bg-slate-900 group">
                <img
                  src="/images/medical-services/dental-care/metal-braces/modern-metal-upgrade.webp"
                  alt="Precision Metal Braces Jerush"
                  width="1024"
                  height="576"
                  decoding="async"
                  className="w-full aspect-[16/9] object-cover sm:object-contain bg-slate-950 group-hover:scale-103 transition-transform duration-500 transform-gpu"
                />
              </div>
            </div>

          </div>
        </div>

        {/* Quick Stats Bar */}
        <div className="bg-slate-50/80 border-t border-slate-200/80 py-6 sm:py-7">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 divide-y sm:divide-y-0 sm:divide-x divide-slate-200/60">
              {STATS.map((stat, idx) => (
                <div key={idx} className="flex flex-col items-center text-center p-2 pt-4 sm:pt-2">
                  <span className="font-headline font-black text-2xl sm:text-3xl lg:text-4xl text-brandBlue tracking-tight">
                    {stat.value}
                  </span>
                  <span className="text-xs sm:text-sm font-semibold text-slate-500 mt-1 uppercase tracking-wider">
                    {stat.label}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

      </section>

      {/* ─── 2. PAGE NAVIGATION INDEX (STICKY CAPSULE BUTTONS) ─── */}
      <TreatmentSectionNav
        tabs={TABS}
        activeSection={activeSection}
        onTabClick={scrollToSection}
      />

      {/* ─── 3. SECTION 1: THE MODERN METAL UPGRADE ─── */}
      <section id="upgrade" className="w-full py-16 lg:py-24 bg-white border-t border-slate-200/80 text-left relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            {/* Image on Left (Extra Large 16:9 Landscape - lg:col-span-7) */}
            <div className="lg:col-span-7 order-2 lg:order-1">
              <div className="relative rounded-2xl sm:rounded-3xl overflow-hidden border border-slate-200/90 shadow-xl bg-slate-900 group">
                <img
                  src="/images/medical-services/dental-care/metal-braces/modern-metal-upgrade.webp"
                  alt="The Modern Metal Upgrade"
                  width="1024"
                  height="576"
                  loading="lazy"
                  decoding="async"
                  className="w-full aspect-[16/9] object-cover sm:object-contain rounded-2xl group-hover:scale-103 transition-transform duration-500 transform-gpu"
                />
              </div>
            </div>

            {/* Content on Right */}
            <div className="lg:col-span-5 order-1 lg:order-2 space-y-6">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-brandBlue/5 border border-brandBlue/15 text-brandBlue text-[11px] font-bold uppercase tracking-wider font-headline">
                <span>01 &bull; Modern Metal Upgrade</span>
              </div>

              <h2
                style={{ lineHeight: 1.4 }}
                className="font-headline font-black text-3xl sm:text-4xl text-slate-900 leading-[1.4]"
              >
                The Modern Metal{' '}
                <span className="bg-gradient-to-r from-brandBlue to-brandSky bg-clip-text text-transparent">
                  Upgrade
                </span>
              </h2>

              <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
                If you think metal braces are bulky and uncomfortable, think again. At <strong className="text-slate-900 font-semibold">Jerush Dentofacial & Cosmetic Laser Centre</strong>, we use ultra-sleek, low-profile stainless steel brackets engineered with rounded edges that glide against your cheeks without irritation. Combined with smart shape-memory archwires, your teeth move continuously with lighter force and less soreness.
              </p>

              <div className="space-y-3.5 pt-1">
                {[
                  {
                    title: 'Sleek & Micro-Sized',
                    desc: 'Up to 30% smaller than legacy metal brackets, ensuring a subtle profile on your teeth.'
                  },
                  {
                    title: 'Zero Ulcer Contours',
                    desc: 'Polished, ultra-smooth surfaces specifically designed for absolute daily cheek and gum comfort.'
                  },
                  {
                    title: 'Surgical-Grade German Alloy',
                    desc: 'Hypoallergenic, stain-proof German steel that never rusts, discolors, or degrades.'
                  }
                ].map((item, idx) => (
                  <div key={idx} className="flex items-start gap-3 p-3.5 rounded-2xl bg-slate-50 border border-slate-200/70 shadow-xs hover:border-brandSky/40 transition-colors">
                    <div className="w-7 h-7 rounded-xl bg-brandSky/15 text-brandBlue flex items-center justify-center shrink-0 mt-0.5">
                      <Check className="w-3.5 h-3.5 stroke-[3]" />
                    </div>
                    <div>
                      <h4 className="font-headline font-bold text-slate-900 text-sm sm:text-base">{item.title}</h4>
                      <p className="text-slate-600 text-xs sm:text-sm mt-0.5 leading-relaxed">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* ─── 4. SECTION 2: WHY STEEL STILL RULES THE SMILE GAME ─── */}
      <section id="why-steel" className="w-full py-16 lg:py-24 bg-slate-50 border-t border-slate-200/80 text-left relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">

            {/* Content on Left */}
            <div className="lg:col-span-5 space-y-6">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-brandBlue/5 border border-brandBlue/15 text-brandBlue text-[11px] font-bold uppercase tracking-wider font-headline">
                <span>02 &bull; Clinical Superiority</span>
              </div>

              <h2
                style={{ lineHeight: 1.4 }}
                className="font-headline font-black text-3xl sm:text-4xl text-slate-900 leading-[1.4]"
              >
                Why Steel Still Rules{' '}
                <span className="bg-gradient-to-r from-brandBlue to-brandSky bg-clip-text text-transparent">
                  the Smile Game
                </span>
              </h2>

              <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
                While aligners are popular, precision metal braces remain the undisputed champion for complex bite corrections, severe rotations, and long-term durability.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 pt-1">
                {[
                  {
                    title: '100% Predictable Force',
                    desc: 'Operates 24/7 without relying on you remembering to wear removable trays.'
                  },
                  {
                    title: 'Mastery Over Complex Rotations',
                    desc: 'Perfect for severe crowding, stubborn twisted teeth, and deep bite misalignments.'
                  },
                  {
                    title: 'Unbeatable Durability',
                    desc: 'Built to withstand sports, active routines, and everyday life.'
                  },
                  {
                    title: 'Most Pocket-Friendly Choice',
                    desc: 'Premium orthodontic results engineered to fit every family budget across Tamil Nadu and globally.'
                  }
                ].map((rule, idx) => (
                  <div key={idx} className="p-4 rounded-2xl bg-white border border-slate-200/80 shadow-xs hover:shadow-md hover:border-brandSky/40 transition-all duration-300">
                    <div className="w-6 h-6 rounded-lg bg-brandBlue text-white flex items-center justify-center font-headline font-bold text-xs mb-2.5 shadow-xs">
                      0{idx + 1}
                    </div>
                    <h4 className="font-headline font-bold text-slate-900 text-sm">{rule.title}</h4>
                    <p className="text-slate-600 text-xs mt-1 leading-relaxed">{rule.desc}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Image on Right (Extra Large 16:9 Landscape - lg:col-span-7) */}
            <div className="lg:col-span-7">
              <div className="relative rounded-2xl sm:rounded-3xl overflow-hidden border border-slate-200/90 shadow-xl bg-slate-900 group">
                <img
                  src="/images/medical-services/dental-care/metal-braces/steel-still-rules.webp"
                  alt="Why Steel Still Rules"
                  width="1024"
                  height="576"
                  loading="lazy"
                  decoding="async"
                  className="w-full aspect-[16/9] object-cover sm:object-contain rounded-2xl group-hover:scale-103 transition-transform duration-500 transform-gpu"
                />
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* ─── 5. SECTION 3: REAL PATIENT TRANSFORMATIONS (BEFORE & AFTER) ─── */}
      <section id="transformations" className="w-full py-16 lg:py-24 bg-white border-t border-slate-200/80 text-left relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          <div className="max-w-3xl mb-12 sm:mb-14">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-brandBlue/5 border border-brandBlue/15 text-brandBlue text-[11px] font-bold uppercase tracking-wider font-headline mb-4">
              <span>03 &bull; Real Clinical Outcomes</span>
            </div>
            <h2
              style={{ lineHeight: 1.4 }}
              className="font-headline font-black text-3xl sm:text-4xl lg:text-5xl text-slate-900 leading-[1.4]"
            >
              Real Patient{' '}
              <span className="bg-gradient-to-r from-brandBlue to-brandSky bg-clip-text text-transparent">
                Transformations
              </span>
            </h2>
            <p className="text-slate-600 text-base sm:text-lg mt-4 leading-relaxed font-normal">
              See how our specialist team transforms severe misalignments into stunning, photo-ready smiles:
            </p>
          </div>

          {/* Transformations Table */}
          <div className="rounded-3xl bg-white border border-slate-200 shadow-md overflow-hidden mb-10">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-slate-900 text-white font-headline text-xs sm:text-sm uppercase tracking-wider">
                    <th className="py-4 px-6 font-bold">Case Type</th>
                    <th className="py-4 px-6 font-bold">Before Treatment</th>
                    <th className="py-4 px-6 font-bold">After Jerush Transformation</th>
                    <th className="py-4 px-6 font-bold text-brandSky">Duration</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 text-xs sm:text-sm">
                  {TRANSFORMATIONS.map((row, idx) => (
                    <tr key={idx} className="hover:bg-blue-50/40 transition-colors">
                      <td className="py-4 px-6 font-headline font-bold text-slate-900">
                        <div>{row.caseType}</div>
                        <span className="text-[10px] text-brandBlue font-semibold uppercase tracking-wider">
                          {row.location} Centre
                        </span>
                      </td>
                      <td className="py-4 px-6 text-slate-600">{row.before}</td>
                      <td className="py-4 px-6 text-slate-900 font-semibold flex items-center gap-2">
                        <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0" />
                        <span>{row.after}</span>
                      </td>
                      <td className="py-4 px-6 font-bold text-brandBlue">{row.duration}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Auto-Scrolling Verified Patient Testimonials Slider */}
          <div
            className="rounded-3xl bg-gradient-to-br from-[#071324] via-[#0E2752] to-[#071324] border border-white/10 text-white relative overflow-hidden shadow-2xl"
            onMouseEnter={() => setIsReviewAutoPlaying(false)}
            onMouseLeave={() => setIsReviewAutoPlaying(true)}
          >
            {/* Atmospheric Ambient Glows */}
            <div className="absolute top-0 right-1/4 w-96 h-96 bg-brandSky/15 rounded-full blur-[100px] pointer-events-none transform-gpu" />
            <div className="absolute bottom-0 left-10 w-96 h-96 bg-brandBlue/20 rounded-full blur-[100px] pointer-events-none transform-gpu" />

            <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-stretch">

              {/* Left Column: Review Quote, Details & Controls */}
              <div className="lg:col-span-7 p-6 sm:p-10 lg:p-12 flex flex-col justify-between space-y-6">

                {/* Top Badges & Rating */}
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brandSky/15 border border-brandSky/30 text-brandSky text-[11px] font-bold uppercase tracking-wider font-headline">
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>Verified Patient Review ({currentReview + 1} of {REVIEWS.length})</span>
                  </div>

                  <div className="flex items-center gap-1 text-amber-400 bg-black/30 px-3 py-1 rounded-full border border-white/5">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-current" />
                    ))}
                    <span className="text-xs font-bold text-white ml-1.5 font-headline">5.0</span>
                  </div>
                </div>

                {/* Animated Review Quote */}
                <div className="min-h-[160px] sm:min-h-[140px] flex items-center">
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={currentReview}
                      initial={{ opacity: 0, y: 12 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -12 }}
                      transition={{ duration: 0.35, ease: 'easeOut' }}
                      className="space-y-4 w-full"
                    >
                      <div className="relative">
                        <Quote className="w-10 h-10 text-brandSky/20 absolute -top-4 -left-2 -z-10" />
                        <blockquote className="font-headline font-medium text-lg sm:text-xl lg:text-2xl leading-snug italic text-slate-100">
                          "{REVIEWS[currentReview].review}"
                        </blockquote>
                      </div>

                      <div>
                        <h4 className="font-headline font-bold text-lg sm:text-xl text-white">
                          {REVIEWS[currentReview].name}
                        </h4>
                        <div className="flex flex-wrap items-center gap-2 mt-1 text-xs text-slate-300">
                          <span className="text-brandSky font-semibold flex items-center gap-1">
                            <MapPin className="w-3.5 h-3.5" />
                            {REVIEWS[currentReview].location}
                          </span>
                          <span className="text-slate-500">&bull;</span>
                          <span className="px-2.5 py-0.5 rounded-full bg-white/10 text-slate-200 font-medium">
                            {REVIEWS[currentReview].tag}
                          </span>
                        </div>
                      </div>
                    </motion.div>
                  </AnimatePresence>
                </div>

                {/* Controls & Pagination Dots */}
                <div className="pt-4 border-t border-white/10 flex items-center justify-between">

                  {/* Dot Indicators */}
                  <div className="flex items-center gap-2">
                    {REVIEWS.map((rev, idx) => (
                      <button
                        key={idx}
                        type="button"
                        onClick={() => setCurrentReview(idx)}
                        aria-label={`Go to review by ${rev.name}`}
                        className={`transition-all duration-300 cursor-pointer ${currentReview === idx
                          ? 'w-8 h-2.5 bg-gradient-to-r from-brandSky to-brandBlue rounded-full shadow-sm'
                          : 'w-2.5 h-2.5 bg-white/30 hover:bg-white/60 rounded-full'
                          }`}
                      />
                    ))}
                  </div>

                  {/* Prev / Next Arrow Controls */}
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={handlePrevReview}
                      aria-label="Previous Review"
                      className="w-10 h-10 rounded-full bg-white/10 hover:bg-brandSky hover:text-slate-950 text-white flex items-center justify-center transition-all duration-200 cursor-pointer active:scale-95 border border-white/10 shadow-xs"
                    >
                      <ChevronLeft className="w-5 h-5" />
                    </button>
                    <button
                      type="button"
                      onClick={handleNextReview}
                      aria-label="Next Review"
                      className="w-10 h-10 rounded-full bg-white/10 hover:bg-brandSky hover:text-slate-950 text-white flex items-center justify-center transition-all duration-200 cursor-pointer active:scale-95 border border-white/10 shadow-xs"
                    >
                      <ChevronRight className="w-5 h-5" />
                    </button>
                  </div>

                </div>

              </div>

              {/* Right Column: Seamless Bottom-Aligned Patient Photo (No Box Background) */}
              <div className="lg:col-span-5 relative flex items-end justify-center overflow-hidden self-end min-h-[340px] sm:min-h-[380px] lg:min-h-0 pt-6 lg:pt-0">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={currentReview}
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.35, ease: 'easeOut' }}
                    className="relative flex items-end justify-center w-full h-full"
                  >
                    {/* Ambient Glow behind patient */}
                    <div className="absolute bottom-0 w-72 h-72 bg-gradient-to-tr from-brandSky/25 to-brandBlue/35 rounded-full blur-3xl pointer-events-none" />

                    <img
                      src={REVIEWS[currentReview].image}
                      alt={`${REVIEWS[currentReview].name} - Precision Metal Braces Review`}
                      width="614"
                      height="768"
                      loading="lazy"
                      decoding="async"
                      className="relative z-10 h-[320px] sm:h-[380px] lg:h-[420px] w-auto max-w-full object-contain object-bottom drop-shadow-[0_15px_30px_rgba(0,0,0,0.6)] hover:scale-[1.02] transition-transform duration-500"
                    />

                    {/* Verified Name & Treatment Overlay Pill */}
                    <div className="absolute bottom-4 left-4 sm:bottom-6 sm:left-6 z-20 bg-slate-900/85 backdrop-blur-md border border-white/15 px-3.5 py-2 rounded-xl text-left shadow-lg">
                      <div className="flex items-center gap-1.5 font-headline font-bold text-xs sm:text-sm text-white">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                        <span>{REVIEWS[currentReview].name}</span>
                      </div>
                      <p className="text-[10px] sm:text-[11px] font-medium text-brandSky mt-0.5">
                        {REVIEWS[currentReview].treatment}
                      </p>
                    </div>
                  </motion.div>
                </AnimatePresence>
              </div>

            </div>
          </div>

        </div>
      </section>

      {/* ─── 6. SECTION 4: ADVANCED HARDWARE OPTIONS ─── */}
      <section id="hardware" className="w-full py-16 lg:py-24 bg-slate-900 text-white text-left relative overflow-hidden">
        {/* Ambient Dark Mode Glows */}
        <div className="absolute top-1/4 right-0 w-[500px] h-[500px] bg-brandSky/10 rounded-full blur-[120px] pointer-events-none transform-gpu" />
        <div className="absolute bottom-1/4 left-0 w-[500px] h-[500px] bg-brandBlue/15 rounded-full blur-[120px] pointer-events-none transform-gpu" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

          <div className="max-w-3xl mb-12 sm:mb-16">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-brandSky/15 border border-brandSky/30 text-brandSky text-[11px] font-bold uppercase tracking-wider font-headline mb-4">
              <span>04 &bull; Advanced Hardware Options</span>
            </div>
            <h2
              style={{ lineHeight: 1.4 }}
              className="font-headline font-black text-3xl sm:text-4xl lg:text-5xl text-white leading-[1.4]"
            >
              Advanced Hardware{' '}
              <span className="bg-gradient-to-r from-brandSky to-[#198BC8] bg-clip-text text-transparent">
                Options
              </span>
            </h2>
            <p className="text-slate-300 text-base sm:text-lg mt-4 leading-relaxed font-normal">
              At Jerush Dentofacial, we utilize modern orthodontic components engineered for maximum comfort, hygiene and efficiency:
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
            {HARDWARE_OPTIONS.map((hw, idx) => (
              <div
                key={idx}
                className="rounded-3xl bg-slate-800/80 border border-slate-700/80 overflow-hidden flex flex-col justify-between hover:border-brandSky/60 hover:shadow-[0_12px_40px_rgba(14,165,233,0.18)] transition-all duration-300 group"
              >
                <div>
                  <div className="relative h-56 overflow-hidden bg-slate-950">
                    <img
                      src={hw.img}
                      alt={hw.title}
                      width="600"
                      height="400"
                      loading="lazy"
                      decoding="async"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 transform-gpu"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-transparent" />
                    <span className="absolute top-4 left-4 px-3 py-1 rounded-full bg-slate-900/80 backdrop-blur-md text-[10px] font-bold font-headline uppercase tracking-wider text-brandSky border border-white/10">
                      {hw.subtitle}
                    </span>
                  </div>

                  <div className="p-6">
                    <h3 className="font-headline font-bold text-xl text-white group-hover:text-brandSky transition-colors">
                      {hw.title}
                    </h3>
                    <p className="text-slate-300 text-sm mt-2 leading-relaxed">
                      {hw.desc}
                    </p>

                    <div className="mt-5 space-y-2.5 pt-4 border-t border-slate-700/60">
                      {hw.features.map((feat, fIdx) => (
                        <div key={fIdx} className="flex items-center gap-2.5 text-xs text-slate-300">
                          <CheckCircle2 className="w-4 h-4 text-brandSky shrink-0" />
                          <span>{feat}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="p-6 pt-0">
                  <button
                    type="button"
                    onClick={handleBookClick}
                    className="w-full py-2.5 rounded-xl bg-white/10 hover:bg-brandSky hover:text-slate-900 text-white text-xs font-bold font-headline uppercase tracking-wider transition-all duration-300 text-center cursor-pointer"
                  >
                    Consult Orthodontist
                  </button>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* ─── 7. SECTION 5: WHAT WE FIX (THE 6-POINT ALIGNMENT CHECK) ─── */}
      <section id="what-we-fix" className="w-full py-16 lg:py-24 bg-slate-50 border-t border-slate-200/80 text-left relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          <div className="max-w-3xl mb-12 sm:mb-16">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-brandBlue/5 border border-brandBlue/15 text-brandBlue text-[11px] font-bold uppercase tracking-wider font-headline mb-4">
              <span>05 &bull; What We Fix</span>
            </div>
            <h2
              style={{ lineHeight: 1.4 }}
              className="font-headline font-black text-3xl sm:text-4xl lg:text-5xl text-slate-900 leading-[1.4]"
            >
              What We Fix{' '}
              <span className="bg-gradient-to-r from-brandBlue via-[#1479BD] to-brandSky bg-clip-text text-transparent">
                (The 6-Point Alignment Check)
              </span>
            </h2>
            <p className="text-slate-600 text-base sm:text-lg mt-4 leading-relaxed font-normal">
              Our specialist orthodontists utilize metal braces mechanics to treat all major structural bite concerns:
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-7">
            {WHAT_WE_FIX.map((item, idx) => (
              <div
                key={idx}
                className="rounded-3xl bg-white border border-slate-200/80 overflow-hidden shadow-xs hover:shadow-xl hover:border-brandSky/50 transition-all duration-300 flex flex-col justify-between group"
              >
                <div>
                  <div className="relative aspect-square w-full overflow-hidden bg-slate-100 border-b border-slate-100">
                    <img
                      src={item.img}
                      alt={item.title}
                      width="768"
                      height="768"
                      loading="lazy"
                      decoding="async"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 transform-gpu"
                    />
                    <span className="absolute top-3 left-3 px-3 py-1 rounded-full bg-slate-900/85 backdrop-blur-md text-brandSky text-[10px] font-bold font-headline uppercase tracking-wider border border-white/10 shadow-sm">
                      {item.tag}
                    </span>
                  </div>

                  <div className="p-6">
                    <h3 className="font-headline font-bold text-lg text-slate-900 group-hover:text-brandBlue transition-colors">
                      {item.title}
                    </h3>
                    <p className="text-slate-600 text-sm mt-2 leading-relaxed">
                      {item.desc}
                    </p>
                  </div>
                </div>

                <div className="px-6 pb-6 pt-2">
                  <div className="flex items-center gap-1.5 text-brandBlue text-xs font-bold font-headline uppercase tracking-wider group-hover:translate-x-1 transition-transform">
                    <span>Precision Aligned</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </div>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* ─── 8. SECTION 6: YOUR 4-STEP JOURNEY TO PERFECTION ─── */}
      <section id="journey" className="w-full py-16 lg:py-24 bg-white border-t border-slate-200/80 text-left relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          <div className="max-w-3xl mb-12 sm:mb-16">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-brandBlue/5 border border-brandBlue/15 text-brandBlue text-[11px] font-bold uppercase tracking-wider font-headline mb-4">
              <span>06 &bull; Treatment Pathway</span>
            </div>
            <h2
              style={{ lineHeight: 1.4 }}
              className="font-headline font-black text-3xl sm:text-4xl lg:text-5xl text-slate-900 leading-[1.4]"
            >
              Your 4-Step Journey{' '}
              <span className="bg-gradient-to-r from-brandBlue via-[#1479BD] to-brandSky bg-clip-text text-transparent">
                to Perfection
              </span>
            </h2>
            <p className="text-slate-600 text-base sm:text-lg mt-4 leading-relaxed font-normal">
              Here is what your smile transformation looks like at Jerush Dentofacial:
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {PROCEDURE_STEPS.map((step, idx) => (
              <div
                key={idx}
                className="rounded-3xl bg-slate-50 border border-slate-200/80 overflow-hidden shadow-xs hover:shadow-xl hover:border-brandSky/50 transition-all duration-300 flex flex-col justify-between group"
              >
                <div>
                  <div className="relative aspect-square w-full overflow-hidden bg-slate-900 border-b border-slate-100">
                    <img
                      src={step.img}
                      alt={step.title}
                      width="768"
                      height="768"
                      loading="lazy"
                      decoding="async"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 transform-gpu"
                    />
                    <span className="absolute top-3 left-3 w-8 h-8 rounded-full bg-brandBlue text-white font-headline font-black text-xs flex items-center justify-center shadow-md">
                      {step.step}
                    </span>
                    <span className="absolute bottom-3 left-3 px-2.5 py-0.5 rounded-full bg-slate-900/80 backdrop-blur-md text-brandSky text-[10px] font-bold uppercase tracking-wider border border-white/10">
                      {step.badge}
                    </span>
                  </div>

                  <div className="p-5 sm:p-6">
                    <h3 className="font-headline font-bold text-base sm:text-lg text-slate-900 group-hover:text-brandBlue transition-colors leading-snug">
                      {step.title}
                    </h3>
                    <p className="text-slate-600 text-xs sm:text-sm mt-2 leading-relaxed">
                      {step.desc}
                    </p>
                  </div>
                </div>

                <div className="p-5 sm:p-6 pt-0 border-t border-slate-100 mt-2">
                  <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                    Step {idx + 1} of 4
                  </div>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* ─── 9. SECTION 7: FREQUENTLY ASKED QUESTIONS (FAQS) ─── */}
      <section id="faqs" className="w-full py-16 lg:py-24 bg-slate-50 border-t border-slate-200/80 text-left relative overflow-hidden">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">

          <div className="text-center max-w-2xl mx-auto mb-12">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-brandBlue/5 border border-brandBlue/15 text-brandBlue text-[11px] font-bold uppercase tracking-wider font-headline mb-4">
              <span>07 &bull; Frequently Asked Questions</span>
            </div>
            <h2
              style={{ lineHeight: 1.4 }}
              className="font-headline font-black text-3xl sm:text-4xl text-slate-900 leading-[1.4]"
            >
              Frequently Asked{' '}
              <span className="bg-gradient-to-r from-brandBlue to-brandSky bg-clip-text text-transparent">
                Questions (FAQs)
              </span>
            </h2>
            <p className="text-slate-600 text-sm sm:text-base mt-3">
              Clear, transparent answers about metal braces cost, comfort and results.
            </p>
          </div>

          <div className="space-y-4">
            {FAQS.map((faq, idx) => {
              const isOpen = expandedFaq === idx;
              return (
                <div
                  key={idx}
                  className="rounded-2xl border border-slate-200/90 overflow-hidden bg-white shadow-xs hover:shadow-md transition-all"
                >
                  <button
                    type="button"
                    onClick={() => setExpandedFaq(isOpen ? null : idx)}
                    className="w-full p-5 sm:p-6 text-left flex items-center justify-between gap-4 font-headline font-bold text-slate-900 text-sm sm:text-base cursor-pointer"
                  >
                    <span>{faq.q}</span>
                    <ChevronDown
                      className={`w-5 h-5 text-brandBlue shrink-0 transition-transform duration-300 ${isOpen ? 'rotate-180 text-brandSky' : ''
                        }`}
                    />
                  </button>

                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: 'easeInOut' }}
                      >
                        <div className="px-5 sm:px-6 pb-6 pt-0 text-slate-600 text-sm leading-relaxed border-t border-slate-100 mt-1 pt-4">
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

      {/* ─── 10. BOTTOM CTA BANNER (COMPLIANT DARK NAVY UNIFIED DESIGN) ─── */}
      <TreatmentCtaBanner
        badgeText="READY TO CLAIM YOUR PERFECT SMILE?"
        titlePrefix="Start Your"
        highlightWord="Orthodontic Transformation"
        titleSuffix="Today"
        subtitle="Join thousands of happy patients across Tamil Nadu and globally who achieved lifetime smile confidence at Jerush Dentofacial & Cosmetic Laser Centre."
        primaryBtnText="Book 3D Smile Scan"
        primaryBtnLink="/contact"
        secondaryBtnText="Call +91 94891 60055"
        secondaryBtnPhone="+919489160055"
        doctorImage="/images/doctors/ajai-shalu2.webp"
        doctorName="Dr. Ajai Shalu"
        doctorRole="Oral & Maxillofacial Surgeon"
        doctorAlt="Dr. Ajai Shalu - Jerush Dentofacial"
        className="py-12"
      />

    </div>
  );
}

