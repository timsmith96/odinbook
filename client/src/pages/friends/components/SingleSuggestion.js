import styles from '../styles/SingleSuggestion.module.css';
import { UserContext } from '../../../context/UserContext';
import { useContext, useState } from 'react';
import { ReactComponent as User } from '../../../assets/icons/profile/profile.svg';

export default function SingleSuggestion({
  imageUrl,
  firstName,
  surname,
  handleClick,
  onClick,
  id,
}) {
  const user = useContext(UserContext);
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
      {!user.requestsSent.includes(id) && (
        <button className={styles.add_btn} onClick={onClick} data-user={id}>
          Add friend
        </button>
      )}
      {user.requestsSent.includes(id) && (
        <button
          className={styles.request_sent}
          onClick={onClick}
          data-user={id}
        >
          Friend request sent
        </button>
      )}
    </li>
  );
}
