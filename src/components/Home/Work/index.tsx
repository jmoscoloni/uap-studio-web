'use client';
import Card from '@/components/common/Card';
import { Button, ButtonComponents } from '@/components';
import { useTranslations } from 'next-intl';

const Work = () => {
  const t = useTranslations();

  return (
    <section className="relative w-full px-2 pb-10 lg:px-4">
      <div className="flex flex-col items-center gap-2">
        {/* Work section title removed per request */}
        <div className="grid grid-cols-1 gap-2 lg:grid-cols-2">
          <Card
            big
            image="/images/example.jpeg"
            paragraph="1/2 series of computer-generated visuals based on shots captured by renowned photographers and reinterpreted through emerging digital tools."
          />
        </div>
        <div className="flex w-full justify-end">
          <Button href={'/work'}>
            <ButtonComponents.Text text={t('home.work.button')} />
          </Button>
        </div>
      </div>
    </section>
  );
};
export default Work;
