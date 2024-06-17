import type { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  const userRoles = [
    {
      description: 'Required to create admins in the system',
      id: 'a7b9f310-0c3a-40a1-afce-fcad622a1dc9',
      user_role: 'superadmin',
    },
    {
      description: 'Users that administrate the system',
      id: '0e3c2b5f-2e6a-4024-b106-5bf2ef3ff5e8',
      user_role: 'admin',
    },
    {
      description: 'General users in the system',
      id: '4270206a-fb67-472c-8d50-06b20dc1e606',
      user_role: 'employee',
    },
  ];
  await knex('userRoles').insert(userRoles);
}

export async function down(knex: Knex): Promise<void> {
  await knex('userRoles').del();
}
