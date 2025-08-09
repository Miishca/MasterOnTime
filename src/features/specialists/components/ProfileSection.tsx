import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import type { Specialist } from '../../../types';
import { getSpecialists } from '../services/specialistsApi';
import imageMap from '../../../utils/imageLoader';
import styles from './ProfileSection.module.scss';

const ProfileSection = () => {
  const { id } = useParams();
  const [specialist, setSpecialist] = useState<Specialist | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      const { data } = await getSpecialists({});
      const found = data.find((s) => s.id === id);
      setSpecialist(found || null);
    };
    fetchData();
  }, [id]);

  if (!specialist)
    return (
      <div className={styles.loaderContainer}>
        <div className={styles.spinner}></div>
      </div>
    );

  return (
    <div className={styles.profile}>
      <div className={styles.left}>
        <div className={styles.avatarContainer}>
          <img
            src={imageMap[specialist.image ?? 'default']}
            alt={specialist.name}
            className={styles.avatar}
          />
        </div>
        <div className={styles.rating}>{specialist.rating}</div>
        <div className={styles.buttons}>
          <button className={styles.button}>Message</button>
          <a href={`tel:${specialist.phone}`} className={styles.button}>
            Call
          </a>
          <button className={styles.button}>Meeting</button>
        </div>
        <div className={styles.price}>{specialist.price}</div>
        <button className={styles.book}>Book consultation</button>
      </div>
      <div className={styles.right}>
        <h1>
          {specialist.name} {specialist.lastname}
        </h1>
        <span className={styles.elements}>{specialist.profession}</span>

        <section>
          <h3>Specialties</h3>
          <div className={styles.tags}>
            {specialist.tags.map((tag) => (
              <span key={tag}>{tag}</span>
            ))}
          </div>
        </section>

        <section>
          <h3>Issues</h3>
          <div className={styles.tags}>
            {specialist.issues.map((issue) => (
              <span key={issue}>{issue}</span>
            ))}
          </div>
        </section>

        <section className={styles.experience}>
          <h3>Experience</h3>
          <p>{specialist.experience}+ years</p>
        </section>

        <section className={styles.about}>
          <h3>About</h3>
          <p>{specialist.about}</p>
        </section>
      </div>
    </div>
  );
};

export default ProfileSection;
