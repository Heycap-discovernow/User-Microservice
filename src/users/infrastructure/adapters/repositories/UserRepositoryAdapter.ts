import { Injectable, OnModuleInit } from "@nestjs/common";
import { RpcException } from "@nestjs/microservices";
import { PrismaClient } from "@prisma/client";

import { UserDTO } from "src/users/domain/dtos/UserDTO";
import { UpdateUserDTO } from "src/users/domain/dtos/UpdateUserDTO";
import { User } from "src/users/domain/models/User";
import { UserRepository } from "src/users/domain/ports/out/UserRepository";
import { PhoneVerified } from "src/users/domain/value_objects/PhoneVerified";
import { Timestamp } from "src/users/domain/value_objects/Timestamp";

@Injectable()
export class UserRepositoryAdapter extends PrismaClient implements OnModuleInit, UserRepository {
    async onModuleInit() {
        await this.$connect();
    }

    public async getById(uuid: string): Promise<User> {
        const user = await this.user.findUnique({
            where: {
                uuid: uuid
            }
        });

        if (!user) {
            throw new RpcException("User not found");
        }
        const toUser = new UserDTO(
            user.uuid,
            user.contact_uuid,
            user.name,
            user.last_name,
            user.nickname,
            user.email,
            user.password,
            user.phone,
            user.phone_verified as PhoneVerified,
            new Timestamp().setUserCreatedAt(user.user_created_at).setUserUpdatedAt(user.user_updated_at).setUserDeletedAt(user.user_deleted_at),
            user.avatar
        );

        return this.toUserObject(toUser);
    }

    public async getByEmail(email: string): Promise<User> {
        const user = await this.user.findUnique({
            where: {
                email: email
            }
        });

        if (!user) {
            throw new RpcException("User not found");
        }
        const toUser = new UserDTO(
            user.uuid,
            user.contact_uuid,
            user.name,
            user.last_name,
            user.nickname,
            user.email,
            user.password,
            user.phone,
            user.phone_verified as PhoneVerified,
            new Timestamp().setUserCreatedAt(user.user_created_at).setUserUpdatedAt(user.user_updated_at).setUserDeletedAt(user.user_deleted_at),
            user.avatar
        );

        return this.toUserObject(toUser);
    }

    public async getByNickname(nickname: string): Promise<User> {
        const user = await this.user.findUnique({
            where: {
                nickname: nickname
            }
        });

        if (!user) {
            throw new RpcException("User not found");
        }

        const toUser = new UserDTO(
            user.uuid,
            user.contact_uuid,
            user.name,
            user.last_name,
            user.nickname,
            user.email,
            user.password,
            user.phone,
            user.phone_verified as PhoneVerified,
            new Timestamp().setUserCreatedAt(user.user_created_at).setUserUpdatedAt(user.user_updated_at).setUserDeletedAt(user.user_deleted_at),
            user.avatar
        );

        return this.toUserObject(toUser);
    }

    public async getByPhone(phone: string): Promise<User> {
        const user = await this.user.findFirst({
            where: {
                phone: phone
            }
        });

        if (!user) {
            throw new RpcException("User not found");
        }

        const toUser = new UserDTO(
            user.uuid,
            user.contact_uuid,
            user.name,
            user.last_name,
            user.nickname,
            user.email,
            user.password,
            user.phone,
            user.phone_verified as PhoneVerified,
            new Timestamp().setUserCreatedAt(user.user_created_at).setUserUpdatedAt(user.user_updated_at).setUserDeletedAt(user.user_deleted_at),
            user.avatar
        );

        return this.toUserObject(toUser);
    }

    public async searchUsers(query: string): Promise<User[]> {
        const usersFound = await this.user.findMany({
            where: {
                OR: [
                    { name: { contains: query, mode: 'insensitive' } },
                    { last_name: { contains: query, mode: 'insensitive' } },
                    { nickname: { contains: query, mode: 'insensitive' } },
                ],
            },
        });

        if (!usersFound) {
            throw new RpcException("Users not found");
        }

        const users = usersFound.map(user => {
            const toUser = new UserDTO(
                user.uuid,
                user.contact_uuid,
                user.name,
                user.last_name,
                user.nickname,
                user.email,
                user.password,
                user.phone,
                user.phone_verified as PhoneVerified,
                new Timestamp().setUserCreatedAt(user.user_created_at).setUserUpdatedAt(user.user_updated_at).setUserDeletedAt(user.user_deleted_at),
                user.avatar
            );

            return this.toUserObject(toUser);
        });

        return users;
    }

    public async createUser(user: UserDTO): Promise<string> {
        const create = await this.user.create({
            data: {
                uuid: user.uuid,
                contact_uuid: user.contact_uuid,
                name: user.name,
                last_name: user.last_name,
                nickname: user.nickname,
                email: user.email,
                password: user.password,
                phone: user.phone,
                phone_verified: user.phone_verified,
                avatar: user.avatar,
                user_created_at: user.timestamp.getUserCreatedAt(),
                user_updated_at: user.timestamp.getUserUpdatedAt(),
                user_deleted_at: user.timestamp.getUserDeletedAt(),
            }
        });

        if (!create) {
            throw new RpcException('Something wrong happened to create your user, please verify your info');
        }

        return "User created, please sign in to continue";
    }

    public async updateUser(uuid: string, user: UpdateUserDTO): Promise<string> {
        const userUpdated = await this.user.update({
            where: {
                uuid: uuid
            },
            data: user
        });

        if (!userUpdated) {
            throw new RpcException("Something wrong happened to the moment of update")
        }

        return "User updated successfully";
    }

    public async updatePassword(password: string): Promise<string> {
        return ""
    }

    public async deleteUser(uuid: string): Promise<boolean> {
        const deleteUser = await this.user.delete({
            where: {
                uuid: uuid
            }
        });

        if (!deleteUser) {
            return false;
        }

        return true;
    }

    private toUserObject(user: UserDTO): User {
        const userTransform = new User(
            user.contact_uuid,
            user.name,
            user.last_name,
            user.nickname,
            user.email,
            user.password,
            user.phone,
            user.phone_verified,
            user.timestamp,
            user.avatar
        );
        userTransform.uuid = user.uuid;
        return userTransform;
    }
}