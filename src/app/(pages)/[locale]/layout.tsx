import cn from 'classnames';
import Loader from '@/components/layout/Loader';
import Header from '@/components/layout/Header';
import Menu from '@/components/layout/Menu';
import StripQueryParams from '@/components/layout/StripQueryParams';
import SmoothScroll from '@/components/layout/SmoothScroll';
import Footer from '@/components/layout/Footer';
import ScrollTrigger from '@/components/layout/ScrollTrigger';
import { NextIntlClientProvider } from 'next-intl';
import { locales } from '@/i18n/routing';
import { GoogleAnalytics, GoogleTagManager } from '@next/third-parties/google';
import { ReactNode } from 'react';
import { Metadata } from 'next';
import localFont from 'next/font/local';

const IBMMonoPlex = localFont({
  src: [
    {
      path: '../../../../public/fonts/IBMPlexMono-Bold.woff2',
      weight: '700',
      style: 'normal'
    },
    {
      path: '../../../../public/fonts/IBMPlexMono-SemiBold.woff2',
      weight: '600',
      style: 'normal'
    },
    {
      path: '../../../../public/fonts/IBMPlexMono-Medium.woff2',
      weight: '500',
      style: 'normal'
    },
    {
      path: '../../../../public/fonts/IBMPlexMono-Italic.woff2',
      weight: '400',
      style: 'normal'
    },
    {
      path: '../../../../public/fonts/IBMPlexMono-Italic.woff2',
      weight: '400',
      style: 'italic'
    },
    {
      path: '../../../../public/fonts/IBMPlexMono-Regular.woff2',
      weight: '400',
      style: 'normal'
    },
    {
      path: '../../../../public/fonts/IBMPlexMono-Light.woff2',
      weight: '300',
      style: 'normal'
    }
  ],
  variable: '--font-ibm',
  preload: false
});

const GTM_ID = process.env.NEXT_PUBLIC_GTM_ID;
const GA_ID = process.env.NEXT_PUBLIC_GA_ID;

interface LayoutProps {
  children: ReactNode;
  params: Promise<{ locale: string }>;
}

export default async function Layout({ children, params }: LayoutProps) {
  const { locale } = await params;

  return (
    <>
      {GTM_ID && <GoogleTagManager gtmId={GTM_ID} />}

      <div lang={locale} className={cn(IBMMonoPlex.variable)}>
        <NextIntlClientProvider>
          <StripQueryParams />
          <Loader />
          <Header />
          <Menu />

          <SmoothScroll>{children}</SmoothScroll>

          <Footer />
          <ScrollTrigger />
        </NextIntlClientProvider>
      </div>

      {GA_ID && <GoogleAnalytics gaId={GA_ID} />}
    </>
  );
}

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_ORIGIN || 'http://localhost:3000')
};

export async function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}
