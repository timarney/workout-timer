import React from "react";
import { render } from "react-dom";
import "./index.css";
import Root from "./components/Root";
import registerServiceWorker from "./registerServiceWorker";
import { createStore } from "redux";
import { rootReducer } from "./reducers";
import { queue } from "./lib/queue";
import { speak } from "./lib/speak";

const store = createStore(rootReducer);
const i = store.getState().items["w1"].exercises;

queue.init(i, store, { startIndex: 0 });

//this will be moved
const commands = speak({
  start: () => {
    store.dispatch({ type: "START" }, null);
  },
  pause: () => {
    store.dispatch({ type: "STOP" }, null);
  }
});

commands.start();

render(<Root store={store} />, document.getElementById("root"));
registerServiceWorker();
