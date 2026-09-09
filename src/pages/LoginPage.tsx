import React, { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { ApiError, isAuthenticated, login } from '../services/auth/authApi';
import styles from './LoginPage.module.scss';

type LoginLocationState = { from?: string; registered?: boolean } | null;

const LoginPage: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const state = location.state as LoginLocationState;
  const redirectTo = state?.from ?? '/';

  const [form, setForm] = useState({ email: '', password: '' });
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  // Don't show the login form to someone who is already signed in.
  useEffect(() => {
    if (isAuthenticated()) navigate('/', { replace: true });
  }, [navigate]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (submitting) return;

    setError(null);
    setSubmitting(true);
    try {
      await login(form.email.trim(), form.password);
      navigate(redirectTo, { replace: true });
    } catch (err) {
      setError(
        err instanceof ApiError
          ? err.message
          : 'Could not sign you in. Please try again.'
      );
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className={styles.container}>
      <h2>Log in</h2>

      {state?.registered && (
        <p className={styles.success} role="status">
          Account created — please log in.
        </p>
      )}

      <form className={styles.form} onSubmit={handleSubmit}>
        <label className={styles.field}>
          <span>Email</span>
          <input
            name="email"
            type="email"
            autoComplete="email"
            required
            value={form.email}
            onChange={handleChange}
          />
        </label>

        <label className={styles.field}>
          <span>Password</span>
          <input
            name="password"
            type="password"
            autoComplete="current-password"
            required
            value={form.password}
            onChange={handleChange}
          />
        </label>

        {error && (
          <p className={styles.error} role="alert">
            {error}
          </p>
        )}

        <button type="submit" disabled={submitting}>
          {submitting ? 'Logging in…' : 'Log in'}
        </button>
      </form>

      <p className={styles.switch}>
        Don&rsquo;t have an account? <Link to="/register">Register</Link>
      </p>
    </div>
  );
};

export default LoginPage;
