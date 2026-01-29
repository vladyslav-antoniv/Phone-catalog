import React from 'react';
import { CategoryItem } from './CategoryItem';

const categories = [
  {
    src: '/img/category-phones.png',
    alt: 'Phones',
    title: 'Mobile phones',
    href: '/phones'
  },
  {
    src: '/img/category-tablets.png',
    alt: 'Tablets',
    title: 'Tablets',
    href: '/tablets'
  },
  {
    src: '/img/category-accessories.png',
    alt: 'Accessories',
    title: 'Accessories',
    href: '/accessories'
  }
];

export function HeroCategory() {
  return (
    <section className="container mx-auto px-4 py-8 mb-8">
      <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-8 tracking-tight">
        Shop by category
      </h2>
      
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 md:gap-8">
        {categories.map((category) => (
          <CategoryItem
            key={category.title}
            category={category}
          />
        ))}
      </div>
    </section>
  );
}