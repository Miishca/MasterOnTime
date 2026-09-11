import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ApiError, forgotPassword } from '../services/auth/authApi';
import styles from './LoginPage.module.scss';

const ForgotPasswordPage: React.FC = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [sent, setSent] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (submitting) return;
    setError(null);
    setSubmitting(true);
    try {
      const res = await forgotPassword(email.trim());
      setSent(true);
      // Немає email-сервісу: у дев-режимі бекенд повертає сирий токен просто у
      // відповіді — переходимо одразу на форму скидання, підставивши його.
      if (res.devResetToken) {
        navigate(`/reset-password?token=${encodeURIComponent(res.devResetToken)}`);
      }
    } catch (err) {
      setError(err instanceof ApiError ? err.message : 'Something went wrong. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className={styles.container}>
      <h2>Forgot password</h2>

      {sent ? (
        <p className={styles.success} role="status">
          If that email is registered, a reset link has been sent.
        </p>
      ) : (
        <form className={styles.form} onSubmit={handleSubmit}>
          <label className={styles.field}>
            <span>Email</span>
            <input
              type="email"
              autoComplete="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </label>

          {error && (
            <p className={styles.error} role="alert">
              {error}
            </p>
          )}

          <button type="submit" disabled={submitting}>
            {submitting ? 'Sending…' : 'Send reset link'}
          </button>
        </form>
      )}

      <p className={styles.switch}>
        <Link to="/login">Back to log in</Link>
      </p>
    </div>
  );
};

export default ForgotPasswordPage;
