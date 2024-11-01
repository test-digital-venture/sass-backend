
BASEDIR=$(dirname "$0")
yarn migrate-deploy && node $BASEDIR/../dist/src/index.js
