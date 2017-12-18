import React, { Component } from "react";
import { Link } from "react-router-dom";
import Styles from "./Styles";
import { Form, Field } from "react-final-form";
import arrayMutators from "final-form-arrays";
import { FieldArray } from "react-final-form-arrays";
import { items } from "../../items";

const sleep = ms => new Promise(resolve => setTimeout(resolve, ms));

const onSubmit = async values => {
  await sleep(300);
  const msg = `SUBMIT NOT CONNECTED TO SAVE YET \n ${JSON.stringify(
    values,
    0,
    2
  )}`;
  window.alert(msg);
};

const load = async id => {
  if (!id) {
    //load empty form
    const data = {
      label: "",
      exercises: [{ label: "", duration: "" }]
    };
    return data;
  }

  return items[0];
};

class FormDisplay extends Component {
  state = { data: {} };
  async componentDidMount() {
    const { id } = this.props;
    console.log(id);

    this.setState({ loading: true });
    const data = await load(id);
    this.setState({ loading: false, data });
  }

  render() {
    return (
      <div>
        <Styles>
          <Form
            initialValues={this.state.data}
            onSubmit={onSubmit}
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
                  <pre>{JSON.stringify(values, 0, 2)}</pre>
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
    <h3>ID: {match.params.id}</h3>
    <FormDisplay id={match.params.id} />
    <Link to="/" className="edit">
      Home
    </Link>
  </div>
);

export default EditForm;
