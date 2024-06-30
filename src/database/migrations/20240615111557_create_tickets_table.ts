/* eslint-disable func-names */
import type { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable('tickets', function (table) {
    table
      .uuid('id', { primaryKey: true, useBinaryUuid: true })
      .defaultTo(knex.raw('uuid_generate_v4()'));
    table.text('description');
    table.integer('number').unique().notNullable();
    table
      .uuid('created_by')
      .references('users.id')
      .deferrable('deferred')
      .onDelete('SET NULL');
    table
      .uuid('ticketTypeId')
      .references('ticketTypes.id')
      .deferrable('deferred');
    table
      .uuid('assigned_to')
      .references('users.id')
      .deferrable('deferred')
      .onDelete('SET NULL');
    table.timestamp('due_date');
    table.timestamp('completedDate');
    table
      .enum('status', ['unassigned', 'open', 'paused', 'closed'])
      .notNullable();
    table.enum('priority', ['low', 'medium', 'high']).notNullable();
    table.timestamps(true, true);
    table.timestamp('deleted_at');
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable('tickets');
}
