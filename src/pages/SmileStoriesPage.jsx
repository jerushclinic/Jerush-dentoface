import React from 'react';
import { useSearchParams, Navigate } from 'react-router-dom';

export default function SmileStoriesPage() {
  const [searchParams] = useSearchParams();
  const rawCategory = searchParams.get('category') || searchParams.get('tab') || '';
  const lower = rawCategory.toLowerCase().trim();

  if (lower === 'skin' || lower === 'laser' || lower === 'cosmetic' || lower === 'cosmetic-resurfacing') {
    return <Navigate to="/cosmetic-resurfacing" replace />;
  }

  if (lower === 'hair' || lower === 'hair-restoration' || lower === 'hair-regrowth') {
    return <Navigate to="/hair-regrowth-results" replace />;
  }

  if (lower === 'body' || lower === 'body-contouring' || lower === 'cryo') {
    return <Navigate to="/body-contouring-cases" replace />;
  }

  // Default to Smile Transformations
  return <Navigate to="/smile-transformations" replace />;
}
