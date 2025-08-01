import Footer from '../components/Layout/Footer';
import Header from '../components/Layout/Header';
import styles from './ProfilePage.module.scss';

const ProfilePage: React.FC = () => {
  return (
    <div className={styles.container}>
      <Header />
      <Footer />
    </div>
  );
};

export default ProfilePage;
