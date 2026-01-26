import { Button } from "../Buttons/button";
import { Heart } from "lucide-react";
import { cn } from "@/lib/utils";

type Props = {
  onClick?: (e: React.MouseEvent) => void;
  filled?: boolean;
  className?: string;
};

export function LikeButton({ onClick, filled = false, className }: Props) {
  return (
    <Button
      variant="ghost" 
      size="icon"
      onClick={onClick}
      className={cn("hover:bg-transparent", className)}
    >
      <Heart
        className={cn(
          "h-6 w-6 transition-all duration-200",
          filled 
            ? "fill-[#F4BA47] text-[#F4BA47]"
            : " hover:text-[#F4BA47]"
        )}
      />
    </Button>
  );
}