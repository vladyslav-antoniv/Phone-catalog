"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

import { useAppDispatch, useAppSelector } from "@/shared/api/lib/hooks"; 
import { getProductsStore } from "@/entities/product/model/productSlice";

import Loader from "@/shared/ui/Loader";
import { Modal } from "@/shared/ui/Modal"; 
import { Button } from "@/shared/ui/Buttons/button";

import { HeroSection } from "@/widgets/HeroSection";
import { ProductsCarousel } from "@/shared/ui/5-ProductsCarousel/ProductsCarousel";
import { HeroCategory } from "@/shared/ui/4-Hero/HeroCategory";

export function HomePage() {
  const dispatch = useAppDispatch();
  const { loading } = useAppSelector((state) => state.products);
  const { session } = useAppSelector((state) => state.auth);

  const [isModalOpen, setIsModalOpen] = useState(false);

  const userName = session?.user?.name || session?.user?.user_metadata?.full_name;
  const welcomeText = session
    ? `Welcome, ${userName}!`
    : "Welcome to Nice Gadgets store!";

  useEffect(() => {
    const hasShownHomepageModal = localStorage.getItem("hasShownHomepageModal");

    if (!session && !hasShownHomepageModal) {
      const timer = setTimeout(() => {
        setIsModalOpen(true);
        localStorage.setItem("hasShownHomepageModal", "true");
      }, 3000);

      return () => clearTimeout(timer);
    }

    if (session) {
      setIsModalOpen(false);
    }
  }, [session]);

  useEffect(() => {
    dispatch(getProductsStore());
  }, [dispatch]);

  if (loading) {
    return (
      <div className="h-screen flex items-center justify-center">
        <Loader />
      </div>
    );
  }

  return (
    <div className="space-y-16 pb-20">
      
      <HeroSection title={welcomeText} />

      <div className="container mx-auto px-4">
        <ProductsCarousel title="Brand new models" param="year" />
      </div>

      <HeroCategory />

      <div className="container mx-auto px-4">
        <ProductsCarousel title="Hot prices" param="price" />
      </div>

      {isModalOpen && (
        <Modal onClose={() => setIsModalOpen(false)}>
          <div className="flex flex-col items-center text-center p-6 max-w-sm mx-auto">
            
            <div className="text-4xl mb-4">🎁</div>

            <h2 className="text-2xl font-bold text-gray-900 mb-2">
              Get 5% Off!
            </h2>
            
            <p className="text-gray-500 mb-6 leading-relaxed">
              Sign up to our store now and get a 5% discount on your total purchases automatically.
            </p>

            <Link href="/sign-up" className="w-full">
              <Button 
                className="w-full h-12 text-base font-bold bg-gray-900 hover:bg-gray-800 transition-all"
              >
                Sign Up Now
              </Button>
            </Link>
          </div>
        </Modal>
      )}
    </div>
  );
}