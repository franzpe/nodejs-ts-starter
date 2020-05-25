import { Router, Request, Response, NextFunction } from 'express';

type Wrapper = (router: Router) => void;

export const applyMiddleware = (middleware: Wrapper[], router: Router) => {
  for (const f of middleware) {
    f(router);
  }
};

type Handler = (req: Request, res: Response, next: NextFunction) => Promise<void> | void;

type Route = {
  path: string;
  method: string;
  handler: Handler | Handler[];
};

export const applyRoutes = (routes: Route[], router: Router, basePath: string = '') => {
  for (const route of routes) {
    const { method, path, handler } = route;
    (router as any)[method](basePath + path, handler);
  }
};

export const tryParseJSON = (json: string) => {
  try {
    const o = JSON.parse(json);
    if (o && typeof o === 'object') {
      return o;
    }
  } catch (e) {
    return false;
  }
};
