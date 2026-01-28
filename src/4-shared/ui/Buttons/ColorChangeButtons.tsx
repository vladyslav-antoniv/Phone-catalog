"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { cn } from "@/lib/utils"; // Shadcn utility

interface ColorProps {
  colors: string[];
  activeColor: string;
  itemId: string;
  activeCapacity: string;
}

const colorMap: Record<string, string> = {
  black: "#1f2020",
  white: "#f9f6ef",
  green: "#364935",
  yellow: "#e8d18d",
  purple: "#d1cddb",
  red: "#ba0c2e",
  blue: "#215E7C",
  midnight: "#171e2b",
  starlight: "#f9f3e5",
  spacegray: "#535150",
  spaceblack: "#1d1d1f",
  silver: "#e2e4e1",
  gold: "#f9e5c9",
  rosegold: "#e6c7c2",
  graphite: "#413f3b",
  sierrablue: "#9ab5cf",
  alpinegreen: "#50564e",
  deeppurple: "#4b3b52",
};

export function ColorChangeButtons({ 
  colors, 
  activeColor, 
  itemId, 
  activeCapacity 
}: ColorProps) {
  const { category } = useParams();

  return (
    <div className="flex flex-wrap gap-2">
      {colors.map((color) => {
        const colorKey = color.toLowerCase().replace(/ /g, "");
        const colorSlug = color.toLowerCase().replace(/ /g, "-");
        const capacitySlug = activeCapacity.toLowerCase();
        
        const isActive = color === activeColor;
        const hexColor = colorMap[colorKey] || "#000";

        return (
          <Link
            key={color}
            href={`/en/${category}/${itemId}-${capacitySlug}-${colorSlug}`}
            scroll={false}
            title={color} 
            className={cn(
              "rounded-full p-[2px] border-2 transition-all duration-200 ease-in-out",
              isActive 
                ? "border-gray-900 scale-110"
                : "border-transparent hover:border-gray-300"
            )}
          >
            <div 
              className="h-8 w-8 rounded-full border border-gray-200 shadow-sm"
              style={{ backgroundColor: hexColor }}
            />
          </Link>
        );
      })}
    </div>
  );
}