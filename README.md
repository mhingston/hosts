# hosts

A simple script to update your hosts file.

## Installation

Clone this repo and run `npm install` or just `npm install -g mhingston/hosts`.

## Usage

Modify `sources.txt` with the host file sources you want to use. These are processed in the same order they are listed so any duplicate entries will be overwritten. You can optionally specify a custom hosts file to append at the end of the file (see `hosts.custom`).

    node app.js /etc/hosts

or (if installed globally):

    update-hosts /etc/hosts