import styles from './DiscoverSection.module.scss';

const DiscoverSection: React.FC = () => {
  return (
    <div className={styles.discover}>
      <h1>Discover</h1>

      <nav className={styles.discoverContent}>
        <a href="#home-garden" className={styles.discoverLink}>
          <img src="/src/assets/discover1.png" alt="Home & Garden" />
          <h4>Home & Garden</h4>
        </a>
        <a href="#health-wellbeing" className={styles.discoverLink}>
          <img src="/src/assets/discover2.png" alt="Health & Wellbeing" />
          <h4>Health & Wellbeing</h4>
        </a>
        <a href="#business-services" className={styles.discoverLink}>
          <img src="/src/assets/discover3.png" alt="Business Services" />
          <h4>Business Services</h4>
        </a>
        <a href="#weddings-events" className={styles.discoverLink}>
          <img src="/src/assets/discover4.png" alt="Weddings & Events" />
          <h4>Weddings & Events</h4>
        </a>
        <a href="#lessons-training" className={styles.discoverLink}>
          <img src="/src/assets/discover5.png" alt="Lessons & Training" />
          <h4>Lessons & Training</h4>
        </a>
      </nav>
      <section id="home-garden" className={styles.section}>
        <h2>Home & Garden</h2>
        <div className={styles.cardGrid}>
          <a href="/services/house-cleaning" className={styles.serviceCard}>
            <img src="/src/assets/service-home1.png" alt="House Cleaning" />
          </a>
          <a href="/services/gardening" className={styles.serviceCard}>
            <img src="/src/assets/service-home2.png" alt="Gardening" />
          </a>
          <a href="/services/handyman" className={styles.serviceCard}>
            <img src="/src/assets/service-home3.png" alt="Handyman Services" />
          </a>
          <a href="/services/furniture-assembly" className={styles.serviceCard}>
            <img src="/src/assets/service-home4.png" alt="Furniture Assembly" />
          </a>
        </div>
      </section>

      <section id="health-wellbeing" className={styles.section}>
        <h2>Health & Wellbeing</h2>
        <div className={styles.cardGrid}>
          <a href="/services/massage-therapy" className={styles.serviceCard}>
            <img src="/src/assets/service-health1.png" alt="Massage Therapy" />
          </a>
          <a href="/services/personal-training" className={styles.serviceCard}>
            <img
              src="/src/assets/service-health2.png"
              alt="Personal Training"
            />
          </a>
          <a href="/services/nutrition" className={styles.serviceCard}>
            <img src="/src/assets/service-health3.png" alt="Nutrition Consulting" />
          </a>
          <a href="/services/emotional-wellness" className={styles.serviceCard}>
            <img src="/src/assets/service-health4.png" alt="Emotional Wellness" />
          </a>
        </div>
      </section>

      <section id="business-services" className={styles.section}>
        <h2>Business Services</h2>
        <div className={styles.cardGrid}>
          <a href="/services/accounting" className={styles.serviceCard}>
            <img src="/src/assets/service-business1.png" alt="Accounting & Tax Help" />
          </a>
          <a href="/services/it-support" className={styles.serviceCard}>
            <img src="/src/assets/service-business2.png" alt="IT Support" />
          </a>
          <a
            href="/services/business-consulting"
            className={styles.serviceCard}
          >
            <img src="/src/assets/service-business3.png" alt="Business Consulting" />
          </a>
          <a href="/services/legal-assistance" className={styles.serviceCard}>
            <img src="/src/assets/service-business4.png" alt="Legal Assistance" />
          </a>
        </div>
      </section>

      <section id="weddings-events" className={styles.section}>
        <h2>Weddings & Events</h2>
        <div className={styles.cardGrid}>
          <a href="/services/event-photography" className={styles.serviceCard}>
            <img src="/src/assets/service-events1.png" alt="Event Photography" />
          </a>
          <a href="/services/makeup" className={styles.serviceCard}>
            <img src="/src/assets/service-events2.png" alt="Makeup & Hair Styling" />
          </a>
          <a href="/services/event-planning" className={styles.serviceCard}>
            <img src="/src/assets/service-events3.png" alt="Event Planning" />
          </a>
          <a href="/services/catering" className={styles.serviceCard}>
            <img src="/src/assets/service-events4.png" alt="Catering Services" />
          </a>
        </div>
      </section>

      <section id="lessons-training" className={styles.section}>
        <h2>Lessons & Training</h2>
        <div className={styles.cardGrid}>
          <a href="/services/language-lessons" className={styles.serviceCard}>
            <img src="/src/assets/service-lessons1.png" alt="Language Lessons" />
          </a>
          <a href="/services/music-lessons" className={styles.serviceCard}>
            <img src="/src/assets/service-lessons2.png" alt="Music Lessons" />
          </a>
          <a href="/services/online-courses" className={styles.serviceCard}>
            <img src="/src/assets/service-lessons3.png" alt="Online Courses" />
          </a>
          <a href="/services/coding-training" className={styles.serviceCard}>
            <img src="/src/assets/service-lessons4.png" alt="Coding Training" />
          </a>
        </div>
      </section>
    </div>
  );
};

export default DiscoverSection;
