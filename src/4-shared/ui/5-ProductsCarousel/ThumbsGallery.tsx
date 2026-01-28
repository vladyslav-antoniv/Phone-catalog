"use client";

import Image from "next/image";
import { useState, useEffect } from "react";
import { type CarouselApi } from "./carousel";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "./carousel";
import { cn } from "@/lib/utils";

interface ImagesProps {
  images: string[];
}

export function ThumbsGallery({ images }: ImagesProps) {
  const [mainApi, setMainApi] = useState<CarouselApi>();
  const [thumbApi, setThumbApi] = useState<CarouselApi>();
  const [selectedIndex, setSelectedIndex] = useState(0);

  useEffect(() => {
    if (!mainApi || !thumbApi) return;

    const handleSelect = () => {
      const index = mainApi.selectedScrollSnap();
      
      thumbApi.scrollTo(index);

      setSelectedIndex((prev) => (prev === index ? prev : index));
    };

    handleSelect();

    mainApi.on("select", handleSelect);
    mainApi.on("reInit", handleSelect);

    return () => {
      mainApi.off("select", handleSelect);
      mainApi.off("reInit", handleSelect);
    };
  }, [mainApi, thumbApi]);

  const onThumbClick = (index: number) => {
    if (mainApi) mainApi.scrollTo(index);
  };

  return (
    <div className="flex flex-col gap-4 w-full">
      
      <div className="relative w-full aspect-square bg-white border rounded-xl overflow-hidden flex items-center justify-center sm:h-[450px] sm:aspect-auto group">
        <Carousel setApi={setMainApi} className="w-full h-full">
          <CarouselContent className="h-full">
            {images.map((image, index) => (
              <CarouselItem key={index} className="flex h-full items-center justify-center">
                <div className="relative w-full h-full max-h-[400px] p-55">
                  <Image 
                    src={`/${image}`} 
                    alt={`Product view ${index + 1}`} 
                    fill 
                    className="object-contain" 
                    priority={index === 0}
                  />
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          
          <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-200">
            <CarouselPrevious className="left-4 bg-white/80 hover:bg-white border-gray-200" />
            <CarouselNext className="right-4 bg-white/80 hover:bg-white border-gray-200" />
          </div>
        </Carousel>
      </div>

      <Carousel
        setApi={setThumbApi}
        opts={{ align: "start", dragFree: true, containScroll: "keepSnaps" }}
        className="w-full"
      >
        <CarouselContent className="-ml-2 pb-1">
          {images.map((image, index) => (
            <CarouselItem key={index} className="pl-2 basis-1/4 sm:basis-1/5 md:basis-1/6">
              <button
                onClick={() => onThumbClick(index)}
                className={cn(
                  "relative aspect-square w-full overflow-hidden rounded-md border-2 bg-white transition-all duration-200",
                  selectedIndex === index
                    ? "border-primary ring-2 ring-primary ring-offset-2 opacity-100"
                    : "border-transparent opacity-60 hover:opacity-100 hover:border-gray-300"
                )}
              >
                <Image 
                  src={`/${image}`} 
                  alt={`Thumbnail ${index + 1}`} 
                  fill 
                  className="object-contain p-2" 
                />
              </button>
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
    </div>
  );
}