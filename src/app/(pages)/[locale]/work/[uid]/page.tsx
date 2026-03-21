import { LayoutComponents, WorkDetailComponents } from '@/components';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getPathname } from '@/i18n/navigation';
import { LocaleWithUidPageProps } from '@/types/pages';
import { locales } from '@/i18n/routing';

// const mockArticle: Record<
//   string,
//   { title: { en: string; es: string }; slug: { en: string; es: string } }
// > = {
//   'example-article': {
//     title: { en: 'Example Article', es: 'Artículo de Ejemplo' },
//     slug: { en: 'example-article', es: 'articulo-ejemplo' }
//   },
//   'articulo-ejemplo': {
//     title: { en: 'Example Article', es: 'Artículo de Ejemplo' },
//     slug: { en: 'example-article', es: 'articulo-ejemplo' }
//   }
// };

export default async function TestPage({ params }: LocaleWithUidPageProps) {
  const { uid, locale } = await params;

  // const article = mockArticle[uid];

  // if (!article) {
  //   notFound();
  // }

  const currentLocale = locale as 'en' | 'es';
  // Per-project detail data (build map from array so slugs derived from titles will match)
  const slugify = (str?: string) => {
    if (!str) return '';
    return str
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '');
  };

  const projectsArray = [
    {
      slug: 'example',
      title: 'Naples Street House',
      subtitle: 'Edition Office',
      overview:
        '1/2 series of computer generated visuals based on shots captured by selected photographers (Tasha Tylee in this case) and reinterpreted through emergin digital tools.',
      images: ['/Images/NAPLES ST HOUSE.jpg']
    },
    {
      slug: 'naples-st-house-copy',
      title: 'NA House',
      subtitle: 'E2M architects',
      overview:
        'A contemporary kitchen that combines clean lines, modern materials, and functional design.',
      images: ['/Images/NA HOUSE.jpg']
    },
    {
      slug: 'nicola-copy',
      title: 'BRC Cabin',
      subtitle: 'E2M architects',
      overview:
        'This project is located on the shores of a lake in southern Buenos Aires, where the design blends local and industrial materials to create a dialogue between nature and contemporary construction. The visualization and renderings were crafted to convey both the material richness and the serene atmosphere of the spaces.',
      images: ['/Images/BRC.jpg']
    },
    {
      slug: 'nicola-copy-2',
      title: 'Villa M',
      subtitle: 'Leopold Banchini',
      overview:
        '2/2 series of computer generated visuals based on shots captured by selected photographers (Rory Gardiner in this case) and reinterpreted through emergin digital tools.',
      images: ['/Images/VILLA M.jpg']
    },
    {
      slug: 'nicola-copy-3',
      title: 'HSP House',
      subtitle: 'E2M architects',
      overview: 'A bold expression of raw concrete and geometry captured through virtual lenses.',
      images: ['/Images/HSP HOUSE - Image 1.jpg']
    }
  ];

  const projects: Record<
    string,
    {
      title: string;
      subtitle?: string;
      overview?: string;
      images: string[];
    }
  > = {};

  for (const p of projectsArray) {
    const keyFromTitle = slugify(p.title);
    if (keyFromTitle)
      projects[keyFromTitle] = {
        title: p.title,
        subtitle: p.subtitle,
        overview: p.overview,
        images: p.images
      };
    if (p.slug)
      projects[p.slug] = {
        title: p.title,
        subtitle: p.subtitle,
        overview: p.overview,
        images: p.images
      };
  }

  const project = projects[uid];

  if (!project) {
    notFound();
  }

  // Generate translated paths using i18n configuration
  // const translatedPaths = {
  //   en: getPathname({
  //     href: { pathname: '/test/[uid]', params: { uid: article.slug.en } },
  //     locale: 'en'
  //   }),
  //   es: getPathname({
  //     href: { pathname: '/test/[uid]', params: { uid: article.slug.es } },
  //     locale: 'es'
  //   })
  // };

  return (
    // <LayoutComponents.LocalizedPathsProvider paths={translatedPaths}>
    //   <main>
    //     <div className="wrapper site-grid py-24">
    //       <h1 className="col-span-full text-4xl font-bold">{article.title[currentLocale]}</h1>
    //       <p className="col-span-full text-gray-600">
    //         URL: {uid} | Locale: {currentLocale}
    //       </p>
    //     </div>
    //   </main>
    // </LayoutComponents.LocalizedPathsProvider>
    <main>
      <WorkDetailComponents.WorkHeroDetail
        title={project.title}
        subtitle={project.subtitle}
        overview={project.overview}
        images={project.images}
      />
    </main>
  );
}

// export async function generateMetadata({ params }: LocaleWithUidPageProps): Promise<Metadata> {
//   const { uid, locale } = await params;
//   const article = mockArticle[uid];

//   if (!article) {
//     return {
//       title: 'Content Not Found'
//     };
//   }

//   const currentLocale = locale as 'en' | 'es';

//   return {
//     title: article.title[currentLocale]
//   };
// }

// export async function generateStaticParams() {
//   const articles = Object.keys(mockArticle);
//   const params = [];

//   for (const locale of locales) {
//     for (const uid of articles) {
//       params.push({
//         locale,
//         uid
//       });
//     }
//   }

//   return params;
// }
