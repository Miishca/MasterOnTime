import React, { useEffect, useRef, useState } from 'react';
import Header from '../components/Layout/Header';
import Footer from '../components/Layout/Footer';
import styles from './ProfilePageSetup.module.scss';
import type { PublicSpecialist, UserProfile } from '../types';
import imageMap from '../utils/imageLoader';
import { useNavigate } from 'react-router-dom';
import EditModal from '../components/Modal/EditModal';
import { ApiError, getRole, updateProfile } from '../services/auth/authApi';
import {
  getMyProfile,
  updateMyProfile,
} from '../features/specialists/services/specialistsApi';
import {
  ACCEPTED_IMAGE_TYPES,
  readImageAsBase64,
  validateImageFile,
} from '../utils/imageFile';
import { fullName } from '../utils/fullName';
import { useUserProfile } from '../hooks/useUserProfile';
import ServicesManager from '../features/services/ServicesManager';
import Loader from '../components/Loader/Loader';
import useScrollToTop from '../hooks/useScrollToTop';

const ProfilePageSetup: React.FC = () => {
  useScrollToTop();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalData, setModalData] = useState<Record<string, any>>({});
  const [photoBusy, setPhotoBusy] = useState(false);
  const [photoError, setPhotoError] = useState<string | null>(null);
  const photoInputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();
  const { userProfile, setUserProfile, loading, error } = useUserProfile();

  const isSpecialist = getRole() === 'SPECIALIST';
  const [spec, setSpec] = useState<PublicSpecialist | null>(null);
  const [specEditing, setSpecEditing] = useState(false);
  const [specBusy, setSpecBusy] = useState(false);
  const [specError, setSpecError] = useState<string | null>(null);
  const [specForm, setSpecForm] = useState({
    profession: '',
    price: '',
    experience: '',
    about: '',
    tags: '',
  });

  useEffect(() => {
    if (!isSpecialist) return;
    getMyProfile()
      .then((p) => {
        setSpec(p);
        setSpecForm({
          profession: p.profession,
          price: Number(p.price) > 0 ? String(Number(p.price)) : '',
          experience: p.experience > 0 ? String(p.experience) : '',
          about: p.about,
          tags: p.tags.join(', '),
        });
      })
      .catch(() => setSpecError('Could not load your specialist profile.'));
  }, [isSpecialist]);

  const saveSpecProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    setSpecBusy(true);
    setSpecError(null);
    try {
      const updated = await updateMyProfile({
        profession: specForm.profession.trim() || undefined,
        about: specForm.about.trim() || undefined,
        price: specForm.price === '' ? undefined : Number(specForm.price),
        experience: specForm.experience === '' ? undefined : Number(specForm.experience),
        tags: specForm.tags
          ? specForm.tags.split(',').map((t) => t.trim()).filter(Boolean)
          : undefined,
      });
      setSpec(updated);
      setSpecEditing(false);
    } catch (err) {
      setSpecError(
        err instanceof ApiError ? err.message : 'Could not save. Please try again.'
      );
    } finally {
      setSpecBusy(false);
    }
  };

  const handlePhotoSelected = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    e.target.value = '';
    if (!file || !userProfile) return;

    setPhotoError(null);
    const problem = validateImageFile(file);
    if (problem) {
      setPhotoError(problem);
      return;
    }

    setPhotoBusy(true);
    try {
      const profileImageBase64 = await readImageAsBase64(file);
      const updated = await updateProfile({ ...userProfile, profileImageBase64 });
      setUserProfile(updated);
    } catch (err) {
      console.error('Failed to update profile photo', err);
      setPhotoError('Could not update the photo. Please try again.');
    } finally {
      setPhotoBusy(false);
    }
  };

  const openEditModal = (data: Record<string, any>) => {
    setModalData(data);
    setIsModalOpen(true);
  };

  const handleSave = async (updatedData: Record<string, any>) => {
    if (!userProfile) return;

    try {
      const payload: Partial<UserProfile> = {
        ...userProfile,
        ...updatedData,
      };

      const hasAddressFields =
        'country' in updatedData ||
        'city' in updatedData ||
        'street' in updatedData ||
        'zip' in updatedData;

      if (hasAddressFields) {
        payload.address = {
          country: updatedData.country ?? userProfile.address?.country ?? '',
          city: updatedData.city ?? userProfile.address?.city ?? '',
          street: updatedData.street ?? userProfile.address?.street ?? '',
          zip: updatedData.zip ?? userProfile.address?.zip ?? '',
        };

        delete (payload as any).country;
        delete (payload as any).city;
        delete (payload as any).street;
        delete (payload as any).zip;
      }

      const updated = await updateProfile(payload);
      setUserProfile(updated);
    } catch (err) {
      console.error('Failed to save profile changes', err);
    } finally {
      setIsModalOpen(false);
    }
  };

  if (loading) {
    return (
      <div className={styles.container}>
        <Header />
        <Loader />
        <Footer />
      </div>
    );
  }

  if (error || !userProfile) {
    return (
      <div className={styles.container}>
        <Header />
        <div className={styles.errorMessage}>
          <p>{error || 'Failed to load profile data.'}</p>
          <button onClick={() => navigate('/login')}>Go to Login</button>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <Header />

      <div className={styles.profileWrapper}>
        <div className={styles.leftColumn}>
          <div className={styles.avatarContainer}>
            <img
              src={userProfile.profileImageUrl || imageMap['default']}
              alt={fullName(userProfile)}
              className={styles.avatar}
            />
          </div>
          <input
            ref={photoInputRef}
            type="file"
            accept={ACCEPTED_IMAGE_TYPES.join(',')}
            onChange={handlePhotoSelected}
            hidden
          />
          <button
            type="button"
            className={styles.changePhoto}
            onClick={() => photoInputRef.current?.click()}
            disabled={photoBusy}
          >
            {photoBusy ? 'Uploading…' : 'Change photo'}
          </button>
          {photoError && (
            <p className={styles.photoError} role="alert">
              {photoError}
            </p>
          )}

          <div className={styles.leftInfoCard}>
            <h3 className={styles.name}>{fullName(userProfile)}</h3>
            <p className={styles.balance}>Balance: 100$</p>
            <p className={styles.contact}>
              <span className={styles.icon}>📍</span>{' '}
              {userProfile.address?.city}, Ukraine
            </p>
            <p className={styles.contact}>
              <span className={styles.icon}>✉️</span> {userProfile.email}
            </p>
            <p className={styles.contact}>
              <span className={styles.icon}>📞</span> {userProfile.phoneNumber}
            </p>
          </div>
        </div>

        <div className={styles.centerColumn}>
          <div className={`${styles.card} ${styles.cardMedium}`}>
            <div className={styles.cardHeader}>
              <h4>Account Details</h4>
              <button
                className={styles.editIcon}
                onClick={() =>
                  openEditModal({
                    firstName: userProfile.firstName,
                    lastName: userProfile.lastName,
                    email: userProfile.email,
                    phoneNumber: userProfile.phoneNumber,
                  })
                }
              >
                <img src={imageMap['edit']} />
              </button>
            </div>

            <div className={styles.detailsRow}>
              <span>First name</span>
              <p>{userProfile.firstName}</p>
            </div>
            <div className={styles.detailsRow}>
              <span>Last name</span>
              <p>{userProfile.lastName}</p>
            </div>
            <div className={styles.detailsRow}>
              <span>Date of birth</span>
              <p>24 February, 2002</p>
            </div>
            <div className={styles.detailsRow}>
              <span>Sex</span>
              <p>Female</p>
            </div>
          </div>

          <div className={`${styles.card} ${styles.cardMedium}`}>
            <div className={styles.cardHeader}>
              <h4>Shipping Address</h4>
              <button
                className={styles.editIcon}
                onClick={() =>
                  openEditModal({
                    country: userProfile.address?.country,
                    city: userProfile.address?.city,
                    street: userProfile.address?.street,
                    zip: userProfile.address?.zip,
                  })
                }
              >
                <img src={imageMap['edit']} />
              </button>
            </div>

            <div className={styles.detailsRow}>
              <span>Address</span>
              <p>{userProfile.address?.street}</p>
            </div>
            <div className={styles.detailsRow}>
              <span>City</span>
              <p>{userProfile.address?.city}</p>
            </div>
            <div className={styles.detailsRow}>
              <span>Country</span>
              <p>{userProfile.address?.country}</p>
            </div>
            <div className={styles.detailsRow}>
              <span>Zip Code</span>
              <p>{userProfile.address?.zip}</p>
            </div>
          </div>
        </div>

        <div className={styles.paymentColumn}>
          <div className={`${styles.card} ${styles.cardLarge}`}>
            <div className={styles.cardHeader}>
              <h4>Payment Methods</h4>
              {/* <button
                className={styles.editIcon}
                onClick={() =>
                  openEditModal({
                    cardType: userProfile.cardType,
                    cardHolder: userProfile.lastName,
                    expire: userProfile.expire,
                    cardNumber: userProfile.cardNumber,
                    balance: userProfile.balance,
                  })
                }
              >
                <img src={imageMap['edit']} />
              </button> */}
            </div>

            <img
              src={imageMap['creditcard']}
              alt="Credit Card"
              className={styles.creditCard}
            />

            {/* <div className={styles.paymentDetails}>
              <div className={styles.detailsRow}>
                <span>Card Type</span>
                <p>{userProfile.cardType}</p>
              </div>
              <div className={styles.detailsRow}>
                <span>Card Holder</span>
                <p>{userProfile.cardHolder}</p>
              </div>
              <div className={styles.detailsRow}>
                <span>Expire</span>
                <p>{userProfile.expire}</p>
              </div>
              <div className={styles.detailsRow}>
                <span>Card Number</span>
                <p>{userProfile.cardNumber}</p>
              </div>
              <div className={styles.detailsRow}>
                <span>Balance</span>
                <p>{userProfile.balance}</p>
              </div>
            </div> */}
          </div>
        </div>
      </div>

      {isSpecialist && (
        <section className={styles.specialistSection}>
          <div className={styles.specialistHeader}>
            <h3>Professional profile</h3>
            {!specEditing && (
              <button
                className={styles.specEditBtn}
                onClick={() => setSpecEditing(true)}
              >
                Edit
              </button>
            )}
          </div>
          <p className={styles.specNote}>
            Shown on your public specialist card. Your rating is calculated from reviews.
          </p>

          {specError && (
            <p className={styles.photoError} role="alert">
              {specError}
            </p>
          )}

          {!specEditing ? (
            <div className={styles.specView}>
              <div>
                <span>Profession</span>
                <p>{spec?.profession || '—'}</p>
              </div>
              <div>
                <span>Price</span>
                <p>{spec && Number(spec.price) > 0 ? spec.price : '—'}</p>
              </div>
              <div>
                <span>Experience</span>
                <p>{spec && spec.experience > 0 ? `${spec.experience} years` : '—'}</p>
              </div>
              <div>
                <span>Rating</span>
                <p>{spec ? spec.rating.toFixed(1) : '—'}</p>
              </div>
              <div className={styles.specWide}>
                <span>Tags</span>
                <p>{spec && spec.tags.length ? spec.tags.join(', ') : '—'}</p>
              </div>
              <div className={styles.specWide}>
                <span>About</span>
                <p>{spec?.about || '—'}</p>
              </div>
            </div>
          ) : (
            <form className={styles.specForm} onSubmit={saveSpecProfile}>
              <label>
                <span>Profession</span>
                <input
                  type="text"
                  value={specForm.profession}
                  onChange={(e) =>
                    setSpecForm((f) => ({ ...f, profession: e.target.value }))
                  }
                />
              </label>
              <label>
                <span>Price</span>
                <input
                  type="number"
                  min={0}
                  value={specForm.price}
                  onChange={(e) => setSpecForm((f) => ({ ...f, price: e.target.value }))}
                />
              </label>
              <label>
                <span>Experience (years)</span>
                <input
                  type="number"
                  min={0}
                  value={specForm.experience}
                  onChange={(e) =>
                    setSpecForm((f) => ({ ...f, experience: e.target.value }))
                  }
                />
              </label>
              <label className={styles.specWide}>
                <span>Tags (comma-separated)</span>
                <input
                  type="text"
                  placeholder="wiring, repair"
                  value={specForm.tags}
                  onChange={(e) => setSpecForm((f) => ({ ...f, tags: e.target.value }))}
                />
              </label>
              <label className={styles.specWide}>
                <span>About</span>
                <textarea
                  rows={4}
                  value={specForm.about}
                  onChange={(e) => setSpecForm((f) => ({ ...f, about: e.target.value }))}
                />
              </label>
              <div className={styles.specActions}>
                <button type="submit" disabled={specBusy}>
                  {specBusy ? 'Saving…' : 'Save'}
                </button>
                <button
                  type="button"
                  className={styles.specCancel}
                  onClick={() => setSpecEditing(false)}
                  disabled={specBusy}
                >
                  Cancel
                </button>
              </div>
            </form>
          )}
        </section>
      )}

      {isSpecialist && (
        <section className={styles.specialistSection}>
          <div className={styles.specialistHeader}>
            <h3>Services &amp; pricing</h3>
          </div>
          <ServicesManager />
        </section>
      )}

      <EditModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        initialData={modalData}
        onSave={handleSave}
      />

      <Footer />
    </div>
  );
};

export default ProfilePageSetup;
