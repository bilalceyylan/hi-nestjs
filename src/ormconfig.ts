import { UsersEntity } from './users/entities/users.entity';
import { TokenEntity } from './users/entities/token.entity';
import { CoreEntity } from './common/entities/core.entity';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';

export const config: TypeOrmModuleOptions = {
    type: 'mysql',
    host: 'localhost',
    port: 8889,
    username: 'root',
    password: 'root',
    database: 'nestjs',
    entities: [UsersEntity, TokenEntity, CoreEntity], // maybe you should also consider chage it to something like:  [__dirname + '/**/*.entity.ts', __dirname + '/src/**/*.entity.js']
    migrations: ['src/migration/*{.ts,.js}'],
    cli: {
        migrationsDir: 'src/migration',
    },
    synchronize: true,
};