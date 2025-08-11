import styles from './ProfileContent.module.scss'

const testimonials = [
    {
      text: "Elena is a magician. I didn’t just look beautiful — I felt confident every minute of my wedding. Everything looked natural and classy.",
      name: "Maria",
      role: "Bride",
      image: "/src/assets/testimonials1.png",
    },
    {
      text: "Working with Elena is easy and efficient. She instantly understands the creative vision and always makes clients feel comfortable on set.",
      name: "Inna",
      role: "Photographer",
      image: "/src/assets/testimonials2.png",
    },
    {
      text: "I booked a consultation to improve my skincare and presentation for meetings — and it turned into a complete transformation. I’m truly grateful!",
      name: "Daria",
      role: "Marketing Manager",
      image: "/src/assets/testimonials3.png",
    },
  ];


const ProfileContent = () => {
  return (
    <div className={styles.content}>
      <section className={styles.testimonials}>
        <h2 className={styles.title}>Testimonials</h2>
        <div className={styles.cards}>
          {testimonials.map((t, i) => (
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
    </div>
  );
};

export default ProfileContent;
