import type { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  return knex.schema.raw(
    `CREATE TYPE ticketPriority AS ENUM ('low', 'medium', 'high')`,
  );
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.raw(`DROP TYPE ticketPriority CASCADE`);
}
