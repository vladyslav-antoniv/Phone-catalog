import React from 'react';
import { cn } from "@/lib/utils";
import { ContentSection } from '@/shared/ui/6-ProductSpecification/ContentSection';
import { TechSpecs, SpecItem } from '@/shared/ui/6-ProductSpecification/TechSpecs'; 
import { FullProduct } from '@/entities/product/model/types';

interface ProductSpecificationProps {
  className?: string;
  products: FullProduct;
}

export const ProductSpecification: React.FC<ProductSpecificationProps> = ({ 
  className, 
  products 
}) => {
  const contentSections = products.description;

  const techSpecs: SpecItem[] = [
    { label: "Screen", value: products.screen },
    { label: "Resolution", value: products.resolution },
    { label: "Processor", value: products.processor },
    { label: "RAM", value: products.ram },
    { label: "Built in memory", value: products.capacity },
    { label: "Camera", value: products.camera },
    { label: "Zoom", value: products.zoom },
    { label: "Cell", value: products.cell.join(', ') }
  ];

  return (
    <div className={cn("grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-20", className)}>
      
      <div className="md:col-span-7 space-y-12">
        <ContentSection title="About" sections={contentSections} />
      </div>

      <div className="md:col-span-5">
        <TechSpecs title="Tech specs" specs={techSpecs} />
      </div>

    </div>
  );
};