import React, { useEffect, useState } from 'react';
import { ApiError } from '../../services/auth/authApi';
import { getModerationQueue, moderateReview, type ModerationReview } from '../reviews/reviewsApi';
import styles from './ReviewModeration.module.scss';

const ReviewModeration: React.FC = () => {
  const [items, setItems] = useState<ModerationReview[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [busyId, setBusyId] = useState<number | null>(null);

  const load = async () => {
    setError(null);
    try {
      setItems(await getModerationQueue());
    } catch (err) {
      setError(err instanceof ApiError ? err.message : 'Could not load the moderation queue.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
  }, []);

  const act = async (id: number, status: 'VISIBLE' | 'HIDDEN' | 'DELETED') => {
    setBusyId(id);
    setError(null);
    try {
      await moderateReview(id, status);
      await load();
    } catch (err) {
      setError(err instanceof ApiError ? err.message : 'Could not update the review.');
    } finally {
      setBusyId(null);
    }
  };

  if (loading) return <p className={styles.muted}>Loading…</p>;

  return (
    <div className={styles.wrap}>
      {error && (
        <p className={styles.error} role="alert">
          {error}
        </p>
      )}

      {items.length === 0 ? (
        <p className={styles.muted}>Nothing to review — no flagged or hidden reviews.</p>
      ) : (
        <ul className={styles.list}>
          {items.map((r) => (
            <li key={r.id} className={styles.item}>
              <div className={styles.itemHead}>
                <span className={`${styles.status} ${styles[r.status.toLowerCase()] ?? ''}`}>
                  {r.status}
                </span>
                <span className={styles.stars}>
                  {'★'.repeat(r.rating)}
                  {'☆'.repeat(5 - r.rating)}
                </span>
              </div>
              {r.comment && <p className={styles.comment}>{r.comment}</p>}
              <div className={styles.actions}>
                {r.status !== 'HIDDEN' && (
                  <button disabled={busyId === r.id} onClick={() => act(r.id, 'HIDDEN')}>
                    Hide
                  </button>
                )}
                {r.status !== 'VISIBLE' && (
                  <button disabled={busyId === r.id} onClick={() => act(r.id, 'VISIBLE')}>
                    Restore
                  </button>
                )}
                <button
                  className={styles.dangerBtn}
                  disabled={busyId === r.id}
                  onClick={() => act(r.id, 'DELETED')}
                >
                  Delete
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default ReviewModeration;
