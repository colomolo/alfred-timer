#!/bin/bash

[ -s "${alfred_workflow_cache}/timers.json" ] && cat "${alfred_workflow_cache}/timers.json" || echo "{}"
 