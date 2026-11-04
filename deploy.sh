#!/bin/bash

# Strapi Deployment Script to Racknerd Server
# Usage: ./deploy.sh <server_ip> <ssh_user> <remote_path> [production|development]
# Example: ./deploy.sh 192.168.1.100 root /var/www/strapi production
#
# production  (default): builds locally, uploads dist/.strapi, runs `strapi start` under PM2 as "strapi"
# development: skips the build, uploads source, runs `strapi develop` (auto-reload) under PM2 as "strapi-dev"
#
# Development port defaults to 1338 (override with DEV_PORT=xxxx ./deploy.sh ...)
# Env file: uses .env.<mode> (e.g. .env.production / .env.development) if present, otherwise .env

set -e  # Exit on any error

# Color codes for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Check arguments
if [ $# -lt 3 ]; then
    echo -e "${RED}Usage: ./deploy.sh <server_ip> <ssh_user> <remote_path> [production|development]${NC}"
    echo "Example: ./deploy.sh 192.168.1.100 root /var/www/strapi production"
    exit 1
fi

SERVER_IP=$1
SSH_USER=$2
REMOTE_PATH=$3
MODE=${4:-production}
SSH_CONN="${SSH_USER}@${SERVER_IP}"

case "$MODE" in
    production|prod)
        MODE="production"
        PM2_NAME="strapi"
        START_SCRIPT="start"
        NPM_INSTALL="npm install --omit=dev"
        ;;
    development|dev)
        MODE="development"
        PM2_NAME="strapi-dev"
        START_SCRIPT="develop"
        NPM_INSTALL="npm install"
        PORT_OVERRIDE=${DEV_PORT:-1338}  # must differ from the production process
        ;;
    *)
        echo -e "${RED}Invalid mode '$MODE'. Use 'production' or 'development'.${NC}"
        exit 1
        ;;
esac

echo -e "${YELLOW}Starting Strapi ${MODE} deployment to ${SERVER_IP}...${NC}"

# Get script directory
SCRIPT_DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"
PROJECT_ROOT="$SCRIPT_DIR"

# Determine SERVER_DIR - could be at ./server or current directory
if [ -d "$PROJECT_ROOT/server" ] && [ -f "$PROJECT_ROOT/server/package.json" ]; then
    SERVER_DIR="$PROJECT_ROOT/server"
elif [ -f "$PROJECT_ROOT/package.json" ]; then
    SERVER_DIR="$PROJECT_ROOT"
else
    echo -e "${RED}Error: Could not find server directory${NC}"
    echo -e "${RED}Expected either:${NC}"
    echo -e "${RED}  - $PROJECT_ROOT/server/package.json${NC}"
    echo -e "${RED}  - $PROJECT_ROOT/package.json${NC}"
    exit 1
fi

echo -e "${YELLOW}Using server directory: $SERVER_DIR${NC}"

# Pick env file for this mode
if [ -f "$SERVER_DIR/.env.$MODE" ]; then
    ENV_FILE="$SERVER_DIR/.env.$MODE"
elif [ -f "$SERVER_DIR/.env" ]; then
    ENV_FILE="$SERVER_DIR/.env"
else
    echo -e "${RED}Error: no .env.$MODE or .env found in $SERVER_DIR${NC}"
    exit 1
fi
echo -e "${YELLOW}Using env file: $(basename "$ENV_FILE")${NC}"

# Step 1: Build the project (production only)
cd "$SERVER_DIR"
if [ "$MODE" = "production" ]; then
    echo -e "${YELLOW}[1/5] Building Strapi project...${NC}"
    export NODE_OPTIONS="--max-old-space-size=2048"
    NODE_ENV=production npm run build
    unset NODE_OPTIONS
    echo -e "${GREEN}✓ Build completed${NC}"
else
    echo -e "${YELLOW}[1/5] Skipping build (development mode)${NC}"
fi

# Step 2: Create backup on remote server
echo -e "${YELLOW}[2/5] Creating backup on remote server...${NC}"
ssh "$SSH_CONN" "
  if [ -d '$REMOTE_PATH' ]; then
    mkdir -p ${REMOTE_PATH}_backups
    backup_file=\$(date +%Y%m%d_%H%M%S)
    cp -r '$REMOTE_PATH' '${REMOTE_PATH}_backups/backup_'\$backup_file
    echo 'Backup created: backup_'\$backup_file
  fi
" || echo "No existing backup needed (first deployment)"
echo -e "${GREEN}✓ Backup created${NC}"

# Step 3: Create remote directory if it doesn't exist
echo -e "${YELLOW}[3/5] Preparing remote directory...${NC}"
ssh "$SSH_CONN" "mkdir -p '$REMOTE_PATH'"

# Step 4: Upload files
echo -e "${YELLOW}[4/5] Uploading files to server...${NC}"
if [ "$MODE" = "production" ]; then
    rsync -avz --delete \
      --exclude 'node_modules' \
      --exclude '.git' \
      --exclude '.tmp' \
      --exclude '.gitignore' \
      "$SERVER_DIR/dist/" "$SSH_CONN:${REMOTE_PATH}/dist/"

    rsync -avz "$SERVER_DIR/.strapi/" "$SSH_CONN:${REMOTE_PATH}/.strapi/"
