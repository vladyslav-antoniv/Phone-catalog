"use client";

import { useEffect, useMemo } from "react";
import { useParams } from "next/navigation";
import { useAppDispatch, useAppSelector } from "@/shared/api/lib/hooks";
import {
  getCategoryFullProducts,
  getProductById,
  getProductByIdForCart,
} from "@/entities/product/model/productSlice"; 
import { prepareProduct } from "@/shared/helpers/prepareProduct";

import { BackButton } from "@/shared/ui/Buttons/BackButton";
import Loader from "@/shared/ui//Loader";

import { ThumbsGallery } from "@/shared/ui/5-ProductsCarousel/ThumbsGallery";
import { ProductCustomization } from "@/entities/product/ui/ProductCustomization";
import { ProductSpecification } from "@/entities/product/ui/ProductSpecification";
import { ProductsCarousel } from "@/shared/ui/5-ProductsCarousel/ProductsCarousel";

interface CreateProductProps {
  slug: string;
}

export function CreateProduct({ slug }: CreateProductProps) {
  const { category } = useParams();
  const dispatch = useAppDispatch();
  
  const { fullProduct, loading, error, selectedProduct } = useAppSelector(
    (state) => state.products
  );

  useEffect(() => {
    async function fetchData() {
      if (!category) return;

      try {
        await Promise.all([
          dispatch(getCategoryFullProducts(category as string)).unwrap(),
          dispatch(getProductById({ id: slug, table: category as string })).unwrap(),
          dispatch(getProductByIdForCart(slug)).unwrap(),
        ]);
      } catch (err) {
        console.error("Failed to load product data", err);
      }
    }
    fetchData();
  }, [category, slug, dispatch]);

  const oneProduct = selectedProduct;

  const relatedProducts = useMemo(
    () =>
      fullProduct
        .filter((p) => p.id !== slug)
        .map((p) => prepareProduct(p, category as string)),
    [fullProduct, slug, category]
  );

  if (loading || !oneProduct) {
    return (
      <div className="h-[50vh] flex items-center justify-center">
        <Loader />
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-20 text-red-500 font-bold">
        Error loading product: {error}
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8 space-y-16">
      
      <section>
        <div className="mb-6">
          <BackButton />
        </div>
        <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900 tracking-tight">
          {oneProduct.name}
        </h1>
      </section>

      <section className="grid grid-cols-1 md:grid-cols-2 gap-10 lg:gap-16">
        <div className="w-full">
          <ThumbsGallery images={oneProduct.images} />
        </div>

        <div className="w-full">
          {/* 'md:sticky md:top-24'  */}
          <div className="md:sticky md:top-24">
            <ProductCustomization 
              products={oneProduct} 
              category={category as string} 
            />
          </div>
        </div>
      </section>

      <section>
        <ProductSpecification products={oneProduct} />
      </section>

      <section className="border-t pt-10">
        <ProductsCarousel 
          title="You may also like" 
          products={relatedProducts} 
          param="category"
        />
      </section>
      
    </div>
  );
}