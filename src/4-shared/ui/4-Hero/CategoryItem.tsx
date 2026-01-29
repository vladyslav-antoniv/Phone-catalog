'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useAppSelector } from '@/shared/api/lib/hooks';

interface CategoryProps {
  category: {
    src: string;
    alt: string;
    title: string;
    href: string;
  };
}

export function CategoryItem({ category }: CategoryProps) {
  const data = useAppSelector((state) => state.products.clearProducts);
  
  const categoryCount = data.filter(
    (product) => product.category === category.alt.toLowerCase()
  ).length;

  return (
    <Link 
      href={`/en${category.href}`} 
      className="group block h-full w-full"
    >
      <div className="relative overflow-hidden rounded-2xl bg-gray-100 transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
        
        <div className="relative h-64 w-full flex items-center justify-center p-6 bg-[#323542] group-hover:bg-[#2B2D38] transition-colors">
          <div className="relative w-full h-full transition-transform duration-500 group-hover:scale-110">
            <Image 
              src={category.src} 
              alt={category.alt} 
              fill
              className="object-contain"
              sizes="(max-width: 768px) 100vw, 33vw"
            />
          </div>
        </div>

        <div className="p-6">
          <h4 className="text-xl font-bold text-gray-900 mb-1 group-hover:text-blue-600 transition-colors">
            {category.title}
          </h4>
          <span className="text-sm font-medium text-gray-500">
            {categoryCount} models
          </span>
        </div>

      </div>
    </Link>
  );
}