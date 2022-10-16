import styles from '../styles/Friends.module.css';

export default function Friends() {
  return (
    <div className={styles.friends}>
      <div className={styles.header}>
        <h3>Friends</h3>
        <p>3 friends</p>
      </div>
      <div className={styles.friends_container}>
        {/* <div
          className={styles.friend}
          style={{
            backgroundImage: `url(${imageUrl})`,
          }}
        ></div> */}
      </div>
    </div>
  );
}
