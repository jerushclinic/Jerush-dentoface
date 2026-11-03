import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ShieldCheck, Calendar, Phone, CheckCircle2, Clock,
  Award, Smile, ArrowRight, Info, Check, HelpCircle, AlertCircle,
  MapPin, ChevronRight, ChevronDown, Heart, Shield, Activity,
  Sparkles, AlertTriangle, Users, Stethoscope, HeartHandshake,
  Layers, RefreshCw, AlertOctagon, Utensils, MessageSquare, Moon,
  Zap, Wrench, ShieldAlert, Cpu
} from 'lucide-react';
import PageBreadcrumbHero from '../components/common/PageBreadcrumbHero';
import TreatmentCtaBanner from '../components/common/TreatmentCtaBanner';
import TreatmentSectionNav from '../components/common/TreatmentSectionNav';
import TreatmentAppointmentForm from '../components/common/TreatmentAppointmentForm';
import useTreatmentScrollSpy from '../hooks/useTreatmentScrollSpy';

// Signature Counter & Key Stats Bar Data
const KEY_STATS = [
  { value: '188K+', label: 'Smiles Restored with Comfort' },
  { value: '18+ Years', label: 'Prosthodontic & Denture Expertise' },
  { value: '100% Custom', label: 'Anatomical Fit & Shade Match' },
  { value: '4 Regional Centres', label: 'Centres of Excellence in TN' }
];

// Sticky Sub-Navigation Tabs
const NAVIGATION_TABS = [
  { id: 'denture-types', label: 'Which Type Suits You' },
  { id: 'treatment-journey', label: 'Clinical Process' },
  { id: 'adapting-eating', label: 'Adjusting & Eating' },
  { id: 'daily-care', label: 'Daily Denture Care' },
  { id: 'when-to-replace', label: 'Check & Replace Signs' },
  { id: 'regional-centres', label: 'Regional Centres' },
  { id: 'faqs', label: 'FAQs' }
];

// 1. Which Type of Denture May Suit You? (PDF Page 1)
const DENTURE_TYPES = [
  {
    id: 'complete-dentures',
    title: 'Complete Dentures',
    tag: 'Full Arch Restoration',
    tier: 'Tier 01',
    description: 'Replace all teeth in the upper jaw, lower jaw or both. They rest on the oral tissues and are designed to restore appearance and basic chewing function.',
    img: '/images/medical-services/dental-care/geriatric-dentistry/dentures/complete-dentures.webp',
    alt: 'Custom-fitted complete dentures replacing missing teeth in upper or lower jaw',
    specs: [
      { label: 'Arch Coverage', value: 'Full Upper or Lower' },
      { label: 'Support System', value: 'Alveolar Ridge & Mucosa' },
      { label: 'Chewing Restoration', value: '65% - 75% Efficiency' }
    ],
    features: [
      'Individually sculpted gum contours and root eminences',
      'High-impact biocompatible PMMA resin base',
      'Re-establishes vertical facial height & lip fullness'
    ]
  },
  {
    id: 'partial-dentures',
    title: 'Partial Dentures',
    tag: 'Tooth-Supported Precision',
    tier: 'Tier 02',
    description: 'Replace several missing teeth while using the remaining natural teeth for support and, depending on the design, retention.',
    img: '/images/medical-services/dental-care/geriatric-dentistry/dentures/partial-dentures.webp',
    alt: 'Removable partial dentures anchored to remaining natural teeth',
    specs: [
      { label: 'Arch Coverage', value: 'Segmental Gaps' },
      { label: 'Support System', value: 'Remaining Natural Teeth' },
      { label: 'Chewing Restoration', value: '80% - 85% Efficiency' }
    ],
    features: [
      'Ultra-thin cast metal or flexible biocompatible options',
      'Prevents opposing & adjacent teeth from drifting',
      'Discreet aesthetic clasps color-matched to natural teeth'
    ]
  },
  {
    id: 'implant-supported-dentures',
    title: 'Implant-Supported Dentures',
    tag: 'Maximum Retention & Stability',
    tier: 'Tier 03',
    description: 'Attach to dental implants for additional retention and stability. These require assessment of the jawbone, oral health and suitability for implant surgery.',
    img: '/images/medical-services/dental-care/geriatric-dentistry/dentures/implant-supported-denture.webp',
    alt: 'Implant-supported overdentures offering superior retention and stability',
    specs: [
      { label: 'Arch Coverage', value: 'Full or Segmental' },
      { label: 'Support System', value: 'Titanium Dental Implants' },
      { label: 'Chewing Restoration', value: '95%+ Near-Natural Bite' }
    ],
    features: [
      'Precision snap-in locators or titanium bar anchorage',
      'Zero denture slip, wobble, or palatal bulk',
      'Significantly slows down underlying jawbone resorption'
    ]
  }
];

