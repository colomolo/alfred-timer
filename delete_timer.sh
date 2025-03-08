#!/bin/bash

json=$(./read_file.sh)

./delete_id.js "$selected_timer_id" "$json" > "${alfred_workflow_cache}/timers.json"