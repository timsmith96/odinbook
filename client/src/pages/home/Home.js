import { useState } from 'react';

import styles from './Home.module.css';
import Signup from './Signup';
import Signin from './Signin';

export default function Home() {
  const [modal, setModal] = useState(false);
  document.title = 'Odinbook – log in or sign up';
  const handleClick = () => {
    console.log('clicked');
    setModal(!modal);
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
        <Signin onCreateClick={handleClick} />
      </main>
      <Signup onCloseClick={handleClick} display={modal} />
    </div>
  );
}
