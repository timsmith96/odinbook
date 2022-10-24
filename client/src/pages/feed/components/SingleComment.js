import styles from '../styles/SingleComment.module.css';
import { ReactComponent as User } from '../../../assets/icons/navbar/user.svg';
import { DateTime } from 'luxon';

export default function SingleComment({
  user,
  text,
  imageUrl,
  createdAt,
  commentProfileImage,
}) {
  return (
    <li className={styles.single_comment}>
      <div
        className={styles.comment_user_icon_container}
        style={{
          backgroundImage: `url(${commentProfileImage})`,
        }}
      >
        {!commentProfileImage && <User className={styles.user_icon} />}
      </div>
      <div className={styles.comment_text_container}>
        <p
          className={styles.user_name}
        >{`${user.firstName} ${user.surname}`}</p>
        <p className={styles.comment_text}>{text}</p>
      </div>
      <p className={styles.created_at}>
        {DateTime.fromISO(createdAt).toFormat('dd LLL yyyy HH:mm')}
      </p>
    </li>
  );
}
