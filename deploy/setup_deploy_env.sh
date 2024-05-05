#!/bin/sh

set -e

echo "# Starting additional CI variables" >> .env

echo CI_REGISTRY_USER=$CI_REGISTRY_USER >> .env
echo CI_REGISTRY_PASSWORD=$CI_REGISTRY_PASSWORD >> .env
echo CI_REGISTRY=$CI_REGISTRY >> .env
echo CI_DEPLOY_IMAGE=$CI_DEPLOY_IMAGE >> .env
echo CI_DEPLOY_CERTBOT_ACCOUNT_EMAIL=$CI_DEPLOY_CERTBOT_ACCOUNT_EMAIL >> .env
echo CI_DEPLOY_DOMAINS=$CI_DEPLOY_DOMAINS >> .env
echo CI_DEPLOY_NUM_APP_INSTANCES=$CI_DEPLOY_NUM_APP_INSTANCES >> .env
echo $CI_DEPLOY_STAGING_ENV_VARS | base64 -d >> .env


mkdir -p ~/.ssh
cp $CI_DEPLOY_PRIVATE_KEY ~/.ssh/id_rsa
chmod 600 ~/.ssh/id_rsa
eval "$(ssh-agent -s)"
ssh-add ~/.ssh/id_rsa
ssh-keyscan -H 'gitlab.com' >> ~/.ssh/known_hosts
