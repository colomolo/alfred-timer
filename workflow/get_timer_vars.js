#!/usr/bin/env osascript -l JavaScript

function run(argv) {
  const id = argv[0];
  const timers = JSON.parse(argv[1]);
  const isInterval = !!timers[id].intervals?.length > 0;
  const timer = isInterval ? timers[id].intervals[0] : timers[id];

  const variables = {
    timer_message: timer.message,
    timer_is_pomodoro: timer.isPomodoro,
  };

  if (isInterval) {
    const intervals = timers[id].intervals;

    // Move first/current interval to the end of the queue
    intervals.push(intervals.shift());

    const nextTimerDelaySeconds = intervals[0].delaySeconds;
    const showTime = Date.now() + nextTimerDelaySeconds * 1000;

    timers[showTime] = { intervals };

    variables.timer_id = showTime;
    variables.timer_seconds = nextTimerDelaySeconds;
  }

  return JSON.stringify({
    alfredworkflow: {
      arg: isInterval ? 'interval' : 'timer',
      variables,
    },
  });
}
