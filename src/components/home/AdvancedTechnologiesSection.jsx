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

        {/* ─── 2. CINEMATIC 3x1 GRID (IMAGE-FORWARD, FLOATING FROSTED GLASS) ─── */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {FEATURED_3X1.map((tech) => (
            <Link
              key={tech.id}
              to="/technologies"
              className="group relative h-[470px] sm:h-[510px] rounded-3xl overflow-hidden border border-slate-200/80 shadow-[0_10px_30px_rgba(15,23,42,0.06)] hover:shadow-[0_24px_50px_rgba(20,121,189,0.22)] hover:-translate-y-2 transition-all duration-500 flex flex-col justify-end p-3.5 sm:p-4 cursor-pointer"
            >
              {/* Full-Bleed Edge-to-Edge Hero Image */}
              <img
                src={tech.image}
                alt={tech.title}
                className="absolute inset-0 w-full h-full object-cover object-center transition-transform duration-700 ease-out group-hover:scale-110"
                loading="lazy"
              />

              {/* Gentle gradient scrim behind floating panel for smooth image depth */}
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/65 via-slate-950/15 to-transparent pointer-events-none transition-opacity duration-500 group-hover:from-slate-950/75" />

              {/* Apple Glassmorphic Floating Info Panel at Bottom */}
              <div className="relative z-10 bg-white/75 backdrop-blur-2xl backdrop-saturate-150 rounded-[22px] p-4 sm:p-5 border border-white/80 shadow-[0_14px_35px_-4px_rgba(15,23,42,0.18),0_2px_8px_rgba(15,23,42,0.06),inset_0_1px_1.5px_rgba(255,255,255,1),inset_0_-1px_1px_rgba(255,255,255,0.3)] group-hover:bg-white/85 group-hover:border-white group-hover:shadow-[0_22px_45px_-4px_rgba(20,121,189,0.26),inset_0_1px_2px_rgba(255,255,255,1)] transition-all duration-300 overflow-hidden">
                {/* Apple glass specular top-edge refraction highlight */}
                <div className="absolute inset-x-0 top-0 h-[1.5px] bg-gradient-to-r from-transparent via-white to-transparent opacity-95 pointer-events-none" />

                {/* Subtle Apple visionOS diagonal glass sheen */}
                <div className="absolute -top-16 -right-16 w-36 h-36 bg-gradient-to-br from-white/50 via-white/10 to-transparent rounded-full blur-xl pointer-events-none opacity-70 group-hover:opacity-100 transition-opacity" />

                {/* Apple-style frosted pill badge */}
                <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-white/80 backdrop-blur-md border border-white/90 shadow-[0_1px_3px_rgba(0,0,0,0.04),inset_0_1px_0.5px_rgba(255,255,255,1)] mb-2.5">
                  <span className={`w-1.5 h-1.5 rounded-full ${tech.category === 'dental'
                      ? 'bg-brandSky'
                      : tech.category === 'cosmetic'
                        ? 'bg-rose-500'
                        : 'bg-amber-500'
                    }`} />
                  <span className={`text-[10px] font-extrabold tracking-[0.16em] uppercase font-headline ${tech.category === 'dental'
                      ? 'text-brandBlue'
                      : tech.category === 'cosmetic'
                        ? 'text-pink-600'
                        : 'text-amber-700'
                    }`}>
                    {tech.categoryLabel}
                  </span>
                </div>

                {/* Title */}
                <h3 className="font-headline font-extrabold text-[17px] sm:text-[18px] text-slate-900 group-hover:text-brandBlue transition-colors leading-snug line-clamp-1 tracking-tight">
                  {tech.title}
                </h3>

                {/* Subtitle / Equipment */}
                <p className="text-slate-600 text-xs font-medium mt-1 line-clamp-1">
                  {tech.equipmentName}
                </p>

                {/* Action Link Row */}
                <div className="mt-3.5 pt-3 border-t border-white/70 flex items-center justify-between text-xs font-headline font-bold text-slate-700 group-hover:text-brandBlue transition-colors">
                  <span className="uppercase tracking-wider text-[11px] font-bold">
                    Explore Technology
                  </span>
                  <div className="w-8 h-8 rounded-full bg-white/90 backdrop-blur-md border border-white shadow-[0_2px_8px_rgba(0,0,0,0.06),inset_0_1px_1px_rgba(255,255,255,1)] text-slate-600 group-hover:bg-gradient-to-r group-hover:from-brandBlue group-hover:to-brandSky group-hover:text-white group-hover:border-transparent group-hover:shadow-[0_4px_14px_rgba(20,121,189,0.35)] flex items-center justify-center transition-all duration-300 group-hover:scale-110">
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
