import { Injectable, Inject } from "@nestjs/common";
import { RpcException } from "@nestjs/microservices";

import { hash, compare } from "bcrypt";

import { UserSearchService } from "src/users/application/services/UserSearchService";

import { UpdateUserDTO } from "src/users/domain/dtos/UpdateUserDTO";
import { UpdateUserUseCase } from "src/users/domain/ports/in/UpdateUserUseCase";

@Injectable()
export class UserUpdateService implements UpdateUserUseCase {
    constructor(
        @Inject('UpdateUserUseCase') private readonly updateUserUseCase: UpdateUserUseCase,
        private readonly userSearchService: UserSearchService,
    ) { }

    public async updateUser(uuid: string, user: UpdateUserDTO): Promise<string> {
        if (user.nickname !== undefined) {
            const existingUser = await this.userSearchService.getByNickname(user.nickname);
            if (existingUser && existingUser.uuid !== uuid) {
                throw new RpcException('Email already registered');
            }
        }

        if (user.email !== undefined) {
            const existingUser = await this.userSearchService.getByEmail(user.email);
            if (existingUser && existingUser.uuid !== uuid) {
                throw new RpcException('Email already registered');
            }
        }

        if (user.phone !== undefined) {
            const existingUser = await this.userSearchService.getByPhone(user.phone);
            if (existingUser && existingUser.uuid !== uuid) {
                throw new RpcException('Phone already registered');
            }
        }

        return await this.updateUserUseCase.updateUser(uuid, user);
    }

    public async changePassword(uuid: string, newPassword: string): Promise<string> {
        const user = await this.userSearchService.getById(uuid);
        const comparePassword = await compare(newPassword, user.password);
        if (comparePassword) {
            throw new RpcException("The new password not can be the same as the old password");
        }
        const hashedPassword = await hash(newPassword, 10);
        return await this.updateUser(uuid, { password: hashedPassword });
    }
}