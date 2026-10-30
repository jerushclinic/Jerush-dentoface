import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Sparkles, Star, Heart, Gem, ShieldCheck, Calendar, Phone,
  CheckCircle2, Clock, Award, Smile, ArrowRight, Info, Check,
  HelpCircle, AlertCircle, MapPin, ChevronRight, ChevronDown,
  Eye, Compass, Shield, Stethoscope, AlertTriangle, Layers,
  CheckSquare, Activity, Waves, Sparkle, RefreshCw, Scissors
} from 'lucide-react';
import PageBreadcrumbHero from '../components/common/PageBreadcrumbHero';
import TreatmentCtaBanner from '../components/common/TreatmentCtaBanner';
import TreatmentSectionNav from '../components/common/TreatmentSectionNav';
import TreatmentAppointmentForm from '../components/common/TreatmentAppointmentForm';
import useTreatmentScrollSpy from '../hooks/useTreatmentScrollSpy';

const STATS = [
  { value: '0% Enamel Loss', label: '100% Drill-Free Bonding' },
  { value: '10 - 15 Mins', label: 'Quick Single-Visit Care' },
  { value: '100% Reversible', label: 'Professional Safe Removal' },
  { value: '4 Regional Centres', label: 'Centres of Excellence' }
];

const TABS = [
  { id: 'designs', label: 'Jewellery Designs' },
  { id: 'why-consider', label: 'Why Consider' },
  { id: 'placement', label: 'Tooth Placement' },
  { id: 'procedure', label: 'Bonding Steps' },
  { id: 'safety-aftercare', label: 'Risks & Aftercare' },
  { id: 'faqs', label: 'FAQs' }
];

// 4 Designs from PDF Page 1 & 2
const DESIGNS = [
  {
    id: 'crystal-gems',
    title: 'Crystal Tooth Gems',
    subtitle: 'Classic Brilliant Radiance',
    desc: 'Small, clear crystals create a subtle sparkle and are often chosen for a minimalist appearance that catches natural light with elegant brilliance.',
    image: '/images/medical-services/dental-care/cosmetic-dentistry/tooth-jewellery/crystal-tooth-gems.webp',
    alt: 'Small clear crystal tooth gem creating a subtle sparkle on upper front tooth',
    tag: 'Minimalist Sparkle',
    icon: Gem,
    accentBorder: 'hover:border-sky-400/70',
    badgeColor: 'bg-sky-50 text-brandSky border-brandSky/20',
    features: [
      'Precision-faceted light refraction',
      'Ultra-thin profile for natural lip comfort',
      'Ideal for front incisors and canines'
    ]
  },
  {
    id: 'gold-designs',
    title: 'Gold-Coloured Designs',
    subtitle: 'Warm Metallic Distinction',
    desc: 'Small decorative shapes provide a distinctive look for people who prefer a warmer metallic finish, crafted with medical-grade biocompatible dental alloys.',
    image: '/images/medical-services/dental-care/cosmetic-dentistry/tooth-jewellery/gold-coloured-designs.webp',
    alt: 'Gold-coloured decorative tooth jewellery design on natural enamel',
    tag: 'Warm Metallic Finish',
    icon: Sparkles,
    accentBorder: 'hover:border-amber-400/70',
    badgeColor: 'bg-amber-50 text-amber-700 border-amber-300/40',
    features: [
      'Biocompatible certified dental grade alloy',
      'Warm luxury sheen that does not tarnish',
      'Smooth edges to avoid soft-tissue friction'
    ]
  },
  {
    id: 'star-heart-shapes',
    title: 'Star & Heart Designs',
    subtitle: 'Expressive Custom Accents',
    desc: 'Shaped accessories offer a more expressive option, depending on the designs available, allowing you to showcase an artistic, personalized smile silhouette.',
    image: '/images/medical-services/dental-care/cosmetic-dentistry/tooth-jewellery/star-and-heart-designs.webp',
    alt: 'Star and heart shaped decorative dental accessories for cosmetic smile enhancement',
    tag: 'Expressive Shapes',
    icon: Heart,
    accentBorder: 'hover:border-rose-400/70',
    badgeColor: 'bg-rose-50 text-rose-700 border-rose-300/40',
    features: [
      'Micro-contoured star and heart silhouettes',
      'Fun, personalized smile customization',
      'Polished surface prevents plaque accumulation'
    ]
  },
  {
    id: 'multiple-gems',
    title: 'Multiple-Gem Arrangements',
    subtitle: 'Curated Harmonious Patterns',
    desc: 'More than one gem may be considered in selected cases, provided the placement is suitable for the teeth and does not compromise cleaning or comfort.',
    image: '/images/medical-services/dental-care/cosmetic-dentistry/tooth-jewellery/multiple-gem-arrangements.webp',
    alt: 'Multiple-gem dental arrangement placed carefully on front teeth',
    tag: 'Curated Patterns',
    icon: Star,
    accentBorder: 'hover:border-indigo-400/70',
    badgeColor: 'bg-indigo-50 text-indigo-700 border-indigo-300/40',
    features: [
      'Dual-gem or constellation accent layouts',
      'Clinically planned for balanced aesthetics',
      'Calculated spacing for easy daily flossing'
    ]
  }
];

