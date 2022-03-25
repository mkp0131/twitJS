import React, { useState } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect,
} from 'react-router-dom';
import Auth from 'routes/Auth/Auth';
import Home from 'routes/Home';
import Profile from 'routes/Profile/Profile';
import Navigation from 'components/Navigation';

const AppRouter = ({ isLogin }) => {
  console.log(isLogin);

  return (
    <Router>
      <Switch>
        {isLogin ? (
          <>
            <Navigation />
            <Route exact path="/profile">
              <Profile />
            </Route>
            <Route exact path="/">
              <Home />
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
