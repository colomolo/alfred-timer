#!/usr/bin/env osascript -l JavaScript

function run(argv) {
  ObjC.import('stdlib');
  const seconds = $.getenv('timer_seconds');

  const showTime = Date.now() + seconds * 1000;

  return JSON.stringify({ alfredworkflow: { arg: '', variables: { timer_id: String(showTime) } } });
}
