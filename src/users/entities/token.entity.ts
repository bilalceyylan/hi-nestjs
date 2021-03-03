import { Field, InputType, ObjectType } from '@nestjs/graphql';

@InputType({ isAbstract: true })
@ObjectType()
//CoreEntity => id,createdAt,updatedAt
//UsersEntity => id,createdAt,updatedAt,email,password,salt,role(master,user)
export class TokenEntity {
    @Field((type) => String)
    token: string;
}
