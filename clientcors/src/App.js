import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import sign from "./Sign";
import main from "./Main";

function App() {
  return (
    <BrowserRouter>
      <>
        <Switch>
          <Route exact path={"/"} component={sign} />
          <Route path={"/main"} component={main} />
        </Switch>
      </>
    </BrowserRouter>
  );
}

export default App;
