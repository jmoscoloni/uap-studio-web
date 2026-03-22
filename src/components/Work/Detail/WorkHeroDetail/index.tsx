'use client';
import { useCallback, useEffect, useState } from 'react';
import Image from 'next/image';
import useEmblaCarousel from 'embla-carousel-react';
import { Button, ButtonComponents } from '@/components';
import { useRouter } from '@/i18n/navigation';

interface WorkHeroDetailProps {
  title: string;
  subtitle?: string;
  overview?: string;
  images: string[];
}

const WorkHeroDetail = ({ title, subtitle, overview, images }: WorkHeroDetailProps) => {
  const router = useRouter();
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: false });
  const [selectedIndex, setSelectedIndex] = useState(0);

  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev();
  }, [emblaApi]);

  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext();
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;

    const onSelect = () => {
      setSelectedIndex(emblaApi.selectedScrollSnap());
    };

    emblaApi.on('select', onSelect);
    onSelect();

    return () => {
      emblaApi.off('select', onSelect);
    };
  }, [emblaApi]);

  const hasMultiple = images.length > 1;

  return (
    <section className="relative w-full px-2 pt-1 pb-10 lg:px-4 lg:pt-2">
      <div className="site-grid">
        <div className="col-span-full lg:col-span-10 lg:col-start-2">
          <div className="grid grid-cols-1 items-stretch gap-1 lg:min-h-[100dvh] lg:grid-cols-12 lg:gap-6">
            <div className="order-2 flex flex-col justify-center px-0 lg:order-1 lg:col-span-4 lg:px-0">
              <h1 className="h1 m-0 -ml-2 ml-0 pl-0 text-left text-[2.2rem]! leading-tight font-black tracking-tight text-balance text-[#FB2721] md:text-[3.0rem]! lg:ml-0 lg:text-[4.2rem]!">
                {title}
              </h1>
              {subtitle && (
                <p className="m-0 mt-1 ml-0 pl-0 text-left text-[1.2rem] leading-tight font-normal tracking-tight text-balance text-[#FB2721] md:mt-1 md:text-[1.8rem] lg:text-[2.2rem]">
                  {subtitle}
                </p>
              )}
              {overview && <p className="p-lg mt-2 text-balance lg:mt-4">{overview}</p>}
              <div className="mt-4 flex justify-center lg:mt-6 lg:justify-start">
                <Button onClick={() => router.back()} className="w-fit">
                  <span className="text-[1.125rem] font-normal text-black transition-colors duration-200 hover:text-[#FB2721] lg:text-2xl">
                    Back
                  </span>
                </Button>
              </div>
            </div>

            <div className="order-1 flex items-stretch lg:order-2 lg:col-span-8">
              <div className="relative w-full">
                <div className="flex-1 overflow-hidden" ref={emblaRef}>
                  <div className="flex">
                    {images.map((src, index) => (
                      <div
                        key={index}
                        className="flex min-w-0 flex-[0_0_100%] items-center justify-center px-0 py-0 lg:h-[calc(100dvh-24px)] lg:px-2 lg:py-2"
                      >
                        <img
                          src={src}
                          alt={`${title} - Image ${index + 1}`}
                          className="max-h-full max-w-full object-contain"
                        />
                      </div>
                    ))}
                  </div>
                </div>

                {/* Prev button: absolutely positioned so it doesn't affect layout */}
                {hasMultiple && selectedIndex > 0 && (
                  <button
                    onClick={scrollPrev}
                    className="absolute z-20 -left-4 top-1/2 -translate-y-1/2 flex items-center justify-center px-2 transition-opacity hover:opacity-60 text-[#FB2721] lg:-left-6"
                    aria-label="Previous slide"
                  >
                    <svg
                      width="28"
                      height="28"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M15 18L9 12L15 6"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </button>
                )}

                {/* Next button: absolutely positioned so it doesn't affect layout */}
                {hasMultiple && selectedIndex < images.length - 1 && (
                  <button
                    onClick={scrollNext}
                    className="absolute z-20 -right-4 top-1/2 -translate-y-1/2 flex items-center justify-center px-2 transition-opacity hover:opacity-60 text-[#FB2721] lg:-right-6"
                    aria-label="Next slide"
                  >
                    <svg
                      width="28"
                      height="28"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M9 18L15 12L9 6"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WorkHeroDetail;
