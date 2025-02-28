import {
  AppConfiguration,
  AppEnvironment,
  MySQLConfiguration,
  EmailConfiguration,
  WebConfiguration,
  CronJobsConfiguration,
  DigitalOceanConfiguration,
} from './configuration.interface';

/**
 * Configuration docs
 * https://docs.nestjs.com/techniques/configuration
 */
export default () => {
  const app: AppConfiguration = {
    env: process.env.NODE_ENV as AppEnvironment,
    port: parseInt(process.env.APP_PORT),
    name: process.env.APP_NAME,
    version: process.env.APP_VERSION,
    hostName: process.env.APP_HOST_NAME,
    jwtSecret: process.env.JWT_SECRET,
    jwtBearerExpiration: process.env.JWT_BEARER_EXPIRATION,
    jwtRefreshExpiration: process.env.JWT_REFRESH_EXPIRATION,
    bodyLimit: process.env.BODY_LIMIT,
    corsHeaders: process.env.CORS_HEADERS.split(' '),
    corsMethods: process.env.CORS_METHODS.split(' '),
    saltRounds: parseInt(process.env.SALT_ROUNDS),
    isProduction: process.env.NODE_ENV === AppEnvironment.Production,
    docsUrl: process.env.DOCS_URL,
  };

  const mysql: MySQLConfiguration = {
    name: process.env.MYSQL_DB_NAME,
    host: process.env.MYSQL_DB_HOST,
    port: parseInt(process.env.MYSQL_DB_PORT),
    user: process.env.MYSQL_DB_USER,
    password: process.env.MYSQL_DB_PASSWORD,
    uri: process.env.MYSQL_DB_CONNECTION_STRING_URL,
    connectionTimeout: parseInt(process.env.MYSQL_DB_CONNECTION_TIME_OUT),
    acquireTimeout: parseInt(process.env.MYSQL_DB_ACQUIRE_TIME_OUT),
    connectionLimit: parseInt(process.env.MYSQL_DB_CONNECTION_LIMIT),
  };

  const email: EmailConfiguration = {
    user: process.env.EMAIL_SERVICE_USER,
    password: process.env.EMAIL_SERVICE_PASSWORD,
    smtpEndpoint: process.env.EMAIL_SMTP_ENDPOINT,
    enabled: process.env.EMAIL_ENABLED,
    fromEmail: process.env.EMAIL_FROM_EMAIL,
    fromName: process.env.EMAIL_FROM_NAME,
    sendGridApiKey: process.env.EMAIL_SENDGRID_API_KEY,
    requestPasswordTemplate: process.env.REQUEST_PASSWORD_TEMPLATE_ID,
  };

  const web: WebConfiguration = {
    url: process.env.WEB_APP_URL,
    loginRoute: process.env.WEB_APP_LOGIN_ROUTE,
    recoveryRoute: process.env.WEB_APP_RECOVERY_ROUTE,
  };

  const cronJobs: CronJobsConfiguration = {
    enabled: process.env.CRON_JOBS_ENABLED == 'true',
  };

  /*
   * You can add more configurations objects here.
   * Having them separated by subject helps in keeping the file organized 😇
   */

  /*
   * Example of Digital Ocean Storage variable object
   * Replace with other as needed
   */

  const digitalOcean: DigitalOceanConfiguration = {
    cdnEndpoint: process.env.DIGITAL_OCEAN_SPACES_CDN_ENDPOINT,
    spacesEndpoint: process.env.DIGITAL_OCEAN_SPACES_ENDPOINT,
    rootFolder: process.env.DIGITAL_OCEAN_ROOT_FOLDER,
    key: process.env.DIGITAL_OCEAN_SPACES_KEY,
    secret: process.env.DIGITAL_OCEAN_SPACES_SECRET,
    bucket: process.env.DIGITAL_OCEAN_BUCKET,
    imageFolder: process.env.DIGITAL_OCEAN_SPACES_IMAGE_FOLDER_NAME,
    videoFolder: process.env.DIGITAL_OCEAN_SPACES_VIDEO_FOLDER_NAME,
    audioFolder: process.env.DIGITAL_OCEAN_SPACES_AUDIO_FOLDER_NAME,
    docsFolder: process.env.DIGITAL_OCEAN_SPACES_DOCS_FOLDER_NAME,
    logsFolder: process.env.DIGITAL_OCEAN_SPACES_LOGS_FOLDER_NAME,
  };

  return { app, mysql, email, web, cronJobs, digitalOcean };
};
