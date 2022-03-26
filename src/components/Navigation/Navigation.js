import Logo from '../Logo';
import { Link } from 'react-router-dom';
import styles from './Navigation.module.css';
import { USER_DEFAULT_DISPLAYNAME, USER_DEFAULT_PHOTOURL } from 'userSetting';

const Navigation = ({ userObj }) => {
  return (
    <nav className={styles.Nav}>
      <Link to="/">
        <Logo className={styles.Logo} />
      </Link>
      <Link to="/profile" className={styles.BtnProfile}>
        <img src={userObj?.photoURL ?? USER_DEFAULT_PHOTOURL} />
        {userObj?.displayName ? userObj.displayName : USER_DEFAULT_DISPLAYNAME}
      </Link>
    </nav>
  );
};

export default Navigation;
