# Usage
# CI_DEPLOY_DOMAINS="mellori.education,www.mellori.education" \
# deploy/prepare_nginx_config.sh

set -e

# Split string "a,b"  and convert to "a b"
DOMAINS=$(echo "$CI_DEPLOY_DOMAINS" | tr "," " ")
NGINX_CONF_INPUT_PATH="/app/squarely_backend.conf"

# Replace "[DOMAINS]" with the real value of $DOMAINS
sudo sed -i "s/\[DOMAINS\]/$DOMAINS/" $NGINX_CONF_INPUT_PATH

# Copy config file to the correct place.
sudo cp $NGINX_CONF_INPUT_PATH /etc/nginx/sites-enabled/
sudo cp /app/gzip.conf /etc/nginx/conf.d/gzip.conf
