import styles from '../styles/Comments.module.css';
import SingleComment from './SingleComment';
import { ReactComponent as User } from '../../../assets/icons/navbar/user.svg';

export default function Comments({
  display,
  onCommentTextChange,
  onSubmit,
  commentInput,
  comments,
  user,
}) {
  return (
    <div className={`${display ? styles.comments_container : styles.hide}`}>
      <div className={styles.create_comment_container}>
        <div
          className={styles.user_icon_container}
          style={{
            backgroundImage: `url(${user.imageUrl})`,
          }}
        >
          {!user.imageUrl && <User className={styles.user_icon} />}
        </div>
        <form className={styles.create_comment_form} onSubmit={onSubmit}>
          <textarea
            onChange={onCommentTextChange}
            required={true}
            maxLength="318"
            rows="5"
            className={styles.create_comment_input}
            type="text"
            placeholder="Write a comment..."
            value={commentInput}
          ></textarea>
          <button className={styles.create_comment_form_btn} type="submit">
            Submit
          </button>
        </form>
      </div>
      <div className={styles.comments}>
        {comments.map((comment) => {
          return (
            <SingleComment
              user={comment.user}
              text={comment.text}
              createdAt={comment.createdAt}
              key={comment._id}
              commentProfileImage={comment.user.imageUrl}
            />
          );
        })}
      </div>
    </div>
  );
}
