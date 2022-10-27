import styles from '../styles/Signin.module.css';

export default function Signin({
  onCreateClick,
  onSubmit,
  onUserInputChange,
  onPasswordInputChange,
  signInError,
  userCreated,
}) {
  return (
    <div className={styles.form_wrapper}>
      <form className={styles.form} onSubmit={onSubmit}>
        <div className={styles.upper_form}>
          <input
            className={styles.form_input}
            type="text"
            placeholder="Username"
            onChange={onUserInputChange}
            required={true}
          />
          <input
            className={styles.form_input}
            type="password"
            placeholder="Password"
            onChange={onPasswordInputChange}
            required={true}
          />
          <button className={styles.button} type="submit">
            Log in
          </button>
          <p className={styles.error}>{signInError}</p>
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
      <button
        id={styles.new_account_btn}
        className={styles.button}
        onClick={onSubmit}
        data-demo="demo"
      >
        Demo an Existing Account
      </button>
      {userCreated && (
        <p className={styles.created_success}>
          Account created succesfully - please sign in above
        </p>
      )}
    </div>
  );
}
