import React from 'react';
import styles from './LandingCarousel.module.scss';
import type { Landing } from '../../../types';
import imageMap from '../../../utils/imageLoader';

const services: Landing[] = [
  {
    image: 'carousel1-tutoring',
    title: 'Tutoring services',
    tags: ['math tutor', 'language tutor', 'exam prep'],
  },
  {
    image: 'carousel2-cleaning',
    title: 'Cleaning services',
    tags: ['home clean', 'deep cleaning', 'office clean'],
  },
  {
    image: 'carousel3-design',
    title: 'Design services',
    tags: ['UI/UX design', 'logo creation', 'illustration'],
  },
  {
    image: 'carousel4-beauty',
    title: 'Beauty services',
    tags: ['makeup', 'blow dry', 'colorist'],
  },
  {
    image: 'carousel5-handyman',
    title: 'Renovation services',
    tags: ['painting', 'plumbing', 'electrical'],
  },
  {
    image: 'carousel6-photographer',
    title: 'Photo services',
    tags: ['portrait', 'product photos', 'event shoots'],
  },
  {
    image: 'carousel7-fitness',
    title: 'Trainer services',
    tags: ['training', 'weight loss', 'fitness coaching'],
  },
];

const LandingCarousel: React.FC = () => {
  return (
    <div className={styles.carousel}>
      {services.map((service, index) => (
        <div key={index} className={styles.carouselItem}>
          <img src={imageMap[service.image]} alt={service.title} className={styles.carouselImage} />
          <h3 className={styles.carouselTitle}>{service.title}</h3>
          <div className={styles.carouselTags}>
            {service.tags.map((tag, tagIndex) => (
              <span key={tagIndex} className={styles.carouselTag}>{tag}</span>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default LandingCarousel;