import React, { useEffect, useState } from 'react';
import Header from '../components/Layout/Header';
import Footer from '../components/Layout/Footer';
import styles from './SpecialistProfile.module.scss';
import { getSpecialists } from '../features/specialists/services/specialistsApi';
import type { Specialist } from '../types';
import imageMap from '../utils/imageLoader';
import { useParams } from 'react-router-dom';

const SpecialistProfile: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [specialist, setSpecialist] = useState<Specialist | null>(null);

  useEffect(() => {
    getSpecialists({}).then((res) => {
      const found =
        id != null
          ? (res.data.find((s) => s.id === id) ?? res.data[0])
          : res.data[0];
      setSpecialist(found ?? null);
    });
  }, [id]);

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

      <div className={styles.profileWrapper}>
        <div className={styles.leftColumn}>
          <div className={styles.avatarContainer}>
            <img
              src={
                imageMap[specialist.image as keyof typeof imageMap] ??
                imageMap['default']
              }
              alt={`${specialist.name} ${specialist.lastname}`}
              className={styles.avatar}
            />
          </div>

          <div className={styles.leftInfoCard}>
            <h3 className={styles.name}>
              {specialist.name} {specialist.lastname}
            </h3>
            <p className={styles.balance}>Balance: $200</p>
            <p className={styles.contact}>
              <span className={styles.icon}>📍</span> {specialist.city}, Ukraine
            </p>
            <p className={styles.contact}>
              <span className={styles.icon}>✉️</span> example@email.com
            </p>
            <p className={styles.contact}>
              <span className={styles.icon}>📞</span> {specialist.phone}
            </p>
          </div>
        </div>

        <div className={styles.centerColumn}>
          <div className={`${styles.card} ${styles.cardMedium}`}>
            <div className={styles.cardHeader}>
              <h4>Account Details</h4>
              <button className={styles.editIcon}>✏️</button>
            </div>

            <div className={styles.detailsRow}>
              <span>First name</span>
              <p>{specialist.name}</p>
            </div>
            <div className={styles.detailsRow}>
              <span>Last name</span>
              <p>{specialist.lastname}</p>
            </div>
            <div className={styles.detailsRow}>
              <span>Date of birth</span>
              <p>24 February, 2005</p>
            </div>
            <div className={styles.detailsRow}>
              <span>Sex</span>
              <p>Female</p>
            </div>
          </div>

          <div className={`${styles.card} ${styles.cardMedium}`}>
            <div className={styles.cardHeader}>
              <h4>Shipping Address</h4>
              <button className={styles.editIcon}>✏️</button>
            </div>

            <div className={styles.detailsRow}>
              <span>Address</span>
              <p>52 Sergeya Tishinskogo Street</p>
            </div>
            <div className={styles.detailsRow}>
              <span>City</span>
              <p>Ovidiopol, Odesa</p>
            </div>
            <div className={styles.detailsRow}>
              <span>Country</span>
              <p>Ukraine</p>
            </div>
            <div className={styles.detailsRow}>
              <span>Zip Code</span>
              <p>67801</p>
            </div>
          </div>
        </div>

        <div className={styles.paymentColumn}>
          <div className={`${styles.card} ${styles.cardLarge}`}>
            <div className={styles.cardHeader}>
              <h4>Payment Methods</h4>
              <button className={styles.editIcon}>✏️</button>
            </div>

            <img
              src={imageMap['creditcard']}
              alt="Credit Card"
              className={styles.creditCard}
            />

            <div className={styles.paymentDetails}>
              <div className={styles.detailsRow}>
                <span>Card Type</span>
                <p>VISA</p>
              </div>
              <div className={styles.detailsRow}>
                <span>Card Holder</span>
                <p>{specialist.lastname}</p>
              </div>
              <div className={styles.detailsRow}>
                <span>Expire</span>
                <p>11/24</p>
              </div>
              <div className={styles.detailsRow}>
                <span>Card Number</span>
                <p>0012 3456 7890 9870</p>
              </div>
              <div className={styles.detailsRow}>
                <span>Balance</span>
                <p>$1000</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default SpecialistProfile;
