#!/usr/bin/env osascript -l JavaScript

function run(argv) {
  const id = argv[0];
  const timers = JSON.parse(argv[1]);

  if (timers[id]) {
    if (timers[id].intervals) {
      const firing = intervals.shift();
      intervals.push(firing);
      const showTime = Date.now() + seconds * 1000;
    } else {
      delete timers[id];
    }
  }

  return JSON.stringify(timers);
}
