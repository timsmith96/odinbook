import { useContext } from 'react';
import { UserContext } from '../../../context/UserContext';
import styles from '../styles/Friends.module.css';
import SingleFriend from './SingleFriend';

export default function Friends() {
  const user = useContext(UserContext);

  // while we wait for the user to come through from context, display: loading
  if (!user) {
    return <h1>Loading...</h1>;
  }

  return (
    <div className={styles.suggestions}>
      <h2 className={styles.title}>Your friends</h2>
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
