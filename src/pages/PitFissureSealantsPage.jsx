import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ShieldCheck, Star, ChevronDown, Calendar, Phone, CheckCircle2,
  Clock, Award, Heart, Shield, Activity, Smile, Sparkles, ArrowRight,
  Info, Check, HelpCircle, AlertCircle, MapPin, ChevronRight,
  Baby, Sparkles as SparklesIcon, CheckCheck, Users, AlertTriangle,
  Lightbulb, HeartHandshake, Stethoscope, AlertOctagon, Timer,
  Pill, UtensilsCrossed, Waves, Eye, Compass, Layers, CheckSquare
} from 'lucide-react';
import PageBreadcrumbHero from '../components/common/PageBreadcrumbHero';
import TreatmentCtaBanner from '../components/common/TreatmentCtaBanner';
import TreatmentSectionNav from '../components/common/TreatmentSectionNav';
import TreatmentAppointmentForm from '../components/common/TreatmentAppointmentForm';
import useTreatmentScrollSpy from '../hooks/useTreatmentScrollSpy';

const STATS = [
  { value: '80% Cavity Drop', label: 'In Sealed Molar Grooves' },
  { value: '100% Painless', label: 'No Drilling or Injections' },
  { value: '10 - 15 Mins', label: 'Quick Single-Visit Care' },
  { value: '4 Regional Centres', label: 'Centres of Excellence' }
];

const TABS = [
  { id: 'overview', label: 'Overview' },
  { id: 'how-it-works', label: 'How They Work' },
  { id: 'candidates', label: 'Who Benefits' },
  { id: 'procedure', label: 'Application Steps' },
  { id: 'longevity', label: 'Longevity & Care' },
  { id: 'faqs', label: 'FAQs' }
];

// 3 How They Work Pillars from PDF with 16:9 Landscape Images
const HOW_SEALANTS_WORK = [
  {
    id: 'deep-grooves',
    title: 'Covering Deep Grooves',
    desc: 'Sealants flow smoothly into the microscopic pits and fissures on molars, thoroughly covering narrow areas where food particles and plaque easily accumulate.',
    image: '/images/medical-services/dental-care/kids-dentistry-pedodontics/pit-fissure-sealants/covering-deep-grooves.webp',
    alt: 'Pit and fissure sealants flowing into deep molar fissures to cover narrow grooves',
    tag: 'Fissure Flow',
    accentBorder: 'hover:border-blue-400/70',
    badgeColor: 'bg-blue-50 text-brandBlue border-brandBlue/20'
  },
  {
    id: 'protective-barrier',
    title: 'Creating a Protective Barrier',
    desc: 'Once applied and set with a curing light, the sealant forms an impermeable shield that prevents food debris and acid-producing bacteria from settling into the protected grooves.',
    image: '/images/medical-services/dental-care/kids-dentistry-pedodontics/pit-fissure-sealants/creating-protective-barrier.webp',
    alt: 'Creating a durable protective composite resin barrier over chewing surfaces',
    tag: 'Physical Barrier',
    accentBorder: 'hover:border-cyan-400/70',
    badgeColor: 'bg-cyan-50 text-cyan-700 border-cyan-200'
  },
  {
    id: 'reducing-risk',
    title: 'Reducing Cavity Risk',
    desc: 'Sealants defend highly vulnerable chewing surfaces from early enamel breakdown, particularly when combined with fluoride toothpaste, good brushing habits, and regular dental check-ups.',
    image: '/images/medical-services/dental-care/kids-dentistry-pedodontics/pit-fissure-sealants/reducing-cavity-risk.webp',
    alt: 'Significant reduction in child cavity risk with protective dental sealants',
    tag: 'Proven Protection',
    accentBorder: 'hover:border-sky-400/70',
    badgeColor: 'bg-sky-50 text-brandSky border-brandSky/20'
  }
];

// 4 Indications from PDF with 1:1 Square Images
const CANDIDATE_INDICATIONS = [
  {
    number: '01',
    title: 'Newly Erupted Permanent Molars',
    desc: 'First permanent molars erupt around age 6, and second molars around age 12. Sealing them early provides immediate defense before cavities can begin.',
    image: '/images/medical-services/dental-care/kids-dentistry-pedodontics/pit-fissure-sealants/newly-erupted-permanent-molars.webp',
    alt: 'Newly erupted permanent first and second molars in child mouth',
    tag: 'Eruption Milestone',
    clinicalFocus: '6-Yr & 12-Yr Molars',
    accentBorder: 'hover:border-blue-400/70',
    badgeColor: 'bg-blue-50 text-brandBlue border-brandBlue/20'
  },
  {
    number: '02',
    title: 'Deep Pits & Fissures',
    desc: 'Teeth with naturally deep, narrow anatomical fissures that toothbrush bristles cannot physically reach or keep clean benefit significantly from sealing.',
    image: '/images/medical-services/dental-care/kids-dentistry-pedodontics/pit-fissure-sealants/deep-pits-and-fissures.webp',
    alt: 'Deep anatomical pits and fissures on chewing surfaces of molars',
    tag: 'Complex Anatomy',
    clinicalFocus: 'Narrow Occlusal Grooves',
    accentBorder: 'hover:border-indigo-400/70',
    badgeColor: 'bg-indigo-50 text-indigo-700 border-indigo-200'
  },
  {
    number: '03',
    title: 'Experienced Cavities in Other Teeth',
    desc: 'Children who have had prior tooth decay or fillings in baby teeth demonstrate higher cavity risk, making preventive sealant protection essential.',
    image: '/images/medical-services/dental-care/kids-dentistry-pedodontics/pit-fissure-sealants/cavities-in-other-teeth.webp',
    alt: 'Children who have experienced cavities in other teeth needing sealant care',
    tag: 'High Cavity Risk',
    clinicalFocus: 'Proactive Enamel Defense',
    accentBorder: 'hover:border-rose-400/70',
    badgeColor: 'bg-rose-50 text-rose-700 border-rose-200'
  },
  {
    number: '04',
    title: 'Vulnerable Chewing Surfaces',
    desc: 'Children still refining their manual brushing dexterity need added protection over vulnerable chewing surfaces that take the brunt of mastication.',
    image: '/images/medical-services/dental-care/kids-dentistry-pedodontics/pit-fissure-sealants/additional-protection.webp',
    alt: 'Additional protection for vulnerable chewing surfaces in growing children',
    tag: 'Developing Skills',
    clinicalFocus: 'Chewing Surface Shield',
    accentBorder: 'hover:border-cyan-400/70',
    badgeColor: 'bg-cyan-50 text-cyan-700 border-cyan-200'
  }
];

