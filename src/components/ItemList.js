import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
export class List extends Component {
  state = {};

  render() {
    const { items } = this.props;
    const workouts = Object.keys(items);
    return (
      <ul>
        {workouts.map(id => {
          const current = items[id];
          return (
            <li key={id}>
              <div>
                <Link to={`/${id}`}>{current.label}</Link>
                {/* <Link to={`/edit/${id}`}>edit</Link> */}
              </div>
            </li>
          );
        })}
      </ul>
    );
  }
}

const mapStateToProps = state => {
  return {
    items: state.items
  };
};

export default connect(mapStateToProps)(List);
