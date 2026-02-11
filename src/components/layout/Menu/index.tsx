'use client';
import cn from 'classnames';
import s from './index.module.css';
import { useStore } from '@/store';
import { LayoutComponents } from '@/components';
import { Link } from '@/i18n/navigation';
import { usePathname } from '@/i18n/navigation';
import { NavUrls, SHOW_ARCHIVE } from '@/constants';
import { useTranslations, useLocale } from 'next-intl';

const Menu = () => {
  const { setIsMenuOpen, isMenuOpen } = useStore();
  const pathname = usePathname();
  const t = useTranslations();
  const locale = useLocale() as 'en' | 'es';

  return (
    <div
      className={cn(
        'fixed top-0 left-0 z-5555 h-full w-full -translate-x-full bg-[#F0F0EB99] backdrop-blur-sm duration-300',
        {
          'translate-x-0': isMenuOpen
        }
      )}
    >
      <div className={cn('flex h-full w-full items-center justify-center', s.menu)}>
        <nav>
          <ul className="flex w-full flex-col items-center">
            {NavUrls[locale]
              .filter((item) => SHOW_ARCHIVE || item.url !== '/archive')
              .map((item, index) => {
                const isMainSmall =
                  item.url === '/work' || item.url === '/about' || item.url === '/contact';
                const sizeClass = isMainSmall ? 'text-2 lg:text-7' : 'text-3 lg:text-9';
                return (
                  <li
                    key={index}
                    onClick={() => setIsMenuOpen(false)}
                    className={cn(
                      `${sizeClass} group/liNav relative translate-y-2 py-1 text-center uppercase opacity-0 duration-500 lg:py-0`,
                      {
                        [item.classes]: isMenuOpen,
                        'pointer-events-none opacity-30': pathname.includes(
                          item.url.replace('/', '')
                        )
                      }
                    )}
                  >
                    <Link
                      href={item.url as '/work' | '/archive' | '/about' | '/'}
                      className={cn(
                        'relative inline-block no-underline hover:text-[#FB2721]',
                        s.linkShrink
                      )}
                    >
                      {t(item.name)}
                    </Link>
                  </li>
                );
              })}
          </ul>
        </nav>
        {/* Language picker removed per request */}
      </div>
    </div>
  );
};
export default Menu;
