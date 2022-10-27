import styles from '../styles/Suggestions.module.css';
import SingleSuggestion from './SingleSuggestion';
import { useState, useEffect } from 'react';

export default function Suggestions({ onSetUser }) {
  const [users, setUsers] = useState();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    getUsers();
  }, []);

  // getting all users to display as suggestions upon inital loading
  const getUsers = async () => {
    const res = await fetch('https://cryptic-wave-65159.herokuapp.com/users', {
      method: 'GET',
      mode: 'cors',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    });
    const json = await res.json();
    setUsers(json);
    setIsLoading(false);
  };

  // making a patch request to to user clicked on to send a friend request to that user
  const handleClick = async (e) => {
    const res = await fetch(
      `https://cryptic-wave-65159.herokuapp.com/users/addFriend/${e.currentTarget.dataset.user}`,
      {
        method: 'PATCH',
        mode: 'cors',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      }
    );
    const json = await res.json();
    onSetUser(json);
  };

  if (isLoading)
    return (
      <div className={styles.suggestions}>
        <h1>Loading...</h1>
      </div>
    );
  return (
    <div className={styles.suggestions}>
      <h2 className={styles.title}>People you may know</h2>
      {users.length === 0 && (
        <h3 className={styles.no_suggestions}>
          friend suggestions will appear here as Odinbook grows :D
        </h3>
      )}
      <ul className={styles.suggestions_list}>
        {users.map((user) => {
          return (
            <SingleSuggestion
              imageUrl={user.imageUrl}
              firstName={user.firstName}
              surname={user.surname}
              onClick={handleClick}
              id={user._id}
              key={user._id}
            />
          );
        })}
      </ul>
    </div>
  );
}
