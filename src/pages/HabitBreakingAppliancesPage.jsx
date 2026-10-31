import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ShieldCheck, Calendar, Phone, CheckCircle2, Clock,
  Award, Smile, ArrowRight, Info, Check, HelpCircle, AlertCircle,
  MapPin, ChevronRight, ChevronDown, Heart, Shield, Activity,
  Sparkles, AlertTriangle, Users, Stethoscope, Baby, Moon,
  CheckCheck, Lightbulb, MessageCircle, HeartHandshake, Eye
} from 'lucide-react';
import PageBreadcrumbHero from '../components/common/PageBreadcrumbHero';
import TreatmentCtaBanner from '../components/common/TreatmentCtaBanner';
import TreatmentSectionNav from '../components/common/TreatmentSectionNav';
import TreatmentAppointmentForm from '../components/common/TreatmentAppointmentForm';
import useTreatmentScrollSpy from '../hooks/useTreatmentScrollSpy';

// Key Stats Bar Data (Signature Navy Gradient)
const STATS = [
  { value: 'Age 4 - 7 Yrs', label: 'Optimal Interceptive Window' },
  { value: '100% Gentle', label: 'Positive Reinforcement Care' },
  { value: 'Fixed & Removable', label: 'Tailored Appliance Choices' },
  { value: '4 Regional Centres', label: 'Centres of Excellence in TN' }
];

// Sticky Navigation Tabs
const TABS = [
  { id: 'habits', label: 'Habits Needing Attention' },
  { id: 'how-they-work', label: 'How Appliances Work' },
  { id: 'treatment-steps', label: '4-Step Clinical Journey' },
  { id: 'parent-guide', label: 'Care & Home Guide' },
  { id: 'regional-centres', label: 'Regional Centres' },
  { id: 'faqs', label: 'FAQs' }
];

// Section 1: Habits Needing Dental Attention (From PDF Pages 1 & 2)
const HABIT_CARDS = [
  {
    id: 'thumb-sucking',
    title: 'Thumb or Finger Sucking',
    tag: 'Most Frequent Habit',
    colorTheme: {
      badge: 'bg-amber-50 text-amber-800 border-amber-200/80',
      borderHover: 'hover:border-amber-400/70',
      iconBg: 'bg-amber-100 text-amber-700',
      pill: 'bg-amber-500/10 text-amber-700'
    },
    image: '/images/medical-services/dental-care/kids-dentistry-pedodontics/habit-breaking-appliances/thumb-or-finger-sucking.webp',
    alt: 'Thumb or finger sucking habit in children affecting dental bite alignment',
    leadText: 'Persistent sucking habits can contribute to changes in tooth position or bite, particularly when the habit is frequent and continues as permanent teeth begin to erupt.',
    mechanism: 'The constant upward mechanical pressure from the digit alters the pliable primary palate and forces front teeth apart.',
    consequences: [
      'Upper incisors flare outward (proclination)',
      'Lower incisors tip lingually inward',
      'Anterior open bite where front teeth fail to meet',
      'High, narrow palatal vault'
    ],
    interventionGoal: 'A gentle palatal crib breaks the comfortable suction vacuum, allowing teeth and jaws to re-align naturally.'
  },
  {
    id: 'tongue-thrusting',
    title: 'Tongue Thrusting',
    tag: 'Atypical Swallowing Pattern',
    colorTheme: {
      badge: 'bg-sky-50 text-brandBlue border-sky-200/80',
      borderHover: 'hover:border-brandSky/70',
      iconBg: 'bg-sky-100 text-brandBlue',
      pill: 'bg-sky-500/10 text-brandBlue'
    },
    image: '/images/medical-services/dental-care/kids-dentistry-pedodontics/habit-breaking-appliances/normal-swallowing-vs-tongue-thrusting.webp',
    alt: 'Normal swallowing pattern compared to infantile tongue thrusting against front teeth',
    leadText: 'An unusual forward tongue movement during swallowing may affect the position of the front teeth in some children and may need assessment.',
    mechanism: 'Swallowing occurs 1,200 to 2,000 times daily; forward tongue thrust forces continuous pressure against the back of erupting incisors.',
    consequences: [
      'Difficulty incising or biting through food cleanly',
      'Incomplete front tooth closure (open bite)',
      'Interdental lisping on “s”, “z”, and “ch” sounds',
      'Resting forward tongue posture'
    ],
    interventionGoal: 'Tongue crib or bead appliances retrain the tongue to seat in its physiological roof-of-the-mouth resting posture.'
  },
  {
    id: 'prolonged-pacifier',
    title: 'Prolonged Pacifier Use',
    tag: 'Extended Toddler Habit',
    colorTheme: {
      badge: 'bg-emerald-50 text-emerald-800 border-emerald-200/80',
      borderHover: 'hover:border-emerald-400/70',
      iconBg: 'bg-emerald-100 text-emerald-700',
      pill: 'bg-emerald-500/10 text-emerald-700'
    },
    image: '/images/medical-services/dental-care/kids-dentistry-pedodontics/habit-breaking-appliances/prolonged-pacifier-use.webp',
    alt: 'Prolonged pacifier use influencing bite development and teeth alignment in children',
    leadText: 'Continued pacifier use can influence bite development in some children. Advice and support to gradually stop the habit are often the first steps.',
    mechanism: 'Prolonged nipple bulk sitting between upper and lower teeth constricts transverse maxillary growth and spreads canines.',
    consequences: [
      'Posterior crossbite (upper teeth biting inside lower)',
      'Lateral dental arch constriction',
      'Flared anterior deciduous teeth',
      'Psychological reliance during emotional transitions'
    ],
    interventionGoal: 'Compassionate weaning counseling backed by custom removable oral screens when gentle guidance alone is insufficient.'
  }
];

