import React from 'react';

export interface SpecItem {
  label: string;
  value: string;
}

interface TechSpecsProps {
  title: string;
  specs: SpecItem[];
}

export const TechSpecs: React.FC<TechSpecsProps> = ({ title, specs }) => {
  return (
    <div className="w-full">
      <h3 className="text-2xl font-bold text-gray-900 mb-6 border-b pb-2">
        {title}
      </h3>
      
      <div className="flex flex-col gap-3">
        {specs.map((spec, index) => (
          <div key={index} className="flex justify-between items-start text-sm">
            <span className="text-gray-500 font-medium whitespace-nowrap pr-4">
              {spec.label}
            </span>
            <span className="text-gray-900 font-semibold text-right break-words">
              {spec.value}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};