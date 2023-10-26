#!/bin/bash

# Initialize default values
APP_URL="http://localhost"
APP_URL=$(echo $APP_URL | sed 's~https\?://~~')
APP_PORT="3000"
MAXMIND_LICENSE_KEY=""

# Parse named parameters
while [ "$#" -gt 0 ]; do
  case "$1" in
    --url)
      APP_URL="$2"
      shift 2
      ;;
    --maxmind-license)
      MAXMIND_LICENSE_KEY="$2"
      shift 2
      ;;
    *)
      echo "Unknown parameter: $1"
      exit 1
      ;;
  esac
done

# Generate random passwords
DB_PASSWORD=$(head /dev/urandom | LC_ALL=C tr -dc A-Za-z0-9 | head -c34)
SESSION_SECRET=$(head /dev/urandom | LC_ALL=C tr -dc A-Za-z0-9 | head -c34)
REDIS_PASSWORD=$(head /dev/urandom | LC_ALL=C tr -dc A-Za-z0-9 | head -c34)

# Read .env.example into a variable
envExample=$(cat ./.env.example)

# Replace the values
# Read .env.example and replace values line by line
awk -v app_url="https://$APP_URL" \
    -v app_port="$APP_PORT" \
    -v maxmind="$MAXMIND_LICENSE_KEY" \
    -v db_pass="$DB_PASSWORD" \
    -v db_host="db"\
    -v session_secret="$SESSION_SECRET" \
    -v redis_url="redis://redis:6379"\
    -v redis_pass="$REDIS_PASSWORD" \
    -v node_env="production"\
    'BEGIN {OFS=FS="="}
    /NODE_ENV/ {$2="\"" node_env "\""}
    /APP_URL/ {$2="\"" app_url "\""}
    /APP_PORT/ {$2="\"" app_port "\""}
    /MAXMIND_LICENSE_KEY/ {$2="\"" maxmind "\""}
    /DB_READ_HOST/ {$2="\"" db_host "\""}
    /DB_READ_PASSWORD/ {$2="\"" db_pass "\""}
    /DB_WRITE_HOST/ {$2="\"" db_host "\""}
    /DB_WRITE_PASSWORD/ {$2="\"" db_pass "\""}
    /SESSION_SECRET/ {$2="\"" session_secret "\""}
    /REDIS_QUEUE_URL/ {$2="\"" redis_url "\""}
    /REDIS_QUEUE_PASSWORD/ {$2="\"" redis_pass "\""}
    /REDIS_CACHE_URL/ {$2="\"" redis_url "\""}
    /REDIS_CACHE_PASSWORD/ {$2="\"" redis_pass "\""}
    /REDIS_UNIQUE_URL/ {$2="\"" redis_url "\""}
    /REDIS_UNIQUE_PASSWORD/ {$2="\"" redis_pass "\""}
    { if ($1 != "") print $1 "=" $2; else print "" }' ./.env.example > ./.env

# Caddyfile
# awk -v app_url="$APP_URL" '{gsub(/metronome.sh/, app_url); print}' ./deploy/setup-docker/Caddyfile > ./Caddyfile
# Create the Caddyfile content
# Caddyfile template
read -r -d '' CADDY_TEMPLATE << EOF
http://$APP_URL {
  redir https://{host}{uri}
}

https://$APP_URL {
  reverse_proxy web:$APP_PORT
}
EOF

# Output to Caddyfile
echo "$CADDY_TEMPLATE" > ./Caddyfile

#Copy docker-compose.yml and Dockerfile
cp ./deploy/setup-docker/docker-compose.yml ./docker-compose.yml
cp ./deploy/setup-docker/Dockerfile ./Dockerfile
cp ./deploy/setup-docker/Dockerfile.workers ./Dockerfile.workers


# Display result message
echo "✅ .env file created with secrets"
echo "🐳 docker-compose.yml created"
echo "🐳 Dockerfile created"
echo "🔒 Caddyfile created"
echo "You may now run docker-compose up to start Metronome"
