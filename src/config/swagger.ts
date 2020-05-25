import swaggerJSDoc from 'swagger-jsdoc';

export const swaggerOptions: swaggerJSDoc.Options = {
  swaggerDefinition: {
    info: {
      description: 'Hackers & Painters api',
      title: 'Swagger',
      version: '1.0.0'
    },
    host: 'localhost:3000',
    basePath: '/api/v1'
  },
  apis: ['src/services/**/*.ts']
};
