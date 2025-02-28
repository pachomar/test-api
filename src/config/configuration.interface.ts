export enum AppEnvironment {
  Development = 'development',
  Staging = 'staging',
  Production = 'production',
  Local = 'local',
}

export interface AppConfiguration {
  env: AppEnvironment;
  port: number;
  name: string;
  version: string;
  hostName: string;
  jwtSecret: string;
  jwtBearerExpiration: string;
  jwtRefreshExpiration: string;
  bodyLimit: string;
  corsHeaders: string[];
  corsMethods: string[];
  saltRounds: number;
  isProduction: boolean;
  docsUrl: string;
}

export interface MySQLConfiguration {
  name: string;
  host: string;
  port: number;
  user: string;
  password: string;
  uri: string;
  connectionTimeout: number;
  acquireTimeout: number;
  connectionLimit: number;
}

export interface EmailConfiguration {
  user: string;
  password: string;
  smtpEndpoint: string;
  enabled: string;
  fromEmail: string;
  fromName: string;
  sendGridApiKey: string;
  requestPasswordTemplate: string;
}

export interface WebConfiguration {
  url: string;
  loginRoute: string;
  recoveryRoute: string;
}

export interface CronJobsConfiguration {
  enabled: boolean;
}

export interface DigitalOceanConfiguration {
  cdnEndpoint: string;
  spacesEndpoint: string;
  rootFolder: string;
  key: string;
  secret: string;
  bucket: string;
  imageFolder: string;
  videoFolder: string;
  audioFolder: string;
  docsFolder: string;
  logsFolder: string;
}
