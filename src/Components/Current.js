import React, { Component } from "react";
import AnimateOnChange from "react-animate-on-change";
import { secondsToMinutes } from "../library/timeConversion";

class Current extends Component {
  render() {
    const { currentRemaining, didChangeExercise, label } = this.props;
    return (
      <div className="current">
        <div className="currentRemaining">
          {secondsToMinutes(currentRemaining)}
        </div>
        <AnimateOnChange
          baseClassName="label"
          animationClassName="animate-pop-in"
          animate={didChangeExercise}
        >
          {label}
        </AnimateOnChange>
      </div>
    );
  }
}

export default Current;
