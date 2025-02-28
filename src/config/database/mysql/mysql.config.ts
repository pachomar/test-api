import { TypeOrmModuleAsyncOptions, TypeOrmModuleOptions } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AppConfiguration, AppEnvironment, MySQLConfiguration } from '../../configuration.interface';
import { User } from '../../../modules/user/entities/user.entity';

export default class TypeOrmConfig {
  static getOrmConfig(config: ConfigService): TypeOrmModuleOptions {
    const mysqlConfig = config.get<MySQLConfiguration>('mysql');
    const appConfig = config.get<AppConfiguration>('app');

    return {
      type: 'mysql',
      host: mysqlConfig.host,
      port: mysqlConfig.port,
      username: mysqlConfig.user,
      password: mysqlConfig.password,
      database: mysqlConfig.name,
      autoLoadEntities: true, // appConfig.env === AppEnvironment.Local
      synchronize: true, // appConfig.env === AppEnvironment.Local
      entities: [User],
    };
  }
}

export const mysqlTypeOrmConfigAsync: TypeOrmModuleAsyncOptions = {
  imports: [ConfigModule],
  useFactory: (config: ConfigService) => TypeOrmConfig.getOrmConfig(config),
  inject: [ConfigService],
};
