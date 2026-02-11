'use client';

import { createPortal } from 'react-dom';
import cn from 'classnames';
import { useEffect, useRef, useState } from 'react';
import useKeypress from '@/utils/hooks/useKeyPress';
import { useLenis } from 'lenis/react';
import { useStore } from '@/store';

const PopUpWrapper = ({ isOpen, close, children, className }) => {
  const rootRef = useRef(null);
  const [render, setRender] = useState(false);
  const lenis = useLenis();
  const setIsPopUpOpen = useStore((state) => state.setIsPopUpOpen);

  useEffect(() => {
    if (isOpen && lenis) {
      lenis.stop();
    } else if (lenis) {
      lenis.start();
    }
  }, [isOpen, lenis]);

  useEffect(() => {
    setRender(true);
  }, []);

  useKeypress('Escape', () => {
    if (isOpen) {
      close();
    }
  });

  useEffect(() => {
    if (isOpen) {
      setIsPopUpOpen(true);
    } else {
      setIsPopUpOpen(false);
    }
  }, [isOpen, setIsPopUpOpen]);

  const handleContentClick = (e) => {
    e.stopPropagation();
  };

  if (!render) return <></>;

  return createPortal(
    <div
      ref={rootRef}
      className={cn(
        'fixed top-0 left-0 z-10000 flex h-screen max-h-full w-full items-center overflow-auto bg-black/50 backdrop-blur-sm duration-50',
        className,
        {
          'pointer-events-none opacity-0': !isOpen
        }
      )}
    >
      <div onClick={close} className="overlay absolute top-0 left-0 h-full w-full"></div>
      <div
        onClick={handleContentClick}
        className={cn('content ease-out-back mx-auto max-h-full w-max duration-50', {
          'pointer-events-none translate-y-50 opacity-0': !isOpen
        })}
      >
        {children}
      </div>
    </div>,
    document.body
  );
};
export default PopUpWrapper;
