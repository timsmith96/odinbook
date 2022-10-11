import styles from './Post.module.css';
import { ReactComponent as Likes } from '../../assets/icons/post/likes.svg';
import { ReactComponent as Like } from '../../assets/icons/post/like.svg';
import { ReactComponent as Unlike } from '../../assets/icons/post/unlike.svg';
import { ReactComponent as Comment } from '../../assets/icons/post/comment.svg';
import { useState } from 'react';
const { DateTime } = require('luxon');

export default function Post({
  imageUrl,
  firstName,
  surname,
  text,
  dateCreated,
  likes,
  id,
  user,
}) {
  // get likes from the API call in feed, then new likes varible to likes
  const [updatedLikes, setUpdatedLikes] = useState(likes);
  // keeping track of whether the post is liked by the user or not
  const [liked, setLiked] = useState(updatedLikes.includes(user._id));
  const handleLike = async () => {
    const res = await fetch(`http://localhost:3000/posts/${id}`, {
      method: 'PATCH',
      mode: 'cors',
      credentials: 'include',
      headers: {
        liked: liked,
      },
    });
    // API gives us back the new list of likes for the post...
    const json = await res.json();
    // ...which we use to set the state to be the list of likes for the post
    setUpdatedLikes(json);
    // and we also change the state of whether or not the post is currently liked by the user
    setLiked(!liked);
  };
  return (
    <div className={styles.post}>
      <div className={styles.post_header_container}>
        <div
          className={styles.user_icon_container}
          style={{
            backgroundImage: `url(${imageUrl})`,
          }}
        ></div>
        <div className={styles.user_info_container}>
          <p className={styles.user_name}>{`${firstName} ${surname}`}</p>
          <p className={styles.post_date}>
            {DateTime.fromISO(dateCreated).toLocaleString()}
          </p>
        </div>
      </div>
      <div className={styles.post_text_container}>
        <p className={styles.post_text}>{text}</p>
      </div>
      <div className={styles.post_img_container}>
        <img className={styles.post_img} src={imageUrl} alt="elephant" />
      </div>
      <div className={styles.post_info_container}>
        <div className={styles.likes_info_container}>
          {' '}
          <div className={styles.likes_icon_container}>
            <Likes />
          </div>
          <p className={styles.likes_counter}>{updatedLikes.length}</p>
        </div>
        <p className={styles.comments_counter}>2 comments</p>
      </div>
      <div className={styles.upper_hr}></div>
      <div className={styles.post_controls_container}>
        <div className={styles.likes_control_container} onClick={handleLike}>
          <div className={styles.like_icon_container}>
            {/* checking if the user is in the post's list of people who like it */}
            {liked ? <Unlike /> : <Like />}
          </div>
          {liked ? <p className={styles.liked}>You like this</p> : <p>Like</p>}
        </div>
        <div className={styles.comment_control_container}>
          <div className={styles.comment_icon_container}>
            <Comment />
          </div>
          <p>Comment</p>
        </div>
      </div>
      <div className={styles.lower_hr}></div>
    </div>
  );
}
