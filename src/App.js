import React from "react";
import Home from "./Components/Home";
import EditForm from "./Components/Forms/EditForm";
import { BrowserRouter as Router, Route } from "react-router-dom";

const App = () => (
  <Router>
    <div>
      <Route exact path="/" component={Home} />
      <Route exact path="/edit/:id" component={EditForm} />
    </div>
  </Router>
);

export default App;
