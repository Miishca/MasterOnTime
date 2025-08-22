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
    setCurrentPage(1);
    const fetchSpecialists = async () => {
      const response = await getSpecialists();
      const filteredSpecialists = response || [];
      setSpecialists(filteredSpecialists);
      setTotalPages(Math.ceil(filteredSpecialists.length / itemsPerPage));
    };
    fetchSpecialists();
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
        {paginatedSpecialists.map((specialist) => (
          <SpecialistCard
            key={specialist.id}
            id={specialist.id}
            firstName={specialist.firstName}
            profession={specialist.profession}
            city={specialist.city}
            tags={specialist.tags}
            image={specialist.image}
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
