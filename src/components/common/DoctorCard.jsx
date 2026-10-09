import React from 'react';
import { ArrowRight } from 'lucide-react';

export default function DoctorCard({ doctor, onClick, className = '' }) {
  if (!doctor) return null;

  return (
    <div
      onClick={onClick}
      className={`jerush-doctor-card group relative bg-white rounded-3xl p-5 border border-slate-200/70 hover:border-brandSky/40 shadow-[0_4px_20px_rgba(40,83,164,0.05)] hover:shadow-[0_16px_36px_rgba(40,83,164,0.11)] hover:-translate-y-1 transition-all duration-300 ease-out flex flex-col justify-between overflow-hidden cursor-pointer ${className}`}
    >
      {/* Soft atmospheric blue glow in top corner */}
      <div className="absolute top-0 right-0 w-36 h-36 rounded-full bg-sky-100/50 group-hover:bg-gradient-to-br group-hover:from-brandBlue/15 group-hover:to-brandSky/25 group-hover:scale-125 transition-all duration-500 pointer-events-none" />

      <div className="relative z-10 flex flex-col">
        {/* Clean Photo Container — no floating badges or icons over face */}
        <div className="aspect-[4/5] rounded-2xl overflow-hidden mb-4 bg-slate-100/70 relative border border-slate-200/50">
          <img
            src={doctor.image || doctor.fallbackImg}
            alt={doctor.name}
            className="w-full h-full object-cover object-top transition-transform duration-500 ease-out group-hover:scale-105"
            loading="lazy"
            onError={(e) => {
              if (doctor.fallbackImg && e.target.src !== doctor.fallbackImg) {
                e.target.src = doctor.fallbackImg;
              }
            }}
          />

          {/* Elegant hover overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-slate-900/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
            <span className="text-[10px] text-white font-headline font-bold uppercase tracking-wider bg-brandBlue/90 px-3 py-1.5 rounded-lg shadow-sm">
              View Profile
            </span>
          </div>
        </div>

        {/* Doctor Details */}
        <div className="space-y-1 text-left">
          {/* Doctor Name */}
          <h4 className="font-headline font-extrabold text-[16px] text-primary group-hover:text-brandBlue transition-colors tracking-tight leading-tight line-clamp-1">
            {doctor.name}
          </h4>

          {/* Role */}
          <p className="text-brandBlue font-headline font-bold text-[11px] uppercase tracking-wider line-clamp-1">
            {doctor.role}
          </p>

          {/* Qualifications */}
          {doctor.qualification && (
            <p className="text-slate-500 text-xs font-semibold leading-relaxed line-clamp-2 pt-0.5" title={doctor.qualification}>
              {doctor.qualification}
            </p>
          )}
        </div>
      </div>

      {/* Card Footer: Experience & Circular Action Button */}
      <div className="relative z-10 mt-4 pt-3.5 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500 font-headline font-bold uppercase tracking-wide">
        <span className="truncate pr-2">
          {doctor.experience || 'Experienced Specialist'}
        </span>

        <div className="w-8 h-8 rounded-full bg-slate-100 group-hover:bg-gradient-to-r group-hover:from-brandBlue group-hover:to-brandSky text-slate-500 group-hover:text-white flex items-center justify-center shadow-sm group-hover:shadow-md group-hover:scale-110 transition-all duration-300 shrink-0">
          <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
        </div>
      </div>
    </div>
  );
}
