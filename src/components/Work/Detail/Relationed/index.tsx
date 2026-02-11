'use client';
import CardArchive from '@/components/Archive/CardArchive';
import { Link } from '@/i18n/navigation';
import { ArchiveItem } from '@/store';

interface RelationedItem extends ArchiveItem {
  url: string;
}

const defaultItems: RelationedItem[] = [
  {
    id: 1,
    title: 'Related Project 01',
    architectureType: '',
    description: '',
    image: '/Images/example.jpeg',
    url: '/'
  },
  {
    id: 2,
    title: 'Related Project 02',
    architectureType: '',
    description: '',
    image: '/Images/example.jpeg',
    url: '/'
  },
  {
    id: 3,
    title: 'Related Project 03',
    architectureType: '',
    description: '',
    image: '/Images/example.jpeg',
    url: '/'
  }
];

const Relationed = () => {
  return (
    <section className="relative w-full px-2 py-10 lg:px-4">
      <h2 className="h2 mb-10">Related Projects</h2>
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {defaultItems.map((item) => (
          <Link key={item.id} href={item.url as '/'}>
            <CardArchive item={item} />
          </Link>
        ))}
      </div>
    </section>
  );
};

export default Relationed;
