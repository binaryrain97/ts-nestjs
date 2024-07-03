import { IsEmail, IsString } from "class-validator";
import { UserEntity } from "../entities/user.entity";

export class CreateUserDto {
    @IsEmail()
    email: string;

    @IsString()
    password: string;

    @IsString()
    nickname: string;

    toEntity(): UserEntity {
        const entity = new UserEntity();
        entity.email = this.email;
        entity.password = this.password;
        entity.nickname = this.nickname;
        return entity;
    }
}
