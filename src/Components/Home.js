import React, { Component } from "react";
import "../App.css";
import Totals from "./Totals";
import NextUp from "./NextUp";
import Current from "./Current";
import { speak } from "../lib/speak";
import { Link } from "react-router-dom";
import { connect } from "react-redux";

const Note = () => {
  return (
    <p className="note">
      Try saying: "<strong>start</strong>" or "<strong>go</strong>" "<strong>
        pause
      </strong>" or "<strong>stop</strong>"
    </p>
  );
};

export class Home extends Component {
  speak = false;
  didChangeExercise = false;
  didChangeNext = false;

  componentDidMount() {
    const { dispatch } = this.props;
    try {
      this.speak = speak({
        start: () => {
          dispatch({ type: "START" }, null);
        },
        pause: () => {
          dispatch({ type: "START" }, null);
        }
      });

      this.speak.start();
    } catch (e) {
      console.log("SpeechRecognition not enabled");
    }
  }

  componentWillUnmount() {
    this.speak.stop();
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
      nextUp
    } = this.props;

    return (
      <div>
        <Note />
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

        <Link className="edit" to="/edit/0">
          Edit Workout
        </Link>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    pause: state.pause,
    label: state.label,
    currentRemaining: state.currentRemaining,
    totalTimeRemaining: state.totalTimeRemaining,
    nextUp: state.nextUp
  };
};

export default connect(mapStateToProps)(Home);
