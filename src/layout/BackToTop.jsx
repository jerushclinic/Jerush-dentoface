import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowUp } from 'lucide-react';

export default function BackToTop() {
  const [isVisible, setIsVisible] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      // Toggle visibility
      if (window.scrollY > 400) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }

      // Calculate scroll progress percentage
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (totalHeight > 0) {
        const progress = (window.scrollY / totalHeight) * 100;
        setScrollProgress(progress);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.button
          initial={{ opacity: 0, scale: 0.8, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.8, y: 20 }}
          whileHover={{ scale: 1.1, y: -2 }}
          whileTap={{ scale: 0.9 }}
          onClick={scrollToTop}
          className="fixed bottom-20 lg:bottom-6 right-4 sm:right-6 z-[999] w-12 h-12 flex items-center justify-center bg-gradient-to-r from-brandBlue to-brandSky text-white rounded-full shadow-lg shadow-brandBlue/30 cursor-pointer transition-shadow hover:shadow-brandSky/45"
          aria-label="Back to top"
        >
          {/* Scroll Progress Ring SVG */}
          <svg className="absolute -inset-1 w-[56px] h-[56px] -rotate-90 pointer-events-none" viewBox="0 0 44 44">
            {/* Background circle */}
            <circle
              cx="22"
              cy="22"
              r="19"
              fill="none"
              stroke="rgba(30, 151, 212, 0.15)"
              strokeWidth="2.5"
            />
            {/* Progress circle */}
            <circle
              cx="22"
              cy="22"
              r="19"
              fill="none"
              stroke="#38bdf8"
              strokeWidth="2.5"
              strokeDasharray={119.38}
              strokeDashoffset={119.38 - (119.38 * scrollProgress) / 100}
              strokeLinecap="round"
              className="jerush-back-to-top-ring"
            />
          </svg>
          <ArrowUp className="w-5 h-5 stroke-[2.5] relative z-10" />
        </motion.button>
      )}
    </AnimatePresence>
  );
}
