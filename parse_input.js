#!/usr/bin/env osascript -l JavaScript

function run(argv) {
  ObjC.import('stdlib');
  const defaultDuration = $.getenv('default_duration');
  const presetDuration1 = $.getenv('preset_duration_1');
  const presetDuration2 = $.getenv('preset_duration_2');

  const MAX_DELAY_IN_SECONDS = 60 * 60 * 2; // two hours
  const ACCEPTED_UNITS_SECONDS = ['', 's', 'sec', 'secs', 'second', 'seconds'];
  const ACCEPTED_UNITS_MINUTES = ['m', 'min', 'mins', 'minute', 'minutes'];
  const ACCEPTED_UNITS_HOURS = ['h', 'hr', 'hrs', 'hour', 'hours'];

  const inputToTimeMap = (input) => {
    const times = [...(input || '').trim().matchAll(/(\d*\.?\d+)\s*(\w*)/ig)];
  
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

  const calculateShowAtTime = (seconds) => {
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
    const timeMap = inputToTimeMap(argv[0] || defaultDuration);
    const seconds = timeMapToSeconds(timeMap);
    const readableTime = timeMapToReadableTime(timeMap);
    const showAtTime = calculateShowAtTime(seconds);
    let title = '';
    let subtitle = '';

    if (!argv[0]) {
      title = 'Set timer...';
      subtitle = `Hit ↵ to set to ${readableTime} or provide duration`;
    } else if (isValidTimeMap(timeMap)) {
      if (seconds <= MAX_DELAY_IN_SECONDS) {
        title = `Set timer for ${readableTime}`;
        subtitle = `Will fire at ${showAtTime}`;
      } else {
        title = 'Too long delay!';
      }
    } else {
      title = 'Can\'t understand that!';
    }
    
    return {
      uid: 'timer',
      title,
      subtitle,
      arg: seconds,
      variables: {
        timer_show_at: showAtTime,
      },
    };
  }

  const createPresetItem = (input, uid) => {
    const timeMap = inputToTimeMap(input || defaultDuration);
    const seconds = timeMapToSeconds(timeMap);
    const readableTime = timeMapToReadableTime(timeMap);
    const showAtTime = calculateShowAtTime(seconds);

    return {
      uid,
      title: `Set timer for ${readableTime}`,
      arg: seconds,
      variables: {
        timer_show_at: showAtTime,
      },
    };
  }

  const items = [
    createArgumentItem(),
  ];

  if (!argv[0]) {
    items.push(createPresetItem(presetDuration1, 'timer-preset-1'));
    items.push(createPresetItem(presetDuration2, 'timer-preset-2'));
  }
  
  return JSON.stringify({
    rerun: 1,
    items,
  });
}