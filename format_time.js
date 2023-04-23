#!/usr/bin/env osascript -l JavaScript

function run(argv) {
  ObjC.import('stdlib');
  const seconds = $.getenv('timer_seconds');

  const options = {
    hour: 'numeric',
    minute: 'numeric',
    second: 'numeric',
    hour12: false,
  };

  const showTime = Date.now() + seconds * 1000;
  const showAt = new Intl.DateTimeFormat('en-US', options).format(showTime);

  return showAt;
}