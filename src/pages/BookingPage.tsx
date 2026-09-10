import React, { useEffect, useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import { useNavigate, useParams } from 'react-router-dom';
import Header from '../components/Layout/Header';
import Footer from '../components/Layout/Footer';
import Loader from '../components/Loader/Loader';
import { ApiError, isAuthenticated } from '../services/auth/authApi';
import { getSpecialistById } from '../features/specialists/services/specialistsApi';
import { createBooking, getAvailableSlots } from '../features/booking/bookingApi';
import {
  getSpecialistServices,
  type ServiceItem,
} from '../features/services/servicesApi';
import type { Specialist } from '../types';
import styles from './BookingPage.module.scss';

const localDate = (d: Date) =>
  `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(
    d.getDate()
  ).padStart(2, '0')}`;

const timeLabel = (iso: string) =>
  new Date(iso).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

const BookingPage: React.FC = () => {
  const { specialistId } = useParams<{ specialistId: string }>();
  const navigate = useNavigate();

  const [specialist, setSpecialist] = useState<Specialist | null>(null);
  const [notFound, setNotFound] = useState(false);
  const [date, setDate] = useState<Date>(() => {
    const t = new Date();
    t.setDate(t.getDate() + 1);
    return t;
  });
  const [slots, setSlots] = useState<string[]>([]);
  const [slotsLoading, setSlotsLoading] = useState(false);
  const [booking, setBooking] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  // Services offered by this specialist. `serviceId === null` = generic 60-min consult.
  const [services, setServices] = useState<ServiceItem[]>([]);
  const [serviceId, setServiceId] = useState<number | null>(null);

  useEffect(() => {
    if (!isAuthenticated()) {
      navigate('/login', {
        replace: true,
        state: { from: `/book/${specialistId}` },
      });
    }
  }, [navigate, specialistId]);

  useEffect(() => {
    if (!specialistId) return;
    getSpecialistById(specialistId).then((s) => {
      if (s) setSpecialist(s);
      else setNotFound(true);
    });
    getSpecialistServices(specialistId).then((cats) =>
      setServices(cats.flatMap((c) => c.items))
    );
  }, [specialistId]);

  useEffect(() => {
    if (!specialistId) return;
    setSlotsLoading(true);
    setError(null);
    getAvailableSlots(Number(specialistId), localDate(date), serviceId ?? undefined)
      .then(setSlots)
      .catch((err) =>
        setError(
          err instanceof ApiError
            ? err.message
            : 'Could not load available times.'
        )
      )
      .finally(() => setSlotsLoading(false));
  }, [specialistId, date, serviceId]);

  const book = async (startTime: string) => {
    if (!specialistId) return;
    setBooking(startTime);
    setError(null);
    try {
      const created = await createBooking(
        Number(specialistId),
        startTime,
        serviceId ?? undefined
      );
      navigate('/book/confirmation', { state: { booking: created } });
    } catch (err) {
      setError(
        err instanceof ApiError ? err.message : 'Could not book this slot.'
      );
      setBooking(null);
    }
  };

  if (notFound) {
    return (
      <div className={styles.container}>
        <Header />
        <main className={styles.main}>
          <p>Specialist not found.</p>
          <button onClick={() => navigate('/people')}>Back to browse</button>
        </main>
        <Footer />
      </div>
    );
  }

  if (!specialist) {
    return (
      <div className={styles.container}>
        <Header />
        <Loader />
        <Footer />
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <Header />
      <main className={styles.main}>
        <h1>
          Book {specialist.firstName} {specialist.lastName}
        </h1>
        <p className={styles.sub}>
          {specialist.profession}
          {Number(specialist.price) > 0 && ` · ${specialist.price}`}
        </p>

        {services.length > 0 && (
          <label className={styles.servicePicker}>
            <span>Service</span>
            <select
              value={serviceId ?? ''}
              onChange={(e) =>
                setServiceId(e.target.value ? Number(e.target.value) : null)
              }
            >
              <option value="">General consultation (60 min)</option>
              {services.map((s) => (
                <option key={s.id} value={s.id}>
                  {s.name} — {s.durationMinutes} min · {s.price}
                </option>
              ))}
            </select>
          </label>
        )}

        <div className={styles.layout}>
          <div className={styles.calendarWrap}>
            <Calendar
              onChange={(value) => value instanceof Date && setDate(value)}
              value={date}
              minDate={new Date()}
              locale="en-GB"
            />
          </div>

          <div className={styles.slots}>
            <h3>
              {date.toLocaleDateString([], {
                weekday: 'long',
                day: 'numeric',
                month: 'long',
              })}
            </h3>

            {error && (
              <p className={styles.error} role="alert">
                {error}
              </p>
            )}

            {slotsLoading ? (
              <p className={styles.muted}>Loading times…</p>
            ) : slots.length === 0 ? (
              <p className={styles.muted}>No free slots on this day.</p>
            ) : (
              <div className={styles.slotGrid}>
                {slots.map((iso) => (
                  <button
                    key={iso}
                    className={styles.slot}
                    disabled={booking !== null}
                    onClick={() => book(iso)}
                  >
                    {booking === iso ? 'Booking…' : timeLabel(iso)}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default BookingPage;
