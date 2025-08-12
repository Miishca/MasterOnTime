import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import type { Specialist } from '../../../types';
import styles from './ProfileContent.module.scss'
import imageMap from '../../../utils/imageLoader';

interface ProfileContentProps {
  specialist: Specialist;
}


export default function ProfileContent({ specialist }: ProfileContentProps) {
  const availableDates = specialist.availability?.filter(d => d.isAvailable)
    .map(d => new Date(d.date)) || [];

  return (
    <div className={styles.profileContent}>
      {specialist.workHistory && specialist.workHistory.length > 0 && (
        <section className={styles.workHistory}>
          <h4>Work history</h4>
          <div className={styles.workList}>
            {specialist.workHistory.map(work => (
              <div key={work.id} className={styles.workCard}>
                <img src={work.image ?? imageMap['default']} alt={work.title} />
                <h5>{work.title}</h5>
                <p>{work.description}</p>
              </div>
            ))}
          </div>
        </section>
      )}

      {specialist.services && specialist.services.length > 0 && (
        <section className={styles.actionsList}>
          <h4>Actions You Can Take</h4>
          {specialist.services.map(service => (
            <details key={service.id}>
              <summary>{service.title}</summary>
              {service.description && <p>{service.description}</p>}
            </details>
          ))}
        </section>
      )}

      {specialist.availability && (
        <section className={styles.calendarSection}>
          <h4>Availability Calendar</h4>
          <Calendar
            tileClassName={({ date }) =>
              availableDates.some(
                d => d.toDateString() === date.toDateString()
              )
                ? styles.available
                : ""
            }
          />
        </section>
      )}

      {specialist.testimonials && specialist.testimonials.length > 0 && (
        <section className={styles.testimonials}>
        <h2 className={styles.title}>Testimonials</h2>
        <div className={styles.cards}>
          {specialist.testimonials.map((t, i) => (
            <div className={styles.card} key={i}>
              <p className={styles.text}>"{t.text}"</p>
              <div className={styles.author}>
                <img src={t.image} alt={t.name} className={styles.avatar} />
                <div>
                  <div className={styles.name}>{t.name}</div>
                  <div className={styles.role}>{t.role}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
      )}
    </div>
  );
}