else
    # Guard: the rsync below uses --delete on src/. Content-types built in the dev
    # Content-Type Builder exist only on the server, so refuse to wipe them.
    ONLY_ON_SERVER=$(rsync -rzn --delete --out-format='%n' "$SERVER_DIR/src/" "$SSH_CONN:${REMOTE_PATH}/src/" 2>/dev/null | grep '^deleting ' || true)
    if [ -n "$ONLY_ON_SERVER" ] && [ "${FORCE:-0}" != "1" ]; then
        echo -e "${RED}Dev server has src files not in your local repo (likely Content-Type Builder changes):${NC}"
        echo "$ONLY_ON_SERVER"
        echo -e "${RED}Run ./pull-schema.sh first, or re-run with FORCE=1 to overwrite them.${NC}"
        exit 1
    fi
    # Source is needed for `strapi develop`; it builds the admin panel itself
    rsync -avz --delete \
      --exclude 'node_modules' \
      --exclude '.git' \
      --exclude '.tmp' \
      --exclude '.strapi' \
      --exclude 'dist' \
      --exclude '.env*' \
      --exclude 'public/uploads' \
      "$SERVER_DIR/src" "$SERVER_DIR/config" "$SERVER_DIR/database" \
      "$SERVER_DIR/public" "$SERVER_DIR/types" "$SERVER_DIR/tsconfig.json" \
      "$SSH_CONN:${REMOTE_PATH}/"
fi
rsync -avz "$SERVER_DIR/package.json" "$SERVER_DIR/package-lock.json" "$SSH_CONN:${REMOTE_PATH}/"
rsync -avz "$ENV_FILE" "$SSH_CONN:${REMOTE_PATH}/.env"
ssh "$SSH_CONN" "mkdir -p '$REMOTE_PATH/public/uploads'"
APP_PORT=$(grep -E '^PORT=' "$ENV_FILE" | cut -d= -f2 | tr -d '\r"' || true)
APP_PORT=${APP_PORT:-1337}
if [ "$MODE" = "development" ]; then
    # Keep the dev instance off the production port and out of production mode
    APP_PORT=$PORT_OVERRIDE
    ssh "$SSH_CONN" "
      cd '$REMOTE_PATH'
      sed -i -E '/^(PORT|NODE_ENV)=/d' .env
      printf '\nPORT=$APP_PORT\nNODE_ENV=development\n' >> .env
    "

    # Share the production database (and uploads) with the dev instance.
    # PROD_PATH defaults to REMOTE_PATH with a trailing "-dev" removed.
    PROD_PATH=${PROD_PATH:-${REMOTE_PATH%-dev}}
    if [ "$PROD_PATH" != "$REMOTE_PATH" ]; then
        ssh "$SSH_CONN" "
          cd '$REMOTE_PATH'
          sed -i -E '/^DATABASE_FILENAME=/d' .env
          printf 'DATABASE_FILENAME=$PROD_PATH/.tmp/data.db\n' >> .env
          # share uploaded media too
          if [ -d '$PROD_PATH/public/uploads' ] && [ ! -L public/uploads ]; then
            mv public/uploads public/uploads.local.\$(date +%s) 2>/dev/null || true
            ln -s '$PROD_PATH/public/uploads' public/uploads
          fi
        "
    else
        echo -e "${YELLOW}Warning: could not derive production path; set PROD_PATH to share the database.${NC}"
    fi
fi
echo -e "${GREEN}✓ Files uploaded${NC}"

# Step 5: Install dependencies and restart
echo -e "${YELLOW}[5/5] Installing dependencies and restarting service...${NC}"
ssh "$SSH_CONN" "
  export NVM_DIR=\"\$HOME/.nvm\"
  [ -s \"\$NVM_DIR/nvm.sh\" ] && . \"\$NVM_DIR/nvm.sh\"

  cd '$REMOTE_PATH'
  $NPM_INSTALL || {
    echo 'NPM install failed, cleaning node_modules and retrying...'
    rm -rf node_modules
    $NPM_INSTALL
  }

  # Install PM2 globally if not present
  if ! command -v pm2 &> /dev/null; then
    npm install -g pm2
  fi

  # Restart or start the app with PM2
  if pm2 describe $PM2_NAME > /dev/null 2>&1; then
    pm2 restart $PM2_NAME --update-env
  else
    NODE_ENV=$MODE pm2 start npm --name $PM2_NAME -- run $START_SCRIPT
  fi

  # Save PM2 process list so it survives reboots
  pm2 save

  # Set up PM2 to start on system boot (prints command — run it once manually if needed)
  pm2 startup || true

  echo 'Service started. Check logs with: pm2 logs $PM2_NAME'
"
echo -e "${GREEN}✓ Service deployed and started${NC}"

echo -e "${GREEN}✓ ${MODE} deployment completed successfully!${NC}"
echo -e "${YELLOW}Admin Panel: http://${SERVER_IP}:${APP_PORT}/admin${NC}"
echo -e "${YELLOW}API: http://${SERVER_IP}:${APP_PORT}/api${NC}"

# Production:  cd /home/suresh/NextJS-Strapi/vedorexAcademy/server && ./deploy.sh 107.172.55.253 adminuser /home/adminuser/apps/server production
# Development: cd /home/suresh/NextJS-Strapi/vedorexAcademy/server && ./deploy.sh 107.172.55.253 adminuser /home/adminuser/apps/server-dev development
