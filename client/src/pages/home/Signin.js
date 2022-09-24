import styles from './Signin.module.css';

export default function Signin({ onCreateClick }) {
  return (
    <div className={styles.form_wrapper}>
      <form className={styles.form} action="">
        <div className={styles.upper_form}>
          <input
            className={styles.form_input}
            type="text"
            placeholder="Username"
          />
          <input
            className={styles.form_input}
            type="text"
            placeholder="Password"
          />
          <button className={styles.button} type="submit">
            Log in
          </button>
        </div>
      </form>
      <div id={styles.hr}></div>
      <button
        id={styles.new_account_btn}
        className={styles.button}
        onClick={onCreateClick}
      >
        Create New Account
      </button>
    </div>
  );
}
