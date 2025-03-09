#!/bin/bash

json=$(./read_file.sh)

./add_timer.js "$timer_id" "$timer_message" "$timer_is_pomodoro" "$json" > "${alfred_workflow_cache}/timers.json"