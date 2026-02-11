import { removeHTML } from '../commons';
import { Metadata } from 'next';

interface MetadataDefaults {
  title: string;
  description: {
    en: string;
    es: string;
  };
  url: string;
  siteName: string;
  imageOG: string;
  imageX: string;
  locale: string;
}

interface RobotsConfig {
  index?: boolean;
  follow?: boolean;
}

interface HrefLangs {
  [locale: string]: string;
}

interface MetadataInput {
  title?: string;
  description?: string;
  url?: string;
  image?: string;
  locale?: string;
  hreflangs?: HrefLangs;
  canonical?: string;
  robots?: RobotsConfig;
}

export const defaults: MetadataDefaults = {
  title: 'UAP Studio',
  description: {
    en: '',
    es: ''
  },
  url: process.env.NEXT_PUBLIC_ORIGIN?.endsWith('/')
    ? process.env.NEXT_PUBLIC_ORIGIN.slice(0, -1)
    : process.env.NEXT_PUBLIC_ORIGIN || 'https://localhost:3000',
  siteName: 'UAP ®',
  imageOG: '/images/share.gif',
  imageX: '/images/share.jpg',
  locale: 'en'
};

/*
    @param data {title, description, url, image, locale, hreflangs, canonical, robots}
*/
export default function getMetadata(data: MetadataInput): Metadata {
  const locale = data?.locale ? data?.locale : defaults.locale;
  const title = removeHTML(`${data.title || defaults.title} — ${defaults.siteName}`);
  const description =
    removeHTML(data.description || '') ||
    defaults.description[locale as keyof typeof defaults.description];
  const imagesOG = [{ url: data.image || `${defaults.url}${defaults.imageOG}` }];
  const imagesX = [{ url: data.image || `${defaults.url}${defaults.imageX}` }];

  return {
    metadataBase: new URL(defaults.url),
    title,
    description,
    alternates: {
      canonical: data.canonical || data.url,
      languages: data.hreflangs
    },
    openGraph: {
      title,
      description,
      images: imagesOG,
      url: data.url,
      siteName: defaults.siteName,
      locale,
      type: 'website'
    },
    twitter: {
      title,
      description,
      images: imagesX,
      card: 'summary_large_image'
    },
    robots: {
      index: data.robots?.index ?? true,
      follow: data.robots?.follow ?? true
    }
  };
}
