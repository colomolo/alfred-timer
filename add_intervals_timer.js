#!/usr/bin/env osascript -l JavaScript

function run(argv) {
  const id = argv[0];
  const intervals = JSON.parse(argv[1]);
  const timers = JSON.parse(argv[2]);

  timers[id] = { intervals };

  return JSON.stringify(timers);
}
