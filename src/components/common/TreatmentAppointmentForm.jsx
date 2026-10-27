import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Calendar, Check, ChevronDown, Phone,
  Smile, Award, Layers, MapPin, AlertCircle
} from 'lucide-react';

const COUNTRY_CODES = [
  { code: '+91', country: 'India', flag: '🇮🇳' },
  { code: '+971', country: 'UAE', flag: '🇦🇪' },
  { code: '+44', country: 'UK', flag: '🇬🇧' },
  { code: '+61', country: 'Australia', flag: '🇦🇺' },
  { code: '+1', country: 'USA / Canada', flag: '🇺🇸' },
  { code: '+65', country: 'Singapore', flag: '🇸🇬' },
  { code: '+60', country: 'Malaysia', flag: '🇲🇾' },
  { code: '+966', country: 'Saudi Arabia', flag: '🇸🇦' },
  { code: '+968', country: 'Oman', flag: '🇴🇲' },
  { code: '+974', country: 'Qatar', flag: '🇶🇦' },
  { code: '+965', country: 'Kuwait', flag: '🇰🇼' },
  { code: '+49', country: 'Germany', flag: '🇩🇪' },
  { code: '+64', country: 'New Zealand', flag: '🇳🇿' }
];

const CENTRES = [
  { id: 'thuckalay', name: 'Thuckalay Centre (Kanyakumari)' },
  { id: 'trichy', name: 'Trichy Centre' },
  { id: 'chennai', name: 'Chennai Centre' }
];

const DEFAULT_FEATURES = [
  {
    icon: Smile,
    title: 'Custom Precision Fit',
    desc: 'Shade-matched teeth and anatomical moulds aligned to your natural gum contours.'
  },
  {
    icon: Award,
    title: 'Specialist-Led Care',
    desc: 'Consultations and clinical treatment supervised by hospital prosthodontic specialists.'
  },
  {
    icon: Layers,
    title: 'Advanced In-House Lab',
    desc: 'Fast turnaround times with high-precision digital scanning and CAD/CAM fabrication.'
  },
  {
    icon: MapPin,
    title: '3 Regional Centres',
    desc: 'World-class hospital care available across Thuckalay, Trichy, and Chennai.'
  }
];

