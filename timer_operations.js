#!/usr/bin/env osascript -l JavaScript

function run(argv) {
  const items = [
  // {
  //   title: 'Set new time',
  //   arg: 'new_time',
  // },
  // {
  //   title: 'Edit message',
  //   arg: 'edit_message',
  // },
  {
    title: 'Cancel timer',
    arg: 'cancel',
  }];

  return JSON.stringify({
	skipknowledge: true,
    items,
  });
}