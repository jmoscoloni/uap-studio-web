'use client';
import { useState, useMemo } from 'react';
import { useLocale } from 'next-intl';
import CardArchive from '../CardArchive';
import PopUp from '../PopUp';
import { ArchiveItem, ArchiveItemBase } from '@/store';

const archiveItemsData: ArchiveItemBase[] = [
  {
    id: 1,
    title: 'Evidence',
    architectureType: {
      en: 'Oppenheim Architecture',
      es: 'Arquitectura Oppenheim'
    },
    description: {
      en: 'Oppenheim Architecture was established in 1999 by Chad Oppenheim, who recently was awarded the 2023 American Prize for Architecture. The practice has studios in Miami and Basel.',
      es: 'Oppenheim Architecture fue fundada en 1999 por Chad Oppenheim, quien recientemente fue galardonado con el Premio Americano de Arquitectura 2023. El estudio tiene sedes en Miami y Basilea.'
    },
    image: '/Images/example.jpeg'
  },
  {
    id: 2,
    title: 'Visual 02',
    architectureType: {
      en: 'Contemporary Design',
      es: 'Diseño Contemporáneo'
    },
    description: {
      en: 'A series of computer-generated visuals exploring the intersection of nature and modern architecture.',
      es: 'Una serie de visuales generados por computadora que exploran la intersección entre la naturaleza y la arquitectura moderna.'
    },
    image: '/Images/about/img-1.jpg'
  },
  {
    id: 3,
    title: 'Visual 03',
    architectureType: {
      en: 'Minimalist Architecture',
      es: 'Arquitectura Minimalista'
    },
    description: {
      en: 'Exploring the beauty of simplicity through clean lines and geometric forms.',
      es: 'Explorando la belleza de la simplicidad a través de líneas limpias y formas geométricas.'
    },
    image: '/Images/about/img-2.jpg'
  },
  {
    id: 4,
    title: 'Visual 04',
    architectureType: {
      en: 'Sustainable Design',
      es: 'Diseño Sustentable'
    },
    description: {
      en: 'Environmental consciousness meets aesthetic excellence in this collection.',
      es: 'La conciencia ambiental se encuentra con la excelencia estética en esta colección.'
    },
    image: '/Images/about/img-3.jpg'
  },
  {
    id: 5,
    title: 'Visual 05',
    architectureType: {
      en: 'Urban Planning',
      es: 'Planificación Urbana'
    },
    description: {
      en: 'Reimagining city spaces for a more connected and livable future.',
      es: 'Reimaginando espacios urbanos para un futuro más conectado y habitable.'
    },
    image: '/Images/example.jpeg'
  },
  {
    id: 6,
    title: 'Visual 06',
    architectureType: {
      en: 'Residential Architecture',
      es: 'Arquitectura Residencial'
    },
    description: {
      en: 'Creating homes that blend seamlessly with their natural surroundings.',
      es: 'Creando hogares que se integran perfectamente con su entorno natural.'
    },
    image: '/Images/about/img-1.jpg'
  },
  {
    id: 7,
    title: 'Visual 07',
    architectureType: {
      en: 'Commercial Design',
      es: 'Diseño Comercial'
    },
    description: {
      en: 'Innovative spaces that inspire creativity and collaboration.',
      es: 'Espacios innovadores que inspiran creatividad y colaboración.'
    },
    image: '/Images/about/img-2.jpg'
  },
  {
    id: 8,
    title: 'Visual 08',
    architectureType: {
      en: 'Landscape Architecture',
      es: 'Arquitectura del Paisaje'
    },
    description: {
      en: 'Harmonizing built environments with the natural world.',
      es: 'Armonizando entornos construidos con el mundo natural.'
    },
    image: '/Images/about/img-3.jpg'
  },
  {
    id: 9,
    title: 'Visual 09',
    architectureType: {
      en: 'Interior Design',
      es: 'Diseño de Interiores'
    },
    description: {
      en: 'Crafting interior spaces that evoke emotion and function.',
      es: 'Creando espacios interiores que evocan emoción y funcionalidad.'
    },
    image: '/Images/example.jpeg'
  }
];

const OverviewGrid = () => {
  const [isPopUpOpen, setIsPopUpOpen] = useState(false);
  const [startIndex, setStartIndex] = useState(0);
  const locale = useLocale() as 'en' | 'es';

  // Map items with the correct locale
  const archiveItems: ArchiveItem[] = useMemo(() => {
    return archiveItemsData.map((item) => ({
      id: item.id,
      title: item.title,
      architectureType: item.architectureType[locale],
      description: item.description[locale],
      image: item.image
    }));
  }, [locale]);

  const handleCardClick = (item: ArchiveItem, index: number) => {
    setStartIndex(index);
    setIsPopUpOpen(true);
  };

  const handleClosePopUp = () => {
    setIsPopUpOpen(false);
  };

  return (
    <>
      <section className="relative w-full px-2 py-10 lg:px-4">
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {archiveItems.map((item, index) => (
            <CardArchive
              key={item.id}
              item={item}
              onClick={(item) => handleCardClick(item, index)}
            />
          ))}
        </div>
      </section>

      <PopUp
        isOpen={isPopUpOpen}
        close={handleClosePopUp}
        items={archiveItems}
        startIndex={startIndex}
      />
    </>
  );
};
export default OverviewGrid;
