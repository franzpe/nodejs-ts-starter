import appRoot from 'app-root-path';
import winston, { format } from 'winston';
import { DailyRotateFileTransportOptions } from 'winston-daily-rotate-file';
import LoggerFormatter from '../utils/LoggerFormatter';

type TransportOptions = {
  infoFile: DailyRotateFileTransportOptions;
  errorFile: DailyRotateFileTransportOptions;
  console: winston.transports.ConsoleTransportOptions;
};

const transports: TransportOptions = {
  infoFile: {
    level: 'info',
    filename: `${appRoot}/__logs/app-%DATE%-info.log`,
    datePattern: 'YYYY-MM-DD-HH',
    format: format.combine(format.timestamp(), LoggerFormatter.printF),
    zippedArchive: true,
    maxSize: '100m',
    maxFiles: '14d' // Keep logs for 14 days
  },
  errorFile: {
    level: 'error',
    filename: `${appRoot}/__logs/app-%DATE%-error.log`,
    datePattern: 'YYYY-MM-DD-HH',
    format: format.combine(format.timestamp(), LoggerFormatter.printF),
    zippedArchive: true,
    maxSize: '20m',
    maxFiles: '30d' // Keep logs for 30 days
  },
  console: {
    level: 'debug',
    handleExceptions: true,
    format: winston.format.combine(winston.format.colorize(), winston.format.simple())
  }
};

const winstonOptions: winston.LoggerOptions = {
  transports: [
    new winston.transports.DailyRotateFile(transports.infoFile),
    new winston.transports.DailyRotateFile(transports.errorFile),
    new winston.transports.Console(transports.console)
  ],
  exitOnError: false
};

export default winstonOptions;
