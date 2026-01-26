import { Button } from "../Buttons/button";

interface AddButtonProps {
  onClick?: () => void;
  isSelected?: boolean;
  className?: string;
}

export function AddButton({ onClick, isSelected, className }: AddButtonProps) {
  return (
    <Button
      onClick={onClick}
      variant={isSelected ? "secondary" : "default"} 
      className={`w-full font-bold ${className}`}
    >
      {isSelected ? "Added to cart" : "Add to cart"}
    </Button>
  );
}