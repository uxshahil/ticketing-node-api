import config from '@config/config';
import { Router } from 'express';
import swaggerUi, { SwaggerOptions } from 'swagger-ui-express';

import consts from '@config/consts';
import { swaggerForbidden } from '@core/middlewares/swagger.middleware';

import swaggerJSDoc from 'swagger-jsdoc';

const options: SwaggerOptions = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Ticketing Api',
      description: 'Node.JS Express Ticketing Solution',
      contact: { nane: 'Shahil Sukuram' },
      version: '0.0.1',
      servers: ['http://localhost:8008'],
    },
    components: {
      securitySchemes: {
        BearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
        },
      },
    },
  },
  apis: ['./src/@core/routers/*.ts', './src/@core/controllers/*.ts'],
};

const specs = swaggerJSDoc(options);

const router: Router = Router();

if (config.env !== 'production') {
  router.use(
    consts.API_DOCS_PATH,
    swaggerUi.serve,
    swaggerUi.setup(specs, {
      swaggerOptions: {
        requestInterceptor: (request) => {
          request.headers.Authorization = 'Bearer YOUR_TOKEN_HERE'; // Optionally set a default token for testing
          return request;
        },
      },
    }),
  );
} else {
  router.use(consts.API_DOCS_PATH, swaggerForbidden);
}

export default router;
