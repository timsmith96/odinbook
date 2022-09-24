import styles from './Signup.module.css';
import { ReactComponent as CloseSvg } from '../../assets/icons/closeIcon.svg';
import { useState } from 'react';

export default function Signup({ onCloseClick, display }) {
  const [errors, setErrors] = useState([]);
  const [form, setForm] = useState({
    firstName: '',
    surname: '',
    username: '',
    password: '',
    confirmPassword: '',
  });

  const handleInputChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // try/catch up here to see if we can catch the errors like that?
    const res = await fetch('http://localhost:3000/users', {
      method: 'POST',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(form),
    });
    const json = await res.json();
    setErrors(json.errors);
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
            onChange={handleInputChange}
            className={styles.input}
            type="text"
            placeholder="First name"
            required={true}
          ></input>
          <input
            value={form.surname}
            name="surname"
            onChange={handleInputChange}
            type="text"
            className={styles.input}
            placeholder="Surname"
            required={true}
          ></input>
        </div>
        <input
          value={form.username}
          name="username"
          onChange={handleInputChange}
          className={styles.input}
          type="text"
          placeholder="Username"
          required={true}
        />
        <input
          value={form.password}
          name="password"
          onChange={handleInputChange}
          className={styles.input}
          type="password"
          placeholder="Password"
          required={true}
        />
        <input
          value={form.confirmPassword}
          name="confirmPassword"
          onChange={handleInputChange}
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
