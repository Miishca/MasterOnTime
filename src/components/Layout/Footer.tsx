import React from 'react';
import styles from './Footer.module.scss';
import { FaFacebookF, FaInstagram } from 'react-icons/fa';
import Button from '../Button/Button';
import { Link } from 'react-router-dom';
import imageMap from '../../utils/imageLoader';
import { NavLink } from 'react-router-dom';

const Footer: React.FC = () => {
  return (
    <footer className={styles.footerWrapper}>
      <div className={styles.footer}>
        <div className={styles.footerContent}>
          <h1>Need a service?</h1>
          <h4>Choose, click, and you're all set.</h4>
          <Link to="/book">
            <Button label="Book a service" variant="primary" />
          </Link>
        </div>
        <div className={styles.footerLinks}>
          <div className={styles.footerSocial}>
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaInstagram />
            </a>
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaFacebookF />
            </a>
          </div>
          <Link to="/" className={styles.logoContainer}>
            <img src={imageMap['logo']} alt="MasterOnTime logo" />
            <div className={styles.logo}>MasterOnTime</div>
          </Link>
          <nav>
            <NavLink to="/" className={({ isActive }) => (isActive ? styles.active : '')}>
              <Button label="home" variant="secondaryFooter" />
            </NavLink>
            <NavLink to="/services" className={({ isActive }) => (isActive ? styles.active : '')}>
              <Button label="services" variant="secondaryFooter" />
            </NavLink>
            <NavLink to="/people" className={({ isActive }) => (isActive ? styles.active : '')}>
             <Button label="people" variant="secondaryFooter" />
            </NavLink>
            <NavLink to="/profile" className={({ isActive }) => (isActive ? styles.active : '')}>
              <Button label="profile" variant="secondaryFooter" />
            </NavLink>
          </nav>
        </div>
      </div>
      <div className={styles.footerBottom}>
        <p>© 2025 MasterOnTime. All rights reserved.</p>
        <div>
          <a href="#">Terms&Conditions</a>
          <span> · </span>
          <a href="#">Privacy Policy</a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
