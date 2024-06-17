import { readPackage } from '@core/utils/package';
import dotenv from 'dotenv';
import Joi from 'joi';

let env = dotenv.config({ path: '.env.local' }).parsed;

if (process.env.NODE_ENV === 'development') {
  env = dotenv.config({ path: '.env.development' }).parsed;
}

// All env variables used by the app should be defined in this file.

// To define new env:
// 1. Add env variable to .env.local file;
// 2. Provide validation rules for your env in envsSchema;
// 3. Make it visible outside of this module in export section;
// 4. Access your env variable only via config file.
// Do not use process.env object outside of this file.

const envsSchema = Joi.object()
  .keys({
    NODE_ENV: Joi.string()
      .valid('local', 'production', 'development')
      .required(),
    PORT: Joi.number().default(8080),
    API_KEY_TOKEN: Joi.string().required(),
    DB_HOST: Joi.string().required(),
    DB_PORT: Joi.number().default(5432),
    DB_USER: Joi.string().required(),
    DB_NAME: Joi.string().required(),
    DB_PASSWORD: Joi.string().required(),
    DB_SSL: Joi.boolean().required().default(false),
    AUTO_MIGRATE: Joi.boolean().required().default(false),
    JWT_SECRET: Joi.string().required(),
  })
  .unknown(true);

const { value: envVars, error } = envsSchema
  .prefs({ errors: { label: 'key' } })
  .validate(env);

if (error) {
  throw new Error(
    `Config validation error: ${error.message}. \n
     This app requires env variables to work properly. If you run app locally use docker-compose`,
  );
}
const packageData = readPackage(process.cwd(), true);

// map env vars and make it visible outside module
export default {
  env: envVars.NODE_ENV,
  port: envVars.PORT,
  xApiKey: envVars.API_KEY_TOKEN,
  projectName: packageData.name,
  projectVersion: packageData.version,
  dbHost: envVars.DB_HOST,
  dbPort: envVars.DB_PORT,
  dbUser: envVars.DB_USER,
  dbName: envVars.DB_NAME,
  dbPassword: envVars.DB_PASSWORD,
  dbSsl: envVars.DB_SSL,
  autoMigrate: envVars.AUTO_MIGRATE,
  jwtSecret: envVars.JWT_SECRET,
};

console.log(envVars);
