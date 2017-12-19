import { items } from "../items";
import { combineReducers } from "redux";

// this will be pulled via ajax

const mainInitialState = {
  pause: false,
  label: "ready",
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

const itemsIntialState = { ...items };

const itemsReducer = (state = itemsIntialState, action) => {
  return state;
};

export const rootReducer = combineReducers({
  items: itemsReducer,
  main: mainReducer
});

/*
const msg = `SUBMIT NOT CONNECTED TO SAVE YET \n ${JSON.stringify(
      values,
      0,
      2
    )}`;
    window.alert(msg);
*/
