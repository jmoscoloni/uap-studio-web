import { MetadataRoute } from 'next';
import { locales, defaultLocale, pathnames } from '@/i18n/routing';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = process.env.NEXT_PUBLIC_ORIGIN || 'https://localhost:3000';

  // Remove trailing slash if present
  const cleanBaseUrl = baseUrl.endsWith('/') ? baseUrl.slice(0, -1) : baseUrl;

  const routes: MetadataRoute.Sitemap = [];

  // Generate URLs for each pathname and locale
  Object.entries(pathnames).forEach(([pathname, localizedPaths]) => {
    locales.forEach((locale) => {
      let localizedPath: string;

      if (typeof localizedPaths === 'string') {
        // Simple pathname (same for all locales)
        localizedPath = localizedPaths;
      } else {
        // Localized pathname object
        localizedPath = localizedPaths[locale as keyof typeof localizedPaths] || pathname;
      }

      // Construct the URL
      let url: string;
      if (locale === defaultLocale) {
        // Default locale doesn't need prefix
        url = `${cleanBaseUrl}${localizedPath}`;
      } else {
        // Non-default locales get the locale prefix
        url = `${cleanBaseUrl}/${locale}${localizedPath}`;
      }

      routes.push({
        url,
        lastModified: new Date()
      });
    });
  });

  return routes;
}
