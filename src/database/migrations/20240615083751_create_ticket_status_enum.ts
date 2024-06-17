import type { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  return knex.schema.raw(
    `CREATE TYPE ticketStatus AS ENUM ('unassigned', 'open', 'paused', 'closed')`,
  );
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.raw(`DROP TYPE ticketStatus CASCADE`);
}
