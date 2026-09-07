import React from 'react';
import { motion } from 'framer-motion';

const INFRASTRUCTURE_ITEMS = [
  {
    number: '01',
    title: 'Inpatient & Outpatient Facilities',
    image: '/images/infrastructure/ip-op-facilities.webp'
  },
  {
    number: '02',
    title: 'Patient-First Care',
    image: '/images/infrastructure/superior-patient-care.webp'
  },
  {
    number: '03',
    title: 'Inpatient Suites',
    image: '/images/infrastructure/bed-facility.webp'
  },
  {
    number: '04',
    title: 'Centres of Excellence',
    image: '/images/infrastructure/centres-of-excellence.webp'
  }
];

export default function InfrastructureSection() {
  return (
    <section id="clinical-infrastructure" className="w-full py-16 sm:py-20 lg:py-24 bg-white dark:bg-slate-900 border-t border-slate-100 dark:border-slate-800 relative overflow-hidden transition-colors duration-300 text-left">
      {/* Subtle ambient lighting glows with GPU layer promotion */}
      <div className="absolute top-1/4 right-0 w-[500px] h-[500px] bg-brandSky/6 rounded-full blur-[90px] pointer-events-none -mr-40 transform-gpu will-change-transform"></div>
      <div className="absolute bottom-1/4 left-0 w-[500px] h-[500px] bg-brandBlue/6 rounded-full blur-[90px] pointer-events-none -ml-40 transform-gpu will-change-transform"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-10 sm:mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-brandBlue/5 dark:bg-brandBlue/15 border border-brandBlue/15 dark:border-brandBlue/30 text-brandBlue dark:text-brandSky text-[11px] font-bold uppercase tracking-wider font-headline shadow-xs mb-4">
            <span className="w-2 h-2 rounded-full bg-brandSky relative">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-brandSky opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-brandSky"></span>
            </span>
            <span>State-of-the-Art Care</span>
          </div>

          <h2 className="font-headline font-extrabold text-3xl sm:text-4xl lg:text-[42px] text-slate-900 dark:text-white leading-tight tracking-tight">
            Patient Facilities &{' '}
            <span className="bg-gradient-to-r from-brandBlue via-[#1479BD] to-brandSky bg-clip-text text-transparent">
              Infrastructure
            </span>
          </h2>

          <p className="text-secondary dark:text-slate-400 text-sm sm:text-base mt-4 leading-relaxed max-w-2xl font-medium">
            We combine clinical expertise with premium hospital infrastructure to ensure your journey is safe, comfortable, and outstanding. Explore our advanced amenities designed for global healthcare standards.
          </p>
        </div>

        {/* Enhanced Image Showcase Cards Grid (Hardware accelerated & optimized) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-6 xl:gap-7">
          {INFRASTRUCTURE_ITEMS.map((item, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.15 }}
              transition={{ duration: 0.45, delay: idx * 0.08, ease: [0.25, 0.1, 0.25, 1] }}
              whileHover={{ y: -8 }}
              className="group relative h-[440px] sm:h-[480px] lg:h-[440px] xl:h-[470px] rounded-[28px] overflow-hidden bg-slate-900 border border-slate-200/70 dark:border-slate-800 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.08)] hover:shadow-[0_20px_40px_-10px_rgba(0,102,204,0.22)] hover:border-brandSky/50 transition-shadow transition-colors duration-300 flex flex-col justify-end cursor-pointer select-none transform-gpu"
            >
              {/* Full Background Clinic Image */}
              <img
                src={item.image}
                alt={item.title}
                width="800"
                height="1000"
                loading="lazy"
                decoding="async"
                className="absolute inset-0 w-full h-full object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105 transform-gpu"
              />

              {/* Enhanced Crystal-Clear Gradient Scrim */}
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/25 to-transparent pointer-events-none"></div>

              {/* Top Accent Gradient Bar on Hover */}
              <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-brandBlue via-[#198BC8] to-brandSky transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left z-20"></div>

              {/* Minimal Top Index Tag */}
              <div className="absolute top-4 left-4 z-20">
                <span className="inline-flex items-center justify-center px-2.5 py-1 rounded-full bg-slate-900/80 backdrop-blur-sm text-white/90 font-headline font-bold text-[10px] uppercase tracking-wider border border-white/15 shadow-sm">
                  {item.number}
                </span>
              </div>

              {/* Single Clean Title Overlay */}
              <div className="relative z-20 p-6 sm:p-7">
                <h3 className="font-headline font-extrabold text-lg sm:text-xl text-white leading-snug group-hover:text-brandSky transition-colors duration-300 drop-shadow-md">
                  {item.title}
                </h3>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}

