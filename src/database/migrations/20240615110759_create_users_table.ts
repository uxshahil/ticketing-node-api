/* eslint-disable func-names */
import type { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable('users', function (table) {
    table
      .uuid('id', { primaryKey: true, useBinaryUuid: true })
      .defaultTo(knex.raw('uuid_generate_v4()'));
    table.string('first_name', 50).notNullable();
    table.string('last_name', 50);
    table.string('profile_pic', 500);
    table
      .uuid('login_id')
      .references('logins.id')
      .deferrable('deferred')
      .onDelete('CASCADE');
    table.timestamps(true, true);
    table.timestamp('deleted_at');
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable('users');
}
