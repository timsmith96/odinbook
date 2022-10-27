import styles from '../styles/Post.module.css';
import Comments from './Comments';
import { ReactComponent as Likes } from '../../../assets/icons/post/likes.svg';
import { ReactComponent as Like } from '../../../assets/icons/post/like.svg';
import { ReactComponent as Unlike } from '../../../assets/icons/post/unlike.svg';
import { ReactComponent as Comment } from '../../../assets/icons/post/comment.svg';
import { ReactComponent as User } from '../../../assets/icons/navbar/user.svg';
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
  comments,
  avatarUrl,
  deletable,
}) {
  // get likes from the API call in feed, then new likes varible to likes
  const [updatedLikes, setUpdatedLikes] = useState(likes);
  const [updatedComments, setUpdatedComments] = useState(comments);
  const [commentInput, setCommentInput] = useState('');
  // setting initial liked state of post by checking if the user is in the array of users who like the post
  const [liked, setLiked] = useState(
    updatedLikes.some((userObject) => userObject._id === user._id)
  );
  const [displayLikes, setDisplayLikes] = useState(false);
  const [displayComments, setDisplayComments] = useState(false);

  // function to handle a user liking or unliking a post
  const handleLike = async () => {
    const res = await fetch(`http://localhost:3000/posts/${id}`, {
      method: 'PATCH',
      mode: 'cors',
      credentials: 'include',
      headers: {
        liked: liked,
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    });
    // API gives us back the new list of likes for the post...
    const json = await res.json();
    // ...which we use to set the state to be the list of likes for the post
    setUpdatedLikes(json);
    // and we also change the state of whether or not the post is currently liked by the user
    setLiked(!liked);
  };

  const handleLikesHover = () => {
    updatedLikes.length > 0 ? setDisplayLikes(true) : setDisplayLikes(false);
  };

  const handleLikesHoverOut = () => {
    setDisplayLikes(false);
  };

  const handleCommentTextChange = (e) => {
    setCommentInput(e.target.value);
  };

  // PATCH request to add a new comment to a post
  const handleCommentSubmit = async (e) => {
    e.preventDefault();
    setCommentInput('');
    const res = await fetch(`http://localhost:3000/posts/${id}`, {
      method: 'PATCH',
      mode: 'cors',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
        comments: 'true',
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
      body: JSON.stringify({ text: commentInput }),
    });
    const json = await res.json();
    setUpdatedComments(json);
  };

  // DELETE request to delete a post
  const handleDelete = async () => {
    console.log('delete clicked');
    await fetch(`http://localhost:3000/posts/${id}`, {
      method: 'DELETE',
      mode: 'cors',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    });
    window.location.reload();
  };

  return (
    <div className={styles.post}>
      <div className={styles.post_header_container}>
        <div
          className={styles.user_icon_container}
          style={{
            backgroundImage: `url(${avatarUrl})`,
          }}
        >
          {!avatarUrl && <User className={styles.user_icon} />}
        </div>
        <div className={styles.user_info_container}>
          <p className={styles.user_name}>{`${firstName} ${surname}`}</p>
          <p className={styles.post_date}>
            {DateTime.fromISO(dateCreated).toFormat('dd LLL yyyy')}
          </p>
        </div>
        {deletable && (
          <div className={styles.delete_btn_container}>
            <button className={styles.delete_btn} onClick={handleDelete}>
              Delete Post
            </button>
          </div>
        )}
      </div>
      <div className={styles.post_text_container}>
        <p className={styles.post_text}>{text}</p>
      </div>
      <div className={styles.post_img_container}>
        {imageUrl && <img className={styles.post_img} src={imageUrl} alt="" />}
      </div>
      <div className={styles.post_info_container}>
        <div
          className={styles.likes_info_container}
          onMouseEnter={handleLikesHover}
          onMouseLeave={handleLikesHoverOut}
        >
          <ul className={`${displayLikes ? styles.likes_hover : styles.hide}`}>
            {updatedLikes.map((user) => (
              <li key={user._id}>{`${user.firstName} ${user.surname}`}</li>
            ))}
          </ul>
          <div className={styles.likes_icon_container}>
            <Likes />
          </div>
          <p className={styles.likes_counter}>{updatedLikes.length}</p>
        </div>
        <p
          className={styles.comments_counter}
          onClick={() => setDisplayComments(!displayComments)}
        >
          {`${updatedComments.length} comments`}
        </p>
      </div>
      <div className={styles.upper_hr}></div>
      <div className={styles.post_controls_container}>
        <div className={styles.likes_control_container} onClick={handleLike}>
          <div className={styles.like_icon_container}>
            {/* checking if the user is in the post's list of people who like it */}
            {liked ? <Unlike /> : <Like />}
          </div>
          {liked ? <p className={styles.liked}>Liked</p> : <p>Like</p>}
        </div>
        <div
          className={styles.comment_control_container}
          onClick={() => setDisplayComments(!displayComments)}
        >
          <div className={styles.comment_icon_container}>
            <Comment />
          </div>
          <p>Comment</p>
        </div>
      </div>
      <div className={styles.lower_hr}></div>
      <Comments
        imageUrl={imageUrl}
        display={displayComments}
        onCommentTextChange={handleCommentTextChange}
        onSubmit={handleCommentSubmit}
        commentInput={commentInput}
        comments={updatedComments}
        user={user}
      />
    </div>
  );
}
