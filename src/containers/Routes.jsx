import React from "react";
import { Route, Switch } from "react-router";

import MainPage from "../pages/Main";
import LoginPage from "../pages/Login";

const Routes = () => (
  <Switch>
    <Route exact path="/" component={MainPage} />
    <Route exact path="/login" component={LoginPage} />
  </Switch>
);
export default Routes;
