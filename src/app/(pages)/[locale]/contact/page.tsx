import { Metadata } from 'next';
import getMetadata from '@/utils/functions/getMetadata';
import { getPathname } from '@/i18n/navigation';
import { LocalePageProps } from '@/types/pages';
import { ContactComponents } from '@/components';

export default async function Page({ params }: LocalePageProps) {
  const { locale } = await params;
  const currentLocale = locale as 'en' | 'es';

  return (
    <main>
      <ContactComponents.ContactHero />
    </main>
  );
}

export const metadata: Metadata = getMetadata({
  title: 'About'
});
