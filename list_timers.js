#!/usr/bin/env osascript -l JavaScript

function run(argv) {
  ObjC.import('stdlib');
  const timers = JSON.parse($.getenv('timers_list'));

  let isPomodoro = '0';

  try {
    isPomodoro = $.getenv('timer_is_pomodoro');
  } catch {}

  const calculateFireTime = (seconds) => {
    const options = {
      hour: 'numeric',
      minute: 'numeric',
      second: 'numeric',
      hour12: false,
    };

    return new Intl.DateTimeFormat('en-US', options).format(seconds);
  };

  const items = Object.entries(timers).map(([id, props]) => {
    return {
      title: props.message,
      subtitle: `Will fire at ${calculateFireTime(id)}`,
      arg: id,
      variables: {
        'selected_timer_id': id,
        'timer_message': props.message,
        'timer_is_pomodoro': props.isPomodoro,
      },
    };
  });

  items.push({
    title: items.length === 0 ? 'No active timers. Create new one?' : 'Create new',
    arg: 'new',
    icon: {
      path: './add.png',
    },
  });

  return JSON.stringify({
    items,
  });
}