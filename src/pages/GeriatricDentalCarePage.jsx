import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ShieldCheck, Calendar, Phone, CheckCircle2, Clock,
  Award, Smile, ArrowRight, Info, Check, HelpCircle, AlertCircle,
  MapPin, ChevronRight, ChevronDown, Heart, Shield, Activity,
  Sparkles, AlertTriangle, Users, Stethoscope, HeartHandshake,
  Droplet, Eye, ShieldAlert, Sparkle, RefreshCw, FileText, CheckCheck,
  Coffee, Sun, Moon, Droplets
} from 'lucide-react';
import PageBreadcrumbHero from '../components/common/PageBreadcrumbHero';
import TreatmentCtaBanner from '../components/common/TreatmentCtaBanner';
import TreatmentSectionNav from '../components/common/TreatmentSectionNav';
import TreatmentAppointmentForm from '../components/common/TreatmentAppointmentForm';
import useTreatmentScrollSpy from '../hooks/useTreatmentScrollSpy';

// Signature Counter & Key Stats Bar Data
const KEY_STATS = [
  { value: '18+ Years', label: 'Senior Clinical Experience' },
  { value: '100% Paced', label: 'Gentle, Unhurried Appointments' },
  { value: 'Medical-First', label: 'Holistic Health-Aligned Care' },
  { value: '4 Regional Centres', label: 'Centres of Excellence in TN' }
];

// Sticky Sub-Navigation Tabs
const NAVIGATION_TABS = [
  { id: 'age-changes', label: 'Dental Changes' },
  { id: 'care-includes', label: 'What Care Includes' },
  { id: 'comfort-first', label: 'Comfort-First Visits' },
  { id: 'daily-habits', label: 'Everyday Habits' },
  { id: 'common-concerns', label: 'Common Concerns' },
  { id: 'regional-centres', label: 'Regional Centres' },
  { id: 'faqs', label: 'FAQs' }
];

// 1. Age-Related Dental Changes (PDF Page 1 - 2)
const DENTAL_CHANGES = [
  {
    id: 'gum-recession',
    title: 'Gum Recession & Gum Disease',
    subtitle: 'Exposed Root Surfaces & Bone Support',
    description: 'Receding gums can expose sensitive root surfaces prone to rapid decay. Advanced gum disease may also affect the underlying jawbone and connective tissues supporting natural teeth.',
    img: '/images/medical-services/dental-care/geriatric-dentistry/geriatric-dental-care/gum-recession-disease.webp',
    alert: 'Requires gentle root debridement & periodontal stabilization.',
    tag: 'Root Integrity',
    badgeColor: 'bg-emerald-50 text-emerald-700 border-emerald-200'
  },
  {
    id: 'dry-mouth',
    title: 'Dry Mouth & Tooth Sensitivity',
    subtitle: 'Reduced Salivary Flow & Enamel Wear',
    description: 'Many common medications and systemic health conditions reduce saliva volume. Without natural salivary lubrication, tooth decay risk escalates and hot, cold or sweet foods trigger discomfort.',
    img: '/images/medical-services/dental-care/geriatric-dentistry/geriatric-dental-care/dry-mouth-and-sensitivity.webp',
    alert: 'Targeted saliva substitutes and fluoride remineralisation provide relief.',
    tag: 'Salivary Defense',
    badgeColor: 'bg-blue-50 text-brandBlue border-blue-200'
  },
  {
    id: 'missing-teeth',
    title: 'Missing Teeth & Denture Concerns',
    subtitle: 'Chewing Difficulties & Sore Spots',
    description: 'Missing natural teeth or poorly fitting dentures can make chewing nutritious meals difficult, alter speech clarity, and cause uncomfortable friction blisters or sore areas along the gums.',
    img: '/images/medical-services/dental-care/geriatric-dentistry/geriatric-dental-care/missing-teeth-and-denture-concerns.webp',
    alert: 'Custom relining, repair, or stable prosthodontic replacement restores bite balance.',
    tag: 'Chewing Stability',
    badgeColor: 'bg-amber-50 text-amber-800 border-amber-200'
  },
  {
    id: 'hygiene-challenges',
    title: 'Difficulty Maintaining Oral Hygiene',
    subtitle: 'Dexterity, Mobility & Vision Changes',
    description: 'Reduced hand grip strength, arthritis, tremors, vision changes or cognitive conditions can make everyday toothbrushing and cleaning between teeth challenging and frustrating.',
    img: '/images/medical-services/dental-care/geriatric-dentistry/geriatric-dental-care/difficulty-maintaining-oral-hygiene.webp',
    alert: 'Adapted ergonomic handles and electric brushes simplify daily cleaning.',
    tag: 'Adapted Care',
    badgeColor: 'bg-purple-50 text-purple-700 border-purple-200'
  }
];

