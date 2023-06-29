#!/usr/bin/env osascript -l JavaScript

function run(argv) {
  ObjC.import('stdlib');
  const operation = $.getenv('timers_operation');
  const timers = JSON.parse($.getenv('timers_list'));
  const id = String($.getenv('timer_id'));
  const message = $.getenv('timer_message');

  switch(operation) {
    case 'add':
      timers[id] = message;
      break;
    case 'delete':
      delete timers[id];
      break;
    default:
  }

  return JSON.stringify(timers, null, 2);
}