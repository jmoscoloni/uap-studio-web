'use client';
import { Button } from '@/components';
import { useTranslations } from 'next-intl';

const Intro = () => {
  const t = useTranslations();
  return (
    <section id="about-intro" className="relative w-full px-2 pb-5 lg:px-7">
      <div className="mx-auto flex max-w-3xl flex-col items-center gap-4 py-10 text-center">
        {t('about.intro')
          .split('\n\n')
          .map((para, idx) => {
            if (idx === 0) {
              // color the leading "Uap" word
              const match = para.match(/^Uap(\b[\s\S]*)?/);
              if (match) {
                const rest = para.replace(/^Uap/, '');
                return (
                  <p key={idx} className={`p-lg text-balance ${idx > 0 ? 'mt-2' : ''}`}>
                    <span className="font-bold text-[#FB2721]">Uap</span>
                    {rest}
                  </p>
                );
              }
            }
            return (
              <p key={idx} className={`p-lg text-balance ${idx > 0 ? 'mt-1' : ''}`}>
                {para}
              </p>
            );
          })}

        <div className="flex items-center justify-center gap-2">
          <Button href="https://www.instagram.com/uap.studio/">
            <div className="h-4 w-4">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="18"
                height="18"
                fill="none"
                viewBox="0 0 14 14"
              >
                <path
                  fill="#000"
                  d="M6.508 3.17a3.33 3.33 0 0 0-3.336 3.337 3.33 3.33 0 0 0 3.336 3.336 3.33 3.33 0 0 0 3.336-3.336A3.33 3.33 0 0 0 6.508 3.17m0 5.506a2.173 2.173 0 0 1-2.169-2.17 2.17 2.17 0 0 1 2.169-2.169 2.17 2.17 0 0 1 2.169 2.17c0 1.196-.976 2.169-2.169 2.169m4.25-5.642a.776.776 0 0 1-.778.778.778.778 0 1 1 .778-.778m2.21.79c-.05-1.043-.288-1.966-1.052-2.727-.76-.76-1.683-.999-2.726-1.051-1.074-.061-4.293-.061-5.367 0-1.04.05-1.963.287-2.726 1.048-.764.76-.999 1.684-1.051 2.727-.061 1.074-.061 4.294 0 5.369.05 1.042.287 1.966 1.05 2.726.764.761 1.684 1 2.727 1.051 1.074.061 4.293.061 5.367 0 1.043-.049 1.966-.287 2.726-1.05.761-.761 1-1.685 1.051-2.727.061-1.075.061-4.292 0-5.366m-1.388 6.518a2.2 2.2 0 0 1-1.237 1.237c-.856.34-2.889.262-3.835.262s-2.981.075-3.835-.262a2.2 2.2 0 0 1-1.237-1.237c-.34-.856-.261-2.889-.261-3.835S1.1 3.524 1.436 2.67a2.2 2.2 0 0 1 1.237-1.237c.856-.34 2.889-.262 3.835-.262s2.981-.075 3.835.262A2.2 2.2 0 0 1 11.58 2.67c.34.856.261 2.889.261 3.836 0 .946.078 2.982-.261 3.835"
                ></path>
              </svg>
            </div>
          </Button>
          <Button href="https://www.linkedin.com/in/uap-studio-b913143b0/">
            <div className="h-4 w-4">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="none"
                viewBox="0 0 10 10"
              >
                <path
                  fill="#000"
                  d="M2.227 9.951H.164V3.307h2.063zm-1.032-7.55A1.205 1.205 0 0 1 .35.35a1.195 1.195 0 0 1 2.04.845c0 .66-.536 1.206-1.195 1.206m8.754 7.55H7.89V6.717c0-.77-.015-1.76-1.072-1.76-1.073 0-1.237.838-1.237 1.704v3.29H3.52V3.307h1.978v.907h.03c.275-.522.948-1.073 1.951-1.073 2.088 0 2.472 1.375 2.472 3.16v3.65z"
                ></path>
              </svg>
            </div>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default Intro;
