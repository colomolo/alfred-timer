#!/usr/bin/env osascript -l JavaScript

function run(argv) {
  ObjC.import('stdlib');
  const time = $.getenv('timer_time');

  let seconds = 60;

  const match = time.match(/(\d*\.?\d+)([a-zA-Z]*)/i);

  if (match) {
    const digits = Number(match[1]);
    const units = match[2];

    if (['', 's', 'sec', 'secs', 'second', 'seconds'].includes(units)) {
      seconds = digits;
    }
    if (['m', 'min', 'mins', 'minute', 'minutes'].includes(units)) {
      seconds = digits * 60;
    }
    if (['h', 'hr', 'hrs', 'hour', 'hours'].includes(units)) {
      seconds = digits * 60 * 60;
    }
  }

  return seconds;
}