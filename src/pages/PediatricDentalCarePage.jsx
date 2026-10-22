import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ShieldCheck, Star, ChevronDown, Calendar, Phone, CheckCircle2,
  Clock, Award, Heart, Shield, Activity, Smile, Sparkles, ArrowRight,
  Info, Check, HelpCircle, AlertCircle, MapPin, ChevronRight,
  Baby, Sparkles as SparklesIcon, CheckCheck, Users, AlertTriangle,
  Lightbulb, HeartHandshake, Stethoscope
} from 'lucide-react';
import PageBreadcrumbHero from '../components/common/PageBreadcrumbHero';
import TreatmentCtaBanner from '../components/common/TreatmentCtaBanner';
import TreatmentSectionNav from '../components/common/TreatmentSectionNav';
import TreatmentAppointmentForm from '../components/common/TreatmentAppointmentForm';
import useTreatmentScrollSpy from '../hooks/useTreatmentScrollSpy';

const STATS = [
  { value: '188K+', label: 'Smiles Restored' },
  { value: '100% Gentle', label: 'Child-Centered Care' },
  { value: '0 - 16 Yrs', label: 'Infant to Teen Care' },
  { value: '4 Regional Centres', label: 'Centres of Excellence' }
];

const TABS = [
  { id: 'overview', label: 'Overview' },
  { id: 'included-services', label: 'What It Includes' },
  { id: 'why-early-visits', label: 'Why Early Visits Matter' },
  { id: 'visit-journey', label: 'During the Visit' },
  { id: 'home-care-tips', label: 'Home Care & Habits' },
  { id: 'related-treatments', label: 'Related Care' },
  { id: 'faqs', label: 'FAQs' }
];

const INCLUDED_SERVICES = [
  {
    title: 'Preventive Dental Care',
    desc: 'Regular check-ups, brushing guidance, dietary advice and fluoride treatment when appropriate help reduce the risk of tooth decay.',
    img: '/images/medical-services/dental-care/kids-dentistry-pedodontics/pediatric-dental-care/preventive-dental-caring.webp',
    alt: 'Preventive pediatric dental caring and regular check-up guidance',
    tag: 'Prevention First',
    badgeColor: 'bg-blue-50 text-brandBlue border-brandBlue/20',
    accentBorder: 'hover:border-blue-400/60'
  },
  {
    title: 'Treatment for Cavities',
    desc: 'Tooth-coloured fillings and other suitable treatments can restore teeth affected by decay and help preserve their function.',
    img: '/images/medical-services/dental-care/kids-dentistry-pedodontics/pediatric-dental-care/treatment-for-cavities.webp',
    alt: 'Pediatric treatment for cavities with tooth-coloured restorations',
    tag: 'Tooth Preservation',
    badgeColor: 'bg-cyan-50 text-cyan-700 border-cyan-500/20',
    accentBorder: 'hover:border-cyan-400/60'
  },
  {
    title: 'Cavity Prevention',
    desc: 'Fluoride applications and dental sealants may be recommended to protect teeth, depending on the child\'s age and risk of tooth decay.',
    img: '/images/medical-services/dental-care/kids-dentistry-pedodontics/pediatric-dental-care/cavity-prevention.webp',
    alt: 'Cavity prevention fluoride applications and sealants for children',
    tag: 'Fluoride & Sealants',
    badgeColor: 'bg-sky-50 text-brandSky border-brandSky/20',
    accentBorder: 'hover:border-brandSky/60'
  },
  {
    title: 'Monitoring Dental Development',
    desc: 'Regular visits help track the eruption of permanent teeth, identify bite concerns, and recognise issues that may need early attention.',
    img: '/images/medical-services/dental-care/kids-dentistry-pedodontics/pediatric-dental-care/monitoring-dental-development.webp',
    alt: 'Monitoring children dental development and tooth eruption patterns',
    tag: 'Growth Tracking',
    badgeColor: 'bg-emerald-50 text-emerald-700 border-emerald-500/20',
    accentBorder: 'hover:border-emerald-400/60'
  }
];

const VISIT_STEPS = [
  {
    step: '01',
    title: 'Getting Comfortable',
    lead: 'The dental team explains the visit in simple, reassuring language.',
    desc: 'We start by creating a warm, playful, and non-threatening atmosphere. Our friendly dental team introduces instruments with gentle demonstrations, making sure your child feels secure, respected, and completely comfortable in the dental chair.',
    img: '/images/medical-services/dental-care/kids-dentistry-pedodontics/pediatric-dental-care/getting-comfortable.webp',
    alt: 'Child getting comfortable with friendly dental team in clinic'
  },
  {
    step: '02',
    title: 'Checking the Teeth and Gums',
    lead: 'The dentist looks for tooth decay, gum concerns and developmental changes.',
    desc: 'Using child-sized mirrors and gentle inspection techniques, our pediatric dental team carefully assesses enamel integrity, gum health, soft tissues, and tooth eruption sequences to detect early micro-cavities before discomfort arises.',
    img: '/images/medical-services/dental-care/kids-dentistry-pedodontics/pediatric-dental-care/checking-teeth-gums.webp',
    alt: 'Dentist gently checking teeth and gums of young child'
  },
  {
    step: '03',
    title: 'Discussing the Findings',
    lead: 'Parents receive an explanation of the child\'s oral health and any recommended treatment.',
    desc: 'We partner closely with parents, providing honest, transparent feedback on oral hygiene, plaque patterns, and bite development. You receive clear explanations with no pressure, answering all questions in simple, everyday language.',
    img: '/images/medical-services/dental-care/kids-dentistry-pedodontics/pediatric-dental-care/discussing-the-findings.webp',
    alt: 'Pediatric dentist discussing dental findings with parent'
  },
  {
    step: '04',
    title: 'Planning the Next Steps',
    lead: 'The dentist suggests preventive care, treatment, or follow-up visits as needed.',
    desc: 'Together we establish a stress-free care plan. This may include scheduling a preventive fluoride varnish, sealants, gentle cavity restoration, or simply setting an enjoyable 6-month check-up interval to keep their smile sparkling.',
    img: '/images/medical-services/dental-care/kids-dentistry-pedodontics/pediatric-dental-care/planning-next-steps.webp',
    alt: 'Planning preventive dental care and next steps for child'
  }
];

