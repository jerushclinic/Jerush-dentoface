import React from 'react';
import { motion } from 'framer-motion';

const INFRASTRUCTURE_ITEMS = [
  {
    title: 'Inpatient & Outpatient Facilities',
    image: '/images/infrastructure/ip-op-facilities.png',
    description: 'Spacious outpatient consulting rooms and welcoming reception lounges designed to deliver stress-free dental and cosmetic consultations.'
  },
  {
    title: 'Patient-First Care',
    image: '/images/infrastructure/superior-patient-care.png',
    description: 'A compassionate, patient-first approach led by highly qualified periodontists, orthodontists, and aesthetic dermatologists.'
  },
  {
    title: 'Inpatient Suites',
    image: '/images/infrastructure/bed-facility.png',
    description: 'Comfortable private inpatient suites and recovery rooms equipped with adjustable beds and warm, premium interiors.'
  },
  {
    title: 'Centres of Excellence',
    image: '/images/infrastructure/centres-of-excellence.png',
    description: 'Equipped with in-house German CAD/CAM 3D scanning labs, digital diagnostic units, and world-class dental lasers.'
  }
];

export default function InfrastructureSection() {
  return (
    <section id="clinical-infrastructure" className="w-full py-16 lg:py-24 bg-slate-50 dark:bg-slate-900/50 border-t border-slate-100 dark:border-slate-800 relative overflow-hidden transition-colors duration-300 text-left">
      {/* Decorative Blur Blobs */}
      <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-brandSky/5 rounded-full blur-[120px] pointer-events-none -mr-40 -mt-20"></div>
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-brandBlue/5 rounded-full blur-[120px] pointer-events-none -ml-40 -mb-20"></div>
      <div className="absolute inset-0 opacity-[0.015] pointer-events-none bg-[linear-gradient(to_right,#808080_1px,transparent_1px),linear-gradient(to_bottom,#808080_1px,transparent_1px)] bg-[size:30px_30px]"></div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        {/* Section Header */}
        <div className="max-w-3xl mb-12 lg:mb-16">
          <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-brandBlue/5 dark:bg-brandBlue/10 border border-brandBlue/10 dark:border-brandBlue/20 text-brandBlue dark:text-brandSky text-[10px] font-bold uppercase tracking-wider font-headline">
            State-of-the-Art Care
          </span>

          <h2 className="font-headline font-extrabold text-3xl sm:text-4xl lg:text-5xl text-slate-900 dark:text-white mt-3 leading-tight">
            Patient Facilities & <span className="bg-gradient-to-r from-brandBlue to-brandSky bg-clip-text text-transparent">Infrastructure</span>
          </h2>

          <p className="text-slate-500 dark:text-slate-450 text-sm sm:text-base mt-4 max-w-2xl leading-relaxed">
            We combine clinical expertise with premium hospital infrastructure to ensure your journey is safe, comfortable, and outstanding. Explore our advanced amenities designed for global healthcare standards.
          </p>
        </div>

        {/* Infrastructure Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {INFRASTRUCTURE_ITEMS.map((item, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.5, delay: idx * 0.1, ease: 'easeOut' }}
              className="relative h-[420px] rounded-3xl overflow-hidden group shadow-md hover:shadow-xl border border-slate-100 dark:border-slate-800 bg-white dark:bg-slate-800 transition-all duration-300"
            >
              {/* Card Image */}
              <div className="absolute inset-0 w-full h-full">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                  loading="lazy"
                />
                {/* Default Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent opacity-85 group-hover:opacity-90 transition-opacity duration-300"></div>
              </div>

              {/* Card Content (Standard bottom state) */}
              <div className="absolute inset-x-0 bottom-0 p-6 flex flex-col justify-end h-full z-10 transition-transform duration-300">
                <h3 className="font-headline font-bold text-lg text-white group-hover:translate-y-[-10px] transition-transform duration-300">
                  {item.title}
                </h3>

                {/* Interactive Details (reveal on hover) */}
                <div className="max-h-0 opacity-0 overflow-hidden group-hover:max-h-[120px] group-hover:opacity-100 transition-all duration-500 ease-out">
                  <p className="text-xs text-slate-200 leading-relaxed font-body mt-2">
                    {item.description}
                  </p>
                </div>
              </div>

              {/* Decorative accent top line */}
              <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-brandBlue to-brandSky transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
