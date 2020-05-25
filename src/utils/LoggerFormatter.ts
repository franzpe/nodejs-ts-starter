import { Request, Response, json } from 'express';
import { format } from 'winston';
import { tryParseJSON } from '.';
import morgan from 'morgan';

class LoggerFormatter {
  static httpErrorFormat = (err: Error, req: Request, res: Response) => {
    return JSON.stringify({
      ip: req.ip,
      method: req.method,
      url: req.originalUrl,
      httpVersion: req.httpVersion,
      statusCode: (err as any).statusCode || 500,
      message: err.message
    });
  };

  static morganJsonFormat = (
    tokens: morgan.TokenIndexer,
    req: Request<any, any, any, any>,
    res: Response<any>
  ) => {
    return JSON.stringify({
      ip: tokens['remote-addr'](req, res),
      method: tokens['method'](req, res),
      url: tokens['url'](req, res),
      httpVersion: tokens['http-version'](req, res),
      statusCode: tokens['status'](req, res),
      message: ''
    });
  };

  static printF = format.printf(info => {
    let jsonObj: any = tryParseJSON(info.message);

    return jsonObj
      ? JSON.stringify({ timestamp: info.timestamp, level: info.level, ...jsonObj })
      : JSON.stringify({ timestamp: info.timestamp, level: info.level, message: info.message });
  });
}

export default LoggerFormatter;
