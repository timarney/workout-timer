import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import "../App.css";
import HomeNote from "./HomeNote";
import Totals from "./Totals";
import NextUp from "./NextUp";
import Current from "./Current";
import ItemList from "./ItemList";

export class Home extends Component {
  didChangeExercise = false;
  didChangeNext = false;

  componentDidMount() {
    const { id } = this.props.match.params;
    const { dispatch } = this.props;

    
    //dispatch({ type: "LOCATION_ID", payload: { id } });
  }

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
          <Current
            currentRemaining={currentRemaining}
            didChangeExercise={this.didChangeExercise}
            label={label}
          />
          <div className="workout-title">{title}</div>

          <Totals totalTimeRemaining={totalTimeRemaining} />
          <NextUp nextUp={nextUp} didChangeNext={this.didChangeNext} />
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

export default connect(mapStateToProps)(Home);
