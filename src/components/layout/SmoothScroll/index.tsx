'use client';

import { ReactLenis, useLenis } from 'lenis/react';
import { useEffect, useRef, ReactNode } from 'react';
import { useStore } from '@/store';

interface SmoothScrollProps {
  children: ReactNode;
}

export default function SmoothScroll({ children }: SmoothScrollProps) {
  const lenisRef = useRef<any>(null);
  const lenis = useLenis();
  const { canScroll } = useStore();

  useEffect(() => {
    if (lenisRef.current?.lenis) {
      lenisRef.current.lenis.scrollTo(0, { immediate: true });
    }
  }, [lenisRef, lenis]);

  useEffect(() => {
    if (!canScroll) {
      lenis?.stop();
    } else {
      lenis?.start();
    }
  }, [canScroll, lenis]);

  return (
    <ReactLenis root ref={lenisRef}>
      {children}
    </ReactLenis>
  );
}
