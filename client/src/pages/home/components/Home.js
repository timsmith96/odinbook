import { useState, useContext, useEffect } from 'react';
import { UserContext } from '../../../context/UserContext';
import { useNavigate } from 'react-router-dom';
import styles from '../styles/Home.module.css';
import Signup from './Signup';
import Signin from './Signin';

export default function Home({
  onSubmit,
  onUserInputChange,
  onPasswordInputChange,
  signInError,
  setSignInError,
  loggingIn,
  loggingDemoIn,
  onDemoClick
}) {
  const formTemplate = {
    firstName: '',
    surname: '',
    username: '',
    password: '',
    confirmPassword: '',
  };
  const [modal, setModal] = useState(false);
  const [form, setForm] = useState(formTemplate);
  const [errors, setErrors] = useState([]);
  const [userCreated, setUserCreated] = useState(false);

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
          onSubmit={onSubmit}
          onUserInputChange={onUserInputChange}
          onPasswordInputChange={onPasswordInputChange}
          signInError={signInError}
          userCreated={userCreated}
          loggingIn={loggingIn}
          loggingDemoIn={loggingDemoIn}
          onDemoClick={onDemoClick}
        />
      </main>
      <Signup
        onCloseClick={handleClick}
        display={modal}
        form={form}
        onInputChange={handleInputChange}
        errors={errors}
        onError={handleErrors}
        setUserCreated={setUserCreated}
        setSignInError={setSignInError}
      />
    </div>
  );
}
