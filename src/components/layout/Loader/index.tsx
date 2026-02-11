'use client';
import { useRef, useEffect } from 'react';
import { useStore } from '@/store';
import gsap from 'gsap';
import { Button, ButtonComponents } from '@/components';
import cn from 'classnames';

const Loader = () => {
  const { isLoading, setIsLoading } = useStore();
  const setCanScroll = useStore((state) => state.setCanScroll);

  useEffect(() => {
    const tl = gsap
      .timeline()
      .fromTo(
        '.uap-letter-js',
        {
          autoAlpha: 0
        },
        {
          autoAlpha: 1,
          stagger: 1,
          duration: 0.7
        }
      )
      .to(
        '.loader-number-js',
        {
          textContent: 100,
          duration: 4,
          snap: { textContent: 1 },
          stagger: 1
        },
        0
      );

    tl.eventCallback('onComplete', () => {
      animateLogoToHeader().then(() => handlerEnter());
    });

    return () => {
      tl.kill();
    };
  }, []);

  useEffect(() => {
    setCanScroll(isLoading);
  }, [isLoading, setCanScroll]);

  const handlerEnter = () => {
    setIsLoading(true);
  };

  const animateLogoToHeader = async (): Promise<void> => {
    try {
      const loaderLogo = document.querySelector('.loader-logo-js') as HTMLElement | null;
      const loaderContainer = document.querySelector('.loader-content-js') as HTMLElement | null;
      // select header logo via attribute selector to avoid class name with slash
      const headerLogo = document.querySelector('a[class*="group/logo"] img') as HTMLElement | null;

      // Fallback: try selecting header image by src
      const headerLogoFallback = document.querySelector(
        "img[src='/Images/uap-logo.png']"
      ) as HTMLElement | null;

      const target = headerLogo || headerLogoFallback;
      if (!loaderLogo || !target) return Promise.resolve();

      const lr = loaderLogo.getBoundingClientRect();
      const hr = target.getBoundingClientRect();

      // (keep loader container visible so background can animate)

      // Create clone and position it exactly over the loader logo
      const clone = loaderLogo.cloneNode(true) as HTMLElement;
      clone.style.position = 'fixed';
      clone.style.left = `${lr.left}px`;
      clone.style.top = `${lr.top}px`;
      clone.style.width = `${lr.width}px`;
      clone.style.height = `${lr.height}px`;
      clone.style.margin = '0';
      clone.style.zIndex = '10000';
      clone.style.pointerEvents = 'none';
      // transform around center for precise alignment
      clone.style.transformOrigin = 'center center';
      document.body.appendChild(clone);

      // hide original loader logo while animating so clone is the only visible element
      if (loaderLogo) loaderLogo.style.visibility = 'hidden';

      // background element for the overlay (we'll animate it upward)
      const bgEl = document.querySelector('.loader-bg-js') as HTMLElement | null;

      // hide header logo so it doesn't snap in while clone is moving
      const prevHeaderVisibility = target.style.visibility || '';
      const prevHeaderOpacity = target.style.opacity || '';
      const prevHeaderTransition = target.style.transition || '';
      // disable header opacity/transitions so it won't cross-fade while we animate
      target.style.transition = 'none';
      target.style.visibility = 'hidden';
      target.style.opacity = '0';

      // compute centers to avoid fractional offset issues
      // compute centers to avoid fractional offset issues
      const lrCenterX = lr.left + lr.width / 2;
      const lrCenterY = lr.top + lr.height / 2;
      const hrCenterX = hr.left + hr.width / 2;
      const hrCenterY = hr.top + hr.height / 2;

      // micro-adjustments (tweak these values for pixel-perfect alignment)
      const microOffsetX = 2; // pixels: positive moves clone slightly right
      const microOffsetY = -8; // pixels: negative moves clone slightly up (tweaked further for alignment)

      let dx = hrCenterX - lrCenterX;
      let dy = hrCenterY - lrCenterY;
      const scale = hr.width / lr.width || 1;

      // apply micro-offset in screen pixels
      dx += microOffsetX;
      dy += microOffsetY;

      // ensure both clone and target use center transform origin for precise scaling
      clone.style.transformOrigin = 'center center';
      target.style.transformOrigin = 'center center';

      // hide loader container (letters/percent) immediately so it isn't visible
      // while the background slides away — the clone will remain visible
      if (loaderContainer) {
        loaderContainer.style.visibility = 'hidden';
        loaderContainer.style.opacity = '0';
        loaderContainer.style.pointerEvents = 'none';
      }

      await new Promise<void>((resolve) => {
        const promises: Promise<void>[] = [];

        // animate clone to header
        promises.push(
          new Promise<void>((res) => {
            gsap.to(clone, {
              duration: 1.2,
              x: dx,
              y: dy,
              scale,
              ease: 'power2.inOut',
              onComplete: () => res()
            });
          })
        );

        // animate background smoothly: shrink height and slide to top leaving a 1px line
        if (bgEl) {
          promises.push(
            new Promise<void>((res) => {
              try {
                const vh = window.innerHeight || document.documentElement.clientHeight || 0;
                const finalY = -(vh - 1); // move up so only 1px remains at top

                gsap.to(bgEl, {
                  duration: 2.0,
                  y: finalY,
                  height: '1px',
                  delay: 0.02,
                  ease: 'power3.out',
                  onComplete: () => res()
                });
              } catch (e) {
                // fallback to full slide
                gsap.to(bgEl, {
                  duration: 2.0,
                  y: '-110%',
                  delay: 0.02,
                  ease: 'power3.out',
                  onComplete: () => res()
                });
              }
            })
          );
        }

        Promise.all(promises).then(() => resolve());
      });

      // clean up: remove clone and the original loader logo so nothing remains in center
      clone.remove();
      if (loaderLogo.parentElement) loaderLogo.parentElement.removeChild(loaderLogo);

      // remove background overlay from DOM so nothing remains
      if (bgEl && bgEl.parentElement) bgEl.parentElement.removeChild(bgEl);

      // reveal header logo with a subtle fade instead of an instant show
      target.style.visibility = prevHeaderVisibility || 'visible';
      // ensure starting from invisible state
      target.style.opacity = '0';

      requestAnimationFrame(() => {
        // apply a gentle opacity transition (600ms)
        const fadeDurationMs = 600;
        const fadeTransition = `opacity ${fadeDurationMs}ms ease`;

        // combine with any previous transition so we don't lose existing rules
        target.style.transition = prevHeaderTransition
          ? `${prevHeaderTransition}, ${fadeTransition}`
          : fadeTransition;

        // trigger the fade to the original opacity (or fully visible)
        target.style.opacity = prevHeaderOpacity || '1';

        // once fade completes, restore the original transition property
        const cleanup = () => {
          target.style.transition = prevHeaderTransition;
          target.removeEventListener('transitionend', cleanup);
        };
        target.addEventListener('transitionend', cleanup);
      });

      // signal the app that the site is ready so header can fade in smoothly
      try {
        document.body.classList.add('site-ready');
        document.dispatchEvent(new Event('site:ready'));
      } catch (e) {}

      return Promise.resolve();
    } catch (e) {
      return Promise.resolve();
    }
  };

  return (
    <div
      className={cn('loader-bg-js fixed top-0 left-0 z-9999 h-dvh w-full duration-700', {
        'pointer-events-none opacity-0': isLoading
      })}
      style={{ backgroundColor: '#FB2721' }}
    >
      <div className="loader-content-js relative flex h-full w-full flex-col items-center justify-center gap-2 lg:gap-3">
        <div className="relative">
          <p className="h1 loader-logo-js">
            <span className="uap-letter-js invisible inline-block">
              <img
                src="/Images/uap-u.png"
                alt="U"
                className="inline-block h-[0.6em] w-auto md:h-[0.75em]"
                style={{ filter: 'brightness(0) invert(1)' }}
              />
            </span>
            <span className="uap-letter-js invisible inline-block">
              <img
                src="/Images/uap-a.png"
                alt="A"
                className="inline-block h-[0.6em] w-auto md:h-[0.75em]"
                style={{ filter: 'brightness(0) invert(1)' }}
              />
            </span>
            <span className="uap-letter-js invisible inline-block">
              <img
                src="/Images/uap-p.png"
                alt="P"
                className="inline-block h-[0.6em] w-auto md:h-[0.75em]"
                style={{ filter: 'brightness(0) invert(1)' }}
              />
            </span>
          </p>
        </div>
        <p className="p-lg" style={{ color: '#ffffff' }}>
          <span className="loader-number-js">0</span>%
        </p>
        {/* Animated lines removed per request */}
      </div>
    </div>
  );
};

export default Loader;
