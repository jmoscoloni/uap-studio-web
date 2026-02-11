import { defineRouting } from 'next-intl/routing';

export const defaultLocale = 'en';
export const locales = ['en'];
export const pathnames = {
  '/': '/',
  '/about': {
    en: '/about',
    es: '/acerca de'
  },
  '/contact': {
    en: '/contact',
    es: '/contacto'
  },
  '/archive': {
    en: '/archive',
    es: '/archivos'
  },
  '/work': {
    en: '/work',
    es: '/trabajos'
  },
  '/work/[slug]': {
    en: '/work/[slug]',
    es: '/trabajos/[slug]'
  }
};

export const routing = defineRouting({
  locales,
  defaultLocale,
  pathnames,
  localeDetection: false,
  localePrefix: 'as-needed'
});
