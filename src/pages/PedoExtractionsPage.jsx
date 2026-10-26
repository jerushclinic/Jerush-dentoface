import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ShieldCheck, Star, ChevronDown, Calendar, Phone, CheckCircle2,
  Clock, Award, Heart, Shield, Activity, Smile, Sparkles, ArrowRight,
  Info, Check, HelpCircle, AlertCircle, MapPin, ChevronRight,
  Baby, Sparkles as SparklesIcon, CheckCheck, Users, AlertTriangle,
  Lightbulb, HeartHandshake, Stethoscope, AlertOctagon, Timer,
  Pill, UtensilsCrossed, Waves, Eye, Compass
} from 'lucide-react';
import PageBreadcrumbHero from '../components/common/PageBreadcrumbHero';
import TreatmentCtaBanner from '../components/common/TreatmentCtaBanner';
import TreatmentSectionNav from '../components/common/TreatmentSectionNav';
import TreatmentAppointmentForm from '../components/common/TreatmentAppointmentForm';
import useTreatmentScrollSpy from '../hooks/useTreatmentScrollSpy';

const STATS = [
  { value: '100% Gentle', label: 'Child-Centred Comfort' },
  { value: '0 - 14 Yrs', label: 'Infant to Teen Care' },
  { value: '188K+', label: 'Smiles Restored' },
  { value: '4 Regional Centres', label: 'Centres of Excellence' }
];

const TABS = [
  { id: 'overview', label: 'Overview' },
  { id: 'indications', label: 'When Needed' },
  { id: 'procedure', label: 'How It\'s Performed' },
  { id: 'recovery', label: 'Post-Extraction Care' },
  { id: 'space-maintainer', label: 'Permanent Teeth Impact' },
  { id: 'faqs', label: 'FAQs' }
];

// 6 Clinical Indications from PDF with 1:1 square images
const EXTRACTION_INDICATIONS = [
  {
    id: 'decay',
    number: '01',
    title: 'Severe Tooth Decay',
    desc: 'When the tooth is too damaged to be restored predictably with a pediatric filling or crown.',
    image: '/images/medical-services/dental-care/kids-dentistry-pedodontics/pedo-extractions/severe-tooth-decay.webp',
    alt: 'Severe tooth decay in child tooth requiring paediatric extraction',
    tag: 'Extensive Decay',
    clinicalFocus: 'Irreversible Enamel & Dentin Damage',
    accentBorder: 'hover:border-rose-400/70',
    badgeColor: 'bg-rose-50 text-rose-700 border-rose-200'
  },
  {
    id: 'infection',
    number: '02',
    title: 'Dental Infection',
    desc: 'When infection or abscess damage makes removal the appropriate treatment to safeguard surrounding teeth and overall health.',
    image: '/images/medical-services/dental-care/kids-dentistry-pedodontics/pedo-extractions/dental-infection.webp',
    alt: 'Dental infection and abscess in primary tooth',
    tag: 'Infection Control',
    clinicalFocus: 'Protects Developing Permanent Tooth Buds',
    accentBorder: 'hover:border-amber-400/70',
    badgeColor: 'bg-amber-50 text-amber-700 border-amber-200'
  },
  {
    id: 'trauma',
    number: '03',
    title: 'Dental Trauma',
    desc: 'When an accidental fall or impact injury has severely fractured or damaged a baby tooth beyond viable retention.',
    image: '/images/medical-services/dental-care/kids-dentistry-pedodontics/pedo-extractions/dental-trauma.webp',
    alt: 'Dental trauma and fracture from play or accident',
    tag: 'Accidental Injury',
    clinicalFocus: 'Immediate Pain Relief & Tissue Protection',
    accentBorder: 'hover:border-blue-400/70',
    badgeColor: 'bg-blue-50 text-brandBlue border-brandBlue/20'
  },
  {
    id: 'delayed-shedding',
    number: '04',
    title: 'Delayed Shedding',
    desc: 'When a stubborn baby tooth remains tightly in place and interferes with a permanent tooth\'s natural eruption path.',
    image: '/images/medical-services/dental-care/kids-dentistry-pedodontics/pedo-extractions/delayed-shedding.webp',
    alt: 'Delayed shedding of baby tooth interfering with permanent eruption',
    tag: 'Eruption Interference',
    clinicalFocus: 'Prevents Overcrowding & Ectopic Eruption',
    accentBorder: 'hover:border-indigo-400/70',
    badgeColor: 'bg-indigo-50 text-indigo-700 border-indigo-200'
  },
  {
    id: 'orthodontic',
    number: '05',
    title: 'Orthodontic Reasons',
    desc: 'In selected cases, timely removal may be part of a planned orthodontic treatment to create necessary dental arch space.',
    image: '/images/medical-services/dental-care/kids-dentistry-pedodontics/pedo-extractions/orthodontic-reasons.webp',
    alt: 'Orthodontic reasons for paediatric tooth extraction',
    tag: 'Arch Space Planning',
    clinicalFocus: 'Guides Healthy Dental Alignment',
    accentBorder: 'hover:border-cyan-400/70',
    badgeColor: 'bg-cyan-50 text-cyan-700 border-cyan-200'
  },
  {
    id: 'problematic',
    number: '06',
    title: 'Problematic Teeth',
    desc: 'When a tooth\'s abnormal position, impaction, or condition affects normal dental development and adjacent bone health.',
    image: '/images/medical-services/dental-care/kids-dentistry-pedodontics/pedo-extractions/problematic-teeth.webp',
    alt: 'Problematic tooth position affecting child dental development',
    tag: 'Developmental Risk',
    clinicalFocus: 'Ensures Healthy Jaw Development',
    accentBorder: 'hover:border-sky-400/70',
    badgeColor: 'bg-sky-50 text-brandSky border-brandSky/20'
  }
];

