import { TypeOrmModuleOptions } from "@nestjs/typeorm";

function ormConfig(): TypeOrmModuleOptions {
    const commonConf = {
        SYNCRONIZE: true,
        ENTITIES: [__dirname + '/**/entities/*.entity.{ts,js}'],
        MIGRATIONS: [__dirname + '/migrations/**/*{.ts,.js}'],
        MIGRATIONS_RUN: false,
    };

    return {
        name: 'default',
        type: 'mysql',
        database: 'nest',
        host: 'localhost',
        port: Number(3306),
        username: 'root',
        password: 'a123123',
        logging: true,
        synchronize: commonConf.SYNCRONIZE,
        entities: commonConf.ENTITIES,
        migrations: commonConf.MIGRATIONS,
        migrationsRun: commonConf.MIGRATIONS_RUN,
    };
}

export { ormConfig };