// 2. What Does Geriatric Dental Care Include? (PDF Page 2 - 3)
const CARE_SERVICES = [
  {
    id: 'exam',
    title: 'Routine Dental Examinations',
    badge: 'Diagnostic Phase',
    description: 'Comprehensive evaluation of teeth, gums, oral mucosa, saliva flow, and existing dental crowns, bridges or fillings for early concern detection.',
    img: '/images/medical-services/dental-care/geriatric-dentistry/geriatric-dental-care/routine-dental-exam.webp',
    points: ['Thorough oral tissue screening', 'Checking stability of previous restorations', 'Gentle bite and joint assessment'],
    highlight: 'Early Detection'
  },
  {
    id: 'cleaning',
    title: 'Gentle Professional Cleaning',
    badge: 'Periodontal Health',
    description: 'Gentle, low-vibration ultrasonic scaling to remove plaque and hardened tartar, preventing gum inflammation and protecting vulnerable root surfaces.',
    img: '/images/medical-services/dental-care/geriatric-dentistry/geriatric-dental-care/professional-cleaning.webp',
    points: ['Painless subgingival cleaning', 'Root surface debridement', 'Protects against periodontal bone loss'],
    highlight: 'Root Protection'
  },
  {
    id: 'decay-treatment',
    title: 'Tooth Decay Treatment',
    badge: 'Restorative Care',
    description: 'Minimally invasive management of root cavities and fragile tooth structure using tooth-coloured, fluoride-releasing glass ionomer or composite fillings.',
    img: '/images/medical-services/dental-care/geriatric-dentistry/geriatric-dental-care/tooth-decay-treatment.webp',
    points: ['Gentle, conservative cavity preparation', 'Moisture-tolerant fluoride materials', 'Pain-free, comfortable application'],
    highlight: 'Fluoride-Releasing'
  },
  {
    id: 'denture-assessment',
    title: 'Denture Assessment & Fitting',
    badge: 'Prosthetic Care',
    description: 'Precision evaluation of denture fit, stability, suction, occlusion, and tissue health, offering adjustments, soft relines, or complete fabrication.',
    img: '/images/medical-services/dental-care/geriatric-dentistry/geriatric-dental-care/denture-assessment.webp',
    points: ['Elimination of sore pinch spots', 'Laboratory relining for loose dentures', 'Practical cleaning guidance'],
    highlight: 'Sore Spot Relief'
  },
  {
    id: 'tooth-replacement',
    title: 'Tooth Replacement Options',
    badge: 'Rehabilitation',
    description: 'Personalised treatment plans including lightweight partial dentures, flexible nylon dentures, fixed crowns & bridges, or dental implants when suitable.',
    img: '/images/medical-services/dental-care/geriatric-dentistry/geriatric-dental-care/tooth-replacement-options.webp',
    points: ['Removable partial & flexible dentures', 'Durable fixed bridges', 'Age-appropriate implant consultations'],
    highlight: 'Custom Aesthetics'
  },
  {
    id: 'dry-mouth-care',
    title: 'Dry Mouth Management',
    badge: 'Salivary Health',
    description: 'Identifying contributing systemic medications and recommending biocompatible artificial saliva sprays, hydrating oral gels, and alcohol-free mouth rinses.',
    img: '/images/medical-services/dental-care/geriatric-dentistry/geriatric-dental-care/dry-mouth-management.webp',
    points: ['Review of xerostomia-inducing medicines', 'pH-balancing salivary substitutes', 'Enhanced nocturnal comfort'],
    highlight: 'Hydration Therapy'
  },
  {
    id: 'preventive',
    title: 'Targeted Preventive Care',
    badge: 'Enamel Defense',
    description: 'Application of high-concentration topical fluoride varnishes, root desensitizers, and antimicrobial varnishes to defend teeth against aggressive root decay.',
    img: '/images/medical-services/dental-care/geriatric-dentistry/geriatric-dental-care/preventive-care.webp',
    points: ['High-strength fluoride varnish coating', 'Root desensitising agents', 'Customised senior home care plans'],
    highlight: 'Proactive Defense'
  }
];

// 3. A Dental Visit That Puts Comfort First (PDF Page 3)
const COMFORT_PILLARS = [
  {
    step: '01',
    title: 'Understanding Medical History',
    subtitle: 'Systemic Health Alignment',
    description: 'Our clinicians conduct a thorough review of existing medical conditions (such as diabetes, cardiovascular conditions, hypertension, or osteoporosis), current prescription medications, and past dental experiences before planning any treatment.',
    img: '/images/medical-services/dental-care/geriatric-dentistry/geriatric-dental-care/understanding-medical-history.webp',
    highlights: [
      'Comprehensive medication & blood thinner review',
      'Antibiotic prophylaxis coordination',
      'Direct liaison with treating general physicians'
    ]
  },
  {
    step: '02',
    title: 'Planning Around Comfort & Pacing',
    subtitle: 'Adaptive Clinical Environments',
    description: 'Dental visits are tailored around physical endurance. We offer shorter, paced morning appointments, ergonomic semi-reclined dental chair positioning for breathing comfort, and frequent rest pauses whenever requested.',
    img: '/images/medical-services/dental-care/geriatric-dentistry/geriatric-dental-care/planning-around-comfort.webp',
    highlights: [
      'Paced, unhurried appointment blocks',
      'Custom headrest & lower back support cushions',
      'Wheelchair-accessible clinical treatment rooms'
    ]
  },
  {
    step: '03',
    title: 'Supporting Everyday Care at Home',
    subtitle: 'Patient & Caregiver Guidance',
    description: 'We partner closely with patients and family caregivers to demonstrate practical, gentle brushing techniques, simplified denture maintenance routines, and early signs of oral changes that warrant a check-up.',
    img: '/images/medical-services/dental-care/geriatric-dentistry/geriatric-dental-care/supporting-everyday-care.webp',
    highlights: [
      'Ergonomic modified & electric toothbrush guidance',
      'Step-by-step hygienic denture sanitisation',
      'Caregiver empowerment & compassionate support'
    ]
  }
];

