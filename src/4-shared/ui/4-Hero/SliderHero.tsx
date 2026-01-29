'use client';

import React, { useRef, useState } from 'react';
import Image from 'next/image';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination } from 'swiper/modules';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Swiper as SwiperType } from 'swiper';

import 'swiper/css';
import 'swiper/css/pagination';

const BANNERS = [
  { id: 1, src: '/banners/iPhone-17-Pro.jpg', alt: 'iPhone 17 Pro' },
  { id: 2, src: '/banners/iphone-15.jpg', alt: 'iPhone 15' },
  { id: 3, src: '/banners/apples-iphone-15-m_2.jpg', alt: 'iPhone 15 New' },
];

export const SliderHero = () => {
  const swiperRef = useRef<SwiperType | null>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const handlePrev = () => swiperRef.current?.slidePrev();
  const handleNext = () => swiperRef.current?.slideNext();
  const goToSlide = (index: number) => swiperRef.current?.slideToLoop(index);

  return (
    <div className="flex flex-col gap-6">
      
      <div className="flex items-center gap-4">
        
        <button 
          onClick={handlePrev}
          className="hidden md:flex h-10 w-8 items-center justify-center rounded-sm border border-gray-200 text-gray-500 transition-colors hover:border-gray-900 hover:text-gray-900"
        >
          <ChevronLeft size={20} />
        </button>

        <div className="w-full overflow-hidden rounded-2xl border border-gray-100 shadow-sm">
          <Swiper
            modules={[Autoplay, Pagination]}
            loop={true}
            spaceBetween={0}
            slidesPerView={1}
            onSwiper={(swiper) => (swiperRef.current = swiper)}
            onSlideChange={(swiper) => setActiveIndex(swiper.realIndex)}
            autoplay={{
              delay: 5000,
              disableOnInteraction: false,
              pauseOnMouseEnter: true,
            }}
            className="w-full h-auto aspect-[16/9] md:aspect-[21/9] bg-gray-50"
          >
            {BANNERS.map((banner) => (
              <SwiperSlide key={banner.id}>
                <div className="relative w-full h-full flex items-center justify-center">
                  <Image
                    src={banner.src}
                    alt={banner.alt}
                    fill
                    priority={banner.id === 1}
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 1200px"
                  />
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>

        <button 
          onClick={handleNext}
          className="hidden md:flex h-10 w-8 items-center justify-center rounded-sm border border-gray-200 text-gray-500 transition-colors hover:border-gray-900 hover:text-gray-900"
        >
          <ChevronRight size={20} />
        </button>
      </div>

      <div className="flex justify-center gap-3">
        {BANNERS.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`h-1 transition-all duration-300 rounded-full ${
              activeIndex === index 
                ? 'w-8 bg-gray-900'
                : 'w-4 bg-gray-300 hover:bg-gray-400'
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>

    </div>
  );
};