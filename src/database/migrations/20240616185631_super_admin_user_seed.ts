import { IUser } from '@core/interfaces/user.interface';
import type { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  await knex.transaction(async (trx) => {
    const [{ id: loginId }] = await trx('logins')
      .insert({
        email: 'superadmin@gmail.com',
        password: 'superadminpassword',
      })
      .returning('id');

    const [newUser] = (await trx('users')
      .insert({
        id: 'e9afe7f6-8a19-4bb3-8ede-2c9c85e98a04',
        firstName: 'super',
        last_name: 'admin',
        loginId,
      })
      .returning('*')) as IUser[];

    await trx('user_userRoles').insert({
      user_id: newUser.id,
      user_roles_id: 'a7b9f310-0c3a-40a1-afce-fcad622a1dc9',
    });
  });

  await knex.transaction(async (trx) => {
    const [{ id: loginId }] = await trx('logins')
      .insert({
        email: 'shahil@gmail.com',
        password: 'shahil',
      })
      .returning('id');

    const [newUser] = (await trx('users')
      .insert({
        id: '0b6db52e-ef7e-4fb0-bab1-3f8e0833167c',
        firstName: 'Shahil',
        last_name: 'Sukuram',
        loginId,
      })
      .returning('*')) as IUser[];

    await trx('user_userRoles').insert({
      user_id: newUser.id,
      user_roles_id: '0e3c2b5f-2e6a-4024-b106-5bf2ef3ff5e8',
    });

    await trx('user_userRoles').insert({
      user_id: newUser.id,
      user_roles_id: '4270206a-fb67-472c-8d50-06b20dc1e606',
    });
  });

  await knex.transaction(async (trx) => {
    const [{ id: loginId }] = await trx('logins')
      .insert({
        email: 'nick@gmail.com',
        password: 'nick',
      })
      .returning('id');

    const [newUser] = (await trx('users')
      .insert({
        id: '941296b4-00fe-4fd5-941c-d7d1066075d3',
        firstName: 'Nick',
        last_name: 'Els',
        loginId,
      })
      .returning('*')) as IUser[];

    await trx('user_userRoles').insert({
      user_id: newUser.id,
      user_roles_id: '4270206a-fb67-472c-8d50-06b20dc1e606',
    });
  });
}

export async function down(knex: Knex): Promise<void> {
  await knex('logins').del();
}
