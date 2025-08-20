import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { register } from '../services/auth/authApi';
import styles from './RegisterPage.module.scss';

const RegisterPage: React.FC = () => {
  const [form, setForm] = useState({
    email: '',
    password: '',
    repeatPassword: '',
    firstName: '',
    lastName: '',
    phoneNumber: '',
    profileImageUrl: '',
    address: {
      city: '',
      street: '',
      zip: '',
      country: '',
    },
    role: 'USER' as 'USER' | 'SPECIALIST' | 'ADMIN',
  });

  const navigate = useNavigate();

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleAddressChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({
      ...form,
      address: {
        ...form.address,
        [e.target.name]: e.target.value,
      },
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await register(form);
      console.log('Registered:', res);
      if (res.token) {
        localStorage.setItem('token', res.token);
        navigate('/profile');
      }
    } catch (err: any) {
      console.error(err);
      alert(err.message || 'Registration failed');
    }
  };

  return (
    <div className={styles.container}>
      <h2>Register</h2>
      <form className={styles.form} onSubmit={handleSubmit}>
        <input
          name="email"
          type="email"
          placeholder="Email"
          onChange={handleChange}
          autoComplete="email"
        />
        <input
          name="password"
          type="password"
          placeholder="Password"
          onChange={handleChange}
          autoComplete="new-password"
        />
        <input
          name="repeatPassword"
          type="password"
          placeholder="Repeat Password"
          onChange={handleChange}
          autoComplete="new-password"
        />
        <input
          name="firstName"
          type="text"
          placeholder="First Name"
          onChange={handleChange}
        />
        <input
          name="lastName"
          type="text"
          placeholder="Last Name"
          onChange={handleChange}
        />
        <input
          name="phoneNumber"
          type="tel"
          placeholder="Phone Number"
          onChange={handleChange}
        />
        <input
          name="profileImageUrl"
          type="url"
          placeholder="Profile Image URL (optional)"
          onChange={handleChange}
        />

        <h4>Address</h4>
        <input
          name="street"
          type="text"
          placeholder="Street"
          onChange={handleAddressChange}
        />
        <input
          name="city"
          type="text"
          placeholder="City"
          onChange={handleAddressChange}
        />
        <input
          name="zip"
          type="text"
          placeholder="Zip Code"
          onChange={handleAddressChange}
        />
        <input
          name="country"
          type="text"
          placeholder="Country"
          onChange={handleAddressChange}
        />

        <select name="role" value={form.role} onChange={handleChange}>
          <option value="USER">User</option>
          <option value="SPECIALIST">Specialist</option>
          <option value="ADMIN">Admin</option>
        </select>
        <button type="submit">Register</button>
      </form>
    </div>
  );
};

export default RegisterPage;
