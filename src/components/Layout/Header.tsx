import React from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import styles from './Header.module.scss';
import Button from '../Button/Button';
import imageMap from '../../utils/imageLoader';
import { clearToken, isAdmin, isAuthenticated } from '../../services/auth/authApi';

const navClass = ({ isActive }: { isActive: boolean }) =>
  isActive ? styles.active : '';

const Header: React.FC = () => {
  const navigate = useNavigate();
  const authed = isAuthenticated();
  const admin = isAdmin();

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
