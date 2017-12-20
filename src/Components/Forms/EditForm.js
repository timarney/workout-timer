import React, { Component } from "react";
import { Link, Redirect } from "react-router-dom";
import Styles from "./Styles";
import { Form, Field } from "react-final-form";
import arrayMutators from "final-form-arrays";
import { FieldArray } from "react-final-form-arrays";
import { connect } from "react-redux";
import uuidv4 from "uuid/v4";

const defaultData = {
  label: "Workout",
  exercises: [{ label: "Exercise 1", duration: 60 }]
};

class FormDisplay extends Component {
  state = { data: {} };
  componentDidMount() {
    const { dispatch } = this.props;
    dispatch({ type: "STOP" }, null);

    const { id, items } = this.props;
    let data = null;

    if (typeof id === "undefined") {
      data = defaultData;
    } else {
      data = Object.assign({}, items[id]);
    }

    this.setState({ data });
  }

  onSubmit = values => {
    const { dispatch, id } = this.props;
    dispatch({ type: "UPDATE_WORKOUT", payload: { id, values } });
  };

  generateId() {
    return uuidv4();
  }

  render() {
    const { id, location } = this.props;

    if (typeof id === "undefined") {
      return (
        <Redirect
          to={{
            pathname: `/edit/${this.generateId()}`,
            state: { from: location }
          }}
        />
      );
    }

    return (
      <div>
        <Styles>
          <Form
            initialValues={this.state.data}
            onSubmit={this.onSubmit}
            mutators={{
              ...arrayMutators
            }}
            render={({
              handleSubmit,
              mutators: { push, pop }, // injected from final-form-arrays above
              pristine,
              reset,
              submitting,
              values
            }) => {
              return (
                <form onSubmit={handleSubmit}>
                  <div>
                    <label>Workout Name</label>
                    <Field name="label" component="input" />
                  </div>
                  <div className="buttons">
                    <button
                      type="button"
                      onClick={() => push("exercises", undefined)}
                    >
                      Add Exercise
                    </button>
                  </div>
                  <FieldArray name="exercises">
                    {({ fields }) =>
                      fields.map((item, index) => (
                        <div key={item}>
                          <label>Excercise. #{index + 1}</label>
                          <Field
                            name={`${item}.label`}
                            component="input"
                            placeholder="Name"
                          />
                          <Field
                            name={`${item}.duration`}
                            component="input"
                            placeholder="Duration"
                          />
                          <span
                            role="img"
                            aria-label="close"
                            onClick={() => fields.remove(index)}
                            style={{ cursor: "pointer" }}
                          >
                            ❌
                          </span>
                        </div>
                      ))
                    }
                  </FieldArray>

                  <div className="buttons">
                    <button type="submit" disabled={submitting || pristine}>
                      Submit
                    </button>
                    <button
                      type="button"
                      onClick={reset}
                      disabled={submitting || pristine}
                    >
                      Reset
                    </button>
                  </div>
                  {/* <pre>{JSON.stringify(values, 0, 2)}</pre> */}
                </form>
              );
            }}
          />
        </Styles>
      </div>
    );
  }
}

const EditForm = ({ match }) => (
  <div>
    <ConnectedForm id={match.params.id} />
    <Link to="/" className="edit">
      Home
    </Link>
  </div>
);

const mapStateToProps = state => {
  return {
    items: state.items
  };
};

const ConnectedForm = connect(mapStateToProps)(FormDisplay);

export default EditForm;
