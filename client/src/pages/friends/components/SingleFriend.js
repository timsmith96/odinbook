import styles from '../styles/SingleFriend.module.css';

export default function SingleFriend({ firstName, surname, imageUrl }) {
  return (
    <li className={styles.list_item}>
      <div
        className={styles.user_icon_container}
        style={{
          backgroundImage: `url(${imageUrl})`,
        }}
      ></div>
      <p className={styles.suggestion_name_text}>{`${firstName} ${surname}`}</p>
      <button className={styles.add_btn}>View profile</button>
    </li>
  );
}
