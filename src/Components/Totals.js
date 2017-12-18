import React, { Component } from "react";
import { secondsToMinutes } from "../util/timeConversion";

class Totals extends Component {
  render() {
    const { totalTimeRemaining } = this.props;
    return (
      <div className="totals">
        <div className="remaining">Workout Remaining:</div>
        {secondsToMinutes(totalTimeRemaining)}
      </div>
    );
  }
}

export default Totals;
