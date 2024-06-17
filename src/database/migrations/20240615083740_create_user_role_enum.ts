import type { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  return knex.schema.raw(
    `CREATE TYPE user_role AS ENUM ('admin', 'employee', 'superadmin')`,
  );
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.raw(`DROP TYPE user_role CASCADE`);
}
