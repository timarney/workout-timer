import { countdown } from "../library/countdown";

// queue
export const queue = {
  items: [],
  maxItems: 1, //how many items to batch at a time
  current: 0,
  countdown,
  currentTitle: "",
  locationId: null,
  unsubscribe: () => {},
  dispatch: () => {},
  init: function(store, options = { startIndex: 0 }) {
    const locationId = store.getState().locationId.id;
    const item = store.getState().items[locationId];
    if (locationId && locationId !== "edit") {
      console.log("locationId", locationId);
      this.currentTitle = item.label;
      this.items = item.exercises;
    }

    this.dispatch = store.dispatch;
    this.current = options.startIndex;
    clearInterval(this.countdown.interval);
    this.unsubscribe();

    this.unsubscribe = store.subscribe(() => {
      const { pause } = store.getState().main;
      const locationId = store.getState().locationId.id;

      if (this.locationId !== locationId) {
        console.log("new location", typeof locationId, this.locationId);
        this.locationId = locationId;
        this.init(store);
      }

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
    const label = this.currentItem().label;
    const nextUp = this.items[this.current];
    this.dispatch({
      type: "INTERVAL",
      payload: {
        title: this.currentTitle,
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
  currentItem() {
    const i =
      this.current >= 1
        ? this.items[this.current - 1]
        : this.items[this.current];

    return i;
  },
  run() {
    this.doAction(() => {
      this.countdown.timer(
        this.currentItem().duration,
        this.updateStatus.bind(this)
      );
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
