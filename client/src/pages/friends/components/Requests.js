import styles from '../styles/Requests.module.css';
import { useState, useEffect, useContext } from 'react';
import { UserContext } from '../../../context/UserContext';
import SingleRequest from './SingleRequest';

export default function Requests({ onSetUser }) {
  const user = useContext(UserContext);

  return (
    <div className={styles.suggestions}>
      <h2 className={styles.title}>Friend requests</h2>
      {user.friendRequests.length === 0 && (
        <h3 className={styles.no_friends}>
          you don't have any friend requests, sorry :'(
        </h3>
      )}
      <ul className={styles.suggestions_list}>
        {user.friendRequests.map((friendRequest) => {
          return (
            <SingleRequest
              key={friendRequest._id}
              id={friendRequest._id}
              imageUrl={friendRequest.imageUrl}
              firstName={friendRequest.firstName}
              surname={friendRequest.surname}
              onSetUser={onSetUser}
            />
          );
        })}
      </ul>
    </div>
  );
}
