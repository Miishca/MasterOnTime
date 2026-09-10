import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import Header from '../components/Layout/Header';
import Footer from '../components/Layout/Footer';
import type { Booking } from '../types';
import styles from './EndBookingPage.module.scss';

const EndBookingPage: React.FC = () => {
  const location = useLocation();
  const booking = (location.state as { booking?: Booking } | null)?.booking ?? null;

  const when = booking
    ? new Date(booking.startTime).toLocaleString([], {
        weekday: 'long',
        day: 'numeric',
        month: 'long',
        hour: '2-digit',
        minute: '2-digit',
      })
    : null;

  return (
    <div className={styles.container}>
      <Header />
      <main className={styles.main}>
        <div className={styles.card}>
          {booking ? (
            <>
              <div className={styles.check}>✓</div>
              <h1>Booking confirmed</h1>
              <p className={styles.line}>
                <strong>{booking.specialistName}</strong>
              </p>
              {booking.serviceName && (
                <p className={styles.line}>{booking.serviceName}</p>
              )}
              <p className={styles.line}>{when}</p>
              {Number(booking.price) > 0 && (
                <p className={styles.line}>Price: {booking.price}</p>
              )}
              <div className={styles.actions}>
                <Link to="/bookings" className={styles.primary}>
                  My bookings
                </Link>
                <Link to="/people" className={styles.secondary}>
                  Browse more
                </Link>
              </div>
            </>
          ) : (
            <>
              <h1>Nothing to show</h1>
              <p className={styles.line}>This page opens after you book a slot.</p>
              <Link to="/people" className={styles.primary}>
                Find a specialist
              </Link>
            </>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default EndBookingPage;