// 2. From First Consultation to Your New Denture (PDF Page 2)
const CLINICAL_STEPS = [
  {
    step: '01',
    phase: 'Phase 1 • Diagnostics',
    title: 'Oral Health Assessment',
    description: 'The dentist checks your gums, remaining teeth, jaw ridge and bite. Any necessary treatment for infection, decay or gum disease is considered before denture fabrication.',
    img: '/images/medical-services/dental-care/geriatric-dentistry/dentures/oral-health-assessment.webp',
    alt: 'Dentist conducting thorough oral health assessment prior to denture planning',
    badge: 'Clinical Screening',
    outcome: 'Clear anatomical blueprint and pre-denture periodontal stabilization'
  },
  {
    step: '02',
    phase: 'Phase 2 • Impressions',
    title: 'Impressions & Bite Records',
    description: 'Impressions or digital scans may be used to record the shape of your mouth. Bite measurements help establish how the upper and lower teeth should meet.',
    img: '/images/medical-services/dental-care/geriatric-dentistry/dentures/impressions-and-bite-records.webp',
    alt: 'Taking accurate dental impressions and jaw bite records for dentures',
    badge: '3D Mapping',
    outcome: 'Precision occlusal alignment and custom tray border moulding'
  },
  {
    step: '03',
    phase: 'Phase 3 • Lab & Try-in',
    title: 'Denture Fabrication & Fitting',
    description: 'The denture is made to the planned design. During fitting, the dentist checks its comfort, appearance, retention and bite, making adjustments where needed.',
    img: '/images/medical-services/dental-care/geriatric-dentistry/dentures/fabrication-and-fitting.webp',
    alt: 'Denture fabrication in specialized lab and precision clinical fitting session',
    badge: 'Chairside Insertion',
    outcome: 'Shade confirmation, vacuum suction verification, and bite balancing'
  },
  {
    step: '04',
    phase: 'Phase 4 • Follow-up',
    title: 'Review & Adjustment',
    description: 'Follow-up appointments help address sore spots, looseness or bite problems. Further adjustments may be needed as you adapt to the denture.',
    img: '/images/medical-services/dental-care/geriatric-dentistry/dentures/review-and-adjustment.webp',
    alt: 'Post-insertion denture review and delicate chairside adjustments',
    badge: 'Adaptation Support',
    outcome: 'Fine-tuned margins and painless long-term tissue settling'
  }
];

// 3. Eating, Speaking and Adjusting to Dentures (PDF Page 3)
const ADAPTATION_TIPS = [
  {
    number: '01',
    title: 'Start with Softer Foods',
    action: 'Small cut bites',
    desc: 'Begin with soft foods such as eggs, steamed vegetables, and yoghurt cut into small pieces to help your mouth get accustomed to chewing.',
    img: '/images/medical-services/dental-care/geriatric-dentistry/dentures/start-with-softer-foods.webp',
    alt: 'Eating softer foods cut into small bites during denture adaptation'
  },
  {
    number: '02',
    title: 'Chew Slowly on Both Sides',
    action: 'Bilateral pressure',
    desc: 'Chew slowly and consciously distribute food evenly across both sides of your mouth to prevent tipping or dislodging forces.',
    img: '/images/medical-services/dental-care/geriatric-dentistry/dentures/chew-slowly.webp',
    alt: 'Chewing slowly and distributing food evenly with dentures'
  },
  {
    number: '03',
    title: 'Practice Reading Aloud',
    action: 'Speech retraining',
    desc: 'If pronouncing certain words feels different, practice reading aloud in a quiet room to re-train tongue and cheek muscle coordination.',
    img: '/images/medical-services/dental-care/geriatric-dentistry/dentures/practice-reading-aloud.webp',
    alt: 'Practicing reading aloud to adapt speech clarity with new dentures'
  },
  {
    number: '04',
    title: 'Follow Wear Instructions',
    action: 'Rest periods',
    desc: 'Carefully follow your dentist’s instructions regarding wearing schedules during the initial adaptation period to ensure tissue rest.',
    img: '/images/medical-services/dental-care/geriatric-dentistry/dentures/return-for-adjustments.webp',
    alt: 'Following dentist instructions regarding denture wear schedule'
  },
  {
    number: '05',
    title: 'Return for Adjustments',
    action: 'Sore spot relief',
    desc: 'If you notice rubbing, pinching, or persistent sore spots, return promptly for chairside adjustments. Never endure chronic soreness.',
    img: '/images/medical-services/dental-care/geriatric-dentistry/dentures/persistent-soreness.webp',
    alt: 'Returning for professional denture adjustments when soreness occurs'
  }
];

// 4. Daily Denture Care: Protecting Your Mouth and Appliance (PDF Page 3 - 4)
const CARE_PROTOCOLS = [
  {
    id: 'clean-daily',
    title: 'Clean Dentures Daily',
    rule: 'Use denture brush & gentle cleanser',
    description: 'Remove and clean removable dentures every day using a designated denture brush and a mild, non-abrasive denture cleanser to remove plaque and food residue.',
    img: '/images/medical-services/dental-care/geriatric-dentistry/dentures/clean-removable-dentures-daily.webp',
    alt: 'Cleaning removable dentures daily with specialized brush and cleanser'
  },
  {
    id: 'avoid-hot-water',
    title: 'Avoid Hot or Boiling Water',
    rule: 'Use lukewarm or cool water only',
    description: 'Never soak or rinse dentures in hot or boiling water, as extreme temperatures can permanently warp, distort, or weaken acrylic and thermoplastic resins.',
    img: '/images/medical-services/dental-care/geriatric-dentistry/dentures/Avoid-hot-or-boiling-water.webp',
    alt: 'Avoiding hot water to prevent warping of denture acrylic materials'
  },
  {
    id: 'clean-tissues',
    title: 'Clean Gums, Tongue & Teeth',
    rule: 'Maintain gentle oral tissue hygiene',
    description: 'Gently brush your gums, palate, tongue, and any remaining natural teeth morning and night with a soft toothbrush to stimulate circulation and remove bacteria.',
    img: '/images/medical-services/dental-care/geriatric-dentistry/dentures/clean-gums-tongue-teeth.webp',
    alt: 'Gently cleaning gums, tongue, and remaining natural teeth'
  },
  {
    id: 'remove-at-night',
    title: 'Remove Dentures at Night',
    rule: 'Allow oral tissues to rest & breathe',
    description: 'Take your dentures out before sleeping unless your dentist gives different instructions. This relieves pressure on gum ridges and reduces fungal infection risks.',
    img: '/images/medical-services/dental-care/geriatric-dentistry/dentures/remove-dentures-at-night.webp',
    alt: 'Removing dentures at night to rest gums and underlying bone tissues'
  },
  {
    id: 'store-safely',
    title: 'Store Dentures Safely',
    rule: 'Keep moist in protective container',
    description: 'Store dentures in clean water or a specialized denture soaking solution in a secure container away from pets and children so they remain moist and pliable.',
    img: '/images/medical-services/dental-care/geriatric-dentistry/dentures/store-dentures-good-place.webp',
    alt: 'Storing dentures properly in a moist protective case'
  },
  {
    id: 'regular-reviews',
    title: 'Keep Regular Dental Visits',
    rule: 'Ongoing oral health surveillance',
    description: 'Visit your dentist for regular check-ups even if you wear full complete dentures, allowing evaluation of gum ridge health, oral mucosa, and jawbone stability.',
    img: '/images/medical-services/dental-care/geriatric-dentistry/dentures/regular-dental-appointments.webp',
    alt: 'Attending regular dental appointments for ongoing denture and gum checks'
  }
];

