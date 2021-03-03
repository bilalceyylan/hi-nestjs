import { InputType, ObjectType, PickType } from '@nestjs/graphql';
import { CoreOutputDTO } from 'src/common/dtos/core.output.dtos';
import { UsersEntity } from '../entities/users.entity';

@InputType()
export class SignupInputDTO extends PickType(UsersEntity, ['email', 'password', 'hashPassword', 'salt', 'role']) {}

@ObjectType()
export class SignupOutputDTO extends CoreOutputDTO {}
