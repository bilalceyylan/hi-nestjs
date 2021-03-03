import { Field, InputType, ObjectType, PickType } from '@nestjs/graphql';
import { CoreOutputDTO } from 'src/common/dtos/core.output.dtos';
import { UsersEntity } from '../entities/users.entity';

@InputType()
export class LoginInputDTO extends PickType(UsersEntity, ['email', 'password']) {}

@ObjectType()
export class LoginOutputDTO extends CoreOutputDTO {
    @Field((type) => String, { nullable: true })
    token?: string;
}
