import { OnModuleInit } from "@nestjs/common";
import { PrismaClient } from "@prisma/client";
import { UserDTO } from "src/users/domain/dtos/UserDTO";
import { UpdateUserDTO } from "src/users/domain/dtos/UpdateUserDTO";
import { User } from "src/users/domain/models/User";
import { UserRepository } from "src/users/domain/ports/out/UserRepository";
export declare class UserRepositoryAdapter extends PrismaClient implements OnModuleInit, UserRepository {
    onModuleInit(): Promise<void>;
    getById(uuid: string): Promise<User>;
    getByEmail(email: string): Promise<User>;
    getByNickname(nickname: string): Promise<User>;
    getByPhone(phone: string): Promise<User>;
    searchUsers(query: string): Promise<User[]>;
    createUser(user: UserDTO): Promise<string>;
    updateUser(uuid: string, user: UpdateUserDTO): Promise<string>;
    updatePassword(password: string): Promise<string>;
    deleteUser(uuid: string): Promise<boolean>;
    private toUserObject;
}
