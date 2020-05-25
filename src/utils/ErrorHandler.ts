import { Response, Request, NextFunction } from 'express';
import { HTTPClientError, HTTP404Error } from './httpErrors';
import logger from './Logger';
import LoggerFormatter from './LoggerFormatter';

export const notFoundError = () => {
  throw new HTTP404Error('Method not found.');
};

export const clientError = (err: Error, req: Request, res: Response, next: NextFunction) => {
  if (err instanceof HTTPClientError) {
    logger.error(LoggerFormatter.httpErrorFormat(err, req, res));
    res.status(err.statusCode).send(err.message);
  } else {
    next(err);
  }
};

export const serverError = (err: Error, req: Request, res: Response, next: NextFunction) => {
  logger.error(LoggerFormatter.httpErrorFormat(err, req, res));

  if (process.env.NODE_ENV === 'production') {
    res.status(500).send('Internal Server Error');
  } else {
    res.status(500).send(err.stack);
  }
};
