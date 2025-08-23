import { useState } from 'react';
import Footer from '../components/Layout/Footer';
import Header from '../components/Layout/Header';
import styles from './BookingPage.module.scss';
import { useNavigate } from 'react-router-dom';

const BookingPage = () => {
  const [paymentMethod, setPaymentMethod] = useState('card');
  const navigate = useNavigate();

  const handleConfirm = () => {
    navigate('/book/confirmation');
  };
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
            <input type="text" placeholder="First Name" />
            <input type="text" placeholder="Last Name" />
            <input type="tel" placeholder="Phone number" />
            <input type="email" placeholder="Email" />
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
          <button className={styles.confirmButton} onClick={handleConfirm}
          >Confirm Booking</button>
        </div>
      </div>
      <Footer />
    </div>
  );
};
export default BookingPage;
