import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersEntity } from './entities/users.entity';
import { UsersResolver } from './users.resolver';
import { UsersService } from './users.service';
//ConfigService
@Module({
    imports: [TypeOrmModule.forFeature([UsersEntity])],
    providers: [UsersResolver, UsersService],
    exports: [UsersService],
})
export class UsersModule {}
