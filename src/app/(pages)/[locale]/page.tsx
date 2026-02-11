import { Metadata } from 'next';
import getMetadata from '@/utils/functions/getMetadata';
import { Button, WorkComponents } from '@/components';
import { getPathname } from '@/i18n/navigation';
import { LocalePageProps } from '@/types/pages';
import { HomeComponents } from '@/components';

export default async function Page({ params }: LocalePageProps) {
  const { locale } = await params;
  const currentLocale = locale as 'en' | 'es';

  return (
    <main>
      <HomeComponents.HomeHero />
      <div id="work-section">
        <WorkComponents.Overview />
      </div>
    </main>
  );
}

export const metadata: Metadata = getMetadata({
  title: 'Home'
});
