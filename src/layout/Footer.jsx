import React from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';

const BRANCHES = [
  {
    name: 'Thuckalay - Kanyakumari',
    title: 'Jerush Dentofacial & Cosmetic Laser Centre',
    address: 'Near Bus stand,\nBrammapuram South,\nThuckalay, Tamil Nadu - 629175',
    phones: ['+91 94891 60055', '+91 94891 60000', '+91 94891 50011'],
    mapEmbedUrl: 'https://maps.google.com/maps?q=Jerush+Dentofacial+Cosmetic+Laser+Centre,+Thuckalay&t=&z=14&ie=UTF8&iwloc=&output=embed'
  },
  {
    name: 'Adyar - Chennai',
    title: 'Jerush Dentofacial & Cosmetic Laser Centre',
    address: 'Chandhini Apartment,\n29, Mahatma Gandhi Rd,\nNear SBI, Shastri Nagar, Adyar,\nTamil Nadu 600020',
    phones: ['+91 97510 10107'],
    mapEmbedUrl: 'https://maps.google.com/maps?q=Jerush+Dentofacial+Cosmetic+Laser+Centre,+Adyar,+Chennai&t=&z=14&ie=UTF8&iwloc=&output=embed'
  },
  {
    name: 'Thenur - Trichy',
    title: 'Jerush Dentofacial & Cosmetic Laser Centre',
    address: 'No. 72, Second floor,\nPattabiraman pillai road, Thenur,\nTrichy, Tamil Nadu – 600017',
    phones: ['+91 94891 60033', '+91 94891 60011'],
    mapEmbedUrl: 'https://maps.google.com/maps?q=Jerush+Dentofacial+Cosmetic+Laser+Centre,+Trichy&t=&z=14&ie=UTF8&iwloc=&output=embed'
  },
  {
    name: 'Fujairah - UAE',
    title: 'Jerush Dental and Aesthetic Laser Clinic LLC',
    address: 'Flat 101 & 102, First Floor,\nFahad Building, Near Talal Market,\nFujairah - UAE',
    phones: ['+971 507253105'],
    mapEmbedUrl: 'https://maps.google.com/maps?q=Jerush+Dental+and+Aesthetic+Laser+Clinic+LLC,+Fujairah&t=&z=14&ie=UTF8&iwloc=&output=embed'
  }
];

