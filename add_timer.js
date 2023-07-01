#!/usr/bin/env osascript -l JavaScript

function run(argv) {
  ObjC.import('stdlib');
  const timers = JSON.parse($.getenv('timers_list'));
  const id = String($.getenv('timer_id'));
  const message = $.getenv('timer_message');

  timers[id] = message;

  return JSON.stringify(timers, null, 2);
}