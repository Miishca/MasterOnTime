import React from 'react';
import styles from './Header.module.scss';
import Button from '../Button/Button';
import { Link } from 'react-router-dom';
import imageMap from '../../utils/imageLoader';

const Header: React.FC = () => (
  <header className={styles.header}>
    <Link to="/" className={styles.logoContainer}>
      <img src={imageMap['logo']} alt="MasterOnTime logo" />
      <div className={styles.logo}>MasterOnTime</div>
    </Link>
    <nav>
      <Link to="/services">
        <Button label="services" variant="secondary" />
      </Link>
      <Link to="/people">
        <Button label="people" variant="secondary" />
      </Link>
      <Link to="/profile">
        <Button label="profile" variant="secondary" />
      </Link>
      <Link to="/book">
        <Button label="Book" variant="primary" />
      </Link>
    </nav>
  </header>
);

export default Header;
