import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { login } from '../services/auth/authApi';
import styles from './LoginPage.module.scss';

const LoginPage: React.FC = () => {
  const [form, setForm] = useState({ email: '', password: '' });
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const token = await login(form.email, form.password);
      if (!token) throw new Error('Token not received');
      localStorage.setItem('token', token);
      navigate('/profile');
    } catch (err: any) {
      console.error(err);
      alert(err.response?.data?.error || err.message || 'Login failed');
    }
  };

  return (
    <div className={styles.container}>
      <h2>Login</h2>
      <form className={styles.form} onSubmit={handleSubmit}>
        <input
          name="email"
          type="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
          autoComplete="email"
        />
        <input
          name="password"
          type="password"
          placeholder="Password"
          value={form.password}
          onChange={handleChange}
          autoComplete="current-password"
        />
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default LoginPage;
