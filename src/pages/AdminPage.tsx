import React, { useCallback, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Layout/Header';
import Footer from '../components/Layout/Footer';
import Loader from '../components/Loader/Loader';
import { ApiError, isAdmin } from '../services/auth/authApi';
import {
  listUsers,
  setUserRole,
  type AdminUser,
  type SpecialistProfileInput,
} from '../features/admin/adminApi';
import { fullName } from '../utils/fullName';
import styles from './AdminPage.module.scss';

const AdminPage: React.FC = () => {
  const navigate = useNavigate();
  const [users, setUsers] = useState<AdminUser[]>([]);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [busyId, setBusyId] = useState<number | null>(null);
  const [promoting, setPromoting] = useState<number | null>(null);
  const [form, setForm] = useState<SpecialistProfileInput>({});

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

  const runRoleChange = async (
    id: number,
    role: AdminUser['role'],
    profile?: SpecialistProfileInput
  ) => {
    setBusyId(id);
    setError(null);
    try {
      await setUserRole(id, role, profile);
      setPromoting(null);
      setForm({});
      await load(search);
    } catch (err) {
      setError(err instanceof ApiError ? err.message : 'Could not update the user.');
    } finally {
      setBusyId(null);
    }
  };

  return (
    <div className={styles.container}>
      <Header />
      <main className={styles.main}>
        <h1>Users</h1>

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
                  <th>Action</th>
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
                      <td>
                        {u.role === 'USER' && (
                          <button
                            className={styles.primaryBtn}
                            disabled={busyId === u.id}
                            onClick={() =>
                              setPromoting(promoting === u.id ? null : u.id)
                            }
                          >
                            {promoting === u.id ? 'Cancel' : 'Make specialist'}
                          </button>
                        )}
                        {u.role === 'SPECIALIST' && (
                          <button
                            className={styles.dangerBtn}
                            disabled={busyId === u.id}
                            onClick={() => runRoleChange(u.id, 'USER')}
                          >
                            {busyId === u.id ? 'Working…' : 'Demote to user'}
                          </button>
                        )}
                        {u.role === 'ADMIN' && <span className={styles.muted}>—</span>}
                      </td>
                    </tr>

                    {promoting === u.id && (
                      <tr className={styles.promoteRow}>
                        <td colSpan={6}>
                          <form
                            className={styles.promoteForm}
                            onSubmit={(e) => {
                              e.preventDefault();
                              runRoleChange(u.id, 'SPECIALIST', {
                                profession: form.profession || undefined,
                                about: form.about || undefined,
                                price:
                                  form.price !== undefined && !Number.isNaN(form.price)
                                    ? form.price
                                    : undefined,
                                experience:
                                  form.experience !== undefined &&
                                  !Number.isNaN(form.experience)
                                    ? form.experience
                                    : undefined,
                                tags: form.tags,
                              });
                            }}
                          >
                            <label>
                              <span>Profession</span>
                              <input
                                type="text"
                                value={form.profession ?? ''}
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
                                value={form.price ?? ''}
                                onChange={(e) =>
                                  setForm((f) => ({
                                    ...f,
                                    price: e.target.value === '' ? undefined : Number(e.target.value),
                                  }))
                                }
                              />
                            </label>
                            <label>
                              <span>Experience (years)</span>
                              <input
                                type="number"
                                min={0}
                                value={form.experience ?? ''}
                                onChange={(e) =>
                                  setForm((f) => ({
                                    ...f,
                                    experience:
                                      e.target.value === '' ? undefined : Number(e.target.value),
                                  }))
                                }
                              />
                            </label>
                            <label>
                              <span>Tags (comma-separated)</span>
                              <input
                                type="text"
                                placeholder="wiring, repair"
                                onChange={(e) =>
                                  setForm((f) => ({
                                    ...f,
                                    tags: e.target.value
                                      .split(',')
                                      .map((t) => t.trim())
                                      .filter(Boolean),
                                  }))
                                }
                              />
                            </label>
                            <button type="submit" disabled={busyId === u.id}>
                              {busyId === u.id ? 'Saving…' : 'Promote'}
                            </button>
                            <span className={styles.hint}>
                              All fields optional — you can fill them later.
                            </span>
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
