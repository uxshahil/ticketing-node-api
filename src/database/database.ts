import dbConfig from './config/knex.config';

const db = require('knex')(dbConfig[process.env.NODE_ENV]);

export default db;
