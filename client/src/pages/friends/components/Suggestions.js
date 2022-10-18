import styles from '../styles/Suggestions.module.css';
import { useState, useEffect } from 'react';

export default function Suggestions() {
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
      },
    });
    const json = await res.json();
    setUsers(json);
    setIsLoading(false);
  };

  // making a patch request to to user clicked on to send a friend request to that user
  const handleClick = async (e) => {
    console.log(e.currentTarget.dataset.user);
    const res = await fetch(
      `http://localhost:3000/users/addFriend/${e.currentTarget.dataset.user}`,
      {
        method: 'PATCH',
        mode: 'cors',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );
    const json = await res.json();
    console.log(json);
  };

  if (isLoading) return <h1>Loading...</h1>;
  return (
    <div className={styles.suggestions}>
      <h2 className={styles.title}>People you may know</h2>
      <ul className={styles.suggestions_list}>
        {users.map((user) => {
          return (
            <li className={styles.list_item}>
              <div
                className={styles.user_icon_container}
                style={{
                  backgroundImage: `url(${user.imageUrl})`,
                }}
              ></div>
              <p
                className={styles.suggestion_name_text}
              >{`${user.firstName} ${user.surname}`}</p>
              <button
                className={styles.add_btn}
                onClick={handleClick}
                data-user={user._id}
              >
                Add friend
              </button>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
