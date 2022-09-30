import styles from './Post.module.css';
import { ReactComponent as Likes } from '../../assets/icons/post/likes.svg';
import { ReactComponent as Like } from '../../assets/icons/post/like.svg';
import { ReactComponent as Comment } from '../../assets/icons/post/comment.svg';

export default function Post() {
  return (
    <div className={styles.post}>
      <div className={styles.post_header_container}>
        <div
          className={styles.user_icon_container}
          style={{
            backgroundImage:
              'url(' + require('../../assets/images/elephant_small.jpg') + ')',
          }}
        ></div>
        <div className={styles.user_info_container}>
          <p className={styles.user_name}>Tim Smith</p>
          <p className={styles.post_date}>23/09/22</p>
        </div>
      </div>
      <div className={styles.post_text_container}>
        <p className={styles.post_text}>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Corporis
          voluptates nobis provident alias est mollitia beatae, fugit minus
          tempore reiciendis incidunt amet perspiciatis, hic earum natus libero
          aperiam maiores veritatis voluptatibus! Perspiciatis optio error quia
          corporis magni officia quam ea voluptatem modi temporibus, eligendi
          odio eos dicta dolorum suscipit necessitatibus?
        </p>
      </div>
      <div className={styles.post_img_container}>
        <img
          className={styles.post_img}
          src={require('../../assets/images/elephant.jpg')}
          alt="elephant"
        />
      </div>
      <div className={styles.post_info_container}>
        <div className={styles.likes_info_container}>
          {' '}
          <div className={styles.likes_icon_container}>
            <Likes />
          </div>
          <p className={styles.likes_counter}>8</p>
        </div>
        <p className={styles.comments_counter}>2 comments</p>
      </div>
      <div className={styles.upper_hr}></div>
      <div className={styles.post_controls_container}>
        <div className={styles.likes_control_container}>
          <div className={styles.like_icon_container}>
            <Like />
          </div>
          <p>Like</p>
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