const HOME_HABITS = [
  {
    number: '01',
    title: 'Twice-Daily Brushing',
    desc: 'Brush twice daily using an age-appropriate toothbrush and fluoride toothpaste in the recommended amount (grain of rice for under 3, pea-sized for 3+).'
  },
  {
    number: '02',
    title: 'Supervised Brushing',
    desc: 'Help or supervise brushing until the child can clean all tooth surfaces effectively, typically until 7 or 8 years of age.'
  },
  {
    number: '03',
    title: 'Limit Sugary Snacks & Drinks',
    desc: 'Limit frequent sugary snacks and sweetened drinks between meals to prevent prolonged acid exposure on enamel.'
  },
  {
    number: '04',
    title: 'Encourage Water Between Meals',
    desc: 'Encourage plain water between meals to naturally rinse away lingering food debris and maintain natural saliva flow.'
  },
  {
    number: '05',
    title: 'Protect Infant Teeth at Bedtime',
    desc: 'Avoid putting a baby to sleep with a bottle containing milk or sugary drinks, preventing bottle caries and enamel erosion.'
  },
  {
    number: '06',
    title: 'Regular Dental Check-Ups',
    desc: 'Arrange regular dental check-ups based on the dentist\'s advice to celebrate healthy milestones and reinforce positive habits.'
  }
];

const WHEN_TO_VISIT_SYMPTOMS = [
  'Tooth pain, throbbing or sudden sensitivity to warm or cold foods',
  'Visible brown or chalky-white spots or visible cavities on teeth',
  'Gum redness, tenderness, bleeding or localized swelling',
  'Difficulty chewing, eating on one side, or avoiding favorite foods',
  'Accidental dental injury, chipped enamel, or loosened tooth from play',
  'Prolonged thumb-sucking, mouth breathing, or pacifier dependency'
];

const FAQS = [
  {
    q: 'At what age should my child first visit a dentist?',
    a: 'A child\'s first dental visit is generally recommended by the first birthday or within six months after the first tooth appears. Early visits help children become familiar with the dental environment and allow the dentist to check early oral development.'
  },
  {
    q: 'Do baby teeth really need treatment?',
    a: 'Yes. Untreated decay in baby teeth can cause pain, infection, and difficulty eating. Treatment depends on the tooth\'s condition and how soon it is expected to fall out. Primary teeth also act as natural placeholders for permanent teeth.'
  },
  {
    q: 'How often should children visit the dentist?',
    a: 'Many children benefit from check-ups every six months, but the ideal interval depends on their cavity risk and individual oral health needs. Regular visits ensure early detection and reinforce positive brushing routines.'
  },
  {
    q: 'Are dental X-rays safe for children?',
    a: 'Dental X-rays are used when needed for diagnosis or treatment planning. The dental team selects appropriate images and minimises unnecessary radiation exposure using modern ultra-low-dose digital sensors and protective aprons.'
  },
  {
    q: 'What should I do if my child is afraid of the dentist?',
    a: 'Explain the visit positively, avoid frightening language (such as "it won\'t hurt" or "needles"), and let the dental team know about your child\'s concerns. A gradual, reassuring approach with "tell-show-do" demonstrations helps build lifelong confidence.'
  },
  {
    q: 'How can I prevent cavities in my child\'s teeth?',
    a: 'Regular brushing with fluoride toothpaste, limiting sugary foods and drinks, professional check-ups, and preventive treatments like topical fluoride varnish and dental sealants when recommended all help significantly reduce the risk of decay.'
  },
  {
    q: 'When should I take my child to the dentist urgently?',
    a: 'Seek prompt dental care for severe toothache, facial or gum swelling, dental trauma, or signs of infection. Facial swelling with fever or difficulty swallowing or breathing requires urgent medical attention.'
  }
];

