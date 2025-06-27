#!/usr/bin/env osascript -l JavaScript

function run(argv) {
  const timers = JSON.parse(argv[0]);

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

    return `Will fire at ${new Intl.DateTimeFormat('en-US', options).format(
      ms
    )} (${timeLeft} left)`;
  };

  const items = Object.keys(timers)
    .sort((timerA, timerB) => Number(timerA) - Number(timerB))
    .map((id) => {
      const isInterval = !!timers[id].intervals?.length > 0;
      const timer = isInterval ? timers[id].intervals[0] : timers[id];
      const message = timer.message;
      const isPomodoro = timer.isPomodoro === 'true';

      return {
        uid: String(id),
        title: formatFireTime(id),
        subtitle: message,
        arg: id,
        icon: {
          path: isInterval
            ? './list_intervals_timer.png'
            : isPomodoro
            ? './list_pomodoro.png'
            : './list_timer.png',
        },
        variables: {
          selected_timer_id: id,
          timer_message: message,
          timer_is_pomodoro: isPomodoro ? 'true' : 'false',
        },
      };
    });

  items.push({
    uid: 'new',
    title: items.length === 0 ? 'No active timers. Create new one?' : 'Create new',
    arg: 'new',
    icon: {
      path: './add.png',
    },
  });

  return JSON.stringify({
    skipknowledge: true,
    rerun: 1,
    items,
  });
}
