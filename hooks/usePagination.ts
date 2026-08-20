import { useState } from "react";

interface UsePaginationProps {
  totalCount: number;
  initialPage?: number;
  limit?: number;
}

export const usePagination = ({
  totalCount,
  initialPage = 1,
  limit = 10,
}: UsePaginationProps) => {
    const [currentPage, setCurrentPage] = useState<number>(initialPage);

    const totalPages = Math.ceil(totalCount / limit) || 1;

    const hasNextPage = currentPage < totalPages;
    const hasPrevPage = currentPage > 1;

    const goToNextPage = () => {
        if (hasNextPage) {
        setCurrentPage((prev) => prev + 1);
        }
    };

    const goToPreviousPage = () => {
        if (hasPrevPage) {
        setCurrentPage((prev) => Math.max(prev - 1, 1));
        }
    };

    const resetPage = () => {
        setCurrentPage(1);
    };

    return {
        currentPage,
        totalPages,
        hasNextPage,
        hasPrevPage,
        goToNextPage,
        goToPreviousPage,
        setCurrentPage,
        resetPage,
    };
};
