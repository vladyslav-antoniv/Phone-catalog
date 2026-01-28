"use client";

import { useAppSelector } from '@/shared/api/lib/hooks';
import { Layout } from '@/entities/product/ui/Layout';

export function FavouritesPage() {
  const { favouritesProducts } = useAppSelector((state) => state.favourites);

  return (
    <div className="container mx-auto px-4 py-8">
      
      <section className="mb-8">
        <div className="flex flex-col gap-1">
          <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900 tracking-tight">
            Favourites
          </h1>
          
          <span className="text-sm text-gray-500 font-medium ml-1">
            {favouritesProducts.length} models
          </span>
        </div>
      </section>

      <section>
        {favouritesProducts.length > 0 ? (
          <Layout products={favouritesProducts} />
        ) : (
          <div className="flex flex-col items-center justify-center py-20 text-center">
            <p className="text-gray-500 text-lg">You haven't added any favourites yet.</p>
          </div>
        )}
      </section>

    </div>
  );
}

