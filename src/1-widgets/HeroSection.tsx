import { SliderHero } from '@/shared/ui/4-Hero/SliderHero';

type Props = {
  title: string;
};

export const HeroSection = ({ title }: Props) => {
  return (
    <section className="container mx-auto px-4 pt-8 pb-12">
      <div className="mb-6 md:mb-8">
        <h1 className="text-3xl md:text-5xl font-extrabold text-gray-900 tracking-tight">
          {title}
        </h1>
      </div>
      
      <div className="w-full">
        <SliderHero />
      </div>
    </section>
  );
};