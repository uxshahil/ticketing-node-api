import app from '@app';
import config from '@config/config';
import logger from '@core/utils/logger';
import errorHandler from 'core/utils/errorHandler';
import { Server } from 'http';

const { port, projectName } = config;

const server: Server = app.listen(port, (): void => {
  logger.info(`Application '${projectName}' listens on PORT: ${port}`);
});

const unexpectedErrorHandler = (error: Error): void => {
  errorHandler.handleError(error);
};

process.on('uncaughtException', unexpectedErrorHandler);
process.on('unhandledRejection', (reason: Error) => {
  throw reason;
});

process.on('SIGTERM', () => {
  logger.info('SIGTERM received');
  if (server) {
    server.close();
  }
});