// Section 3: 4-Step Clinical Journey (From PDF Pages 2 & 3)
const TREATMENT_STEPS = [
  {
    number: '01',
    badge: 'Evaluation',
    title: 'Dental Examination',
    lead: 'The dentist evaluates the habit, tooth position, bite, and stage of dental development.',
    image: '/images/medical-services/dental-care/kids-dentistry-pedodontics/habit-breaking-appliances/dental-examination.webp',
    alt: 'Dentist conducting dental examination and evaluating oral habit in child',
    details: 'During this friendly, low-stress visit, our paediatric dental surgeon assesses the child\'s dental age, tooth position, skeletal growth patterns, habit frequency, and emotional readiness. We discuss whether the habit is self-correcting or beginning to alter the developing bite.'
  },
  {
    number: '02',
    badge: 'Selection',
    title: 'Appliance Selection',
    lead: 'If an appliance is appropriate, the dentist explains the available option and its purpose.',
    image: '/images/medical-services/dental-care/kids-dentistry-pedodontics/habit-breaking-appliances/appliance-selection.webp',
    alt: 'Dentist discussing habit-breaking appliance selection with child and parent',
    details: 'The choice between fixed palatal cribs, Bluegrass rollers, or removable oral screens is tailored to the child\'s unique habit, comfort, and age. We show demonstration models to the child and parent, followed by gentle, optical digital intra-oral impressions.'
  },
  {
    number: '03',
    badge: 'Placement',
    title: 'Fitting and Instructions',
    lead: 'The appliance is fitted or supplied, and the child and parent are shown how to manage it.',
    image: '/images/medical-services/dental-care/kids-dentistry-pedodontics/habit-breaking-appliances/fitting-and-instructions.webp',
    alt: 'Paediatric dentist fitting custom habit-breaking appliance and providing home instructions',
    details: 'The custom-fabricated appliance is checked for smooth contours, passive seating, and comfort. We coach the child on speaking, swallowing, and eating, while guiding parents through gentle oral hygiene routines and positive home motivation strategies.'
  },
  {
    number: '04',
    badge: 'Monitoring',
    title: 'Follow-up Visits',
    lead: 'The dentist monitors comfort, appliance condition, oral hygiene and progress in reducing the habit.',
    image: '/images/medical-services/dental-care/kids-dentistry-pedodontics/habit-breaking-appliances/pediatric-orthodontic-follow-up-visit.webp',
    alt: 'Follow-up clinical review to monitor comfort, appliance integrity, and habit cessation',
    details: 'Regular check-ups every 4 to 6 weeks ensure mucosal health, monitor bite improvements, and celebrate habit-free milestones. Treatment duration varies depending on the habit, the child\'s response, and whether any minor bite guidance is needed (typically 6 to 10 months).'
  }
];

// Section 4: Caring for the Appliance and Your Child's Teeth (5 Steps from PDF Page 3)
const CARE_GUIDELINES = [
  {
    step: '01',
    title: 'Follow Cleaning Instructions Carefully',
    desc: 'Follow the dentist\'s instructions for cleaning the appliance and teeth. Brush around the appliance and gumline twice daily using a soft-bristled toothbrush and paediatric fluoride toothpaste. An interdental brush helps clean behind wire frames.',
    image: '/images/medical-services/dental-care/kids-dentistry-pedodontics/habit-breaking-appliances/follow-dentists-instructions.webp',
    alt: 'Child following dentist instructions for cleaning teeth and habit-breaking appliance',
    tag: 'Daily Plaque Control'
  },
  {
    step: '02',
    title: 'Avoid Bending or Adjusting at Home',
    desc: 'Avoid bending, adjusting or removing a fixed appliance at home. Do not pull on the wire loops or try to unseat the molar bands. Avoid hard sticky foods, chewy sweets, and tough toffees that could loosen the cemented bands.',
    image: '/images/medical-services/dental-care/kids-dentistry-pedodontics/habit-breaking-appliances/do-not-adjust-orthodontic-appliance.webp',
    alt: 'Never bend, adjust or remove a fixed dental appliance at home',
    tag: 'Band Protection'
  },
  {
    step: '03',
    title: 'Safe Storage for Removable Appliances',
    desc: 'If the appliance is removable, wear and store it as instructed. Always place it in its ventilated protective container when eating, swimming, or playing sports. Never wrap it in paper napkins where it might accidentally be thrown away.',
    image: '/images/medical-services/dental-care/kids-dentistry-pedodontics/habit-breaking-appliances/removable-retainer-storage-guide.webp',
    alt: 'Storing removable orthodontic appliance in a dedicated ventilated case',
    tag: 'Hygiene & Storage'
  },
  {
    step: '04',
    title: 'Encourage Positively Rather Than Scolding',
    desc: 'Encourage your child positively rather than scolding them for the habit. Praise their cooperation, celebrate dry-thumb mornings, and mark progress on a colourful sticker chart. Positive reinforcement eliminates shame and builds self-esteem.',
    image: '/images/medical-services/dental-care/kids-dentistry-pedodontics/habit-breaking-appliances/encourage-your-child-positively.webp',
    alt: 'Parents encouraging child positively for milestone progress without scolding',
    tag: 'Supportive Psychology'
  },
  {
    step: '05',
    title: 'Attend Follow-Up Appointments Regularly',
    desc: 'Attend follow-up appointments so the dentist can check progress and make any necessary adjustments. Our team verifies that the appliance remains passively positioned, inspects gum tissue, and confirms that the habit is steadily resolving.',
    image: '/images/medical-services/dental-care/kids-dentistry-pedodontics/habit-breaking-appliances/follow-up-appointments.webp',
    alt: 'Attending regular follow-up appointments to verify bite and appliance progress',
    tag: 'Clinical Oversight'
  }
];

// Section 5: Regional Coverage Tags (Addresses strictly in hospital footer)
const REGIONAL_LOCATION_TAGS = [
  { name: 'Thuckalay (Hospital HQ)', highlight: 'Main Multispecialty Hospital & Pediatric Wing' },
  { name: 'Nagercoil', highlight: 'Regional Dental Centre' },
  { name: 'Tirunelveli', highlight: 'Comprehensive Dental & Maxillofacial Hub' },
  { name: 'Trichy', highlight: 'Central Tamil Nadu Centre' },
  { name: 'Chennai', highlight: 'Specialist Referral Network' },
  { name: 'Madurai Corridor', highlight: 'Regional Pediatric Referral Wing' },
  { name: 'Marthandam', highlight: 'Local Community Dental Clinic' },
  { name: 'Kanyakumari Coast', highlight: 'Coastal Regional Access' },
  { name: 'South Kerala / Trivandrum', highlight: 'Cross-Border Patient Access' }
];

