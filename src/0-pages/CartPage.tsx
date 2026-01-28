"use client";

import React from 'react';
import { useAppSelector } from '@/shared/api/lib/hooks'; // Adjust path
import { CartItem } from '@/entities/cart/ui/CartItem'; // Adjust path
import { TotalCost } from '@/entities/cart/ui/TotalCost'; // Adjust path (assuming you refactor this next)
import { BackButton } from '@/shared/ui/Buttons/BackButton'; // Adjust path

export function CartPage() {
  const cartItems = useAppSelector((state) => state.cart.items);
  const session = useAppSelector((state) => state.auth.session);

  // Calculate Totals
  const { totalItems, totalOriginalPrice } = cartItems.reduce(
    (acc, item) => {
      acc.totalItems += item.quantity;
      acc.totalOriginalPrice += item.product.price * item.quantity;
      return acc;
    },
    { totalItems: 0, totalOriginalPrice: 0 }
  );

  // Discount Logic
  // (Assuming you might want to move this logic to a selector later)
  const discountRate = 0.05;
  const totalDiscountedPrice = session
    ? Math.round(totalOriginalPrice * (1 - discountRate))
    : totalOriginalPrice;

  // === EMPTY STATE ===
  if (cartItems.length === 0) {
    return (
      <div className="container mx-auto px-4 py-8 min-h-[60vh] flex flex-col">
        <div className="mb-6">
          <BackButton />
        </div>
        
        <div className="flex-1 flex flex-col items-center justify-center text-center gap-4">
          <div className="w-48 h-48 bg-gray-50 rounded-full flex items-center justify-center mb-4">
             {/* You can add an Empty Cart Icon here */}
             <span className="text-4xl">🛒</span>
          </div>
          <h1 className="text-2xl font-bold text-gray-900">Your cart is empty</h1>
          <p className="text-gray-500 max-w-sm">
            Looks like you haven't added anything yet. Go ahead and explore our products!
          </p>
        </div>
      </div>
    );
  }

  // === FILLED STATE ===
  return (
    <div className="container mx-auto px-4 py-8 pb-20">
      
      {/* Header */}
      <div className="mb-8">
        <BackButton />
        <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900 mt-4 tracking-tight">
          Cart
        </h1>
      </div>

      {/* Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12">
        
        {/* Left Column: Items List (Takes up 2/3 width on desktop) */}
        <div className="lg:col-span-2 flex flex-col gap-4">
          {cartItems.map((item) => (
            // Use product.itemId as key since item.itemId might not exist on the container object
            <CartItem key={item.product.itemId} item={item} />
          ))}
        </div>

        {/* Right Column: Total Cost (Takes up 1/3 width on desktop) */}
        <div className="lg:col-span-1">
          <div className="lg:sticky lg:top-24">
            <TotalCost
              totalItems={totalItems}
              totalPrice={totalOriginalPrice}
              discountedPrice={totalDiscountedPrice}
            />
          </div>
        </div>

      </div>
    </div>
  );
}