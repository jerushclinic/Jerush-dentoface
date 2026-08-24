import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight, Phone, ExternalLink } from 'lucide-react';

export default function DentalAppointmentBanner({
  badgeText = "Ready to Smile?",
  titlePrefix = "Book Your",
  highlightWord = "Appointment",
  titleSuffix = "Today",
  subtitle = "Take the first step toward a healthier, brighter smile. Our expert team is ready to provide personalized care just for you.",
  primaryBtnText = "Book Now",
  primaryBtnLink = "/contact",
  onPrimaryClick,
  secondaryBtnText = "Contact Us",
  secondaryBtnPhone = "+919489160000",
  secondaryBtnLink,
  imageSrc = "/images/dental-chair.webp",
  imageAlt = "Jerush Modern Dental Care",
  className = ""
}) {
  return (
    <section className={`w-full py-10 px-4 sm:px-6 lg:px-8 font-body select-none ${className}`}>
      <div className="max-w-7xl mx-auto relative rounded-3xl overflow-hidden bg-gradient-to-r from-[#071324] via-[#0E2752] to-[#071324] border border-white/10 shadow-[0_20px_50px_rgba(7,19,36,0.5)]">

        {/* Background Decorative Lighting & Mesh Effects */}
        <div className="absolute -top-24 -left-24 w-96 h-96 bg-brandSky/15 rounded-full blur-[120px] pointer-events-none" />
        <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-brandBlue/25 rounded-full blur-[120px] pointer-events-none" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-[radial-gradient(ellipse_at_center,rgba(30,151,212,0.08)_0%,transparent_70%)] pointer-events-none" />

        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center p-6 sm:p-10 lg:p-14">

          {/* Left Column: Content */}
          <motion.div
            initial={{ opacity: 0, x: -25 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="lg:col-span-7 flex flex-col text-left"
          >
            {/* Pill Badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-brandSky/15 border border-brandSky/30 backdrop-blur-md text-brandSky w-fit mb-5 shadow-sm">
              <svg className="w-4 h-4 text-brandSky shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 2C8 2 6 4 6 7c0 3 1 7 2.5 10.5C9.5 20 10.5 22 12 22s2.5-2 3.5-4.5C17 14 18 10 18 7c0-3-2-5-6-5z" />
              </svg>
              <span className="text-xs font-bold font-headline uppercase tracking-wider">{badgeText}</span>
            </div>

            {/* Headline with Brush Accent */}
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black font-headline text-white leading-[1.15] mb-5 tracking-tight">
              {titlePrefix}{' '}
              <span className="relative inline-block text-white">
                {highlightWord}
                {/* Curved underline accent */}
                <svg
                  className="absolute -bottom-2 left-0 w-full h-3 text-brandSky"
                  viewBox="0 0 200 12"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M3 8C45 2.5 155 2.5 197 8"
                    stroke="currentColor"
                    strokeWidth="4"
                    strokeLinecap="round"
                  />
                </svg>
              </span>{' '}
              {titleSuffix}
            </h2>

            {/* Description */}
            <p className="text-slate-300 text-sm sm:text-base md:text-lg max-w-xl font-body leading-relaxed mb-8">
              {subtitle}
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-wrap items-center gap-4">
              {onPrimaryClick ? (
                <button
                  type="button"
                  onClick={onPrimaryClick}
                  className="inline-flex items-center gap-2.5 px-7 py-3.5 rounded-full bg-gradient-to-r from-brandSky via-[#198BC8] to-brandBlue text-white font-headline font-bold text-xs sm:text-sm uppercase tracking-wider shadow-lg shadow-brandSky/25 hover:shadow-brandSky/40 hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 group cursor-pointer border-none"
                >
                  <span>{primaryBtnText}</span>
                  <div className="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center group-hover:translate-x-1 transition-transform">
                    <ArrowRight className="w-3.5 h-3.5 text-white" />
                  </div>
                </button>
              ) : (
                <Link
                  to={primaryBtnLink}
                  className="inline-flex items-center gap-2.5 px-7 py-3.5 rounded-full bg-gradient-to-r from-brandSky via-[#198BC8] to-brandBlue text-white font-headline font-bold text-xs sm:text-sm uppercase tracking-wider shadow-lg shadow-brandSky/25 hover:shadow-brandSky/40 hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 group"
                >
                  <span>{primaryBtnText}</span>
                  <div className="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center group-hover:translate-x-1 transition-transform">
                    <ArrowRight className="w-3.5 h-3.5 text-white" />
                  </div>
                </Link>
              )}

              <a
                href={secondaryBtnLink || `tel:${secondaryBtnPhone.replace(/\s+/g, '')}`}
                target={secondaryBtnLink && secondaryBtnLink.startsWith('http') ? '_blank' : undefined}
                rel={secondaryBtnLink && secondaryBtnLink.startsWith('http') ? 'noopener noreferrer' : undefined}
                className="inline-flex items-center gap-2.5 px-6 py-3.5 rounded-full border border-white/20 hover:border-brandSky/50 bg-white/[0.05] hover:bg-white/[0.12] text-white font-headline font-bold text-xs sm:text-sm uppercase tracking-wider backdrop-blur-md transition-all duration-300 group"
              >
                <span>{secondaryBtnText}</span>
                <div className="w-6 h-6 rounded-full bg-white/10 flex items-center justify-center group-hover:scale-110 transition-transform">
                  {secondaryBtnLink && secondaryBtnLink.startsWith('http') ? (
                    <ExternalLink className="w-3.5 h-3.5 text-brandSky" />
                  ) : (
                    <Phone className="w-3.5 h-3.5 text-brandSky" />
                  )}
                </div>
              </a>
            </div>
          </motion.div>

          {/* Right Column: Dental Chair Cutout Graphic */}
          <motion.div
            initial={{ opacity: 0, scale: 0.92, y: 20 }}
            whileInView={{ opacity: 1, scale: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            className="lg:col-span-5 relative flex items-center justify-center lg:justify-end mt-4 lg:mt-0"
          >
            {/* Glowing Backdrop Circle */}
            <div className="absolute w-64 h-64 sm:w-80 sm:h-80 bg-gradient-to-tr from-brandSky/30 to-brandBlue/40 rounded-full blur-3xl pointer-events-none" />

            <img
              src={imageSrc}
              alt={imageAlt}
              className="relative z-10 w-full max-w-[340px] sm:max-w-[420px] lg:max-w-[460px] object-contain drop-shadow-[0_15px_35px_rgba(0,0,0,0.6)] transform hover:scale-[1.02] transition-transform duration-500"
            />
          </motion.div>

        </div>
      </div>
    </section>
  );
}
