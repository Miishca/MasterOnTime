import React from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import styles from './Header.module.scss';
import Button from '../Button/Button';
import imageMap from '../../utils/imageLoader';
import { clearToken, isAuthenticated } from '../../services/auth/authApi';

const navClass = ({ isActive }: { isActive: boolean }) =>
  isActive ? styles.active : '';

const Header: React.FC = () => {
  const navigate = useNavigate();
  const authed = isAuthenticated();

  const handleLogout = () => {
    clearToken();
    navigate('/login');
  };

  return (
    <header className={styles.header}>
      <Link to="/" className={styles.logoContainer}>
        <img src={imageMap['logo']} alt="MasterOnTime logo" />
        <div className={styles.logo}>MasterOnTime</div>
      </Link>

      <nav>
        <NavLink to="/services" className={navClass}>
          <Button label="services" variant="secondary" />
        </NavLink>
        <NavLink to="/people" className={navClass}>
          <Button label="people" variant="secondary" />
        </NavLink>

        {authed ? (
          <>
            <NavLink to="/profile" className={navClass}>
              <Button label="profile" variant="secondary" />
            </NavLink>
            <Button label="log out" variant="secondary" onClick={handleLogout} />
          </>
        ) : (
          <>
            <NavLink to="/login" className={navClass}>
              <Button label="log in" variant="secondary" />
            </NavLink>
            <NavLink to="/register" className={navClass}>
              <Button label="register" variant="secondary" />
            </NavLink>
          </>
        )}

        <NavLink to="/book" className={navClass}>
          <Button label="Book" variant="primary" />
        </NavLink>
      </nav>
    </header>
  );
};

export default Header;
