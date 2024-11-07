import { ContactService } from "src/application/services/ContactService";
import { TokenService } from "src/application/services/TokenService";

import { UserRequest } from "src/application/dtos/request/UserRequest";
import { UserDTO } from "src/domain/dtos/UserDTO";
import { GetUserByIdUseCase } from "src/domain/ports/in/user/GetUseByIdUseCase";
import { CreateUserUseCase } from "src/domain/ports/in/user/CreateUserUseCase";
import { UpdateUserUseCase } from "src/domain/ports/in/user/UpdateUserUseCase";
import { DeleteUserUseCase } from "src/domain/ports/in/user/DeleteUserUseCase";
import { LoginUserUseCase } from "src/domain/ports/in/user/LoginUserUseCase";
import { User } from "src/domain/models/User";
import { Timestamp } from "src/domain/value_objects/Timestamp";
import { PhoneVerified } from "src/domain/value_objects/PhoneVerified";

import { Injectable, Inject } from "@nestjs/common";
import { ClientProxy } from "@nestjs/microservices";

import { validateOrReject } from "class-validator";
import { hash, compare } from "bcrypt";

@Injectable()
export class UserService implements GetUserByIdUseCase, CreateUserUseCase, UpdateUserUseCase, DeleteUserUseCase, LoginUserUseCase {
    constructor(
        @Inject('GetUserByIdUseCase') private readonly getUserByIdUseCase: GetUserByIdUseCase,
        @Inject('CreateUserUseCase') private readonly createUserUseCase: CreateUserUseCase,
        @Inject('UpdateUserUseCase') private readonly updateUserUseCase: UpdateUserUseCase,
        @Inject('DeleteUserUseCase') private readonly deleteUserUseCase: DeleteUserUseCase,
        @Inject('LoginUseCase') private readonly loginUserUseCase: LoginUserUseCase,
        @Inject('NOTIFICATIONS_TRANSPORT') private readonly client: ClientProxy,
        private readonly contactService: ContactService,
        private readonly tokenService: TokenService
    ) { }

    public async getById(uuid: string): Promise<UserDTO> {
        return await this.getUserByIdUseCase.getById(uuid);
    }

    public async createUser(data: UserRequest): Promise<string> {
        const contact = await this.contactService.searchContact(data.contact_uuid);
        if (!contact) {
            throw new Error("Contact not found");
        }
        const date = new Date();
        const timestamp = new Timestamp().setUserCreatedAt(date).setUserUpdatedAt(date).setUserDeletedAt(undefined);
        const user = new User(
            contact.uuid,
            contact.name,
            contact.last_name,
            data.nickname,
            contact.email,
            data.password,
            contact.phone,
            PhoneVerified.INACTIVE,
            timestamp,
            data.avatar
        );
        await validateOrReject(user);
        const hashPassword = await hash(user.password.trim(), 10);
        const result = await this.createUserUseCase.createUser({ ...user, password: hashPassword });
        if (!result) {
            throw new Error("User not created");
        }
        
        const code = await this.tokenService.generateCodeToken(user.uuid);
        // this.eventEmmitter.emit("verify.phone", user.phone, code);
        return result;
    }

    public async updateUser(uuid: string, user: UserDTO): Promise<string> {
        return await this.updateUserUseCase.updateUser(uuid, user);
    }

    public async deleteUser(uuid: string): Promise<boolean> {
        return await this.deleteUserUseCase.deleteUser(uuid);
    }

    public async login(email: string, password: string): Promise<UserDTO> {
        const user = await this.loginUserUseCase.login(email, password);
        if (!user) {
            throw new Error("User not found");
        }
        const passwordMatch = await compare(password, user.password);
        if (!passwordMatch) {
            throw new Error("invalid password");
        }
        return user;
    }

    public async verifyPhone(uuid: string, code: string): Promise<string> {
        const user = await this.getById(uuid);
        if (!user) {
            throw new Error("User not found");
        }
        console.log("status phone found", user.phone_verified, typeof user.phone_verified);
        console.log("status phone expected", PhoneVerified.ACTIVE, typeof PhoneVerified.ACTIVE);
        const token = await this.tokenService.verifyCodeToken(uuid, code);
        // MANDAR A LLAMAR AL SERVICIO DE Token PARA VERIFICAR EL CODIGO (Cambiar)
        return "true";
    }
}