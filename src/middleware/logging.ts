import { Router } from 'express';
import morgan from 'morgan';

import logger from '../utils/Logger';
import LoggerFormatter from '../utils/LoggerFormatter';

export const handleHTTPLogging = (router: Router) => {
  router.use(morgan(LoggerFormatter.morganJsonFormat, { stream: logger }));
};