// 5 Clinical Procedure Steps from PDF with 1:1 square images
const PROCEDURE_STEPS = [
  {
    step: '01',
    name: 'Dental Examination',
    lead: 'The dentist checks the tooth, surrounding gums and stage of tooth development. An X-ray may be recommended when necessary.',
    details: 'Our paediatric dental specialists carry out a thorough clinical evaluation of the affected tooth, inspecting enamel integrity, surrounding gum tissue, and the position of the underlying permanent tooth germ. If required, low-dose digital imaging provides a high-resolution view of root anatomy without discomfort.',
    image: '/images/medical-services/dental-care/kids-dentistry-pedodontics/pedo-extractions/dental-examination.webp',
    alt: 'Paediatric dentist conducting dental examination on young patient',
    keyPoints: [
      'Comprehensive clinical inspection of teeth and gums',
      'Evaluation of primary root resorption and developmental stage',
      'Ultra-low-dose digital X-rays only when clinically needed'
    ]
  },
  {
    step: '02',
    name: 'Preparing the Child',
    lead: 'The procedure is explained in age-appropriate language to help the child feel more comfortable.',
    details: 'We believe paediatric dentistry should be stress-free and positive. Using child-friendly terminology, playful demonstrations, and our "Tell-Show-Do" approach, we ensure your child feels secure, informed, and completely relaxed before any treatment begins.',
    image: '/images/medical-services/dental-care/kids-dentistry-pedodontics/pedo-extractions/preparing-the-child.webp',
    alt: 'Paediatric dental team preparing child with friendly explanations',
    keyPoints: [
      'Gentle, reassuring, non-threatening communication',
      'Familiarization with instruments through friendly demonstrations',
      'Relaxed pacing adapted to your child\'s comfort level'
    ]
  },
  {
    step: '03',
    name: 'Local Anaesthesia',
    lead: 'Appropriate anaesthesia is used to numb the area when indicated.',
    details: 'A pleasantly flavoured topical numbing gel is gently applied to the gum tissue first so the child feels no pinch. Once the surface is asleep, precise local anaesthesia is administered to ensure the tooth and immediate surrounding area are thoroughly numbed throughout.',
    image: '/images/medical-services/dental-care/kids-dentistry-pedodontics/pedo-extractions/local-anaesthesia.webp',
    alt: 'Gentle application of local anaesthesia for pain-free extraction',
    keyPoints: [
      'Sweet-flavoured surface numbing gel applied first',
      'Gentle local anaesthetic ensures complete pain-free comfort',
      'Continuous verification of numbness before proceeding'
    ]
  },
  {
    step: '04',
    name: 'Tooth Removal',
    lead: 'The dentist gently removes the tooth using suitable instruments.',
    details: 'With the area completely numb, the dentist gently eases and loosens the tooth with delicate paediatric instruments. The process is quick and smooth, with the child typically feeling only light pressure and no sharp sensations.',
    image: '/images/medical-services/dental-care/kids-dentistry-pedodontics/pedo-extractions/tooth-removal.webp',
    alt: 'Dentist gently removing baby tooth using delicate paediatric instruments',
    keyPoints: [
      'Delicate, specialized paediatric extraction instruments',
      'Gentle elevation with minimal disturbance to surrounding tissues',
      'Quick, smooth procedure designed for young patients'
    ]
  },
  {
    step: '05',
    name: 'Bleeding Control & Aftercare',
    lead: 'Gauze pressure is used as needed and the parent receives instructions for recovery.',
    details: 'A clean sterile cotton gauze pad is placed over the extraction socket for the child to bite down on gently, establishing a stable healing clot. Parents receive clear, verbal and written aftercare guidance along with recovery tips for home comfort.',
    image: '/images/medical-services/dental-care/kids-dentistry-pedodontics/pedo-extractions/bleeding-control-after-care.webp',
    alt: 'Applying sterile gauze pressure and providing recovery guidance to parent',
    keyPoints: [
      'Sterile gauze applied for prompt clot formation',
      'Comprehensive verbal and written home recovery instructions',
      'Clear guidance on diet, hygiene, and emergency contact support'
    ]
  }
];

