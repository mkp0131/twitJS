import Logo from './Logo';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';

const Navigation = () => {
  return (
    <nav>
      <Logo />
      <Link to="/profile">profile</Link>
    </nav>
  );
};

export default Navigation;
