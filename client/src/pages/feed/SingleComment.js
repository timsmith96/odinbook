import styles from './SingleComment.module.css';
import { DateTime } from 'luxon';

export default function SingleComment({ user, text, imageUrl, createdAt }) {
  return (
    <li className={styles.single_comment}>
      <div
        className={styles.comment_user_icon_container}
        style={{
          backgroundImage: `url(${imageUrl})`,
        }}
      ></div>
      <div className={styles.comment_text_container}>
        <p
          className={styles.user_name}
        >{`${user.firstName} ${user.surname}`}</p>
        <p className={styles.comment_text}>{text}</p>
      </div>
      <p className={styles.created_at}>
        {DateTime.fromISO(createdAt).toLocaleString()}
      </p>
    </li>
  );
}
