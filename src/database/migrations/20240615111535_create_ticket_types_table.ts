import type { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable('ticketTypes', function (table) {
    table
      .uuid('id', { primaryKey: true, useBinaryUuid: true })
      .defaultTo(knex.raw('uuid_generate_v4()'));
    table.string('title', 50).notNullable();
    table.string('description', 50);
    table.timestamps(true, true, true);
    table.timestamp('deletedAt');
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable('ticketTypes');
}
