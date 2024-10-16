import * as dotEnv from 'dotenv';
import configuration from '../system/configuration';
dotEnv.config();

export const typeOrmOptions = {
    type: 'postgres',
    host: configuration().database.host,
    port: configuration().database.port,
    username: configuration().database.username,
    password: configuration().database.password,
    database: configuration().database.database,
    entities: [__dirname + '/../../**/*.entity{.ts,.js}'],
    synchronize: false,
    migrationsRun: false,
    autoLoadEntities: true,
    migrations: [__dirname + './../../../migrations/*{.ts,.js}'],
    extra: {
        charset: 'utf8mb4',
    },
};
