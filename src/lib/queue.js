import { countdown } from "../lib/countdown";

// queue
export const queue = {
  items: [],
  maxItems: 1, //how many items to batch at a time
  current: 0,
  countdown,
  dispatch: () => {},
  init: function(arr, store, options = { startIndex: 0 }) {
    this.items = arr;

    this.dispatch = store.dispatch;
    this.current = options.startIndex;
    clearInterval(this.countdown.interval);

    store.subscribe(() => {
      const { pause } = store.getState().main;

      if (pause) {
        this.countdown.pauseTimer();
      } else {
        this.countdown.startTimer();
      }
    });

    this.run();
  },
  doAction: function(cb) {
    let items = this.getItems();

    if (items === false) {
      console.log("no items remain");
      this.finished();
      return;
    }

    cb(items);
  },
  getItems: function() {
    const arr = this.items.slice(this.current, this.maxItems + this.current);
    this.current += this.maxItems;

    if (arr.length >= 1) return arr;

    return false;
  },
  updateStatus(time) {
    const i = this.items[this.current - 1];
    const label = i.label;
    const nextUp = this.items[this.current];
    this.dispatch({
      type: "INTERVAL",
      payload: {
        label,
        currentRemaining: time,
        totalTimeRemaining: this.totalTimeRemaining(time),
        nextUp: typeof nextUp !== "undefined" ? nextUp["label"] : ""
      }
    });

    if (time === 0) {
      //goto next item in the queue
      this.run();
    }
  },
  run() {
    const i =
      this.current >= 1
        ? this.items[this.current - 1]
        : this.items[this.current];

    this.doAction(() => {
      this.countdown.timer(i.duration, this.updateStatus.bind(this));
    });
  },
  finished() {
    this.dispatch({
      type: "INTERVAL",
      payload: {
        label: "Done",
        currentRemaining: "",
        totalTimeRemaining: ""
      }
    });
  },
  totalTimeRemaining: function(time) {
    let total = 0;
    this.items.forEach((item, index) => {
      if (index === this.current - 1) {
        total += Number(time);
      } else if (index >= this.current) {
        total += Number(item.duration);
      }
    });

    return total;
  },
  totalTime: function() {
    let time = 0;
    this.items.forEach(item => {
      time += item.duration;
    });
    return time;
  }
};
