import styles from '../styles/ProfileController.module.css';
import Post from '../../feed/components/Post';
import { ReactComponent as Camera } from '../../../assets/icons/profile/camera.svg';
import { ReactComponent as Profile } from '../../../assets/icons/profile/profile.svg';
import { useState, useContext, useEffect } from 'react';
import { UserContext } from '../../../context/UserContext';

export default function Controller({ onUserChange }) {
  const [image, setImage] = useState();
  const [posts, setPosts] = useState();
  const user = useContext(UserContext);

  useEffect(() => {
    console.log('getting posts');
    getPosts();
  }, [user]);

  async function submitImage(e) {
    console.log('inside submit image');
    setImage(e.target.files[0]);
    const formData = new FormData();
    formData.append('image', image);
    const res = await fetch(
      `https://cryptic-wave-65159.herokuapp.com/users/${user._id}`,
      {
        method: 'PATCH',
        mode: 'cors',
        credentials: 'include',
        body: formData,
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
          'Content-Type': 'multipart/form-data',
        },
      }
    );
    // hopefully this updates the user object in context stored in state in app.js
    const json = await res.json();
    onUserChange(json);
    window.location.reload();
  }

  // function to get all of a user's posts based on the user's id
  const getPosts = async (e) => {
    if (!user) {
      return;
    }
    const res = await fetch(
      `https://cryptic-wave-65159.herokuapp.com/posts/user`,
      {
        method: 'GET',
        mode: 'cors',
        credentials: 'include',
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      }
    );
    const json = await res.json();
    setPosts(json);
  };

  if (user && posts) {
    return (
      <div className={styles.wrapper}>
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
                onChange={submitImage}
                className={styles.file_input}
                accept=".jpg,.jpeg,.png"
              />
            </div>
            <div className={styles.user_info}>
              <h2 className={styles.user_name}>
                {`${user.firstName} ${user.surname}`}
              </h2>
              {/* <p className={styles.user_friends}>{user.friends.length} friends</p> */}
            </div>
          </div>
          <div className={styles.hr}></div>
          {posts.length === 0 && (
            <h3 className={styles.empty_posts}>
              You don't have any posts to display. They will appear here when
              you do!
            </h3>
          )}
          {posts && (
            <div className={styles.user_posts}>
              {posts.map((post) => {
                return (
                  <Post
                    imageUrl={post.imageUrl}
                    firstName={post.user.firstName}
                    surname={post.user.surname}
                    text={post.text}
                    dateCreated={post.createdAt}
                    likes={post.likes}
                    id={post._id}
                    user={post.user}
                    comments={post.comments}
                    avatarUrl={post.user.imageUrl}
                    key={post._id}
                    deletable={true}
                  />
                );
              })}
            </div>
          )}
        </div>
      </div>
    );
  } else {
    return (
      <div className={styles.loading}>
        <h1 className={styles.loading_title}>Loading</h1>
      </div>
    );
  }
}
