import React, { useState } from 'react';
import PageBreadcrumbHero from '../components/common/PageBreadcrumbHero';
import FaqSection from '../components/common/FaqSection';

export default function ContactPage() {
  const [formData, setFormData] = useState({
    fullName: '',
    countryCode: '+91',
    phoneNumber: '',
    emailAddress: '',
    yourMessage: ''
  });
  const [isRecaptchaChecked, setIsRecaptchaChecked] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showToast, setShowToast] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const handleRecaptchaClick = () => {
    setIsRecaptchaChecked(!isRecaptchaChecked);
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (!isRecaptchaChecked) {
      alert('Please check the reCAPTCHA box to verify you are not a robot.');
      return;
    }

    setIsSubmitting(true);

    // Mimic API request submission
    setTimeout(() => {
      setIsSubmitting(false);
      setShowToast(true);
      
      // Reset form fields
      setFormData({
        fullName: '',
        countryCode: '+91',
        phoneNumber: '',
        emailAddress: '',
        yourMessage: ''
      });
      setIsRecaptchaChecked(false);

      // Hide toast after 4 seconds
      setTimeout(() => {
        setShowToast(false);
      }, 4000);
    }, 1200);
  };

  return (
    <main id="main" className="container-fluid text-left pt-0">
      <div className="row">
        {/* Contact Breadcrumb Hero */}
        <PageBreadcrumbHero 
          title="Contact Us" 
          breadcrumbs={[{ label: 'Contact Us', active: true }]} 
        />

        {/* Contact Locations Detail Grid */}
        <section className="w-full py-16 bg-slate-50 font-body">
          <div className="max-w-7xl mx-auto px-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {/* Card 1: Thuckalay */}
              <div className="bg-white border border-slate-100 p-6 rounded-2xl shadow-sm hover:shadow-md transition-shadow">
                <h4 className="font-headline font-bold text-base text-primary mb-2">Thuckalay Centre</h4>
                <p className="text-xs text-secondary mb-4 leading-relaxed">
                  Jerush Dentoface, Thuckalay Centre, Kanyakumari, Tamil Nadu, India.
                </p>
                <a href="tel:+919489160055" className="inline-flex items-center gap-2 text-xs font-bold text-brandBlue hover:text-brandSky">
                  <svg className="w-4 h-4 shrink-0" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.94.725l.548 2.2a1 1 0 01-.321.988l-1.305.98a10.582 10.582 0 004.872 4.872l.98-1.305a1 1 0 01.988-.321l2.2.548a1 1 0 01.725.94V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                  +91 94891 60055
                </a>
              </div>

              {/* Card 2: Trichy */}
              <div className="bg-white border border-slate-100 p-6 rounded-2xl shadow-sm hover:shadow-md transition-shadow">
                <h4 className="font-headline font-bold text-base text-primary mb-2">Trichy Clinic</h4>
                <p className="text-xs text-secondary mb-4 leading-relaxed">
                  Cosmetic Laser & Dental Care Centre, Trichy, Tamil Nadu, India.
                </p>
                <a href="tel:+919489160011" className="inline-flex items-center gap-2 text-xs font-bold text-brandBlue hover:text-brandSky">
                  <svg className="w-4 h-4 shrink-0" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.94.725l.548 2.2a1 1 0 01-.321.988l-1.305.98a10.582 10.582 0 004.872 4.872l.98-1.305a1 1 0 01.988-.321l2.2.548a1 1 0 01.725.94V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                  +91 94891 60011
                </a>
              </div>

              {/* Card 3: Chennai */}
              <div className="bg-white border border-slate-100 p-6 rounded-2xl shadow-sm hover:shadow-md transition-shadow">
                <h4 className="font-headline font-bold text-base text-primary mb-2">Chennai Liaison</h4>
                <p className="text-xs text-secondary mb-4 leading-relaxed">
                  Regional Dental Care and Patient Liaison Office, Chennai, Tamil Nadu, India.
                </p>
                <a href="tel:+919751010107" className="inline-flex items-center gap-2 text-xs font-bold text-brandBlue hover:text-brandSky">
                  <svg className="w-4 h-4 shrink-0" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.94.725l.548 2.2a1 1 0 01-.321.988l-1.305.98a10.582 10.582 0 004.872 4.872l.98-1.305a1 1 0 01.988-.321l2.2.548a1 1 0 01.725.94V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                  +91 97510 10107
                </a>
              </div>

              {/* Card 4: Dubai */}
              <div className="bg-white border border-slate-100 p-6 rounded-2xl shadow-sm hover:shadow-md transition-shadow">
                <h4 className="font-headline font-bold text-base text-primary mb-2">Dubai Office</h4>
                <p className="text-xs text-secondary mb-4 leading-relaxed">
                  International Liaison & Medical Tourism liaison office, Deira, Dubai, UAE.
                </p>
                <a href="tel:+971507253105" className="inline-flex items-center gap-2 text-xs font-bold text-brandBlue hover:text-brandSky">
                  <svg className="w-4 h-4 shrink-0" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.94.725l.548 2.2a1 1 0 01-.321.988l-1.305.98a10.582 10.582 0 004.872 4.872l.98-1.305a1 1 0 01.988-.321l2.2.548a1 1 0 01.725.94V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                  +971 50725 3105
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* Contact Form and Image Grid Section */}
        <section className="jerush-contact-section font-body">
          <div className="jerush-container">
            <div className="jerush-contact-grid">
              {/* Left Column: Premium Treatment Image */}
              <div className="jerush-contact-image-card">
                <img
                  src="/images/contact-treatment.png"
                  alt="Treatment being performed"
                  loading="lazy"
                  onError={(e) => {
                    // Fallback to high-quality healthcare banner if image fails
                    e.target.src = 'https://images.unsplash.com/photo-1629909613654-28e377c37b09?auto=format&fit=crop&q=80&w=600';
                  }}
                />
                <div className="jerush-contact-image-overlay"></div>
              </div>

              {/* Right Column: Contact Card Form */}
              <div className="jerush-contact-form-card">
                <div className="jerush-form-header">
                  <h2 className="font-headline font-extrabold text-2xl sm:text-3xl text-primary">Get in Touch</h2>
                  <p className="jerush-form-subtitle">
                    Have questions about skin, hair, or dental treatments? Reach out — our expert medical team is happy to help.
                  </p>
                </div>

                <form className="jerush-contact-form" onSubmit={handleFormSubmit}>
                  {/* Full Name */}
                  <div className="jerush-form-group">
                    <label htmlFor="fullName" className="jerush-form-label">Full Name</label>
                    <div className="jerush-input-wrapper">
                      <input
                        type="text"
                        id="fullName"
                        name="fullName"
                        className="jerush-input"
                        placeholder="Enter your full name"
                        value={formData.fullName}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                  </div>

                  {/* Phone Number Row */}
                  <div className="jerush-form-group">
                    <label htmlFor="phoneNumber" className="jerush-form-label">Phone Number</label>
                    <div className="jerush-phone-row">
                      <select
                        id="countryCode"
                        name="countryCode"
                        className="jerush-input jerush-country-select"
                        value={formData.countryCode}
                        onChange={handleInputChange}
                      >
                        <option value="+91">🇮🇳 +91</option>
                        <option value="+971">🇦🇪 +971</option>
                        <option value="+1">🇺🇸 +1</option>
                        <option value="+44">🇬🇧 +44</option>
                      </select>
                      <div className="jerush-input-wrapper">
                        <input
                          type="tel"
                          id="phoneNumber"
                          name="phoneNumber"
                          className="jerush-input"
                          placeholder="Phone number"
                          value={formData.phoneNumber}
                          onChange={handleInputChange}
                          required
                          pattern="[0-9]{8,11}"
                          title="Please enter a valid phone number (8-11 digits)"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Email Address */}
                  <div className="jerush-form-group">
                    <label htmlFor="emailAddress" className="jerush-form-label">Email Address</label>
                    <div className="jerush-input-wrapper">
                      <input
                        type="email"
                        id="emailAddress"
                        name="emailAddress"
                        className="jerush-input"
                        placeholder="yourname@example.com"
                        value={formData.emailAddress}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                  </div>

                  {/* Message */}
                  <div className="jerush-form-group">
                    <label htmlFor="yourMessage" className="jerush-form-label">Your Message</label>
                    <div className="jerush-input-wrapper">
                      <textarea
                        id="yourMessage"
                        name="yourMessage"
                        className="jerush-input jerush-textarea"
                        placeholder="How can our clinical specialists help you?"
                        value={formData.yourMessage}
                        onChange={handleInputChange}
                        required
                      ></textarea>
                    </div>
                  </div>

                  {/* Mock reCAPTCHA */}
                  <div className="jerush-recaptcha-wrapper">
                    <div className="jerush-recaptcha-left">
                      <div
                        id="recaptchaCheck"
                        className={`jerush-recaptcha-checkbox ${isRecaptchaChecked ? 'checked' : ''}`}
                        onClick={handleRecaptchaClick}
                      ></div>
                      <span className="jerush-recaptcha-text" onClick={handleRecaptchaClick}>
                        I'm not a robot
                      </span>
                    </div>
                    <div className="jerush-recaptcha-right">
                      <svg className="jerush-recaptcha-logo-svg" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2ZM13 17H11V15H13V17ZM13 13H11V7H13V13Z" fill="#1E97D4"/>
                      </svg>
                      <div className="flex flex-col items-center">
                        <span className="jerush-recaptcha-logo-text">reCAPTCHA</span>
                        <div className="jerush-recaptcha-links">
                          <a href="https://www.google.com/intl/en/policies/privacy/" target="_blank" rel="noreferrer">Privacy</a> - 
                          <a href="https://www.google.com/intl/en/policies/terms/" target="_blank" rel="noreferrer">Terms</a>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Submit Button */}
                  <button type="submit" className="jerush-form-btn" disabled={isSubmitting}>
                    {isSubmitting ? (
                      <>
                        <span className="inline-block animate-spin mr-2">⏳</span> Sending...
                      </>
                    ) : (
                      'Send Message'
                    )}
                  </button>
                </form>
              </div>
            </div>
          </div>
        </section>
      </div>

      {/* FAQ Accordion Section */}
      <FaqSection />

      {/* Success Toast Notification */}
      <div id="formSuccessToast" className={`jerush-form-toast font-body ${showToast ? 'show' : ''}`}>
        <svg className="jerush-toast-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <polyline points="20 6 9 17 4 12"></polyline>
        </svg>
        <span className="jerush-toast-text">Message sent successfully! Our team will contact you shortly.</span>
      </div>
    </main>
  );
}
