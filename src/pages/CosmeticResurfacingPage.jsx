import React from 'react';
import TransformationPageTemplate from '../components/transformations/TransformationPageTemplate';
import { transformationCases, VIDEO_STORIES } from '../data/transformationsData';

export default function CosmeticResurfacingPage() {
  const skinCases = transformationCases.filter((c) => c.category === 'skin');
  const skinVideos = VIDEO_STORIES.filter(
    (v) => v.id === 'video-austin' || v.id === 'video-hydra'
  );

  const heroMetrics = [
    { value: '15,000+', label: 'Laser Procedures' },
    { value: '85%+', label: 'Scar Remodeling' },
    { value: 'US-FDA', label: 'Approved Technology' },
    { value: 'Zero', label: 'Surgical Downtime' }
  ];

  return (
    <TransformationPageTemplate
      pageTitle="Cosmetic Resurfacing"
      pageHeadlinePrefix="Clinical"
      pageHeadlineHighlight="Cosmetic Resurfacing"
      pageHeadlineSuffix="& Laser Dermatology"
      pageDescription="Authentic Before & After results of US-FDA approved Fractional CO₂ Laser, photoacoustic melasma treatment, and medical skin resurfacing."
      badgeText="Laser Dermatology Case Dossier"
      heroMetrics={heroMetrics}
      cases={skinCases}
      videoStories={skinVideos}
      ctaProps={{
        badgeText: "Founder & Chief Maxillofacial Surgeon",
        titlePrefix: "Reveal Your Skin's",
        highlightWord: "Luminous Clarity",
        titleSuffix: "",
        subtitle: "Consult with Dr. A. Bladbin and our laser dermatology team to create a personalized medical skin resurfacing plan with zero downtime.",
        doctorImage: "/images/doctors/dr-bladbin-profile2.webp",
        doctorName: "DR. A. BLADBIN",
        doctorRole: "Chief Oral & Maxillofacial Surgeon & Cosmetologist",
        doctorAlt: "DR. A. BLADBIN - Chief Maxillofacial & Cosmetic Laser Specialist"
      }}
    />
  );
}
