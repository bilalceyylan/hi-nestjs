import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { GraphQLModule } from '@nestjs/graphql';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './users/users.module';
import { CommonModule } from './common/common.module';
import * as Joi from 'joi';
import { UsersEntity } from './users/entities/users.entity';

@Module({
    imports: [
        ConfigModule.forRoot({
            isGlobal: true,
            envFilePath: process.env.NODE_ENV === 'dev' ? '.env.dev' : '.env.prod',
            validationSchema: Joi.object({
                NODE_ENV: Joi.string().valid('dev', 'prod').required(), //NODE_ENV
            }),
        }),
        GraphQLModule.forRoot({
            autoSchemaFile: true,
            sortSchema: true,
            debug: true,
            playground: true, //playground false
        }),
        TypeOrmModule.forRoot({
            type: 'mysql', //DB type
            host: process.env.DB_HOST,
            port: +process.env.DB_PORT, // port
            username: process.env.DB_USER,
            password: process.env.DB_PASSWORD,
            database: process.env.DB_DATABASE,
            synchronize: process.env.NODE_ENV !== 'prod', // synchronize
            logging: process.env.NODE_ENV !== 'prod', // logging
            entities: [UsersEntity], // entities
            migrations: ['src/migration/*{.ts,.js}'],
            cli: {
                migrationsDir: 'src/migration',
            },
        }),
        UsersModule,
        CommonModule,
        //static module
    ],
    controllers: [],
    providers: [],
})
export class AppModule {}
