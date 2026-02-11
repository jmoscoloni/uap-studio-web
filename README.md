# /nk.next-starter

This project is a Next.js v15 application that implements the app routing strategy, learn more about it [here](https://nextjs.org/docs/app).

## 🚀 New Project Setup Checklist

When starting a new project with this starter, follow this checklist to customize it for your needs:

### 📝 Project Identity & Branding

- [ ] **Update project name** in `package.json`
- [ ] **Change favicon** in `src/app/favicon.ico`
- [ ] **Update default metadata** in `src/utils/functions/getMetadata.ts`:
  - [ ] Site title and description (en/es)
  - [ ] Site name and URLs
  - [ ] Open Graph images paths
- [ ] **Update README.md** with your project information
- [ ] **Change repository URLs** in `package.json`

### 🎨 Design System & Styling

- [ ] **Configure fonts** in `src/app/[locale]/layout.tsx`:
  - [ ] Import required fonts from Google Fonts or local files
  - [ ] Update font family variables
- [ ] **Update Tailwind colors** in `tailwind.config.ts`:
  - [ ] Primary, secondary, accent colors
  - [ ] Brand color palette
  - [ ] Dark mode colors (if needed)
- [ ] **Review grid system** in `src/styles/utils.scss`:
  - [ ] Adjust grid and wrapper
  - [ ] Verify responsive behavior
- [ ] **Customize Button component** in `src/components/Button/index.tsx`:
  - [ ] Update variant colors to match brand
  - [ ] Adjust sizes if needed
  - [ ] Add new variants if required
- [ ] **Use global page types** from `@/types/pages` for new pages:
  - [ ] Import appropriate types (LocalePageProps, LocaleWithUidPageProps, etc.)
  - [ ] Avoid creating local PageProps interfaces
- [ ] **Add `generateStaticParams`** for new dynamic routes:
  - [ ] Include all locale combinations
  - [ ] Pre-generate all possible parameter values
  - [ ] Ensure static generation (● SSG) in build output

### 🌍 Internationalization (i18n)

- [ ] **Configure languages** in `src/i18n/routing.ts`:
  - [ ] Add/remove supported locales
  - [ ] Set default locale
  - [ ] Add all website pages with their localized paths
- [ ] **Update translations** in `src/locales/`:
  - [ ] Add translation files for each language
  - [ ] Update existing translations in `en.json`, `es.json`, etc.
- [ ] **Configure redirects** in `src/i18n/redirects.mjs`:
  - [ ] Add all necessary redirects from previous site
  - [ ] Ensure no missing URLs to prevent 404 errors
- [ ] **Review middleware** in `src/middleware.ts`:
  - [ ] Adjust URL redirect patterns if needed

### ⚙️ Configuration & Environment

- [ ] **Environment variables**:
  - [ ] Create `.env.local` file based on `.env.sample`
  - [ ] **Configure Slack notifications**: Add `SLACK_WEBHOOK_URL_SITENAME` with your site's specific Slack webhook URL for error notifications and proper site identification

### 🧩 Components & Features

- [ ] **Remove unused components**:
  - [ ] Delete demo components
  - [ ] Clean up unused styles
- [ ] **Mock images for design implementation**:
  - [ ] Place mock images in `public/images/mock/` directory for creating pages from design
  - [ ] Remove `public/images/mock/` folder once project is integrated with CMS
- [ ] **Update global store** in `src/store/index.ts`:
  - [ ] Add application-specific state
  - [ ] Remove example state if not needed
- [ ] **Review utility functions** in `src/utils/`:
  - [ ] Add project-specific utilities
  - [ ] Remove unused functions

### 🌐 Adding New Languages

To add support for additional languages (e.g., French):

1. **Update `src/i18n/routing.ts`**:

   ```tsx
   export const locales = ['en', 'es', 'fr'];
   export const pathnames = {
     '/': '/',
     '/test': {
       en: '/test',
       es: '/test-esp',
       fr: '/test-fr'
     }
   };
   ```

2. **Create translation file**: `src/i18n/locales/fr/translation.json`

3. **Update components**: Add French labels to LangPicker translations

4. **Test thoroughly**: Verify all routes and translations work correctly

## Requirements

- **Node.js**: In order to ensure you are using Node.js version 21.7.3 you should install [nvm](https://formulae.brew.sh/formula/nvm). Once you have it ready just run `nvm install`

## Important Notes

### Next.js 15 Params Changes

In Next.js 15, `params` are now a Promise and must be awaited:

```tsx
// ❌ Old way (Next.js 14)
export default function Page({ params }: { params: { locale: string } }) {
  const locale = params.locale;
}

// ✅ New way (Next.js 15)
export default async function Page({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
}
```

This applies to both page components and `generateMetadata` functions.

### **Static Site Generation (SSG)**

The starter uses `generateStaticParams` to pre-generate all pages at build time for optimal performance:

```tsx
// Example from [locale]/layout.tsx
export async function generateStaticParams() {
  return locales.map((locale) => ({
    locale
  }));
}

// Example from [locale]/test/[uid]/page.tsx
export async function generateStaticParams() {
  const articles = Object.keys(mockArticle);
  const params = [];

  for (const locale of locales) {
    for (const uid of articles) {
      params.push({ locale, uid });
    }
  }

  return params;
}
```

**Benefits:**

- ⚡ **Faster loading**: All pages pre-generated at build time
- 🚀 **Better SEO**: Static HTML served immediately
- 💰 **Cost efficient**: No server rendering on each request
- 📊 **Predictable performance**: Consistent load times

All routes are marked with `●` (SSG) in the build output, indicating static generation.

### **Global Page Types**

Use the reusable page types from `@/types/pages` instead of creating interfaces in each page:

```tsx
// ❌ Don't repeat this in every page
interface PageProps {
  params: Promise<{ locale: string }>;
}

// ✅ Use global types
import { LocalePageProps, LocaleWithUidPageProps } from '@/types/pages';

// For pages with just locale
export default async function Page({ params }: LocalePageProps) {
  const { locale } = await params;
}

// For pages with locale + uid
export default async function Page({ params }: LocaleWithUidPageProps) {
  const { locale, uid } = await params;
}
```

Available types:

- **`LocalePageProps`**: `{ locale: string }`
- **`LocaleWithSlugPageProps`**: `{ locale: string; slug: string }`
- **`LocaleWithUidPageProps`**: `{ locale: string; uid: string }`
- **`BasePageProps<T>`**: Generic type for custom param structures

## Features

- This project uses **TypeScript** for type safety and better developer experience.
- **Prettier** for code formatting and **ESLint** for linting.
- **Tailwind CSS** for styling. (https://tailwindcss.com/docs).
- **Husky** is used for managing Git hooks to ensure code quality.
- **Next-intl** for internationalization support.
- **Zustand** for lightweight state management.
- **GSAP** with ScrollTrigger for animations.
- **Lenis** for smooth scrolling.
- **Static Site Generation (SSG)** - All pages pre-generated at build time for optimal performance.
- **Global page types** for consistent Next.js 15 params handling across all pages.

## Components

### Layout Components

#### LangPicker Component

A dropdown component for switching between available languages with support for dynamic URLs:

```tsx
import { LayoutComponents } from '@/components';

// In your header or anywhere you want the language picker
<LayoutComponents.LangPicker className="ml-4" />;
```

**Features:**

- Shows current language with a dropdown
- Automatically navigates to the same page in the selected language
- Supports both static and dynamic URLs
- Accessible with proper ARIA attributes
- Responsive design with Tailwind CSS
- Closes when clicking outside
- SEO-friendly with real `<a>` tags and `hrefLang` attributes

**Props:**

- `className`: Additional CSS classes for custom styling

#### LocalizedPathsProvider Component

A client component that sets localized paths for server-rendered pages:

```tsx
import { LayoutComponents } from '@/components';

export default async function DynamicPage({ params }) {
  // Fetch data on the server
  const content = await fetchFromCMS(params.slug);

  // Prepare translated paths
  const translatedPaths = {
    en: `/blog/${content.slug.en}`,
    es: `/blog/${content.slug.es}`
  };

  return (
    <LayoutComponents.LocalizedPathsProvider paths={translatedPaths}>
      <main>{/* Your page content */}</main>
    </LayoutComponents.LocalizedPathsProvider>
  );
}
```

**Features:**

- Keeps pages as server components for better performance
- Handles client-side localized path setup
- Automatically cleans up paths when component unmounts
- Works seamlessly with the LangPicker

**Props:**

- `paths`: Object with locale as key and translated URL as value
- `children`: Page content to wrap

#### Dynamic URLs with CMS Slugs

For pages with dynamic URLs that come from a CMS, use the `LocalizedPathsProvider`:

```tsx
// app/blog/[slug]/page.tsx (Server Component)
import { LayoutComponents } from '@/components';
import { notFound } from 'next/navigation';
import { getPathname } from '@/i18n/navigation';

import { LocaleWithSlugPageProps } from '@/types/pages';

export default async function BlogPost({ params }: LocaleWithSlugPageProps) {
  const { slug, locale } = await params;

  // Fetch data on the server
  const post = await fetchBlogPost(slug);

  if (!post) {
    notFound();
  }

  // Generate translated paths using i18n configuration
  const translatedPaths = {
    en: getPathname({
      href: { pathname: '/blog/[slug]', params: { slug: post.slug.en } },
      locale: 'en'
    }),
    es: getPathname({
      href: { pathname: '/blog/[slug]', params: { slug: post.slug.es } },
      locale: 'es'
    })
  };

  return (
    <LayoutComponents.LocalizedPathsProvider paths={translatedPaths}>
      <main>
        <h1>{post.title[locale]}</h1>
        <p>{post.content[locale]}</p>
      </main>
    </LayoutComponents.LocalizedPathsProvider>
  );
}
```

**How it works:**

1. **Server Component**: Page remains a server component for optimal performance
2. **Data Fetching**: Content is fetched on the server with translated slugs
3. **Dynamic URL Generation**: Uses `getPathname` to generate URLs from i18n configuration
4. **Client Setup**: LocalizedPathsProvider handles client-side path configuration
5. **LangPicker Integration**: Language picker automatically uses the provided paths
6. **Fallback**: For static URLs without translated paths, uses simple locale prefix

**Important**: For dynamic pages with CMS content, always use `LocalizedPathsProvider` with properly generated URLs using `getPathname`. The LangPicker will prioritize these paths over fallback routing.

### UI Components

#### Button Component

A reusable button component that can render as either a `<Link>` or `<button>` element based on props:

```tsx
import { UIComponents } from '@/components';

// As a link
<UIComponents.Button href="/about" variant="default" size="md">
  Learn More
</UIComponents.Button>

// As a button
<UIComponents.Button onClick={handleClick} variant="outlined" size="lg">
  Click Me
</UIComponents.Button>
```

**Props:**

- `variant`: `'default'` (filled) or `'outlined'` (border only)
- `size`: `'sm'`, `'md'`, or `'lg'`
- `href`: When provided, renders as Next.js Link
- `onClick`: When provided (without href), renders as button
- `disabled`: Disables the button/link
- `className`: Additional CSS classes

#### ErrorPage Component

A simple, customizable error page layout:

```tsx
import { LayoutComponents } from '@/components';

<LayoutComponents.ErrorPage title="404" description="Page not found">
  <UIComponents.Button href="/">Go Home</UIComponents.Button>
</LayoutComponents.ErrorPage>;
```

## Hooks

### useTranslatedPaths

Hook for setting translated paths for dynamic URLs (used internally by LocalizedPathsProvider):

```tsx
import { useTranslatedPaths } from '@/utils/hooks/useTranslatedPaths';

// This is handled automatically by LocalizedPathsProvider
// but can be used directly in client components if needed
useTranslatedPaths({
  en: '/products/some-product',
  es: '/productos/algun-producto'
});
```

## Demo Example

### Test Dynamic URLs Demo

The starter includes a working example of dynamic URLs with translated slugs at `/test`. This demonstrates:

- **Server Component**: Page remains server-side rendered for performance
- **Dynamic URL Generation**: Uses `getPathname` from next-intl for URL translation
- **LocalizedPathsProvider**: Shows how to handle CMS-generated slugs
- **SEO-Friendly URLs**: Different paths for each language (`/test/example-article` vs `/es/test-esp/articulo-ejemplo`)

#### Try the Demo

1. Navigate to `/test/example-article` (English)
2. Use the language picker to switch to Spanish
3. Notice the URL changes to `/es/test-esp/articulo-ejemplo`
4. Content loads in Spanish with proper SEO metadata

This example shows how to integrate with any CMS that provides translated slugs.

## Scripts

### Development

- **`install`**: To get started with the project, install the dependencies:
  ```sh
  yarn install
  ```
- **`dev`**: Then, you can start the development server, that runs Prettier to format the code, then runs ESLint to lint the code, and finally starts the Next.js development server.
  ```sh
  yarn dev
  ```

### Building and Starting

- **`build`**: Compiles the application for production.
  ```sh
  yarn build
  ```
- **`start`**: Starts the compiled production application.
  ```sh
  yarn start
  ```

### Linting and Formatting

- **`lint`**: Runs ESLint to check for linting errors.
  ```sh
  yarn lint
  ```
- **`eslint:format`**:Runs ESLint to automatically fix linting errors.
  ```sh
  yarn eslint:format
  ```
- **`prettier:format`**: Runs Prettier to format the code according to the specified configuration.
  ```sh
  yarn prettier:format
  ```
- **`prettier:check`**: Runs Prettier to check the code formatting without making any changes.
  ```sh
  yarn prettier:check
  ```

### Git Hooks

- **`prepare`**: Sets up Husky, a tool for managing Git hooks.
  ```sh
  yarn prepare
  ```
