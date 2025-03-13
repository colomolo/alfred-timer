#!/bin/bash

json=$(./read_file.sh)

# We need to check if timer exists to prevent deleted timers from firing
if [[ "$(./check_timer_exists.js "$timer_id" "$json")" == "false" ]]; then
    echo 'false'
    exit 0
fi

variables=$(./get_timer_vars.js "$timer_id" "$json")

./update_timers.js "$timer_id" "$variables" "$json" > "${alfred_workflow_cache}/timers.json"

printf "%s" "$variables"
