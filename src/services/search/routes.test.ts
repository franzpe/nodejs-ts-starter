import express, { Router } from 'express';
import request from 'supertest';

import { applyMiddleware, applyRoutes } from '../../utils';
import middleware from '../../middleware';
import errorHandlers from '../../middleware/errorHandlers';
import routes from '../../services/search/routes';

describe('routes', () => {
  let router: Router;

  beforeEach(() => {
    router = express();
    applyMiddleware(middleware, router);
    applyRoutes(routes, router, '/api/v1');
    applyMiddleware(errorHandlers, router);
  });

  test('a valid string query', async () => {
    const response = await request(router).get('/api/v1/search?q=Cham');
    expect(response.status).toEqual(200);
  });

  test('a valid response', async () => {
    const response = await request(router).get('/api/v1/search?q=Cham');
    expect(response.text).toEqual('Hello world!');
  });

  test('a non-existing api method', async () => {
    const response = await request(router).get('/api/v11/search');
    expect(response.status).toEqual(404);
  });

  test('an empty string', async () => {
    const response = await request(router).get('/api/v1/search?q=');
    expect(response.status).toEqual(400);
  });
});
