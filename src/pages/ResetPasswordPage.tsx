import React, { useState } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { ApiError, resetPassword } from '../services/auth/authApi';
import styles from './LoginPage.module.scss';

const ResetPasswordPage: React.FC = () => {
  const navigate = useNavigate();
  const [params] = useSearchParams();
  const token = params.get('token') ?? '';

  const [form, setForm] = useState({ password: '', repeatPassword: '' });
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

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
      await resetPassword(token, form.password, form.repeatPassword);
      navigate('/login', { replace: true, state: { registered: false, reset: true } });
    } catch (err) {
      setError(
        err instanceof ApiError ? err.message : 'Could not reset your password. Please try again.'
      );
    } finally {
      setSubmitting(false);
    }
  };

  if (!token) {
    return (
      <div className={styles.container}>
        <h2>Reset password</h2>
        <p className={styles.error} role="alert">
          This link is missing its reset token. Request a new one.
        </p>
        <p className={styles.switch}>
          <Link to="/forgot-password">Request a new reset link</Link>
        </p>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <h2>Reset password</h2>

      <form className={styles.form} onSubmit={handleSubmit}>
        <label className={styles.field}>
          <span>New password</span>
          <input
            name="password"
            type="password"
            autoComplete="new-password"
            required
            minLength={8}
            value={form.password}
            onChange={handleChange}
          />
        </label>

        <label className={styles.field}>
          <span>Repeat new password</span>
          <input
            name="repeatPassword"
            type="password"
            autoComplete="new-password"
            required
            minLength={8}
            value={form.repeatPassword}
            onChange={handleChange}
          />
        </label>

        {error && (
          <p className={styles.error} role="alert">
            {error}
          </p>
        )}

        <button type="submit" disabled={submitting}>
          {submitting ? 'Saving…' : 'Set new password'}
        </button>
      </form>

      <p className={styles.switch}>
        <Link to="/login">Back to log in</Link>
      </p>
    </div>
  );
};

export default ResetPasswordPage;
