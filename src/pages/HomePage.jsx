import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import HeroSection from '../components/home/HeroSection.jsx';
import UpcomingEventsSection from '../components/home/UpcomingEventsSection.jsx';
import WelcomeSection from '../components/home/WelcomeSection.jsx';
import TreatmentsSection from '../components/home/TreatmentsSection.jsx';
import ChairmansDesk from '../components/home/ChairmansDesk.jsx';
import DoctorsTeam from '../components/home/DoctorsTeam.jsx';
import InfrastructureSection from '../components/home/InfrastructureSection.jsx';
import Testimonials from '../components/home/Testimonials.jsx';
import HighlightsSection from '../components/home/HighlightsSection.jsx';
import BlogPreviewSection from '../components/home/BlogPreviewSection.jsx';
import FaqSection from '../components/common/FaqSection.jsx';
import ContactSection from '../components/home/ContactSection.jsx';

import { doctorService } from '../services/doctorService';
import { treatmentService } from '../services/treatmentService';
import { reviewService } from '../services/reviewService';
import { blogService } from '../services/blogService';

import { doctors as mockDoctors } from '../data/doctors';
import { treatments as mockTreatments } from '../data/treatments';
import { reviews as mockReviews } from '../data/reviews';
import { blogs as mockBlogs } from '../data/blogs';

// Reusable wrapper to prevent layout shift and blank content on scroll
const SectionReveal = ({ children }) => (
  <div className="w-full">
    {children}
  </div>
);

export default function HomePage() {
  const [doctors, setDoctors] = useState(mockDoctors);
  const [treatments, setTreatments] = useState(mockTreatments);
  const [reviews, setReviews] = useState(mockReviews);
  const [blogs, setBlogs] = useState(mockBlogs.slice(0, 3));

  useEffect(() => {
    // Load all homepage data asynchronously from services and hydrate state
    doctorService.getDoctors().then((data) => {
      if (data && data.length > 0) setDoctors(data);
    });
    treatmentService.getTreatments().then((data) => {
      if (data && data.length > 0) setTreatments(data);
    });
    reviewService.getReviews().then((data) => {
      if (data && data.length > 0) setReviews(data);
    });
    blogService.getRecentBlogs(3).then((data) => {
      if (data && data.length > 0) setBlogs(data);
    });
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.4, ease: 'easeOut' }}
    >
      {/* Hero section rendered at true 100% viewport height with zero vertical offset */}
      <HeroSection />

      {/* Upcoming Events Book Journal Banner Showcase */}
      <SectionReveal>
        <UpcomingEventsSection />
      </SectionReveal>

      <SectionReveal>
        <WelcomeSection />
      </SectionReveal>

      <SectionReveal>
        <TreatmentsSection treatments={treatments} />
      </SectionReveal>

      <SectionReveal>
        <ChairmansDesk />
      </SectionReveal>

      <SectionReveal>
        <DoctorsTeam doctors={doctors} />
      </SectionReveal>

      <SectionReveal>
        <InfrastructureSection />
      </SectionReveal>

      <SectionReveal>
        <Testimonials reviews={reviews} />
      </SectionReveal>

      <SectionReveal>
        <HighlightsSection />
      </SectionReveal>

      <SectionReveal>
        <BlogPreviewSection blogs={blogs} />
      </SectionReveal>

      <SectionReveal>
        <FaqSection />
      </SectionReveal>

      <SectionReveal>
        <ContactSection />
      </SectionReveal>
    </motion.div>
  );
}
