import styles from '../styles/Requests.module.css';
import { useState, useEffect, useContext } from 'react';
import { UserContext } from '../../../context/UserContext';

export default function Requests() {
  const user = useContext(UserContext);

  return (
    <div className={styles.suggestions}>
      <h2 className={styles.title}>Friend requests</h2>
      <ul className={styles.suggestions_list}>
        {user.friendRequests.map((friendRequest) => {
          console.log(friendRequest);
          return (
            <li className={styles.list_item}>
              <div
                className={styles.user_icon_container}
                style={{
                  backgroundImage: `url(${friendRequest.imageUrl})`,
                }}
              ></div>
              <p className={styles.suggestion_name_text}>
                {`${friendRequest.firstName} ${friendRequest.surname}`}
              </p>
              <div className={styles.btn_container}>
                <button className={styles.add_btn}>Accept</button>
                <button className={styles.decline_btn}>Decline</button>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
