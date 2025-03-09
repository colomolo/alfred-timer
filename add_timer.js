#!/usr/bin/env osascript -l JavaScript

function run(argv) {
  const id = argv[0];
  const message = argv[1];
  const isPomodoro = argv[2] || 'false';
  const timers = JSON.parse(argv[3]);

  timers[id] = { message, isPomodoro };

  return JSON.stringify(timers);
}
