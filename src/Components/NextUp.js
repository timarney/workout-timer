import React, { Component } from "react";
import AnimateOnChange from "react-animate-on-change";

class NextUp extends Component {
  render() {
    const { didChangeNext, nextUp } = this.props;
    return (
      <div className="nextUp">
        <AnimateOnChange
          baseClassName="nextClass"
          animationClassName="animate-fade-in"
          animate={didChangeNext}
        >
          {nextUp !== "" ? (
            <span>
              <strong>Next Up:</strong> {nextUp}
            </span>
          ) : (
            <span role="img" aria-label="strong" style={{ fontSize: "2rem" }}>
              💪
            </span>
          )}
        </AnimateOnChange>
      </div>
    );
  }
}

export default NextUp;
