import { useContext } from 'react';
import { UserContext } from '../../../context/UserContext';
import styles from '../styles/Friends.module.css';
import SingleFriend from './SingleFriend';

export default function Friends({ onClick }) {
  const user = useContext(UserContext);

  // while we wait for the user to come through from context, display: loading
  if (!user) {
    return <h1>Loading...</h1>;
  }

  return (
    <div className={styles.suggestions}>
      <h2 className={styles.title}>Your friends</h2>
      {user.friends.length === 0 && (
        <h3 className={styles.no_friends}>
          you don't have any friends yet, check out the{' '}
          <span
            data-name="suggestions"
            className={styles.suggestions_link}
            onClick={onClick}
          >
            suggestions tab{' '}
          </span>
          to look for some
        </h3>
      )}
      <ul className={styles.suggestions_list}>
        {user.friends.map((friend) => {
          return (
            <SingleFriend
              firstName={friend.firstName}
              surname={friend.surname}
              key={friend._id}
              imageUrl={friend.imageUrl}
            />
          );
        })}
      </ul>
    </div>
  );
}