// 5 Step Procedure from PDF with 1:1 Square Images
const PROCEDURE_STEPS = [
  {
    step: '01',
    name: 'Cleaning the Tooth',
    lead: 'The dentist cleans the chewing surface to remove plaque, debris, and surface pellicle.',
    details: 'The tooth is thoroughly cleansed using a gentle, rotating prophylactic polishing brush and medical pumice paste to make sure the deep fissures are 100% free of microscopic food debris and bacterial film before sealing.',
    image: '/images/medical-services/dental-care/kids-dentistry-pedodontics/pit-fissure-sealants/cleaning-tooth.webp',
    alt: 'Paediatric dentist cleaning tooth chewing surface prior to sealant application',
    keyPoints: [
      'Gentle mechanical cleansing with child-friendly polishing brush',
      'Removal of plaque, biofilm, and lodged food particles',
      'Tooth is rinsed and isolated with soft cotton rolls to keep it dry'
    ]
  },
  {
    step: '02',
    name: 'Preparing the Enamel',
    lead: 'A conditioning solution is applied according to the sealant system.',
    details: 'A mild, safe conditioning solution (etchant) is lightly applied over the grooves for a few seconds. This creates microscopic surface porosity that allows the sealant material to form a robust, long-lasting mechanical bond with enamel.',
    image: '/images/medical-services/dental-care/kids-dentistry-pedodontics/pit-fissure-sealants/prepare-the-enamel.webp',
    alt: 'Conditioning the tooth enamel with gentle preparation gel',
    keyPoints: [
      'Mild dental conditioner creates microscopic bonding micropores',
      'Fast, gentle, and completely painless application',
      'Surface is rinsed and air-dried until frosted and pristine'
    ]
  },
  {
    step: '03',
    name: 'Applying the Sealant',
    lead: 'The material is placed into the pits and fissures.',
    details: 'The flowable liquid dental resin is painted with a tiny precision applicator into each fissure. Due to its low viscosity, it flows effortlessly into the deepest crevices, displacing trapped air and sealing every micro-groove.',
    image: '/images/medical-services/dental-care/kids-dentistry-pedodontics/pit-fissure-sealants/applying-the-sealant.webp',
    alt: 'Applying flowable composite sealant material into molar pits and fissures',
    keyPoints: [
      'Flowable resin adapts precisely to anatomical micro-grooves',
      'Applied with ultra-fine precision tip with no drilling',
      'Forms a smooth, easily cleanable, glass-like protective layer'
    ]
  },
  {
    step: '04',
    name: 'Setting the Material',
    lead: 'Depending on the product, a curing light may be used to harden the sealant.',
    details: 'A safe, cool-spectrum blue LED curing light is held directly over the tooth for approximately 10 to 20 seconds. The light activates polymerization, instantly hardening the resin into an ultra-tough, durable enamel shield.',
    image: '/images/medical-services/dental-care/kids-dentistry-pedodontics/pit-fissure-sealants/setting-the-material.webp',
    alt: 'Setting and curing the sealant resin with safe blue LED curing light',
    keyPoints: [
      'Cool LED curing light polymerizes resin within seconds',
      'Safe, non-thermal light harmless to gums and pulp',
      'Instant hardening allows normal eating shortly after the visit'
    ]
  },
  {
    step: '05',
    name: 'Checking the Bite',
    lead: 'The dentist checks the coating and makes adjustments if necessary.',
    details: 'The dentist inspects the set sealant with a dental probe and checks the child\'s bite using articulation paper. If any tiny high spot exists, it is smoothed effortlessly so chewing feels completely natural and comfortable.',
    image: '/images/medical-services/dental-care/kids-dentistry-pedodontics/pit-fissure-sealants/checking-the-bite.webp',
    alt: 'Dentist checking child bite and smoothness of pit and fissure sealant coating',
    keyPoints: [
      'Clinical probe confirms complete fissure seal and retention',
      'Articulation check ensures proper bite and chewing alignment',
      'Child leaves with smooth, natural-feeling, protected teeth'
    ]
  }
];

