"use client";

import { useRouter } from "next/navigation";
import { Button } from "@/shared/ui/Buttons/button"; // Shadcn Button

interface CheckoutSummaryProps {
  totalItems: number;
  totalPrice: number;
  discountedPrice: number;
}

export function TotalCost({ 
  totalItems, 
  totalPrice, 
  discountedPrice 
}: CheckoutSummaryProps) {
  const router = useRouter();
  const isDiscountApplied = totalPrice !== discountedPrice;

  const handleClick = () => router.push("/checkout");

  return (
    <div className="flex flex-col gap-6 p-6 bg-white border border-gray-100 rounded-2xl shadow-sm">
      
      <div className="flex flex-col gap-1 text-center">
        
        <div className="flex flex-col items-center justify-center">
          <span className="text-3xl font-extrabold text-gray-900">
            ${Math.round(discountedPrice)}
          </span>
          
          {isDiscountApplied && (
             <span className="text-sm text-gray-400 line-through font-medium mt-1">
               ${Math.round(totalPrice)}
             </span>
          )}
        </div>

        <p className="text-sm text-gray-500 font-medium">
          Total for {totalItems} {totalItems === 1 ? 'item' : 'items'}
        </p>
      </div>

      <div className="h-px w-full bg-gray-100" />

      <Button 
        onClick={handleClick} 
        size="lg" 
        className="w-full font-bold text-base h-12 bg-gray-900 hover:bg-gray-800 transition-all"
      >
        Checkout
      </Button>

    </div>
  );
}