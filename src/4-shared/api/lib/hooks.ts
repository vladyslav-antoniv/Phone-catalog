import { useDispatch, useSelector} from 'react-redux';
import type { TypedUseSelectorHook} from 'react-redux';
import type { RootState, AppDispatch} from '@/src/app/store/store';
import { useEffect, useState } from "react";

export const useAppDispatch: () => AppDispatch = useDispatch;

export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export function useDebounce<T>(value: T, delay: number): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(timer);
    };
  }, [value, delay]);

  return debouncedValue;
}