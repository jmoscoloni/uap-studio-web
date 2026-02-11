'use client';

import React from 'react';
import { EmblaOptionsType } from 'embla-carousel';
import useEmblaCarousel from 'embla-carousel-react';
import Fade from 'embla-carousel-fade';
import Autoplay from 'embla-carousel-autoplay';
import Image from 'next/image';

const images = ['/Images/me.jpg'];

type PropType = {
  options?: EmblaOptionsType;
};

const EmblaCarousel = ({ options }: PropType) => {
  const [emblaRef] = useEmblaCarousel({ ...options, loop: true }, [
    Fade(),
    Autoplay({ delay: 5000, stopOnInteraction: false })
  ]);

  if (images.length <= 1) {
    return (
      <div className="relative h-full w-full">
        <div className="relative h-full w-full">
          <Image className="h-full w-full object-cover" src={images[0]} alt="About image" fill />
        </div>
      </div>
    );
  }

  return (
    <div className="relative h-full w-full">
      <div className="h-full w-full overflow-hidden" ref={emblaRef}>
        <div className="flex h-full">
          {images.map((src, index) => (
            <div
              className="relative h-full min-w-0 flex-[0_0_100%]"
              key={index}
              style={{ flex: '0 0 100%' }}
            >
              <Image
                className="h-full w-full object-cover"
                src={src}
                alt={`About image ${index + 1}`}
                fill
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default EmblaCarousel;
