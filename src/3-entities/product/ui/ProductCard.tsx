'use client';

import { Product } from "@/entities/product/model/types"

type ProductProps = {
  product: Product | Omit<Product, 'id' | 'year'>;
};

export function ProductCard({ product }: ProductProps) {
  return (
    <div className="p-5">{product.name}</div>

  )
}