#!/bin/sh

# Script for first time server setup.

set -e

# Create working directory.
sudo mkdir /app && sudo chmod a+rwx /app

# Change hostname to prepare for Dokku setup
sudo hostnamectl set-hostname "${HOSTNAME:-squarely-backend-staging}"
sudo echo "127.0.0.1 ${HOSTNAME:-squarely-backend-staging}" >> /etc/hosts

# Install Dokku
wget https://raw.githubusercontent.com/dokku/dokku/v0.29.0/bootstrap.sh
sudo DOKKU_TAG=v0.29.0 bash bootstrap.sh

# Install Docker compose
sudo curl -L "https://github.com/docker/compose/releases/download/1.29.2/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
sudo chmod +x /usr/local/bin/docker-compose

# Install Certbot
sudo apt-get install snapd -y
sudo snap install core; sudo snap refresh core
sudo snap install --classic certbot

# Remove unnecessary nginx config file
sudo rm -f /etc/nginx/conf.d/server_names_hash_bucket_size.conf

cd ~/.ssh
ssh-keygen -t ed25519 -C "devs@kvytechnology.com" -N '' -f ~/.ssh/id_rsa
echo $(cat ~/.ssh/id_rsa.pub) >> ~/.ssh/authorized_keys

echo "Done!"
