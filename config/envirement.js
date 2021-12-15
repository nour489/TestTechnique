let custom_env = {
  NODE_ENV: process.env.NODE_ENV,
  MONGO_URI: process.env.MONGO_URI,
  JWT_SECRET: process.env.JWT_SECRET,


  MICROSERVICE_HOST: process.env.MICROSERVICE_HOST,
  APP_HOST: process.env.APP_HOST,
  APP_PORT: process.env.APP_PORT,
  APP_USER: process.env.APP_USER,
  APP_PASS: process.env.APP_PASS,
  DB_HOST: process.env.DB_HOST,
  DB_PORT: process.env.DB_PORT,
  DB_USER: process.env.DB_USER,
  DB_PASS: process.env.DB_USER,


  MAIL_SENDER: process.env.MAIL_SENDER,

  SMTP_HOST: process.env.SMTP_HOST,
  SMTP_USER: process.env.SMTP_USER,
  SMTP_PASSWORD: process.env.SMTP_PASSWORD,

  GRAYLOG_HOST:process.env.GRAYLOG_HOST,
  GRAYLOG_PORT:process.env.GRAYLOG_PORT,
}

global.ENV = custom_env;
