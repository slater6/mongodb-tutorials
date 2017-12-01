#!/usr/bin/env bash

echo ">>> Setup Mongo directory"
sudo mkdir /data
sudo mkdir /data/db

echo ">>> Setup Mongo directory Permissions"
sudo chown -Rv vagrant /data/db