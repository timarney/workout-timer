import React, { Component } from "react";
import "../App.css";
import Totals from "./Totals";
import NextUp from "./NextUp";
import Current from "./Current";
import { q } from "../lib/queue";
import { secondsToMinutes } from "../lib/timeConversion";
import { countdown } from "../lib/countdown";
import { speak } from "../lib/speak";
import { Link } from "react-router-dom";

// this will be dynamic
let items = [
  { label: "Exercise 1", duration: 30 },
  { label: "Break", duration: 10 },
  { label: "Exercise 2", duration: 30 },
  { label: "Break", duration: 10 },
  { label: "Exercise 3", duration: 30 }
];

q.setItems(items);
//

let total = secondsToMinutes(countdown.totalTime(items));

const Note = () => {
  return (
    <p className="note">
      Try saying: "<strong>start</strong>" or "<strong>go</strong>" "<strong>
        pause
      </strong>" or "<strong>stop</strong>"
    </p>
  );
};

class Home extends Component {
  state = {
    label: "ready",
    currentRemaining: "0",
    totalTime: total,
    totalTimeRemaining: total,
    btnText: "Stop",
    nextUp: ""
  };

  didChangeExercise = false;
  didChangeNext = false;

  componentDidMount() {
    q.finished = () => {
      let txt = `Done`;
      this.setState({
        label: txt,
        currentRemaining: "",
        totalTimeRemaining: ""
      });
    };

    q.run(this, countdown);

    try {
      speak({
        start: () => {
          countdown.startTimer();
          this.setState({ btnText: "Stop" });
        },
        pause: () => {
          console.log("here pause");
          countdown.pauseTimer();
          this.setState({ btnText: "Go" });
        }
      }).start();
    } catch (e) {
      console.log("SpeechRecognition not enabled");
    }
  }

  componentWillUpdate(nextProps, nextState) {
    const { label: nextLabel, nextUp: next } = nextState;
    const { label, nextUp } = this.state;

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
    const pause = !countdown.pause;
    if (pause) {
      countdown.pauseTimer();
      this.setState({ btnText: "Go" });
    } else {
      countdown.startTimer();
      this.setState({ btnText: "Stop" });
    }
  };

  render() {
    const {
      label,
      currentRemaining,
      totalTimeRemaining,
      btnText,
      nextUp
    } = this.state;

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
            {btnText}
          </button>
        </div>
        <Link className="edit" to="/edit/1">
          Edit Workout
        </Link>
      </div>
    );
  }
}

export default Home;
