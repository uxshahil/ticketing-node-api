import httpStatus from 'http-status';

import AppError from '@core/utils/appError';
import logger from '@core/utils/logger';

const swaggerForbidden = () => {
  logger.error('Trying to access swagger docs on production');
  throw new AppError(
    httpStatus.FORBIDDEN,
    'API docs are not available on production',
  );
};

export default swaggerForbidden;
