'use client';

import { LayoutComponents, Button, ButtonComponents } from '@/components';
import { useTranslations } from 'next-intl';
import { useEffect } from 'react';
import { sendSlackMessage } from '@/actions/slack';

interface ErrorPageProps {
  error: Error & { digest?: string };
  reset: () => void;
}

const Error = ({ error, reset }: ErrorPageProps) => {
  const t = useTranslations('errorPages.error');

  useEffect(() => {
    const getDeviceInfo = () => {
      if (typeof window === 'undefined') return 'Unknown';

      const ua = window.navigator.userAgent;
      const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(ua);
      const isTablet =
        /iPad|Android(?=.*Tablet)|(?=.*\bAndroid\b)(?=.*\bMobile\b(?!.*\bMobile\b.*\bSafari\b))/i.test(
          ua
        );

      if (isTablet) return 'Tablet';
      if (isMobile) return 'Mobile';
      return 'Desktop';
    };

    const getOSInfo = () => {
      if (typeof window === 'undefined') return 'Unknown';

      const ua = window.navigator.userAgent;
      if (ua.includes('Windows')) return 'Windows';
      if (ua.includes('Mac OS')) return 'macOS';
      if (ua.includes('Linux')) return 'Linux';
      if (ua.includes('Android')) return 'Android';
      if (ua.includes('iOS') || ua.includes('iPhone') || ua.includes('iPad')) return 'iOS';
      return 'Unknown';
    };

    const errorDetails = {
      message: error.message,
      url: typeof window !== 'undefined' ? window.location.href : 'Unknown',
      userAgent: typeof window !== 'undefined' ? window.navigator.userAgent : 'Unknown',
      timestamp: new Date().toISOString(),
      screen:
        typeof window !== 'undefined'
          ? {
              width: window.screen.width,
              height: window.screen.height
            }
          : null,
      viewport:
        typeof window !== 'undefined'
          ? {
              width: window.innerWidth,
              height: window.innerHeight,
              scrollX: window.scrollX,
              scrollY: window.scrollY
            }
          : null,
      device: {
        type: getDeviceInfo(),
        os: getOSInfo(),
        language: typeof window !== 'undefined' ? window.navigator.language : 'Unknown',
        timezone: Intl.DateTimeFormat().resolvedOptions().timeZone
      },
      performance: {
        connectionType:
          typeof window !== 'undefined' && 'connection' in window.navigator
            ? (window.navigator as any).connection?.effectiveType || 'Unknown'
            : 'Unknown'
      },
      document:
        typeof document !== 'undefined'
          ? {
              title: document.title,
              referrer: document.referrer || 'Direct'
            }
          : null
    };

    console.error('Full error object:', error);
    console.error('Detailed error context:', errorDetails);
    sendSlackMessage(JSON.stringify(errorDetails, null, 2));
  }, [error]);

  return (
    <LayoutComponents.ErrorPage title="500" description={t('description')}>
      <Button onClick={() => reset()}>
        <ButtonComponents.LoaderBtn> {t('tryAgain')}</ButtonComponents.LoaderBtn>
      </Button>
      <Button href="/">
        <ButtonComponents.LoaderBtn> {t('goHome')}</ButtonComponents.LoaderBtn>
      </Button>
    </LayoutComponents.ErrorPage>
  );
};

export default Error;
