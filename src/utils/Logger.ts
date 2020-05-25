import winston from 'winston';
import 'winston-daily-rotate-file';
import winstonOptions from '../config/winston';

class Logger {
  private _instance: winston.Logger;

  constructor() {
    this._instance = winston.createLogger(winstonOptions);
  }

  info = (message: string) => {
    this._instance.info(message);
  };

  error = (message: string) => {
    this._instance.error(message);
  };

  /**
   * Write stream for morgana and transport stream only for 2xx & 3xx req. status codes. 4xx & 5xx are logged by winston
   */
  write = (json: string) => {
    const obj = JSON.parse(json);

    if (obj) {
      if (obj.statusCode.startsWith('2') || obj.statusCode.startsWith('3')) {
        this._instance.info(json);
      }
    }
  };
}

const logger = new Logger();

export default logger;
