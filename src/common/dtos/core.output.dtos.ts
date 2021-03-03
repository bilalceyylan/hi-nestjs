import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class CoreOutputDTO {
    @Field(() => Boolean)
    success: boolean;
    @Field(() => String, { nullable: true })
    message?: string;
}
