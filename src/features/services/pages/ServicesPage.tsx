import Footer from '../../../components/Layout/Footer';
import Header from '../../../components/Layout/Header';
import type { SearchFilters } from '../../../types';
import DiscoverSection from '../../specialists/components/DiscoverSection';
import SearchBar from '../../specialists/components/SearchBar';
import ServiceCarousel from '../../specialists/components/ServiceCarousel';
import styles from './ServicesPage.module.scss';

const ServicesPage: React.FC = () => {
  const handleSearch = (filters: SearchFilters) => {
    console.log('Search filters:', filters);
  }
  return (
    <div className={styles.container}>
      <Header />
      <SearchBar onSearch={handleSearch} pageType="services" />
      <div className={styles.galleryCarousel}>
        <h1>Book the perfect professional in just a few clicks!</h1>
        <ServiceCarousel />
        <p>
          Welcome to MasterOnTime – your ultimate platform for quick and
          convenient service booking. Forget long searches and tedious
          coordination. We've created an intuitive service that allows you to
          instantly find and book appointments with trusted professionals in any
          field.
        </p>
      </div>
      <DiscoverSection />
      <Footer />
    </div>
  );
};

export default ServicesPage;