// 6 Home Care Guidelines from PDF
const RECOVERY_GUIDELINES = [
  {
    icon: CheckCheck,
    title: 'Apply Gentle Gauze Pressure',
    desc: 'Have your child bite down gently on the sterile gauze pad for the duration advised by the dentist to establish a firm blood clot.',
    category: 'Immediate Care'
  },
  {
    icon: UtensilsCrossed,
    title: 'Offer Soft, Cool Foods',
    desc: 'Provide nourishing soft, cool or lukewarm foods like yoghurt, smoothies, ice cream, porridge, or mashed potatoes once your child is ready.',
    category: 'Diet Guidance'
  },
  {
    icon: Waves,
    title: 'Avoid Rinsing & Spitting',
    desc: 'Do not allow vigorous mouth rinsing, spitting, or drinking through straws during the initial 24 hours to prevent dislodging the healing clot.',
    category: 'Clot Protection'
  },
  {
    icon: AlertOctagon,
    title: 'Avoid Hard & Crunchy Foods',
    desc: 'Keep your child away from chips, nuts, crusty bread, popcorn, and tough meats that could poke or irritate the tender extraction site.',
    category: 'Diet Guidance'
  },
  {
    icon: Pill,
    title: 'Give Medicines as Directed',
    desc: 'Administer prescribed or recommended paediatric pain relievers and medications strictly according to the dentist\'s dosage guidance.',
    category: 'Medication'
  },
  {
    icon: Smile,
    title: 'Careful Oral Hygiene',
    desc: 'Continue regular brushing and flossing for all other teeth, while carefully avoiding direct disturbance of the extraction area for the first few days.',
    category: 'Hygiene'
  }
];

// 7 Complete FAQs from PDF
const FAQS = [
  {
    q: 'Do all baby teeth need to be extracted when they become loose?',
    a: 'No. Most baby teeth fall out naturally as their roots resorb and permanent teeth push through. Extraction is only considered when there is a clear clinical reason, such as deep infection, severe trauma, significant damage, or when the baby tooth interferes with the normal development and eruption of permanent teeth.'
  },
  {
    q: 'Is tooth extraction painful for children?',
    a: 'Local anaesthesia helps numb the area completely during the procedure, so the child does not experience pain. They may feel mild pressure or gentle wiggling movements. Afterward, any tenderness is typically mild and easily managed with the dentist\'s recommended pain relief and aftercare instructions.'
  },
  {
    q: 'How long does a paediatric tooth extraction take?',
    a: 'A simple extraction is generally brief and often takes only a few minutes once the tooth is thoroughly numbed. However, the overall appointment may take longer if the child needs extra time to get comfortable, if imaging is required, or if multiple teeth are being treated.'
  },
  {
    q: 'Will my child need an X-ray before extraction?',
    a: 'Not always. The dentist recommends an X-ray when it is needed to evaluate the tooth roots, check the surrounding bone and gums, or examine the position and developmental stage of the underlying permanent tooth.'
  },
  {
    q: 'Can a badly decayed baby tooth be saved?',
    a: 'Sometimes. Depending on the extent of decay and the tooth\'s condition, a filling, paediatric pulp treatment (pulpotomy or pulpectomy), or crown may be possible. Extraction is recommended only when the tooth cannot be predictably restored or when keeping it poses a risk of infection.'
  },
  {
    q: 'Does every child need a space maintainer after extraction?',
    a: 'No. The need for a space maintainer depends on which tooth was removed, the child\'s age, how close the permanent tooth is to erupting, and the available space in the dental arch. Not every extraction requires one, so follow-up assessment with the dentist is important.'
  },
  {
    q: 'When can my child return to normal activities?',
    a: 'Many children can return to usual light activities shortly after a simple extraction once the numbness wears off and they feel comfortable. Strenuous sports or high-impact exercise should generally be avoided for the rest of the day, following the dentist\'s personalized advice.'
  }
];

// Related Treatments with uncropped clinical images
const RELATED_TREATMENTS = [
  {
    title: 'Pediatric Dental Care',
    desc: 'Comprehensive check-ups, early oral habit coaching, and cavity prevention for infants, children, and adolescents.',
    link: '/dental-care/kids-dentistry/pediatric-dental-care',
    image: '/images/medical-services/dental-care/kids-dentistry-pedodontics/pediatric-dental-care/preventive-dental-caring.webp',
    alt: 'Preventive pediatric dental caring and regular check-up guidance',
    badge: 'Foundation Care',
    badgeColor: 'bg-blue-50 text-brandBlue border-brandBlue/20',
    accentBorder: 'hover:border-blue-400/60'
  },
  {
    title: 'Space Maintainers',
    desc: 'Custom pediatric appliances that hold space open for permanent teeth when a baby tooth is removed prematurely.',
    link: '/treatments/space-maintainers',
    image: '/images/medical-services/dental-care/kids-dentistry-pedodontics/space-maintainers/space-maintainer-overview.webp',
    alt: 'Pediatric space maintainer appliance holding space for permanent tooth',
    badge: 'Space Preservation',
    badgeColor: 'bg-cyan-50 text-cyan-700 border-cyan-500/20',
    accentBorder: 'hover:border-cyan-400/60'
  },
  {
    title: 'Pulpectomy & Pulpotomy',
    desc: 'Gentle nerve-preserving therapies designed to save severely decayed baby teeth and avoid premature extraction.',
    link: '/treatments/pulpectomy',
    image: '/images/medical-services/dental-care/kids-dentistry-pedodontics/pediatric-dental-care/treatment-for-cavities.webp',
    alt: 'Pulp therapy and cavity treatment to save decayed primary teeth',
    badge: 'Nerve Therapy',
    badgeColor: 'bg-amber-50 text-amber-700 border-amber-500/20',
    accentBorder: 'hover:border-amber-400/60'
  },
  {
    title: 'Pit & Fissure Sealants',
    desc: 'Protective coatings applied to deep molar grooves to block plaque and prevent future cavities.',
    link: '/treatments/pit-fissure-sealants',
    image: '/images/medical-services/dental-care/kids-dentistry-pedodontics/pediatric-dental-care/cavity-prevention.webp',
    alt: 'Cavity prevention fluoride applications and sealants for children',
    badge: 'Cavity Barrier',
    badgeColor: 'bg-sky-50 text-brandSky border-brandSky/20',
    accentBorder: 'hover:border-brandSky/60'
  }
];

