import { Field, InputType, ObjectType, registerEnumType } from '@nestjs/graphql';
import { Column, Entity } from 'typeorm';
import { CoreEntity } from 'src/common/entities/core.entity';
import { IsEmail, IsEnum } from 'class-validator';

enum MasterRole {
    Users,
    Master,
}

registerEnumType(MasterRole, { name: 'MasterRole' });

@InputType({ isAbstract: true })
@ObjectType()
@Entity()

//CoreEntity => id,createdAt,updatedAt
//UsersEntity => id,createdAt,updatedAt,email,password,salt,role(master,user)
export class UsersEntity extends CoreEntity {
    @Column({ length: 30, comment: '회원아이디', nullable: false })
    @Field((type) => String)
    @IsEmail()
    email: string;

    @Column({ select: false, length: 100, comment: '비밀번호', nullable: false })
    @Field((type) => String)
    password: string;

    @Column({ select: false, length: 200, comment: '암호화된 비밀번호', nullable: true })
    @Field((type) => String)
    hashPassword: string;

    @Column({ select: false, length: 100, comment: '암호화된 비밀번호를 로그인시 확인하기 위한 값', nullable: true })
    @Field((type) => String)
    salt: string;

    @Column({ type: 'enum', enum: MasterRole, comment: 'Master:관리자, Users:일반사용자', nullable: false })
    @Field((type) => MasterRole)
    @IsEnum(MasterRole)
    role: MasterRole;
}
