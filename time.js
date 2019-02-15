Time = {
  past: 0,
  now: 0
};

Time.refresh = function () {
  this.past = this.now;
  this.now = Date.now;
};

Time.delta = function () {
  return this.now - this.past;
};
