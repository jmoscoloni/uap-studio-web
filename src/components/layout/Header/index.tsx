'use client';
import { useEffect, useState, useRef } from 'react';
import cn from 'classnames';
import s from './index.module.css';
import { useTranslations } from 'next-intl';
import { Button, ButtonComponents } from '@/components';
import throttle from 'lodash.throttle';
import { useIsomorphicLayoutEffect } from '@/helpers/isomorphicEffect';
import Image from 'next/image';
import { useStore } from '@/store';
import { Link } from '@/i18n/navigation';
import { usePathname } from 'next/navigation';

interface HeaderProps {
  className?: string;
}

const Header = ({ className }: HeaderProps) => {
  const t = useTranslations();
  const [hidden, setHidden] = useState(false);
  const lastScroll = useRef(0);
  const { setIsMenuOpen, isMenuOpen } = useStore();
  const pathname = usePathname();
  const isWorkDetail = !!pathname && pathname.includes('/work/') && !pathname.endsWith('/work');

  useIsomorphicLayoutEffect(() => {
    // If we're on a work detail page, keep the header hidden
    if (isWorkDetail) {
      setHidden(true);
      return;
    }

    const scroll = throttle(function () {
      const y = window?.scrollY ?? 0;

      if (!hidden && y > lastScroll.current) {
        setHidden(true);
      } else if (hidden && y < lastScroll.current) {
        setHidden(false);
      }

      lastScroll.current = y;
    }, 100);

    window.addEventListener('scroll', scroll);

    return () => {
      window.removeEventListener('scroll', scroll);
    };
  }, [hidden, isWorkDetail]);

  // Smoothly reveal header when the site finishes loading (loader signals with event)
  const [siteReady, setSiteReady] = useState<boolean>(() => {
    if (typeof document !== 'undefined') return document.body.classList.contains('site-ready');
    return false;
  });

  useEffect(() => {
    const handler = () => setSiteReady(true);
    document.addEventListener('site:ready', handler);
    return () => document.removeEventListener('site:ready', handler);
  }, []);

  return (
    <header
      className={cn('fixed top-0 z-8888 w-full bg-white shadow-md', className)}
      style={{
        transform: hidden ? 'translateY(-100%)' : 'translateY(0)',
        transition: 'transform 300ms ease'
      }}
    >
      <div className={cn('flex items-center justify-between px-2 py-1 lg:px-4 lg:py-[1.6rem]')}>
        <Link href={'/'} className="group/logo cursor-pointer duration-300">
          <Image
            src={'/Images/uap-logo.png'}
            width={78}
            height={36}
            alt="uap"
            className="w-4 scale-95 duration-300 group-hover/logo:scale-95 md:w-5"
          />
        </Link>
        <Button onClick={() => setIsMenuOpen(!isMenuOpen)} className="flex h-full items-center">
          <ButtonComponents.MenuBtn isMenuOpen={isMenuOpen} />
        </Button>
      </div>
    </header>
  );
};

export default Header;
