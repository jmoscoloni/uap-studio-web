'use client';

import gsap from 'gsap';
import { ScrollTrigger as GSAPScrollTrigger } from 'gsap/all';
import { useLenis } from 'lenis/react';
import { useEffect } from 'react';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(GSAPScrollTrigger);
  GSAPScrollTrigger.clearScrollMemory();
  GSAPScrollTrigger.defaults({
    markers: process.env.NODE_ENV === 'development'
  });
}

export default function ScrollTrigger() {
  const lenis = useLenis(GSAPScrollTrigger.update);
  useEffect(() => GSAPScrollTrigger.refresh(), [lenis]);
  return null;
}
