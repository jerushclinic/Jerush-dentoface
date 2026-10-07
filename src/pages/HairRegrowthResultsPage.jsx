import React from 'react';
import TransformationPageTemplate from '../components/transformations/TransformationPageTemplate';
import { transformationCases, VIDEO_STORIES } from '../data/transformationsData';

export default function HairRegrowthResultsPage() {
  const hairCases = transformationCases.filter((c) => c.category === 'hair');
  const hairVideos = VIDEO_STORIES.filter((v) => v.id === 'video-arul');

  const heroMetrics = [
    { value: '5,000+', label: 'Restoration Journeys' },
    { value: '98%', label: 'Graft Survival Rate' },
    { value: 'Sapphire', label: 'Micro-FUE Precision' },
    { value: '100%', label: 'Natural Angle & Flow' }
  ];

  return (
    <TransformationPageTemplate
      pageTitle="Hair Regrowth Results"
      pageHeadlinePrefix="Clinical"
      pageHeadlineHighlight="Hair Regrowth Results"
      pageHeadlineSuffix="& Micro-FUE Restoration"
      pageDescription="Authentic Before & After results of Sapphire Micro-FUE hair transplants, autologous GFC therapy, and scalp detox care."
      badgeText="Hair Restoration Case Dossier"
      heroMetrics={heroMetrics}
      cases={hairCases}
      videoStories={hairVideos}
      ctaProps={{
        badgeText: "Hair Restoration Surgeon & Trichologist",
        titlePrefix: "Take the First Step to",
        highlightWord: "Restore Permanent Hair",
        titleSuffix: "",
        subtitle: "Schedule a high-precision digital scalp dermoscopy and discuss your customized FUE or GFC hair regrowth plan with Dr. A. Bladbin.",
        doctorImage: "/images/doctors/dr-bladbin-profile2.webp",
        doctorName: "DR. A. BLADBIN",
        doctorRole: "Hair Restoration Surgeon & Regenerative Trichologist",
        doctorAlt: "DR. A. BLADBIN - Hair Restoration Specialist"
      }}
    />
  );
}
