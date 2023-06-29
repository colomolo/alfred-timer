#!/usr/bin/env osascript -l JavaScript

function run(argv) {
  ObjC.import('stdlib');
  const timers = JSON.parse($.getenv('timers_list'));

  const calculateFireTime = (seconds) => {
    const options = {
      hour: 'numeric',
      minute: 'numeric',
      second: 'numeric',
      hour12: false,
    };

    return new Intl.DateTimeFormat('en-US', options).format(seconds);
  };

  const items = Object.entries(timers).map(([id, message]) => {
    return {
      uid: id,
      title: message,
      subtitle: `Will fire at ${calculateFireTime(id)}`,
    };
  });

  return JSON.stringify({
    items,
  });
}