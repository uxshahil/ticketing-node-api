import type { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  const ticketsTypes = [
    {
      id: '887bee6f-5b73-448e-9d8e-b927b8a5c8d1',
      title: 'fe-engineering',
      description: 'Tasks associated with FE',
    },
    {
      id: '6eddce9a-b2b7-470b-b651-9708a0fc8ece',
      title: 'be-engineering',
      description: 'Tasks associated with BE',
    },
    {
      id: 'f1b65428-39f6-4455-a9cb-342f66745a73',
      title: 'devops',
      description: 'Tasks associated with Devops',
    },
    {
      id: '33e68c0e-169e-4222-98cc-45633999f9c9',
      title: 'customer-support',
      description: 'Tasks associated with Customer Support',
    },
  ];

  await knex('ticketTypes').insert(ticketsTypes);
}

export async function down(knex: Knex): Promise<void> {
  await knex('ticketTypes').del();
}
