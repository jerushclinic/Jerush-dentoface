import React from 'react';
import TransformationPageTemplate from '../components/transformations/TransformationPageTemplate';
import { transformationCases, VIDEO_STORIES } from '../data/transformationsData';

export default function BodyContouringCasesPage() {
  const bodyCases = transformationCases.filter((c) => c.category === 'body');
  // General wellness & aesthetic transformation video stories
  const bodyVideos = VIDEO_STORIES.slice(0, 3);

  const heroMetrics = [
    { value: '2,500+', label: 'Contouring Sessions' },
    { value: '28%', label: 'Fat Layer Reduction' },
    { value: '-9°C', label: 'Cryolipolysis Tech' },
    { value: 'Zero', label: 'Surgical Downtime' }
  ];

  return (
    <TransformationPageTemplate
      pageTitle="Body Contouring Cases"
      pageHeadlinePrefix="Non-Invasive"
      pageHeadlineHighlight="Body Contouring"
      pageHeadlineSuffix="& CryoSculpting"
      pageDescription="Documented clinical Before & After results of targeted -9°C Cryolipolysis fat freezing, electromagnetic muscle sculpting, and skin tightening."
      badgeText="Body Aesthetics Case Dossier"
      heroMetrics={heroMetrics}
      cases={bodyCases}
      videoStories={bodyVideos}
      ctaProps={{
        badgeText: "Body Aesthetics & Wellness Director",
        titlePrefix: "Sculpt Your Ideal Silhouette",
        highlightWord: "Without Surgery",
        titleSuffix: "",
        subtitle: "Schedule your 360° body assessment to discover customized non-invasive Cryo CoolSculpting and HIFEM muscle sculpting protocols with our clinical team.",
        doctorImage: "/images/doctors/dr-bladbin-profile2.webp",
        doctorName: "DR. A. BLADBIN",
        doctorRole: "Founder & Body Aesthetics Specialist",
        doctorAlt: "DR. A. BLADBIN - Body Aesthetics Specialist"
      }}
    />
  );
}
