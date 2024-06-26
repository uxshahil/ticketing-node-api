import express, { Application } from 'express';

import http404 from '@components/404/404.router';
import swaggerApiDocs from '@components/swagger-ui/swagger.router';
import config from '@config/config';
import consts from '@config/consts';
import errorHandling from '@core/middlewares/errorHandling.middleware';
import uniqueReqId from '@core/middlewares/uniqueReqId.middleware';
import httpLogger from '@core/utils/httpLogger';
import logger from '@core/utils/logger';
import cors from 'cors';

import api from '@core/api';
import databaseService from 'database/services/database-service';
import httpContext from 'express-http-context';

const app: Application = express();

databaseService
  .connect()
  .then(() => {
    logger.debug('Database connected');
  })
  .catch((error) => {
    logger.error('Failed to connect to the database:', error);
    // process.exit(1);
  });

if (config.autoMigrate === true) {
  databaseService
    .migrate()
    .then(() => {
      logger.debug('Database migrations applied');
    })
    .catch((error) => {
      logger.error('Failed to apply database migrations:', error);
      // process.exit(1);
    });
} else {
  logger.debug('Skipping database migrations. AUTO_MIGRATE is not enabled.');
}

app.use(
  cors({
    origin: 'http://localhost:5174', // Allow only requests from localhost:5174
    allowedHeaders: [
      'Origin',
      'Content-Type',
      'Accept',
      'sentry-trace',
      'Authorization',
    ],
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
    credentials: true,
    maxAge: 86400,
    preflightContinue: false,
  }),
);
app.use(httpContext.middleware);
app.use(httpLogger.successHandler);
app.use(httpLogger.errorHandler);
app.use(uniqueReqId);
app.use(express.json());
app.use(consts.API_ROOT_PATH, api);
app.use(swaggerApiDocs);
app.use(http404);

app.use(errorHandling);

export default app;
