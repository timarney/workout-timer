import { items } from "../items";
import { combineReducers } from "redux";

// this will be pulled via ajax
const mainInitialState = {
  pause: true,
  label: "ready",
  currentItem: "",
  currentRemaining: "0",
  totalTime: 0,
  totalTimeRemaining: 0,
  nextUp: ""
};

const mainReducer = (state = mainInitialState, action) => {
  switch (action.type) {
    case "INTERVAL":
      return Object.assign({}, state, action.payload);
    case "START":
      return Object.assign({}, state, { pause: false });
    case "STOP":
      return Object.assign({}, state, { pause: true });
    case "START-STOP":
      const pause = !state.pause;
      return Object.assign({}, state, { pause });
    default:
      return state;
  }
};

const workouts = JSON.parse(localStorage.getItem("workouts"));

let itemsIntialState = { ...workouts };

if (!Object.keys(itemsIntialState).length) {
  itemsIntialState = { ...items };
}

//const

const itemsReducer = (state = itemsIntialState, action) => {
  switch (action.type) {
    case "UPDATE_WORKOUT":
      const id = action.payload.id;
      return Object.assign({}, state, { [id]: action.payload.values });
    default:
      return state;
  }
};

const selectedLocationReducer = (state = { id: "w1" }, action) => {
  switch (action.type) {
    case "LOCATION_ID":
      const id = action.payload.id;
      return Object.assign({}, state, { id: id });
    default:
      return state;
  }
};

export const rootReducer = combineReducers({
  items: itemsReducer,
  main: mainReducer,
  locationId: selectedLocationReducer
});

/*
const msg = `SUBMIT NOT CONNECTED TO SAVE YET \n ${JSON.stringify(
      values,
      0,
      2
    )}`;
    window.alert(msg);
*/
