#!/bin/bash

# Raycast Script Command Template
#
# Duplicate this file and remove ".template." from the filename to get started.
# See full documentation here: https://github.com/raycast/script-commands
#
# Required parameters:
# @raycast.schemaVersion 1
# @raycast.title fetch notes
# @raycast.mode fullOutput
#
# Optional parameters:
# @raycast.icon 🤖
# @raycast.packageName Raycast Scripts

repo=https://github.com/AblesonWu/notebook.git
localFolder=/Users/ranwu/code/notebook

echo "Start to fetch latest notes from $repo"
echo "Go to local path in $localFolder"
cd $localFolder || exit

if [[ -n $(git status -s) ]]; then
  echo "Please push notes before fetch latest data"
  exit
fi

git -c credential.helper= -c core.quotepath=false -c log.showSignature=false fetch origin --recurse-submodules=no --progress --prune
git -c credential.helper= -c core.quotepath=false -c log.showSignature=false rebase origin/master
