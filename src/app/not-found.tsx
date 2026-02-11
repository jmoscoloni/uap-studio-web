import { useTranslations } from 'next-intl';
import { LayoutComponents, Button, ButtonComponents } from '@/components';

export default function NotFound() {
  const t = useTranslations('errorPages.notFound');

  return (
    <LayoutComponents.ErrorPage title="404" description={t('description')}>
      <Button href="/">
        <ButtonComponents.LoaderBtn> {t('goHome')}</ButtonComponents.LoaderBtn>
      </Button>
    </LayoutComponents.ErrorPage>
  );
}
