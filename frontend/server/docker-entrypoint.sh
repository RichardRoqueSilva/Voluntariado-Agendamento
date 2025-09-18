#!/usr/bin/env sh
set -eu

envsubst '${API_HOST} ${API_PORT}' < /etc/nginx/templates/nginx.conf.template > /etc/nginx/nginx.conf

exec "$@"