import React, { useState } from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import Auth from 'routes/Auth/Auth';
import Home from 'routes/Home';

const AppRouter = ({ isLogin }) => {
  return (
    <Router>
      <Switch>
        {isLogin ? (
          <Route path="/">
            <Home />
          </Route>
        ) : (
          <Route path="/">
            <Auth />
          </Route>
        )}
      </Switch>
    </Router>
  );
};

export default AppRouter;
