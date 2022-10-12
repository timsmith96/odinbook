import styles from './SingleComment.module.css';

export default function SingleComment({ imageUrl }) {
  return (
    <li className={styles.single_comment}>
      <div
        className={styles.comment_user_icon_container}
        style={{
          backgroundImage: `url(${imageUrl})`,
        }}
      ></div>
      <div className={styles.comment_text_container}>
        <p className={styles.user_name}>Tim Smith</p>
        <p className={styles.comment_text}>
          Lorem ipsum dolor sit amet consectetur, adipisicing elit. Veniam
          commodi, ipsum et rem ratione nihil.
        </p>
      </div>
    </li>
  );
}
