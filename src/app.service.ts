import { ConfigService } from '@nestjs/config';
import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { AppConfiguration } from './config/configuration.interface';
import { Request } from 'express';
import { RestConfig } from './rest/rest-config';
import { Logger } from '@nestjs/common';
import { InjectConnection } from '@nestjs/typeorm';
import { Connection } from 'typeorm';

@Injectable()
export class AppService {
  private logger = new Logger('AppService');
  constructor(private configService: ConfigService, @InjectConnection() private readonly dbConnection: Connection) {
    if (this.dbConnection.isConnected) {
      setTimeout(async () => {
        try {
          await this.dbConnection.query('SELECT * FROM user');
        } catch (err) {
          this.logger.error({
            message: `MySQL connection error: ${err}`,
            operation: `connect.onError`,
          });
          process.exit(-1);
        }
      }, 10000);

      this.logger.log({ message: 'MySQL connection: Success!', operation: 'connect' });
    }
  }

  get appConfigs() {
    return this.configService.get<AppConfiguration>('app');
  }

  getHello(): string {
    return 'Hello World!';
  }

  getHealthCheck() {
    if (this.dbConnection.isConnected) {
      return { app: `${this.appConfigs.name}`, status: 'OK' };
    } else {
      throw new InternalServerErrorException({ app: `${this.appConfigs.name}`, db: { status: 'down' } });
    }
  }

  getVersion(req: Request) {
    const currentTime = new Date().toISOString();
    const apiDocsUrl = `${req.hostname}/${RestConfig.filesRoute}/${RestConfig.uploadFilesRoute}`;
    const response = {
      appName: this.appConfigs.name,
      appVersion: this.appConfigs.version,
      apiDocsUrl,
      currentTime,
    };

    return response;
  }
}
