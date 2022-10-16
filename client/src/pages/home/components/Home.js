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
  const [authError, setAuthError] = useState('');

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
          <p>{authError} </p>
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