// 5. When Should Dentures Be Checked or Replaced? (PDF Page 4 - 5)
const REPLACEMENT_SIGNS = [
  {
    id: 'denture-slipping',
    title: 'Denture Slipping',
    trigger: 'Movement when talking or eating',
    description: 'If your denture moves, rocks, or slips unexpectedly while speaking or eating, jaw ridge remodeling may have altered the fit, requiring relining.',
    img: '/images/medical-services/dental-care/geriatric-dentistry/dentures/denture-slipping.webp',
    alt: 'Denture slipping while talking or chewing indicating loose fit'
  },
  {
    id: 'sore-spots',
    title: 'Repeated Sore Spots',
    trigger: 'Persistent ulcers beneath appliance',
    description: 'Frequent or lasting sore spots, pressure ulcers, or painful friction blisters beneath the base require professional relief and border adjustment.',
    img: '/images/medical-services/dental-care/geriatric-dentistry/dentures/repeated-sore-spots.webp',
    alt: 'Repeated sore spots or ulcers under denture needing clinical adjustment'
  },
  {
    id: 'broken-teeth',
    title: 'Cracks or Broken Teeth',
    trigger: 'Damaged clasps or chipped acrylic',
    description: 'Visible hairline cracks, chipped teeth, broken clasps, or dropped dentures must be repaired professionally in a dental lab to prevent soft tissue lacerations.',
    img: '/images/medical-services/dental-care/geriatric-dentistry/dentures/broken-teeth.webp',
    alt: 'Cracks, broken teeth, or damaged clasps on denture'
  },
  {
    id: 'bite-changes',
    title: 'Changes in Your Bite',
    trigger: 'Uneven contact & chewing fatigue',
    description: 'If teeth do not meet evenly or chewing feels exhausting, bite imbalance can strain the jaw joints (TMJ) and accelerate bone resorption.',
    img: '/images/medical-services/dental-care/geriatric-dentistry/dentures/changes-in-your-bite.webp',
    alt: 'Changes in dental bite or difficulty chewing with existing dentures'
  },
  {
    id: 'mouth-irritation',
    title: 'Persistent Irritation or Odour',
    trigger: 'Redness, burning sensation, or smell',
    description: 'Persistent redness, inflammation of the palate (denture stomatitis), or an unpleasant smell often indicate micro-porosities or fungal build-up.',
    img: '/images/medical-services/dental-care/geriatric-dentistry/dentures/persistent-mouth-irritation.webp',
    alt: 'Persistent mouth irritation, redness, or odour beneath denture'
  }
];

// 6. Frequently Asked Questions (PDF Page 5 - 6)
const FAQS = [
  {
    q: 'What is the difference between complete and partial dentures?',
    a: 'Complete dentures replace all teeth in an upper or lower jaw when no natural teeth remain, resting directly on the gum ridges. Partial dentures replace several missing teeth while clasping securely around remaining natural teeth to provide support, stability, and retention.'
  },
  {
    q: 'Are dentures comfortable to wear?',
    a: 'Well-made, properly fitted dentures can become very comfortable over time. An initial adjustment period of a few weeks is normal as facial and tongue muscles adapt. Persistent pain, pinching, or sore spots should always be evaluated and relieved by your dentist.'
  },
  {
    q: 'Can I eat normally with dentures?',
    a: 'Dentures significantly restore chewing function. We recommend starting with softer foods cut into small bites, chewing slowly on both sides of the mouth. As your comfort increases, you can gradually progress to firmer foods, though very sticky or hard foods should be approached with care.'
  },
  {
    q: 'How long do dentures last?',
    a: 'Their lifespan typically ranges from 5 to 8 years, depending on material quality, daily maintenance, and natural changes in your jawbone and gums. Regular annual reviews help determine whether chairside relining, rebasing, or complete replacement is necessary.'
  },
  {
    q: 'Should I remove my dentures at night?',
    a: 'Yes, most removable dentures should be taken out before sleep. Removing them relieves continuous pressure on the gum ridges, allows the underlying oral mucosa to breathe and recover, and significantly lowers the risk of oral fungal infections (such as denture stomatitis).'
  },
  {
    q: 'Can dentures be used if I have no natural teeth?',
    a: 'Yes. Complete dentures are specifically designed to replace all teeth in a fully edentulous jaw. For patients seeking greater retention and biting power, implant-supported overdentures can also be considered following a clinical and 3D radiographic assessment of jawbone volume.'
  },
  {
    q: 'What should I do if my dentures become loose?',
    a: 'Arrange a dental appointment for an evaluation. Changes in the jaw ridge over time naturally affect the fit. Your dentist can determine whether a laboratory reline, border adjustment, or replacement is appropriate. Avoid relying heavily on drugstore adhesives or attempting DIY repairs.'
  }
];

