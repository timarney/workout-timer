export const countdown = {
  pause: false,
  interval: null,
  pauseTimer: function() {
    this.pause = true;
  },
  startTimer: function() {
    this.pause = false;
  },
  timer: function(time, cb) {
    const calc = time => {
      if (time <= 0) {
        console.log("clear interval");
        clearInterval(this.interval);
      }

      cb(time);
    };

    // update roughly once per second -> event loop ;)
    this.interval = setInterval(() => {
      if (!this.pause) time -= 1;
      calc(time);
    }, 1000);

    cb(time);

    return this;
  }
};
