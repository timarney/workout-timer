import React from "react";
import Home from "./Home";
import EditForm from "./forms/EditForm";
import { BrowserRouter as Router, Route } from "react-router-dom";

const App = () => (
  <Router>
    <div>
      <Route exact path="/:id?" component={Home} />
      <Route exact path="/edit/:id?" component={EditForm} />
    </div>
  </Router>
);

export default App;
