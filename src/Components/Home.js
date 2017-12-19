import React, { Component } from "react";
import "../App.css";
import HomeNote from "./HomeNote";
import Totals from "./Totals";
import NextUp from "./NextUp";
import Current from "./Current";
import { Link } from "react-router-dom";
import { connect } from "react-redux";

export class Home extends Component {
  didChangeExercise = false;
  didChangeNext = false;

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
      nextUp
    } = this.props;

    return (
      <div>
        <HomeNote />
        <div className="app">
          <Current
            currentRemaining={currentRemaining}
            didChangeExercise={this.didChangeExercise}
            label={label}
          />
          <Totals totalTimeRemaining={totalTimeRemaining} />
          <NextUp nextUp={nextUp} didChangeNext={this.didChangeNext} />
          <button className="stopStart btn" onClick={this.startStop}>
            {pause === true ? "GO" : "STOP"}
          </button>
        </div>
        <Link className="edit" to="/edit">
          Add Workout
        </Link>

        <Link className="edit" to="/edit/1">
          Edit Workout
        </Link>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    ...state.main
  };
};

export default connect(mapStateToProps)(Home);
