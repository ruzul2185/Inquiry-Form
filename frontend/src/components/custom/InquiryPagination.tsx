import React from "react";

import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

interface InquiryPaginationProps {
  page: number;
  totalPages: number;
  total: number;
  onPageChange: (page: number) => void;
}

const InquiryPagination: React.FC<InquiryPaginationProps> = ({
  page,
  totalPages,
  total,
  onPageChange,
}) => {
  return (
    <div className="mt-4 flex flex-col items-center space-y-2">
      <div className="text-sm text-muted-foreground">
        Page {page} of {totalPages} | Total inquiries: {total}
      </div>

      <Pagination>
        <PaginationPrevious
          onClick={() => onPageChange(page - 1)}
          className={page === 1 ? "opacity-50 pointer-events-none" : ""}
        >
          Previous
        </PaginationPrevious>

        <PaginationContent>
          {page > 2 && (
            <>
              <PaginationItem onClick={() => onPageChange(1)}>
                <PaginationLink>1</PaginationLink>
              </PaginationItem>
              {page > 3 && <PaginationEllipsis />}
            </>
          )}

          {page > 1 && (
            <PaginationItem onClick={() => onPageChange(page - 1)}>
              <PaginationLink>{page - 1}</PaginationLink>
            </PaginationItem>
          )}

          <PaginationItem>
            <PaginationLink className="active">{page}</PaginationLink>
          </PaginationItem>

          {page < totalPages && (
            <PaginationItem onClick={() => onPageChange(page + 1)}>
              <PaginationLink>{page + 1}</PaginationLink>
            </PaginationItem>
          )}

          {page < totalPages - 1 && (
            <>
              {page < totalPages - 2 && <PaginationEllipsis />}
              <PaginationItem onClick={() => onPageChange(totalPages)}>
                <PaginationLink>{totalPages}</PaginationLink>
              </PaginationItem>
            </>
          )}
        </PaginationContent>

        <PaginationNext
          onClick={() => onPageChange(page + 1)}
          className={page === totalPages ? "opacity-50 pointer-events-none" : ""}
        >
          Next
        </PaginationNext>
      </Pagination>
    </div>
  );
};

export default InquiryPagination;
