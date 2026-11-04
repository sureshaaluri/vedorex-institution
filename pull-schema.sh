#!/bin/bash
# Pull content-types/components created in the dev server's Content-Type Builder
# back into the local repo, so a production deploy (which builds locally) includes them.
#
# Usage: ./pull-schema.sh <server_ip> <ssh_user> <dev_remote_path>
# Example: ./pull-schema.sh 107.172.55.253 adminuser /home/adminuser/apps/server-dev
# Then:    ./deploy.sh 107.172.55.253 adminuser /home/adminuser/apps/server production

set -e
if [ $# -lt 3 ]; then
    echo "Usage: ./pull-schema.sh <server_ip> <ssh_user> <dev_remote_path>"
    exit 1
fi
SSH_CONN="$2@$1"
DEV_PATH=$3
SCRIPT_DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"

# No --delete: only adds/updates files, never removes local ones.
for d in src/api src/components; do
    mkdir -p "$SCRIPT_DIR/$d"
    rsync -avz "$SSH_CONN:$DEV_PATH/$d/" "$SCRIPT_DIR/$d/"
done
echo "Done. Review with 'git status', commit, then deploy to production."
