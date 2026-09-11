import React, { useEffect, useRef, useState } from 'react';
import { ApiError } from '../../services/auth/authApi';
import { ACCEPTED_IMAGE_TYPES, readImageAsBase64, validateImageFile } from '../../utils/imageFile';
import {
  addPortfolioItem,
  deletePortfolioItem,
  getMyPortfolio,
  type PortfolioItem,
} from './portfolioApi';
import styles from './PortfolioManager.module.scss';

const PortfolioManager: React.FC = () => {
  const [items, setItems] = useState<PortfolioItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [caption, setCaption] = useState('');
  const [busy, setBusy] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const load = async () => {
    setError(null);
    try {
      setItems(await getMyPortfolio());
    } catch (err) {
      setError(err instanceof ApiError ? err.message : 'Could not load your portfolio.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
  }, []);

  const handleFileSelected = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    e.target.value = '';
    if (!file) return;

    setError(null);
    const problem = validateImageFile(file);
    if (problem) {
      setError(problem);
      return;
    }

    setBusy(true);
    try {
      const imageBase64 = await readImageAsBase64(file);
      await addPortfolioItem(imageBase64, caption.trim());
      setCaption('');
      await load();
    } catch (err) {
      setError(err instanceof ApiError ? err.message : 'Could not add the photo.');
    } finally {
      setBusy(false);
    }
  };

  const remove = async (id: number) => {
    setBusy(true);
    setError(null);
    try {
      await deletePortfolioItem(id);
      setItems((prev) => prev.filter((i) => i.id !== id));
    } catch (err) {
      setError(err instanceof ApiError ? err.message : 'Could not remove the photo.');
    } finally {
      setBusy(false);
    }
  };

  if (loading) return <p className={styles.muted}>Loading portfolio…</p>;

  return (
    <div className={styles.wrap}>
      <p className={styles.note}>
        Show past work. Clients see this gallery on your public profile.
      </p>

      {error && (
        <p className={styles.error} role="alert">
          {error}
        </p>
      )}

      {items.length > 0 && (
        <ul className={styles.grid}>
          {items.map((item) => (
            <li key={item.id} className={styles.item}>
              <img src={item.imageUrl} alt={item.caption || 'Portfolio work'} />
              {item.caption && <span className={styles.caption}>{item.caption}</span>}
              <button
                type="button"
                className={styles.removeBtn}
                disabled={busy}
                onClick={() => remove(item.id)}
              >
                Remove
              </button>
            </li>
          ))}
        </ul>
      )}

      <div className={styles.addRow}>
        <input
          type="text"
          placeholder="Caption (optional)"
          value={caption}
          onChange={(e) => setCaption(e.target.value)}
        />
        <input
          ref={fileInputRef}
          type="file"
          accept={ACCEPTED_IMAGE_TYPES.join(',')}
          onChange={handleFileSelected}
          disabled={busy || items.length >= 20}
        />
      </div>
      {items.length >= 20 && <p className={styles.muted}>Maximum of 20 photos reached.</p>}
    </div>
  );
};

export default PortfolioManager;
