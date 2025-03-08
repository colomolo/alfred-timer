#!/usr/bin/env osascript -l JavaScript

function run(argv) {
  ObjC.import('stdlib');
  const timers = JSON.parse($.getenv('timers_list'));

  const calculateTimeLeft = (ms) => {
    const now = new Date().getTime();
    const fireInSeconds = Math.round((ms - now) / 1000);

    const hours = Math.trunc(fireInSeconds / 3600);
    const minutes = Math.trunc((fireInSeconds % 3600) / 60);
    const seconds = fireInSeconds % 60;

    return [hours, minutes, seconds];
  };

  const formatFireTime = (ms) => {
    const options = {
      hour: 'numeric',
      minute: 'numeric',
      second: 'numeric',
      hour12: false,
    };

    const [hours, minutes, seconds] = calculateTimeLeft(ms);
    let timeLeft = '';

    if (hours > 0) {
      timeLeft += `${hours}h `;
    }
    if (minutes > 0) {
      timeLeft += `${minutes}m `;
    }
    timeLeft += `${seconds}s`;

    return `Will fire at ${new Intl.DateTimeFormat('en-US', options).format(ms)} (${timeLeft} left)`;
  };

  const items = Object.keys(timers)
    .sort((timerA, timerB) => Number(timerA) - Number(timerB))
    .map((id) => {
      const message = timers[id].message;
      const isPomodoro = timers[id].isPomodoro === 'true';

      return {
        uid: id,
        title: formatFireTime(id),
        subtitle: message,
        arg: id,
        icon: {
          path: isPomodoro ? './list_pomodoro.png' : './list_timer.png',
        },
        variables: {
          selected_timer_id: id,
          timer_message: message,
          timer_is_pomodoro: isPomodoro ? 'true' : 'false',
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
    rerun: 1,
    items,
  });
}
