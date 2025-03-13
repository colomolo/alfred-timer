#!/usr/bin/env osascript -l JavaScript

function run(argv) {
  const id = argv[0];
  const vars = JSON.parse(argv[1]);
  const timers = JSON.parse(argv[2]);
  const isInterval = !!timers[id].intervals?.length > 0;

  if (isInterval) {
    const intervals = timers[id].intervals;

    // Move first/current interval to the end of the queue
    intervals.push(intervals.shift());

    const nextTimerDelaySeconds = intervals[0].delaySeconds;
    const varsId = vars.alfredworkflow?.variables?.timer_id;
    const newId = varsId ? varsId : Date.now() + nextTimerDelaySeconds * 1000;

    timers[newId] = { intervals };
  }

  delete timers[id];

  return JSON.stringify(timers);
}
