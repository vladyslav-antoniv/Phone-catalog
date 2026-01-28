import { Product } from "@/entities/product/model/types";

export function sortProductsForCarousel(param: keyof Product) {
  return (a: Product, b: Product) => {
    switch (param) {
      case 'year':
        return b.year - a.year;
      
      case 'price':
        return b.price - a.price; 
        
      default:
        return 0;
    }
  };
}