// 4. Everyday Habits for Maintaining Oral Health (PDF Page 4)
const DAILY_HABITS = [
  {
    number: '01',
    time: 'Morning & Night',
    title: 'Brush Twice Daily',
    lead: 'Fluoride toothpaste & soft bristles',
    description: 'Brush morning and night using a soft-bristled toothbrush that protects receding gums while delivering essential enamel-strengthening fluoride.',
    img: '/images/medical-services/dental-care/geriatric-dentistry/geriatric-dental-care/brush-twice-daily.webp'
  },
  {
    number: '02',
    time: 'Once Daily',
    title: 'Clean Between Teeth',
    lead: 'Interdental brushes or gentle floss',
    description: 'Use interdental brushes or adapted floss holders to gently remove trapped food particles and plaque from gaps where root cavities start.',
    img: '/images/medical-services/dental-care/geriatric-dentistry/geriatric-dental-care/clean-between-natural-teeth-gaps.webp'
  },
  {
    number: '03',
    time: 'Daily & Bedtime',
    title: 'Clean Dentures Daily',
    lead: 'Denture brush & nightly removal',
    description: 'Brush removable appliances daily with a specialized denture cleanser and take them out before sleeping to let gums breathe and rest.',
    img: '/images/medical-services/dental-care/geriatric-dentistry/geriatric-dental-care/clean-dentures-daily.webp'
  },
  {
    number: '04',
    time: 'Throughout the Day',
    title: 'Drink Water Regularly',
    lead: 'Hydration & saliva simulation',
    description: 'Sip water frequently throughout the day to keep mouth tissues moist, neutralize acidic oral bacteria, and ease dry mouth discomfort.',
    img: '/images/medical-services/dental-care/geriatric-dentistry/geriatric-dental-care/drink-water-regularly.webp'
  },
  {
    number: '05',
    time: 'Every 6 Months',
    title: 'Attend Dental Reviews',
    lead: 'Proactive clinical surveillance',
    description: 'Schedule routine examinations so our senior dental team can detect minor issues, check denture balance, and clean hard-to-reach areas.',
    img: '/images/medical-services/dental-care/geriatric-dentistry/geriatric-dental-care/attend-dental-reviews.webp'
  }
];

// 5. Common Concerns in Older Adults (PDF Page 4 - 5)
const COMMON_CONCERNS = [
  {
    id: 'concern-dry-mouth',
    title: 'Persistent Dry Mouth (Xerostomia)',
    subtitle: 'Medication Side Effect',
    img: '/images/medical-services/dental-care/geriatric-dentistry/geriatric-dental-care/persistent-dry-mouth.webp',
    concernText: 'A dry, sticky sensation in the mouth, difficulty swallowing dry foods, cracked lips, or an increased rate of dental cavities.',
    solutionTitle: 'Our Clinical Relief Protocol',
    solutionText: 'We evaluate prescription medications in liaison with your doctor and prescribe pH-balanced saliva substitutes, nocturnal hydrating gels, and concentrated fluoride varnishes.'
  },
  {
    id: 'concern-denture-trouble',
    title: 'Denture Discomfort & Slipping',
    subtitle: 'Jaw Ridge Remodeling',
    img: '/images/medical-services/dental-care/geriatric-dentistry/geriatric-dental-care/dental-concerns-in-older-adults.webp',
    concernText: 'Dentures clicking, loosening while speaking, causing painful friction ulcers, or shifting out of place during chewing.',
    solutionTitle: 'Our Restorative Solution',
    solutionText: 'We perform high-precision chairside soft relines, laboratory rebasing, clasp adjustments, or implant overdenture stabilization to eliminate loose movement.'
  },
  {
    id: 'concern-brushing',
    title: 'Difficulty Brushing Effectively',
    subtitle: 'Limited Hand Dexterity',
    img: '/images/medical-services/dental-care/geriatric-dentistry/geriatric-dental-care/difficulty-maintaining-oral-hygiene.webp',
    concernText: 'Joint stiffness from arthritis, hand tremors, or fatigue making standard dental floss and thin toothbrush handles hard to manipulate.',
    solutionTitle: 'Our Adapted Care Support',
    solutionText: 'We fit custom foam grip enlargers, recommend lightweight oscillating electric toothbrushes, and instruct family caregivers on comfortable assisted brushing techniques.'
  }
];

// 6. Frequently Asked Questions (PDF Page 5 - 6)
const FAQS = [
  {
    q: 'How does medical history affect dental treatment for older adults?',
    a: 'Many systemic conditions common in seniors—such as cardiovascular disease, high blood pressure, diabetes, stroke recovery, and osteoporosis—directly influence dental care. Our clinicians carefully review your medical history, coordinate antibiotic prophylaxis, adjust local anaesthetic formulations, and manage dental procedures around blood thinners in liaison with your primary physician.'
  },
  {
    q: 'What causes dry mouth in seniors and how is it treated?',
    a: 'Dry mouth (xerostomia) is most commonly caused by prescription medications (including blood pressure drugs, diuretics, antihistamines, and antidepressants) rather than aging itself. Treatment includes identifying contributing medications, prescribing biocompatible artificial saliva substitutes and lubricating oral gels, and applying high-concentration topical fluoride to safeguard vulnerable root surfaces from decay.'
  },
  {
    q: 'Can older adults still receive dental implants or crowns?',
    a: 'Yes. Age itself is never a barrier to dental restorations or implants. As long as general health is managed and jawbone quality is suitable, older adults can safely benefit from dental crowns, bridges, and implant-supported overdentures to significantly restore chewing efficiency and quality of life.'
  },
  {
    q: 'How often should seniors visit the dentist if they wear complete dentures?',
    a: 'Even without natural teeth, annual dental examinations are vital. The dentist checks for changes in the jawbone ridge, examines the tongue, palate, and oral tissues for precancerous changes, and verifies that existing dentures fit comfortably without causing unnoticed chronic tissue irritation.'
  },
  {
    q: 'What can family caregivers do to support a loved one’s daily dental hygiene?',
    a: 'Caregivers can assist by providing modified ergonomic toothbrushes with built-in wide handles, encouraging regular water sips throughout the day, ensuring dentures are removed and soaked safely every night, and arranging routine dental check-ups before minor oral discomfort worsens.'
  }
];

