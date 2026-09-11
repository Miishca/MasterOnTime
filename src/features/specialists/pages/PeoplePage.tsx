import { useEffect, useRef, useState } from 'react';
import Footer from '../../../components/Layout/Footer';
import Header from '../../../components/Layout/Header';
import SearchBar from '../components/SearchBar';
import SpecialistsGrid from '../components/SpecialistsGrid';
import styles from './PeoplePage.module.scss';
import imageMap from '../../../utils/imageLoader';
import {
  INDUSTRIES,
  INDUSTRY_LABELS,
  type Industry,
  type LocationState,
  type SpecialistsSearchFilters,
} from '../../../types';
import { useLocation } from 'react-router-dom';

const PeoplePage: React.FC = () => {
  const [filters, setFilters] = useState<SpecialistsSearchFilters>({});
  const gridRef = useRef<HTMLDivElement>(null);
  const location = useLocation();

  useEffect(() => {
    const { serviceName, industry, scrollToGrid } =
      (location.state as LocationState) || {};
    if (serviceName || industry) {
      setFilters((prev) => ({
        ...prev,
        ...(serviceName ? { serviceName } : {}),
        ...(industry ? { industry } : {}),
      }));
    }

    if (scrollToGrid && gridRef.current) {
      gridRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }, [location.state]);

  const handleSearch = (next: SpecialistsSearchFilters) => {
    setFilters(next);
  };

  // industry — реальне поле в профілі спеціаліста (одна з 5 фіксованих
  // "вітринних" індустрій, обирається на /profile). Клік перемикає фільтр.
  const handleIndustryClick = (industry: Industry) => {
    setFilters((prev) => {
      const { industry: current, ...rest } = prev;
      return current === industry ? rest : { ...rest, industry };
    });
    if (gridRef.current) {
      gridRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <div className={styles.container}>
      <Header />
      <SearchBar onSearch={handleSearch} />
      <h1>Meet Our Professionals</h1>
      <p className={styles.textContent}>
        Browse a diverse community of trusted specialists ready to help you.
        Whether you need a stylist, tutor, trainer, or handyman — explore
        profiles, check reviews, and book the right person for the job in just a
        few clicks.
      </p>
      <div ref={gridRef}>
        <SpecialistsGrid filters={filters} itemsPerPage={9} />
      </div>
      <div className={styles.findIndustries}>
        <h1>Got lost in the industries?</h1>
        <div className={styles.findIndustriesContent}>
          <img src={imageMap['find-industries']} alt="Find industries" />
          <div className={styles.contentHeaders}>
            {INDUSTRIES.map((industry) => (
              <h2
                key={industry}
                onClick={() => handleIndustryClick(industry)}
                className={filters.industry === industry ? styles.activeCategory : ''}
              >
                {INDUSTRY_LABELS[industry]}
              </h2>
            ))}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default PeoplePage;
