"use client";

import { useEffect, useMemo } from 'react';
import { useAppDispatch, useAppSelector } from '@/shared/api/lib/hooks';
import {
  getCategoryProducts,
  getProductsStore,
  selectTotalByCategory,
  setCategory,
  setCurrentPage,
} from '@/entities/product/model/productSlice';
import { FilterControls } from '@/features/catalog/FilterControls';
import { Layout } from '@/entities/product/ui/Layout';
import { PaginationComponent } from '@/features/catalog/Pagination';
import Loader from '@/shared/ui/Loader'; 


type Categories = 'phones' | 'tablets' | 'accessories';

interface Props {
  category: string;
}

const categoryTitles: Record<string, string> = {
  phones: 'Mobile phones',
  tablets: 'Tablets',
  accessories: 'Accessories',
};

export const CatalogPage = ({ category }: Props) => {
  const dispatch = useAppDispatch();
  const id = category as Categories;

  const { 
    products,
    clearProducts,
    countItemsPage, 
    currentPage, 
    searchQuery,
    loading 
  } = useAppSelector((state) => state.products);

  const categoryModels = useAppSelector((state) => selectTotalByCategory(state, id));

  const visibleTotal = useMemo(() => {
    if (!searchQuery) return categoryModels;
    
    return categoryModels.filter((product) => 
      product.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [categoryModels, searchQuery]);

  useEffect(() => {
    dispatch(setCategory(id));

    if (clearProducts.length === 0) {
      dispatch(getProductsStore())
        .unwrap()
        .catch((err) => console.error("Failed to load products:", err));
    }
  }, [id, dispatch, clearProducts.length]);

  const handlePageChange = (page: number) => {
    dispatch(setCurrentPage(page));
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const title = categoryTitles[id] || category;

  if (loading && clearProducts.length === 0) {
    return (
      <div className="flex h-[50vh] items-center justify-center">
        <Loader />
      </div>
    );
  }

  return (
    <div className="container mx-auto py-8 px-4">
      
      <section className="mb-8">
        <h1 className="text-4xl font-extrabold mb-2 text-gray-900 capitalize">
          {title}
        </h1>
        <span className="text-sm text-gray-500 font-medium">
          {visibleTotal.length} models
        </span>
      </section>

      <section className="mb-8">
        <FilterControls />
      </section>

      <section className="mb-12">
        {products.length > 0 ? (
          <>
            <Layout products={products} />

            {visibleTotal.length > countItemsPage && (
              <div className="mt-12">
                <PaginationComponent
                  totalItems={visibleTotal.length}
                  perPage={countItemsPage}
                  currentPage={currentPage}
                  onPageChange={handlePageChange}
                />
              </div>
            )}
          </>
        ) : (
          <div className="py-20 text-center text-gray-500 text-lg">
            No models found.
          </div>
        )}
      </section>
    </div>
  );
};