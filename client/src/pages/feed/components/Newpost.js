import styles from '../styles/Newpost.module.css';
import { ReactComponent as User } from '../../../assets/icons/navbar/user.svg';
import { ReactComponent as Photo } from '../../../assets/icons/photoIcon.svg';

export default function Newpost({ onModalClick, user }) {
  return (
    <div className={styles.new_post}>
      <div className={styles.upper_row}>
        <div className={styles.icon_container}>
          <img src={user.imageUrl} alt="" />
          {/* <User className={styles.user_icon} /> */}
        </div>
        <input
          className={styles.post_text_input}
          type="text"
          placeholder={`What's on your mind, ${user.firstName}`}
          onClick={onModalClick}
        />
      </div>
      <div className={styles.hr}></div>
      <div className={styles.lower_row}>
        <div
          className={styles.lower_row_inner_container}
          onClick={onModalClick}
        >
          <div className={styles.photo_icon_container}>
            <Photo />
          </div>
          <p className={styles.label}>Photo/video</p>
        </div>
      </div>
    </div>
  );
}
