import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Briefcase, MapPin, Clock, Send, ChevronRight, CheckCircle2,
  Sparkles, ChevronLeft, Building2, UserCheck, ShieldCheck, HeartPulse
} from 'lucide-react';
import ApplicationModal from '../components/common/ApplicationModal';
import { careerService } from '../services/careerService';
import { defaultCareers } from '../data/careers';

// Hero Slider Data
const HERO_SLIDES = [
  {
    tag: 'JOIN OUR TEAMS',
    heading: 'Build Your Healthcare Career with Jerush',
    subtext: 'Be a part of Southern Tamil Nadu’s leading multi-specialty dental and cosmetic healthcare institution with branches across Thuckalay, Nagercoil, and Chennai.',
    statNumber: '150+',
    statLabel: 'Healthcare Professionals',
    image: 'https://images.unsplash.com/photo-1629909613654-28e377c37b09?auto=format&fit=crop&w=1400&q=80'
  },
  {
    tag: 'EXCELLENCE & INNOVATION',
    heading: 'Work with Advanced Dental Technology & Expert Surgeons',
    subtext: 'Access state-of-the-art diagnostic tools, 3D intraoral scanners, CAD/CAM dental labs, and advanced laser systems.',
    statNumber: '25+',
    statLabel: 'Years of Clinical Trust',
    image: 'https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&w=1400&q=80'
  },
  {
    tag: 'CAREER GROWTH',
    heading: 'Continuous Mentorship & Professional Development',
    subtext: 'We invest in our staff through continuous surgical training, clinical workshops, and transparent performance growth pathways.',
    statNumber: '3+',
    statLabel: 'Multi-Specialty Branches',
    image: 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&w=1400&q=80'
  }
];

