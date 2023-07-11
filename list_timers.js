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

  const items = Object.entries(timers).map(([id, props]) => {
    return {
      title: calculateFireTime(id),
      subtitle: props.message,
      arg: id,
      icon: {
        path: !!props.isPomodoro ? './list_pomodoro.png' : './list_timer.png',
      },
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