'use client';
import { useEffect, useRef } from 'react';
import { Button, ButtonComponents } from '@/components';
import gsap from 'gsap';
import SplitText from 'gsap/dist/SplitText';
import { useStore } from '@/store';
import { useTranslations } from 'next-intl';

gsap.registerPlugin(SplitText);

const Hero = () => {
  const rootRef = useRef(null);
  const titleRef = useRef(null);
  const textRef = useRef(null);
  const { isLoading } = useStore();
  const t = useTranslations();

  useEffect(() => {
    if (!titleRef.current || !textRef.current) return;

    const startAnimation = () => {
      gsap.set([titleRef.current, textRef.current], { autoAlpha: 1 });

      const splitTarget = new SplitText(titleRef.current, { type: 'words' });
      const titleWords = splitTarget.words;
      const splitWords = new SplitText(titleWords, { type: 'chars' });
      const titleChars = splitWords.chars;

      const splitParagraph = new SplitText(textRef.current, { type: 'words' });
      const paragraphWords = splitParagraph.words;
      const splitParagraphChars = new SplitText(paragraphWords, { type: 'chars' });
      const paragraphChars = splitParagraphChars.chars;

      gsap.set(titleChars, { opacity: 0 });
      gsap.set(paragraphChars, { opacity: 0 });

      const tl = gsap
        .timeline({})
        .fromTo(titleChars, { opacity: 0 }, { opacity: 1, stagger: 0.05, duration: 0.03 })
        .fromTo(paragraphChars, { opacity: 0 }, { opacity: 1, stagger: 0.02, duration: 0.03 }, 1);

      return () => {
        tl.kill();
        splitTarget.revert();
        splitWords.revert();
        splitParagraph.revert();
        splitParagraphChars.revert();
      };
    };

    // If site is already ready (no loader overlay), start immediately
    if (typeof document !== 'undefined' && document.body.classList.contains('site-ready')) {
      const clean = startAnimation();
      return clean;
    }

    // otherwise wait for the loader to finish and dispatch 'site:ready'
    const handler = () => {
      const clean = startAnimation();
      // cleanup handler after run
      document.removeEventListener('site:ready', handler);
      if (clean) clean();
    };

    document.addEventListener('site:ready', handler);

    return () => {
      document.removeEventListener('site:ready', handler);
    };
  }, []);

  return (
    <section ref={rootRef} className="relative h-dvh w-full">
      <div className="relative flex h-full w-full flex-col items-center justify-center gap-2 text-center">
        <h1
          ref={titleRef}
          className="h1 text-[2.4rem]! leading-tight font-black tracking-tight text-balance md:text-[3.2rem]! lg:text-[4.6rem]!"
        >
          <span className="block lg:inline lg:whitespace-nowrap">
            {t('home.hero.title.line1')} {t('home.hero.title.line2')}
          </span>
        </h1>
        <p
          ref={textRef}
          className="text-[1.35rem] leading-tight font-black tracking-tight text-balance text-black uppercase md:text-[2.05rem] lg:text-[2.55rem]"
        >
          {t('home.hero.paragraph')}
        </p>
      </div>
      <div className="absolute bottom-5 left-1/2 -translate-x-1/2">
        <Button>
          <ButtonComponents.ScrollDown targetId="work-section" />
        </Button>
      </div>
    </section>
  );
};
export default Hero;