// Related Treatments in Geriatric Dentistry
const RELATED_TREATMENTS = [
  {
    title: 'Geriatric Dental Care',
    desc: 'Comprehensive oral healthcare for older adults, focusing on root decay, medical alignment, gentle scaling, and dry mouth management.',
    link: '/dental-care/geriatric-dentistry/geriatric-dental-care',
    tag: 'Holistic Senior Care',
    image: '/images/medical-services/dental-care/geriatric-dentistry/geriatric-dental-care/dental-care-for-older-adults.webp',
    alt: 'Comfortable, personalised dental care for older adults at Jerush'
  },
  {
    title: 'Removable Partial Dentures',
    desc: 'Precision cast metal and acrylic partial frameworks engineered to restore missing teeth while preserving remaining anchor dentition.',
    link: '/dental-care/prosthodontic-care/removable-partial-dentures',
    tag: 'Tooth Replacement',
    image: '/images/medical-services/dental-care/prosthodontic-care-tooth-replacement/removable-partial-dentures/removable-partial-denture-dental-model.webp',
    alt: 'Removable partial denture clinical dental model'
  },
  {
    title: 'Dental Crowns & Bridges',
    desc: 'Fixed ceramic and zirconia restorations designed to strengthen weakened teeth or permanently bridge single and multiple gaps.',
    link: '/dental-care/prosthodontic-care/dental-crowns-bridges',
    tag: 'Fixed Prosthodontics',
    image: '/images/medical-services/dental-care/crowns-bridges/dental-bridge.webp',
    alt: 'Custom ceramic and zirconia dental bridges and crowns'
  }
];

