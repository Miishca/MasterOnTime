import React from 'react';
import styles from './Loader.module.scss';

interface LoaderProps {
  fullscreen?: boolean;
}

const Loader: React.FC<LoaderProps> = ({ fullscreen = false }) => {
  return (
    <div className={fullscreen ? styles.fullscreen : styles.loaderContainer}>
      <div className={styles.spinner}></div>
    </div>
  );
};

export default Loader;
