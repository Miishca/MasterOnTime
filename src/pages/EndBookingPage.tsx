import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Layout/Header';
import Footer from '../components/Layout/Footer';
import imageMap from '../utils/imageLoader';
import styles from './EndBookingPage.module.scss';
import { useUserProfile } from '../hooks/useUserProfile';
import { updateProfile } from '../services/auth/authApi';
import Loader from '../components/Loader/Loader';
import useScrollToTop from '../hooks/useScrollToTop';

const EndBookingPage: React.FC = () => {
  useScrollToTop();
  const { userProfile, setUserProfile, loading, error } = useUserProfile();
  const navigate = useNavigate();
  const [paymentMethod, setPaymentMethod] = useState<
    'card' | 'apple' | 'wallet'
  >('card');

  const handleConfirm = async () => {
    if (!userProfile) return;
    try {
      const updated = await updateProfile(userProfile);
      setUserProfile(updated);
      navigate('/profile', { state: { scrollToTop: true } });
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

      <main className={styles.main}>
        <button
          type="button"
          className={styles.backLink}
          onClick={() => navigate(-1)}
          aria-label="Back"
        >
          ‹ Back
        </button>

        <div className={styles.grid}>
          <div className={styles.leftCol}>
            <section className={`${styles.card} ${styles.lightCard}`}>
              <h3 className={styles.cardTitle}>Clients Details</h3>

              <div className={styles.formGrid}>
                <div className={styles.field}>
                  <input
                    type="text"
                    placeholder="First Name"
                    value={userProfile.firstName || ''}
                    onChange={(e) =>
                      setUserProfile({
                        ...userProfile,
                        firstName: e.target.value,
                      })
                    }
                  />
                </div>

                <div className={styles.field}>
                  <input
                    type="text"
                    placeholder="Last Name"
                    value={userProfile.lastName || ''}
                    onChange={(e) =>
                      setUserProfile({
                        ...userProfile,
                        lastName: e.target.value,
                      })
                    }
                  />
                </div>

                <div className={styles.field}>
                  <input
                    type="tel"
                    placeholder="Phone number"
                    value={userProfile.phoneNumber || ''}
                    onChange={(e) =>
                      setUserProfile({
                        ...userProfile,
                        phoneNumber: e.target.value,
                      })
                    }
                  />
                </div>

                <div className={styles.field}>
                  <input
                    type="email"
                    placeholder="Email"
                    value={userProfile.email || ''}
                    onChange={(e) =>
                      setUserProfile({ ...userProfile, email: e.target.value })
                    }
                  />
                </div>
              </div>
            </section>

            <section className={`${styles.card} ${styles.lightCard}`}>
              <h3 className={styles.cardTitle}>Payment and Confirmation</h3>

              <div className={styles.paymentOptions}>
                <button
                  type="button"
                  className={paymentMethod === 'card' ? styles.active : ''}
                  onClick={() => setPaymentMethod('card')}
                >
                  💳 Card
                </button>
                <button
                  type="button"
                  className={paymentMethod === 'apple' ? styles.active : ''}
                  onClick={() => setPaymentMethod('apple')}
                >
                  🍏 Apple Pay
                </button>
                <button
                  type="button"
                  className={paymentMethod === 'wallet' ? styles.active : ''}
                  onClick={() => setPaymentMethod('wallet')}
                >
                  👛 Wallet
                </button>
              </div>

              {paymentMethod === 'card' && (
                <div className={styles.cardForm}>
                  <div className={styles.field}>
                    <input type="text" placeholder="Name on Card" />
                  </div>

                  <div className={styles.field}>
                    <div className={styles.inputWithIcon}>
                      <input type="text" placeholder="Card Number" />
                    </div>
                  </div>

                  <div className={styles.row3}>
                    <div className={styles.field}>
                      <div className={styles.row}>
                        <div className={styles.selectLike}>
                          <span>MM</span>
                          <span className={styles.chev} />
                        </div>
                        <div className={styles.selectLike}>
                          <span>YYYY</span>
                          <span className={styles.chev} />
                        </div>
                      </div>
                    </div>
                    <div className={styles.field}>
                      <div className={styles.selectLike}>
                        <span>CVV</span>
                        <span className={styles.chev} />
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </section>
          </div>

          <aside className={`${styles.card} ${styles.summaryCard}`}>
            <h3 className={styles.summaryTitle}>Order Summary</h3>

            <img
              className={styles.summaryImage}
              src={imageMap['servicePreview'] || imageMap['default']}
              alt="Selected service"
            />

            <div className={styles.summaryList}>
              <div className={styles.summaryItem}>
                <div className={styles.label}>Service</div>
                <div className={styles.value}>Barbershop | Short & Fade</div>
              </div>

              <div className={styles.summaryItem}>
                <div className={styles.label}>Location</div>
                <div className={styles.value}>
                  Lot 7, Industrial Street, Kyiv
                </div>
              </div>

              <div className={styles.summaryItem}>
                <div className={styles.label}>Specialist</div>
                <div className={styles.value}>Artem Nikitin</div>
              </div>

              <div className={styles.summaryItem}>
                <div className={styles.label}>Delivery Date</div>
                <div className={styles.value}>June 23, 2025</div>
              </div>

              <div className={styles.summaryItem}>
                <div className={styles.label}>Payment Method</div>
                <div className={styles.value}>Master Card</div>
              </div>
            </div>

            <button
              type="button"
              className={styles.confirmButton}
              onClick={handleConfirm}
            >
              Confirm Booking
            </button>
          </aside>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default EndBookingPage;
