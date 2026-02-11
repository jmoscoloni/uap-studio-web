'use client';
import React, { useRef, useState, useEffect } from 'react';
import Image from 'next/image';
import { Button, ButtonComponents } from '@/components';
import cn from 'classnames';

interface CardProps {
  big?: boolean;
  image: string;
  paragraph: string;
  title?: string;
  subtitle?: string;
  video?: string;
}

const Card: React.FC<CardProps> = ({ big, image, paragraph, title, subtitle, video }) => {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [showVideo, setShowVideo] = useState(false);

  useEffect(() => {
    const check = () => setShowVideo(window.innerWidth >= 1024);
    check();
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, []);

  const handleEnter = () => {
    if (videoRef.current) {
      try {
        videoRef.current.currentTime = 0;
        videoRef.current.muted = true;
        const p = videoRef.current.play();
        if (p && typeof p.catch === 'function') p.catch(() => {});
      } catch (e) {}
    }
  };

  const handleLeave = () => {
    if (videoRef.current) {
      try {
        videoRef.current.pause();
        videoRef.current.currentTime = 0;
      } catch (e) {}
    }
  };

  return (
    <div
      className={cn('group/card group/btn relative flex w-full flex-col gap-2', {
        '': big
      })}
    >
      <div
        onMouseEnter={handleEnter}
        onMouseLeave={handleLeave}
        className={cn('relative aspect-[1/1.2] w-full overflow-hidden', {
          'lg:aspect-auto lg:h-[calc(100dvh-30px)]': big
        })}
      >
        <Image
          src={image}
          alt=""
          width={496}
          height={619}
          quality={100}
          sizes="(min-width:1024px) 50vw, 100vw"
          className="h-full w-full object-cover duration-700 ease-out group-hover/card:scale-[1.05]"
        />
        {video && showVideo && (
          <video
            ref={videoRef}
            src={video}
            playsInline
            muted
            loop
            className="pointer-events-none absolute inset-0 z-10 h-full w-full object-cover opacity-0 transition-opacity duration-300 group-hover/card:opacity-100"
          />
        )}
      </div>
      <div
        className={cn('flex flex-col gap-2', {
          'w-1/3 lg:justify-between! lg:self-stretch': big
        })}
      >
        {big && (
          <div className="pointer-events-none absolute bottom-3 left-0 flex w-full justify-center lg:bottom-4">
            <div className="px-4 text-center">
              {subtitle && (
                <p className="mb-0.5 text-[1rem] font-medium text-white/80 lg:text-[1.125rem]">
                  {subtitle}
                </p>
              )}
              <p
                className={cn(
                  'line-clamp-3 text-center text-[1rem] font-extrabold! text-white lg:text-2xl',
                  {
                    'lg:line-clamp-none': big
                  }
                )}
              >
                {title ?? 'Project Name 1'}
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
export default Card;
