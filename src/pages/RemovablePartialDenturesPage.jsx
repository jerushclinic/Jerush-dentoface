import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ShieldCheck, Star, ChevronDown, Calendar, Phone, CheckCircle2,
  Clock, Award, Heart, Shield, Activity, Smile, Sparkles, ArrowRight,
  Info, Globe, Plane, Check, HelpCircle, AlertCircle,
  UserCheck, Stethoscope, RefreshCw, Eye, ThumbsUp, Coffee, Layers,
  Utensils, MessageSquare, Volume2, Sparkles as SparklesIcon,
  ChevronRight, BookmarkCheck, HeartHandshake, MapPin
} from 'lucide-react';
import PageBreadcrumbHero from '../components/common/PageBreadcrumbHero';
import TreatmentCtaBanner from '../components/common/TreatmentCtaBanner';
import TreatmentSectionNav from '../components/common/TreatmentSectionNav';
import TreatmentAppointmentForm from '../components/common/TreatmentAppointmentForm';
import useTreatmentScrollSpy from '../hooks/useTreatmentScrollSpy';

const STATS = [
  { value: '188K+', label: 'Smiles Restored' },
  { value: '18+ Yrs', label: 'Prosthodontic Expertise' },
  { value: '4 Centres', label: 'Regional Hospital Network' },
  { value: '100%', label: 'Custom Shade & Fit Match' }
];

const TABS = [
  { id: 'overview', label: 'Overview' },
  { id: 'indications', label: 'When Recommended' },
  { id: 'benefits', label: 'Key Benefits' },
  { id: 'procedure', label: 'How They Are Made' },
  { id: 'care', label: 'Living With & Care' },
  { id: 'transformations', label: 'Before & After' },
  { id: 'advantage', label: 'Why Jerush' },
  { id: 'faqs', label: 'FAQs' }
];

const CANDIDATE_POINTS = [
  {
    title: 'Replacing One or More Missing Teeth',
    desc: 'Bridges gaps where one or multiple natural teeth have been lost due to decay, injury, or extraction.'
  },
  {
    title: 'Restoring Chewing Ability',
    desc: 'Redistributes bite forces across healthy abutment teeth and gums to make eating comfortable again.'
  },
  {
    title: 'Filling Visible Gaps in the Smile',
    desc: 'Restores aesthetic facial harmony, lip fullness, and smile confidence without sunken cheeks.'
  },
  {
    title: 'Supporting Clearer Speech',
    desc: 'Aids phonetics and tongue positioning for crisp articulation of letters and words.'
  },
  {
    title: 'Restoring a Complete Smile Appearance',
    desc: 'Custom-crafted teeth blend naturally with existing tooth contour, alignment, and translucency.'
  },
  {
    title: 'Non-Surgical Tooth Replacement Alternative',
    desc: 'Ideal for patients who may not be ready or medically suitable for dental implant surgery or fixed bridges.'
  }
];

const BENEFITS = [
  {
    title: 'Restores Missing Teeth',
    subtitle: 'Fills unwanted gaps in your smile',
    img: '/images/medical-services/dental-care/prosthodontic-care-tooth-replacement/removable-partial-dentures/restores-missing-teeth.webp',
    desc: 'Effectively replaces single or multiple missing teeth, preventing adjacent natural teeth from drifting or tilting into vacant spaces.',
    tag: 'Tooth Alignment',
    badgeColor: 'bg-blue-50 text-brandBlue border-brandBlue/20'
  },
  {
    title: 'Improves Chewing',
    subtitle: 'Makes it easier to enjoy a wider range of foods',
    img: '/images/medical-services/dental-care/prosthodontic-care-tooth-replacement/removable-partial-dentures/improves-chewing.webp',
    desc: 'Restores functional chewing surface area, distributing masticatory forces evenly and making everyday meals pleasant and nutritious.',
    tag: 'Functional Mastication',
    badgeColor: 'bg-cyan-50 text-cyan-700 border-cyan-500/20'
  },
  {
    title: 'Supports Speech',
    subtitle: 'Helps with speech clarity & phonetics',
    img: '/images/medical-services/dental-care/prosthodontic-care-tooth-replacement/removable-partial-dentures/supports-speech.webp',
    desc: 'Missing front or premolar teeth can cause speech lisping. A snug partial denture restores proper tongue placement for confident conversations.',
    tag: 'Clear Phonetics',
    badgeColor: 'bg-sky-50 text-brandSky border-brandSky/20'
  },
  {
    title: 'Removable Design',
    subtitle: 'Can be taken out for cleaning & maintenance',
    img: '/images/medical-services/dental-care/prosthodontic-care-tooth-replacement/removable-partial-dentures/removable-design.webp',
    desc: 'Enables effortless daily removal for thorough brushing, soaking, and inspection, ensuring superior gum health and oral hygiene.',
    tag: 'Easy Hygiene',
    badgeColor: 'bg-emerald-50 text-emerald-700 border-emerald-500/20'
  },
  {
    title: 'Natural-Looking Appearance',
    subtitle: 'Designed to blend with your existing teeth',
    img: '/images/medical-services/dental-care/prosthodontic-care-tooth-replacement/removable-partial-dentures/natural-looking-appearance.webp',
    desc: 'Engineered with shade-matched clinical resin and anatomical tooth moulds that harmonise seamlessly with your remaining natural teeth and gum tissue.',
    tag: 'Lifelike Aesthetics',
    badgeColor: 'bg-indigo-50 text-indigo-700 border-indigo-500/20'
  },
  {
    title: 'Cost-Effective Option',
    subtitle: 'Practical alternative when implants are unsuitable',
    img: '/images/medical-services/dental-care/prosthodontic-care-tooth-replacement/removable-partial-dentures/cost-effective-option.webp',
    desc: 'An accessible, non-surgical solution that delivers immediate functional and aesthetic restoration without requiring bone grafting or invasive surgeries.',
    tag: 'Accessible Care',
    badgeColor: 'bg-amber-50 text-amber-700 border-amber-500/20'
  }
];

