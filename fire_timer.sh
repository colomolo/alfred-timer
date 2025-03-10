#!/bin/bash

json=$(./read_file.sh)

./fire_timer.js "$timer_id" "$json" > "${alfred_workflow_cache}/timers.json"