export default function Footer() {
  const navigate = useNavigate();
  const location = useLocation();
  const isHomePage = location.pathname === '/';

  const handleLinkClick = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleScrollToSection = (sectionId, e) => {
    e.preventDefault();
    navigate('/');
    setTimeout(() => {
      const element = document.getElementById(sectionId);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }, 150);
  };

  return (
    <>
      <footer className={`bg-primary text-slate-400 font-body border-t border-slate-800 pt-16 text-left ${isHomePage ? 'pb-32 lg:pb-28' : 'pb-20 lg:pb-8'}`}>
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Column 1: Brand & Bio */}
          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-2">
              <img src="/images/logo/jerush-logo.webp" alt="Jerush Logo" className="max-h-12 w-auto brightness-0 invert"
                onError={(e) => { e.target.style.display = 'none'; }} />
            </div>
            <p className="text-sm leading-relaxed mt-2 text-slate-400">
              Leading Multispeciality Dental & Cosmetic Laser Centre in Tamil Nadu and Dubai. Dedicated to
              premium healthcare with clinical precision and ethics.
            </p>
            {/* Pinned Accreditations */}
            <div className="flex items-center gap-3 mt-4 text-xs font-semibold uppercase text-slate-500">
              <span className="px-2.5 py-1 border border-slate-800 rounded bg-slate-900/50">ISO 9001:2015</span>
              <span className="px-2.5 py-1 border border-slate-800 rounded bg-slate-900/50">Dental | Cosmetic| Skin Excellence</span>
            </div>
            {/* Social Media Links */}
            <div className="flex items-center gap-4 mt-6">
              <a href="https://facebook.com" target="_blank" rel="noreferrer" className="text-slate-400 hover:text-brandSky transition-colors" aria-label="Facebook">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M9 8H7v3h2v9h4v-9h3.6l.4-3h-4V6.5c0-.8.2-1 1-1h3V2h-4c-3.3 0-5 1.7-5 5V8z" />
                </svg>
              </a>
              <a href="https://instagram.com" target="_blank" rel="noreferrer" className="text-slate-400 hover:text-brandSky transition-colors" aria-label="Instagram">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                  <path d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37zm1.5-4.87h.01" />
                </svg>
              </a>
              <a href="https://www.youtube.com/@jerushdentofacialandcosmetic" target="_blank" rel="noreferrer" className="text-slate-400 hover:text-brandSky transition-colors" aria-label="YouTube">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M23.5 6.2c-.2-1.5-1.5-2.7-3-2.9C17.7 3 12 3 12 3s-5.7 0-8.5.3c-1.5.2-2.8 1.4-3 2.9C.2 9 0 12 0 12s0 3 .3 5.8c.2 1.5 1.5 2.7 3 2.9 2.8.3 8.5.3 8.5.3s5.7 0 8.5-.3c1.5-.2 2.8-1.4 3-2.9.3-2.8.3-5.8.3-5.8s0-3-.3-5.8zM9.5 15.5V8.5l6.5 3.5-6.5 3.5z" />
                </svg>
              </a>
              <a href="https://linkedin.com" target="_blank" rel="noreferrer" className="text-slate-400 hover:text-brandSky transition-colors" aria-label="LinkedIn">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.779-1.75-1.75s.784-1.75 1.75-1.75 1.75.779 1.75 1.75-.784 1.75-1.75 1.75zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                </svg>
              </a>
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div>
            <h4 className="font-headline font-semibold text-white text-sm uppercase tracking-wider mb-6 pb-2 border-b border-slate-800">
              Quick Links
            </h4>
            <ul className="flex flex-col gap-3.5 text-sm">
              <li><Link to="/" onClick={handleLinkClick} className="hover:text-brandSky transition-colors">Home</Link></li>
              <li><a href="#" onClick={(e) => handleScrollToSection('jerush-about-welcome', e)} className="hover:text-brandSky transition-colors">Our Legacy</a></li>
              <li><a href="#" onClick={(e) => handleScrollToSection('jerush-doctors', e)} className="hover:text-brandSky transition-colors">Meet Our Specialists</a></li>
              <li><Link to="/smile-transformations" onClick={handleLinkClick} className="hover:text-brandSky transition-colors">Smile Transformations</Link></li>
              <li><Link to="/editorial-standards" onClick={handleLinkClick} className="hover:text-brandSky transition-colors">Editorial Standards</Link></li>
              <li><Link to="/contact" onClick={handleLinkClick} className="hover:text-brandSky transition-colors">Contact & Locations</Link></li>
            </ul>
          </div>

          {/* Column 3: Primary Treatments */}
          <div>
            <h4 className="font-headline font-semibold text-white text-sm uppercase tracking-wider mb-6 pb-2 border-b border-slate-800">
              Specialities
            </h4>
            <ul className="flex flex-col gap-3.5 text-sm">
              <li><Link to="/treatments" onClick={handleLinkClick} className="hover:text-brandSky transition-colors">Clear Aligners (Jerushaligne)</Link></li>
              <li><Link to="/treatments" onClick={handleLinkClick} className="hover:text-brandSky transition-colors">Advanced Dental Implants</Link></li>
              <li><Link to="/treatments" onClick={handleLinkClick} className="hover:text-brandSky transition-colors">CO₂ Fractional Lasers</Link></li>
              <li><Link to="/treatments" onClick={handleLinkClick} className="hover:text-brandSky transition-colors">GFC Hair Restoration</Link></li>
              <li><Link to="/treatments" onClick={handleLinkClick} className="hover:text-brandSky transition-colors">Emsella Pelvic Wellness</Link></li>
            </ul>
          </div>

          {/* Column 4: Contact details */}
          <div>
            <h4 className="font-headline font-semibold text-white text-sm uppercase tracking-wider mb-6 pb-2 border-b border-slate-800">
              Connect Support
            </h4>
            <ul className="flex flex-col gap-4 text-sm text-slate-400">
              <li className="flex items-start gap-3">
                <svg className="w-5 h-5 text-brandSky shrink-0 mt-0.5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                <span>Thuckalay, Trichy, Chennai (India) & Deira, Dubai (UAE)</span>
              </li>
              <li className="flex items-center gap-3">
                <svg className="w-5 h-5 text-brandSky shrink-0" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.94.725l.548 2.2a1 1 0 01-.321.988l-1.305.98a10.582 10.582 0 004.872 4.872l.98-1.305a1 1 0 01.988-.321l2.2.548a1 1 0 01.725.94V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                <a href="tel:+919489160055" className="hover:text-brandSky font-bold text-white transition-colors">+91 94891 60055</a>
              </li>
              <li className="flex items-center gap-3">
                <svg className="w-5 h-5 text-brandSky shrink-0" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                <a href="mailto:info@jerushdentoface.com" className="hover:text-brandSky transition-colors">info@jerushdentoface.com</a>
              </li>
            </ul>
          </div>
        </div>

        {/* Clinic Branches Locations Grid (Only rendered on Homepage) */}
        {isHomePage && (
          <div className="max-w-7xl mx-auto px-6 border-t border-slate-800/80 pt-12 mt-12">
            <div className="mb-8">
              <h4 className="font-headline font-bold text-white text-base uppercase tracking-wider">
                Our Clinic Locations
              </h4>
              <p className="text-xs text-slate-500 mt-1">
                Visit any of our state-of-the-art branch clinics across India & the UAE.
              </p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {BRANCHES.map((branch) => (
                <div key={branch.name} className="bg-slate-900/40 border border-brandBlue/40 hover:border-brandSky/60 hover:bg-slate-900/60 rounded-2xl p-5 flex flex-col justify-between transition-all duration-300 shadow-[0_0_15px_rgba(30,151,212,0.1)] hover:shadow-[0_0_25px_rgba(30,151,212,0.35)]">
                  <div className="flex flex-col gap-2.5">
                    <div>
                      <h5 className="font-headline font-extrabold text-white text-[13px] tracking-wide leading-snug">
                        {branch.title}
                      </h5>
                      <span className="text-[10px] text-brandSky font-bold uppercase tracking-wider mt-0.5 block">
                        {branch.name}
                      </span>
                    </div>
                    <p className="text-xs text-slate-400 leading-relaxed whitespace-pre-line font-medium">
                      {branch.address}
                    </p>
                  </div>

                  <div className="flex flex-col gap-1.5 mt-4 pt-3 border-t border-slate-800/40">
                    <span className="text-[9px] uppercase tracking-widest text-slate-500 font-extrabold mb-0.5">
                      Phone Numbers
                    </span>
                    {branch.phones.map((phone) => (
                      <a
                        key={phone}
                        href={`tel:${phone.replace(/[^+\d]/g, '')}`}
                        className="text-xs text-slate-300 hover:text-brandSky font-bold flex items-center gap-1.5 transition-colors"
                      >
                        <svg className="w-3.5 h-3.5 text-slate-500 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.94.725l.548 2.2a1 1 0 01-.321.988l-1.305.98a10.582 10.582 0 004.872 4.872l.98-1.305a1 1 0 01.988-.321l2.2.548a1 1 0 01.725.94V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                        </svg>
                        {phone}
                      </a>
                    ))}

                    {/* Inline Map Iframe */}
                    <div className="w-full h-32 rounded-xl overflow-hidden mt-3 border border-slate-800">
                      <iframe
                        src={branch.mapEmbedUrl}
                        width="100%"
                        height="100%"
                        style={{ border: 0 }}
                        allowFullScreen=""
                        loading="lazy"
                        title={`${branch.name} Map`}
                        referrerPolicy="no-referrer-when-downgrade"
                      ></iframe>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Copyright Bar */}
        <div className={`max-w-7xl mx-auto px-6 border-t border-slate-800/80 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-slate-500 ${isHomePage ? 'mb-4 lg:mb-8' : 'mb-0'}`}>
          <p>&copy; {new Date().getFullYear()} Jerush Dentofacial & Cosmetic Laser Centre. All rights reserved. Developed by Jerush Digital Tech</p>
          <p className="flex items-center gap-3 sm:gap-4 flex-wrap justify-center">
            <Link to="/editorial-standards" onClick={handleLinkClick} className="hover:text-brandSky transition-colors">Editorial Standards</Link>
            <span className="text-slate-800">|</span>
            <Link to="/privacy-policy" onClick={handleLinkClick} className="hover:text-brandSky transition-colors">Privacy Policy</Link>
            <span className="text-slate-800">|</span>
            <Link to="/terms-conditions" onClick={handleLinkClick} className="hover:text-brandSky transition-colors">Terms of Use</Link>
          </p>
        </div>
      </footer>

      {/* Mobile & Tablet Sticky Bottom Navigation Bar (Hidden on Desktop >= 1024px) */}
      <div className="jerush-mobile-bottombar fixed bottom-0 left-0 right-0 z-[90] lg:hidden bg-slate-950/95 backdrop-blur-xl border-t border-slate-800/80 px-2 pt-2 pb-3.5 grid grid-cols-4 justify-items-center items-center shadow-[0_-10px_30px_rgba(2,6,23,0.5)]">
        {/* Item 1: Book Appt */}
        <Link to="/contact" onClick={handleLinkClick} className="flex flex-col items-center justify-center text-center w-full py-1 text-slate-400 hover:text-brandSky transition-all duration-200 group">
          <svg className="w-[15px] h-[15px] mb-0.5 group-hover:scale-110 transition-all duration-300" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect x="3" y="5" width="18" height="15" rx="3.5" stroke="#38bdf8" strokeWidth="1.8" fill="#38bdf8" fillOpacity="0.15" />
            <rect x="6" y="2" width="2.5" height="5" rx="1.25" fill="#f43f5e" />
            <rect x="15.5" y="2" width="2.5" height="5" rx="1.25" fill="#f43f5e" />
            <path d="M12 16C12 16 8.5 13.5 8.5 11.2C8.5 9.8 9.5 9 10.5 9C11.2 9 11.7 9.4 12 9.8C12.3 9.4 12.8 9 13.5 9C14.5 9 15.5 9.8 15.5 11.2C15.5 13.5 12 16 12 16Z" fill="#f43f5e" />
          </svg>
          <span className="text-[9px] font-bold uppercase tracking-wider font-headline mt-0.5">Book Appt</span>
        </Link>

        {/* Item 2: Clinics */}
        <Link to="/contact" onClick={handleLinkClick} className="flex flex-col items-center justify-center text-center w-full py-1 text-slate-400 hover:text-brandSky transition-all duration-200 group">
          <svg className="w-[15px] h-[15px] mb-0.5 group-hover:scale-110 transition-all duration-300" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 21C16.5 16.8 19 13.2 19 9.5C19 5.36 15.86 2 12 2C8.14 2 5 5.36 5 9.5C5 13.2 7.5 16.8 12 21Z" stroke="#f43f5e" stroke-width="1.8" fill="#f43f5e" fillOpacity="0.15" strokeLinejoin="round" />
            <circle cx="12" cy="9.5" r="3.5" fill="#38bdf8" />
            <path d="M12 7.5V11.5M10 9.5H14" stroke="#ffffff" stroke-width="1.2" stroke-linecap="round" />
          </svg>
          <span className="text-[9px] font-bold uppercase tracking-wider font-headline mt-0.5">Clinics</span>
        </Link>

        {/* Item 3: Specialities */}
        <Link to="/treatments" onClick={handleLinkClick} className="flex flex-col items-center justify-center text-center w-full py-1 text-slate-400 hover:text-brandSky transition-all duration-200 group">
          <svg className="w-[15px] h-[15px] mb-0.5 group-hover:scale-110 transition-all duration-300" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 3C9 3 7 4.2 7 7.5C7 9.8 8 11.5 8 14.5C8 17.5 9.5 19.5 9.5 19.5C9.5 19.5 10.5 17.8 12 17.8C13.5 17.8 14.5 19.5 14.5 19.5C14.5 19.5 16 17.5 16 14.5C16 11.5 17 9.8 17 7.5C17 4.2 15 3 12 3Z" stroke="#34d399" stroke-width="1.8" fill="#34d399" fillOpacity="0.15" strokeLinejoin="round" />
            <path d="M18.5 4.5L19 5.5L20 5.8L19 6.1L18.5 7.1L18 6.1L17 5.8L18 5.5L18.5 4.5Z" fill="#fbbf24" />
            <path d="M5.5 7.5L5.8 8.2L6.5 8.4L5.8 8.6L5.5 9.3L5.2 8.6L4.5 8.4L5.2 8.2L5.5 7.5Z" fill="#fbbf24" />
          </svg>
          <span className="text-[9px] font-bold uppercase tracking-wider font-headline mt-0.5">Specialities</span>
        </Link>

        {/* Item 4: Smile Stories */}
        <Link to="/smile-transformations" onClick={handleLinkClick} className="flex flex-col items-center justify-center text-center w-full py-1 text-slate-400 hover:text-brandSky transition-all duration-200 group">
          <svg className="w-[15px] h-[15px] mb-0.5 group-hover:scale-110 transition-all duration-300" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="12" cy="12" r="8.5" stroke="#fbbf24" strokeWidth="1.8" fill="#fbbf24" fillOpacity="0.15" />
            <circle cx="9" cy="10.5" r="1" fill="#475569" />
            <circle cx="15" cy="10.5" r="1" fill="#475569" />
            <circle cx="7" cy="12.5" r="1.5" fill="#f43f5e" fillOpacity="0.5" />
            <circle cx="17" cy="12.5" r="1.5" fill="#f43f5e" fillOpacity="0.5" />
            <path d="M9.5 13.5C10.2 15.2 13.8 15.2 14.5 13.5" stroke="#475569" strokeWidth="1.5" strokeLinecap="round" />
            <path d="M19 4L19.4 4.8L20.2 5L19.4 5.2L19 6L18.6 5.2L17.8 5L18.6 4.8L19 4Z" fill="#38bdf8" />
          </svg>
          <span className="text-[9px] font-bold uppercase tracking-wider font-headline mt-0.5">Stories</span>
        </Link>
      </div>
    </>
  );
}
