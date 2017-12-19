
import { items } from "../items";

// this will be pulled via ajax

const initialState = {
  items,
  pause: false,
  label: "ready",
  currentRemaining: "0",
  totalTime: 0,
  totalTimeRemaining: 0,
  nextUp: ""
};

export const main = (state = initialState, action) => {
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
