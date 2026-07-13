import { useState, useMemo, useCallback, useEffect } from "react";

/**
 * Custom React hook to manage frontend pagination of a dataset.
 * Handles bounds checking, dynamic page resizing, and resets to page 1 automatically.
 *
 * @template T
 * @param {T[]} data - Array of objects to paginate.
 * @param {number} [initialPageSize=10] - Initial number of items per page.
 * @returns {{
 *   currentPage: number,
 *   totalPages: number,
 *   paginatedData: T[],
 *   pageSize: number,
 *   setPage: (page: number | ((prev: number) => number)) => void,
 *   nextPage: () => void,
 *   previousPage: () => void,
 *   firstPage: () => void,
 *   lastPage: () => void,
 *   setPageSize: (size: number) => void
 * }} Pagination controller API
 */
const usePagination = (data, initialPageSize = 10) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(initialPageSize);

  // Safely default to an empty array if data is not array-like
  const safeData = useMemo(() => (Array.isArray(data) ? data : []), [data]);

  // Reset to page 1 when dataset or page size changes
  useEffect(() => {
    setCurrentPage(1);
  }, [safeData, pageSize]);

  // Calculate total pages automatically
  const totalPages = useMemo(() => {
    const total = Math.ceil(safeData.length / pageSize);
    return total > 0 ? total : 1;
  }, [safeData, pageSize]);

  // Clamp current page to valid bounds for rendering
  const displayedPage = useMemo(() => {
    return Math.min(Math.max(currentPage, 1), totalPages);
  }, [currentPage, totalPages]);

  // Slice paginated items safely without mutating original dataset
  const paginatedData = useMemo(() => {
    const startIndex = (displayedPage - 1) * pageSize;
    return safeData.slice(startIndex, startIndex + pageSize);
  }, [safeData, displayedPage, pageSize]);

  // Navigation handlers
  const setPage = useCallback(
    (page) => {
      setCurrentPage((prev) => {
        const targetPage = typeof page === "function" ? page(prev) : page;
        return Math.min(Math.max(targetPage, 1), totalPages);
      });
    },
    [totalPages]
  );

  const nextPage = useCallback(() => {
    setCurrentPage((prev) => Math.min(prev + 1, totalPages));
  }, [totalPages]);

  const previousPage = useCallback(() => {
    setCurrentPage((prev) => Math.max(prev - 1, 1));
  }, []);

  const firstPage = useCallback(() => {
    setCurrentPage(1);
  }, []);

  const lastPage = useCallback(() => {
    setCurrentPage(totalPages);
  }, [totalPages]);

  return {
    currentPage: displayedPage,
    totalPages,
    paginatedData,
    pageSize,
    setPage,
    nextPage,
    previousPage,
    firstPage,
    lastPage,
    setPageSize,
  };
};

export default usePagination;
