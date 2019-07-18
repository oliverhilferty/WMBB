import React from "react";
import { Route, Switch } from "react-router-dom";
import Home from "./containers/Home";
import UserStops from "./containers/UserStops";

export default () =>
    <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/user-stops" exact component={UserStops}/>
    </Switch>;
