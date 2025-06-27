#!/usr/bin/env osascript -l JavaScript

function run(argv) {
  const id = argv[0];
  const timers = JSON.parse(argv[1]);

  delete timers[id];

  return JSON.stringify(timers);
}