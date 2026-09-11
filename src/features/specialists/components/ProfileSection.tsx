import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import type { Specialist, SpecialistReview } from '../../../types';
import imageMap from '../../../utils/imageLoader';
import { fullName } from '../../../utils/fullName';
import { getSpecialistReviews, flagReview } from '../../reviews/reviewsApi';
import { getSpecialistPortfolio, type PortfolioItem } from '../../portfolio/portfolioApi';
import { addFavorite, getFavoriteIds, removeFavorite } from '../../favorites/favoritesApi';
import { ApiError, getRole, isAuthenticated } from '../../../services/auth/authApi';
import styles from './ProfileSection.module.scss';

interface ProfileSectionProps {
  specialist: Specialist;
}

const ProfileSection: React.FC<ProfileSectionProps> = ({ specialist }) => {
  const navigate = useNavigate();
  const [reviews, setReviews] = useState<SpecialistReview[]>([]);
  const [flagged, setFlagged] = useState<Set<number>>(new Set());
  const [portfolio, setPortfolio] = useState<PortfolioItem[]>([]);
  const [favorited, setFavorited] = useState(false);
  const [favBusy, setFavBusy] = useState(false);

  const canFavorite = isAuthenticated() && getRole() === 'USER';

  useEffect(() => {
    getSpecialistReviews(specialist.id).then(setReviews);
    getSpecialistPortfolio(specialist.id).then(setPortfolio);
    if (canFavorite) {
      getFavoriteIds().then((ids) => setFavorited(ids.includes(Number(specialist.id))));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [specialist.id]);

  const toggleFavorite = async () => {
    setFavBusy(true);
    try {
      if (favorited) {
        await removeFavorite(Number(specialist.id));
        setFavorited(false);
      } else {
        await addFavorite(Number(specialist.id));
        setFavorited(true);
      }
    } catch {
      /* non-fatal — button just doesn't toggle */
    } finally {
      setFavBusy(false);
    }
  };

  const report = async (reviewId: number) => {
    try {
      await flagReview(reviewId);
      setFlagged((prev) => new Set(prev).add(reviewId));
    } catch (err) {
      if (!(err instanceof ApiError)) throw err;
    }
  };

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
        {canFavorite && (
          <button
            type="button"
            className={favorited ? styles.favActive : styles.fav}
            disabled={favBusy}
            onClick={toggleFavorite}
          >
            {favorited ? '♥ Saved to favorites' : '♡ Save to favorites'}
          </button>
        )}
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

        {portfolio.length > 0 && (
          <section className={styles.portfolio}>
            <h3>Portfolio</h3>
            <div className={styles.portfolioGrid}>
              {portfolio.map((p) => (
                <figure key={p.id}>
                  <img src={p.imageUrl} alt={p.caption || 'Portfolio work'} />
                  {p.caption && <figcaption>{p.caption}</figcaption>}
                </figure>
              ))}
            </div>
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
                  {isAuthenticated() && (
                    <button
                      type="button"
                      className={styles.flagBtn}
                      disabled={flagged.has(r.id)}
                      onClick={() => report(r.id)}
                    >
                      {flagged.has(r.id) ? 'Reported' : 'Report'}
                    </button>
                  )}
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
