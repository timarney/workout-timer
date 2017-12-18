export const countdown = {
  pause: false,
  interval: null,
  pauseTimer: function() {
    this.pause = true;
  },
  startTimer: function() {
    this.pause = false;
  },
  totalTime: function(items) {
    let time = 0;
    items.forEach(item => {
      time += item.duration;
    });
    return time;
  },
  totalTimeRemaining: function(q, currentTime) {
    let total = 0;

    q.items.forEach((item, index) => {
      if (index === q.current - 1) {
        total += currentTime;
      } else if (index >= q.current) {
        total += item.duration;
      }
    });

    return total;
  },

  timer: function(time, cb, q) {
    const calc = time => {
      if (time <= 0) {
        clearInterval(this.interval);
      }

      cb(time, this.totalTimeRemaining(q, time));
    };

    this.interval = setInterval(() => {
      if (!this.pause) time -= 1;
      calc(time);
    }, 1000);

    cb(time, this.totalTimeRemaining(q, time));

    return this;
  }
};
