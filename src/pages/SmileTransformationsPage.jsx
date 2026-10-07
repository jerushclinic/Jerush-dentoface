import React from 'react';
import TransformationPageTemplate from '../components/transformations/TransformationPageTemplate';
import { transformationCases, VIDEO_STORIES } from '../data/transformationsData';

export default function SmileTransformationsPage() {
  const dentalCases = transformationCases.filter((c) => c.category === 'dental');
  const dentalVideos = VIDEO_STORIES.filter(
    (v) => v.id === 'video-lajona' || v.id === 'video-brylin' || v.id === 'video-jeba'
  );

  const heroMetrics = [
    { value: '25,000+', label: 'Smiles Restored' },
    { value: '99.4%', label: 'Patient Satisfaction' },
    { value: '25+ Yrs', label: 'Prosthodontic Legacy' },
    { value: '100%', label: 'Digital 3D CAD/CAM' }
  ];

  return (
    <TransformationPageTemplate
      pageTitle="Smile Transformations"
      pageHeadlinePrefix="Documented"
      pageHeadlineHighlight="Smile Transformations"
      pageHeadlineSuffix="& Aesthetic Cases"
      pageDescription="Authentic Before & After clinical cases of monolithic zirconia bridges, aesthetic jacket crowns, and Jerushaligne clear aligners."
      badgeText="Dental Clinical Case Dossier"
      heroMetrics={heroMetrics}
      cases={dentalCases}
      videoStories={dentalVideos}
      ctaProps={{
        badgeText: "Managing Director & Prosthodontist",
        titlePrefix: "Begin Your Personal Smile",
        highlightWord: "Transformation Today",
        titleSuffix: "",
        subtitle: "Every smile has a unique story waiting to unfold. Schedule your private digital consultation with our board-certified dental and aesthetic specialists at Jerush Dentofacial.",
        doctorImage: "/images/doctors/dr-binila-portrait.webp",
        doctorName: "DR. C. BINILA ASIR",
        doctorRole: "Managing Director & Senior Prosthodontist",
        doctorAlt: "DR. C. BINILA ASIR - Managing Director & Aesthetic Specialist"
      }}
    />
  );
}
