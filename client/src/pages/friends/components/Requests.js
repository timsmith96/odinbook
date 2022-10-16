import styles from '../styles/Requests.module.css';

export default function Requests() {
  return (
    <div className={styles.suggestions}>
      <h2 className={styles.title}>Friend requests</h2>
      <ul className={styles.suggestions_list}>
        <li className={styles.list_item}>
          <div
            className={styles.user_icon_container}
            style={{
              backgroundImage: `url(https://odinbook-bucket.s3.eu-west-2.amazonaws.com/8703e24690ba2fbe0104cdcad8910fee34c745480191f2a9e51dbb984dcb98b9?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=AKIAV5ECBZ4NJU2N6WNJ%2F20221013%2Feu-west-2%2Fs3%2Faws4_request&X-Amz-Date=20221013T115240Z&X-Amz-Expires=900&X-Amz-Signature=62a71660c1c21b7b8cfc08002de66fb511568fedf274b5e1cb9875df6798da64&X-Amz-SignedHeaders=host&x-id=GetObject)`,
            }}
          ></div>
          <p className={styles.suggestion_name_text}>Peter Smith</p>
          <div className={styles.btn_container}>
            <button className={styles.add_btn}>Accept</button>
            <button className={styles.decline_btn}>Decline</button>
          </div>
        </li>
        <li className={styles.list_item}>
          <div
            className={styles.user_icon_container}
            style={{
              backgroundImage: `url(https://odinbook-bucket.s3.eu-west-2.amazonaws.com/8703e24690ba2fbe0104cdcad8910fee34c745480191f2a9e51dbb984dcb98b9?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=AKIAV5ECBZ4NJU2N6WNJ%2F20221013%2Feu-west-2%2Fs3%2Faws4_request&X-Amz-Date=20221013T115240Z&X-Amz-Expires=900&X-Amz-Signature=62a71660c1c21b7b8cfc08002de66fb511568fedf274b5e1cb9875df6798da64&X-Amz-SignedHeaders=host&x-id=GetObject)`,
            }}
          ></div>
          <p className={styles.suggestion_name_text}>Peter Smith</p>
          <div className={styles.btn_container}>
            <button className={styles.add_btn}>Accept</button>
            <button className={styles.decline_btn}>Decline</button>
          </div>
        </li>
        <li className={styles.list_item}>
          <div
            className={styles.user_icon_container}
            style={{
              backgroundImage: `url(https://odinbook-bucket.s3.eu-west-2.amazonaws.com/8703e24690ba2fbe0104cdcad8910fee34c745480191f2a9e51dbb984dcb98b9?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=AKIAV5ECBZ4NJU2N6WNJ%2F20221013%2Feu-west-2%2Fs3%2Faws4_request&X-Amz-Date=20221013T115240Z&X-Amz-Expires=900&X-Amz-Signature=62a71660c1c21b7b8cfc08002de66fb511568fedf274b5e1cb9875df6798da64&X-Amz-SignedHeaders=host&x-id=GetObject)`,
            }}
          ></div>
          <p className={styles.suggestion_name_text}>Peter Smith</p>
          <div className={styles.btn_container}>
            <button className={styles.add_btn}>Accept</button>
            <button className={styles.decline_btn}>Decline</button>
          </div>
        </li>
        <li className={styles.list_item}>
          <div
            className={styles.user_icon_container}
            style={{
              backgroundImage: `url(https://odinbook-bucket.s3.eu-west-2.amazonaws.com/8703e24690ba2fbe0104cdcad8910fee34c745480191f2a9e51dbb984dcb98b9?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=AKIAV5ECBZ4NJU2N6WNJ%2F20221013%2Feu-west-2%2Fs3%2Faws4_request&X-Amz-Date=20221013T115240Z&X-Amz-Expires=900&X-Amz-Signature=62a71660c1c21b7b8cfc08002de66fb511568fedf274b5e1cb9875df6798da64&X-Amz-SignedHeaders=host&x-id=GetObject)`,
            }}
          ></div>
          <p className={styles.suggestion_name_text}>Peter Smith</p>
          <div className={styles.btn_container}>
            <button className={styles.add_btn}>Accept</button>
            <button className={styles.decline_btn}>Decline</button>
          </div>
        </li>
        <li className={styles.list_item}>
          <div
            className={styles.user_icon_container}
            style={{
              backgroundImage: `url(https://odinbook-bucket.s3.eu-west-2.amazonaws.com/8703e24690ba2fbe0104cdcad8910fee34c745480191f2a9e51dbb984dcb98b9?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=AKIAV5ECBZ4NJU2N6WNJ%2F20221013%2Feu-west-2%2Fs3%2Faws4_request&X-Amz-Date=20221013T115240Z&X-Amz-Expires=900&X-Amz-Signature=62a71660c1c21b7b8cfc08002de66fb511568fedf274b5e1cb9875df6798da64&X-Amz-SignedHeaders=host&x-id=GetObject)`,
            }}
          ></div>
          <p className={styles.suggestion_name_text}>Peter Smith</p>
          <div className={styles.btn_container}>
            <button className={styles.add_btn}>Accept</button>
            <button className={styles.decline_btn}>Decline</button>
          </div>
        </li>
      </ul>
    </div>
  );
}
