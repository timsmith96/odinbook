import styles from '../styles/SingleFriend.module.css';
import { ReactComponent as User } from '../../../assets/icons/profile/profile.svg';

export default function SingleFriend({ firstName, surname, imageUrl }) {
  return (
    <li className={styles.list_item}>
      <div
        className={styles.user_icon_container}
        style={{
          backgroundImage: `url(${imageUrl})`,
        }}
      >
        {!imageUrl && <User />}
      </div>
      <p className={styles.suggestion_name_text}>{`${firstName} ${surname}`}</p>
      {/* <button className={styles.add_btn}>View profile</button> */}
    </li>
  );
}
