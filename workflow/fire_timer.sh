#!/bin/bash

timer_id="${timer_id:-${1:-}}"

if [[ ! "$timer_id" =~ ^[0-9]+$ ]]; then
    printf '%s' 'false'
    exit 0
fi

lock_dir="${alfred_workflow_cache}/.timer-${timer_id}.lock"

# A cancelled timer or two workers reaching the same timer must not produce a
# duplicate notification.
if ! /bin/mkdir "$lock_dir" 2>/dev/null; then
    printf '%s' 'false'
    exit 0
fi
trap '/bin/rmdir "$lock_dir" 2>/dev/null || true' EXIT

json=$(./read_file.sh)

# We need to check if timer exists to prevent deleted timers from firing
if [[ "$(./check_timer_exists.js "$timer_id" "$json")" == "false" ]]; then
    printf '%s' 'false'
    exit 0
fi

variables=$(./get_timer_vars.js "$timer_id" "$json") || exit 1
tmp_file=$(/usr/bin/mktemp "${alfred_workflow_cache}/timers.json.XXXXXX") || exit 1

if ./update_timers.js "$timer_id" "$variables" "$json" > "$tmp_file"; then
    /bin/mv -f "$tmp_file" "${alfred_workflow_cache}/timers.json"
else
    /bin/rm -f "$tmp_file"
    exit 1
fi

printf '%s' "$variables"