// Related Treatments in Geriatric Dentistry
const RELATED_TREATMENTS = [
  {
    title: 'Dentures',
    desc: 'Custom-fitted complete, partial, and implant-supported dentures to replace missing teeth and restore everyday chewing comfort.',
    link: '/dental-care/geriatric-dentistry/dentures',
    tag: 'Prosthodontic Care',
    image: '/images/medical-services/dental-care/geriatric-dentistry/dentures/replacing-missing-teeth.webp',
    alt: 'Custom-fitted dentures replacing missing teeth for everyday chewing comfort'
  },
  {
    title: 'Flexible Dentures',
    desc: 'Lightweight, unbreakable thermoplastic nylon partial dentures that blend invisibly with gums with zero metal clasps.',
    link: '/treatments/flexible-dentures',
    tag: 'Metal-Free Comfort',
    image: '/images/medical-services/dental-care/geriatric-dentistry/dentures/partial-dentures.webp',
    alt: 'Lightweight biocompatible flexible partial dentures'
  },
  {
    title: 'Removable Partial Dentures',
    desc: 'Precision cast metal or acrylic frameworks engineered to replace one or more missing teeth while protecting anchor teeth.',
    link: '/dental-care/prosthodontic-care/removable-partial-dentures',
    tag: 'Tooth Replacement',
    image: '/images/medical-services/dental-care/prosthodontic-care-tooth-replacement/removable-partial-dentures/removable-partial-denture-dental-model.webp',
    alt: 'Precision removable partial denture clinical model'
  }
];