// 7 FAQs from PDF
const FAQS = [
  {
    q: 'At what age can children receive pit and fissure sealants?',
    a: 'Sealants are often considered when the first permanent molars erupt, usually around six years of age, and again when the second permanent molars erupt, commonly around 12 years. Timing depends on tooth eruption patterns and the child\'s individual cavity risk. Selected baby molars with deep grooves can also be sealed earlier.'
  },
  {
    q: 'Are pit and fissure sealants safe?',
    a: 'Yes, dental sealants are widely recognized by global pediatric dental associations as safe and exceptionally effective for cavity prevention. The dentist selects a biocompatible, high-quality material and ensures it is well-suited to the child\'s teeth.'
  },
  {
    q: 'Does sealant application hurt?',
    a: 'No. The procedure is entirely painless and comfortable. It does not require any drilling, cutting, or local anesthetic injections. The tooth is simply cleaned, conditioned, painted with sealant resin, and set with a gentle blue light.'
  },
  {
    q: 'Can sealants be applied to baby teeth?',
    a: 'Yes. Selected primary (baby) molars may benefit significantly from sealants if they have exceptionally deep grooves, or if the child has an increased risk of cavities. Protecting baby molars preserves natural chewing and maintains proper spacing for permanent teeth.'
  },
  {
    q: 'Do sealants prevent every cavity?',
    a: 'No. Sealants specifically protect the vulnerable pits and fissures on the chewing (occlusal) surfaces of molars, where over 80% of children\'s cavities begin. They do not protect the smooth sides or in-between areas of teeth, so regular brushing, flossing, and dental check-ups remain essential.'
  },
  {
    q: 'Can a tooth with a cavity receive a sealant?',
    a: 'It depends on the condition and extent of the decay. If decay has already penetrated into the dentin, a sealant alone is not appropriate; restorative treatment (such as a composite filling) is required. The dentist conducts a thorough clinical examination before applying sealants.'
  },
  {
    q: 'How often should sealants be checked?',
    a: 'Sealants should be reviewed during routine dental check-ups every six months. If a sealant has become worn, chipped, or partly detached from heavy chewing, the dentist can easily touch it up or reapply it in minutes to maintain continuous protection.'
  }
];

// Related Treatments with uncropped clinical images (NOT icons!)
const RELATED_TREATMENTS = [
  {
    title: 'Pediatric Dental Care',
    desc: 'Comprehensive dental check-ups, brushing habits coaching, and preventive care tailored for infants to teens.',
    link: '/dental-care/kids-dentistry/pediatric-dental-care',
    image: '/images/medical-services/dental-care/kids-dentistry-pedodontics/pediatric-dental-care/preventive-dental-caring.webp',
    alt: 'Preventive pediatric dental caring and regular check-up guidance',
    badge: 'Foundation Care',
    badgeColor: 'bg-blue-50 text-brandBlue border-brandBlue/20',
    accentBorder: 'hover:border-blue-400/60'
  },
  {
    title: 'Pedo Extractions',
    desc: 'Gentle, pain-free tooth removal for severely decayed or non-shedding baby teeth with space preservation.',
    link: '/dental-care/kids-dentistry/pedo-extractions',
    image: '/images/medical-services/dental-care/kids-dentistry-pedodontics/pedo-extractions/Gentle-pediatric-tooth-extraction.webp',
    alt: 'Gentle paediatric tooth extraction at Jerush clinic',
    badge: 'Gentle Removal',
    badgeColor: 'bg-rose-50 text-rose-700 border-rose-200',
    accentBorder: 'hover:border-rose-400/60'
  },
  {
    title: 'Space Maintainers',
    desc: 'Custom pediatric spacers that hold room open for permanent teeth when a baby tooth is lost prematurely.',
    link: '/treatments/space-maintainers',
    image: '/images/medical-services/dental-care/kids-dentistry-pedodontics/space-maintainers/space-maintainer-overview.webp',
    alt: 'Pediatric space maintainer appliance holding space for permanent tooth',
    badge: 'Space Preservation',
    badgeColor: 'bg-cyan-50 text-cyan-700 border-cyan-500/20',
    accentBorder: 'hover:border-cyan-400/60'
  },
  {
    title: 'Pulpectomy & Pulpotomy',
    desc: 'Gentle nerve-preserving therapies designed to save severely decayed baby molars until natural shedding.',
    link: '/treatments/pulpectomy',
    image: '/images/medical-services/dental-care/kids-dentistry-pedodontics/pediatric-dental-care/treatment-for-cavities.webp',
    alt: 'Pediatric tooth restoration and pulp therapy for children',
    badge: 'Nerve Therapy',
    badgeColor: 'bg-amber-50 text-amber-700 border-amber-500/20',
    accentBorder: 'hover:border-amber-400/60'
  }
];

