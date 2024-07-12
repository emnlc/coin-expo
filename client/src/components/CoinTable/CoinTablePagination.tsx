import {
  Pagination,
  PaginationContent,
  PaginationItem,
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
    <Pagination className="mt-8">
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious
            className={`${
              props.startIndex === 0
                ? "pointer-events-none opacity-50"
                : undefined
            } bg-white dark:bg-neutral-900 dark:text-white hover:opacity-80`}
            onClick={() => {
              window.scrollTo({ top: 0, behavior: "smooth" });
              props.setStartIndex(props.startIndex - props.rowsPerPage);
              props.setEndIndex(props.endIndex - props.rowsPerPage);
            }}
          ></PaginationPrevious>
        </PaginationItem>

        <PaginationItem>
          <PaginationNext
            className={`${
              props.endIndex === 500
                ? "pointer-events-none opacity-50"
                : undefined
            } bg-white dark:bg-neutral-900 dark:text-white hover:opacity-80`}
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
