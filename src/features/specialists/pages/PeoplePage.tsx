import Footer from '../../../components/Layout/Footer';
import Header from '../../../components/Layout/Header';
import SearchBar from '../components/SearchBar';
import styles from './PeoplePage.module.scss'

const PeoplePage: React.FC = () => {
  return (
    <div className={styles.container}>
      <Header />
      <SearchBar onSearch={() => {}}/>
      
      <Footer />
    </div>
  )
}

export default PeoplePage;