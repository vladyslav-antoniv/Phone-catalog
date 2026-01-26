import { SortDropdown } from "./SortDropdown";
import { FilterInput } from "./FilterInput";

interface Props {
  className?: string;
}

export const FilterControls = ({ className }: Props) => {
  return (
    <div className={`flex flex-col gap-6 mb-8 ${className || ''}`}>
      
      <div className="flex flex-wrap gap-4">
        
        <div className="flex flex-col gap-1.5">
          <label className="text-xs font-semibold text-gray-500 pl-1 uppercase tracking-wider">
            Sort by
          </label>
          <SortDropdown />
        </div>

      </div>

      <div className="w-full">
        <label className="text-xs font-semibold text-gray-500 pl-1 uppercase tracking-wider mb-1.5 block">
          Search
        </label>
        <FilterInput />
      </div>

    </div>
  );
};