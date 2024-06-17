import type { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  const tickets = [
    {
      number: 1,
      priority: 'low',
      status: 'closed',
      description: 'Closed low priority fe task',
      ticketTypeId: '887bee6f-5b73-448e-9d8e-b927b8a5c8d1',
      assignedTo: '0b6db52e-ef7e-4fb0-bab1-3f8e0833167c',
      createdBy: 'e9afe7f6-8a19-4bb3-8ede-2c9c85e98a04',
    },
    {
      number: 2,
      priority: 'medium',
      status: 'closed',
      description: 'Closed medium priority fe task',
      ticketTypeId: '887bee6f-5b73-448e-9d8e-b927b8a5c8d1',
      assignedTo: '0b6db52e-ef7e-4fb0-bab1-3f8e0833167c',
      createdBy: 'e9afe7f6-8a19-4bb3-8ede-2c9c85e98a04',
    },
    {
      number: 3,
      priority: 'high',
      status: 'closed',
      description: 'Closed high priority fe task',
      ticketTypeId: '887bee6f-5b73-448e-9d8e-b927b8a5c8d1',
      assignedTo: '0b6db52e-ef7e-4fb0-bab1-3f8e0833167c',
      createdBy: 'e9afe7f6-8a19-4bb3-8ede-2c9c85e98a04',
    },
    {
      number: 4,
      priority: 'low',
      status: 'unassigned',
      description: 'Unassigned low priority be task',
      ticketTypeId: '6eddce9a-b2b7-470b-b651-9708a0fc8ece',
      createdBy: 'e9afe7f6-8a19-4bb3-8ede-2c9c85e98a04',
    },
    {
      number: 5,
      priority: 'medium',
      status: 'paused',
      description: 'Paused medium priority be task',
      ticketTypeId: '6eddce9a-b2b7-470b-b651-9708a0fc8ece',
      assignedTo: '0b6db52e-ef7e-4fb0-bab1-3f8e0833167c',
      createdBy: 'e9afe7f6-8a19-4bb3-8ede-2c9c85e98a04',
    },
    {
      number: 6,
      priority: 'high',
      status: 'open',
      description: 'Open high priority be task',
      ticketTypeId: '6eddce9a-b2b7-470b-b651-9708a0fc8ece',
      assignedTo: '0b6db52e-ef7e-4fb0-bab1-3f8e0833167c',
      createdBy: 'e9afe7f6-8a19-4bb3-8ede-2c9c85e98a04',
    },
    {
      number: 7,
      priority: 'high',
      status: 'open',
      description: 'Open high priority devops task',
      ticketTypeId: 'f1b65428-39f6-4455-a9cb-342f66745a73',
      assignedTo: '0b6db52e-ef7e-4fb0-bab1-3f8e0833167c',
      createdBy: 'e9afe7f6-8a19-4bb3-8ede-2c9c85e98a04',
    },
    {
      number: 8,
      priority: 'low',
      status: 'closed',
      description: 'Closed low priority customer support task',
      ticketTypeId: '33e68c0e-169e-4222-98cc-45633999f9c9',
      assignedTo: '941296b4-00fe-4fd5-941c-d7d1066075d3',
      createdBy: 'e9afe7f6-8a19-4bb3-8ede-2c9c85e98a04',
    },
    {
      number: 9,
      priority: 'medium',
      status: 'paused',
      description: 'Paused medium priority customer support task',
      ticketTypeId: '33e68c0e-169e-4222-98cc-45633999f9c9',
      assignedTo: '941296b4-00fe-4fd5-941c-d7d1066075d3',
      createdBy: 'e9afe7f6-8a19-4bb3-8ede-2c9c85e98a04',
    },
    {
      number: 10,
      priority: 'high',
      status: 'open',
      description: 'Open high priority customer support',
      ticketTypeId: '33e68c0e-169e-4222-98cc-45633999f9c9',
      assignedTo: '941296b4-00fe-4fd5-941c-d7d1066075d3',
      createdBy: 'e9afe7f6-8a19-4bb3-8ede-2c9c85e98a04',
    },
  ];

  await knex('tickets').insert(tickets);
}

export async function down(knex: Knex): Promise<void> {
  await knex('tickets').del();
}
