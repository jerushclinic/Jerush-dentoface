import React from 'react';
import PageBreadcrumbHero from '../../components/common/PageBreadcrumbHero';
import { ShieldCheck, Award, GraduationCap, MapPin, Calendar } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function DrBladbinPage() {
  const navigate = useNavigate();

  const handleCtaClick = (e) => {
    e.preventDefault();
    navigate('/contact');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="w-full bg-[#FAFBFD] font-body text-left relative pt-0 overflow-hidden min-h-screen">
      {/* Background Glows */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-brandSky/5 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute top-1/3 left-0 w-[400px] h-[400px] bg-brandBlue/5 rounded-full blur-3xl pointer-events-none"></div>

      <PageBreadcrumbHero 
        title="Dr. A. Bladbin" 
        breadcrumbs={[
          { label: 'About Jerush', path: '/about' },
          { label: 'Dr. A. Bladbin', active: true }
        ]} 
      />

      <div className="max-w-7xl mx-auto px-6 py-16 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Left Side: Profile Image & Badges */}
          <div className="lg:col-span-5 space-y-6">
            <div className="relative w-full max-w-md mx-auto rounded-3xl overflow-hidden shadow-xl border border-slate-100 bg-white p-4">
              <div className="aspect-[4/5] rounded-2xl overflow-hidden bg-slate-100 relative">
                <img 
                  src="/images/doctors/dr-bladbin-profile2.webp" 
                  alt="Dr. A. Bladbin" 
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    e.target.src = 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&q=80&w=600';
                  }}
                />
              </div>
            </div>

            {/* Quick Stats/Badges */}
            <div className="bg-white border border-slate-100 rounded-2xl p-6 shadow-sm max-w-md mx-auto space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-brandBlue/5 flex items-center justify-center text-brandBlue shrink-0">
                  <ShieldCheck className="w-5 h-5" />
                </div>
                <div>
                  <h5 className="font-headline font-bold text-xs text-slate-800 uppercase tracking-wide">Designation</h5>
                  <p className="text-sm text-slate-600 font-semibold">Founder & Chairman</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-brandBlue/5 flex items-center justify-center text-brandBlue shrink-0">
                  <Award className="w-5 h-5" />
                </div>
                <div>
                  <h5 className="font-headline font-bold text-xs text-slate-800 uppercase tracking-wide">Experience</h5>
                  <p className="text-sm text-slate-600 font-semibold">20+ Years in Facial Aesthetics</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-brandBlue/5 flex items-center justify-center text-brandBlue shrink-0">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <h5 className="font-headline font-bold text-xs text-slate-800 uppercase tracking-wide">Availability</h5>
                  <p className="text-sm text-slate-600 font-semibold">Thuckalay & Liaison Centres</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Side: Qualifications & Biography */}
          <div className="lg:col-span-7 space-y-8">
            <div>
              <span className="text-xs font-bold text-brandSky uppercase tracking-widest leading-none block mb-2">
                Visionary Leader & Surgeon
              </span>
              <h2 className="font-headline font-extrabold text-3xl sm:text-4xl text-primary">
                DR. A. BLADBIN
              </h2>
              <p className="text-brandBlue font-semibold text-xs sm:text-sm font-headline tracking-wide uppercase mt-1">
                MBBS(Ukraine), LLB, MDS(OMFS), PHD(Srilanka), PHD(Hons), FAM(Ger), MCHT(Ger), MCDC(Ger)
              </p>
              <p className="text-slate-800 font-bold font-headline text-base mt-2">
                Maxillofacial Surgeon & Aesthetic Medicine Specialist
              </p>
            </div>

            {/* Qualifications / Achievements List */}
            <div className="space-y-4">
              <h3 className="font-headline font-extrabold text-lg text-slate-900 border-b border-slate-200 pb-2 flex items-center gap-2">
                <GraduationCap className="w-5 h-5 text-brandSky" />
                Key Accreditations & Fellowships
              </h3>
              <ul className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm text-slate-600">
                <li className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-brandSky mt-2 shrink-0"></span>
                  <span>Fellowship in Aesthetic Medicine (Germany)</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-brandSky mt-2 shrink-0"></span>
                  <span>Master Course in Hair Transplantation (Germany)</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-brandSky mt-2 shrink-0"></span>
                  <span>Master Course in Dimple Creation (Germany)</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-brandSky mt-2 shrink-0"></span>
                  <span>Certified in Dental Implantology (Switzerland)</span>
                </li>
                <li className="flex items-start gap-2 md:col-span-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-brandSky mt-2 shrink-0"></span>
                  <span>Advanced Training from Universit'a's medizin - Greifswald, Germany</span>
                </li>
              </ul>
            </div>

            {/* Biography text */}
            <div className="space-y-4 text-slate-600 text-sm leading-relaxed">
              <h3 className="font-headline font-extrabold text-lg text-slate-900 border-b border-slate-200 pb-2 flex items-center gap-2">
                <Calendar className="w-5 h-5 text-brandSky" />
                Professional Biography
              </h3>
              <p>
                Dr. A. Bladbin is the visionary Founder and Chairman of the Jerush Groups of Hospitals. He is a highly accomplished Oral and Maxillofacial Surgeon who holds multiple international post-graduate achievements and certifications in facial aesthetics, cosmetology, and implantology.
              </p>
              <p>
                Dr. Bladbin has dedicated his career to delivering exceptional surgical and cosmetic care. Under his guidance, Jerush has grown from a single dedicated dental clinic in Thuckalay to a leading multi-site group with advanced cosmetic laser hubs in Chennai, Trichy, and Fujairah (UAE).
              </p>
              <p>
                He has integrated international standards of sterilization, high-precision diagnostics, and state-of-the-art medical lasers to offer patients safe, comfortable, and natural-looking transformations.
              </p>
            </div>

            {/* CTA Book appointment */}
            <div className="pt-6">
              <a
                href="#"
                onClick={handleCtaClick}
                className="inline-flex items-center gap-2 px-8 py-4 bg-brandBlue text-white font-headline font-bold text-xs uppercase tracking-wider rounded-xl shadow-md hover:shadow-lg hover:-translate-y-0.5 transition-all"
              >
                Schedule consultation with Dr. Bladbin
              </a>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}
