import swaggerJsdoc from 'swagger-jsdoc';
import type { Options } from 'swagger-jsdoc';

const options: Options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'API Refuge de chats',
      version: '1.0.0',
      description: 'API REST – Projet Dev Web 3',
    },
    servers: [
      {
        url: 'http://localhost:3000/api',
        description: 'Local',
      },
      {
        url: 'https://refugedechat2-cxd9cgfebzgch0gt.canadacentral-01.azurewebsites.net/api',
        description: 'Azure',
      },
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
        },
      },
    },
    security: [{ bearerAuth: [] }],
  },
  apis: ['src/routes/*.ts'],
};

export const swaggerSpec = swaggerJsdoc(options);
