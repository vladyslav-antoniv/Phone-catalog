"use client";

import { useRouter } from "next/navigation";
import { ChevronLeft } from "lucide-react";
import { Button } from "../Buttons/button";

export function BackButton() {
  const router = useRouter();

  return (
    <Button 
      variant="ghost" 
      onClick={() => router.back()}
      className="pl-0 text-gray-500 hover:text-gray-900 hover:bg-transparent gap-1"
    >
      <ChevronLeft className="h-4 w-4" />
      <span className="font-medium">Back</span>
    </Button>
  );
}