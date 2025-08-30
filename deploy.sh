#!/bin/bash

GIT_BRANCH="master"
COMMIT_MESSAGE="Updates - $(date +"%Y-%m-%d %T")"


## for GH pages sites
## just pushes to origin




## Add new files to repo
git add --all


## Prompt for commit message (and provide a default)
echo "Enter Git commit message (default: $COMMIT_MESSAGE)"
read NEW_MESSAGE
[ -n "$NEW_MESSAGE" ] && COMMIT_MESSAGE=$NEW_MESSAGE
git commit -am "$COMMIT_MESSAGE"


## Push to origin branch
git push origin $GIT_BRANCH