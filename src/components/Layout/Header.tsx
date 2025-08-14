import React from 'react';
import styles from './Header.module.scss';
import Button from '../Button/Button';
import { Link } from 'react-router-dom';
import imageMap from '../../utils/imageLoader';
import { NavLink } from 'react-router-dom';

const Header: React.FC = () => (
  <header className={styles.header}>
    <Link to="/" className={styles.logoContainer}>
      <img src={imageMap['logo']} alt="MasterOnTime logo" />
      <div className={styles.logo}>MasterOnTime</div>
    </Link>
    <nav>
      <NavLink
        to="/services"
        className={({ isActive }) => (isActive ? styles.active : '')}
      >
        <Button label="services" variant="secondary" />
      </NavLink>
      <NavLink
        to="/people"
        className={({ isActive }) => (isActive ? styles.active : '')}
      >
        <Button label="people" variant="secondary" />
      </NavLink>
      <NavLink
        to="/profile"
        className={({ isActive }) => (isActive ? styles.active : '')}
      >
        <Button label="profile" variant="secondary" />
      </NavLink>
      <NavLink
        to="/book"
        className={({ isActive }) => (isActive ? styles.active : '')}
      >
        <Button label="Book" variant="primary" />
      </NavLink>
    </nav>
  </header>
);

export default Header;