// Section 6: 7 FAQs (From PDF Page 4)
const FAQS = [
  {
    q: 'At what age might a child need a habit-breaking appliance?',
    a: 'There is no single age that applies to every child. The dentist considers the habit\'s frequency, intensity, and duration, the child\'s dental and emotional development, and whether the teeth or bite are already being affected. Most interventions are considered between ages 4 and 7 when the habit persists despite supportive home guidance and permanent teeth are nearing eruption.'
  },
  {
    q: 'Are habit-breaking appliances painful?',
    a: 'No, habit-breaking appliances are designed to be smooth and passive. Children may experience temporary mild pressure, an unfamiliar sensation, or slight tongue tiredness during the first few days as their mouth adjusts. Persistent pain, sores, or difficulty eating should always be discussed with the dentist for prompt relief.'
  },
  {
    q: 'Can thumb sucking affect the teeth?',
    a: 'Yes. Prolonged, frequent thumb sucking can contribute to significant changes in tooth position and bite development. The effects depend on factors such as the intensity, duration, and frequency of the habit. It commonly leads to flared upper front teeth, inward-tilted lower teeth, a high narrow palate, and an anterior open bite where front teeth cannot touch.'
  },
  {
    q: 'Does every child who sucks their thumb need an appliance?',
    a: 'No. Many children naturally stop the habit with time, patient home encouragement, and gentle supportive guidance. An appliance is considered only when the habit persists past the typical milestone age and clinical evaluation shows that dental alignment or jaw development is beginning to be altered.'
  },
  {
    q: 'How long does a habit-breaking appliance need to be worn?',
    a: 'The duration depends on the specific appliance, the habit, and the child\'s response. While the habit often stops within weeks, the appliance is typically kept in place for approximately 6 to 10 months to prevent relapse and ensure the habit is completely outgrown. The dentist will provide an individual treatment plan and review schedule.'
  },
  {
    q: 'Can a habit-breaking appliance correct crooked teeth?',
    a: 'Its main purpose is to discourage the habit and remove the continuous deforming pressure from the teeth and jaws. If the habit has already affected tooth position or the bite, natural spontaneous improvement often occurs once the habit ceases. However, if significant bite misalignments or crowding remain, additional orthodontic treatment may be planned once permanent teeth erupt.'
  },
  {
    q: 'What should parents do if the child refuses to wear the appliance?',
    a: 'Speak with the dentist rather than forcing the appliance or disciplining the child. Understanding the child\'s concerns and using gentle encouragement can help tremendously. Our paediatric team uses child-friendly communication and reward charts. In cases of persistent resistance with removable appliances, a comfortable fixed appliance may be recommended to remove daily compliance struggles.'
  }
];

// Related Treatments in Kids Dentistry
const RELATED_TREATMENTS = [
  {
    title: 'Pediatric Dental Care',
    desc: 'Comprehensive gentle oral check-ups, tooth-coloured fillings, and proactive fluoride protection for growing children.',
    image: '/images/medical-services/dental-care/kids-dentistry-pedodontics/pediatric-dental-care/preventive-dental-caring.webp',
    alt: 'Preventive pediatric dental care and regular check-up guidance',
    link: '/dental-care/kids-dentistry/pediatric-dental-care',
    badge: 'Ages 0 - 16 Yrs'
  },
  {
    title: 'Pit & Fissure Sealants',
    desc: 'Protective resin coatings sealed over deep molar grooves to shield developing permanent teeth against childhood decay.',
    image: '/images/medical-services/dental-care/kids-dentistry-pedodontics/pit-fissure-sealants/covering-deep-grooves.webp',
    alt: 'Pit and fissure sealants for pediatric molar cavity defense',
    link: '/dental-care/kids-dentistry/pit-fissure-sealants',
    badge: 'Molar Shield'
  },
  {
    title: 'Pediatric Tooth Extractions',
    desc: 'Gentle, anxiety-free extractions of severely damaged or over-retained primary teeth to allow healthy permanent eruption.',
    image: '/images/medical-services/dental-care/kids-dentistry-pedodontics/pedo-extractions/Gentle-pediatric-tooth-extraction.webp',
    alt: 'Gentle pediatric dental extraction procedure for children',
    link: '/dental-care/kids-dentistry/pedo-extractions',
    badge: 'Gentle Extraction'
  }
];

