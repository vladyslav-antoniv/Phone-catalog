"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { Button } from "@/shared/ui/Buttons/button";
import { cn } from "@/lib/utils"; 

interface CapacityProps {
  capacity: string[];
  activeCapacity: string;
  itemId: string;
  activeColor: string;
}

export function CapacityButton({ 
  capacity, 
  activeCapacity, 
  itemId, 
  activeColor 
}: CapacityProps) {
  const { category } = useParams();

  return (
    <div className="flex flex-wrap gap-3">
      {capacity.map((cap) => {
        const colorSlug = activeColor.toLowerCase().replace(/ /g, '-');
        const capacitySlug = cap.toLowerCase();
        
        const href = `/en/${category}/${itemId}-${capacitySlug}-${colorSlug}`;
        const isActive = cap === activeCapacity;

        return (
          <Link
            key={cap}
            href={href}
            scroll={false}
          >
            <Button
              variant={isActive ? "default" : "outline"}
              className={cn(
                "h-10 min-w-[70px] transition-all", 
                isActive 
                  ? "bg-gray-900 text-white hover:bg-gray-800 ring-2 ring-offset-1 ring-gray-900"
                  : "text-gray-700 border-gray-200 hover:border-gray-900 hover:text-gray-900"
              )}
            >
              {cap}
            </Button>
          </Link>
        );
      })}
    </div>
  );
}