// 5 Reasons from PDF Page 2
const WHY_CONSIDER_REASONS = [
  {
    id: 'personal-expression',
    title: 'Personal Expression',
    lead: 'A Reflective Style Statement',
    desc: 'Choose a decorative feature that reflects your preferred style, adding unique character and aesthetic flair to your natural smile.',
    image: '/images/medical-services/dental-care/cosmetic-dentistry/tooth-jewellery/personal-expression.webp',
    alt: 'Personal expression through custom tooth jewellery design',
    tag: 'Distinctive Style',
    accentBorder: 'hover:border-blue-400/70',
    badgeColor: 'bg-blue-50 text-brandBlue border-brandBlue/20'
  },
  {
    id: 'subtle-enhancement',
    title: 'A Subtle Enhancement',
    lead: 'Understated Visual Detail',
    desc: 'A single crystal can add a small visual detail without changing the overall appearance of your smile significantly or altering dental anatomy.',
    image: '/images/medical-services/dental-care/cosmetic-dentistry/tooth-jewellery/subtle-enhancement.webp',
    alt: 'Subtle enhancement with small tooth crystal on lateral incisor',
    tag: 'Natural Understatement',
    accentBorder: 'hover:border-sky-400/70',
    badgeColor: 'bg-sky-50 text-brandSky border-brandSky/20'
  },
  {
    id: 'minimal-intervention',
    title: 'Minimal Intervention',
    lead: 'Zero Drilling or Enamel Removal',
    desc: 'Placement may be possible without drilling or removing healthy enamel in suitable cases, preserving your natural tooth structure 100% intact.',
    image: '/images/medical-services/dental-care/cosmetic-dentistry/tooth-jewellery/minimal-intervention.webp',
    alt: 'Minimal intervention cosmetic dental placement preserving natural tooth enamel',
    tag: '100% Non-Invasive',
    accentBorder: 'hover:border-emerald-400/70',
    badgeColor: 'bg-emerald-50 text-emerald-700 border-emerald-300/40'
  },
  {
    id: 'flexible-design-choices',
    title: 'Flexible Design Choices',
    lead: 'Tailored Sizes, Shapes & Positions',
    desc: 'Different shapes, sizes, and positions can create different visual effects, allowing you to choose the exact sparkle that suits your facial profile.',
    image: '/images/medical-services/dental-care/cosmetic-dentistry/tooth-jewellery/flexible-design-choices.webp',
    alt: 'Flexible tooth jewellery choices in various shapes and sizes',
    tag: 'Custom Versatility',
    accentBorder: 'hover:border-purple-400/70',
    badgeColor: 'bg-purple-50 text-purple-700 border-purple-300/40'
  },
  {
    id: 'removable-accessory',
    title: 'Removable Cosmetic Accessory',
    lead: 'Reversible at Any Time',
    desc: 'A dentist can generally remove the jewellery professionally if you decide you no longer want it, restoring the tooth surface seamlessly.',
    image: '/images/medical-services/dental-care/cosmetic-dentistry/tooth-jewellery/removable-cosmetic-accessory.webp',
    alt: 'Dentist professionally removing tooth jewellery safely without enamel damage',
    tag: 'Fully Reversible',
    accentBorder: 'hover:border-cyan-400/70',
    badgeColor: 'bg-cyan-50 text-cyan-700 border-cyan-300/40'
  }
];

// 5 Placement Factors from PDF Page 3
const PLACEMENT_FACTORS = [
  {
    number: '01',
    title: 'Visibility',
    lead: 'Smile Line Dynamics',
    desc: 'Whether the gem will be noticeable when you smile or speak naturally. Dentists observe high and medium smile lines to find the optical sweet spot.',
    image: '/images/medical-services/dental-care/cosmetic-dentistry/tooth-jewellery/visibility.webp',
    alt: 'Visibility analysis of tooth jewellery during natural smiling and speaking',
    tag: 'Smile Line',
    clinicalFocus: 'Upper Central & Lateral Incisors'
  },
  {
    number: '02',
    title: 'Bite Contact',
    lead: 'Occlusal Clearance',
    desc: 'Whether the accessory could come into contact with opposing teeth during chewing or jaw movement. Placed strictly in clearance zones to prevent impact.',
    image: '/images/medical-services/dental-care/cosmetic-dentistry/tooth-jewellery/bite-contact.webp',
    alt: 'Dentist evaluating bite contact and occlusal clearance for tooth jewellery',
    tag: 'Bite Safety',
    clinicalFocus: 'Zero Opposing Incisal Contact'
  },
  {
    number: '03',
    title: 'Surface Suitability',
    lead: 'Healthy Enamel Foundation',
    desc: 'Whether the natural enamel or existing restoration provides an appropriate, durable bonding surface for medical-grade resin adhesion.',
    image: '/images/medical-services/dental-care/cosmetic-dentistry/tooth-jewellery/surface-suitability.webp',
    alt: 'Dental evaluation of enamel surface suitability for cosmetic bonding',
    tag: 'Enamel Health',
    clinicalFocus: 'Sound, Uncompromised Enamel'
  },
  {
    number: '04',
    title: 'Cleaning Access',
    lead: 'Hygiene & Floss Maintenance',
    desc: 'Whether the area around the gem can be cleaned thoroughly with daily brushing and flossing so dental plaque cannot gather along the margins.',
    image: '/images/medical-services/dental-care/cosmetic-dentistry/tooth-jewellery/cleaning-access.webp',
    alt: 'Checking cleaning access around tooth jewellery for optimal oral hygiene',
    tag: 'Oral Hygiene',
    clinicalFocus: 'Unrestricted Interdental Flossing'
  },
  {
    number: '05',
    title: 'Personal Preference',
    lead: 'Your Aesthetic Goal',
    desc: 'Whether you prefer a discreet, understated accent on a lateral incisor or a bolder, more noticeable design centred on your canine or central tooth.',
    image: '/images/medical-services/dental-care/cosmetic-dentistry/tooth-jewellery/personal-preference.webp',
    alt: 'Patient expressing personal preference for tooth jewellery design and location',
    tag: 'Individual Taste',
    clinicalFocus: 'Discreet vs. Expressive Focal Point'
  }
];

// 5 Step Bonding Procedure from PDF Page 3 & 4
const PROCEDURE_STEPS = [
  {
    step: '01',
    name: 'Dental Examination',
    lead: 'Assessing Oral Health & Enamel Integrity',
    details: 'The dentist examines the selected tooth and surrounding gums. Active tooth decay, gum disease, cracks, or other concerns must be evaluated and treated before cosmetic placement.',
    image: '/images/medical-services/dental-care/cosmetic-dentistry/tooth-jewellery/dental-examination.webp',
    alt: 'Cosmetic dentist conducting dental examination prior to tooth jewellery placement',
    keyPoints: [
      'Comprehensive assessment of enamel thickness and gum tissue health',
      'Verification of absence of cavities or active tartar along margins',
      'Smile symmetry and bite excursion check to prevent opposing friction'
    ]
  },
  {
    step: '02',
    name: 'Cleaning and Isolation',
    lead: 'Pumice Cleansing & Moisture Control',
    details: 'The tooth surface is thoroughly cleaned to remove microscopic biofilm, and the area is kept completely dry as required by the bonding system. Moisture control is critical because contamination can weaken resin adherence.',
    image: '/images/medical-services/dental-care/cosmetic-dentistry/tooth-jewellery/cleaning-and-isolation.webp',
    alt: 'Cleaning tooth surface and isolating area with cotton rolls for moisture control',
    keyPoints: [
      'Gentle mechanical cleansing with medical pumice paste',
      'Isolation using soft dental rolls or lip retractor to ensure zero saliva contact',
      'Warm air stream drying to ensure a pristine microscopic bonding surface'
    ]
  },
  {
    step: '03',
    name: 'Surface Conditioning',
    lead: 'Targeted Conditioning & Bonding Agent',
    details: 'Depending on the product and technique, the enamel may be conditioned with a gentle dental etching agent to create micro-pores for mechanical interlocking. A suitable bonding resin is then applied according to manufacturer instructions.',
    image: '/images/medical-services/dental-care/cosmetic-dentistry/tooth-jewellery/surface-conditioning.webp',
    alt: 'Applying dental etching and conditioning agent to tooth surface for jewellery bonding',
    keyPoints: [
      'Microscopic enamel conditioning without invasive drilling',
      'Application of dental adhesive bonding resin',
      'Gentle air thinning for uniform adhesive film thickness'
    ]
  },
  {
    step: '04',
    name: 'Jewellery Placement',
    lead: 'Precision Alignment & Angle Check',
    details: 'The selected crystal or gold accessory is positioned carefully using a compatible dental composite bonding material. The dentist checks its orientation, level, and optical angle before completing the cure.',
    image: '/images/medical-services/dental-care/cosmetic-dentistry/tooth-jewellery/jewellery-placement.webp',
    alt: 'Specialist placing decorative dental jewellery on tooth with micro-forceps',
    keyPoints: [
      'Micro-instrument positioning for millimeter precision',
      'Removal of any excess bonding material around the base',
      'Patient approval of reflection angle in handheld dental mirror'
    ]
  },
  {
    step: '05',
    name: 'Setting and Final Checks',
    lead: 'Light-Curing & Bite Verification',
    details: 'A specialized dental blue curing light helps polymerize and set the bonding resin securely in seconds. The dentist then verifies comfort, smooth perimeter margins, and bite clearance to confirm zero unwanted occlusal contact.',
    image: '/images/medical-services/dental-care/cosmetic-dentistry/tooth-jewellery/setting-and-final-checks.webp',
    alt: 'Dentist light curing tooth jewellery bonding material and checking bite',
    keyPoints: [
      'High-intensity LED curing light secures the bond permanently',
      'Articulating paper check ensures no tooth strikes the gem when chewing',
      'Post-procedure instructions provided for daily care and longevity'
    ]
  }
];

