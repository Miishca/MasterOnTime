import Footer from '../components/Layout/Footer';
import Header from '../components/Layout/Header';
import styles from './SpecialistProfile.module.scss'

const SpecialistProfile: React.FC = () => {
  return (
    <div className={styles.container}>
      <Header />
      <Footer />
    </div>
  );
};

export default SpecialistProfile;
