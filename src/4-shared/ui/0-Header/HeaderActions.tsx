import { cn } from "@/lib/utils";
import {HeaderNavbar} from "./";

export function HeaderActions({className}: {className?: string}) {
  return (
    <div className={cn('', className)}>
      <HeaderNavbar />

    </div>
  );
}