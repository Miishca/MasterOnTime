import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ApiError, isAuthenticated, register } from '../services/auth/authApi';
import styles from './RegisterPage.module.scss';

const INITIAL_FORM = {
  email: '',
  password: '',
  repeatPassword: '',
  firstName: '',
  lastName: '',
  phoneNumber: '',
  profileImageUrl: '',
  address: { street: '', city: '', zip: '', country: '' },
  role: 'USER' as 'USER' | 'SPECIALIST',
};

const RegisterPage: React.FC = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState(INITIAL_FORM);
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (isAuthenticated()) navigate('/', { replace: true });
  }, [navigate]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleAddressChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, address: { ...prev.address, [name]: value } }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (submitting) return;
    setError(null);

    if (form.password !== form.repeatPassword) {
      setError('Passwords do not match.');
      return;
    }

    setSubmitting(true);
    try {
      await register({
        ...form,
        phoneNumber: form.phoneNumber || undefined,
        profileImageUrl: form.profileImageUrl || undefined,
      });
      navigate('/login', { replace: true, state: { registered: true } });
    } catch (err) {
      setError(
        err instanceof ApiError
          ? err.message
          : 'Could not create your account. Please try again.'
      );
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className={styles.container}>
      <h2>Create an account</h2>

      <form className={styles.form} onSubmit={handleSubmit}>
        <label className={styles.field}>
          <span>Email</span>
          <input name="email" type="email" autoComplete="email" required
            value={form.email} onChange={handleChange} />
        </label>

        <div className={styles.row}>
          <label className={styles.field}>
            <span>First name</span>
            <input name="firstName" type="text" autoComplete="given-name" required
              value={form.firstName} onChange={handleChange} />
          </label>
          <label className={styles.field}>
            <span>Last name</span>
            <input name="lastName" type="text" autoComplete="family-name" required
              value={form.lastName} onChange={handleChange} />
          </label>
        </div>

        <label className={styles.field}>
          <span>Password</span>
          <input name="password" type="password" autoComplete="new-password" required minLength={6}
            value={form.password} onChange={handleChange} />
        </label>

        <label className={styles.field}>
          <span>Repeat password</span>
          <input name="repeatPassword" type="password" autoComplete="new-password" required
            value={form.repeatPassword} onChange={handleChange} />
        </label>

        <label className={styles.field}>
          <span>Phone number <em>(optional)</em></span>
          <input name="phoneNumber" type="tel" autoComplete="tel"
            value={form.phoneNumber} onChange={handleChange} />
        </label>

        <label className={styles.field}>
          <span>Profile image URL <em>(optional)</em></span>
          <input name="profileImageUrl" type="url" inputMode="url"
            value={form.profileImageUrl} onChange={handleChange} />
        </label>

        <fieldset className={styles.fieldset}>
          <legend>Address</legend>
          <label className={styles.field}>
            <span>Street</span>
            <input name="street" type="text" autoComplete="address-line1" required
              value={form.address.street} onChange={handleAddressChange} />
          </label>
          <div className={styles.row}>
            <label className={styles.field}>
              <span>City</span>
              <input name="city" type="text" autoComplete="address-level2" required
                value={form.address.city} onChange={handleAddressChange} />
            </label>
            <label className={styles.field}>
              <span>ZIP code</span>
              <input name="zip" type="text" autoComplete="postal-code" required
                value={form.address.zip} onChange={handleAddressChange} />
            </label>
          </div>
          <label className={styles.field}>
            <span>Country</span>
            <input name="country" type="text" autoComplete="country-name" required
              value={form.address.country} onChange={handleAddressChange} />
          </label>
        </fieldset>

        <label className={styles.field}>
          <span>I am registering as</span>
          <select name="role" value={form.role} onChange={handleChange}>
            <option value="USER">Client</option>
            <option value="SPECIALIST">Specialist</option>
          </select>
        </label>

        {error && (
          <p className={styles.error} role="alert">
            {error}
          </p>
        )}

        <button type="submit" disabled={submitting}>
          {submitting ? 'Creating account…' : 'Register'}
        </button>
      </form>

      <p className={styles.switch}>
        Already have an account? <Link to="/login">Log in</Link>
      </p>
    </div>
  );
};

export default RegisterPage;