export default function PedoExtractionsPage() {
  const navigate = useNavigate();
  const [expandedFaq, setExpandedFaq] = useState(null);
  const [activeStepIndex, setActiveStepIndex] = useState(0);

  const { activeSection, scrollToSection } = useTreatmentScrollSpy(
    TABS.map(tab => tab.id),
    138
  );

  useEffect(() => {
    // Canonical SEO Setup from PDF
    document.title = 'Pedo Extractions for Children | Jerush Dental Care';

    let metaDesc = document.querySelector('meta[name="description"]');
    if (!metaDesc) {
      metaDesc = document.createElement('meta');
      metaDesc.name = 'description';
      document.head.appendChild(metaDesc);
    }
    metaDesc.content = 'Learn when children may need tooth extractions, how paediatric extractions are performed, recovery tips, and when a space maintainer may be recommended.';

    let metaKeywords = document.querySelector('meta[name="keywords"]');
    if (!metaKeywords) {
      metaKeywords = document.createElement('meta');
      metaKeywords.name = 'keywords';
      document.head.appendChild(metaKeywords);
    }
    metaKeywords.content = "Pedo extractions, Paediatric tooth extraction, baby tooth removal, children's dental extraction, primary tooth extraction, kids dentistry";

    // Inject FAQ Schema
    const faqSchemaScript = document.createElement('script');
    faqSchemaScript.type = 'application/ld+json';
    faqSchemaScript.id = 'faq-schema-pedo-extractions';
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
      const existingScript = document.getElementById('faq-schema-pedo-extractions');
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
        title="Pedo Extractions"
        breadcrumbs={[
          { label: 'Dental Care', path: '/treatments' },
          { label: 'Kids Dentistry', path: '/treatments?category=dental&sub=Kids%20Dentistry%20%2F%20Pedodontics' },
          { label: 'Pedo Extractions', active: true }
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
                  Pedo Extractions:{' '}
                  <span className="bg-gradient-to-r from-brandBlue to-brandSky bg-clip-text text-transparent">
                    Gentle Tooth Removal for Children
                  </span>
                </h1>
                <p className="text-slate-600 text-base sm:text-lg leading-relaxed mt-4">
                  Pedo extractions, also known as paediatric tooth extractions, involve removing a child's tooth when it cannot be preserved or when removal is necessary for their oral health. Although baby teeth naturally fall out, some may need to be extracted because of extensive decay, infection, dental trauma or problems with the development of permanent teeth.
                </p>
                <div className="mt-4 p-4.5 rounded-2xl bg-white/95 backdrop-blur-sm border border-slate-200/90 shadow-sm">
                  <p className="text-slate-700 text-sm sm:text-base leading-relaxed">
                    At <strong className="text-slate-900 font-semibold">Jerush Dentofacial & Cosmetic Laser Centre</strong>, the decision to remove a child's tooth is based on its condition, the child's stage of dental development, and the potential effect on the surrounding teeth. Whenever possible, preserving a baby tooth is considered to support normal chewing and maintain space for the permanent tooth.
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
                  <span>Painless Local Numbing</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Check className="w-4 h-4 text-brandBlue shrink-0" />
                  <span>Preservation-First Clinical Approach</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Check className="w-4 h-4 text-brandBlue shrink-0" />
                  <span>Child-Friendly & Fear-Free Care</span>
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
                {/* 16:9 Aspect container matches the native 1672x941 image perfectly without cropping! */}
                <div className="relative rounded-2xl overflow-hidden bg-slate-50 aspect-[16/10] sm:aspect-[16/9]">
                  <img
                    src="/images/medical-services/dental-care/kids-dentistry-pedodontics/pedo-extractions/Gentle-pediatric-tooth-extraction.webp"
                    alt="Paediatric dentist preparing for a child's tooth extraction in a child-friendly dental clinic."
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
        treatmentName="Pedo Extractions"
        title="Book a Paediatric Dental Consultation"
        highlightWord="For Your Child"
        subtitle="Discuss your child's tooth pain, damaged baby tooth, or delayed shedding with our gentle paediatric dental team across Tamil Nadu."
        features={[
          {
            icon: Smile,
            title: 'Child-Centred Comfort',
            desc: 'Gentle, reassuring language, surface-numbing gels, and calm pacing tailored for anxious young patients.'
          },
          {
            icon: Award,
            title: 'Paediatric Dental Specialists',
            desc: 'Experienced dental surgeons focused on primary dentition, growth patterns, and jaw development.'
          },
          {
            icon: ShieldCheck,
            title: 'Space Preservation Focus',
            desc: 'Comprehensive clinical assessment to determine whether a space maintainer is needed for permanent teeth.'
          },
          {
            icon: MapPin,
            title: '4 Regional Centres',
            desc: 'Direct specialist appointments available across Thuckalay, Trichy, Chennai, and regional hubs.'
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
        className="w-full py-16 lg:py-22 bg-gradient-to-b from-slate-50 via-sky-50/20 to-white relative scroll-mt-28 border-b border-slate-200/70 overflow-hidden"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Section Header */}
          <div className="max-w-3xl mb-12 text-left">
            <span className="text-xs font-bold text-brandBlue uppercase tracking-wider font-headline block mb-2.5">
              Clinical Insights
            </span>
            <h2
              style={{ lineHeight: 1.4 }}
              className="text-2xl sm:text-3xl lg:text-[36px] font-extrabold font-headline text-slate-900 tracking-tight leading-[1.4]"
            >
              Overview of{' '}
              <span className="bg-gradient-to-r from-brandBlue to-brandSky bg-clip-text text-transparent">
                Pedo Extractions
              </span>
            </h2>
            <p className="text-slate-600 text-sm sm:text-base leading-relaxed mt-3.5">
              Understanding why and how paediatric tooth extractions are performed with utmost gentle care, safety, and attention to long-term dental health.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
            {/* Left: Full Landscape Image Card - 16:9 ratio ensures entire image is visible without cutoffs */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="lg:col-span-6 space-y-4"
            >
              <div className="relative rounded-3xl overflow-hidden bg-white border border-slate-200/90 shadow-xl p-2.5 sm:p-3 group">
                <div className="relative rounded-2xl overflow-hidden bg-slate-100 aspect-[16/10] sm:aspect-[16/9]">
                  <img
                    src="/images/medical-services/dental-care/kids-dentistry-pedodontics/pedo-extractions/overview.webp"
                    alt="Paediatric dentist reviewing dental care and teeth condition for a child"
                    className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700"
                  />
                </div>
              </div>

              {/* Three Key Pillar Badges */}
              <div className="grid grid-cols-3 gap-3 pt-1">
                <div className="p-3 rounded-2xl bg-white border border-slate-200/80 shadow-xs text-center">
                  <Heart className="w-5 h-5 text-brandSky mx-auto mb-1.5" />
                  <p className="text-xs font-headline font-bold text-slate-900">Patient Comfort</p>
                  <p className="text-[11px] text-slate-500 mt-0.5">Pain-free experience</p>
                </div>
                <div className="p-3 rounded-2xl bg-white border border-slate-200/80 shadow-xs text-center">
                  <ShieldCheck className="w-5 h-5 text-brandBlue mx-auto mb-1.5" />
                  <p className="text-xs font-headline font-bold text-slate-900">Safety First</p>
                  <p className="text-[11px] text-slate-500 mt-0.5">Strict sterilization</p>
                </div>
                <div className="p-3 rounded-2xl bg-white border border-slate-200/80 shadow-xs text-center">
                  <Compass className="w-5 h-5 text-cyan-600 mx-auto mb-1.5" />
                  <p className="text-xs font-headline font-bold text-slate-900">Space Guided</p>
                  <p className="text-[11px] text-slate-500 mt-0.5">Protects permanent buds</p>
                </div>
              </div>
            </motion.div>

            {/* Right: Detailed Content Cards from PDF */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="lg:col-span-6 space-y-5"
            >
              <div className="p-6 rounded-2xl bg-white border border-slate-200/90 shadow-sm space-y-3">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-xl bg-brandBlue/10 flex items-center justify-center text-brandBlue">
                    <Info className="w-4 h-4" />
                  </div>
                  <h3 className="font-headline font-bold text-base sm:text-lg text-slate-900">
                    Why Children Sometimes Need a Tooth Removed
                  </h3>
                </div>
                <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
                  Children sometimes need a tooth removed to prevent discomfort, manage dental infections, or make way for healthy dental development. Pedo extractions are carried out specifically for children, with attention to their comfort, safety, and individual dental needs.
                </p>
                <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
                  Depending on the situation, the dentist may recommend removing a badly damaged baby tooth, a loose tooth that is not shedding properly or a tooth affecting the eruption of permanent teeth.
                </p>
              </div>

              <div className="p-6 rounded-2xl bg-gradient-to-br from-sky-50/70 via-blue-50/40 to-white border border-brandSky/30 shadow-sm space-y-3">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-xl bg-brandSky/20 flex items-center justify-center text-brandBlue">
                    <Shield className="w-4 h-4" />
                  </div>
                  <h3 className="font-headline font-bold text-base sm:text-lg text-slate-900">
                    Preservation is Always Considered First
                  </h3>
                </div>
                <p className="text-slate-700 text-sm sm:text-base leading-relaxed">
                  At <strong className="text-slate-900">Jerush Dentofacial & Cosmetic Laser Centre</strong>, extraction is never the default option. Whenever possible, preserving a baby tooth is considered to support normal chewing, facilitate speech development, and maintain natural spacing for the underlying permanent tooth.
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ─── SECTION 2: When Might a Child Need a Tooth Extraction? (id="indications") ─── */}
      <section
        id="indications"
        className="w-full py-16 lg:py-24 bg-white relative scroll-mt-28 border-b border-slate-200/70 overflow-hidden"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Section Header */}
          <div className="max-w-3xl mb-12 text-left">
            <span className="text-xs font-bold text-brandBlue uppercase tracking-wider font-headline block mb-2.5">
              Clinical Assessment
            </span>
            <h2
              style={{ lineHeight: 1.4 }}
              className="text-2xl sm:text-3xl lg:text-[36px] font-extrabold font-headline text-slate-900 tracking-tight leading-[1.4]"
            >
              When Might a Child Need a{' '}
              <span className="bg-gradient-to-r from-brandBlue to-brandSky bg-clip-text text-transparent">
                Tooth Extraction?
              </span>
            </h2>
            <p className="text-slate-600 text-sm sm:text-base leading-relaxed mt-3.5">
              A paediatric dentist may recommend extraction in specific situations where preserving the tooth is no longer viable or poses a risk to oral health:
            </p>
          </div>

          {/* 6 Indications Grid: 1:1 Square Images with aspect-square ensures complete image is visible! */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {EXTRACTION_INDICATIONS.map((item, index) => (
              <motion.div
                key={item.id}
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
                    <h3 className="font-headline font-bold text-lg text-slate-900 group-hover:text-brandBlue transition-colors">
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

          {/* Clinical Note Callout Banner from PDF */}
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
                  Clinical Reassurance for Parents
                </h4>
                <p className="text-slate-700 text-sm sm:text-base leading-relaxed">
                  <strong className="text-slate-900">Not every loose, decayed or delayed baby tooth needs extraction.</strong> The dentist examines the tooth thoroughly and may recommend restorative treatment, preventive care, or gentle monitoring when appropriate.
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

      {/* ─── SECTION 3: How Is a Paediatric Tooth Extraction Performed? (id="procedure") ─── */}
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
              How Is a Paediatric{' '}
              <span className="bg-gradient-to-r from-brandBlue to-brandSky bg-clip-text text-transparent">
                Tooth Extraction Performed?
              </span>
            </h2>
            <p className="text-slate-600 text-sm sm:text-base leading-relaxed mt-3.5">
              The procedure is adapted to the child's age, comfort level, medical history, and the tooth being treated. Explore our gentle five-step approach:
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

          {/* Anxiety Management & Guidance Callout from PDF */}
          <div className="mt-10 p-5 rounded-2xl bg-white border border-slate-200/90 shadow-xs flex items-center gap-3.5">
            <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center shrink-0 border border-amber-200">
              <HeartHandshake className="w-5 h-5" />
            </div>
            <p className="text-slate-700 text-xs sm:text-sm leading-relaxed">
              <strong className="text-slate-900 font-semibold">Special Care for Anxious Children:</strong> Some children may require additional behaviour guidance or other anxiety-management options, depending on their needs and the complexity of treatment. Our caring staff ensures a peaceful, supportive experience.
            </p>
          </div>
        </div>
      </section>

      {/* ─── SECTION 4: Caring for Your Child After Extraction (id="recovery") ─── */}
      <section
        id="recovery"
        className="w-full py-16 lg:py-24 bg-white relative scroll-mt-28 border-b border-slate-200/70 overflow-hidden"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Section Header */}
          <div className="max-w-3xl mb-12 text-left">
            <span className="text-xs font-bold text-brandBlue uppercase tracking-wider font-headline block mb-2.5">
              Recovery & Home Care
            </span>
            <h2
              style={{ lineHeight: 1.4 }}
              className="text-2xl sm:text-3xl lg:text-[36px] font-extrabold font-headline text-slate-900 tracking-tight leading-[1.4]"
            >
              Caring for Your Child{' '}
              <span className="bg-gradient-to-r from-brandBlue to-brandSky bg-clip-text text-transparent">
                After Extraction
              </span>
            </h2>
            <p className="text-slate-600 text-sm sm:text-base leading-relaxed mt-3.5">
              Most children recover well after a straightforward extraction. Following the dentist's instructions helps protect the extraction site while it heals.
            </p>
          </div>

          {/* Hero Caring Image & Guidelines Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center mb-12">
            {/* 16:9 Landscape Caring Image: Complete View with No Cutoffs */}
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
                    src="/images/medical-services/dental-care/kids-dentistry-pedodontics/pedo-extractions/caring-for-your-child.webp"
                    alt="Parent lovingly caring for child at home following dental extraction"
                    className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700"
                  />
                </div>
              </div>
              <div className="mt-3 text-center">
                <span className="text-xs text-slate-500 font-medium">
                  Gentle home care ensures smooth, rapid healing within 24 to 48 hours.
                </span>
              </div>
            </motion.div>

            {/* Quick 6-Guideline Cards */}
            <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-4">
              {RECOVERY_GUIDELINES.map((item, index) => {
                const IconComponent = item.icon;
                return (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 15 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: index * 0.07 }}
                    className="p-4 sm:p-5 rounded-2xl bg-slate-50/80 border border-slate-200/80 hover:bg-white hover:border-brandSky/50 hover:shadow-md transition-all duration-300 space-y-2 group"
                  >
                    <div className="flex items-center justify-between">
                      <div className="w-8 h-8 rounded-xl bg-brandBlue/10 text-brandBlue flex items-center justify-center group-hover:bg-brandBlue group-hover:text-white transition-colors">
                        <IconComponent className="w-4 h-4" />
                      </div>
                      <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider font-headline">
                        {item.category}
                      </span>
                    </div>
                    <h3 className="font-headline font-bold text-sm sm:text-base text-slate-900 group-hover:text-brandBlue transition-colors">
                      {item.title}
                    </h3>
                    <p className="text-slate-600 text-xs leading-relaxed">
                      {item.desc}
                    </p>
                  </motion.div>
                );
              })}
            </div>
          </div>

          {/* Emergency Alert & Caution Box from PDF */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="p-6 sm:p-8 rounded-3xl bg-rose-50/90 border border-rose-200 shadow-sm space-y-4"
          >
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-2xl bg-rose-600 text-white flex items-center justify-center shrink-0 shadow-md">
                  <AlertOctagon className="w-6 h-6" />
                </div>
                <div className="space-y-1">
                  <h4 className="font-headline font-bold text-base sm:text-lg text-rose-950">
                    When to Contact the Dental Team Immediately
                  </h4>
                  <p className="text-rose-900 text-xs sm:text-sm leading-relaxed">
                    Contact the dental team if bleeding does not settle after persistent gauze pressure, pain becomes severe or worsens, or swelling or fever develops.
                  </p>
                  <p className="text-rose-800 text-xs sm:text-sm font-semibold">
                    Important: Significant facial swelling or difficulty swallowing or breathing requires urgent medical attention.
                  </p>
                </div>
              </div>
              <a
                href="tel:+919489160000"
                className="shrink-0 inline-flex items-center gap-2 px-5 py-3 rounded-full bg-rose-600 hover:bg-rose-700 text-white font-headline font-bold text-xs uppercase tracking-wider transition-colors shadow-md"
              >
                <Phone className="w-4 h-4" />
                <span>Call Emergency Helpline</span>
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ─── SECTION 5: Will Removing a Baby Tooth Affect Permanent Teeth? (id="space-maintainer") ─── */}
      <section
        id="space-maintainer"
        className="w-full py-16 lg:py-24 bg-gradient-to-b from-slate-50 via-sky-50/20 to-white relative scroll-mt-28 border-b border-slate-200/70 overflow-hidden"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Section Header */}
          <div className="max-w-3xl mb-12 text-left">
            <span className="text-xs font-bold text-brandBlue uppercase tracking-wider font-headline block mb-2.5">
              Developmental Guide
            </span>
            <h2
              style={{ lineHeight: 1.4 }}
              className="text-2xl sm:text-3xl lg:text-[36px] font-extrabold font-headline text-slate-900 tracking-tight leading-[1.4]"
            >
              Will Removing a Baby Tooth{' '}
              <span className="bg-gradient-to-r from-brandBlue to-brandSky bg-clip-text text-transparent">
                Affect Permanent Teeth?
              </span>
            </h2>
            <p className="text-slate-600 text-sm sm:text-base leading-relaxed mt-3.5">
              Baby teeth play a vital developmental role beyond chewing. Learn how our clinicians protect future dental alignment and space.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
            {/* Extracted Anatomical Dentition Model Image: Full view without any half cropping */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="lg:col-span-5"
            >
              <div className="relative rounded-3xl overflow-hidden bg-white border border-slate-200/90 shadow-xl p-4 sm:p-6 group text-center">
                {/* Background soft glow */}
                <div className="absolute inset-0 bg-gradient-to-br from-sky-50/50 via-white to-blue-50/30 -z-10" />

                <div className="relative mx-auto rounded-2xl overflow-hidden bg-white max-w-[380px] p-2">
                  <img
                    src="/images/medical-services/dental-care/kids-dentistry-pedodontics/pedo-extractions/primary-permanent-teeth-space.webp"
                    alt="Dental anatomical model showing primary teeth and developing permanent teeth buds inside jawbone"
                    className="w-full h-auto object-contain mx-auto group-hover:scale-105 transition-transform duration-500"
                  />
                </div>

                <div className="mt-4 pt-3 border-t border-slate-100">
                  <p className="text-xs font-headline font-bold text-slate-800">
                    Anatomical Dentition Architecture
                  </p>
                  <p className="text-[11px] text-slate-500 mt-0.5">
                    Primary teeth preserve exact arch width and guide developing permanent teeth buds.
                  </p>
                </div>
              </div>
            </motion.div>

            {/* Content & Clinical Principles from PDF */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="lg:col-span-7 space-y-6"
            >
              <div className="space-y-4">
                <div className="p-6 rounded-2xl bg-white border border-slate-200/90 shadow-sm space-y-3">
                  <h3 className="font-headline font-bold text-lg text-slate-900">
                    Baby Teeth Act as Natural Space Keepers
                  </h3>
                  <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
                    Baby teeth help children chew, speak, and maintain space for permanent teeth. When a baby tooth is removed earlier than expected, the dentist considers whether a <strong className="text-slate-900">space maintainer</strong> may be needed to reduce the risk of neighbouring teeth drifting into the empty space.
                  </p>
                </div>

                <div className="p-6 rounded-2xl bg-white border border-slate-200/90 shadow-sm space-y-3">
                  <h3 className="font-headline font-bold text-lg text-slate-900">
                    When is a Space Maintainer Necessary?
                  </h3>
                  <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
                    The need for a space maintainer depends on which tooth was removed, the child's age, the development of the permanent tooth, and the available space in the dental arch. Not every extraction requires one, so follow-up assessment is important.
                  </p>
                </div>
              </div>

              {/* Assessment Factors Pills */}
              <div className="p-5 rounded-2xl bg-gradient-to-r from-sky-50/70 to-blue-50/50 border border-brandSky/30 space-y-3">
                <p className="text-xs font-bold text-brandBlue uppercase tracking-wider font-headline">
                  Factors Our Specialists Evaluate:
                </p>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                  <div className="p-2.5 rounded-xl bg-white border border-slate-200/80 text-center shadow-2xs">
                    <p className="text-[11px] font-bold text-slate-800">Tooth Position</p>
                    <p className="text-[10px] text-slate-500">Molar vs Incisor</p>
                  </div>
                  <div className="p-2.5 rounded-xl bg-white border border-slate-200/80 text-center shadow-2xs">
                    <p className="text-[11px] font-bold text-slate-800">Child's Age</p>
                    <p className="text-[10px] text-slate-500">Growth Timeline</p>
                  </div>
                  <div className="p-2.5 rounded-xl bg-white border border-slate-200/80 text-center shadow-2xs">
                    <p className="text-[11px] font-bold text-slate-800">Bud Eruption</p>
                    <p className="text-[10px] text-slate-500">Root Formation</p>
                  </div>
                  <div className="p-2.5 rounded-xl bg-white border border-slate-200/80 text-center shadow-2xs">
                    <p className="text-[11px] font-bold text-slate-800">Arch Spacing</p>
                    <p className="text-[10px] text-slate-500">Crowding Risk</p>
                  </div>
                </div>
              </div>

              {/* Space Maintainers Service CTA Link */}
              <div className="pt-1 flex items-center gap-4">
                <Link
                  to="/treatments/space-maintainers"
                  className="inline-flex items-center gap-2 text-sm font-headline font-bold text-brandBlue hover:text-brandSky transition-colors group"
                >
                  <span>Learn more about Pediatric Space Maintainers</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ─── SECTION 6: Related Kids Dentistry Treatments ─── */}
      <section className="w-full py-16 lg:py-20 bg-white relative border-b border-slate-200/70 overflow-hidden">
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
                className={`flex flex-col bg-slate-50/70 rounded-3xl overflow-hidden border border-slate-200/90 ${item.accentBorder} hover:bg-white hover:shadow-xl transition-all duration-300 group`}
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

                  <div className="pt-3 border-t border-slate-200/80 flex items-center justify-between text-xs font-headline font-bold text-brandBlue group-hover:text-brandSky transition-colors">
                    <span>Explore treatment</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ─── SECTION 7: Frequently Asked Questions (id="faqs") ─── */}
      <section id="faqs" className="w-full py-16 lg:py-24 bg-gradient-to-b from-slate-50 via-sky-50/20 to-white relative scroll-mt-28 overflow-hidden">
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
              Find answers to the most common questions parents ask about paediatric tooth extractions, comfort, healing, and space maintainers.
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

      {/* ─── Bottom CTA Banner (Dr. Priyadharshini Cutout & User Rule Compliant Dark Navy Format) ─── */}
      <TreatmentCtaBanner
        badgeText="PAEDIATRIC DENTAL CARE"
        titlePrefix="Gentle Paediatric"
        highlightWord="Dental Care"
        titleSuffix="at Jerush"
        subtitle="When a tooth needs to be removed, the priority is to protect your child's comfort and support healthy dental development. Jerush Dentofacial & Cosmetic Laser Centre provides individualised dental care based on the child's needs and clinical findings."
        primaryBtnText="Book a Paediatric Dental Consultation"
        onPrimaryClick={handleBookClick}
        secondaryBtnText="Call +91 94891 60000"
        secondaryBtnPhone="+919489160000"
        doctorImage="/images/doctors/priya2.webp"
        doctorName="DR. PRIYADHARSHINI"
        doctorRole="Dental Surgeon (BDS)"
        doctorAlt="DR. PRIYADHARSHINI - Dental Surgeon at Jerush Dentofacial & Cosmetic Laser Centre"
      />
    </div>
  );
}
