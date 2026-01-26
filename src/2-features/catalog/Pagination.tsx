"use client";

import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/shared/ui/pagination";

interface Props {
  totalItems: number;
  perPage: number;
  currentPage: number;
  onPageChange: (page: number) => void;
}

export const PaginationComponent = ({ 
  totalItems, 
  perPage, 
  currentPage, 
  onPageChange 
}: Props) => {
  const totalPages = Math.ceil(totalItems / perPage);

  if (totalPages <= 1) return null;

  const generatePageNumbers = () => {
    const pages = [];
    const maxVisible = 5;

    if (totalPages <= maxVisible) {
      for (let i = 1; i <= totalPages; i++) pages.push(i);
    } else {
      if (currentPage <= 3) {
        pages.push(1, 2, 3, "...", totalPages);
      } else if (currentPage >= totalPages - 2) {
        pages.push(1, "...", totalPages - 2, totalPages - 1, totalPages);
      } else {
        pages.push(1, "...", currentPage - 1, currentPage, currentPage + 1, "...", totalPages);
      }
    }
    return pages;
  };

  const handleClick = (e: React.MouseEvent, page: number) => {
    e.preventDefault();
    if (page >= 1 && page <= totalPages) {
      onPageChange(page);
    }
  };

  const allPages = generatePageNumbers();

  return (
    <Pagination className="mt-8">
      <PaginationContent>
        
        <PaginationItem>
          <PaginationPrevious 
            href="#" 
            onClick={(e) => handleClick(e, currentPage - 1)}
            aria-disabled={currentPage <= 1}
            className={currentPage <= 1 ? "pointer-events-none opacity-50" : "cursor-pointer"}
          />
        </PaginationItem>

        {allPages.map((page, index) => {
          if (page === "...") {
            return (
              <PaginationItem key={`ellipsis-${index}`}>
                <PaginationEllipsis />
              </PaginationItem>
            );
          }

          const pageNumber = Number(page);
          
          return (
            <PaginationItem key={page}>
              <PaginationLink
                href="#"
                isActive={currentPage === pageNumber}
                onClick={(e) => handleClick(e, pageNumber)}
                className="cursor-pointer"
              >
                {page}
              </PaginationLink>
            </PaginationItem>
          );
        })}

        <PaginationItem>
          <PaginationNext 
            href="#" 
            onClick={(e) => handleClick(e, currentPage + 1)}
            aria-disabled={currentPage >= totalPages}
            className={currentPage >= totalPages ? "pointer-events-none opacity-50" : "cursor-pointer"}
          />
        </PaginationItem>

      </PaginationContent>
    </Pagination>
  );
};