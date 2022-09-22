import styles from './Home.module.css';

export default function home() {
  return (
    <div className={styles.home}>
      <main>
        <div className={styles.logo}>
          <h1>odinbook</h1>
          <p>
            Odinbook helps you connect and share with the people in your life.
          </p>
        </div>
        <form action="">
          <div className={styles.upper_form}>
            <input type="text" placeholder="Username" />
            <input type="text" placeholder="Password" />
            <button type="submit">Log in</button>
          </div>
          <div id={styles.hr}></div>
          <button id={styles.new_account_btn}>Create New Account</button>
        </form>
      </main>
    </div>
  );
}
