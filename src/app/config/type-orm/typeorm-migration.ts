import * as dotEnv from 'dotenv';
import { typeOrmOptions } from './typeorm-option';
import { DataSource, DataSourceOptions } from 'typeorm';
dotEnv.config();
const options = typeOrmOptions as DataSourceOptions;
export default new DataSource(options);