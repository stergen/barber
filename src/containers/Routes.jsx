import React from "react";
import { Route, Switch } from "react-router";

import MainPage from "../pages/Main";

const Routes = () => (
  <Switch>
    <Route exact path="/" component={MainPage} />
  </Switch>
);
export default Routes;
