"use client";

import { HeaderNavbar } from "@/shared/ui/0-Header"; // Check your import path
import { ThemeSwitcher } from "@/features/theme/ThemeSwitcher";
import { Logo } from "@/shared/ui/Logo";
import { BurgerMenu } from "../4-shared/ui/0-Header/BurgerMenu";
import { useState } from "react";
import Link from 'next/link';
import { Heart, ShoppingBag } from "lucide-react"; // Added ShoppingBag

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <div className="bg-background sticky top-0 z-50 w-full mx-auto flex justify-between border-b border-border relative">
      
      <div className="flex flex-row gap-6 px-4 py-2 items-center">
        <Logo width={80} height={28} />
        <HeaderNavbar className="hidden md:flex flex-row gap-16" />
      </div>

      <div className="flex flex-row items-center gap-4 px-4">
        <ThemeSwitcher className="hidden md:flex" />
        
        <BurgerMenu
          className="md:hidden cursor-pointer"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          isOpen={isMenuOpen}
        />
      </div>

      {isMenuOpen && (
        <div className="absolute top-full left-0 w-full h-[calc(100vh-100%)] bg-background flex flex-col md:hidden border-t border-border border-2">
          
          <div className="flex flex-1 flex-col items-center justify-start mt-10 gap-8">
            <HeaderNavbar className="flex flex-col gap-6 items-center " />
            
            <div className="md:hidden">
                <ThemeSwitcher />
            </div>
          </div>

          <div className="grid grid-cols-2 h-16 border-t border-border shrink-0 w-full">
            
            <Link 
              href="/favourites" 
              className="flex items-center justify-center border-r border-border hover:bg-accent transition-colors text-foreground"
              onClick={() => setIsMenuOpen(false)}
            >
              <Heart className="w-6 h-6" />
            </Link>

            <Link 
              href="/cart" 
              className="flex items-center justify-center hover:bg-accent transition-colors text-foreground"
              onClick={() => setIsMenuOpen(false)}
            >
              <ShoppingBag className="w-6 h-6" />
            </Link>

          </div>
        </div>
      )}
    </div>
  );
}