import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Layout/Header';
import Footer from '../components/Layout/Footer';
import imageMap from '../utils/imageLoader';
import styles from './EndBookingPage.module.scss';

const EndBookingPage: React.FC = () => {
  const navigate = useNavigate();
  const [paymentMethod, setPaymentMethod] = useState<'card' | 'apple' | 'wallet'>('card');

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
                  <input type="text" placeholder="First Name" />
                </div>

                <div className={styles.field}>
                  <input type="text" placeholder="Last Name" />
                </div>

                <div className={styles.field}>
                  <input type="tel" placeholder="Phone number" />
                </div>

                <div className={styles.field}>
                  <input type="email" placeholder="Email" />
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
                        <div className={styles.selectLike}><span>MM</span><span className={styles.chev} /></div>
                        <div className={styles.selectLike}><span>YYYY</span><span className={styles.chev} /></div>
                      </div>
                    </div>
                    <div className={styles.field}>
                      <div className={styles.selectLike}><span>CVV</span><span className={styles.chev} /></div>
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
                <div className={styles.value}>Lot 7, Industrial Street, Kyiv</div>
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

            <button type="button" className={styles.confirmButton}>
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
