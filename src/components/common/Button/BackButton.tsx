'use client';
import React from 'react';
import { Button } from '@/components';
import { useRouter } from '@/i18n/navigation';

export default function BackButton() {
  const router = useRouter();

  return (
    <div className="mt-4 flex justify-center">
      <Button onClick={() => router.back()} className="w-fit">
        <span className="text-[1.125rem] font-normal text-black transition-colors duration-200 hover:text-[#FB2721] lg:text-2xl">
          Back
        </span>
      </Button>
    </div>
  );
}
