![Timer workflow](./workflow/icon.png)
# Timer
Simple [Alfred](https://www.alfredapp.com/) workflow for setting up short timers with a few keystrokes.

## Usage
Use keyword `timer` (or custom keyword) to init Timer. Hit ↵ to set up Timer to default duration (configurable) or pass duration as an argument. Specify timer message. Timer is set!

With `intervals` keyword you can set up a sequence of repeating timers. For example, you can utilize this for pomodoro technique. Set intervals with `intervals 25m, 5m` and the first timer will fire after 25 minutes (pomodoro), then another after 5 minutes (break), and then the whole process will repeat itself until you cancel the timer. 

Use keyword `pomodoro` (or custom keyword) to start just one pomodoro timer which has customizable duration from 15 to 30 minutes.

Use `timers` (or custom keyword) to see the list of active timers with option to edit or cancel individual timers.

You also can set up two presets for your custom time durations.

### Duration input examples
- 10 mins 10
- 1 hour 20 minutes
- 35s
- 50 seconds
- 1h 30.5m
- .5m

### Duration input formats
Hours – h, hr, hrs, hour, hours.  
Minutes – m, min, mins, minute, minutes.  
Seconds – s, sec, secs, second, seconds.

If no time unit is provided, it is counted as minutes.

![](./timer-example.gif)

## Check out other workflows
### [String Multitool](https://github.com/colomolo/alfred-string-multitool)
Tools for string manipulation and transformation.

### [Bookmark Vault](https://github.com/colomolo/alfred-bookmarks)
Helps you organize your bookmarks and one-line notes as lists in Markdown format.

## Support development
<a href='https://ko-fi.com/I2I0W98PT' target='_blank'><img height='36' style='border:0px;height:36px;' src='https://storage.ko-fi.com/cdn/kofi3.png?v=3' border='0' alt='Buy Me a Coffee at ko-fi.com' /></a>
