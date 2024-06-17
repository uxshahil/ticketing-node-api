/* eslint-disable func-names */
import type { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  return knex.schema
    .raw('CREATE EXTENSION IF NOT EXISTS "uuid-ossp"')
    .createTable('logins', function (table) {
      table
        .uuid('id', { primaryKey: true, useBinaryUuid: true })
        .defaultTo(knex.raw('uuid_generate_v4()'));
      table.string('email', 100).notNullable().unique();
      table.string('password', 25).notNullable();
      table.text('jwt');
      table.timestamps(true, true, true);
      table.timestamp('deletedAt');
    });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable('logins');
}
