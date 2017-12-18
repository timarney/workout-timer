// queue
export const q = {
  items: [],
  maxItems: 1, //how many items to batch at a time
  current: 0,
  finished: () => {},
  setItems: function(arr) {
    this.items = arr;
  },
  doAction: function(cb) {
    let items = this.getItems();

    if (items === false) {
      console.log("done");
      this.finished();
      return;
    }

    cb(items);
  },
  getItems: function() {
    let arr = this.items.slice(this.current, this.maxItems + this.current);
    this.current += this.maxItems;

    if (arr.length >= 1) {
      return arr;
    }

    return false;
  },
  run(obj, countdown) {
    const self = this;

    this.doAction(() => {
      const i = this.items[self.current - 1];

      countdown.timer(
        i.duration,
        (time, totalRemaining) => {
          const nextUp = this.items[self.current];

          const label =
            typeof nextUp !== "undefined" ? nextUp["label"] : "";

          obj.setState({
            label: i.label,
            currentRemaining: time,
            totalTimeRemaining: totalRemaining,
            nextUp: label
          });

          if (time === 0) {
            this.run(obj, countdown);
          }
        },
        self
      );
    });
  }
};
