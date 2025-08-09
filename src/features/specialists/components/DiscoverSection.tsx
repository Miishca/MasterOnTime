import { useNavigate } from 'react-router-dom';
import imageMap from '../../../utils/imageLoader';
import styles from './DiscoverSection.module.scss';

const DiscoverSection: React.FC = () => {
  const navigate = useNavigate();

  const handleServiceClick = (tag: string) => {
    const filterTag = tag.toLowerCase().replace(/-/g, ' ');
    navigate('/people', { state: { filterTag, scrollToGrid: true } });
  };
  return (
    <div className={styles.discover}>
      <h1>Discover</h1>

      <nav className={styles.discoverContent}>
        <a href="#home-garden" className={styles.discoverLink}>
          <img src={imageMap['discover1']} alt="Home & Garden" />
          <h4>Home & Garden</h4>
        </a>
        <a href="#health-wellbeing" className={styles.discoverLink}>
          <img src={imageMap['discover2']} alt="Health & Wellbeing" />
          <h4>Health & Wellbeing</h4>
        </a>
        <a href="#business-services" className={styles.discoverLink}>
          <img src={imageMap['discover3']} alt="Business Services" />
          <h4>Business Services</h4>
        </a>
        <a href="#weddings-events" className={styles.discoverLink}>
          <img src={imageMap['discover4']} alt="Weddings & Events" />
          <h4>Weddings & Events</h4>
        </a>
        <a href="#lessons-training" className={styles.discoverLink}>
          <img src={imageMap['discover5']} alt="Lessons & Training" />
          <h4>Lessons & Training</h4>
        </a>
      </nav>
      <section id="home-garden" className={styles.section}>
        <h2>Home & Garden</h2>
        <div className={styles.cardGrid}>
          <a
            href="/services/house-cleaning"
            className={styles.serviceCard}
            onClick={(e) => {
              e.preventDefault();
              handleServiceClick('house-cleaning');
            }}
          >
            <img src={imageMap['service-home1']} alt="House Cleaning" />
          </a>
          <a
            href="/services/gardening"
            className={styles.serviceCard}
            onClick={(e) => {
              e.preventDefault();
              handleServiceClick('gardening');
            }}
          >
            <img src={imageMap['service-home2']} alt="Gardening" />
          </a>
          <a
            href="/services/handyman"
            className={styles.serviceCard}
            onClick={(e) => {
              e.preventDefault();
              handleServiceClick('handyman');
            }}
          >
            <img src={imageMap['service-home3']} alt="Handyman Services" />
          </a>
          <a
            href="/services/furniture-assembly"
            className={styles.serviceCard}
            onClick={(e) => {
              e.preventDefault();
              handleServiceClick('furniture-assembly');
            }}
          >
            <img src={imageMap['service-home4']} alt="Furniture Assembly" />
          </a>
        </div>
      </section>

      <section id="health-wellbeing" className={styles.section}>
        <h2>Health & Wellbeing</h2>
        <div className={styles.cardGrid}>
          <a
            href="/services/massage-therapy"
            className={styles.serviceCard}
            onClick={(e) => {
              e.preventDefault();
              handleServiceClick('massage-therapy');
            }}
          >
            <img src={imageMap['service-health1']} alt="Massage Therapy" />
          </a>
          <a
            href="/services/personal-training"
            className={styles.serviceCard}
            onClick={(e) => {
              e.preventDefault();
              handleServiceClick('personal-training');
            }}
          >
            <img src={imageMap['service-health2']} alt="Personal Training" />
          </a>
          <a
            href="/services/nutrition"
            className={styles.serviceCard}
            onClick={(e) => {
              e.preventDefault();
              handleServiceClick('nutrition-consulting');
            }}
          >
            <img src={imageMap['service-health3']} alt="Nutrition Consulting" />
          </a>
          <a
            href="/services/emotional-wellness"
            className={styles.serviceCard}
            onClick={(e) => {
              e.preventDefault();
              handleServiceClick('emotional-wellness');
            }}
          >
            <img src={imageMap['service-health4']} alt="Emotional Wellness" />
          </a>
        </div>
      </section>

      <section id="business-services" className={styles.section}>
        <h2>Business Services</h2>
        <div className={styles.cardGrid}>
          <a
            href="/services/accounting"
            className={styles.serviceCard}
            onClick={(e) => {
              e.preventDefault();
              handleServiceClick('accounting-help');
            }}
          >
            <img
              src={imageMap['service-business1']}
              alt="Accounting & Tax Help"
            />
          </a>
          <a
            href="/services/it-support"
            className={styles.serviceCard}
            onClick={(e) => {
              e.preventDefault();
              handleServiceClick('it-support');
            }}
          >
            <img src={imageMap['service-business2']} alt="IT Support" />
          </a>
          <a
            href="/services/business-consulting"
            className={styles.serviceCard}
            onClick={(e) => {
              e.preventDefault();
              handleServiceClick('business-consulting');
            }}
          >
            <img
              src={imageMap['service-business3']}
              alt="Business Consulting"
            />
          </a>
          <a
            href="/services/legal-assistance"
            className={styles.serviceCard}
            onClick={(e) => {
              e.preventDefault();
              handleServiceClick('legal-assistance');
            }}
          >
            <img src={imageMap['service-business4']} alt="Legal Assistance" />
          </a>
        </div>
      </section>

      <section id="weddings-events" className={styles.section}>
        <h2>Weddings & Events</h2>
        <div className={styles.cardGrid}>
          <a
            href="/services/event-photography"
            className={styles.serviceCard}
            onClick={(e) => {
              e.preventDefault();
              handleServiceClick('event-photography');
            }}
          >
            <img src={imageMap['service-events1']} alt="Event Photography" />
          </a>
          <a
            href="/services/makeup"
            className={styles.serviceCard}
            onClick={(e) => {
              e.preventDefault();
              handleServiceClick('makeup-styling');
            }}
          >
            <img
              src={imageMap['service-events2']}
              alt="Makeup & Hair Styling"
            />
          </a>
          <a
            href="/services/event-planning"
            className={styles.serviceCard}
            onClick={(e) => {
              e.preventDefault();
              handleServiceClick('event-planning');
            }}
          >
            <img src={imageMap['service-events3']} alt="Event Planning" />
          </a>
          <a
            href="/services/catering"
            className={styles.serviceCard}
            onClick={(e) => {
              e.preventDefault();
              handleServiceClick('catering-services');
            }}
          >
            <img src={imageMap['service-events4']} alt="Catering Services" />
          </a>
        </div>
      </section>

      <section id="lessons-training" className={styles.section}>
        <h2>Lessons & Training</h2>
        <div className={styles.cardGrid}>
          <a
            href="/services/language-lessons"
            className={styles.serviceCard}
            onClick={(e) => {
              e.preventDefault();
              handleServiceClick('language-lessons');
            }}
          >
            <img src={imageMap['service-lessons1']} alt="Language Lessons" />
          </a>
          <a
            href="/services/music-lessons"
            className={styles.serviceCard}
            onClick={(e) => {
              e.preventDefault();
              handleServiceClick('music-lessons');
            }}
          >
            <img src={imageMap['service-lessons2']} alt="Music Lessons" />
          </a>
          <a
            href="/services/online-courses"
            className={styles.serviceCard}
            onClick={(e) => {
              e.preventDefault();
              handleServiceClick('online-courses');
            }}
          >
            <img src={imageMap['service-lessons3']} alt="Online Courses" />
          </a>
          <a
            href="/services/coding-training"
            className={styles.serviceCard}
            onClick={(e) => {
              e.preventDefault();
              handleServiceClick('coding-training');
            }}
          >
            <img src={imageMap['service-lessons4']} alt="Coding Training" />
          </a>
        </div>
      </section>
    </div>
  );
};

export default DiscoverSection;
