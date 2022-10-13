import styles from './Comments.module.css';
import SingleComment from './SingleComment';
// import SingleComment from './SingleComment';

export default function Comments({
  imageUrl,
  display,
  onCommentTextChange,
  onSubmit,
  commentInput,
  comments,
}) {
  return (
    <div className={`${display ? styles.comments_container : styles.hide}`}>
      <div className={styles.create_comment_container}>
        <div
          className={styles.user_icon_container}
          style={{
            backgroundImage: `url(${imageUrl})`,
          }}
        ></div>
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
              // this is the image url from the post, ultimately need to change this to the user's image url (avatar)
              imageUrl={imageUrl}
            />
          );
        })}
      </div>
    </div>
  );
}