const PROCEDURE_STEPS = [
  {
    step: '01',
    title: 'Consultation & Assessment',
    img: '/images/medical-services/dental-care/prosthodontic-care-tooth-replacement/removable-partial-dentures/consultation-assessment.webp',
    lead: 'We understand your concerns and evaluate your oral health.',
    details: 'Our specialist prosthodontist conducts a comprehensive clinical evaluation of your teeth, gums, and bite. We assess remaining healthy anchor teeth to ensure they can provide stable support for the clasps and framework.'
  },
  {
    step: '02',
    title: 'Dental Impressions or Digital Scans',
    img: '/images/medical-services/dental-care/prosthodontic-care-tooth-replacement/removable-partial-dentures/dental-impression.webp',
    lead: 'Used to create a denture that fits your mouth accurately.',
    details: 'High-precision dental impressions or digital intraoral 3D scans capture exact anatomical details of your dental arches, gum ridges, and bite relationships, forming the foundation for a custom prosthetic fit.'
  },
  {
    step: '03',
    title: 'Design & Fabrication',
    img: '/images/medical-services/dental-care/prosthodontic-care-tooth-replacement/removable-partial-dentures/design-fabrication.webp',
    lead: 'The denture is created to match your teeth, gums and smile.',
    details: 'In our dedicated dental prosthetics laboratory, skilled technicians craft the framework, position retention clasps, and set durable, shade-matched teeth within gum-toned biocompatible acrylic resin.'
  },
  {
    step: '04',
    title: 'Fitting & Adjustments',
    img: '/images/medical-services/dental-care/prosthodontic-care-tooth-replacement/removable-partial-dentures/fitting-adjustments.webp',
    lead: 'The fit and comfort are checked before you begin using it.',
    details: 'Your prosthodontist verifies the fit, retention, stability, and bite balance during your fitting session. Minor adjustments ensure zero pinch points, and our team guides you on how to insert, remove, and care for your appliance.'
  }
];

const CARE_TIPS = [
  {
    icon: RefreshCw,
    title: 'Remove & Clean as Advised',
    desc: 'Clean your denture after meals using a soft denture brush and mild, non-abrasive cleanser. Avoid using boiling water or harsh toothpastes that can scratch acrylic.'
  },
  {
    icon: Smile,
    title: 'Maintain Brushing & Gum Care',
    desc: 'Continue brushing and flossing your remaining natural teeth twice daily. Healthy anchor teeth and clean gums prevent plaque accumulation beneath clasps.'
  },
  {
    icon: ShieldCheck,
    title: 'Handle with Care',
    desc: 'Hold the denture securely over a basin filled with cool water or a soft folded towel while cleaning so it will not chip or bend if accidentally dropped.'
  },
  {
    icon: Coffee,
    title: 'Store Appropriately When Not Worn',
    desc: 'Dentures must remain moist to retain their shape. Soak your partial denture in clean water or an approved mild denture solution whenever it is removed for the night.'
  },
  {
    icon: Calendar,
    title: 'Attend Regular Check-ups',
    desc: 'Over time, natural jawbone and gum contours change. Routine dental visits allow your dentist to examine the fit and make precision relining or adjustments.'
  },
  {
    icon: AlertCircle,
    title: 'Inform Your Dentist if Loose or Damaged',
    desc: 'Never attempt to bend metal clasps or repair fractures yourself with household adhesives. Visit Jerush Dentofacial immediately for safe clinical recalibration.'
  }
];

