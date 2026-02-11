'use client';
import cn from 'classnames';
import { footerNavUrls, SHOW_ARCHIVE } from '@/constants';
import { LayoutComponents } from '@/components';
import { Link, usePathname } from '@/i18n/navigation';
import { useTranslations } from 'next-intl';

interface FooterProps {
  className?: string;
}

const Footer = ({ className }: FooterProps) => {
  const pathname = usePathname();
  const t = useTranslations();

  return (
    <footer className={cn('relative w-full px-2 pt-3 pb-4 lg:px-4 lg:pt-4 lg:pb-5', className)}>
      <div className="flex flex-col items-center justify-between gap-1 pb-2 text-black lg:flex-row lg:items-center lg:gap-0 lg:pb-3">
        <nav className="hidden w-full gap-10 lg:flex lg:w-auto">
          <ul className="flex flex-row flex-wrap items-center justify-start gap-3">
            {footerNavUrls
              .filter((item) => SHOW_ARCHIVE || item.url !== '/archive')
              .map((item, index) => (
                <li
                  key={index}
                  className={cn('group/footerNav text-[1rem] lg:text-2xl', {
                    'pointer-events-none opacity-70':
                      item.url === '/'
                        ? pathname === '/'
                        : pathname.includes(item.url.replace('/', ''))
                  })}
                >
                  <Link
                    href={item.url as '/' | '/work' | '/archive' | '/about'}
                    className={cn(
                      'relative inline-block transition-colors duration-200 hover:text-[#FB2721]'
                    )}
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
          </ul>
        </nav>
        <div className="mt-2 flex w-full items-center justify-end lg:mt-0 lg:w-auto lg:justify-start">
          <p className="text-right text-[1.125rem] whitespace-nowrap lg:text-left lg:text-2xl">
            <span className="lg:hidden">
              © 2026 UAP Std. -{' '}
              <Link
                href={'/legal'}
                className="relative inline-block transition-colors duration-200 hover:text-[#FB2721]"
              >
                Legal &amp; Priv.
              </Link>
            </span>
            <span className="hidden lg:inline">
              © 2026 UAP Studio -{' '}
              <Link
                href={'/legal'}
                className="relative inline-block transition-colors duration-200 hover:text-[#FB2721]"
              >
                legal & privacy
              </Link>
            </span>
          </p>
        </div>
      </div>
      <div className="h-px w-full bg-black"></div>
      <div className="flex flex-col justify-between gap-2 pt-2 text-black lg:flex-row lg:gap-3 lg:pt-3">
        <div className="flex w-full items-center justify-between lg:w-auto">
          <p className="text-[1.125rem] lg:text-2xl">
            <span className="opacity-70 lg:mr-1">{t('footer.tel')}</span>
            <a
              href="https://wa.me/5491168497121?text=Hello%2C%20I%27m%20contacting%20you%20regarding%20architectural%20visualization%20services.%20I%27d%20like%20to%20know%20more%20about%20your%20work%20and%20availability."
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-[#FB2721]"
            >
              +54 9 11 6849-7121
            </a>
          </p>
          <p className="text-right text-[1.125rem] lg:hidden">
            <span className="opacity-70">{t('footer.email')}</span>
            <a href="mailto:info@uap-studio.com" className="hover:text-[#FB2721]">
              info@uap-studio.com
            </a>
          </p>
        </div>
        <p className="hidden text-[1rem] lg:block lg:text-2xl">
          <span className="opacity-70 lg:mr-1">{t('footer.email')}</span>
          <a href="mailto:info@uap-studio.com" className="hover:text-[#FB2721]">
            info@uap-studio.com
          </a>
        </p>

        <p className="hidden text-[1rem] lg:block lg:text-2xl">
          <span className="opacity-70 lg:mr-1">{t('footer.offices')}</span>
          <a
            href="https://www.google.com/maps/search/?api=1&query=Buenos+Aires+Argentina"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-[#FB2721]"
          >
            Buenos Aires, Argentina
          </a>{' '}
          -{' '}
          <a
            href="https://www.google.com/maps/search/?api=1&query=Alicante+Spain"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-[#FB2721]"
          >
            Alicante, Spain
          </a>
        </p>
      </div>
    </footer>
  );
};

export default Footer;
