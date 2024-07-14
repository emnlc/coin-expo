import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
  PaginationEllipsis,
} from "@/components/ui/pagination";

interface Props {
  rowsPerPage: number;
  totalRows: number; // New prop to specify the total number of rows
  startIndex: number;
  setStartIndex: (starIndex: number) => void;

  endIndex: number;
  setEndIndex: (endIndex: number) => void;
}

const CoinTablePagination = (props: Props) => {
  const totalPages = Math.ceil(props.totalRows / props.rowsPerPage);
  const currentPage = Math.ceil(props.startIndex / props.rowsPerPage) + 1;

  const handlePageClick = (pageNumber: number) => {
    const newStartIndex = (pageNumber - 1) * props.rowsPerPage;
    const newEndIndex = newStartIndex + props.rowsPerPage;
    window.scrollTo({ top: 0, behavior: "smooth" });
    props.setStartIndex(newStartIndex);
    props.setEndIndex(newEndIndex);
  };

  const renderPaginationItems = () => {
    const pages = [];

    // Always show the first page
    pages.push(
      <PaginationItem key={1}>
        <PaginationLink
          className={`${
            currentPage === 1
              ? "bg-gray-200"
              : "bg-white dark:bg-neutral-900 dark:text-white hover:opacity-80 "
          }`}
          onClick={() => handlePageClick(1)}
        >
          1
        </PaginationLink>
      </PaginationItem>
    );

    // Show the ellipsis and middle pages
    if (currentPage <= 3) {
      for (let i = 2; i <= 4 && i < totalPages; i++) {
        pages.push(
          <PaginationItem key={i}>
            <PaginationLink
              className={`${
                currentPage === i
                  ? "bg-gray-200"
                  : "bg-white dark:bg-neutral-900 dark:text-white hover:opacity-80"
              }`}
              onClick={() => handlePageClick(i)}
            >
              {i}
            </PaginationLink>
          </PaginationItem>
        );
      }
      if (totalPages > 4) {
        pages.push(
          <PaginationItem key="end-ellipsis">
            <PaginationEllipsis className="text-black dark:text-white" />
          </PaginationItem>
        );
      }
    } else if (currentPage > 3 && currentPage < totalPages - 2) {
      pages.push(
        <PaginationItem key="start-ellipsis">
          <PaginationEllipsis className="text-black dark:text-white" />
        </PaginationItem>
      );
      for (
        let i = currentPage - 1;
        i <= currentPage + 1 && i < totalPages;
        i++
      ) {
        pages.push(
          <PaginationItem key={i}>
            <PaginationLink
              className={`${
                currentPage === i
                  ? "bg-gray-200"
                  : "bg-white dark:bg-neutral-900 dark:text-white hover:opacity-80"
              }`}
              onClick={() => handlePageClick(i)}
            >
              {i}
            </PaginationLink>
          </PaginationItem>
        );
      }
      pages.push(
        <PaginationItem key="end-ellipsis">
          <PaginationEllipsis className="text-black dark:text-white" />
        </PaginationItem>
      );
    } else {
      pages.push(
        <PaginationItem key="start-ellipsis">
          <PaginationEllipsis className="text-black dark:text-white" />
        </PaginationItem>
      );
      for (let i = totalPages - 3; i < totalPages; i++) {
        pages.push(
          <PaginationItem key={i}>
            <PaginationLink
              className={`${
                currentPage === i
                  ? "bg-gray-200"
                  : "bg-white dark:bg-neutral-900 dark:text-white hover:opacity-80"
              }`}
              onClick={() => handlePageClick(i)}
            >
              {i}
            </PaginationLink>
          </PaginationItem>
        );
      }
    }

    if (totalPages > 1) {
      pages.push(
        <PaginationItem key={totalPages}>
          <PaginationLink
            className={`${
              currentPage === totalPages
                ? "bg-gray-200"
                : "bg-white dark:bg-neutral-900 dark:text-white hover:opacity-80"
            }`}
            onClick={() => handlePageClick(totalPages)}
          >
            {totalPages}
          </PaginationLink>
        </PaginationItem>
      );
    }

    return pages;
  };

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
              if (currentPage > 1) {
                handlePageClick(currentPage - 1);
              }
            }}
          />
        </PaginationItem>

        {renderPaginationItems()}

        <PaginationItem>
          <PaginationNext
            className={`${
              props.endIndex >= props.totalRows
                ? "pointer-events-none opacity-50"
                : undefined
            } bg-white dark:bg-neutral-900 dark:text-white hover:opacity-80`}
            onClick={() => {
              if (currentPage < totalPages) {
                handlePageClick(currentPage + 1);
              }
            }}
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
};

export default CoinTablePagination;
