import type { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable('user_userRoles', function (table) {
    table
      .uuid('id', { primaryKey: true, useBinaryUuid: true })
      .defaultTo(knex.raw('uuid_generate_v4()'));
    table
      .uuid('user_id')
      .references('users.id')
      .deferrable('deferred')
      .onDelete('CASCADE');
    table
      .uuid('user_roles_id')
      .references('userRoles.id')
      .deferrable('deferred')
      .onDelete('CASCADE');
    table.timestamps(true, true);
    table.timestamp('deleted_at');
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable('user_userRoles');
}
