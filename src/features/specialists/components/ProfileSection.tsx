import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import type { Specialist, SpecialistReview } from '../../../types';
import imageMap from '../../../utils/imageLoader';
import { fullName } from '../../../utils/fullName';
import { getSpecialistReviews } from '../../reviews/reviewsApi';
import styles from './ProfileSection.module.scss';

interface ProfileSectionProps {
  specialist: Specialist;
}

const ProfileSection: React.FC<ProfileSectionProps> = ({ specialist }) => {
  const navigate = useNavigate();
  const [reviews, setReviews] = useState<SpecialistReview[]>([]);

  useEffect(() => {
    getSpecialistReviews(specialist.id).then(setReviews);
  }, [specialist.id]);

  return (
    <div className={styles.profile}>
      <div className={styles.left}>
        <div className={styles.avatarContainer}>
          <img
            src={specialist.image || imageMap['default']}
            alt={fullName(specialist)}
            className={styles.avatar}
          />
        </div>
        {specialist.rating > 0 && (
          <div className={styles.rating}>{specialist.rating.toFixed(1)} ★</div>
        )}
        {Number(specialist.price) > 0 && (
          <div className={styles.price}>{specialist.price}</div>
        )}
        <button
          className={styles.book}
          onClick={() => navigate(`/book/${specialist.id}`)}
        >
          Book consultation
        </button>
      </div>

      <div className={styles.right}>
        <h1>{fullName(specialist)}</h1>
        <span className={styles.elements}>{specialist.profession}</span>

        {specialist.tags.length > 0 && (
          <section>
            <h3>Specialties</h3>
            <div className={styles.tags}>
              {specialist.tags.map((tag) => (
                <span key={tag}>{tag}</span>
              ))}
            </div>
          </section>
        )}

        {specialist.experience > 0 && (
          <section className={styles.experience}>
            <h3>Experience</h3>
            <p>{specialist.experience}+ years</p>
          </section>
        )}

        {specialist.about && (
          <section className={styles.about}>
            <h3>About</h3>
            <p>{specialist.about}</p>
          </section>
        )}

        <section className={styles.reviews}>
          <h3>Reviews {reviews.length > 0 && `(${reviews.length})`}</h3>
          {reviews.length === 0 ? (
            <p className={styles.noReviews}>No reviews yet.</p>
          ) : (
            <ul>
              {reviews.map((r) => (
                <li key={r.id} className={styles.review}>
                  <div className={styles.reviewHead}>
                    <span className={styles.reviewAuthor}>{r.authorName}</span>
                    <span className={styles.reviewStars}>
                      {'★'.repeat(r.rating)}
                      {'☆'.repeat(5 - r.rating)}
                    </span>
                  </div>
                  {r.comment && <p className={styles.reviewComment}>{r.comment}</p>}
                </li>
              ))}
            </ul>
          )}
        </section>
      </div>
    </div>
  );
};

export default ProfileSection;
