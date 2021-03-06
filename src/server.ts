import http from 'http';
import express from 'express';

import { applyMiddleware, applyRoutes } from './utils';
import middleware from './middleware';
import routes from './services';
import errorHandlers from './middleware/errorHandlers';
import config from './config';

process.on('uncaughtException', e => {
  console.log(e);
  process.exit(1);
});

process.on('unhandledRejection', e => {
  console.log(e);
  process.exit(1);
});

const router = express();

applyMiddleware(middleware, router);
applyRoutes(routes, router, '/api/v1');
applyMiddleware(errorHandlers, router);

const server = http.createServer(router);

server.listen(config.port, () => console.log(`Server is running http://localhost:${config.port}...`));
