"use client";

import Image from "next/image";
import { X, Minus, Plus } from "lucide-react";
import toast from "react-hot-toast";

// 1. Update Imports to match your Slice location
import { useAppDispatch } from "@/shared/api/lib/hooks"; // Adjust path
import { 
  removeFromCart, 
  increaseQuantity, 
  decreaseQuantity,
  // Import the interface directly from the slice to ensure type safety
  type CartItem as CartItemType 
} from "@/entities/cart/model/cartSlice"; // Adjust path

interface CartItemProps {
  item: CartItemType;
}

export function CartItem({ item }: CartItemProps) {
  const dispatch = useAppDispatch();
  
  // 2. Destructure based on Slice State: { product, quantity }
  const { product, quantity } = item;

  // 3. Update Handlers to use correct Action Names
  const handleRemove = () => {
    dispatch(removeFromCart(product.itemId));
    toast.error(`${product.name} removed from cart`);
  };

  const handleIncrement = () => {
    dispatch(increaseQuantity(product.itemId));
  };

  const handleDecrement = () => {
    dispatch(decreaseQuantity(product.itemId));
  };

  // Price Calculation
  const priceToShow = product.price;
  const fullPriceToShow = product.fullPrice;
  const totalRegular = fullPriceToShow ? fullPriceToShow * quantity : 0;
  const totalDiscount = priceToShow * quantity;

  return (
    <div className="group relative flex flex-col sm:flex-row items-center gap-6 p-6 bg-white border border-gray-100 rounded-2xl shadow-sm transition-all hover:shadow-md hover:border-gray-200">
      
      {/* Remove Button */}
      <button 
        onClick={handleRemove}
        className="absolute top-4 right-4 text-gray-400 hover:text-red-500 transition-colors sm:static sm:order-last"
        aria-label="Remove item"
      >
        <X size={20} />
      </button>

      {/* Image */}
      <div className="relative h-20 w-20 flex-shrink-0 overflow-hidden rounded-md border border-gray-100 bg-gray-50">
        <Image
          src={`/${product.image}`}
          alt={product.name}
          fill
          className="object-contain p-1"
        />
      </div>

      {/* Title */}
      <div className="flex-1 text-center sm:text-left">
        <h3 className="font-bold text-gray-900 leading-tight">
          {product.name}
        </h3>
      </div>

      {/* Quantity Controls */}
      <div className="flex items-center border border-gray-200 rounded-lg overflow-hidden h-9">
        <button
          onClick={handleDecrement}
          disabled={quantity === 1}
          className="px-3 h-full flex items-center justify-center text-gray-600 hover:bg-gray-100 disabled:opacity-40 disabled:hover:bg-transparent transition-colors"
        >
          <Minus size={16} />
        </button>
        
        <span className="w-8 text-center text-sm font-semibold text-gray-900 select-none">
          {quantity}
        </span>
        
        <button
          onClick={handleIncrement}
          // Assuming max quantity is 10 (optional)
          disabled={quantity >= 10} 
          className="px-3 h-full flex items-center justify-center text-gray-600 hover:bg-gray-100 disabled:opacity-40 disabled:hover:bg-transparent transition-colors"
        >
          <Plus size={16} />
        </button>
      </div>

      {/* Price Display */}
      <div className="flex flex-col items-end min-w-[80px]">
        <span className="text-lg font-bold text-gray-900">
          ${totalDiscount}
        </span>
        {fullPriceToShow && fullPriceToShow !== priceToShow && (
          <span className="text-sm text-gray-400 line-through">
            ${totalRegular}
          </span>
        )}
      </div>

    </div>
  );
}