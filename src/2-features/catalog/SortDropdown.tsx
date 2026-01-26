"use client";

import React from 'react';
import { useAppDispatch, useAppSelector } from '@/shared/api/lib/hooks';
import { changeSortValue, SortBy } from '@/entities/product/model/productSlice';
import {
  NativeSelect,
  NativeSelectOption,
} from "@/shared/ui/native-select";

export const SortDropdown: React.FC = () => {
  const dispatch = useAppDispatch();
  const { sortBy } = useAppSelector((state) => state.products);

  const currentValue = `${sortBy.param}-${sortBy.order}`;

  // Handle Change: String -> Redux Action
  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const value = event.target.value;
    const [param, order] = value.split('-');

    dispatch(
      changeSortValue({
        param: param as SortBy['param'],
        order: order as SortBy['order'],
      })
    );
  };

  return (
    <div className="w-full sm:w-[200px]">
      <NativeSelect value={currentValue} onChange={handleChange}>
        <NativeSelectOption value="year-desc">Newest</NativeSelectOption>
        <NativeSelectOption value="year-asc">Oldest</NativeSelectOption>
        <NativeSelectOption value="price-asc">Lowest to Highest</NativeSelectOption>
        <NativeSelectOption value="price-desc">Highest to Lowest</NativeSelectOption>
      </NativeSelect>
    </div>
  );
};