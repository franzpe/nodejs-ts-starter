import { Router } from 'express';
import swaggerUi from 'swagger-ui-express';
import swaggerJSDoc from 'swagger-jsdoc';
import { swaggerOptions } from '../config/swagger';

export const handleAPIDocs = (router: Router) => {
  const swaggerDocument = swaggerJSDoc(swaggerOptions);
  router.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
};
