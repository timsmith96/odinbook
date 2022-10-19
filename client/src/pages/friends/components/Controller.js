import Navbar from '../../../components/Navbar';
import Suggestions from './Suggestions';
import Requests from './Requests';
import Friends from './Friends';
import Nav from './Nav';
import styles from '../styles/Controller.module.css';
import { useState, useContext } from 'react';
import { UserContext } from '../../../context/UserContext';

export default function Controller({
  selected,
  onClick,
  onUserChange,
  onSetUser,
}) {
  const [display, setDisplay] = useState('friends');
  const user = useContext(UserContext);
  console.log(user);

  const handleClick = (e) => {
    setDisplay(e.currentTarget.dataset.name);
  };

  let toRender;

  if (display === 'suggestions') {
    toRender = <Suggestions onSetUser={onSetUser} />;
  } else if (display === 'requests') {
    toRender = <Requests />;
  } else if (display === 'friends') {
    toRender = <Friends user={user} />;
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
