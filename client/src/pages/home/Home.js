import { useState } from 'react';

import styles from './Home.module.css';
import Signup from './Signup';
import Signin from './Signin';

export default function Home() {
  const formTemplate = {
    firstName: '',
    surname: '',
    username: '',
    password: '',
    confirmPassword: '',
  };
  const [modal, setModal] = useState(false);
  const [form, setForm] = useState(formTemplate);
  const [username, setUsername] = useState();
  const [password, setPassword] = useState();
  const [signInError, setSignInError] = useState();
  const [errors, setErrors] = useState([]);

  // username input change
  const handleUsernameInputChange = (e) => {
    setUsername(e.target.value);
  };

  // password input change
  const handlePasswordInputChange = (e) => {
    setPassword(e.target.value);
  };

  // log in form being submitted
  const handleSubmit = async (e) => {
    console.log(username, password);
    e.preventDefault();
    const res = await fetch('http://localhost:3000/login', {
      method: 'POST',
      mode: 'cors',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username: username, password: password }),
    });
    const json = await res.json();
    if (res.status === 401) {
      setSignInError(json);
    } else {
      setSignInError('logged in successfully');
    }
  };

  // sign up form inputs
  const handleInputChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };
  const handleErrors = (errors) => {
    setErrors(errors);
  };

  // display and hide modal and clear inputs/errors
  const handleClick = () => {
    setForm(formTemplate);
    setModal(!modal);
    setErrors([]);
  };

  return (
    <div className={styles.home}>
      <main className={`${modal ? styles.opacity : ''}`}>
        <div className={styles.logo}>
          <h1>odinbook</h1>
          <p>
            Odinbook helps you connect and share with the people in your life.
          </p>
        </div>
        <Signin
          onCreateClick={handleClick}
          onSubmit={handleSubmit}
          onUserInputChange={handleUsernameInputChange}
          onPasswordInputChange={handlePasswordInputChange}
          signInError={signInError}
        />
      </main>
      <Signup
        onCloseClick={handleClick}
        display={modal}
        form={form}
        onInputChange={handleInputChange}
        errors={errors}
        onError={handleErrors}
      />
    </div>
  );
}
