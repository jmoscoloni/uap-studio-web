'use client';
import { useRef, useEffect } from 'react';
import gsap from 'gsap';
import SplitText from 'gsap/dist/SplitText';
import Form from './Form';
import { Button, ButtonComponents } from '@/components';
import { useTranslations } from 'next-intl';

gsap.registerPlugin(SplitText);

const ContactHero = () => {
  const rootRef = useRef(null);
  const titleRef = useRef(null);
  const t = useTranslations();

  useEffect(() => {
    if (!rootRef.current || !titleRef.current) return;

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
    <>
      <section ref={rootRef} className="relative h-dvh w-full">
        <div className="relative flex h-full w-full flex-col items-center justify-center gap-1 px-2 text-center lg:px-4">
          <h1
            ref={titleRef}
            className="text-[2rem] font-black text-balance md:text-[3rem] lg:text-[3.8rem]"
          >
            {t('contact.title')}
          </h1>
          <p className="text-[1.15rem] font-medium text-balance text-black md:text-[1.8rem] lg:text-[2.2rem]">
            By{' '}
            <a href="mailto:info@uap-studio.com" className="no-underline hover:text-[#FB2721]">
              email
            </a>
            /
            <a
              href="https://wa.me/5491168497121?text=Hello%2C%20I%27m%20contacting%20you%20regarding%20architectural%20visualization%20services.%20I%27d%20like%20to%20know%20more%20about%20your%20work%20and%20availability."
              target="_blank"
              rel="noopener noreferrer"
              className="no-underline hover:text-[#FB2721]"
            >
              phone
            </a>{' '}
            or through the form below
          </p>
        </div>
        <div className="absolute bottom-5 left-1/2 -translate-x-1/2">
          <Button>
            <ButtonComponents.ScrollDown targetId="send-message" />
          </Button>
        </div>
      </section>

      <section id="send-message" className="w-full px-2 py-12 lg:px-4">
        <div className="site-grid">
          <div className="col-span-4 lg:col-span-6 lg:col-start-4">
            <Form />
          </div>
        </div>
      </section>
    </>
  );
};
export default ContactHero;
