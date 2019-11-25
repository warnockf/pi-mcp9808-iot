#!/bin/bash
. /home/pi/.nvm/nvm.sh
. /home/pi/.profile
. /home/pi/.bashrc
cd /home/pi/Documents/pi-mcp9808-iot 
nvm use
npm run start
