"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserRepositoryAdapter = void 0;
const common_1 = require("@nestjs/common");
const microservices_1 = require("@nestjs/microservices");
const client_1 = require("@prisma/client");
const UserDTO_1 = require("../../../domain/dtos/UserDTO");
const User_1 = require("../../../domain/models/User");
const Timestamp_1 = require("../../../domain/value_objects/Timestamp");
let UserRepositoryAdapter = class UserRepositoryAdapter extends client_1.PrismaClient {
    async onModuleInit() {
        await this.$connect();
    }
    async getById(uuid) {
        const user = await this.user.findUnique({
            where: {
                uuid: uuid
            }
        });
        if (!user) {
            throw new microservices_1.RpcException("User not found");
        }
        const toUser = new UserDTO_1.UserDTO(user.uuid, user.contact_uuid, user.name, user.last_name, user.nickname, user.email, user.password, user.phone, user.phone_verified, new Timestamp_1.Timestamp().setUserCreatedAt(user.user_created_at).setUserUpdatedAt(user.user_updated_at).setUserDeletedAt(user.user_deleted_at), user.avatar);
        return this.toUserObject(toUser);
    }
    async getByEmail(email) {
        const user = await this.user.findUnique({
            where: {
                email: email
            }
        });
        if (!user) {
            throw new microservices_1.RpcException("User not found");
        }
        const toUser = new UserDTO_1.UserDTO(user.uuid, user.contact_uuid, user.name, user.last_name, user.nickname, user.email, user.password, user.phone, user.phone_verified, new Timestamp_1.Timestamp().setUserCreatedAt(user.user_created_at).setUserUpdatedAt(user.user_updated_at).setUserDeletedAt(user.user_deleted_at), user.avatar);
        return this.toUserObject(toUser);
    }
    async getByNickname(nickname) {
        const user = await this.user.findUnique({
            where: {
                nickname: nickname
            }
        });
        if (!user) {
            throw new microservices_1.RpcException("User not found");
        }
        const toUser = new UserDTO_1.UserDTO(user.uuid, user.contact_uuid, user.name, user.last_name, user.nickname, user.email, user.password, user.phone, user.phone_verified, new Timestamp_1.Timestamp().setUserCreatedAt(user.user_created_at).setUserUpdatedAt(user.user_updated_at).setUserDeletedAt(user.user_deleted_at), user.avatar);
        return this.toUserObject(toUser);
    }
    async getByPhone(phone) {
        const user = await this.user.findFirst({
            where: {
                phone: phone
            }
        });
        if (!user) {
            throw new microservices_1.RpcException("User not found");
        }
        const toUser = new UserDTO_1.UserDTO(user.uuid, user.contact_uuid, user.name, user.last_name, user.nickname, user.email, user.password, user.phone, user.phone_verified, new Timestamp_1.Timestamp().setUserCreatedAt(user.user_created_at).setUserUpdatedAt(user.user_updated_at).setUserDeletedAt(user.user_deleted_at), user.avatar);
        return this.toUserObject(toUser);
    }
    async searchUsers(query) {
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
            throw new microservices_1.RpcException("Users not found");
        }
        const users = usersFound.map(user => {
            const toUser = new UserDTO_1.UserDTO(user.uuid, user.contact_uuid, user.name, user.last_name, user.nickname, user.email, user.password, user.phone, user.phone_verified, new Timestamp_1.Timestamp().setUserCreatedAt(user.user_created_at).setUserUpdatedAt(user.user_updated_at).setUserDeletedAt(user.user_deleted_at), user.avatar);
            return this.toUserObject(toUser);
        });
        return users;
    }
    async createUser(user) {
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
            throw new microservices_1.RpcException('Something wrong happened to create your user, please verify your info');
        }
        return "User created, please sign in to continue";
    }
    async updateUser(uuid, user) {
        const userUpdated = await this.user.update({
            where: {
                uuid: uuid
            },
            data: user
        });
        if (!userUpdated) {
            throw new microservices_1.RpcException("Something wrong happened to the moment of update");
        }
        return "User updated successfully";
    }
    async updatePassword(password) {
        return "";
    }
    async deleteUser(uuid) {
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
    toUserObject(user) {
        const userTransform = new User_1.User(user.contact_uuid, user.name, user.last_name, user.nickname, user.email, user.password, user.phone, user.phone_verified, user.timestamp, user.avatar);
        userTransform.uuid = user.uuid;
        return userTransform;
    }
};
exports.UserRepositoryAdapter = UserRepositoryAdapter;
exports.UserRepositoryAdapter = UserRepositoryAdapter = __decorate([
    (0, common_1.Injectable)()
], UserRepositoryAdapter);
//# sourceMappingURL=UserRepositoryAdapter.js.map