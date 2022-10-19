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
    const res = await fetch('http://localhost:3000/users', {
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
    console.log('clicked');
    const res = await fetch(
      `http://localhost:3000/users/addFriend/${e.currentTarget.dataset.user}`,
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

  if (isLoading) return <h1>Loading...</h1>;
  return (
    <div className={styles.suggestions}>
      <h2 className={styles.title}>People you may know</h2>
      <ul className={styles.suggestions_list}>
        {users.map((user) => {
          return (
            <SingleSuggestion
              imageUrl={user.imageUrl}
              firstName={user.firstName}
              surname={user.surname}
              onClick={handleClick}
              id={user._id}
            />
          );
        })}
      </ul>
    </div>
  );
}
