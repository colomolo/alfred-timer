#!/usr/bin/env osascript -l JavaScript

function run(argv) {
  const input = argv[0];
  const intervals = (input || '').split(',').reduce((acc, interval) => {
    const trimmed = interval.trim();
    if (trimmed.length > 0) {
      acc.push(trimmed);
    }
    return acc;
  }, []);
  let firstTimerSeconds;

  const MAX_DELAY_IN_SECONDS = 60 * 60 * 2; // two hours
  const ACCEPTED_UNITS_SECONDS = ['s', 'sec', 'secs', 'second', 'seconds'];
  const ACCEPTED_UNITS_MINUTES = ['', 'm', 'min', 'mins', 'minute', 'minutes'];
  const ACCEPTED_UNITS_HOURS = ['h', 'hr', 'hrs', 'hour', 'hours'];

  const inputToTimeMap = (input) => {
    const times = [...(input || '').matchAll(/(\d*\.?\d+)\s*(\w*)/gi)];

    return times.reduce((res, [_, digits, units]) => {
      const number = Number(digits);
      if (ACCEPTED_UNITS_SECONDS.includes(units)) {
        res.seconds = number > 0 && number;
      }
      if (ACCEPTED_UNITS_MINUTES.includes(units)) {
        res.minutes = number > 0 && number;
      }
      if (ACCEPTED_UNITS_HOURS.includes(units)) {
        res.hours = number > 0 && number;
      }

      return res;
    }, {});
  };

  const isValidTimeMap = (timeMap) => !!timeMap.seconds || !!timeMap.minutes || !!timeMap.hours;

  const timeMapToReadableTime = (timeMap) => {
    const readableTime = [];
    const pr = new Intl.PluralRules('en-US');

    const endings = new Map([
      ['one', ''],
      ['two', 's'],
      ['few', 's'],
      ['other', 's'],
    ]);
    const pluralizeUnits = (n, unit) => {
      const rule = pr.select(n);
      const ending = endings.get(rule);
      return `${unit}${ending}`;
    };

    if (timeMap.hours) {
      readableTime.push(`${timeMap.hours} ${pluralizeUnits(timeMap.hours, 'hour')}`);
    }
    if (timeMap.minutes) {
      readableTime.push(`${timeMap.minutes} ${pluralizeUnits(timeMap.minutes, 'minute')}`);
    }
    if (timeMap.seconds) {
      readableTime.push(`${timeMap.seconds} ${pluralizeUnits(timeMap.seconds, 'second')}`);
    }

    return new Intl.ListFormat('en', { style: 'long', type: 'conjunction' }).format(readableTime);
  };

  const timeMapToSeconds = (timeMap) => {
    return Object.entries(timeMap).reduce((seconds, [unit, amount]) => {
      switch (unit) {
        case 'hours':
          seconds += amount * 60 * 60;
          break;
        case 'minutes':
          seconds += amount * 60;
          break;
        case 'seconds':
          seconds += amount;
          break;
        default:
          break;
      }

      return seconds;
    }, 0);
  };

  const calculateFireTime = (seconds) => {
    const options = {
      hour: 'numeric',
      minute: 'numeric',
      second: 'numeric',
      hour12: false,
    };

    const showTime = Date.now() + seconds * 1000;

    return new Intl.DateTimeFormat('en-US', options).format(showTime);
  };

  const createArgumentItem = () => {
    let title = '';
    let subtitle = '';
    const intervalsData = [];

    const noop = () => {
      return {
        title,
        subtitle,
        arg: null,
        variables: {
          timer_seconds: null,
        },
      };
    };

    if (!argv[0]) {
      title = 'Set interval timers...';
      subtitle = 'Provide comma-separated durations: 25m, 5 m, …';
    } else {
      const readableTimes = [];
      let firstTimerFireTime;

      for (let i = 0; i < intervals.length; i++) {
        const timeMap = inputToTimeMap(intervals[i]);

        if (!isValidTimeMap(timeMap)) {
          title = "Can't understand that!";

          return noop();
        }

        const seconds = timeMapToSeconds(timeMap);

        if (seconds > MAX_DELAY_IN_SECONDS) {
          const readableMaxDelay = timeMapToReadableTime(
            inputToTimeMap(`${MAX_DELAY_IN_SECONDS}s`)
          );
          title = `Too long delay! Max is ${readableMaxDelay}`;

          return noop();
        }

        if (i === 0) {
          firstTimerSeconds = seconds;
          firstTimerFireTime = calculateFireTime(seconds);
        }

        const readableTime = timeMapToReadableTime(timeMap);

        intervalsData.push({
          delaySeconds: seconds,
          isPomodoro: 'false',
          message: `${readableTime} passed!`,
        });

        readableTimes.push(readableTime);
      }

      title = `Repeat timers in intervals: ${readableTimes.join(', ')}`;
      subtitle = `First timer will fire at ${firstTimerFireTime}`;
    }

    return {
      uid: 'intervals',
      title,
      subtitle,
      arg: JSON.stringify(intervalsData),
      variables: {
        timer_seconds: firstTimerSeconds,
      },
    };
  };

  const items = [createArgumentItem()];

  return JSON.stringify({
    rerun: 1,
    items,
  });
}
