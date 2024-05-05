#!/bin/sh

# Script to run Certbot (Let's Encrypt) in a non-interactive way.
# Typically, we just need to run this one time.
# But it's harmless to run it on every deploys, the bot will detect the SSL certs
# and do the right things.
# See: https://certbot.eff.org/docs/using.html
#
# $CI_DEPLOY_CERTBOT_ACCOUNT_EMAIL: email of a person in our team
# $CI_DEPLOY_BACKEND_STAGING_DOMAINS: the single domain or a comma separated list
# of domains to be applied the SSL certs.

echo $CI_DEPLOY_CERTBOT_ACCOUNT_EMAIL
echo $CI_DEPLOY_DOMAINS

sudo certbot --nginx --non-interactive --agree-tos \
  --email $CI_DEPLOY_CERTBOT_ACCOUNT_EMAIL \
  -d $CI_DEPLOY_DOMAINS --expand
