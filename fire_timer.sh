#!/bin/bash

json=$(./read_file.sh)

./check_timer_exists.js "$timer_id" "$json"