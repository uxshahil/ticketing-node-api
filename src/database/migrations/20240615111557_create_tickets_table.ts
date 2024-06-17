/* eslint-disable func-names */
import type { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable('tickets', function (table) {
    table
      .uuid('id', { primaryKey: true, useBinaryUuid: true })
      .defaultTo(knex.raw('uuid_generate_v4()')); // This sets 'id' as the primary key
    table.text('description');
    table.integer('number');
    table
      .uuid('createdBy')
      .references('users.id')
      .deferrable('deferred')
      .onDelete('SET NULL'); // Assuming 'users' table uses 'id' as primary key
    table
      .uuid('ticketTypeId')
      .references('ticketTypes.id')
      .deferrable('deferred');
    table
      .uuid('assignedTo')
      .references('users.id')
      .deferrable('deferred')
      .onDelete('SET NULL'); // Assuming 'users' table uses 'id' as primary key
    table.timestamp('dueDate');
    table.timestamp('completedDate');
    table
      .enum('status', ['unassigned', 'open', 'paused', 'closed'])
      .notNullable();
    table.enum('priority', ['low', 'medium', 'high']).notNullable();
    table.timestamps(true, true, true); // Adds 'createdAt' and 'updatedAt' columns
    table.timestamp('deletedAt');
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable('tickets');
}
