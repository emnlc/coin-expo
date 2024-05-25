import React from "react";

import {
  Pagination,
  PaginationContent,
  //   PaginationEllipsis,
  PaginationItem,
  //   PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

interface Props {
  rowsPerPage: number;
  startIndex: number;
  setStartIndex: (starIndex: number) => void;

  endIndex: number;
  setEndIndex: (endIndex: number) => void;
}

const CoinTablePagination = (props: Props) => {
  return (
    <Pagination>
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious
            className={
              props.startIndex === 0
                ? "pointer-events-none opacity-50"
                : undefined
            }
            onClick={() => {
              window.scrollTo({ top: 0, behavior: "smooth" });
              props.setStartIndex(props.startIndex - props.rowsPerPage);
              props.setEndIndex(props.endIndex - props.rowsPerPage);
            }}
          ></PaginationPrevious>
        </PaginationItem>

        <PaginationItem>
          <PaginationNext
            className={
              props.endIndex === 1000
                ? "pointer-events-none opacity-50"
                : undefined
            }
            onClick={() => {
              window.scrollTo({ top: 0, behavior: "smooth" });
              props.setStartIndex(props.startIndex + props.rowsPerPage);
              props.setEndIndex(props.endIndex + props.rowsPerPage);
            }}
          ></PaginationNext>
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
};

export default CoinTablePagination;
