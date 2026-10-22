import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  Smile, ShieldCheck, Heart, Sparkles, Activity, TrendingUp, Scissors, 
  UserCheck, Flame, ArrowLeft, Calendar, Info, Phone, Shield
} from 'lucide-react';
import PageBreadcrumbHero from '../components/common/PageBreadcrumbHero';
import TreatmentCtaBanner from '../components/common/TreatmentCtaBanner';
import { treatmentService } from '../services/treatmentService';

// Icon Map helper to load Lucide components
const iconMap = {
  Smile, ShieldCheck, Heart, Sparkles, Activity, TrendingUp, Scissors, UserCheck, Flame, Shield
};

const getIcon = (name) => {
  return iconMap[name] || iconMap[name + 'Icon'] || Smile;
};

const SUBCATEGORY_MAP = {
  'clear-aligners': 'Smile Makeover & Aligners',
  'metal-braces': 'Smile Makeover & Braces',
  'ceramic-braces': 'Smile Makeover & Braces',
  'lingual-braces': 'Smile Makeover & Braces',
  'self-ligating-braces': 'Smile Makeover & Braces',
  'smile-makeover': 'Smile Makeover & Aesthetics',
  'dental-veneers': 'Smile Makeover & Veneers',
  'dental-implants': 'Tooth Replacement & Implants',
  'fixed-partial-denture': 'Tooth Replacement & Crowns',
  'dentures': 'Tooth Replacement & Dentures',
  'removable-partial-dentures': 'Tooth Replacement & Dentures',
  'root-canal': 'Root Canal & Tooth Repair',
  'tooth-coloured-fillings': 'Root Canal & Tooth Repair',
  'post-and-core': 'Root Canal & Tooth Repair',
  'teeth-whitening': 'Teeth Whitening & Aesthetics',
  'gum-disease-treatment': 'Gum Care & Periodontics',
  'dental-curettage': 'Gum Care & Deep Cleaning',
  'gum-surgery': 'Gum Care & Flap Surgery',
  'gum-graft-surgery': 'Gum Care & Grafting',
  'wisdom-tooth': 'Wisdom Tooth & Surgery',
  'facial-surgery-treatment': 'Facial & Maxillofacial Surgery',
  'cleft-lip-palate': 'Cleft Lip & Palate Surgery',
  'pediatric-dentistry': 'Kids & Pediatric Dentistry',
  'dental-consultation': 'Kids & Pediatric Dentistry',
  'pulpectomy': 'Kids & Pediatric Dentistry',
  'oral-pathology': 'Oral Health & Cancer Screening',
  'acne-treatment': 'Acne & Skin Care',
  'fractional-co2-laser': 'Acne & Pigmentation',
  'pigmentation-treatment': 'Melasma & Pigmentation',
  'uneven-skin-tone': 'Acne & Pigmentation',
  'freckles-removal': 'Acne & Pigmentation',
  'hydrafacial': 'Skin Glow & Hydration',
  'carbon-peel-laser-treatment': 'Skin Glow & Laser Peel',
  'chemical-peels': 'Medical Chemical Peels',
  'skin-whitening-treatment': 'Skin Whitening & Brightening',
  'anti-ageing-facial': 'Skin Glow & Rejuvenation',
  'mole-removal': 'Mole & Skin Tag Removal',
  'benign-skin-growth-removal': 'Mole & Skin Tag Removal',
  'laser-hair-removal': 'Full Body Laser Hair Removal',
  'facial-laser-hair-removal': 'Facial Laser Hair Removal',
  'botox-fillers': 'Anti-Ageing & Aesthetics',
  'hifu-skin-tightening': 'Anti-Ageing & Non-Surgical Facelift',
  'microdermabrasion': 'Skin Glow & Exfoliation',
  'excimer-laser-therapy': 'Medical Laser Dermatology',
  'keloid-treatment': 'Medical Laser Dermatology',
  'rhinoplasty': 'Cosmetic Facial Surgery',
  'prp-hair-treatment': 'Hair Fall & Regrowth Therapies',
  'gfc-hair': 'Hair Fall & Regrowth Therapies',
  'qr678-therapy': 'Hair Fall & Regrowth Therapies',
  'exocell-hair-treatment': 'Hair Fall & Regrowth Therapies',
  'fue-transplant': 'Micro-FUE Hair Transplant',
  'beard-hairline-transplant': 'Beard & Hairline Restoration',
  'dandruff-treatment': 'Scalp Care & Detox',
  'scalp-laser': 'Scalp Care & Laser Therapy',
  'cryo-sculpting': 'Fat Reduction & Body Sculpting',
  'em-sculpting': 'Fat Reduction & Body Sculpting',
  'emsella-wellness': 'Women\'s Pelvic Wellness',
  'pelvic-floor-treatment': 'Women\'s Pelvic Wellness',
  'muscle-toning': 'Muscle Toning & Definition',
  'rf-body-tightening': 'RF Body Skin Tightening',
  'clinical-wellness': 'Clinical Body Wellness'
};

