import { Metadata } from 'next';
import getMetadata from '@/utils/functions/getMetadata';
import { Button, WorkComponents } from '@/components';
import { getPathname } from '@/i18n/navigation';
import { LocalePageProps } from '@/types/pages';

export default async function TestIndexPage({ params }: LocalePageProps) {
  const { locale } = await params;
  const currentLocale = locale as 'en' | 'es';

  // // Generate the correct URL using i18n configuration
  // const exampleArticleUrl =
  //   currentLocale === 'en'
  //     ? getPathname({
  //         href: { pathname: '/test/[uid]', params: { uid: 'example-article' } },
  //         locale: 'en'
  //       })
  //     : getPathname({
  //         href: { pathname: '/test/[uid]', params: { uid: 'articulo-ejemplo' } },
  //         locale: 'es'
  //       });

  return (
    <main>
      <WorkComponents.WorkHero />
      <WorkComponents.Overview />
    </main>
  );
}

export const metadata: Metadata = getMetadata({
  title: 'Test Dynamic URLs'
});
