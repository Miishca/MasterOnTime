import React, { useEffect, useState } from 'react';
import { ApiError } from '../../services/auth/authApi';
import {
  addServiceItem,
  createCategory,
  deleteCategory,
  deleteServiceItem,
  getMyCategories,
  type ServiceCategory,
  type ServiceItemInput,
} from './servicesApi';
import styles from './ServicesManager.module.scss';

const emptyItem: ServiceItemInput = { name: '', durationMinutes: 30, price: 0 };

const ServicesManager: React.FC = () => {
  const [categories, setCategories] = useState<ServiceCategory[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [newCategory, setNewCategory] = useState('');
  const [busy, setBusy] = useState(false);

  // per-category "add service" draft
  const [draft, setDraft] = useState<Record<number, ServiceItemInput>>({});

  const load = async () => {
    setError(null);
    try {
      setCategories(await getMyCategories());
    } catch (err) {
      setError(err instanceof ApiError ? err.message : 'Could not load your services.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
  }, []);

  const run = async (fn: () => Promise<unknown>) => {
    setBusy(true);
    setError(null);
    try {
      await fn();
      await load();
    } catch (err) {
      setError(err instanceof ApiError ? err.message : 'Something went wrong.');
    } finally {
      setBusy(false);
    }
  };

  const draftFor = (id: number) => draft[id] ?? emptyItem;
  const setDraftFor = (id: number, patch: Partial<ServiceItemInput>) =>
    setDraft((d) => ({ ...d, [id]: { ...draftFor(id), ...patch } }));

  if (loading) return <p className={styles.muted}>Loading services…</p>;

  return (
    <div className={styles.wrap}>
      <p className={styles.note}>
        Group what you offer into categories (e.g. “Haircuts”) and add services with a
        duration and price. Clients pick a service when booking, and search matches on
        service names.
      </p>

      {error && (
        <p className={styles.error} role="alert">
          {error}
        </p>
      )}

      {categories.length === 0 && (
        <p className={styles.muted}>No categories yet.</p>
      )}

      <ul className={styles.categories}>
        {categories.map((cat) => (
          <li key={cat.id} className={styles.category}>
            <div className={styles.categoryHead}>
              <h4>{cat.name}</h4>
              <button
                className={styles.linkDanger}
                disabled={busy}
                onClick={() =>
                  run(() => deleteCategory(cat.id))
                }
              >
                Delete category
              </button>
            </div>

            {cat.items.length > 0 && (
              <ul className={styles.items}>
                {cat.items.map((it) => (
                  <li key={it.id} className={styles.item}>
                    <span className={styles.itemName}>{it.name}</span>
                    <span className={styles.itemMeta}>
                      {it.durationMinutes} min · {it.price}
                    </span>
                    <button
                      className={styles.linkDanger}
                      disabled={busy}
                      onClick={() => run(() => deleteServiceItem(it.id))}
                    >
                      Remove
                    </button>
                  </li>
                ))}
              </ul>
            )}

            <form
              className={styles.addItem}
              onSubmit={(e) => {
                e.preventDefault();
                const d = draftFor(cat.id);
                run(() =>
                  addServiceItem(cat.id, {
                    name: d.name.trim(),
                    durationMinutes: Number(d.durationMinutes),
                    price: Number(d.price),
                  })
                ).then(() => setDraft((prev) => ({ ...prev, [cat.id]: { ...emptyItem } })));
              }}
            >
              <input
                type="text"
                placeholder="Service name"
                required
                value={draftFor(cat.id).name}
                onChange={(e) => setDraftFor(cat.id, { name: e.target.value })}
              />
              <input
                type="number"
                min={1}
                required
                aria-label="Duration in minutes"
                value={draftFor(cat.id).durationMinutes}
                onChange={(e) =>
                  setDraftFor(cat.id, { durationMinutes: Number(e.target.value) })
                }
              />
              <input
                type="number"
                min={0}
                step="0.01"
                required
                aria-label="Price"
                value={draftFor(cat.id).price}
                onChange={(e) => setDraftFor(cat.id, { price: Number(e.target.value) })}
              />
              <button type="submit" disabled={busy}>
                Add service
              </button>
            </form>
          </li>
        ))}
      </ul>

      <form
        className={styles.addCategory}
        onSubmit={(e) => {
          e.preventDefault();
          const name = newCategory.trim();
          if (!name) return;
          run(() => createCategory(name)).then(() => setNewCategory(''));
        }}
      >
        <input
          type="text"
          placeholder="New category name"
          value={newCategory}
          onChange={(e) => setNewCategory(e.target.value)}
        />
        <button type="submit" disabled={busy || !newCategory.trim()}>
          Add category
        </button>
      </form>
    </div>
  );
};

export default ServicesManager;