export default function TreatmentAppointmentForm({
  treatmentName = 'Removable Partial Dentures',
  title = 'Book a Consultation',
  highlightWord = 'Near You',
  subtitle = "Get personalised advice from Jerush Dentofacial & Cosmetic Laser Centre's leading specialists.",
  features = DEFAULT_FEATURES,
  className = '',
  id = 'treatment-appointment-section'
}) {
  const [formData, setFormData] = useState({
    name: '',
    centre: 'thuckalay',
    location: '',
    countryCode: '+91',
    phone: ''
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const validate = () => {
    const newErrors = {};
    if (!formData.name.trim()) {
      newErrors.name = 'Please enter your name';
    } else if (formData.name.trim().length < 2) {
      newErrors.name = 'Name must be at least 2 characters';
    }

    if (!formData.centre) {
      newErrors.centre = 'Please choose a centre';
    }

    if (!formData.location.trim()) {
      newErrors.location = 'Please enter your city/location';
    }

    const cleanPhone = formData.phone.replace(/[\s-]/g, '');
    if (!cleanPhone) {
      newErrors.phone = 'Please enter mobile number';
    } else if (!/^\d{7,15}$/.test(cleanPhone)) {
      newErrors.phone = 'Enter valid mobile number (7-15 digits)';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: null }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
    }, 800);
  };

  const handleReset = () => {
    setIsSuccess(false);
    setFormData({
      name: '',
      centre: 'thuckalay',
      location: '',
      countryCode: '+91',
      phone: ''
    });
    setErrors({});
  };

  const selectedCentre = CENTRES.find(c => c.id === formData.centre) || CENTRES[0];

  return (
    <section id={id} className={`w-full py-12 lg:py-16 bg-gradient-to-b from-slate-50 via-white to-slate-50 border-y border-slate-200/80 font-body scroll-mt-24 sm:scroll-mt-28 ${className}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">

          {/* Left Column: Heading, Subtitle & 4 Feature Cards (2x2 Grid) */}
          <div className="lg:col-span-7 space-y-6 text-left">
            <div>
              <h2
                style={{ lineHeight: 1.4 }}
                className="text-2xl sm:text-3xl lg:text-[34px] font-extrabold font-headline text-slate-900 tracking-tight leading-[1.4]"
              >
                {title}{' '}
                <span className="bg-gradient-to-r from-brandBlue to-brandSky bg-clip-text text-transparent">
                  {highlightWord}
                </span>
              </h2>
              <p className="text-slate-600 text-sm sm:text-base leading-relaxed mt-3.5 max-w-xl">
                {subtitle}
              </p>
            </div>

            {/* 4 Feature Cards in 2x2 Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-1">
              {features.map((item, idx) => {
                const IconComponent = item.icon || Smile;
                return (
                  <div
                    key={idx}
                    className="p-4 sm:p-5 rounded-2xl bg-white border border-slate-200/90 shadow-sm hover:shadow-md hover:border-brandSky/50 transition-all flex items-start gap-3.5 group"
                  >
                    <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-brandSky/15 to-brandBlue/10 text-brandBlue flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
                      <IconComponent className="w-5 h-5 text-brandBlue" />
                    </div>
                    <div>
                      <h3 className="font-headline font-bold text-slate-900 text-sm">
                        {item.title}
                      </h3>
                      <p className="text-slate-500 text-xs leading-relaxed mt-1">
                        {item.desc}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Right Column: Clean Gradient Form Card */}
          <div className="lg:col-span-5 relative">
            <div className="relative rounded-3xl p-6 sm:p-8 bg-gradient-to-br from-[#071324] via-[#0E2752] to-[#071324] text-white border border-white/15 shadow-2xl shadow-slate-900/25 overflow-hidden">
              {/* Ambient Glows */}
              <div className="absolute -top-16 -right-16 w-52 h-52 bg-brandSky/20 rounded-full blur-3xl pointer-events-none" />
              <div className="absolute -bottom-16 -left-16 w-52 h-52 bg-brandBlue/35 rounded-full blur-3xl pointer-events-none" />

              <div className="relative z-10 text-left">
                {/* Form Header - Clean and free of unwanted pills */}
                <div className="mb-5 pb-3 border-b border-white/10">
                  <h3 className="font-headline font-extrabold text-xl sm:text-2xl text-white tracking-tight">
                    Enter Details to get{' '}
                    <span className="bg-gradient-to-r from-brandSky via-sky-300 to-white bg-clip-text text-transparent">
                      Free Consultation
                    </span>
                  </h3>
                  <p className="text-xs text-slate-300 mt-1">
                    Direct enquiry for {treatmentName}
                  </p>
                </div>

                <AnimatePresence mode="wait">
                  {isSuccess ? (
                    <motion.div
                      key="success"
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      className="py-6 text-center space-y-3.5"
                    >
                      <div className="w-12 h-12 rounded-full bg-emerald-500 text-white flex items-center justify-center mx-auto shadow-lg shadow-emerald-500/30">
                        <Check className="w-6 h-6 stroke-[3]" />
                      </div>
                      <div className="space-y-1">
                        <h4 className="font-headline font-black text-lg text-white">
                          Consultation Requested!
                        </h4>
                        <p className="text-xs text-slate-300 leading-relaxed max-w-xs mx-auto">
                          Thank you, <strong className="text-white">{formData.name}</strong>. Our medical desk at <strong className="text-brandSky">{selectedCentre.name}</strong> will contact you at <strong className="text-white">{formData.countryCode} {formData.phone}</strong> shortly.
                        </p>
                      </div>
                      <button
                        type="button"
                        onClick={handleReset}
                        className="mt-2 px-5 py-2 rounded-full bg-white/10 hover:bg-white/20 border border-white/20 text-white text-xs font-bold font-headline uppercase tracking-wider transition-all cursor-pointer"
                      >
                        Book Another
                      </button>
                    </motion.div>
                  ) : (
                    <motion.form
                      key="form"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      onSubmit={handleSubmit}
                      className="space-y-3.5"
                      noValidate
                    >
                      {/* Name Field */}
                      <div>
                        <input
                          id="treatment-form-name"
                          type="text"
                          name="name"
                          value={formData.name}
                          onChange={handleChange}
                          placeholder="Enter Your Name *"
                          className={`w-full px-4 py-3 rounded-xl bg-white/[0.08] border text-white placeholder:text-slate-400 focus:bg-white/[0.12] focus:border-brandSky focus:outline-none transition-colors duration-150 text-sm font-medium caret-brandSky ${
                            errors.name
                              ? 'border-rose-400'
                              : 'border-white/20'
                          }`}
                        />
                        {errors.name && (
                          <p className="text-[11px] text-rose-300 flex items-center gap-1 mt-1">
                            <AlertCircle className="w-3 h-3 shrink-0" />
                            <span>{errors.name}</span>
                          </p>
                        )}
                      </div>

                      {/* Where would you like to receive treatment dropdown */}
                      <div className="relative">
                        <select
                          name="centre"
                          value={formData.centre}
                          onChange={handleChange}
                          aria-label="Treatment Centre"
                          className="w-full appearance-none px-4 py-3 pr-10 rounded-xl bg-[#091B38] border border-white/20 text-white text-sm font-medium focus:border-brandSky focus:outline-none transition-colors duration-150 cursor-pointer"
                        >
                          {CENTRES.map(c => (
                            <option key={c.id} value={c.id} className="bg-[#091B38] text-white">
                              {c.name}
                            </option>
                          ))}
                        </select>
                        <ChevronDown className="w-4 h-4 text-slate-400 absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                      </div>

                      {/* Your Location Field */}
                      <div>
                        <input
                          type="text"
                          name="location"
                          value={formData.location}
                          onChange={handleChange}
                          placeholder="Your Location (e.g. City / Country) *"
                          className={`w-full px-4 py-3 rounded-xl bg-white/[0.08] border text-white placeholder:text-slate-400 focus:bg-white/[0.12] focus:border-brandSky focus:outline-none transition-colors duration-150 text-sm font-medium caret-brandSky ${
                            errors.location
                              ? 'border-rose-400'
                              : 'border-white/20'
                          }`}
                        />
                        {errors.location && (
                          <p className="text-[11px] text-rose-300 flex items-center gap-1 mt-1">
                            <AlertCircle className="w-3 h-3 shrink-0" />
                            <span>{errors.location}</span>
                          </p>
                        )}
                      </div>

                      {/* Phone Number with International Country Code */}
                      <div>
                        <div className="flex gap-2">
                          <div className="relative w-28 shrink-0">
                            <select
                              name="countryCode"
                              value={formData.countryCode}
                              onChange={handleChange}
                              aria-label="Country Code"
                              className="w-full appearance-none px-2.5 py-3 pr-7 rounded-xl bg-[#091B38] border border-white/20 text-white text-xs font-bold focus:border-brandSky focus:outline-none cursor-pointer transition-colors duration-150"
                            >
                              {COUNTRY_CODES.map(c => (
                                <option key={c.code} value={c.code} className="bg-[#091B38] text-white">
                                  {c.flag} {c.code}
                                </option>
                              ))}
                            </select>
                            <ChevronDown className="w-3.5 h-3.5 text-slate-400 absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none" />
                          </div>

                          <div className="relative flex-1">
                            <input
                              type="tel"
                              name="phone"
                              value={formData.phone}
                              onChange={handleChange}
                              placeholder="Enter Mobile Number *"
                              className={`w-full px-4 py-3 rounded-xl bg-white/[0.08] border text-white placeholder:text-slate-400 focus:bg-white/[0.12] focus:border-brandSky focus:outline-none transition-colors duration-150 text-sm font-medium caret-brandSky ${
                                errors.phone
                                  ? 'border-rose-400'
                                  : 'border-white/20'
                              }`}
                            />
                          </div>
                        </div>
                        {errors.phone && (
                          <p className="text-[11px] text-rose-300 flex items-center gap-1 mt-1">
                            <AlertCircle className="w-3 h-3 shrink-0" />
                            <span>{errors.phone}</span>
                          </p>
                        )}
                      </div>

                      {/* Submit Button with Sky Blue / Brand Blue Gradient */}
                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full mt-2 py-3.5 px-6 rounded-xl bg-gradient-to-r from-brandSky via-[#198BC8] to-brandBlue text-white font-headline font-bold text-xs sm:text-sm uppercase tracking-wider shadow-md hover:shadow-lg transition-all duration-200 cursor-pointer flex items-center justify-center gap-2 border-none disabled:opacity-75"
                      >
                        {isSubmitting ? (
                          <>
                            <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                            <span>Reserving Consultation...</span>
                          </>
                        ) : (
                          <>
                            <Calendar className="w-4 h-4 text-white" />
                            <span>Book a Free Consultation</span>
                          </>
                        )}
                      </button>
                    </motion.form>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
