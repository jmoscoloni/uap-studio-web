import { Metadata } from 'next';
import getMetadata from '@/utils/functions/getMetadata';
import { ArchiveComponents, Button, WorkComponents } from '@/components';
import { getPathname } from '@/i18n/navigation';
import { LocalePageProps } from '@/types/pages';

export default async function TestIndexPage({ params }: LocalePageProps) {
  const { locale } = await params;
  const currentLocale = locale as 'en' | 'es';

  return (
    <main>
      <ArchiveComponents.OverviewGrid />
    </main>
  );
}

export const metadata: Metadata = getMetadata({
  title: 'Test Dynamic URLs'
});