const RELATED_TREATMENTS = [
  {
    title: 'Pit & Fissure Sealants',
    desc: 'Protective resin coatings applied to deep chewing grooves of permanent molars to block food and plaque bacteria.',
    link: '/treatments/pit-fissure-sealants',
    icon: Sparkles
  },
  {
    title: 'Pulpectomy (Child Root Canal)',
    desc: 'Gentle, pain-free nerve therapy designed to preserve severely decayed baby molars until natural exfoliation.',
    link: '/treatments/pulpectomy',
    icon: ShieldCheck
  },
  {
    title: 'Habit Breaking Appliances',
    desc: 'Custom pediatric appliances to gently eliminate thumb-sucking, tongue-thrusting, and prevent malocclusion.',
    link: '/treatments/habit-breaking-appliances',
    icon: Smile
  },
  {
    title: 'Space Maintainers',
    desc: 'Precision spacers that keep room open for permanent teeth when a baby tooth is lost prematurely.',
    link: '/treatments/space-maintainers',
    icon: Heart
  }
];

export default function PediatricDentalCarePage() {
  const navigate = useNavigate();
  const [expandedFaq, setExpandedFaq] = useState(null);
  const [activeStep, setActiveStep] = useState(0);

  const { activeSection, scrollToSection } = useTreatmentScrollSpy(
    TABS.map(tab => tab.id),
    138
  );

  useEffect(() => {
    // Canonical SEO Setup from PDF
    document.title = 'Pediatric Dental Care for Children | Jerush';

    let metaDesc = document.querySelector('meta[name="description"]');
    if (!metaDesc) {
      metaDesc = document.createElement('meta');
      metaDesc.name = 'description';
      document.head.appendChild(metaDesc);
    }
    metaDesc.content = "Explore pediatric dental care at Jerush, including children's dental check-ups, cavity prevention, fillings, oral hygiene guidance and monitoring growing smiles.";

    let metaKeywords = document.querySelector('meta[name="keywords"]');
    if (!metaKeywords) {
      metaKeywords = document.createElement('meta');
      metaKeywords.name = 'keywords';
      document.head.appendChild(metaKeywords);
    }
    metaKeywords.content = "Pediatric dental care, kids dentist, children's dentistry, pedodontics, baby teeth care, child dental check-up, cavity prevention for children";

    // Inject FAQ Schema
    const faqSchemaScript = document.createElement('script');
    faqSchemaScript.type = 'application/ld+json';
    faqSchemaScript.id = 'faq-schema-pediatric';
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
      const existingScript = document.getElementById('faq-schema-pediatric');
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
        title="Pediatric Dental Care"
        breadcrumbs={[
          { label: 'Dental Care', path: '/treatments' },
          { label: 'Kids Dentistry', path: '/treatments?category=dental&sub=Kids%20Dentistry%20%2F%20Pedodontics' },
          { label: 'Pediatric Dental Care', active: true }
        ]}
      />

      {/* ─── Hero Section (Airy Soft-Glow Canvas, No Unwanted Badges, 1.40 Line-Height Convention) ─── */}
      <section className="w-full bg-gradient-to-b from-white via-sky-50/25 to-slate-50/60 py-12 lg:py-18 relative overflow-hidden border-b border-slate-200/70">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">

            {/* Left Column: Clinic Branding, Headline & Content */}
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
                  Gentle, Child-Friendly{' '}
                  <span className="bg-gradient-to-r from-brandBlue to-brandSky bg-clip-text text-transparent">
                    Pediatric Dental Care
                  </span>
                </h1>
                <p className="text-slate-600 text-base sm:text-lg leading-relaxed mt-4">
                  Children need dental care that supports healthy teeth, comfortable eating, clear speech, and proper oral development. Pediatric dental care focuses on protecting children's teeth and gums from infancy through adolescence, while helping them build positive dental habits for life.
                </p>
                <div className="mt-4 p-4.5 rounded-2xl bg-white/95 backdrop-blur-sm border border-slate-200/90 shadow-sm">
                  <p className="text-slate-700 text-sm sm:text-base leading-relaxed">
                    At <strong className="text-slate-900 font-semibold">Jerush Dentofacial & Cosmetic Laser Centre</strong>, pediatric dental care focuses on each child's age, dental development and individual needs. A calm, child-friendly approach can help children feel more comfortable during dental visits and make oral care a familiar part of their routine.
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
                  <span>Child-Friendly & Fear-Free Environment</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>Focus on Early Prevention & Comfort</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>Tailored for Growing Smiles</span>
                </div>
              </div>
            </motion.div>

            {/* Right Column: Hero Graphic - Clean Frame, No status dots or header strips */}
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
                    src="/images/medical-services/dental-care/kids-dentistry-pedodontics/pediatric-dental-care/pediatric-dental.webp"
                    alt="Pediatric dentist gently examining a child's teeth during a routine dental check-up."
                    className="w-full h-full object-contain sm:object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ─── Top Appointment Consultation Section ─── */}
      <TreatmentAppointmentForm
        treatmentName="Pediatric Dental Care"
        title="Book a Pediatric Dental Consultation"
        highlightWord="For Your Child"
        subtitle="Give your child the gift of a confident, healthy smile. Consult with Jerush Dentofacial & Cosmetic Laser Centre's caring dental specialists across Tamil Nadu."
        features={[
          {
            icon: Smile,
            title: 'Child-Centered Comfort',
            desc: 'Gentle, reassuring language and relaxed pacing designed specifically for young patients.'
          },
          {
            icon: Award,
            title: 'Pediatric Dental Specialists',
            desc: 'Experienced dental surgeons and pediatric clinicians focused on growing teeth and jaw development.'
          },
          {
            icon: ShieldCheck,
            title: 'Early Prevention Focus',
            desc: 'Fluoride varnish, painless sealants, and gentle guidance to prevent tooth decay before it starts.'
          },
          {
            icon: MapPin,
            title: '4 Regional Centres',
            desc: 'Direct clinical appointments available across Thuckalay, Trichy, Chennai, and regional hubs.'
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

      {/* ─── SECTION 1: Clinical Overview (id="overview") ─── */}
      <section
        id="overview"
        className="w-full py-16 lg:py-20 bg-gradient-to-b from-slate-50 via-sky-50/20 to-white relative scroll-mt-28 border-b border-slate-200/70 overflow-hidden"
      >
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-brandSky/5 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-brandBlue/5 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-3xl mb-12">
            <span className="text-xs font-bold text-brandBlue uppercase tracking-wider font-headline block mb-2.5">
              Clinical Overview
            </span>
            <h2
              style={{ lineHeight: 1.4 }}
              className="text-2xl sm:text-3xl lg:text-[36px] font-extrabold font-headline text-slate-900 tracking-tight leading-[1.4]"
            >
              Understanding{' '}
              <span className="bg-gradient-to-r from-brandBlue to-brandSky bg-clip-text text-transparent">
                Pediatric Dental Care
              </span>
            </h2>
            <p className="text-slate-600 text-base sm:text-lg leading-relaxed mt-3.5">
              Children need dental care that supports healthy teeth, comfortable eating, clear speech, and proper oral development. Pediatric dental care focuses on protecting children's teeth and gums from infancy through adolescence, while helping them build positive dental habits for life.
            </p>
            <p className="text-slate-600 text-sm sm:text-base leading-relaxed mt-2.5">
              At Jerush Dentofacial &amp; Cosmetic Laser Centre, pediatric dental care focuses on each child's age, dental development, and individual needs. A calm, child-friendly approach helps children feel more comfortable during dental visits and makes oral care a familiar, stress-free part of their everyday routine.
            </p>
          </div>

          {/* 4 Core Clinical Pillars */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="p-6 rounded-3xl bg-white border border-slate-200/90 shadow-sm hover:shadow-md hover:border-brandSky/50 transition-all group">
              <div className="w-12 h-12 rounded-2xl bg-blue-50 text-brandBlue flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <Baby className="w-6 h-6" />
              </div>
              <h3 className="font-headline font-bold text-slate-900 text-lg mb-2 group-hover:text-brandBlue transition-colors">
                From Infancy to Teens
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                Tailored care for each milestone, guiding children gently from their very first baby tooth eruption through secondary school and adolescence.
              </p>
            </div>

            <div className="p-6 rounded-3xl bg-white border border-slate-200/90 shadow-sm hover:shadow-md hover:border-cyan-400/50 transition-all group">
              <div className="w-12 h-12 rounded-2xl bg-cyan-50 text-cyan-700 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <h3 className="font-headline font-bold text-slate-900 text-lg mb-2 group-hover:text-cyan-700 transition-colors">
                Baby Tooth Preservation
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                Baby teeth aren't just temporary; they hold critical space for adult teeth, assist speech clarity, and enable comfortable, nutritious chewing.
              </p>
            </div>

            <div className="p-6 rounded-3xl bg-white border border-slate-200/90 shadow-sm hover:shadow-md hover:border-emerald-400/50 transition-all group">
              <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-700 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <Smile className="w-6 h-6" />
              </div>
              <h3 className="font-headline font-bold text-slate-900 text-lg mb-2 group-hover:text-emerald-700 transition-colors">
                Fear-Free Positive Visits
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                Our gentle "tell-show-do" approach and calm, patient-led pacing replace fear and anxiety with cheerful confidence and proud smiles.
              </p>
            </div>

            <div className="p-6 rounded-3xl bg-white border border-slate-200/90 shadow-sm hover:shadow-md hover:border-indigo-400/50 transition-all group">
              <div className="w-12 h-12 rounded-2xl bg-indigo-50 text-indigo-700 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <Sparkles className="w-6 h-6" />
              </div>
              <h3 className="font-headline font-bold text-slate-900 text-lg mb-2 group-hover:text-indigo-700 transition-colors">
                Early Cavity Prevention
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                Proactive enamel mineralisation, painless protective sealants, and personalised parent brushing advice protect teeth before decay begins.
              </p>
            </div>
          </div>

          {/* Quick Informational Highlight Banner */}
          <div className="mt-8 p-5 sm:p-6 rounded-3xl bg-white/90 backdrop-blur-sm border border-brandSky/30 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex items-start gap-3.5">
              <div className="w-9 h-9 rounded-xl bg-brandSky/10 text-brandBlue flex items-center justify-center shrink-0 mt-0.5">
                <Info className="w-5 h-5 text-brandSky" />
              </div>
              <div>
                <h4 className="font-headline font-bold text-sm sm:text-base text-slate-900">
                  Did You Know? Primary Enamel is Thinner Than Adult Enamel
                </h4>
                <p className="text-xs sm:text-sm text-slate-600 mt-1 leading-relaxed">
                  Because primary tooth enamel is only half as thick as adult enamel, minor cavities can advance rapidly. Early check-ups detect enamel changes long before tooth pain develops.
                </p>
              </div>
            </div>
            <button
              type="button"
              onClick={() => scrollToSection('included-services')}
              className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-full bg-slate-100 hover:bg-brandBlue text-slate-700 hover:text-white font-headline text-xs font-bold transition-all shrink-0 cursor-pointer self-start sm:self-center"
            >
              <span>Explore Services</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </section>

      {/* ─── SECTION 2: What Does Pediatric Dental Care Include? (Pure Crisp Canvas with Subtle Sky Glow) ─── */}
      <section id="included-services" className="w-full py-16 lg:py-24 bg-white relative scroll-mt-28 border-b border-slate-200/70 overflow-hidden">
        {/* Soft background glow accents */}
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-brandSky/5 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-brandBlue/5 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-3xl mb-12">
            <span className="text-xs font-bold text-brandBlue uppercase tracking-wider font-headline block mb-2.5">
              Comprehensive Pediatric Care
            </span>
            <h2
              style={{ lineHeight: 1.4 }}
              className="text-2xl sm:text-3xl lg:text-[36px] font-extrabold font-headline text-slate-900 tracking-tight leading-[1.4]"
            >
              What Does Pediatric Dental Care{' '}
              <span className="bg-gradient-to-r from-brandBlue to-brandSky bg-clip-text text-transparent">
                Include?
              </span>
            </h2>
            <p className="text-slate-600 text-base sm:text-lg leading-relaxed mt-3.5">
              Children may need different types of dental care as their teeth develop. Treatment recommendations depend on their age, oral health and clinical findings.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {INCLUDED_SERVICES.map((service, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className={`flex flex-col bg-slate-50/80 hover:bg-white rounded-3xl border border-slate-200/90 ${service.accentBorder} transition-all duration-300 overflow-hidden shadow-xs hover:shadow-xl group`}
              >
                <div className="relative aspect-square overflow-hidden bg-slate-50 flex items-center justify-center p-2.5">
                  <img
                    src={service.img}
                    alt={service.alt}
                    className="w-full h-full object-contain rounded-2xl group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute top-4 left-4 z-10">
                    <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-bold font-headline border backdrop-blur-md shadow-xs ${service.badgeColor}`}>
                      {service.tag}
                    </span>
                  </div>
                </div>

                <div className="p-6 sm:p-7 flex-1 flex flex-col justify-between">
                  <div>
                    <h3
                      style={{ lineHeight: 1.4 }}
                      className="text-xl sm:text-2xl font-bold font-headline text-slate-900 mb-2.5 leading-[1.4] group-hover:text-brandBlue transition-colors"
                    >
                      {service.title}
                    </h3>
                    <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
                      {service.desc}
                    </p>
                  </div>

                  <div className="mt-6 pt-4 border-t border-slate-200/60 flex items-center justify-between text-xs font-bold text-brandBlue">
                    <span className="flex items-center gap-1.5">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                      Pediatric Protocol
                    </span>
                    <button
                      type="button"
                      onClick={handleBookClick}
                      className="inline-flex items-center gap-1 hover:text-brandSky transition-colors cursor-pointer"
                    >
                      <span>Inquire Now</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── SECTION 2: Why Are Early Dental Visits Important? (Soft Ice-Blue / Pale Azure Tinted Band) ─── */}
      <section id="why-early-visits" className="w-full py-16 lg:py-24 bg-gradient-to-b from-sky-50/70 via-blue-50/40 to-slate-50/90 relative scroll-mt-28 border-b border-blue-100/80 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">

            {/* Left: Content and Symptom Indicators */}
            <div className="lg:col-span-7 space-y-6">
              <div>
                <span className="text-xs font-bold text-brandBlue uppercase tracking-wider font-headline block mb-2.5">
                  Foundations of Lifelong Oral Health
                </span>
                <h2
                  style={{ lineHeight: 1.4 }}
                  className="text-2xl sm:text-3xl lg:text-[36px] font-extrabold font-headline text-slate-900 tracking-tight leading-[1.4]"
                >
                  Why Are Early Dental Visits{' '}
                  <span className="bg-gradient-to-r from-brandBlue to-brandSky bg-clip-text text-transparent">
                    Important?
                  </span>
                </h2>
              </div>

              <div className="space-y-4 text-slate-600 text-sm sm:text-base leading-relaxed">
                <p>
                  Baby teeth are important even though they eventually fall out. They help children chew comfortably, support speech development, and maintain space for permanent teeth.
                </p>
                <p>
                  Early dental visits can help identify concerns before they become more complicated. Parents can also receive practical guidance on brushing, snacks, sugary drinks, thumb-sucking habits, and other factors that affect oral health.
                </p>
              </div>

              {/* Symptom / Warning Callout (Warm Amber Accent) */}
              <div className="p-5 sm:p-6 rounded-2xl bg-amber-50/90 border border-amber-200/90 text-amber-950 shadow-xs">
                <div className="flex items-start gap-3.5">
                  <AlertCircle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
                  <div className="space-y-2">
                    <h4 className="font-bold font-headline text-sm sm:text-base text-amber-950">
                      When Should You Arrange a Dental Visit?
                    </h4>
                    <p className="text-xs sm:text-sm text-amber-900 leading-relaxed">
                      Consider arranging a dental visit if your child has tooth pain, visible cavities, gum swelling, sensitivity, dental injury, or difficulty eating. A dental check-up is also useful even when no symptoms are present.
                    </p>
                  </div>
                </div>
              </div>

              {/* Check Indicators on Crisp White Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                {WHEN_TO_VISIT_SYMPTOMS.map((item, idx) => (
                  <div key={idx} className="flex items-start gap-2.5 p-3 rounded-xl bg-white border border-blue-100 shadow-xs text-xs sm:text-sm text-slate-700">
                    <CheckCircle2 className="w-4 h-4 text-brandBlue shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Right: Featured Photo with Frame and Caption */}
            <div className="lg:col-span-5 relative">
              <div className="relative rounded-3xl overflow-hidden bg-white border border-blue-200/70 shadow-xl p-2.5 group">
                <div className="aspect-square rounded-2xl overflow-hidden bg-slate-50">
                  <img
                    src="/images/medical-services/dental-care/kids-dentistry-pedodontics/pediatric-dental-care/importance-of-earlier-dental-visit.webp"
                    alt="Importance of early pediatric dental visits - Jerush Dentofacial"
                    className="w-full h-full object-contain sm:object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                </div>
              </div>
              <div className="mt-4 p-4 rounded-2xl bg-white/95 border border-blue-100/90 text-center shadow-xs">
                <p className="text-xs text-slate-600 font-medium">
                  Early positive visits help normalize dental care and prevent childhood dental phobia.
                </p>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ─── SECTION 3: What Happens During a Child's Dental Visit? (Deep Sapphire Navy Interactive Journey) ─── */}
      <section id="visit-journey" className="w-full py-16 lg:py-24 bg-gradient-to-b from-[#081528] via-[#0E244A] to-[#081528] text-white relative scroll-mt-28 overflow-hidden shadow-2xl">
        {/* Ambient decorative lighting */}
        <div className="absolute -top-32 -left-32 w-96 h-96 bg-brandSky/15 rounded-full blur-[120px] pointer-events-none" />
        <div className="absolute -bottom-32 -right-32 w-96 h-96 bg-brandBlue/25 rounded-full blur-[120px] pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-3xl mb-12">
            <span className="text-xs font-bold text-brandSky uppercase tracking-widest font-headline block mb-2.5">
              Step-by-Step Experience
            </span>
            {/* Dark background two-color title */}
            <h2
              style={{ lineHeight: 1.4 }}
              className="text-2xl sm:text-3xl lg:text-[36px] font-extrabold font-headline text-white tracking-tight leading-[1.4]"
            >
              What Happens During a{' '}
              <span className="bg-gradient-to-r from-brandSky via-sky-300 to-white bg-clip-text text-transparent">
                Child's Dental Visit?
              </span>
            </h2>
            <p className="text-slate-300 text-base sm:text-lg leading-relaxed mt-3.5">
              Every visit is adapted to the child's age, comfort level and dental needs.
            </p>
          </div>

          {/* Interactive Steps Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {VISIT_STEPS.map((stepItem, idx) => {
              const isSelected = activeStep === idx;
              return (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: idx * 0.1 }}
                  onClick={() => setActiveStep(idx)}
                  className={`cursor-pointer rounded-2xl p-5 border transition-all duration-300 flex flex-col justify-between ${isSelected
                    ? 'bg-gradient-to-br from-white/15 to-white/5 border-brandSky shadow-lg shadow-brandSky/20 ring-2 ring-brandSky/30 -translate-y-1'
                    : 'bg-white/[0.04] border-white/10 hover:border-white/25 hover:bg-white/[0.08]'
                    }`}
                >
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <span className={`w-10 h-10 rounded-xl font-headline font-black text-sm flex items-center justify-center transition-all ${isSelected
                        ? 'bg-gradient-to-r from-brandSky via-[#198BC8] to-brandBlue text-white shadow-md shadow-brandSky/30'
                        : 'bg-white/10 text-slate-300 border border-white/10'
                        }`}>
                        {stepItem.step}
                      </span>
                      <span className="text-[11px] font-bold text-brandSky tracking-wider uppercase">
                        Stage {idx + 1}
                      </span>
                    </div>

                    <div className="relative w-full aspect-square max-w-[200px] mx-auto rounded-full overflow-hidden mb-4 p-1.5 bg-gradient-to-tr from-brandSky/30 via-white/10 to-brandBlue/30 border border-brandSky/40 shadow-lg flex items-center justify-center group-hover:scale-105 transition-transform duration-300">
                      <div className="w-full h-full rounded-full overflow-hidden bg-slate-900/60 flex items-center justify-center">
                        <img
                          src={stepItem.img}
                          alt={stepItem.alt}
                          className="w-full h-full object-contain"
                        />
                      </div>
                    </div>

                    <h3
                      style={{ lineHeight: 1.4 }}
                      className="font-headline font-bold text-base sm:text-lg text-white mb-2 leading-[1.4]"
                    >
                      {stepItem.title}
                    </h3>

                    <p className="text-slate-300 text-xs sm:text-sm leading-relaxed">
                      {stepItem.lead}
                    </p>
                  </div>

                  <div className="mt-4 pt-3 border-t border-white/10 flex items-center gap-1.5 text-xs font-semibold text-brandSky">
                    <span>{isSelected ? 'Currently Viewing' : 'Click to inspect'}</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </div>
                </motion.div>
              );
            })}
          </div>

          {/* Active Step Detailed Showcase Panel */}
          <div className="mt-8 p-6 sm:p-8 rounded-3xl bg-white/[0.06] backdrop-blur-md border border-white/15 text-white shadow-xl relative overflow-hidden">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              <div className="lg:col-span-8 space-y-3">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brandSky/20 border border-brandSky/30 text-brandSky text-xs font-bold uppercase tracking-wider">
                  <Sparkles className="w-3.5 h-3.5" />
                  Detailed Look • Step {VISIT_STEPS[activeStep].step}
                </div>
                <h4
                  style={{ lineHeight: 1.4 }}
                  className="text-xl sm:text-2xl font-bold font-headline text-white leading-[1.4]"
                >
                  {VISIT_STEPS[activeStep].title}:{' '}
                  <span className="text-brandSky font-medium text-lg sm:text-xl">
                    {VISIT_STEPS[activeStep].lead}
                  </span>
                </h4>
                <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
                  {VISIT_STEPS[activeStep].desc}
                </p>
              </div>

              <div className="lg:col-span-4 flex items-center justify-center">
                <div className="w-full max-w-[260px] sm:max-w-[300px] aspect-square rounded-full overflow-hidden border-2 border-brandSky/40 shadow-2xl p-2 bg-gradient-to-tr from-brandSky/30 via-white/10 to-brandBlue/30 backdrop-blur-md flex items-center justify-center">
                  <div className="w-full h-full rounded-full overflow-hidden bg-slate-950/70 flex items-center justify-center">
                    <img
                      src={VISIT_STEPS[activeStep].img}
                      alt={VISIT_STEPS[activeStep].alt}
                      className="w-full h-full object-contain drop-shadow-2xl"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Clinical Note on X-rays from PDF */}
          <div className="mt-8 p-4.5 rounded-2xl bg-white/[0.07] border border-white/15 flex items-center gap-3.5 text-slate-200">
            <Info className="w-5 h-5 text-brandSky shrink-0" />
            <p className="text-xs sm:text-sm font-medium leading-relaxed">
              <strong className="text-white">Clinical Radiography Note:</strong> X-rays are not required at every visit. They are recommended only when clinically appropriate to diagnose hidden interproximal decay or assess erupting adult tooth buds.
            </p>
          </div>
        </div>
      </section>

      {/* ─── SECTION 4: Helping Children Maintain Healthy Teeth at Home (Fresh Wellness Tone: Emerald/Teal to Sky) ─── */}
      <section id="home-care-tips" className="w-full py-16 lg:py-24 bg-gradient-to-b from-emerald-50/40 via-teal-50/20 to-sky-50/30 relative scroll-mt-28 border-b border-teal-100/70 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">

            {/* Left: Home Habits Card Showcase */}
            <div className="lg:col-span-7 space-y-6">
              <div>
                <span className="text-xs font-bold text-teal-700 uppercase tracking-wider font-headline block mb-2.5">
                  Daily Oral Hygiene Routine
                </span>
                <h2
                  style={{ lineHeight: 1.4 }}
                  className="text-2xl sm:text-3xl lg:text-[36px] font-extrabold font-headline text-slate-900 tracking-tight leading-[1.4]"
                >
                  Helping Children Maintain{' '}
                  <span className="bg-gradient-to-r from-teal-600 via-brandBlue to-brandSky bg-clip-text text-transparent">
                    Healthy Teeth at Home
                  </span>
                </h2>
                <p className="text-slate-600 text-base sm:text-lg leading-relaxed mt-3.5">
                  Parents and caregivers play an important role in children's oral health. These everyday habits can make a difference:
                </p>
              </div>

              {/* 6 Habits Grid on Crisp White Cards with Teal/Emerald Accents */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {HOME_HABITS.map((habit, idx) => (
                  <div
                    key={idx}
                    className="p-4.5 rounded-2xl bg-white border border-teal-100/80 hover:border-teal-300 hover:shadow-md transition-all space-y-2 group"
                  >
                    <div className="flex items-center gap-2">
                      <span className="w-6 h-6 rounded-full bg-teal-100 text-teal-800 font-headline font-bold text-xs flex items-center justify-center group-hover:bg-teal-600 group-hover:text-white transition-colors">
                        {habit.number}
                      </span>
                      <h4 className="font-headline font-bold text-sm sm:text-base text-slate-900 group-hover:text-teal-700 transition-colors">
                        {habit.title}
                      </h4>
                    </div>
                    <p className="text-slate-600 text-xs sm:text-sm leading-relaxed pl-8">
                      {habit.desc}
                    </p>
                  </div>
                ))}
              </div>

              {/* Highlight Philosophy Box */}
              <div className="p-5 rounded-2xl bg-white/90 border border-teal-200/80 shadow-xs">
                <p className="text-slate-800 text-sm sm:text-base font-semibold italic text-center text-teal-950">
                  "The aim is to make dental care a consistent, positive routine rather than something children associate only with pain."
                </p>
              </div>
            </div>

            {/* Right: Home Care Photo */}
            <div className="lg:col-span-5 relative">
              <div className="relative rounded-3xl overflow-hidden bg-white border border-teal-200/70 shadow-xl p-2.5 group">
                <div className="aspect-square rounded-2xl overflow-hidden bg-slate-50">
                  <img
                    src="/images/medical-services/dental-care/kids-dentistry-pedodontics/pediatric-dental-care/maintain-healthy-teeth-at-home.webp"
                    alt="Helping children maintain healthy teeth at home with proper brushing - Jerush Dentofacial"
                    className="w-full h-full object-contain sm:object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                </div>
              </div>

              {/* Pro Parent Tips */}
              <div className="mt-4 p-4 rounded-2xl bg-white border border-teal-100 shadow-xs space-y-2">
                <div className="flex items-center gap-2 text-xs font-bold text-teal-800 uppercase tracking-wider font-headline">
                  <Lightbulb className="w-4 h-4 text-amber-500" />
                  <span>Pediatrician & Dentist Recommendation</span>
                </div>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Start cleaning your baby's gums with a soft damp cloth even before the first tooth emerges to keep gums fresh and healthy.
                </p>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ─── SECTION 5: Related Pediatric Care Treatments (Modern Architectural Cool Slate) ─── */}
      <section id="related-treatments" className="w-full py-16 lg:py-24 bg-slate-100/80 relative scroll-mt-28 border-b border-slate-200/80 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mb-10">
            <span className="text-xs font-bold text-brandBlue uppercase tracking-wider font-headline block mb-2.5">
              Comprehensive Pediatric Dentistry
            </span>
            <h2
              style={{ lineHeight: 1.4 }}
              className="text-2xl sm:text-3xl lg:text-[36px] font-extrabold font-headline text-slate-900 tracking-tight leading-[1.4]"
            >
              Related Treatments for{' '}
              <span className="bg-gradient-to-r from-brandBlue to-brandSky bg-clip-text text-transparent">
                Growing Smiles
              </span>
            </h2>
            <p className="text-slate-600 text-base leading-relaxed mt-3.5">
              Explore specialized pediatric procedures designed to protect developing tooth enamel and guide proper jaw alignment.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {RELATED_TREATMENTS.map((item, idx) => {
              const IconComponent = item.icon;
              return (
                <Link
                  key={idx}
                  to={item.link}
                  className="p-6 rounded-3xl bg-white border border-slate-200 hover:border-brandSky hover:shadow-xl transition-all duration-300 flex flex-col justify-between group"
                >
                  <div>
                    <div className="w-12 h-12 rounded-2xl bg-blue-50 text-brandBlue flex items-center justify-center mb-4 group-hover:bg-brandBlue group-hover:text-white transition-colors shadow-xs">
                      <IconComponent className="w-6 h-6" />
                    </div>
                    <h3
                      style={{ lineHeight: 1.4 }}
                      className="font-headline font-bold text-lg text-slate-900 mb-2 leading-[1.4] group-hover:text-brandBlue transition-colors"
                    >
                      {item.title}
                    </h3>
                    <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">
                      {item.desc}
                    </p>
                  </div>

                  <div className="mt-5 pt-3 border-t border-slate-100 flex items-center gap-1 text-xs font-bold text-brandBlue group-hover:text-brandSky">
                    <span>Learn more</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* ─── SECTION 6: Frequently Asked Questions (Crisp Light Studio Canvas with Glowing Cards) ─── */}
      <section id="faqs" className="w-full py-16 lg:py-24 bg-white relative scroll-mt-28 overflow-hidden">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mb-12 text-center mx-auto">
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
              Find answers to the most common queries from parents regarding baby teeth care, check-up frequency, and cavity prevention.
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

      {/* ─── Bottom CTA Banner (Dr. Aishwarya & User Rule Compliant Dark Navy Format) ─── */}
      <TreatmentCtaBanner
        badgeText="KIDS DENTISTRY SPECIALIST"
        titlePrefix="Give Your Child a"
        highlightWord="Healthy Start"
        titleSuffix="Today"
        subtitle="Healthy dental habits begin early. Jerush Dentofacial & Cosmetic Laser Centre provides dental care tailored to children's changing needs, with an emphasis on prevention, comfort, and healthy development."
        primaryBtnText="Book a Dental Check-Up"
        onPrimaryClick={handleBookClick}
        secondaryBtnText="Call +91 94891 60000"
        secondaryBtnPhone="+919489160000"
        doctorImage="/images/doctors/aishwarya2.webp"
        doctorName="DR. C. J. AISHWARYA"
        doctorRole="Dental Surgeon (BDS)"
        doctorAlt="DR. C. J. AISHWARYA - Dental Surgeon at Jerush Dentofacial & Cosmetic Laser Centre"
      />
    </div>
  );
}
