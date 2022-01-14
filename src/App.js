import React, { Component } from "react";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from "react-router-dom";

import Homepage from "./Components/Homepage/Homepage";

class App extends Component {
  render() {
    return (
      <Router>
        <Switch>
          <Route exact path="/">
            <Homepage />
          </Route>
          <Route path="*">
            <Homepage />
          </Route>
        </Switch>
      </Router>
    );
  }
}

export default App;
