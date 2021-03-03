import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { v4 as uuidv4 } from 'uuid';
import { SignupInputDTO, SignupOutputDTO } from './dtos/signup.dto';
import { UsersEntity } from './entities/users.entity';
import * as crypto from 'crypto';
import { LoginInputDTO, LoginOutputDTO } from './dtos/login.dto';
import * as jwt from 'jsonwebtoken';
import { AuthInputDTO, AuthOutputDTO } from './dtos/auth.dtos';

@Injectable()
export class UsersService {
    constructor(@InjectRepository(UsersEntity) private readonly users: Repository<UsersEntity>) {}

    async signup({ email, password, role, salt, hashPassword }: SignupInputDTO): Promise<SignupOutputDTO> {
        try {
            const exists = await this.users.findOne({ email });
            if (exists) {
                return { success: false, message: 'I am already a registered member.' };
            } else {
                salt = Math.round(new Date().valueOf() * Math.random()) + '';
                hashPassword = crypto
                    .createHash('sha512')
                    .update(password + salt)
                    .digest('base64');
            }
            const signupResult = await this.users.save(this.users.create({ email, hashPassword, role, salt }));
            console.log(signupResult);
            return { success: true, message: `Membership registration was successful. ID : ${email}` };
        } catch (e) {
            console.log(`${e} UsersService Signup Error`);
            return { success: false, message: 'Membership registration failed.' };
        }
    }

    async login({ email, password }: LoginInputDTO): Promise<LoginOutputDTO> {
        try {
            const user = await this.users.findOne({ email }, { select: ['id', 'hashPassword', 'salt'] });
            if (!user) {
                return {
                    success: false,
                    message: `You are not a registered member. Please check your ID and try again.`,
                };
            }
            const hashPassword = crypto
                .createHash('sha512')
                .update(password + user.salt)
                .digest('base64');
            if (user.hashPassword != hashPassword) {
                return {
                    success: false,
                    message: `The password is incorrect. Please check the password and try again.`,
                };
            }
            const payLoad = {
                email: email,
                uuid4: uuidv4(),
            };
            const token = jwt.sign(payLoad, process.env.JWT_SECRET_KEY, {
                expiresIn: '60m', //Math.floor(Date.now() / 1000) + 10
            });
            return { success: true, message: 'log-in succeed', token: token };
        } catch (e) {
            console.log(`${e} UsersService Login Error`);
            return { success: false, message: 'Login failed.' };
        }
    }

    async auth({ token }: AuthInputDTO): Promise<AuthOutputDTO> {
        try {
            const decodedData = jwt.verify(token, process.env.JWT_SECRET_KEY); //JWT token Decode
            const email = decodedData.email;
            const user = await this.users.findOne({ email });
            if (user) {
                return { success: true, message: 'Authentication success' };
            } else {
                return { success: false, message: 'Authentication failed' };
            }
        } catch (e) {
            console.log(`${e} UsersService Auth Error`);
            if (e.message === 'invalid signature') {
                return { success: false, message: 'Token is not normal.' };
            }
            if (e.message === 'TokenExpiredError' || 'jwt expired') {
                return { success: false, message: 'Token has expired.' };
            }
            return { success: false, message: 'Authentication error' };
        }
    }
}
