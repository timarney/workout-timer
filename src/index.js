import React from "react";
import { render } from "react-dom";
import "./index.css";
import Root from "./components/Root";
import registerServiceWorker from "./registerServiceWorker";
import { createStore } from "redux";
import { main } from "./reducers";
import { queue } from "./lib/queue";
import { speak } from "./lib/speak";

const store = createStore(main);
const items = store.getState().items[0].exercises;
queue.init(items, store, 2);

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
