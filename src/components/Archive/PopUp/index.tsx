'use client';
import { LayoutComponents } from '@/components';
import { useState, useEffect, useCallback } from 'react';
import { ArchiveItem } from '@/store';
import Image from 'next/image';

interface PopUpProps {
  isOpen: boolean;
  close: () => void;
  items: ArchiveItem[];
  startIndex: number;
}

const PopUp = ({ isOpen, close, items, startIndex }: PopUpProps) => {
  const [currentIndex, setCurrentIndex] = useState(startIndex);

  // Set index when startIndex changes (when clicking a different card)
  useEffect(() => {
    setCurrentIndex(startIndex);
  }, [startIndex]);

  const handlePrev = useCallback(() => {
    setCurrentIndex((prev) => (prev === 0 ? items.length - 1 : prev - 1));
  }, [items.length]);

  const handleNext = useCallback(() => {
    setCurrentIndex((prev) => (prev === items.length - 1 ? 0 : prev + 1));
  }, [items.length]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isOpen) return;
      if (e.key === 'ArrowLeft') handlePrev();
      if (e.key === 'ArrowRight') handleNext();
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, handlePrev, handleNext]);

  if (items.length === 0) return null;

  const currentItem = items[currentIndex];

  return (
    <div className="fixed top-0 left-0 z-[9999]">
      <LayoutComponents.PopUpWrapper isOpen={isOpen} close={close} className="h-full w-full">
        <div className="relative flex h-[90vh] w-[90vw] max-w-[1400px] items-center justify-center">
          <button
            onClick={handlePrev}
            className="absolute left-0 z-20 rounded-full p-3 text-white transition-colors hover:bg-white/10 lg:left-4"
            aria-label="Previous image"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="32"
              height="32"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <polyline points="15 18 9 12 15 6"></polyline>
            </svg>
          </button>

          <div className="relative flex h-full w-full items-center justify-center">
            <div className="relative h-full w-full">
              <Image
                src={currentItem.image}
                alt={`${currentItem.title} - Image ${currentIndex + 1}`}
                fill
                className="object-contain"
                priority
              />

              <div className="absolute right-0 bottom-0 left-0 bg-[#0004] px-2 py-2 text-white lg:px-4">
                <div className="mx-auto max-w-xl">
                  <h2 className="mb-1 text-[1.4rem] font-bold">{currentItem.title}</h2>
                  <p className="mb-1 text-[1.4rem] text-white/80">{currentItem.architectureType}</p>
                  <p className="text-[1.2rem] leading-relaxed text-white/70 italic">
                    {currentItem.description}
                  </p>
                </div>
              </div>
            </div>
          </div>

          <button
            onClick={handleNext}
            className="lg:ight-4 absolute right-0 z-20 rounded-full p-3 text-white transition-colors hover:bg-white/10"
            aria-label="Next image"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="32"
              height="32"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <polyline points="9 18 15 12 9 6"></polyline>
            </svg>
          </button>

          <div className="absolute top-[1.5rem] right-0 rounded-full bg-[#0004] px-3 py-1 text-sm text-white lg:top-4 lg:right-4">
            {currentIndex + 1} / {items.length}
          </div>

          <button
            onClick={close}
            className="absolute top-0 left-0 z-20 rounded-full p-2 text-white transition-colors hover:bg-white/10 lg:top-4 lg:left-4"
            aria-label="Close"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </button>
        </div>
      </LayoutComponents.PopUpWrapper>
    </div>
  );
};

export default PopUp;
