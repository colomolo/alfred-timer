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
      title: message,
      subtitle: `Will fire at ${calculateFireTime(id)}`,
      arg: id,
    };
  });

  items.push({
    title: items.length === 0 ? 'No active timers. Create new one?' : 'Create new',
    arg: 'new',
  });

  return JSON.stringify({
    items,
  });
}