'use client';
import Card from '@/components/common/Card';
import { Link } from '@/i18n/navigation';

const projects = [
  {
    id: 1,
    image: '/Images/NAPLES ST HOUSE.jpg',
    title: 'Naples Street House',
    paragraph:
      '1/2 series of computer-generated visuals based on shots captured by renowned photographers and reinterpreted through emerging digital tools.',
    subtitle: 'Edition Office',
    slug: 'example',
    video: '/videos/NAPLES ST HOUSE.mp4'
  },
  {
    id: 5,
    image: '/Images/VILLA M.jpg',
    title: 'Villa M',
    paragraph:
      '2/2 series. This project explores the intersection of architecture and digital art, creating a series of computer-generated visuals that reimagine spaces through a contemporary lens.',
    subtitle: 'Leopold Banchini',
    slug: 'nicola-copy-2'
    // video preview disabled on mobile/desktop per request
  },
  {
    id: 4,
    image: '/Images/BRC.jpg',
    title: 'BRC Cabin',
    paragraph:
      'This project is located on the shores of a lake in southern Buenos Aires, where the design blends local and industrial materials to create a dialogue between nature and contemporary construction. The visualization and renderings were crafted to convey both the material richness and the serene atmosphere of the spaces.',
    subtitle: 'E2M architects',
    slug: 'nicola-copy',
    video: '/videos/BRC - PPAL DORM.mp4'
  },
  {
    id: 6,
    image: '/Images/HSP HOUSE - Image 1.jpg',
    title: 'HSP House',
    paragraph: 'A bold expression of raw concrete and geometry captured through virtual lenses.',
    subtitle: 'E2M architects',
    slug: 'nicola-copy-3'
    // video preview disabled on mobile/desktop per request
  },
  {
    id: 3,
    image: '/Images/NA HOUSE.jpg',
    title: 'NA House',
    paragraph:
      'A contemporary kitchen that combines clean lines, modern materials, and functional design.',
    subtitle: 'E2M architects',
    slug: 'naples-st-house-copy'
    // video preview disabled on mobile/desktop per request
  },
  {
    id: 2,
    image: '/Images/example.jpeg',
    paragraph:
      '1/2 series of computer-generated visuals based on shots captured by renowned photographers and reinterpreted through emerging digital tools.',
    subtitle: 'Edition Office',
    slug: 'example'
  }
  // {
  //   id: 3,
  //   image: "/images/example.jpeg",
  //   paragraph: "1/2 series of computer-generated visuals based on shots captured by renowned photographers and reinterpreted through emerging digital tools.",
  //   slug: "example"
  // }
];

const slugify = (str?: string) => {
  if (!str) return '';
  return str
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');
};

const Overview = () => {
  return (
    <section className="relative w-full px-2 pt-5 pb-6 lg:px-4 lg:pb-10">
      <div className="grid grid-cols-1 gap-2 lg:grid-cols-2">
        {projects
          .filter(
            (project, index, self) => self.findIndex((p) => p.slug === project.slug) === index
          )
          .map((project) => {
            const routeSlug = project.title ? slugify(project.title) : project.slug;
            return (
              <Link
                key={project.id}
                href={{ pathname: '/work/[slug]', params: { slug: routeSlug } }}
                className={`w-full ${project.slug === 'nicola-copy' ? 'lg:col-span-2' : ''}`}
              >
                <Card
                  big
                  image={project.image}
                  paragraph={project.paragraph}
                  subtitle={project.subtitle}
                  title={project.title}
                  video={project.video}
                />
              </Link>
            );
          })}
      </div>
    </section>
  );
};
export default Overview;
