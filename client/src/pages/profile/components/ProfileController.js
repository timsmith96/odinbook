import styles from '../styles/ProfileController.module.css';
import Friends from './Friends';
import { ReactComponent as Camera } from '../../../assets/icons/profile/camera.svg';
import { ReactComponent as Profile } from '../../../assets/icons/profile/profile.svg';
import { useState, useContext, useEffect } from 'react';
import { UserContext } from '../../../context/UserContext';

export default function Controller({ onUserChange }) {
  const [image, setImage] = useState();
  const user = useContext(UserContext);

  console.log(user);

  useEffect(() => {
    async function submitImage() {
      if (!image || !user) {
        return;
      }
      const formData = new FormData();
      formData.append('image', image);
      const res = await fetch(`http://localhost:3000/users/${user._id}`, {
        method: 'PATCH',
        mode: 'cors',
        credentials: 'include',
        body: formData,
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      // hopefully this updates the user object in context stored in state in app.js
      const json = await res.json();
      console.log(json);
      onUserChange(json);
    }
    submitImage();
  }, [image]);

  if (user) {
    return (
      <div className={styles.profile_controller}>
        <div className={styles.header}>
          <div className={styles.profile_upload_container}>
            <label
              htmlFor="file-upload"
              className={styles.file_input_label}
              style={{
                backgroundImage: `url(${user.imageUrl})`,
              }}
            >
              <div className={styles.camera_icon_container}>
                <Camera />
              </div>
              {!user.imageUrl && <Profile />}
            </label>
            <input
              type="file"
              id="file-upload"
              onChange={(e) => setImage(e.target.files[0])}
              className={styles.file_input}
            />
          </div>
          <div className={styles.user_info}>
            <h2 className={styles.user_name}>
              {`${user.firstName} ${user.surname}`}
            </h2>
            <p className={styles.user_friends}>{user.friends.length} friends</p>
          </div>
        </div>
        <div className={styles.hr}></div>
        <div className={styles.user_info_container}>
          <Friends />
        </div>
      </div>
    );
  } else {
    return <h1>no user</h1>;
  }
}
