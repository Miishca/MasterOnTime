import Header from '../components/Layout/Header';
import Footer from '../components/Layout/Footer';
import styles from './ProfilePage.module.scss';
import { Link, useLocation, useParams } from 'react-router-dom';
import ProfileSection from '../features/specialists/components/ProfileSection';
import { useEffect, useState } from 'react';
import ProfileContent from '../features/specialists/components/ProfileContent';
import type { Specialist } from '../types';
import { getSpecialists } from '../features/specialists/services/specialistsApi';

const ProfilePage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [specialist, setSpecialist] = useState<Specialist | null>(null);
  const location = useLocation();

  useEffect(() => {
    const fetchData = async () => {
      const data  = await getSpecialists();
      const found = data.find((s) => s.id.toString() === id);
      setSpecialist(found || null);
    };
    fetchData();
  }, [id]);

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

  if (!specialist) {
    return (
      <div className={styles.container}>
        <Header />
        <div className={styles.loaderContainer}>
          <div className={styles.spinner}></div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <Header />
      <Link to="/people" className={styles.backLink}>
        &lt; People
      </Link>
      <ProfileSection specialist={specialist} />
      <ProfileContent specialist={specialist} />
      <Footer />
    </div>
  );
};

export default ProfilePage;
