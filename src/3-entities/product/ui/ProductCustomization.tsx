"use client";

import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { FullProduct, Product } from "@/entities/product/model/types";
import { useAppDispatch, useAppSelector } from "@/shared/api/lib/hooks";
import { toggleFavourites } from "@/entities/favourite/model/favSlice";
import { addToCart, removeFromCart } from "@/entities/cart/model/cartSlice";
import { prepareProduct } from "@/shared/helpers/prepareProduct";


import { AddButton } from "@/shared/ui/Buttons/AddButton";
import { LikeButton } from "@/shared/ui/Buttons/LikeButton";
import { CapacityButton } from "@/shared/ui/Buttons/CapacityButton";
import { ColorChangeButtons } from "@/shared/ui/Buttons/ColorChangeButtons";

interface ProductProps {
  products: FullProduct;
  category: string;
}

export function ProductCustomization({ products, category }: ProductProps) {
  const dispatch = useAppDispatch();
  
  const { selectedForCart } = useAppSelector((state) => state.products);
  const preparedProduct = selectedForCart || prepareProduct(products, category);

  const { favouritesProducts } = useAppSelector((state) => state.favourites);
  const { items: cartItems } = useAppSelector((state) => state.cart);

  const isFavourite = favouritesProducts.some((p) => p.itemId === products.id);
  const isInCart = cartItems.some((item) => item.product.itemId === preparedProduct.itemId);

  const toggleLike = () => {
    dispatch(toggleFavourites(preparedProduct as Product));
    if (!isFavourite) {
      toast.success(`${products.name} added to favourites`);
    } else {
      toast(`${products.name} removed from favourites`, { icon: '💔' });
    }
  };

  const handleAddToCartClick = () => {
    if (isInCart) {
      dispatch(removeFromCart(preparedProduct.itemId));
      toast.error(`${products.name} removed from cart`);
    } else {
      dispatch(addToCart(preparedProduct as Product));
      toast.success(`${products.name} added to cart`);
    }
  };

  return (
    <div className="flex flex-col gap-8">
      
      <div>
        <div className="flex justify-between items-center mb-2">
          <span className="text-xs font-bold text-gray-500 uppercase tracking-wide">
            Available colors
          </span>
          <span className="text-xs font-medium text-gray-400">
            ID: {products.namespaceId}
          </span>
        </div>
        
        <div className="flex flex-wrap gap-2">
          <ColorChangeButtons
            colors={products.colorsAvailable}
            activeColor={products.color}
            activeCapacity={products.capacity}
            itemId={products.namespaceId}
          />
        </div>
      </div>

      <div className="border-b border-gray-100 pb-8">
        <span className="text-xs font-bold text-gray-500 uppercase tracking-wide mb-2 block">
          Select capacity
        </span>
        <div className="flex flex-wrap gap-2">
          <CapacityButton
            capacity={products.capacityAvailable}
            activeCapacity={products.capacity}
            itemId={products.namespaceId}
            activeColor={products.color}
          />
        </div>
      </div>

      <div className="flex flex-col gap-4">
        <div className="flex items-center gap-4">
          <span className="text-3xl font-extrabold text-gray-900">
            ${products.priceDiscount}
          </span>
          <span className="text-xl text-gray-500 line-through decoration-gray-400 font-medium">
            ${products.priceRegular}
          </span>
        </div>

        <div className="flex gap-4 h-12 

[Image of shopping cart icon]
">
          <div className="flex-1">
            <AddButton 
              onClick={handleAddToCartClick} 
              isSelected={isInCart} 
              className="h-full"
            />
          </div>
          <LikeButton 
            onClick={toggleLike} 
            filled={isFavourite} 
            className="h-full w-12 border border-gray-200"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 gap-2 text-xs">
        <div className="flex justify-between">
          <span className="text-gray-500">Screen</span>
          <span className="text-gray-900 font-medium">{products.screen}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-500">Resolution</span>
          <span className="text-gray-900 font-medium">{products.resolution}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-500">Processor</span>
          <span className="text-gray-900 font-medium">{products.processor}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-500">RAM</span>
          <span className="text-gray-900 font-medium">{products.ram}</span>
        </div>
      </div>

    </div>
  );
}