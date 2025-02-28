#!/bin/bash

# See https://www.mslinn.com/blog/2020/11/30/propagating-git-template-changes.html

function help {
    if [ "$1" ]; then printf "\nError: $1\n\n"; fi
    echo "Usage:

$0 newRepoUrl"
    exit 1
}

if [ -z "$(which git)" ]; then
    echo "Please install git and rerun this script"
    exit 2
fi

if [ -z "$1" ]; then help "No git project was specified as a the project new origin repository."; fi
# if [ -z "$2" ]; then help "Please provide the name of the new project based on the template"; fi

# Move one folder up
# cd ..
# Rename the project to the new name
# mv -R nodejs-nest "$2"
# Enter the project
# cd "$2"
# Set current origin as upstream (template)
git remote rename origin upstream
# This is to prevent from pushing to the upstream origin (template)
git remote set-url --push upstream no_push
# Set new origin
git add origin "$1"
