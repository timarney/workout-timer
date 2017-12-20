import React from "react";
import { render } from "react-dom";
import "./index.css";
import Root from "./components/Root";
import registerServiceWorker from "./registerServiceWorker";
import { createStore, applyMiddleware } from "redux";
import { rootReducer } from "./reducers";
import { queue } from "./lib/queue";
import { speak } from "./lib/speak";
import { persist } from "./middleware/persist";

const store = createStore(rootReducer, applyMiddleware(persist));
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

//commands.start();

render(<Root store={store} />, document.getElementById("root"));
registerServiceWorker();
