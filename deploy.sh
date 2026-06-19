#!/bin/bash

# Strapi Deployment Script to Racknerd Server
# Usage: ./deploy.sh <server_ip> <ssh_user> <remote_path>
# Example: ./deploy.sh 192.168.1.100 root /var/www/strapi

set -e  # Exit on any error

# Color codes for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Check arguments
if [ $# -lt 3 ]; then
    echo -e "${RED}Usage: ./deploy.sh <server_ip> <ssh_user> <remote_path>${NC}"
    echo "Example: ./deploy.sh 192.168.1.100 root /var/www/strapi"
    exit 1
fi

SERVER_IP=$1
SSH_USER=$2
REMOTE_PATH=$3
SSH_CONN="${SSH_USER}@${SERVER_IP}"

echo -e "${YELLOW}Starting Strapi deployment to ${SERVER_IP}...${NC}"

# Get script directory
SCRIPT_DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"
PROJECT_ROOT="$SCRIPT_DIR"

# Determine SERVER_DIR - could be at ./server or current directory
if [ -d "$PROJECT_ROOT/server" ] && [ -f "$PROJECT_ROOT/server/package.json" ]; then
    SERVER_DIR="$PROJECT_ROOT/server"
elif [ -f "$PROJECT_ROOT/package.json" ] && [ -d "$PROJECT_ROOT/dist" ]; then
    SERVER_DIR="$PROJECT_ROOT"
else
    echo -e "${RED}Error: Could not find server directory${NC}"
    echo -e "${RED}Expected either:${NC}"
    echo -e "${RED}  - $PROJECT_ROOT/server/package.json${NC}"
    echo -e "${RED}  - $PROJECT_ROOT/package.json with $PROJECT_ROOT/dist${NC}"
    exit 1
fi

echo -e "${YELLOW}Using server directory: $SERVER_DIR${NC}"

# Step 1: Build the project
echo -e "${YELLOW}[1/5] Building Strapi project...${NC}"
cd "$SERVER_DIR"
export NODE_OPTIONS="--max-old-space-size=2048"
npm run build
unset NODE_OPTIONS
echo -e "${GREEN}✓ Build completed${NC}"

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
rsync -avz --delete \
  --exclude 'node_modules' \
  --exclude '.git' \
  --exclude '.tmp' \
  --exclude '.gitignore' \
  "$SERVER_DIR/dist/" "$SSH_CONN:${REMOTE_PATH}/dist/"

rsync -avz "$SERVER_DIR/.strapi/" "$SSH_CONN:${REMOTE_PATH}/.strapi/"
rsync -avz "$SERVER_DIR/package.json" "$SERVER_DIR/package-lock.json" "$SERVER_DIR/.env" "$SSH_CONN:${REMOTE_PATH}/"
echo -e "${GREEN}✓ Files uploaded${NC}"

# Step 5: Install dependencies and restart
echo -e "${YELLOW}[5/5] Installing dependencies and restarting service...${NC}"
ssh "$SSH_CONN" "
  export NVM_DIR=\"\$HOME/.nvm\"
  [ -s \"\$NVM_DIR/nvm.sh\" ] && . \"\$NVM_DIR/nvm.sh\"

  cd '$REMOTE_PATH'
  npm install --production

  # Install PM2 globally if not present
  if ! command -v pm2 &> /dev/null; then
    npm install -g pm2
  fi

  # Restart or start the app with PM2
  if pm2 describe strapi > /dev/null 2>&1; then
    pm2 restart strapi
  else
    pm2 start npm --name strapi -- run start
  fi

  # Save PM2 process list so it survives reboots
  pm2 save

  # Set up PM2 to start on system boot (prints command — run it once manually if needed)
  pm2 startup || true

  echo 'Service started. Check logs with: pm2 logs strapi'
"
echo -e "${GREEN}✓ Service deployed and started${NC}"

echo -e "${GREEN}✓ Deployment completed successfully!${NC}"
echo -e "${YELLOW}Admin Panel: http://${SERVER_IP}:1337/admin${NC}"
echo -e "${YELLOW}API: http://${SERVER_IP}:1337/api${NC}"


# cd /home/suresh/NextJS-Strapi/vedorexAcademy/server && ./deploy.sh 107.172.55.253 adminuser /home/adminuser/apps/server
