"use client";

import React, { useMemo } from "react";
import { Product } from "@/entities/product/model/types";
import { useAppSelector } from "@/shared/api/lib/hooks";
import { ProductCard } from "@/entities/product/ui/ProductCard";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "./carousel";
import { sortProductsForCarousel } from "@/shared/helpers/sortProductsForCarousel";
import { shuffleArray } from "@/shared/helpers/relatedProducts";

type Props = {
  title?: string;
  param?: keyof Product;
  products?: Product[];
};

export function ProductsCarousel({ 
  title = "Brand new models", 
  param = "year", 
  products 
}: Props) {
  const { clearProducts } = useAppSelector((state) => state.products);

  const dataForCarousel = useMemo(() => {
    if (products) {
      return shuffleArray([...products]); 
    }
    return [...clearProducts].sort(sortProductsForCarousel(param));
  }, [products, clearProducts, param]);

  if (dataForCarousel.length === 0) return null;

  return (
    <section className="py-10">
      <Carousel
        opts={{
          align: "start",
          loop: true,
        }}
        className="w-full"
      >
        <div className="flex items-center justify-between mb-6 px-1">
          <h2 className="text-3xl font-extrabold text-gray-900 tracking-tight">
            {title}
          </h2>

          <div className="flex items-center gap-2">
            <CarouselPrevious className="static translate-y-0 h-10 w-10 border-gray-200 hover:bg-gray-100 hover:border-gray-900" />
            <CarouselNext className="static translate-y-0 h-10 w-10 border-gray-200 hover:bg-gray-100 hover:border-gray-900" />
          </div>
        </div>

        <CarouselContent className="-ml-4 pb-4">
          {dataForCarousel.map((product) => (
            <CarouselItem 
              key={product.itemId} 
              className="pl-4 basis-[80%] sm:basis-1/2 md:basis-1/3 lg:basis-1/4"
            >
              <div className="h-full">
                <ProductCard product={product} />
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
    </section>
  );
}