export default function DenturesPage() {
  const navigate = useNavigate();
  const [expandedFaq, setExpandedFaq] = useState(null);

  // Destructure activeSection AND scrollToSection from hook
  const { activeSection, scrollToSection } = useTreatmentScrollSpy(
    NAVIGATION_TABS.map(t => t.id),
    138
  );

  const handleBookClick = () => {
    const el = document.getElementById('treatment-appointment-section') || document.getElementById('consultation-form');
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
          { label: 'Dentures', active: true }
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
                <span>Geriatric Dentistry • Prosthodontic Rehabilitation</span>
              </div>

              <h1
                style={{ lineHeight: 1.4 }}
                className="text-3xl sm:text-4xl lg:text-5xl font-black font-headline text-slate-900 tracking-tight leading-[1.4]"
              >
                Replacing Missing Teeth for{' '}
                <span className="bg-gradient-to-r from-brandBlue to-brandSky bg-clip-text text-transparent">
                  Everyday Comfort
                </span>
              </h1>

              <div className="space-y-4 text-slate-600 text-sm sm:text-base leading-relaxed">
                <p>
                  Missing teeth can affect more than the appearance of your smile. They may make chewing difficult, change the way you speak, and reduce confidence in everyday social situations. Dentures offer a practical, proven way to replace missing teeth and restore important aspects of oral function.
                </p>
                <p className="text-slate-500 text-xs sm:text-sm">
                  Dentures are custom-made dental appliances designed to replace some or all missing teeth. Depending on your oral anatomy, they can be removable and supported by the gums, designed to fit over remaining anchor teeth, or securely stabilized with dental implants.
                </p>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center gap-4 pt-2">
                <button
                  onClick={handleBookClick}
                  className="px-8 py-3.5 rounded-full bg-gradient-to-r from-brandBlue to-brandSky text-white font-headline font-bold text-sm shadow-md hover:shadow-lg hover:brightness-105 transition-all flex items-center gap-2 group cursor-pointer"
                >
                  <Calendar className="w-4 h-4 text-white" />
                  <span>Book Denture Consultation</span>
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
                  <span>Custom Precision Fit</span>
                </div>
                <div className="flex items-center gap-2 text-xs font-semibold text-slate-700">
                  <CheckCircle2 className="w-4 h-4 text-brandSky shrink-0" />
                  <span>Restores Chewing &amp; Speech</span>
                </div>
                <div className="flex items-center gap-2 text-xs font-semibold text-slate-700">
                  <CheckCircle2 className="w-4 h-4 text-brandSky shrink-0" />
                  <span>Complete &amp; Partial Types</span>
                </div>
                <div className="flex items-center gap-2 text-xs font-semibold text-slate-700">
                  <CheckCircle2 className="w-4 h-4 text-brandSky shrink-0" />
                  <span>Implant-Supported Stability</span>
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
                    src="/images/medical-services/dental-care/geriatric-dentistry/dentures/replacing-missing-teeth.webp"
                    alt="Custom-fitted dentures for replacing missing teeth and restoring chewing function - Jerush Dentofacial"
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
        id="treatment-appointment-section"
        treatmentName="Dentures"
        title="Book a Denture Consultation"
        highlightWord="Near You"
        subtitle="Get personalised advice from Jerush Dentofacial & Cosmetic Laser Centre's leading prosthodontic specialists."
        features={[
          {
            icon: Smile,
            title: 'Custom Precision Fit',
            desc: 'Shade-matched teeth and anatomical moulds aligned to your natural gum contours.'
          },
          {
            icon: Award,
            title: 'Specialist-Led Care',
            desc: 'Consultations and clinical treatment supervised by hospital prosthodontic specialists.'
          },
          {
            icon: Layers,
            title: 'Advanced In-House Lab',
            desc: 'Fast turnaround times with high-precision digital scanning and CAD/CAM fabrication.'
          },
          {
            icon: MapPin,
            title: '4 Regional Centres',
            desc: 'Centres of Excellence in Thuckalay, Nagercoil, Tirunelveli, and Trichy.'
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

      {/* ─── Section 1: Which Type of Denture May Suit You? (PDF Page 1) ─── */}
      {/* BESPOKE PROSTHETIC TIERS ARCHITECTURE: Spec comparison bars & clinical tier tags */}
      <section id="denture-types" className="py-16 sm:py-20 lg:py-24 bg-white relative overflow-hidden scroll-mt-28 border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="max-w-3xl mx-auto text-center space-y-4 mb-16"
          >
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-blue-50 border border-blue-200 text-brandBlue text-xs font-bold uppercase tracking-wider font-headline">
              <Layers className="w-3.5 h-3.5 text-brandSky" />
              <span>Prosthetic Comparison</span>
            </div>
            <h2
              style={{ lineHeight: 1.4 }}
              className="text-2xl sm:text-3xl lg:text-4xl font-extrabold font-headline text-slate-900 tracking-tight leading-[1.4]"
            >
              Which Type of Denture{' '}
              <span className="bg-gradient-to-r from-brandBlue to-brandSky bg-clip-text text-transparent">
                May Suit You?
              </span>
            </h2>
            <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
              Dentures are not one-size-fits-all. The design depends on whether you have lost a few teeth, all teeth in one jaw, or all teeth in both jaws:
            </p>
          </motion.div>

          {/* 3 Prominent Prosthetic Tier Cards */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {DENTURE_TYPES.map((type, idx) => (
              <motion.div
                key={type.id}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.45, delay: idx * 0.1 }}
                className="bg-slate-50 rounded-3xl border border-slate-200/90 overflow-hidden shadow-sm hover:shadow-xl hover:border-brandSky/60 transition-all duration-300 flex flex-col group"
              >
                {/* Visual Header with Tier Tag & Image */}
                <div className="relative aspect-[16/10] w-full bg-slate-900 overflow-hidden">
                  <img
                    src={type.img}
                    alt={type.alt}
                    className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-transparent pointer-events-none" />
                  
                  <div className="absolute top-4 left-4 flex items-center gap-2">
                    <span className="px-2.5 py-0.5 rounded-full bg-brandSky text-slate-950 text-[10px] font-black uppercase tracking-wider font-headline">
                      {type.tier}
                    </span>
                    <span className="px-3 py-0.5 rounded-full bg-slate-900/85 backdrop-blur-md text-[11px] font-bold text-white uppercase tracking-wider border border-white/20">
                      {type.tag}
                    </span>
                  </div>
                </div>

                {/* Body Content */}
                <div className="p-6 sm:p-7 flex-1 flex flex-col justify-between space-y-6">
                  <div className="space-y-3">
                    <h3 className="text-xl font-bold font-headline text-slate-900 group-hover:text-brandBlue transition-colors">
                      {type.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                      {type.description}
                    </p>
                  </div>

                  {/* Technical Spec Box */}
                  <div className="p-4 rounded-2xl bg-white border border-slate-200/80 space-y-2 text-xs">
                    {type.specs.map((spec, sIdx) => (
                      <div key={sIdx} className="flex justify-between items-center text-slate-700">
                        <span className="text-slate-500 font-medium">{spec.label}:</span>
                        <span className="font-bold text-slate-900">{spec.value}</span>
                      </div>
                    ))}
                  </div>

                  {/* Features Bullet List */}
                  <div className="pt-2 space-y-2 border-t border-slate-200/60">
                    {type.features.map((feat, fIdx) => (
                      <div key={fIdx} className="flex items-start gap-2 text-xs text-slate-700">
                        <Check className="w-3.5 h-3.5 text-brandSky shrink-0 mt-0.5" />
                        <span>{feat}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Expert Consultation Callout Box */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mt-12 p-6 sm:p-7 rounded-2xl bg-gradient-to-r from-blue-50/80 via-white to-sky-50/80 border border-brandSky/30 flex flex-col sm:flex-row items-center justify-between gap-6"
          >
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-brandBlue text-white flex items-center justify-center shrink-0 shadow-md">
                <Info className="w-6 h-6 text-brandSky" />
              </div>
              <div>
                <h4 className="font-headline font-bold text-slate-900 text-sm sm:text-base">
                  Expert Clinical Guidance on Suitability &amp; Investment
                </h4>
                <p className="text-xs sm:text-sm text-slate-600">
                  Your dentist will explain the clinical advantages, tissue limitations, maintenance needs, and treatment costs of the options suitable for your mouth.
                </p>
              </div>
            </div>
            <button
              onClick={handleBookClick}
              className="px-6 py-2.5 rounded-full bg-brandBlue text-white text-xs font-bold font-headline hover:bg-brandSky transition-colors shrink-0 shadow-sm cursor-pointer"
            >
              Discuss Your Options
            </button>
          </motion.div>

        </div>
      </section>

      {/* ─── Section 2: From First Consultation to Your New Denture (PDF Page 2) ─── */}
      {/* BESPOKE LABORATORY PATHWAY: Phase-by-phase flowchart styling */}
      <section id="treatment-journey" className="py-16 sm:py-20 lg:py-24 bg-slate-50 relative overflow-hidden scroll-mt-28 border-b border-slate-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="max-w-3xl mx-auto text-center space-y-4 mb-16"
          >
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-blue-100/70 border border-blue-200 text-brandBlue text-xs font-bold uppercase tracking-wider font-headline">
              <Cpu className="w-3.5 h-3.5 text-brandSky" />
              <span>Laboratory &amp; Clinical Workflow</span>
            </div>
            <h2
              style={{ lineHeight: 1.4 }}
              className="text-2xl sm:text-3xl lg:text-4xl font-extrabold font-headline text-slate-900 tracking-tight leading-[1.4]"
            >
              From First Consultation to{' '}
              <span className="bg-gradient-to-r from-brandBlue to-brandSky bg-clip-text text-transparent">
                Your New Denture
              </span>
            </h2>
            <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
              Getting dentures involves more than taking an impression. The fit, bite and appearance need to be planned carefully so the appliance works comfortably with your mouth:
            </p>
          </motion.div>

          {/* 4 Connected Pathway Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {CLINICAL_STEPS.map((step, idx) => (
              <motion.div
                key={step.step}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.45, delay: idx * 0.08 }}
                className="bg-white rounded-3xl border border-slate-200/90 overflow-hidden shadow-sm hover:shadow-lg hover:border-brandSky/50 transition-all duration-300 flex flex-col group"
              >
                {/* Step Image */}
                <div className="relative aspect-[4/3] w-full bg-slate-100 overflow-hidden">
                  <img
                    src={step.img}
                    alt={step.alt}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute top-3 left-3 bg-slate-900/85 backdrop-blur-md px-3 py-1 rounded-full text-xs font-bold text-white font-headline border border-white/20">
                    Step {step.step}
                  </div>
                  <div className="absolute bottom-3 right-3 bg-white/90 backdrop-blur-md px-2.5 py-0.5 rounded-full text-[10px] font-bold text-brandBlue uppercase tracking-wider border border-white/60">
                    {step.badge}
                  </div>
                </div>

                {/* Content */}
                <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                  <div className="space-y-2">
                    <span className="text-[11px] font-bold text-brandBlue uppercase tracking-wider font-headline">
                      {step.phase}
                    </span>
                    <h3 className="font-headline font-bold text-lg text-slate-900 group-hover:text-brandBlue transition-colors">
                      {step.title}
                    </h3>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      {step.description}
                    </p>
                  </div>

                  <div className="pt-3 border-t border-slate-100 text-[11px] text-slate-600">
                    <strong className="text-slate-800 block mb-0.5">Clinical Target:</strong>
                    {step.outcome}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

        </div>
      </section>

      {/* ─── Section 3: Eating, Speaking and Adjusting to Dentures (PDF Page 3) ─── */}
      {/* BESPOKE ADAPTATION ARCHITECTURE: Dual-Column Roadmap with Action Cards */}
      <section id="adapting-eating" className="py-16 sm:py-20 lg:py-24 bg-white relative overflow-hidden scroll-mt-28 border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="max-w-3xl mx-auto text-center space-y-4 mb-16"
          >
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-blue-50 border border-blue-200 text-brandBlue text-xs font-bold uppercase tracking-wider font-headline">
              <Utensils className="w-3.5 h-3.5 text-brandSky" />
              <span>Adaptation &amp; Lifestyle</span>
            </div>
            <h2
              style={{ lineHeight: 1.4 }}
              className="text-2xl sm:text-3xl lg:text-4xl font-extrabold font-headline text-slate-900 tracking-tight leading-[1.4]"
            >
              Eating, Speaking and{' '}
              <span className="bg-gradient-to-r from-brandBlue to-brandSky bg-clip-text text-transparent">
                Adjusting to Dentures
              </span>
            </h2>
            <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
              A new denture can feel unfamiliar at first. Your mouth may need time to adapt, and speaking or chewing may initially require extra practice:
            </p>
          </motion.div>

          {/* 5 Practical Adaptation Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6">
            {ADAPTATION_TIPS.map((tip, idx) => (
              <motion.div
                key={tip.number}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.45, delay: idx * 0.08 }}
                className="bg-slate-50 rounded-2xl border border-slate-200/90 overflow-hidden shadow-sm hover:shadow-md hover:border-brandSky/60 transition-all flex flex-col group"
              >
                <div className="relative aspect-[4/3] w-full bg-slate-100 overflow-hidden">
                  <img
                    src={tip.img}
                    alt={tip.alt}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-2.5 left-2.5 w-7 h-7 rounded-full bg-brandBlue text-white text-xs font-bold flex items-center justify-center font-headline shadow-sm">
                    {tip.number}
                  </div>
                </div>

                <div className="p-5 flex-1 flex flex-col justify-between space-y-3">
                  <div>
                    <h3 className="font-headline font-bold text-sm text-slate-900 group-hover:text-brandBlue transition-colors mb-1">
                      {tip.title}
                    </h3>
                    <span className="text-[11px] font-semibold text-brandSky block mb-2">
                      {tip.action}
                    </span>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      {tip.desc}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Honest Clinical Expectation Note */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mt-12 p-6 rounded-2xl bg-amber-50/70 border border-amber-200/80 max-w-4xl mx-auto flex items-start gap-4"
          >
            <AlertCircle className="w-6 h-6 text-amber-600 shrink-0 mt-0.5" />
            <div className="space-y-1">
              <h4 className="font-headline font-bold text-amber-900 text-sm">
                Managing Sensation &amp; Chewing Power Expectations
              </h4>
              <p className="text-xs sm:text-sm text-amber-800/90 leading-relaxed">
                Dentures can improve chewing and appearance, but they may not provide the same sensation or biting efficiency as natural teeth. Implant-supported options may offer additional stability and bone preservation for suitable patients.
              </p>
            </div>
          </motion.div>

        </div>
      </section>

      {/* ─── Section 4: Daily Denture Care: Protecting Your Mouth and Appliance (PDF Page 3 - 4) ─── */}
      {/* BESPOKE HYGIENE ARCHITECTURE: 6 Protocols Grid with Red Warning Box */}
      <section id="daily-care" className="py-16 sm:py-20 lg:py-24 bg-slate-50 relative overflow-hidden scroll-mt-28 border-b border-slate-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="max-w-3xl mx-auto text-center space-y-4 mb-16"
          >
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-blue-100/70 border border-blue-200 text-brandBlue text-xs font-bold uppercase tracking-wider font-headline">
              <ShieldCheck className="w-3.5 h-3.5 text-brandSky" />
              <span>Hygiene Protocols</span>
            </div>
            <h2
              style={{ lineHeight: 1.4 }}
              className="text-2xl sm:text-3xl lg:text-4xl font-extrabold font-headline text-slate-900 tracking-tight leading-[1.4]"
            >
              Daily Denture Care:{' '}
              <span className="bg-gradient-to-r from-brandBlue to-brandSky bg-clip-text text-transparent">
                Protecting Mouth &amp; Appliance
              </span>
            </h2>
            <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
              Keeping dentures clean helps reduce plaque, food deposits, odour and irritation of the oral tissues:
            </p>
          </motion.div>

          {/* 6 Hygiene Protocols Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {CARE_PROTOCOLS.map((item, idx) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.45, delay: idx * 0.08 }}
                className="bg-white rounded-3xl border border-slate-200/80 overflow-hidden shadow-sm hover:shadow-lg hover:border-brandSky/60 transition-all duration-300 flex flex-col group"
              >
                <div className="relative aspect-[16/10] w-full bg-slate-100 overflow-hidden">
                  <img
                    src={item.img}
                    alt={item.alt}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/60 via-transparent to-transparent pointer-events-none" />
                  <div className="absolute bottom-3 left-3 right-3">
                    <span className="text-xs font-headline font-bold text-white drop-shadow-sm">
                      {item.rule}
                    </span>
                  </div>
                </div>

                <div className="p-6 flex-1 flex flex-col justify-between space-y-3">
                  <div>
                    <h3 className="font-headline font-bold text-base text-slate-900 group-hover:text-brandBlue transition-colors mb-2">
                      {item.title}
                    </h3>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Crucial DIY Warning Callout */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mt-12 p-6 rounded-2xl bg-rose-50/80 border border-rose-200 max-w-3xl mx-auto flex items-start gap-4"
          >
            <AlertOctagon className="w-6 h-6 text-rose-600 shrink-0 mt-0.5" />
            <div className="space-y-1">
              <h4 className="font-headline font-bold text-rose-900 text-sm">
                Warning: Never Attempt DIY Denture Repairs
              </h4>
              <p className="text-xs text-rose-800 leading-relaxed">
                Never try to repair a cracked denture or adjust its fit yourself. Household adhesives and superglues contain toxic compounds, and improper realignment can cause severe tissue laceration and rapid jawbone resorption. Damaged appliances should always be assessed professionally.
              </p>
            </div>
          </motion.div>

        </div>
      </section>

      {/* ─── Section 5: When Should Dentures Be Checked or Replaced? (PDF Page 4 - 5) ─── */}
      {/* BESPOKE WARNING RADAR: 5 Symptoms Checklist + Professional Reline Helper */}
      <section id="when-to-replace" className="py-16 sm:py-20 lg:py-24 bg-white relative overflow-hidden scroll-mt-28 border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="max-w-3xl mx-auto text-center space-y-4 mb-16"
          >
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-blue-50 border border-blue-200 text-brandBlue text-xs font-bold uppercase tracking-wider font-headline">
              <ShieldAlert className="w-3.5 h-3.5 text-brandSky" />
              <span>Warning Radar</span>
            </div>
            <h2
              style={{ lineHeight: 1.4 }}
              className="text-2xl sm:text-3xl lg:text-4xl font-extrabold font-headline text-slate-900 tracking-tight leading-[1.4]"
            >
              When Should Dentures Be{' '}
              <span className="bg-gradient-to-r from-brandBlue to-brandSky bg-clip-text text-transparent">
                Checked or Replaced?
              </span>
            </h2>
            <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
              The shape of the gums and jawbone changes over time, which may affect how dentures fit. A denture that once felt comfortable may gradually become loose or cause sore areas. Arrange a dental review if you notice:
            </p>
          </motion.div>

          {/* 5 Warning Signs + Clinical Action Card */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 max-w-6xl mx-auto">
            {REPLACEMENT_SIGNS.map((sign, idx) => (
              <motion.div
                key={sign.id}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.45, delay: idx * 0.08 }}
                className="bg-slate-50 rounded-3xl border border-slate-200/90 overflow-hidden shadow-sm hover:shadow-lg hover:border-brandSky/60 transition-all duration-300 flex flex-col group"
              >
                <div className="relative aspect-[16/10] w-full bg-slate-100 overflow-hidden">
                  <img
                    src={sign.img}
                    alt={sign.alt}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute top-3 left-3 bg-slate-900/85 backdrop-blur-md px-3 py-1 rounded-full text-[11px] font-bold text-amber-300 border border-amber-300/30">
                    {sign.trigger}
                  </div>
                </div>

                <div className="p-6 flex-1 flex flex-col justify-between space-y-3">
                  <div>
                    <h3 className="font-headline font-bold text-base text-slate-900 group-hover:text-brandBlue transition-colors mb-1.5">
                      {sign.title}
                    </h3>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      {sign.description}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}

            {/* Sixth Card: Clinical Action Card */}
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.45, delay: 0.4 }}
              className="bg-gradient-to-br from-[#071324] via-[#0E2752] to-[#071324] text-white rounded-3xl p-6 sm:p-7 flex flex-col justify-between border border-blue-500/30 shadow-lg"
            >
              <div className="space-y-3">
                <div className="w-10 h-10 rounded-xl bg-brandSky/20 flex items-center justify-center text-brandSky">
                  <RefreshCw className="w-5 h-5 text-brandSky" />
                </div>
                <h3 className="font-headline font-bold text-lg text-white">
                  Professional Adjustment, Relining or Replacement
                </h3>
                <p className="text-xs text-slate-300 leading-relaxed">
                  Depending on the condition, our dentist may recommend an adjustment, laboratory relining, repair or new replacement to protect your gums, remaining teeth and oral tissues.
                </p>
              </div>

              <div className="pt-4 border-t border-white/10">
                <button
                  onClick={handleBookClick}
                  className="w-full py-2.5 rounded-full bg-gradient-to-r from-brandSky to-brandBlue text-white text-xs font-bold font-headline hover:brightness-110 transition-all shadow-md cursor-pointer"
                >
                  Schedule Denture Review
                </button>
              </div>
            </motion.div>
          </div>

        </div>
      </section>

      {/* ─── Section 6: Regional Hospital Network ─── */}
      <section id="regional-centres" className="py-16 sm:py-20 bg-slate-50 relative overflow-hidden scroll-mt-28 border-b border-slate-200/80">
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
              <span>Direct Hospital Network</span>
            </div>
            <h2
              style={{ lineHeight: 1.4 }}
              className="text-2xl sm:text-3xl lg:text-4xl font-extrabold font-headline text-slate-900 tracking-tight leading-[1.4]"
            >
              Serving Patients Across Tamil Nadu &amp;{' '}
              <span className="bg-gradient-to-r from-brandBlue to-brandSky bg-clip-text text-transparent">
                South Kerala
              </span>
            </h2>
            <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
              Specialist denture assessments, precision CAD/CAM fittings, and follow-up adjustments are accessible across our regional centres:
            </p>
          </motion.div>

          {/* Regional Centres Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
            {[
              {
                title: 'Thuckalay (Hospital HQ)',
                role: 'Main Multispecialty Centre & Maxillofacial Hub',
                city: 'Kanyakumari District'
              },
              {
                title: 'Nagercoil Centre',
                role: 'Comprehensive Prosthodontic & Dental Wing',
                city: 'Nagercoil Town'
              },
              {
                title: 'Tirunelveli Centre',
                role: 'Regional Dental Prosthetics & Implant Centre',
                city: 'South Tamil Nadu'
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
            <div className="inline-block p-3.5 rounded-2xl bg-white border border-slate-200 text-xs text-slate-500">
              <strong className="text-slate-700">Hospital Branch Addresses:</strong> Complete clinic street addresses, Google Maps locations, and contact details are available in the footer section below.
            </div>
          </div>

        </div>
      </section>

      {/* ─── Section 7: Frequently Asked Questions (PDF Page 5 - 6) ─── */}
      <section id="faqs" className="py-16 sm:py-20 lg:py-24 bg-white relative overflow-hidden scroll-mt-28 border-b border-slate-100">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center space-y-4 mb-14"
          >
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-blue-50 border border-blue-200 text-brandBlue text-xs font-bold uppercase tracking-wider font-headline">
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
              Clear clinical guidance on denture comfort, types, cleaning protocols, and maintenance.
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
                      ? 'bg-slate-50 border border-brandSky/40 shadow-md ring-1 ring-brandSky/20'
                      : 'bg-slate-50 border border-slate-200/80 hover:border-brandSky/40 hover:shadow-sm'
                  }`}
                >
                  <button
                    onClick={() => setExpandedFaq(isExpanded ? null : i)}
                    className="w-full px-6 py-5 flex items-center justify-between text-left font-headline font-bold text-sm sm:text-base text-slate-900 hover:text-brandBlue transition-colors group cursor-pointer"
                  >
                    <span className="pr-4">{faq.q}</span>
                    <div
                      className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 transition-all duration-300 ${
                        isExpanded
                          ? 'bg-gradient-to-r from-brandBlue to-brandSky text-white rotate-180 shadow-sm'
                          : 'bg-slate-200 text-slate-600 group-hover:bg-brandBlue group-hover:text-white'
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
                        <div className="px-6 pb-6 pt-1 text-slate-600 text-xs sm:text-sm leading-relaxed border-t border-slate-200/60">
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
                Geriatric Dentistry
              </span>
            </h2>
            <p className="text-slate-600 text-sm leading-relaxed">
              Explore complementary tooth replacement and preventive senior dental solutions provided by our prosthodontic team across Tamil Nadu.
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
        badgeText="CHIEF SURGEON & SENIOR DENTAL DIRECTOR"
        titlePrefix="Restore Everyday Comfort with"
        highlightWord="Denture Care"
        titleSuffix="at Jerush"
        subtitle="Missing teeth should not prevent you from enjoying meals, speaking comfortably or feeling confident about your smile. With the right design, fitting and follow-up care, dentures can be an effective option for restoring your oral function. Arrange a consultation with our experienced prosthodontic team to discuss your options."
        primaryBtnText="Book Denture Consultation"
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
