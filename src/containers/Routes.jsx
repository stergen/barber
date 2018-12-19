import React from "react";
import { Route, Switch } from "react-router";

import MainPage from "../pages/Main";
import LoginPage from "../pages/Login";
import RegistPage from "../pages/Registration";

const Routes = () => (
  <Switch>
    <Route exact path="/" component={MainPage} />
    <Route exact path="/login" component={LoginPage} />
    <Route exact path="/registration" component={RegistPage} />
  </Switch>
);
export default Routes;
