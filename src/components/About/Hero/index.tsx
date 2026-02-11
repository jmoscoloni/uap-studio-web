'use client';
import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import SplitText from 'gsap/dist/SplitText';
import { Button, ButtonComponents } from '@/components';
import { useTranslations } from 'next-intl';

gsap.registerPlugin(SplitText);

const Hero = () => {
  const rootRef = useRef(null);
  const titleRef = useRef(null);
  const t = useTranslations();

  useEffect(() => {
    if (!titleRef.current) return;

    const startAnimation = () => {
      gsap.set(titleRef.current, { autoAlpha: 1 });

      const splitTarget = new SplitText(titleRef.current, { type: 'words' });
      const titleWords = splitTarget.words;
      const splitWords = new SplitText(titleWords, { type: 'chars' });
      const titleChars = splitWords.chars;

      gsap.set(titleChars, { opacity: 0 });

      const tl = gsap
        .timeline({})
        .fromTo(titleChars, { opacity: 0 }, { opacity: 1, stagger: 0.05, duration: 0.03 });

      return () => {
        tl.kill();
        splitTarget.revert();
        splitWords.revert();
      };
    };

    if (typeof document !== 'undefined' && document.body.classList.contains('site-ready')) {
      const clean = startAnimation();
      return clean;
    }

    const handler = () => {
      const clean = startAnimation();
      document.removeEventListener('site:ready', handler);
      if (clean) clean();
    };

    document.addEventListener('site:ready', handler);

    return () => document.removeEventListener('site:ready', handler);
  }, []);

  return (
    <section ref={rootRef} className="relative h-dvh w-full">
      <div className="relative flex h-full w-full flex-col items-center justify-center gap-1 px-2 text-center lg:px-4">
        <h1
          ref={titleRef}
          className="text-[2rem] font-black text-balance md:text-[3rem] lg:text-[3.8rem]"
        >
          {t('about.heroTitle')}
        </h1>
        <p className="text-[1.15rem] font-medium text-balance text-black md:text-[1.8rem] lg:text-[2.2rem]">
          Who we are
        </p>
      </div>
      {/* line effects removed */}
      <div className="absolute bottom-5 left-1/2 -translate-x-1/2">
        <Button>
          <ButtonComponents.ScrollDown targetId="about-intro" offset={-120} />
        </Button>
      </div>
    </section>
  );
};
export default Hero;
