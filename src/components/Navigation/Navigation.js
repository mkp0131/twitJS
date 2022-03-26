import Logo from '../Logo';
import { Link } from 'react-router-dom';
import styles from './Navigation.module.css';

const Navigation = ({ userObj }) => {
  return (
    <nav className={styles.Nav}>
      <Link to="/">
        <Logo className={styles.Logo} />
      </Link>
      <Link to="/profile" className={styles.BtnProfile}>
        <img src={userObj?.photoURL || process.env.REACT_APP_DEFAULT_IMG} />
        {userObj?.displayName
          ? userObj.displayName
          : process.env.REACT_APP_DEFAULT_DISPLAYNAME}
      </Link>
    </nav>
  );
};

export default Navigation;
