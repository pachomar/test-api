import * as winston from 'winston';
import { utilities as nestWinstonModuleUtilities, WinstonModule } from 'nest-winston';
import 'winston-daily-rotate-file';
import * as path from 'path';

const { combine, timestamp, ms, uncolorize } = winston.format;

const rotationConfigs = (appName: string) => ({
  dirname: path.resolve('./logs'),
  datePattern: 'YYYY-MM-DD-HH',
  zippedArchive: true,
  maxSize: '20mb',
  maxFiles: '30d',
  format: combine(
    timestamp(),
    ms(),
    nestWinstonModuleUtilities.format.nestLike(appName, { prettyPrint: false }),
    uncolorize(),
  ),
});

export const createWinstonLogger = () => {
  const appName = process.env.APP_NAME;
  const env = process.env.NODE_ENV;

  const transports = [
    new winston.transports.DailyRotateFile({
      filename: `${appName}-%DATE%-error.log`,
      level: 'error',
      ...rotationConfigs(appName),
    }),
    new winston.transports.DailyRotateFile({
      filename: `${appName}-%DATE%-combined.log`,
      ...rotationConfigs(appName),
    }),
  ];

  if (env !== 'production') {
    transports.push(
      new winston.transports.Console({
        level: 'silly',
        format: combine(timestamp(), ms(), nestWinstonModuleUtilities.format.nestLike(appName, { prettyPrint: true })),
        handleExceptions: true,
      }) as any,
    );
  }

  const logger = WinstonModule.createLogger({
    level: 'info',
    exitOnError: false,
    transports: transports,
  });

  return logger;
};
