#!/usr/bin/env osascript -l JavaScript

function run(argv) {
  const seconds = argv[0];

  const showTime = Date.now() + seconds * 1000;

  return String(showTime);
}
