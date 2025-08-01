import React from 'react';
import styles from './LandingCarousel.module.scss';
import type { Landing } from '../../../types';

const services: Landing[] = [
  {
    image: '/src/assets/carousel1-tutoring.png',
    title: 'Tutoring services',
    tags: ['math tutor', 'language tutor', 'exam prep'],
  },
  {
    image: '/src/assets/carousel2-cleaning.png',
    title: 'Cleaning services',
    tags: ['home clean', 'deep cleaning', 'office clean'],
  },
  {
    image: '/src/assets/carousel3-design.png',
    title: 'Design services',
    tags: ['UI/UX design', 'logo creation', 'illustration'],
  },
  {
    image: '/src/assets/carousel4-beauty.png',
    title: 'Beauty services',
    tags: ['makeup', 'blow dry', 'colorist'],
  },
  {
    image: '/src/assets/carousel5-handyman.png',
    title: 'Renovation services',
    tags: ['painting', 'plumbing', 'electrical'],
  },
  {
    image: '/src/assets/carousel6-photographer.png',
    title: 'Photo services',
    tags: ['portrait', 'product photos', 'event shoots'],
  },
  {
    image: '/src/assets/carousel7-fitness.png',
    title: 'Trainer services',
    tags: ['training', 'weight loss', 'fitness coaching'],
  },
];

const LandingCarousel: React.FC = () => {
  return (
    <div className={styles.carousel}>
      {services.map((service, index) => (
        <div key={index} className={styles.carouselItem}>
          <img src={service.image} alt={service.title} className={styles.carouselImage} />
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