import styles from './Signin.module.css';
import { useState, useEffect } from 'react';

export default function Signin({
  onCreateClick,
  onSubmit,
  onUserInputChange,
  onPasswordInputChange,
  signInError,
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
          />
          <input
            className={styles.form_input}
            type="password"
            placeholder="Password"
            onChange={onPasswordInputChange}
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
    </div>
  );
}
