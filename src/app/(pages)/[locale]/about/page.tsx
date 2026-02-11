import { Metadata } from 'next';
import getMetadata from '@/utils/functions/getMetadata';
import { Button } from '@/components';
import { getPathname } from '@/i18n/navigation';
import { LocalePageProps } from '@/types/pages';
import { AboutComponents } from '@/components';

export default async function Page({ params }: LocalePageProps) {
  const { locale } = await params;
  const currentLocale = locale as 'en' | 'es';

  return (
    <main>
      <AboutComponents.AboutHero />
      <AboutComponents.Intro />
      <AboutComponents.CV />
    </main>
  );
}

export const metadata: Metadata = getMetadata({
  title: 'About'
});
