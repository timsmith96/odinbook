import styles from './Navbar.module.css';
import { Link } from 'react-router-dom';
import { useState, useEffect, useLayoutEffect } from 'react';
import { ReactComponent as Hamburger } from '../assets/icons/navbar/hamburger.svg';
import { ReactComponent as Home } from '../assets/icons/navbar/home.svg';
import { ReactComponent as Friends } from '../assets/icons/navbar/friends.svg';
import { ReactComponent as Plus } from '../assets/icons/navbar/plus.svg';
import { ReactComponent as Notify } from '../assets/icons/navbar/notify.svg';
import { ReactComponent as User } from '../assets/icons/navbar/user.svg';

export default function Navbar() {
  const [dropdown, setDropdown] = useState(false);

  const handleClick = (e) => {
    setDropdown(!dropdown);
  };

  return (
    <nav className={styles.nav}>
      <ul className={styles.nav_left}>
        <Link to="/">
          <img
            src={require('../assets/icons/navbar/facebookIcon.png')}
            alt=""
            id={styles.facebook_icon}
          />
        </Link>
        <Link>
          <Hamburger id={styles.hamburger_icon} onClick={handleClick} />
        </Link>
      </ul>
      <ul className={`${styles.nav_center} ${dropdown ? styles.show : ''}`}>
        <Link className={styles.container}>
          <div className={styles.icon_container}>
            <Home className={styles.selected} />
          </div>
          <p>Home</p>
        </Link>
        <Link className={styles.container}>
          <div className={styles.icon_container}>
            <Friends />
          </div>
          <p>Friends</p>
        </Link>
      </ul>
      <ul className={`${styles.nav_right} ${dropdown ? styles.show : ''}`}>
        <Link className={styles.container}>
          <div className={styles.icon_container}>
            <Plus />
          </div>
          <p>Create post</p>
        </Link>
        <Link className={styles.container}>
          <div className={styles.icon_container}>
            <Notify />
          </div>
          <p>Notifications</p>
        </Link>
        <Link className={styles.container} id={styles.user}>
          <div className={styles.icon_container}>
            <User />
          </div>
          <p>Profile</p>
        </Link>
      </ul>
    </nav>
  );
}
