import Logo from '../Logo';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import styles from './Navigation.module.css';

const Navigation = ({ userObj }) => {
  return (
    <nav className={styles.Nav}>
      <Link to="/">
        <Logo className={styles.Logo} />
      </Link>
      <Link to="/profile" className={styles.BtnProfile}>
        <img src={userObj.photoURL} />
        {userObj.displayName}
      </Link>
    </nav>
  );
};

export default Navigation;
