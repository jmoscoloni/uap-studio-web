'use client';

import { useTranslatedPaths } from '@/utils/hooks/useTranslatedPaths';
import { ReactNode } from 'react';

interface LocalizedPathsProviderProps {
  paths: { [locale: string]: string } | null;
  children: ReactNode;
}

/**
 * Client component that sets localized paths for the LangPicker
 * This allows server components (pages) to provide translated URLs
 * without becoming client components themselves
 */
const LocalizedPathsProvider = ({ paths, children }: LocalizedPathsProviderProps) => {
  useTranslatedPaths(paths);

  return <>{children}</>;
};

export default LocalizedPathsProvider;
