#!/bin/sh

# Replace environment variables in environment.prod.ts
echo "Replacing environment variables in environment.prod.ts..."

# Use envsubst to replace variables and store the result back in the correct file
envsubst < /usr/share/nginx/html/assets/environment.prod.ts > /usr/share/nginx/html/assets/environment.prod.ts.tmp \
    && mv /usr/share/nginx/html/assets/environment.prod.ts.tmp /usr/share/nginx/html/assets/environment.prod.ts

# Start nginx
exec "$@"
