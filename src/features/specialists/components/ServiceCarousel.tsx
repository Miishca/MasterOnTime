import React, { useEffect, useRef } from 'react';
import styles from './ServiceCarousel.module.scss';
import type { Service } from '../../../types';
import imageMap from '../../../utils/imageLoader';

const services: Service[] = [
  {
    image: 'service-image1',
  },
  {
    image: 'service-image2',
  },
  {
    image: 'service-image3',
  },
  {
    image: 'service-image4',
  },
  {
    image: 'service-image5',
  },
  {
    image: 'service-image6',
  },
  {
    image: 'service-image7',
  },
];

const ServiceCarousel: React.FC = () => {
  const carouselRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const carousel = carouselRef.current;
    if (!carousel) return;

    const itemWidth = 900;
    const marginRight = 100;
    const scrollPosition = itemWidth + marginRight;
    carousel.scrollTo({ left: scrollPosition, behavior: 'auto' });

    const handleScroll = () => {
      const items = carousel.querySelectorAll(`.${styles.carouselItem}`);
      const carouselRect = carousel.getBoundingClientRect();
      const carouselCenter = carouselRect.left + carouselRect.width / 2;

      items.forEach((item) => {
        const image = item.querySelector(`.${styles.carouselImage}`);
        const itemRect = item.getBoundingClientRect();
        const itemCenter = itemRect.left + itemRect.width / 2;
        const distanceFromCenter = Math.abs(carouselCenter - itemCenter);

        if (image) {
          if (distanceFromCenter < 100) {
            image.classList.add(styles.active);
          } else {
            image.classList.remove(styles.active);
          }
        }
      });
    };

    carousel.addEventListener('scroll', handleScroll);
    handleScroll();

    return () => carousel.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className={styles.carousel} ref={carouselRef}>
      {services.map((service, index) => (
        <div key={index} className={styles.carouselItem}>
          <img
            src={imageMap[service.image]}
            alt={service.title}
            className={styles.carouselImage}
          />
        </div>
      ))}
    </div>
  );
};

export default ServiceCarousel;