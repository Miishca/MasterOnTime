import React, { useState, useEffect, useRef } from 'react';
import styles from './SpecialistsGrid.module.scss';
import SpecialistCard from './SpecialistCard';
import { getSpecialists } from '../services/specialistsApi';
import Pagination from './Pagination';
import type { Specialist, SpecialistsGridProps } from '../../../types';

const SpecialistsGrid: React.FC<SpecialistsGridProps> = ({
  filters = {},
  itemsPerPage = 9,
}) => {
  const [specialists, setSpecialists] = useState<Specialist[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Guard against out-of-order responses: if `filters` changes again (or the
    // component unmounts) before this fetch resolves, drop its result instead
    // of letting a stale response clobber a newer, already-applied one.
    let cancelled = false;
    const fetchSpecialists = async () => {
      const response = await getSpecialists(filters);
      if (cancelled) return;
      setSpecialists(response);
      setTotalPages(Math.ceil(response.length / itemsPerPage));
      setCurrentPage(1);
    };
    fetchSpecialists();
    return () => {
      cancelled = true;
    };
  }, [filters, itemsPerPage]);

  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedSpecialists = specialists.slice(
    startIndex,
    startIndex + itemsPerPage
  );

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    if (gridRef.current) {
      gridRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <div className={styles.gridContainer} ref={gridRef}>
      <div className={styles.grid}>
        {paginatedSpecialists.map((spec) => (
          <SpecialistCard
            key={spec.id}
            {...spec}
          />
        ))}
      </div>
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
      />
    </div>
  );
};

export default SpecialistsGrid;
