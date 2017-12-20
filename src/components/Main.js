import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import "../App.css";
import HomeNote from "./HomeNote";
import Total from "./Total";
import Next from "./Next";
import CurrentStatus from "./CurrentStatus";
import ItemList from "./ItemList";

class Main extends Component {
  didChangeExercise = false;
  didChangeNext = false;

  componentWillReceiveProps(nextProps) {
    const { id } = nextProps.match.params;
    const { dispatch } = this.props;

    if (this.props.locationId && this.props.locationId !== id) {
      dispatch({ type: "LOCATION_ID", payload: { id } });
    }
  }

  componentWillUpdate(nextProps, nextState) {
    const { label: nextLabel, nextUp: next } = nextProps;
    const { label, nextUp } = this.props;

    this.didChangeExercise = false;
    this.didChangeNext = false;

    if (nextLabel !== label) {
      this.didChangeExercise = true;
    }

    if (next !== nextUp) {
      this.didChangeNext = true;
    }
  }

  startStop = () => {
    const { dispatch } = this.props;
    dispatch({ type: "START-STOP" }, null);
  };

  render() {
    const {
      label,
      pause,
      currentRemaining,
      totalTimeRemaining,
      nextUp,
      title,
      locationId
    } = this.props;

    return (
      <div>
        <HomeNote />
        <div className="app">
          <CurrentStatus
            currentRemaining={currentRemaining}
            didChangeExercise={this.didChangeExercise}
            label={label}
          />
          <div className="workout-title">{title}</div>

          <Total totalTimeRemaining={totalTimeRemaining} />
          <Next nextUp={nextUp} didChangeNext={this.didChangeNext} />
          <button className="stopStart btn" onClick={this.startStop}>
            {pause === true ? "GO" : "STOP"}
          </button>
        </div>
        <Link className="edit" to="/edit">
          Add Workout
        </Link>

        <Link className="edit" to={`/edit/${locationId}`}>
          Edit Workout
        </Link>
        <ItemList />
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    ...state.main,
    locationId: state.locationId.id
  };
};

export default connect(mapStateToProps)(Main);
