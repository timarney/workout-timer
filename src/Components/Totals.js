import React, { Component } from "react";
import { secondsToMinutes } from "../lib/timeConversion";

class Totals extends Component {
  render() {
    const { totalTimeRemaining } = this.props;
    return (
      <div className="totals">
        <div className="remaining">Remaining:</div>
        {secondsToMinutes(totalTimeRemaining)}
      </div>
    );
  }
}

export default Totals;
