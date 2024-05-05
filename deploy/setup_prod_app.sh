#!/bin/sh

# Main script to setup and start the application.
# This script is run on the remote server.

set -e

cd /app

export $(grep -v '^#' .env | xargs)

# Start application container(s).
sudo docker pull $CI_DEPLOY_IMAGE
sudo docker-compose -f docker-compose.api.prod.yml up -d --force-recreate --scale app="${CI_DEPLOY_NUM_APP_INSTANCES:-2}"

# Make the script executable
chmod +x ./prepare_nginx_config.sh
chmod +x ./certbot.sh

# Prepare nginx config.
./prepare_nginx_config.sh

# Set up SSL certs with Certbot.
./certbot.sh

# Finally, reload Nginx.
sudo systemctl reload nginx
