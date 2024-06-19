import config from '@config/config';
import consts from '@config/consts';
import swaggerForbidden from '@core/middlewares/swagger.middleware';
import { Router } from 'express';
import fs from 'fs';
import swaggerJSDoc from 'swagger-jsdoc';
import swaggerUi, { SwaggerOptions } from 'swagger-ui-express';

const tags = [
  { name: 'auth', description: 'Authentication and authorization operations' },
  { name: 'ticket-types', description: 'Operations for managing ticket types' },
  { name: 'tickets', description: 'Operations for managing tickets' },
  { name: 'users', description: 'Operations for managing users' },
];

const options: SwaggerOptions = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Ticketing Api',
      description: 'Node.JS Express Ticketing Solution',
      contact: {
        nane: 'Shahil Sukuram',
        email: 'shahil@themidastouch.co.za',
      },
      version: '0.0.1',
    },
    servers: [
      { url: 'http://localhost:8080', description: 'Development server' },
    ],
    externalDocs: {
      // url: 'http://localhost:8080/public/open-api-schema.json',
    },
    tags,
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
  apis: ['./src/core/routers/*.ts', './src/core/controllers/*.ts'],
};

const specs = swaggerJSDoc(options);

const openApiSpecJson = JSON.stringify(specs, null, 2);
fs.writeFileSync('src/public/open-api-spec.json', openApiSpecJson);

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
