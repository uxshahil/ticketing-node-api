/* eslint-disable class-methods-use-this */
import logger from '@core/utils/logger';
import db from '../database';

class DatabaseService {
  async connect() {
    try {
      await db.raw('SELECT 1'); // Example operation to verify connection
      logger.debug('Database connected!');
    } catch (err) {
      logger.error('Error connecting to the database', err);
    }
  }

  async disconnect() {
    db.destroy()
      .then(() => logger.debug('Database disconnected'))
      .catch((err) =>
        logger.error('Error disconnecting from the database', err),
      );
  }

  async migrate() {
    try {
      await db.migrate.latest();
      logger.debug('Ran migrations successfully');
    } catch (error) {
      logger.error('Failed to run migrations:', error);
    }
  }
}

export default new DatabaseService();