const FAQS = [
  {
    q: 'Can a partial denture replace just one missing tooth?',
    a: 'Yes, a removable partial denture can be designed to replace one or more missing teeth, depending on the individual situation. Whether you are missing a single incisor or several teeth on either side of the arch, custom clasps secure the prosthetic tooth neatly in position.'
  },
  {
    q: 'Will my partial denture look natural?',
    a: 'Modern dentures can be designed to closely match the colour, shape and appearance of your natural teeth and gums. We select prosthetic teeth that match the shade, size, and translucency of your remaining dentition, ensuring your smile looks harmonious and natural.'
  },
  {
    q: 'Is it difficult to eat with a partial denture?',
    a: 'There may be an adjustment period when you first receive the denture. In the beginning, starting with softer foods cut into small bites and chewing slowly on both sides of the mouth helps your mouth adapt. Your dentist can guide you on how to gradually become comfortable while eating.'
  },
  {
    q: 'Can I sleep wearing my partial denture?',
    a: 'Your dentist will advise you on when to wear and remove your denture. In many cases, removing it as instructed allows the mouth and supporting tissues to rest, prevents gum irritation, and maintains optimal oral mucosal health.'
  },
  {
    q: 'How long does a removable partial denture last?',
    a: 'Its lifespan varies depending on the material, oral hygiene, everyday use and changes in your mouth. High-quality partial dentures typically last 5 to 7 years or longer. Regular dental reviews help maintain the fit and condition through professional cleanings and occasional relining.'
  },
  {
    q: 'What if my denture becomes loose?',
    a: 'A loose denture should be checked by your dentist. Gums and bone naturally undergo subtle changes over time. Avoid trying to modify it yourself, as an incorrect adjustment may bend the clasps or affect your bite and comfort. Our clinic can quickly readjust or reline it.'
  },
  {
    q: 'Are removable partial dentures better than dental implants?',
    a: 'They are different treatment options. The most suitable choice depends on your oral health, bone condition, number of missing teeth, preferences and overall treatment requirements. While dental implants provide a permanent, non-removable foundation, removable partial dentures offer a non-invasive, cost-effective, and versatile tooth-replacement option for suitable patients.'
  }
];

