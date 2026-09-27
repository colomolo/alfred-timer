#!/bin/bash

if [[ -z "$timer_id" && "$1" =~ ^([0-9]+):([0-9]+([.][0-9]+)?)$ ]]; then
    timer_id="${BASH_REMATCH[1]}"
    timer_seconds="${BASH_REMATCH[2]}"
fi

if [[ ! "$timer_id" =~ ^[0-9]+$ || ! "$timer_seconds" =~ ^[0-9]+([.][0-9]+)?$ ]]; then
    exit 1
fi

bundle_id="${alfred_workflow_bundleid:-timer.workflow}"
script_dir="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"

# Detach the one-shot worker from Alfred. Redirecting every file descriptor is
# important: otherwise Alfred may keep the Script Action open until it fires.
/usr/bin/nohup "$script_dir/timer_worker.sh" "$timer_seconds" "$timer_id" "$bundle_id" \
    </dev/null >/dev/null 2>&1 &

exit 0
