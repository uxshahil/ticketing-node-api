import convertKeysToCamelCase from 'database/utils/naming-convention-mapper';
import { knexSnakeCaseMappers } from 'objection';

interface DbConnection {
  host: string;
  port: number;
  user: string;
  database: string;
  password: string;
  ssl: boolean;
}

interface MigrationConfig {
  tableName: string;
  directory: string;
}

interface EnvironmentConfig {
  client: 'postgresql' | 'mysql' | 'sqlite3' | 'oracle' | 'mssql'; // Add other clients as needed
  connection: DbConnection;
  migrations: MigrationConfig;
  postProcessResponse?: (result: any, queryContext: any) => any; // Adjust the types as needed
}

interface Config {
  local: EnvironmentConfig;
  development: EnvironmentConfig;
  production?: EnvironmentConfig;
}

// Define the configuration object
const dbConfig: Config = {
  local: {
    client: 'postgresql',
    connection: {
      host: '127.0.0.1',
      port: 5454,
      user: 'postgres',
      database: 'ticketing',
      password: 'ticketing@2024!',
      ssl: false,
    },
    migrations: {
      tableName: 'knex_migrations',
      directory: 'src/database/migrations',
    },
    ...knexSnakeCaseMappers(),
    postProcessResponse: (result) => {
      return convertKeysToCamelCase(result);
    },
  },
  development: {
    client: 'postgresql',
    connection: {
      host: process.env.DB_HOST!,
      port: parseInt(process.env.DB_PORT!, 10),
      user: process.env.DB_USER!,
      database: process.env.DB_NAME!,
      password: process.env.DB_PASSWORD!,
      ssl: process.env.DB_SSL === 'true',
    },
    migrations: {
      tableName: 'knex_migrations',
      directory: 'src/database/migrations',
    },
    ...knexSnakeCaseMappers(),
    postProcessResponse: (result) => {
      return convertKeysToCamelCase(result);
    },
  },
  production: {
    client: 'postgresql',
    connection: {
      host: process.env.DB_HOST!,
      port: parseInt(process.env.DB_PORT!, 10),
      user: process.env.DB_USER!,
      database: process.env.DB_NAME!,
      password: process.env.DB_PASSWORD!,
      ssl: process.env.DB_SSL === 'true',
    },
    migrations: {
      tableName: 'knex_migrations',
      directory: 'src/database/migrations',
    },
    ...knexSnakeCaseMappers(),
    postProcessResponse: (result) => {
      return convertKeysToCamelCase(result);
    },
  },
};

// Export the configuration object
export default dbConfig;
