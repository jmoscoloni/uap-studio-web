import { useEffect } from 'react';
import { useStore } from '@/store';

interface TranslatedPaths {
  [locale: string]: string;
}

/**
 * Hook to set translated paths for dynamic URLs that come from CMS
 * @param paths Object with locale as key and translated URL as value
 * @example
 * useTranslatedPaths({
 *   en: '/test/some-slug',
 *   es: '/test/algun-slug'
 * });
 */
export const useTranslatedPaths = (paths: TranslatedPaths | null) => {
  const { setTranslatedPaths, clearTranslatedPaths } = useStore();

  useEffect(() => {
    if (paths) {
      setTranslatedPaths(paths);
    } else {
      clearTranslatedPaths();
    }

    // Clean up when component unmounts
    return () => {
      clearTranslatedPaths();
    };
  }, [paths, setTranslatedPaths, clearTranslatedPaths]);
};

export default useTranslatedPaths;
