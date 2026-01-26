'use client';

import { Product } from "@/entities/product/model/types"
import { AddButton } from '@/shared/ui/Buttons/AddButton'
import { LikeButton } from '@/shared/ui/Buttons/LikeButton'
import Link from "next/link";
import {addToCart, removeFromCart} from '@/entities/cart/model/cartSlice'
import { useAppDispatch, useAppSelector } from '@/shared/api/lib/hooks'
import { toggleFavourites } from '@/entities/favourite/model/favSlice'
import toast from 'react-hot-toast';

type ProductProps = {
  product: Product;
};

export function ProductCard({ product }: ProductProps) {
  const dispatch = useAppDispatch();
  const link = `/product/${product.itemId}`;

  // Selectors
  const { items: cartItems } = useAppSelector((state) => state.cart);
  const { favouritesProducts } = useAppSelector((state) => state.favourites);

  // Check Status
  const isInCart = cartItems.some((item) => item.product.itemId === product.itemId);
  const isFavourite = favouritesProducts.some((p) => p.itemId === product.itemId);

  // Handlers
  const handleAddToCartClick = () => {
    if (isInCart) {
      dispatch(removeFromCart(product.itemId));
      toast.error(`${product.name} removed from cart`);
    } else {
      dispatch(addToCart(product));
      toast.success(`${product.name} added to cart`);
    }
  };

  const toggleLike = () => {
    dispatch(toggleFavourites(product));
    if (!isFavourite) {
      toast.success(`${product.name} added to favourites`);
    } else {
      toast(`${product.name} removed from favourites`, { icon: '💔' });
    }
  };

  return (
    <div className="flex flex-col h-full bg-white border rounded-xl p-6 transition-all hover:shadow-lg">
      
      <Link href={link} className="flex justify-center mb-6">
        <div className="h-[200px] w-full flex items-center justify-center">
          <img 
            src={`/${product.image}`} 
            alt={product.name} 
            className="max-h-full max-w-full object-contain hover:scale-105 transition-transform duration-300" 
          />
        </div>
      </Link>

      <Link href={link} className="mb-4 block">
        <h4 className="text-gray-900 font-semibold text-sm leading-tight hover:text-primary transition-colors h-[40px] overflow-hidden">
          {product.name}
        </h4>
      </Link>

      <div className="flex items-center gap-3 mb-4">
        <span className="text-xl font-bold text-gray-900">
          ${product.price}
        </span>
        <span className="text-sm text-gray-400 line-through decoration-gray-400">
          ${product.fullPrice}
        </span>
      </div>

      <div className="flex flex-col gap-2 mb-6 text-xs border-t pt-3">
        <div className="flex justify-between">
          <span className="text-gray-400">Screen</span>
          <span className="text-gray-700 font-medium">{product.screen}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-400">Capacity</span>
          <span className="text-gray-700 font-medium">{product.capacity}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-400">RAM</span>
          <span className="text-gray-700 font-medium">{product.ram}</span>
        </div>
      </div>

      <div className="flex items-center gap-3 mt-auto">
        <div className="flex-1">
          <AddButton 
            onClick={handleAddToCartClick} 
            isSelected={isInCart} 
          />
        </div>
        <LikeButton 
          onClick={toggleLike} 
          filled={isFavourite} 
        />
      </div>

    </div>
  );
}