import React, { Component } from "react";
import { Route, BrowserRouter as Router, Switch } from "react-router-dom";
import withAuth from "./components/withAuth";

import Dashboard from "./components/pages/Dashboard";
import Login from "./components/pages/Login";
import SignUp from "./components/pages/SignUp";
import Notfound from "./components/pages/Notfound";

class App extends Component {
  render() {
    return (
      <Router basename={process.env.PUBLIC_URL}>
        <div className="App">
          <div className="container">
            <Switch>
              <Route exact path="/" component={withAuth(Dashboard)} />
              <Route exact path="/login" component={Login} />
              <Route exact path="/signup" component={SignUp} />
              <Route component={Notfound} />
            </Switch>
          </div>
        </div>
      </Router>
    );
  }
}

export default App;
