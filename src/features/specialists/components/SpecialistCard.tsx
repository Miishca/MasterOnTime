import React from 'react';
import type { Specialist } from '../../../types';
import styles from './SpecialistCard.module.scss';
import Button from '../../../components/Button/Button';

const SpecialistCard: React.FC<{ specialist: Specialist; onView: () => void }> = ({ specialist, onView }) => (
  <div className={styles.card}>
    <h3>{specialist.name}</h3>
    <p>{specialist.category} | {specialist.city}</p>
    <Button label="View Profile" onClick={onView} />
  </div>
);

export default SpecialistCard;