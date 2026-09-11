import React, { useCallback, useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Header from '../components/Layout/Header';
import Footer from '../components/Layout/Footer';
import Loader from '../components/Loader/Loader';
import { ApiError, isAuthenticated } from '../services/auth/authApi';
import { getFavorites, removeFavorite } from '../features/favorites/favoritesApi';
import imageMap from '../utils/imageLoader';
import { fullName } from '../utils/fullName';
import type { Specialist } from '../types';
import styles from './FavoritesPage.module.scss';

const FavoritesPage: React.FC = () => {
  const navigate = useNavigate();
  const [items, setItems] = useState<Specialist[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [busyId, setBusyId] = useState<string | null>(null);

  const load = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      setItems(await getFavorites());
    } catch (err) {
      if (err instanceof ApiError && err.status === 401) {
        navigate('/login', { replace: true, state: { from: '/favorites' } });
        return;
      }
      setError(err instanceof ApiError ? err.message : 'Could not load your favorites.');
    } finally {
      setLoading(false);
    }
  }, [navigate]);

  useEffect(() => {
    if (!isAuthenticated()) {
      navigate('/login', { replace: true, state: { from: '/favorites' } });
      return;
    }
    load();
  }, [navigate, load]);

  const remove = async (id: string) => {
    setBusyId(id);
    try {
      await removeFavorite(Number(id));
      setItems((prev) => prev.filter((s) => s.id !== id));
    } catch (err) {
      setError(err instanceof ApiError ? err.message : 'Could not remove.');
    } finally {
      setBusyId(null);
    }
  };

  return (
    <div className={styles.container}>
      <Header />
      <main className={styles.main}>
        <h1>My favorites</h1>

        {error && (
          <p className={styles.error} role="alert">
            {error}
          </p>
        )}

        {loading ? (
          <Loader />
        ) : items.length === 0 ? (
          <p className={styles.empty}>
            No favorites yet. <Link to="/people">Browse specialists</Link>.
          </p>
        ) : (
          <ul className={styles.grid}>
            {items.map((s) => (
              <li key={s.id} className={styles.card}>
                <Link to={`/people/${s.id}`} className={styles.cardLink}>
                  <img
                    src={s.image || imageMap['default']}
                    alt={`${fullName(s)}'s profile`}
                    className={styles.cardImage}
                  />
                  <h3>{fullName(s)}</h3>
                  {s.profession && <p className={styles.profession}>{s.profession}</p>}
                </Link>
                <button
                  type="button"
                  className={styles.removeBtn}
                  disabled={busyId === s.id}
                  onClick={() => remove(s.id)}
                >
                  {busyId === s.id ? '…' : 'Remove'}
                </button>
              </li>
            ))}
          </ul>
        )}
      </main>
      <Footer />
    </div>
  );
};

export default FavoritesPage;
