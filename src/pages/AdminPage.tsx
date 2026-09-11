import React, { useCallback, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Layout/Header';
import Footer from '../components/Layout/Footer';
import Loader from '../components/Loader/Loader';
import { ApiError, isAdmin } from '../services/auth/authApi';
import {
  listUsers,
  setUserRole,
  updateSpecialistProfile,
  type AdminUser,
} from '../features/admin/adminApi';
import type { SpecialistProfileInput } from '../features/specialists/services/specialistsApi';
import { INDUSTRIES, INDUSTRY_LABELS, type Industry } from '../types';
import { fullName } from '../utils/fullName';
import styles from './AdminPage.module.scss';

type ProfileForm = {
  profession: string;
  price: string;
  experience: string;
  tags: string;
  industry: Industry | '';
};

const emptyForm: ProfileForm = {
  profession: '',
  price: '',
  experience: '',
  tags: '',
  industry: '',
};

function toForm(u: AdminUser): ProfileForm {
  const p = u.specialistProfile;
  return {
    profession: p?.profession ?? '',
    price: p && Number(p.price) > 0 ? String(Number(p.price)) : '',
    experience: p && p.experience > 0 ? String(p.experience) : '',
    tags: p?.tags.join(', ') ?? '',
    industry: p?.industry ?? '',
  };
}

function toPayload(f: ProfileForm): SpecialistProfileInput {
  return {
    profession: f.profession.trim() || undefined,
    price: f.price === '' ? undefined : Number(f.price),
    experience: f.experience === '' ? undefined : Number(f.experience),
    tags: f.tags
      ? f.tags.split(',').map((t) => t.trim()).filter(Boolean)
      : undefined,
    industry: f.industry || null,
  };
}

const AdminPage: React.FC = () => {
  const navigate = useNavigate();
  const [users, setUsers] = useState<AdminUser[]>([]);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [busyId, setBusyId] = useState<number | null>(null);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [form, setForm] = useState<ProfileForm>(emptyForm);

  const load = useCallback(
    async (term: string) => {
      setLoading(true);
      setError(null);
      try {
        setUsers(await listUsers(term || undefined));
      } catch (err) {
        if (err instanceof ApiError && (err.status === 401 || err.status === 403)) {
          navigate('/login', { replace: true, state: { from: '/admin' } });
          return;
        }
        setError(err instanceof ApiError ? err.message : 'Could not load users.');
      } finally {
        setLoading(false);
      }
    },
    [navigate]
  );

  useEffect(() => {
    if (!isAdmin()) {
      navigate('/login', { replace: true, state: { from: '/admin' } });
      return;
    }
    load('');
  }, [navigate, load]);

  const openEditor = (u: AdminUser) => {
    if (editingId === u.id) {
      setEditingId(null);
      return;
    }
    setEditingId(u.id);
    setForm(toForm(u));
    setError(null);
  };

  const run = async (fn: () => Promise<unknown>, id: number) => {
    setBusyId(id);
    setError(null);
    try {
      await fn();
      setEditingId(null);
      await load(search);
    } catch (err) {
      setError(err instanceof ApiError ? err.message : 'Could not update the user.');
    } finally {
      setBusyId(null);
    }
  };

  const submitForm = (u: AdminUser) => {
    const payload = toPayload(form);
    if (u.role === 'USER') {
      run(() => setUserRole(u.id, 'SPECIALIST', payload), u.id);
    } else {
      run(() => updateSpecialistProfile(u.id, payload), u.id);
    }
  };

  return (
    <div className={styles.container}>
      <Header />
      <main className={styles.main}>
        <h1>admin dashboard</h1>

        <form
          className={styles.searchRow}
          onSubmit={(e) => {
            e.preventDefault();
            load(search);
          }}
        >
          <input
            type="search"
            placeholder="Search by name or email"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <button type="submit">Search</button>
          {search && (
            <button
              type="button"
              className={styles.linkBtn}
              onClick={() => {
                setSearch('');
                load('');
              }}
            >
              Clear
            </button>
          )}
        </form>

        {error && (
          <p className={styles.error} role="alert">
            {error}
          </p>
        )}

        {loading ? (
          <Loader />
        ) : (
          <div className={styles.tableScroll}>
            <table className={styles.table}>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Name</th>
                  <th>Email</th>
                  <th>City</th>
                  <th>Role</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {users.length === 0 && (
                  <tr>
                    <td colSpan={6} className={styles.empty}>
                      No users found.
                    </td>
                  </tr>
                )}
                {users.map((u) => (
                  <React.Fragment key={u.id}>
                    <tr className={u.isDeleted ? styles.deleted : undefined}>
                      <td>{u.id}</td>
                      <td>{fullName(u)}</td>
                      <td>{u.email}</td>
                      <td>{u.city ?? '—'}</td>
                      <td>
                        <span className={`${styles.chip} ${styles[u.role.toLowerCase()]}`}>
                          {u.role}
                        </span>
                      </td>
                      <td className={styles.actions}>
                        {u.role === 'USER' && (
                          <button
                            className={styles.primaryBtn}
                            disabled={busyId === u.id}
                            onClick={() => openEditor(u)}
                          >
                            {editingId === u.id ? 'Cancel' : 'Make specialist'}
                          </button>
                        )}
                        {u.role === 'SPECIALIST' && (
                          <>
                            <button
                              className={styles.primaryBtn}
                              disabled={busyId === u.id}
                              onClick={() => openEditor(u)}
                            >
                              {editingId === u.id ? 'Cancel' : 'Edit profile'}
                            </button>
                            <button
                              className={styles.dangerBtn}
                              disabled={busyId === u.id}
                              onClick={() => run(() => setUserRole(u.id, 'USER'), u.id)}
                            >
                              {busyId === u.id ? 'Working…' : 'Demote'}
                            </button>
                          </>
                        )}
                        {u.role === 'ADMIN' && <span className={styles.muted}>—</span>}
                      </td>
                    </tr>

                    {editingId === u.id && (
                      <tr className={styles.promoteRow}>
                        <td colSpan={6}>
                          <form
                            className={styles.promoteForm}
                            onSubmit={(e) => {
                              e.preventDefault();
                              submitForm(u);
                            }}
                          >
                            <label>
                              <span>Profession</span>
                              <input
                                type="text"
                                value={form.profession}
                                onChange={(e) =>
                                  setForm((f) => ({ ...f, profession: e.target.value }))
                                }
                              />
                            </label>
                            <label>
                              <span>Price</span>
                              <input
                                type="number"
                                min={0}
                                value={form.price}
                                onChange={(e) =>
                                  setForm((f) => ({ ...f, price: e.target.value }))
                                }
                              />
                            </label>
                            <label>
                              <span>Experience (years)</span>
                              <input
                                type="number"
                                min={0}
                                value={form.experience}
                                onChange={(e) =>
                                  setForm((f) => ({ ...f, experience: e.target.value }))
                                }
                              />
                            </label>
                            <label>
                              <span>Tags (comma-separated)</span>
                              <input
                                type="text"
                                placeholder="wiring, repair"
                                value={form.tags}
                                onChange={(e) =>
                                  setForm((f) => ({ ...f, tags: e.target.value }))
                                }
                              />
                            </label>
                            <label>
                              <span>Industry</span>
                              <select
                                value={form.industry}
                                onChange={(e) =>
                                  setForm((f) => ({
                                    ...f,
                                    industry: e.target.value as Industry | '',
                                  }))
                                }
                              >
                                <option value="">— not set —</option>
                                {INDUSTRIES.map((ind) => (
                                  <option key={ind} value={ind}>
                                    {INDUSTRY_LABELS[ind]}
                                  </option>
                                ))}
                              </select>
                            </label>
                            <button type="submit" disabled={busyId === u.id}>
                              {busyId === u.id
                                ? 'Saving…'
                                : u.role === 'USER'
                                  ? 'Promote'
                                  : 'Save'}
                            </button>
                            {u.role === 'USER' && (
                              <span className={styles.hint}>
                                All fields optional — the specialist can fill them later.
                              </span>
                            )}
                          </form>
                        </td>
                      </tr>
                    )}
                  </React.Fragment>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
};

export default AdminPage;
