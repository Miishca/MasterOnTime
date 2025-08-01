import React from 'react';
import styles from './SpecialistsPage.module.scss';
import Header from '../../../components/Layout/Header';
import Footer from '../../../components/Layout/Footer';
import LandingCarousel from '../components/LandingCarousel';

const SpecialistsPage: React.FC = () => {
  return (
    <div className={styles.container}>
      <Header />
      <div className={styles.imagesSection}>
        <img
          src="/src/assets/image1.png"
          alt="Profession type 1"
          className={styles.image1}
        />
        <img
          src="/src/assets/image2.png"
          alt="Profession type 2"
          className={styles.image2}
        />
        <img
          src="/src/assets/image3.png"
          alt="Profession type 3"
          className={styles.image3}
        />
        <img
          src="/src/assets/image4.png"
          alt="Profession type 4"
          className={styles.image4}
        />
        <img
          src="/src/assets/image5.png"
          alt="Profession type 5"
          className={styles.image5}
        />
        <img
          src="/src/assets/image6.png"
          alt="Profession type 6"
          className={styles.image6}
        />
      </div>
      <div className={styles.hero}>
        <h1>Quick & easy booking</h1>
        <p>
          Book specialists online when it’s convenient for you.
          <br /> Clear pricing, real-time availability, and verified reviews —
          all in one place.
        </p>
      </div>
      <LandingCarousel />
      <div className={styles.howItWorks}>
        <h1>How it works?</h1>
        <div className={styles.howItWorksContent}>
          <div className={styles.step}>
            <img
              src="/src/assets/step1-icon.png"
              alt="Find the master"
              className={styles.stepIcon}
            />
            <h3>Find the master</h3>
            <p>
              Quickly discover trusted professionals — from hair stylists to
              personal trainers — using filters that fit your needs.
            </p>
          </div>
          <div className={styles.step}>
            <img
              src="/src/assets/step2-icon.png"
              alt="View profile"
              className={styles.stepIcon}
            />
            <h3>View profile</h3>
            <p>
              See detailed info about each specialist: services offered, work
              photos, ratings, availability, and more.
            </p>
          </div>
          <div className={styles.step}>
            <img
              src="/src/assets/step3-icon.png"
              alt="Book time"
              className={styles.stepIcon}
            />
            <h3>Book time</h3>
            <p>
              Select a suitable date and time slot and complete your booking in
              just a few clicks — no calls or waiting.
            </p>
          </div>
        </div>
      </div>

      <div className={styles.topRated}>
        <h1>Top Rated Specialists</h1>
        <div className={styles.topRatedContent}>
          <div className={styles.stepTopRated}>
            <img
              src="/src/assets/top-rated1.png"
              alt="Top Rated Specialists Alex"
              className={styles.topRatedIcon}
            />
            <h3>Alex</h3>
            <div className={styles.topRatedText}>
              <span>graphic designer</span>
              <span>logo creation</span>
              <span>branding</span>
            </div>
          </div>
          <div className={styles.stepTopRated}>
            <img
              src="/src/assets/top-rated2.png"
              alt="Top Rated Specialists Mykhailo"
              className={styles.topRatedIcon}
            />
            <h3>Mykhailo</h3>
            <div className={styles.topRatedText}>
              <span>fitness coach</span>
              <span>personal training</span>
              <span>weight loss</span>
            </div>
          </div>
          <div className={styles.stepTopRated}>
            <img
              src="/src/assets/top-rated3.png"
              alt="Top Rated Specialists Daniel"
              className={styles.topRatedIcon}
            />
            <h3>Daniel</h3>
            <div className={styles.topRatedText}>
              <span>photographer</span>
              <span>event photos</span>
              <span>product photos</span>
            </div>
          </div>
        </div>
      </div>

      <div className={styles.trustedByPeople}>
        <h1>Trusted by people</h1>
        <div className={styles.trustedByPeopleContent}>
          <div className={styles.step}>
            <p>
              “I have a hectic schedule, so finding a reliable hairstylist used
              to be a struggle. This platform made the process simple — I just
              picked a time, read a few reviews, and everything went smoothly.
              The stylist was amazing, and now I always book through here.”
            </p>
            <div className={styles.personInfo}>
              <img
                src="/src/assets/trustedPerson1.png"
                alt="Anna marketing specialist"
                className={styles.personIcon}
              />
              <div>
                <h3>Anna</h3>
                <span>Marketing specialist</span>
              </div>
            </div>
          </div>
          <div className={styles.step}>
            <p>
              “With two kids and work, I don’t have time to search for services
              the old-fashioned way. I found a great cleaning specialist in
              minutes — professional, polite, and super efficient. It felt good
              to trust the process and get such great results.”
            </p>
            <div className={styles.personInfo}>
              <img
                src="/src/assets/trustedPerson2.png"
                alt="Dmytro busy parent"
                className={styles.personIcon}
              />
              <div>
                <h3>Dmytro</h3>
                <span>Busy parent</span>
              </div>
            </div>
          </div>
          <div className={styles.step}>
            <p>
              “As someone who works from home, I really value convenience. I
              needed a massage therapist after a stressful week, and this site
              helped me find one fast. The interface is easy to use, and I
              appreciate being able to read real reviews before booking.”
            </p>
            <div className={styles.personInfo}>
              <img
                src="/src/assets/trustedPerson3.png"
                alt="Sofia freelance designer"
                className={styles.personIcon}
              />
              <div>
                <h3>Sofia</h3>
                <span>Freelance designer</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default SpecialistsPage;
