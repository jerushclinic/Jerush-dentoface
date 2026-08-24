import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Building, Calendar, Phone, ArrowRight, CheckCircle2, 
  MapPin, Clock, Award, ShieldCheck, Heart, Sparkles, Globe 
} from 'lucide-react';
import PageBreadcrumbHero from '../components/common/PageBreadcrumbHero';
import TreatmentCtaBanner from '../components/common/TreatmentCtaBanner';

export default function AboutPage() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('dental');

  const handleBookClick = () => {
    navigate('/contact');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleDoctorsClick = () => {
    navigate('/doctors');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleScrollToSection = (id) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const tabs = [
    {
      id: 'dental',
      label: '3D Dental & Implant Suite',
      image: '/images/treatments/dental_implants.png',
      features: ['Digital smile preview', 'Zero-pain laser procedures', 'Single-day ceramic crown capabilities'],
      desc: 'Our dental suite is outfitted with the latest 3D CBCT imaging and laser surgery tech, facilitating highly precise and comfortable dental treatments.'
    },
    {
      id: 'laser',
      label: 'Laser & Aesthetic Wing',
      image: '/images/treatments/fractional_co2_laser.png',
      features: ['Non-invasive skin tightening', 'Pigment correction', 'Anti-aging therapies'],
      desc: 'Housing US-FDA approved aesthetic laser systems and dedicated skin care rooms for non-surgical skin rejuvenation.'
    },
    {
      id: 'hair',
      label: 'Hair Restoration OTs',
      image: '/images/treatments/gfc_hair_therapy.png',
      features: ['Class-100 positive pressure cleanrooms', 'Graft survival optimization setups', 'Advanced FUE/DHI technology'],
      desc: 'Ultra-sterile, purpose-built hair transplant operating theatres maximizing graft viability and patient comfort.'
    },
    {
      id: 'vip',
      label: 'VIP & International Lounge',
      image: '/images/infrastructure/superior-patient-care.png',
      features: ['Zero wait time', 'Dedicated international liaison assistance', 'Private exit access'],
      desc: 'Premium lounges and private post-op recovery suites tailored for our international clientele and privacy-focused patients.'
    }
  ];

  const locations = [
    {
      city: 'Thuckalay, Kanyakumari',
      type: 'Flagship Hospital',
      specialties: 'Multi-Specialty Dental, Hair & Cosmetics',
      contact: '+91 94891 60055',
    },
    {
      city: 'Trichy, TN',
      type: 'Advanced Care Center',
      specialties: 'Laser Dentistry & Hair Restoration',
      contact: '+91 97510 10107',
    },
    {
      city: 'Chennai, TN',
      type: 'Cosmetic & Aesthetics Center',
      specialties: 'Digital Smile Design & Facial Aesthetics',
      contact: '+91 94891 60055',
    },
    {
      city: 'Dubai, UAE',
      type: 'Consultation & Patient Desk',
      specialties: 'Global Patient Liaison & Aesthetic Care',
      contact: '+971 50725 3105',
    },
    {
      city: 'USA & Australia',
      type: 'Overseas Liaison Desks',
      specialties: 'International Patient Care Coordination',
      contact: 'Direct Desk Online',
    }
  ];

  return (
    <div className="w-full bg-white font-body text-left relative pt-0 overflow-hidden">
      <PageBreadcrumbHero 
        title="About Our Hospital" 
        breadcrumbs={[{ label: 'About Our Hospital', active: true }]} 
      />

      {/* ─── 1. HERO LAYOUT: 60/40 SPLIT HERO ─── */}
      <section className="max-w-7xl mx-auto px-6 py-16 lg:py-24 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left 60% Content */}
          <div className="lg:col-span-7 space-y-8">
            <div className="space-y-4">
              <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brandBlue/5 border border-brandBlue/10 text-brandBlue font-headline font-bold text-[10px] uppercase tracking-wider">
                <Building className="w-3.5 h-3.5" /> About Jerush Healthcare
              </span>
              <h1 className="font-headline font-black text-4xl sm:text-5xl text-slate-900 leading-tight">
                Pioneering Patient-Centric Healthcare Across <span className="bg-gradient-to-r from-brandBlue to-brandSky bg-clip-text text-transparent">India & Overseas</span>
              </h1>
              <p className="text-slate-650 text-sm sm:text-base leading-relaxed font-normal">
                Integrating advanced dental care, hair restoration, and facial aesthetics under one roof with world-class medical standards.
              </p>
            </div>

            {/* Quick Stat Badges */}
            <div className="flex flex-wrap gap-3">
              <div className="px-4 py-2.5 rounded-2xl bg-slate-50 border border-slate-100 flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-brandSky"></span>
                <span className="text-xs font-bold text-slate-800">20+ Years Legacy</span>
              </div>
              <div className="px-4 py-2.5 rounded-2xl bg-slate-50 border border-slate-100 flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-brandBlue"></span>
                <span className="text-xs font-bold text-slate-800">50,000+ Happy Smiles</span>
              </div>
              <div className="px-4 py-2.5 rounded-2xl bg-slate-50 border border-slate-100 flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500"></span>
                <span className="text-xs font-bold text-slate-800">6 Global Hubs</span>
              </div>
            </div>

            {/* Action Group */}
            <div className="flex flex-wrap gap-4 pt-2">
              <button 
                onClick={() => handleScrollToSection('facility-explorer')}
                className="inline-flex items-center gap-2 px-6 py-3.5 bg-brandBlue hover:bg-brandBlue/90 text-white font-headline font-bold text-xs uppercase tracking-wider rounded-2xl shadow-md transition-all active:scale-[0.98]"
              >
                Explore Facilities <ArrowRight className="w-4 h-4" />
              </button>
              <button 
                onClick={handleDoctorsClick}
                className="inline-flex items-center gap-2 px-6 py-3.5 bg-slate-50 border border-slate-200 hover:bg-slate-100 text-slate-800 font-headline font-bold text-xs uppercase tracking-wider rounded-2xl shadow-sm transition-all active:scale-[0.98]"
              >
                Meet Our Doctors
              </button>
            </div>
          </div>

          {/* Right 40% Video */}
          <div className="lg:col-span-5 relative">
            <div className="relative aspect-[3/4] w-full rounded-3xl overflow-hidden shadow-2xl border-4 border-white/50 bg-slate-900">
              <video 
                src="/videos/jerush-hero-video.mp4" 
                autoPlay 
                loop 
                muted 
                playsInline 
                preload="auto"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900/40 via-transparent to-transparent"></div>
              
              {/* Decorative Glow Ring */}
              <div className="absolute -inset-4 border border-brandSky/20 rounded-[36px] pointer-events-none animate-pulse"></div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── 2. LEADERSHIP SPOTLIGHT ─── */}
      <section className="w-full py-20 bg-slate-50 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-brandBlue/3 rounded-full blur-[120px] pointer-events-none"></div>
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Founder Image Card */}
            <div className="lg:col-span-5 flex justify-center">
              <div className="relative w-full max-w-sm">
                <div className="absolute inset-0 bg-brandBlue/10 rounded-3xl transform translate-x-3 translate-y-3"></div>
                <div className="relative rounded-3xl overflow-hidden shadow-xl aspect-[4/5] bg-white border border-slate-100 p-3">
                  <img 
                    src="/images/doctors/dr-bladbin-profile2.webp" 
                    alt="Dr. A. Bladbin - Chairman & Founder" 
                    className="w-full h-full object-cover rounded-2xl"
                  />
                </div>
              </div>
            </div>

            {/* Quote details */}
            <div className="lg:col-span-7 space-y-6 text-left">
              <div className="inline-flex items-center gap-1 text-[11px] font-black uppercase tracking-wider text-brandSky">
                <Sparkles className="w-3.5 h-3.5" /> Founder's Message
              </div>
              <div className="relative">
                <span className="absolute -top-6 -left-6 text-6xl text-brandSky/20 font-serif leading-none">“</span>
                <p className="font-headline font-semibold text-lg sm:text-xl text-slate-800 leading-relaxed italic relative z-10">
                  True medical care goes beyond treatment—it is about trust, precision, and delivering life-changing confidence to every patient who walks through our doors.
                </p>
              </div>
              <div>
                <h4 className="font-headline font-extrabold text-slate-900 text-base">Dr. A. Bladbin</h4>
                <p className="text-xs text-slate-500 font-bold uppercase tracking-wider mt-0.5">Chairman & Founder | Jerush Healthcare Group</p>
              </div>

              {/* Sign-off Quick links */}
              <div className="flex flex-wrap gap-4 pt-4 border-t border-slate-200/60">
                <Link 
                  to="/leadership/dr-a-bladbin-chairman-founder"
                  className="inline-flex items-center gap-1.5 text-xs font-bold text-brandBlue hover:text-brandSky transition-colors uppercase tracking-wider font-headline"
                >
                  Read Founder's Vision <ArrowRight className="w-3.5 h-3.5" />
                </Link>
                <span className="text-slate-300">|</span>
                <Link 
                  to="/doctors"
                  className="inline-flex items-center gap-1.5 text-xs font-bold text-brandBlue hover:text-brandSky transition-colors uppercase tracking-wider font-headline"
                >
                  Medical Board Profile <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── 3. FACILITY EXPLORER: INTERACTIVE TABBED SHOWCASE ─── */}
      <section id="facility-explorer" className="max-w-7xl mx-auto px-6 py-20 lg:py-24">
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brandBlue/5 border border-brandBlue/10 text-brandBlue font-headline font-bold text-[10px] uppercase tracking-wider">
            Clinical Infrastructure
          </span>
          <h2 className="font-headline font-black text-3xl sm:text-4xl text-slate-900">
            Explore Our World-Class Facilities
          </h2>
          <p className="text-slate-500 text-sm leading-relaxed">
            Take a look inside our high-tech clinics custom built for dental surgical precision, sterile aesthetics, and elite patient care.
          </p>
        </div>

        {/* Tabs Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Tabs Menu Column (Left 4 cols) */}
          <div className="lg:col-span-4 flex flex-col gap-2.5">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`w-full px-5 py-4 rounded-2xl font-headline font-extrabold text-xs sm:text-sm text-left transition-all duration-300 border flex items-center justify-between ${
                  activeTab === tab.id
                    ? 'bg-brandBlue text-white border-brandBlue shadow-md scale-[1.02]'
                    : 'bg-white text-slate-700 border-slate-100 hover:bg-slate-50'
                }`}
              >
                <span>{tab.label}</span>
                <ArrowRight className={`w-4 h-4 transition-transform ${activeTab === tab.id ? 'translate-x-1' : 'opacity-40'}`} />
              </button>
            ))}
          </div>

          {/* Active Tab Panel Column (Right 8 cols) */}
          <div className="lg:col-span-8 bg-slate-50/50 border border-slate-100 rounded-3xl p-6 sm:p-8 min-h-[420px] flex flex-col justify-between">
            <AnimatePresence mode="wait">
              {tabs.map((tab) => {
                if (tab.id !== activeTab) return null;
                return (
                  <motion.div
                    key={tab.id}
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -15 }}
                    transition={{ duration: 0.3 }}
                    className="grid grid-cols-1 md:grid-cols-2 gap-8 h-full items-center"
                  >
                    {/* Left: Content details */}
                    <div className="space-y-6 text-left">
                      <div className="space-y-2">
                        <h3 className="font-headline font-black text-xl text-slate-900">{tab.label}</h3>
                        <p className="text-slate-500 text-xs sm:text-sm leading-relaxed">{tab.desc}</p>
                      </div>
                      <div className="space-y-2.5">
                        <p className="text-xs font-bold text-slate-800 uppercase tracking-wider">Key Facilities:</p>
                        <ul className="space-y-2">
                          {tab.features.map((feature, i) => (
                            <li key={i} className="flex items-start gap-2 text-xs sm:text-sm text-slate-600">
                              <CheckCircle2 className="w-4 h-4 text-brandSky shrink-0 mt-0.5" />
                              <span>{feature}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                    {/* Right: Image showcase */}
                    <div className="relative aspect-[4/3] rounded-2xl overflow-hidden bg-slate-100 border border-slate-100 shadow-md">
                      <img 
                        src={tab.image} 
                        alt={tab.label} 
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </div>
        </div>
      </section>

      {/* ─── 4. INTERACTIVE GLOBAL FOOTPRINT PINBOARD ─── */}
      <section className="w-full py-20 bg-slate-50 border-y border-slate-100">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
            <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brandBlue/5 border border-brandBlue/10 text-brandBlue font-headline font-bold text-[10px] uppercase tracking-wider">
              <Globe className="w-3.5 h-3.5" /> Global Access
            </span>
            <h2 className="font-headline font-black text-3xl sm:text-4xl text-slate-900">
              Interactive Global Footprint
            </h2>
            <p className="text-slate-500 text-sm leading-relaxed">
              Serving patients across our flagship hospitals in South India, consultation desks in the GCC, and liaison coordinators overseas.
            </p>
          </div>

          {/* Locations Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {locations.map((loc, idx) => (
              <div 
                key={idx}
                className="bg-white border border-slate-100 rounded-3xl p-6 shadow-sm hover:shadow-md hover:border-brandSky/20 transition-all duration-300 flex flex-col justify-between text-left group"
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-brandBlue/5 text-[9px] font-black uppercase tracking-wider text-brandBlue">
                      {loc.type}
                    </span>
                    <MapPin className="w-4 h-4 text-brandSky group-hover:animate-bounce" />
                  </div>
                  <div className="space-y-1">
                    <h4 className="font-headline font-black text-base text-slate-900">{loc.city}</h4>
                    <p className="text-slate-550 text-xs leading-relaxed font-body">{loc.specialties}</p>
                  </div>
                </div>

                <div className="mt-6 pt-4 border-t border-slate-50 flex items-center justify-between">
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Direct Desk</span>
                  <a 
                    href={loc.contact.startsWith('+') ? `tel:${loc.contact.replace(/\s+/g, '')}` : '#'}
                    className="text-xs font-black text-brandBlue hover:text-brandSky font-headline flex items-center gap-1"
                  >
                    {loc.contact}
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── 5. BOTTOM CALL TO ACTION (New Dark Navy Aesthetic) ─── */}
      <TreatmentCtaBanner
        badgeText="Managing Director"
        titlePrefix="Ready to Experience"
        highlightWord="Next-Gen Healthcare?"
        titleSuffix=""
        subtitle="Book a consultation with our senior specialists at your nearest location. Experience state-of-the-art diagnostic testing, laser treatments, and patient care today."
        primaryBtnText="Schedule Consultation"
        onPrimaryClick={handleBookClick}
        secondaryBtnText="Call Helpline"
        secondaryBtnPhone="+919489160055"
        doctorImage="/images/doctors/binila1.webp"
        doctorName="DR. C. BINILA BLADBIN"
        doctorRole="Managing Director"
        doctorAlt="DR. C. BINILA BLADBIN - Managing Director"
      />
    </div>
  );
}
