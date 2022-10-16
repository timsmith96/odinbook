import Navbar from '../../../components/Navbar';
import Suggestions from './Suggestions';
import Requests from './Requests';
import Friends from './Friends';
import Nav from './Nav';
import styles from '../styles/Controller.module.css';
import { useState } from 'react';

export default function Controller({ selected, onClick }) {
  const [display, setDisplay] = useState('friends');

  const handleClick = (e) => {
    setDisplay(e.currentTarget.dataset.name);
  };

  let toRender;

  if (display === 'suggestions') {
    toRender = <Suggestions />;
  } else if (display === 'requests') {
    toRender = <Requests />;
  } else if (display === 'friends') {
    toRender = <Friends />;
  }
  return (
    <div className={styles.controller}>
      <div className={styles.content}>
        <Nav onClick={handleClick} selected={display} />
        {toRender}
      </div>
    </div>
  );
}
