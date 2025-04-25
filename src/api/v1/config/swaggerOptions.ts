import swaggerJsdoc from 'swagger-jsdoc';

const options: swaggerJsdoc.Options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Lost & Found API For Red River College',
      version: '1.0.0',
      description: 'API for managing lost, found items, and claims at Red River College',
    },
    servers: [
      { url: 'http://localhost:3000/api/v1' },
    ],
  },
  apis: ['./src/api/v1/routes/*.ts'],
};

export const generateSwaggerSpec = () => swaggerJsdoc(options);