export default function GeriatricDentalCarePage() {
  const navigate = useNavigate();
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

  return (
    <div className="bg-slate-50 min-h-screen text-slate-800 selection:bg-brandSky selection:text-white">
      {/* ─── Breadcrumb ─── */}
      <PageBreadcrumbHero
        breadcrumbs={[
          { label: 'Dental Care', path: '/dental-care' },
          { label: 'Geriatric Dentistry', path: '/dental-care/geriatric-dentistry' },
          { label: 'Geriatric Dental Care', active: true }
        ]}
      />

      {/* ─── Hero Section with Framer Motion Entrance Animations & Clean Frame ─── */}
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
                <HeartHandshake className="w-3.5 h-3.5 text-brandSky shrink-0" />
                <span>Geriatric Dentistry • Senior Oral Healthcare</span>
              </div>

              <h1
                style={{ lineHeight: 1.4 }}
                className="text-3xl sm:text-4xl lg:text-5xl font-black font-headline text-slate-900 tracking-tight leading-[1.4]"
              >
                Comfortable, Personalised{' '}
                <span className="bg-gradient-to-r from-brandBlue to-brandSky bg-clip-text text-transparent">
                  Dental Care for Older Adults
                </span>
              </h1>

              <div className="space-y-4 text-slate-600 text-sm sm:text-base leading-relaxed">
                <p>
                  As we age, our oral health needs evolve naturally. Changes in gums, saliva flow, natural tooth structure, and past dental work—alongside general medical health and prescription medications—call for a considerate, experienced, and patient-centred approach.
                </p>
                <p className="text-slate-500 text-xs sm:text-sm">
                  At Jerush Dentofacial &amp; Cosmetic Laser Centre, senior dental care is thoughtfully planned around each person’s overall well-being, physical mobility, and individual pace to support lasting comfort, confident speech, and effortless daily nutrition.
                </p>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center gap-4 pt-2">
                <button
                  onClick={handleBookClick}
                  className="px-8 py-3.5 rounded-full bg-gradient-to-r from-brandBlue to-brandSky text-white font-headline font-bold text-sm shadow-md hover:shadow-lg hover:brightness-105 transition-all flex items-center gap-2 group cursor-pointer"
                >
                  <Calendar className="w-4 h-4 text-white" />
                  <span>Book Senior Consultation</span>
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
                  <span>Medical-First Protocols</span>
                </div>
                <div className="flex items-center gap-2 text-xs font-semibold text-slate-700">
                  <CheckCircle2 className="w-4 h-4 text-brandSky shrink-0" />
                  <span>Paced, Gentle Visits</span>
                </div>
                <div className="flex items-center gap-2 text-xs font-semibold text-slate-700">
                  <CheckCircle2 className="w-4 h-4 text-brandSky shrink-0" />
                  <span>Dentures &amp; Teeth Care</span>
                </div>
                <div className="flex items-center gap-2 text-xs font-semibold text-slate-700">
                  <CheckCircle2 className="w-4 h-4 text-brandSky shrink-0" />
                  <span>Mobility Friendly</span>
                </div>
              </div>
            </motion.div>

            {/* Right Column: Clean White Frame Hero Image with Radiant Ambient Glow */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.15 }}
              className="lg:col-span-5 relative"
            >
              {/* Radiant Ambient Soft Blur */}
              <div className="absolute -inset-4 bg-gradient-to-tr from-emerald-500/15 via-brandSky/20 to-brandBlue/15 rounded-3xl blur-2xl -z-10" />

              <div className="relative rounded-3xl overflow-hidden bg-white border border-slate-200/90 shadow-2xl p-2.5 sm:p-3 group">
                <div className="relative aspect-square w-full rounded-2xl overflow-hidden bg-slate-50 flex items-center justify-center">
                  <img
                    src="/images/medical-services/dental-care/geriatric-dentistry/geriatric-dental-care/dental-care-for-older-adults.webp"
                    alt="Comfortable, Personalised Dental Care for Older Adults - Jerush Dentofacial"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                </div>
              </div>
            </motion.div>

          </div>
        </div>
      </section>

      {/* ─── Top Appointment Consultation Section (Standard Top Second Section) ─── */}
      <TreatmentAppointmentForm
        id="consultation-form"
        treatmentName="Geriatric Dental Care"
        title="Book a Consultation"
        highlightWord="Near You"
        subtitle="Get personalised advice from Jerush Dentofacial & Cosmetic Laser Centre's leading specialists."
        features={[
          {
            icon: HeartHandshake,
            title: 'Medical-First Protocols',
            desc: 'Care tailored to medications, general health, blood thinners, and systemic conditions.'
          },
          {
            icon: Award,
            title: 'Specialist-Led Care',
            desc: 'Supervised by hospital prosthodontists and senior restorative dental specialists.'
          },
          {
            icon: Clock,
            title: 'Paced & Gentle Visits',
            desc: 'Relaxed, unhurried appointments with custom chair angles and rest pauses whenever needed.'
          },
          {
            icon: MapPin,
            title: '4 Regional Centres',
            desc: 'Centres of Excellence in Thuckalay, Chennai, Trichy, and UAE.'
          }
        ]}
      />

      {/* ─── Signature Stats & Counter Strip ─── */}
      <section className="bg-gradient-to-r from-[#0F172A] via-[#2852A3] to-[#0F172A] py-10 sm:py-12 px-4 sm:px-6 text-white shadow-inner relative overflow-hidden">
        <div className="absolute -top-12 -left-12 w-64 h-64 bg-brandSky/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-12 -right-12 w-64 h-64 bg-blue-400/10 rounded-full blur-3xl pointer-events-none" />
        
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8 text-center divide-y sm:divide-y-0 sm:divide-x divide-white/10">
            {KEY_STATS.map((stat, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: idx * 0.08 }}
                className={`${idx > 0 ? 'pt-4 sm:pt-0' : ''}`}
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

      {/* ─── Sticky Sub-Navigation Bar with onTabClick Wired Up ─── */}
      <TreatmentSectionNav
        tabs={NAVIGATION_TABS}
        activeSection={activeSection}
        onTabClick={scrollToSection}
      />

      {/* ─── Section 1: Age-Related Dental Changes (PDF Page 1 - 2) ─── */}
      {/* UNIQUE LAYOUT: 2-Column Horizontal Split Clinical Matrix with Protocol Pills */}
      <section id="age-changes" className="py-16 sm:py-20 lg:py-24 bg-white relative overflow-hidden scroll-mt-28 border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="max-w-3xl mx-auto text-center space-y-4 mb-16"
          >
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-blue-50 border border-blue-200 text-brandBlue text-xs font-bold uppercase tracking-wider font-headline">
              <Activity className="w-3.5 h-3.5 text-brandSky" />
              <span>Diagnostic Clinical Matrix</span>
            </div>
            <h2
              style={{ lineHeight: 1.4 }}
              className="text-2xl sm:text-3xl lg:text-4xl font-extrabold font-headline text-slate-900 tracking-tight leading-[1.4]"
            >
              Age-Related{' '}
              <span className="bg-gradient-to-r from-brandBlue to-brandSky bg-clip-text text-transparent">
                Dental Changes
              </span>
            </h2>
            <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
              Dental needs change over time. Being aware of these common oral health changes helps you seek timely care before minor concerns turn into painful complications:
            </p>
          </motion.div>

          {/* 2x2 Horizontal Split Diagnostic Cards */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {DENTAL_CHANGES.map((change, idx) => (
              <motion.div
                key={change.id}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.45, delay: idx * 0.08 }}
                className="bg-slate-50 rounded-3xl border border-slate-200/90 overflow-hidden shadow-sm hover:shadow-xl hover:border-brandSky/60 transition-all duration-300 flex flex-col sm:flex-row group"
              >
                {/* Left/Top Image Container */}
                <div className="relative sm:w-2/5 aspect-[4/3] sm:aspect-auto bg-slate-900 overflow-hidden shrink-0">
                  <img
                    src={change.img}
                    alt={change.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute top-3 left-3">
                    <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider border shadow-sm ${change.badgeColor}`}>
                      {change.tag}
                    </span>
                  </div>
                </div>

                {/* Right/Bottom Content Box */}
                <div className="p-6 sm:p-7 flex-1 flex flex-col justify-between space-y-4">
                  <div className="space-y-2">
                    <span className="text-[11px] font-bold text-brandSky uppercase tracking-wider font-headline block">
                      {change.subtitle}
                    </span>
                    <h3 className="text-lg font-bold font-headline text-slate-900 group-hover:text-brandBlue transition-colors">
                      {change.title}
                    </h3>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      {change.description}
                    </p>
                  </div>

                  {/* Clinical Solution Protocol Pill */}
                  <div className="p-3 rounded-2xl bg-white border border-slate-200/80 text-[11px] text-slate-700 flex items-start gap-2 shadow-xs">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span className="leading-snug font-medium">{change.alert}</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

        </div>
      </section>

      {/* ─── Section 2: What Does Geriatric Dental Care Include? (PDF Page 2 - 3) ─── */}
      {/* UNIQUE LAYOUT: Bento Grid Feature Showcase with Custom Category Badges */}
      <section id="care-includes" className="py-16 sm:py-20 lg:py-24 bg-slate-50 relative overflow-hidden scroll-mt-28 border-b border-slate-200/70">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="max-w-3xl mx-auto text-center space-y-4 mb-16"
          >
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-blue-100/70 border border-blue-200 text-brandBlue text-xs font-bold uppercase tracking-wider font-headline">
              <Stethoscope className="w-3.5 h-3.5 text-brandSky" />
              <span>Full Clinical Scope</span>
            </div>
            <h2
              style={{ lineHeight: 1.4 }}
              className="text-2xl sm:text-3xl lg:text-4xl font-extrabold font-headline text-slate-900 tracking-tight leading-[1.4]"
            >
              What Does Geriatric Dental Care{' '}
              <span className="bg-gradient-to-r from-brandBlue to-brandSky bg-clip-text text-transparent">
                Include?
              </span>
            </h2>
            <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
              Care is tailored to your individual oral health, physical endurance, and medical circumstances. Treatment options include:
            </p>
          </motion.div>

          {/* 7 Services Bento Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {CARE_SERVICES.map((srv, idx) => (
              <motion.div
                key={srv.id}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.45, delay: idx * 0.07 }}
                className="bg-white rounded-3xl border border-slate-200/80 overflow-hidden shadow-sm hover:shadow-lg hover:border-brandSky/60 transition-all duration-300 flex flex-col group"
              >
                <div className="relative aspect-[16/10] w-full bg-slate-100 overflow-hidden">
                  <img
                    src={srv.img}
                    alt={srv.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-md px-3 py-1 rounded-full text-[11px] font-bold text-brandBlue font-headline border border-white/60 shadow-xs">
                    {srv.badge}
                  </div>
                  <div className="absolute bottom-3 right-3 bg-slate-900/85 backdrop-blur-md px-2.5 py-0.5 rounded-full text-[10px] font-bold text-white uppercase tracking-wider border border-white/20">
                    {srv.highlight}
                  </div>
                </div>

                <div className="p-6 sm:p-7 flex-1 flex flex-col justify-between space-y-4">
                  <div className="space-y-2">
                    <h3 className="font-headline font-bold text-lg text-slate-900 group-hover:text-brandBlue transition-colors">
                      {srv.title}
                    </h3>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      {srv.description}
                    </p>
                  </div>

                  <div className="pt-4 border-t border-slate-100 space-y-1.5">
                    {srv.points.map((pt, pIdx) => (
                      <div key={pIdx} className="flex items-center gap-2 text-xs text-slate-700">
                        <Check className="w-3.5 h-3.5 text-brandSky shrink-0" />
                        <span>{pt}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}

            {/* Eighth Supportive Care Summary Card */}
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.45, delay: 0.4 }}
              className="bg-gradient-to-br from-[#0F172A] via-[#1E3A8A] to-[#0F172A] text-white rounded-3xl p-7 flex flex-col justify-between border border-blue-500/30 shadow-xl"
            >
              <div className="space-y-4">
                <div className="w-12 h-12 rounded-2xl bg-white/10 backdrop-blur-md flex items-center justify-center text-brandSky">
                  <Sparkles className="w-6 h-6" />
                </div>
                <h3 className="font-headline font-bold text-xl text-white">
                  Holistic Coordination with Your Physician
                </h3>
                <p className="text-xs text-slate-300 leading-relaxed">
                  We don’t treat teeth in isolation. Our specialists collaborate with your cardiologist, endocrinologist, or general physician to coordinate medications, blood thinners, and post-treatment recovery.
                </p>
              </div>

              <div className="pt-5 border-t border-white/10">
                <button
                  onClick={handleBookClick}
                  className="w-full py-3 rounded-full bg-gradient-to-r from-brandSky to-brandBlue text-white text-xs font-bold font-headline hover:brightness-110 transition-all shadow-md"
                >
                  Arrange Senior Consultation
                </button>
              </div>
            </motion.div>
          </div>

        </div>
      </section>

      {/* ─── Section 3: A Dental Visit That Puts Comfort First (PDF Page 3) ─── */}
      {/* UNIQUE LAYOUT: 3-Step Milestone Pathway with Step Circles and Caregiver Guidance */}
      <section id="comfort-first" className="py-16 sm:py-20 lg:py-24 bg-gradient-to-b from-slate-900 via-slate-950 to-slate-900 text-white relative overflow-hidden scroll-mt-28">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_var(--tw-gradient-stops))] from-blue-900/20 via-transparent to-transparent pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="max-w-3xl mx-auto text-center space-y-4 mb-16"
          >
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-blue-500/20 border border-blue-400/30 text-brandSky text-xs font-bold uppercase tracking-wider font-headline">
              <Heart className="w-3.5 h-3.5 text-brandSky" />
              <span>Patient-Centred Protocols</span>
            </div>
            <h2
              style={{ lineHeight: 1.4 }}
              className="text-2xl sm:text-3xl lg:text-4xl font-extrabold font-headline text-white tracking-tight leading-[1.4]"
            >
              A Dental Visit That Puts{' '}
              <span className="bg-gradient-to-r from-brandSky via-sky-300 to-white bg-clip-text text-transparent">
                Comfort First
              </span>
            </h2>
            <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
              We understand that visiting the dentist may feel tiring or stressful. Here is how our hospital ensures your visits are reassuring, gentle, and paced around you:
            </p>
          </motion.div>

          {/* 3 Structured Milestone Steps */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {COMFORT_PILLARS.map((pillar, idx) => (
              <motion.div
                key={pillar.step}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.45, delay: idx * 0.1 }}
                className="rounded-3xl bg-slate-800/80 border border-slate-700/80 overflow-hidden shadow-xl hover:border-brandSky/60 transition-all duration-300 flex flex-col group"
              >
                {/* Step Image */}
                <div className="relative aspect-[16/10] w-full bg-slate-900 overflow-hidden">
                  <img
                    src={pillar.img}
                    alt={pillar.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 opacity-90 group-hover:opacity-100"
                  />
                  <div className="absolute top-4 left-4 w-9 h-9 rounded-full bg-brandSky text-slate-950 font-black font-headline flex items-center justify-center text-sm shadow-md">
                    {pillar.step}
                  </div>
                </div>

                {/* Content */}
                <div className="p-7 flex-1 flex flex-col justify-between space-y-5">
                  <div className="space-y-2">
                    <span className="text-xs font-bold text-brandSky uppercase tracking-wider font-headline block">
                      {pillar.subtitle}
                    </span>
                    <h3 className="font-headline font-bold text-xl text-white group-hover:text-brandSky transition-colors">
                      {pillar.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                      {pillar.description}
                    </p>
                  </div>

                  <div className="pt-4 border-t border-slate-700/70 space-y-2">
                    {pillar.highlights.map((hl, hIdx) => (
                      <div key={hIdx} className="flex items-center gap-2 text-xs text-slate-200">
                        <CheckCheck className="w-3.5 h-3.5 text-brandSky shrink-0" />
                        <span>{hl}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

        </div>
      </section>

      {/* ─── Section 4: Everyday Habits for Maintaining Oral Health (PDF Page 4) ─── */}
      {/* UNIQUE LAYOUT: Daily Senior Wellness Routine Dashboard with Time Badges */}
      <section id="daily-habits" className="py-16 sm:py-20 lg:py-24 bg-white relative overflow-hidden scroll-mt-28 border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="max-w-3xl mx-auto text-center space-y-4 mb-16"
          >
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-blue-50 border border-blue-200 text-brandBlue text-xs font-bold uppercase tracking-wider font-headline">
              <Sun className="w-3.5 h-3.5 text-brandSky" />
              <span>Daily Wellness Routine</span>
            </div>
            <h2
              style={{ lineHeight: 1.4 }}
              className="text-2xl sm:text-3xl lg:text-4xl font-extrabold font-headline text-slate-900 tracking-tight leading-[1.4]"
            >
              Everyday Habits for Maintaining{' '}
              <span className="bg-gradient-to-r from-brandBlue to-brandSky bg-clip-text text-transparent">
                Oral Health
              </span>
            </h2>
            <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
              Consistent daily care protects teeth and gums between dental visits. These five practical daily habits help maintain oral comfort and general well-being:
            </p>
          </motion.div>

          {/* 5 Daily Habit Cards in Dashboard Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6">
            {DAILY_HABITS.map((habit, idx) => (
              <motion.div
                key={habit.number}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.45, delay: idx * 0.08 }}
                className="bg-slate-50 rounded-2xl border border-slate-200/90 overflow-hidden shadow-sm hover:shadow-md hover:border-brandSky/60 transition-all flex flex-col group"
              >
                <div className="relative aspect-[4/3] w-full bg-slate-100 overflow-hidden">
                  <img
                    src={habit.img}
                    alt={habit.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-2.5 left-2.5 bg-slate-900/85 backdrop-blur-md px-2.5 py-0.5 rounded-full text-[10px] font-bold text-white font-headline border border-white/20">
                    {habit.time}
                  </div>
                </div>

                <div className="p-5 flex-1 flex flex-col justify-between space-y-3">
                  <div>
                    <h3 className="font-headline font-bold text-sm text-slate-900 group-hover:text-brandBlue transition-colors mb-1">
                      {habit.title}
                    </h3>
                    <span className="text-[11px] font-semibold text-brandSky block mb-2">
                      {habit.lead}
                    </span>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      {habit.description}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

        </div>
      </section>

      {/* ─── Section 5: Common Concerns in Older Adults (PDF Page 4 - 5) ─── */}
      {/* UNIQUE LAYOUT: Concern vs Gentle Hospital Solution Comparison */}
      <section id="common-concerns" className="py-16 sm:py-20 lg:py-24 bg-slate-50 relative overflow-hidden scroll-mt-28 border-b border-slate-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="max-w-3xl mx-auto text-center space-y-4 mb-16"
          >
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-blue-100/70 border border-blue-200 text-brandBlue text-xs font-bold uppercase tracking-wider font-headline">
              <ShieldAlert className="w-3.5 h-3.5 text-brandSky" />
              <span>Symptom vs Solution Guide</span>
            </div>
            <h2
              style={{ lineHeight: 1.4 }}
              className="text-2xl sm:text-3xl lg:text-4xl font-extrabold font-headline text-slate-900 tracking-tight leading-[1.4]"
            >
              Common Concerns in{' '}
              <span className="bg-gradient-to-r from-brandBlue to-brandSky bg-clip-text text-transparent">
                Older Adults
              </span>
            </h2>
            <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
              If you or a loved one is experiencing any of these common oral health changes, our hospital provides gentle, targeted care to relieve discomfort quickly:
            </p>
          </motion.div>

          {/* 3 Comprehensive Concern vs Solution Cards */}
          <div className="space-y-6 max-w-5xl mx-auto">
            {COMMON_CONCERNS.map((item, idx) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.45, delay: idx * 0.1 }}
                className="bg-white rounded-3xl border border-slate-200/90 overflow-hidden shadow-sm hover:shadow-md transition-all p-6 sm:p-8 grid grid-cols-1 lg:grid-cols-12 gap-6 items-center group"
              >
                <div className="lg:col-span-4 rounded-2xl overflow-hidden aspect-[4/3] bg-slate-100 shrink-0">
                  <img
                    src={item.img}
                    alt={item.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                </div>

                <div className="lg:col-span-8 space-y-4">
                  <div>
                    <span className="text-[11px] font-bold text-amber-700 bg-amber-50 px-2.5 py-0.5 rounded-full border border-amber-200 uppercase tracking-wider font-headline inline-block mb-2">
                      {item.subtitle}
                    </span>
                    <h3 className="font-headline font-bold text-xl text-slate-900 group-hover:text-brandBlue transition-colors">
                      {item.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-600 mt-2 leading-relaxed">
                      <strong className="text-slate-800">What You Notice: </strong>
                      {item.concernText}
                    </p>
                  </div>

                  <div className="p-4 rounded-2xl bg-blue-50/70 border border-brandSky/30 text-xs sm:text-sm text-slate-700 leading-relaxed">
                    <strong className="text-brandBlue font-bold block mb-1">
                      {item.solutionTitle}
                    </strong>
                    {item.solutionText}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

        </div>
      </section>

      {/* ─── Section 6: Regional Hospital Network ─── */}
      <section id="regional-centres" className="py-16 sm:py-20 bg-white relative overflow-hidden scroll-mt-28 border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="max-w-3xl mx-auto text-center space-y-4 mb-14"
          >
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-blue-50 border border-blue-200 text-brandBlue text-xs font-bold uppercase tracking-wider font-headline">
              <MapPin className="w-3.5 h-3.5 text-brandSky" />
              <span>Direct Hospital Network</span>
            </div>
            <h2
              style={{ lineHeight: 1.4 }}
              className="text-2xl sm:text-3xl lg:text-4xl font-extrabold font-headline text-slate-900 tracking-tight leading-[1.4]"
            >
              Serving Families Across Tamil Nadu &amp;{' '}
              <span className="bg-gradient-to-r from-brandBlue to-brandSky bg-clip-text text-transparent">
                South Kerala
              </span>
            </h2>
            <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
              Senior dental consultations, gentle scaling, and restorative therapies are accessible across our regional centres:
            </p>
          </motion.div>

          {/* Regional Centres Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
            {[
              {
                title: 'Thuckalay (Hospital HQ)',
                role: 'Main Multispecialty Hospital & Senior Dental Wing',
                city: 'Kanyakumari District'
              },
              {
                title: 'Chennai Centre',
                role: 'Cosmetic & Geriatric Dental Suite',
                city: 'Adyar, Chennai'
              },
              {
                title: 'UAE Clinic',
                role: 'International Dental & Aesthetic Wing',
                city: 'Fujairah / UAE'
              },
              {
                title: 'Trichy Centre',
                role: 'Central Tamil Nadu Consultations & Denture Care',
                city: 'Trichy Central'
              }
            ].map((c, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.08 }}
                className="p-6 rounded-3xl bg-slate-50 border border-slate-200/80 hover:border-brandSky/60 hover:bg-white hover:shadow-lg transition-all duration-300"
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
            <div className="inline-block p-3.5 rounded-2xl bg-slate-50 border border-slate-200 text-xs text-slate-500">
              <strong className="text-slate-700">Hospital Branch Addresses:</strong> Complete clinic street addresses, Google Maps locations, and contact details are available in the footer section below.
            </div>
          </div>

        </div>
      </section>

      {/* ─── Section 7: Frequently Asked Questions ─── */}
      <section id="faqs" className="py-16 sm:py-20 lg:py-24 bg-slate-50 relative overflow-hidden scroll-mt-28 border-b border-slate-200/80">
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
              Clear clinical guidance on senior oral hygiene, dry mouth management, denture care, and medical coordination.
            </p>
          </motion.div>

          {/* Accordion List */}
          <div className="space-y-3.5">
            {FAQS.map((faq, i) => {
              const isExpanded = expandedFaq === i;
              return (
                <div
                  key={i}
                  className={`rounded-2xl overflow-hidden transition-all duration-300 ${
                    isExpanded
                      ? 'bg-white border border-brandSky/40 shadow-md ring-1 ring-brandSky/20'
                      : 'bg-white border border-slate-200/80 hover:border-brandSky/40 hover:shadow-sm'
                  }`}
                >
                  <button
                    onClick={() => setExpandedFaq(isExpanded ? null : i)}
                    className="w-full px-6 py-5 flex items-center justify-between text-left font-headline font-bold text-sm sm:text-base text-slate-900 hover:text-brandBlue transition-colors group"
                  >
                    <span className="pr-4">{faq.q}</span>
                    <div
                      className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 transition-all duration-300 ${
                        isExpanded
                          ? 'bg-gradient-to-r from-brandBlue to-brandSky text-white rotate-180 shadow-sm'
                          : 'bg-slate-100 text-slate-600 group-hover:bg-brandBlue group-hover:text-white'
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

      {/* ─── Section 8: Related Treatments in Geriatric Dentistry ─── */}
      <section className="py-16 sm:py-20 bg-white relative overflow-hidden border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="max-w-3xl mx-auto text-center space-y-3 mb-12"
          >
            <span className="text-xs font-bold text-brandSky uppercase tracking-widest font-headline">
              Comprehensive Senior Prosthodontics
            </span>
            <h2
              style={{ lineHeight: 1.4 }}
              className="text-2xl sm:text-3xl font-extrabold font-headline text-slate-900 tracking-tight leading-[1.4]"
            >
              Related Treatments in{' '}
              <span className="bg-gradient-to-r from-brandBlue to-brandSky bg-clip-text text-transparent">
                Geriatric Dentistry
              </span>
            </h2>
            <p className="text-slate-600 text-sm leading-relaxed">
              Explore complementary tooth replacement options provided by our senior prosthodontic team across Tamil Nadu.
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

      {/* ─── Bottom CTA Banner (Dr. A. Bladbin & Unified Dark Navy Format) ─── */}
      <TreatmentCtaBanner
        badgeText="CHIEF DENTAL SURGEON"
        titlePrefix="Supporting Healthy Smiles"
        highlightWord="at Every Age"
        titleSuffix="at Jerush"
        subtitle="Good oral health remains important throughout life. Timely dental care can help older adults maintain comfort, enjoy a varied diet and protect their remaining natural teeth. Arrange a consultation with our experienced prosthodontic and geriatric dental team to discuss individual needs and suitable treatment options."
        primaryBtnText="Book Senior Consultation"
        onPrimaryClick={handleBookClick}
        secondaryBtnText="Call +91 94891 60000"
        secondaryBtnPhone="+919489160000"
        doctorImage="/images/doctors/dr-bladbin-portrait.webp"
        doctorName="DR. A. BLADBIN"
        doctorRole="Founder & Chief Medical Director"
        doctorAlt="DR. A. BLADBIN - Founder & Chief Medical Director at Jerush Dentofacial"
      />
    </div>
  );
}
