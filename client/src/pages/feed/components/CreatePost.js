import styles from '../styles/CreatePost.module.css';
import { ReactComponent as User } from '../../../assets/icons/navbar/user.svg';
import { ReactComponent as Photo } from '../../../assets/icons/photoIcon.svg';
import { ReactComponent as Close } from '../../../assets/icons/closeIcon.svg';
import { ReactComponent as Success } from '../../../assets/icons/post/success.svg';
import { ReactComponent as Remove } from '../../../assets/icons/post/remove.svg';

export default function CreatePost({
  onSubmit,
  textEntered,
  onInputChange,
  onImageChange,
  display,
  onCloseClick,
  image,
  user,
  creatingPost,
}) {
  return (
    <div className={`${styles.create_post} ${display ? '' : styles.hide}`}>
      <div className={styles.header}>
        <h2 className={styles.title}>Create post</h2>
        <div className={styles.close_icon_container}>
          <Close className={styles.close_icon} onClick={onCloseClick} />
        </div>
      </div>
      <div className={styles.upper_row}>
        <div
          className={styles.user_icon_container}
          style={{
            backgroundImage: `url(${user.imageUrl})`,
          }}
        >
          {!user.imageUrl && <User className={styles.user_icon} />}
        </div>
        <p
          className={styles.user_name}
        >{`${user.firstName} ${user.surname}`}</p>
      </div>
      <form className={styles.create_post_form} onSubmit={onSubmit}>
        <textarea
          onChange={onInputChange}
          className={styles.text_input}
          rows="4"
          placeholder={`What's on your mind, ${user.firstName}?`}
        ></textarea>
        <div className={styles.add_to_post}>
          <p className={styles.add_to_post_text}>Add to post</p>
          <label htmlFor="file-upload" className={styles.file_input_label}>
            <Photo className={styles.photo_icon} />
          </label>
          <input
            type="file"
            id="file-upload"
            onChange={onImageChange}
            className={styles.file_input}
            accept=".jpg,.jpeg,.png"
          />
          {image && (
            <div className={styles.upload_status}>
              <div className={styles.upload_success}>
                <Success />
                <p>uploaded</p>
              </div>
            </div>
          )}
        </div>
        {!creatingPost && (
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
        )}
        {creatingPost && (
          <button className={styles.post_button_disabled} type="submit">
            Creating Post...
          </button>
        )}
      </form>
    </div>
  );
}
