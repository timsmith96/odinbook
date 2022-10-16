import styles from '../styles/Nav.module.css';
import { ReactComponent as Friends } from '../../../assets/icons/friends/friends.svg';
import { ReactComponent as Arrow } from '../../../assets/icons/friends/arrow.svg';
import { ReactComponent as Requests } from '../../../assets/icons/friends/requests.svg';
import { ReactComponent as Suggestions } from '../../../assets/icons/friends/suggestions.svg';

export default function Nav({ onClick, selected }) {
  return (
    <div className={styles.nav}>
      <div className={styles.header}>
        <h2>Friends</h2>
      </div>
      <ul className={styles.nav_links}>
        <li
          className={`${styles.nav_link} ${
            selected === 'friends' ? styles.selected : ''
          }`}
          data-name="friends"
          onClick={onClick}
        >
          <div className={styles.icon_container}>
            <Friends />
          </div>
          <p className={styles.link_text}>Your friends</p>
          <div className={`${styles.icon_container} ${styles.arrow}`}>
            <Arrow />
          </div>
        </li>
        <li
          className={`${styles.nav_link} ${
            selected === 'requests' ? styles.selected : ''
          }`}
          data-name="requests"
          onClick={onClick}
        >
          <div className={styles.icon_container}>
            <Requests />
          </div>
          <p className={styles.link_text}>Friend requests</p>
          <div className={`${styles.icon_container} ${styles.arrow}`}>
            <Arrow />
          </div>
        </li>
        <li
          className={`${styles.nav_link} ${
            selected === 'suggestions' ? styles.selected : ''
          }`}
          data-name="suggestions"
          onClick={onClick}
        >
          <div className={styles.icon_container}>
            <Suggestions />
          </div>
          <p className={styles.link_text}>Friend suggestions</p>
          <div className={`${styles.icon_container} ${styles.arrow}`}>
            <Arrow />
          </div>
        </li>
      </ul>
    </div>
  );
}
