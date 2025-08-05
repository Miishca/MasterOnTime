import React from 'react';
import styles from './Pagination.module.scss';
import { BiChevronLeft, BiChevronRight } from 'react-icons/bi';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  onPageChange,
}) => {
  if (totalPages <= 1) return null;

  const nextPage = currentPage + 1;
  const showEllipsis =
    nextPage < totalPages - 1 && currentPage < totalPages - 1;

  return (
    <div className={styles.pagination}>
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className={styles.pageButton}
      >
        <BiChevronLeft />
      </button>
      <button
        onClick={() => onPageChange(currentPage)}
        className={`${styles.pageButton} ${styles.active}`}
      >
        {currentPage}
      </button>
      {nextPage <= totalPages && nextPage < totalPages && (
        <button
          onClick={() => onPageChange(nextPage)}
          className={styles.pageButton}
        >
          {nextPage}
        </button>
      )}
      {showEllipsis && <span className={styles.ellipsis}>...</span>}
      {totalPages > currentPage && (
        <button
          onClick={() => onPageChange(totalPages)}
          className={`${styles.pageButton} ${currentPage === totalPages ? styles.active : ''}`}
        >
          {totalPages}
        </button>
      )}
      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className={styles.pageButton}
      >
        <BiChevronRight />
      </button>
    </div>
  );
};

export default Pagination;
