import {TypeOrmModuleOptions} from "@nestjs/typeorm";

export const OrmConfig : TypeOrmModuleOptions ={
    type: 'postgres',
    host: 'localhost',
    port: 5432,
    username: 'postgres',
    password: 'Ehsan321!@##@!',
    database: 'surveyApp',
    entities: ['dist/**/*.entity{.ts,.js}'],
    synchronize: true,
}