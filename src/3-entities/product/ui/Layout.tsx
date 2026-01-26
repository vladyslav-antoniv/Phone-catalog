import { Product } from '@/entities/product/model/types';
import { ProductCard } from '@/entities/product/ui/ProductCard';

type Props = {
  products?: Product[];
};

export function Layout({ products }: Props) {
  if (!products || products.length === 0) return null;
  console.log('shit')

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 animate-in fade-in slide-in-from-bottom-4">
      {products.map((product) => (
        <div className="flex justify-center" key={product.itemId}>
          <ProductCard product={product} />
        </div>
      ))}
    </div>
  );
}