#!/bin/bash

# Raycast Script Command Template
#
# Duplicate this file and remove ".template." from the filename to get started.
# See full documentation here: https://github.com/raycast/script-commands
#
# Required parameters:
# @raycast.schemaVersion 1
# @raycast.title upload notes
# @raycast.mode fullOutput
#
# Optional parameters:
# @raycast.icon 🤖
# @raycast.packageName Raycast Scripts

repo=https://github.com/AblesonWu/notebook.git
localFolder=/Users/ranwu/code/notebook

echo "Start to upload notes to $repo"
echo "Go to local path in $localFolder"
cd $localFolder || exit

curDate=$(date '+%Y-%m-%d %H:%M:%S')

git add .
git commit -m "[$curDate] there are some changes for notes, save all to git"

echo "Fetch latest notes"
git fetch origin --recurse-submodules=no --progress --prune
git rebase origin/master



git push --progress --porcelain origin refs/heads/master:master

echo "successfully save note to $repo"
