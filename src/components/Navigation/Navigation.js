import Logo from '../Logo';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import styles from './Navigation.module.css';

const Navigation = () => {
  return (
    <nav className={styles.Nav}>
      <Logo className={styles.Logo} />
      <Link to="/profile">profile</Link>
    </nav>
  );
};

export default Navigation;