const getSubcategoryLabel = (treatment) => {
  if (!treatment) return 'Treatments';
  if (SUBCATEGORY_MAP[treatment.id]) return SUBCATEGORY_MAP[treatment.id];
  if (treatment.category === 'dental') return 'Dental Care';
  if (treatment.category === 'cosmetic') return 'Skin & Laser';
  if (treatment.category === 'hair') return 'Hair Restoration';
  if (treatment.category === 'body') return 'Body Contouring & Wellness';
  return 'Treatments';
};

export default function TreatmentDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [treatment, setTreatment] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTreatment = async () => {
      setLoading(true);
      setError(null);
      try {
        const data = await treatmentService.getTreatmentById(id);
        if (data) {
          let parsedBenefits = [];
          if (Array.isArray(data.benefits)) {
            parsedBenefits = data.benefits;
          } else if (typeof data.benefits === 'string') {
            try {
              parsedBenefits = JSON.parse(data.benefits);
            } catch (e) {
              parsedBenefits = data.benefits.split(',').map(b => b.trim());
            }
          }
          setTreatment({
            ...data,
            benefits: parsedBenefits
          });
        } else {
          setError("Treatment not found");
        }
      } catch (err) {
        console.error("Failed to load treatment:", err);
        setError("Treatment not found or database query failed.");
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchTreatment();
    }
  }, [id]);

  const handleBookClick = (e) => {
    e.preventDefault();
    navigate('/contact');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  if (loading) {
    return (
      <div className="w-full min-h-screen bg-slate-50 flex items-center justify-center pt-[120px] font-body text-slate-800">
        <div className="text-center space-y-4">
          <div className="w-12 h-12 border-4 border-brandBlue border-t-transparent rounded-full animate-spin mx-auto"></div>
          <p className="text-sm font-semibold text-slate-500 uppercase tracking-widest font-headline">Loading Treatment Details...</p>
        </div>
      </div>
    );
  }

  if (error || !treatment) {
    return (
      <div className="w-full min-h-screen bg-slate-50 flex items-center justify-center pt-[120px] font-body text-slate-800">
        <div className="text-center space-y-6 max-w-md px-6">
          <h2 className="font-headline font-extrabold text-3xl text-primary">Treatment Not Found</h2>
          <p className="text-slate-550 text-sm leading-relaxed">
            The treatment you are looking for does not exist or has been modified.
          </p>
          <Link 
            to="/treatments" 
            className="inline-block px-6 py-3 bg-gradient-to-r from-brandBlue to-brandSky hover:brightness-110 text-white font-headline font-bold text-xs uppercase tracking-wider rounded-xl transition-all shadow-md"
          >
            Back to Treatments
          </Link>
        </div>
      </div>
    );
  }

  const IconComponent = getIcon(treatment.iconName || 'Smile');

  return (
    <div className="w-full bg-slate-50 font-body text-left relative pt-0 pb-24 min-h-screen">
      <PageBreadcrumbHero 
        title={treatment.title} 
        breadcrumbs={[
          { label: getSubcategoryLabel(treatment), path: '/treatments' },
          { label: treatment.title, active: true }
        ]} 
      />

      <div className="max-w-7xl mx-auto px-6 mt-12 relative z-10">
        {/* Back Link */}
        <Link 
          to="/treatments" 
          className="inline-flex items-center gap-2 text-xs font-bold text-slate-500 hover:text-brandBlue transition-colors mb-8 font-headline uppercase tracking-wider"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to all treatments
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-[1.8fr_1.2fr] gap-12">
          {/* Main Info Area */}
          <motion.div 
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="space-y-8"
          >
            {/* Header Block */}
            <div className="bg-white border border-slate-100 rounded-3xl p-6 sm:p-8 shadow-sm flex flex-col sm:flex-row gap-6 items-start sm:items-center">
              <div className="w-16 h-16 rounded-2xl bg-brandSky/10 text-brandSky flex items-center justify-center shrink-0 shadow-sm border border-brandSky/5">
                <IconComponent className="w-8 h-8" />
              </div>
              <div className="space-y-1">
                <span className="text-[10px] font-bold text-brandSky uppercase tracking-widest bg-brandSky/5 px-2.5 py-1 rounded-md border border-brandSky/10">
                  {treatment.category} Category
                </span>
                <h2 className="font-headline font-black text-2xl sm:text-3xl text-slate-900 leading-tight">
                  {treatment.title}
                </h2>
                {treatment.subtitle && (
                  <p className="text-slate-500 text-sm font-semibold font-headline">
                    {treatment.subtitle}
                  </p>
                )}
              </div>
            </div>

            {/* Featured Image */}
            {treatment.image && (
              <div className="w-full aspect-[16/9] overflow-hidden rounded-3xl border border-slate-100 shadow-sm bg-white p-2">
                <img 
                  src={treatment.image} 
                  alt={treatment.title} 
                  className="w-full h-full object-cover rounded-2xl" 
                />
              </div>
            )}

            {/* Description Card */}
            <div className="bg-white border border-slate-100 rounded-3xl p-6 sm:p-8 shadow-sm space-y-6">
              <h3 className="font-headline font-extrabold text-lg sm:text-xl text-slate-800 flex items-center gap-2 border-b border-slate-50 pb-4">
                <Info className="w-5 h-5 text-brandBlue" />
                Treatment Overview
              </h3>
              <p className="text-slate-655 text-sm sm:text-base leading-relaxed">
                {treatment.details || treatment.desc}
              </p>
              {treatment.backDesc && (
                <p className="text-slate-500 text-xs sm:text-sm italic leading-relaxed border-l-4 border-brandBlue/35 pl-4 py-1">
                  "{treatment.backDesc}"
                </p>
              )}
            </div>

            {/* Key Clinical Benefits */}
            {treatment.benefits && treatment.benefits.length > 0 && (
              <div className="bg-white border border-slate-100 rounded-3xl p-6 sm:p-8 shadow-sm space-y-6">
                <h3 className="font-headline font-extrabold text-lg sm:text-xl text-slate-800 flex items-center gap-2 border-b border-slate-50 pb-4">
                  <ShieldCheck className="w-5 h-5 text-emerald-500" />
                  Key Clinical Benefits
                </h3>
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {treatment.benefits.map((benefit, idx) => (
                    <li 
                      key={idx} 
                      className="flex items-start gap-3 p-4 bg-slate-50 border border-slate-100 rounded-2xl transition-all hover:border-slate-200"
                    >
                      <svg className="w-5 h-5 text-emerald-500 shrink-0 mt-0.5" fill="none" stroke="currentColor" strokeWidth="3" viewBox="0 0 24 24">
                        <polyline points="20 6 9 17 4 12"></polyline>
                      </svg>
                      <span className="text-slate-700 text-xs sm:text-sm font-semibold leading-tight">
                        {benefit}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </motion.div>

          {/* Sidebar CTA Area */}
          <motion.div 
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.15 }}
            className="space-y-8"
          >
            {/* Appointment Card */}
            <div className="bg-white border border-slate-150/60 rounded-3xl p-6 sm:p-8 shadow-sm space-y-6 text-center">
              <div className="w-12 h-12 rounded-full bg-brandBlue/5 text-brandBlue flex items-center justify-center mx-auto mb-2">
                <Calendar className="w-6 h-6" />
              </div>
              <div className="space-y-2">
                <h4 className="font-headline font-black text-xl text-slate-900">
                  Ready to book this treatment?
                </h4>
                <p className="text-slate-500 text-xs leading-relaxed max-w-xs mx-auto">
                  Schedule your consultation today with our experienced specialists and start your smile/cosmetic transformation journey.
                </p>
              </div>

              <button 
                onClick={handleBookClick}
                className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-brandBlue to-brandSky text-white font-headline font-extrabold text-xs uppercase tracking-widest hover:shadow-lg shadow-md hover:brightness-105 transition-all cursor-pointer border-none"
              >
                Book Appointment
              </button>
            </div>

            {/* Helpline/Support Card */}
            <div className="bg-gradient-to-br from-brandBlue to-[#1b4393] text-white rounded-3xl p-6 sm:p-8 shadow-md relative overflow-hidden space-y-5">
              <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:12px_12px] pointer-events-none"></div>
              
              <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center">
                <Phone className="w-5 h-5 text-white" />
              </div>

              <div className="space-y-1">
                <h4 className="font-headline font-extrabold text-base leading-snug">
                  Need Help or Have Questions?
                </h4>
                <p className="text-white/70 text-[11px] leading-relaxed">
                  Call our 24/7 general helpline to ask about treatments, pricing, or emergency care schedules.
                </p>
              </div>

              <div className="space-y-2 pt-2">
                <a 
                  href="tel:+919489160055"
                  className="flex items-center justify-center gap-2.5 w-full py-3 bg-white text-brandBlue rounded-xl text-xs font-bold font-headline transition-colors hover:bg-slate-50"
                >
                  <Phone className="w-3.5 h-3.5" />
                  +91 94891 60055
                </a>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* ─── Bottom CTA Banner (New Dark Navy Aesthetic) ─── */}
      <TreatmentCtaBanner
        badgeText="Clinical Excellence"
        titlePrefix="Ready to Begin Your"
        highlightWord={treatment.title ? treatment.title.split(' ')[0] : "Treatment"}
        titleSuffix="Journey?"
        subtitle="Schedule your personalized consultation today with our experienced specialists and start your smile and cosmetic transformation."
        primaryBtnText="Book Free Consultation"
        onPrimaryClick={handleBookClick}
        secondaryBtnText="Call +91 94891 60000"
        secondaryBtnPhone="+919489160000"
      />
    </div>
  );
}
