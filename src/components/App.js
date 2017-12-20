import React from "react";
import Main from "./Main";
import EditForm from "./forms/EditForm";
import { BrowserRouter as Router, Route } from "react-router-dom";

const App = () => (
  <Router>
    <div>
      <Route exact path="/:id?" component={Main} />
      <Route exact path="/edit/:id?" component={EditForm} />
    </div>
  </Router>
);

export default App;
