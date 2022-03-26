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
        <img src={userObj?.photoURL || '/logo192.png'} />
        {userObj?.displayName ? userObj.displayName : '별명을 정해주세요.'}
      </Link>
    </nav>
  );
};

export default Navigation;
