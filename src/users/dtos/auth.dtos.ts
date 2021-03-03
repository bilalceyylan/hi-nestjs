import { Field, InputType, ObjectType, PickType } from '@nestjs/graphql';
import { CoreOutputDTO } from 'src/common/dtos/core.output.dtos';
import { TokenEntity } from '../entities/token.entity';

@InputType()
export class AuthInputDTO extends PickType(TokenEntity, ['token']) {}

@ObjectType()
export class AuthOutputDTO extends CoreOutputDTO {}
