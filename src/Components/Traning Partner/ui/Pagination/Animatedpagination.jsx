import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from "@/components(shadcn)/ui/pagination";
import { useTransition } from "react";

 export const  AnimatedPagination = ({ totalPages, currentPage, onPageChange }) => {
    const [isPending, startTransition] = useTransition();
  
    const paginate = (pageNumber) => {
      startTransition(() => {
        onPageChange(pageNumber);
      });
    };
  
    return (
      <Pagination>
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious
              onClick={() => paginate(currentPage - 1)}
              className={`transition-opacity duration-300 ${isPending ? 'opacity-50' : 'opacity-100'}`}
            />
          </PaginationItem>
          {[...Array(totalPages)].map((_, index) => (
            <PaginationItem key={index}>
              <PaginationLink
                onClick={() => paginate(index + 1)}
                isActive={currentPage === index + 1}
                className={`transition-all duration-300 ${
                  isPending ? 'opacity-50 scale-95' : 'opacity-100 scale-100'
                }`}
              >
                {index + 1}
              </PaginationLink>
            </PaginationItem>
          ))}
          <PaginationItem>
            <PaginationNext
              onClick={() => paginate(currentPage + 1)}
              className={`transition-opacity duration-300 ${isPending ? 'opacity-50' : 'opacity-100'}`}
            />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    );
  };