// 6 Potential Concerns from PDF Page 4 & 5
const RISKS_AND_CONCERNS = [
  {
    id: 'plaque-accumulation',
    title: 'Plaque Accumulation',
    desc: 'Debris may collect around the jewellery or bonding material if daily cleaning is inadequate. Maintaining diligent brushing is essential.',
    image: '/images/medical-services/dental-care/cosmetic-dentistry/tooth-jewellery/plaque-accumulation.webp',
    alt: 'Checking plaque accumulation around tooth jewellery margin',
    badge: 'Hygiene Essential',
    badgeColor: 'bg-amber-50 text-amber-700 border-amber-300/40'
  },
  {
    id: 'gum-irritation',
    title: 'Gum Irritation',
    desc: 'Poor positioning too close to the gumline or excess bonding material may irritate nearby gingival tissue, which is why precise placement matters.',
    image: '/images/medical-services/dental-care/cosmetic-dentistry/tooth-jewellery/gum-irritation.webp',
    alt: 'Ensuring safe distance from gumline to avoid gingival irritation',
    badge: 'Precise Margins',
    badgeColor: 'bg-rose-50 text-rose-700 border-rose-300/40'
  },
  {
    id: 'detachment',
    title: 'Detachment Risk',
    desc: 'The gem may loosen or fall off over time because of everyday wear, biting forces on hard items, or bonding adhesive fatigue.',
    image: '/images/medical-services/dental-care/cosmetic-dentistry/tooth-jewellery/detachment.webp',
    alt: 'Understanding tooth gem detachment risks and safe handling',
    badge: 'Force Prevention',
    badgeColor: 'bg-orange-50 text-orange-700 border-orange-300/40'
  },
  {
    id: 'surface-changes',
    title: 'Surface Changes',
    desc: 'Improper placement or forceful home removal attempts can scratch or damage natural tooth enamel. Removal must always be done by a dentist.',
    image: '/images/medical-services/dental-care/cosmetic-dentistry/tooth-jewellery/surface-changes.webp',
    alt: 'Professional removal preserving smooth natural enamel surface',
    badge: 'Professional Removal',
    badgeColor: 'bg-blue-50 text-brandBlue border-brandBlue/20'
  },
  {
    id: 'bite-interference',
    title: 'Bite Interference',
    desc: 'An accessory placed in an unsuitable location may collide with opposing teeth when biting, potentially dislodging the gem or straining the tooth.',
    image: '/images/medical-services/dental-care/cosmetic-dentistry/tooth-jewellery/bite-interference.webp',
    alt: 'Evaluating bite interference and occlusion during lateral movements',
    badge: 'Occlusal Safety',
    badgeColor: 'bg-purple-50 text-purple-700 border-purple-300/40'
  },
  {
    id: 'allergic-reactions',
    title: 'Material Sensitivity',
    desc: 'Allergic or material-related reactions are possible depending on individual sensitivity. Only certified medical-grade dental alloys should be selected.',
    image: '/images/medical-services/dental-care/cosmetic-dentistry/tooth-jewellery/allergic-reactions.webp',
    alt: 'Using hypoallergenic dental grade materials for tooth jewellery',
    badge: 'Biocompatible',
    badgeColor: 'bg-teal-50 text-teal-700 border-teal-300/40'
  }
];

// 8 FAQs from PDF Page 6
const FAQS = [
  {
    q: 'Does tooth jewellery damage natural teeth?',
    a: 'Appropriate bonding may allow placement without drilling or intentionally removing enamel. However, poor technique, plaque accumulation, or improper removal can contribute to dental problems. Professional placement and follow-up are important to maintain sound enamel and healthy gums.'
  },
  {
    q: 'Is tooth jewellery painful?',
    a: 'Placement is generally painless and usually does not require an injection when no additional dental treatment is needed. The enamel surface is prepared and bonded entirely above the nerve, with zero drilling.'
  },
  {
    q: 'How long does tooth jewellery last?',
    a: 'Retention varies with the accessory, bonding material, tooth surface, bite forces, and everyday habits. A gem may remain attached for months or even years, but no fixed lifespan can be guaranteed since individual oral dynamics differ.'
  },
  {
    q: 'Can I eat and drink normally afterward?',
    a: 'Follow the dentist\'s specific instructions after placement. In general, avoid biting hard foods directly with the decorated tooth (such as ice, hard nuts, crusty bread, or apples), as this may loosen or damage the accessory.'
  },
  {
    q: 'Can tooth jewellery be placed on veneers or crowns?',
    a: 'Placement on restorations may be possible in selected cases, but bonding requirements differ significantly from those for natural enamel. The dentist must assess the porcelain or ceramic material and determine whether a reliable, safe bond is feasible.'
  },
  {
    q: 'Is tooth jewellery suitable for everyone?',
    a: 'No. Oral health, the selected tooth, bite contact, cleaning ability, and habits such as teeth grinding (bruxism) can affect suitability. A professional dental examination should always come first to ensure the tooth is healthy and cavity-free.'
  },
  {
    q: 'What should I do if the gem becomes loose?',
    a: 'Avoid touching, pulling, or attempting to reattach it. Contact your dentist for advice, particularly if it causes discomfort or interferes with your bite. Never swallow a loose gem or use toxic household glue.'
  },
  {
    q: 'Can tooth jewellery be removed?',
    a: 'Yes, tooth jewellery can generally be removed easily by a dentist, who will carefully remove the accessory and polish away any remaining bonding resin. The tooth surface is then checked to ensure it is healthy and smooth. Avoid removing it at home by scraping, pulling or grinding, as this can severely scratch your enamel.'
  }
];

