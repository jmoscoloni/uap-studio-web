'use client';
import { useState, useRef } from 'react';
import Image from 'next/image';
import { ArchiveItem } from '@/store';

interface CardArchiveProps {
  item: ArchiveItem;
  onClick?: (item: ArchiveItem) => void;
}

const CardArchive = ({ item, onClick }: CardArchiveProps) => {
  const cardRef = useRef<HTMLDivElement>(null);

  return (
    <div
      ref={cardRef}
      className="relative cursor-pointer overflow-hidden"
      onClick={() => onClick?.(item)}
    >
      <div className="relative aspect-[3/4] w-full overflow-hidden">
        <Image
          src={item.image}
          alt={item.title}
          fill
          className="object-cover transition-transform duration-500 hover:scale-105"
        />
      </div>

      <h3 className="p-lg mt-3">{item.title}</h3>
    </div>
  );
};

export default CardArchive;
