#!/usr/bin/env osascript -l JavaScript

function run(argv) {
  ObjC.import('stdlib');
  const timers = JSON.parse($.getenv('timers_list'));
  const id = $.getenv('selected_timer_id');

  delete timers[id];

  return JSON.stringify(timers);
}