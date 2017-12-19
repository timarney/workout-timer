import React from "react";
import { render } from "react-dom";
import "./index.css";
import Root from "./components/Root";
import registerServiceWorker from "./registerServiceWorker";
import { createStore } from "redux";
import { main } from "./reducers";
import { q } from "./lib/queue";
import { countdown } from "./lib/countdown";
import { items } from "./items";
let store = createStore(main);

// this will be pulled via ajax
q.setItems(items[0].exercises);
q.dispatch = store.dispatch;

store.subscribe(() => {
  const { pause } = store.getState();
  if (pause) {
    countdown.pauseTimer();
  } else {
    countdown.startTimer();
  }
});

q.run(countdown);

render(<Root store={store} />, document.getElementById("root"));
registerServiceWorker();
