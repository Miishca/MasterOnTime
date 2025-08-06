import { useRef, useState } from 'react';
import Footer from '../../../components/Layout/Footer';
import Header from '../../../components/Layout/Header';
import SearchBar from '../components/SearchBar';
import SpecialistsGrid from '../components/SpecialistsGrid';
import styles from './PeoplePage.module.scss';
import imageMap from '../../../utils/imageLoader';
import { type SearchFilters } from '../../../types';

const PeoplePage: React.FC = () => {
  const [filters, setFilters] = useState<SearchFilters>({ name: '', city: '', experience: '', rating: ''});
  const gridRef = useRef<HTMLDivElement>(null); 

  const handleSearch = (newFilters: SearchFilters) => {
    setFilters(newFilters);
  };
  const handleCategoryClick = (category: string) => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      category: prevFilters.category === category ? '' : category,
    }));
    if (gridRef.current) {
      gridRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <div className={styles.container}>
      <Header />
      <SearchBar onSearch={handleSearch} pageType="people" />
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
        <h1>Got lost in the industries?</h1>
        <div className={styles.findIndustriesContent}>
          <img src={imageMap['find-industries']} alt="Find industries" />
          <div className={styles.contentHeaders}>
            <h2
              onClick={() => handleCategoryClick('Home & Garden')}
              className={filters.category === 'Home & Garden' ? styles.activeCategory : ''}
            >
              Home & Garden
            </h2>
            <h2
              onClick={() => handleCategoryClick('Health & Wellbeing')}
              className={filters.category === 'Health & Wellbeing' ? styles.activeCategory : ''}
            >
              Health & Wellbeing
            </h2>
            <h2
              onClick={() => handleCategoryClick('Weddings & Events')}
              className={filters.category === 'Weddings & Events' ? styles.activeCategory : ''}
            >
              Weddings & Events
            </h2>
            <h2
              onClick={() => handleCategoryClick('Business Services')}
              className={filters.category === 'Business Services' ? styles.activeCategory : ''}
            >
              Business Services
            </h2>
            <h2
              onClick={() => handleCategoryClick('Lessons & Training')}
              className={filters.category === 'Lessons & Training' ? styles.activeCategory : ''}
            >
              Lessons & Training
            </h2>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default PeoplePage;
