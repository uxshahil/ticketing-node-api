/* eslint-disable func-names */
import type { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable('users', function (table) {
    table
      .uuid('id', { primaryKey: true, useBinaryUuid: true })
      .defaultTo(knex.raw('uuid_generate_v4()'));
    table.string('firstName', 50).notNullable();
    table.string('lastName', 50);
    table.string('profilePic', 500);
    table
      .uuid('loginId')
      .references('logins.id')
      .deferrable('deferred')
      .onDelete('CASCADE');
    table.timestamps(true, true, true);
    table.timestamp('deletedAt');
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable('users');
}
