#!/bin/sh

echo "Running server in development mode"
cd /app/src || exit
npm run server:dev || exit 1