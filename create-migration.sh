#!/bin/bash

# Capture the first argument passed to the script
MIGRATION_NAME=$1

# Use the captured argument in the knex command
knex migrate:make --knexfile ./src/database/config/knex.config.ts $MIGRATION_NAME --migrations-directory ../migrations