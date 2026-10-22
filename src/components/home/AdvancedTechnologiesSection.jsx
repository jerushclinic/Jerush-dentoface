import React from 'react';
import { ArrowRight, ChevronRight, Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';
import { TECHNOLOGIES_DATA } from '../../data/technologiesData';

// Select 1 representative flagship technology per discipline for the clean 3x1 homepage grid
const FEATURED_3X1 = [
  TECHNOLOGIES_DATA.find(t => t.id === 'cad-cam-aligners'), // Dental
  TECHNOLOGIES_DATA.find(t => t.id === 'co2-fractional-laser'), // Cosmetic
  TECHNOLOGIES_DATA.find(t => t.id === 'gfc-therapy') // Hair
].filter(Boolean);

export default function AdvancedTechnologiesSection() {
  return (
    <section
      id="advanced-technologies"
      className="w-full py-16 sm:py-20 lg:py-24 bg-gradient-to-b from-white via-slate-50/70 to-white relative overflow-hidden font-body text-left select-none border-t border-slate-100"
    >
      {/* Soft atmospheric ambient glows */}
      <div className="absolute top-10 left-1/4 w-[500px] h-[500px] bg-brandBlue/5 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-[500px] h-[500px] bg-brandSky/5 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

        {/* ─── 1. SECTION HEADER ─── */}
        <div className="max-w-3xl mb-12 sm:mb-14">
          <span className="text-xs font-bold tracking-widest text-brandBlue uppercase mb-3 block font-headline">
            Advanced Clinical Infrastructure
          </span>

          <h2 className="font-headline font-extrabold text-3xl sm:text-4xl lg:text-[42px] text-slate-900 leading-tight tracking-tight">
            Cutting-Edge Technologies Across{' '}
            <span className="bg-gradient-to-r from-brandBlue via-[#1479BD] to-brandSky bg-clip-text text-transparent">
              Dental, Cosmetic &amp; Hair
            </span>
          </h2>

          <p className="text-secondary text-sm sm:text-base mt-3 leading-relaxed max-w-2xl font-medium">
            Every procedure at Jerush centres is driven by international medical-grade technology. Experience painless digital accuracy, laser cellular renewal, and biological follicle regeneration.
          </p>
        </div>

        {/* ─── 2. CINEMATIC 3x1 GRID (IMAGE-FORWARD WITH BLACKISH GRADIENT FADER) ─── */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {FEATURED_3X1.map((tech) => (
            <Link
              key={tech.id}
              to="/technologies"
              className="group relative h-[470px] sm:h-[510px] rounded-[28px] overflow-hidden bg-slate-950 border border-slate-200/80 shadow-[0_10px_30px_rgba(15,23,42,0.06)] hover:shadow-[0_22px_50px_rgba(20,121,189,0.22)] hover:border-brandSky/60 hover:-translate-y-1.5 transition-all duration-500 flex flex-col justify-end p-6 sm:p-7 cursor-pointer"
            >
              {/* Full-Bleed Edge-to-Edge Hero Image */}
              <img
                src={tech.image}
                alt={tech.title}
                className="absolute inset-0 w-full h-full object-cover object-center transition-transform duration-700 ease-out group-hover:scale-108 will-change-transform"
                loading="lazy"
              />

              {/* Blackish Bottom Fader Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/95 via-slate-950/60 via-45% to-transparent pointer-events-none transition-opacity duration-500 group-hover:from-slate-950 group-hover:via-slate-950/65" />

              {/* Subtle top ambient rim light on hover */}
              <div className="absolute inset-0 bg-gradient-to-b from-brandSky/15 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

              {/* Direct Content with Sleek Blackish Fader Depth */}
              <div className="relative z-10">
                {/* Discipline Pill Badge */}
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-900/75 backdrop-blur-md border border-white/15 mb-2.5 shadow-xs">
                  <span
                    className={`w-1.5 h-1.5 rounded-full ${
                      tech.category === 'dental'
                        ? 'bg-brandSky shadow-[0_0_6px_rgba(56,189,248,0.8)]'
                        : tech.category === 'cosmetic'
                          ? 'bg-pink-400 shadow-[0_0_6px_rgba(244,114,182,0.8)]'
                          : 'bg-amber-400 shadow-[0_0_6px_rgba(251,191,36,0.8)]'
                    }`}
                  />
                  <span
                    className={`text-[10px] font-extrabold tracking-[0.16em] uppercase font-headline ${
                      tech.category === 'dental'
                        ? 'text-sky-300'
                        : tech.category === 'cosmetic'
                          ? 'text-pink-300'
                          : 'text-amber-300'
                    }`}
                  >
                    {tech.categoryLabel}
                  </span>
                </div>

                {/* Title */}
                <h3 className="font-headline font-extrabold text-[18px] sm:text-[20px] text-white leading-snug tracking-tight group-hover:text-brandSky transition-colors line-clamp-2 drop-shadow-sm">
                  {tech.title}
                </h3>

                {/* Subtitle / Equipment */}
                <p className="text-slate-300 text-xs sm:text-[13px] font-medium mt-1.5 line-clamp-1">
                  {tech.equipmentName}
                </p>

                {/* Action Link Row */}
                <div className="mt-4 pt-3.5 border-t border-white/15 flex items-center justify-between text-xs font-headline font-bold text-white/90 group-hover:text-brandSky transition-colors">
                  <span className="uppercase tracking-wider text-[11px] font-bold">
                    Explore Technology
                  </span>
                  <div className="w-8 h-8 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white group-hover:bg-gradient-to-r group-hover:from-brandBlue group-hover:to-brandSky group-hover:border-transparent group-hover:shadow-[0_4px_14px_rgba(20,121,189,0.45)] flex items-center justify-center transition-all duration-300 group-hover:scale-110">
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* ─── 3. VIEW MORE AT BOTTOM ─── */}
        <div className="mt-12 sm:mt-14 text-center">
          <Link
            to="/technologies"
            className="inline-flex items-center gap-2.5 px-8 py-3.5 rounded-full bg-gradient-to-r from-brandBlue to-brandSky text-white font-headline font-bold text-xs uppercase tracking-wider shadow-md hover:shadow-xl hover:scale-[1.02] active:scale-95 transition-all cursor-pointer"
          >
            <span>View All Technologies &amp; Equipment</span>
            <ChevronRight className="w-4 h-4" />
          </Link>
        </div>

      </div>
    </section>
  );
}
