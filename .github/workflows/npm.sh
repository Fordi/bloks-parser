#!/bin/bash
HERE="$( cd "$( dirname "${BASH_SOURCE[0]}/../.." )" &> /dev/null && pwd )"
# Make sure we're working from the project root
cd "${HERE}" || exit

SYS_VER="$(node --version || true)"
WANT_VER="$(cat ".nvmrc")"

# If system node is not what we want
if [[ "${SYS_VER}" != "${WANT_VER}" ]]; then
  # Install NVM if not present (will automatically pull in whatever NODE_VERSION is)
  if [[ ! -x "${HOME}/.nvm/nvm.sh" ]]; then
    mkdir -p "${HOME}/.nvm"
    wget -q https://raw.githubusercontent.com/nvm-sh/nvm/v0.40.1/install.sh -O "${HOME}/.nvm/install.sh"
    chmod +x "${HOME}/.nvm/install.sh"
    NODE_VERSION="${WANT_VER}" bash "${HOME}/.nvm/install.sh"
  else 
    # Install WANT_VER if not present
    # shellcheck disable=SC1091
    source "${HOME}/.nvm/nvm.sh"
    nvm install "${WANT_VER}"
  fi
fi

# Install dependencies if not present
if [[ ! -d "${HERE}/node_modules" ]]; then
  npm install
fi

npm "${@}"