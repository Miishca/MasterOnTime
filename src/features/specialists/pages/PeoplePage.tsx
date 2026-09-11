import { useEffect, useRef, useState } from 'react';
import Footer from '../../../components/Layout/Footer';
import Header from '../../../components/Layout/Header';
import SearchBar from '../components/SearchBar';
import SpecialistsGrid from '../components/SpecialistsGrid';
import styles from './PeoplePage.module.scss';
import imageMap from '../../../utils/imageLoader';
import { type LocationState, type SpecialistsSearchFilters } from '../../../types';
import { useLocation } from 'react-router-dom';

// 5 фіксовані категорії з макета. Спеціалісти самі назвають свої категорії
// довільно (через "Services & pricing" на /profile), тому збіг з цими
// назвами станеться лише якщо хтось назве категорію так само буквально.
// Це справжній фільтр (той самий `categories`, що й у пошуковому барі) —
// просто поки що по ньому може нічого не знайтися, доки специалісти не
// почнуть використовувати ці саме назви (або поки ми не введемо єдиний
// фіксований список категорій замість вільного тексту в ServicesManager).
const INDUSTRY_CATEGORIES = [
  'Home & Garden',
  'Health & Wellbeing',
  'Weddings & Events',
  'Business Services',
  'Lessons & Training',
];

const PeoplePage: React.FC = () => {
  const [filters, setFilters] = useState<SpecialistsSearchFilters>({});
  const gridRef = useRef<HTMLDivElement>(null);
  const location = useLocation();

  useEffect(() => {
    const { serviceName, scrollToGrid } = (location.state as LocationState) || {};
    if (serviceName) {
      setFilters((prev) => ({ ...prev, serviceName }));
    }

    if (scrollToGrid && gridRef.current) {
      gridRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }, [location.state]);

  const handleSearch = (next: SpecialistsSearchFilters) => {
    setFilters(next);
  };

  const handleCategoryClick = (category: string) => {
    setFilters((prev) => {
      const active = prev.categories?.[0] === category;
      const { categories: _drop, ...rest } = prev;
      return active ? rest : { ...rest, categories: [category] };
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
            {INDUSTRY_CATEGORIES.map((category) => (
              <h2
                key={category}
                onClick={() => handleCategoryClick(category)}
                className={
                  filters.categories?.[0] === category ? styles.activeCategory : ''
                }
              >
                {category}
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
