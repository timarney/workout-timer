import React, { Component } from "react";
import { Link } from "react-router-dom";

class Form extends Component {
  state = {};
  render() {
    return <div> Edit coming soon</div>;
  }
}

const EditForm = ({ match }) => (
  <div>
    <h3>ID: {match.params.id} -</h3>
    <Form />
    <Link to="/">Home</Link>
  </div>
);

export default EditForm;