// Related Treatments in Cosmetic Dentistry
const RELATED_TREATMENTS = [
  {
    title: 'Dental Veneers & Laminates',
    desc: 'Ultra-thin porcelain or composite shells that transform smile shape, color, and symmetry with flawless natural aesthetics.',
    link: '/treatments/dental-veneers',
    image: '/images/medical-services/dental-care/cosmetic-dentistry/veneers-laminates/smile-with-dental-veneers.webp',
    alt: 'Flawless smile with custom dental porcelain veneers',
    badge: 'Smile Makeover',
    badgeColor: 'bg-purple-50 text-purple-700 border-purple-200',
    accentBorder: 'hover:border-purple-400/60'
  },
  {
    title: 'Professional Teeth Whitening',
    desc: 'In-office laser whitening designed to safely lighten enamel discoloration and stains by up to 8 shades in a single session.',
    link: '/treatments/teeth-whitening',
    image: '/images/medical-services/dental-care/cosmetic-dentistry/smile-designing/teeth-whitening.webp',
    alt: 'Professional in-office laser teeth whitening procedure',
    badge: 'Bright Radiance',
    badgeColor: 'bg-sky-50 text-brandSky border-sky-200',
    accentBorder: 'hover:border-sky-400/60'
  },
  {
    title: 'Jerushaligne Clear Aligners',
    desc: 'Custom invisible aligners designed with 3D digital precision to straighten teeth comfortably without metal wires.',
    link: '/dental-care/orthodontic-care/clear-aligners-jerushaligne',
    image: '/images/medical-services/dental-care/jerushaligne/girl.webp',
    alt: 'Jerushaligne clear invisible aligners for teeth straightening',
    badge: 'Invisible Orthodontics',
    badgeColor: 'bg-blue-50 text-brandBlue border-blue-200',
    accentBorder: 'hover:border-blue-400/60'
  },
  {
    title: 'Crowns & Bridges',
    desc: 'High-strength monolithic zirconia and ceramic restorations to replace missing teeth or protect heavily restored dentition.',
    link: '/dental-care/prosthodontic-care/dental-crowns-bridges',
    image: '/images/medical-services/dental-care/crowns-bridges/dental-bridge.webp',
    alt: 'Precision ceramic dental crowns and fixed bridges restoration',
    badge: 'Restorative Care',
    badgeColor: 'bg-emerald-50 text-emerald-700 border-emerald-200',
    accentBorder: 'hover:border-emerald-400/60'
  }
];

