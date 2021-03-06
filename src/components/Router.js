import React, { useState } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect,
} from 'react-router-dom';
import Auth from 'routes/Auth/Auth';
import Home from 'routes/Home/Home';
import Profile from 'routes/Profile/Profile';
import Navigation from 'components/Navigation/Navigation';

const AppRouter = ({ isLogin, userObj, refleshUser }) => {
  return (
    <Router basename={process.env.PUBLIC_URL}>
      <Switch>
        {isLogin ? (
          <>
            <Navigation userObj={userObj} />
            <Route exact path="/profile">
              <Profile userObj={userObj} refleshUser={refleshUser} />
            </Route>
            <Route exact path="/">
              <Home userObj={userObj} />
            </Route>
          </>
        ) : (
          <>
            <Route exact path="/">
              <Auth />
            </Route>
            <Route path="*">
              <Redirect to="/" />
            </Route>
          </>
        )}
      </Switch>
    </Router>
  );
};

export default AppRouter;
