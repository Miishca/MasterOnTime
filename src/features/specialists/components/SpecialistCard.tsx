import React from 'react';
import styles from './SpecialistCard.module.scss';
import imageMap from '../../../utils/imageLoader';
import { useNavigate } from 'react-router-dom';

interface SpecialistCardProps {
  id: string;
  firstName: string;
  profession?: string;
  city?: string;
  tags?: string[];
  image?: string;
}

const SpecialistCard: React.FC<SpecialistCardProps> = ({
  id,
  firstName: firstName,
  tags,
  image = 'specialist-1',
}) => {
  const navigate = useNavigate();
  const handleCardClick = () => {
    navigate(`/people/${id}`, { state: { scrollToTop: true } });
  };

  return (
    <div className={styles.card} onClick={handleCardClick}>
      <img
        src={imageMap[image]}
        alt={`${firstName}'s profile`}
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
