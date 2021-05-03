import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import login from "./Login";
import main from "./Main";

function App() {
  return (
    <BrowserRouter>
      <div>
        <Switch>
          <Route exact path={"/"} component={main} />
          <Route path={"/login"} component={login} />
        </Switch>
      </div>
    </BrowserRouter>
  );
}

export default App;
