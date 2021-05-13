import React, { useReducer } from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import login from "./Login";
import main from "./Main";
import signup from "./Signup";

function App() {
  return (
    <BrowserRouter>
      <div>
        <Switch>
          <Route exact path={"/"} component={main} />
          <Route path={"/login"} component={login} />
          <Route path={"/signup"} component={signup} />
        </Switch>
      </div>
    </BrowserRouter>
  );
}

export default App;
