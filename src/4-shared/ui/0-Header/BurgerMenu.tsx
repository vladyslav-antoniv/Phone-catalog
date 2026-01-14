import { Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";

export function BurgerMenu({
  className,
  onClick,
  isOpen,
}: {
  className?: string;
  onClick?: () => void;
  isOpen?: boolean;
}) {
  return (
    <div className={cn("", className)} onClick={onClick}>
      {isOpen ? <X /> : <Menu />}
    </div>
  );
}
