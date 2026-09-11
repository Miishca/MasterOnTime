import React from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import styles from './Header.module.scss';
import Button from '../Button/Button';
import imageMap from '../../utils/imageLoader';
import { clearToken, getRole, isAdmin, isAuthenticated } from '../../services/auth/authApi';
import NotificationBell from '../../features/notifications/NotificationBell';

const navClass = ({ isActive }: { isActive: boolean }) =>
  isActive ? styles.active : '';

const Header: React.FC = () => {
  const navigate = useNavigate();
  const authed = isAuthenticated();
  const admin = isAdmin();
  // Favorites — лише для юзерів-клієнтів (backend: requireRole('USER')).
  const plainUser = authed && getRole() === 'USER';

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

      <nav className={styles.nav}>
        {/* Primary — where you go in the product */}
        <div className={styles.navPrimary}>
          <NavLink to="/services" className={navClass}>
            <Button label="Services" variant="secondary" />
          </NavLink>
          <NavLink to="/people" className={navClass}>
            <Button label="People" variant="secondary" />
          </NavLink>
          {authed && (
            <NavLink to="/bookings" className={navClass}>
              <Button label="Bookings" variant="secondary" />
            </NavLink>
          )}
          {plainUser && (
            <NavLink to="/favorites" className={navClass}>
              <Button label="Favorites" variant="secondary" />
            </NavLink>
          )}
          {authed && admin && (
            <NavLink to="/admin" className={navClass}>
              <Button label="Admin" variant="secondary" />
            </NavLink>
          )}
        </div>

        {/* Account — who you are */}
        <div className={styles.navAccount}>
          {authed ? (
            <>
              <NotificationBell />
              <NavLink to="/profile" className={navClass}>
                <Button label="Profile" variant="secondary" />
              </NavLink>
              <Button label="Log out" variant="secondary" onClick={handleLogout} />
            </>
          ) : (
            <>
              <NavLink to="/login" className={navClass}>
                <Button label="Log in" variant="secondary" />
              </NavLink>
              <NavLink to="/register" className={navClass}>
                <Button label="Sign up" variant="primary" />
              </NavLink>
            </>
          )}
        </div>
      </nav>
    </header>
  );
};

export default Header;
