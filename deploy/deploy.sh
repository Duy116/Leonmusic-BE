#!/bin/sh

CI_DEPLOY_USER="${CI_DEPLOY_USER:-root}"
CI_DEPLOY_SSH_PORT="${CI_DEPLOY_SSH_PORT:-22}"
CI_DEPLOY_HOST="$CI_DEPLOY_USER@$CI_DEPLOY_SERVER"

# Copy necessary files to /app folder.
echo "[LOG] Copying files to remote server..."
ls -l
scp -o StrictHostKeyChecking=no -r -P $CI_DEPLOY_SSH_PORT \
  ./.env \
  ./docker-compose.api.prod.yml \
  ./apps/api/deploy/prepare_nginx_config.sh \
  ./apps/api/deploy/certbot.sh \
  ./apps/api/deploy/nginx/docker_nginx.conf \
  ./apps/api/deploy/nginx/gzip.conf \
  ./apps/api/deploy/nginx/squarely_backend.conf \
  ./apps/api/deploy/setup_prod_app.sh \
  $CI_DEPLOY_HOST:/app

ssh -o StrictHostKeyChecking=no -p $CI_DEPLOY_SSH_PORT $CI_DEPLOY_HOST << 'ENDSSH'
  set -e

  echo "[LOG] Setting up application on the remote server..."
  cd /app

  echo "[LOG] Listing files in /app directory:"
  ls -l

  # Export environment variables from `/app/.env`
  export $(grep -v '^#' .env | xargs)

  # Login to the container registry.
  echo "$CI_REGISTRY_PASSWORD" | sudo docker login -u $CI_REGISTRY_USER --password-stdin $CI_REGISTRY

  # Make the script executable
  chmod +x ./setup_prod_app.sh

  # Set up application.
  ./setup_prod_app.sh

  # Clean up unused resources.
  echo "[LOG] Cleaning up unused Docker resources..."
  sudo docker system prune --all --force &
ENDSSH
