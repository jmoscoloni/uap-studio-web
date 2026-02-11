// Global page types for Next.js 15
// In Next.js 15, params are Promise and must be awaited

export interface BasePageProps<T = Record<string, string>> {
  params: Promise<T>;
  searchParams?: Promise<{ [key: string]: string | string[] | undefined }>;
}

// Common page prop types
export interface LocalePageProps extends BasePageProps<{ locale: string }> {}

export interface LocaleWithSlugPageProps
  extends BasePageProps<{
    locale: string;
    slug: string;
  }> {}

export interface LocaleWithUidPageProps
  extends BasePageProps<{
    locale: string;
    uid: string;
  }> {}

// You can extend these for specific pages as needed
// Example: export interface BlogPageProps extends BasePageProps<{ locale: string; category: string; slug: string }> {}
