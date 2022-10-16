import styles from './Navbar.module.css';
import Cookies from 'js-cookie';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import { ReactComponent as Hamburger } from '../assets/icons/navbar/hamburger.svg';
import { ReactComponent as Home } from '../assets/icons/navbar/home.svg';
import { ReactComponent as Friends } from '../assets/icons/navbar/friends.svg';
import { ReactComponent as Plus } from '../assets/icons/navbar/plus.svg';
import { ReactComponent as Notify } from '../assets/icons/navbar/notify.svg';
import { ReactComponent as User } from '../assets/icons/navbar/user.svg';
import { ReactComponent as Logout } from '../assets/icons/navbar/logout.svg';

export default function Navbar({ selected, onClick }) {
  const [dropdown, setDropdown] = useState(false);

  const handleClick = () => {
    setDropdown(!dropdown);
  };

  const handleLogout = () => {
    Cookies.remove('token');
  };

  return (
    <nav className={styles.nav}>
      <ul className={styles.nav_left}>
        <Link to="/feed">
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
        <Link
          className={`${selected === 'home' ? styles.selected : ''} ${
            styles.container
          }`}
          to="/feed"
          onClick={onClick}
          data-name="home"
        >
          <div className={styles.icon_container}>
            <Home />
          </div>
          <p>Home</p>
        </Link>
        <Link
          className={`${selected === 'friends' ? styles.selected : ''} ${
            styles.container
          }`}
          to="/friends"
          onClick={onClick}
          data-name="friends"
        >
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
        <Link className={styles.container} id={styles.user} to="/profile">
          <div className={styles.icon_container}>
            <User />
          </div>
          <p>Profile</p>
        </Link>
        <Link
          className={styles.container}
          id={styles.log_out}
          to="/"
          onClick={handleLogout}
        >
          <div className={styles.icon_container}>
            <Logout />
          </div>
          <p>Log out</p>
        </Link>
      </ul>
    </nav>
  );
}