export default function RemovablePartialDenturesPage() {
  const navigate = useNavigate();
  const [expandedFaq, setExpandedFaq] = useState(null);
  const [activeStep, setActiveStep] = useState(0);

  const { activeSection, scrollToSection } = useTreatmentScrollSpy(
    TABS.map(tab => tab.id),
    138
  );

  useEffect(() => {
    document.title = 'Removable Partial Dentures | Tooth Replacement | Jerush Dentofacial';
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
    <div className="w-full bg-slate-50 font-body text-left relative min-h-screen text-slate-800">
      {/* ─── Breadcrumb Hero ─── */}
      <PageBreadcrumbHero
        title="Removable Partial Dentures"
        breadcrumbs={[
          { label: 'Dental Care', path: '/treatments' },
          { label: 'Prosthodontic Care', path: '/treatments?category=dental' },
          { label: 'Removable Partial Dentures', active: true }
        ]}
      />

      {/* ─── Hero Section (Above the Fold) ─── */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">

          {/* Left Column: Headline, Description & Quick Actions */}
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-7 space-y-5"
          >
            {/* Main Title & Headline */}
            <div>
              <span className="text-xs sm:text-sm font-bold text-brandBlue uppercase tracking-wider block font-headline mb-2.5">
                Jerush Dentofacial & Cosmetic Laser Centre
              </span>
              <h1
                style={{ lineHeight: 1.4 }}
                className="text-3xl sm:text-4xl lg:text-[38px] xl:text-[42px] font-extrabold font-headline tracking-tight leading-[1.4] text-slate-900"
              >
                Replacing Missing Teeth With a{' '}
                <span className="bg-gradient-to-r from-brandBlue to-brandSky bg-clip-text text-transparent">
                  Comfortable, Removable&nbsp;Solution
                </span>
              </h1>
              <p className="text-slate-600 text-base sm:text-lg leading-relaxed mt-4">
                Missing teeth can affect more than your smile. They can make chewing difficult, affect speech and leave noticeable gaps between your teeth.
              </p>
              <div className="mt-3.5 p-4 rounded-2xl bg-white/80 backdrop-blur-sm border border-slate-200/80 shadow-xs">
                <p className="text-slate-700 text-sm sm:text-base leading-relaxed">
                  <strong className="text-slate-900 font-semibold">Removable partial dentures</strong> are custom-made dental appliances designed to replace one or more missing teeth while using the remaining natural teeth for support. They can be removed for cleaning and are a practical tooth-replacement option for suitable patients.
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
                <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Supervised by Specialist Prosthodontists</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Digital Scans & Accurate Tooth Matching</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Non-Invasive & Cost-Effective</span>
              </div>
            </div>
          </motion.div>

          {/* Right Column: Hero Graphic - Dental Model */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.15 }}
            className="lg:col-span-5 relative"
          >
            {/* Ambient Lighting Gradients */}
            <div className="absolute -inset-4 bg-gradient-to-tr from-brandSky/20 via-brandBlue/15 to-transparent rounded-3xl blur-2xl -z-10" />

            <div className="relative rounded-3xl overflow-hidden bg-white border border-slate-200/90 shadow-2xl p-2.5 sm:p-3 group">
              {/* Dental Model Landscape Image - Clean Frame */}
              <div className="relative rounded-2xl overflow-hidden bg-slate-50 aspect-[16/10]">
                <img
                  src="/images/medical-services/dental-care/prosthodontic-care-tooth-replacement/removable-partial-dentures/removable-partial-denture-dental-model.webp"
                  alt="Removable partial denture on dental model - Jerush Dentofacial"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ─── Top Appointment Consultation Section (Section Template) ─── */}
      <TreatmentAppointmentForm
        treatmentName="Removable Partial Dentures"
        title="Book a Removable Partial Dentures Consultation"
        highlightWord="Near You"
        subtitle="Get personalised advice from Jerush Dentofacial & Cosmetic Laser Centre's leading prosthodontic specialists across Tamil Nadu."
        features={[
          {
            icon: Smile,
            title: 'Custom Precision Fit',
            desc: 'Shade-matched teeth and anatomical moulds aligned to your natural gum contours.'
          },
          {
            icon: Award,
            title: 'Specialist Prosthodontists',
            desc: 'Clinical consultations supervised by experienced prosthodontic specialists and dental surgeons.'
          },
          {
            icon: Layers,
            title: 'In-House Prosthetics Lab',
            desc: 'Fast turnaround times with dedicated CAD/CAM acrylic and metal-framework fabrication.'
          },
          {
            icon: MapPin,
            title: '3 Regional Centres',
            desc: 'Direct clinical consultations available in Thuckalay, Trichy, and Chennai.'
          }
        ]}
      />

      {/* ─── Key Stats Bar ─── */}
      <section className="bg-gradient-to-r from-brandBlue to-[#1b4393] py-10 sm:py-12 px-4 sm:px-6 text-white shadow-inner relative overflow-hidden">
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
              <p className="text-white/80 text-xs sm:text-sm font-semibold uppercase tracking-wider mt-1">
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

      {/* ─── Section 1: Overview & What Are Partial Dentures ─── */}
      <section id="overview" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 scroll-mt-28">
        <div className="bg-white rounded-3xl p-6 sm:p-10 lg:p-12 border border-slate-200/80 shadow-sm relative overflow-hidden">
          <div className="max-w-3xl mb-10">
            <span className="text-xs font-bold text-brandBlue uppercase tracking-wider font-headline block mb-2.5">
              Treatment Understanding
            </span>
            <h2
              style={{ lineHeight: 1.4 }}
              className="text-2xl sm:text-3xl lg:text-[36px] font-extrabold font-headline text-slate-900 tracking-tight leading-[1.4]"
            >
              Understanding{' '}
              <span className="bg-gradient-to-r from-brandBlue to-brandSky bg-clip-text text-transparent">
                Removable Partial Dentures
              </span>
            </h2>
            <p className="text-slate-600 text-sm sm:text-base leading-relaxed mt-3.5">
              When one or several teeth are lost, the surrounding teeth can gradually shift, bite alignment becomes unbalanced, and facial muscle support can lessen. A removable partial denture is a custom-engineered dental prosthetic that fills empty spaces without altering or filing down your remaining healthy teeth.
            </p>
          </div>

          {/* 3 Component Highlights */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-10">
            <div className="p-6 rounded-2xl bg-gradient-to-br from-blue-50/60 to-slate-50 border border-blue-100/80 hover:shadow-md transition-shadow">
              <div className="w-10 h-10 rounded-xl bg-brandBlue text-white flex items-center justify-center mb-4">
                <Layers className="w-5 h-5" />
              </div>
              <h3 className="font-headline font-bold text-slate-900 text-base mb-2">
                1. Biocompatible Base
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                A custom-moulded gum-coloured acrylic plate or thin cast-metal framework designed to rest smoothly and comfortably over the gum ridge.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-gradient-to-br from-cyan-50/60 to-slate-50 border border-cyan-100/80 hover:shadow-md transition-shadow">
              <div className="w-10 h-10 rounded-xl bg-cyan-600 text-white flex items-center justify-center mb-4">
                <Smile className="w-5 h-5" />
              </div>
              <h3 className="font-headline font-bold text-slate-900 text-base mb-2">
                2. Shade-Matched Teeth
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                High-grade prosthetic teeth matched to your natural dental colour, anatomy and size so your smile appears seamless and lifelike.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-gradient-to-br from-indigo-50/60 to-slate-50 border border-indigo-100/80 hover:shadow-md transition-shadow">
              <div className="w-10 h-10 rounded-xl bg-indigo-600 text-white flex items-center justify-center mb-4">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <h3 className="font-headline font-bold text-slate-900 text-base mb-2">
                3. Precision Retention Clasps
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                Discreet metal or flexible aesthetic clasps that gently grasp adjacent natural teeth for steady retention while speaking and chewing.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ─── Section 2: When Are Removable Partial Dentures Recommended? ─── */}
      <section id="indications" className="bg-slate-100/80 py-16 lg:py-20 border-y border-slate-200/60 scroll-mt-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">

            {/* Left: Content & Bullet Points from PDF */}
            <div className="lg:col-span-7">
              <div className="mb-6">
                <span className="text-xs font-bold text-brandBlue uppercase tracking-wider font-headline block mb-2.5">
                  Candidate Evaluation
                </span>
                <h2
                  style={{ lineHeight: 1.4 }}
                  className="text-2xl sm:text-3xl lg:text-[36px] font-extrabold font-headline text-slate-900 tracking-tight leading-[1.4]"
                >
                  When Are Removable Partial Dentures{' '}
                  <span className="bg-gradient-to-r from-brandBlue to-brandSky bg-clip-text text-transparent">
                    Recommended?
                  </span>
                </h2>
                <p className="text-slate-700 text-base sm:text-lg leading-relaxed font-medium mt-3.5">
                  A removable partial denture may be considered when you have several missing teeth but still have healthy natural teeth that can provide support.
                </p>
                <p className="text-slate-600 text-sm sm:text-base leading-relaxed mt-2">
                  They are clinically recommended for:
                </p>
              </div>

              {/* 6 Suitability Points */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {CANDIDATE_POINTS.map((item, index) => (
                  <div
                    key={index}
                    className="p-4 rounded-2xl bg-white border border-slate-200 shadow-sm flex items-start gap-3 hover:border-brandSky/40 transition-colors"
                  >
                    <div className="w-6 h-6 rounded-full bg-brandSky/15 text-brandBlue flex items-center justify-center shrink-0 mt-0.5">
                      <Check className="w-3.5 h-3.5 stroke-[2.5]" />
                    </div>
                    <div>
                      <h3 className="font-headline font-bold text-slate-900 text-xs sm:text-sm">
                        {item.title}
                      </h3>
                      <p className="text-slate-600 text-xs mt-1 leading-relaxed">
                        {item.desc}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

            </div>

            {/* Right: Accompanying Image from PDF */}
            <div className="lg:col-span-5 relative">
              <div className="rounded-3xl overflow-hidden bg-white border border-slate-200 shadow-xl p-3 sm:p-4 group">
                <div className="relative rounded-2xl overflow-hidden bg-slate-50">
                  <img
                    src="/images/medical-services/dental-care/prosthodontic-care-tooth-replacement/removable-partial-dentures/what-are-removable-partial-dentures.webp"
                    alt="When are removable partial dentures recommended - Jerush Dentofacial"
                    className="w-full h-[360px] sm:h-[420px] object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-transparent pointer-events-none" />

                  <div className="absolute bottom-4 left-4 right-4 text-white">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-brandSky bg-slate-900/80 px-2.5 py-1 rounded-md inline-block mb-1">
                      Individual Assessment
                    </span>
                    <p className="text-xs sm:text-sm font-bold font-headline leading-tight">
                      Custom-crafted according to your unique arch anatomy and gum contours.
                    </p>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ─── Section 3: What Are the Key Benefits? ─── */}
      <section id="benefits" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-20 scroll-mt-28">
        <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-12">
          <span className="text-xs font-bold text-brandBlue uppercase tracking-wider font-headline block mb-2.5">
            Clinical Advantages
          </span>
          <h2
            style={{ lineHeight: 1.4 }}
            className="text-2xl sm:text-3xl lg:text-[36px] font-extrabold font-headline text-slate-900 tracking-tight leading-[1.4]"
          >
            What Are the{' '}
            <span className="bg-gradient-to-r from-brandBlue to-brandSky bg-clip-text text-transparent">
              Key Benefits?
            </span>
          </h2>
          <p className="text-slate-600 text-sm sm:text-base leading-relaxed mt-3.5">
            A well-designed partial denture can help restore both function and appearance.
          </p>
        </div>

        {/* 6 Benefits Grid with Exact Images from PDF */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {BENEFITS.map((benefit, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.08 }}
              className="bg-white rounded-3xl overflow-hidden border border-slate-200/80 shadow-sm hover:shadow-xl hover:border-brandSky/40 transition-all duration-300 flex flex-col group"
            >
              {/* Image Container */}
              <div className="relative h-52 sm:h-56 overflow-hidden bg-slate-100">
                <img
                  src={benefit.img}
                  alt={`${benefit.title} - Removable Partial Dentures`}
                  className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-500"
                />
                <div className="absolute top-3 right-3">
                  <span className={`text-[11px] font-bold px-3 py-1 rounded-full border backdrop-blur-md shadow-sm ${benefit.badgeColor}`}>
                    {benefit.tag}
                  </span>
                </div>
              </div>

              {/* Card Body */}
              <div className="p-6 flex-1 flex flex-col justify-between space-y-3 text-left">
                <div>
                  <h3 className="font-headline font-black text-lg text-slate-900 group-hover:text-brandBlue transition-colors">
                    {benefit.title}
                  </h3>
                  <p className="text-xs font-semibold text-brandSky mt-0.5">
                    {benefit.subtitle}
                  </p>
                  <p className="text-slate-600 text-xs sm:text-sm leading-relaxed mt-2.5">
                    {benefit.desc}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Summary Note from PDF */}
        <div className="mt-10 max-w-3xl mx-auto p-4 sm:p-5 rounded-2xl bg-slate-100 border border-slate-200 text-center">
          <p className="text-xs sm:text-sm text-slate-700 italic font-medium">
            "The right design depends on the number and location of missing teeth and the condition of the remaining teeth."
          </p>
        </div>
      </section>

      {/* ─── Section 4: How Are Removable Partial Dentures Made? ─── */}
      <section id="procedure" className="bg-slate-900 text-white py-16 lg:py-20 relative overflow-hidden scroll-mt-28">
        {/* Ambient Glows */}
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-brandSky/10 rounded-full blur-[140px] pointer-events-none" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-brandBlue/15 rounded-full blur-[140px] pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-14">
            <span className="text-xs font-bold text-brandSky uppercase tracking-widest font-headline block mb-2.5">
              The Clinical Pathway
            </span>
            <h2
              style={{ lineHeight: 1.4 }}
              className="text-2xl sm:text-3xl lg:text-[36px] font-extrabold font-headline text-white tracking-tight leading-[1.4]"
            >
              How Are Removable Partial Dentures{' '}
              <span className="bg-gradient-to-r from-brandSky via-sky-300 to-white bg-clip-text text-transparent">
                Made?
              </span>
            </h2>
            <p className="text-slate-300 text-sm sm:text-base leading-relaxed mt-3.5">
              At <strong className="text-white">Jerush Dentofacial & Cosmetic Laser Centre</strong>, treatment begins with a detailed examination of your teeth, gums and bite. Depending on your needs, the process includes four structured clinical stages:
            </p>
          </div>

          {/* 4 Steps Grid with Exact Images from PDF */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {PROCEDURE_STEPS.map((step, index) => (
              <div
                key={index}
                className="rounded-3xl bg-slate-800/80 border border-white/10 overflow-hidden flex flex-col hover:border-brandSky/50 hover:bg-slate-800 transition-all duration-300 group"
              >
                {/* Step Image Presentation - 100% visible without clipping */}
                <div className="relative pt-6 pb-3 px-4 flex items-center justify-center bg-gradient-to-b from-slate-950/90 to-slate-900/40 border-b border-white/10 overflow-hidden">
                  <div className="absolute w-36 h-36 rounded-full bg-brandSky/15 blur-2xl pointer-events-none group-hover:bg-brandSky/30 transition-all duration-500" />

                  <div className="relative w-44 h-44 sm:w-48 sm:h-48 flex items-center justify-center group-hover:scale-105 transition-transform duration-500">
                    <img
                      src={step.img}
                      alt={`${step.title} - Jerush Dentofacial`}
                      className="w-full h-full object-contain filter drop-shadow-[0_10px_25px_rgba(0,0,0,0.6)]"
                    />
                  </div>

                  <div className="absolute top-3 left-3 bg-slate-900/90 backdrop-blur-md px-3 py-1 rounded-full border border-brandSky/30 shadow-md">
                    <span className="font-headline font-black text-xs text-brandSky tracking-wider">
                      STEP {step.step}
                    </span>
                  </div>
                </div>

                {/* Step Content */}
                <div className="p-5 flex-1 flex flex-col justify-between text-left space-y-3">
                  <div>
                    <h3 className="font-headline font-bold text-base text-white group-hover:text-brandSky transition-colors">
                      {step.title}
                    </h3>
                    <p className="text-xs text-slate-300 font-semibold mt-1">
                      {step.lead}
                    </p>
                    <p className="text-xs text-slate-400 leading-relaxed mt-2">
                      {step.details}
                    </p>
                  </div>

                  <div className="pt-3 border-t border-white/10 flex items-center justify-between text-[11px] text-slate-400">
                    <span>Clinical Stage {index + 1} of 4</span>
                    <CheckCircle2 className="w-3.5 h-3.5 text-brandSky" />
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Post-Fitting Explanatory Banner from PDF */}
          <div className="mt-10 p-5 rounded-2xl bg-white/5 border border-white/10 max-w-3xl mx-auto text-center backdrop-blur-sm">
            <p className="text-xs sm:text-sm text-slate-300 font-medium leading-relaxed">
              <strong className="text-brandSky font-semibold">Doctor Guidance:</strong> Your dentist will also explain how to insert, remove and care for your new denture, ensuring you feel completely confident from day one.
            </p>
          </div>
        </div>
      </section>

      {/* ─── Section 5: Living With & Caring for Your Denture ─── */}
      <section id="care" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-20 scroll-mt-28">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">

          {/* Left: Care Guide Image from PDF */}
          <div className="lg:col-span-5 order-2 lg:order-1 relative">
            <div className="rounded-3xl overflow-hidden bg-white border border-slate-200 shadow-xl p-3 sm:p-4 group">
              <div className="relative rounded-2xl overflow-hidden bg-slate-50">
                <img
                  src="/images/medical-services/dental-care/prosthodontic-care-tooth-replacement/removable-partial-dentures/living-with-care.webp"
                  alt="Living with and caring for your removable partial denture - Jerush Dentofacial"
                  className="w-full h-[360px] sm:h-[440px] object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/75 via-transparent to-transparent pointer-events-none" />

                <div className="absolute bottom-4 left-4 right-4 text-white">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-brandSky bg-slate-900/80 px-2.5 py-1 rounded-md inline-block mb-1">
                    Daily Maintenance
                  </span>
                  <p className="text-xs sm:text-sm font-bold font-headline leading-tight">
                    Gentle hygiene and proper nighttime storage ensure long-lasting comfort.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Right: Text & Recommendations from PDF */}
          <div className="lg:col-span-7 order-1 lg:order-2">
            <div className="mb-6">
              <span className="text-xs font-bold text-brandBlue uppercase tracking-wider font-headline block mb-2.5">
                Patient Comfort & Adaptation
              </span>
              <h2
                style={{ lineHeight: 1.4 }}
                className="text-2xl sm:text-3xl lg:text-[36px] font-extrabold font-headline text-slate-900 tracking-tight leading-[1.4]"
              >
                Living With & Caring for{' '}
                <span className="bg-gradient-to-r from-brandBlue to-brandSky bg-clip-text text-transparent">
                  Your Denture
                </span>
              </h2>
              <p className="text-slate-600 text-sm sm:text-base leading-relaxed mt-3.5">
                It can take a little time to become comfortable with a new removable partial denture. With regular use and proper care, most patients gradually adapt to it.
              </p>
              <h3 className="text-sm sm:text-base font-bold text-slate-800 font-headline mt-4">
                To keep your denture comfortable:
              </h3>
            </div>

            {/* 6 Guidelines Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {CARE_TIPS.map((tip, idx) => {
                const IconComponent = tip.icon;
                return (
                  <div
                    key={idx}
                    className="p-4 rounded-2xl bg-white border border-slate-200/90 shadow-sm flex items-start gap-3.5 hover:border-brandSky/40 transition-colors"
                  >
                    <div className="w-8 h-8 rounded-xl bg-brandSky/10 text-brandBlue flex items-center justify-center shrink-0 mt-0.5">
                      <IconComponent className="w-4 h-4" />
                    </div>
                    <div>
                      <h4 className="font-headline font-bold text-xs sm:text-sm text-slate-900">
                        {tip.title}
                      </h4>
                      <p className="text-slate-600 text-xs leading-relaxed mt-1">
                        {tip.desc}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

        </div>
      </section>

      {/* ─── Section 6: Before & After Section (Showcase Section from PDF) ─── */}
      <section id="transformations" className="bg-slate-100 py-16 lg:py-20 border-y border-slate-200/70 scroll-mt-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-12">
            <span className="text-xs font-bold text-brandBlue uppercase tracking-wider font-headline block mb-2.5">
              Clinical Case Showcase
            </span>
            <h2
              style={{ lineHeight: 1.4 }}
              className="text-2xl sm:text-3xl lg:text-[36px] font-extrabold font-headline text-slate-900 tracking-tight leading-[1.4]"
            >
              Before & After{' '}
              <span className="bg-gradient-to-r from-brandBlue to-brandSky bg-clip-text text-transparent">
                Clinical Outcomes
              </span>
            </h2>
            <p className="text-slate-600 text-sm sm:text-base leading-relaxed mt-3.5">
              See how custom removable partial dentures restore dental symmetry, chewing capability, and aesthetic lip support.
            </p>
          </div>

          {/* Interactive Card with Disclaimer as requested in PDF */}
          <div className="max-w-4xl mx-auto bg-white rounded-3xl p-6 sm:p-10 border border-slate-200 shadow-sm relative overflow-hidden">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">

              {/* Graphic Comparison Card */}
              <div className="relative rounded-2xl bg-gradient-to-br from-slate-900 to-slate-800 text-white p-6 overflow-hidden min-h-[260px] flex flex-col justify-between">
                <div className="space-y-2">
                  <span className="text-[10px] font-bold tracking-wider uppercase bg-brandSky/20 text-brandSky px-2.5 py-1 rounded-full border border-brandSky/30">
                    Clinical Archive
                  </span>
                  <h3 className="text-lg font-headline font-bold text-white">
                    Patient Restoration Gallery
                  </h3>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    High-resolution intraoral documentation demonstrating functional gap closure, clasp placement, and gum ridge adaptation.
                  </p>
                </div>

                <div className="pt-4 border-t border-white/10 flex items-center justify-between">
                  <span className="text-[11px] text-slate-400">Jerush Prosthodontic Wing</span>
                  <div className="flex items-center gap-1 text-xs text-brandSky font-semibold">
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>Archive Active</span>
                  </div>
                </div>
              </div>

              {/* Exact Disclaimer and Note from PDF Page 4 */}
              <div className="space-y-4 text-left">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-50 text-amber-800 border border-amber-200 text-xs font-bold">
                  <Info className="w-3.5 h-3.5 text-amber-600 shrink-0" />
                  <span>Clinical Disclaimer</span>
                </div>

                <h3 className="text-base sm:text-lg font-bold font-headline text-slate-900">
                  Individual Treatment Variations
                </h3>

                {/* Verbatim PDF Note */}
                <p className="text-slate-700 text-sm sm:text-base leading-relaxed italic bg-slate-50 p-4 rounded-xl border border-slate-200 font-medium">
                  "The appearance, fit and treatment outcome vary according to each patient's oral condition and denture design."
                </p>

                <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">
                  During your initial diagnostic consultation, our prosthodontists present relevant pre- and post-treatment case photographs tailored to your exact pattern of missing teeth.
                </p>

                <button
                  type="button"
                  onClick={handleBookClick}
                  className="inline-flex items-center gap-2 text-xs font-bold text-brandBlue hover:text-brandSky uppercase tracking-wider group pt-1"
                >
                  <span>Schedule Consultation to View Clinical Cases</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </button>
              </div>

            </div>
          </div>
        </div>
      </section>

      {/* ─── Section 7: Why Choose Jerush Dentofacial & Global Patient Care ─── */}
      <section id="advantage" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-20 scroll-mt-28">
        <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-12">
          <span className="text-xs font-bold text-brandBlue uppercase tracking-wider font-headline block mb-2.5">
            Excellence & Global Reach
          </span>
          <h2
            style={{ lineHeight: 1.4 }}
            className="text-2xl sm:text-3xl lg:text-[36px] font-extrabold font-headline text-slate-900 tracking-tight leading-[1.4]"
          >
            Why Choose Jerush for{' '}
            <span className="bg-gradient-to-r from-brandBlue to-brandSky bg-clip-text text-transparent">
              Prosthodontic Care?
            </span>
          </h2>
          <p className="text-slate-600 text-sm sm:text-base leading-relaxed mt-3.5">
            With 27+ years of legacy in dental and maxillofacial care, Jerush Dentofacial provides world-class prosthodontic treatments across Tamil Nadu and for international patients.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">

          {/* Card 1: Specialist Prosthodontic Excellence */}
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-sm flex flex-col justify-between space-y-4 hover:shadow-lg hover:border-brandSky/40 transition-all">
            <div className="space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-brandBlue/10 text-brandBlue flex items-center justify-center">
                <Award className="w-6 h-6" />
              </div>
              <h3 className="font-headline font-black text-slate-900 text-lg">
                Prosthodontic & Restorative Excellence
              </h3>
              <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">
                Our tooth-replacement procedures follow strict evidence-based clinical protocols, utilizing advanced dental impressions and digital bite registrations for optimal fit, comfort, and longevity.
              </p>
            </div>
            <div className="pt-3 border-t border-slate-100 text-xs text-brandBlue font-semibold flex items-center gap-1.5">
              <Check className="w-4 h-4 text-emerald-500" />
              <span>Evidence-Based Clinical Protocols</span>
            </div>
          </div>

          {/* Card 2: 4 Regional Centres */}
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-sm flex flex-col justify-between space-y-4 hover:shadow-lg hover:border-brandSky/40 transition-all">
            <div className="space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-cyan-600/10 text-cyan-700 flex items-center justify-center">
                <MapPin className="w-6 h-6" />
              </div>
              <h3 className="font-headline font-black text-slate-900 text-lg">
                4 Regional Centres in Tamil Nadu
              </h3>
              <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">
                Seamless patient care across our state-of-the-art facilities in <strong>Thuckalay–Kanyakumari</strong>, <strong>Trichy</strong>, <strong>Chennai</strong>, and <strong>Nagercoil</strong> with unified clinical standards.
              </p>
            </div>
            <div className="pt-3 border-t border-slate-100 text-xs text-brandBlue font-semibold flex items-center gap-1.5">
              <Check className="w-4 h-4 text-emerald-500" />
              <span>Full-Arch In-House Lab Facilities</span>
            </div>
          </div>

          {/* Card 3: International Patients */}
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-sm flex flex-col justify-between space-y-4 hover:shadow-lg hover:border-brandSky/40 transition-all">
            <div className="space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-indigo-600/10 text-indigo-700 flex items-center justify-center">
                <Globe className="w-6 h-6" />
              </div>
              <h3 className="font-headline font-black text-slate-900 text-lg">
                Global Patient Coordination
              </h3>
              <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">
                Serving patients from <strong>Dubai, UAE</strong>, the <strong>United Kingdom</strong>, and <strong>Australia</strong> with priority appointment scheduling, digital pre-consultations, and express turnaround times.
              </p>
            </div>
            <div className="pt-3 border-t border-slate-100 text-xs text-brandBlue font-semibold flex items-center gap-1.5">
              <Check className="w-4 h-4 text-emerald-500" />
              <span>Dedicated International Patient Desk</span>
            </div>
          </div>

        </div>
      </section>

      {/* ─── Section 8: Frequently Asked Questions ─── */}
      <section id="faqs" className="bg-slate-100/70 py-16 lg:py-20 border-t border-slate-200/70 scroll-mt-28">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10 sm:mb-12">
            <span className="text-xs font-bold text-brandBlue uppercase tracking-wider font-headline block mb-2.5">
              Patient Guidance & Answers
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
              Find answers to the most common queries regarding removable partial dentures, daily maintenance, and clinical outcomes.
            </p>
          </div>

          <div className="space-y-3.5">
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
                    className="w-full px-6 py-5 flex items-center justify-between text-left font-headline font-black text-sm sm:text-base text-slate-900 hover:text-brandBlue transition-colors group cursor-pointer"
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

      {/* ─── Bottom CTA Banner (Dr. Sherine Ponraj & Dark Navy Format) ─── */}
      <TreatmentCtaBanner
        badgeText="PROSTHODONTIC SPECIALIST"
        titlePrefix="Replace Missing Teeth With"
        highlightWord="Confidence"
        titleSuffix=""
        subtitle="If missing teeth are affecting the way you eat, speak or smile, a removable partial denture may offer a practical way to restore your everyday comfort. At Jerush Dentofacial & Cosmetic Laser Centre, our prosthodontic team provides personalised tooth-replacement solutions for patients in Thuckalay–Kanyakumari, Trichy and Chennai. For patients seeking care outside India, Jerush also serves an international patient community through its Dubai, UK and Australia presence."
        primaryBtnText="Book a Consultation"
        onPrimaryClick={handleBookClick}
        secondaryBtnText="Call +91 94891 60000"
        secondaryBtnPhone="+919489160000"
        doctorImage="/images/doctors/sherine2.webp"
        doctorName="DR. SHERINE PONRAJ"
        doctorRole="Prosthodontist (BDS, MDS)"
        doctorAlt="DR. SHERINE PONRAJ - Specialist Prosthodontist at Jerush Dentofacial"
      />
    </div>
  );
}
