import { Injectable, Inject } from "@nestjs/common";

import { validateOrReject } from "class-validator";
import { hash } from "bcrypt";

import { User } from "src/users/domain/models/User";
import { CreateUserUseCase } from "src/users/domain/ports/in/CreateUserUseCase";
import { CreateUserDTO } from "src/users/domain/dtos/CreateUserDTO";
import { Timestamp } from "src/users/domain/value_objects/Timestamp";
import { PhoneVerified } from "src/users/domain/value_objects/PhoneVerified";
import { UserRepository } from "src/users/domain/ports/out/UserRepository";

@Injectable()
export class CreateUserUseCaseImpl implements CreateUserUseCase {
    constructor(
        @Inject('UserRepository') private readonly userRepository: UserRepository
    ){}

    public async createUser(data: CreateUserDTO): Promise<string> {
        const date = new Date();
        const timestamp = new Timestamp().setUserCreatedAt(date).setUserUpdatedAt(date).setUserDeletedAt(undefined);
        const user = new User(
            data.contact.uuid,
            data.contact.name,
            data.contact.last_name,
            data.nickname,
            data.contact.email,
            data.password,
            data.contact.phone,
            PhoneVerified.ACTIVE,
            timestamp,
            data.avatar
        );
        await validateOrReject(user);
        const hashPassword = await hash(user.password.trim(), 10);

        return await this.userRepository.createUser({ ...user, password: hashPassword });
    }
}