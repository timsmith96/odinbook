import styles from '../styles/Signup.module.css';
import { ReactComponent as CloseSvg } from '../../../assets/icons/closeIcon.svg';

export default function Signup({
  onCloseClick,
  display,
  form,
  onInputChange,
  errors,
  onError,
  setUserCreated,
  setSignInError,
}) {
  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await fetch('https://cryptic-wave-65159.herokuapp.com/users', {
      method: 'POST',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(form),
    });
    const json = await res.json();
    if (res.status === 400) {
      onError(json.errors);
    } else {
      onCloseClick();
      setUserCreated(true);
      setSignInError('');
    }
  };

  return (
    <div className={`${styles.form_container} ${display ? '' : styles.hide}`}>
      <div className={styles.form_header}>
        <h2>Sign Up</h2>
        <p>It's quick and easy.</p>
        <CloseSvg className={styles.close_icon} onClick={onCloseClick} />
        <div className={styles.hr}></div>
      </div>
      <form className={styles.form} onSubmit={handleSubmit}>
        <div className={styles.names}>
          <input
            value={form.firstName}
            name="firstName"
            onChange={onInputChange}
            className={styles.input}
            type="text"
            placeholder="First name"
            required={true}
          ></input>
          <input
            value={form.surname}
            name="surname"
            onChange={onInputChange}
            type="text"
            className={styles.input}
            placeholder="Surname"
            required={true}
          ></input>
        </div>
        <input
          value={form.username}
          name="username"
          onChange={onInputChange}
          className={styles.input}
          type="text"
          placeholder="Username"
          required={true}
        />
        <input
          value={form.password}
          name="password"
          onChange={onInputChange}
          className={styles.input}
          type="password"
          placeholder="Password"
          required={true}
        />
        <input
          value={form.confirmPassword}
          name="confirmPassword"
          onChange={onInputChange}
          className={styles.input}
          type="password"
          placeholder="Confirm password"
          required={true}
        />
        {errors.map((error) => {
          return (
            <li key={error.param} className={styles.error_message}>
              {error.msg}
            </li>
          );
        })}
        <button className={styles.button}>Sign Up</button>
      </form>
    </div>
  );
}
