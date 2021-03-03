import { Req, Res } from '@nestjs/common';
import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { string } from 'joi';
import { AuthInputDTO, AuthOutputDTO } from './dtos/auth.dtos';
import { LoginInputDTO, LoginOutputDTO } from './dtos/login.dto';
import { SignupInputDTO, SignupOutputDTO } from './dtos/signup.dto';
import { UsersEntity } from './entities/users.entity';
import { UsersService } from './users.service';

@Resolver((of) => UsersEntity)
export class UsersResolver {
    constructor(private readonly usersService: UsersService) {
    }

    @Query(() => String)
    name() {
        return 'Joker';
    }

    @Mutation((returns) => SignupOutputDTO)
    async signup(@Args('input') signupInputResolver: SignupInputDTO): Promise<SignupOutputDTO> {
        try {
            return this.usersService.signup(signupInputResolver);
        } catch (e) {
            console.log(`${e} signup mutation`);
        }
    }

    @Mutation((returns) => LoginOutputDTO)
    async login(@Args('input') loginInputResolver: LoginInputDTO): Promise<LoginOutputDTO> {
        return this.usersService.login(loginInputResolver);
    }

    @Mutation((returns) => AuthOutputDTO)
    async auth(@Args('input') authInputResolver: AuthInputDTO): Promise<AuthOutputDTO> {
        return this.usersService.auth(authInputResolver);
    }
}
