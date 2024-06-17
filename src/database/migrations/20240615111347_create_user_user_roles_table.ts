import type { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable('user_userRoles', function (table) {
    table
      .uuid('id', { primaryKey: true, useBinaryUuid: true })
      .defaultTo(knex.raw('uuid_generate_v4()'));
    table
      .uuid('userId')
      .references('users.id')
      .deferrable('deferred')
      .onDelete('CASCADE');
    table
      .uuid('userRolesId')
      .references('userRoles.id')
      .deferrable('deferred')
      .onDelete('CASCADE');
    table.timestamps(true, true, true);
    table.timestamp('deletedAt');
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable('user_userRoles');
}
