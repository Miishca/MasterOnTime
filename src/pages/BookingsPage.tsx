import React, { useCallback, useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Header from '../components/Layout/Header';
import Footer from '../components/Layout/Footer';
import Loader from '../components/Loader/Loader';
import { ApiError, isAuthenticated } from '../services/auth/authApi';
import { cancelBooking, getMyBookings } from '../features/booking/bookingApi';
import { submitReview } from '../features/reviews/reviewsApi';
import type { Booking } from '../types';
import styles from './BookingsPage.module.scss';

const fmt = (iso: string) =>
  new Date(iso).toLocaleString([], {
    weekday: 'short',
    day: 'numeric',
    month: 'short',
    hour: '2-digit',
    minute: '2-digit',
  });

const BookingsPage: React.FC = () => {
  const navigate = useNavigate();
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [busyId, setBusyId] = useState<number | null>(null);
  const [reviewing, setReviewing] = useState<number | null>(null);
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState('');
  const [reviewed, setReviewed] = useState<Set<number>>(new Set());

  const load = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      setBookings(await getMyBookings());
    } catch (err) {
      if (err instanceof ApiError && err.status === 401) {
        navigate('/login', { replace: true, state: { from: '/bookings' } });
        return;
      }
      setError(err instanceof ApiError ? err.message : 'Could not load bookings.');
    } finally {
      setLoading(false);
    }
  }, [navigate]);

  useEffect(() => {
    if (!isAuthenticated()) {
      navigate('/login', { replace: true, state: { from: '/bookings' } });
      return;
    }
    load();
  }, [navigate, load]);

  const doCancel = async (id: number) => {
    setBusyId(id);
    setError(null);
    try {
      await cancelBooking(id);
      await load();
    } catch (err) {
      setError(err instanceof ApiError ? err.message : 'Could not cancel.');
    } finally {
      setBusyId(null);
    }
  };

  const sendReview = async (bookingId: number) => {
    setBusyId(bookingId);
    setError(null);
    try {
      await submitReview(bookingId, rating, comment.trim());
      setReviewed((prev) => new Set(prev).add(bookingId));
      setReviewing(null);
      setComment('');
      setRating(5);
    } catch (err) {
      setError(err instanceof ApiError ? err.message : 'Could not submit the review.');
    } finally {
      setBusyId(null);
    }
  };

  return (
    <div className={styles.container}>
      <Header />
      <main className={styles.main}>
        <h1>My bookings</h1>

        {error && (
          <p className={styles.error} role="alert">
            {error}
          </p>
        )}

        {loading ? (
          <Loader />
        ) : bookings.length === 0 ? (
          <p className={styles.empty}>
            No bookings yet. <Link to="/people">Find a specialist</Link>.
          </p>
        ) : (
          <ul className={styles.list}>
            {bookings.map((b) => {
              const past = new Date(b.endTime) < new Date();
              const cancellable = b.status === 'CONFIRMED' && !past;
              const canReview =
                b.status === 'COMPLETED' && !reviewed.has(b.id);
              return (
                <li key={b.id} className={styles.item}>
                  <div className={styles.row}>
                    <div>
                      <p className={styles.name}>{b.specialistName}</p>
                      <p className={styles.when}>{fmt(b.startTime)}</p>
                    </div>
                    <div className={styles.right}>
                      <span
                        className={`${styles.status} ${styles[b.status.toLowerCase()] ?? ''}`}
                      >
                        {b.status}
                      </span>
                      {cancellable && (
                        <button
                          className={styles.cancelBtn}
                          disabled={busyId === b.id}
                          onClick={() => doCancel(b.id)}
                        >
                          {busyId === b.id ? '…' : 'Cancel'}
                        </button>
                      )}
                      {canReview && reviewing !== b.id && (
                        <button
                          className={styles.reviewBtn}
                          onClick={() => setReviewing(b.id)}
                        >
                          Leave a review
                        </button>
                      )}
                      {reviewed.has(b.id) && (
                        <span className={styles.muted}>Review sent</span>
                      )}
                    </div>
                  </div>

                  {reviewing === b.id && (
                    <form
                      className={styles.reviewForm}
                      onSubmit={(e) => {
                        e.preventDefault();
                        sendReview(b.id);
                      }}
                    >
                      <label>
                        Rating
                        <select
                          value={rating}
                          onChange={(e) => setRating(Number(e.target.value))}
                        >
                          {[5, 4, 3, 2, 1].map((n) => (
                            <option key={n} value={n}>
                              {n} ★
                            </option>
                          ))}
                        </select>
                      </label>
                      <input
                        type="text"
                        placeholder="Comment (optional)"
                        value={comment}
                        onChange={(e) => setComment(e.target.value)}
                      />
                      <button type="submit" disabled={busyId === b.id}>
                        {busyId === b.id ? 'Sending…' : 'Submit'}
                      </button>
                      <button
                        type="button"
                        className={styles.linkBtn}
                        onClick={() => setReviewing(null)}
                      >
                        Cancel
                      </button>
                    </form>
                  )}
                </li>
              );
            })}
          </ul>
        )}
      </main>
      <Footer />
    </div>
  );
};

export default BookingsPage;
