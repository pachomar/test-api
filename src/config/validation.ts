import * as Joi from 'joi';

/**
 * Validates environment entries and values
 * Make sure to add here any other .env entry that requires any kind of validation
 */
export const validationSchema = Joi.object({
  NODE_ENV: Joi.string().valid('development', 'staging', 'production', 'local').default('local'),
  APP_PORT: Joi.number().default(3000),
  APP_NAME: Joi.string().required(),
  APP_VERSION: Joi.string().required(),
  APP_HOST_NAME: Joi.string().hostname().required(),
  JWT_SECRET: Joi.string().min(20).required(),
  JWT_BEARER_EXPIRATION: Joi.string().default('5m'),
  JWT_REFRESH_EXPIRATION: Joi.string().default('1440s'),
  BODY_LIMIT: Joi.string().default('100kb'),
  CORS_HEADERS: Joi.string().default(''),
  CORS_METHODS: Joi.string().default('GET POST PUT DELETE OPTIONS'),
  SALT_ROUNDS: Joi.number().default(1),
  APP_FILES_URL: Joi.string().required().default('files'),

  //  DATABASE SETTINGS
  MYSQL_DB_NAME: Joi.string().required(),
  MYSQL_DB_HOST: Joi.string().required().hostname(),
  MYSQL_DB_PORT: Joi.number().required(),
  MYSQL_DB_PASSWORD: Joi.string().allow(null, ''),
  MYSQL_DB_CONNECTION_STRING_URL: Joi.string().allow(null, ''),
  MYSQL_DB_CONNECTION_TIME_OUT: Joi.number().default(15000),
  MYSQL_DB_ACQUIRE_TIME_OUT: Joi.number().default(15000),
  MYSQL_DB_CONNECTION_LIMIT: Joi.number().default(10),

  //  EMAIL
  EMAIL_SERVICE_USER: Joi.string(),
  EMAIL_SERVICE_PASSWORD: Joi.string(),
  EMAIL_SMTP_ENDPOINT: Joi.string(),
  EMAIL_ENABLED: Joi.boolean().default(false),
  EMAIL_FROM_NAME: Joi.string(),
  EMAIL_FROM_EMAIL: Joi.string(),
  REQUEST_PASSWORD_TEMPLATE_ID: Joi.string().required(),

  //  WEB
  WEB_APP_URL: Joi.string().allow(null, ''),
  WEB_APP_LOGIN_ROUTE: Joi.string(),
  WEB_APP_RECOVERY_ROUTE: Joi.string(),

  //  CRON JOBS
  CRON_JOBS_ENABLED: Joi.boolean().default(false),

  // DIGITAL OCEAN
  DIGITAL_OCEAN_SPACES_ENDPOINT: Joi.string().required(),
  DIGITAL_OCEAN_ROOT_FOLDER: Joi.string().required(),
  DIGITAL_OCEAN_SPACES_KEY: Joi.string().required(),
  DIGITAL_OCEAN_SPACES_SECRET: Joi.string().required(),
  DIGITAL_OCEAN_BUCKET: Joi.string().required(),
  DIGITAL_OCEAN_SPACES_IMAGE_FOLDER_NAME: Joi.string().default('image'),
  DIGITAL_OCEAN_SPACES_VIDEO_FOLDER_NAME: Joi.string().default('video'),
  DIGITAL_OCEAN_SPACES_AUDIO_FOLDER_NAME: Joi.string().default('audio'),
  DIGITAL_OCEAN_SPACES_DOCS_FOLDER_NAME: Joi.string().default('docs'),
});
