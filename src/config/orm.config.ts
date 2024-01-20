import { TypeOrmModuleOptions } from '@nestjs/typeorm';

export const OrmConfig: TypeOrmModuleOptions = {
  type: 'postgres',
  host: process.env.POSTGRES_HOST || 'localhost',
  port: parseInt(process.env.POSTGRES_PORT || '5432'),
  username: process.env.POSTGRES_USER || 'postgres',
  password: process.env.POSTGRES_PASSWORD || 'Ehsan3852',
  database: process.env.POSTGRES_DB || 'surveydb',
  entities: ['dist/**/*.entity{.ts,.js}'],
  synchronize: true,

  
};
