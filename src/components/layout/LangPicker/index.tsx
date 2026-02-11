'use client';

import { useState, useRef } from 'react';
import { useLocale, useTranslations } from 'next-intl';
import { usePathname, getPathname } from '@/i18n/navigation';
import { locales } from '@/i18n/routing';
import { useStore } from '@/store';
import useClickOutside from '@/utils/hooks/useClickOutside';
import cn from 'classnames';
// import s from './index.module.css';

interface LangPickerProps {
  className?: string;
  header?: boolean;
  footer?: boolean;
}

const LangPicker = ({ className, header, footer }: LangPickerProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const currentLocale = useLocale();
  const t = useTranslations('languages');
  const pathname = usePathname();
  const { translatedPaths } = useStore();

  const closeDropdown = () => setIsOpen(false);

  useClickOutside(dropdownRef, closeDropdown);

  const handleLanguageChange = () => {
    setIsOpen(false);
  };

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  // Generate the translated URL for each locale
  const getTranslatedHref = (locale: string) => {
    // First, check if we have a translated path from the store (for dynamic URLs)
    if (translatedPaths[locale]) {
      return translatedPaths[locale];
    }

    // Fallback for static URLs - simple locale prefix approach
    // getPathname can only handle specific pathname patterns from routing config
    if (locale === 'en') {
      return pathname;
    } else {
      return `/${locale}${pathname}`;
    }
  };

  return (
    <div ref={dropdownRef} className={cn('relative', className)}>
      <button
        onClick={toggleDropdown}
        className={cn(
          'p-lg text-white-middle flex cursor-pointer items-center justify-between gap-x-[.5rem] rounded-md py-1 font-normal!',
          { 'lg:flex-row-reverse': footer }
        )}
        aria-haspopup="listbox"
        aria-expanded={isOpen}
        type="button"
      >
        <span className="relative block">
          <span className="inline-block">{t(currentLocale)}</span>
          <span className={cn('')}></span>
        </span>
        <span
          className={cn('block rotate-90 lg:rotate-0', { 'rotate-0! lg:-rotate-180!': footer })}
        >
          <svg
            className={cn('roate-90 transition-all duration-300', {
              'rotate-y-180 opacity-30': isOpen
            })}
            xmlns="http://www.w3.org/2000/svg"
            width="7"
            height="10"
            fill="none"
            viewBox="0 0 7 10"
          >
            <path
              stroke={footer ? '#FFFFFF' : '#1C0101'}
              strokeWidth="1"
              d="m.707 8.707 4-4-4-4"
            ></path>
          </svg>
        </span>
      </button>

      <div
        className={cn(
          'pointer-events-none absolute top-full left-0 z-20 w-full opacity-0 transition-all duration-300 lg:top-0 lg:left-[130%]',
          {
            'pointer-events-auto! opacity-100!': isOpen,
            'top-0! left-full! lg:top-0! lg:right-[300%]! lg:left-auto!': footer
          }
        )}
      >
        <ul
          role="listbox"
          className={cn('flex flex-col lg:flex-row', {
            'flex-col! py-[.5rem]': header,
            'flex-row!': footer
          })}
        >
          {locales.map((locale) => {
            const isSelected = locale === currentLocale;
            return (
              <li key={locale} role="option" aria-selected={isSelected} className={cn('relative')}>
                {isSelected ? (
                  <div
                    className={cn(
                      'p-lg text-white-middle relative w-full cursor-default py-1 text-left font-normal! opacity-30 lg:px-1',
                      { 'px-2! py-1!': footer }
                    )}
                  >
                    {t(locale)}
                  </div>
                ) : (
                  <a
                    href={getTranslatedHref(locale)}
                    onClick={handleLanguageChange}
                    className={cn(
                      'p-lg text-white-middle relative block w-full py-1 text-left font-normal! lg:px-1',
                      { 'px-2! py-1!': footer }
                    )}
                    hrefLang={locale}
                  >
                    <span className="relative block">
                      <span className="">{t(locale)}</span>
                    </span>
                  </a>
                )}
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
};

export default LangPicker;
