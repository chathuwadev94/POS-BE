import * as dotEnv from 'dotenv';
dotEnv.config();

export default () => ({
  app: {
    version: process.env.APP_VERSION || 'v1',
    port: parseInt(process.env.APP_PORT, 10) || 3000,
  },
  database: {
    type: 'postgres',
    host: process.env.POSTGRES_HOST || 'localhost',
    port: parseInt(process.env.POSTGRES_PORT, 10) || 5432,
    username: process.env.POSTGRES_USER || 'postgres',
    password: process.env.POSTGRES_PASSWORD || 'postgres',
    database: process.env.POSTGRES_DATABASE || 'posSystem',
  },
  jwt: {
    secret: process.env.JWT_SECRET || 'assi-a123',
    expire_time: process.env.JWT_EXP_TIME || '120s',
    refresh_jwt_expire_time: process.env.REFRESH_JWT_EXP_TIME || '1d'
  },
  device: {
    device_limit_count:process.env.DEVICE_LIMIT_COUNT || '10',
  }
});
