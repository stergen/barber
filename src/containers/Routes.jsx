import React from "react";
import { Route, Switch } from "react-router";

import Main from "./Main";

const Routes = () => (
  <Switch>
    <Route exact path="/" component={Main} />
  </Switch>
);
export default Routes;
