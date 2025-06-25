#!/bin/bash

# -----------------------
# new version number
# -----------------------

# Prompt for version number, if not entered
nextVersion="$*"
currentVersion=$(plutil -extract 'version' raw -o - workflow/info.plist)
echo "current version: $currentVersion"
echo -n "   next version: "
if [[ -z "$nextVersion" ]]; then
	read -r nextVersion
else
	echo "$nextVersion"
fi

# insert new version number
plutil -replace version -string "$nextVersion" workflow/info.plist

# -----------------------
# clean info.plist
# -----------------------

# bkp info.plist
cp -v workflow/info.plist workflow/info-original.plist

# remove variables flagged as "no export" from info.plist
if plutil -extract 'variablesdontexport' json -o - workflow/info.plist &>/dev/null; then
	excludedVars=$(plutil -extract variablesdontexport json -o - workflow/info.plist | tr -d "[]\"" | tr "," "\n")
	echo "$excludedVars" | tr "\n" "\0" | xargs -0 -I {} plutil -replace variables.{} -string "" workflow/info.plist

	exclusionNo=$(echo "$excludedVars" | wc -l | tr -d " ")
	echo "Removed $exclusionNo variables flagged as 'no export' removed from 'info.plist'."
fi

# -----------------------
# compile .alfredworkflow
# -----------------------

# remove workflow file from previous release
rm -fv ./*.alfredworkflow

# zip
workflowName=$(plutil -extract 'name' raw -o - workflow/info.plist | tr " " "-")
# ".*" excludes the dotfiles (glob pattern, not regex)
cd workflow && zip --quiet -r "../$workflowName.alfredworkflow" . -x ".*" "doc*/*" "prefs.plist" "info-original.plist" && cd ..
echo "new $workflowName.alfredworkflow file created."

# restore original
rm -fv workflow/info.plist
mv -fv workflow/info-original.plist workflow/info.plist
echo
