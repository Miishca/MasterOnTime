import Header from '../components/Layout/Header';
import Footer from '../components/Layout/Footer';
import styles from './ProfilePage.module.scss';
import { Link, useLocation } from 'react-router-dom';
import ProfileSection from '../features/specialists/components/ProfileSection';
import { useEffect } from 'react';

const ProfilePage: React.FC = () => {
  const location = useLocation();

  useEffect(() => {
    const state = location.state as { scrollToTop?: boolean } | null;

    if (state && state.scrollToTop) {
      window.scrollTo({
        top: 0,
        behavior: 'smooth',
      });

      window.history.replaceState({}, document.title);
    }
  }, [location.state]);

  return (
    <div className={styles.container}>
      <Header />
      <Link to="/people" className={styles.backLink}>
        &lt; People
      </Link>
      <ProfileSection />
      <Footer />
    </div>
  );
};

export default ProfilePage;
