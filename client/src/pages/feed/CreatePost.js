import styles from './CreatePost.module.css';
import { ReactComponent as User } from '../../assets/icons/navbar/user.svg';
import { ReactComponent as Photo } from '../../assets/icons/photoIcon.svg';
import { ReactComponent as Close } from '../../assets/icons/closeIcon.svg';

export default function CreatePost({ onSubmit, textEntered, onInputChange }) {
  return (
    <div className={styles.create_post}>
      <h2 className={styles.title}>Create post</h2>
      <div className={styles.close_icon_container}>
        <Close className={styles.close_icon} />
      </div>
      <div className={styles.upper_row}>
        <div className={styles.user_icon_container}>
          <User className={styles.user_icon} />
        </div>
        <p className={styles.user_name}>Tim Smith</p>
      </div>
      <form className={styles.create_post_form} onSubmit={onSubmit}>
        <textarea
          onChange={onInputChange}
          className={styles.text_input}
          rows="4"
          placeholder="What's on your mind, Tim?"
        ></textarea>
        <div className={styles.add_to_post}>
          <p className={styles.add_to_post_text}>Add to your post</p>
          <div className={styles.add_to_post_icon_container}>
            <Photo className={styles.photo_icon} />
          </div>
        </div>
        <button
          className={`${
            textEntered
              ? styles.post_button_enabled
              : styles.post_button_disabled
          }`}
          type="submit"
        >
          Post
        </button>
      </form>
    </div>
  );
}
