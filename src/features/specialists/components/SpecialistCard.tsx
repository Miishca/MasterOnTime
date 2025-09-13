import React from 'react';
import styles from './SpecialistCard.module.scss';
import imageMap from '../../../utils/imageLoader';
import { useNavigate } from 'react-router-dom';
import type { Specialist } from '../../../types';

const SpecialistCard: React.FC<Specialist> = ({
  id,
  firstName,
  lastName,
  image,
  tags,
}) => {
  const navigate = useNavigate();
  const handleCardClick = () => {
    navigate(`/people/${id}`, { state: { scrollToTop: true } });
  };

  return (
    <div className={styles.card} onClick={handleCardClick}>
      <img
        src={image || imageMap['default']}
        alt={`${firstName} ${lastName}'s profile`}
        className={styles.cardImage}
      />
      <h3 className={styles.cardName}>{firstName}</h3>
      <div className={styles.cardTags}>
        {tags?.map((tag, index) => (
          <span key={index} className={styles.cardTag}>
            {tag}
          </span>
        ))}
      </div>
    </div>
  );
};

export default SpecialistCard;
