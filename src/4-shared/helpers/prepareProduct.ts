import { FullProduct, Product } from "@/entities/product/model/types";

export function prepareProduct(
  product: FullProduct,
  category: string,
): Omit<Product, 'id' | 'year'> {
  return {
    itemId: product.id,
    name: product.name,
    fullPrice: product.priceRegular,
    price: product.priceDiscount,
    screen: product.screen.split(' ').slice(0, 2).join(' '),
    capacity: product.capacity,
    color: product.color,
    ram: product.ram,
    image: product.images[0],
    category,
  };
}