export default function PitFissureSealantsPage() {
  const navigate = useNavigate();
  const [expandedFaq, setExpandedFaq] = useState(null);
  const [activeStepIndex, setActiveStepIndex] = useState(0);

  const { activeSection, scrollToSection } = useTreatmentScrollSpy(
    TABS.map(tab => tab.id),
    138
  );

  useEffect(() => {
    // Canonical SEO Setup from PDF
    document.title = 'Pit & Fissure Sealants for Kids | Jerush Dental Care';

    let metaDesc = document.querySelector('meta[name="description"]');
    if (!metaDesc) {
      metaDesc = document.createElement('meta');
      metaDesc.name = 'description';
      document.head.appendChild(metaDesc);
    }
    metaDesc.content = 'Discover how pit and fissure sealants help protect children\'s molars from cavities. Learn about application, benefits, aftercare, and preventive dental care at Jerush.';

    let metaKeywords = document.querySelector('meta[name="keywords"]');
    if (!metaKeywords) {
      metaKeywords = document.createElement('meta');
      metaKeywords.name = 'keywords';
      document.head.appendChild(metaKeywords);
    }
    metaKeywords.content = 'Pit and fissure sealants, Dental sealants for children, molar cavity prevention, fissure sealant treatment, preventive pediatric dentistry, kids dental care';

    // Inject FAQ Schema
    const faqSchemaScript = document.createElement('script');
    faqSchemaScript.type = 'application/ld+json';
    faqSchemaScript.id = 'faq-schema-pit-fissure-sealants';
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
      const existingScript = document.getElementById('faq-schema-pit-fissure-sealants');
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
        title="Pit & Fissure Sealants"
        breadcrumbs={[
          { label: 'Dental Care', path: '/treatments' },
          { label: 'Kids Dentistry', path: '/treatments?category=dental&sub=Kids%20Dentistry%20%2F%20Pedodontics' },
          { label: 'Pit & Fissure Sealants', active: true }
        ]}
      />

      {/* ─── Hero Section (Clean Hero, No Unwanted Badges, 1.40 Line-Height Convention, Visible Uncropped Image) ─── */}
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
                  Pit & Fissure Sealants:{' '}
                  <span className="bg-gradient-to-r from-brandBlue to-brandSky bg-clip-text text-transparent">
                    Protecting the Grooves of Growing Teeth
                  </span>
                </h1>
                <p className="text-slate-600 text-base sm:text-lg leading-relaxed mt-4">
                  The chewing surfaces of molars contain tiny grooves and pits where food particles and plaque can collect. These narrow areas can be difficult to clean thoroughly, especially for children who are still developing their brushing skills.
                </p>
                <div className="mt-4 p-4.5 rounded-2xl bg-white/95 backdrop-blur-sm border border-slate-200/90 shadow-sm space-y-2">
                  <p className="text-slate-700 text-sm sm:text-base leading-relaxed">
                    Pit and fissure sealants are thin protective coatings applied to the grooves of back teeth to help prevent tooth decay. They create a barrier that makes these surfaces easier to keep clean and less vulnerable to cavities.
                  </p>
                  <p className="text-slate-600 text-xs sm:text-sm leading-relaxed pt-1 border-t border-slate-100">
                    At <strong className="text-slate-900 font-semibold">Jerush Dentofacial & Cosmetic Laser Centre</strong>, pit and fissure sealants may be recommended as part of a child's preventive dental care plan, depending on the condition of the teeth and the child's risk of developing cavities.
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
                  <span>100% Painless (No Injections or Drilling)</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Check className="w-4 h-4 text-brandBlue shrink-0" />
                  <span>Blocks 80%+ of Molar Cavities</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Check className="w-4 h-4 text-brandBlue shrink-0" />
                  <span>Fast 10-Minute Application</span>
                </div>
              </div>
            </motion.div>

            {/* Right Column: Hero Graphic - Clean Frame, No status dots, 16:9 Natural Ratio so Image is 100% visible */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.15 }}
              className="lg:col-span-5 relative"
            >
              <div className="absolute -inset-4 bg-gradient-to-tr from-brandSky/20 via-brandBlue/15 to-transparent rounded-3xl blur-2xl -z-10" />

              <div className="relative rounded-3xl overflow-hidden bg-white border border-slate-200/90 shadow-2xl p-2.5 sm:p-3 group">
                {/* 16:9 Aspect container matches native 1672x941 image perfectly without cropping! */}
                <div className="relative rounded-2xl overflow-hidden bg-slate-50 aspect-[16/10] sm:aspect-[16/9]">
                  <img
                    src="/images/medical-services/dental-care/kids-dentistry-pedodontics/pit-fissure-sealants/grooves-of-growing-teeth.webp"
                    alt="Dentist applying a protective pit and fissure sealant to a child's molar to help prevent tooth decay."
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
        treatmentName="Pit & Fissure Sealants"
        title="Book a Pediatric Sealant Consultation"
        highlightWord="For Your Child"
        subtitle="Shield your child's vulnerable molars before tooth decay begins. Schedule a gentle preventive evaluation at Jerush across Tamil Nadu."
        features={[
          {
            icon: ShieldCheck,
            title: '100% Pain-Free Protection',
            desc: 'Zero drilling, zero injections, and quick light-cured composite resin sealing.'
          },
          {
            icon: Sparkles,
            title: 'Primary & Permanent Molars',
            desc: 'Protects newly erupted 6-year and 12-year molars and deep primary chewing surfaces.'
          },
          {
            icon: Award,
            title: 'Specialist-Led Evaluation',
            desc: 'Careful clinical examination by dedicated pediatric dental surgeons before application.'
          },
          {
            icon: MapPin,
            title: '4 Regional Centres',
            desc: 'Direct specialist appointments available across Thuckalay, Trichy, Chennai, and Nagercoil.'
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

      {/* ─── SECTION 1: How Do Pit and Fissure Sealants Work? (id="how-it-works") ─── */}
      <section
        id="how-it-works"
        className="w-full py-16 lg:py-24 bg-gradient-to-b from-slate-50 via-sky-50/20 to-white relative scroll-mt-28 border-b border-slate-200/70 overflow-hidden"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Section Header */}
          <div className="max-w-3xl mb-12 text-left">
            <span className="text-xs font-bold text-brandBlue uppercase tracking-wider font-headline block mb-2.5">
              Preventive Mechanism
            </span>
            <h2
              style={{ lineHeight: 1.4 }}
              className="text-2xl sm:text-3xl lg:text-[36px] font-extrabold font-headline text-slate-900 tracking-tight leading-[1.4]"
            >
              How Do Pit and Fissure{' '}
              <span className="bg-gradient-to-r from-brandBlue to-brandSky bg-clip-text text-transparent">
                Sealants Work?
              </span>
            </h2>
            <p className="text-slate-600 text-sm sm:text-base leading-relaxed mt-3.5">
              Explore how sealants create a durable micro-barrier over narrow molar crevices to prevent bacterial colonies and decay from taking hold:
            </p>
          </div>

          {/* 3 Pillars Grid: Native 16:9 Landscape Images are 100% visible with Zero Cropping */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {HOW_SEALANTS_WORK.map((item, index) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className={`flex flex-col bg-white rounded-3xl overflow-hidden border border-slate-200/90 shadow-sm hover:shadow-xl transition-all duration-300 group ${item.accentBorder}`}
              >
                {/* 16:9 Image container matches native 1672x941 image perfectly! */}
                <div className="relative p-3 pb-0">
                  <div className="relative rounded-2xl overflow-hidden bg-slate-50 aspect-[16/10] sm:aspect-[16/9] border border-slate-100 shadow-inner">
                    <img
                      src={item.image}
                      alt={item.alt}
                      className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute top-3 left-3">
                      <span className={`inline-block px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider border backdrop-blur-md shadow-xs ${item.badgeColor}`}>
                        {item.tag}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6 flex flex-col flex-1 justify-between space-y-3">
                  <div>
                    <h3 className="font-headline font-bold text-lg text-slate-900 group-hover:text-brandBlue transition-colors">
                      {item.title}
                    </h3>
                    <p className="text-slate-600 text-xs sm:text-sm leading-relaxed mt-2.5">
                      {item.desc}
                    </p>
                  </div>
                  <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-brandBlue font-medium">
                    <span>Clinical Preventive Shield</span>
                    <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── SECTION 2: Which Children May Benefit? (id="candidates") ─── */}
      <section
        id="candidates"
        className="w-full py-16 lg:py-24 bg-white relative scroll-mt-28 border-b border-slate-200/70 overflow-hidden"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Section Header */}
          <div className="max-w-3xl mb-12 text-left">
            <span className="text-xs font-bold text-brandBlue uppercase tracking-wider font-headline block mb-2.5">
              Candidate Assessment
            </span>
            <h2
              style={{ lineHeight: 1.4 }}
              className="text-2xl sm:text-3xl lg:text-[36px] font-extrabold font-headline text-slate-900 tracking-tight leading-[1.4]"
            >
              Which Children May{' '}
              <span className="bg-gradient-to-r from-brandBlue to-brandSky bg-clip-text text-transparent">
                Benefit from Sealants?
              </span>
            </h2>
            <p className="text-slate-600 text-sm sm:text-base leading-relaxed mt-3.5">
              Pit and fissure sealants are commonly considered for children when their permanent molars erupt. They may also be suitable for selected baby teeth or other teeth with deep grooves, depending on the child's cavity risk. A dentist may recommend sealants for children who:
            </p>
          </div>

          {/* 4 Indications Grid: Pristine 1:1 Square Images with aspect-square ensures complete image is visible! */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {CANDIDATE_INDICATIONS.map((item, index) => (
              <motion.div
                key={item.number}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.08 }}
                className={`flex flex-col bg-slate-50/70 rounded-3xl overflow-hidden border border-slate-200/90 hover:shadow-xl hover:bg-white transition-all duration-300 group ${item.accentBorder}`}
              >
                {/* 1:1 Aspect-Square Image Container: Pristine Square Ratio with Zero Cropping */}
                <div className="relative p-3 pb-0">
                  <div className="relative rounded-2xl overflow-hidden bg-white aspect-square border border-slate-100 shadow-inner">
                    <img
                      src={item.image}
                      alt={item.alt}
                      className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute top-3 left-3">
                      <span className="px-2.5 py-1 rounded-lg bg-slate-900/80 backdrop-blur-md text-white font-headline font-bold text-xs">
                        {item.number}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Card Content */}
                <div className="p-5 sm:p-6 flex flex-col flex-1 justify-between space-y-3">
                  <div>
                    <span className={`inline-block px-2.5 py-0.5 rounded-full text-[11px] font-bold uppercase tracking-wider mb-2 border ${item.badgeColor}`}>
                      {item.tag}
                    </span>
                    <h3 className="font-headline font-bold text-base sm:text-lg text-slate-900 group-hover:text-brandBlue transition-colors">
                      {item.title}
                    </h3>
                    <p className="text-slate-600 text-xs sm:text-sm leading-relaxed mt-2">
                      {item.desc}
                    </p>
                  </div>

                  <div className="pt-2 border-t border-slate-200/80 flex items-center justify-between text-xs text-slate-500">
                    <span className="font-medium text-brandBlue">{item.clinicalFocus}</span>
                    <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Clinical Check Alert Callout Banner from PDF */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mt-10 p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-sky-50 via-blue-50/60 to-indigo-50/40 border border-brandSky/30 shadow-sm"
          >
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
              <div className="w-12 h-12 rounded-2xl bg-white text-brandBlue flex items-center justify-center shrink-0 shadow-sm border border-brandSky/30">
                <ShieldCheck className="w-6 h-6 text-brandBlue" />
              </div>
              <div className="space-y-1 flex-1">
                <h4 className="font-headline font-bold text-base sm:text-lg text-slate-900">
                  Pre-Treatment Clinical Examination
                </h4>
                <p className="text-slate-700 text-sm sm:text-base leading-relaxed">
                  <strong className="text-slate-900">The dentist will check the tooth first.</strong> If decay is already present, a sealant alone may not be enough; treatment depends on the extent of the damage. A diagnostic check-up ensures the right care is chosen.
                </p>
              </div>
              <button
                type="button"
                onClick={handleBookClick}
                className="shrink-0 px-5 py-2.5 rounded-full bg-brandBlue hover:bg-brandSky text-white text-xs font-headline font-bold uppercase tracking-wider transition-colors shadow-sm cursor-pointer"
              >
                Schedule Check-Up
              </button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ─── SECTION 3: What Happens During Sealant Application? (id="procedure") ─── */}
      <section
        id="procedure"
        className="w-full py-16 lg:py-24 bg-gradient-to-b from-slate-50 via-sky-50/20 to-white relative scroll-mt-28 border-b border-slate-200/70 overflow-hidden"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Section Header */}
          <div className="max-w-3xl mb-12 text-left">
            <span className="text-xs font-bold text-brandBlue uppercase tracking-wider font-headline block mb-2.5">
              Clinical Step-by-Step
            </span>
            <h2
              style={{ lineHeight: 1.4 }}
              className="text-2xl sm:text-3xl lg:text-[36px] font-extrabold font-headline text-slate-900 tracking-tight leading-[1.4]"
            >
              What Happens During{' '}
              <span className="bg-gradient-to-r from-brandBlue to-brandSky bg-clip-text text-transparent">
                Sealant Application?
              </span>
            </h2>
            <p className="text-slate-600 text-sm sm:text-base leading-relaxed mt-3.5">
              Pit and fissure sealant treatment is usually quick and does not require drilling when the tooth is suitable for preventive sealing. Follow our gentle 5-step procedure:
            </p>
          </div>

          {/* Interactive Step Showcase */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-stretch">
            {/* Step Selection List (Left Column) */}
            <div className="lg:col-span-5 flex flex-col justify-between space-y-3">
              {PROCEDURE_STEPS.map((step, idx) => {
                const isActive = activeStepIndex === idx;
                return (
                  <button
                    key={step.step}
                    type="button"
                    onClick={() => setActiveStepIndex(idx)}
                    className={`w-full p-4 sm:p-5 rounded-2xl text-left transition-all duration-300 flex items-start gap-4 border cursor-pointer ${isActive
                      ? 'bg-white border-brandSky/60 shadow-md ring-2 ring-brandSky/20'
                      : 'bg-white/70 border-slate-200/80 hover:bg-white hover:border-slate-300'
                      }`}
                  >
                    <div
                      className={`w-10 h-10 rounded-xl font-headline font-bold text-sm flex items-center justify-center shrink-0 transition-all ${isActive
                        ? 'bg-gradient-to-r from-brandBlue to-brandSky text-white shadow-sm'
                        : 'bg-slate-100 text-slate-600'
                        }`}
                    >
                      {step.step}
                    </div>
                    <div className="space-y-1">
                      <h3
                        className={`font-headline font-bold text-base transition-colors ${isActive ? 'text-brandBlue' : 'text-slate-900'
                          }`}
                      >
                        {step.name}
                      </h3>
                      <p className="text-slate-600 text-xs line-clamp-2 leading-relaxed">
                        {step.lead}
                      </p>
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Active Step Detailed Card with Uncropped 1:1 Square Image (Right Column) */}
            <div className="lg:col-span-7">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeStepIndex}
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -15 }}
                  transition={{ duration: 0.35 }}
                  className="h-full bg-white rounded-3xl border border-slate-200/90 shadow-xl p-6 sm:p-8 flex flex-col justify-between"
                >
                  <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
                    {/* Uncropped 1:1 Square Step Image */}
                    <div className="md:col-span-5">
                      <div className="relative rounded-2xl overflow-hidden bg-slate-50 border border-slate-100 shadow-md aspect-square">
                        <img
                          src={PROCEDURE_STEPS[activeStepIndex].image}
                          alt={PROCEDURE_STEPS[activeStepIndex].alt}
                          className="w-full h-full object-cover object-center"
                        />
                        <div className="absolute top-3 left-3">
                          <span className="px-2.5 py-1 rounded-lg bg-brandBlue text-white font-headline font-bold text-xs shadow-sm">
                            Step {PROCEDURE_STEPS[activeStepIndex].step} of 05
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Step Content */}
                    <div className="md:col-span-7 space-y-3">
                      <span className="text-xs font-bold text-brandSky uppercase tracking-wider font-headline">
                        Clinical Step {PROCEDURE_STEPS[activeStepIndex].step}
                      </span>
                      <h3 className="font-headline font-extrabold text-xl sm:text-2xl text-slate-900">
                        {PROCEDURE_STEPS[activeStepIndex].name}
                      </h3>
                      <p className="text-brandBlue font-medium text-xs sm:text-sm leading-relaxed">
                        {PROCEDURE_STEPS[activeStepIndex].lead}
                      </p>
                      <p className="text-slate-600 text-xs sm:text-sm leading-relaxed pt-1">
                        {PROCEDURE_STEPS[activeStepIndex].details}
                      </p>
                    </div>
                  </div>

                  {/* Key Highlights of this Step */}
                  <div className="mt-6 pt-5 border-t border-slate-100 space-y-2">
                    <p className="text-xs font-bold text-slate-900 uppercase tracking-wider font-headline">
                      Step Highlights:
                    </p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      {PROCEDURE_STEPS[activeStepIndex].keyPoints.map((point, pIdx) => (
                        <div key={pIdx} className="flex items-start gap-2 text-xs text-slate-700">
                          <Check className="w-3.5 h-3.5 text-brandBlue shrink-0 mt-0.5" />
                          <span>{point}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Navigation Arrows for Step Flow */}
                  <div className="mt-6 flex items-center justify-between pt-4 border-t border-slate-100 text-xs">
                    <button
                      type="button"
                      disabled={activeStepIndex === 0}
                      onClick={() => setActiveStepIndex(prev => Math.max(0, prev - 1))}
                      className="px-4 py-2 rounded-full border border-slate-200 text-slate-700 hover:bg-slate-50 disabled:opacity-40 disabled:cursor-not-allowed font-medium transition-colors"
                    >
                      ← Previous Step
                    </button>
                    <span className="text-slate-400 font-headline font-bold">
                      {activeStepIndex + 1} / {PROCEDURE_STEPS.length}
                    </span>
                    <button
                      type="button"
                      disabled={activeStepIndex === PROCEDURE_STEPS.length - 1}
                      onClick={() => setActiveStepIndex(prev => Math.min(PROCEDURE_STEPS.length - 1, prev + 1))}
                      className="px-4 py-2 rounded-full bg-brandBlue text-white hover:bg-brandSky disabled:opacity-40 disabled:cursor-not-allowed font-medium transition-colors"
                    >
                      Next Step →
                    </button>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>

          {/* Painless Reassurance Callout from PDF */}
          <div className="mt-10 p-5 rounded-2xl bg-white border border-slate-200/90 shadow-xs flex items-center gap-3.5">
            <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0 border border-emerald-200">
              <Smile className="w-5 h-5" />
            </div>
            <p className="text-slate-700 text-xs sm:text-sm leading-relaxed">
              <strong className="text-slate-900 font-semibold">100% Painless Experience:</strong> The procedure is generally painless and does not usually require injections. Children sit comfortably throughout, making it an ideal positive dental milestone.
            </p>
          </div>
        </div>
      </section>

      {/* ─── SECTION 4: How Long Do Sealants Last? (id="longevity") ─── */}
      <section
        id="longevity"
        className="w-full py-16 lg:py-24 bg-white relative scroll-mt-28 border-b border-slate-200/70 overflow-hidden"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Section Header */}
          <div className="max-w-3xl mb-12 text-left">
            <span className="text-xs font-bold text-brandBlue uppercase tracking-wider font-headline block mb-2.5">
              Durability & Maintenance
            </span>
            <h2
              style={{ lineHeight: 1.4 }}
              className="text-2xl sm:text-3xl lg:text-[36px] font-extrabold font-headline text-slate-900 tracking-tight leading-[1.4]"
            >
              How Long Do{' '}
              <span className="bg-gradient-to-r from-brandBlue to-brandSky bg-clip-text text-transparent">
                Sealants Last?
              </span>
            </h2>
            <p className="text-slate-600 text-sm sm:text-base leading-relaxed mt-3.5">
              Learn about sealant longevity, regular dental maintenance, and how parents can support long-lasting protection at home.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            {/* 16:9 Landscape Longevity Image: 100% visible with Zero Cropping */}
            <motion.div
              initial={{ opacity: 0, scale: 0.96 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="lg:col-span-5 relative"
            >
              <div className="relative rounded-3xl overflow-hidden bg-white border border-slate-200/90 shadow-xl p-2.5 sm:p-3 group">
                <div className="relative rounded-2xl overflow-hidden bg-slate-50 aspect-[16/10] sm:aspect-[16/9]">
                  <img
                    src="/images/medical-services/dental-care/kids-dentistry-pedodontics/pit-fissure-sealants/how-long-do-sealants-last.webp"
                    alt="Checking longevity and condition of dental sealants during routine pediatric check-up"
                    className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700"
                  />
                </div>
              </div>
              <div className="mt-3 text-center">
                <span className="text-xs text-slate-500 font-medium">
                  Routine 6-month check-ups ensure sealants remain fully intact and protective.
                </span>
              </div>
            </motion.div>

            {/* 3 Structured Educational Cards from PDF */}
            <div className="lg:col-span-7 space-y-4">
              <div className="p-5 sm:p-6 rounded-2xl bg-slate-50/80 border border-slate-200/80 hover:bg-white hover:border-brandSky/50 hover:shadow-md transition-all duration-300 space-y-2">
                <div className="flex items-center gap-2 text-brandBlue">
                  <Clock className="w-5 h-5 text-brandBlue shrink-0" />
                  <h3 className="font-headline font-bold text-base sm:text-lg text-slate-900">
                    Years of Continuous Protection
                  </h3>
                </div>
                <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">
                  Sealants can protect teeth for several years, but they may wear down or chip over time. During routine dental visits, the dentist checks whether the sealants remain intact and whether any repair or replacement is needed.
                </p>
              </div>

              <div className="p-5 sm:p-6 rounded-2xl bg-slate-50/80 border border-slate-200/80 hover:bg-white hover:border-brandSky/50 hover:shadow-md transition-all duration-300 space-y-2">
                <div className="flex items-center gap-2 text-brandBlue">
                  <Heart className="w-5 h-5 text-brandSky shrink-0" />
                  <h3 className="font-headline font-bold text-base sm:text-lg text-slate-900">
                    Parents' Role in Home Care
                  </h3>
                </div>
                <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">
                  Parents can help maintain the protection by encouraging twice-daily brushing with fluoride toothpaste, limiting frequent sugary snacks and drinks, and attending recommended dental check-ups.
                </p>
              </div>

              <div className="p-5 sm:p-6 rounded-2xl bg-amber-50/60 border border-amber-200/80 space-y-2">
                <div className="flex items-center gap-2 text-amber-800">
                  <Info className="w-5 h-5 text-amber-600 shrink-0" />
                  <h3 className="font-headline font-bold text-base sm:text-lg text-amber-950">
                    Comprehensive Hygiene Reminder
                  </h3>
                </div>
                <p className="text-amber-900 text-xs sm:text-sm leading-relaxed">
                  <strong className="text-amber-950">Remember:</strong> Sealants protect the treated grooves; they do not cover every surface of the tooth or eliminate the need for good oral hygiene. Daily brushing and flossing remain essential for full mouth health.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── SECTION 5: Related Kids Dentistry Treatments (Uncropped Images, No Icons!) ─── */}
      <section className="w-full py-16 lg:py-20 bg-gradient-to-b from-slate-50 via-sky-50/20 to-white relative border-b border-slate-200/70 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mb-12 text-left">
            <span className="text-xs font-bold text-brandBlue uppercase tracking-wider font-headline block mb-2.5">
              Comprehensive Pediatric Care
            </span>
            <h2
              style={{ lineHeight: 1.4 }}
              className="text-2xl sm:text-3xl lg:text-[36px] font-extrabold font-headline text-slate-900 tracking-tight leading-[1.4]"
            >
              Related{' '}
              <span className="bg-gradient-to-r from-brandBlue to-brandSky bg-clip-text text-transparent">
                Treatments & Services
              </span>
            </h2>
            <p className="text-slate-600 text-sm sm:text-base leading-relaxed mt-3.5">
              Explore complementary paediatric dental treatments available at Jerush to preserve, protect, and restore your child's developing smile.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {RELATED_TREATMENTS.map((item, idx) => (
              <Link
                key={idx}
                to={item.link}
                className={`flex flex-col bg-white rounded-3xl overflow-hidden border border-slate-200/90 ${item.accentBorder} hover:shadow-xl transition-all duration-300 group`}
              >
                {/* 1:1 Aspect-Square Image Container: Pristine Square Ratio with Zero Cropping */}
                <div className="relative p-3 pb-0">
                  <div className="relative rounded-2xl overflow-hidden bg-slate-50 aspect-square border border-slate-100 shadow-inner">
                    <img
                      src={item.image}
                      alt={item.alt}
                      className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute top-3 left-3">
                      <span className={`inline-block px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider border backdrop-blur-md shadow-xs ${item.badgeColor}`}>
                        {item.badge}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Card Content */}
                <div className="p-5 sm:p-6 flex flex-col flex-1 justify-between space-y-3">
                  <div>
                    <h3 className="font-headline font-bold text-base sm:text-lg text-slate-900 group-hover:text-brandBlue transition-colors">
                      {item.title}
                    </h3>
                    <p className="text-slate-600 text-xs sm:text-sm leading-relaxed mt-2">
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

      {/* ─── SECTION 6: Frequently Asked Questions (id="faqs") ─── */}
      <section id="faqs" className="w-full py-16 lg:py-24 bg-white relative scroll-mt-28 overflow-hidden">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mb-12 text-left">
            <span className="text-xs font-bold text-brandBlue uppercase tracking-wider font-headline block mb-2.5">
              Parent Guidance & Answers
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
              Find answers to common questions about pit and fissure sealant timing, safety, comfort, longevity, and hygiene maintenance.
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
                    : 'bg-slate-50/60 border border-slate-200/80 hover:border-brandSky/40 hover:shadow-md hover:bg-white'
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

      {/* ─── Bottom CTA Banner (Dr. R. Ivilin Cutout & User Rule Compliant Dark Navy Format) ─── */}
      <TreatmentCtaBanner
        badgeText="PREVENTIVE PEDIATRIC CARE"
        titlePrefix="Give Growing Teeth an"
        highlightWord="Extra Layer"
        titleSuffix="of Protection"
        subtitle="Pit and fissure sealants can be a useful preventive option for children whose molars are vulnerable to decay. At Jerush Dentofacial & Cosmetic Laser Centre, recommendations are tailored to each child's dental development and oral health needs."
        primaryBtnText="Book a Children's Dental Check-Up"
        onPrimaryClick={handleBookClick}
        secondaryBtnText="Call +91 94891 60000"
        secondaryBtnPhone="+919489160000"
        doctorImage="/images/doctors/ivilin2.webp"
        doctorName="DR. R. IVILIN"
        doctorRole="Dental Surgeon"
        doctorAlt="DR. R. IVILIN - Dental Surgeon at Jerush Dentofacial & Cosmetic Laser Centre"
      />
    </div>
  );
}
