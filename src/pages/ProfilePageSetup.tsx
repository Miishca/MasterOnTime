import React, { useState } from 'react';
import Header from '../components/Layout/Header';
import Footer from '../components/Layout/Footer';
import styles from './ProfilePageSetup.module.scss';
import type { UserProfile } from '../types';
import imageMap from '../utils/imageLoader';
import { useNavigate } from 'react-router-dom';
import EditModal from '../components/Modal/EditModal';
import { updateProfile } from '../services/auth/authApi';
import { useUserProfile } from '../hooks/useUserProfile';
import Loader from '../components/Loader/Loader';
import useScrollToTop from '../hooks/useScrollToTop';

const ProfilePageSetup: React.FC = () => {
  useScrollToTop();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalData, setModalData] = useState<Record<string, any>>({});
  const navigate = useNavigate();
  const { userProfile, setUserProfile, loading, error } = useUserProfile();

  const openEditModal = (data: Record<string, any>) => {
    setModalData(data);
    setIsModalOpen(true);
  };

  const handleSave = async (updatedData: Record<string, any>) => {
    if (!userProfile) return;

    try {
      const payload: Partial<UserProfile> = {
        ...userProfile,
        ...updatedData,
      };

      const hasAddressFields =
        'country' in updatedData ||
        'city' in updatedData ||
        'street' in updatedData ||
        'zip' in updatedData;

      if (hasAddressFields) {
        payload.address = {
          country: updatedData.country ?? userProfile.address?.country ?? '',
          city: updatedData.city ?? userProfile.address?.city ?? '',
          street: updatedData.street ?? userProfile.address?.street ?? '',
          zip: updatedData.zip ?? userProfile.address?.zip ?? '',
        };

        delete (payload as any).country;
        delete (payload as any).city;
        delete (payload as any).street;
        delete (payload as any).zip;
      }

      const updated = await updateProfile(payload);
      setUserProfile(updated);
    } catch (err) {
      console.error('Failed to save profile changes', err);
    } finally {
      setIsModalOpen(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  if (loading) {
    return (
      <div className={styles.container}>
        <Header />
        <Loader />
        <Footer />
      </div>
    );
  }

  if (error || !userProfile) {
    return (
      <div className={styles.container}>
        <Header />
        <div className={styles.errorMessage}>
          <p>{error || 'Failed to load profile data.'}</p>
          <button onClick={() => navigate('/login')}>Go to Login</button>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <Header />
      <button className={styles.logoutButton} onClick={handleLogout}>
        Logout
      </button>

      <div className={styles.profileWrapper}>
        <div className={styles.leftColumn}>
          <div className={styles.avatarContainer}>
            <img
              src={userProfile.profileImageUrl || imageMap['default']}
              alt={`${userProfile.firstName} ${userProfile.lastName}`}
              className={styles.avatar}
            />
          </div>

          <div className={styles.leftInfoCard}>
            <h3 className={styles.name}>
              {userProfile.firstName} {userProfile.lastName}
            </h3>
            <p className={styles.balance}>Balance: 100$</p>
            <p className={styles.contact}>
              <span className={styles.icon}>📍</span>{' '}
              {userProfile.address?.city}, Ukraine
            </p>
            <p className={styles.contact}>
              <span className={styles.icon}>✉️</span> {userProfile.email}
            </p>
            <p className={styles.contact}>
              <span className={styles.icon}>📞</span> {userProfile.phoneNumber}
            </p>
          </div>
        </div>

        <div className={styles.centerColumn}>
          <div className={`${styles.card} ${styles.cardMedium}`}>
            <div className={styles.cardHeader}>
              <h4>Account Details</h4>
              <button
                className={styles.editIcon}
                onClick={() =>
                  openEditModal({
                    firstName: userProfile.firstName,
                    lastName: userProfile.lastName,
                    email: userProfile.email,
                    phoneNumber: userProfile.phoneNumber,
                  })
                }
              >
                <img src={imageMap['edit']} />
              </button>
            </div>

            <div className={styles.detailsRow}>
              <span>First name</span>
              <p>{userProfile.firstName}</p>
            </div>
            <div className={styles.detailsRow}>
              <span>Last name</span>
              <p>{userProfile.lastName}</p>
            </div>
            <div className={styles.detailsRow}>
              <span>Date of birth</span>
              <p>24 February, 2002</p>
            </div>
            <div className={styles.detailsRow}>
              <span>Sex</span>
              <p>Female</p>
            </div>
          </div>

          <div className={`${styles.card} ${styles.cardMedium}`}>
            <div className={styles.cardHeader}>
              <h4>Shipping Address</h4>
              <button
                className={styles.editIcon}
                onClick={() =>
                  openEditModal({
                    country: userProfile.address?.country,
                    city: userProfile.address?.city,
                    street: userProfile.address?.street,
                    zip: userProfile.address?.zip,
                  })
                }
              >
                <img src={imageMap['edit']} />
              </button>
            </div>

            <div className={styles.detailsRow}>
              <span>Address</span>
              <p>{userProfile.address?.street}</p>
            </div>
            <div className={styles.detailsRow}>
              <span>City</span>
              <p>{userProfile.address?.city}</p>
            </div>
            <div className={styles.detailsRow}>
              <span>Country</span>
              <p>{userProfile.address?.country}</p>
            </div>
            <div className={styles.detailsRow}>
              <span>Zip Code</span>
              <p>{userProfile.address?.zip}</p>
            </div>
          </div>
        </div>

        <div className={styles.paymentColumn}>
          <div className={`${styles.card} ${styles.cardLarge}`}>
            <div className={styles.cardHeader}>
              <h4>Payment Methods</h4>
              {/* <button
                className={styles.editIcon}
                onClick={() =>
                  openEditModal({
                    cardType: userProfile.cardType,
                    cardHolder: userProfile.lastName,
                    expire: userProfile.expire,
                    cardNumber: userProfile.cardNumber,
                    balance: userProfile.balance,
                  })
                }
              >
                <img src={imageMap['edit']} />
              </button> */}
            </div>

            <img
              src={imageMap['creditcard']}
              alt="Credit Card"
              className={styles.creditCard}
            />

            {/* <div className={styles.paymentDetails}>
              <div className={styles.detailsRow}>
                <span>Card Type</span>
                <p>{userProfile.cardType}</p>
              </div>
              <div className={styles.detailsRow}>
                <span>Card Holder</span>
                <p>{userProfile.cardHolder}</p>
              </div>
              <div className={styles.detailsRow}>
                <span>Expire</span>
                <p>{userProfile.expire}</p>
              </div>
              <div className={styles.detailsRow}>
                <span>Card Number</span>
                <p>{userProfile.cardNumber}</p>
              </div>
              <div className={styles.detailsRow}>
                <span>Balance</span>
                <p>{userProfile.balance}</p>
              </div>
            </div> */}
          </div>
        </div>
      </div>
      <EditModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        initialData={modalData}
        onSave={handleSave}
      />

      <Footer />
    </div>
  );
};

export default ProfilePageSetup;