export default function HabitBreakingAppliancesPage() {
  const navigate = useNavigate();
  const [openFaq, setOpenFaq] = useState(0);

  // ScrollSpy Hook for in-page navigation tabs
  const { activeSection, scrollToSection } = useTreatmentScrollSpy(
    TABS.map(t => t.id),
    138
  );

  useEffect(() => {
    // Dynamic SEO Title and Meta Description (From PDF Page 5)
    document.title = 'Habit Breaking Appliances for Children | Jerush Dentofacial';

    let metaDesc = document.querySelector('meta[name="description"]');
    if (!metaDesc) {
      metaDesc = document.createElement('meta');
      metaDesc.name = 'description';
      document.head.appendChild(metaDesc);
    }
    metaDesc.content = 'Learn how habit-breaking appliances may help children manage persistent thumb sucking, tongue thrusting, and other oral habits that affect dental development at Jerush Dentofacial & Cosmetic Laser Centre.';

    // Inject FAQ Schema JSON-LD for rich snippets
    const faqSchemaScript = document.createElement('script');
    faqSchemaScript.type = 'application/ld+json';
    faqSchemaScript.id = 'faq-schema-habit-breaking';
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

    // Inject MedicalProcedure Schema JSON-LD
    const procedureSchemaScript = document.createElement('script');
    procedureSchemaScript.type = 'application/ld+json';
    procedureSchemaScript.id = 'procedure-schema-habit-breaking';
    procedureSchemaScript.text = JSON.stringify({
      '@context': 'https://schema.org',
      '@type': 'MedicalProcedure',
      'name': 'Habit-Breaking Appliances for Children',
      'procedureType': 'NonSurgicalProcedure',
      'bodyLocation': 'Oral Cavity, Upper Dental Arch',
      'description': 'Paediatric orthodontic and interceptive dental appliances designed to gently eliminate persistent thumb sucking, finger sucking, tongue thrusting, and prolonged pacifier use in growing children.',
      'relevantSpecialty': {
        '@type': 'MedicalSpecialty',
        'name': 'Pediatric Dentistry / Pedodontics'
      },
      'provider': {
        '@type': 'Hospital',
        'name': 'Jerush Dentofacial & Cosmetic Laser Centre',
        'telephone': '+919489160000',
        'address': {
          '@type': 'PostalAddress',
          'addressLocality': 'Thuckalay',
          'addressRegion': 'Tamil Nadu',
          'postalCode': '629175',
          'addressCountry': 'IN'
        }
      }
    });
    document.head.appendChild(procedureSchemaScript);

    return () => {
      const existingFaq = document.getElementById('faq-schema-habit-breaking');
      if (existingFaq) existingFaq.remove();
      const existingProc = document.getElementById('procedure-schema-habit-breaking');
      if (existingProc) existingProc.remove();
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

  const toggleFaq = (index) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  return (
    <div className="w-full font-body text-left relative min-h-screen text-slate-800 bg-white selection:bg-brandSky/20 selection:text-brandBlue">
      {/* ─── Breadcrumb Hero ─── */}
      <PageBreadcrumbHero
        title="Habit Breaking Appliances"
        breadcrumbs={[
          { label: 'Medical Services', path: '/medical-services' },
          { label: 'Dental Care', path: '/treatments?category=dental' },
          { label: 'Kids Dentistry', path: '/treatments?category=dental&sub=Kids%20Dentistry%20%2F%20Pedodontics' },
          { label: 'Habit Breaking Appliances', active: true }
        ]}
      />

      {/* ─── Hero Section (With Fluid Entrance Animations, 1.40 Line-Height Convention) ─── */}
      <section className="w-full bg-gradient-to-b from-white via-sky-50/20 to-slate-50/50 py-12 lg:py-18 relative overflow-hidden border-b border-slate-200/70">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">

            {/* Left Column: Department Branding, Two-Color Headline & Content */}
            <motion.div
              initial={{ opacity: 0, x: -24 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="lg:col-span-7 space-y-6"
            >
              {/* Clean Clinic Tagline */}
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-sky-100/80 border border-sky-200/90 text-brandBlue text-xs font-bold uppercase tracking-wider">
                <Baby className="w-3.5 h-3.5 text-brandSky" />
                <span>Jerush Kids Dentistry & Pedodontics</span>
              </div>

              {/* Two-Color Title with 1.40 Line Height Standard */}
              <h1
                style={{ lineHeight: 1.4 }}
                className="text-3xl sm:text-4xl lg:text-5xl font-extrabold font-headline text-slate-900 tracking-tight leading-[1.4]"
              >
                Gentle Habit-Breaking Appliances for a{' '}
                <span className="bg-gradient-to-r from-brandBlue to-brandSky bg-clip-text text-transparent">
                  Healthy Childhood Smile
                </span>
              </h1>

              {/* Lead Paragraph from PDF Page 1 */}
              <p className="text-slate-600 text-base sm:text-lg leading-relaxed font-normal">
                Habits such as prolonged thumb sucking, finger sucking, tongue thrusting, and certain pacifier use patterns can sometimes affect tooth position and jaw development. When these habits continue beyond the stage at which they commonly resolve, our paediatric dental specialists recommend supportive, custom-fitted habit-breaking appliances.
              </p>

              {/* Secondary Value Proposition */}
              <p className="text-slate-500 text-sm sm:text-base leading-relaxed">
                At <strong className="text-slate-800 font-semibold">Jerush Dentofacial & Cosmetic Laser Centre</strong>, these appliances discourage specific oral habits and support normal dental development. They are considered when gentle habit guidance alone has not been effective and the habit begins to affect the child's bite or facial structures.
              </p>

              {/* Pediatric Care Pillars */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
                <div className="flex items-center gap-2.5 p-3 rounded-2xl bg-white border border-slate-200/80 shadow-xs">
                  <div className="w-8 h-8 rounded-xl bg-amber-100 text-amber-700 flex items-center justify-center shrink-0">
                    <Heart className="w-4 h-4 text-amber-600" />
                  </div>
                  <div>
                    <span className="text-xs font-bold text-slate-900 block leading-tight">No Punishment</span>
                    <span className="text-[11px] text-slate-500">Supportive Care</span>
                  </div>
                </div>

                <div className="flex items-center gap-2.5 p-3 rounded-2xl bg-white border border-slate-200/80 shadow-xs">
                  <div className="w-8 h-8 rounded-xl bg-sky-100 text-brandBlue flex items-center justify-center shrink-0">
                    <ShieldCheck className="w-4 h-4 text-brandBlue" />
                  </div>
                  <div>
                    <span className="text-xs font-bold text-slate-900 block leading-tight">Bite Protection</span>
                    <span className="text-[11px] text-slate-500">Intercepts Open Bite</span>
                  </div>
                </div>

                <div className="flex items-center gap-2.5 p-3 rounded-2xl bg-white border border-slate-200/80 shadow-xs">
                  <div className="w-8 h-8 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0">
                    <Smile className="w-4 h-4 text-emerald-600" />
                  </div>
                  <div>
                    <span className="text-xs font-bold text-slate-900 block leading-tight">Custom 3D Fit</span>
                    <span className="text-[11px] text-slate-500">Fixed & Removable</span>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center gap-4 pt-3">
                <button
                  type="button"
                  onClick={handleBookClick}
                  className="inline-flex items-center gap-2.5 px-6 sm:px-7 py-3.5 rounded-full bg-gradient-to-r from-brandSky via-[#198BC8] to-brandBlue text-white font-headline font-bold text-xs sm:text-sm uppercase tracking-wider shadow-lg shadow-brandSky/25 hover:shadow-brandSky/40 hover:scale-[1.02] active:scale-[0.98] transition-all group cursor-pointer border-none"
                >
                  <Calendar className="w-4 h-4 text-white" />
                  <span>Book Child Consultation</span>
                  <div className="w-5 h-5 rounded-full bg-white/20 flex items-center justify-center group-hover:translate-x-1 transition-transform">
                    <ArrowRight className="w-3 h-3 text-white" />
                  </div>
                </button>

                <a
                  href="tel:+919489160000"
                  className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full bg-white border border-slate-300 text-slate-700 font-headline font-bold text-xs sm:text-sm uppercase tracking-wider hover:bg-slate-50 hover:text-brandBlue hover:border-brandSky/60 transition-all shadow-xs"
                >
                  <Phone className="w-4 h-4 text-brandSky" />
                  <span>Call +91 94891 60000</span>
                </a>
              </div>
            </motion.div>

            {/* Right Column: Clean Frame-Focused Hero Image Card */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.15 }}
              className="lg:col-span-5"
            >
              <div className="relative mx-auto max-w-md lg:max-w-none">
                {/* Ambient Soft Glow Behind Card */}
                <div className="absolute -inset-4 bg-gradient-to-tr from-brandSky/15 via-blue-500/10 to-transparent rounded-3xl blur-2xl pointer-events-none" />

                {/* Primary Framed Card */}
                <div className="relative rounded-3xl overflow-hidden bg-white border border-slate-200/90 shadow-xl transition-transform duration-300 hover:shadow-2xl">
                  <div className="aspect-square w-full overflow-hidden bg-slate-50 relative">
                    <img
                      src="/images/medical-services/dental-care/kids-dentistry-pedodontics/habit-breaking-appliances/develop-healthier-oral-habits.webp"
                      alt="Pediatric dentist examining child smile and discussing habit-breaking appliance"
                      className="w-full h-full object-cover object-center transition-transform duration-700 hover:scale-105"
                    />
                  </div>

                  {/* Reassuring Clinical Trust Badge Overlay */}
                  <div className="p-5 sm:p-6 bg-gradient-to-b from-white to-sky-50/40 border-t border-slate-100 space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-brandBlue uppercase tracking-wider font-headline">
                        Interceptive Pedodontics
                      </span>
                      <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-[11px] font-bold">
                        <Check className="w-3 h-3 text-emerald-600" />
                        Gentle Approach
                      </span>
                    </div>
                    <p className="text-xs sm:text-sm text-slate-600 leading-snug">
                      Tailored habit cessation plans guided by qualified paediatric dental surgeons across 4 regional centres in Tamil Nadu.
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>

          </div>
        </div>
      </section>

      {/* ─── Counter & Key Stats Section (Signature Navy to Royal Blue Gradient) ─── */}
      <section className="bg-gradient-to-r from-[#0F172A] via-[#2852A3] to-[#0F172A] py-10 sm:py-12 px-4 sm:px-6 text-white shadow-inner relative overflow-hidden">
        {/* Ambient Subtle Shimmer */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(56,189,248,0.18)_0%,transparent_75%)] pointer-events-none" />

        <div className="max-w-7xl mx-auto relative z-10">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8 text-center">
            {STATS.map((stat, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: idx * 0.08 }}
                className="space-y-1 sm:space-y-2"
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

      {/* ─── Sticky In-Page Navigation Bar ─── */}
      <TreatmentSectionNav
        tabs={TABS}
        activeSection={activeSection}
        onTabClick={scrollToSection}
      />

      {/* ─── Section 1: Which Habits May Need Dental Attention? (PDF Pages 1 & 2) ─── */}
      <section id="habits" className="py-16 sm:py-20 lg:py-24 bg-white relative overflow-hidden border-b border-slate-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          {/* Section Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center max-w-3xl mx-auto space-y-4 mb-14"
          >
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-sky-100/80 border border-sky-200 text-brandBlue text-xs font-bold uppercase tracking-wider">
              <Baby className="w-3.5 h-3.5 text-brandSky" />
              <span>Habit Evaluation</span>
            </div>
            <h2
              style={{ lineHeight: 1.4 }}
              className="text-2xl sm:text-3xl lg:text-4xl font-extrabold font-headline text-slate-900 tracking-tight leading-[1.4]"
            >
              Which Habits May Need{' '}
              <span className="bg-gradient-to-r from-brandBlue to-brandSky bg-clip-text text-transparent">
                Dental Attention?
              </span>
            </h2>
            <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
              Not every childhood oral habit requires an appliance. A dental evaluation helps determine whether intervention is necessary, taking into account the child's age, habit frequency, dental development, and whether changes to bite structures are present.
            </p>
          </motion.div>

          {/* 3-Column Habit Showcase Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch">
            {HABIT_CARDS.map((habit, idx) => (
              <motion.div
                key={habit.id}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.12 }}
                className={`bg-white rounded-3xl border border-slate-200/90 overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col group ${habit.colorTheme.borderHover}`}
              >
                {/* Framed Image Container */}
                <div className="p-3 pb-0">
                  <div className="relative rounded-2xl overflow-hidden bg-slate-50 aspect-square border border-slate-100">
                    <img
                      src={habit.image}
                      alt={habit.alt}
                      className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute top-3 left-3">
                      <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-headline font-bold border backdrop-blur-md shadow-xs ${habit.colorTheme.badge}`}>
                        {habit.tag}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Card Content */}
                <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                  <div className="space-y-3">
                    <h3 className="font-headline font-bold text-xl text-slate-900 group-hover:text-brandBlue transition-colors">
                      {habit.title}
                    </h3>
                    <p className="text-slate-600 text-sm leading-relaxed">
                      {habit.leadText}
                    </p>

                    {/* How It Affects Teeth */}
                    <div className="pt-2">
                      <span className="text-xs font-bold text-slate-800 uppercase tracking-wider block mb-2">
                        Potential Dental Impact:
                      </span>
                      <ul className="space-y-1.5 text-xs text-slate-600">
                        {habit.consequences.map((item, cIdx) => (
                          <li key={cIdx} className="flex items-start gap-2">
                            <span className="w-1.5 h-1.5 rounded-full bg-brandSky mt-1.5 shrink-0" />
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  {/* Interceptive Goal Pill */}
                  <div className={`p-3 rounded-2xl border text-xs leading-relaxed ${habit.colorTheme.badge}`}>
                    <strong className="block font-bold mb-0.5">Clinical Goal:</strong>
                    {habit.interventionGoal}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Assessment Reassurance Banner */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mt-12 p-6 rounded-3xl bg-sky-50/70 border border-sky-200/80 max-w-4xl mx-auto flex flex-col sm:flex-row items-center gap-5 text-center sm:text-left"
          >
            <div className="w-12 h-12 rounded-2xl bg-brandBlue text-white flex items-center justify-center shrink-0 shadow-md shadow-brandBlue/20">
              <HeartHandshake className="w-6 h-6 text-brandSky" />
            </div>
            <div className="space-y-1 flex-1">
              <h4 className="font-headline font-bold text-base text-slate-900">
                Individualised Assessment at Jerush
              </h4>
              <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">
                At Jerush Dentofacial & Cosmetic Laser Centre, the choice of appliance depends on the child's age, the habit involved, dental development, and whether any changes to the teeth or bite are already present.
              </p>
            </div>
            <button
              type="button"
              onClick={handleBookClick}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-brandBlue text-white font-headline font-bold text-xs uppercase tracking-wider hover:bg-brandSky hover:text-white transition-all shrink-0 cursor-pointer border-none"
            >
              <span>Book Check-up</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </motion.div>

        </div>
      </section>

      {/* ─── Section 2: How Do Habit Breaking Appliances Work? (PDF Page 2) ─── */}
      <section id="how-they-work" className="py-16 sm:py-20 lg:py-24 bg-slate-50/70 relative overflow-hidden border-b border-slate-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          {/* Section Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center max-w-3xl mx-auto space-y-4 mb-14"
          >
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-sky-100/80 border border-sky-200 text-brandBlue text-xs font-bold uppercase tracking-wider">
              <Sparkles className="w-3.5 h-3.5 text-brandSky" />
              <span>Mechanism & Design</span>
            </div>
            <h2
              style={{ lineHeight: 1.4 }}
              className="text-2xl sm:text-3xl lg:text-4xl font-extrabold font-headline text-slate-900 tracking-tight leading-[1.4]"
            >
              How Do Habit-Breaking{' '}
              <span className="bg-gradient-to-r from-brandBlue to-brandSky bg-clip-text text-transparent">
                Appliances Work?
              </span>
            </h2>
            <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
              Habit-breaking appliances may be fixed to the teeth or designed to be removable, depending on the clinical need. Some appliances act as a reminder that interrupts the habit, while others help discourage the tongue or fingers from applying pressure to the teeth.
            </p>
          </motion.div>

          {/* Dual-Column Architecture Showcase */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">

            {/* Left Column: Visual Highlight on the Palatal Crib Model */}
            <motion.div
              initial={{ opacity: 0, x: -24 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="lg:col-span-5 space-y-4"
            >
              <div className="relative rounded-3xl overflow-hidden bg-white border border-slate-200/90 shadow-lg group">
                <div className="aspect-square w-full overflow-hidden bg-slate-100">
                  <img
                    src="/images/medical-services/dental-care/kids-dentistry-pedodontics/habit-breaking-appliances/orthodontic-palatal-crib-dental-model.webp"
                    alt="Orthodontic palatal crib habit-breaking appliance fitted on dental arch model"
                    className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700"
                  />
                </div>
                <div className="p-5 bg-white border-t border-slate-100 space-y-1.5">
                  <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-sky-50 border border-sky-200 text-brandBlue text-[11px] font-bold">
                    <span>Clinical Model</span>
                  </div>
                  <h4 className="font-headline font-bold text-base text-slate-900">
                    Palatal Crib Architecture
                  </h4>
                  <p className="text-xs text-slate-500 leading-relaxed">
                    Custom-fabricated from medical-grade stainless steel wire smoothly contoured behind the maxillary front teeth to passively intercept digit suction.
                  </p>
                </div>
              </div>
            </motion.div>

            {/* Right Column: 3 Core Appliance Mechanisms & Supportive Philosophy */}
            <motion.div
              initial={{ opacity: 0, x: 24 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="lg:col-span-7 space-y-5"
            >

              {/* Mechanism 1: Habit Interruption */}
              <div className="p-5 sm:p-6 rounded-2xl bg-white border border-slate-200/80 shadow-xs hover:shadow-md transition-all space-y-2">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-sky-100 text-brandBlue flex items-center justify-center font-bold text-sm">
                    01
                  </div>
                  <h3 className="font-headline font-bold text-lg text-slate-900">
                    A Gentle Habit Interrupter (Passive Reminder)
                  </h3>
                </div>
                <p className="text-slate-600 text-sm leading-relaxed pl-12">
                  The appliance acts as a physical barrier that removes the comfortable suction seal created when the thumb rests against the roof of the mouth. Without the soothing feedback, the child naturally and subconsciously abandons the habit.
                </p>
              </div>

              {/* Mechanism 2: Tongue Retraining */}
              <div className="p-5 sm:p-6 rounded-2xl bg-white border border-slate-200/80 shadow-xs hover:shadow-md transition-all space-y-2">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-blue-100 text-brandBlue flex items-center justify-center font-bold text-sm">
                    02
                  </div>
                  <h3 className="font-headline font-bold text-lg text-slate-900">
                    Tongue Posture & Swallowing Re-Education
                  </h3>
                </div>
                <p className="text-slate-600 text-sm leading-relaxed pl-12">
                  For tongue thrusters, vertical crib wires or roller beads gently prevent the tongue from wedging between the front teeth during swallowing. This redirects the tongue upward against the palate, encouraging normal muscular growth vectors.
                </p>
              </div>

              {/* Mechanism 3: Fixed vs Removable Options */}
              <div className="p-5 sm:p-6 rounded-2xl bg-white border border-slate-200/80 shadow-xs hover:shadow-md transition-all space-y-2">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold text-sm">
                    03
                  </div>
                  <h3 className="font-headline font-bold text-lg text-slate-900">
                    Fixed vs. Removable Custom Appliance Design
                  </h3>
                </div>
                <p className="text-slate-600 text-sm leading-relaxed pl-12">
                  <strong className="text-slate-800 font-semibold">Fixed Cribs</strong> are cemented onto molar bands for continuous 24/7 reminder efficacy—ideal for night-time habits. <strong className="text-slate-800 font-semibold">Removable Plates</strong> are worn during targeted hours for older, cooperative children.
                </p>
              </div>

              {/* Core Philosophy Reassurance (PDF Page 2 Quote) */}
              <div className="p-5 sm:p-6 rounded-2xl bg-gradient-to-r from-blue-900 via-brandBlue to-slate-900 text-white shadow-md space-y-2">
                <div className="flex items-center gap-2 text-brandSky text-xs font-bold uppercase tracking-wider">
                  <Heart className="w-4 h-4 text-brandSky" />
                  <span>The Jerush Pediatric Philosophy</span>
                </div>
                <p className="text-sm sm:text-base text-slate-100 leading-relaxed font-medium">
                  “The aim is not to punish the child. A supportive approach helps children understand the change and develop healthier habits without shame or pressure.”
                </p>
                <span className="text-[11px] text-slate-300 block">
                  Positive reinforcement, parental support, and friendly guidance recommended by our dental team.
                </span>
              </div>

            </motion.div>

          </div>

        </div>
      </section>

      {/* ─── Section 3: What Happens During Treatment? (PDF Pages 2 & 3 - 4-Step Journey) ─── */}
      <section id="treatment-steps" className="py-16 sm:py-20 lg:py-24 bg-white relative overflow-hidden border-b border-slate-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          {/* Section Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center max-w-3xl mx-auto space-y-4 mb-14"
          >
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-sky-100/80 border border-sky-200 text-brandBlue text-xs font-bold uppercase tracking-wider">
              <Clock className="w-3.5 h-3.5 text-brandSky" />
              <span>4-Step Clinical Protocol</span>
            </div>
            <h2
              style={{ lineHeight: 1.4 }}
              className="text-2xl sm:text-3xl lg:text-4xl font-extrabold font-headline text-slate-900 tracking-tight leading-[1.4]"
            >
              What Happens During{' '}
              <span className="bg-gradient-to-r from-brandBlue to-brandSky bg-clip-text text-transparent">
                Your Child's Treatment?
              </span>
            </h2>
            <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
              Every phase of interceptive care is planned with warmth, transparency, and child-centred patience. Here is what parents and children can expect during treatment.
            </p>
          </motion.div>

          {/* 4-Step Visual Journey Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 items-stretch">
            {TREATMENT_STEPS.map((step, idx) => (
              <motion.div
                key={step.number}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.45, delay: idx * 0.1 }}
                className="bg-white rounded-3xl border border-slate-200/90 overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col group hover:border-brandSky/60"
              >
                {/* Step Image */}
                <div className="p-3 pb-0">
                  <div className="relative rounded-2xl overflow-hidden bg-slate-50 aspect-[3/2] border border-slate-100">
                    <img
                      src={step.image}
                      alt={step.alt}
                      className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute top-2.5 left-2.5">
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-[10px] font-headline font-bold bg-slate-900/80 text-white backdrop-blur-md shadow-xs">
                        {step.badge}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Step Body */}
                <div className="p-5 flex-1 flex flex-col justify-between space-y-3">
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <span className="font-headline font-black text-2xl text-brandBlue">
                        {step.number}
                      </span>
                      <h3 className="font-headline font-bold text-base text-slate-900 leading-tight">
                        {step.title}
                      </h3>
                    </div>
                    <p className="text-xs font-semibold text-brandBlue/90 leading-snug">
                      {step.lead}
                    </p>
                    <p className="text-xs text-slate-500 leading-relaxed pt-1">
                      {step.details}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Treatment Duration Note */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.45, delay: 0.2 }}
            className="mt-12 p-5 sm:p-6 rounded-2xl bg-sky-50/60 border border-sky-100 text-center max-w-3xl mx-auto space-y-1"
          >
            <span className="text-xs font-bold text-brandBlue uppercase tracking-wider font-headline">
              Treatment Duration
            </span>
            <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
              Treatment duration varies. It depends on the habit, the child's response, and whether any minor bite correction is also required. Typically, appliances are retained for 6 to 10 months to consolidate permanent habit cessation.
            </p>
          </motion.div>

        </div>
      </section>

      {/* ─── Section 4: Caring for the Appliance and Your Child's Teeth (PDF Page 3) ─── */}
      <section id="parent-guide" className="py-16 sm:py-20 lg:py-24 bg-slate-50/70 relative overflow-hidden border-b border-slate-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          {/* Section Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center max-w-3xl mx-auto space-y-4 mb-14"
          >
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-sky-100/80 border border-sky-200 text-brandBlue text-xs font-bold uppercase tracking-wider">
              <ShieldCheck className="w-3.5 h-3.5 text-brandSky" />
              <span>Parent & Home Care Guide</span>
            </div>
            <h2
              style={{ lineHeight: 1.4 }}
              className="text-2xl sm:text-3xl lg:text-4xl font-extrabold font-headline text-slate-900 tracking-tight leading-[1.4]"
            >
              Caring for the Appliance and{' '}
              <span className="bg-gradient-to-r from-brandBlue to-brandSky bg-clip-text text-transparent">
                Your Child's Teeth
              </span>
            </h2>
            <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
              Good oral hygiene and regular reviews help keep the appliance comfortable and effective throughout the journey.
            </p>
          </motion.div>

          {/* 5-Card Care Playbook Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 items-stretch">
            {CARE_GUIDELINES.map((item, idx) => (
              <motion.div
                key={item.step}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.45, delay: idx * 0.08 }}
                className={`bg-white rounded-3xl border border-slate-200/90 overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 flex flex-col group hover:border-brandSky/60 ${idx === 4 ? 'md:col-span-2 lg:col-span-1' : ''}`}
              >
                {/* Framed Image */}
                <div className="p-3 pb-0">
                  <div className="relative rounded-2xl overflow-hidden bg-slate-50 aspect-[3/2] border border-slate-100">
                    <img
                      src={item.image}
                      alt={item.alt}
                      className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute top-2.5 left-2.5">
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-[10px] font-headline font-bold bg-white/95 text-slate-800 border border-slate-200 backdrop-blur-md shadow-xs">
                        {item.tag}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Content */}
                <div className="p-5 flex-1 flex flex-col justify-between space-y-2">
                  <div className="space-y-1.5">
                    <div className="flex items-center gap-2">
                      <span className="w-5 h-5 rounded-full bg-brandBlue text-white text-[10px] font-bold flex items-center justify-center shrink-0">
                        {item.step}
                      </span>
                      <h3 className="font-headline font-bold text-base text-slate-900 leading-tight">
                        {item.title}
                      </h3>
                    </div>
                    <p className="text-xs text-slate-600 leading-relaxed pt-1">
                      {item.desc}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Multidisciplinary Collaboration Note (From PDF Page 4) */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mt-12 p-6 rounded-3xl bg-white border border-sky-200/80 shadow-sm max-w-4xl mx-auto flex flex-col sm:flex-row items-center gap-5"
          >
            <div className="w-12 h-12 rounded-2xl bg-sky-100 text-brandBlue flex items-center justify-center shrink-0">
              <Stethoscope className="w-6 h-6 text-brandBlue" />
            </div>
            <div className="space-y-1 text-center sm:text-left">
              <h4 className="font-headline font-bold text-base text-slate-900">
                Comprehensive Developmental Support
              </h4>
              <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">
                A habit-breaking appliance does not replace regular dental care or address every cause of a habit. Some children may benefit from additional support, such as guidance from a speech-language professional when tongue function or swallowing is involved.
              </p>
            </div>
          </motion.div>

        </div>
      </section>

      {/* ─── Section 5: Regional Centres of Excellence (Official addresses in footer) ─── */}
      <section id="regional-centres" className="py-16 sm:py-20 lg:py-24 bg-white relative overflow-hidden border-b border-slate-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">

          {/* Section Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="max-w-3xl mx-auto space-y-4 mb-10"
          >
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-sky-100/80 border border-sky-200 text-brandBlue text-xs font-bold uppercase tracking-wider">
              <MapPin className="w-3.5 h-3.5 text-brandSky" />
              <span>Regional Coverage</span>
            </div>
            <h2
              style={{ lineHeight: 1.4 }}
              className="text-2xl sm:text-3xl lg:text-4xl font-extrabold font-headline text-slate-900 tracking-tight leading-[1.4]"
            >
              Serving Families Across{' '}
              <span className="bg-gradient-to-r from-brandBlue to-brandSky bg-clip-text text-transparent">
                Tamil Nadu & South Kerala
              </span>
            </h2>
            <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
              Paediatric consultations and gentle habit-breaking interceptive therapies are accessible across our regional centres:
            </p>
          </motion.div>

          {/* Location Tags Grid */}
          <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4 max-w-4xl mx-auto">
            {REGIONAL_LOCATION_TAGS.map((loc, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.35, delay: idx * 0.04 }}
                className="inline-flex items-center gap-2.5 px-4 sm:px-5 py-2.5 sm:py-3 rounded-2xl bg-slate-50 border border-slate-200/90 hover:border-brandSky/60 hover:bg-sky-50/40 hover:shadow-xs transition-all text-left group"
              >
                <div className="w-7 h-7 rounded-lg bg-sky-100 flex items-center justify-center shrink-0 group-hover:bg-brandBlue transition-colors">
                  <MapPin className="w-3.5 h-3.5 text-brandBlue group-hover:text-white transition-colors" />
                </div>
                <div>
                  <span className="font-headline font-bold text-xs sm:text-sm text-slate-900 block leading-tight">
                    {loc.name}
                  </span>
                  <span className="text-[11px] text-slate-500 block">
                    {loc.highlight}
                  </span>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Reference to Official Address in Footer */}
          <div className="mt-10 p-4.5 rounded-2xl bg-sky-50/60 border border-sky-100 text-center text-xs sm:text-sm text-slate-600 max-w-2xl mx-auto">
            <span className="font-semibold text-slate-900">Hospital Branch Addresses:</span> Complete clinic street addresses, Google Maps locations, and contact details are available in the footer section below.
          </div>

        </div>
      </section>

      {/* ─── Section 6: Frequently Asked Questions (PDF Page 4 - Schema Markup) ─── */}
      <section id="faqs" className="py-16 sm:py-20 lg:py-24 bg-slate-50/80 relative overflow-hidden border-b border-slate-200/80">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">

          {/* Section Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center space-y-4 mb-14"
          >
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-sky-100/80 border border-sky-200 text-brandBlue text-xs font-bold uppercase tracking-wider">
              <HelpCircle className="w-3.5 h-3.5 text-brandSky" />
              <span>Evidence-Based Clarity</span>
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
              Clear clinical answers regarding appliance safety, wear schedules, thumb sucking cessation, and child comfort.
            </p>
          </motion.div>

          {/* Accordion List */}
          <div className="space-y-3.5">
            {FAQS.map((faq, idx) => {
              const isOpen = openFaq === idx;
              return (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.35, delay: idx * 0.06 }}
                  className={`rounded-2xl border transition-all duration-200 overflow-hidden text-left bg-white ${isOpen
                    ? 'border-brandSky/60 shadow-md ring-1 ring-brandSky/20'
                    : 'border-slate-200/90 shadow-xs hover:border-brandSky/50'
                    }`}
                >
                  <button
                    type="button"
                    onClick={() => toggleFaq(idx)}
                    className="w-full py-4 sm:py-5 px-5 sm:px-6 text-left flex items-center justify-between gap-4 cursor-pointer hover:bg-slate-50/70 transition-colors"
                    style={{ padding: '18px 24px' }}
                    aria-expanded={isOpen}
                  >
                    <span className="font-headline font-bold text-sm sm:text-base text-slate-900 leading-snug pr-2">
                      {idx + 1}. {faq.q}
                    </span>
                    <div
                      className={`w-7 h-7 sm:w-8 sm:h-8 rounded-full flex items-center justify-center shrink-0 transition-transform duration-300 ${isOpen ? 'bg-brandBlue text-white rotate-180 shadow-sm' : 'bg-slate-100 text-slate-600'
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
                        transition={{ duration: 0.25, ease: 'easeInOut' }}
                        className="overflow-hidden"
                      >
                        <div className="p-5 sm:p-6 pt-0 text-xs sm:text-sm sm:text-base text-slate-600 leading-relaxed border-t border-slate-100">
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

      {/* ─── Related Treatments in Kids Dentistry ─── */}
      <section className="py-16 sm:py-20 bg-white relative overflow-hidden border-b border-slate-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center max-w-3xl mx-auto space-y-3 mb-12"
          >
            <span className="text-xs font-bold text-brandBlue uppercase tracking-wider font-headline">
              Comprehensive Pediatric Care
            </span>
            <h2
              style={{ lineHeight: 1.4 }}
              className="text-2xl sm:text-3xl font-extrabold font-headline text-slate-900 tracking-tight leading-[1.4]"
            >
              Related Treatments in{' '}
              <span className="bg-gradient-to-r from-brandBlue to-brandSky bg-clip-text text-transparent">
                Kids Dentistry
              </span>
            </h2>
            <p className="text-slate-600 text-sm leading-relaxed">
              Explore complementary preventive and interceptive dental therapies provided by our paediatric team across Tamil Nadu.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {RELATED_TREATMENTS.map((item, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: idx * 0.1 }}
              >
                <Link
                  to={item.link}
                  className="bg-white rounded-3xl overflow-hidden border border-slate-200/90 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col group hover:border-brandSky/60 text-left h-full"
                >
                  <div className="p-3 pb-0">
                    <div className="relative rounded-2xl overflow-hidden bg-slate-50 aspect-[16/10] border border-slate-100">
                      <img
                        src={item.image}
                        alt={item.alt}
                        className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute top-2.5 left-2.5">
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-[10px] font-headline font-bold bg-white/95 text-slate-800 border border-slate-200 backdrop-blur-md shadow-xs">
                          {item.badge}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="p-5 flex-1 flex flex-col justify-between space-y-3">
                    <div>
                      <h3 className="font-headline font-bold text-base text-slate-900 group-hover:text-brandBlue transition-colors">
                        {item.title}
                      </h3>
                      <p className="text-xs text-slate-600 leading-relaxed mt-1.5 line-clamp-2">
                        {item.desc}
                      </p>
                    </div>
                    <div className="pt-2 flex items-center gap-1.5 text-xs font-bold text-brandBlue group-hover:text-brandSky transition-colors">
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

      {/* ─── Appointment Form Component ─── */}
      <TreatmentAppointmentForm
        treatmentName="Habit Breaking Appliances"
        title="Book a Pediatric Consultation"
        highlightWord="for Your Child"
        subtitle="Get compassionate, child-friendly advice from Dr. K. Shanika and our paediatric dental team at Jerush Dentofacial & Cosmetic Laser Centre."
        id="treatment-appointment-section"
      />

      {/* ─── Bottom CTA Banner (Unified Dark Navy Format with Dr. Shanika cutout) ─── */}
      <TreatmentCtaBanner
        badgeText="KIDS DENTISTRY & PEDODONTICS"
        titlePrefix="Support Healthy Dental Development at"
        highlightWord="Jerush Centres"
        titleSuffix=""
        subtitle="Early guidance can help children develop healthier oral habits and reduce the risk of certain bite problems. Book a paediatric dental consultation to discuss persistent thumb sucking, tongue thrusting, or other oral habits affecting your child's teeth."
        primaryBtnText="Book Consultation"
        primaryBtnLink="/contact"
        onPrimaryClick={handleBookClick}
        secondaryBtnText="Call Pediatric Wing: +91 94891 60000"
        secondaryBtnPhone="+919489160000"
        doctorImage="/images/doctors/shanika2.webp"
        doctorName="DR. K. SHANIKA"
        doctorRole="Dental Surgeon"
        doctorAlt="Dr. K. Shanika - Dental Surgeon and Pediatric Oral Care Specialist at Jerush"
      />
    </div>
  );
}
