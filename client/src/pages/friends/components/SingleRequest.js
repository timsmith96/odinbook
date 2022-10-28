import styles from '../styles/SingleRequest.module.css';
import { ReactComponent as User } from '../../../assets/icons/profile/profile.svg';

export default function SingleRequest({
  id,
  imageUrl,
  firstName,
  surname,
  onSetUser,
}) {
  const handleAcceptClick = async (e) => {
    const res = await fetch(
      `'https://cryptic-wave-65159.herokuapp.com//users/acceptFriend/${e.currentTarget.dataset.id}`,
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
    // getting back the updated user from our server and using the set state method we have on app to update the user which then trickles down via context - may need to populate the user sent back from the server at some stage
    onSetUser(json);
  };

  const handleRejectClick = async (e) => {
    const res = await fetch(
      `'https://cryptic-wave-65159.herokuapp.com//users/rejectfriend/${e.currentTarget.dataset.id}`,
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
    // getting back the updated user from our server and using the set state method we have on app to update the user which then trickles down via context - may need to populate the user sent back from the server at some stage
    onSetUser(json);
  };
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
      <div className={styles.btn_container}>
        <button
          className={styles.add_btn}
          onClick={handleAcceptClick}
          data-id={id}
        >
          Accept
        </button>
        <button
          className={styles.decline_btn}
          onClick={handleRejectClick}
          data-id={id}
        >
          Decline
        </button>
      </div>
    </li>
  );
}
