#!/bin/bash

mkdir -p "${alfred_workflow_cache}"
[ -s "${alfred_workflow_cache}/timers.json" ] && cat "${alfred_workflow_cache}/timers.json" || echo "{}"
 