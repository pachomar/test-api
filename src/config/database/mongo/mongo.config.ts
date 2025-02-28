import { ConfigService } from '@nestjs/config';
import { MongooseModuleAsyncOptions, MongooseModuleOptions } from '@nestjs/mongoose';
import { AppConfiguration, MongoConfiguration } from './../../configuration.interface';

export default class MongooseConfig {
  static getMongooseConfig(config: ConfigService): MongooseModuleOptions {
    const appConfig = config.get<AppConfiguration>('app');
    const mongoConfig = config.get<MongoConfiguration>('mongo');
    let uri = mongoConfig.uri;
    if (!uri) {
      uri = `mongodb://${mongoConfig.host}:${mongoConfig.port}/${mongoConfig.name}`;
    }

    let auth = null;
    if (mongoConfig.user) {
      auth = {
        user: mongoConfig.user,
        password: mongoConfig.password,
      };
    }

    const options: MongooseModuleOptions = {
      uri,
      appName: appConfig.name,
      connectTimeoutMS: mongoConfig.connectionTimeout,
      dbName: mongoConfig.name,
      //   other configs can be added here
    };

    if (auth) {
      options.auth = auth;
    }

    return options;
  }
}

export const mongoAsyncConfig: MongooseModuleAsyncOptions = {
  useFactory: async (config: ConfigService) => MongooseConfig.getMongooseConfig(config),
  inject: [ConfigService],
};