export default function CareersPage() {
  const [activeSlide, setActiveSlide] = useState(0);
  const [careers, setCareers] = useState(defaultCareers);
  const [loading, setLoading] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);

  // Preload hero slide images and set auto-play slider
  useEffect(() => {
    HERO_SLIDES.forEach((slide) => {
      const img = new Image();
      img.src = slide.image;
    });

    const interval = setInterval(() => {
      setActiveSlide((prev) => (prev + 1) % HERO_SLIDES.length);
    }, 6000);
    return () => clearInterval(interval);
  }, []);

  // Fetch job openings from service / API in background
  useEffect(() => {
    careerService.getCareers()
      .then((data) => {
        if (Array.isArray(data) && data.length > 0) {
          setCareers(data);
        } else if (data && Array.isArray(data.data) && data.data.length > 0) {
          setCareers(data.data);
        }
      })
      .catch((err) => {
        console.error("Error loading job positions:", err);
      });
  }, []);

  const handleApplyClick = (e) => {
    if (e) e.preventDefault();
    setModalOpen(true);
  };

  return (
    <div className="bg-slate-50/50 text-slate-800 min-h-screen pt-0 font-body relative overflow-hidden text-left">
      {/* Hero Banner Slider (100% Full Viewport Height across all responsive devices) */}
      <section className="relative w-full h-[100dvh] xl:h-[calc(100dvh-var(--topbar-height,44px))] min-h-[540px] bg-slate-950 text-white overflow-hidden flex flex-col justify-center py-12 sm:py-16">
        {HERO_SLIDES.map((slide, idx) => (
          <motion.div
            key={idx}
            initial={false}
            animate={{
              opacity: idx === activeSlide ? 1 : 0,
              scale: idx === activeSlide ? 1 : 1.04
            }}
            transition={{ duration: 0.8, ease: "easeInOut" }}
            className="absolute inset-0 z-0 pointer-events-none"
          >
            <img
              src={slide.image}
              alt={slide.heading}
              className="w-full h-full object-cover opacity-75"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-slate-950/95 via-slate-950/75 to-slate-950/40" />
            <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-slate-950 via-slate-950/90 to-transparent pointer-events-none" />
          </motion.div>
        ))}        <div className="max-w-7xl mx-auto px-12 sm:px-20 lg:px-24 relative z-10 w-full py-4 my-auto">
          <div className="max-w-3xl">

            <motion.div
              key={`content-${activeSlide}`}
              initial={activeSlide === 0 ? false : { opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35, ease: "easeOut" }}
              className="space-y-4 sm:space-y-6"
            >
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-brandSky/15 border border-brandSky/30 backdrop-blur-md">
                <Sparkles className="w-3.5 h-3.5 text-brandSky" />
                <span className="text-[10px] sm:text-[11px] font-extrabold text-brandSky uppercase tracking-widest font-headline">
                  {HERO_SLIDES[activeSlide].tag}
                </span>
              </div>

              <h2 className="font-headline font-black text-2xl sm:text-4xl md:text-5xl text-white leading-tight">
                {HERO_SLIDES[activeSlide].heading}
              </h2>

              <p className="text-slate-300 text-xs sm:text-base leading-relaxed max-w-2xl font-body">
                {HERO_SLIDES[activeSlide].subtext}
              </p>

              <div className="pt-2 flex flex-wrap items-center gap-3 sm:gap-4">
                <a
                  href="#careers-openings-section"
                  className="px-5 sm:px-7 py-3 sm:py-3.5 bg-gradient-to-r from-brandBlue to-brandSky text-white font-headline font-extrabold text-xs uppercase tracking-wider rounded-xl shadow-lg hover:shadow-brandSky/30 transition-all hover:scale-102"
                >
                  View Open Positions
                </a>
                <button
                  type="button"
                  onClick={handleApplyClick}
                  className="px-5 sm:px-7 py-3 sm:py-3.5 bg-white/10 hover:bg-white/20 border border-white/20 text-white font-headline font-extrabold text-xs uppercase tracking-wider rounded-xl backdrop-blur-md transition-all cursor-pointer"
                >
                  General Application
                </button>
              </div>
            </motion.div>

          </div>
        </div>

        {/* Carousel Navigation Buttons */}
        <button
          onClick={() => setActiveSlide((prev) => (prev - 1 + HERO_SLIDES.length) % HERO_SLIDES.length)}
          className="absolute left-2 sm:left-4 md:left-6 top-1/2 -translate-y-1/2 w-9 h-9 sm:w-11 sm:h-11 rounded-full bg-slate-900/80 border border-slate-700/80 text-white hover:text-brandSky flex items-center justify-center transition-all z-20 cursor-pointer shadow-lg hover:scale-105"
          aria-label="Previous Slide"
        >
          <ChevronLeft className="w-4 h-4 sm:w-5 sm:h-5" />
        </button>
        <button
          onClick={() => setActiveSlide((prev) => (prev + 1) % HERO_SLIDES.length)}
          className="absolute right-2 sm:right-4 md:right-6 top-1/2 -translate-y-1/2 w-9 h-9 sm:w-11 sm:h-11 rounded-full bg-slate-900/80 border border-slate-700/80 text-white hover:text-brandSky flex items-center justify-center transition-all z-20 cursor-pointer shadow-lg hover:scale-105"
          aria-label="Next Slide"
        >
          <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5" />
        </button>

        {/* Carousel Indicator Dots */}
        <div className="absolute bottom-5 sm:bottom-8 left-1/2 -translate-x-1/2 flex gap-2.5 z-20">
          {HERO_SLIDES.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setActiveSlide(idx)}
              className={`h-2.5 rounded-full transition-all cursor-pointer ${idx === activeSlide ? 'bg-brandSky w-7' : 'bg-white/40 hover:bg-white/70 w-2.5'
                }`}
              aria-label={`Go to slide ${idx + 1}`}
            />
          ))}
        </div>
      </section>

      {/* Main Content Area */}
      <div className="max-w-7xl mx-auto px-6 relative z-10 py-16 sm:py-24">

        {/* 1. CURRENT OPENINGS SECTION */}
        <section id="careers-openings-section" className="mb-24 scroll-mt-24">
          <div className="text-center mb-12">
            <h3 className="font-headline font-black text-3xl sm:text-4xl text-slate-900">
              Current <span className="bg-gradient-to-r from-brandBlue to-brandSky bg-clip-text text-transparent">Openings</span>
            </h3>
            <p className="text-slate-500 text-sm sm:text-base mt-3 max-w-2xl mx-auto leading-relaxed font-medium">
              Explore our active job openings across clinical, cosmetic, and support departments.
            </p>
          </div>

          {loading ? (
            <div className="flex items-center justify-center py-16">
              <div className="w-8 h-8 border-3 border-brandBlue border-t-transparent rounded-full animate-spin"></div>
            </div>
          ) : careers.length === 0 ? (
            <div className="bg-white border border-slate-200/80 rounded-3xl p-12 text-center shadow-sm max-w-xl mx-auto">
              <div className="w-16 h-16 rounded-2xl bg-brandBlue/5 flex items-center justify-center mx-auto mb-4 text-brandBlue">
                <Briefcase className="w-8 h-8" />
              </div>
              <h4 className="font-headline font-bold text-lg text-slate-900 mb-2">No Open Positions</h4>
              <p className="text-sm text-slate-500 leading-relaxed mb-6 font-medium">
                Currently we do not have any active open positions listed. However, we are always looking for exceptional clinical and technical talent.
              </p>
              <button
                type="button"
                onClick={handleApplyClick}
                className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-brandBlue to-brandSky text-white font-headline font-bold text-xs uppercase tracking-wider rounded-xl shadow-md hover:shadow-lg transition-all cursor-pointer"
              >
                Submit General Application
              </button>
            </div>
          ) : (
            <div className="space-y-8 max-w-7xl mx-auto">
              {careers.map((job) => (
                <motion.div
                  key={job.id}
                  initial={false}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-30px" }}
                  transition={{ duration: 0.35, ease: "easeOut" }}
                  className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-white via-blue-50/40 to-sky-50/60 border border-slate-200/80 hover:border-brandSky/60 shadow-md hover:shadow-xl hover:shadow-brandBlue/5 transition-colors transition-shadow duration-300 text-left p-6 sm:p-8 group"
                >
                  {/* Soft ambient gradient blur accent */}
                  <div className="absolute -top-10 -right-10 w-72 h-72 bg-brandSky/10 rounded-full blur-3xl pointer-events-none group-hover:bg-brandSky/20 transition-all duration-500" />

                  <div className="flex flex-col lg:flex-row items-stretch gap-6 sm:gap-8 relative z-10">

                    {/* Left side: Prominent Job Image / Illustration */}
                    <div className="w-full lg:w-96 min-h-[260px] max-h-[360px] rounded-2xl overflow-hidden bg-slate-900/5 border border-slate-200/80 shrink-0 shadow-sm relative flex items-center justify-center p-2">
                      <img
                        src={job.image || 'https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&w=800&q=80'}
                        alt={job.title}
                        className="w-full h-full max-h-[340px] object-contain rounded-xl transition-transform duration-500 group-hover:scale-102"
                        loading="lazy"
                      />
                    </div>


                    {/* Right side: Detailed Role Content */}
                    <div className="flex-1 flex flex-col justify-between space-y-4">
                      <div>
                        {/* Title & Department Badges */}
                        <div className="flex flex-wrap items-center justify-between gap-3">
                          <h4 className="font-headline font-black text-2xl sm:text-3xl text-slate-900 group-hover:text-brandBlue transition-colors leading-tight">
                            {job.title}
                          </h4>
                          <span className="text-[11px] font-extrabold uppercase tracking-wider px-3.5 py-1 rounded-xl bg-brandBlue/10 border border-brandBlue/20 text-brandBlue shadow-2xs font-headline">
                            {job.department}
                          </span>
                        </div>

                        {/* Location & Experience Meta tags */}
                        <div className="flex flex-wrap items-center gap-x-3 gap-y-2 mt-3 text-xs text-slate-700 font-semibold">
                          <span className="flex items-center gap-1.5 bg-white border border-slate-200 px-3 py-1 rounded-xl shadow-2xs text-brandBlue font-bold uppercase text-[10px] tracking-wider">
                            <Briefcase className="w-3.5 h-3.5 text-brandSky shrink-0" /> {job.type || 'Full-Time'}
                          </span>
                          <span className="flex items-center gap-1.5 bg-white border border-slate-200 px-3 py-1 rounded-xl shadow-2xs">
                            <MapPin className="w-3.5 h-3.5 text-brandSky shrink-0" /> {job.location}
                          </span>
                          <span className="flex items-center gap-1.5 bg-white border border-slate-200 px-3 py-1 rounded-xl shadow-2xs">
                            <Clock className="w-3.5 h-3.5 text-brandSky shrink-0" /> {job.experience || 'Experienced'}
                          </span>
                        </div>


                        {/* Role Description */}
                        <p className="text-slate-650 text-sm mt-4 leading-relaxed font-medium">
                          {job.description}
                        </p>

                        {/* Key Requirements List */}
                        {job.requirements && job.requirements.length > 0 && (
                          <div className="mt-4 pt-4 border-t border-slate-200/80">
                            <span className="text-[11px] font-extrabold text-slate-400 uppercase tracking-widest block mb-2 font-headline">
                              Key Requirements & Qualifications
                            </span>
                            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                              {job.requirements.map((req, i) => (
                                <li key={i} className="flex items-start gap-2 text-xs text-slate-750 font-semibold">
                                  <Sparkles className="w-3.5 h-3.5 text-brandSky mt-0.5 shrink-0" />
                                  <span>{req}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        )}
                      </div>

                      {/* Card Footer: Job Ref & Single Clean CTA Button */}
                      <div className="pt-4 border-t border-slate-200/80 flex flex-wrap items-center justify-between gap-4">
                        <span className="text-[10px] text-slate-400 font-bold uppercase tracking-widest font-headline">
                          Ref Code: #JD-{job.id}
                        </span>

                        <button
                          type="button"
                          onClick={handleApplyClick}
                          className="inline-flex items-center gap-2 px-7 py-3 bg-gradient-to-r from-brandBlue to-brandSky text-white font-headline font-extrabold text-xs uppercase tracking-wider rounded-xl shadow-md hover:shadow-lg hover:shadow-brandBlue/20 hover:scale-102 transition-all cursor-pointer border-none"
                        >
                          <Send className="w-4 h-4" />
                          Apply Now
                        </button>
                      </div>

                    </div>

                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </section>


        {/* 2. WHY JERUSH? SECTION (APPLE GLASSMORPHIC DESIGN - 60FPS SMOOTH SCROLL OPTIMIZED) */}
        <section className="mb-24 relative overflow-hidden rounded-[2.5rem] bg-gradient-to-br from-slate-50 via-blue-50/50 to-sky-100/40 p-8 sm:p-12 lg:p-16 border border-white/90 shadow-[0_20px_50px_rgba(40,83,164,0.06)] transform-gpu">
          {/* Hardware-accelerated Ambient Glowing Orbs behind glass */}
          <div className="absolute -top-20 -left-20 w-96 h-96 bg-brandSky/25 rounded-full blur-3xl pointer-events-none transform-gpu will-change-transform" />
          <div className="absolute top-1/2 -right-20 w-96 h-96 bg-brandBlue/15 rounded-full blur-3xl pointer-events-none transform-gpu will-change-transform" />
          <div className="absolute -bottom-20 left-1/3 w-96 h-96 bg-indigo-300/20 rounded-full blur-3xl pointer-events-none transform-gpu will-change-transform" />

          {/* Section Header */}
          <div className="text-center mb-12 sm:mb-16 relative z-10">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/75 backdrop-blur-md border border-white/90 shadow-xs mb-4">
              <Sparkles className="w-3.5 h-3.5 text-brandSky animate-pulse" />
              <span className="text-[11px] font-extrabold uppercase tracking-widest text-slate-700 font-headline">
                Why Work With Us
              </span>
            </div>

            <h3 className="font-headline font-black text-3xl sm:text-4xl lg:text-5xl text-slate-900 tracking-tight">
              Why Join <span className="bg-gradient-to-r from-brandBlue via-brandSky to-blue-600 bg-clip-text text-transparent">Jerush?</span>
            </h3>

            <p className="text-slate-600 text-sm sm:text-base mt-4 max-w-2xl mx-auto leading-relaxed font-medium">
              We empower our healthcare professionals with continuous mentorship, cutting-edge clinical tools, and clear career growth.
            </p>
          </div>

          {/* 6 Glassmorphic Feature Cards (GPU Hardware Accelerated) */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 relative z-10">
            {[
              {
                iconImg: '/images/careers/surgical-mentorship-training.webp',
                title: 'Surgical Mentorship & Training',
                desc: 'Work alongside renowned senior surgeons, participate in advanced case studies, and upgrade your surgical skills.'
              },
              {
                iconImg: '/images/careers/state-of-the-art-technology.webp',
                title: 'State-of-the-Art Technology',
                desc: 'Access 3D intraoral scanners, CAD/CAM dental labs, operating suites, and advanced aesthetic laser systems.'
              },
              {
                iconImg: '/images/careers/years-legacy-of-trust.webp',
                title: '25+ Years Legacy of Trust',
                desc: 'Be part of Southern India’s trusted multi-specialty institution serving thousands of patients across Thuckalay, Nagercoil, and Chennai.'
              },
              {
                iconImg: '/images/careers/competitive-benefits-perks.webp',
                title: 'Competitive Benefits & Perks',
                desc: 'Enjoy industry-leading salary structures, performance bonuses, health coverage, paid leaves, and flexible working shifts.'
              },
              {
                iconImg: '/images/careers/supportive-work-culture.webp',
                title: 'Supportive Work Culture',
                desc: 'Experience a positive, collaborative environment where clinical excellence and team well-being come first.'
              },
              {
                iconImg: '/images/careers/career-promotion-pathways.webp',
                title: 'Clear Career Promotion Pathways',
                desc: 'Transparent growth metrics for clinicians, nurses, lab techs, and administrative leaders to reach executive roles.'
              }
            ].map((feature, idx) => (
              <div
                key={idx}
                className="relative group rounded-3xl p-6 sm:p-8 backdrop-blur-md bg-white/70 hover:bg-white/90 border border-white/80 hover:border-brandSky/50 shadow-[0_8px_25px_-5px_rgba(40,83,164,0.06),inset_0_1px_1px_rgba(255,255,255,0.9)] hover:shadow-[0_16px_35px_rgba(40,83,164,0.12),inset_0_1px_1px_rgba(255,255,255,1)] transition-all duration-300 ease-out transform-gpu flex flex-col items-start overflow-hidden text-left"
              >
                {/* Top specular highlight line (Apple signature glass edge shine) */}
                <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white to-transparent pointer-events-none" />

                {/* Soft ambient highlight glow inside card on hover */}
                <div className="absolute -bottom-10 -right-10 w-44 h-44 bg-brandSky/15 rounded-full blur-xl pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300 transform-gpu" />

                {/* Glassmorphic Icon Bubble */}
                <div className="relative w-20 h-20 sm:w-24 sm:h-24 rounded-2xl bg-white/80 backdrop-blur-md border border-white/90 shadow-[0_4px_16px_rgba(40,83,164,0.05),inset_0_1px_1px_rgba(255,255,255,1)] flex items-center justify-center p-3 sm:p-3.5 group-hover:scale-105 group-hover:bg-white group-hover:shadow-[0_8px_20px_rgba(40,83,164,0.10)] transition-all duration-300 mb-6 transform-gpu">
                  <img
                    src={feature.iconImg}
                    alt={feature.title}
                    className="w-full h-full object-contain filter drop-shadow-xs"
                  />
                </div>

                <h4 className="font-headline font-extrabold text-lg sm:text-xl text-slate-900 group-hover:text-brandBlue transition-colors leading-snug mb-2.5 relative z-10">
                  {feature.title}
                </h4>

                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-medium relative z-10">
                  {feature.desc}
                </p>
              </div>
            ))}
          </div>
        </section>


        {/* 3. GENERAL APPLICATION CTA */}
        <section>
          <div className="relative rounded-3xl overflow-hidden bg-gradient-to-r from-slate-900 via-[#16274D] to-brandBlue shadow-2xl p-8 sm:p-12 text-left border border-white/5">
            <div className="absolute top-0 left-0 w-96 h-96 bg-brandSky/10 rounded-full -translate-x-1/3 -translate-y-1/3 blur-3xl pointer-events-none"></div>
            <div className="absolute bottom-0 right-0 w-96 h-96 bg-brandBlue/10 rounded-full translate-x-1/3 translate-y-1/3 blur-3xl pointer-events-none"></div>

            <div className="relative z-10 max-w-3xl mx-auto text-center space-y-6">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 border border-white/10">
                <span className="w-1.5 h-1.5 rounded-full bg-brandSky"></span>
                <span className="text-[9px] font-bold text-brandSky uppercase tracking-widest font-headline">
                  General Applications
                </span>
              </div>

              <h3 className="font-headline font-black text-2xl sm:text-3xl text-white">
                Don't See Your Role Listed?
              </h3>
              <p className="text-slate-300 text-sm sm:text-base leading-relaxed max-w-2xl mx-auto font-body">
                We're always interested in hearing from talented healthcare professionals.
                Send us your resume and cover letter and we'll reach out when a suitable position opens up.
              </p>

              <div className="pt-2 flex flex-col sm:flex-row justify-center items-center gap-4">
                <button
                  type="button"
                  onClick={handleApplyClick}
                  className="w-full sm:w-auto px-8 py-3.5 bg-white text-brandBlue font-headline font-bold text-xs rounded-xl shadow-lg hover:shadow-black/20 hover:-translate-y-0.5 transition-all text-center uppercase tracking-wider cursor-pointer"
                >
                  Submit Your Resume
                </button>
                <a
                  href="mailto:jerushrecruitment@gmail.com"
                  className="w-full sm:w-auto flex items-center justify-center gap-2 text-white font-headline font-bold text-xs border border-white/20 px-6 py-3.5 rounded-xl transition-colors text-center"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span className="uppercase tracking-wider">Email:</span>
                  <span className="lowercase font-bold text-white tracking-normal">jerushrecruitment@gmail.com</span>
                </a>
              </div>
            </div>
          </div>
        </section>

      </div>

      {/* General Application Modal Popup */}
      <ApplicationModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
      />
    </div>
  );
}
