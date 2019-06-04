import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";

import Main from "./components/Layout/Main";

import Home from "./components/home";
import Register from "./components/Auth/Register";
import Login from "./components/Auth/Login";

function App() {
  return (
    <div>
      <BrowserRouter>
        <Main>
          <Switch>
            <Route exact path="/" component={Home} />
            <Route path="/login" component={Login} />
            <Route path="/register" component={Register} />
          </Switch>
        </Main>
      </BrowserRouter>
    </div>
  );
}

export default App;
