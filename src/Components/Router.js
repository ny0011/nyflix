import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Redirect,
  Switch
} from "react-router-dom";
import Home from "Routes/Home";
import TV from "Routes/TV";
import Search from "Routes/Search";
import Detail from "Routes/Detail";
import Header from "Components/Header";

export default () => (
  <Router>
    <>
      <Header />
      <Switch>
        <Route path="/" exact component={Home}></Route>
        <Route path="/tv" exact component={TV}></Route>
        <Route path="/tv/popular" render={() => <h1>Popular</h1>}></Route>
        <Route path="/search" component={Search}></Route>
        <Route path="/movie/:id" component={Detail}></Route>
        <Route path="/show/:id" component={Detail}></Route>
        <Redirect from="*" to="/" />
      </Switch>
    </>
  </Router>
);
