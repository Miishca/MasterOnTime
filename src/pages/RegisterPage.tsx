import React, { useEffect, useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ApiError, isAuthenticated, register } from '../services/auth/authApi';
import {
  ACCEPTED_IMAGE_TYPES,
  readImageAsBase64,
  validateImageFile,
} from '../utils/imageFile';
import styles from './RegisterPage.module.scss';

const INITIAL_FORM = {
  email: '',
  password: '',
  repeatPassword: '',
  firstName: '',
  lastName: '',
  phoneNumber: '',
  address: { street: '', city: '', zip: '', country: '' },
};

const RegisterPage: React.FC = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState(INITIAL_FORM);
  const [photo, setPhoto] = useState<{ file: File; preview: string } | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isAuthenticated()) navigate('/', { replace: true });
  }, [navigate]);

  // Revoke the object URL when the preview changes or the page unmounts.
  useEffect(() => () => {
    if (photo) URL.revokeObjectURL(photo.preview);
  }, [photo]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleAddressChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, address: { ...prev.address, [name]: value } }));
  };

  const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setError(null);
    const file = e.target.files?.[0];
    if (!file) return;

    const problem = validateImageFile(file);
    if (problem) {
      setError(problem);
      e.target.value = '';
      return;
    }
    setPhoto((prev) => {
      if (prev) URL.revokeObjectURL(prev.preview);
      return { file, preview: URL.createObjectURL(file) };
    });
  };

  const clearPhoto = () => {
    setPhoto((prev) => {
      if (prev) URL.revokeObjectURL(prev.preview);
      return null;
    });
    if (fileInputRef.current) fileInputRef.current.value = '';
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
      const profileImageBase64 = photo ? await readImageAsBase64(photo.file) : undefined;
      await register({
        ...form,
        phoneNumber: form.phoneNumber || undefined,
        profileImageBase64,
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

        <div className={styles.field}>
          <span>Profile photo <em>(optional)</em></span>
          <div className={styles.photoRow}>
            {photo && (
              <img src={photo.preview} alt="Selected profile" className={styles.photoPreview} />
            )}
            <input
              ref={fileInputRef}
              type="file"
              accept={ACCEPTED_IMAGE_TYPES.join(',')}
              onChange={handlePhotoChange}
            />
            {photo && (
              <button type="button" className={styles.linkButton} onClick={clearPhoto}>
                Remove
              </button>
            )}
          </div>
          <small className={styles.hint}>PNG, JPEG or WebP, up to 2 MB.</small>
        </div>

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
