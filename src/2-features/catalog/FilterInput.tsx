"use client";

import { useEffect, useState } from "react";
import { Search } from "lucide-react";
import { useAppDispatch, useAppSelector } from "@/shared/api/lib/hooks"; 
import { setSearchQuery } from "@/entities/product/model/productSlice";
import { Input } from "@/shared/ui/input"; 
import { useDebounce } from "@/lib/hooks";

export const FilterInput = () => {
  const dispatch = useAppDispatch();
  
  const { searchQuery } = useAppSelector((state) => state.products);

  const [value, setValue] = useState(searchQuery);

  const debouncedValue = useDebounce(value, 500);

  useEffect(() => {
    dispatch(setSearchQuery(debouncedValue));
  }, [debouncedValue, dispatch]);

  useEffect(() => {
    setValue(searchQuery);
  }, [searchQuery]);

  return (
    <div className="relative w-full sm:w-75">
      <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
      <Input
        type="text"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder="Search..."
        className="pl-9 bg-white"
      />
    </div>
  );
};