export default function ToothJewelleryPage() {
  const navigate = useNavigate();
  const [expandedFaq, setExpandedFaq] = useState(null);
  const [activeStepIndex, setActiveStepIndex] = useState(0);

  const { activeSection, scrollToSection } = useTreatmentScrollSpy(
    TABS.map(tab => tab.id),
    138
  );

  useEffect(() => {
    // Canonical SEO Setup from PDF Page 7
    document.title = 'Tooth Jewellery & Dental Gems | Jerush Cosmetic Dentistry';

    let metaDesc = document.querySelector('meta[name="description"]');
    if (!metaDesc) {
      metaDesc = document.createElement('meta');
      metaDesc.name = 'description';
      document.head.appendChild(metaDesc);
    }
    metaDesc.content = 'Explore tooth jewellery at Jerush. Learn about dental gem designs, bonding techniques, suitability, possible risks, professional removal, and aftercare.';

    let metaKeywords = document.querySelector('meta[name="keywords"]');
    if (!metaKeywords) {
      metaKeywords = document.createElement('meta');
      metaKeywords.name = 'keywords';
      document.head.appendChild(metaKeywords);
    }
    metaKeywords.content = 'Tooth jewellery, Tooth gems, dental jewellery, crystal tooth gem, tooth gem bonding, cosmetic dental accessories';

    // Inject FAQ Schema
    const faqSchemaScript = document.createElement('script');
    faqSchemaScript.type = 'application/ld+json';
    faqSchemaScript.id = 'faq-schema-tooth-jewellery';
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
      const existingScript = document.getElementById('faq-schema-tooth-jewellery');
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
        title="Tooth Jewellery"
        breadcrumbs={[
          { label: 'Dental Care', path: '/treatments' },
          { label: 'Cosmetic Dentistry', path: '/treatments?category=dental&sub=Cosmetic%20Dentistry' },
          { label: 'Tooth Jewellery', active: true }
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
                  Tooth Jewellery:{' '}
                  <span className="bg-gradient-to-r from-brandBlue to-brandSky bg-clip-text text-transparent">
                    A Personal Touch for Your Smile
                  </span>
                </h1>
                <p className="text-slate-600 text-base sm:text-lg leading-relaxed mt-4">
                  Tooth jewellery is a cosmetic dental procedure in which a small decorative crystal, gem, or specially designed ornament is attached to the visible surface of a tooth using dental bonding materials. It allows people to personalise their smiles without necessarily changing the natural colour, shape, or alignment of their teeth.
                </p>
                <div className="mt-4 p-4.5 rounded-2xl bg-white/95 backdrop-blur-sm border border-slate-200/90 shadow-sm space-y-2">
                  <p className="text-slate-700 text-sm sm:text-base leading-relaxed">
                    Unlike veneers or crowns, which may involve reshaping the tooth, tooth jewellery can often be placed without drilling or intentionally removing enamel. However, the technique, material, and suitability must be evaluated by a dental professional.
                  </p>
                  <p className="text-slate-600 text-xs sm:text-sm leading-relaxed pt-1 border-t border-slate-100">
                    At <strong className="text-slate-900 font-semibold">Jerush Dentofacial & Cosmetic Laser Centre</strong>, tooth jewellery can be explored as a cosmetic option for people who want a subtle sparkle or a distinctive detail in their smile.
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
                  <span>100% Drill-Free (Preserves Natural Enamel)</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Check className="w-4 h-4 text-brandBlue shrink-0" />
                  <span>Medical-Grade Dental Adhesive</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Check className="w-4 h-4 text-brandBlue shrink-0" />
                  <span>Completely Reversible & Removable</span>
                </div>
              </div>
            </motion.div>

            {/* Right Column: Hero Graphic - Clean Frame, No status dots, High Quality 16:9 Aspect */}
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
                    src="/images/medical-services/dental-care/cosmetic-dentistry/tooth-jewellery/personal-touch.webp"
                    alt="Small crystal tooth gem bonded to a natural front tooth as a cosmetic smile accessory."
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
        treatmentName="Tooth Jewellery"
        title="Book a Cosmetic Dental Consultation"
        highlightWord="Personalized Smile Accent"
        subtitle="Add a subtle, brilliant sparkle to your smile with certified medical-grade dental gems. Schedule an aesthetic evaluation at Jerush across Tamil Nadu."
        features={[
          {
            icon: ShieldCheck,
            title: '100% Non-Invasive Care',
            desc: 'Zero drilling, zero injections, and complete preservation of your natural tooth enamel.'
          },
          {
            icon: Sparkles,
            title: 'Certified Dental Gems',
            desc: 'Medical-grade lead-free crystals, gold motifs, and biocompatible bonding materials.'
          },
          {
            icon: Award,
            title: 'Specialist-Led Placement',
            desc: 'Careful clinical examination by cosmetic dental surgeons ensuring zero bite interference.'
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

      {/* ─── SECTION 1: Explore Different Tooth Jewellery Designs (id="designs") ─── */}
      <section
        id="designs"
        className="w-full py-16 lg:py-24 bg-gradient-to-b from-slate-50 via-sky-50/20 to-white relative scroll-mt-28 border-b border-slate-200/70 overflow-hidden"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Section Header */}
          <div className="max-w-3xl mb-12 text-left">
            <span className="text-xs font-bold text-brandBlue uppercase tracking-wider font-headline block mb-2.5">
              Aesthetic Variety & Styles
            </span>
            <h2
              style={{ lineHeight: 1.4 }}
              className="text-2xl sm:text-3xl lg:text-[36px] font-extrabold font-headline text-slate-900 tracking-tight leading-[1.4]"
            >
              Explore Different{' '}
              <span className="bg-gradient-to-r from-brandBlue to-brandSky bg-clip-text text-transparent">
                Tooth Jewellery Designs
              </span>
            </h2>
            <p className="text-slate-600 text-sm sm:text-base leading-relaxed mt-3.5">
              The appearance of tooth jewellery depends on the shape, size, colour, and placement of the selected accessory. The right choice should complement your smile without interfering with your bite or oral hygiene.
            </p>
          </div>

          {/* 4 Design Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {DESIGNS.map((item, index) => {
              const IconComp = item.icon;
              return (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className={`bg-white rounded-3xl overflow-hidden border border-slate-200/80 shadow-md hover:shadow-xl transition-all duration-300 flex flex-col group ${item.accentBorder}`}
                >
                  {/* 1:1 Aspect-Square Image Container: Pristine Square Ratio with Zero Cropping */}
                  <div className="relative p-3 pb-0">
                    <div className="relative rounded-2xl overflow-hidden bg-slate-50 aspect-square border border-slate-100 shadow-inner">
                      <img
                        src={item.image}
                        alt={item.alt}
                        className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute top-2.5 left-2.5">
                        <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-headline font-bold border backdrop-blur-md shadow-xs ${item.badgeColor}`}>
                          <IconComp className="w-3.5 h-3.5" />
                          <span>{item.tag}</span>
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Card Body */}
                  <div className="p-5 sm:p-6 flex flex-col flex-1 justify-between space-y-4">
                    <div>
                      <h3 className="font-headline font-bold text-lg text-slate-900 group-hover:text-brandBlue transition-colors">
                        {item.title}
                      </h3>
                      <p className="text-xs font-semibold text-brandSky uppercase tracking-wider mt-0.5">
                        {item.subtitle}
                      </p>
                      <p className="text-slate-600 text-xs sm:text-sm leading-relaxed mt-3">
                        {item.desc}
                      </p>
                    </div>

                    <div className="pt-3 border-t border-slate-100 space-y-2">
                      {item.features.map((feat, fIdx) => (
                        <div key={fIdx} className="flex items-start gap-2 text-xs text-slate-700">
                          <Check className="w-3.5 h-3.5 text-brandBlue shrink-0 mt-0.5" />
                          <span>{feat}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>

          {/* Professional Selection Disclaimer Callout */}
          <div className="mt-10 p-5 sm:p-6 rounded-2xl bg-white border border-sky-200 shadow-sm flex flex-col sm:flex-row items-start sm:items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-sky-50 border border-sky-200 flex items-center justify-center shrink-0 text-brandBlue">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div className="space-y-1">
              <h4 className="font-headline font-bold text-sm sm:text-base text-slate-900">
                Dental-Grade Certification & Safe Selection
              </h4>
              <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">
                Not every accessory is suitable for bonding to teeth. Jewellery intended specifically for dental use and compatible dental bonding materials should always be selected by the treating professional to guarantee biocompatibility and enamel safety.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ─── SECTION 2: Why Consider Tooth Jewellery? (id="why-consider") ─── */}
      <section
        id="why-consider"
        className="w-full py-16 lg:py-24 bg-white relative scroll-mt-28 border-b border-slate-200/70 overflow-hidden"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mb-12 text-left">
            <span className="text-xs font-bold text-brandBlue uppercase tracking-wider font-headline block mb-2.5">
              Cosmetic Expression & Reversibility
            </span>
            <h2
              style={{ lineHeight: 1.4 }}
              className="text-2xl sm:text-3xl lg:text-[36px] font-extrabold font-headline text-slate-900 tracking-tight leading-[1.4]"
            >
              Why Consider{' '}
              <span className="bg-gradient-to-r from-brandBlue to-brandSky bg-clip-text text-transparent">
                Tooth Jewellery?
              </span>
            </h2>
            <p className="text-slate-600 text-sm sm:text-base leading-relaxed mt-3.5">
              Tooth jewellery is primarily an aesthetic choice rather than a dental treatment intended to improve tooth function. It gives you the freedom to introduce a custom artistic flourish to your everyday smile.
            </p>
          </div>

          {/* 5 Reasons Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {WHY_CONSIDER_REASONS.map((reason, idx) => (
              <motion.div
                key={reason.id}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.45, delay: idx * 0.08 }}
                className={`bg-white rounded-3xl overflow-hidden border border-slate-200/80 shadow-sm hover:shadow-lg transition-all duration-300 flex flex-col group ${reason.accentBorder}`}
              >
                {/* Framed Image Container: Clean Uncropped Ratio */}
                <div className="relative p-3 pb-0">
                  <div className="relative rounded-2xl overflow-hidden bg-slate-50 aspect-[4/3] sm:aspect-square border border-slate-100 shadow-inner">
                    <img
                      src={reason.image}
                      alt={reason.alt}
                      className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute top-2.5 left-2.5">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-[10px] font-headline font-bold border backdrop-blur-md shadow-xs ${reason.badgeColor}`}>
                        {reason.tag}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Content */}
                <div className="p-5 sm:p-6 flex flex-col flex-1 justify-between space-y-3">
                  <div>
                    <h3 className="font-headline font-bold text-lg text-slate-900 group-hover:text-brandBlue transition-colors">
                      {reason.title}
                    </h3>
                    <p className="text-xs font-semibold text-brandSky uppercase tracking-wider mt-0.5">
                      {reason.lead}
                    </p>
                    <p className="text-slate-600 text-xs sm:text-sm leading-relaxed mt-2.5">
                      {reason.desc}
                    </p>
                  </div>

                  <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs font-headline font-bold text-brandBlue">
                    <span>Clinical Aesthetic Focus</span>
                    <Sparkles className="w-4 h-4 text-brandSky" />
                  </div>
                </div>
              </motion.div>
            ))}

            {/* Comprehensive Safety Note Card */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.45, delay: 0.4 }}
              className="bg-gradient-to-br from-[#0B1E3B] to-[#123164] rounded-3xl p-6 sm:p-7 text-white flex flex-col justify-between shadow-xl relative overflow-hidden"
            >
              <div className="absolute -top-12 -right-12 w-44 h-44 bg-brandSky/20 rounded-full blur-2xl" />
              <div className="relative z-10 space-y-4">
                <div className="w-12 h-12 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center text-brandSky">
                  <ShieldCheck className="w-6 h-6" />
                </div>
                <h3 className="font-headline font-bold text-xl text-white">
                  Health Comes First
                </h3>
                <p className="text-slate-300 text-xs sm:text-sm leading-relaxed">
                  The outcome depends on the chosen accessory, the tooth surface, the bonding technique, and your oral health. Placement should never compromise dental health for appearance.
                </p>
              </div>

              <div className="relative z-10 pt-6 mt-6 border-t border-white/15">
                <button
                  type="button"
                  onClick={handleBookClick}
                  className="w-full py-3 px-4 rounded-full bg-gradient-to-r from-brandSky to-brandBlue text-white font-headline font-bold text-xs uppercase tracking-wider shadow-md hover:brightness-110 transition-all flex items-center justify-center gap-2 cursor-pointer border-none"
                >
                  <span>Book Consultation</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ─── SECTION 3: Where Is Tooth Jewellery Usually Placed? (id="placement") ─── */}
      <section
        id="placement"
        className="w-full py-16 lg:py-24 bg-gradient-to-b from-slate-50 via-sky-50/20 to-white relative scroll-mt-28 border-b border-slate-200/70 overflow-hidden"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mb-12 text-left">
            <span className="text-xs font-bold text-brandBlue uppercase tracking-wider font-headline block mb-2.5">
              Anatomical Alignment & Considerations
            </span>
            <h2
              style={{ lineHeight: 1.4 }}
              className="text-2xl sm:text-3xl lg:text-[36px] font-extrabold font-headline text-slate-900 tracking-tight leading-[1.4]"
            >
              Where Is Tooth Jewellery{' '}
              <span className="bg-gradient-to-r from-brandBlue to-brandSky bg-clip-text text-transparent">
                Usually Placed?
              </span>
            </h2>
            <p className="text-slate-600 text-sm sm:text-base leading-relaxed mt-3.5">
              Tooth jewellery is commonly positioned on a visible front tooth, where it can be seen naturally when smiling. The exact location depends on the tooth's shape, surface condition, position, and relationship to the opposing teeth.
            </p>
          </div>

          {/* 5 Factors Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {PLACEMENT_FACTORS.map((factor, index) => (
              <motion.div
                key={factor.number}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-white rounded-3xl overflow-hidden border border-slate-200/80 shadow-md hover:shadow-xl transition-all duration-300 flex flex-col group hover:border-brandSky/60"
              >
                {/* 1:1 Aspect-Square Image Container: Pristine Square Ratio with Zero Cropping */}
                <div className="relative p-3 pb-0">
                  <div className="relative rounded-2xl overflow-hidden bg-slate-50 aspect-square border border-slate-100 shadow-inner">
                    <img
                      src={factor.image}
                      alt={factor.alt}
                      className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute top-2.5 left-2.5">
                      <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-headline font-bold bg-white/95 text-slate-900 border border-slate-200 shadow-xs backdrop-blur-md">
                        <span className="w-1.5 h-1.5 rounded-full bg-brandBlue"></span>
                        <span>Factor {factor.number}</span>
                      </span>
                    </div>
                    <div className="absolute top-2.5 right-2.5">
                      <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-headline font-bold bg-brandBlue/90 text-white shadow-xs">
                        {factor.tag}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Content */}
                <div className="p-5 sm:p-6 flex flex-col flex-1 justify-between space-y-3">
                  <div>
                    <h3 className="font-headline font-bold text-lg text-slate-900 group-hover:text-brandBlue transition-colors">
                      {factor.title}
                    </h3>
                    <p className="text-xs font-semibold text-brandSky uppercase tracking-wider mt-0.5">
                      {factor.lead}
                    </p>
                    <p className="text-slate-600 text-xs sm:text-sm leading-relaxed mt-2.5">
                      {factor.desc}
                    </p>
                  </div>

                  <div className="pt-3 border-t border-slate-100">
                    <span className="text-[11px] font-medium text-slate-500 block">
                      Clinical focus: <strong className="text-slate-800 font-semibold">{factor.clinicalFocus}</strong>
                    </span>
                  </div>
                </div>
              </motion.div>
            ))}

            {/* Summary Consultation Card */}
            <div className="bg-gradient-to-br from-sky-50 via-blue-50/50 to-white rounded-3xl p-6 sm:p-7 border border-brandSky/30 shadow-md flex flex-col justify-between">
              <div className="space-y-3">
                <div className="w-11 h-11 rounded-xl bg-brandBlue/10 flex items-center justify-center text-brandBlue">
                  <Compass className="w-5 h-5" />
                </div>
                <h3 className="font-headline font-bold text-lg text-slate-900">
                  Smile Architecture & Mirror Preview
                </h3>
                <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">
                  During your initial visit, your clinician will temporarily position the sample gem on different teeth using a soft cosmetic paste so you can check your smile in the mirror before any bonding resin is applied.
                </p>
              </div>

              <div className="pt-4 border-t border-sky-100">
                <div className="flex items-center gap-2 text-xs font-headline font-bold text-brandBlue">
                  <CheckCircle2 className="w-4 h-4 text-brandSky" />
                  <span>Preview in mirror prior to final curing</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── SECTION 4: How Is Tooth Jewellery Bonded? (id="procedure") ─── */}
      <section
        id="procedure"
        className="w-full py-16 lg:py-24 bg-white relative scroll-mt-28 border-b border-slate-200/70 overflow-hidden"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mb-12 text-left">
            <span className="text-xs font-bold text-brandBlue uppercase tracking-wider font-headline block mb-2.5">
              Clinical Step-by-Step Protocol
            </span>
            <h2
              style={{ lineHeight: 1.4 }}
              className="text-2xl sm:text-3xl lg:text-[36px] font-extrabold font-headline text-slate-900 tracking-tight leading-[1.4]"
            >
              How Is Tooth Jewellery{' '}
              <span className="bg-gradient-to-r from-brandBlue to-brandSky bg-clip-text text-transparent">
                Bonded to the Tooth?
              </span>
            </h2>
            <p className="text-slate-600 text-sm sm:text-base leading-relaxed mt-3.5">
              Although the procedure is usually brief, correct placement requires meticulous attention to tooth preparation, material selection, isolation, and light-curing.
            </p>
          </div>

          {/* Interactive Step Navigator for Desktop & Tablets */}
          <div className="grid grid-cols-2 sm:grid-cols-5 gap-2 sm:gap-3 mb-8">
            {PROCEDURE_STEPS.map((step, idx) => (
              <button
                key={step.step}
                type="button"
                onClick={() => setActiveStepIndex(idx)}
                className={`text-left p-3.5 rounded-2xl border transition-all cursor-pointer ${activeStepIndex === idx
                  ? 'bg-brandBlue text-white border-brandBlue shadow-md shadow-brandBlue/20'
                  : 'bg-slate-50 hover:bg-slate-100 text-slate-700 border-slate-200/80'
                  }`}
              >
                <span className={`text-[11px] font-headline font-extrabold block uppercase tracking-wider ${activeStepIndex === idx ? 'text-brandSky' : 'text-brandBlue'
                  }`}>
                  Step {step.step}
                </span>
                <span className="font-headline font-bold text-xs sm:text-sm line-clamp-1 mt-0.5">
                  {step.name}
                </span>
              </button>
            ))}
          </div>

          {/* Active Step Showcase Card */}
          <div className="bg-gradient-to-br from-slate-50 via-sky-50/20 to-white rounded-3xl border border-slate-200/90 shadow-xl overflow-hidden p-6 sm:p-8 lg:p-10">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center">
              {/* Left Column: Details */}
              <div className="lg:col-span-7 space-y-5">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brandBlue/10 text-brandBlue font-headline font-bold text-xs">
                  <span>Step {PROCEDURE_STEPS[activeStepIndex].step} of 05</span>
                  <span>•</span>
                  <span>{PROCEDURE_STEPS[activeStepIndex].lead}</span>
                </div>

                <h3 className="font-headline font-extrabold text-2xl sm:text-3xl text-slate-900">
                  {PROCEDURE_STEPS[activeStepIndex].name}
                </h3>

                <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
                  {PROCEDURE_STEPS[activeStepIndex].details}
                </p>

                <div className="space-y-2.5 pt-2">
                  <h4 className="font-headline font-bold text-xs uppercase tracking-wider text-slate-900">
                    Key Clinical Highlights:
                  </h4>
                  {PROCEDURE_STEPS[activeStepIndex].keyPoints.map((point, pIdx) => (
                    <div key={pIdx} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-700">
                      <div className="w-5 h-5 rounded-full bg-sky-100 text-brandBlue flex items-center justify-center shrink-0 mt-0.5">
                        <Check className="w-3 h-3" />
                      </div>
                      <span>{point}</span>
                    </div>
                  ))}
                </div>

                {/* Step Navigation Controls */}
                <div className="flex items-center gap-3 pt-4 border-t border-slate-200/80">
                  <button
                    type="button"
                    disabled={activeStepIndex === 0}
                    onClick={() => setActiveStepIndex(prev => Math.max(0, prev - 1))}
                    className="px-4 py-2 rounded-full border border-slate-300 text-slate-700 hover:bg-slate-100 disabled:opacity-40 disabled:cursor-not-allowed text-xs font-headline font-bold cursor-pointer transition-colors"
                  >
                    Previous Step
                  </button>
                  <button
                    type="button"
                    disabled={activeStepIndex === PROCEDURE_STEPS.length - 1}
                    onClick={() => setActiveStepIndex(prev => Math.min(PROCEDURE_STEPS.length - 1, prev + 1))}
                    className="px-5 py-2 rounded-full bg-brandBlue hover:bg-brandSky text-white disabled:opacity-40 disabled:cursor-not-allowed text-xs font-headline font-bold cursor-pointer transition-colors shadow-xs"
                  >
                    Next Step
                  </button>
                </div>
              </div>

              {/* Right Column: Step Image (1:1 Native Aspect with Zero Cropping) */}
              <div className="lg:col-span-5 flex justify-center">
                <div className="relative rounded-2xl overflow-hidden bg-slate-50 border border-slate-200 shadow-md aspect-square w-full max-w-[360px]">
                  <img
                    src={PROCEDURE_STEPS[activeStepIndex].image}
                    alt={PROCEDURE_STEPS[activeStepIndex].alt}
                    className="w-full h-full object-cover object-center"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Procedure Reassurance Banner */}
          <div className="mt-8 p-4.5 rounded-2xl bg-sky-50/70 border border-brandSky/25 flex items-center gap-3 text-xs sm:text-sm text-slate-700">
            <Info className="w-5 h-5 text-brandBlue shrink-0" />
            <span>
              When appropriately planned, this procedure can often be completed without drilling or intentionally removing enamel. However, the technique and materials used determine the exact process.
            </span>
          </div>
        </div>
      </section>

      {/* ─── SECTION 5: Risks, Precautions & Aftercare (id="safety-aftercare") ─── */}
      <section
        id="safety-aftercare"
        className="w-full py-16 lg:py-24 bg-gradient-to-b from-slate-50 via-sky-50/20 to-white relative scroll-mt-28 border-b border-slate-200/70 overflow-hidden"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mb-12 text-left">
            <span className="text-xs font-bold text-brandBlue uppercase tracking-wider font-headline block mb-2.5">
              Safety, Precautions & Maintenance
            </span>
            <h2
              style={{ lineHeight: 1.4 }}
              className="text-2xl sm:text-3xl lg:text-[36px] font-extrabold font-headline text-slate-900 tracking-tight leading-[1.4]"
            >
              Are There Any Risks or{' '}
              <span className="bg-gradient-to-r from-brandBlue to-brandSky bg-clip-text text-transparent">
                Limitations?
              </span>
            </h2>
            <p className="text-slate-600 text-sm sm:text-base leading-relaxed mt-3.5">
              Tooth jewellery is a cosmetic accessory, but it is still attached to a tooth and requires appropriate care. Placement should never compromise dental health for appearance.
            </p>
          </div>

          {/* 6 Potential Concerns Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
            {RISKS_AND_CONCERNS.map((item, index) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.45, delay: index * 0.08 }}
                className="bg-white rounded-3xl overflow-hidden border border-slate-200/80 shadow-sm hover:shadow-lg transition-all duration-300 flex flex-col group hover:border-brandSky/60"
              >
                {/* 1:1 Aspect-Square Image Container: Pristine Square Ratio with Zero Cropping */}
                <div className="relative p-3 pb-0">
                  <div className="relative rounded-2xl overflow-hidden bg-slate-50 aspect-square border border-slate-100 shadow-inner">
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

                <div className="p-5 sm:p-6 flex-1 flex flex-col justify-between">
                  <div>
                    <h3 className="font-headline font-bold text-lg text-slate-900 group-hover:text-brandBlue transition-colors">
                      {item.title}
                    </h3>
                    <p className="text-slate-600 text-xs sm:text-sm leading-relaxed mt-2.5">
                      {item.desc}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Keeping Your Tooth Gem Clean and Secure (From PDF Page 5) */}
          <div className="bg-white rounded-3xl border border-slate-200/90 shadow-xl p-6 sm:p-8 lg:p-10 overflow-hidden">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
              {/* Left Column: Image (16:9 Native Aspect matching 1024x576) */}
              <div className="lg:col-span-5">
                <div className="relative rounded-2xl overflow-hidden bg-slate-50 border border-slate-200 shadow-md aspect-[16/9]">
                  <img
                    src="/images/medical-services/dental-care/cosmetic-dentistry/tooth-jewellery/keeping-your-tooth-gem-clean.webp"
                    alt="Oral hygiene instructions for keeping tooth jewellery clean and secure"
                    className="w-full h-full object-cover object-center"
                  />
                </div>
              </div>

              {/* Right Column: Aftercare Guide Checklist */}
              <div className="lg:col-span-7 space-y-4">
                <span className="text-xs font-bold text-brandBlue uppercase tracking-wider font-headline block">
                  Daily Aftercare Protocol
                </span>
                <h3 className="font-headline font-extrabold text-2xl sm:text-3xl text-slate-900">
                  Keeping Your Tooth Gem Clean and Secure
                </h3>
                <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">
                  After placement, maintaining good oral hygiene is essential. The goal is to keep the tooth healthy while avoiding unnecessary stress on the accessory.
                </p>

                <div className="space-y-2.5 pt-2">
                  <div className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-700">
                    <CheckCircle2 className="w-4 h-4 text-brandBlue shrink-0 mt-0.5" />
                    <span>Brush twice daily with fluoride toothpaste using a soft-bristled brush.</span>
                  </div>
                  <div className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-700">
                    <CheckCircle2 className="w-4 h-4 text-brandBlue shrink-0 mt-0.5" />
                    <span>Clean between your teeth every day with dental floss or interdental brushes.</span>
                  </div>
                  <div className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-700">
                    <CheckCircle2 className="w-4 h-4 text-brandBlue shrink-0 mt-0.5" />
                    <span>Gently clean around the accessory rather than scrubbing aggressively.</span>
                  </div>
                  <div className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-700">
                    <CheckCircle2 className="w-4 h-4 text-brandBlue shrink-0 mt-0.5" />
                    <span>Avoid biting ice, pens, fingernails, or hard foods directly with the decorated tooth.</span>
                  </div>
                  <div className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-700">
                    <CheckCircle2 className="w-4 h-4 text-brandBlue shrink-0 mt-0.5" />
                    <span>Attend regular dental check-ups so the tooth and bonding material can be monitored.</span>
                  </div>
                  <div className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-700">
                    <CheckCircle2 className="w-4 h-4 text-brandBlue shrink-0 mt-0.5" />
                    <span>Contact your dentist if the jewellery becomes loose, causes irritation, or changes your bite.</span>
                  </div>
                </div>

                {/* Urgent Safety Warning Box */}
                <div className="mt-4 p-4 rounded-xl bg-amber-50/80 border border-amber-200/80 text-amber-900 text-xs sm:text-sm leading-relaxed flex items-start gap-2.5">
                  <AlertTriangle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
                  <div>
                    <strong className="font-bold">Important Safety Advice:</strong> If the accessory detaches, avoid swallowing it and contact your dental team for advice. Never use household glue or other non-dental adhesives to reattach it.
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── SECTION 6: Frequently Asked Questions (id="faqs") ─── */}
      <section id="faqs" className="w-full py-16 lg:py-24 bg-white relative scroll-mt-28 overflow-hidden">
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
              Find answers to common questions about dental gem durability, safety, eating habits, pain-free application, and professional removal.
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

      {/* ─── Related Treatments in Cosmetic Dentistry ─── */}
      <section className="w-full py-16 bg-slate-50/70 border-t border-slate-200/70">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mb-10 text-left">
            <span className="text-xs font-bold text-brandBlue uppercase tracking-wider font-headline block mb-2">
              Complementary Smile Aesthetics
            </span>
            <h2
              style={{ lineHeight: 1.4 }}
              className="text-2xl sm:text-3xl font-extrabold font-headline text-slate-900 tracking-tight leading-[1.4]"
            >
              Related Treatments in{' '}
              <span className="bg-gradient-to-r from-brandBlue to-brandSky bg-clip-text text-transparent">
                Cosmetic & Restorative Dentistry
              </span>
            </h2>
            <p className="text-slate-600 text-xs sm:text-sm mt-2">
              Explore comprehensive cosmetic smile enhancement options delivered by hospital specialists across Tamil Nadu.
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

      {/* ─── Bottom CTA Banner (Dr. A. Bladbin Cutout & Compliant Dark Navy Format) ─── */}
      <TreatmentCtaBanner
        badgeText="COSMETIC SMILE ENHANCEMENT"
        titlePrefix="A Small Detail,"
        highlightWord="Carefully Planned"
        titleSuffix="for Your Smile"
        subtitle="Tooth jewellery can be a distinctive way to personalise a smile when the tooth is healthy and the accessory is placed appropriately. At Jerush Dentofacial & Cosmetic Laser Centre, a cosmetic dental consultation can help you explore suitable designs and understand the care involved."
        primaryBtnText="Arrange a Cosmetic Consultation"
        onPrimaryClick={handleBookClick}
        secondaryBtnText="Call +91 94891 60000"
        secondaryBtnPhone="+919489160000"
        doctorImage="/images/doctors/dr-bladbin-portrait.webp"
        doctorName="DR. A. BLADBIN"
        doctorRole="Founder & Chief Surgeon"
        doctorAlt="DR. A. BLADBIN - Founder & Chief Surgeon at Jerush Dentofacial & Cosmetic Laser Centre"
      />
    </div>
  );
}
