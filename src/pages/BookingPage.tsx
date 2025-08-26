import { useState } from 'react';
import Footer from '../components/Layout/Footer';
import Header from '../components/Layout/Header';
import styles from './BookingPage.module.scss';
import { useNavigate } from 'react-router-dom';
import { useUserProfile } from '../hooks/useUserProfile';
import { updateProfile } from '../services/auth/authApi';
import Loader from '../components/Loader/Loader';
import useScrollToTop from '../hooks/useScrollToTop';

const BookingPage = () => {
  useScrollToTop();
  const { userProfile, setUserProfile, loading, error } = useUserProfile();
  const [paymentMethod, setPaymentMethod] = useState('card');
  const navigate = useNavigate();

  const handleConfirm = async () => {
    if (!userProfile) return;
    try {
      const updated = await updateProfile(userProfile);
      setUserProfile(updated);
      navigate('/book/confirmation', { state: { scrollToTop: true } });
    } catch (err) {
      console.error('Failed to save profile', err);
    }
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
  if (error || !userProfile) return <div>{error || 'No profile found'}</div>;

  return (
    <div className={styles.container}>
      <Header />
      <button
        type="button"
        className={styles.backLink}
        onClick={() => navigate(-1)}
        aria-label="Back"
      >
        ‹ Back
      </button>
      <div className={styles.formWrapper}>
        <div className={styles.card}>
          <h3>Clients Details</h3>
          <div className={styles.formGrid}>
            <input
              type="text"
              placeholder="First Name"
              value={userProfile.firstName || ''}
              onChange={(e) =>
                setUserProfile({ ...userProfile, firstName: e.target.value })
              }
            />
            <input
              type="text"
              placeholder="Last Name"
              value={userProfile.lastName || ''}
              onChange={(e) =>
                setUserProfile({ ...userProfile, lastName: e.target.value })
              }
            />
            <input
              type="tel"
              placeholder="Phone number"
              value={userProfile.phoneNumber || ''}
              onChange={(e) =>
                setUserProfile({ ...userProfile, phoneNumber: e.target.value })
              }
            />
            <input
              type="email"
              placeholder="Email"
              value={userProfile.email || ''}
              onChange={(e) =>
                setUserProfile({ ...userProfile, email: e.target.value })
              }
            />
            <select>
              <option>Choose service</option>
              <option>Barbershop</option>
              <option>Massage</option>
              <option>Manicure</option>
            </select>
          </div>
        </div>

        <div className={styles.card}>
          <h3>Payment and Confirmation</h3>

          <div className={styles.paymentOptions}>
            <button
              className={paymentMethod === 'card' ? styles.active : ''}
              onClick={() => setPaymentMethod('card')}
            >
              💳 Card
            </button>
            <button
              className={paymentMethod === 'apple' ? styles.active : ''}
              onClick={() => setPaymentMethod('apple')}
            >
              🍏 Apple Pay
            </button>
            <button
              className={paymentMethod === 'wallet' ? styles.active : ''}
              onClick={() => setPaymentMethod('wallet')}
            >
              👛 Wallet
            </button>
          </div>

          {paymentMethod === 'card' && (
            <div className={styles.cardDetails}>
              <input type="text" placeholder="Name on Card" />
              <input type="text" placeholder="Card Number" />
              <div className={styles.cardRow}>
                <input type="text" placeholder="MM" />
                <input type="text" placeholder="YYYY" />
                <input type="text" placeholder="CVV" />
              </div>
            </div>
          )}
        </div>

        <div className={styles.totalWrapper}>
          <p className={styles.total}>Total: $0</p>
          <p className={styles.note}>
            Total includes recovery charges and service fees. Full payment will
            be charged to your card after you visit the specialist.
          </p>
          <button className={styles.confirmButton} onClick={handleConfirm}>
            Confirm Booking
          </button>
        </div>
      </div>
      <Footer />
    </div>
  );
};
export default BookingPage;
